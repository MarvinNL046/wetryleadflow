"use server";

import { db } from "@/lib/db";
import { expenses, type Expense, type NewExpense } from "@/lib/db/schema";
import { requireAuthContext } from "@/lib/auth/context";
import { eq, desc, and, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";

// Helper function to get category labels
export async function getExpenseCategoryLabels() {
  return {
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
}

// Helper function to get status labels
export async function getExpenseStatusLabels() {
  return {
    pending: "In afwachting",
    approved: "Goedgekeurd",
    paid: "Betaald",
    rejected: "Afgewezen",
  };
}

// Get all expenses for workspace
export async function getExpenses() {
  const ctx = await requireAuthContext();

  const result = await db.query.expenses.findMany({
    where: eq(expenses.workspaceId, ctx.workspace.id),
    orderBy: [desc(expenses.invoiceDate)],
  });

  return result;
}

// Get expense by ID
export async function getExpense(id: number) {
  const ctx = await requireAuthContext();

  const expense = await db.query.expenses.findFirst({
    where: and(
      eq(expenses.id, id),
      eq(expenses.workspaceId, ctx.workspace.id)
    ),
  });

  return expense;
}

// Create new expense
export async function createExpense(data: {
  vendorName: string;
  vendorEmail?: string;
  invoiceNumber?: string;
  description?: string;
  category: string;
  subtotal: number;
  taxRate: number;
  invoiceDate: Date;
  dueDate?: Date;
  notes?: string;
  receiptUrl?: string;
}) {
  const ctx = await requireAuthContext();

  // Calculate tax and total
  const taxAmount = (data.subtotal * data.taxRate) / 100;
  const total = data.subtotal + taxAmount;

  const [expense] = await db.insert(expenses).values({
    workspaceId: ctx.workspace.id,
    vendorName: data.vendorName,
    vendorEmail: data.vendorEmail || null,
    invoiceNumber: data.invoiceNumber || null,
    description: data.description || null,
    category: data.category as "office" | "travel" | "software" | "marketing" | "supplies" | "utilities" | "insurance" | "professional" | "equipment" | "other",
    subtotal: data.subtotal.toFixed(2),
    taxRate: data.taxRate.toFixed(2),
    taxAmount: taxAmount.toFixed(2),
    total: total.toFixed(2),
    invoiceDate: data.invoiceDate,
    dueDate: data.dueDate || null,
    notes: data.notes || null,
    receiptUrl: data.receiptUrl || null,
    createdBy: String(ctx.user.id),
    status: "pending",
  }).returning();

  revalidatePath("/crm/invoicing/expenses");
  return expense;
}

// Update expense
export async function updateExpense(id: number, data: {
  vendorName?: string;
  vendorEmail?: string;
  invoiceNumber?: string;
  description?: string;
  category?: string;
  subtotal?: number;
  taxRate?: number;
  invoiceDate?: Date;
  dueDate?: Date;
  notes?: string;
  receiptUrl?: string;
  status?: string;
}) {
  const ctx = await requireAuthContext();

  // Check ownership
  const existing = await getExpense(id);
  if (!existing) {
    throw new Error("Expense not found");
  }

  // Calculate tax and total if subtotal or taxRate changed
  let updates: Partial<Expense> = {
    updatedAt: new Date(),
  };

  if (data.vendorName) updates.vendorName = data.vendorName;
  if (data.vendorEmail !== undefined) updates.vendorEmail = data.vendorEmail || null;
  if (data.invoiceNumber !== undefined) updates.invoiceNumber = data.invoiceNumber || null;
  if (data.description !== undefined) updates.description = data.description || null;
  if (data.category) updates.category = data.category as typeof existing.category;
  if (data.invoiceDate) updates.invoiceDate = data.invoiceDate;
  if (data.dueDate !== undefined) updates.dueDate = data.dueDate || null;
  if (data.notes !== undefined) updates.notes = data.notes || null;
  if (data.receiptUrl !== undefined) updates.receiptUrl = data.receiptUrl || null;
  if (data.status) {
    updates.status = data.status as typeof existing.status;
    if (data.status === "approved") {
      updates.approvedBy = String(ctx.user.id);
    }
  }

  // Recalculate amounts if needed
  if (data.subtotal !== undefined || data.taxRate !== undefined) {
    const subtotal = data.subtotal ?? parseFloat(existing.subtotal);
    const taxRate = data.taxRate ?? parseFloat(existing.taxRate);
    const taxAmount = (subtotal * taxRate) / 100;
    const total = subtotal + taxAmount;

    updates.subtotal = subtotal.toFixed(2);
    updates.taxRate = taxRate.toFixed(2);
    updates.taxAmount = taxAmount.toFixed(2);
    updates.total = total.toFixed(2);
  }

  const [updated] = await db.update(expenses)
    .set(updates)
    .where(and(
      eq(expenses.id, id),
      eq(expenses.workspaceId, ctx.workspace.id)
    ))
    .returning();

  revalidatePath("/crm/invoicing/expenses");
  return updated;
}

// Mark expense as paid
export async function markExpenseAsPaid(id: number) {
  const ctx = await requireAuthContext();

  const [updated] = await db.update(expenses)
    .set({
      status: "paid",
      paidAt: new Date(),
      updatedAt: new Date(),
    })
    .where(and(
      eq(expenses.id, id),
      eq(expenses.workspaceId, ctx.workspace.id)
    ))
    .returning();

  revalidatePath("/crm/invoicing/expenses");
  return updated;
}

// Approve expense
export async function approveExpense(id: number) {
  const ctx = await requireAuthContext();

  const [updated] = await db.update(expenses)
    .set({
      status: "approved",
      approvedBy: String(ctx.user.id),
      updatedAt: new Date(),
    })
    .where(and(
      eq(expenses.id, id),
      eq(expenses.workspaceId, ctx.workspace.id)
    ))
    .returning();

  revalidatePath("/crm/invoicing/expenses");
  return updated;
}

// Reject expense
export async function rejectExpense(id: number) {
  const ctx = await requireAuthContext();

  const [updated] = await db.update(expenses)
    .set({
      status: "rejected",
      updatedAt: new Date(),
    })
    .where(and(
      eq(expenses.id, id),
      eq(expenses.workspaceId, ctx.workspace.id)
    ))
    .returning();

  revalidatePath("/crm/invoicing/expenses");
  return updated;
}

// Delete expense
export async function deleteExpense(id: number) {
  const ctx = await requireAuthContext();

  await db.delete(expenses)
    .where(and(
      eq(expenses.id, id),
      eq(expenses.workspaceId, ctx.workspace.id)
    ));

  revalidatePath("/crm/invoicing/expenses");
}

// Get expense statistics
export async function getExpenseStats() {
  const ctx = await requireAuthContext();

  // Get totals by status
  const stats = await db.select({
    totalPending: sql<string>`COALESCE(SUM(CASE WHEN status = 'pending' THEN total ELSE 0 END), 0)`,
    totalApproved: sql<string>`COALESCE(SUM(CASE WHEN status = 'approved' THEN total ELSE 0 END), 0)`,
    totalPaid: sql<string>`COALESCE(SUM(CASE WHEN status = 'paid' THEN total ELSE 0 END), 0)`,
    countPending: sql<number>`COUNT(CASE WHEN status = 'pending' THEN 1 END)`,
    countApproved: sql<number>`COUNT(CASE WHEN status = 'approved' THEN 1 END)`,
    countPaid: sql<number>`COUNT(CASE WHEN status = 'paid' THEN 1 END)`,
    thisMonth: sql<string>`COALESCE(SUM(CASE WHEN invoice_date >= date_trunc('month', NOW()) THEN total ELSE 0 END), 0)`,
  })
    .from(expenses)
    .where(eq(expenses.workspaceId, ctx.workspace.id));

  return {
    totalPending: parseFloat(stats[0]?.totalPending || "0"),
    totalApproved: parseFloat(stats[0]?.totalApproved || "0"),
    totalPaid: parseFloat(stats[0]?.totalPaid || "0"),
    countPending: stats[0]?.countPending || 0,
    countApproved: stats[0]?.countApproved || 0,
    countPaid: stats[0]?.countPaid || 0,
    thisMonth: parseFloat(stats[0]?.thisMonth || "0"),
  };
}
