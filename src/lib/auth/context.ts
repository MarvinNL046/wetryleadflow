import "server-only";

import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { db, users, memberships, orgs, workspaces } from "@/lib/db";
import { withRLSContext, type RLSContext } from "@/lib/db/rls";
import { requireAuth } from "./index";
import { syncUserToDb } from "./sync";
import type { User, Org, Workspace, Membership } from "@/lib/db/schema";

// Impersonation cookie name (must match impersonate.ts)
const IMPERSONATE_COOKIE = "leadflow_impersonate";

// Cookie names for storing current org/workspace selection
const CURRENT_ORG_COOKIE = "leadflow_org_id";
const CURRENT_WORKSPACE_COOKIE = "leadflow_workspace_id";

export interface AuthContext {
  user: User;
  org: Org;
  workspace: Workspace;
  membership: Membership;
  role: "owner" | "admin" | "member";
}

/**
 * Get the current org ID from cookie or default to first org
 */
export async function getCurrentOrgId(userId: number): Promise<number | null> {
  const cookieStore = await cookies();
  const orgIdCookie = cookieStore.get(CURRENT_ORG_COOKIE);

  if (orgIdCookie) {
    const orgId = parseInt(orgIdCookie.value, 10);
    // Verify user has access to this org
    const membership = await db.query.memberships.findFirst({
      where: (m, { and }) => and(eq(m.userId, userId), eq(m.orgId, orgId)),
    });
    if (membership) return orgId;
  }

  // Fallback to first org
  const firstMembership = await db.query.memberships.findFirst({
    where: eq(memberships.userId, userId),
  });
  return firstMembership?.orgId ?? null;
}

/**
 * Get the current workspace ID from cookie or default to first workspace
 */
export async function getCurrentWorkspaceId(orgId: number): Promise<number | null> {
  const cookieStore = await cookies();
  const workspaceIdCookie = cookieStore.get(CURRENT_WORKSPACE_COOKIE);

  if (workspaceIdCookie) {
    const workspaceId = parseInt(workspaceIdCookie.value, 10);
    // Verify workspace belongs to org
    const workspace = await db.query.workspaces.findFirst({
      where: (w, { and }) => and(eq(w.id, workspaceId), eq(w.orgId, orgId)),
    });
    if (workspace) return workspaceId;
  }

  // Fallback to first workspace
  const firstWorkspace = await db.query.workspaces.findFirst({
    where: eq(workspaces.orgId, orgId),
  });
  return firstWorkspace?.id ?? null;
}

/**
 * Check if currently impersonating a user
 */
async function getImpersonatedUserId(): Promise<number | null> {
  const cookieStore = await cookies();
  const impersonateCookie = cookieStore.get(IMPERSONATE_COOKIE);

  if (!impersonateCookie) return null;

  try {
    const state = JSON.parse(impersonateCookie.value);
    return state.targetUserId ?? null;
  } catch {
    return null;
  }
}

/**
 * Get full auth context for the current request
 * Includes user, org, workspace, and role
 * Supports impersonation for super admins
 */
export async function getAuthContext(): Promise<AuthContext | null> {
  // First, verify the real user is authenticated
  const stackUser = await requireAuth();

  // Sync real user to database (ensures they exist)
  await syncUserToDb({
    id: stackUser.id,
    primaryEmail: stackUser.primaryEmail,
    displayName: stackUser.displayName,
    profileImageUrl: stackUser.profileImageUrl,
  });

  // Check if impersonating
  const impersonatedUserId = await getImpersonatedUserId();

  let user: User;

  if (impersonatedUserId) {
    // Get the impersonated user
    const impersonatedUser = await db.query.users.findFirst({
      where: eq(users.id, impersonatedUserId),
    });
    if (!impersonatedUser) return null;
    user = impersonatedUser;
  } else {
    // Get the real user
    const realUser = await db.query.users.findFirst({
      where: eq(users.externalId, stackUser.id),
    });
    if (!realUser) return null;
    user = realUser;
  }

  // Get current org
  const orgId = await getCurrentOrgId(user.id);
  if (!orgId) return null;

  const org = await db.query.orgs.findFirst({
    where: eq(orgs.id, orgId),
  });
  if (!org) return null;

  // Get membership/role
  const membership = await db.query.memberships.findFirst({
    where: (m, { and }) => and(eq(m.userId, user.id), eq(m.orgId, orgId)),
  });
  if (!membership) return null;

  // Get current workspace
  const workspaceId = await getCurrentWorkspaceId(orgId);
  if (!workspaceId) return null;

  const workspace = await db.query.workspaces.findFirst({
    where: eq(workspaces.id, workspaceId),
  });
  if (!workspace) return null;

  return {
    user,
    org,
    workspace,
    membership,
    role: membership.role,
  };
}

/**
 * Require full auth context - redirects if not available
 */
export async function requireAuthContext(): Promise<AuthContext> {
  const context = await getAuthContext();
  if (!context) {
    redirect("/handler/sign-in");
  }
  return context;
}

/**
 * Set the current org (stores in cookie)
 */
export async function setCurrentOrg(orgId: number) {
  const cookieStore = await cookies();
  cookieStore.set(CURRENT_ORG_COOKIE, orgId.toString(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365, // 1 year
  });
}

/**
 * Set the current workspace (stores in cookie)
 */
export async function setCurrentWorkspace(workspaceId: number) {
  const cookieStore = await cookies();
  cookieStore.set(CURRENT_WORKSPACE_COOKIE, workspaceId.toString(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365, // 1 year
  });
}

/**
 * Get RLS context from the current auth context
 * Use this to run RLS-protected database queries
 */
export function getRLSContext(context: AuthContext): RLSContext {
  return {
    workspaceId: context.workspace.id,
    orgId: context.org.id,
    userId: context.user.id,
  };
}

/**
 * Run a database operation with RLS protection based on current auth context
 * This ensures queries only return data for the authenticated user's workspace
 *
 * @example
 * const contacts = await withAuthRLS(async (db) => {
 *   return db.query.contacts.findMany();
 * });
 */
export async function withAuthRLS<T>(
  callback: Parameters<typeof withRLSContext<T>>[1]
): Promise<T> {
  const context = await requireAuthContext();
  return withRLSContext(getRLSContext(context), callback);
}
