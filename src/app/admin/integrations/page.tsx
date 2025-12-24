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
import { getMetaIntegrationStats } from "@/lib/actions/admin";
import { formatDistanceToNow } from "date-fns";
import {
  Link2,
  Facebook,
  CheckCircle,
  AlertTriangle,
  Clock,
  FileText,
  TrendingUp,
  XCircle,
} from "lucide-react";

export default async function AdminIntegrationsPage() {
  const stats = await getMetaIntegrationStats();

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Integrations</h1>
        <p className="text-zinc-500">Meta connections and lead flow overview</p>
      </div>

      {/* Stats Cards */}
      <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="dashboard-stat-card rounded-xl border border-zinc-200/50 bg-white/80 p-5 backdrop-blur-sm dark:border-zinc-800/50 dark:bg-zinc-900/80">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-zinc-500">Active Connections</p>
              <p className="mt-2 text-2xl font-bold text-green-600">{stats.connections.active}</p>
              <p className="mt-1 text-xs text-zinc-500">{stats.connections.total} total</p>
            </div>
            <div className="stat-icon-gradient green flex h-10 w-10 items-center justify-center rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-500" />
            </div>
          </div>
        </div>

        <div className="dashboard-stat-card rounded-xl border border-zinc-200/50 bg-white/80 p-5 backdrop-blur-sm dark:border-zinc-800/50 dark:bg-zinc-900/80">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-zinc-500">Token Expiring</p>
              <p className={`mt-2 text-2xl font-bold ${stats.connections.tokenExpiring > 0 ? "text-amber-600" : ""}`}>
                {stats.connections.tokenExpiring}
              </p>
              <p className="mt-1 text-xs text-zinc-500">Within 7 days</p>
            </div>
            <div className="stat-icon-gradient amber flex h-10 w-10 items-center justify-center rounded-lg">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
            </div>
          </div>
        </div>

        <div className="dashboard-stat-card rounded-xl border border-zinc-200/50 bg-white/80 p-5 backdrop-blur-sm dark:border-zinc-800/50 dark:bg-zinc-900/80">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-zinc-500">Connected Pages</p>
              <p className="mt-2 text-2xl font-bold">{stats.pages.total}</p>
              <p className="mt-1 text-xs text-zinc-500">{stats.pages.webhookActive} with webhooks</p>
            </div>
            <div className="stat-icon-gradient blue flex h-10 w-10 items-center justify-center rounded-lg">
              <Facebook className="h-5 w-5 text-blue-500" />
            </div>
          </div>
        </div>

        <div className="dashboard-stat-card rounded-xl border border-zinc-200/50 bg-white/80 p-5 backdrop-blur-sm dark:border-zinc-800/50 dark:bg-zinc-900/80">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-zinc-500">Forms</p>
              <p className="mt-2 text-2xl font-bold">{stats.forms.total}</p>
              <p className="mt-1 text-xs text-zinc-500">Lead forms synced</p>
            </div>
            <div className="stat-icon-gradient purple flex h-10 w-10 items-center justify-center rounded-lg">
              <FileText className="h-5 w-5 text-purple-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Lead Stats */}
      <div className="mb-8 grid gap-4 md:grid-cols-4">
        <Card className="border-blue-200/30 bg-gradient-to-br from-blue-50/50 to-violet-50/50 dark:border-blue-900/30 dark:from-blue-950/30 dark:to-violet-950/30">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-medium">
              <TrendingUp className="h-4 w-4 text-blue-500" />
              Leads Today
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">{stats.leads.today}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-zinc-600">This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.leads.thisWeek}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-medium">
              <Clock className="h-4 w-4 text-amber-500" />
              Pending
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${stats.leads.pending > 0 ? "text-amber-600" : ""}`}>
              {stats.leads.pending}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-medium">
              <XCircle className="h-4 w-4 text-red-500" />
              Failed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${stats.leads.failed > 0 ? "text-red-600" : ""}`}>
              {stats.leads.failed}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Connections */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Link2 className="h-4 w-4 text-violet-500" />
            Recent Connections
          </CardTitle>
        </CardHeader>
        <CardContent>
          {stats.recentConnections.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-violet-100 dark:from-blue-900/30 dark:to-violet-900/30">
                <Facebook className="h-8 w-8 text-blue-500" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">No Meta Connections Yet</h3>
              <p className="max-w-sm text-sm text-zinc-500">
                When users connect their Facebook/Instagram accounts, their connections will appear here.
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Organization</TableHead>
                  <TableHead>Meta User</TableHead>
                  <TableHead>Pages</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Sync</TableHead>
                  <TableHead>Connected</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stats.recentConnections.map((conn) => (
                  <TableRow key={conn.id}>
                    <TableCell className="font-medium">{conn.orgName}</TableCell>
                    <TableCell>
                      <span className="text-sm text-zinc-600 dark:text-zinc-400">
                        {conn.metaUserName || conn.metaUserId}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{conn.pagesCount} pages</Badge>
                    </TableCell>
                    <TableCell>
                      {conn.isActive ? (
                        <Badge className="gap-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                          <CheckCircle className="h-3 w-3" />
                          Active
                        </Badge>
                      ) : (
                        <Badge className="gap-1 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
                          <XCircle className="h-3 w-3" />
                          Inactive
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-sm text-zinc-500">
                      {conn.lastSyncAt
                        ? formatDistanceToNow(new Date(conn.lastSyncAt), { addSuffix: true })
                        : "Never"}
                    </TableCell>
                    <TableCell className="text-sm text-zinc-500">
                      {formatDistanceToNow(new Date(conn.createdAt), { addSuffix: true })}
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
