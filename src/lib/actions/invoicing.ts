"use server";

import * as React from "react";
import { revalidatePath } from "next/cache";
import { eq, and, desc, sql, gte, lte, sum } from "drizzle-orm";
import { db } from "@/lib/db";
import {
  products,
  quotations,
  invoices,
  lineItems,
  payments,
  invoiceSettings,
  contacts,
} from "@/lib/db/schema";
import { requireAuthContext } from "@/lib/auth/context";
import { sendEmail, InvoiceEmail, QuotationEmail } from "@/lib/email";
import { createInvoicePaymentLink } from "@/lib/stripe/payment-links";
import { format } from "date-fns";
import { nl } from "date-fns/locale";

// ============================================
// Products
// ============================================

export async function getProducts() {
  const ctx = await requireAuthContext();

  return await db.query.products.findMany({
    where: and(
      eq(products.workspaceId, ctx.workspace.id),
      eq(products.isActive, true)
    ),
    orderBy: [products.sortOrder, products.name],
  });
}

export async function getProduct(id: number) {
  const ctx = await requireAuthContext();

  return await db.query.products.findFirst({
    where: and(
      eq(products.id, id),
      eq(products.workspaceId, ctx.workspace.id)
    ),
  });
}

export async function createProduct(data: {
  name: string;
  description?: string;
  sku?: string;
  unitPrice: string;
  unit?: string;
  taxRate?: string;
}) {
  const ctx = await requireAuthContext();

  const [product] = await db
    .insert(products)
    .values({
      workspaceId: ctx.workspace.id,
      name: data.name,
      description: data.description,
      sku: data.sku,
      unitPrice: data.unitPrice,
      unit: data.unit ?? "stuk",
      taxRate: data.taxRate ?? "21.00",
    })
    .returning();

  revalidatePath("/crm/invoicing/products");
  return product;
}

export async function updateProduct(
  id: number,
  data: {
    name?: string;
    description?: string;
    sku?: string;
    unitPrice?: string;
    unit?: string;
    taxRate?: string;
    isActive?: boolean;
  }
) {
  const ctx = await requireAuthContext();

  const [product] = await db
    .update(products)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(
      and(eq(products.id, id), eq(products.workspaceId, ctx.workspace.id))
    )
    .returning();

  revalidatePath("/crm/invoicing/products");
  return product;
}

export async function deleteProduct(id: number) {
  const ctx = await requireAuthContext();

  // Soft delete by setting isActive to false
  await db
    .update(products)
    .set({ isActive: false, updatedAt: new Date() })
    .where(
      and(eq(products.id, id), eq(products.workspaceId, ctx.workspace.id))
    );

  revalidatePath("/crm/invoicing/products");
}

// ============================================
// Invoice Settings & Numbering
// ============================================

export async function getInvoiceSettings() {
  const ctx = await requireAuthContext();

  let settings = await db.query.invoiceSettings.findFirst({
    where: eq(invoiceSettings.workspaceId, ctx.workspace.id),
  });

  // Create default settings if not exists
  if (!settings) {
    [settings] = await db
      .insert(invoiceSettings)
      .values({
        workspaceId: ctx.workspace.id,
      })
      .returning();
  }

  return settings;
}

export async function updateInvoiceSettings(data: {
  quotationPrefix?: string;
  invoicePrefix?: string;
  defaultPaymentTerms?: number;
  defaultTaxRate?: string;
  defaultCurrency?: string;
  companyName?: string;
  companyAddress?: string;
  companyEmail?: string;
  companyPhone?: string;
  companyWebsite?: string;
  companyLogo?: string;
  kvkNumber?: string;
  vatNumber?: string;
  iban?: string;
  bic?: string;
  defaultIntroduction?: string;
  defaultTerms?: string;
  defaultFooter?: string;
  enableReminders?: boolean;
  reminderDays?: number[];
}) {
  const ctx = await requireAuthContext();

  // Destructure reminderDays separately to handle JSONB type correctly
  const { reminderDays, ...restData } = data;

  const [settings] = await db
    .update(invoiceSettings)
    .set({
      ...restData,
      ...(reminderDays !== undefined ? { reminderDays } : {}),
      updatedAt: new Date(),
    })
    .where(eq(invoiceSettings.workspaceId, ctx.workspace.id))
    .returning();

  revalidatePath("/crm/invoicing/settings");
  return settings;
}

