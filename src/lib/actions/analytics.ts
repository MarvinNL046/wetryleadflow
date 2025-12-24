"use server";

import { eq, and, gte, lte, sql, count, sum, avg, desc } from "drizzle-orm";
import { db } from "@/lib/db";
import {
  contacts,
  opportunities,
  opportunityStageHistory,
  pipelineStages,
  pipelines,
  leadAttribution,
  users,
  expenses,
} from "@/lib/db/schema";
import { requireAuthContext } from "@/lib/auth/context";
import {
  startOfDay,
  endOfDay,
  subDays,
  subMonths,
  format,
  differenceInDays,
  eachDayOfInterval,
  eachWeekOfInterval,
  eachMonthOfInterval,
} from "date-fns";

// ============================================
// Types
// ============================================

export interface DateRange {
  from: Date;
  to: Date;
}

export interface AnalyticsOverview {
  revenue: number;
  previousRevenue: number;
  expenses: number;
  previousExpenses: number;
  profit: number;
  previousProfit: number;
  leads: number;
  previousLeads: number;
  conversionRate: number;
  previousConversionRate: number;
  avgDealSize: number;
  previousAvgDealSize: number;
  pipelineValue: number;
  previousPipelineValue: number;
  avgSalesCycle: number;
  previousAvgSalesCycle: number;
}

export interface TimeSeriesDataPoint {
  date: string;
  value: number;
  count: number;
}

export interface LeadSourceData {
  source: string;
  count: number;
  value: number;
}

export interface PipelineFunnelData {
  stageId: number;
  stageName: string;
  stageColor: string;
  count: number;
  value: number;
  order: number;
}

export interface StageVelocityData {
  stageId: number;
  stageName: string;
  avgDays: number;
}

export interface TopOpportunity {
  id: number;
  title: string;
  value: number;
  stageName: string;
  stageColor: string;
  daysInPipeline: number;
  contactName: string | null;
  assignedToName: string | null;
}

// ============================================
// Helper Functions
// ============================================

function getPreviousPeriod(from: Date, to: Date): DateRange {
  const daysDiff = differenceInDays(to, from);
  return {
    from: subDays(from, daysDiff + 1),
    to: subDays(from, 1),
  };
}

function calculateChange(current: number, previous: number): number {
  if (previous === 0) return current > 0 ? 100 : 0;
  return Math.round(((current - previous) / previous) * 100 * 10) / 10;
}

// Helper function to get expense totals for a date range
async function getExpenseTotals(
  workspaceId: number,
  from: Date,
  to: Date
): Promise<number> {
  const result = await db
    .select({
      total: sql<number>`COALESCE(SUM(${expenses.total}::numeric), 0)`,
    })
    .from(expenses)
    .where(
      and(
        eq(expenses.workspaceId, workspaceId),
        eq(expenses.status, "paid"),
        gte(expenses.invoiceDate, startOfDay(from)),
        lte(expenses.invoiceDate, endOfDay(to))
      )
    );

  return Number(result[0]?.total) || 0;
}

// ============================================
// Analytics Overview
// ============================================

