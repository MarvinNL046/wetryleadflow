"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Activity,
  RefreshCcw,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Clock,
  Loader2,
  TrendingUp,
  Zap,
  Server,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HealthData {
  connected: boolean;
  connection: {
    connectedAt: string;
    expiresAt: string | null;
  } | null;
  pages: Array<{
    id: number;
    pageId: string;
    pageName: string;
    isActive: boolean;
  }>;
  health: {
    status: "healthy" | "degraded" | "down" | "unknown";
    message: string;
    errorRate: number;
  };
  stats: {
    last24Hours: {
      total: number;
      completed: number;
      failed: number;
    };
    last7Days: {
      total: number;
    };
    lastHour: number;
    lastSuccessfulLead: string | null;
  };
  recentEvents: Array<{
    id: number;
    status: string;
    createdAt: string;
    processedAt: string | null;
    hasError: boolean;
  }>;
  dailyLeads: Array<{
    date: string;
    total: number;
    completed: number;
    failed: number;
  }>;
}

const healthStatusConfig = {
  healthy: {
    icon: CheckCircle2,
    color: "text-green-600 dark:text-green-400",
    bgColor: "bg-green-100 dark:bg-green-900/30",
    borderColor: "border-green-200 dark:border-green-800",
    label: "Gezond",
  },
  degraded: {
    icon: AlertTriangle,
    color: "text-amber-600 dark:text-amber-400",
    bgColor: "bg-amber-100 dark:bg-amber-900/30",
    borderColor: "border-amber-200 dark:border-amber-800",
    label: "Verminderd",
  },
  down: {
    icon: XCircle,
    color: "text-red-600 dark:text-red-400",
    bgColor: "bg-red-100 dark:bg-red-900/30",
    borderColor: "border-red-200 dark:border-red-800",
    label: "Offline",
  },
  unknown: {
    icon: Clock,
    color: "text-zinc-600 dark:text-zinc-400",
    bgColor: "bg-zinc-100 dark:bg-zinc-800",
    borderColor: "border-zinc-200 dark:border-zinc-700",
    label: "Onbekend",
  },
};