async function getNextQuotationNumber(workspaceId: number): Promise<string> {
  const settings = await db.query.invoiceSettings.findFirst({
    where: eq(invoiceSettings.workspaceId, workspaceId),
  });

  const prefix = settings?.quotationPrefix ?? "OFF";
  const nextNumber = settings?.quotationNextNumber ?? 1;
  const year = new Date().getFullYear();
  const number = nextNumber.toString().padStart(4, "0");

  // Increment counter
  await db
    .update(invoiceSettings)
    .set({ quotationNextNumber: nextNumber + 1 })
    .where(eq(invoiceSettings.workspaceId, workspaceId));

  return `${prefix}-${year}-${number}`;
}

async function getNextInvoiceNumber(workspaceId: number): Promise<string> {
  const settings = await db.query.invoiceSettings.findFirst({
    where: eq(invoiceSettings.workspaceId, workspaceId),
  });

  const prefix = settings?.invoicePrefix ?? "FAC";
  const nextNumber = settings?.invoiceNextNumber ?? 1;
  const year = new Date().getFullYear();
  const number = nextNumber.toString().padStart(4, "0");

  // Increment counter
  await db
    .update(invoiceSettings)
    .set({ invoiceNextNumber: nextNumber + 1 })
    .where(eq(invoiceSettings.workspaceId, workspaceId));

  return `${prefix}-${year}-${number}`;
}

// ============================================
// Line Item Calculations
// ============================================

function calculateLineItem(item: {
  quantity: number;
  unitPrice: number;
  taxRate: number;
  discountPercent?: number;
}) {
  const subtotal = item.quantity * item.unitPrice;
  const discountAmount = subtotal * ((item.discountPercent ?? 0) / 100);
  const afterDiscount = subtotal - discountAmount;
  const taxAmount = afterDiscount * (item.taxRate / 100);
  const total = afterDiscount + taxAmount;

  return {
    subtotal: subtotal.toFixed(2),
    taxAmount: taxAmount.toFixed(2),
    total: total.toFixed(2),
  };
}

function calculateDocumentTotals(
  items: Array<{
    subtotal: string;
    taxAmount: string;
    total: string;
  }>,
  discount?: { type: "percentage" | "fixed"; value: number }
) {
  const subtotal = items.reduce((sum, item) => sum + parseFloat(item.subtotal), 0);
  const taxAmount = items.reduce((sum, item) => sum + parseFloat(item.taxAmount), 0);

  let discountAmount = 0;
  if (discount) {
    discountAmount =
      discount.type === "percentage"
        ? subtotal * (discount.value / 100)
        : discount.value;
  }

  const total = subtotal + taxAmount - discountAmount;

  return {
    subtotal: subtotal.toFixed(2),
    taxAmount: taxAmount.toFixed(2),
    discountAmount: discountAmount.toFixed(2),
    total: total.toFixed(2),
  };
}

// ============================================
// Quotations
// ============================================

export async function getQuotations(filters?: {
  status?: string;
  contactId?: number;
}) {
  const ctx = await requireAuthContext();

  const conditions = [eq(quotations.workspaceId, ctx.workspace.id)];

  if (filters?.status) {
    conditions.push(eq(quotations.status, filters.status as any));
  }
  if (filters?.contactId) {
    conditions.push(eq(quotations.contactId, filters.contactId));
  }

  return await db.query.quotations.findMany({
    where: and(...conditions),
    orderBy: [desc(quotations.createdAt)],
    with: {
      contact: true,
    },
  });
}

export async function getQuotation(id: number) {
  const ctx = await requireAuthContext();

  const quotation = await db.query.quotations.findFirst({
    where: and(
      eq(quotations.id, id),
      eq(quotations.workspaceId, ctx.workspace.id)
    ),
    with: {
      contact: true,
      opportunity: true,
    },
  });

  if (!quotation) return null;

  // Get line items
  const items = await db.query.lineItems.findMany({
    where: eq(lineItems.quotationId, id),
    orderBy: [lineItems.sortOrder],
  });

  return { ...quotation, lineItems: items };
}

