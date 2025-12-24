import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { invoices, invoiceSettings, contacts } from "@/lib/db/schema";
import { eq, and, lte, inArray, isNotNull } from "drizzle-orm";
import { sendEmail, InvoiceReminderEmail } from "@/lib/email";
import { format } from "date-fns";
import { nl } from "date-fns/locale";

// Verify cron secret for security
const CRON_SECRET = process.env.CRON_SECRET;

/**
 * GET /api/cron/send-invoice-reminders
 * Scheduled job to send payment reminders for overdue invoices
 *
 * Runs daily at 9:00 AM (configured in vercel.json)
 */
export async function GET(request: NextRequest) {
  const startTime = Date.now();

  // Verify authorization
  const authHeader = request.headers.get("authorization");
  const cronHeader = request.headers.get("x-cron-secret");
  const providedSecret = authHeader?.replace("Bearer ", "") || cronHeader;

  if (process.env.NODE_ENV === "production" && CRON_SECRET) {
    if (providedSecret !== CRON_SECRET) {
      console.log("[Invoice Reminders] Unauthorized request");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  try {
    console.log("[Invoice Reminders] Starting scheduled reminder processing...");

    const now = new Date();
    let remindersSent = 0;
    let errors = 0;

    // Find all overdue invoices (status sent or overdue, past due date)
    const overdueInvoices = await db
      .select({
        id: invoices.id,
        workspaceId: invoices.workspaceId,
        contactId: invoices.contactId,
        invoiceNumber: invoices.invoiceNumber,
        total: invoices.total,
        amountDue: invoices.amountDue,
        currency: invoices.currency,
        dueDate: invoices.dueDate,
        title: invoices.title,
        reminderCount: invoices.reminderCount,
        lastReminderAt: invoices.lastReminderAt,
        stripePaymentLinkUrl: invoices.stripePaymentLinkUrl,
      })
      .from(invoices)
      .where(
        and(
          inArray(invoices.status, ["sent", "overdue"]),
          lte(invoices.dueDate, now),
          isNotNull(invoices.sentAt)
        )
      );

    console.log(`[Invoice Reminders] Found ${overdueInvoices.length} overdue invoices`);

    // Group by workspace to check settings
    const workspaceIds = [...new Set(overdueInvoices.map((i) => i.workspaceId))];

    // Get settings for all relevant workspaces
    const settingsMap = new Map<number, { enableReminders: boolean; reminderDays: number[]; companyName: string; companyEmail: string | null; iban: string | null }>();

    for (const wsId of workspaceIds) {
      const [settings] = await db
        .select({
          enableReminders: invoiceSettings.enableReminders,
          reminderDays: invoiceSettings.reminderDays,
          companyName: invoiceSettings.companyName,
          companyEmail: invoiceSettings.companyEmail,
          iban: invoiceSettings.iban,
        })
        .from(invoiceSettings)
        .where(eq(invoiceSettings.workspaceId, wsId))
        .limit(1);

      if (settings) {
        settingsMap.set(wsId, {
          enableReminders: settings.enableReminders,
          reminderDays: (settings.reminderDays as number[]) || [7, 14, 30],
          companyName: settings.companyName || "Uw leverancier",
          companyEmail: settings.companyEmail,
          iban: settings.iban,
        });
      }
    }

    // Process each overdue invoice
    for (const invoice of overdueInvoices) {
      try {
        const settings = settingsMap.get(invoice.workspaceId);

        // Skip if reminders are disabled
        if (!settings || !settings.enableReminders) {
          continue;
        }

        const reminderDays = settings.reminderDays;
        const currentReminderCount = invoice.reminderCount || 0;

        // Check if we've already sent all reminders
        if (currentReminderCount >= reminderDays.length) {
          continue;
        }

        // Calculate days overdue
        const daysOverdue = Math.floor(
          (now.getTime() - new Date(invoice.dueDate).getTime()) / (1000 * 60 * 60 * 24)
        );

        // Check if it's time for the next reminder
        const nextReminderThreshold = reminderDays[currentReminderCount];
        if (daysOverdue < nextReminderThreshold) {
          continue;
        }

        // Don't send multiple reminders on the same day
        if (invoice.lastReminderAt) {
          const lastReminderDate = new Date(invoice.lastReminderAt);
          const sameDay =
            lastReminderDate.getDate() === now.getDate() &&
            lastReminderDate.getMonth() === now.getMonth() &&
            lastReminderDate.getFullYear() === now.getFullYear();

          if (sameDay) {
            continue;
          }
        }

        // Get contact details
        const [contact] = await db
          .select({
            firstName: contacts.firstName,
            lastName: contacts.lastName,
            company: contacts.company,
            email: contacts.email,
          })
          .from(contacts)
          .where(eq(contacts.id, invoice.contactId))
          .limit(1);

        if (!contact?.email) {
          console.log(`[Invoice Reminders] No email for contact ${invoice.contactId}`);
          continue;
        }

        const customerName = contact.company ||
          `${contact.firstName || ""} ${contact.lastName || ""}`.trim() ||
          "Klant";

        // Format amounts
        const formatCurrency = (amount: string | null) => {
          return new Intl.NumberFormat("nl-NL", {
            style: "currency",
            currency: invoice.currency || "EUR",
          }).format(parseFloat(amount || "0"));
        };

        const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
        const viewUrl = `${baseUrl}/crm/invoicing/invoices/${invoice.id}`;

        // Send reminder email
        await sendEmail({
          to: contact.email,
          subject: `${currentReminderCount >= 2 ? "Laatste herinnering" : "Herinnering"}: Factuur ${invoice.invoiceNumber} - ${formatCurrency(invoice.amountDue)} openstaand`,
          template: InvoiceReminderEmail({
            customerName,
            invoiceNumber: invoice.invoiceNumber,
            total: formatCurrency(invoice.total),
            amountDue: formatCurrency(invoice.amountDue),
            dueDate: format(new Date(invoice.dueDate), "d MMMM yyyy", { locale: nl }),
            daysOverdue,
            reminderNumber: currentReminderCount + 1,
            companyName: settings.companyName,
            companyEmail: settings.companyEmail || undefined,
            iban: settings.iban || undefined,
            viewUrl,
            paymentUrl: invoice.stripePaymentLinkUrl || undefined,
          }),
          templateName: "invoice-reminder",
          context: {
            workspaceId: invoice.workspaceId,
          },
          relatedEntity: {
            type: "invoice",
            id: invoice.id,
          },
        });

        // Update invoice
        await db
          .update(invoices)
          .set({
            status: "overdue",
            reminderCount: currentReminderCount + 1,
            lastReminderAt: now,
            updatedAt: now,
          })
          .where(eq(invoices.id, invoice.id));

        remindersSent++;
        console.log(`[Invoice Reminders] Sent reminder #${currentReminderCount + 1} for ${invoice.invoiceNumber}`);

      } catch (error) {
        console.error(`[Invoice Reminders] Error processing invoice ${invoice.id}:`, error);
        errors++;
      }
    }

    const duration = Date.now() - startTime;
    console.log(`[Invoice Reminders] Completed in ${duration}ms: ${remindersSent} sent, ${errors} errors`);

    return NextResponse.json({
      success: true,
      processed: overdueInvoices.length,
      remindersSent,
      errors,
      duration,
    });

  } catch (error) {
    console.error("[Invoice Reminders] Fatal error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
