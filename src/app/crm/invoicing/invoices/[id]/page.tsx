import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InvoiceActions } from "@/components/invoicing/invoice-actions";
import { getInvoice } from "@/lib/actions/invoicing";
import { format, isPast } from "date-fns";
import { nl } from "date-fns/locale";

function formatCurrency(amount: string | number) {
  const num = typeof amount === "string" ? parseFloat(amount) : amount;
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
  }).format(num);
}

const statusColors: Record<string, string> = {
  draft: "bg-zinc-100 text-zinc-700",
  sent: "bg-blue-100 text-blue-700",
  viewed: "bg-yellow-100 text-yellow-700",
  paid: "bg-green-100 text-green-700",
  overdue: "bg-red-100 text-red-700",
  cancelled: "bg-zinc-100 text-zinc-500",
};

const statusLabels: Record<string, string> = {
  draft: "Concept",
  sent: "Verzonden",
  viewed: "Bekeken",
  paid: "Betaald",
  overdue: "Verlopen",
  cancelled: "Geannuleerd",
};

async function InvoiceDetail({ id }: { id: number }) {
  const invoice = await getInvoice(id);

  if (!invoice) {
    notFound();
  }

  const isOverdue = invoice.status === "sent" && isPast(new Date(invoice.dueDate));
  const displayStatus = isOverdue ? "overdue" : invoice.status;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/crm/invoicing/invoices">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-semibold">{invoice.invoiceNumber}</h2>
              <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusColors[displayStatus]}`}>
                {statusLabels[displayStatus]}
              </span>
            </div>
            <p className="text-sm text-zinc-500">
              {invoice.contact?.company ||
                `${invoice.contact?.firstName ?? ""} ${invoice.contact?.lastName ?? ""}`}
            </p>
          </div>
        </div>

        <InvoiceActions invoiceId={invoice.id} status={invoice.status} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Line Items */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Regelitems</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {invoice.lineItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between rounded-lg border border-zinc-200 p-3 dark:border-zinc-800"
                  >
                    <div className="flex-1">
                      <p className="font-medium">{item.description}</p>
                      <p className="text-sm text-zinc-500">
                        {item.quantity} {item.unit} × {formatCurrency(item.unitPrice)} ({item.taxRate}% BTW)
                      </p>
                    </div>
                    <p className="font-medium">{formatCurrency(item.total)}</p>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="mt-6 space-y-2 border-t border-zinc-200 pt-4 dark:border-zinc-800">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500">Subtotaal</span>
                  <span>{formatCurrency(invoice.subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500">BTW</span>
                  <span>{formatCurrency(invoice.taxAmount)}</span>
                </div>
                {parseFloat(invoice.discountAmount ?? "0") > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Korting</span>
                    <span>-{formatCurrency(invoice.discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold">
                  <span>Totaal</span>
                  <span>{formatCurrency(invoice.total)}</span>
                </div>
                {parseFloat(invoice.amountPaid ?? "0") > 0 && (
                  <>
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Betaald</span>
                      <span>-{formatCurrency(invoice.amountPaid)}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold">
                      <span>Openstaand</span>
                      <span className={parseFloat(invoice.amountDue ?? "0") > 0 ? "text-red-600" : "text-green-600"}>
                        {formatCurrency(invoice.amountDue)}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Payments */}
          {invoice.payments && invoice.payments.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Betalingen</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {invoice.payments.map((payment) => (
                    <div
                      key={payment.id}
                      className="flex items-center justify-between rounded-lg border border-green-200 bg-green-50 p-3 dark:border-green-800 dark:bg-green-900/20"
                    >
                      <div>
                        <p className="font-medium">{formatCurrency(payment.amount)}</p>
                        <p className="text-sm text-zinc-500">
                          {format(new Date(payment.paymentDate), "d MMMM yyyy", { locale: nl })}
                          {payment.paymentMethod && ` • ${payment.paymentMethod}`}
                        </p>
                      </div>
                      <CreditCard className="h-5 w-5 text-green-600" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Content */}
          {(invoice.introduction || invoice.terms) && (
            <Card>
              <CardContent className="pt-6 space-y-4">
                {invoice.introduction && (
                  <div>
                    <h4 className="mb-1 text-sm font-medium text-zinc-500">Introductie</h4>
                    <p className="whitespace-pre-wrap text-sm">{invoice.introduction}</p>
                  </div>
                )}
                {invoice.terms && (
                  <div>
                    <h4 className="mb-1 text-sm font-medium text-zinc-500">Voorwaarden</h4>
                    <p className="whitespace-pre-wrap text-sm">{invoice.terms}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-zinc-500">Factuurdatum</p>
                <p className="font-medium">
                  {format(new Date(invoice.issueDate), "d MMMM yyyy", { locale: nl })}
                </p>
              </div>
              <div>
                <p className="text-sm text-zinc-500">Vervaldatum</p>
                <p className={`font-medium ${isOverdue ? "text-red-600" : ""}`}>
                  {format(new Date(invoice.dueDate), "d MMMM yyyy", { locale: nl })}
                  {isOverdue && " (verlopen)"}
                </p>
              </div>
              <div>
                <p className="text-sm text-zinc-500">Betalingstermijn</p>
                <p className="font-medium">{invoice.paymentTerms} dagen</p>
              </div>
              {invoice.sentAt && (
                <div>
                  <p className="text-sm text-zinc-500">Verzonden op</p>
                  <p className="font-medium">
                    {format(new Date(invoice.sentAt), "d MMMM yyyy", { locale: nl })}
                  </p>
                </div>
              )}
              {invoice.paidAt && (
                <div>
                  <p className="text-sm text-zinc-500">Betaald op</p>
                  <p className="font-medium text-green-600">
                    {format(new Date(invoice.paidAt), "d MMMM yyyy", { locale: nl })}
                  </p>
                </div>
              )}
              {invoice.quotation && (
                <div>
                  <p className="text-sm text-zinc-500">Gekoppelde offerte</p>
                  <Link
                    href={`/crm/invoicing/quotations/${invoice.quotation.id}`}
                    className="font-medium text-violet-600 hover:underline"
                  >
                    {invoice.quotation.quotationNumber}
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>

          {invoice.notes && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Interne notities</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap text-sm">{invoice.notes}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

export default function InvoiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-violet-500 border-t-transparent" />
        </div>
      }
    >
      <InvoiceDetailWrapper params={params} />
    </Suspense>
  );
}

async function InvoiceDetailWrapper({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <InvoiceDetail id={parseInt(id)} />;
}
