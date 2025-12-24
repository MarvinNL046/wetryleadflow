import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QuotationActions } from "@/components/invoicing/quotation-actions";
import { getQuotation } from "@/lib/actions/invoicing";
import { format } from "date-fns";
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
  accepted: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
  expired: "bg-orange-100 text-orange-700",
};

const statusLabels: Record<string, string> = {
  draft: "Concept",
  sent: "Verzonden",
  accepted: "Geaccepteerd",
  rejected: "Afgewezen",
  expired: "Verlopen",
};

async function QuotationDetail({ id }: { id: number }) {
  const quotation = await getQuotation(id);

  if (!quotation) {
    notFound();
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/crm/invoicing/quotations">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-semibold">{quotation.quotationNumber}</h2>
              <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusColors[quotation.status]}`}>
                {statusLabels[quotation.status]}
              </span>
            </div>
            <p className="text-sm text-zinc-500">
              {quotation.contact?.company ||
                `${quotation.contact?.firstName ?? ""} ${quotation.contact?.lastName ?? ""}`}
            </p>
          </div>
        </div>

        <QuotationActions
          quotationId={quotation.id}
          status={quotation.status}
          convertedToInvoiceId={quotation.convertedToInvoiceId}
        />
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
                {quotation.lineItems.map((item) => (
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
                  <span>{formatCurrency(quotation.subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500">BTW</span>
                  <span>{formatCurrency(quotation.taxAmount)}</span>
                </div>
                {parseFloat(quotation.discountAmount ?? "0") > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Korting</span>
                    <span>-{formatCurrency(quotation.discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold">
                  <span>Totaal</span>
                  <span>{formatCurrency(quotation.total)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Content */}
          {(quotation.introduction || quotation.terms) && (
            <Card>
              <CardContent className="pt-6 space-y-4">
                {quotation.introduction && (
                  <div>
                    <h4 className="mb-1 text-sm font-medium text-zinc-500">Introductie</h4>
                    <p className="whitespace-pre-wrap text-sm">{quotation.introduction}</p>
                  </div>
                )}
                {quotation.terms && (
                  <div>
                    <h4 className="mb-1 text-sm font-medium text-zinc-500">Voorwaarden</h4>
                    <p className="whitespace-pre-wrap text-sm">{quotation.terms}</p>
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
                <p className="text-sm text-zinc-500">Offertedatum</p>
                <p className="font-medium">
                  {format(new Date(quotation.issueDate), "d MMMM yyyy", { locale: nl })}
                </p>
              </div>
              {quotation.validUntil && (
                <div>
                  <p className="text-sm text-zinc-500">Geldig tot</p>
                  <p className="font-medium">
                    {format(new Date(quotation.validUntil), "d MMMM yyyy", { locale: nl })}
                  </p>
                </div>
              )}
              {quotation.sentAt && (
                <div>
                  <p className="text-sm text-zinc-500">Verzonden op</p>
                  <p className="font-medium">
                    {format(new Date(quotation.sentAt), "d MMMM yyyy", { locale: nl })}
                  </p>
                </div>
              )}
              {quotation.acceptedAt && (
                <div>
                  <p className="text-sm text-zinc-500">Geaccepteerd op</p>
                  <p className="font-medium">
                    {format(new Date(quotation.acceptedAt), "d MMMM yyyy", { locale: nl })}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {quotation.notes && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Interne notities</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap text-sm">{quotation.notes}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

export default function QuotationDetailPage({
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
      <QuotationDetailWrapper params={params} />
    </Suspense>
  );
}

async function QuotationDetailWrapper({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <QuotationDetail id={parseInt(id)} />;
}
