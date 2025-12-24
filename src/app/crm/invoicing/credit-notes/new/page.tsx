"use client";

import { useState, useEffect, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineItemsEditor, LineItem } from "@/components/invoicing/line-items-editor";
import { CurrencySelector } from "@/components/invoicing/currency-selector";
import { createCreditNote } from "@/lib/actions/credit-notes";
import { getInvoiceSettings, getInvoices } from "@/lib/actions/invoicing";
import { getContacts } from "@/lib/actions/crm";
import { format } from "date-fns";

type Contact = {
  id: number;
  firstName: string | null;
  lastName: string | null;
  company: string | null;
  email: string | null;
};

type Invoice = {
  id: number;
  invoiceNumber: string;
  total: string;
  status: string;
  contactId: number;
};

export default function NewCreditNotePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [contacts, setContacts] = useState<Contact[]>([]);
  const [invoiceList, setInvoiceList] = useState<Invoice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currency, setCurrency] = useState("EUR");

  // Form state
  const [contactId, setContactId] = useState<string>(
    searchParams.get("contactId") ?? ""
  );
  const [invoiceId, setInvoiceId] = useState<string>(
    searchParams.get("invoiceId") ?? ""
  );
  const [issueDate, setIssueDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [reason, setReason] = useState("");
  const [notes, setNotes] = useState("");
  const [lineItems, setLineItems] = useState<LineItem[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  // Filter invoices when contact changes
  const filteredInvoices = contactId
    ? invoiceList.filter((inv) => inv.contactId === parseInt(contactId))
    : invoiceList;

  async function loadData() {
    setIsLoading(true);
    try {
      const [contactsData, settings, invoicesData] = await Promise.all([
        getContacts(),
        getInvoiceSettings(),
        getInvoices(),
      ]);
      setContacts(contactsData as Contact[]);
      setInvoiceList(invoicesData.map((inv) => ({
        id: inv.id,
        invoiceNumber: inv.invoiceNumber,
        total: inv.total,
        status: inv.status,
        contactId: inv.contactId,
      })));

      if (settings.defaultCurrency) {
        setCurrency(settings.defaultCurrency);
      }
    } catch (error) {
      console.error("Failed to load data:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!contactId) {
      alert("Selecteer een contact");
      return;
    }

    if (lineItems.length === 0) {
      alert("Voeg minimaal één regelitem toe");
      return;
    }

    startTransition(async () => {
      try {
        const creditNote = await createCreditNote({
          contactId: parseInt(contactId),
          invoiceId: invoiceId ? parseInt(invoiceId) : undefined,
          issueDate: new Date(issueDate),
          currency,
          reason: reason || undefined,
          notes: notes || undefined,
          lineItems: lineItems.map((item) => ({
            productId: item.productId,
            description: item.description,
            quantity: item.quantity,
            unit: item.unit,
            unitPrice: item.unitPrice,
            taxRate: item.taxRate,
          })),
        });

        router.push(`/crm/invoicing/credit-notes/${creditNote.id}`);
      } catch (error) {
        console.error("Failed to create credit note:", error);
        alert("Er is iets misgegaan bij het aanmaken");
      }
    });
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-violet-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/crm/invoicing/credit-notes">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h2 className="text-lg font-semibold">Nieuwe Creditnota</h2>
          <p className="text-sm text-zinc-500">
            Maak een creditnota voor correcties of terugbetalingen
          </p>
        </div>
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
                  <Label>Contact *</Label>
                  <Select value={contactId} onValueChange={(v) => {
                    setContactId(v);
                    setInvoiceId(""); // Reset invoice when contact changes
                  }}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecteer een contact" />
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

                <div className="space-y-2">
                  <Label>Gerelateerde factuur (optioneel)</Label>
                  <Select value={invoiceId} onValueChange={setInvoiceId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecteer een factuur" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Geen factuur</SelectItem>
                      {filteredInvoices.map((invoice) => (
                        <SelectItem
                          key={invoice.id}
                          value={invoice.id.toString()}
                        >
                          {invoice.invoiceNumber} - {invoice.status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-zinc-500">
                    Koppel aan een bestaande factuur voor verrekening
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Line Items */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Te crediteren items</CardTitle>
              </CardHeader>
              <CardContent>
                <LineItemsEditor items={lineItems} onChange={setLineItems} />
              </CardContent>
            </Card>

            {/* Reason & Notes */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Reden & Notities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="reason">Reden voor creditnota</Label>
                  <Textarea
                    id="reason"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Bijv. Retour goederen, prijscorrectie, etc."
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
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="issueDate">Datum *</Label>
                  <Input
                    id="issueDate"
                    type="date"
                    value={issueDate}
                    onChange={(e) => setIssueDate(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Valuta</Label>
                  <CurrencySelector value={currency} onValueChange={setCurrency} />
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <Button type="submit" className="w-full" disabled={isPending}>
                    <Save className="mr-2 h-4 w-4" />
                    {isPending ? "Opslaan..." : "Creditnota opslaan"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    asChild
                  >
                    <Link href="/crm/invoicing/credit-notes">Annuleren</Link>
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
