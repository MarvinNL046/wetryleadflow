"use server";

import { db } from "@/lib/db";
import { crmSettings, pipelines, pipelineStages } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { requireAuthContext } from "@/lib/auth/context";
import { revalidatePath } from "next/cache";

export interface OnboardingProgress {
  currentStep: number;
  steps: {
    welcome: boolean;
    profile: boolean;
    pipeline: boolean;
    metaConnected: boolean;
  };
  companyName?: string;
  businessType?: "products" | "services" | "both";
}

export interface OnboardingStatus {
  completed: boolean;
  skipped: boolean;
  completedAt: Date | null;
  progress: OnboardingProgress;
  hasPipelines: boolean;
  hasMetaConnection: boolean;
}

const DEFAULT_PROGRESS: OnboardingProgress = {
  currentStep: 0,
  steps: {
    welcome: false,
    profile: false,
    pipeline: false,
    metaConnected: false,
  },
};

/**
 * Get the current onboarding status for the workspace
 */
export async function getOnboardingStatus(): Promise<OnboardingStatus> {
  const ctx = await requireAuthContext();

  // Get or create CRM settings
  let settings = await db.query.crmSettings.findFirst({
    where: eq(crmSettings.workspaceId, ctx.workspace.id),
  });

  if (!settings) {
    // Create default settings if not exists
    const [newSettings] = await db
      .insert(crmSettings)
      .values({
        workspaceId: ctx.workspace.id,
      })
      .returning();
    settings = newSettings;
  }

  // Check if workspace has pipelines
  const pipelineCount = await db.query.pipelines.findMany({
    where: eq(pipelines.workspaceId, ctx.workspace.id),
    limit: 1,
  });
  const hasPipelines = pipelineCount.length > 0;

  // Check Meta connection status (simple check)
  const { getMetaConnectionStatus } = await import("./integrations");
  let hasMetaConnection = false;
  try {
    const metaStatus = await getMetaConnectionStatus();
    hasMetaConnection = metaStatus.connected;
  } catch {
    // Ignore errors
  }

  return {
    completed: settings.onboardingCompleted,
    skipped: settings.onboardingSkipped,
    completedAt: settings.onboardingCompletedAt,
    progress: (settings.onboardingProgress as OnboardingProgress) || DEFAULT_PROGRESS,
    hasPipelines,
    hasMetaConnection,
  };
}

/**
 * Update onboarding progress
 */
export async function updateOnboardingProgress(
  updates: Partial<OnboardingProgress>
): Promise<void> {
  const ctx = await requireAuthContext();

  const settings = await db.query.crmSettings.findFirst({
    where: eq(crmSettings.workspaceId, ctx.workspace.id),
  });

  if (!settings) {
    throw new Error("Settings not found");
  }

  const currentProgress = (settings.onboardingProgress as OnboardingProgress) || DEFAULT_PROGRESS;
  const newProgress: OnboardingProgress = {
    ...currentProgress,
    ...updates,
    steps: {
      ...currentProgress.steps,
      ...(updates.steps || {}),
    },
  };

  await db
    .update(crmSettings)
    .set({
      onboardingProgress: newProgress,
      updatedAt: new Date(),
    })
    .where(eq(crmSettings.workspaceId, ctx.workspace.id));

  revalidatePath("/crm");
}

/**
 * Complete the onboarding flow
 */
export async function completeOnboarding(): Promise<void> {
  const ctx = await requireAuthContext();

  await db
    .update(crmSettings)
    .set({
      onboardingCompleted: true,
      onboardingCompletedAt: new Date(),
      updatedAt: new Date(),
    })
    .where(eq(crmSettings.workspaceId, ctx.workspace.id));

  revalidatePath("/crm");
}

/**
 * Skip the onboarding flow (can still complete later via sidebar)
 */
export async function skipOnboarding(): Promise<void> {
  const ctx = await requireAuthContext();

  await db
    .update(crmSettings)
    .set({
      onboardingSkipped: true,
      updatedAt: new Date(),
    })
    .where(eq(crmSettings.workspaceId, ctx.workspace.id));

  revalidatePath("/crm");
}

/**
 * Save profile info during onboarding
 */
