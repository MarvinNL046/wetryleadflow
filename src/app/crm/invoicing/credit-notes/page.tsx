"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, FileText, Calendar, MoreHorizontal, Ban, Check, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getCreditNotes, issueCreditNote, cancelCreditNote } from "@/lib/actions/credit-notes";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { formatCurrency } from "@/lib/utils/currency";

type CreditNote = Awaited<ReturnType<typeof getCreditNotes>>[number];

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

export default function CreditNotesPage() {
  const [creditNotes, setCreditNotes] = useState<CreditNote[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadCreditNotes();
  }, []);

  async function loadCreditNotes() {
    setIsLoading(true);
    try {
      const data = await getCreditNotes();
      setCreditNotes(data);
    } catch (error) {
      console.error("Failed to load credit notes:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleIssue(id: number) {
    try {
      await issueCreditNote(id);
      await loadCreditNotes();
    } catch (error) {
      console.error("Failed to issue credit note:", error);
      alert("Er is iets misgegaan bij het uitgeven");
    }
  }

  async function handleCancel(id: number) {
    if (!confirm("Weet je zeker dat je deze creditnota wilt annuleren?")) return;
    try {
      await cancelCreditNote(id);
      await loadCreditNotes();
    } catch (error) {
      console.error("Failed to cancel credit note:", error);
      alert("Er is iets misgegaan bij het annuleren");
    }
  }

  const getContactName = (creditNote: CreditNote) => {
    if (!creditNote.contact) return "Onbekend";
    return (
      creditNote.contact.company ||
      `${creditNote.contact.firstName || ""} ${creditNote.contact.lastName || ""}`.trim() ||
      "Onbekend"
    );
  };

  // Stats
  const draftCount = creditNotes.filter((cn) => cn.status === "draft").length;
  const issuedCount = creditNotes.filter((cn) => cn.status === "issued").length;
  const totalValue = creditNotes
    .filter((cn) => cn.status !== "cancelled" && cn.status !== "draft")
    .reduce((sum, cn) => sum + parseFloat(cn.total), 0);

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
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Creditnota's</h2>
          <p className="text-sm text-zinc-500">
            Beheer terugbetalingen en correcties
          </p>
        </div>
        <Button asChild>
          <Link href="/crm/invoicing/credit-notes/new">
            <Plus className="mr-2 h-4 w-4" />
            Nieuwe creditnota
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-zinc-500">
              Concepten
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{draftCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-zinc-500">
              Uitgegeven
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{issuedCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-zinc-500">
              Totaal gecrediteerd
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalValue)}</div>
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          {creditNotes.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <FileText className="h-12 w-12 text-zinc-300 mb-4" />
              <h3 className="text-lg font-medium text-zinc-900 mb-1">
                Nog geen creditnota's
              </h3>
              <p className="text-sm text-zinc-500 mb-4">
                Maak een creditnota aan voor correcties of terugbetalingen
              </p>
              <Button asChild>
                <Link href="/crm/invoicing/credit-notes/new">
                  <Plus className="mr-2 h-4 w-4" />
                  Eerste creditnota
                </Link>
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nummer</TableHead>
                  <TableHead>Klant</TableHead>
                  <TableHead>Datum</TableHead>
                  <TableHead>Bedrag</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {creditNotes.map((creditNote) => (
                  <TableRow key={creditNote.id}>
                    <TableCell>
                      <Link
                        href={`/crm/invoicing/credit-notes/${creditNote.id}`}
                        className="font-medium hover:text-violet-600"
                      >
                        {creditNote.creditNoteNumber}
                      </Link>
                      {creditNote.invoiceId && (
                        <span className="ml-2 text-xs text-zinc-500">
                          (bij factuur)
                        </span>
                      )}
                    </TableCell>
                    <TableCell>{getContactName(creditNote)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-zinc-400" />
                        {format(new Date(creditNote.issueDate), "d MMM yyyy", { locale: nl })}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      {formatCurrency(creditNote.total, creditNote.currency)}
                    </TableCell>
                    <TableCell>
                      <Badge className={`${statusColors[creditNote.status]} hover:${statusColors[creditNote.status]}`}>
                        {statusLabels[creditNote.status] || creditNote.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/crm/invoicing/credit-notes/${creditNote.id}`}>
                              Bekijken
                            </Link>
                          </DropdownMenuItem>
                          {creditNote.status === "draft" && (
                            <>
                              <DropdownMenuItem onClick={() => handleIssue(creditNote.id)}>
                                <Check className="mr-2 h-4 w-4" />
                                Uitgeven
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleCancel(creditNote.id)}>
                                <Ban className="mr-2 h-4 w-4" />
                                Annuleren
                              </DropdownMenuItem>
                            </>
                          )}
                          {creditNote.status === "issued" && (
                            <DropdownMenuItem onClick={() => handleCancel(creditNote.id)}>
                              <Ban className="mr-2 h-4 w-4" />
                              Annuleren
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
