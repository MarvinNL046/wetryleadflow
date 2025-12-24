"use client";

import { useState, useEffect, useTransition } from "react";
import Link from "next/link";
import { Plus, FileText, Send, CheckCircle, XCircle, MoreHorizontal, Receipt } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  getQuotations,
  sendQuotation,
  markQuotationAccepted,
  markQuotationRejected,
  convertQuotationToInvoice,
  deleteQuotation,
} from "@/lib/actions/invoicing";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { useRouter } from "next/navigation";

type Quotation = {
  id: number;
  quotationNumber: string;
  status: string;
  total: string;
  issueDate: Date;
  validUntil: Date | null;
  contact: {
    firstName: string | null;
    lastName: string | null;
    company: string | null;
  } | null;
};

function formatCurrency(amount: string | number) {
  const num = typeof amount === "string" ? parseFloat(amount) : amount;
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
  }).format(num);
}

const statusColors: Record<string, string> = {
  draft: "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300",
  sent: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  accepted: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  rejected: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  expired: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
};

const statusLabels: Record<string, string> = {
  draft: "Concept",
  sent: "Verzonden",
  accepted: "Geaccepteerd",
  rejected: "Afgewezen",
  expired: "Verlopen",
};

export default function QuotationsPage() {
  const router = useRouter();
  const [quotations, setQuotations] = useState<Quotation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; quotation: Quotation | null }>({
    open: false,
    quotation: null,
  });

  useEffect(() => {
    loadQuotations();
  }, []);

  async function loadQuotations() {
    setIsLoading(true);
    try {
      const data = await getQuotations();
      setQuotations(data as Quotation[]);
    } catch (error) {
      console.error("Failed to load quotations:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSend(id: number) {
    startTransition(async () => {
      try {
        await sendQuotation(id);
        await loadQuotations();
      } catch (error) {
        console.error("Failed to send quotation:", error);
      }
    });
  }

  async function handleAccept(id: number) {
    startTransition(async () => {
      try {
        await markQuotationAccepted(id);
        await loadQuotations();
      } catch (error) {
        console.error("Failed to accept quotation:", error);
      }
    });
  }

  async function handleReject(id: number) {
    startTransition(async () => {
      try {
        await markQuotationRejected(id);
        await loadQuotations();
      } catch (error) {
        console.error("Failed to reject quotation:", error);
      }
    });
  }

  async function handleConvert(id: number) {
    startTransition(async () => {
      try {
        const invoice = await convertQuotationToInvoice(id);
        router.push(`/crm/invoicing/invoices/${invoice.id}`);
      } catch (error) {
        console.error("Failed to convert quotation:", error);
      }
    });
  }

  async function handleDelete() {
    if (!deleteDialog.quotation) return;
    startTransition(async () => {
      try {
        await deleteQuotation(deleteDialog.quotation!.id);
        setDeleteDialog({ open: false, quotation: null });
        await loadQuotations();
      } catch (error) {
        console.error("Failed to delete quotation:", error);
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
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Offertes</h2>
          <p className="text-sm text-zinc-500">
            Beheer je offertes en converteer ze naar facturen
          </p>
        </div>
        <Button asChild>
          <Link href="/crm/invoicing/quotations/new">
            <Plus className="mr-2 h-4 w-4" />
            Nieuwe Offerte
          </Link>
        </Button>
      </div>

      {/* Quotations Table */}
      {quotations.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-zinc-300 py-12 dark:border-zinc-700">
          <FileText className="mb-4 h-12 w-12 text-zinc-300 dark:text-zinc-600" />
          <p className="mb-2 text-lg font-medium">Geen offertes</p>
          <p className="mb-4 text-sm text-zinc-500">
            Maak je eerste offerte om te beginnen
          </p>
          <Button asChild>
            <Link href="/crm/invoicing/quotations/new">
              <Plus className="mr-2 h-4 w-4" />
              Eerste offerte maken
            </Link>
          </Button>
        </div>
      ) : (
        <div className="rounded-lg border border-zinc-200 dark:border-zinc-800">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nummer</TableHead>
                <TableHead>Klant</TableHead>
                <TableHead>Datum</TableHead>
                <TableHead>Geldig tot</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Bedrag</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {quotations.map((quotation) => (
                <TableRow key={quotation.id}>
                  <TableCell>
                    <Link
                      href={`/crm/invoicing/quotations/${quotation.id}`}
                      className="font-medium hover:text-violet-600"
                    >
                      {quotation.quotationNumber}
                    </Link>
                  </TableCell>
                  <TableCell>
                    {quotation.contact?.company ||
                      `${quotation.contact?.firstName ?? ""} ${quotation.contact?.lastName ?? ""}`.trim() ||
                      "-"}
                  </TableCell>
                  <TableCell>
                    {format(new Date(quotation.issueDate), "d MMM yyyy", {
                      locale: nl,
                    })}
                  </TableCell>
                  <TableCell>
                    {quotation.validUntil
                      ? format(new Date(quotation.validUntil), "d MMM yyyy", {
                          locale: nl,
                        })
                      : "-"}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                        statusColors[quotation.status]
                      }`}
                    >
                      {statusLabels[quotation.status]}
                    </span>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {formatCurrency(quotation.total)}
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
                          <Link href={`/crm/invoicing/quotations/${quotation.id}`}>
                            Bekijken
                          </Link>
                        </DropdownMenuItem>
                        {quotation.status === "draft" && (
                          <>
                            <DropdownMenuItem asChild>
                              <Link href={`/crm/invoicing/quotations/${quotation.id}/edit`}>
                                Bewerken
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleSend(quotation.id)}>
                              <Send className="mr-2 h-4 w-4" />
                              Versturen
                            </DropdownMenuItem>
                          </>
                        )}
                        {quotation.status === "sent" && (
                          <>
                            <DropdownMenuItem onClick={() => handleAccept(quotation.id)}>
                              <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                              Markeer als geaccepteerd
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleReject(quotation.id)}>
                              <XCircle className="mr-2 h-4 w-4 text-red-500" />
                              Markeer als afgewezen
                            </DropdownMenuItem>
                          </>
                        )}
                        {quotation.status === "accepted" && (
                          <DropdownMenuItem onClick={() => handleConvert(quotation.id)}>
                            <Receipt className="mr-2 h-4 w-4" />
                            Converteer naar factuur
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        {quotation.status === "draft" && (
                          <DropdownMenuItem
                            onClick={() => setDeleteDialog({ open: true, quotation })}
                            className="text-red-600"
                          >
                            Verwijderen
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Delete Confirmation */}
      <AlertDialog
        open={deleteDialog.open}
        onOpenChange={(open) => setDeleteDialog({ open, quotation: null })}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Offerte verwijderen?</AlertDialogTitle>
            <AlertDialogDescription>
              Weet je zeker dat je offerte &quot;{deleteDialog.quotation?.quotationNumber}&quot;
              wilt verwijderen? Deze actie kan niet ongedaan worden gemaakt.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuleren</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              {isPending ? "Verwijderen..." : "Verwijderen"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
