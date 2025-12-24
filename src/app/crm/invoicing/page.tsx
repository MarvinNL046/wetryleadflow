import { Suspense } from "react";
import Link from "next/link";
import {
  Receipt,
  FileText,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  ArrowRight,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getInvoicingStats, getInvoices, getQuotations } from "@/lib/actions/invoicing";
import { formatDistanceToNow } from "date-fns";
import { nl } from "date-fns/locale";

function formatCurrency(amount: string | number) {
  const num = typeof amount === "string" ? parseFloat(amount) : amount;
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
  }).format(num);
}

async function InvoicingDashboard() {
  const [stats, recentInvoices, recentQuotations] = await Promise.all([
    getInvoicingStats("month"),
    getInvoices().then((inv) => inv.slice(0, 5)),
    getQuotations().then((q) => q.slice(0, 5)),
  ]);

  const statusColors: Record<string, string> = {
    draft: "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300",
    sent: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    viewed: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    paid: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    overdue: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    cancelled: "bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400",
    accepted: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    rejected: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    expired: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  };

  const statusLabels: Record<string, string> = {
    draft: "Concept",
    sent: "Verzonden",
    viewed: "Bekeken",
    paid: "Betaald",
    overdue: "Verlopen",
    cancelled: "Geannuleerd",
    accepted: "Geaccepteerd",
    rejected: "Afgewezen",
    expired: "Verlopen",
  };

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="flex gap-3">
        <Button asChild>
          <Link href="/crm/invoicing/quotations/new">
            <Plus className="mr-2 h-4 w-4" />
            Nieuwe Offerte
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/crm/invoicing/invoices/new">
            <Plus className="mr-2 h-4 w-4" />
            Nieuwe Factuur
          </Link>
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Gefactureerd (deze maand)
            </CardTitle>
            <Receipt className="h-4 w-4 text-zinc-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(stats.totalInvoiced)}
            </div>
            <p className="text-xs text-zinc-500">
              {stats.invoiceCount} facturen
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Betaald</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(stats.totalPaid)}
            </div>
            <p className="text-xs text-zinc-500">
              {stats.paidCount} facturen betaald
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Openstaand</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {formatCurrency(stats.totalOutstanding)}
            </div>
            {stats.overdueCount > 0 && (
              <p className="text-xs text-red-500">
                {stats.overdueCount} verlopen
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Offerte Conversie
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-violet-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.conversionRate}%</div>
            <p className="text-xs text-zinc-500">
              {stats.acceptedCount} van {stats.quotationCount} geaccepteerd
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Invoices */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recente Facturen</CardTitle>
                <CardDescription>Je laatste facturen</CardDescription>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/crm/invoicing/invoices">
                  Bekijk alle
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {recentInvoices.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Receipt className="mb-3 h-12 w-12 text-zinc-300 dark:text-zinc-600" />
                <p className="text-sm text-zinc-500">
                  Nog geen facturen aangemaakt
                </p>
                <Button size="sm" className="mt-3" asChild>
                  <Link href="/crm/invoicing/invoices/new">
                    <Plus className="mr-2 h-4 w-4" />
                    Eerste factuur maken
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {recentInvoices.map((invoice) => (
                  <Link
                    key={invoice.id}
                    href={`/crm/invoicing/invoices/${invoice.id}`}
                    className="flex items-center justify-between rounded-lg border border-zinc-200 p-3 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900"
                  >
                    <div className="flex items-center gap-3">
                      <div>
                        <p className="font-medium">{invoice.invoiceNumber}</p>
                        <p className="text-sm text-zinc-500">
                          {invoice.contact?.company ||
                            `${invoice.contact?.firstName} ${invoice.contact?.lastName}`}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        {formatCurrency(invoice.total ?? "0")}
                      </p>
                      <span
                        className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                          statusColors[invoice.status]
                        }`}
                      >
                        {statusLabels[invoice.status]}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Quotations */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recente Offertes</CardTitle>
                <CardDescription>Je laatste offertes</CardDescription>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/crm/invoicing/quotations">
                  Bekijk alle
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {recentQuotations.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <FileText className="mb-3 h-12 w-12 text-zinc-300 dark:text-zinc-600" />
                <p className="text-sm text-zinc-500">
                  Nog geen offertes aangemaakt
                </p>
                <Button size="sm" className="mt-3" asChild>
                  <Link href="/crm/invoicing/quotations/new">
                    <Plus className="mr-2 h-4 w-4" />
                    Eerste offerte maken
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {recentQuotations.map((quotation) => (
                  <Link
                    key={quotation.id}
                    href={`/crm/invoicing/quotations/${quotation.id}`}
                    className="flex items-center justify-between rounded-lg border border-zinc-200 p-3 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900"
                  >
                    <div className="flex items-center gap-3">
                      <div>
                        <p className="font-medium">
                          {quotation.quotationNumber}
                        </p>
                        <p className="text-sm text-zinc-500">
                          {quotation.contact?.company ||
                            `${quotation.contact?.firstName} ${quotation.contact?.lastName}`}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        {formatCurrency(quotation.total ?? "0")}
                      </p>
                      <span
                        className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                          statusColors[quotation.status]
                        }`}
                      >
                        {statusLabels[quotation.status]}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function InvoicingPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-violet-500 border-t-transparent" />
        </div>
      }
    >
      <InvoicingDashboard />
    </Suspense>
  );
}
