"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Building2, Receipt, Calendar, Percent, FileText, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createExpense } from "@/lib/actions/expenses";

// Category labels in Dutch
const expenseCategoryLabels: Record<string, string> = {
  office: "Kantoorkosten",
  travel: "Reiskosten",
  software: "Software & Abonnementen",
  marketing: "Marketing & Reclame",
  supplies: "Kantoorbenodigdheden",
  utilities: "Nutsvoorzieningen",
  insurance: "Verzekeringen",
  professional: "Professionele Diensten",
  equipment: "Apparatuur",
  other: "Overig",
};

const categories = Object.entries(expenseCategoryLabels);

export default function NewExpensePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [vendorName, setVendorName] = useState("");
  const [vendorEmail, setVendorEmail] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("other");
  const [subtotal, setSubtotal] = useState("");
  const [taxRate, setTaxRate] = useState("21");
  const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().split("T")[0]);
  const [dueDate, setDueDate] = useState("");
  const [notes, setNotes] = useState("");

  // Calculate totals
  const subtotalNum = parseFloat(subtotal) || 0;
  const taxRateNum = parseFloat(taxRate) || 0;
  const taxAmount = (subtotalNum * taxRateNum) / 100;
  const total = subtotalNum + taxAmount;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("nl-NL", {
      style: "currency",
      currency: "EUR",
    }).format(amount);
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await createExpense({
        vendorName,
        vendorEmail: vendorEmail || undefined,
        invoiceNumber: invoiceNumber || undefined,
        description: description || undefined,
        category,
        subtotal: subtotalNum,
        taxRate: taxRateNum,
        invoiceDate: new Date(invoiceDate),
        dueDate: dueDate ? new Date(dueDate) : undefined,
        notes: notes || undefined,
      });

      router.push("/crm/invoicing/expenses");
    } catch (err) {
      console.error("Failed to create expense:", err);
      setError("Er is een fout opgetreden bij het opslaan van de uitgave.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl">
      {/* Header */}
      <div className="mb-6 flex items-center gap-4">
        <Link href="/crm/invoicing/expenses">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-xl font-bold">Nieuwe Uitgave</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Registreer een inkomende factuur of uitgave
          </p>
        </div>
      </div>

      {error && (
        <div className="mb-6 rounded-lg bg-red-50 p-4 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Vendor Info */}
        <div className="rounded-xl border border-zinc-200/50 bg-white p-6 dark:border-zinc-800/50 dark:bg-zinc-900/50">
          <div className="mb-4 flex items-center gap-2 text-sm font-medium">
            <Building2 className="h-4 w-4 text-violet-500" />
            Leverancier
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="vendorName">Naam leverancier *</Label>
              <Input
                id="vendorName"
                value={vendorName}
                onChange={(e) => setVendorName(e.target.value)}
                placeholder="bijv. Bol.com, Coolblue"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vendorEmail">Email (optioneel)</Label>
              <Input
                id="vendorEmail"
                type="email"
                value={vendorEmail}
                onChange={(e) => setVendorEmail(e.target.value)}
                placeholder="facturen@leverancier.nl"
              />
            </div>
          </div>
        </div>

        {/* Invoice Details */}
        <div className="rounded-xl border border-zinc-200/50 bg-white p-6 dark:border-zinc-800/50 dark:bg-zinc-900/50">
          <div className="mb-4 flex items-center gap-2 text-sm font-medium">
            <FileText className="h-4 w-4 text-violet-500" />
            Factuurgegevens
          </div>

          <div className="grid gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="invoiceNumber">Factuurnummer</Label>
                <Input
                  id="invoiceNumber"
                  value={invoiceNumber}
                  onChange={(e) => setInvoiceNumber(e.target.value)}
                  placeholder="bijv. INV-2024-001"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Categorie *</Label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm dark:border-zinc-800 dark:bg-zinc-900"
                  required
                >
                  {categories.map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Omschrijving</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Korte omschrijving van de uitgave..."
                rows={2}
              />
            </div>
          </div>
        </div>

        {/* Amounts */}
        <div className="rounded-xl border border-zinc-200/50 bg-white p-6 dark:border-zinc-800/50 dark:bg-zinc-900/50">
          <div className="mb-4 flex items-center gap-2 text-sm font-medium">
            <Receipt className="h-4 w-4 text-violet-500" />
            Bedragen
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="subtotal">Bedrag excl. BTW *</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">€</span>
                <Input
                  id="subtotal"
                  type="number"
                  step="0.01"
                  min="0"
                  value={subtotal}
                  onChange={(e) => setSubtotal(e.target.value)}
                  placeholder="0.00"
                  className="pl-8"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="taxRate">BTW percentage</Label>
              <div className="relative">
                <Input
                  id="taxRate"
                  type="number"
                  step="0.01"
                  min="0"
                  max="100"
                  value={taxRate}
                  onChange={(e) => setTaxRate(e.target.value)}
                  className="pr-8"
                />
                <Percent className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Totaal incl. BTW</Label>
              <div className="flex h-10 items-center rounded-lg border border-zinc-200 bg-zinc-50 px-3 text-lg font-semibold dark:border-zinc-800 dark:bg-zinc-800/50">
                {formatCurrency(total)}
              </div>
            </div>
          </div>

          {subtotalNum > 0 && (
            <div className="mt-4 rounded-lg bg-zinc-50 p-3 dark:bg-zinc-800/50">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-500">Subtotaal</span>
                <span>{formatCurrency(subtotalNum)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-500">BTW ({taxRateNum}%)</span>
                <span>{formatCurrency(taxAmount)}</span>
              </div>
              <div className="mt-2 flex justify-between border-t border-zinc-200 pt-2 font-medium dark:border-zinc-700">
                <span>Totaal</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </div>
          )}
        </div>

        {/* Dates */}
        <div className="rounded-xl border border-zinc-200/50 bg-white p-6 dark:border-zinc-800/50 dark:bg-zinc-900/50">
          <div className="mb-4 flex items-center gap-2 text-sm font-medium">
            <Calendar className="h-4 w-4 text-violet-500" />
            Datums
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="invoiceDate">Factuurdatum *</Label>
              <Input
                id="invoiceDate"
                type="date"
                value={invoiceDate}
                onChange={(e) => setInvoiceDate(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dueDate">Vervaldatum (optioneel)</Label>
              <Input
                id="dueDate"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="rounded-xl border border-zinc-200/50 bg-white p-6 dark:border-zinc-800/50 dark:bg-zinc-900/50">
          <div className="space-y-2">
            <Label htmlFor="notes">Notities (optioneel)</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Interne notities over deze uitgave..."
              rows={3}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <Link href="/crm/invoicing/expenses">
            <Button type="button" variant="outline">
              Annuleren
            </Button>
          </Link>
          <Button
            type="submit"
            disabled={loading || !vendorName || !subtotal}
            className="bg-gradient-to-r from-violet-600 to-blue-600 text-white"
          >
            {loading ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Opslaan...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Uitgave Opslaan
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