export async function createQuotation(data: {
  contactId: number;
  opportunityId?: number;
  issueDate: Date;
  validUntil?: Date;
  title?: string;
  introduction?: string;
  terms?: string;
  notes?: string;
  currency?: string;
  lineItems: Array<{
    productId?: number;
    description: string;
    quantity: number;
    unit: string;
    unitPrice: number;
    taxRate: number;
    discountPercent?: number;
  }>;
  discountType?: "percentage" | "fixed";
  discountValue?: number;
}) {
  const ctx = await requireAuthContext();

  // Get settings for defaults
  const settings = await getInvoiceSettings();

  // Calculate line items
  const calculatedItems = data.lineItems.map((item, index) => {
    const calc = calculateLineItem(item);
    return {
      ...item,
      ...calc,
      sortOrder: index,
    };
  });

  // Calculate totals
  const totals = calculateDocumentTotals(
    calculatedItems,
    data.discountType && data.discountValue
      ? { type: data.discountType, value: data.discountValue }
      : undefined
  );

  // Generate quotation number
  const quotationNumber = await getNextQuotationNumber(ctx.workspace.id);

  // Create quotation
  const [quotation] = await db
    .insert(quotations)
    .values({
      workspaceId: ctx.workspace.id,
      contactId: data.contactId,
      opportunityId: data.opportunityId,
      quotationNumber,
      issueDate: data.issueDate,
      validUntil: data.validUntil,
      title: data.title,
      introduction: data.introduction ?? settings.defaultIntroduction,
      terms: data.terms ?? settings.defaultTerms,
      notes: data.notes,
      discountType: data.discountType,
      discountValue: data.discountValue?.toString(),
      subtotal: totals.subtotal,
      taxAmount: totals.taxAmount,
      discountAmount: totals.discountAmount,
      total: totals.total,
      currency: data.currency ?? settings.defaultCurrency ?? "EUR",
    })
    .returning();

  // Create line items
  if (calculatedItems.length > 0) {
    await db.insert(lineItems).values(
      calculatedItems.map((item) => ({
        quotationId: quotation.id,
        productId: item.productId,
        description: item.description,
        quantity: item.quantity.toString(),
        unit: item.unit,
        unitPrice: item.unitPrice.toString(),
        taxRate: item.taxRate.toString(),
        taxAmount: item.taxAmount,
        discountPercent: (item.discountPercent ?? 0).toString(),
        subtotal: item.subtotal,
        total: item.total,
        sortOrder: item.sortOrder,
      }))
    );
  }

  revalidatePath("/crm/invoicing/quotations");
  return quotation;
}

export async function updateQuotation(
  id: number,
  data: {
    contactId?: number;
    opportunityId?: number;
    issueDate?: Date;
    validUntil?: Date;
    title?: string;
    introduction?: string;
    terms?: string;
    notes?: string;
    lineItems?: Array<{
      id?: number;
      productId?: number;
      description: string;
      quantity: number;
      unit: string;
      unitPrice: number;
      taxRate: number;
      discountPercent?: number;
    }>;
    discountType?: "percentage" | "fixed";
    discountValue?: number;
  }
) {
  const ctx = await requireAuthContext();

  // Check ownership and status
  const existing = await db.query.quotations.findFirst({
    where: and(
      eq(quotations.id, id),
      eq(quotations.workspaceId, ctx.workspace.id)
    ),
  });

  if (!existing) throw new Error("Quotation not found");
  if (existing.status !== "draft") {
    throw new Error("Only draft quotations can be edited");
  }

  // If line items are updated, recalculate totals
  let totals = {
    subtotal: existing.subtotal,
    taxAmount: existing.taxAmount,
    discountAmount: existing.discountAmount,
    total: existing.total,
  };

  if (data.lineItems) {
    // Delete existing line items
    await db.delete(lineItems).where(eq(lineItems.quotationId, id));

    // Calculate new line items
    const calculatedItems = data.lineItems.map((item, index) => {
      const calc = calculateLineItem(item);
      return {
        ...item,
        ...calc,
        sortOrder: index,
      };
    });

    // Calculate totals
    totals = calculateDocumentTotals(
      calculatedItems,
      data.discountType && data.discountValue
        ? { type: data.discountType, value: data.discountValue }
        : undefined
    );

    // Insert new line items
    if (calculatedItems.length > 0) {
      await db.insert(lineItems).values(
        calculatedItems.map((item) => ({
          quotationId: id,
          productId: item.productId,
          description: item.description,
          quantity: item.quantity.toString(),
          unit: item.unit,
          unitPrice: item.unitPrice.toString(),
          taxRate: item.taxRate.toString(),
          taxAmount: item.taxAmount,
          discountPercent: (item.discountPercent ?? 0).toString(),
          subtotal: item.subtotal,
          total: item.total,
          sortOrder: item.sortOrder,
        }))
      );
    }
  }

  // Update quotation
  const [quotation] = await db
    .update(quotations)
    .set({
      contactId: data.contactId,
      opportunityId: data.opportunityId,
      issueDate: data.issueDate,
      validUntil: data.validUntil,
      title: data.title,
      introduction: data.introduction,
      terms: data.terms,
      notes: data.notes,
      discountType: data.discountType,
      discountValue: data.discountValue?.toString(),
      subtotal: totals.subtotal,
      taxAmount: totals.taxAmount,
      discountAmount: totals.discountAmount,
      total: totals.total,
      updatedAt: new Date(),
    })
    .where(eq(quotations.id, id))
    .returning();

  revalidatePath("/crm/invoicing/quotations");
  revalidatePath(`/crm/invoicing/quotations/${id}`);
  return quotation;
}

