"use server";

import { db } from "@/lib/db";
import { announcements, announcementDismissals } from "@/lib/db/schema";
import { eq, and, lte, or, isNull, gte, notInArray } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { stackServerApp } from "@/stack/server";

interface AnnouncementContext {
  orgId?: number;
  agencyId?: number;
}

/**
 * Get active announcements for the authenticated user
 * Requires authentication
 */
export async function getActiveAnnouncements(context: AnnouncementContext) {
  const stackUser = await stackServerApp.getUser();
  if (!stackUser) {
    return []; // Return empty for unauthenticated users
  }

  const userId = stackUser.id;
  const now = new Date();

  // Get dismissed announcement IDs for this user
  const dismissedAnnouncements = await db.query.announcementDismissals.findMany({
    where: eq(announcementDismissals.userId, userId),
  });
  const dismissedIds = dismissedAnnouncements.map((d) => d.announcementId);

  // Get active announcements
  const activeAnnouncements = await db.query.announcements.findMany({
    where: and(
      eq(announcements.status, "active"),
      eq(announcements.showOnDashboard, true),
      // Filter by publish date
      or(isNull(announcements.publishAt), lte(announcements.publishAt, now)),
      // Filter by expiry date
      or(isNull(announcements.expiresAt), gte(announcements.expiresAt, now)),
      // Exclude dismissed ones
      dismissedIds.length > 0 ? notInArray(announcements.id, dismissedIds) : undefined
    ),
    orderBy: (ann, { desc }) => [desc(ann.createdAt)],
  });

  // Filter by target
  const filteredAnnouncements = activeAnnouncements.filter((ann) => {
    // "all" targets everyone
    if (ann.target === "all") return true;

    // Check specific targeting
    if (ann.target === "specific") {
      const targetAgencyIds = ann.targetAgencyIds as number[] | null;
      const targetOrgIds = ann.targetOrgIds as number[] | null;

      if (targetAgencyIds?.length && context.agencyId) {
        if (targetAgencyIds.includes(context.agencyId)) return true;
      }

      if (targetOrgIds?.length && context.orgId) {
        if (targetOrgIds.includes(context.orgId)) return true;
      }

      return false;
    }

    // "agencies" or "orgs" targeting
    if (ann.target === "agencies" && context.agencyId) return true;
    if (ann.target === "orgs" && context.orgId) return true;

    return false;
  });

  return filteredAnnouncements;
}

/**
 * Dismiss an announcement for the authenticated user
 * Requires authentication
 */
export async function dismissAnnouncement(announcementId: number) {
  const stackUser = await stackServerApp.getUser();
  if (!stackUser) {
    throw new Error("Not authenticated");
  }

  const userId = stackUser.id;

  // Check if already dismissed
  const existing = await db.query.announcementDismissals.findFirst({
    where: and(
      eq(announcementDismissals.announcementId, announcementId),
      eq(announcementDismissals.userId, userId)
    ),
  });

  if (!existing) {
    await db.insert(announcementDismissals).values({
      announcementId,
      userId,
    });
  }

  revalidatePath("/crm");

  return { success: true };
}
