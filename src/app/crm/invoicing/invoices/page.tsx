"use client";

import { useState, useEffect, useTransition } from "react";
import Link from "next/link";
import { Plus, Receipt, Send, CheckCircle, MoreHorizontal, AlertCircle } from "lucide-react";
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
  getInvoices,
  sendInvoice,
  markInvoicePaid,
  cancelInvoice,
  deleteInvoice,
} from "@/lib/actions/invoicing";
import { format, isPast } from "date-fns";
import { nl } from "date-fns/locale";

type Invoice = {
  id: number;
  invoiceNumber: string;
  status: string;
  total: string;
  amountDue: string;
  issueDate: Date;
  dueDate: Date;
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
  viewed: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  paid: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  overdue: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  cancelled: "bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400",
};

const statusLabels: Record<string, string> = {
  draft: "Concept",
  sent: "Verzonden",
  viewed: "Bekeken",
  paid: "Betaald",
  overdue: "Verlopen",
  cancelled: "Geannuleerd",
};

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; invoice: Invoice | null }>({
    open: false,
    invoice: null,
  });

  useEffect(() => {
    loadInvoices();
  }, []);

  async function loadInvoices() {
    setIsLoading(true);
    try {
      const data = await getInvoices();
      setInvoices(data as Invoice[]);
    } catch (error) {
      console.error("Failed to load invoices:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSend(id: number) {
    startTransition(async () => {
      try {
        await sendInvoice(id);
        await loadInvoices();
      } catch (error) {
        console.error("Failed to send invoice:", error);
      }
    });
  }

  async function handleMarkPaid(id: number) {
    startTransition(async () => {
      try {
        await markInvoicePaid(id);
        await loadInvoices();
      } catch (error) {
        console.error("Failed to mark invoice as paid:", error);
      }
    });
  }

  async function handleCancel(id: number) {
    startTransition(async () => {
      try {
        await cancelInvoice(id);
        await loadInvoices();
      } catch (error) {
        console.error("Failed to cancel invoice:", error);
      }
    });
  }

  async function handleDelete() {
    if (!deleteDialog.invoice) return;
    startTransition(async () => {
      try {
        await deleteInvoice(deleteDialog.invoice!.id);
        setDeleteDialog({ open: false, invoice: null });
        await loadInvoices();
      } catch (error) {
        console.error("Failed to delete invoice:", error);
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
          <h2 className="text-lg font-semibold">Facturen</h2>
          <p className="text-sm text-zinc-500">
            Beheer je facturen en betalingen
          </p>
        </div>
        <Button asChild>
          <Link href="/crm/invoicing/invoices/new">
            <Plus className="mr-2 h-4 w-4" />
            Nieuwe Factuur
          </Link>
        </Button>
      </div>

      {/* Invoices Table */}
      {invoices.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-zinc-300 py-12 dark:border-zinc-700">
          <Receipt className="mb-4 h-12 w-12 text-zinc-300 dark:text-zinc-600" />
          <p className="mb-2 text-lg font-medium">Geen facturen</p>
          <p className="mb-4 text-sm text-zinc-500">
            Maak je eerste factuur om te beginnen
          </p>
          <Button asChild>
            <Link href="/crm/invoicing/invoices/new">
              <Plus className="mr-2 h-4 w-4" />
              Eerste factuur maken
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
                <TableHead>Vervaldatum</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Openstaand</TableHead>
                <TableHead className="text-right">Totaal</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => {
                const isOverdue =
                  invoice.status === "sent" &&
                  isPast(new Date(invoice.dueDate));

                return (
                  <TableRow key={invoice.id}>
                    <TableCell>
                      <Link
                        href={`/crm/invoicing/invoices/${invoice.id}`}
                        className="font-medium hover:text-violet-600"
                      >
                        {invoice.invoiceNumber}
                      </Link>
                    </TableCell>
                    <TableCell>
                      {invoice.contact?.company ||
                        `${invoice.contact?.firstName ?? ""} ${invoice.contact?.lastName ?? ""}`.trim() ||
                        "-"}
                    </TableCell>
                    <TableCell>
                      {format(new Date(invoice.issueDate), "d MMM yyyy", {
                        locale: nl,
                      })}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {format(new Date(invoice.dueDate), "d MMM yyyy", {
                          locale: nl,
                        })}
                        {isOverdue && (
                          <AlertCircle className="h-4 w-4 text-red-500" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                          isOverdue ? statusColors.overdue : statusColors[invoice.status]
                        }`}
                      >
                        {isOverdue ? "Verlopen" : statusLabels[invoice.status]}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      {parseFloat(invoice.amountDue) > 0 ? (
                        <span className="text-red-600">
                          {formatCurrency(invoice.amountDue)}
                        </span>
                      ) : (
                        "-"
                      )}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {formatCurrency(invoice.total)}
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
                            <Link href={`/crm/invoicing/invoices/${invoice.id}`}>
                              Bekijken
                            </Link>
                          </DropdownMenuItem>
                          {invoice.status === "draft" && (
                            <>
                              <DropdownMenuItem asChild>
                                <Link href={`/crm/invoicing/invoices/${invoice.id}/edit`}>
                                  Bewerken
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleSend(invoice.id)}>
                                <Send className="mr-2 h-4 w-4" />
                                Versturen
                              </DropdownMenuItem>
                            </>
                          )}
                          {(invoice.status === "sent" || invoice.status === "viewed") && (
                            <DropdownMenuItem onClick={() => handleMarkPaid(invoice.id)}>
                              <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                              Markeer als betaald
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          {invoice.status !== "paid" && invoice.status !== "cancelled" && (
                            <DropdownMenuItem
                              onClick={() => handleCancel(invoice.id)}
                              className="text-orange-600"
                            >
                              Annuleren
                            </DropdownMenuItem>
                          )}
                          {invoice.status === "draft" && (
                            <DropdownMenuItem
                              onClick={() => setDeleteDialog({ open: true, invoice })}
                              className="text-red-600"
                            >
                              Verwijderen
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Delete Confirmation */}
      <AlertDialog
        open={deleteDialog.open}
        onOpenChange={(open) => setDeleteDialog({ open, invoice: null })}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Factuur verwijderen?</AlertDialogTitle>
            <AlertDialogDescription>
              Weet je zeker dat je factuur &quot;{deleteDialog.invoice?.invoiceNumber}&quot;
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
