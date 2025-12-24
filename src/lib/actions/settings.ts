"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq, and, count, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import {
  users, orgs, memberships, contacts, opportunities,
  opportunityStageHistory, notes, leadIngestRoutes, agencyMemberships
} from "@/lib/db/schema";
import { requireAuthContext } from "@/lib/auth/context";
import { can } from "@/lib/auth/rbac";
import { logAudit } from "@/lib/audit";
import { AuditActions, EntityTypes } from "@/lib/audit/constants";

// ============================================
// Profile Settings
// ============================================

export async function updateProfile(data: { name: string }) {
  const ctx = await requireAuthContext();

  const [updated] = await db
    .update(users)
    .set({
      name: data.name.trim(),
      updatedAt: new Date(),
    })
    .where(eq(users.id, ctx.user.id))
    .returning();

  // Audit log
  await logAudit(
    { orgId: ctx.org.id, workspaceId: ctx.workspace.id, userId: ctx.user.id, userEmail: ctx.user.email },
    {
      action: AuditActions.USER_PROFILE_UPDATED,
      entityType: EntityTypes.USER,
      entityId: ctx.user.id,
      metadata: { name: data.name },
    }
  );

  revalidatePath("/settings");
  return { success: true, user: updated };
}

// ============================================
// Organization Settings
// ============================================

export async function updateOrganization(data: { name: string }) {
  const ctx = await requireAuthContext();

  // Check permission
  if (!can(ctx, "org:settings")) {
    throw new Error("You don't have permission to update organization settings");
  }

  const [updated] = await db
    .update(orgs)
    .set({
      name: data.name.trim(),
      updatedAt: new Date(),
    })
    .where(eq(orgs.id, ctx.org.id))
    .returning();

  // Audit log
  await logAudit(
    { orgId: ctx.org.id, workspaceId: ctx.workspace.id, userId: ctx.user.id, userEmail: ctx.user.email },
    {
      action: AuditActions.ORG_UPDATED,
      entityType: EntityTypes.ORG,
      entityId: ctx.org.id,
      metadata: { name: data.name },
    }
  );

  revalidatePath("/settings");
  return { success: true, org: updated };
}

// ============================================
// Account Deletion
// ============================================

/**
 * Check if user can delete their account and return blocking orgs
 */
export async function checkAccountDeletion(): Promise<{
  canDelete: boolean;
  soleOwnerOrgs: { id: number; name: string }[];
}> {
  const ctx = await requireAuthContext();

  const soleOwnerOrgs: { id: number; name: string }[] = [];

  // Get all orgs where user is owner
  const userOrgsAsOwner = await db.query.memberships.findMany({
    where: and(
      eq(memberships.userId, ctx.user.id),
      eq(memberships.role, "owner")
    ),
    with: {
      org: true,
    },
  });

  for (const membership of userOrgsAsOwner) {
    // Count other owners in this org
    const [ownerCount] = await db
      .select({ count: count() })
      .from(memberships)
      .where(
        and(
          eq(memberships.orgId, membership.orgId),
          eq(memberships.role, "owner")
        )
      );

    if (ownerCount.count === 1) {
      soleOwnerOrgs.push({
        id: membership.org.id,
        name: membership.org.name,
      });
    }
  }

  return {
    canDelete: soleOwnerOrgs.length === 0,
    soleOwnerOrgs,
  };
}

export async function deleteAccount(confirmation: string, deleteOrgs: boolean = false) {
  const ctx = await requireAuthContext();

  // Verify confirmation text
  if (confirmation !== "delete") {
    throw new Error("Please type 'delete' to confirm account deletion");
  }

  // Check for sole owner orgs
  const { canDelete, soleOwnerOrgs } = await checkAccountDeletion();

  if (!canDelete && !deleteOrgs) {
    throw new Error(
      "You are the only owner of an organization. Please check 'Also delete my organizations' to proceed."
    );
  }

  // Store user info for audit before deletion
  const userEmail = ctx.user.email;
  const userId = ctx.user.id;

  // If deleteOrgs is true, delete the orgs where user is sole owner
  if (deleteOrgs && soleOwnerOrgs.length > 0) {
    for (const org of soleOwnerOrgs) {
      // Audit log for org deletion
      await logAudit(
        { orgId: org.id, workspaceId: ctx.workspace.id, userId, userEmail },
        {
          action: AuditActions.ORG_DELETED,
          entityType: EntityTypes.ORG,
          entityId: org.id,
          metadata: { name: org.name, deletedWithAccount: true },
        }
      );

      // Delete the org (cascade will handle workspaces, contacts, etc.)
      await db.delete(orgs).where(eq(orgs.id, org.id));
    }
  }

  // Audit log (before deletion so we have the user ID)
  await logAudit(
    { orgId: ctx.org.id, workspaceId: ctx.workspace.id, userId, userEmail },
    {
      action: AuditActions.USER_DELETED,
      entityType: EntityTypes.USER,
      entityId: userId,
      metadata: { email: userEmail, selfDeleted: true, orgsDeleted: soleOwnerOrgs.length },
    }
  );

  // Set user references to NULL in tables without cascade delete
  await db
    .update(contacts)
    .set({ createdById: null })
    .where(eq(contacts.createdById, userId));

  await db
    .update(opportunities)
    .set({ assignedToId: null })
    .where(eq(opportunities.assignedToId, userId));

  await db
    .update(opportunities)
    .set({ createdById: null })
    .where(eq(opportunities.createdById, userId));

  await db
    .update(opportunityStageHistory)
    .set({ movedById: null })
    .where(eq(opportunityStageHistory.movedById, userId));

  await db
    .update(notes)
    .set({ createdById: null })
    .where(eq(notes.createdById, userId));

  await db
    .update(leadIngestRoutes)
    .set({ assignToUserId: null })
    .where(eq(leadIngestRoutes.assignToUserId, userId));

  // Delete agency memberships (uses externalId)
  const user = await db.query.users.findFirst({
    where: eq(users.id, userId),
  });

  if (user) {
    await db
      .delete(agencyMemberships)
      .where(eq(agencyMemberships.userId, user.externalId));
  }

  // Delete all memberships (cascades due to FK, but being explicit)
  await db.delete(memberships).where(eq(memberships.userId, userId));

  // Delete the user
  await db.delete(users).where(eq(users.id, userId));

  // Redirect to sign out (which will clear the session)
  redirect("/handler/sign-out");
}
