"use server";

import { db } from "@/lib/db";
import { emailTemplates, type EmailTemplate } from "@/lib/db/schema";
import { eq, and, desc } from "drizzle-orm";
import { requireAuthContext } from "@/lib/auth/context";
import { revalidatePath } from "next/cache";
import { replaceVariablesWithExamples } from "@/lib/email-templates/utils";

/**
 * Get all email templates for the current workspace.
 */
export async function getEmailTemplates(): Promise<EmailTemplate[]> {
  const ctx = await requireAuthContext();
  const workspaceId = ctx.workspace.id;

  const templates = await db
    .select()
    .from(emailTemplates)
    .where(eq(emailTemplates.workspaceId, workspaceId))
    .orderBy(desc(emailTemplates.createdAt));

  return templates;
}

/**
 * Get a single email template by ID.
 */
export async function getEmailTemplate(id: number): Promise<EmailTemplate | null> {
  const ctx = await requireAuthContext();
  const workspaceId = ctx.workspace.id;

  const [template] = await db
    .select()
    .from(emailTemplates)
    .where(
      and(
        eq(emailTemplates.id, id),
        eq(emailTemplates.workspaceId, workspaceId)
      )
    )
    .limit(1);

  return template || null;
}

/**
 * Create a new email template.
 */
export async function createEmailTemplate(data: {
  name: string;
  type?: "lead_notification" | "follow_up" | "quote_sent" | "invoice_sent" | "payment_reminder" | "welcome" | "custom";
  subject: string;
  bodyHtml: string;
  bodyText?: string;
  variables?: string[];
}): Promise<EmailTemplate> {
  const ctx = await requireAuthContext();
  const workspaceId = ctx.workspace.id;
  const userId = ctx.user.id;

  // Check if name already exists
  const existing = await db
    .select()
    .from(emailTemplates)
    .where(
      and(
        eq(emailTemplates.workspaceId, workspaceId),
        eq(emailTemplates.name, data.name)
      )
    )
    .limit(1);

  if (existing.length > 0) {
    throw new Error(`Template met naam "${data.name}" bestaat al`);
  }

  const [template] = await db
    .insert(emailTemplates)
    .values({
      workspaceId,
      name: data.name,
      type: data.type || "custom",
      subject: data.subject,
      bodyHtml: data.bodyHtml,
      bodyText: data.bodyText || null,
      variables: data.variables || [],
      createdById: userId,
    })
    .returning();

  revalidatePath("/crm/settings/email-templates");
  return template;
}

/**
 * Update an existing email template.
 */
export async function updateEmailTemplate(
  id: number,
  data: {
    name?: string;
    type?: "lead_notification" | "follow_up" | "quote_sent" | "invoice_sent" | "payment_reminder" | "welcome" | "custom";
    subject?: string;
    bodyHtml?: string;
    bodyText?: string;
    variables?: string[];
    isActive?: boolean;
  }
): Promise<EmailTemplate> {
  const ctx = await requireAuthContext();
  const workspaceId = ctx.workspace.id;

  // Verify template belongs to workspace
  const [existing] = await db
    .select()
    .from(emailTemplates)
    .where(
      and(
        eq(emailTemplates.id, id),
        eq(emailTemplates.workspaceId, workspaceId)
      )
    )
    .limit(1);

  if (!existing) {
    throw new Error("Template niet gevonden");
  }

  // Check if new name conflicts
  if (data.name && data.name !== existing.name) {
    const nameConflict = await db
      .select()
      .from(emailTemplates)
      .where(
        and(
          eq(emailTemplates.workspaceId, workspaceId),
          eq(emailTemplates.name, data.name)
        )
      )
      .limit(1);

    if (nameConflict.length > 0) {
      throw new Error(`Template met naam "${data.name}" bestaat al`);
    }
  }

  const [template] = await db
    .update(emailTemplates)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(eq(emailTemplates.id, id))
    .returning();

  revalidatePath("/crm/settings/email-templates");
  return template;
}

/**
 * Delete an email template.
 */
export async function deleteEmailTemplate(id: number): Promise<void> {
  const ctx = await requireAuthContext();
  const workspaceId = ctx.workspace.id;

  // Verify template belongs to workspace
  const [existing] = await db
    .select()
    .from(emailTemplates)
    .where(
      and(
        eq(emailTemplates.id, id),
        eq(emailTemplates.workspaceId, workspaceId)
      )
    )
    .limit(1);

  if (!existing) {
    throw new Error("Template niet gevonden");
  }

  if (existing.isDefault) {
    throw new Error("Standaard templates kunnen niet worden verwijderd");
  }

  await db.delete(emailTemplates).where(eq(emailTemplates.id, id));

  revalidatePath("/crm/settings/email-templates");
}

/**
 * Duplicate an email template.
 */
export async function duplicateEmailTemplate(id: number): Promise<EmailTemplate> {
  const ctx = await requireAuthContext();
  const workspaceId = ctx.workspace.id;
  const userId = ctx.user.id;

  const [existing] = await db
    .select()
    .from(emailTemplates)
    .where(
      and(
        eq(emailTemplates.id, id),
        eq(emailTemplates.workspaceId, workspaceId)
      )
    )
    .limit(1);

  if (!existing) {
    throw new Error("Template niet gevonden");
  }

  // Generate unique name
  let newName = `${existing.name} (kopie)`;
  let counter = 1;
  let nameExists = true;

  while (nameExists) {
    const check = await db
      .select()
      .from(emailTemplates)
      .where(
        and(
          eq(emailTemplates.workspaceId, workspaceId),
          eq(emailTemplates.name, newName)
        )
      )
      .limit(1);

    if (check.length === 0) {
      nameExists = false;
    } else {
      counter++;
      newName = `${existing.name} (kopie ${counter})`;
    }
  }

  const [template] = await db
    .insert(emailTemplates)
    .values({
      workspaceId,
      name: newName,
      type: existing.type,
      subject: existing.subject,
      bodyHtml: existing.bodyHtml,
      bodyText: existing.bodyText,
      variables: existing.variables,
      isDefault: false,
      createdById: userId,
    })
    .returning();

  revalidatePath("/crm/settings/email-templates");
  return template;
}

/**
 * Toggle template active status.
 */
export async function toggleEmailTemplate(id: number, isActive: boolean): Promise<EmailTemplate> {
  return updateEmailTemplate(id, { isActive });
}

/**
 * Preview template with sample data.
 */
export async function previewEmailTemplate(
  bodyHtml: string,
  subject: string
): Promise<{ subject: string; html: string }> {
  return {
    subject: replaceVariablesWithExamples(subject),
    html: replaceVariablesWithExamples(bodyHtml),
  };
}
