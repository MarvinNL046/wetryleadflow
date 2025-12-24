"use client";

import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import {
  DollarSign,
  Users,
  TrendingUp,
  Target,
  Clock,
  Wallet,
  BarChart3,
  TrendingDown,
  PiggyBank,
} from "lucide-react";
import { DateRangePicker, getDefaultDateRange, type DateRange } from "./filters/date-range-picker";
import { MetricCard } from "./cards/metric-card";
import { RevenueChart } from "./charts/revenue-chart";
import { LeadSourcesChart } from "./charts/lead-sources-chart";
import { PipelineFunnel } from "./charts/pipeline-funnel";
import { OpportunitiesTable } from "./charts/opportunities-table";
import type {
  AnalyticsOverview,
  TimeSeriesDataPoint,
  LeadSourceData,
  PipelineFunnelData,
  TopOpportunity,
} from "@/lib/actions/analytics";

interface AnalyticsDashboardProps {
  initialOverview: AnalyticsOverview;
  initialRevenueTrend: TimeSeriesDataPoint[];
  initialLeadsTrend: TimeSeriesDataPoint[];
  initialLeadSources: LeadSourceData[];
  initialFunnel: PipelineFunnelData[];
  initialTopOpportunities: TopOpportunity[];
}

export function AnalyticsDashboard({
  initialOverview,
  initialRevenueTrend,
  initialLeadsTrend,
  initialLeadSources,
  initialFunnel,
  initialTopOpportunities,
}: AnalyticsDashboardProps) {
  const [dateRange, setDateRange] = useState<DateRange>(getDefaultDateRange());
  const [overview, setOverview] = useState(initialOverview);
  const [revenueTrend, setRevenueTrend] = useState(initialRevenueTrend);
  const [leadsTrend, setLeadsTrend] = useState(initialLeadsTrend);
  const [leadSources, setLeadSources] = useState(initialLeadSources);
  const [funnel, setFunnel] = useState(initialFunnel);
  const [topOpportunities, setTopOpportunities] = useState(initialTopOpportunities);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAnalytics = useCallback(async (range: DateRange) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          from: range.from.toISOString(),
          to: range.to.toISOString(),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setOverview(data.overview);
        setRevenueTrend(data.revenueTrend);
        setLeadsTrend(data.leadsTrend);
        setLeadSources(data.leadSources);
        setFunnel(data.funnel);
        setTopOpportunities(data.topOpportunities);
      }
    } catch (error) {
      console.error("Failed to fetch analytics:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleDateRangeChange = useCallback(
    (range: DateRange) => {
      setDateRange(range);
      fetchAnalytics(range);
    },
    [fetchAnalytics]
  );

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("nl-NL", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Generate sparkline data from trends
  const revenueSparkline = revenueTrend.map((d) => d.value);
  const leadsSparkline = leadsTrend.map((d) => d.count);

  return (
    <div className={`p-8 ${isLoading ? "opacity-70 pointer-events-none" : ""}`}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between mb-8"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-blue-500">
              <BarChart3 className="h-5 w-5 text-white" />
            </div>
            Analytics
          </h1>
          <p className="mt-1 text-zinc-500 dark:text-zinc-400">
            Your sales performance at a glance
          </p>
        </div>
        <DateRangePicker value={dateRange} onChange={handleDateRangeChange} />
      </motion.div>

      {/* KPI Cards - Row 1: Revenue, Expenses, Profit */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-4">
        <MetricCard
          title="Omzet"
          value={formatCurrency(overview.revenue)}
          previousValue={overview.previousRevenue}
          icon={DollarSign}
          color="green"
          sparklineData={revenueSparkline}
          delay={0}
        />
        <MetricCard
          title="Kosten"
          value={formatCurrency(overview.expenses)}
          previousValue={overview.previousExpenses}
          icon={TrendingDown}
          color="rose"
          delay={0.05}
        />
        <MetricCard
          title="Winst"
          value={formatCurrency(overview.profit)}
          previousValue={overview.previousProfit}
          icon={PiggyBank}
          color={overview.profit >= 0 ? "green" : "rose"}
          delay={0.1}
        />
      </div>

      {/* KPI Cards - Row 2: Other Metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 mb-8">
        <MetricCard
          title="Nieuwe Leads"
          value={overview.leads}
          previousValue={overview.previousLeads}
          icon={Users}
          color="blue"
          sparklineData={leadsSparkline}
          delay={0.15}
        />
        <MetricCard
          title="Conversie Ratio"
          value={overview.conversionRate}
          previousValue={overview.previousConversionRate}
          suffix="%"
          icon={TrendingUp}
          color="purple"
          delay={0.2}
        />
        <MetricCard
          title="Gem. Deal Grootte"
          value={formatCurrency(overview.avgDealSize)}
          previousValue={overview.previousAvgDealSize}
          icon={Target}
          color="amber"
          delay={0.25}
        />
        <MetricCard
          title="Sales Cyclus"
          value={overview.avgSalesCycle}
          previousValue={overview.previousAvgSalesCycle}
          suffix=" dagen"
          icon={Clock}
          color="rose"
          delay={0.3}
        />
        <MetricCard
          title="Pipeline Waarde"
          value={formatCurrency(overview.pipelineValue)}
          previousValue={overview.previousPipelineValue}
          icon={Wallet}
          color="blue"
          delay={0.35}
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid gap-6 lg:grid-cols-2 mb-6">
        <RevenueChart data={revenueTrend} delay={0.3} />
        <PipelineFunnel data={funnel} delay={0.35} />
      </div>

      {/* Charts Row 2 */}
      <div className="grid gap-6 lg:grid-cols-2 mb-6">
        <LeadSourcesChart data={leadSources} delay={0.4} />
        <OpportunitiesTable data={topOpportunities} delay={0.45} />
      </div>
    </div>
  );
}
