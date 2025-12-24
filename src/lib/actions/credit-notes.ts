"use server";

import { db } from "@/lib/db";
import {
  creditNotes,
  creditNoteLineItems,
  invoiceSettings,
  invoices,
  contacts,
} from "@/lib/db/schema";
import { eq, and, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { requireAuthContext } from "@/lib/auth/context";
import { sendEmail, CreditNoteEmail } from "@/lib/email";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import React from "react";

// ============================================
// Types
// ============================================
export type CreditNoteStatus = "draft" | "issued" | "applied" | "refunded" | "cancelled";

export interface LineItemInput {
  productId?: number;
  description: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  taxRate: number;
}

export interface CreateCreditNoteInput {
  contactId: number;
  invoiceId?: number;
  issueDate: Date;
  reason?: string;
  notes?: string;
  currency?: string;
  lineItems: LineItemInput[];
}

export interface UpdateCreditNoteInput {
  contactId?: number;
  invoiceId?: number | null;
  issueDate?: Date;
  reason?: string;
  notes?: string;
  currency?: string;
  lineItems?: LineItemInput[];
}

// ============================================
// Helpers
// ============================================

function calculateLineItem(item: LineItemInput) {
  const subtotal = item.quantity * item.unitPrice;
  const taxAmount = subtotal * (item.taxRate / 100);
  const total = subtotal + taxAmount;
  return { subtotal, taxAmount, total };
}

function calculateDocumentTotals(items: Array<LineItemInput & { subtotal: number; taxAmount: number; total: number }>) {
  const subtotal = items.reduce((sum, item) => sum + item.subtotal, 0);
  const taxAmount = items.reduce((sum, item) => sum + item.taxAmount, 0);
  const total = items.reduce((sum, item) => sum + item.total, 0);

  return {
    subtotal: subtotal.toFixed(2),
    taxAmount: taxAmount.toFixed(2),
    total: total.toFixed(2),
  };
}

async function getNextCreditNoteNumber(workspaceId: number): Promise<string> {
  const [settings] = await db
    .select({
      prefix: invoiceSettings.creditNotePrefix,
      nextNumber: invoiceSettings.creditNoteNextNumber,
    })
    .from(invoiceSettings)
    .where(eq(invoiceSettings.workspaceId, workspaceId))
    .limit(1);

  const prefix = settings?.prefix || "CN";
  const number = settings?.nextNumber || 1;
  const creditNoteNumber = `${prefix}${String(number).padStart(4, "0")}`;

  // Increment the next number
  await db
    .update(invoiceSettings)
    .set({
      creditNoteNextNumber: number + 1,
      updatedAt: new Date(),
    })
    .where(eq(invoiceSettings.workspaceId, workspaceId));

  return creditNoteNumber;
}

// ============================================
// CRUD Operations
// ============================================

/**
 * Get all credit notes for the current workspace
 */
export async function getCreditNotes() {
  const ctx = await requireAuthContext();

  const results = await db
    .select({
      id: creditNotes.id,
      creditNoteNumber: creditNotes.creditNoteNumber,
      status: creditNotes.status,
      subtotal: creditNotes.subtotal,
      taxAmount: creditNotes.taxAmount,
      total: creditNotes.total,
      currency: creditNotes.currency,
      reason: creditNotes.reason,
      issueDate: creditNotes.issueDate,
      sentAt: creditNotes.sentAt,
      appliedAt: creditNotes.appliedAt,
      refundedAt: creditNotes.refundedAt,
      createdAt: creditNotes.createdAt,
      invoiceId: creditNotes.invoiceId,
      contact: {
        id: contacts.id,
        firstName: contacts.firstName,
        lastName: contacts.lastName,
        company: contacts.company,
        email: contacts.email,
      },
    })
    .from(creditNotes)
    .leftJoin(contacts, eq(creditNotes.contactId, contacts.id))
    .where(eq(creditNotes.workspaceId, ctx.workspace.id))
    .orderBy(desc(creditNotes.createdAt));

  return results;
}

/**
 * Get a single credit note with line items
 */
export async function getCreditNote(id: number) {
  const ctx = await requireAuthContext();

  const [creditNote] = await db
    .select()
    .from(creditNotes)
    .where(
      and(
        eq(creditNotes.id, id),
        eq(creditNotes.workspaceId, ctx.workspace.id)
      )
    )
    .limit(1);

  if (!creditNote) return null;

  // Get line items
  const items = await db
    .select()
    .from(creditNoteLineItems)
    .where(eq(creditNoteLineItems.creditNoteId, id))
    .orderBy(creditNoteLineItems.sortOrder);

  // Get contact
  const [contact] = await db
    .select()
    .from(contacts)
    .where(eq(contacts.id, creditNote.contactId))
    .limit(1);

  // Get related invoice if exists
  let invoice = null;
  if (creditNote.invoiceId) {
    const [inv] = await db
      .select({
        id: invoices.id,
        invoiceNumber: invoices.invoiceNumber,
        total: invoices.total,
      })
      .from(invoices)
      .where(eq(invoices.id, creditNote.invoiceId))
      .limit(1);
    invoice = inv || null;
  }

  return { ...creditNote, lineItems: items, contact, invoice };
}

/**
 * Create a new credit note
 */
export async function createCreditNote(input: CreateCreditNoteInput) {
  const ctx = await requireAuthContext();

  // Get settings for defaults
  const [settings] = await db
    .select()
    .from(invoiceSettings)
    .where(eq(invoiceSettings.workspaceId, ctx.workspace.id))
    .limit(1);

  // Calculate line items
  const calculatedItems = input.lineItems.map((item, index) => {
    const calc = calculateLineItem(item);
    return {
      ...item,
      ...calc,
      sortOrder: index,
    };
  });

  // Calculate totals
  const totals = calculateDocumentTotals(calculatedItems);

  // Generate credit note number
  const creditNoteNumber = await getNextCreditNoteNumber(ctx.workspace.id);

  // Create credit note
  const [creditNote] = await db
    .insert(creditNotes)
    .values({
      workspaceId: ctx.workspace.id,
      contactId: input.contactId,
      invoiceId: input.invoiceId,
      creditNoteNumber,
      issueDate: input.issueDate,
      reason: input.reason,
      notes: input.notes,
      currency: input.currency ?? settings?.defaultCurrency ?? "EUR",
      subtotal: totals.subtotal,
      taxAmount: totals.taxAmount,
      total: totals.total,
    })
    .returning();

  // Create line items
  if (calculatedItems.length > 0) {
    await db.insert(creditNoteLineItems).values(
      calculatedItems.map((item) => ({
        creditNoteId: creditNote.id,
        productId: item.productId,
        description: item.description,
        quantity: item.quantity.toString(),
        unit: item.unit,
        unitPrice: item.unitPrice.toString(),
        taxRate: item.taxRate.toString(),
        subtotal: item.subtotal.toFixed(2),
        taxAmount: item.taxAmount.toFixed(2),
        total: item.total.toFixed(2),
        sortOrder: item.sortOrder,
      }))
    );
  }

  revalidatePath("/crm/invoicing/credit-notes");

  return creditNote;
}

/**
 * Update a credit note (only if draft)
 */
export async function updateCreditNote(id: number, input: UpdateCreditNoteInput) {
  const ctx = await requireAuthContext();

  // Get current credit note
  const [current] = await db
    .select()
    .from(creditNotes)
    .where(
      and(
        eq(creditNotes.id, id),
        eq(creditNotes.workspaceId, ctx.workspace.id)
      )
    )
    .limit(1);

  if (!current) {
    throw new Error("Credit note not found");
  }

  if (current.status !== "draft") {
    throw new Error("Can only edit draft credit notes");
  }

  // Prepare update data
  const updateData: Record<string, unknown> = {
    updatedAt: new Date(),
  };

  if (input.contactId !== undefined) updateData.contactId = input.contactId;
  if (input.invoiceId !== undefined) updateData.invoiceId = input.invoiceId;
  if (input.issueDate !== undefined) updateData.issueDate = input.issueDate;
  if (input.reason !== undefined) updateData.reason = input.reason;
  if (input.notes !== undefined) updateData.notes = input.notes;
  if (input.currency !== undefined) updateData.currency = input.currency;

  // Update line items if provided
  if (input.lineItems) {
    // Delete existing line items
    await db
      .delete(creditNoteLineItems)
      .where(eq(creditNoteLineItems.creditNoteId, id));

    // Calculate and insert new line items
    const calculatedItems = input.lineItems.map((item, index) => {
      const calc = calculateLineItem(item);
      return {
        ...item,
        ...calc,
        sortOrder: index,
      };
    });

    const totals = calculateDocumentTotals(calculatedItems);

    updateData.subtotal = totals.subtotal;
    updateData.taxAmount = totals.taxAmount;
    updateData.total = totals.total;

    if (calculatedItems.length > 0) {
      await db.insert(creditNoteLineItems).values(
        calculatedItems.map((item) => ({
          creditNoteId: id,
          productId: item.productId,
          description: item.description,
          quantity: item.quantity.toString(),
          unit: item.unit,
          unitPrice: item.unitPrice.toString(),
          taxRate: item.taxRate.toString(),
          subtotal: item.subtotal.toFixed(2),
          taxAmount: item.taxAmount.toFixed(2),
          total: item.total.toFixed(2),
          sortOrder: item.sortOrder,
        }))
      );
    }
  }

  // Update credit note
  const [updated] = await db
    .update(creditNotes)
    .set(updateData)
    .where(
      and(
        eq(creditNotes.id, id),
        eq(creditNotes.workspaceId, ctx.workspace.id)
      )
    )
    .returning();

  revalidatePath("/crm/invoicing/credit-notes");
  revalidatePath(`/crm/invoicing/credit-notes/${id}`);

  return updated;
}

/**
 * Issue a credit note (change status from draft to issued)
 */
export async function issueCreditNote(id: number) {
  const ctx = await requireAuthContext();

  const [creditNote] = await db
    .select()
    .from(creditNotes)
    .where(
      and(
        eq(creditNotes.id, id),
        eq(creditNotes.workspaceId, ctx.workspace.id)
      )
    )
    .limit(1);

  if (!creditNote) {
    throw new Error("Credit note not found");
  }

  if (creditNote.status !== "draft") {
    throw new Error("Can only issue draft credit notes");
  }

  const [updated] = await db
    .update(creditNotes)
    .set({
      status: "issued",
      updatedAt: new Date(),
    })
    .where(eq(creditNotes.id, id))
    .returning();

  revalidatePath("/crm/invoicing/credit-notes");
  revalidatePath(`/crm/invoicing/credit-notes/${id}`);

  return updated;
}

/**
 * Apply credit note to invoice (reduces invoice amount due)
 */
export async function applyCreditNote(id: number, invoiceId: number) {
  const ctx = await requireAuthContext();

  const [creditNote] = await db
    .select()
    .from(creditNotes)
    .where(
      and(
        eq(creditNotes.id, id),
        eq(creditNotes.workspaceId, ctx.workspace.id)
      )
    )
    .limit(1);

  if (!creditNote) {
    throw new Error("Credit note not found");
  }

  if (creditNote.status !== "issued") {
    throw new Error("Can only apply issued credit notes");
  }

  // Get the invoice
  const [invoice] = await db
    .select()
    .from(invoices)
    .where(
      and(
        eq(invoices.id, invoiceId),
        eq(invoices.workspaceId, ctx.workspace.id)
      )
    )
    .limit(1);

  if (!invoice) {
    throw new Error("Invoice not found");
  }

  // Calculate new amount due
  const creditAmount = parseFloat(creditNote.total);
  const currentAmountDue = parseFloat(invoice.amountDue);
  const newAmountDue = Math.max(0, currentAmountDue - creditAmount);
  const newAmountPaid = parseFloat(invoice.amountPaid) + creditAmount;

  // Determine new invoice status (only change to paid if fully settled)
  let newInvoiceStatus = invoice.status;
  if (newAmountDue <= 0) {
    newInvoiceStatus = "paid";
  }

  // Update invoice
  await db
    .update(invoices)
    .set({
      amountDue: newAmountDue.toFixed(2),
      amountPaid: newAmountPaid.toFixed(2),
      status: newInvoiceStatus,
      paidAt: newInvoiceStatus === "paid" ? new Date() : invoice.paidAt,
      updatedAt: new Date(),
    })
    .where(eq(invoices.id, invoiceId));

  // Update credit note
  const [updated] = await db
    .update(creditNotes)
    .set({
      status: "applied",
      invoiceId,
      appliedAt: new Date(),
      updatedAt: new Date(),
    })
    .where(eq(creditNotes.id, id))
    .returning();

  revalidatePath("/crm/invoicing/credit-notes");
  revalidatePath(`/crm/invoicing/credit-notes/${id}`);
  revalidatePath("/crm/invoicing/invoices");
  revalidatePath(`/crm/invoicing/invoices/${invoiceId}`);

  return updated;
}

/**
 * Mark credit note as refunded
 */
export async function markCreditNoteRefunded(id: number) {
  const ctx = await requireAuthContext();

  const [creditNote] = await db
    .select()
    .from(creditNotes)
    .where(
      and(
        eq(creditNotes.id, id),
        eq(creditNotes.workspaceId, ctx.workspace.id)
      )
    )
    .limit(1);

  if (!creditNote) {
    throw new Error("Credit note not found");
  }

  if (creditNote.status !== "issued") {
    throw new Error("Can only refund issued credit notes");
  }

  const [updated] = await db
    .update(creditNotes)
    .set({
      status: "refunded",
      refundedAt: new Date(),
      updatedAt: new Date(),
    })
    .where(eq(creditNotes.id, id))
    .returning();

  revalidatePath("/crm/invoicing/credit-notes");
  revalidatePath(`/crm/invoicing/credit-notes/${id}`);

  return updated;
}

/**
 * Cancel a credit note
 */
export async function cancelCreditNote(id: number) {
  const ctx = await requireAuthContext();

  const [creditNote] = await db
    .select()
    .from(creditNotes)
    .where(
      and(
        eq(creditNotes.id, id),
        eq(creditNotes.workspaceId, ctx.workspace.id)
      )
    )
    .limit(1);

  if (!creditNote) {
    throw new Error("Credit note not found");
  }

  if (creditNote.status === "applied" || creditNote.status === "refunded") {
    throw new Error("Cannot cancel applied or refunded credit notes");
  }

  const [updated] = await db
    .update(creditNotes)
    .set({
      status: "cancelled",
      updatedAt: new Date(),
    })
    .where(eq(creditNotes.id, id))
    .returning();

  revalidatePath("/crm/invoicing/credit-notes");
  revalidatePath(`/crm/invoicing/credit-notes/${id}`);

  return updated;
}

/**
 * Delete a credit note (only if draft)
 */
export async function deleteCreditNote(id: number) {
  const ctx = await requireAuthContext();

  const [creditNote] = await db
    .select()
    .from(creditNotes)
    .where(
      and(
        eq(creditNotes.id, id),
        eq(creditNotes.workspaceId, ctx.workspace.id)
      )
    )
    .limit(1);

  if (!creditNote) {
    throw new Error("Credit note not found");
  }

  if (creditNote.status !== "draft") {
    throw new Error("Can only delete draft credit notes");
  }

  await db.delete(creditNotes).where(eq(creditNotes.id, id));

  revalidatePath("/crm/invoicing/credit-notes");
}

/**
 * Send credit note via email
 */
export async function sendCreditNote(id: number) {
  const ctx = await requireAuthContext();

  // Get credit note with contact and invoice
  const creditNote = await getCreditNote(id);

  if (!creditNote) {
    throw new Error("Credit note not found");
  }

  if (!creditNote.contact?.email) {
    throw new Error("Contact has no email address");
  }

  if (creditNote.status === "draft") {
    throw new Error("Cannot send draft credit notes. Please issue first.");
  }

  // Get settings for company info
  const [settings] = await db
    .select()
    .from(invoiceSettings)
    .where(eq(invoiceSettings.workspaceId, ctx.workspace.id))
    .limit(1);

  const companyName = settings?.companyName || ctx.workspace.name || "LeadFlow";

  // Format values
  const total = new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: creditNote.currency || "EUR",
  }).format(parseFloat(creditNote.total || "0"));

  const issueDate = format(new Date(creditNote.issueDate), "d MMMM yyyy", { locale: nl });

  const customerName =
    creditNote.contact.company ||
    `${creditNote.contact.firstName || ""} ${creditNote.contact.lastName || ""}`.trim() ||
    "Klant";

  // Build view URL
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://app.wetryleadflow.com";
  const viewUrl = `${baseUrl}/api/invoicing/pdf/credit-note/${id}`;

  // Send email
  await sendEmail({
    to: creditNote.contact.email,
    subject: `Creditnota ${creditNote.creditNoteNumber} van ${companyName}`,
    templateName: "credit-note",
    from: `${companyName} <invoice@wetryleadflow.com>`,
    replyTo: settings?.companyEmail || undefined,
    template: React.createElement(CreditNoteEmail, {
      customerName,
      creditNoteNumber: creditNote.creditNoteNumber,
      total,
      issueDate,
      reason: creditNote.reason || undefined,
      companyName,
      companyEmail: settings?.companyEmail || undefined,
      iban: settings?.iban || undefined,
      relatedInvoice: creditNote.invoice?.invoiceNumber,
      viewUrl,
    }),
    context: {
      orgId: ctx.org.id,
      workspaceId: ctx.workspace.id,
    },
    relatedEntity: {
      type: "credit_note",
      id: creditNote.id,
    },
  });

  // Update sent timestamp
  await db
    .update(creditNotes)
    .set({
      sentAt: new Date(),
      updatedAt: new Date(),
    })
    .where(eq(creditNotes.id, id));

  revalidatePath("/crm/invoicing/credit-notes");
  revalidatePath(`/crm/invoicing/credit-notes/${id}`);

  return { success: true };
}

/**
 * Get invoice settings (helper for PDF generation)
 */
export async function getInvoiceSettingsForCreditNote() {
  const ctx = await requireAuthContext();

  const [settings] = await db
    .select()
    .from(invoiceSettings)
    .where(eq(invoiceSettings.workspaceId, ctx.workspace.id))
    .limit(1);

  return settings || null;
}
