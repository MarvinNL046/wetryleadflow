"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, RefreshCw, Calendar, Pause, Play, MoreHorizontal } from "lucide-react";
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
import { getRecurringInvoices, toggleRecurringInvoiceActive } from "@/lib/actions/recurring-invoices";
import { format } from "date-fns";
import { nl } from "date-fns/locale";

type RecurringInvoice = Awaited<ReturnType<typeof getRecurringInvoices>>[number];

const frequencyLabels: Record<string, string> = {
  weekly: "Wekelijks",
  monthly: "Maandelijks",
  quarterly: "Per kwartaal",
  yearly: "Jaarlijks",
};

export default function RecurringInvoicesPage() {
  const [invoices, setInvoices] = useState<RecurringInvoice[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadInvoices();
  }, []);

  async function loadInvoices() {
    setIsLoading(true);
    try {
      const data = await getRecurringInvoices();
      setInvoices(data);
    } catch (error) {
      console.error("Failed to load recurring invoices:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleToggleActive(id: number) {
    try {
      await toggleRecurringInvoiceActive(id);
      await loadInvoices();
    } catch (error) {
      console.error("Failed to toggle status:", error);
    }
  }

  const formatCurrency = (amount: string, currency: string = "EUR") => {
    return new Intl.NumberFormat("nl-NL", {
      style: "currency",
      currency,
    }).format(parseFloat(amount));
  };

  const getContactName = (invoice: RecurringInvoice) => {
    if (!invoice.contact) return "Onbekend";
    return (
      invoice.contact.company ||
      `${invoice.contact.firstName || ""} ${invoice.contact.lastName || ""}`.trim() ||
      "Onbekend"
    );
  };

  // Stats
  const activeCount = invoices.filter((i) => i.isActive).length;
  const totalGenerated = invoices.reduce((sum, i) => sum + i.invoicesGenerated, 0);

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
          <h2 className="text-lg font-semibold">Terugkerende Facturen</h2>
          <p className="text-sm text-zinc-500">
            Automatisch facturen genereren op een vast schema
          </p>
        </div>
        <Button asChild>
          <Link href="/crm/invoicing/recurring/new">
            <Plus className="mr-2 h-4 w-4" />
            Nieuwe terugkerende factuur
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-zinc-500">
              Totaal templates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{invoices.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-zinc-500">
              Actief
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{activeCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-zinc-500">
              Facturen gegenereerd
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalGenerated}</div>
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          {invoices.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <RefreshCw className="h-12 w-12 text-zinc-300 mb-4" />
              <h3 className="text-lg font-medium text-zinc-900 mb-1">
                Nog geen terugkerende facturen
              </h3>
              <p className="text-sm text-zinc-500 mb-4">
                Maak een template aan om automatisch facturen te genereren
              </p>
              <Button asChild>
                <Link href="/crm/invoicing/recurring/new">
                  <Plus className="mr-2 h-4 w-4" />
                  Eerste template aanmaken
                </Link>
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Titel</TableHead>
                  <TableHead>Klant</TableHead>
                  <TableHead>Frequentie</TableHead>
                  <TableHead>Bedrag</TableHead>
                  <TableHead>Volgende run</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell>
                      <Link
                        href={`/crm/invoicing/recurring/${invoice.id}`}
                        className="font-medium hover:text-violet-600"
                      >
                        {invoice.title || "Zonder titel"}
                      </Link>
                      {invoice.autoSend && (
                        <Badge variant="outline" className="ml-2 text-xs">
                          Auto-verzenden
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>{getContactName(invoice)}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        {frequencyLabels[invoice.frequency] || invoice.frequency}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">
                      {formatCurrency(invoice.total, invoice.currency)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-zinc-400" />
                        {invoice.nextRunDate
                          ? format(new Date(invoice.nextRunDate), "d MMM yyyy", { locale: nl })
                          : "-"}
                      </div>
                    </TableCell>
                    <TableCell>
                      {invoice.isActive ? (
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                          Actief
                        </Badge>
                      ) : (
                        <Badge variant="secondary">Gepauzeerd</Badge>
                      )}
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
                            <Link href={`/crm/invoicing/recurring/${invoice.id}`}>
                              Bekijken
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleToggleActive(invoice.id)}>
                            {invoice.isActive ? (
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
                          </DropdownMenuItem>
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
