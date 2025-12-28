import { NextResponse } from "next/server";
import { getAuthContext } from "@/lib/auth/context";
import { db } from "@/lib/db";
import { metaLeadRaw, metaConnections, metaPages, webhookEvents } from "@/lib/db/schema";
import { eq, and, desc, gte, sql } from "drizzle-orm";

/**
 * GET /api/integrations/meta/health
 *
 * Get webhook health status and recent activity.
 */
export async function GET() {
  try {
    const ctx = await getAuthContext();
    if (!ctx) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const now = new Date();
    const last24Hours = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const last7Days = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const lastHour = new Date(now.getTime() - 60 * 60 * 1000);

    // Get connection status
    const connection = await db.query.metaConnections.findFirst({
      where: eq(metaConnections.orgId, ctx.org.id),
    });

    // Get pages
    const pages = await db.query.metaPages.findMany({
      where: and(
        eq(metaPages.orgId, ctx.org.id),
        eq(metaPages.isActive, true)
      ),
    });

    // Get lead stats for last 24h
    const [leadsLast24h] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(metaLeadRaw)
      .where(
        and(
          eq(metaLeadRaw.orgId, ctx.org.id),
          gte(metaLeadRaw.createdAt, last24Hours)
        )
      );

    // Get lead stats for last 7 days
    const [leadsLast7Days] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(metaLeadRaw)
      .where(
        and(
          eq(metaLeadRaw.orgId, ctx.org.id),
          gte(metaLeadRaw.createdAt, last7Days)
        )
      );

    // Get failed leads in last 24h
    const [failedLast24h] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(metaLeadRaw)
      .where(
        and(
          eq(metaLeadRaw.orgId, ctx.org.id),
          eq(metaLeadRaw.status, "failed"),
          gte(metaLeadRaw.createdAt, last24Hours)
        )
      );

    // Get completed leads in last 24h
    const [completedLast24h] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(metaLeadRaw)
      .where(
        and(
          eq(metaLeadRaw.orgId, ctx.org.id),
          eq(metaLeadRaw.status, "completed"),
          gte(metaLeadRaw.createdAt, last24Hours)
        )
      );

    // Get recent webhook events (last 20)
    const recentEvents = await db
      .select({
        id: webhookEvents.id,
        status: webhookEvents.status,
        createdAt: webhookEvents.createdAt,
        processedAt: webhookEvents.processedAt,
        errorMessage: webhookEvents.errorMessage,
      })
      .from(webhookEvents)
      .where(
        and(
          eq(webhookEvents.provider, "meta"),
          gte(webhookEvents.createdAt, last7Days)
        )
      )
      .orderBy(desc(webhookEvents.createdAt))
      .limit(20);

    // Get leads received in last hour (for activity indicator)
    const [leadsLastHour] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(metaLeadRaw)
      .where(
        and(
          eq(metaLeadRaw.orgId, ctx.org.id),
          gte(metaLeadRaw.createdAt, lastHour)
        )
      );

    // Get last successful lead
    const lastSuccessfulLead = await db
      .select({
        id: metaLeadRaw.id,
        processedAt: metaLeadRaw.processedAt,
      })
      .from(metaLeadRaw)
      .where(
        and(
          eq(metaLeadRaw.orgId, ctx.org.id),
          eq(metaLeadRaw.status, "completed")
        )
      )
      .orderBy(desc(metaLeadRaw.processedAt))
      .limit(1);

    // Calculate health status
    const totalLast24h = leadsLast24h?.count ?? 0;
    const failedCount = failedLast24h?.count ?? 0;
    const completedCount = completedLast24h?.count ?? 0;
    const errorRate = totalLast24h > 0 ? (failedCount / totalLast24h) * 100 : 0;

    let healthStatus: "healthy" | "degraded" | "down" | "unknown" = "unknown";
    let healthMessage = "";

    if (!connection) {
      healthStatus = "down";
      healthMessage = "Meta niet gekoppeld";
    } else if (pages.length === 0) {
      healthStatus = "degraded";
      healthMessage = "Geen actieve pagina's";
    } else if (errorRate > 50) {
      healthStatus = "down";
      healthMessage = `${errorRate.toFixed(0)}% error rate in laatste 24u`;
    } else if (errorRate > 20) {
      healthStatus = "degraded";
      healthMessage = `${errorRate.toFixed(0)}% error rate in laatste 24u`;
    } else if (totalLast24h === 0 && connection) {
      healthStatus = "healthy";
      healthMessage = "Verbonden, wachtend op leads";
    } else {
      healthStatus = "healthy";
      healthMessage = `${completedCount}/${totalLast24h} leads verwerkt`;
    }

    // Daily lead counts for chart (last 7 days)
    const dailyLeadsQuery = await db.execute(sql`
      SELECT
        DATE(created_at) as date,
        COUNT(*) as total,
        COUNT(*) FILTER (WHERE status = 'completed') as completed,
        COUNT(*) FILTER (WHERE status = 'failed') as failed
      FROM meta_lead_raw
      WHERE org_id = ${ctx.org.id}
        AND created_at >= ${last7Days.toISOString()}
      GROUP BY DATE(created_at)
      ORDER BY DATE(created_at) ASC
    `);

    return NextResponse.json({
      connected: !!connection,
      connection: connection
        ? {
            connectedAt: connection.createdAt,
            expiresAt: connection.tokenExpiresAt,
          }
        : null,
      pages: pages.map((p) => ({
        id: p.id,
        pageId: p.pageId,
        pageName: p.pageName,
        isActive: p.isActive,
      })),
      health: {
        status: healthStatus,
        message: healthMessage,
        errorRate,
      },
      stats: {
        last24Hours: {
          total: totalLast24h,
          completed: completedCount,
          failed: failedCount,
        },
        last7Days: {
          total: leadsLast7Days?.count ?? 0,
        },
        lastHour: leadsLastHour?.count ?? 0,
        lastSuccessfulLead: lastSuccessfulLead[0]?.processedAt ?? null,
      },
      recentEvents: recentEvents.map((e) => ({
        id: e.id,
        status: e.status,
        createdAt: e.createdAt,
        processedAt: e.processedAt,
        hasError: !!e.errorMessage,
      })),
      dailyLeads: dailyLeadsQuery.rows,
    });
  } catch (error) {
    console.error("[Meta Health API] Error:", error);
    return NextResponse.json(
      { error: "Failed to get health status" },
      { status: 500 }
    );
  }
}