export default function WebhookHealthPage() {
  const [data, setData] = useState<HealthData | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/integrations/meta/health");
      if (res.ok) {
        const json = await res.json();
        setData(json);
        setLastUpdated(new Date());
      }
    } catch (error) {
      console.error("Failed to fetch:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [fetchData]);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString("nl-NL", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatRelativeTime = (date: string) => {
    const now = new Date();
    const then = new Date(date);
    const diffMs = now.getTime() - then.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return "Zojuist";
    if (diffMins < 60) return `${diffMins} min geleden`;
    if (diffHours < 24) return `${diffHours} uur geleden`;
    return `${diffDays} dagen geleden`;
  };

  const healthConfig = data?.health
    ? healthStatusConfig[data.health.status]
    : healthStatusConfig.unknown;
  const HealthIcon = healthConfig.icon;

  // Calculate max for chart
  const maxDaily = data?.dailyLeads
    ? Math.max(...data.dailyLeads.map((d) => Number(d.total) || 0), 1)
    : 1;

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/crm/settings/integrations"
          className="mb-4 inline-flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
        >
          <ArrowLeft className="h-4 w-4" />
          Terug naar Integraties
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="flex items-center gap-3 text-3xl font-bold">
              <Activity className="h-8 w-8 text-violet-500" />
              Webhook Monitoring
            </h1>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              Realtime status van je Meta Lead Ads integratie
            </p>
          </div>
          <div className="flex items-center gap-4">
            {lastUpdated && (
              <span className="text-sm text-zinc-500">
                Bijgewerkt: {lastUpdated.toLocaleTimeString("nl-NL")}
              </span>
            )}
            <Button variant="outline" onClick={fetchData} disabled={loading}>
              <RefreshCcw
                className={cn("mr-2 h-4 w-4", loading && "animate-spin")}
              />
              Vernieuwen
            </Button>
          </div>
        </div>
      </div>

      {loading && !data ? (
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-zinc-400" />
        </div>
      ) : data ? (
        <div className="space-y-8">
          {/* Health Status Banner */}
          <div
            className={cn(
              "rounded-xl border-2 p-6",
              healthConfig.borderColor,
              healthConfig.bgColor
            )}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div
                  className={cn(
                    "flex h-16 w-16 items-center justify-center rounded-full",
                    healthConfig.bgColor
                  )}
                >
                  <HealthIcon className={cn("h-8 w-8", healthConfig.color)} />
                </div>
                <div>
                  <h2 className={cn("text-2xl font-bold", healthConfig.color)}>
                    {healthConfig.label}
                  </h2>
                  <p className="text-zinc-600 dark:text-zinc-400">
                    {data.health.message}
                  </p>
                </div>
              </div>
              {data.stats.lastSuccessfulLead && (
                <div className="text-right">
                  <p className="text-sm text-zinc-500">Laatste succesvolle lead</p>
                  <p className="font-medium">
                    {formatRelativeTime(data.stats.lastSuccessfulLead)}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-100 dark:bg-violet-900/30">
                  <TrendingUp className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                </div>
                <span className="text-sm text-zinc-500">Laatste 24 uur</span>
              </div>
              <p className="text-3xl font-bold">{data.stats.last24Hours.total}</p>
              <p className="text-sm text-zinc-500">leads ontvangen</p>
            </div>

            <div className="rounded-lg border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30">
                  <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <span className="text-sm text-zinc-500">Verwerkt</span>
              </div>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                {data.stats.last24Hours.completed}
              </p>
              <p className="text-sm text-zinc-500">
                {data.stats.last24Hours.total > 0
                  ? `${((data.stats.last24Hours.completed / data.stats.last24Hours.total) * 100).toFixed(0)}% succes rate`
                  : "laatste 24 uur"}
              </p>
            </div>

            <div className="rounded-lg border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 dark:bg-red-900/30">
                  <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                </div>
                <span className="text-sm text-zinc-500">Mislukt</span>
              </div>
              <p className="text-3xl font-bold text-red-600 dark:text-red-400">
                {data.stats.last24Hours.failed}
              </p>
              <p className="text-sm text-zinc-500">
                {data.health.errorRate.toFixed(1)}% error rate
              </p>
            </div>

            <div className="rounded-lg border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-900/30">
                  <Zap className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                </div>
                <span className="text-sm text-zinc-500">Laatste uur</span>
              </div>
              <p className="text-3xl font-bold">{data.stats.lastHour}</p>
              <p className="text-sm text-zinc-500">leads ontvangen</p>
            </div>
          </div>

          {/* Chart + Pages */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Daily Leads Chart */}
            <div className="lg:col-span-2 rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="text-lg font-semibold mb-4">Leads per dag (laatste 7 dagen)</h3>
              {data.dailyLeads && data.dailyLeads.length > 0 ? (
                <div className="flex items-end gap-2 h-48">
                  {data.dailyLeads.map((day, i) => {
                    const total = Number(day.total) || 0;
                    const completed = Number(day.completed) || 0;
                    const failed = Number(day.failed) || 0;
                    const height = (total / maxDaily) * 100;
                    const completedHeight = total > 0 ? (completed / total) * height : 0;
                    const failedHeight = total > 0 ? (failed / total) * height : 0;

                    return (
                      <div key={i} className="flex-1 flex flex-col items-center">
                        <div
                          className="w-full relative rounded-t"
                          style={{ height: `${height}%`, minHeight: total > 0 ? "4px" : "0" }}
                        >
                          <div
                            className="absolute bottom-0 w-full bg-green-500 rounded-t"
                            style={{ height: `${completedHeight}%` }}
                          />
                          <div
                            className="absolute bottom-0 w-full bg-red-500 rounded-t opacity-80"
                            style={{
                              height: `${failedHeight}%`,
                              bottom: `${completedHeight}%`,
                            }}
                          />
                        </div>
                        <div className="mt-2 text-xs text-zinc-500">
                          {new Date(day.date).toLocaleDateString("nl-NL", {
                            weekday: "short",
                          })}
                        </div>
                        <div className="text-xs font-medium">{total}</div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="flex h-48 items-center justify-center text-zinc-500">
                  Geen data beschikbaar
                </div>
              )}
              <div className="flex gap-4 mt-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded bg-green-500" />
                  <span className="text-zinc-500">Verwerkt</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded bg-red-500" />
                  <span className="text-zinc-500">Mislukt</span>
                </div>
              </div>
            </div>

            {/* Connected Pages */}
            <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <div className="flex items-center gap-2 mb-4">
                <Server className="h-5 w-5 text-zinc-500" />
                <h3 className="text-lg font-semibold">Verbonden Pagina&apos;s</h3>
              </div>
              {data.pages.length > 0 ? (
                <div className="space-y-3">
                  {data.pages.map((page) => (
                    <div
                      key={page.id}
                      className="flex items-center justify-between p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg"
                    >
                      <div>
                        <p className="font-medium">{page.pageName}</p>
                        <p className="text-xs text-zinc-500 font-mono">
                          {page.pageId}
                        </p>
                      </div>
                      {page.isActive ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      ) : (
                        <XCircle className="h-5 w-5 text-zinc-400" />
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-zinc-500 text-center py-8">
                  Geen pagina&apos;s verbonden
                </p>
              )}
              {data.connection && (
                <div className="mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-700">
                  <p className="text-sm text-zinc-500">
                    Verbonden sinds{" "}
                    <span className="font-medium">
                      {formatDate(data.connection.connectedAt)}
                    </span>
                  </p>
                  {data.connection.expiresAt && (
                    <p className="text-sm text-zinc-500 mt-1">
                      Token verloopt{" "}
                      <span className="font-medium">
                        {formatDate(data.connection.expiresAt)}
                      </span>
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Recent Events */}
          <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <h3 className="text-lg font-semibold mb-4">Recente Webhook Events</h3>
            {data.recentEvents.length > 0 ? (
              <div className="space-y-2">
                {data.recentEvents.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-center justify-between p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      {event.status === "processed" ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      ) : event.status === "failed" ? (
                        <XCircle className="h-5 w-5 text-red-500" />
                      ) : (
                        <Clock className="h-5 w-5 text-amber-500" />
                      )}
                      <div>
                        <p className="font-medium capitalize">{event.status}</p>
                        <p className="text-sm text-zinc-500">
                          {formatDate(event.createdAt)}
                        </p>
                      </div>
                    </div>
                    {event.processedAt && (
                      <span className="text-sm text-zinc-500">
                        Verwerkt: {formatRelativeTime(event.processedAt)}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-zinc-500 text-center py-8">
                Geen recente events
              </p>
            )}
          </div>

          {/* Quick Links */}
          <div className="flex gap-4">
            <Link href="/crm/settings/integrations/meta/failed-leads">
              <Button variant="outline">
                <AlertTriangle className="mr-2 h-4 w-4" />
                Bekijk Mislukte Leads ({data.stats.last24Hours.failed})
              </Button>
            </Link>
            <Link href="/crm/settings/integrations">
              <Button variant="outline">
                Terug naar Integraties
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-zinc-500">Kon health status niet laden</p>
        </div>
      )}
    </div>
  );
}
