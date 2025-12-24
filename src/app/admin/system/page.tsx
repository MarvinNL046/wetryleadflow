import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getSystemHealth } from "@/lib/actions/admin";
import { formatDistanceToNow } from "date-fns";
import {
  Activity,
  Database,
  Webhook,
  Clock,
  CheckCircle,
  XCircle,
  Loader2,
  AlertTriangle,
  Zap,
} from "lucide-react";

export default async function AdminSystemPage() {
  const rawHealth = await getSystemHealth();

  // Defensive defaults
  const health = rawHealth ?? {
    database: { connectionOk: false },
    webhooks: {
      last24h: { total: 0, processed: 0, failed: 0 },
      byProvider: {},
    },
    jobs: {
      outbox: { pending: 0, processing: 0, completed: 0, failed: 0 },
      metaLeads: { pending: 0, processing: 0, completed: 0, failed: 0 },
    },
    recentErrors: { outbox: [], metaLeads: [] },
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">System Health</h1>
        <p className="text-zinc-500">Monitor jobs, webhooks, and system status</p>
      </div>

      {/* Health Status Cards */}
      <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className={`dashboard-stat-card rounded-xl border p-5 backdrop-blur-sm ${
          health.database.connectionOk
            ? "border-green-200/50 bg-gradient-to-br from-green-50/50 to-emerald-50/50 dark:border-green-900/50 dark:from-green-950/30 dark:to-emerald-950/30"
            : "border-red-200/50 bg-gradient-to-br from-red-50/50 to-orange-50/50 dark:border-red-900/50 dark:from-red-950/30 dark:to-orange-950/30"
        }`}>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-zinc-500">Database</p>
              <div className="mt-2 flex items-center gap-2">
                {health.database.connectionOk ? (
                  <>
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="font-semibold text-green-600">Healthy</span>
                  </>
                ) : (
                  <>
                    <XCircle className="h-5 w-5 text-red-500" />
                    <span className="font-semibold text-red-600">Error</span>
                  </>
                )}
              </div>
            </div>
            <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
              health.database.connectionOk
                ? "stat-icon-gradient green"
                : "bg-gradient-to-br from-red-100 to-orange-100 dark:from-red-900/30 dark:to-orange-900/30"
            }`}>
              <Database className={`h-5 w-5 ${health.database.connectionOk ? "text-green-500" : "text-red-500"}`} />
            </div>
          </div>
        </div>

        <div className="dashboard-stat-card rounded-xl border border-zinc-200/50 bg-white/80 p-5 backdrop-blur-sm dark:border-zinc-800/50 dark:bg-zinc-900/80">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-zinc-500">Webhooks (24h)</p>
              <p className="mt-2 text-2xl font-bold">{health.webhooks.last24h.total}</p>
              <p className="mt-1 text-xs text-zinc-500">
                {health.webhooks.last24h.processed} processed / {health.webhooks.last24h.failed} failed
              </p>
            </div>
            <div className="stat-icon-gradient blue flex h-10 w-10 items-center justify-center rounded-lg">
              <Webhook className="h-5 w-5 text-blue-500" />
            </div>
          </div>
        </div>

        <div className="dashboard-stat-card rounded-xl border border-zinc-200/50 bg-white/80 p-5 backdrop-blur-sm dark:border-zinc-800/50 dark:bg-zinc-900/80">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-zinc-500">Outbox Queue</p>
              <p className={`mt-2 text-2xl font-bold ${health.jobs.outbox.pending > 0 ? "text-amber-600" : ""}`}>
                {health.jobs.outbox.pending}
              </p>
              <p className="mt-1 text-xs text-zinc-500">
                pending / {health.jobs.outbox.failed} failed
              </p>
            </div>
            <div className="stat-icon-gradient amber flex h-10 w-10 items-center justify-center rounded-lg">
              <Clock className="h-5 w-5 text-amber-500" />
            </div>
          </div>
        </div>

        <div className="dashboard-stat-card rounded-xl border border-zinc-200/50 bg-white/80 p-5 backdrop-blur-sm dark:border-zinc-800/50 dark:bg-zinc-900/80">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-zinc-500">Meta Leads Queue</p>
              <p className={`mt-2 text-2xl font-bold ${health.jobs.metaLeads.pending > 0 ? "text-amber-600" : ""}`}>
                {health.jobs.metaLeads.pending}
              </p>
              <p className="mt-1 text-xs text-zinc-500">
                pending / {health.jobs.metaLeads.failed} failed
              </p>
            </div>
            <div className="stat-icon-gradient purple flex h-10 w-10 items-center justify-center rounded-lg">
              <Zap className="h-5 w-5 text-purple-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Job Queues and Errors */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Job Queues */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Activity className="h-4 w-4 text-violet-500" />
              Job Queues
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border p-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-100 dark:bg-violet-900/30">
                    <Loader2 className="h-4 w-4 text-violet-500" />
                  </div>
                  <div>
                    <p className="font-medium">Outbox Processing</p>
                    <p className="text-xs text-zinc-500">/api/jobs/outbox</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{health.jobs.outbox.pending} pending</Badge>
                    {health.jobs.outbox.processing > 0 && (
                      <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                        {health.jobs.outbox.processing} processing
                      </Badge>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-zinc-500">
                    {health.jobs.outbox.completed} completed, {health.jobs.outbox.failed} failed
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-lg border p-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                    <Zap className="h-4 w-4 text-blue-500" />
                  </div>
                  <div>
                    <p className="font-medium">Meta Leads</p>
                    <p className="text-xs text-zinc-500">/api/jobs/meta-leads</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{health.jobs.metaLeads.pending} pending</Badge>
                    {health.jobs.metaLeads.processing > 0 && (
                      <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                        {health.jobs.metaLeads.processing} processing
                      </Badge>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-zinc-500">
                    {health.jobs.metaLeads.completed} completed, {health.jobs.metaLeads.failed} failed
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-lg border p-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                    <Clock className="h-4 w-4 text-green-500" />
                  </div>
                  <div>
                    <p className="font-medium">Follow-ups</p>
                    <p className="text-xs text-zinc-500">/api/jobs/follow-ups</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                    Scheduled
                  </Badge>
                  <p className="mt-1 text-xs text-zinc-500">Daily cron via QStash</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Errors */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              Recent Errors
            </CardTitle>
          </CardHeader>
          <CardContent>
            {health.recentErrors.outbox.length === 0 && health.recentErrors.metaLeads.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                </div>
                <p className="font-medium text-green-600">No Recent Errors</p>
                <p className="mt-1 text-sm text-zinc-500">All systems operating normally</p>
              </div>
            ) : (
              <div className="space-y-3">
                {health.recentErrors.outbox.map((error) => (
                  <div key={`outbox-${error.id}`} className="rounded-lg border border-red-200/50 bg-red-50/50 p-3 dark:border-red-900/50 dark:bg-red-950/20">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-medium text-red-700 dark:text-red-400">
                          Outbox: {error.eventType}
                        </p>
                        <p className="text-xs text-zinc-500">{error.orgName}</p>
                      </div>
                      <Badge variant="destructive" className="text-xs">
                        {error.attempts} attempts
                      </Badge>
                    </div>
                    {error.lastError && (
                      <p className="mt-2 truncate text-xs text-red-600 dark:text-red-400">
                        {error.lastError}
                      </p>
                    )}
                    <p className="mt-1 text-xs text-zinc-400">
                      {formatDistanceToNow(new Date(error.createdAt), { addSuffix: true })}
                    </p>
                  </div>
                ))}

                {health.recentErrors.metaLeads.map((error) => (
                  <div key={`lead-${error.id}`} className="rounded-lg border border-red-200/50 bg-red-50/50 p-3 dark:border-red-900/50 dark:bg-red-950/20">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-medium text-red-700 dark:text-red-400">
                          Meta Lead: {error.leadgenId.slice(0, 12)}...
                        </p>
                        <p className="text-xs text-zinc-500">{error.orgName}</p>
                      </div>
                      <Badge variant="destructive" className="text-xs">
                        {error.retryCount} retries
                      </Badge>
                    </div>
                    {error.errorMessage && (
                      <p className="mt-2 truncate text-xs text-red-600 dark:text-red-400">
                        {error.errorMessage}
                      </p>
                    )}
                    <p className="mt-1 text-xs text-zinc-400">
                      {formatDistanceToNow(new Date(error.createdAt), { addSuffix: true })}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Webhook Providers */}
      {health.webhooks?.byProvider && Object.keys(health.webhooks.byProvider).length > 0 && (
        <Card className="mt-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Webhook className="h-4 w-4 text-blue-500" />
              Webhooks by Provider (24h)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {Object.entries(health.webhooks.byProvider).map(([provider, count]) => (
                <Badge key={provider} variant="secondary" className="text-sm">
                  {provider}: {count}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
