"use client";

import { useEffect, useState, useTransition } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  getCronJobStats,
  getCronJobConfigs,
  getCronJobHistory,
  triggerCronJob,
  initializeCronJobConfigs,
} from "@/lib/actions/admin";
import {
  Clock,
  Play,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Loader2,
  RefreshCw,
  Timer,
  Activity,
  Zap,
  Settings,
} from "lucide-react";

type CronStats = Awaited<ReturnType<typeof getCronJobStats>>;
type CronConfig = Awaited<ReturnType<typeof getCronJobConfigs>>[number];
type CronRun = Awaited<ReturnType<typeof getCronJobHistory>>["runs"][number];

function formatDuration(ms: number | null): string {
  if (!ms) return "-";
  if (ms < 1000) return `${ms}ms`;
  if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
  return `${Math.floor(ms / 60000)}m ${Math.floor((ms % 60000) / 1000)}s`;
}

function formatRelativeTime(date: Date | null): string {
  if (!date) return "Nooit";
  const now = new Date();
  const diff = now.getTime() - new Date(date).getTime();

  if (diff < 60000) return "Zojuist";
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m geleden`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}u geleden`;
  return `${Math.floor(diff / 86400000)}d geleden`;
}

function getStatusBadge(status: string) {
  switch (status) {
    case "running":
      return (
        <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
          <Loader2 className="mr-1 h-3 w-3 animate-spin" />
          Running
        </Badge>
      );
    case "success":
      return (
        <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
          <CheckCircle2 className="mr-1 h-3 w-3" />
          Success
        </Badge>
      );
    case "failed":
      return (
        <Badge className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
          <XCircle className="mr-1 h-3 w-3" />
          Failed
        </Badge>
      );
    case "timeout":
      return (
        <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
          <AlertTriangle className="mr-1 h-3 w-3" />
          Timeout
        </Badge>
      );
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}

export default function CronJobsMonitor() {
  const [stats, setStats] = useState<CronStats | null>(null);
  const [configs, setConfigs] = useState<CronConfig[]>([]);
  const [history, setHistory] = useState<CronRun[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [triggeringJob, setTriggeringJob] = useState<string | null>(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const [statsData, configsData, historyData] = await Promise.all([
        getCronJobStats(),
        getCronJobConfigs(),
        getCronJobHistory({ limit: 20 }),
      ]);
      setStats(statsData);
      setConfigs(configsData);
      setHistory(historyData.runs);
    } catch (error) {
      console.error("Failed to load cron data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
    // Refresh every 30 seconds
    const interval = setInterval(loadData, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleInitialize = async () => {
    startTransition(async () => {
      await initializeCronJobConfigs();
      await loadData();
    });
  };

  const handleTrigger = async (jobName: string) => {
    setTriggeringJob(jobName);
    try {
      await triggerCronJob(jobName);
      // Wait a bit then refresh
      setTimeout(loadData, 2000);
    } catch (error) {
      console.error("Failed to trigger job:", error);
    }
    setTriggeringJob(null);
  };

  if (loading && !stats) {
    return (
      <div className="flex h-full items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-violet-500" />
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">Cron Jobs Monitor</h1>
            <Badge className="bg-gradient-to-r from-red-500 to-orange-500 text-white">
              NEW
            </Badge>
          </div>
          <p className="text-zinc-500">Achtergrondtaken en scheduled jobs</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => loadData()}
            disabled={loading}
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            Vernieuwen
          </Button>
          {configs.length === 0 && (
            <Button
              size="sm"
              onClick={handleInitialize}
              disabled={isPending}
            >
              <Settings className="mr-2 h-4 w-4" />
              Initialiseren
            </Button>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      {stats && (
        <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Total Jobs */}
          <div className="dashboard-stat-card rounded-xl border border-zinc-200/50 bg-white/80 p-5 backdrop-blur-sm dark:border-zinc-800/50 dark:bg-zinc-900/80">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-zinc-500">Totaal Jobs</p>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-2xl font-bold tracking-tight">
                    {stats.totalJobs}
                  </span>
                </div>
                <p className="mt-1 text-xs text-zinc-400">geconfigureerd</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-purple-500">
                <Clock className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>

          {/* Running Now */}
          <div className={`dashboard-stat-card rounded-xl border p-5 backdrop-blur-sm ${
            stats.runningNow > 0
              ? "border-blue-200/50 bg-gradient-to-br from-blue-50/80 to-cyan-50/80 dark:border-blue-900/50 dark:from-blue-950/50 dark:to-cyan-950/50"
              : "border-zinc-200/50 bg-white/80 dark:border-zinc-800/50 dark:bg-zinc-900/80"
          }`}>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-zinc-500">Actief</p>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className={`text-2xl font-bold tracking-tight ${
                    stats.runningNow > 0 ? "text-blue-600 dark:text-blue-400" : ""
                  }`}>
                    {stats.runningNow}
                  </span>
                  {stats.runningNow > 0 && (
                    <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
                  )}
                </div>
                <p className="mt-1 text-xs text-zinc-400">draaiend nu</p>
              </div>
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                stats.runningNow > 0
                  ? "bg-gradient-to-br from-blue-500 to-cyan-500"
                  : "bg-gradient-to-br from-zinc-400 to-zinc-500"
              }`}>
                <Activity className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>

          {/* Success Rate */}
          <div className={`dashboard-stat-card rounded-xl border p-5 backdrop-blur-sm ${
            stats.successRate24h >= 95
              ? "border-green-200/50 bg-gradient-to-br from-green-50/80 to-emerald-50/80 dark:border-green-900/50 dark:from-green-950/50 dark:to-emerald-950/50"
              : stats.successRate24h >= 80
              ? "border-amber-200/50 bg-gradient-to-br from-amber-50/80 to-orange-50/80 dark:border-amber-900/50 dark:from-amber-950/50 dark:to-orange-950/50"
              : "border-red-200/50 bg-gradient-to-br from-red-50/80 to-orange-50/80 dark:border-red-900/50 dark:from-red-950/50 dark:to-orange-950/50"
          }`}>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-zinc-500">Success Rate</p>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className={`text-2xl font-bold tracking-tight ${
                    stats.successRate24h >= 95
                      ? "text-green-600 dark:text-green-400"
                      : stats.successRate24h >= 80
                      ? "text-amber-600 dark:text-amber-400"
                      : "text-red-600 dark:text-red-400"
                  }`}>
                    {stats.successRate24h}%
                  </span>
                </div>
                <p className="mt-1 text-xs text-zinc-400">laatste 24 uur ({stats.runsLast24h} runs)</p>
              </div>
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                stats.successRate24h >= 95
                  ? "bg-gradient-to-br from-green-500 to-emerald-500"
                  : stats.successRate24h >= 80
                  ? "bg-gradient-to-br from-amber-500 to-orange-500"
                  : "bg-gradient-to-br from-red-500 to-orange-500"
              }`}>
                <CheckCircle2 className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>

          {/* Failed Jobs */}
          <div className={`dashboard-stat-card rounded-xl border p-5 backdrop-blur-sm ${
            stats.failedJobs > 0
              ? "border-red-200/50 bg-gradient-to-br from-red-50/80 to-orange-50/80 dark:border-red-900/50 dark:from-red-950/50 dark:to-orange-950/50"
              : "border-zinc-200/50 bg-white/80 dark:border-zinc-800/50 dark:bg-zinc-900/80"
          }`}>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-zinc-500">Problemen</p>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className={`text-2xl font-bold tracking-tight ${
                    stats.failedJobs > 0 ? "text-red-600 dark:text-red-400" : ""
                  }`}>
                    {stats.failedJobs}
                  </span>
                  {stats.failedJobs > 0 && (
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                  )}
                </div>
                <p className="mt-1 text-xs text-zinc-400">jobs met fouten</p>
              </div>
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                stats.failedJobs > 0
                  ? "bg-gradient-to-br from-red-500 to-orange-500"
                  : "bg-gradient-to-br from-zinc-400 to-zinc-500"
              }`}>
                <XCircle className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Job Cards */}
      <div className="mb-8 grid gap-4 md:grid-cols-2">
        {configs.map((config) => (
          <Card
            key={config.id}
            className={`${
              (config.consecutiveFailures || 0) > 0
                ? "border-red-200/50 bg-gradient-to-br from-red-50/30 to-orange-50/30 dark:border-red-900/50 dark:from-red-950/20 dark:to-orange-950/20"
                : ""
            }`}
          >
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Clock className="h-4 w-4 text-violet-500" />
                  {config.jobName}
                </CardTitle>
                {config.latestRun && getStatusBadge(config.latestRun.status)}
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-3 text-sm text-zinc-500">{config.description}</p>

              <div className="mb-4 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-xs text-zinc-400">Schedule</p>
                  <p className="font-mono text-xs">{config.schedule}</p>
                </div>
                <div>
                  <p className="text-xs text-zinc-400">Laatste run</p>
                  <p className="text-xs">{formatRelativeTime(config.lastRunAt)}</p>
                </div>
                {config.latestRun && (
                  <>
                    <div>
                      <p className="text-xs text-zinc-400">Duur</p>
                      <p className="text-xs">{formatDuration(config.latestRun.duration)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-zinc-400">Items verwerkt</p>
                      <p className="text-xs">{config.latestRun.itemsProcessed ?? 0}</p>
                    </div>
                  </>
                )}
              </div>

              {(config.consecutiveFailures || 0) > 0 && (
                <div className="mb-3 rounded-lg bg-red-100 p-2 text-xs text-red-700 dark:bg-red-900/30 dark:text-red-400">
                  <AlertTriangle className="mr-1 inline h-3 w-3" />
                  {config.consecutiveFailures} opeenvolgende fouten
                  {config.latestRun?.errorMessage && (
                    <p className="mt-1 font-mono text-[10px]">
                      {config.latestRun.errorMessage.slice(0, 100)}
                      {config.latestRun.errorMessage.length > 100 && "..."}
                    </p>
                  )}
                </div>
              )}

              <Button
                size="sm"
                variant="outline"
                className="w-full"
                onClick={() => handleTrigger(config.jobName)}
                disabled={triggeringJob === config.jobName}
              >
                {triggeringJob === config.jobName ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Starten...
                  </>
                ) : (
                  <>
                    <Play className="mr-2 h-4 w-4" />
                    Nu uitvoeren
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {configs.length === 0 && (
        <Card className="mb-8">
          <CardContent className="flex flex-col items-center justify-center py-8">
            <Zap className="mb-2 h-8 w-8 text-zinc-300" />
            <p className="mb-4 text-sm text-zinc-500">Geen cron jobs geconfigureerd</p>
            <Button onClick={handleInitialize} disabled={isPending}>
              <Settings className="mr-2 h-4 w-4" />
              Initialiseer standaard jobs
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Recent Runs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Timer className="h-5 w-5 text-blue-500" />
            Recente Runs
          </CardTitle>
        </CardHeader>
        <CardContent>
          {history.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Job</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Gestart</TableHead>
                  <TableHead>Duur</TableHead>
                  <TableHead className="text-right">Items</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {history.map((run) => (
                  <TableRow key={run.id}>
                    <TableCell className="font-mono text-sm">
                      {run.jobName}
                    </TableCell>
                    <TableCell>{getStatusBadge(run.status)}</TableCell>
                    <TableCell className="text-sm text-zinc-500">
                      {formatRelativeTime(run.startedAt)}
                    </TableCell>
                    <TableCell className="text-sm">
                      {formatDuration(run.duration)}
                    </TableCell>
                    <TableCell className="text-right text-sm">
                      {run.itemsProcessed ?? 0}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="flex flex-col items-center justify-center py-8">
              <Timer className="mb-2 h-8 w-8 text-zinc-300" />
              <p className="text-sm text-zinc-500">Nog geen runs geregistreerd</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
