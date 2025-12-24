"use server";

import { db } from "@/lib/db";
import { invoices, expenses } from "@/lib/db/schema";
import { requireAuthContext } from "@/lib/auth/context";
import { eq, and, gte, lte, sql } from "drizzle-orm";
import { startOfQuarter, endOfQuarter } from "date-fns";

export interface VatReportData {
  // Revenue (uitgaande facturen)
  revenueSubtotal: number;
  revenueTotalTax: number;
  revenueTotal: number;
  invoiceCount: number;

  // Expenses (inkomende facturen)
  expenseSubtotal: number;
  expenseTaxRate21: number;
  expenseTaxRate9: number;
  expenseTaxRate0: number;
  expenseTotalTax: number;
  expenseTotal: number;
  expenseCount: number;

  // BTW berekening
  vatCollected: number; // BTW ontvangen (omzet)
  vatPaid: number; // BTW betaald (kosten)
  vatDue: number; // BTW te betalen/terugkrijgen

  // Period info
  periodStart: Date;
  periodEnd: Date;
  periodLabel: string;
}

export interface QuarterOption {
  value: string;
  label: string;
  year: number;
  quarter: number;
}

// Get available quarters for selection
export async function getAvailableQuarters(): Promise<QuarterOption[]> {
  const quarters: QuarterOption[] = [];
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentQuarter = Math.ceil((now.getMonth() + 1) / 3);

  // Generate quarters: current year + previous year only
  for (let year = currentYear; year >= currentYear - 1; year--) {
    const maxQuarter = year === currentYear ? currentQuarter : 4;
    for (let quarter = maxQuarter; quarter >= 1; quarter--) {
      quarters.push({
        value: `${year}-Q${quarter}`,
        label: `Q${quarter} ${year}`,
        year,
        quarter,
      });
    }
  }

  return quarters;
}

// Get VAT report for a specific quarter
export async function getVatReport(year: number, quarter: number): Promise<VatReportData> {
  const ctx = await requireAuthContext();

  // Calculate period dates
  const baseDate = new Date(year, (quarter - 1) * 3, 1);
  const periodStart = startOfQuarter(baseDate);
  const periodEnd = endOfQuarter(baseDate);

  // Get revenue data from paid invoices (using issueDate)
  const [revenueData] = await db
    .select({
      subtotal: sql<number>`COALESCE(SUM(${invoices.subtotal}::numeric), 0)`,
      totalTax: sql<number>`COALESCE(SUM(${invoices.taxAmount}::numeric), 0)`,
      total: sql<number>`COALESCE(SUM(${invoices.total}::numeric), 0)`,
      count: sql<number>`COUNT(*)`,
    })
    .from(invoices)
    .where(
      and(
        eq(invoices.workspaceId, ctx.workspace.id),
        eq(invoices.status, "paid"),
        gte(invoices.issueDate, periodStart),
        lte(invoices.issueDate, periodEnd)
      )
    );

  // Get expense data from paid expenses (expenses have taxRate per expense)
  const [expenseData] = await db
    .select({
      subtotal: sql<number>`COALESCE(SUM(${expenses.subtotal}::numeric), 0)`,
      taxRate21: sql<number>`COALESCE(SUM(CASE WHEN ${expenses.taxRate}::numeric >= 20 AND ${expenses.taxRate}::numeric <= 22 THEN ${expenses.taxAmount}::numeric ELSE 0 END), 0)`,
      taxRate9: sql<number>`COALESCE(SUM(CASE WHEN ${expenses.taxRate}::numeric >= 8 AND ${expenses.taxRate}::numeric <= 10 THEN ${expenses.taxAmount}::numeric ELSE 0 END), 0)`,
      taxRate0: sql<number>`COALESCE(SUM(CASE WHEN ${expenses.taxRate}::numeric = 0 THEN ${expenses.taxAmount}::numeric ELSE 0 END), 0)`,
      totalTax: sql<number>`COALESCE(SUM(${expenses.taxAmount}::numeric), 0)`,
      total: sql<number>`COALESCE(SUM(${expenses.total}::numeric), 0)`,
      count: sql<number>`COUNT(*)`,
    })
    .from(expenses)
    .where(
      and(
        eq(expenses.workspaceId, ctx.workspace.id),
        eq(expenses.status, "paid"),
        gte(expenses.invoiceDate, periodStart),
        lte(expenses.invoiceDate, periodEnd)
      )
    );

  const vatCollected = Number(revenueData?.totalTax) || 0;
  const vatPaid = Number(expenseData?.totalTax) || 0;

  return {
    revenueSubtotal: Number(revenueData?.subtotal) || 0,
    revenueTotalTax: vatCollected,
    revenueTotal: Number(revenueData?.total) || 0,
    invoiceCount: Number(revenueData?.count) || 0,

    expenseSubtotal: Number(expenseData?.subtotal) || 0,
    expenseTaxRate21: Number(expenseData?.taxRate21) || 0,
    expenseTaxRate9: Number(expenseData?.taxRate9) || 0,
    expenseTaxRate0: Number(expenseData?.taxRate0) || 0,
    expenseTotalTax: vatPaid,
    expenseTotal: Number(expenseData?.total) || 0,
    expenseCount: Number(expenseData?.count) || 0,

    vatCollected,
    vatPaid,
    vatDue: vatCollected - vatPaid,

    periodStart,
    periodEnd,
    periodLabel: `Q${quarter} ${year}`,
  };
}

// Get annual VAT summary
export async function getAnnualVatSummary(year: number): Promise<{
  quarters: VatReportData[];
  yearTotal: VatReportData;
}> {
  const quarters: VatReportData[] = [];

  for (let q = 1; q <= 4; q++) {
    const quarterData = await getVatReport(year, q);
    quarters.push(quarterData);
  }

  // Calculate year totals
  const yearTotal: VatReportData = {
    revenueSubtotal: quarters.reduce((sum, q) => sum + q.revenueSubtotal, 0),
    revenueTotalTax: quarters.reduce((sum, q) => sum + q.revenueTotalTax, 0),
    revenueTotal: quarters.reduce((sum, q) => sum + q.revenueTotal, 0),
    invoiceCount: quarters.reduce((sum, q) => sum + q.invoiceCount, 0),

    expenseSubtotal: quarters.reduce((sum, q) => sum + q.expenseSubtotal, 0),
    expenseTaxRate21: quarters.reduce((sum, q) => sum + q.expenseTaxRate21, 0),
    expenseTaxRate9: quarters.reduce((sum, q) => sum + q.expenseTaxRate9, 0),
    expenseTaxRate0: quarters.reduce((sum, q) => sum + q.expenseTaxRate0, 0),
    expenseTotalTax: quarters.reduce((sum, q) => sum + q.expenseTotalTax, 0),
    expenseTotal: quarters.reduce((sum, q) => sum + q.expenseTotal, 0),
    expenseCount: quarters.reduce((sum, q) => sum + q.expenseCount, 0),

    vatCollected: quarters.reduce((sum, q) => sum + q.vatCollected, 0),
    vatPaid: quarters.reduce((sum, q) => sum + q.vatPaid, 0),
    vatDue: quarters.reduce((sum, q) => sum + q.vatDue, 0),

    periodStart: new Date(year, 0, 1),
    periodEnd: new Date(year, 11, 31),
    periodLabel: `Jaar ${year}`,
  };

  return { quarters, yearTotal };
}
