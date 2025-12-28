"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  AlertTriangle,
  RefreshCcw,
  Trash2,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  CheckCircle2,
  XCircle,
  Loader2,
  BarChart3,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface FailedLead {
  id: number;
  leadgenId: string;
  pageId: string;
  formId: string | null;
  status: string;
  errorMessage: string | null;
  retryCount: number;
  fieldData: Record<string, string> | null;
  createdAt: string;
  fetchedAt: string;
  campaignId: string | null;
  adId: string | null;
}

interface Stats {
  total: number;
  pending: number;
  processing: number;
  completed: number;
  failed: number;
  skipped: number;
}

interface ApiResponse {
  leads: FailedLead[];
  total: number;
  stats: Stats;
  pagination: {
    limit: number;
    offset: number;
    hasMore: boolean;
  };
}

export default function FailedLeadsPage() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [retrying, setRetrying] = useState<number | null>(null);
  const [retryingAll, setRetryingAll] = useState(false);
  const [selectedLead, setSelectedLead] = useState<FailedLead | null>(null);
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/integrations/meta/failed-leads");
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch (error) {
      console.error("Failed to fetch:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleRetry = async (leadId: number) => {
    setRetrying(leadId);
    try {
      const res = await fetch("/api/integrations/meta/failed-leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leadId }),
      });
      const result = await res.json();
      if (result.success) {
        // Refresh the list
        await fetchData();
      } else {
        alert(`Retry failed: ${result.error}`);
      }
    } catch (error) {
      console.error("Retry error:", error);
    } finally {
      setRetrying(null);
    }
  };

  const handleRetryAll = async () => {
    if (!confirm("Dit zal alle mislukte leads opnieuw proberen. Doorgaan?")) {
      return;
    }

    setRetryingAll(true);
    try {
      const res = await fetch("/api/integrations/meta/failed-leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "retry-all" }),
      });
      const result = await res.json();
      alert(result.message);
      await fetchData();
    } catch (error) {
      console.error("Retry all error:", error);
    } finally {
      setRetryingAll(false);
    }
  };

  const handleDismiss = async (leadId: number) => {
    if (!confirm("Weet je zeker dat je deze lead wilt negeren?")) {
      return;
    }

    try {
      const res = await fetch(
        `/api/integrations/meta/failed-leads?leadId=${leadId}`,
        { method: "DELETE" }
      );
      if (res.ok) {
        await fetchData();
      }
    } catch (error) {
      console.error("Dismiss error:", error);
    }
  };

  const toggleRow = (id: number) => {
    setExpandedRows((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString("nl-NL", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getErrorCategory = (error: string | null): string => {
    if (!error) return "unknown";
    if (error.includes("routing") || error.includes("route")) return "routing";
    if (error.includes("token") || error.includes("auth")) return "auth";
    if (error.includes("page")) return "page";
    if (error.includes("retry") || error.includes("max")) return "max_retries";
    return "other";
  };

  const getErrorBadge = (error: string | null) => {
    const category = getErrorCategory(error);
    const config: Record<string, { label: string; className: string }> = {
      routing: { label: "Routing", className: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400" },
      auth: { label: "Auth", className: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400" },
      page: { label: "Page", className: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400" },
      max_retries: { label: "Max Retries", className: "bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-400" },
      other: { label: "Error", className: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400" },
      unknown: { label: "Unknown", className: "bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-400" },
    };
    const { label, className } = config[category];
    return <Badge className={cn("font-medium", className)}>{label}</Badge>;
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/crm/settings/integrations"
          className="mb-4 inline-flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
        >
          <ArrowLeft className="h-4 w-4" />
          Terug naar Integraties
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="flex items-center gap-3 text-3xl font-bold">
              <AlertTriangle className="h-8 w-8 text-amber-500" />
              Mislukte Leads
            </h1>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              Bekijk en beheer leads die niet verwerkt konden worden
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={fetchData} disabled={loading}>
              <RefreshCcw className={cn("mr-2 h-4 w-4", loading && "animate-spin")} />
              Vernieuwen
            </Button>
            {data && data.leads.length > 0 && (
              <Button onClick={handleRetryAll} disabled={retryingAll}>
                {retryingAll ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCcw className="mr-2 h-4 w-4" />
                )}
                Alles Opnieuw ({data.leads.length})
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      {data?.stats && (
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
                <BarChart3 className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
              </div>
              <div>
                <p className="text-sm text-zinc-500">Totaal Leads</p>
                <p className="text-2xl font-bold">{data.stats.total}</p>
              </div>
            </div>
          </div>
          <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30">
                <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-zinc-500">Verwerkt</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {data.stats.completed}
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 dark:bg-red-900/30">
                <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <p className="text-sm text-zinc-500">Mislukt</p>
                <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                  {data.stats.failed}
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-900/30">
                <Clock className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <p className="text-sm text-zinc-500">In Wachtrij</p>
                <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                  {data.stats.pending + data.stats.processing}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        {loading && !data ? (
          <div className="flex h-64 items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-zinc-400" />
          </div>
        ) : data && data.leads.length === 0 ? (
          <div className="flex h-64 flex-col items-center justify-center text-center">
            <CheckCircle2 className="mb-4 h-12 w-12 text-green-500" />
            <h3 className="text-lg font-semibold">Geen mislukte leads!</h3>
            <p className="mt-1 text-zinc-500">
              Alle leads zijn succesvol verwerkt
            </p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-8"></TableHead>
                <TableHead>Lead ID</TableHead>
                <TableHead>Fout Type</TableHead>
                <TableHead>Pogingen</TableHead>
                <TableHead>Ontvangen</TableHead>
                <TableHead className="text-right">Acties</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.leads.map((lead) => (
                <>
                  <TableRow key={lead.id} className="cursor-pointer" onClick={() => toggleRow(lead.id)}>
                    <TableCell>
                      <button className="p-1 hover:bg-zinc-100 rounded dark:hover:bg-zinc-800">
                        {expandedRows.has(lead.id) ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </button>
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      {lead.leadgenId.slice(-12)}
                    </TableCell>
                    <TableCell>{getErrorBadge(lead.errorMessage)}</TableCell>
                    <TableCell>
                      <span className={cn(
                        "font-medium",
                        lead.retryCount >= 5 && "text-red-600 dark:text-red-400"
                      )}>
                        {lead.retryCount}/5
                      </span>
                    </TableCell>
                    <TableCell className="text-zinc-500">
                      {formatDate(lead.createdAt)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleRetry(lead.id)}
                          disabled={retrying === lead.id}
                        >
                          {retrying === lead.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <RefreshCcw className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-zinc-500 hover:text-red-600"
                          onClick={() => handleDismiss(lead.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setSelectedLead(lead)}
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  {expandedRows.has(lead.id) && (
                    <TableRow key={`${lead.id}-expanded`}>
                      <TableCell colSpan={6} className="bg-zinc-50 dark:bg-zinc-800/50">
                        <div className="p-4 space-y-4">
                          <div>
                            <h4 className="text-sm font-medium text-zinc-500 mb-1">
                              Foutmelding
                            </h4>
                            <p className="text-sm text-red-600 dark:text-red-400 font-mono bg-red-50 dark:bg-red-900/20 p-2 rounded">
                              {lead.errorMessage || "Geen foutmelding beschikbaar"}
                            </p>
                          </div>
                          {lead.fieldData && Object.keys(lead.fieldData).length > 0 && (
                            <div>
                              <h4 className="text-sm font-medium text-zinc-500 mb-1">
                                Lead Data
                              </h4>
                              <div className="grid gap-2 sm:grid-cols-2">
                                {Object.entries(lead.fieldData).map(([key, value]) => (
                                  <div key={key} className="bg-white dark:bg-zinc-900 p-2 rounded border border-zinc-200 dark:border-zinc-700">
                                    <span className="text-xs text-zinc-500">{key}</span>
                                    <p className="font-medium">{value}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                          <div className="grid gap-2 sm:grid-cols-3 text-sm">
                            <div>
                              <span className="text-zinc-500">Page ID:</span>{" "}
                              <span className="font-mono">{lead.pageId}</span>
                            </div>
                            {lead.formId && (
                              <div>
                                <span className="text-zinc-500">Form ID:</span>{" "}
                                <span className="font-mono">{lead.formId}</span>
                              </div>
                            )}
                            {lead.campaignId && (
                              <div>
                                <span className="text-zinc-500">Campaign:</span>{" "}
                                <span className="font-mono">{lead.campaignId}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      {/* Details Dialog */}
      <Dialog open={!!selectedLead} onOpenChange={() => setSelectedLead(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Lead Details</DialogTitle>
            <DialogDescription>
              Volledige informatie over deze lead
            </DialogDescription>
          </DialogHeader>
          {selectedLead && (
            <div className="space-y-4 mt-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-zinc-500">Lead ID</label>
                  <p className="font-mono">{selectedLead.leadgenId}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-zinc-500">Status</label>
                  <p>{getErrorBadge(selectedLead.errorMessage)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-zinc-500">Ontvangen</label>
                  <p>{formatDate(selectedLead.createdAt)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-zinc-500">Pogingen</label>
                  <p>{selectedLead.retryCount}/5</p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-zinc-500">Foutmelding</label>
                <p className="mt-1 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg text-red-700 dark:text-red-300 font-mono text-sm">
                  {selectedLead.errorMessage || "Geen foutmelding beschikbaar"}
                </p>
              </div>

              {selectedLead.fieldData && Object.keys(selectedLead.fieldData).length > 0 && (
                <div>
                  <label className="text-sm font-medium text-zinc-500">Lead Data</label>
                  <div className="mt-1 grid gap-2">
                    {Object.entries(selectedLead.fieldData).map(([key, value]) => (
                      <div key={key} className="flex justify-between p-2 bg-zinc-50 dark:bg-zinc-800 rounded">
                        <span className="text-zinc-500">{key}</span>
                        <span className="font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-2 pt-4">
                <Button onClick={() => { handleRetry(selectedLead.id); setSelectedLead(null); }}>
                  <RefreshCcw className="mr-2 h-4 w-4" />
                  Opnieuw Proberen
                </Button>
                <Button variant="outline" onClick={() => { handleDismiss(selectedLead.id); setSelectedLead(null); }}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Negeren
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
