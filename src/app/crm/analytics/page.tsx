import { subDays } from "date-fns";
import { AnalyticsDashboard } from "@/components/crm/analytics";
import {
  getAnalyticsOverview,
  getRevenueTimeSeries,
  getLeadsOverTime,
  getLeadSourcesBreakdown,
  getPipelineFunnel,
  getTopOpportunities,
} from "@/lib/actions/analytics";

export default async function AnalyticsPage() {
  // Default date range: last 30 days
  const dateRange = {
    from: subDays(new Date(), 29),
    to: new Date(),
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

  return (
    <AnalyticsDashboard
      initialOverview={overview}
      initialRevenueTrend={revenueTrend}
      initialLeadsTrend={leadsTrend}
      initialLeadSources={leadSources}
      initialFunnel={funnel}
      initialTopOpportunities={topOpportunities}
    />
  );
}
