import Link from "next/link";
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
import {
  getBillingStats,
  getSubscriptionsByTier,
  getMRRTrend,
  getAllSubscriptions,
} from "@/lib/actions/admin";
import {
  CreditCard,
  TrendingUp,
  TrendingDown,
  Users,
  AlertTriangle,
  Sparkles,
  Building,
  ExternalLink,
  BarChart3,
  UserCheck,
  Building2,
} from "lucide-react";

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
  }).format(amount);
}

function formatDate(date: Date | null): string {
  if (!date) return "-";
  return new Date(date).toLocaleDateString("nl-NL", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function getStatusBadge(status: string | null) {
  switch (status) {
    case "active":
      return (
        <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
          Actief
        </Badge>
      );
    case "trialing":
      return (
        <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
          Trial
        </Badge>
      );
    case "canceled":
      return (
        <Badge className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
          Geannuleerd
        </Badge>
      );
    case "past_due":
      return (
        <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
          Achterstallig
        </Badge>
      );
    default:
      return (
        <Badge className="bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400">
          {status || "Onbekend"}
        </Badge>
      );
  }
}

function getTierBadge(tier: string | null) {
  switch (tier) {
    case "saas_pro":
      return (
        <Badge className="bg-gradient-to-r from-violet-500 to-purple-500 text-white">
          SaaS Pro
        </Badge>
      );
    case "unlimited":
      return (
        <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
          Unlimited
        </Badge>
      );
    case "starter":
    default:
      return (
        <Badge className="bg-gradient-to-r from-zinc-400 to-zinc-500 text-white">
          Starter
        </Badge>
      );
  }
}

export default async function BillingDashboard() {
  let stats = null;
  let tierBreakdown = null;
  let mrrTrend = null;
  let subscriptions = null;

  try {
    stats = await getBillingStats();
  } catch (error) {
    console.error("Failed to load billing stats:", error);
  }

  try {
    tierBreakdown = await getSubscriptionsByTier();
  } catch (error) {
    console.error("Failed to load tier breakdown:", error);
  }

  try {
    mrrTrend = await getMRRTrend(6);
  } catch (error) {
    console.error("Failed to load MRR trend:", error);
  }

  try {
    subscriptions = await getAllSubscriptions({ limit: 20 });
  } catch (error) {
    console.error("Failed to load subscriptions:", error);
  }

  const tierPricing: Record<string, number> = {
    starter: 97,
    unlimited: 297,
    saas_pro: 497,
  };

  // Defensive defaults
  const safeStats = stats ?? {
    mrr: 0,
    arr: 0,
    agencyMRR: 0,
    clientMRR: 0,
    churnRate: 0,
    subscriptions: { total: 0, active: 0, trial: 0, canceled: 0 },
    newThisMonth: 0,
    clientSubscriptions: 0,
    directUserMRR: 0,
    directUsers: {
      total: 0,
      active: 0,
      trial: 0,
      byTier: { free: 0, pro: 0, enterprise: 0 },
    },
    newDirectUsersThisMonth: 0,
  };

  // Direct user tier pricing
  const directUserPricing: Record<string, number> = {
    free: 0,
    pro: 29,
    enterprise: 99,
  };
  const safeTierBreakdown = tierBreakdown ?? {
    starter: { active: 0, trial: 0, canceled: 0, total: 0 },
    unlimited: { active: 0, trial: 0, canceled: 0, total: 0 },
    saas_pro: { active: 0, trial: 0, canceled: 0, total: 0 },
  };
  const safeMrrTrend = mrrTrend ?? [];
  const safeSubscriptions = subscriptions ?? { subscriptions: [], total: 0 };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold">Billing Dashboard</h1>
          <Badge className="bg-gradient-to-r from-red-500 to-orange-500 text-white">
            NEW
          </Badge>
        </div>
        <p className="text-zinc-500">Subscripties, MRR en revenue overzicht</p>
      </div>

      {/* Main Stats Grid */}
      <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* MRR Card */}
        <div className="dashboard-stat-card rounded-xl border border-violet-200/50 bg-gradient-to-br from-violet-50/80 to-purple-50/80 p-5 backdrop-blur-sm dark:border-violet-900/50 dark:from-violet-950/50 dark:to-purple-950/50">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-zinc-500">MRR</p>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl font-bold tracking-tight text-violet-700 dark:text-violet-400">
                  {formatCurrency(safeStats.mrr)}
                </span>
              </div>
              <p className="mt-1 text-xs text-zinc-400">/maand</p>
              <div className="mt-2 flex gap-2 text-xs">
                <span className="text-zinc-500">ARR: {formatCurrency(safeStats.arr)}</span>
              </div>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-purple-500">
              <CreditCard className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>

        {/* Active Subscriptions */}
        <div className="dashboard-stat-card rounded-xl border border-green-200/50 bg-gradient-to-br from-green-50/80 to-emerald-50/80 p-5 backdrop-blur-sm dark:border-green-900/50 dark:from-green-950/50 dark:to-emerald-950/50">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-zinc-500">Actieve Abonnementen</p>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl font-bold tracking-tight text-green-700 dark:text-green-400">
                  {safeStats.subscriptions.active}
                </span>
              </div>
              <p className="mt-1 text-xs text-zinc-400">van {safeStats.subscriptions.total} totaal</p>
              <div className="mt-2 flex gap-2 text-xs">
                <span className="text-blue-600 dark:text-blue-400">
                  {safeStats.subscriptions.trial} trials
                </span>
              </div>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-emerald-500">
              <Users className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>

        {/* Churn Rate */}
        <div className={`dashboard-stat-card rounded-xl border p-5 backdrop-blur-sm ${
          safeStats.churnRate > 5
            ? "border-amber-200/50 bg-gradient-to-br from-amber-50/80 to-orange-50/80 dark:border-amber-900/50 dark:from-amber-950/50 dark:to-orange-950/50"
            : "border-zinc-200/50 bg-white/80 dark:border-zinc-800/50 dark:bg-zinc-900/80"
        }`}>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-zinc-500">Churn Rate</p>
              <div className="mt-2 flex items-baseline gap-2">
                <span className={`text-2xl font-bold tracking-tight ${
                  safeStats.churnRate > 5
                    ? "text-amber-700 dark:text-amber-400"
                    : "text-zinc-900 dark:text-zinc-100"
                }`}>
                  {safeStats.churnRate}%
                </span>
                {safeStats.churnRate > 5 && (
                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                )}
              </div>
              <p className="mt-1 text-xs text-zinc-400">laatste 30 dagen</p>
              <div className="mt-2 flex gap-2 text-xs">
                <span className="text-red-600 dark:text-red-400">
                  {safeStats.subscriptions.canceled} geannuleerd
                </span>
              </div>
            </div>
            <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
              safeStats.churnRate > 5
                ? "bg-gradient-to-br from-amber-500 to-orange-500"
                : "bg-gradient-to-br from-zinc-400 to-zinc-500"
            }`}>
              <TrendingDown className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>

        {/* New This Month */}
        <div className="dashboard-stat-card rounded-xl border border-blue-200/50 bg-gradient-to-br from-blue-50/80 to-cyan-50/80 p-5 backdrop-blur-sm dark:border-blue-900/50 dark:from-blue-950/50 dark:to-cyan-950/50">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-zinc-500">Nieuw Deze Maand</p>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl font-bold tracking-tight text-blue-700 dark:text-blue-400">
                  {safeStats.newThisMonth}
                </span>
                <Sparkles className="h-4 w-4 text-blue-500" />
              </div>
              <p className="mt-1 text-xs text-zinc-400">nieuwe abonnementen</p>
              <div className="mt-2 flex gap-2 text-xs">
                <span className="text-zinc-500">
                  {safeStats.clientSubscriptions} client subs
                </span>
              </div>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Breakdown */}
      <div className="mb-8 grid gap-4 md:grid-cols-2">
        {/* Agency Revenue */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-violet-500" />
              Agencies (Whitelabel)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-zinc-500">MRR van agencies</span>
                <span className="text-xl font-bold text-violet-600 dark:text-violet-400">
                  {formatCurrency(safeStats.agencyMRR)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-500">MRR van agency klanten</span>
                <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                  {formatCurrency(safeStats.clientMRR)}
                </span>
              </div>
              <div className="border-t pt-4">
                <div className="grid grid-cols-4 gap-2 text-center">
                  <div>
                    <p className="text-lg font-bold">{safeStats.subscriptions.total}</p>
                    <p className="text-xs text-zinc-500">Totaal</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-green-600">{safeStats.subscriptions.active}</p>
                    <p className="text-xs text-zinc-500">Actief</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-blue-600">{safeStats.subscriptions.trial}</p>
                    <p className="text-xs text-zinc-500">Trial</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-zinc-400">{safeStats.newThisMonth}</p>
                    <p className="text-xs text-zinc-500">Nieuw</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Direct Users (ZZP/MKB) */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserCheck className="h-5 w-5 text-emerald-500" />
              Directe Gebruikers (ZZP/MKB)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-zinc-500">MRR van directe gebruikers</span>
                <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
                  {formatCurrency(safeStats.directUserMRR)}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center rounded-lg bg-zinc-50 p-3 dark:bg-zinc-800/50">
                <div>
                  <div className="flex items-center justify-center gap-1">
                    <div className="h-2 w-2 rounded-full bg-zinc-400" />
                    <p className="text-lg font-bold">{safeStats.directUsers.byTier.free}</p>
                  </div>
                  <p className="text-xs text-zinc-500">Free (€0)</p>
                </div>
                <div>
                  <div className="flex items-center justify-center gap-1">
                    <div className="h-2 w-2 rounded-full bg-blue-500" />
                    <p className="text-lg font-bold text-blue-600">{safeStats.directUsers.byTier.pro}</p>
                  </div>
                  <p className="text-xs text-zinc-500">Pro (€29)</p>
                </div>
                <div>
                  <div className="flex items-center justify-center gap-1">
                    <div className="h-2 w-2 rounded-full bg-purple-500" />
                    <p className="text-lg font-bold text-purple-600">{safeStats.directUsers.byTier.enterprise}</p>
                  </div>
                  <p className="text-xs text-zinc-500">Enterprise</p>
                </div>
              </div>
              <div className="border-t pt-4">
                <div className="grid grid-cols-4 gap-2 text-center">
                  <div>
                    <p className="text-lg font-bold">{safeStats.directUsers.total}</p>
                    <p className="text-xs text-zinc-500">Totaal</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-green-600">{safeStats.directUsers.active}</p>
                    <p className="text-xs text-zinc-500">Actief</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-blue-600">{safeStats.directUsers.trial}</p>
                    <p className="text-xs text-zinc-500">Trial</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-zinc-400">{safeStats.newDirectUsersThisMonth}</p>
                    <p className="text-xs text-zinc-500">Nieuw</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Second Row */}
      <div className="mb-8 grid gap-4 lg:grid-cols-2">
        {/* MRR Trend Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-violet-500" />
              MRR Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {safeMrrTrend.map((month, index) => {
                const maxMRR = Math.max(...safeMrrTrend.map((m) => m.mrr), 1);
                const percentage = (month.mrr / maxMRR) * 100;
                const prevMRR = index > 0 ? safeMrrTrend[index - 1].mrr : month.mrr;
                const growth = prevMRR > 0 ? ((month.mrr - prevMRR) / prevMRR) * 100 : 0;

                return (
                  <div key={month.month} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{month.month}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-violet-600 dark:text-violet-400">
                          {formatCurrency(month.mrr)}
                        </span>
                        {growth !== 0 && index > 0 && (
                          <span className={`text-xs ${growth > 0 ? "text-green-600" : "text-red-600"}`}>
                            {growth > 0 ? "+" : ""}{growth.toFixed(1)}%
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-violet-500 to-purple-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <p className="text-xs text-zinc-400">{month.agencies} agencies</p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Subscriptions by Tier */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5 text-blue-500" />
              Abonnementen per Tier
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {Object.entries(safeTierBreakdown).map(([tier, data]) => {
                const tierLabels: Record<string, string> = {
                  starter: "Starter",
                  unlimited: "Unlimited",
                  saas_pro: "SaaS Pro",
                };
                const tierColors: Record<string, string> = {
                  starter: "from-zinc-400 to-zinc-500",
                  unlimited: "from-blue-500 to-cyan-500",
                  saas_pro: "from-violet-500 to-purple-500",
                };
                const monthlyRevenue = data.active * tierPricing[tier];

                return (
                  <div key={tier} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`h-3 w-3 rounded-full bg-gradient-to-r ${tierColors[tier]}`} />
                        <span className="font-medium">{tierLabels[tier]}</span>
                        <Badge variant="outline" className="text-xs">
                          €{tierPricing[tier]}/mo
                        </Badge>
                      </div>
                      <span className="font-semibold">
                        {formatCurrency(monthlyRevenue)}/mo
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 rounded-lg bg-zinc-50 p-3 dark:bg-zinc-800/50">
                      <div className="text-center">
                        <p className="text-lg font-bold text-green-600 dark:text-green-400">
                          {data.active}
                        </p>
                        <p className="text-xs text-zinc-500">Actief</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                          {data.trial}
                        </p>
                        <p className="text-xs text-zinc-500">Trial</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-bold text-red-600 dark:text-red-400">
                          {data.canceled}
                        </p>
                        <p className="text-xs text-zinc-500">Geannuleerd</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Subscriptions Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Alle Agencies</CardTitle>
            <Badge variant="outline">{safeSubscriptions.total} totaal</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Agency</TableHead>
                <TableHead>Tier</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-center">Orgs</TableHead>
                <TableHead className="text-center">Members</TableHead>
                <TableHead>Aangemaakt</TableHead>
                <TableHead className="w-[100px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {safeSubscriptions.subscriptions.map((sub) => (
                <TableRow key={sub.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{sub.name}</p>
                      <p className="text-xs text-zinc-500">{sub.subdomain}.wetryleadflow.com</p>
                    </div>
                  </TableCell>
                  <TableCell>{getTierBadge(sub.tier)}</TableCell>
                  <TableCell>{getStatusBadge(sub.subscriptionStatus)}</TableCell>
                  <TableCell className="text-center">{sub.orgCount}</TableCell>
                  <TableCell className="text-center">{sub.memberCount}</TableCell>
                  <TableCell className="text-zinc-500">
                    {formatDate(sub.createdAt)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/agencies?id=${sub.id}`}
                        className="text-violet-500 hover:text-violet-600"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                      {sub.stripeCustomerId && (
                        <a
                          href={`https://dashboard.stripe.com/customers/${sub.stripeCustomerId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-zinc-400 hover:text-zinc-600"
                          title="Open in Stripe"
                        >
                          <CreditCard className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {safeSubscriptions.total > 20 && (
            <div className="mt-4 text-center">
              <Link
                href="/admin/agencies"
                className="text-sm text-violet-500 hover:text-violet-600"
              >
                Bekijk alle {safeSubscriptions.total} agencies →
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
