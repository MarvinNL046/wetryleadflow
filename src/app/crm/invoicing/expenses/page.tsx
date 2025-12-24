"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Search, Building2, Calendar, CheckCircle, Clock, XCircle, MoreHorizontal, Receipt, TrendingUp, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { getExpenses, getExpenseStats, markExpenseAsPaid, approveExpense, rejectExpense, deleteExpense } from "@/lib/actions/expenses";

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

// Status labels in Dutch
const expenseStatusLabels: Record<string, string> = {
  pending: "In afwachting",
  approved: "Goedgekeurd",
  paid: "Betaald",
  rejected: "Afgewezen",
};

import { cn } from "@/lib/utils";

type Expense = {
  id: number;
  vendorName: string;
  vendorEmail: string | null;
  invoiceNumber: string | null;
  description: string | null;
  category: string;
  subtotal: string;
  taxAmount: string;
  taxRate: string;
  total: string;
  currency: string;
  invoiceDate: Date;
  dueDate: Date | null;
  paidAt: Date | null;
  status: string;
  receiptUrl: string | null;
  notes: string | null;
  createdAt: Date;
};

type Stats = {
  totalPending: number;
  totalApproved: number;
  totalPaid: number;
  countPending: number;
  countApproved: number;
  countPaid: number;
  thisMonth: number;
};