export async function sendQuotation(id: number) {
  const ctx = await requireAuthContext();

  // Get quotation with contact
  const quotation = await db.query.quotations.findFirst({
    where: and(
      eq(quotations.id, id),
      eq(quotations.workspaceId, ctx.workspace.id)
    ),
    with: {
      contact: true,
    },
  });

  if (!quotation) throw new Error("Quotation not found");
  if (!quotation.contact?.email) throw new Error("Contact has no email address");

  // Get settings for company info
  const settings = await getInvoiceSettings();
  const companyName = settings.companyName || ctx.workspace.name || "LeadFlow";

  // Format values
  const total = new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: quotation.currency || "EUR",
  }).format(parseFloat(quotation.total || "0"));

  const validUntil = quotation.validUntil
    ? format(new Date(quotation.validUntil), "d MMMM yyyy", { locale: nl })
    : undefined;

  const customerName =
    quotation.contact.company ||
    `${quotation.contact.firstName || ""} ${quotation.contact.lastName || ""}`.trim() ||
    "Klant";

  // Build view URL
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://app.wetryleadflow.com";
  const viewUrl = `${baseUrl}/api/invoicing/pdf/quotation/${id}`;

  // Send email
  await sendEmail({
    to: quotation.contact.email,
    subject: `Offerte ${quotation.quotationNumber} van ${companyName}`,
    templateName: "quotation",
    from: `${companyName} <invoice@wetryleadflow.com>`,
    replyTo: settings.companyEmail || undefined,
    template: React.createElement(QuotationEmail, {
      customerName,
      quotationNumber: quotation.quotationNumber,
      total,
      validUntil,
      companyName,
      companyEmail: settings.companyEmail || undefined,
      introduction: quotation.introduction || undefined,
      viewUrl,
    }),
    context: {
      workspaceId: ctx.workspace.id,
    },
    metadata: {
      quotationId: id,
      quotationNumber: quotation.quotationNumber,
    },
  });

  // Update status
  const [updated] = await db
    .update(quotations)
    .set({
      status: "sent",
      sentAt: new Date(),
      updatedAt: new Date(),
    })
    .where(eq(quotations.id, id))
    .returning();

  revalidatePath("/crm/invoicing/quotations");
  revalidatePath(`/crm/invoicing/quotations/${id}`);
  return updated;
}

export async function markQuotationAccepted(id: number) {
  const ctx = await requireAuthContext();

  const [quotation] = await db
    .update(quotations)
    .set({
      status: "accepted",
      acceptedAt: new Date(),
      updatedAt: new Date(),
    })
    .where(
      and(
        eq(quotations.id, id),
        eq(quotations.workspaceId, ctx.workspace.id)
      )
    )
    .returning();

  revalidatePath("/crm/invoicing/quotations");
  return quotation;
}

export async function markQuotationRejected(id: number) {
  const ctx = await requireAuthContext();

  const [quotation] = await db
    .update(quotations)
    .set({
      status: "rejected",
      rejectedAt: new Date(),
      updatedAt: new Date(),
    })
    .where(
      and(
        eq(quotations.id, id),
        eq(quotations.workspaceId, ctx.workspace.id)
      )
    )
    .returning();

  revalidatePath("/crm/invoicing/quotations");
  return quotation;
}

