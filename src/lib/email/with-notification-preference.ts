import * as React from "react";
import { Resend } from "resend";
import { db, emailLog, emailTemplates } from "@/lib/db";
import { eq, and } from "drizzle-orm";
import type { NewEmailLog } from "@/lib/db/schema";
import { getEffectiveNotificationSetting } from "@/lib/actions/notification-preferences";
import type { NotificationEventType } from "@/lib/notifications/utils";

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
// Variable Context for Custom Templates
// ============================================
export interface EmailVariableContext {
  contact?: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    company?: string;
  };
  opportunity?: {
    title?: string;
    value?: number;
    stage?: string;
  };
  workspace?: {
    name?: string;
  };
  user?: {
    name?: string;
    email?: string;
  };
}

// Replace template variables with actual values
function replaceVariables(template: string, context: EmailVariableContext): string {
  let result = template;

  // Contact variables
  if (context.contact) {
    result = result.replace(/\{\{\s*contact\.firstName\s*\}\}/g, context.contact.firstName || "");
    result = result.replace(/\{\{\s*contact\.lastName\s*\}\}/g, context.contact.lastName || "");
    result = result.replace(/\{\{\s*contact\.email\s*\}\}/g, context.contact.email || "");
    result = result.replace(/\{\{\s*contact\.phone\s*\}\}/g, context.contact.phone || "");
    result = result.replace(/\{\{\s*contact\.company\s*\}\}/g, context.contact.company || "");
  }

  // Opportunity variables
  if (context.opportunity) {
    result = result.replace(/\{\{\s*opportunity\.title\s*\}\}/g, context.opportunity.title || "");
    result = result.replace(
      /\{\{\s*opportunity\.value\s*\}\}/g,
      context.opportunity.value?.toLocaleString("nl-NL", { style: "currency", currency: "EUR" }) || ""
    );
    result = result.replace(/\{\{\s*opportunity\.stage\s*\}\}/g, context.opportunity.stage || "");
  }

  // Workspace variables
  if (context.workspace) {
    result = result.replace(/\{\{\s*workspace\.name\s*\}\}/g, context.workspace.name || "");
  }

  // User variables
  if (context.user) {
    result = result.replace(/\{\{\s*user\.name\s*\}\}/g, context.user.name || "");
    result = result.replace(/\{\{\s*user\.email\s*\}\}/g, context.user.email || "");
  }

  return result;
}

// ============================================
// Send Email with Notification Preference Check
// ============================================
interface SendEmailWithPreferenceOptions {
  workspaceId: number;
  eventType: NotificationEventType;
  to: string | string[];
  // System default template (React component)
  defaultSubject: string;
  defaultTemplate: React.ReactElement;
  templateName: string;
  // Variables for custom template
  variables: EmailVariableContext;
  // Optional overrides
  from?: string;
  replyTo?: string;
  context?: {
    orgId?: number;
    workspaceId?: number;
  };
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
  skipped?: boolean;
  skipReason?: string;
}

export async function sendEmailWithPreference(
  options: SendEmailWithPreferenceOptions
): Promise<SendEmailResult> {
  // Get notification preference for this event
  const preference = await getEffectiveNotificationSetting(
    options.workspaceId,
    options.eventType
  );

  // If notifications are disabled for this event, skip
  if (!preference.enabled) {
    console.log(
      `[Email] Skipped "${options.templateName}" - notifications disabled for ${options.eventType}`
    );
    return {
      success: true,
      skipped: true,
      skipReason: `Notifications disabled for ${options.eventType}`,
    };
  }

  let subject = options.defaultSubject;
  let htmlContent: string | undefined;
  let reactTemplate: React.ReactElement | undefined;

  // If custom template is selected, load and use it
  if (preference.mode === "custom_template" && preference.customTemplateId) {
    const [customTemplate] = await db
      .select()
      .from(emailTemplates)
      .where(
        and(
          eq(emailTemplates.id, preference.customTemplateId),
          eq(emailTemplates.isActive, true)
        )
      );

    if (customTemplate) {
      // Replace variables in subject and body
      subject = replaceVariables(customTemplate.subject, options.variables);
      htmlContent = replaceVariables(customTemplate.bodyHtml, options.variables);

      // Update usage stats
      await db
        .update(emailTemplates)
        .set({
          usageCount: (customTemplate.usageCount || 0) + 1,
          lastUsedAt: new Date(),
        })
        .where(eq(emailTemplates.id, customTemplate.id));

      console.log(
        `[Email] Using custom template "${customTemplate.name}" for ${options.eventType}`
      );
    } else {
      // Custom template not found or inactive, fall back to system default
      reactTemplate = options.defaultTemplate;
      console.warn(
        `[Email] Custom template ${preference.customTemplateId} not found, using system default`
      );
    }
  } else {
    // Use system default template
    reactTemplate = options.defaultTemplate;
  }

  const resend = getResendClient();
  const toAddresses = Array.isArray(options.to) ? options.to : [options.to];
  const from = options.from || DEFAULT_FROM;

  // Create email log entry first (pending status)
  const logEntries: NewEmailLog[] = toAddresses.map((to) => ({
    orgId: options.context?.orgId ?? null,
    workspaceId: options.context?.workspaceId ?? options.workspaceId,
    templateName: options.templateName,
    to,
    from,
    subject,
    status: "pending" as const,
    metadata: {
      ...options.metadata,
      notificationMode: preference.mode,
      customTemplateId: preference.customTemplateId,
    },
    relatedEntityType: options.relatedEntity?.type ?? null,
    relatedEntityId: options.relatedEntity?.id ?? null,
  }));

  const [logEntry] = await db.insert(emailLog).values(logEntries).returning();

  // If no Resend client, log and return (dev mode)
  if (!resend) {
    console.log(`[Email] Would send "${options.templateName}" to ${toAddresses.join(", ")}`);
    console.log(`[Email] Subject: ${subject}`);
    if (htmlContent) {
      console.log(`[Email] Using custom HTML template`);
    }

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
    // Send via Resend - either with custom HTML or React template
    let result: { data: { id: string } | null; error: { message: string } | null };

    if (htmlContent) {
      result = await resend.emails.send({
        from,
        to: toAddresses,
        subject,
        html: htmlContent,
        replyTo: options.replyTo,
      });
    } else if (reactTemplate) {
      result = await resend.emails.send({
        from,
        to: toAddresses,
        subject,
        react: reactTemplate,
        replyTo: options.replyTo,
      });
    } else {
      throw new Error("No email content provided");
    }

    const { data, error } = result;

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
