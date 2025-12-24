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
  getRevenueAnalytics,
  getRevenueByMonth,
  getGrowthMetrics,
  getPaymentHistory,
} from "@/lib/actions/admin";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  BarChart3,
  Users,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Receipt,
  Sparkles,
  Building2,
  UserCheck,
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

export default async function RevenueDashboard() {
  const [analytics, revenueByMonth, growth, payments] = await Promise.all([
    getRevenueAnalytics(),
    getRevenueByMonth(6),
    getGrowthMetrics(),
    getPaymentHistory(15),
  ]);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold">Revenue Analytics</h1>
          <Badge className="bg-gradient-to-r from-red-500 to-orange-500 text-white">
            NEW
          </Badge>
        </div>
        <p className="text-zinc-500">Omzet, groei en financiële metrics</p>
      </div>

      {/* Main Stats Grid */}
      <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Total Revenue */}
        <div className="dashboard-stat-card rounded-xl border border-emerald-200/50 bg-gradient-to-br from-emerald-50/80 to-green-50/80 p-5 backdrop-blur-sm dark:border-emerald-900/50 dark:from-emerald-950/50 dark:to-green-950/50">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-zinc-500">Totale Omzet</p>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl font-bold tracking-tight text-emerald-700 dark:text-emerald-400">
                  {formatCurrency(analytics.yearlyRevenue)}
                </span>
              </div>
              <p className="mt-1 text-xs text-zinc-400">dit jaar</p>
              <div className="mt-2 text-xs text-zinc-500">
                All-time: {formatCurrency(analytics.totalRevenue)}
              </div>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-green-500">
              <DollarSign className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>

        {/* Monthly Revenue */}
        <div className="dashboard-stat-card rounded-xl border border-blue-200/50 bg-gradient-to-br from-blue-50/80 to-cyan-50/80 p-5 backdrop-blur-sm dark:border-blue-900/50 dark:from-blue-950/50 dark:to-cyan-950/50">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-zinc-500">Maandelijkse Omzet</p>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl font-bold tracking-tight text-blue-700 dark:text-blue-400">
                  {formatCurrency(analytics.monthlyRevenue)}
                </span>
              </div>
              <p className="mt-1 text-xs text-zinc-400">deze maand</p>
              <div className="mt-2 text-xs text-zinc-500">
                Vorige: {formatCurrency(analytics.lastMonthRevenue)}
              </div>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500">
              <Calendar className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>

        {/* MoM Growth */}
        <div className={`dashboard-stat-card rounded-xl border p-5 backdrop-blur-sm ${
          analytics.momGrowth >= 0
            ? "border-green-200/50 bg-gradient-to-br from-green-50/80 to-emerald-50/80 dark:border-green-900/50 dark:from-green-950/50 dark:to-emerald-950/50"
            : "border-red-200/50 bg-gradient-to-br from-red-50/80 to-orange-50/80 dark:border-red-900/50 dark:from-red-950/50 dark:to-orange-950/50"
        }`}>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-zinc-500">MoM Groei</p>
              <div className="mt-2 flex items-baseline gap-2">
                <span className={`text-2xl font-bold tracking-tight ${
                  analytics.momGrowth >= 0
                    ? "text-green-700 dark:text-green-400"
                    : "text-red-700 dark:text-red-400"
                }`}>
                  {analytics.momGrowth >= 0 ? "+" : ""}{analytics.momGrowth}%
                </span>
                {analytics.momGrowth >= 0 ? (
                  <ArrowUpRight className="h-4 w-4 text-green-500" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 text-red-500" />
                )}
              </div>
              <p className="mt-1 text-xs text-zinc-400">vs vorige maand</p>
              <div className="mt-2 text-xs text-zinc-500">
                MRR: {formatCurrency(analytics.mrr)}
              </div>
            </div>
            <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
              analytics.momGrowth >= 0
                ? "bg-gradient-to-br from-green-500 to-emerald-500"
                : "bg-gradient-to-br from-red-500 to-orange-500"
            }`}>
              {analytics.momGrowth >= 0 ? (
                <TrendingUp className="h-5 w-5 text-white" />
              ) : (
                <TrendingDown className="h-5 w-5 text-white" />
              )}
            </div>
          </div>
        </div>

        {/* ARPU */}
        <div className="dashboard-stat-card rounded-xl border border-violet-200/50 bg-gradient-to-br from-violet-50/80 to-purple-50/80 p-5 backdrop-blur-sm dark:border-violet-900/50 dark:from-violet-950/50 dark:to-purple-950/50">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-zinc-500">ARPU</p>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl font-bold tracking-tight text-violet-700 dark:text-violet-400">
                  {formatCurrency(analytics.arpu)}
                </span>
              </div>
              <p className="mt-1 text-xs text-zinc-400">per klant/maand</p>
              <div className="mt-2 text-xs text-zinc-500">
                {analytics.activeAgencies + analytics.activeDirectUsers} actieve klanten
              </div>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-purple-500">
              <Users className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* MRR Breakdown */}
      <div className="mb-8 grid gap-4 md:grid-cols-2">
        {/* Agency MRR */}
        <Card className="border-violet-200/30 bg-gradient-to-br from-violet-50/30 to-purple-50/30 dark:border-violet-900/30 dark:from-violet-950/20 dark:to-purple-950/20">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <Building2 className="h-4 w-4 text-violet-500" />
              Agencies (Whitelabel)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-violet-600 dark:text-violet-400">
                  {formatCurrency(analytics.agencyMRR)}
                </p>
                <p className="text-xs text-zinc-500">MRR van agencies</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold">{analytics.activeAgencies}</p>
                <p className="text-xs text-zinc-500">actief</p>
              </div>
            </div>
            <div className="mt-3 text-xs text-zinc-400">
              Tiers: €97 / €297 / €497 per maand
            </div>
          </CardContent>
        </Card>

        {/* Direct User MRR */}
        <Card className="border-emerald-200/30 bg-gradient-to-br from-emerald-50/30 to-green-50/30 dark:border-emerald-900/30 dark:from-emerald-950/20 dark:to-green-950/20">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <UserCheck className="h-4 w-4 text-emerald-500" />
              Directe Gebruikers (ZZP/MKB)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                  {formatCurrency(analytics.directUserMRR)}
                </p>
                <p className="text-xs text-zinc-500">MRR van directe gebruikers</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold">{analytics.activeDirectUsers}</p>
                <p className="text-xs text-zinc-500">actief</p>
              </div>
            </div>
            <div className="mt-3 text-xs text-zinc-400">
              Tiers: Free / €29 Pro / €99 Enterprise
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Growth Metrics Row */}
      <div className="mb-8 grid gap-4 md:grid-cols-3">
        {/* New Agencies */}
        <Card className="border-green-200/30 bg-gradient-to-br from-green-50/30 to-emerald-50/30 dark:border-green-900/30 dark:from-green-950/20 dark:to-emerald-950/20">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <Sparkles className="h-4 w-4 text-green-500" />
              Nieuwe Agencies
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {growth.newLast30Days}
                </p>
                <p className="text-xs text-zinc-500">30 dagen</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600/70 dark:text-green-400/70">
                  {growth.newPrev30Days}
                </p>
                <p className="text-xs text-zinc-500">vorige 30d</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600/50 dark:text-green-400/50">
                  {growth.newLast90Days}
                </p>
                <p className="text-xs text-zinc-500">90 dagen</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Net Growth */}
        <Card className={`${
          growth.netGrowth30Days >= 0
            ? "border-blue-200/30 bg-gradient-to-br from-blue-50/30 to-cyan-50/30 dark:border-blue-900/30 dark:from-blue-950/20 dark:to-cyan-950/20"
            : "border-amber-200/30 bg-gradient-to-br from-amber-50/30 to-orange-50/30 dark:border-amber-900/30 dark:from-amber-950/20 dark:to-orange-950/20"
        }`}>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              {growth.netGrowth30Days >= 0 ? (
                <TrendingUp className="h-4 w-4 text-blue-500" />
              ) : (
                <TrendingDown className="h-4 w-4 text-amber-500" />
              )}
              Netto Groei
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className={`text-2xl font-bold ${
                  growth.netGrowth30Days >= 0
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-amber-600 dark:text-amber-400"
                }`}>
                  {growth.netGrowth30Days >= 0 ? "+" : ""}{growth.netGrowth30Days}
                </p>
                <p className="text-xs text-zinc-500">30 dagen</p>
              </div>
              <div>
                <p className={`text-2xl font-bold ${
                  growth.growthRateChange >= 0
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}>
                  {growth.growthRateChange >= 0 ? "+" : ""}{growth.growthRateChange}%
                </p>
                <p className="text-xs text-zinc-500">vs vorige periode</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Churn */}
        <Card className="border-red-200/30 bg-gradient-to-br from-red-50/30 to-orange-50/30 dark:border-red-900/30 dark:from-red-950/20 dark:to-orange-950/20">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <TrendingDown className="h-4 w-4 text-red-500" />
              Geannuleerd
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                  {growth.canceledLast30Days}
                </p>
                <p className="text-xs text-zinc-500">30 dagen</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-red-600/70 dark:text-red-400/70">
                  {growth.canceledPrev30Days}
                </p>
                <p className="text-xs text-zinc-500">vorige 30d</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="mb-8 grid gap-4 lg:grid-cols-2">
        {/* Revenue by Month Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-emerald-500" />
              Omzet per Maand
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {revenueByMonth.map((month, index) => {
                const maxRevenue = Math.max(...revenueByMonth.map((m) => m.totalMRR), 1);
                const percentage = (month.totalMRR / maxRevenue) * 100;
                const agencyPercentage = month.totalMRR > 0 ? (month.agencyMRR / month.totalMRR) * 100 : 0;
                const prevRevenue = index > 0 ? revenueByMonth[index - 1].totalMRR : month.totalMRR;
                const growth = prevRevenue > 0 ? ((month.totalMRR - prevRevenue) / prevRevenue) * 100 : 0;

                return (
                  <div key={month.month} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{month.month}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                          {formatCurrency(month.totalMRR)}
                        </span>
                        {growth !== 0 && index > 0 && (
                          <span className={`text-xs ${growth > 0 ? "text-green-600" : "text-red-600"}`}>
                            {growth > 0 ? "+" : ""}{growth.toFixed(1)}%
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-0.5">
                      {/* Agency portion */}
                      <div
                        className="h-2 rounded-l-full bg-gradient-to-r from-violet-500 to-purple-500"
                        style={{ width: `${percentage * (agencyPercentage / 100)}%` }}
                        title={`Agencies: ${formatCurrency(month.agencyMRR)}`}
                      />
                      {/* Direct user portion */}
                      <div
                        className="h-2 rounded-r-full bg-gradient-to-r from-emerald-500 to-green-500"
                        style={{ width: `${percentage * ((100 - agencyPercentage) / 100)}%` }}
                        title={`ZZP/MKB: ${formatCurrency(month.directUserMRR)}`}
                      />
                      {/* Remaining space */}
                      <div className="h-2 flex-1 rounded-r-full bg-zinc-100 dark:bg-zinc-800" />
                    </div>
                    <div className="flex gap-3 text-xs text-zinc-400">
                      <span className="flex items-center gap-1">
                        <span className="h-2 w-2 rounded-full bg-violet-500" />
                        Agencies: {formatCurrency(month.agencyMRR)}
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="h-2 w-2 rounded-full bg-emerald-500" />
                        ZZP/MKB: {formatCurrency(month.directUserMRR)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Recent Payments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Receipt className="h-5 w-5 text-blue-500" />
              Recente Betalingen
            </CardTitle>
          </CardHeader>
          <CardContent>
            {payments.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Factuur</TableHead>
                    <TableHead>Agency</TableHead>
                    <TableHead className="text-right">Bedrag</TableHead>
                    <TableHead>Datum</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="font-mono text-xs">
                        {payment.invoiceId}
                      </TableCell>
                      <TableCell className="max-w-[120px] truncate">
                        {payment.agencyName}
                      </TableCell>
                      <TableCell className="text-right font-medium text-green-600 dark:text-green-400">
                        {formatCurrency(payment.amount)}
                      </TableCell>
                      <TableCell className="text-xs text-zinc-500">
                        {formatDate(payment.paidAt)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Receipt className="mb-2 h-8 w-8 text-zinc-300" />
                <p className="text-sm text-zinc-500">Nog geen betalingen</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Summary Stats */}
      <Card className="border-violet-200/30 bg-gradient-to-br from-violet-50/30 to-purple-50/30 dark:border-violet-900/30 dark:from-violet-950/20 dark:to-purple-950/20">
        <CardHeader>
          <CardTitle>Samenvatting</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            <div className="rounded-lg bg-white/50 p-4 dark:bg-zinc-900/50">
              <p className="text-sm text-zinc-500">ARR</p>
              <p className="text-2xl font-bold text-violet-600 dark:text-violet-400">
                {formatCurrency(analytics.arr)}
              </p>
              <p className="text-xs text-zinc-400">jaarlijkse omzet</p>
            </div>
            <div className="rounded-lg bg-white/50 p-4 dark:bg-zinc-900/50">
              <p className="text-sm text-zinc-500">MRR</p>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {formatCurrency(analytics.mrr)}
              </p>
              <p className="text-xs text-zinc-400">maandelijks terugkerend</p>
            </div>
            <div className="rounded-lg bg-white/50 p-4 dark:bg-zinc-900/50">
              <p className="text-sm text-zinc-500">Actieve Agencies</p>
              <p className="text-2xl font-bold text-violet-600 dark:text-violet-400">
                {analytics.activeAgencies}
              </p>
              <p className="text-xs text-zinc-400">{formatCurrency(analytics.agencyMRR)}/mo</p>
            </div>
            <div className="rounded-lg bg-white/50 p-4 dark:bg-zinc-900/50">
              <p className="text-sm text-zinc-500">Directe Gebruikers</p>
              <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                {analytics.activeDirectUsers}
              </p>
              <p className="text-xs text-zinc-400">{formatCurrency(analytics.directUserMRR)}/mo</p>
            </div>
            <div className="rounded-lg bg-white/50 p-4 dark:bg-zinc-900/50">
              <p className="text-sm text-zinc-500">Betaalde Facturen</p>
              <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                {analytics.totalInvoicesPaid}
              </p>
              <p className="text-xs text-zinc-400">totaal verwerkt</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
