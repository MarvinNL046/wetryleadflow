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
  // Check if user already exists
  const existingUser = await db.query.users.findFirst({
    where: eq(users.externalId, stackUser.id),
  });

  if (existingUser) {
    // Update existing user
    const [updated] = await db
      .update(users)
      .set({
        email: stackUser.primaryEmail ?? existingUser.email,
        name: stackUser.displayName ?? existingUser.name,
        avatarUrl: stackUser.profileImageUrl,
        updatedAt: new Date(),
      })
      .where(eq(users.externalId, stackUser.id))
      .returning();
    return updated;
  }

  // Create new user with default org and workspace
  const email = stackUser.primaryEmail ?? `${stackUser.id}@unknown.local`;

  // Create user
  const [newUser] = await db
    .insert(users)
    .values({
      externalId: stackUser.id,
      email,
      name: stackUser.displayName,
      avatarUrl: stackUser.profileImageUrl,
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