export async function convertQuotationToInvoice(quotationId: number) {
  const ctx = await requireAuthContext();

  // Get quotation with line items
  const quotation = await getQuotation(quotationId);
  if (!quotation) throw new Error("Quotation not found");
  if (quotation.status !== "accepted") {
    throw new Error("Only accepted quotations can be converted to invoices");
  }
  if (quotation.convertedToInvoiceId) {
    throw new Error("Quotation already converted to invoice");
  }

  // Get settings
  const settings = await getInvoiceSettings();
  const paymentTerms = settings.defaultPaymentTerms ?? 14;

  // Create invoice
  const invoiceNumber = await getNextInvoiceNumber(ctx.workspace.id);
  const issueDate = new Date();
  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + paymentTerms);

  const [invoice] = await db
    .insert(invoices)
    .values({
      workspaceId: ctx.workspace.id,
      contactId: quotation.contactId,
      opportunityId: quotation.opportunityId,
      quotationId: quotation.id,
      invoiceNumber,
      issueDate,
      dueDate,
      title: quotation.title,
      introduction: quotation.introduction,
      terms: quotation.terms,
      notes: quotation.notes,
      discountType: quotation.discountType,
      discountValue: quotation.discountValue,
      subtotal: quotation.subtotal,
      taxAmount: quotation.taxAmount,
      discountAmount: quotation.discountAmount,
      total: quotation.total,
      amountDue: quotation.total,
      currency: quotation.currency,
      paymentTerms,
    })
    .returning();

  // Copy line items
  if (quotation.lineItems.length > 0) {
    await db.insert(lineItems).values(
      quotation.lineItems.map((item) => ({
        invoiceId: invoice.id,
        productId: item.productId,
        description: item.description,
        quantity: item.quantity,
        unit: item.unit,
        unitPrice: item.unitPrice,
        taxRate: item.taxRate,
        taxAmount: item.taxAmount,
        discountPercent: item.discountPercent,
        subtotal: item.subtotal,
        total: item.total,
        sortOrder: item.sortOrder,
      }))
    );
  }

  // Update quotation with invoice reference
  await db
    .update(quotations)
    .set({
      convertedToInvoiceId: invoice.id,
      updatedAt: new Date(),
    })
    .where(eq(quotations.id, quotationId));

  revalidatePath("/crm/invoicing/quotations");
  revalidatePath("/crm/invoicing/invoices");
  return invoice;
}

export async function deleteQuotation(id: number) {
  const ctx = await requireAuthContext();

  // Check it's a draft
  const quotation = await db.query.quotations.findFirst({
    where: and(
      eq(quotations.id, id),
      eq(quotations.workspaceId, ctx.workspace.id)
    ),
  });

  if (!quotation) throw new Error("Quotation not found");
  if (quotation.status !== "draft") {
    throw new Error("Only draft quotations can be deleted");
  }

  // Delete line items first
  await db.delete(lineItems).where(eq(lineItems.quotationId, id));

  // Delete quotation
  await db.delete(quotations).where(eq(quotations.id, id));

  revalidatePath("/crm/invoicing/quotations");
}

// ============================================
// Invoices
// ============================================

export async function getInvoices(filters?: {
  status?: string;
  contactId?: number;
}) {
  const ctx = await requireAuthContext();

  const conditions = [eq(invoices.workspaceId, ctx.workspace.id)];

  if (filters?.status) {
    conditions.push(eq(invoices.status, filters.status as any));
  }
  if (filters?.contactId) {
    conditions.push(eq(invoices.contactId, filters.contactId));
  }

  return await db.query.invoices.findMany({
    where: and(...conditions),
    orderBy: [desc(invoices.createdAt)],
    with: {
      contact: true,
    },
  });
}

export async function getInvoice(id: number) {
  const ctx = await requireAuthContext();

  const invoice = await db.query.invoices.findFirst({
    where: and(
      eq(invoices.id, id),
      eq(invoices.workspaceId, ctx.workspace.id)
    ),
    with: {
      contact: true,
      opportunity: true,
      quotation: true,
    },
  });

  if (!invoice) return null;

  // Get line items
  const items = await db.query.lineItems.findMany({
    where: eq(lineItems.invoiceId, id),
    orderBy: [lineItems.sortOrder],
  });

  // Get payments
  const paymentsList = await db.query.payments.findMany({
    where: eq(payments.invoiceId, id),
    orderBy: [desc(payments.paymentDate)],
  });

  return { ...invoice, lineItems: items, payments: paymentsList };
}