export async function getAnalyticsOverview(
  dateRange: DateRange
): Promise<AnalyticsOverview> {
  const ctx = await requireAuthContext();
  const { from, to } = dateRange;
  const previousPeriod = getPreviousPeriod(from, to);

  // Get all stages that represent "won" (typically last stage or named "Won"/"Closed Won")
  const allStages = await db.query.pipelineStages.findMany({
    where: eq(
      pipelineStages.pipelineId,
      sql`(SELECT id FROM pipelines WHERE workspace_id = ${ctx.workspace.id} LIMIT 1)`
    ),
    orderBy: [desc(pipelineStages.order)],
  });

  // Assume the stage with highest order or name containing "won" is the won stage
  const wonStageIds = allStages
    .filter(
      (s) =>
        s.name.toLowerCase().includes("won") ||
        s.name.toLowerCase().includes("closed") ||
        s.order === Math.max(...allStages.map((st) => st.order))
    )
    .map((s) => s.id);

  // Build the won stage IDs array for SQL
  const wonStageIdsSql = wonStageIds.length > 0
    ? sql`ARRAY[${sql.join(wonStageIds.map(id => sql`${id}`), sql`, `)}]::int[]`
    : sql`ARRAY[]::int[]`;

  // Current period metrics
  const [currentMetrics] = await db
    .select({
      totalOpportunities: count(opportunities.id),
      wonOpportunities: sql<number>`COUNT(CASE WHEN ${opportunities.stageId} = ANY(${wonStageIdsSql}) THEN 1 END)`,
      totalRevenue: sql<number>`COALESCE(SUM(CASE WHEN ${opportunities.stageId} = ANY(${wonStageIdsSql}) THEN ${opportunities.value}::numeric ELSE 0 END), 0)`,
      avgDealSize: sql<number>`COALESCE(AVG(CASE WHEN ${opportunities.stageId} = ANY(${wonStageIdsSql}) AND ${opportunities.value} IS NOT NULL THEN ${opportunities.value}::numeric END), 0)`,
      pipelineValue: sql<number>`COALESCE(SUM(CASE WHEN NOT (${opportunities.stageId} = ANY(${wonStageIdsSql})) THEN ${opportunities.value}::numeric ELSE 0 END), 0)`,
    })
    .from(opportunities)
    .where(
      and(
        eq(opportunities.workspaceId, ctx.workspace.id),
        gte(opportunities.createdAt, startOfDay(from)),
        lte(opportunities.createdAt, endOfDay(to))
      )
    );

  // Current period leads
  const [currentLeads] = await db
    .select({ count: count(contacts.id) })
    .from(contacts)
    .where(
      and(
        eq(contacts.workspaceId, ctx.workspace.id),
        gte(contacts.createdAt, startOfDay(from)),
        lte(contacts.createdAt, endOfDay(to))
      )
    );

  // Previous period metrics
  const [previousMetrics] = await db
    .select({
      totalOpportunities: count(opportunities.id),
      wonOpportunities: sql<number>`COUNT(CASE WHEN ${opportunities.stageId} = ANY(${wonStageIdsSql}) THEN 1 END)`,
      totalRevenue: sql<number>`COALESCE(SUM(CASE WHEN ${opportunities.stageId} = ANY(${wonStageIdsSql}) THEN ${opportunities.value}::numeric ELSE 0 END), 0)`,
      avgDealSize: sql<number>`COALESCE(AVG(CASE WHEN ${opportunities.stageId} = ANY(${wonStageIdsSql}) AND ${opportunities.value} IS NOT NULL THEN ${opportunities.value}::numeric END), 0)`,
      pipelineValue: sql<number>`COALESCE(SUM(CASE WHEN NOT (${opportunities.stageId} = ANY(${wonStageIdsSql})) THEN ${opportunities.value}::numeric ELSE 0 END), 0)`,
    })
    .from(opportunities)
    .where(
      and(
        eq(opportunities.workspaceId, ctx.workspace.id),
        gte(opportunities.createdAt, startOfDay(previousPeriod.from)),
        lte(opportunities.createdAt, endOfDay(previousPeriod.to))
      )
    );

  // Previous period leads
  const [previousLeads] = await db
    .select({ count: count(contacts.id) })
    .from(contacts)
    .where(
      and(
        eq(contacts.workspaceId, ctx.workspace.id),
        gte(contacts.createdAt, startOfDay(previousPeriod.from)),
        lte(contacts.createdAt, endOfDay(previousPeriod.to))
      )
    );

  // Calculate conversion rates
  const currentConversionRate =
    currentMetrics.totalOpportunities > 0
      ? Math.round(
          (currentMetrics.wonOpportunities / currentMetrics.totalOpportunities) *
            100 *
            10
        ) / 10
      : 0;

  const previousConversionRate =
    previousMetrics.totalOpportunities > 0
      ? Math.round(
          (previousMetrics.wonOpportunities /
            previousMetrics.totalOpportunities) *
            100 *
            10
        ) / 10
      : 0;

  // Calculate average sales cycle (days from opportunity creation to won)
  const avgSalesCycle = await calculateAvgSalesCycle(
    ctx.workspace.id,
    wonStageIds,
    from,
    to
  );
  const previousAvgSalesCycle = await calculateAvgSalesCycle(
    ctx.workspace.id,
    wonStageIds,
    previousPeriod.from,
    previousPeriod.to
  );

  // Calculate expenses and profit
  const currentExpenses = await getExpenseTotals(ctx.workspace.id, from, to);
  const previousExpenses = await getExpenseTotals(
    ctx.workspace.id,
    previousPeriod.from,
    previousPeriod.to
  );

  const currentRevenue = Number(currentMetrics.totalRevenue) || 0;
  const prevRevenue = Number(previousMetrics.totalRevenue) || 0;
  const currentProfit = currentRevenue - currentExpenses;
  const previousProfit = prevRevenue - previousExpenses;

  return {
    revenue: currentRevenue,
    previousRevenue: prevRevenue,
    expenses: currentExpenses,
    previousExpenses: previousExpenses,
    profit: currentProfit,
    previousProfit: previousProfit,
    leads: currentLeads.count,
    previousLeads: previousLeads.count,
    conversionRate: currentConversionRate,
    previousConversionRate: previousConversionRate,
    avgDealSize: Math.round(Number(currentMetrics.avgDealSize) || 0),
    previousAvgDealSize: Math.round(Number(previousMetrics.avgDealSize) || 0),
    pipelineValue: Number(currentMetrics.pipelineValue) || 0,
    previousPipelineValue: Number(previousMetrics.pipelineValue) || 0,
    avgSalesCycle,
    previousAvgSalesCycle,
  };
}

