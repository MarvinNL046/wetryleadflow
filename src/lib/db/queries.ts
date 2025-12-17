import { eq } from "drizzle-orm";
import { db } from "./index";
import { users, memberships, orgs, workspaces } from "./schema";

/**
 * Get user by external auth provider ID (Stack Auth)
 */
export async function getUserByExternalId(externalId: string) {
  const result = await db.query.users.findFirst({
    where: eq(users.externalId, externalId),
  });
  return result ?? null;
}

/**
 * Get all orgs a user is a member of (with role)
 */
export async function getUserOrgs(userId: number) {
  const result = await db.query.memberships.findMany({
    where: eq(memberships.userId, userId),
    with: {
      org: true,
    },
  });
  return result.map((m) => ({
    org: m.org,
    role: m.role,
  }));
}

/**
 * Get all workspaces for an org
 */
export async function getOrgWorkspaces(orgId: number) {
  const result = await db.query.workspaces.findMany({
    where: eq(workspaces.orgId, orgId),
  });
  return result;
}

/**
 * Get user's default org and workspace
 * Returns first org (by membership) and its first workspace
 */
export async function getUserDefaultContext(externalId: string) {
  const user = await getUserByExternalId(externalId);
  if (!user) return null;

  const userOrgs = await getUserOrgs(user.id);
  if (userOrgs.length === 0) return null;

  const defaultOrg = userOrgs[0];
  const orgWorkspaces = await getOrgWorkspaces(defaultOrg.org.id);
  const defaultWorkspace = orgWorkspaces[0] ?? null;

  return {
    user,
    org: defaultOrg.org,
    role: defaultOrg.role,
    workspace: defaultWorkspace,
  };
}
