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
 * Find existing user by externalId or email
 */
async function findExistingUser(externalId: string, email: string) {
  return db.query.users.findFirst({
    where: (users, { or, eq }) =>
      or(eq(users.externalId, externalId), eq(users.email, email)),
  });
}

/**
 * Update an existing user's profile
 */
async function updateUser(userId: number, stackUser: StackUser, email: string, existingName: string | null): Promise<User> {
  const [updated] = await db
    .update(users)
    .set({
      externalId: stackUser.id,
      email,
      name: stackUser.displayName ?? existingName,
      avatarUrl: stackUser.profileImageUrl,
      updatedAt: new Date(),
    })
    .where(eq(users.id, userId))
    .returning();
  return updated;
}

/**
 * Create a new user with default org and workspace
 */
async function createNewUser(stackUser: StackUser, email: string): Promise<User> {
  const [newUser] = await db
    .insert(users)
    .values({
      externalId: stackUser.id,
      email,
      name: stackUser.displayName,
      avatarUrl: stackUser.profileImageUrl,
    })
    .returning();

  // Create default org
  const [newOrg] = await db
    .insert(orgs)
    .values({
      name: stackUser.displayName
        ? `${stackUser.displayName}'s Organization`
        : "My Organization",
      slug: `org-${newUser.id}`,
    })
    .returning();

  // Create default workspace and membership in parallel
  await Promise.all([
    db.insert(workspaces).values({
      orgId: newOrg.id,
      name: "Default",
      slug: "default",
    }),
    db.insert(memberships).values({
      userId: newUser.id,
      orgId: newOrg.id,
      role: "owner",
    }),
  ]);

  // Audit logs in parallel
  await Promise.all([
    logAudit(
      { orgId: newOrg.id, userId: newUser.id, userEmail: email },
      {
        action: AuditActions.ORG_CREATED,
        entityType: EntityTypes.ORG,
        entityId: newOrg.id,
        metadata: { name: newOrg.name, slug: newOrg.slug, isDefault: true },
      }
    ),
    logAudit(
      { orgId: newOrg.id, userId: newUser.id, userEmail: email },
      {
        action: AuditActions.USER_SIGNED_IN,
        entityType: EntityTypes.USER,
        entityId: newUser.id,
        metadata: { isNewUser: true, email },
      }
    ),
  ]);

  return newUser;
}

/**
 * Sync a Stack Auth user to our database.
 * Creates the user with default org/workspace if new, updates if existing.
 */
export async function syncUserToDb(stackUser: StackUser): Promise<User> {
  const email = stackUser.primaryEmail ?? `${stackUser.id}@unknown.local`;

  // Check for existing user
  const existingUser = await findExistingUser(stackUser.id, email);
  if (existingUser) {
    return updateUser(existingUser.id, stackUser, email, existingUser.name);
  }

  // Try to create new user, handle race conditions
  try {
    return await createNewUser(stackUser, email);
  } catch {
    // Race condition: user was created between our check and insert
    const raceUser = await findExistingUser(stackUser.id, email);
    if (raceUser) {
      return updateUser(raceUser.id, stackUser, email, raceUser.name);
    }
    throw new Error(`Failed to sync user: ${email}`);
  }
}

/**
 * Get or create a user in our database from Stack Auth
 */
export async function getOrCreateUser(stackUser: StackUser): Promise<User> {
  return syncUserToDb(stackUser);
}
