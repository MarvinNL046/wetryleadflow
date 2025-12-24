"use client";

import { useState, useEffect, useTransition, use } from "react";
import { useRouter } from "next/navigation";
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
import { getQuotation, updateQuotation } from "@/lib/actions/invoicing";
import { getContacts } from "@/lib/actions/crm";
import { format } from "date-fns";

type Contact = {
  id: number;
  firstName: string | null;
  lastName: string | null;
  company: string | null;
  email: string | null;
};

export default function EditQuotationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const quotationId = parseInt(id);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [notDraft, setNotDraft] = useState(false);

  // Form state
  const [contactId, setContactId] = useState<string>("");
  const [issueDate, setIssueDate] = useState("");
  const [validUntil, setValidUntil] = useState("");
  const [title, setTitle] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [terms, setTerms] = useState("");
  const [notes, setNotes] = useState("");
  const [lineItems, setLineItems] = useState<LineItem[]>([]);
  const [quotationNumber, setQuotationNumber] = useState("");

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quotationId]);

  async function loadData() {
    setIsLoading(true);
    try {
      const [quotation, contactsData] = await Promise.all([
        getQuotation(quotationId),
        getContacts(),
      ]);

      if (!quotation) {
        setNotFound(true);
        return;
      }

      // Only draft quotations can be edited
      if (quotation.status !== "draft") {
        setNotDraft(true);
        return;
      }

      setContacts(contactsData as Contact[]);
      setQuotationNumber(quotation.quotationNumber);

      // Pre-populate form fields
      setContactId(quotation.contactId?.toString() ?? "");
      setIssueDate(format(new Date(quotation.issueDate), "yyyy-MM-dd"));
      setValidUntil(
        quotation.validUntil
          ? format(new Date(quotation.validUntil), "yyyy-MM-dd")
          : ""
      );
      setTitle(quotation.title ?? "");
      setIntroduction(quotation.introduction ?? "");
      setTerms(quotation.terms ?? "");
      setNotes(quotation.notes ?? "");

      // Convert line items to editor format
      const items: LineItem[] = quotation.lineItems.map((item) => {
        const quantity = parseFloat(item.quantity);
        const unitPrice = parseFloat(item.unitPrice);
        const taxRate = parseFloat(item.taxRate);
        const discountPercent = item.discountPercent ? parseFloat(item.discountPercent) : 0;

        // Calculate values
        const lineSubtotal = quantity * unitPrice * (1 - discountPercent / 100);
        const taxAmount = lineSubtotal * (taxRate / 100);
        const total = lineSubtotal + taxAmount;

        return {
          id: item.id,
          productId: item.productId ?? undefined,
          description: item.description,
          quantity,
          unit: item.unit,
          unitPrice,
          taxRate,
          discountPercent,
          subtotal: lineSubtotal,
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
      alert("Selecteer een contact");
      return;
    }

    if (lineItems.length === 0) {
      alert("Voeg minimaal één regelitem toe");
      return;
    }

    startTransition(async () => {
      try {
        await updateQuotation(quotationId, {
          contactId: parseInt(contactId),
          issueDate: new Date(issueDate),
          validUntil: validUntil ? new Date(validUntil) : undefined,
          title: title || undefined,
          introduction: introduction || undefined,
          terms: terms || undefined,
          notes: notes || undefined,
          lineItems: lineItems.map((item) => ({
            id: item.id, // undefined for new items, existing id for updates
            productId: item.productId,
            description: item.description,
            quantity: item.quantity,
            unit: item.unit,
            unitPrice: item.unitPrice,
            taxRate: item.taxRate,
            discountPercent: item.discountPercent,
          })),
        });

        router.push(`/crm/invoicing/quotations/${quotationId}`);
      } catch (error) {
        console.error("Failed to update quotation:", error);
        alert("Er is iets misgegaan bij het bijwerken van de offerte");
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

  if (notFound) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h2 className="text-lg font-semibold">Offerte niet gevonden</h2>
        <p className="text-sm text-zinc-500">
          De offerte die je probeert te bewerken bestaat niet.
        </p>
        <Button asChild className="mt-4">
          <Link href="/crm/invoicing/quotations">Terug naar offertes</Link>
        </Button>
      </div>
    );
  }

  if (notDraft) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h2 className="text-lg font-semibold">Offerte kan niet worden bewerkt</h2>
        <p className="text-sm text-zinc-500">
          Alleen concept-offertes kunnen worden bewerkt.
        </p>
        <Button asChild className="mt-4">
          <Link href={`/crm/invoicing/quotations/${quotationId}`}>
            Terug naar offerte
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href={`/crm/invoicing/quotations/${quotationId}`}>
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h2 className="text-lg font-semibold">Offerte bewerken</h2>
          <p className="text-sm text-zinc-500">{quotationNumber}</p>
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
                    placeholder="Introductietekst voor de offerte"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="terms">Voorwaarden</Label>
                  <Textarea
                    id="terms"
                    value={terms}
                    onChange={(e) => setTerms(e.target.value)}
                    placeholder="Algemene voorwaarden"
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
                <CardTitle className="text-base">Datums</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="issueDate">Offertedatum *</Label>
                  <Input
                    id="issueDate"
                    type="date"
                    value={issueDate}
                    onChange={(e) => setIssueDate(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="validUntil">Geldig tot</Label>
                  <Input
                    id="validUntil"
                    type="date"
                    value={validUntil}
                    onChange={(e) => setValidUntil(e.target.value)}
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
                    <Link href={`/crm/invoicing/quotations/${quotationId}`}>
                      Annuleren
                    </Link>
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
