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
import { ScrollText, Activity, TrendingUp } from "lucide-react";

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
    deal: "Deal",
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

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Audit Log</h1>
        <p className="text-zinc-500">Platform-wide activity tracking</p>
      </div>

      {/* Stats */}
      <div className="mb-8 grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-zinc-500">
              <ScrollText className="h-4 w-4" />
              Total Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-zinc-500">
              <Activity className="h-4 w-4" />
              Last 7 Days
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.recentActions.reduce((sum, a) => sum + a.count, 0)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-zinc-500">
              <TrendingUp className="h-4 w-4" />
              Top Action (7d)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">
              {stats.recentActions[0]?.action
                ? formatAction(stats.recentActions[0].action)
                : "None"}
            </div>
            {stats.recentActions[0] && (
              <p className="text-sm text-zinc-500">
                {stats.recentActions[0].count} occurrences
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity by Type */}
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
          <CardTitle className="text-base">Recent Events ({total})</CardTitle>
        </CardHeader>
        <CardContent>
          {logs.length === 0 ? (
            <div className="py-8 text-center text-zinc-500">
              No audit logs yet. Actions will appear here as users interact with the platform.
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
