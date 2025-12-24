"use server";

import { db } from "@/lib/db";
import { recurringInvoices, contacts } from "@/lib/db/schema";
import { eq, and, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { requireAuthContext } from "@/lib/auth/context";
import { calculateNextRunDate, type RecurringFrequency } from "@/lib/utils/recurring-invoice";

export interface LineItemTemplate {
  productId?: number;
  description: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  taxRate: number;
  discountPercent: number;
}

export interface CreateRecurringInvoiceInput {
  contactId: number;
  title?: string;
  introduction?: string;
  terms?: string;
  notes?: string;
  lineItems: LineItemTemplate[];
  frequency: RecurringFrequency;
  dayOfMonth?: number;
  dayOfWeek?: number;
  paymentTerms?: number;
  currency?: string;
  startDate: Date;
  endDate?: Date;
  autoSend?: boolean;
}

export interface UpdateRecurringInvoiceInput {
  contactId?: number;
  title?: string;
  introduction?: string;
  terms?: string;
  notes?: string;
  lineItems?: LineItemTemplate[];
  frequency?: RecurringFrequency;
  dayOfMonth?: number;
  dayOfWeek?: number;
  paymentTerms?: number;
  currency?: string;
  startDate?: Date;
  endDate?: Date | null;
  autoSend?: boolean;
  isActive?: boolean;
}

// ============================================
// CRUD Operations
// ============================================

/**
 * Get all recurring invoices for the current workspace
 */
export async function getRecurringInvoices() {
  const ctx = await requireAuthContext();

  const results = await db
    .select({
      id: recurringInvoices.id,
      title: recurringInvoices.title,
      frequency: recurringInvoices.frequency,
      nextRunDate: recurringInvoices.nextRunDate,
      lastRunDate: recurringInvoices.lastRunDate,
      isActive: recurringInvoices.isActive,
      autoSend: recurringInvoices.autoSend,
      invoicesGenerated: recurringInvoices.invoicesGenerated,
      currency: recurringInvoices.currency,
      createdAt: recurringInvoices.createdAt,
      contact: {
        id: contacts.id,
        firstName: contacts.firstName,
        lastName: contacts.lastName,
        company: contacts.company,
        email: contacts.email,
      },
      lineItemsTemplate: recurringInvoices.lineItemsTemplate,
    })
    .from(recurringInvoices)
    .leftJoin(contacts, eq(recurringInvoices.contactId, contacts.id))
    .where(eq(recurringInvoices.workspaceId, ctx.workspace.id))
    .orderBy(desc(recurringInvoices.createdAt));

  // Calculate total from line items
  return results.map((r) => {
    const lineItems = r.lineItemsTemplate as LineItemTemplate[];
    const total = lineItems.reduce((sum, item) => {
      const subtotal = item.quantity * item.unitPrice * (1 - item.discountPercent / 100);
      const tax = subtotal * (item.taxRate / 100);
      return sum + subtotal + tax;
    }, 0);

    return {
      ...r,
      total: total.toFixed(2),
    };
  });
}

/**
 * Get a single recurring invoice by ID
 */
export async function getRecurringInvoice(id: number) {
  const ctx = await requireAuthContext();

  const [result] = await db
    .select({
      id: recurringInvoices.id,
      workspaceId: recurringInvoices.workspaceId,
      contactId: recurringInvoices.contactId,
      title: recurringInvoices.title,
      introduction: recurringInvoices.introduction,
      terms: recurringInvoices.terms,
      notes: recurringInvoices.notes,
      lineItemsTemplate: recurringInvoices.lineItemsTemplate,
      frequency: recurringInvoices.frequency,
      dayOfMonth: recurringInvoices.dayOfMonth,
      dayOfWeek: recurringInvoices.dayOfWeek,
      paymentTerms: recurringInvoices.paymentTerms,
      currency: recurringInvoices.currency,
      startDate: recurringInvoices.startDate,
      endDate: recurringInvoices.endDate,
      nextRunDate: recurringInvoices.nextRunDate,
      lastRunDate: recurringInvoices.lastRunDate,
      isActive: recurringInvoices.isActive,
      autoSend: recurringInvoices.autoSend,
      invoicesGenerated: recurringInvoices.invoicesGenerated,
      createdAt: recurringInvoices.createdAt,
      updatedAt: recurringInvoices.updatedAt,
      contact: {
        id: contacts.id,
        firstName: contacts.firstName,
        lastName: contacts.lastName,
        company: contacts.company,
        email: contacts.email,
      },
    })
    .from(recurringInvoices)
    .leftJoin(contacts, eq(recurringInvoices.contactId, contacts.id))
    .where(
      and(
        eq(recurringInvoices.id, id),
        eq(recurringInvoices.workspaceId, ctx.workspace.id)
      )
    )
    .limit(1);

  return result || null;
}

/**
 * Create a new recurring invoice
 */
export async function createRecurringInvoice(input: CreateRecurringInvoiceInput) {
  const ctx = await requireAuthContext();

  const dayOfMonth = input.dayOfMonth || 1;
  const dayOfWeek = input.dayOfWeek || 1;

  // Calculate first run date
  const nextRunDate = calculateNextRunDate(
    input.frequency,
    input.startDate,
    dayOfMonth,
    dayOfWeek
  );

  const [result] = await db
    .insert(recurringInvoices)
    .values({
      workspaceId: ctx.workspace.id,
      contactId: input.contactId,
      title: input.title,
      introduction: input.introduction,
      terms: input.terms,
      notes: input.notes,
      lineItemsTemplate: input.lineItems,
      frequency: input.frequency,
      dayOfMonth,
      dayOfWeek,
      paymentTerms: input.paymentTerms || 14,
      currency: input.currency || "EUR",
      startDate: input.startDate,
      endDate: input.endDate,
      nextRunDate,
      isActive: true,
      autoSend: input.autoSend || false,
    })
    .returning();

  revalidatePath("/crm/invoicing/recurring");

  return result;
}

/**
 * Update a recurring invoice
 */
export async function updateRecurringInvoice(id: number, input: UpdateRecurringInvoiceInput) {
  const ctx = await requireAuthContext();

  // Get current record to calculate new next run date if needed
  const [current] = await db
    .select()
    .from(recurringInvoices)
    .where(
      and(
        eq(recurringInvoices.id, id),
        eq(recurringInvoices.workspaceId, ctx.workspace.id)
      )
    )
    .limit(1);

  if (!current) {
    throw new Error("Recurring invoice not found");
  }

  // Calculate new next run date if frequency or timing changed
  let nextRunDate = current.nextRunDate;
  if (input.frequency || input.dayOfMonth !== undefined || input.dayOfWeek !== undefined || input.startDate) {
    nextRunDate = calculateNextRunDate(
      input.frequency || current.frequency,
      input.startDate || current.startDate,
      input.dayOfMonth ?? current.dayOfMonth,
      input.dayOfWeek ?? current.dayOfWeek ?? 1,
      current.lastRunDate || undefined
    );
  }

  const [result] = await db
    .update(recurringInvoices)
    .set({
      contactId: input.contactId,
      title: input.title,
      introduction: input.introduction,
      terms: input.terms,
      notes: input.notes,
      lineItemsTemplate: input.lineItems,
      frequency: input.frequency,
      dayOfMonth: input.dayOfMonth,
      dayOfWeek: input.dayOfWeek,
      paymentTerms: input.paymentTerms,
      currency: input.currency,
      startDate: input.startDate,
      endDate: input.endDate,
      isActive: input.isActive,
      autoSend: input.autoSend,
      nextRunDate,
      updatedAt: new Date(),
    })
    .where(
      and(
        eq(recurringInvoices.id, id),
        eq(recurringInvoices.workspaceId, ctx.workspace.id)
      )
    )
    .returning();

  revalidatePath("/crm/invoicing/recurring");
  revalidatePath(`/crm/invoicing/recurring/${id}`);

  return result;
}

/**
 * Delete a recurring invoice
 */
export async function deleteRecurringInvoice(id: number) {
  const ctx = await requireAuthContext();

  await db
    .delete(recurringInvoices)
    .where(
      and(
        eq(recurringInvoices.id, id),
        eq(recurringInvoices.workspaceId, ctx.workspace.id)
      )
    );

  revalidatePath("/crm/invoicing/recurring");
}

/**
 * Toggle active status of a recurring invoice
 */
export async function toggleRecurringInvoiceActive(id: number) {
  const ctx = await requireAuthContext();

  const [current] = await db
    .select({ isActive: recurringInvoices.isActive })
    .from(recurringInvoices)
    .where(
      and(
        eq(recurringInvoices.id, id),
        eq(recurringInvoices.workspaceId, ctx.workspace.id)
      )
    )
    .limit(1);

  if (!current) {
    throw new Error("Recurring invoice not found");
  }

  const [result] = await db
    .update(recurringInvoices)
    .set({
      isActive: !current.isActive,
      updatedAt: new Date(),
    })
    .where(
      and(
        eq(recurringInvoices.id, id),
        eq(recurringInvoices.workspaceId, ctx.workspace.id)
      )
    )
    .returning();

  revalidatePath("/crm/invoicing/recurring");
  revalidatePath(`/crm/invoicing/recurring/${id}`);

  return result;
}
