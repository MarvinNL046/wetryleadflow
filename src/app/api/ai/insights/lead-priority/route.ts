import { NextRequest, NextResponse } from "next/server";
import { getAuthContext } from "@/lib/auth/context";
import { getLeadPriorityInsight, isAIConfigured, canUseAIInsights } from "@/lib/ai";
import { db } from "@/lib/db";
import { orgs, agencies } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

/**
 * GET /api/ai/insights/lead-priority
 *
 * Get AI-powered lead prioritization insights for the current workspace.
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
      return NextResponse.json(
        { error: "AI not configured", code: "AI_NOT_CONFIGURED" },
        { status: 503 }
      );
    }

    // Check tier access
    const hasAccess = await checkAIAccess(ctx.org.id);
    if (!hasAccess) {
      return NextResponse.json(
        { error: "AI Insights requires Pro or Enterprise subscription", code: "TIER_REQUIRED" },
        { status: 403 }
      );
    }

    // Check for force refresh parameter
    const forceRefresh = request.nextUrl.searchParams.get("refresh") === "true";

    // Get the insight (use Dutch as default for this Dutch product)
    const result = await getLeadPriorityInsight(ctx.workspace.id, {
      forceRefresh,
      locale: "nl",
    });

    if (result.generating) {
      return NextResponse.json(
        { generating: true, message: "Insights are being generated" },
        { status: 202 }
      );
    }

    if (result.error) {
      return NextResponse.json(
        { error: result.error, code: "GENERATION_ERROR" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      insight: result.insight,
      cached: result.cached,
    });
  } catch (error) {
    console.error("[AI Lead Priority] API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/ai/insights/lead-priority
 *
 * Force refresh lead priority insights.
 */
export async function POST(request: NextRequest) {
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
      return NextResponse.json(
        { error: "AI not configured", code: "AI_NOT_CONFIGURED" },
        { status: 503 }
      );
    }

    // Check tier access
    const hasAccess = await checkAIAccess(ctx.org.id);
    if (!hasAccess) {
      return NextResponse.json(
        { error: "AI Insights requires Pro or Enterprise subscription", code: "TIER_REQUIRED" },
        { status: 403 }
      );
    }

    // Force refresh the insight (use Dutch as default for this Dutch product)
    const result = await getLeadPriorityInsight(ctx.workspace.id, {
      forceRefresh: true,
      locale: "nl",
    });

    if (result.generating) {
      return NextResponse.json(
        { generating: true, message: "Insights are being generated" },
        { status: 202 }
      );
    }

    if (result.error) {
      return NextResponse.json(
        { error: result.error, code: "GENERATION_ERROR" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      insight: result.insight,
      cached: false,
    });
  } catch (error) {
    console.error("[AI Lead Priority] Refresh Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * Check if the org has access to AI Insights.
 * Pro/Enterprise tiers for direct users, Growth/Scale for agency clients.
 */
async function checkAIAccess(orgId: number): Promise<boolean> {
  const org = await db.query.orgs.findFirst({
    where: eq(orgs.id, orgId),
  });

  if (!org) return false;

  // Direct users: check subscription tier
  if (!org.agencyId) {
    return canUseAIInsights(org.subscriptionTier as "free" | "pro" | "enterprise");
  }

  // Agency clients: check agency tier
  const agency = await db.query.agencies.findFirst({
    where: eq(agencies.id, org.agencyId),
  });

  if (!agency) return false;

  // Unlimited and SaaS Pro agency tiers have access
  return agency.tier === "unlimited" || agency.tier === "saas_pro";
}
