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
import { createInvoice, getInvoiceSettings } from "@/lib/actions/invoicing";
import { getContacts } from "@/lib/actions/crm";
import { addDays, format } from "date-fns";

type Contact = {
  id: number;
  firstName: string | null;
  lastName: string | null;
  company: string | null;
  email: string | null;
};

export default function NewInvoicePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [paymentTerms, setPaymentTerms] = useState(14);
  const [currency, setCurrency] = useState("EUR");

  // Form state
  const [contactId, setContactId] = useState<string>(
    searchParams.get("contactId") ?? ""
  );
  const [issueDate, setIssueDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [dueDate, setDueDate] = useState(
    format(addDays(new Date(), 14), "yyyy-MM-dd")
  );
  const [title, setTitle] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [terms, setTerms] = useState("");
  const [notes, setNotes] = useState("");
  const [lineItems, setLineItems] = useState<LineItem[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  // Update due date when issue date or payment terms change
  useEffect(() => {
    if (issueDate) {
      setDueDate(format(addDays(new Date(issueDate), paymentTerms), "yyyy-MM-dd"));
    }
  }, [issueDate, paymentTerms]);

  async function loadData() {
    setIsLoading(true);
    try {
      const [contactsData, settings] = await Promise.all([
        getContacts(),
        getInvoiceSettings(),
      ]);
      setContacts(contactsData as Contact[]);

      // Set defaults from settings
      if (settings.defaultPaymentTerms) {
        setPaymentTerms(settings.defaultPaymentTerms);
        setDueDate(format(addDays(new Date(), settings.defaultPaymentTerms), "yyyy-MM-dd"));
      }
      if (settings.defaultIntroduction) {
        setIntroduction(settings.defaultIntroduction);
      }
      if (settings.defaultTerms) {
        setTerms(settings.defaultTerms);
      }
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
        const invoice = await createInvoice({
          contactId: parseInt(contactId),
          issueDate: new Date(issueDate),
          dueDate: new Date(dueDate),
          paymentTerms,
          currency,
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
        });

        router.push(`/crm/invoicing/invoices/${invoice.id}`);
      } catch (error) {
        console.error("Failed to create invoice:", error);
        alert("Er is iets misgegaan bij het aanmaken van de factuur");
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
          <Link href="/crm/invoicing/invoices">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h2 className="text-lg font-semibold">Nieuwe Factuur</h2>
          <p className="text-sm text-zinc-500">
            Maak een nieuwe factuur voor een klant
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
                  <Select value={contactId} onValueChange={setContactId}>
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
                    placeholder="Bijv. Website redesign project"
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
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Datums & Betaling</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="issueDate">Factuurdatum *</Label>
                  <Input
                    id="issueDate"
                    type="date"
                    value={issueDate}
                    onChange={(e) => setIssueDate(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="paymentTerms">Betalingstermijn (dagen)</Label>
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

                <div className="space-y-2">
                  <Label htmlFor="dueDate">Vervaldatum</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
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
                    {isPending ? "Opslaan..." : "Factuur opslaan"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    asChild
                  >
                    <Link href="/crm/invoicing/invoices">Annuleren</Link>
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
