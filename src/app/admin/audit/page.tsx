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
import { getAuditLogs, getAuditStats } from "@/lib/actions/admin";
import { formatDistanceToNow } from "date-fns";
import { ScrollText, Activity, TrendingUp, Clock } from "lucide-react";

// Action type color mapping
function getActionBadgeVariant(action: string): "default" | "secondary" | "destructive" | "outline" {
  if (action.includes("deleted")) return "destructive";
  if (action.includes("created")) return "default";
  if (action.includes("moved") || action.includes("updated")) return "secondary";
  return "outline";
}

// Entity type icons/labels
function formatEntityType(type: string): string {
  const typeMap: Record<string, string> = {
    contact: "Contact",
    opportunity: "Opportunity",
    pipeline: "Pipeline",
    note: "Note",
    user: "User",
    membership: "Membership",
    org: "Organization",
    workspace: "Workspace",
  };
  return typeMap[type] || type;
}

// Format action for display
function formatAction(action: string): string {
  return action
    .split(".")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export default async function AdminAuditPage() {
  const [{ logs, total }, stats] = await Promise.all([
    getAuditLogs({ limit: 100 }),
    getAuditStats(),
  ]);

  const recentCount = stats.recentActions.reduce((sum, a) => sum + a.count, 0);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Audit Log</h1>
        <p className="text-zinc-500">Platform-wide activity tracking</p>
      </div>

      {/* Stats Cards */}
      <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="dashboard-stat-card rounded-xl border border-zinc-200/50 bg-white/80 p-5 backdrop-blur-sm dark:border-zinc-800/50 dark:bg-zinc-900/80">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-zinc-500">Total Events</p>
              <p className="mt-2 text-2xl font-bold">{total.toLocaleString("nl-NL")}</p>
            </div>
            <div className="stat-icon-gradient purple flex h-10 w-10 items-center justify-center rounded-lg">
              <ScrollText className="h-5 w-5 text-purple-500" />
            </div>
          </div>
        </div>

        <div className="dashboard-stat-card rounded-xl border border-zinc-200/50 bg-white/80 p-5 backdrop-blur-sm dark:border-zinc-800/50 dark:bg-zinc-900/80">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-zinc-500">Last 7 Days</p>
              <p className="mt-2 text-2xl font-bold text-blue-600">{recentCount}</p>
            </div>
            <div className="stat-icon-gradient blue flex h-10 w-10 items-center justify-center rounded-lg">
              <Activity className="h-5 w-5 text-blue-500" />
            </div>
          </div>
        </div>

        <div className="dashboard-stat-card rounded-xl border border-zinc-200/50 bg-white/80 p-5 backdrop-blur-sm dark:border-zinc-800/50 dark:bg-zinc-900/80">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-zinc-500">Top Action (7d)</p>
              <p className="mt-2 text-lg font-bold">
                {stats.recentActions[0]?.action
                  ? formatAction(stats.recentActions[0].action)
                  : "None"}
              </p>
              {stats.recentActions[0] && (
                <p className="text-xs text-zinc-500">{stats.recentActions[0].count} times</p>
              )}
            </div>
            <div className="stat-icon-gradient green flex h-10 w-10 items-center justify-center rounded-lg">
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
          </div>
        </div>

        <div className="dashboard-stat-card rounded-xl border border-zinc-200/50 bg-white/80 p-5 backdrop-blur-sm dark:border-zinc-800/50 dark:bg-zinc-900/80">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-zinc-500">Avg/Day</p>
              <p className="mt-2 text-2xl font-bold">
                {Math.round(recentCount / 7)}
              </p>
            </div>
            <div className="stat-icon-gradient amber flex h-10 w-10 items-center justify-center rounded-lg">
              <Clock className="h-5 w-5 text-amber-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Activity by Type */}
      {stats.recentActions.length > 0 && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-base">Activity by Type (Last 7 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {stats.recentActions.map((action) => (
                <Badge
                  key={action.action}
                  variant={getActionBadgeVariant(action.action)}
                  className="text-xs"
                >
                  {formatAction(action.action)}: {action.count}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Audit Log Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recent Events</CardTitle>
        </CardHeader>
        <CardContent>
          {logs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
                <ScrollText className="h-8 w-8 text-zinc-400" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">No Audit Logs Yet</h3>
              <p className="max-w-sm text-sm text-zinc-500">
                Actions will appear here as users interact with the platform.
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Time</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Entity</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Organization</TableHead>
                  <TableHead>Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {logs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="whitespace-nowrap text-sm text-zinc-500">
                      {formatDistanceToNow(new Date(log.createdAt), { addSuffix: true })}
                    </TableCell>
                    <TableCell>
                      <Badge variant={getActionBadgeVariant(log.action)}>
                        {formatAction(log.action)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">
                        {formatEntityType(log.entityType)}
                        {log.entityId && (
                          <span className="ml-1 font-mono text-xs text-zinc-400">
                            #{log.entityId}
                          </span>
                        )}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">
                        {log.user?.name || log.userEmail || "System"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-zinc-500">
                        {log.org?.name || "-"}
                      </span>
                    </TableCell>
                    <TableCell>
                      {log.metadata ? (
                        <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-800">
                          {(() => {
                            const str = JSON.stringify(log.metadata);
                            return str.length > 50 ? str.slice(0, 50) + "..." : str;
                          })()}
                        </code>
                      ) : null}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
