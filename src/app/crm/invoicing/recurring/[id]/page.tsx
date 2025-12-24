"use client";

import { useState, useEffect, useTransition, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  Trash2,
  Play,
  Pause,
  Calendar,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { LineItemsEditor, LineItem } from "@/components/invoicing/line-items-editor";
import {
  getRecurringInvoice,
  updateRecurringInvoice,
  deleteRecurringInvoice,
  toggleRecurringInvoiceActive,
  type LineItemTemplate,
} from "@/lib/actions/recurring-invoices";
import { type RecurringFrequency } from "@/lib/utils/recurring-invoice";
import { getContacts } from "@/lib/actions/crm";
import { format } from "date-fns";
import { nl } from "date-fns/locale";

type Contact = {
  id: number;
  firstName: string | null;
  lastName: string | null;
  company: string | null;
  email: string | null;
};

const frequencyLabels: Record<string, string> = {
  weekly: "Wekelijks",
  monthly: "Maandelijks",
  quarterly: "Per kwartaal",
  yearly: "Jaarlijks",
};

export default function RecurringInvoiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const invoiceId = parseInt(id);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  // Form state
  const [contactId, setContactId] = useState<string>("");
  const [title, setTitle] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [terms, setTerms] = useState("");
  const [notes, setNotes] = useState("");
  const [lineItems, setLineItems] = useState<LineItem[]>([]);
  const [frequency, setFrequency] = useState<RecurringFrequency>("monthly");
  const [dayOfMonth, setDayOfMonth] = useState(1);
  const [dayOfWeek, setDayOfWeek] = useState(1);
  const [paymentTerms, setPaymentTerms] = useState(14);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [autoSend, setAutoSend] = useState(false);
  const [isActive, setIsActive] = useState(true);

  // Read-only stats
  const [invoicesGenerated, setInvoicesGenerated] = useState(0);
  const [nextRunDate, setNextRunDate] = useState<Date | null>(null);
  const [lastRunDate, setLastRunDate] = useState<Date | null>(null);

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invoiceId]);

  async function loadData() {
    setIsLoading(true);
    try {
      const [invoice, contactsData] = await Promise.all([
        getRecurringInvoice(invoiceId),
        getContacts(),
      ]);

      if (!invoice) {
        setNotFound(true);
        return;
      }

      setContacts(contactsData as Contact[]);

      // Pre-populate form fields
      setContactId(invoice.contactId?.toString() ?? "");
      setTitle(invoice.title ?? "");
      setIntroduction(invoice.introduction ?? "");
      setTerms(invoice.terms ?? "");
      setNotes(invoice.notes ?? "");
      setFrequency(invoice.frequency);
      setDayOfMonth(invoice.dayOfMonth);
      setDayOfWeek(invoice.dayOfWeek ?? 1);
      setPaymentTerms(invoice.paymentTerms);
      setStartDate(format(new Date(invoice.startDate), "yyyy-MM-dd"));
      setEndDate(invoice.endDate ? format(new Date(invoice.endDate), "yyyy-MM-dd") : "");
      setAutoSend(invoice.autoSend);
      setIsActive(invoice.isActive);
      setInvoicesGenerated(invoice.invoicesGenerated);
      setNextRunDate(invoice.nextRunDate ? new Date(invoice.nextRunDate) : null);
      setLastRunDate(invoice.lastRunDate ? new Date(invoice.lastRunDate) : null);

      // Convert line items to editor format
      const items: LineItem[] = (invoice.lineItemsTemplate as LineItemTemplate[]).map((item, index) => {
        const subtotal = item.quantity * item.unitPrice * (1 - item.discountPercent / 100);
        const taxAmount = subtotal * (item.taxRate / 100);
        const total = subtotal + taxAmount;

        return {
          id: index, // Use index as temporary id
          productId: item.productId,
          description: item.description,
          quantity: item.quantity,
          unit: item.unit,
          unitPrice: item.unitPrice,
          taxRate: item.taxRate,
          discountPercent: item.discountPercent,
          subtotal,
          taxAmount,
          total,
        };
      });
      setLineItems(items);
    } catch (error) {
      console.error("Failed to load data:", error);
      setNotFound(true);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!contactId) {
      alert("Selecteer een klant");
      return;
    }

    if (lineItems.length === 0) {
      alert("Voeg minimaal één regelitem toe");
      return;
    }

    startTransition(async () => {
      try {
        await updateRecurringInvoice(invoiceId, {
          contactId: parseInt(contactId),
          title: title || undefined,
          introduction: introduction || undefined,
          terms: terms || undefined,
          notes: notes || undefined,
          lineItems: lineItems.map((item) => ({
            productId: item.productId,
            description: item.description,
            quantity: item.quantity,
            unit: item.unit,
            unitPrice: item.unitPrice,
            taxRate: item.taxRate,
            discountPercent: item.discountPercent,
          })),
          frequency,
          dayOfMonth,
          dayOfWeek,
          paymentTerms,
          startDate: new Date(startDate),
          endDate: endDate ? new Date(endDate) : null,
          autoSend,
          isActive,
        });

        router.push("/crm/invoicing/recurring");
      } catch (error) {
        console.error("Failed to update recurring invoice:", error);
        alert("Er is iets misgegaan bij het bijwerken");
      }
    });
  }

  async function handleDelete() {
    try {
      await deleteRecurringInvoice(invoiceId);
      router.push("/crm/invoicing/recurring");
    } catch (error) {
      console.error("Failed to delete:", error);
      alert("Er is iets misgegaan bij het verwijderen");
    }
  }

  async function handleToggleActive() {
    try {
      await toggleRecurringInvoiceActive(invoiceId);
      setIsActive(!isActive);
    } catch (error) {
      console.error("Failed to toggle status:", error);
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-violet-500 border-t-transparent" />
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h2 className="text-lg font-semibold">Niet gevonden</h2>
        <p className="text-sm text-zinc-500">
          De terugkerende factuur die je zoekt bestaat niet.
        </p>
        <Button asChild className="mt-4">
          <Link href="/crm/invoicing/recurring">Terug naar overzicht</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/crm/invoicing/recurring">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold">
                {title || "Terugkerende factuur"}
              </h2>
              {isActive ? (
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                  Actief
                </Badge>
              ) : (
                <Badge variant="secondary">Gepauzeerd</Badge>
              )}
            </div>
            <p className="text-sm text-zinc-500">
              {frequencyLabels[frequency]} | {invoicesGenerated} facturen gegenereerd
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleToggleActive}>
            {isActive ? (
              <>
                <Pause className="mr-2 h-4 w-4" />
                Pauzeren
              </>
            ) : (
              <>
                <Play className="mr-2 h-4 w-4" />
                Activeren
              </>
            )}
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" className="text-red-600 hover:text-red-700">
                <Trash2 className="mr-2 h-4 w-4" />
                Verwijderen
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Weet je het zeker?</AlertDialogTitle>
                <AlertDialogDescription>
                  Dit verwijdert de terugkerende factuur permanent. Bestaande
                  gegenereerde facturen blijven behouden.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Annuleren</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Verwijderen
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-zinc-500 flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Volgende run
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-semibold">
              {nextRunDate
                ? format(nextRunDate, "d MMMM yyyy", { locale: nl })
                : "-"}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-zinc-500 flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Laatste run
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-semibold">
              {lastRunDate
                ? format(lastRunDate, "d MMMM yyyy", { locale: nl })
                : "Nog niet uitgevoerd"}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-zinc-500 flex items-center gap-2">
              <RefreshCw className="h-4 w-4" />
              Gegenereerd
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-semibold">{invoicesGenerated} facturen</div>
          </CardContent>
        </Card>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Klantgegevens</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Klant *</Label>
                  <Select value={contactId} onValueChange={setContactId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecteer een klant" />
                    </SelectTrigger>
                    <SelectContent>
                      {contacts.map((contact) => (
                        <SelectItem
                          key={contact.id}
                          value={contact.id.toString()}
                        >
                          {contact.company ||
                            `${contact.firstName ?? ""} ${contact.lastName ?? ""}`.trim()}
                          {contact.email && ` (${contact.email})`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Line Items */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Regelitems</CardTitle>
              </CardHeader>
              <CardContent>
                <LineItemsEditor items={lineItems} onChange={setLineItems} />
              </CardContent>
            </Card>

            {/* Additional Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Extra informatie</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Titel (optioneel)</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Bijv. Maandelijkse hosting"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="introduction">Introductie</Label>
                  <Textarea
                    id="introduction"
                    value={introduction}
                    onChange={(e) => setIntroduction(e.target.value)}
                    placeholder="Introductietekst voor de factuur"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="terms">Voorwaarden</Label>
                  <Textarea
                    id="terms"
                    value={terms}
                    onChange={(e) => setTerms(e.target.value)}
                    placeholder="Betalingsvoorwaarden"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Interne notities</Label>
                  <Textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Notities (niet zichtbaar voor klant)"
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Schedule */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Planning</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Frequentie *</Label>
                  <Select
                    value={frequency}
                    onValueChange={(v) => setFrequency(v as RecurringFrequency)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weekly">Wekelijks</SelectItem>
                      <SelectItem value="monthly">Maandelijks</SelectItem>
                      <SelectItem value="quarterly">Per kwartaal</SelectItem>
                      <SelectItem value="yearly">Jaarlijks</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {frequency === "weekly" ? (
                  <div className="space-y-2">
                    <Label>Dag van de week</Label>
                    <Select
                      value={dayOfWeek.toString()}
                      onValueChange={(v) => setDayOfWeek(parseInt(v))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Maandag</SelectItem>
                        <SelectItem value="2">Dinsdag</SelectItem>
                        <SelectItem value="3">Woensdag</SelectItem>
                        <SelectItem value="4">Donderdag</SelectItem>
                        <SelectItem value="5">Vrijdag</SelectItem>
                        <SelectItem value="6">Zaterdag</SelectItem>
                        <SelectItem value="0">Zondag</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Label>Dag van de maand</Label>
                    <Select
                      value={dayOfMonth.toString()}
                      onValueChange={(v) => setDayOfMonth(parseInt(v))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 28 }, (_, i) => i + 1).map((day) => (
                          <SelectItem key={day} value={day.toString()}>
                            {day}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="startDate">Startdatum *</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endDate">Einddatum (optioneel)</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    min={startDate}
                  />
                  <p className="text-xs text-zinc-500">
                    Laat leeg voor onbepaalde tijd
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Payment Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Betaling</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Betalingstermijn (dagen)</Label>
                  <Select
                    value={paymentTerms.toString()}
                    onValueChange={(v) => setPaymentTerms(parseInt(v))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7">7 dagen</SelectItem>
                      <SelectItem value="14">14 dagen</SelectItem>
                      <SelectItem value="30">30 dagen</SelectItem>
                      <SelectItem value="60">60 dagen</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="autoSend">Automatisch verzenden</Label>
                    <p className="text-xs text-zinc-500">
                      Factuur direct per e-mail versturen
                    </p>
                  </div>
                  <Switch
                    id="autoSend"
                    checked={autoSend}
                    onCheckedChange={setAutoSend}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <Button type="submit" className="w-full" disabled={isPending}>
                    <Save className="mr-2 h-4 w-4" />
                    {isPending ? "Opslaan..." : "Wijzigingen opslaan"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    asChild
                  >
                    <Link href="/crm/invoicing/recurring">Annuleren</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}
