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
import { Zap, Clock, CheckCircle, XCircle, Loader2 } from "lucide-react";

// Status badge variant mapping
function getStatusBadge(status: string) {
  switch (status) {
    case "pending":
      return { variant: "secondary" as const, icon: Clock, label: "Pending" };
    case "processing":
      return { variant: "default" as const, icon: Loader2, label: "Processing" };
    case "completed":
      return { variant: "outline" as const, icon: CheckCircle, label: "Completed" };
    case "failed":
      return { variant: "destructive" as const, icon: XCircle, label: "Failed" };
    default:
      return { variant: "secondary" as const, icon: Clock, label: status };
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

      {/* Stats */}
      <div className="mb-8 grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-zinc-500">
              <Clock className="h-4 w-4" />
              Pending
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pending}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-zinc-500">
              <Loader2 className="h-4 w-4" />
              Processing
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{processing}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-zinc-500">
              <CheckCircle className="h-4 w-4" />
              Completed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{completed}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-zinc-500">
              <XCircle className="h-4 w-4" />
              Failed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{failed}</div>
          </CardContent>
        </Card>
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
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Zap className="h-4 w-4" />
            Recent Events
          </CardTitle>
        </CardHeader>
        <CardContent>
          {stats.recentEvents.length === 0 ? (
            <div className="py-8 text-center text-zinc-500">
              No outbox events yet. Events will appear here when CRM actions are performed.
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
                          <StatusIcon className="h-3 w-3" />
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
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="text-base">How Automations Work</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
          <p>
            <strong>1. Events are published</strong> - When users perform actions (create contacts, move deals), events are added to the outbox.
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
