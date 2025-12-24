import "server-only";

import { eq } from "drizzle-orm";
import { db, users, orgs, workspaces, memberships } from "@/lib/db";
import type { User } from "@/lib/db/schema";
import { logAudit } from "@/lib/audit";
import { AuditActions, EntityTypes } from "@/lib/audit/constants";

interface StackUser {
  id: string;
  primaryEmail: string | null;
  displayName: string | null;
  profileImageUrl: string | null;
}

/**
 * Sync a Stack Auth user to our database
 * Creates the user if they don't exist, updates if they do
 * Also creates a default org/workspace for new users
 */
export async function syncUserToDb(stackUser: StackUser): Promise<User> {
  const email = stackUser.primaryEmail ?? `${stackUser.id}@unknown.local`;

  // First, try to find existing user by externalId OR email
  const existingUser = await db.query.users.findFirst({
    where: (users, { or, eq }) =>
      or(eq(users.externalId, stackUser.id), eq(users.email, email)),
  });

  if (existingUser) {
    // Update existing user - link to Stack Auth if not already linked
    const [updated] = await db
      .update(users)
      .set({
        externalId: stackUser.id, // Always update to current Stack Auth ID
        email: stackUser.primaryEmail ?? existingUser.email,
        name: stackUser.displayName ?? existingUser.name,
        avatarUrl: stackUser.profileImageUrl,
        updatedAt: new Date(),
      })
      .where(eq(users.id, existingUser.id))
      .returning();
    return updated;
  }

  // Create new user with default org and workspace
  // Use onConflictDoUpdate to handle race conditions and existing users
  const [newUser] = await db
    .insert(users)
    .values({
      externalId: stackUser.id,
      email,
      name: stackUser.displayName,
      avatarUrl: stackUser.profileImageUrl,
    })
    .onConflictDoUpdate({
      target: users.email,
      set: {
        externalId: stackUser.id,
        name: stackUser.displayName,
        avatarUrl: stackUser.profileImageUrl,
        updatedAt: new Date(),
      },
    })
    .returning();

  // Create default org for new user
  const orgSlug = `org-${newUser.id}`;
  const [newOrg] = await db
    .insert(orgs)
    .values({
      name: stackUser.displayName ? `${stackUser.displayName}'s Organization` : "My Organization",
      slug: orgSlug,
    })
    .returning();

  // Create default workspace
  await db.insert(workspaces).values({
    orgId: newOrg.id,
    name: "Default",
    slug: "default",
  });

  // Create membership (owner)
  await db.insert(memberships).values({
    userId: newUser.id,
    orgId: newOrg.id,
    role: "owner",
  });

  // Audit log: Org created
  await logAudit(
    { orgId: newOrg.id, userId: newUser.id, userEmail: email },
    {
      action: AuditActions.ORG_CREATED,
      entityType: EntityTypes.ORG,
      entityId: newOrg.id,
      metadata: { name: newOrg.name, slug: newOrg.slug, isDefault: true },
    }
  );

  // Audit log: User signed up (first sign-in)
  await logAudit(
    { orgId: newOrg.id, userId: newUser.id, userEmail: email },
    {
      action: AuditActions.USER_SIGNED_IN,
      entityType: EntityTypes.USER,
      entityId: newUser.id,
      metadata: { isNewUser: true, email },
    }
  );

  return newUser;
}

/**
 * Get or create a user in our database from Stack Auth
 */
export async function getOrCreateUser(stackUser: StackUser): Promise<User> {
  return syncUserToDb(stackUser);
}