export async function createInvoice(data: {
  contactId: number;
  opportunityId?: number;
  issueDate: Date;
  dueDate: Date;
  title?: string;
  introduction?: string;
  terms?: string;
  notes?: string;
  paymentTerms?: number;
  currency?: string;
  lineItems: Array<{
    productId?: number;
    description: string;
    quantity: number;
    unit: string;
    unitPrice: number;
    taxRate: number;
    discountPercent?: number;
  }>;
  discountType?: "percentage" | "fixed";
  discountValue?: number;
}) {
  const ctx = await requireAuthContext();

  // Get settings for defaults
  const settings = await getInvoiceSettings();

  // Calculate line items
  const calculatedItems = data.lineItems.map((item, index) => {
    const calc = calculateLineItem(item);
    return {
      ...item,
      ...calc,
      sortOrder: index,
    };
  });

  // Calculate totals
  const totals = calculateDocumentTotals(
    calculatedItems,
    data.discountType && data.discountValue
      ? { type: data.discountType, value: data.discountValue }
      : undefined
  );

  // Generate invoice number
  const invoiceNumber = await getNextInvoiceNumber(ctx.workspace.id);

  // Create invoice
  const [invoice] = await db
    .insert(invoices)
    .values({
      workspaceId: ctx.workspace.id,
      contactId: data.contactId,
      opportunityId: data.opportunityId,
      invoiceNumber,
      issueDate: data.issueDate,
      dueDate: data.dueDate,
      title: data.title,
      introduction: data.introduction ?? settings.defaultIntroduction,
      terms: data.terms ?? settings.defaultTerms,
      notes: data.notes,
      paymentTerms: data.paymentTerms ?? settings.defaultPaymentTerms ?? 14,
      discountType: data.discountType,
      discountValue: data.discountValue?.toString(),
      subtotal: totals.subtotal,
      taxAmount: totals.taxAmount,
      discountAmount: totals.discountAmount,
      total: totals.total,
      amountDue: totals.total,
      currency: data.currency ?? settings.defaultCurrency ?? "EUR",
    })
    .returning();

  // Create line items
  if (calculatedItems.length > 0) {
    await db.insert(lineItems).values(
      calculatedItems.map((item) => ({
        invoiceId: invoice.id,
        productId: item.productId,
        description: item.description,
        quantity: item.quantity.toString(),
        unit: item.unit,
        unitPrice: item.unitPrice.toString(),
        taxRate: item.taxRate.toString(),
        taxAmount: item.taxAmount,
        discountPercent: (item.discountPercent ?? 0).toString(),
        subtotal: item.subtotal,
        total: item.total,
        sortOrder: item.sortOrder,
      }))
    );
  }

  revalidatePath("/crm/invoicing/invoices");
  return invoice;
}

export async function updateInvoice(
  id: number,
  data: {
    contactId?: number;
    opportunityId?: number;
    issueDate?: Date;
    dueDate?: Date;
    title?: string;
    introduction?: string;
    terms?: string;
    notes?: string;
    paymentTerms?: number;
    lineItems?: Array<{
      id?: number;
      productId?: number;
      description: string;
      quantity: number;
      unit: string;
      unitPrice: number;
      taxRate: number;
      discountPercent?: number;
    }>;
    discountType?: "percentage" | "fixed";
    discountValue?: number;
  }
) {
  const ctx = await requireAuthContext();

  // Check ownership and status
  const existing = await db.query.invoices.findFirst({
    where: and(
      eq(invoices.id, id),
      eq(invoices.workspaceId, ctx.workspace.id)
    ),
  });

  if (!existing) throw new Error("Invoice not found");
  if (existing.status !== "draft") {
    throw new Error("Only draft invoices can be edited");
  }

  // If line items are updated, recalculate totals
  let totals = {
    subtotal: existing.subtotal,
    taxAmount: existing.taxAmount,
    discountAmount: existing.discountAmount,
    total: existing.total,
  };

  if (data.lineItems) {
    // Delete existing line items
    await db.delete(lineItems).where(eq(lineItems.invoiceId, id));

    // Calculate new line items
    const calculatedItems = data.lineItems.map((item, index) => {
      const calc = calculateLineItem(item);
      return {
        ...item,
        ...calc,
        sortOrder: index,
      };
    });

    // Calculate totals
    totals = calculateDocumentTotals(
      calculatedItems,
      data.discountType && data.discountValue
        ? { type: data.discountType, value: data.discountValue }
        : undefined
    );

    // Insert new line items
    if (calculatedItems.length > 0) {
      await db.insert(lineItems).values(
        calculatedItems.map((item) => ({
          invoiceId: id,
          productId: item.productId,
          description: item.description,
          quantity: item.quantity.toString(),
          unit: item.unit,
          unitPrice: item.unitPrice.toString(),
          taxRate: item.taxRate.toString(),
          taxAmount: item.taxAmount,
          discountPercent: (item.discountPercent ?? 0).toString(),
          subtotal: item.subtotal,
          total: item.total,
          sortOrder: item.sortOrder,
        }))
      );
    }
  }

  // Update invoice
  const amountDue = (parseFloat(totals.total) - parseFloat(existing.amountPaid ?? "0")).toFixed(2);

  const [invoice] = await db
    .update(invoices)
    .set({
      contactId: data.contactId,
      opportunityId: data.opportunityId,
      issueDate: data.issueDate,
      dueDate: data.dueDate,
      title: data.title,
      introduction: data.introduction,
      terms: data.terms,
      notes: data.notes,
      paymentTerms: data.paymentTerms,
      discountType: data.discountType,
      discountValue: data.discountValue?.toString(),
      subtotal: totals.subtotal,
      taxAmount: totals.taxAmount,
      discountAmount: totals.discountAmount,
      total: totals.total,
      amountDue,
      updatedAt: new Date(),
    })
    .where(eq(invoices.id, id))
    .returning();

  revalidatePath("/crm/invoicing/invoices");
  revalidatePath(`/crm/invoicing/invoices/${id}`);
  return invoice;
}

