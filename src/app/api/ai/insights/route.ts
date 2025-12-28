import { NextRequest, NextResponse } from "next/server";
import { getAuthContext } from "@/lib/auth/context";
import { getLeadPriorityInsight, isAIConfigured, canUseAIInsights } from "@/lib/ai";
import { db } from "@/lib/db";
import { orgs, agencies } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { isSuperAdmin } from "@/lib/auth/superadmin";

/**
 * GET /api/ai/insights
 *
 * Get all AI insights for the current workspace.
 * Returns cached insights when available, triggers generation if needed.
 */
export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const ctx = await getAuthContext();
    if (!ctx) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // Check if AI is configured
    if (!isAIConfigured()) {
      return NextResponse.json({
        available: false,
        reason: "AI_NOT_CONFIGURED",
        insights: null,
      });
    }

    // Check tier access (super admins bypass all restrictions)
    const hasAccess = await checkAIAccess(ctx.org.id, ctx.user.email);
    if (!hasAccess) {
      return NextResponse.json({
        available: false,
        reason: "TIER_REQUIRED",
        requiredTier: "pro",
        insights: null,
      });
    }

    // Get lead priority insight (use Dutch as default for this Dutch product)
    const leadPriority = await getLeadPriorityInsight(ctx.workspace.id, {
      locale: "nl",
    });

    // TODO: Add other insight types here (pipeline_health, next_actions, performance)

    return NextResponse.json({
      available: true,
      insights: {
        leadPriority: leadPriority.insight,
        leadPriorityCached: leadPriority.cached,
        leadPriorityGenerating: leadPriority.generating,
        // Future insight types will be added here
        pipelineHealth: null,
        nextActions: null,
        performance: null,
      },
    });
  } catch (error) {
    console.error("[AI Insights] API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * Check if the org has access to AI Insights.
 * Super admins always have access (no limits).
 */
async function checkAIAccess(orgId: number, userEmail: string): Promise<boolean> {
  // Super admins bypass all tier restrictions
  if (isSuperAdmin(userEmail)) {
    return true;
  }

  const org = await db.query.orgs.findFirst({
    where: eq(orgs.id, orgId),
  });

  if (!org) return false;

  if (!org.agencyId) {
    return canUseAIInsights(org.subscriptionTier as "free" | "pro" | "enterprise");
  }

  const agency = await db.query.agencies.findFirst({
    where: eq(agencies.id, org.agencyId),
  });

  if (!agency) return false;

  // Unlimited and SaaS Pro agency tiers have access
  return agency.tier === "unlimited" || agency.tier === "saas_pro";
}