async function calculateAvgSalesCycle(
  workspaceId: number,
  wonStageIds: number[],
  from: Date,
  to: Date
): Promise<number> {
  if (wonStageIds.length === 0) return 0;

  // Build the won stage IDs array for SQL
  const wonStageIdsSql = sql`ARRAY[${sql.join(wonStageIds.map(id => sql`${id}`), sql`, `)}]::int[]`;

  const result = await db
    .select({
      avgDays: sql<number>`AVG(EXTRACT(DAY FROM (${opportunityStageHistory.movedAt} - ${opportunities.createdAt})))`,
    })
    .from(opportunityStageHistory)
    .innerJoin(
      opportunities,
      eq(opportunityStageHistory.opportunityId, opportunities.id)
    )
    .where(
      and(
        eq(opportunities.workspaceId, workspaceId),
        sql`${opportunityStageHistory.toStageId} = ANY(${wonStageIdsSql})`,
        gte(opportunityStageHistory.movedAt, startOfDay(from)),
        lte(opportunityStageHistory.movedAt, endOfDay(to))
      )
    );

  return Math.round(Number(result[0]?.avgDays) || 0);
}

// ============================================
// Revenue Time Series
// ============================================

export async function getRevenueTimeSeries(
  dateRange: DateRange,
  granularity: "day" | "week" | "month" = "day"
): Promise<TimeSeriesDataPoint[]> {
  const ctx = await requireAuthContext();
  const { from, to } = dateRange;

  // Get won stage IDs
  const allStages = await db.query.pipelineStages.findMany({
    where: eq(
      pipelineStages.pipelineId,
      sql`(SELECT id FROM pipelines WHERE workspace_id = ${ctx.workspace.id} LIMIT 1)`
    ),
    orderBy: [desc(pipelineStages.order)],
  });

  const wonStageIds = allStages
    .filter(
      (s) =>
        s.name.toLowerCase().includes("won") ||
        s.order === Math.max(...allStages.map((st) => st.order))
    )
    .map((s) => s.id);

  // Build the won stage IDs array for SQL
  const wonStageIdsSql = wonStageIds.length > 0
    ? sql`ARRAY[${sql.join(wonStageIds.map(id => sql`${id}`), sql`, `)}]::int[]`
    : sql`ARRAY[]::int[]`;

  // Get all won opportunities in the date range
  const wonOpportunities = await db
    .select({
      id: opportunities.id,
      value: opportunities.value,
      createdAt: opportunities.createdAt,
    })
    .from(opportunities)
    .where(
      and(
        eq(opportunities.workspaceId, ctx.workspace.id),
        sql`${opportunities.stageId} = ANY(${wonStageIdsSql})`,
        gte(opportunities.createdAt, startOfDay(from)),
        lte(opportunities.createdAt, endOfDay(to))
      )
    );

  // Generate date intervals
  let intervals: Date[];
  let formatStr: string;

  switch (granularity) {
    case "week":
      intervals = eachWeekOfInterval({ start: from, end: to });
      formatStr = "yyyy-'W'ww";
      break;
    case "month":
      intervals = eachMonthOfInterval({ start: from, end: to });
      formatStr = "yyyy-MM";
      break;
    default:
      intervals = eachDayOfInterval({ start: from, end: to });
      formatStr = "yyyy-MM-dd";
  }

  // Aggregate by interval
  const dataMap = new Map<string, { value: number; count: number }>();
  intervals.forEach((date) => {
    dataMap.set(format(date, formatStr), { value: 0, count: 0 });
  });

  wonOpportunities.forEach((opp) => {
    const key = format(opp.createdAt, formatStr);
    const existing = dataMap.get(key);
    if (existing) {
      existing.value += Number(opp.value) || 0;
      existing.count += 1;
    }
  });

  return Array.from(dataMap.entries()).map(([date, data]) => ({
    date,
    value: data.value,
    count: data.count,
  }));
}

