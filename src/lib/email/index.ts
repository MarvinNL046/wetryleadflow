import { Resend } from "resend";
import * as React from "react";
import { db, emailLog } from "@/lib/db";
import { eq } from "drizzle-orm";
import type { NewEmailLog } from "@/lib/db/schema";

// Initialize Resend client
function getResendClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[Email] RESEND_API_KEY not configured");
    return null;
  }
  return new Resend(apiKey);
}

// Default from address
const DEFAULT_FROM = process.env.EMAIL_FROM || "LeadFlow <noreply@wetryleadflow.com>";

// ============================================
// Types
// ============================================
interface EmailContext {
  orgId?: number;
  workspaceId?: number;
}

interface SendEmailOptions {
  to: string | string[];
  subject: string;
  template: React.ReactElement;
  templateName: string;
  from?: string;
  replyTo?: string;
  context?: EmailContext;
  relatedEntity?: {
    type: string;
    id: number;
  };
  metadata?: Record<string, unknown>;
}

interface SendEmailResult {
  success: boolean;
  emailLogId?: number;
  resendId?: string;
  error?: string;
}

// ============================================
// Core Email Sending Function
// ============================================
export async function sendEmail(options: SendEmailOptions): Promise<SendEmailResult> {
  const resend = getResendClient();
  const toAddresses = Array.isArray(options.to) ? options.to : [options.to];
  const from = options.from || DEFAULT_FROM;

  // Create email log entry first (pending status)
  const logEntries: NewEmailLog[] = toAddresses.map((to) => ({
    orgId: options.context?.orgId ?? null,
    workspaceId: options.context?.workspaceId ?? null,
    templateName: options.templateName,
    to,
    from,
    subject: options.subject,
    status: "pending" as const,
    metadata: options.metadata ?? null,
    relatedEntityType: options.relatedEntity?.type ?? null,
    relatedEntityId: options.relatedEntity?.id ?? null,
  }));

  const [logEntry] = await db.insert(emailLog).values(logEntries).returning();

  // If no Resend client, log and return (dev mode)
  if (!resend) {
    console.log(`[Email] Would send "${options.templateName}" to ${toAddresses.join(", ")}`);
    console.log(`[Email] Subject: ${options.subject}`);

    // Mark as sent in dev mode
    await db
      .update(emailLog)
      .set({ status: "sent", sentAt: new Date() })
      .where(eq(emailLog.id, logEntry.id));

    return {
      success: true,
      emailLogId: logEntry.id,
      resendId: "dev-mode",
    };
  }

  try {
    // Send via Resend
    const { data, error } = await resend.emails.send({
      from,
      to: toAddresses,
      subject: options.subject,
      react: options.template,
      replyTo: options.replyTo,
    });

    if (error) {
      // Update log with error
      await db
        .update(emailLog)
        .set({
          status: "failed",
          errorMessage: error.message,
        })
        .where(eq(emailLog.id, logEntry.id));

      console.error(`[Email] Failed to send "${options.templateName}":`, error.message);
      return {
        success: false,
        emailLogId: logEntry.id,
        error: error.message,
      };
    }

    // Update log with success
    await db
      .update(emailLog)
      .set({
        status: "sent",
        resendId: data?.id,
        sentAt: new Date(),
      })
      .where(eq(emailLog.id, logEntry.id));

    console.log(`[Email] Sent "${options.templateName}" to ${toAddresses.join(", ")}`);
    return {
      success: true,
      emailLogId: logEntry.id,
      resendId: data?.id,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";

    // Update log with error
    await db
      .update(emailLog)
      .set({
        status: "failed",
        errorMessage,
      })
      .where(eq(emailLog.id, logEntry.id));

    console.error(`[Email] Exception sending "${options.templateName}":`, errorMessage);
    return {
      success: false,
      emailLogId: logEntry.id,
      error: errorMessage,
    };
  }
}

// ============================================
// Convenience Functions
// ============================================

// Re-export templates for easy access
export * from "./templates";
