import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getAdminStats } from "@/lib/actions/admin";
import {
  Building2,
  Users,
  UserPlus,
  Kanban,
  DollarSign,
  TrendingUp,
  Link2,
  Activity,
  ArrowRight,
  Zap,
  MapPinOff,
} from "lucide-react";

export default async function AdminDashboard() {
  const stats = await getAdminStats();

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-zinc-500">Platform overview and management</p>
      </div>

      {/* Main Stats Grid */}
      <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Organizations */}
        <Link href="/admin/orgs" className="group">
          <div className="dashboard-stat-card rounded-xl border border-zinc-200/50 bg-white/80 p-5 backdrop-blur-sm transition-all hover:border-violet-200 hover:shadow-lg hover:shadow-violet-500/10 dark:border-zinc-800/50 dark:bg-zinc-900/80 dark:hover:border-violet-800">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-zinc-500">Organizations</p>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-2xl font-bold tracking-tight">{stats.orgs}</span>
                </div>
                <p className="mt-1 text-xs text-zinc-400">Total customers</p>
                <span className="mt-3 inline-flex items-center text-xs font-medium text-violet-500 group-hover:text-violet-600">
                  View all <ArrowRight className="ml-1 h-3 w-3" />
                </span>
              </div>
              <div className="stat-icon-gradient purple flex h-10 w-10 items-center justify-center rounded-lg">
                <Building2 className="h-5 w-5 text-purple-500" />
              </div>
            </div>
          </div>
        </Link>

        {/* Users */}
        <Link href="/admin/users" className="group">
          <div className="dashboard-stat-card rounded-xl border border-zinc-200/50 bg-white/80 p-5 backdrop-blur-sm transition-all hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/10 dark:border-zinc-800/50 dark:bg-zinc-900/80 dark:hover:border-blue-800">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-zinc-500">Users</p>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-2xl font-bold tracking-tight">{stats.users}</span>
                </div>
                <p className="mt-1 text-xs text-zinc-400">Registered accounts</p>
                <span className="mt-3 inline-flex items-center text-xs font-medium text-blue-500 group-hover:text-blue-600">
                  View all <ArrowRight className="ml-1 h-3 w-3" />
                </span>
              </div>
              <div className="stat-icon-gradient blue flex h-10 w-10 items-center justify-center rounded-lg">
                <Users className="h-5 w-5 text-blue-500" />
              </div>
            </div>
          </div>
        </Link>

        {/* Contacts */}
        <div className="dashboard-stat-card rounded-xl border border-zinc-200/50 bg-white/80 p-5 backdrop-blur-sm dark:border-zinc-800/50 dark:bg-zinc-900/80">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-zinc-500">Contacts</p>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl font-bold tracking-tight">
                  {stats.contacts.toLocaleString("nl-NL")}
                </span>
              </div>
              <p className="mt-1 text-xs text-zinc-400">Across all workspaces</p>
            </div>
            <div className="stat-icon-gradient green flex h-10 w-10 items-center justify-center rounded-lg">
              <UserPlus className="h-5 w-5 text-green-500" />
            </div>
          </div>
        </div>

        {/* Opportunities */}
        <div className="dashboard-stat-card rounded-xl border border-zinc-200/50 bg-white/80 p-5 backdrop-blur-sm dark:border-zinc-800/50 dark:bg-zinc-900/80">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-zinc-500">Opportunities</p>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl font-bold tracking-tight">{stats.opportunities}</span>
              </div>
              <p className="mt-1 text-xs text-zinc-400">Active in pipelines</p>
            </div>
            <div className="stat-icon-gradient amber flex h-10 w-10 items-center justify-center rounded-lg">
              <Kanban className="h-5 w-5 text-amber-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Second Row */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Pipeline Value Card */}
        <Card className="border-violet-200/30 bg-gradient-to-br from-violet-50/50 to-blue-50/50 dark:border-violet-900/30 dark:from-violet-950/30 dark:to-blue-950/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-blue-500">
                <DollarSign className="h-4 w-4 text-white" />
              </div>
              Total Pipeline Value
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {new Intl.NumberFormat("nl-NL", {
                style: "currency",
                currency: "EUR",
              }).format(stats.totalPipelineValue)}
            </div>
            <p className="mt-1 text-sm text-zinc-500">
              Combined value of all opportunities across all customers
            </p>
            <div className="mt-4 flex items-center gap-2 text-sm">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <span className="font-medium text-green-600">Active deals</span>
              <Badge variant="secondary" className="ml-auto">
                {stats.opportunities} opportunities
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Quick Links Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-amber-500" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2">
              <Link
                href="/admin/integrations"
                className="group flex items-center gap-3 rounded-lg border border-zinc-200/50 bg-zinc-50/50 p-3 transition-all hover:border-blue-200 hover:bg-blue-50/50 dark:border-zinc-800/50 dark:bg-zinc-900/50 dark:hover:border-blue-900 dark:hover:bg-blue-950/30"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
                  <Link2 className="h-4 w-4 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm font-medium">Integrations</p>
                  <p className="text-xs text-zinc-500">Meta connections</p>
                </div>
                <Badge className="ml-auto bg-gradient-to-r from-red-500 to-orange-500 text-[10px] text-white">
                  NEW
                </Badge>
              </Link>

              <Link
                href="/admin/system"
                className="group flex items-center gap-3 rounded-lg border border-zinc-200/50 bg-zinc-50/50 p-3 transition-all hover:border-green-200 hover:bg-green-50/50 dark:border-zinc-800/50 dark:bg-zinc-900/50 dark:hover:border-green-900 dark:hover:bg-green-950/30"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30">
                  <Activity className="h-4 w-4 text-green-500" />
                </div>
                <div>
                  <p className="text-sm font-medium">System Health</p>
                  <p className="text-xs text-zinc-500">Jobs & webhooks</p>
                </div>
                <Badge className="ml-auto bg-gradient-to-r from-red-500 to-orange-500 text-[10px] text-white">
                  NEW
                </Badge>
              </Link>

              <Link
                href="/admin/audit"
                className="group flex items-center gap-3 rounded-lg border border-zinc-200/50 bg-zinc-50/50 p-3 transition-all hover:border-violet-200 hover:bg-violet-50/50 dark:border-zinc-800/50 dark:bg-zinc-900/50 dark:hover:border-violet-900 dark:hover:bg-violet-950/30"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-100 dark:bg-violet-900/30">
                  <Activity className="h-4 w-4 text-violet-500" />
                </div>
                <div>
                  <p className="text-sm font-medium">Audit Log</p>
                  <p className="text-xs text-zinc-500">Platform activity</p>
                </div>
              </Link>

              <Link
                href="/admin/outbox"
                className="group flex items-center gap-3 rounded-lg border border-zinc-200/50 bg-zinc-50/50 p-3 transition-all hover:border-amber-200 hover:bg-amber-50/50 dark:border-zinc-800/50 dark:bg-zinc-900/50 dark:hover:border-amber-900 dark:hover:bg-amber-950/30"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-900/30">
                  <Zap className="h-4 w-4 text-amber-500" />
                </div>
                <div>
                  <p className="text-sm font-medium">Automations</p>
                  <p className="text-xs text-zinc-500">Event processing</p>
                </div>
              </Link>

              <Link
                href="/admin/leads-resale"
                className="group flex items-center gap-3 rounded-lg border border-zinc-200/50 bg-zinc-50/50 p-3 transition-all hover:border-orange-200 hover:bg-orange-50/50 dark:border-zinc-800/50 dark:bg-zinc-900/50 dark:hover:border-orange-900 dark:hover:bg-orange-950/30"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-900/30">
                  <MapPinOff className="h-4 w-4 text-orange-500" />
                </div>
                <div>
                  <p className="text-sm font-medium">Lead Doorverkoop</p>
                  <p className="text-xs text-zinc-500">Buiten gebied</p>
                </div>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