// ============================================
// Lead Sources Breakdown
// ============================================

export async function getLeadSourcesBreakdown(
  dateRange: DateRange
): Promise<LeadSourceData[]> {
  const ctx = await requireAuthContext();
  const { from, to } = dateRange;

  const result = await db
    .select({
      source: leadAttribution.source,
      count: count(leadAttribution.id),
    })
    .from(leadAttribution)
    .innerJoin(contacts, eq(leadAttribution.contactId, contacts.id))
    .where(
      and(
        eq(contacts.workspaceId, ctx.workspace.id),
        gte(leadAttribution.createdAt, startOfDay(from)),
        lte(leadAttribution.createdAt, endOfDay(to))
      )
    )
    .groupBy(leadAttribution.source);

  // Get value per source by joining with opportunities
  const sourceValues = await db
    .select({
      source: leadAttribution.source,
      totalValue: sql<number>`COALESCE(SUM(${opportunities.value}::numeric), 0)`,
    })
    .from(leadAttribution)
    .innerJoin(contacts, eq(leadAttribution.contactId, contacts.id))
    .leftJoin(opportunities, eq(opportunities.contactId, contacts.id))
    .where(
      and(
        eq(contacts.workspaceId, ctx.workspace.id),
        gte(leadAttribution.createdAt, startOfDay(from)),
        lte(leadAttribution.createdAt, endOfDay(to))
      )
    )
    .groupBy(leadAttribution.source);

  const valueMap = new Map(
    sourceValues.map((v) => [v.source, Number(v.totalValue) || 0])
  );

  // Also count contacts without attribution as "manual"
  const [manualCount] = await db
    .select({ count: count(contacts.id) })
    .from(contacts)
    .leftJoin(leadAttribution, eq(leadAttribution.contactId, contacts.id))
    .where(
      and(
        eq(contacts.workspaceId, ctx.workspace.id),
        sql`${leadAttribution.id} IS NULL`,
        gte(contacts.createdAt, startOfDay(from)),
        lte(contacts.createdAt, endOfDay(to))
      )
    );

  const sources: LeadSourceData[] = result.map((r) => ({
    source: r.source || "unknown",
    count: r.count,
    value: valueMap.get(r.source) || 0,
  }));

  // Add manual if there are contacts without attribution
  if (manualCount.count > 0) {
    const existingManual = sources.find((s) => s.source === "manual");
    if (existingManual) {
      existingManual.count += manualCount.count;
    } else {
      sources.push({
        source: "manual",
        count: manualCount.count,
        value: 0,
      });
    }
  }

  return sources;
}

// ============================================
// Pipeline Funnel
// ============================================

