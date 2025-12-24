import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import {
  recurringInvoices,
  invoices,
  lineItems,
  invoiceSettings,
  contacts,
} from "@/lib/db/schema";
import { eq, and, lte, gte, isNull, or } from "drizzle-orm";
import { startOfDay, addDays } from "date-fns";
import { sendInvoice } from "@/lib/actions/invoicing";
import { calculateNextRunDate, type RecurringFrequency } from "@/lib/utils/recurring-invoice";

// Verify cron secret for security
const CRON_SECRET = process.env.CRON_SECRET;

type LineItemTemplate = {
  productId?: number;
  description: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  taxRate: number;
  discountPercent: number;
};

/**
 * Generate the next invoice number
 */
async function getNextInvoiceNumber(workspaceId: number): Promise<string> {
  const [settings] = await db
    .select({
      prefix: invoiceSettings.invoicePrefix,
      nextNumber: invoiceSettings.invoiceNextNumber,
    })
    .from(invoiceSettings)
    .where(eq(invoiceSettings.workspaceId, workspaceId))
    .limit(1);

  const prefix = settings?.prefix || "FAC";
  const number = settings?.nextNumber || 1;
  const invoiceNumber = `${prefix}${String(number).padStart(4, "0")}`;

  // Increment the next number
  await db
    .update(invoiceSettings)
    .set({
      invoiceNextNumber: number + 1,
      updatedAt: new Date(),
    })
    .where(eq(invoiceSettings.workspaceId, workspaceId));

  return invoiceNumber;
}

/**
 * Calculate line item totals
 */
function calculateLineItem(item: LineItemTemplate) {
  const subtotal = item.quantity * item.unitPrice * (1 - (item.discountPercent || 0) / 100);
  const taxAmount = subtotal * (item.taxRate / 100);
  const total = subtotal + taxAmount;
  return { subtotal, taxAmount, total };
}

/**
 * GET /api/cron/generate-recurring-invoices
 * Scheduled job to generate invoices from recurring templates
 *
 * Runs daily at 6:00 AM (before reminders at 9:00)
 */
export async function GET(request: NextRequest) {
  const startTime = Date.now();

  // Verify authorization
  const authHeader = request.headers.get("authorization");
  const cronHeader = request.headers.get("x-cron-secret");
  const providedSecret = authHeader?.replace("Bearer ", "") || cronHeader;

  if (process.env.NODE_ENV === "production" && CRON_SECRET) {
    if (providedSecret !== CRON_SECRET) {
      console.log("[Recurring Invoices] Unauthorized request");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  try {
    console.log("[Recurring Invoices] Starting scheduled invoice generation...");

    const now = new Date();
    let invoicesGenerated = 0;
    let invoicesSent = 0;
    let errors = 0;

    // Find all active recurring invoices that are due
    const dueRecurringInvoices = await db
      .select()
      .from(recurringInvoices)
      .where(
        and(
          eq(recurringInvoices.isActive, true),
          lte(recurringInvoices.nextRunDate, now),
          or(
            isNull(recurringInvoices.endDate),
            gte(recurringInvoices.endDate, now)
          )
        )
      );

    console.log(`[Recurring Invoices] Found ${dueRecurringInvoices.length} due templates`);

    for (const recurring of dueRecurringInvoices) {
      try {
        // Get contact info
        const [contact] = await db
          .select()
          .from(contacts)
          .where(eq(contacts.id, recurring.contactId))
          .limit(1);

        if (!contact) {
          console.log(`[Recurring Invoices] Contact ${recurring.contactId} not found, skipping`);
          continue;
        }

        // Generate invoice number
        const invoiceNumber = await getNextInvoiceNumber(recurring.workspaceId);

        // Calculate issue and due dates
        const issueDate = now;
        const dueDate = addDays(issueDate, recurring.paymentTerms);

        // Parse line items template
        const lineItemsTemplate = recurring.lineItemsTemplate as LineItemTemplate[];

        // Calculate totals
        let subtotal = 0;
        let taxAmount = 0;
        let total = 0;

        const calculatedItems = lineItemsTemplate.map((item, index) => {
          const calc = calculateLineItem(item);
          subtotal += calc.subtotal;
          taxAmount += calc.taxAmount;
          total += calc.total;

          return {
            invoiceId: 0, // Will be set after invoice creation
            sortOrder: index,
            productId: item.productId,
            description: item.description,
            quantity: item.quantity.toString(),
            unit: item.unit,
            unitPrice: item.unitPrice.toFixed(2),
            taxRate: item.taxRate.toFixed(2),
            discountPercent: (item.discountPercent || 0).toFixed(2),
            subtotal: calc.subtotal.toFixed(2),
            taxAmount: calc.taxAmount.toFixed(2),
            total: calc.total.toFixed(2),
          };
        });

        // Create the invoice
        const [newInvoice] = await db
          .insert(invoices)
          .values({
            workspaceId: recurring.workspaceId,
            contactId: recurring.contactId,
            invoiceNumber,
            status: "draft",
            subtotal: subtotal.toFixed(2),
            taxAmount: taxAmount.toFixed(2),
            discountAmount: "0.00",
            total: total.toFixed(2),
            amountPaid: "0.00",
            amountDue: total.toFixed(2),
            currency: recurring.currency,
            issueDate,
            dueDate,
            paymentTerms: recurring.paymentTerms,
            title: recurring.title,
            introduction: recurring.introduction,
            terms: recurring.terms,
            notes: recurring.notes,
          })
          .returning();

        // Create line items
        await db.insert(lineItems).values(
          calculatedItems.map((item) => ({
            ...item,
            invoiceId: newInvoice.id,
          }))
        );

        invoicesGenerated++;
        console.log(`[Recurring Invoices] Created invoice ${invoiceNumber} for recurring ${recurring.id}`);

        // Auto-send if enabled
        if (recurring.autoSend && contact.email) {
          try {
            // Note: sendInvoice requires auth context, so we need to handle this differently
            // For now, we'll mark invoices as draft and they can be manually sent
            // In production, you'd want to create a separate internal function for this
            console.log(`[Recurring Invoices] Invoice ${invoiceNumber} ready for manual send (auto-send requires implementation)`);
          } catch (sendError) {
            console.error(`[Recurring Invoices] Failed to send invoice ${invoiceNumber}:`, sendError);
          }
        }

        // Calculate next run date
        const nextRunDate = calculateNextRunDate(
          recurring.frequency,
          now,
          recurring.dayOfMonth,
          recurring.dayOfWeek ?? undefined
        );

        // Update recurring invoice
        await db
          .update(recurringInvoices)
          .set({
            lastRunDate: now,
            nextRunDate,
            invoicesGenerated: recurring.invoicesGenerated + 1,
            updatedAt: now,
          })
          .where(eq(recurringInvoices.id, recurring.id));

      } catch (error) {
        console.error(`[Recurring Invoices] Error processing recurring ${recurring.id}:`, error);
        errors++;
      }
    }

    const duration = Date.now() - startTime;
    console.log(`[Recurring Invoices] Completed in ${duration}ms: ${invoicesGenerated} generated, ${errors} errors`);

    return NextResponse.json({
      success: true,
      processed: dueRecurringInvoices.length,
      invoicesGenerated,
      invoicesSent,
      errors,
      duration,
    });

  } catch (error) {
    console.error("[Recurring Invoices] Fatal error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