export async function sendInvoice(id: number) {
  const ctx = await requireAuthContext();

  // Get invoice with contact
  const invoice = await db.query.invoices.findFirst({
    where: and(
      eq(invoices.id, id),
      eq(invoices.workspaceId, ctx.workspace.id)
    ),
    with: {
      contact: true,
    },
  });

  if (!invoice) throw new Error("Invoice not found");
  if (!invoice.contact?.email) throw new Error("Contact has no email address");

  // Get settings for company info
  const settings = await getInvoiceSettings();
  const companyName = settings.companyName || ctx.workspace.name || "LeadFlow";

  // Format values
  const total = new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: invoice.currency || "EUR",
  }).format(parseFloat(invoice.total || "0"));

  const dueDate = format(new Date(invoice.dueDate), "d MMMM yyyy", { locale: nl });

  const customerName =
    invoice.contact.company ||
    `${invoice.contact.firstName || ""} ${invoice.contact.lastName || ""}`.trim() ||
    "Klant";

  // Build view URL
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://app.wetryleadflow.com";
  const viewUrl = `${baseUrl}/api/invoicing/pdf/invoice/${id}`;

  // Create Stripe payment link for online payment
  let paymentUrl: string | undefined;
  let paymentLinkId: string | undefined;

  try {
    // Only create payment link if amount is due
    const amountDue = parseFloat(invoice.amountDue || invoice.total || "0");
    if (amountDue > 0) {
      const paymentLink = await createInvoicePaymentLink({
        invoiceId: id,
        invoiceNumber: invoice.invoiceNumber,
        workspaceId: ctx.workspace.id,
        amount: Math.round(amountDue * 100), // Convert to cents
        currency: invoice.currency || "EUR",
        customerEmail: invoice.contact.email,
        customerName,
        companyName,
        title: invoice.title || undefined,
      });
      paymentUrl = paymentLink.url;
      paymentLinkId = paymentLink.sessionId;
    }
  } catch (error) {
    // Log error but don't fail the send operation
    console.error("Failed to create payment link:", error);
  }

  // Send email
  await sendEmail({
    to: invoice.contact.email,
    subject: `Factuur ${invoice.invoiceNumber} van ${companyName}`,
    templateName: "invoice",
    from: `${companyName} <invoice@wetryleadflow.com>`,
    replyTo: settings.companyEmail || undefined,
    template: React.createElement(InvoiceEmail, {
      customerName,
      invoiceNumber: invoice.invoiceNumber,
      total,
      dueDate,
      paymentTerms: invoice.paymentTerms || 14,
      companyName,
      companyEmail: settings.companyEmail || undefined,
      iban: settings.iban || undefined,
      introduction: invoice.introduction || undefined,
      viewUrl,
      paymentUrl, // Add payment URL to email
    }),
    context: {
      workspaceId: ctx.workspace.id,
    },
    metadata: {
      invoiceId: id,
      invoiceNumber: invoice.invoiceNumber,
    },
  });

  // Update status and payment link
  const [updated] = await db
    .update(invoices)
    .set({
      status: "sent",
      sentAt: new Date(),
      stripePaymentLinkId: paymentLinkId || null,
      stripePaymentLinkUrl: paymentUrl || null,
      updatedAt: new Date(),
    })
    .where(eq(invoices.id, id))
    .returning();

  revalidatePath("/crm/invoicing/invoices");
  revalidatePath(`/crm/invoicing/invoices/${id}`);
  return updated;
}

export async function recordPayment(
  invoiceId: number,
  data: {
    amount: number;
    paymentDate: Date;
    paymentMethod?: string;
    reference?: string;
    notes?: string;
  }
) {
  const ctx = await requireAuthContext();

  // Verify invoice ownership
  const invoice = await db.query.invoices.findFirst({
    where: and(
      eq(invoices.id, invoiceId),
      eq(invoices.workspaceId, ctx.workspace.id)
    ),
  });

  if (!invoice) throw new Error("Invoice not found");

  // Create payment record
  const [payment] = await db
    .insert(payments)
    .values({
      invoiceId,
      amount: data.amount.toString(),
      paymentDate: data.paymentDate,
      paymentMethod: data.paymentMethod,
      reference: data.reference,
      notes: data.notes,
    })
    .returning();

  // Update invoice amounts
  const newAmountPaid = parseFloat(invoice.amountPaid ?? "0") + data.amount;
  const newAmountDue = parseFloat(invoice.total ?? "0") - newAmountPaid;
  const isPaid = newAmountDue <= 0;

  await db
    .update(invoices)
    .set({
      amountPaid: newAmountPaid.toFixed(2),
      amountDue: Math.max(0, newAmountDue).toFixed(2),
      status: isPaid ? "paid" : invoice.status,
      paidAt: isPaid ? new Date() : invoice.paidAt,
      updatedAt: new Date(),
    })
    .where(eq(invoices.id, invoiceId));

  revalidatePath("/crm/invoicing/invoices");
  revalidatePath(`/crm/invoicing/invoices/${invoiceId}`);
  return payment;
}

