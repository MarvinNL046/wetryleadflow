"use client";

import { useState, useEffect, useTransition, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  FileText,
  Calendar,
  Check,
  Ban,
  RefreshCw,
  ExternalLink,
  Trash2,
  Send,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
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
  getCreditNote,
  issueCreditNote,
  cancelCreditNote,
  markCreditNoteRefunded,
  applyCreditNote,
  deleteCreditNote,
  sendCreditNote,
} from "@/lib/actions/credit-notes";
import { getInvoices } from "@/lib/actions/invoicing";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { formatCurrency } from "@/lib/utils/currency";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const statusLabels: Record<string, string> = {
  draft: "Concept",
  issued: "Uitgegeven",
  applied: "Verrekend",
  refunded: "Terugbetaald",
  cancelled: "Geannuleerd",
};

const statusColors: Record<string, string> = {
  draft: "bg-zinc-100 text-zinc-700",
  issued: "bg-blue-100 text-blue-700",
  applied: "bg-green-100 text-green-700",
  refunded: "bg-purple-100 text-purple-700",
  cancelled: "bg-red-100 text-red-700",
};

type CreditNoteData = NonNullable<Awaited<ReturnType<typeof getCreditNote>>>;

export default function CreditNoteDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [creditNote, setCreditNote] = useState<CreditNoteData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showApplyDialog, setShowApplyDialog] = useState(false);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<string>("");
  const [availableInvoices, setAvailableInvoices] = useState<Array<{
    id: number;
    invoiceNumber: string;
    amountDue: string;
  }>>([]);

  useEffect(() => {
    loadCreditNote();
  }, [resolvedParams.id]);

  async function loadCreditNote() {
    setIsLoading(true);
    try {
      const data = await getCreditNote(parseInt(resolvedParams.id));
      setCreditNote(data);

      // Load invoices for apply dialog
      if (data) {
        const invoices = await getInvoices();
        const unpaidInvoices = invoices
          .filter(
            (inv) =>
              inv.contactId === data.contactId &&
              (inv.status === "sent" || inv.status === "overdue")
          )
          .map((inv) => ({
            id: inv.id,
            invoiceNumber: inv.invoiceNumber,
            amountDue: inv.amountDue,
          }));
        setAvailableInvoices(unpaidInvoices);
      }
    } catch (error) {
      console.error("Failed to load credit note:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleIssue() {
    if (!creditNote) return;
    startTransition(async () => {
      try {
        await issueCreditNote(creditNote.id);
        await loadCreditNote();
      } catch (error) {
        console.error("Failed to issue credit note:", error);
        alert("Er is iets misgegaan bij het uitgeven");
      }
    });
  }

  async function handleCancel() {
    if (!creditNote) return;
    if (!confirm("Weet je zeker dat je deze creditnota wilt annuleren?")) return;
    startTransition(async () => {
      try {
        await cancelCreditNote(creditNote.id);
        await loadCreditNote();
      } catch (error) {
        console.error("Failed to cancel credit note:", error);
        alert("Er is iets misgegaan bij het annuleren");
      }
    });
  }

  async function handleRefund() {
    if (!creditNote) return;
    if (!confirm("Weet je zeker dat je deze creditnota als terugbetaald wilt markeren?")) return;
    startTransition(async () => {
      try {
        await markCreditNoteRefunded(creditNote.id);
        await loadCreditNote();
      } catch (error) {
        console.error("Failed to mark as refunded:", error);
        alert("Er is iets misgegaan");
      }
    });
  }

  async function handleApply() {
    if (!creditNote || !selectedInvoiceId) return;
    startTransition(async () => {
      try {
        await applyCreditNote(creditNote.id, parseInt(selectedInvoiceId));
        setShowApplyDialog(false);
        await loadCreditNote();
      } catch (error) {
        console.error("Failed to apply credit note:", error);
        alert("Er is iets misgegaan bij het verrekenen");
      }
    });
  }

  async function handleDelete() {
    if (!creditNote) return;
    if (!confirm("Weet je zeker dat je deze creditnota wilt verwijderen?")) return;
    startTransition(async () => {
      try {
        await deleteCreditNote(creditNote.id);
        router.push("/crm/invoicing/credit-notes");
      } catch (error) {
        console.error("Failed to delete credit note:", error);
        alert("Er is iets misgegaan bij het verwijderen");
      }
    });
  }

  async function handleSend() {
    if (!creditNote) return;
    if (!creditNote.contact?.email) {
      alert("Contact heeft geen e-mailadres");
      return;
    }
    if (!confirm(`Creditnota versturen naar ${creditNote.contact.email}?`)) return;
    startTransition(async () => {
      try {
        await sendCreditNote(creditNote.id);
        alert("Creditnota is verstuurd!");
        await loadCreditNote();
      } catch (error) {
        console.error("Failed to send credit note:", error);
        alert("Er is iets misgegaan bij het versturen");
      }
    });
  }

  function handleDownload() {
    if (!creditNote) return;
    window.open(`/api/invoicing/pdf/credit-note/${creditNote.id}`, "_blank");
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-violet-500 border-t-transparent" />
      </div>
    );
  }

  if (!creditNote) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h2 className="text-lg font-semibold text-zinc-900 mb-2">
          Creditnota niet gevonden
        </h2>
        <Button asChild>
          <Link href="/crm/invoicing/credit-notes">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Terug naar overzicht
          </Link>
        </Button>
      </div>
    );
  }

  const contactName =
    creditNote.contact?.company ||
    `${creditNote.contact?.firstName || ""} ${creditNote.contact?.lastName || ""}`.trim() ||
    "Onbekend";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/crm/invoicing/credit-notes">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-semibold">
                {creditNote.creditNoteNumber}
              </h2>
              <Badge className={`${statusColors[creditNote.status]} hover:${statusColors[creditNote.status]}`}>
                {statusLabels[creditNote.status] || creditNote.status}
              </Badge>
            </div>
            <p className="text-sm text-zinc-500">{contactName}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {creditNote.status === "draft" && (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={handleIssue}
                disabled={isPending}
              >
                <Check className="mr-2 h-4 w-4" />
                Uitgeven
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDelete}
                disabled={isPending}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Verwijderen
              </Button>
            </>
          )}
          {/* Download PDF - always available */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownload}
          >
            <Download className="mr-2 h-4 w-4" />
            PDF
          </Button>
          {creditNote.status === "issued" && (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={handleSend}
                disabled={isPending || !creditNote.contact?.email}
              >
                <Send className="mr-2 h-4 w-4" />
                Versturen
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowApplyDialog(true)}
                disabled={isPending || availableInvoices.length === 0}
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Verrekenen
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefund}
                disabled={isPending}
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Terugbetaald
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCancel}
                disabled={isPending}
              >
                <Ban className="mr-2 h-4 w-4" />
                Annuleren
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Line Items */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Gecrediteerde items</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Omschrijving</TableHead>
                    <TableHead className="text-right">Aantal</TableHead>
                    <TableHead className="text-right">Prijs</TableHead>
                    <TableHead className="text-right">BTW</TableHead>
                    <TableHead className="text-right">Totaal</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {creditNote.lineItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.description}</TableCell>
                      <TableCell className="text-right">
                        {item.quantity} {item.unit}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(item.unitPrice, creditNote.currency)}
                      </TableCell>
                      <TableCell className="text-right">{item.taxRate}%</TableCell>
                      <TableCell className="text-right font-medium">
                        {formatCurrency(item.total, creditNote.currency)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Totals */}
              <div className="mt-6 border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500">Subtotaal</span>
                  <span>{formatCurrency(creditNote.subtotal, creditNote.currency)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500">BTW</span>
                  <span>{formatCurrency(creditNote.taxAmount, creditNote.currency)}</span>
                </div>
                <div className="flex justify-between text-lg font-semibold border-t pt-2">
                  <span>Totaal te crediteren</span>
                  <span>{formatCurrency(creditNote.total, creditNote.currency)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reason */}
          {creditNote.reason && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Reden</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-zinc-600 whitespace-pre-wrap">
                  {creditNote.reason}
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm text-zinc-500">Datum</span>
                <span className="text-sm font-medium">
                  {format(new Date(creditNote.issueDate), "d MMMM yyyy", { locale: nl })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-zinc-500">Klant</span>
                <span className="text-sm font-medium">{contactName}</span>
              </div>
              {creditNote.invoice && (
                <div className="flex justify-between">
                  <span className="text-sm text-zinc-500">Factuur</span>
                  <Link
                    href={`/crm/invoicing/invoices/${creditNote.invoice.id}`}
                    className="text-sm font-medium text-violet-600 hover:underline"
                  >
                    {creditNote.invoice.invoiceNumber}
                  </Link>
                </div>
              )}
              {creditNote.appliedAt && (
                <div className="flex justify-between">
                  <span className="text-sm text-zinc-500">Verrekend op</span>
                  <span className="text-sm font-medium">
                    {format(new Date(creditNote.appliedAt), "d MMM yyyy", { locale: nl })}
                  </span>
                </div>
              )}
              {creditNote.refundedAt && (
                <div className="flex justify-between">
                  <span className="text-sm text-zinc-500">Terugbetaald op</span>
                  <span className="text-sm font-medium">
                    {format(new Date(creditNote.refundedAt), "d MMM yyyy", { locale: nl })}
                  </span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Notes */}
          {creditNote.notes && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Interne notities</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-zinc-600 whitespace-pre-wrap">
                  {creditNote.notes}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Apply Dialog */}
      <Dialog open={showApplyDialog} onOpenChange={setShowApplyDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Creditnota verrekenen</DialogTitle>
            <DialogDescription>
              Selecteer een factuur om deze creditnota mee te verrekenen. Het
              bedrag wordt van het openstaande bedrag afgetrokken.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Selecteer factuur</Label>
              <Select value={selectedInvoiceId} onValueChange={setSelectedInvoiceId}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecteer een factuur" />
                </SelectTrigger>
                <SelectContent>
                  {availableInvoices.map((inv) => (
                    <SelectItem key={inv.id} value={inv.id.toString()}>
                      {inv.invoiceNumber} - Openstaand:{" "}
                      {formatCurrency(inv.amountDue, creditNote.currency)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowApplyDialog(false)}>
              Annuleren
            </Button>
            <Button onClick={handleApply} disabled={!selectedInvoiceId || isPending}>
              Verrekenen
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
