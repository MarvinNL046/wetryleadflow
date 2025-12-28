"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { notificationPreferences, emailTemplates } from "@/lib/db/schema";
import { requireAuthContext } from "@/lib/auth/context";
import { logAudit } from "@/lib/audit";
import { AuditActions, EntityTypes } from "@/lib/audit/constants";
import { eq, and } from "drizzle-orm";
import type { NotificationEventType, NotificationModeType } from "@/lib/notifications/utils";

export async function getNotificationPreferences() {
  const ctx = await requireAuthContext();

  const preferences = await db
    .select({
      id: notificationPreferences.id,
      workspaceId: notificationPreferences.workspaceId,
      eventType: notificationPreferences.eventType,
      mode: notificationPreferences.mode,
      customTemplateId: notificationPreferences.customTemplateId,
      emailEnabled: notificationPreferences.emailEnabled,
      createdAt: notificationPreferences.createdAt,
      updatedAt: notificationPreferences.updatedAt,
      templateName: emailTemplates.name,
    })
    .from(notificationPreferences)
    .leftJoin(emailTemplates, eq(notificationPreferences.customTemplateId, emailTemplates.id))
    .where(eq(notificationPreferences.workspaceId, ctx.workspace.id));

  return preferences;
}

export async function getNotificationPreference(eventType: NotificationEventType) {
  const ctx = await requireAuthContext();

  const [preference] = await db
    .select()
    .from(notificationPreferences)
    .where(
      and(
        eq(notificationPreferences.workspaceId, ctx.workspace.id),
        eq(notificationPreferences.eventType, eventType)
      )
    );

  return preference;
}

export async function updateNotificationPreference(
  eventType: NotificationEventType,
  data: {
    mode: NotificationModeType;
    customTemplateId?: number | null;
    emailEnabled?: boolean;
  }
) {
  const ctx = await requireAuthContext();

  // If mode is custom_template, require a template ID
  if (data.mode === "custom_template" && !data.customTemplateId) {
    throw new Error("Selecteer een template voor de aangepaste modus");
  }

  // If mode is not custom_template, clear the template ID
  if (data.mode !== "custom_template") {
    data.customTemplateId = null;
  }

  // Check if preference exists
  const existing = await getNotificationPreference(eventType);

  if (existing) {
    // Update existing
    await db
      .update(notificationPreferences)
      .set({
        mode: data.mode,
        customTemplateId: data.customTemplateId,
        emailEnabled: data.emailEnabled ?? existing.emailEnabled,
        updatedAt: new Date(),
      })
      .where(eq(notificationPreferences.id, existing.id));

    await logAudit(
      { orgId: ctx.org.id, workspaceId: ctx.workspace.id, userId: ctx.user.id, userEmail: ctx.user.email },
      {
        action: AuditActions.NOTIFICATION_PREFERENCE_UPDATED,
        entityType: EntityTypes.NOTIFICATION_PREFERENCE,
        entityId: existing.id,
        metadata: { eventType, ...data },
      }
    );
  } else {
    // Create new preference
    const [newPref] = await db
      .insert(notificationPreferences)
      .values({
        workspaceId: ctx.workspace.id,
        eventType,
        mode: data.mode,
        customTemplateId: data.customTemplateId,
        emailEnabled: data.emailEnabled ?? true,
      })
      .returning();

    await logAudit(
      { orgId: ctx.org.id, workspaceId: ctx.workspace.id, userId: ctx.user.id, userEmail: ctx.user.email },
      {
        action: AuditActions.NOTIFICATION_PREFERENCE_CREATED,
        entityType: EntityTypes.NOTIFICATION_PREFERENCE,
        entityId: newPref.id,
        metadata: { eventType, ...data },
      }
    );
  }

  revalidatePath("/crm/settings/notifications");
  revalidatePath("/agency/settings/notifications");
}

export async function resetNotificationPreference(eventType: NotificationEventType) {
  const ctx = await requireAuthContext();

  const existing = await getNotificationPreference(eventType);

  if (existing) {
    await db
      .update(notificationPreferences)
      .set({
        mode: "system_default",
        customTemplateId: null,
        emailEnabled: true,
        updatedAt: new Date(),
      })
      .where(eq(notificationPreferences.id, existing.id));

    await logAudit(
      { orgId: ctx.org.id, workspaceId: ctx.workspace.id, userId: ctx.user.id, userEmail: ctx.user.email },
      {
        action: AuditActions.NOTIFICATION_PREFERENCE_UPDATED,
        entityType: EntityTypes.NOTIFICATION_PREFERENCE,
        entityId: existing.id,
        metadata: { eventType, reset: true },
      }
    );

    revalidatePath("/crm/settings/notifications");
    revalidatePath("/agency/settings/notifications");
  }
}

// Helper to get the effective notification setting for sending emails
export async function getEffectiveNotificationSetting(
  workspaceId: number,
  eventType: NotificationEventType
): Promise<{
  enabled: boolean;
  mode: NotificationModeType;
  customTemplateId: number | null;
}> {
  const [preference] = await db
    .select()
    .from(notificationPreferences)
    .where(
      and(
        eq(notificationPreferences.workspaceId, workspaceId),
        eq(notificationPreferences.eventType, eventType)
      )
    );

  // Default behavior if no preference set
  if (!preference) {
    return {
      enabled: true,
      mode: "system_default",
      customTemplateId: null,
    };
  }

  return {
    enabled: preference.emailEnabled && preference.mode !== "disabled",
    mode: preference.mode,
    customTemplateId: preference.customTemplateId,
  };
}