export async function markInvoicePaid(invoiceId: number) {
  const ctx = await requireAuthContext();

  const invoice = await db.query.invoices.findFirst({
    where: and(
      eq(invoices.id, invoiceId),
      eq(invoices.workspaceId, ctx.workspace.id)
    ),
  });

  if (!invoice) throw new Error("Invoice not found");

  // Record full payment
  await recordPayment(invoiceId, {
    amount: parseFloat(invoice.amountDue ?? invoice.total ?? "0"),
    paymentDate: new Date(),
    paymentMethod: "manual",
    notes: "Marked as paid manually",
  });

  revalidatePath("/crm/invoicing/invoices");
  return invoice;
}

export async function cancelInvoice(id: number) {
  const ctx = await requireAuthContext();

  const [invoice] = await db
    .update(invoices)
    .set({
      status: "cancelled",
      updatedAt: new Date(),
    })
    .where(
      and(
        eq(invoices.id, id),
        eq(invoices.workspaceId, ctx.workspace.id)
      )
    )
    .returning();

  revalidatePath("/crm/invoicing/invoices");
  return invoice;
}

export async function deleteInvoice(id: number) {
  const ctx = await requireAuthContext();

  // Check it's a draft
  const invoice = await db.query.invoices.findFirst({
    where: and(
      eq(invoices.id, id),
      eq(invoices.workspaceId, ctx.workspace.id)
    ),
  });

  if (!invoice) throw new Error("Invoice not found");
  if (invoice.status !== "draft") {
    throw new Error("Only draft invoices can be deleted");
  }

  // Delete line items first
  await db.delete(lineItems).where(eq(lineItems.invoiceId, id));

  // Delete invoice
  await db.delete(invoices).where(eq(invoices.id, id));

  revalidatePath("/crm/invoicing/invoices");
}

// ============================================
// Statistics
// ============================================

export async function getInvoicingStats(period: "month" | "quarter" | "year" = "month") {
  const ctx = await requireAuthContext();

  // Calculate period start date
  const now = new Date();
  let startDate: Date;
  switch (period) {
    case "quarter":
      startDate = new Date(now.getFullYear(), Math.floor(now.getMonth() / 3) * 3, 1);
      break;
    case "year":
      startDate = new Date(now.getFullYear(), 0, 1);
      break;
    default:
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
  }

  // Get invoices for period
  const periodInvoices = await db.query.invoices.findMany({
    where: and(
      eq(invoices.workspaceId, ctx.workspace.id),
      gte(invoices.issueDate, startDate)
    ),
  });

  // Calculate stats
  const totalInvoiced = periodInvoices.reduce(
    (sum, inv) => sum + parseFloat(inv.total ?? "0"),
    0
  );
  const totalPaid = periodInvoices.reduce(
    (sum, inv) => sum + parseFloat(inv.amountPaid ?? "0"),
    0
  );
  const totalOutstanding = totalInvoiced - totalPaid;

  const invoiceCount = periodInvoices.length;
  const paidCount = periodInvoices.filter((inv) => inv.status === "paid").length;
  const overdueCount = periodInvoices.filter((inv) => inv.status === "overdue").length;

  // Get quotation stats
  const periodQuotations = await db.query.quotations.findMany({
    where: and(
      eq(quotations.workspaceId, ctx.workspace.id),
      gte(quotations.issueDate, startDate)
    ),
  });

  const quotationCount = periodQuotations.length;
  const acceptedCount = periodQuotations.filter((q) => q.status === "accepted").length;
  const conversionRate = quotationCount > 0 ? (acceptedCount / quotationCount) * 100 : 0;

  return {
    totalInvoiced: totalInvoiced.toFixed(2),
    totalPaid: totalPaid.toFixed(2),
    totalOutstanding: totalOutstanding.toFixed(2),
    invoiceCount,
    paidCount,
    overdueCount,
    quotationCount,
    acceptedCount,
    conversionRate: conversionRate.toFixed(1),
  };
}
