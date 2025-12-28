import { NextRequest, NextResponse } from "next/server";
import { getAuthContext } from "@/lib/auth/context";
import { db } from "@/lib/db";
import { metaLeadRaw } from "@/lib/db/schema";
import { eq, and, desc, sql } from "drizzle-orm";
import { retryFailedLead, getProcessingStats } from "@/lib/integrations/meta/processor";

/**
 * GET /api/integrations/meta/failed-leads
 *
 * Retrieve failed leads for the current org with pagination and stats.
 */
export async function GET(request: NextRequest) {
  try {
    const ctx = await getAuthContext();
    if (!ctx) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const limit = Math.min(parseInt(searchParams.get("limit") || "50"), 100);
    const offset = parseInt(searchParams.get("offset") || "0");

    // Get failed leads for this org
    const failedLeads = await db
      .select({
        id: metaLeadRaw.id,
        leadgenId: metaLeadRaw.leadgenId,
        pageId: metaLeadRaw.pageId,
        formId: metaLeadRaw.formId,
        status: metaLeadRaw.status,
        errorMessage: metaLeadRaw.errorMessage,
        retryCount: metaLeadRaw.retryCount,
        fieldData: metaLeadRaw.fieldData,
        createdAt: metaLeadRaw.createdAt,
        fetchedAt: metaLeadRaw.fetchedAt,
        campaignId: metaLeadRaw.campaignId,
        adId: metaLeadRaw.adId,
      })
      .from(metaLeadRaw)
      .where(
        and(
          eq(metaLeadRaw.orgId, ctx.org.id),
          eq(metaLeadRaw.status, "failed")
        )
      )
      .orderBy(desc(metaLeadRaw.createdAt))
      .limit(limit)
      .offset(offset);

    // Get total count
    const [countResult] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(metaLeadRaw)
      .where(
        and(
          eq(metaLeadRaw.orgId, ctx.org.id),
          eq(metaLeadRaw.status, "failed")
        )
      );

    // Get processing stats
    const stats = await getProcessingStats(ctx.org.id);

    return NextResponse.json({
      leads: failedLeads,
      total: countResult?.count ?? 0,
      stats,
      pagination: {
        limit,
        offset,
        hasMore: (countResult?.count ?? 0) > offset + limit,
      },
    });
  } catch (error) {
    console.error("[Failed Leads API] GET Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch failed leads" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/integrations/meta/failed-leads
 *
 * Retry a specific failed lead by ID.
 * Body: { leadId: number }
 */
export async function POST(request: NextRequest) {
  try {
    const ctx = await getAuthContext();
    if (!ctx) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { leadId, action } = body as { leadId?: number; action?: "retry" | "retry-all" };

    if (action === "retry-all") {
      // Retry all failed leads for this org
      const failedLeads = await db
        .select({ id: metaLeadRaw.id })
        .from(metaLeadRaw)
        .where(
          and(
            eq(metaLeadRaw.orgId, ctx.org.id),
            eq(metaLeadRaw.status, "failed")
          )
        )
        .limit(50); // Limit to prevent timeout

      const results = {
        total: failedLeads.length,
        success: 0,
        failed: 0,
      };

      for (const lead of failedLeads) {
        const result = await retryFailedLead(lead.id);
        if (result.success) {
          results.success++;
        } else {
          results.failed++;
        }
      }

      return NextResponse.json({
        message: `Retried ${results.total} leads: ${results.success} success, ${results.failed} failed`,
        results,
      });
    }

    // Single lead retry
    if (!leadId || typeof leadId !== "number") {
      return NextResponse.json(
        { error: "leadId is required" },
        { status: 400 }
      );
    }

    // Verify the lead belongs to this org
    const lead = await db.query.metaLeadRaw.findFirst({
      where: and(
        eq(metaLeadRaw.id, leadId),
        eq(metaLeadRaw.orgId, ctx.org.id)
      ),
    });

    if (!lead) {
      return NextResponse.json(
        { error: "Lead not found" },
        { status: 404 }
      );
    }

    // Retry the lead
    const result = await retryFailedLead(leadId);

    if (result.success) {
      return NextResponse.json({
        success: true,
        contactId: result.contactId,
        opportunityId: result.opportunityId,
      });
    } else {
      return NextResponse.json({
        success: false,
        error: result.error,
      });
    }
  } catch (error) {
    console.error("[Failed Leads API] POST Error:", error);
    return NextResponse.json(
      { error: "Failed to retry lead" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/integrations/meta/failed-leads
 *
 * Delete a specific failed lead by ID (dismiss without retry).
 * Query: ?leadId=123
 */
export async function DELETE(request: NextRequest) {
  try {
    const ctx = await getAuthContext();
    if (!ctx) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const leadId = parseInt(searchParams.get("leadId") || "");

    if (!leadId) {
      return NextResponse.json(
        { error: "leadId is required" },
        { status: 400 }
      );
    }

    // Verify the lead belongs to this org
    const lead = await db.query.metaLeadRaw.findFirst({
      where: and(
        eq(metaLeadRaw.id, leadId),
        eq(metaLeadRaw.orgId, ctx.org.id)
      ),
    });

    if (!lead) {
      return NextResponse.json(
        { error: "Lead not found" },
        { status: 404 }
      );
    }

    // Mark as dismissed (update status to "skipped" instead of deleting)
    await db
      .update(metaLeadRaw)
      .set({
        status: "skipped",
        errorMessage: "Dismissed by user",
      })
      .where(eq(metaLeadRaw.id, leadId));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Failed Leads API] DELETE Error:", error);
    return NextResponse.json(
      { error: "Failed to delete lead" },
      { status: 500 }
    );
  }
}
