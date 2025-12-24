"use client";

import { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  getSupportStats,
  getSupportTickets,
  updateSupportTicket,
  deleteSupportTicket,
} from "@/lib/actions/admin";
import {
  MessageSquare,
  Inbox,
  Clock,
  AlertCircle,
  CheckCircle2,
  Trash2,
  Loader2,
  RefreshCw,
  ExternalLink,
  Bug,
  Lightbulb,
  HelpCircle,
  MessageCircle,
  MoreHorizontal,
  XCircle,
} from "lucide-react";

type SupportStats = Awaited<ReturnType<typeof getSupportStats>>;
type SupportTicket = Awaited<ReturnType<typeof getSupportTickets>>["tickets"][number];

function getStatusBadge(status: string) {
  switch (status) {
    case "new":
      return (
        <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
          <Inbox className="mr-1 h-3 w-3" />
          Nieuw
        </Badge>
      );
    case "in_progress":
      return (
        <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
          <Clock className="mr-1 h-3 w-3" />
          In behandeling
        </Badge>
      );
    case "waiting_reply":
      return (
        <Badge className="bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400">
          <MessageCircle className="mr-1 h-3 w-3" />
          Wacht op reactie
        </Badge>
      );
    case "resolved":
      return (
        <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
          <CheckCircle2 className="mr-1 h-3 w-3" />
          Opgelost
        </Badge>
      );
    case "closed":
      return (
        <Badge className="bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-500">
          <XCircle className="mr-1 h-3 w-3" />
          Gesloten
        </Badge>
      );
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}

function getPriorityBadge(priority: string) {
  switch (priority) {
    case "urgent":
      return (
        <Badge className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
          Urgent
        </Badge>
      );
    case "high":
      return (
        <Badge className="bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400">
          Hoog
        </Badge>
      );
    case "medium":
      return (
        <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
          Medium
        </Badge>
      );
    case "low":
      return (
        <Badge className="bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
          Laag
        </Badge>
      );
    default:
      return <Badge variant="outline">{priority}</Badge>;
  }
}

function getTypeBadge(type: string) {
  switch (type) {
    case "bug":
      return (
        <Badge variant="outline" className="text-red-600 border-red-200">
          <Bug className="mr-1 h-3 w-3" />
          Bug
        </Badge>
      );
    case "feature_request":
      return (
        <Badge variant="outline" className="text-violet-600 border-violet-200">
          <Lightbulb className="mr-1 h-3 w-3" />
          Feature
        </Badge>
      );
    case "question":
      return (
        <Badge variant="outline" className="text-blue-600 border-blue-200">
          <HelpCircle className="mr-1 h-3 w-3" />
          Vraag
        </Badge>
      );
    case "feedback":
      return (
        <Badge variant="outline" className="text-green-600 border-green-200">
          <MessageCircle className="mr-1 h-3 w-3" />
          Feedback
        </Badge>
      );
    default:
      return (
        <Badge variant="outline">
          <MoreHorizontal className="mr-1 h-3 w-3" />
          Anders
        </Badge>
      );
  }
}

function formatDate(date: Date | null): string {
  if (!date) return "-";
  return new Date(date).toLocaleDateString("nl-NL", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatRelativeTime(date: Date | null): string {
  if (!date) return "-";
  const now = new Date();
  const diff = now.getTime() - new Date(date).getTime();

  if (diff < 3600000) return `${Math.floor(diff / 60000)}m geleden`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}u geleden`;
  return `${Math.floor(diff / 86400000)}d geleden`;
}

export default function SupportInboxPage() {
  const [stats, setStats] = useState<SupportStats | null>(null);
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");

  const loadData = async () => {
    setLoading(true);
    try {
      const [statsData, ticketsData] = await Promise.all([
        getSupportStats(),
        getSupportTickets(),
      ]);
      setStats(statsData);
      setTickets(ticketsData.tickets);
    } catch (error) {
      console.error("Failed to load support tickets:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStatusChange = async (ticketId: number, newStatus: string) => {
    startTransition(async () => {
      await updateSupportTicket(ticketId, {
        status: newStatus as "new" | "in_progress" | "waiting_reply" | "resolved" | "closed",
      });
      await loadData();
    });
  };

  const handlePriorityChange = async (ticketId: number, newPriority: string) => {
    startTransition(async () => {
      await updateSupportTicket(ticketId, {
        priority: newPriority as "low" | "medium" | "high" | "urgent",
      });
      await loadData();
    });
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Weet je zeker dat je dit ticket wilt verwijderen?")) return;

    startTransition(async () => {
      await deleteSupportTicket(id);
      await loadData();
    });
  };

  // Filter tickets
  const filteredTickets = tickets.filter((ticket) => {
    if (statusFilter !== "all" && ticket.status !== statusFilter) return false;
    if (priorityFilter !== "all" && ticket.priority !== priorityFilter) return false;
    return true;
  });

  if (loading && !stats) {
    return (
      <div className="flex h-full items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-violet-500" />
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">Support Inbox</h1>
            <Badge className="bg-gradient-to-r from-red-500 to-orange-500 text-white">
              NEW
            </Badge>
          </div>
          <p className="text-zinc-500">Beheer support tickets en feedback</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => loadData()}
          disabled={loading}
        >
          <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          Vernieuwen
        </Button>
      </div>

      {/* Stats Grid */}
      {stats && (
        <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <div className="dashboard-stat-card rounded-xl border border-zinc-200/50 bg-white/80 p-5 backdrop-blur-sm dark:border-zinc-800/50 dark:bg-zinc-900/80">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-zinc-500">Totaal</p>
                <p className="mt-2 text-2xl font-bold">{stats.total}</p>
                <p className="mt-1 text-xs text-zinc-400">tickets</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-purple-500">
                <MessageSquare className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>

          <div className="dashboard-stat-card rounded-xl border border-blue-200/50 bg-gradient-to-br from-blue-50/80 to-cyan-50/80 p-5 dark:border-blue-900/50 dark:from-blue-950/50 dark:to-cyan-950/50">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-zinc-500">Open</p>
                <p className="mt-2 text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {stats.open}
                </p>
                <p className="mt-1 text-xs text-zinc-400">nieuw</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500">
                <Inbox className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>

          <div className="dashboard-stat-card rounded-xl border border-amber-200/50 bg-gradient-to-br from-amber-50/80 to-orange-50/80 p-5 dark:border-amber-900/50 dark:from-amber-950/50 dark:to-orange-950/50">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-zinc-500">In behandeling</p>
                <p className="mt-2 text-2xl font-bold text-amber-600 dark:text-amber-400">
                  {stats.inProgress}
                </p>
                <p className="mt-1 text-xs text-zinc-400">actief</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-orange-500">
                <Clock className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>

          <div className={`dashboard-stat-card rounded-xl border p-5 backdrop-blur-sm ${
            stats.urgent > 0
              ? "border-red-200/50 bg-gradient-to-br from-red-50/80 to-orange-50/80 dark:border-red-900/50 dark:from-red-950/50 dark:to-orange-950/50"
              : "border-zinc-200/50 bg-white/80 dark:border-zinc-800/50 dark:bg-zinc-900/80"
          }`}>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-zinc-500">Urgent</p>
                <p className={`mt-2 text-2xl font-bold ${
                  stats.urgent > 0 ? "text-red-600 dark:text-red-400" : ""
                }`}>
                  {stats.urgent}
                </p>
                <p className="mt-1 text-xs text-zinc-400">prioriteit</p>
              </div>
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                stats.urgent > 0
                  ? "bg-gradient-to-br from-red-500 to-orange-500"
                  : "bg-gradient-to-br from-zinc-400 to-zinc-500"
              }`}>
                <AlertCircle className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>

          <div className="dashboard-stat-card rounded-xl border border-green-200/50 bg-gradient-to-br from-green-50/80 to-emerald-50/80 p-5 dark:border-green-900/50 dark:from-green-950/50 dark:to-emerald-950/50">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-zinc-500">Opgelost</p>
                <p className="mt-2 text-2xl font-bold text-green-600 dark:text-green-400">
                  {stats.resolvedThisWeek}
                </p>
                <p className="mt-1 text-xs text-zinc-400">deze week</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-emerald-500">
                <CheckCircle2 className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="mb-4 flex gap-4">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter op status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Alle statussen</SelectItem>
            <SelectItem value="new">Nieuw</SelectItem>
            <SelectItem value="in_progress">In behandeling</SelectItem>
            <SelectItem value="waiting_reply">Wacht op reactie</SelectItem>
            <SelectItem value="resolved">Opgelost</SelectItem>
            <SelectItem value="closed">Gesloten</SelectItem>
          </SelectContent>
        </Select>

        <Select value={priorityFilter} onValueChange={setPriorityFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter op prioriteit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Alle prioriteiten</SelectItem>
            <SelectItem value="urgent">Urgent</SelectItem>
            <SelectItem value="high">Hoog</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Laag</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tickets Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Tickets ({filteredTickets.length})</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredTickets.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Onderwerp</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Prioriteit</TableHead>
                  <TableHead>Van</TableHead>
                  <TableHead>Ontvangen</TableHead>
                  <TableHead className="w-[120px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTickets.map((ticket) => (
                  <TableRow key={ticket.id} className={ticket.priority === "urgent" ? "bg-red-50/50 dark:bg-red-950/20" : ""}>
                    <TableCell>
                      <div>
                        <Link
                          href={`/admin/support/${ticket.id}`}
                          className="font-medium hover:text-violet-600 hover:underline"
                        >
                          {ticket.subject}
                        </Link>
                        <p className="max-w-xs truncate text-xs text-zinc-500">
                          {ticket.message}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>{getTypeBadge(ticket.type || "other")}</TableCell>
                    <TableCell>
                      <Select
                        value={ticket.status}
                        onValueChange={(value) => handleStatusChange(ticket.id, value)}
                        disabled={isPending}
                      >
                        <SelectTrigger className="h-8 w-[150px]">
                          {getStatusBadge(ticket.status)}
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new">Nieuw</SelectItem>
                          <SelectItem value="in_progress">In behandeling</SelectItem>
                          <SelectItem value="waiting_reply">Wacht op reactie</SelectItem>
                          <SelectItem value="resolved">Opgelost</SelectItem>
                          <SelectItem value="closed">Gesloten</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={ticket.priority}
                        onValueChange={(value) => handlePriorityChange(ticket.id, value)}
                        disabled={isPending}
                      >
                        <SelectTrigger className="h-8 w-[120px]">
                          {getPriorityBadge(ticket.priority)}
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="urgent">Urgent</SelectItem>
                          <SelectItem value="high">Hoog</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="low">Laag</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm">{ticket.userName || ticket.userEmail}</p>
                        {ticket.org && (
                          <p className="text-xs text-zinc-500">{ticket.org.name}</p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-zinc-500">
                      {formatRelativeTime(ticket.createdAt)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Link href={`/admin/support/${ticket.id}`}>
                          <Button size="sm" variant="ghost" title="Bekijken">
                            <ExternalLink className="h-4 w-4 text-violet-500" />
                          </Button>
                        </Link>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDelete(ticket.id)}
                          disabled={isPending}
                          title="Verwijderen"
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="flex flex-col items-center justify-center py-8">
              <MessageSquare className="mb-2 h-8 w-8 text-zinc-300" />
              <p className="text-sm text-zinc-500">Geen tickets gevonden</p>
              {(statusFilter !== "all" || priorityFilter !== "all") && (
                <Button
                  size="sm"
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setStatusFilter("all");
                    setPriorityFilter("all");
                  }}
                >
                  Filters wissen
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
