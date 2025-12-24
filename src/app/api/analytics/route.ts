import { NextRequest, NextResponse } from "next/server";
import {
  getAnalyticsOverview,
  getRevenueTimeSeries,
  getLeadsOverTime,
  getLeadSourcesBreakdown,
  getPipelineFunnel,
  getTopOpportunities,
} from "@/lib/actions/analytics";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { from, to } = body;

    if (!from || !to) {
      return NextResponse.json(
        { error: "Missing date range" },
        { status: 400 }
      );
    }

    const dateRange = {
      from: new Date(from),
      to: new Date(to),
    };

    // Fetch all analytics data in parallel
    const [overview, revenueTrend, leadsTrend, leadSources, funnel, topOpportunities] =
      await Promise.all([
        getAnalyticsOverview(dateRange),
        getRevenueTimeSeries(dateRange, "day"),
        getLeadsOverTime(dateRange),
        getLeadSourcesBreakdown(dateRange),
        getPipelineFunnel(dateRange),
        getTopOpportunities(dateRange, 10),
      ]);

    return NextResponse.json({
      overview,
      revenueTrend,
      leadsTrend,
      leadSources,
      funnel,
      topOpportunities,
    });
  } catch (error) {
    console.error("Analytics API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics" },
      { status: 500 }
    );
  }
}