export async function saveOnboardingProfile(data: {
  companyName: string;
  businessType?: "products" | "services" | "both";
}): Promise<void> {
  const ctx = await requireAuthContext();

  const settings = await db.query.crmSettings.findFirst({
    where: eq(crmSettings.workspaceId, ctx.workspace.id),
  });

  const currentProgress = (settings?.onboardingProgress as OnboardingProgress) || DEFAULT_PROGRESS;

  await db
    .update(crmSettings)
    .set({
      onboardingProgress: {
        ...currentProgress,
        companyName: data.companyName,
        businessType: data.businessType,
        steps: {
          ...currentProgress.steps,
          profile: true,
        },
      },
      updatedAt: new Date(),
    })
    .where(eq(crmSettings.workspaceId, ctx.workspace.id));

  revalidatePath("/crm");
}

/**
 * Pipeline template types
 */
export type PipelineTemplate = "sales" | "leads" | "custom";

/**
 * Create a pipeline from template during onboarding
 */
export async function createPipelineFromTemplate(
  template: PipelineTemplate,
  customName?: string
): Promise<{ pipelineId: number }> {
  const ctx = await requireAuthContext();

  const templates: Record<PipelineTemplate, { name: string; stages: Array<{ name: string; color: string }> }> = {
    sales: {
      name: "Sales Pipeline",
      stages: [
        { name: "Lead", color: "#6366f1" },
        { name: "Gekwalificeerd", color: "#8b5cf6" },
        { name: "Offerte", color: "#a855f7" },
        { name: "Onderhandeling", color: "#d946ef" },
        { name: "Gewonnen", color: "#22c55e" },
        { name: "Verloren", color: "#ef4444" },
      ],
    },
    leads: {
      name: "Lead Pipeline",
      stages: [
        { name: "Nieuw", color: "#6366f1" },
        { name: "1x Gebeld", color: "#8b5cf6" },
        { name: "Niet Bereikbaar", color: "#f59e0b" },
        { name: "Afspraak", color: "#10b981" },
        { name: "Gewonnen", color: "#22c55e" },
        { name: "Verloren", color: "#ef4444" },
      ],
    },
    custom: {
      name: customName || "Mijn Pipeline",
      stages: [
        { name: "Nieuw", color: "#6366f1" },
        { name: "In Behandeling", color: "#8b5cf6" },
        { name: "Afgerond", color: "#22c55e" },
      ],
    },
  };

  const templateConfig = templates[template];

  // Create pipeline
  const [pipeline] = await db
    .insert(pipelines)
    .values({
      workspaceId: ctx.workspace.id,
      name: templateConfig.name,
    })
    .returning();

  // Create stages
  for (let i = 0; i < templateConfig.stages.length; i++) {
    const stage = templateConfig.stages[i];
    await db.insert(pipelineStages).values({
      pipelineId: pipeline.id,
      name: stage.name,
      color: stage.color,
      order: i,
    });
  }

  // Update onboarding progress
  const settings = await db.query.crmSettings.findFirst({
    where: eq(crmSettings.workspaceId, ctx.workspace.id),
  });

  const currentProgress = (settings?.onboardingProgress as OnboardingProgress) || DEFAULT_PROGRESS;

  await db
    .update(crmSettings)
    .set({
      onboardingProgress: {
        ...currentProgress,
        steps: {
          ...currentProgress.steps,
          pipeline: true,
        },
      },
      updatedAt: new Date(),
    })
    .where(eq(crmSettings.workspaceId, ctx.workspace.id));

  revalidatePath("/crm");
  revalidatePath("/crm/pipelines");

  return { pipelineId: pipeline.id };
}

/**
 * Mark Meta as connected in onboarding
 */
export async function markMetaConnectedInOnboarding(): Promise<void> {
  const ctx = await requireAuthContext();

  const settings = await db.query.crmSettings.findFirst({
    where: eq(crmSettings.workspaceId, ctx.workspace.id),
  });

  const currentProgress = (settings?.onboardingProgress as OnboardingProgress) || DEFAULT_PROGRESS;

  await db
    .update(crmSettings)
    .set({
      onboardingProgress: {
        ...currentProgress,
        steps: {
          ...currentProgress.steps,
          metaConnected: true,
        },
      },
      updatedAt: new Date(),
    })
    .where(eq(crmSettings.workspaceId, ctx.workspace.id));

  revalidatePath("/crm");
}

/**
 * Get count of completed onboarding steps for sidebar badge
 */
export async function getOnboardingStepCount(): Promise<{
  completed: number;
  total: number;
  allDone: boolean;
}> {
  const status = await getOnboardingStatus();

  const steps = status.progress.steps;
  const completed = [
    steps.welcome,
    steps.profile,
    steps.pipeline || status.hasPipelines,
    steps.metaConnected || status.hasMetaConnection,
  ].filter(Boolean).length;

  return {
    completed,
    total: 4,
    allDone: completed === 4 || status.completed,
  };
}