const statusConfig: Record<string, { icon: typeof Clock; color: string; bg: string }> = {
  pending: { icon: Clock, color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-100 dark:bg-amber-900/30" },
  approved: { icon: CheckCircle, color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-100 dark:bg-blue-900/30" },
  paid: { icon: CheckCircle, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-100 dark:bg-emerald-900/30" },
  rejected: { icon: XCircle, color: "text-red-600 dark:text-red-400", bg: "bg-red-100 dark:bg-red-900/30" },
};

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  useEffect(() => {
    async function load() {
      try {
        const [expenseData, statsData] = await Promise.all([
          getExpenses(),
          getExpenseStats(),
        ]);
        setExpenses(expenseData as Expense[]);
        setStats(statsData);
      } catch (error) {
        console.error("Failed to load expenses:", error);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch =
      expense.vendorName.toLowerCase().includes(search.toLowerCase()) ||
      expense.invoiceNumber?.toLowerCase().includes(search.toLowerCase()) ||
      expense.description?.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === "all" || expense.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleAction = async (action: string, id: number) => {
    try {
      if (action === "pay") {
        await markExpenseAsPaid(id);
      } else if (action === "approve") {
        await approveExpense(id);
      } else if (action === "reject") {
        await rejectExpense(id);
      } else if (action === "delete") {
        if (confirm("Weet je zeker dat je deze uitgave wilt verwijderen?")) {
          await deleteExpense(id);
        }
      }
      // Reload data
      const [expenseData, statsData] = await Promise.all([
        getExpenses(),
        getExpenseStats(),
      ]);
      setExpenses(expenseData as Expense[]);
      setStats(statsData);
    } catch (error) {
      console.error("Action failed:", error);
    }
  };

  const formatCurrency = (amount: string | number) => {
    const num = typeof amount === "string" ? parseFloat(amount) : amount;
    return new Intl.NumberFormat("nl-NL", {
      style: "currency",
      currency: "EUR",
    }).format(num);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("nl-NL", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-violet-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      {stats && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-zinc-200/50 bg-white p-4 dark:border-zinc-800/50 dark:bg-zinc-900/50">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-900/30">
                <Clock className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">In afwachting</p>
                <p className="text-xl font-bold">{formatCurrency(stats.totalPending)}</p>
                <p className="text-xs text-zinc-400">{stats.countPending} uitgaven</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-zinc-200/50 bg-white p-4 dark:border-zinc-800/50 dark:bg-zinc-900/50">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
                <CheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">Goedgekeurd</p>
                <p className="text-xl font-bold">{formatCurrency(stats.totalApproved)}</p>
                <p className="text-xs text-zinc-400">{stats.countApproved} uitgaven</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-zinc-200/50 bg-white p-4 dark:border-zinc-800/50 dark:bg-zinc-900/50">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                <Receipt className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">Betaald</p>
                <p className="text-xl font-bold">{formatCurrency(stats.totalPaid)}</p>
                <p className="text-xs text-zinc-400">{stats.countPaid} uitgaven</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-zinc-200/50 bg-white p-4 dark:border-zinc-800/50 dark:bg-zinc-900/50">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-100 dark:bg-violet-900/30">
                <TrendingUp className="h-5 w-5 text-violet-600 dark:text-violet-400" />
              </div>
              <div>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">Deze maand</p>
                <p className="text-xl font-bold">{formatCurrency(stats.thisMonth)}</p>
                <p className="text-xs text-zinc-400">totale uitgaven</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header with search and actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 items-center gap-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
            <Input
              placeholder="Zoek op leverancier, factuurnummer..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm dark:border-zinc-800 dark:bg-zinc-900"
          >
            <option value="all">Alle statussen</option>
            <option value="pending">In afwachting</option>
            <option value="approved">Goedgekeurd</option>
            <option value="paid">Betaald</option>
            <option value="rejected">Afgewezen</option>
          </select>
        </div>
        <Link href="/crm/invoicing/expenses/new">
          <Button className="bg-gradient-to-r from-violet-600 to-blue-600 text-white shadow-lg shadow-violet-500/25">
            <Plus className="mr-2 h-4 w-4" />
            Nieuwe Uitgave
          </Button>
        </Link>
      </div>

      {/* Expenses Table */}
      <div className="rounded-xl border border-zinc-200/50 bg-white dark:border-zinc-800/50 dark:bg-zinc-900/50">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Leverancier</TableHead>
              <TableHead>Categorie</TableHead>
              <TableHead>Factuurnummer</TableHead>
              <TableHead>Datum</TableHead>
              <TableHead className="text-right">Bedrag</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredExpenses.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-32 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <Receipt className="h-8 w-8 text-zinc-300 dark:text-zinc-600" />
                    <p className="text-sm text-zinc-500">Geen uitgaven gevonden</p>
                    <Link href="/crm/invoicing/expenses/new">
                      <Button variant="outline" size="sm">
                        <Plus className="mr-2 h-4 w-4" />
                        Voeg eerste uitgave toe
                      </Button>
                    </Link>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredExpenses.map((expense) => {
                const config = statusConfig[expense.status];
                const StatusIcon = config.icon;

                return (
                  <TableRow key={expense.id} className="group">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
                          <Building2 className="h-4 w-4 text-zinc-500" />
                        </div>
                        <div>
                          <p className="font-medium">{expense.vendorName}</p>
                          {expense.description && (
                            <p className="text-xs text-zinc-500 line-clamp-1">{expense.description}</p>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="inline-flex rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                        {expenseCategoryLabels[expense.category] || expense.category}
                      </span>
                    </TableCell>
                    <TableCell>
                      {expense.invoiceNumber || (
                        <span className="text-zinc-400">—</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5 text-sm text-zinc-600 dark:text-zinc-400">
                        <Calendar className="h-3.5 w-3.5" />
                        {formatDate(expense.invoiceDate)}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <p className="font-semibold">{formatCurrency(expense.total)}</p>
                      <p className="text-xs text-zinc-500">
                        excl. {formatCurrency(expense.subtotal)}
                      </p>
                    </TableCell>
                    <TableCell>
                      <span className={cn(
                        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
                        config.bg,
                        config.color
                      )}>
                        <StatusIcon className="h-3 w-3" />
                        {expenseStatusLabels[expense.status]}
                      </span>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {expense.status === "pending" && (
                            <>
                              <DropdownMenuItem onClick={() => handleAction("approve", expense.id)}>
                                <CheckCircle className="mr-2 h-4 w-4 text-blue-500" />
                                Goedkeuren
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleAction("reject", expense.id)}>
                                <XCircle className="mr-2 h-4 w-4 text-red-500" />
                                Afwijzen
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                            </>
                          )}
                          {(expense.status === "pending" || expense.status === "approved") && (
                            <DropdownMenuItem onClick={() => handleAction("pay", expense.id)}>
                              <Receipt className="mr-2 h-4 w-4 text-emerald-500" />
                              Markeer als betaald
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleAction("delete", expense.id)}
                            className="text-red-600 focus:text-red-600"
                          >
                            Verwijderen
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
