import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getOutboxStats } from "@/lib/actions/admin";
import { formatDistanceToNow } from "date-fns";
import { Zap, Clock, CheckCircle, XCircle, Loader2, AlertTriangle } from "lucide-react";

// Status badge variant mapping
function getStatusBadge(status: string) {
  switch (status) {
    case "pending":
      return { variant: "secondary" as const, icon: Clock, label: "Pending", color: "text-zinc-500" };
    case "processing":
      return { variant: "default" as const, icon: Loader2, label: "Processing", color: "text-blue-500" };
    case "completed":
      return { variant: "outline" as const, icon: CheckCircle, label: "Completed", color: "text-green-500" };
    case "failed":
      return { variant: "destructive" as const, icon: XCircle, label: "Failed", color: "text-red-500" };
    default:
      return { variant: "secondary" as const, icon: Clock, label: status, color: "text-zinc-500" };
  }
}

// Format event type for display
function formatEventType(eventType: string): string {
  return eventType
    .split(".")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export default async function AdminOutboxPage() {
  const stats = await getOutboxStats();

  const pending = stats.statusCounts.pending || 0;
  const processing = stats.statusCounts.processing || 0;
  const completed = stats.statusCounts.completed || 0;
  const failed = stats.statusCounts.failed || 0;

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Automations</h1>
        <p className="text-zinc-500">Event outbox and automation processing</p>
      </div>

      {/* Stats Cards */}
      <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="dashboard-stat-card rounded-xl border border-zinc-200/50 bg-white/80 p-5 backdrop-blur-sm dark:border-zinc-800/50 dark:bg-zinc-900/80">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-zinc-500">Pending</p>
              <p className="mt-2 text-2xl font-bold">{pending}</p>
            </div>
            <div className="stat-icon-gradient amber flex h-10 w-10 items-center justify-center rounded-lg">
              <Clock className="h-5 w-5 text-amber-500" />
            </div>
          </div>
        </div>

        <div className="dashboard-stat-card rounded-xl border border-zinc-200/50 bg-white/80 p-5 backdrop-blur-sm dark:border-zinc-800/50 dark:bg-zinc-900/80">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-zinc-500">Processing</p>
              <p className="mt-2 text-2xl font-bold text-blue-600">{processing}</p>
            </div>
            <div className="stat-icon-gradient blue flex h-10 w-10 items-center justify-center rounded-lg">
              <Loader2 className="h-5 w-5 text-blue-500" />
            </div>
          </div>
        </div>

        <div className="dashboard-stat-card rounded-xl border border-zinc-200/50 bg-white/80 p-5 backdrop-blur-sm dark:border-zinc-800/50 dark:bg-zinc-900/80">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-zinc-500">Completed</p>
              <p className="mt-2 text-2xl font-bold text-green-600">{completed}</p>
            </div>
            <div className="stat-icon-gradient green flex h-10 w-10 items-center justify-center rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-500" />
            </div>
          </div>
        </div>

        <div className="dashboard-stat-card rounded-xl border border-zinc-200/50 bg-white/80 p-5 backdrop-blur-sm dark:border-zinc-800/50 dark:bg-zinc-900/80">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-zinc-500">Failed</p>
              <p className="mt-2 text-2xl font-bold text-red-600">{failed}</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-red-100 to-orange-100 dark:from-red-900/30 dark:to-orange-900/30">
              <XCircle className="h-5 w-5 text-red-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Event Types (24h) */}
      {stats.eventTypeCounts.length > 0 && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-base">Event Types (Last 24 Hours)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {stats.eventTypeCounts.map((event) => (
                <Badge key={event.eventType} variant="secondary" className="text-xs">
                  {formatEventType(event.eventType)}: {event.count}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Events Table */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Zap className="h-4 w-4 text-amber-500" />
            Recent Events
          </CardTitle>
        </CardHeader>
        <CardContent>
          {stats.recentEvents.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30">
                <Zap className="h-8 w-8 text-amber-500" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">No Outbox Events Yet</h3>
              <p className="max-w-sm text-sm text-zinc-500">
                Events will appear here when CRM actions are performed.
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Status</TableHead>
                  <TableHead>Event</TableHead>
                  <TableHead>Entity</TableHead>
                  <TableHead>Organization</TableHead>
                  <TableHead>Attempts</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Scheduled</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stats.recentEvents.map((event) => {
                  const statusInfo = getStatusBadge(event.status);
                  const StatusIcon = statusInfo.icon;
                  return (
                    <TableRow key={event.id}>
                      <TableCell>
                        <Badge variant={statusInfo.variant} className="gap-1">
                          <StatusIcon className={`h-3 w-3 ${statusInfo.color}`} />
                          {statusInfo.label}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium">
                          {formatEventType(event.eventType)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">
                          {event.entityType}
                          <span className="ml-1 font-mono text-xs text-zinc-400">
                            #{event.entityId}
                          </span>
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-zinc-500">
                          {event.org?.name || "-"}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className={`text-sm ${event.attempts > 0 ? "text-amber-600" : ""}`}>
                          {event.attempts}/{event.maxAttempts}
                        </span>
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-sm text-zinc-500">
                        {formatDistanceToNow(new Date(event.createdAt), { addSuffix: true })}
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-sm text-zinc-500">
                        {formatDistanceToNow(new Date(event.scheduledFor), { addSuffix: true })}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Info Card */}
      <Card className="border-blue-200/30 bg-gradient-to-br from-blue-50/50 to-violet-50/50 dark:border-blue-900/30 dark:from-blue-950/30 dark:to-violet-950/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <AlertTriangle className="h-4 w-4 text-blue-500" />
            How Automations Work
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
          <p>
            <strong>1. Events are published</strong> - When users perform actions (create contacts, move opportunities), events are added to the outbox.
          </p>
          <p>
            <strong>2. Job runner processes events</strong> - The <code className="rounded bg-zinc-100 px-1 dark:bg-zinc-800">/api/jobs/outbox</code> endpoint processes pending events.
          </p>
          <p>
            <strong>3. QStash schedules processing</strong> - Events are automatically processed within seconds via QStash.
          </p>
          <p>
            <strong>4. Retries on failure</strong> - Failed events are retried with exponential backoff (30s, 60s, 120s).
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
