"use client";

import { useState, useEffect } from "react";
import { Calculator, TrendingUp, TrendingDown, ArrowRight, Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getAvailableQuarters, getVatReport, type VatReportData, type QuarterOption } from "@/lib/actions/vat-report";
import { cn } from "@/lib/utils";

export default function VatReportPage() {
  const [quarters, setQuarters] = useState<QuarterOption[]>([]);
  const [selectedQuarter, setSelectedQuarter] = useState<string>("");
  const [reportData, setReportData] = useState<VatReportData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadQuarters() {
      try {
        const availableQuarters = await getAvailableQuarters();
        setQuarters(availableQuarters);
        if (availableQuarters.length > 0) {
          setSelectedQuarter(availableQuarters[0].value);
        }
      } catch (error) {
        console.error("Failed to load quarters:", error);
      } finally {
        setLoading(false);
      }
    }
    loadQuarters();
  }, []);

  useEffect(() => {
    async function loadReport() {
      if (!selectedQuarter) return;

      setLoading(true);
      try {
        const [year, q] = selectedQuarter.split("-Q");
        const data = await getVatReport(parseInt(year), parseInt(q));
        setReportData(data);
      } catch (error) {
        console.error("Failed to load report:", error);
      } finally {
        setLoading(false);
      }
    }
    loadReport();
  }, [selectedQuarter]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("nl-NL", {
      style: "currency",
      currency: "EUR",
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("nl-NL", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  if (loading && !reportData) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-violet-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold">BTW Aangifte Overzicht</h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Bekijk je BTW gegevens per kwartaal voor de belastingaangifte
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={selectedQuarter}
            onChange={(e) => setSelectedQuarter(e.target.value)}
            className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm dark:border-zinc-800 dark:bg-zinc-900"
          >
            {quarters.map((q) => (
              <option key={q.value} value={q.value}>
                {q.label}
              </option>
            ))}
          </select>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Exporteer CSV
          </Button>
        </div>
      </div>

      {reportData && (
        <>
          {/* Period Info */}
          <div className="rounded-xl border border-zinc-200/50 bg-white p-4 dark:border-zinc-800/50 dark:bg-zinc-900/50">
            <div className="flex items-center gap-2 text-sm">
              <Calculator className="h-4 w-4 text-violet-500" />
              <span className="font-medium">{reportData.periodLabel}</span>
              <span className="text-zinc-500">
                ({formatDate(reportData.periodStart)} - {formatDate(reportData.periodEnd)})
              </span>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid gap-4 sm:grid-cols-3">
            {/* BTW Ontvangen */}
            <div className="rounded-xl border border-zinc-200/50 bg-white p-5 dark:border-zinc-800/50 dark:bg-zinc-900/50">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30">
                  <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">BTW Ontvangen</p>
                  <p className="text-xl font-bold text-green-600 dark:text-green-400">
                    {formatCurrency(reportData.vatCollected)}
                  </p>
                </div>
              </div>
              <p className="text-xs text-zinc-500">{reportData.invoiceCount} facturen</p>
            </div>

            {/* BTW Betaald */}
            <div className="rounded-xl border border-zinc-200/50 bg-white p-5 dark:border-zinc-800/50 dark:bg-zinc-900/50">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 dark:bg-red-900/30">
                  <TrendingDown className="h-5 w-5 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">BTW Betaald</p>
                  <p className="text-xl font-bold text-red-600 dark:text-red-400">
                    {formatCurrency(reportData.vatPaid)}
                  </p>
                </div>
              </div>
              <p className="text-xs text-zinc-500">{reportData.expenseCount} uitgaven</p>
            </div>

            {/* BTW Saldo */}
            <div className={cn(
              "rounded-xl border p-5",
              reportData.vatDue >= 0
                ? "border-amber-200/50 bg-amber-50 dark:border-amber-900/50 dark:bg-amber-900/20"
                : "border-green-200/50 bg-green-50 dark:border-green-900/50 dark:bg-green-900/20"
            )}>
              <div className="flex items-center gap-3 mb-3">
                <div className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-lg",
                  reportData.vatDue >= 0
                    ? "bg-amber-100 dark:bg-amber-900/30"
                    : "bg-green-100 dark:bg-green-900/30"
                )}>
                  <Calculator className={cn(
                    "h-5 w-5",
                    reportData.vatDue >= 0
                      ? "text-amber-600 dark:text-amber-400"
                      : "text-green-600 dark:text-green-400"
                  )} />
                </div>
                <div>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    {reportData.vatDue >= 0 ? "BTW te Betalen" : "BTW Terug te Krijgen"}
                  </p>
                  <p className={cn(
                    "text-xl font-bold",
                    reportData.vatDue >= 0
                      ? "text-amber-600 dark:text-amber-400"
                      : "text-green-600 dark:text-green-400"
                  )}>
                    {formatCurrency(Math.abs(reportData.vatDue))}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Omzet Details */}
            <div className="rounded-xl border border-zinc-200/50 bg-white dark:border-zinc-800/50 dark:bg-zinc-900/50">
              <div className="border-b border-zinc-200 p-4 dark:border-zinc-800">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-green-500" />
                  <h3 className="font-semibold">Omzet (Uitgaande Facturen)</h3>
                </div>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500">Netto omzet</span>
                  <span className="font-medium">{formatCurrency(reportData.revenueSubtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500">Totaal incl. BTW</span>
                  <span className="font-medium">{formatCurrency(reportData.revenueTotal)}</span>
                </div>
                <div className="border-t border-zinc-200 pt-3 dark:border-zinc-700">
                  <div className="flex justify-between font-semibold">
                    <span>Totaal BTW</span>
                    <span className="text-green-600 dark:text-green-400">
                      {formatCurrency(reportData.revenueTotalTax)}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-zinc-400">
                  {reportData.invoiceCount} betaalde facturen
                </p>
              </div>
            </div>

            {/* Kosten Details */}
            <div className="rounded-xl border border-zinc-200/50 bg-white dark:border-zinc-800/50 dark:bg-zinc-900/50">
              <div className="border-b border-zinc-200 p-4 dark:border-zinc-800">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-red-500" />
                  <h3 className="font-semibold">Kosten (Inkomende Facturen)</h3>
                </div>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-500">Netto kosten</span>
                  <span className="font-medium">{formatCurrency(reportData.expenseSubtotal)}</span>
                </div>
                <div className="border-t border-zinc-100 pt-3 dark:border-zinc-800">
                  <p className="text-xs text-zinc-500 mb-2">BTW per tarief:</p>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-zinc-500">BTW 21%</span>
                      <span>{formatCurrency(reportData.expenseTaxRate21)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-zinc-500">BTW 9%</span>
                      <span>{formatCurrency(reportData.expenseTaxRate9)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-zinc-500">BTW 0%</span>
                      <span>{formatCurrency(reportData.expenseTaxRate0)}</span>
                    </div>
                  </div>
                </div>
                <div className="border-t border-zinc-200 pt-3 dark:border-zinc-700">
                  <div className="flex justify-between font-semibold">
                    <span>Totaal BTW</span>
                    <span className="text-red-600 dark:text-red-400">
                      {formatCurrency(reportData.expenseTotalTax)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Calculation Summary */}
          <div className="rounded-xl border border-zinc-200/50 bg-gradient-to-br from-violet-50 to-blue-50 p-6 dark:border-zinc-800/50 dark:from-violet-900/20 dark:to-blue-900/20">
            <h3 className="font-semibold mb-4">BTW Berekening</h3>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <div className="text-center">
                <p className="text-sm text-zinc-500 mb-1">BTW Ontvangen</p>
                <p className="text-lg font-bold text-green-600 dark:text-green-400">
                  {formatCurrency(reportData.vatCollected)}
                </p>
              </div>
              <ArrowRight className="h-5 w-5 text-zinc-400" />
              <div className="text-center">
                <p className="text-sm text-zinc-500 mb-1">BTW Betaald</p>
                <p className="text-lg font-bold text-red-600 dark:text-red-400">
                  {formatCurrency(reportData.vatPaid)}
                </p>
              </div>
              <span className="text-2xl font-bold text-zinc-400">=</span>
              <div className="text-center">
                <p className="text-sm text-zinc-500 mb-1">
                  {reportData.vatDue >= 0 ? "Te Betalen" : "Terug te Krijgen"}
                </p>
                <p className={cn(
                  "text-2xl font-bold",
                  reportData.vatDue >= 0
                    ? "text-amber-600 dark:text-amber-400"
                    : "text-green-600 dark:text-green-400"
                )}>
                  {formatCurrency(Math.abs(reportData.vatDue))}
                </p>
              </div>
            </div>
          </div>

          {/* Info Box */}
          <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <strong>Let op:</strong> Dit overzicht is gebaseerd op betaalde facturen en uitgaven in de geselecteerde periode.
              Controleer altijd de gegevens met je boekhouding voordat je de BTW aangifte indient.
            </p>
          </div>
        </>
      )}
    </div>
  );
}
