"use server";

import { db } from "@/lib/db";
import { crmSettings } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { requireAuthContext } from "@/lib/auth/context";
import { revalidatePath } from "next/cache";
import {
  DEFAULT_CALLBACK_PERIODS,
  type CallbackPeriod,
  type CrmSettingsData,
} from "@/lib/types/crm-settings";

/**
 * Get CRM settings for the current workspace.
 * Auto-creates with default values if not exists.
 */
export async function getCrmSettings(): Promise<CrmSettingsData> {
  const ctx = await requireAuthContext();
  const workspaceId = ctx.workspace.id;

  // Try to get existing settings
  const existing = await db
    .select()
    .from(crmSettings)
    .where(eq(crmSettings.workspaceId, workspaceId))
    .limit(1);

  if (existing.length > 0) {
    return {
      ...existing[0],
      callbackPeriods: (existing[0].callbackPeriods as CallbackPeriod[]) || [],
    };
  }

  // Create default settings for this workspace
  const [newSettings] = await db
    .insert(crmSettings)
    .values({
      workspaceId,
      autoFollowUpEnabled: false,
      followUpDays: 0,
      maxCallAttempts: 0,
      sendEmailOnLost: false,
      callbackPeriods: DEFAULT_CALLBACK_PERIODS,
    })
    .returning();

  return {
    ...newSettings,
    callbackPeriods: newSettings.callbackPeriods as CallbackPeriod[],
  };
}

/**
 * Get CRM settings by workspace ID (for internal/job use).
 * Returns null if not found.
 */
export async function getCrmSettingsByWorkspaceId(
  workspaceId: number
): Promise<CrmSettingsData | null> {
  const existing = await db
    .select()
    .from(crmSettings)
    .where(eq(crmSettings.workspaceId, workspaceId))
    .limit(1);

  if (existing.length === 0) {
    return null;
  }

  return {
    ...existing[0],
    callbackPeriods: (existing[0].callbackPeriods as CallbackPeriod[]) || [],
  };
}

/**
 * Update CRM settings for the current workspace.
 */
export async function updateCrmSettings(data: {
  autoFollowUpEnabled?: boolean;
  followUpDays?: number;
  maxCallAttempts?: number;
  sendEmailOnLost?: boolean;
  callbackPeriods?: CallbackPeriod[];
}): Promise<CrmSettingsData> {
  const ctx = await requireAuthContext();
  const workspaceId = ctx.workspace.id;

  // Ensure settings exist
  await getCrmSettings();

  // Update settings
  const [updated] = await db
    .update(crmSettings)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(eq(crmSettings.workspaceId, workspaceId))
    .returning();

  revalidatePath("/crm/settings");
  revalidatePath("/crm/settings/follow-ups");

  return {
    ...updated,
    callbackPeriods: (updated.callbackPeriods as CallbackPeriod[]) || [],
  };
}

/**
 * Add a custom callback period.
 */
export async function addCallbackPeriod(
  days: number,
  label: string
): Promise<CrmSettingsData> {
  const settings = await getCrmSettings();

  // Check if period already exists
  if (settings.callbackPeriods.some((p) => p.days === days)) {
    throw new Error(`Periode met ${days} dagen bestaat al`);
  }

  const newPeriods = [
    ...settings.callbackPeriods,
    { days, label, enabled: true },
  ].sort((a, b) => a.days - b.days);

  return updateCrmSettings({ callbackPeriods: newPeriods });
}

/**
 * Remove a custom callback period.
 */
export async function removeCallbackPeriod(days: number): Promise<CrmSettingsData> {
  const settings = await getCrmSettings();

  const newPeriods = settings.callbackPeriods.filter((p) => p.days !== days);

  return updateCrmSettings({ callbackPeriods: newPeriods });
}

/**
 * Toggle a callback period on/off.
 */
export async function toggleCallbackPeriod(
  days: number,
  enabled: boolean
): Promise<CrmSettingsData> {
  const settings = await getCrmSettings();

  const newPeriods = settings.callbackPeriods.map((p) =>
    p.days === days ? { ...p, enabled } : p
  );

  return updateCrmSettings({ callbackPeriods: newPeriods });
}

/**
 * Get enabled callback periods (for use in the lead popup).
 */
export async function getEnabledCallbackPeriods(): Promise<CallbackPeriod[]> {
  const settings = await getCrmSettings();
  return settings.callbackPeriods.filter((p) => p.enabled);
}

/**
 * Check if follow-up automation is configured and enabled.
 */
export async function isFollowUpEnabled(): Promise<boolean> {
  const settings = await getCrmSettings();
  return (
    settings.autoFollowUpEnabled &&
    settings.followUpDays > 0 &&
    settings.maxCallAttempts > 0
  );
}