export async function getPipelineFunnel(
  dateRange: DateRange,
  pipelineId?: number
): Promise<PipelineFunnelData[]> {
  const ctx = await requireAuthContext();
  const { from, to } = dateRange;

  // Get the pipeline (use first if not specified)
  let targetPipelineId = pipelineId;
  if (!targetPipelineId) {
    const firstPipeline = await db.query.pipelines.findFirst({
      where: eq(pipelines.workspaceId, ctx.workspace.id),
    });
    if (!firstPipeline) return [];
    targetPipelineId = firstPipeline.id;
  }

  // Get all stages for this pipeline
  const stages = await db.query.pipelineStages.findMany({
    where: eq(pipelineStages.pipelineId, targetPipelineId),
    orderBy: [pipelineStages.order],
  });

  // Count opportunities per stage
  const result = await db
    .select({
      stageId: opportunities.stageId,
      count: count(opportunities.id),
      totalValue: sql<number>`COALESCE(SUM(${opportunities.value}::numeric), 0)`,
    })
    .from(opportunities)
    .where(
      and(
        eq(opportunities.workspaceId, ctx.workspace.id),
        eq(opportunities.pipelineId, targetPipelineId),
        gte(opportunities.createdAt, startOfDay(from)),
        lte(opportunities.createdAt, endOfDay(to))
      )
    )
    .groupBy(opportunities.stageId);

  const countMap = new Map(
    result.map((r) => [
      r.stageId,
      { count: r.count, value: Number(r.totalValue) || 0 },
    ])
  );

  return stages.map((stage) => ({
    stageId: stage.id,
    stageName: stage.name,
    stageColor: stage.color || "#6366f1",
    count: countMap.get(stage.id)?.count || 0,
    value: countMap.get(stage.id)?.value || 0,
    order: stage.order,
  }));
}

// ============================================
// Stage Velocity
// ============================================

export async function getStageVelocity(
  dateRange: DateRange,
  pipelineId?: number
): Promise<StageVelocityData[]> {
  const ctx = await requireAuthContext();
  const { from, to } = dateRange;

  // Get the pipeline
  let targetPipelineId = pipelineId;
  if (!targetPipelineId) {
    const firstPipeline = await db.query.pipelines.findFirst({
      where: eq(pipelines.workspaceId, ctx.workspace.id),
    });
    if (!firstPipeline) return [];
    targetPipelineId = firstPipeline.id;
  }

  // Get stages
  const stages = await db.query.pipelineStages.findMany({
    where: eq(pipelineStages.pipelineId, targetPipelineId),
    orderBy: [pipelineStages.order],
  });

  // Calculate average time spent in each stage
  const velocityData: StageVelocityData[] = [];

  for (const stage of stages) {
    // Find transitions OUT of this stage
    const [result] = await db
      .select({
        avgDays: sql<number>`AVG(
          EXTRACT(EPOCH FROM (
            COALESCE(
              (SELECT MIN(h2.moved_at) FROM opportunity_stage_history h2
               WHERE h2.opportunity_id = ${opportunityStageHistory.opportunityId}
               AND h2.moved_at > ${opportunityStageHistory.movedAt}),
              NOW()
            ) - ${opportunityStageHistory.movedAt}
          )) / 86400
        )`,
      })
      .from(opportunityStageHistory)
      .innerJoin(
        opportunities,
        eq(opportunityStageHistory.opportunityId, opportunities.id)
      )
      .where(
        and(
          eq(opportunities.workspaceId, ctx.workspace.id),
          eq(opportunityStageHistory.toStageId, stage.id),
          gte(opportunityStageHistory.movedAt, startOfDay(from)),
          lte(opportunityStageHistory.movedAt, endOfDay(to))
        )
      );

    velocityData.push({
      stageId: stage.id,
      stageName: stage.name,
      avgDays: Math.round(Number(result?.avgDays) || 0),
    });
  }

  return velocityData;
}

// ============================================
// Top Opportunities
// ============================================

