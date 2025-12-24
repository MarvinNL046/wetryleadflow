"use server";

import { db } from "@/lib/db";
import { notifications, type Notification, type NewNotification } from "@/lib/db/schema";
import { requireAuthContext } from "@/lib/auth/context";
import { eq, and, desc, lte, isNull, or, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";

// Get all notifications for the current user
export async function getNotifications(options?: { unreadOnly?: boolean; limit?: number }) {
  const ctx = await requireAuthContext();

  const conditions = [
    eq(notifications.workspaceId, ctx.workspace.id),
    lte(notifications.scheduledFor, new Date()), // Only show scheduled notifications
    or(
      eq(notifications.userId, ctx.user.id),
      isNull(notifications.userId) // Workspace-wide notifications
    ),
  ];

  if (options?.unreadOnly) {
    conditions.push(eq(notifications.isRead, false));
  }

  const result = await db.query.notifications.findMany({
    where: and(...conditions),
    orderBy: [desc(notifications.createdAt)],
    limit: options?.limit || 50,
  });

  return result;
}

// Get unread notification count
export async function getUnreadNotificationCount(): Promise<number> {
  const ctx = await requireAuthContext();

  const [result] = await db
    .select({ count: sql<number>`COUNT(*)` })
    .from(notifications)
    .where(
      and(
        eq(notifications.workspaceId, ctx.workspace.id),
        eq(notifications.isRead, false),
        lte(notifications.scheduledFor, new Date()),
        or(
          eq(notifications.userId, ctx.user.id),
          isNull(notifications.userId)
        )
      )
    );

  return Number(result?.count) || 0;
}

// Mark notification as read
export async function markNotificationAsRead(id: number) {
  const ctx = await requireAuthContext();

  await db
    .update(notifications)
    .set({
      isRead: true,
      readAt: new Date(),
    })
    .where(
      and(
        eq(notifications.id, id),
        eq(notifications.workspaceId, ctx.workspace.id)
      )
    );

  revalidatePath("/crm");
}

// Mark all notifications as read
export async function markAllNotificationsAsRead() {
  const ctx = await requireAuthContext();

  await db
    .update(notifications)
    .set({
      isRead: true,
      readAt: new Date(),
    })
    .where(
      and(
        eq(notifications.workspaceId, ctx.workspace.id),
        eq(notifications.isRead, false),
        or(
          eq(notifications.userId, ctx.user.id),
          isNull(notifications.userId)
        )
      )
    );

  revalidatePath("/crm");
}

// Delete notification
export async function deleteNotification(id: number) {
  const ctx = await requireAuthContext();

  await db
    .delete(notifications)
    .where(
      and(
        eq(notifications.id, id),
        eq(notifications.workspaceId, ctx.workspace.id)
      )
    );

  revalidatePath("/crm");
}

// Create notification (internal use)
export async function createNotification(data: {
  workspaceId: number;
  userId?: number;
  type: "follow_up" | "lead_new" | "invoice_paid" | "invoice_overdue" | "opportunity_won" | "opportunity_lost" | "system";
  title: string;
  message?: string;
  entityType?: string;
  entityId?: number;
  actionUrl?: string;
  scheduledFor?: Date;
}) {
  const [notification] = await db
    .insert(notifications)
    .values({
      workspaceId: data.workspaceId,
      userId: data.userId || null,
      type: data.type,
      title: data.title,
      message: data.message || null,
      entityType: data.entityType || null,
      entityId: data.entityId || null,
      actionUrl: data.actionUrl || null,
      scheduledFor: data.scheduledFor || new Date(),
    })
    .returning();

  return notification;
}

// Create follow-up notification for an opportunity
export async function createFollowUpNotification(data: {
  workspaceId: number;
  opportunityId: number;
  contactName: string;
  stageName: string;
  scheduledFor: Date;
}) {
  return createNotification({
    workspaceId: data.workspaceId,
    type: "follow_up",
    title: `Follow-up: ${data.contactName}`,
    message: `Lead staat ${data.stageName} in en wacht op opvolging`,
    entityType: "opportunity",
    entityId: data.opportunityId,
    actionUrl: `/crm/pipeline?opportunity=${data.opportunityId}`,
    scheduledFor: data.scheduledFor,
  });
}

// Check if follow-up notification already exists for opportunity
export async function hasFollowUpNotification(
  workspaceId: number,
  opportunityId: number
): Promise<boolean> {
  const [existing] = await db
    .select({ id: notifications.id })
    .from(notifications)
    .where(
      and(
        eq(notifications.workspaceId, workspaceId),
        eq(notifications.entityType, "opportunity"),
        eq(notifications.entityId, opportunityId),
        eq(notifications.type, "follow_up"),
        eq(notifications.isRead, false)
      )
    )
    .limit(1);

  return !!existing;
}

// Delete follow-up notifications for an opportunity (when it moves stages)
export async function clearFollowUpNotifications(
  workspaceId: number,
  opportunityId: number
) {
  await db
    .delete(notifications)
    .where(
      and(
        eq(notifications.workspaceId, workspaceId),
        eq(notifications.entityType, "opportunity"),
        eq(notifications.entityId, opportunityId),
        eq(notifications.type, "follow_up"),
        eq(notifications.isRead, false)
      )
    );
}
