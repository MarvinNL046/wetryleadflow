import "server-only";

import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { db, users, memberships, orgs, workspaces } from "@/lib/db";
import { requireAuth } from "./index";
import { syncUserToDb } from "./sync";
import type { User, Org, Workspace, Membership } from "@/lib/db/schema";

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
 * Get full auth context for the current request
 * Includes user, org, workspace, and role
 */
export async function getAuthContext(): Promise<AuthContext | null> {
  const stackUser = await requireAuth();

  // Sync user to our database
  const user = await syncUserToDb({
    id: stackUser.id,
    primaryEmail: stackUser.primaryEmail,
    displayName: stackUser.displayName,
    profileImageUrl: stackUser.profileImageUrl,
  });

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