export async function getTopOpportunities(
  dateRange: DateRange,
  limit: number = 10
): Promise<TopOpportunity[]> {
  const ctx = await requireAuthContext();
  const { from, to } = dateRange;

  const result = await db
    .select({
      id: opportunities.id,
      title: opportunities.title,
      value: opportunities.value,
      createdAt: opportunities.createdAt,
      stageName: pipelineStages.name,
      stageColor: pipelineStages.color,
      contactFirstName: contacts.firstName,
      contactLastName: contacts.lastName,
      assignedToName: users.name,
    })
    .from(opportunities)
    .innerJoin(pipelineStages, eq(opportunities.stageId, pipelineStages.id))
    .leftJoin(contacts, eq(opportunities.contactId, contacts.id))
    .leftJoin(users, eq(opportunities.assignedToId, users.id))
    .where(
      and(
        eq(opportunities.workspaceId, ctx.workspace.id),
        gte(opportunities.createdAt, startOfDay(from)),
        lte(opportunities.createdAt, endOfDay(to))
      )
    )
    .orderBy(desc(sql`${opportunities.value}::numeric`))
    .limit(limit);

  return result.map((opp) => ({
    id: opp.id,
    title: opp.title,
    value: Number(opp.value) || 0,
    stageName: opp.stageName,
    stageColor: opp.stageColor || "#6366f1",
    daysInPipeline: differenceInDays(new Date(), opp.createdAt),
    contactName:
      opp.contactFirstName || opp.contactLastName
        ? `${opp.contactFirstName || ""} ${opp.contactLastName || ""}`.trim()
        : null,
    assignedToName: opp.assignedToName,
  }));
}

// ============================================
// Leads Over Time (for sparklines)
// ============================================

export async function getLeadsOverTime(
  dateRange: DateRange
): Promise<TimeSeriesDataPoint[]> {
  const ctx = await requireAuthContext();
  const { from, to } = dateRange;

  const intervals = eachDayOfInterval({ start: from, end: to });
  const formatStr = "yyyy-MM-dd";

  const leads = await db
    .select({
      id: contacts.id,
      createdAt: contacts.createdAt,
    })
    .from(contacts)
    .where(
      and(
        eq(contacts.workspaceId, ctx.workspace.id),
        gte(contacts.createdAt, startOfDay(from)),
        lte(contacts.createdAt, endOfDay(to))
      )
    );

  const dataMap = new Map<string, { value: number; count: number }>();
  intervals.forEach((date) => {
    dataMap.set(format(date, formatStr), { value: 0, count: 0 });
  });

  leads.forEach((lead) => {
    const key = format(lead.createdAt, formatStr);
    const existing = dataMap.get(key);
    if (existing) {
      existing.count += 1;
      existing.value += 1;
    }
  });

  return Array.from(dataMap.entries()).map(([date, data]) => ({
    date,
    value: data.value,
    count: data.count,
  }));
}

// ============================================
// Call Performance Metrics
// ============================================

export interface CallMetrics {
  answered: number;
  notAnswered: number;
  voicemail: number;
  callback: number;
  other: number;
}

export async function getCallMetrics(dateRange: DateRange): Promise<CallMetrics> {
  const ctx = await requireAuthContext();
  const { from, to } = dateRange;

  const result = await db
    .select({
      lastCallResult: contacts.lastCallResult,
      count: count(contacts.id),
    })
    .from(contacts)
    .where(
      and(
        eq(contacts.workspaceId, ctx.workspace.id),
        sql`${contacts.lastCallResult} IS NOT NULL`,
        gte(contacts.createdAt, startOfDay(from)),
        lte(contacts.createdAt, endOfDay(to))
      )
    )
    .groupBy(contacts.lastCallResult);

  const metrics: CallMetrics = {
    answered: 0,
    notAnswered: 0,
    voicemail: 0,
    callback: 0,
    other: 0,
  };

  result.forEach((r) => {
    const resultType = r.lastCallResult?.toLowerCase() || "";
    if (resultType.includes("answered") && !resultType.includes("not")) {
      metrics.answered += r.count;
    } else if (resultType.includes("not_answered") || resultType.includes("no answer")) {
      metrics.notAnswered += r.count;
    } else if (resultType.includes("voicemail")) {
      metrics.voicemail += r.count;
    } else if (resultType.includes("callback")) {
      metrics.callback += r.count;
    } else {
      metrics.other += r.count;
    }
  });

  return metrics;
}
