import "server-only";

import { redirect } from "next/navigation";
import { requireAuthContext, type AuthContext } from "./context";

type Role = "owner" | "admin" | "member";

// Role hierarchy: owner > admin > member
const ROLE_HIERARCHY: Record<Role, number> = {
  owner: 3,
  admin: 2,
  member: 1,
};

/**
 * Check if a role meets the minimum required role
 */
export function hasMinimumRole(userRole: Role, requiredRole: Role): boolean {
  return ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[requiredRole];
}

/**
 * Check if user has one of the allowed roles
 */
export function hasRole(userRole: Role, allowedRoles: Role[]): boolean {
  return allowedRoles.includes(userRole);
}

/**
 * Require user to have one of the specified roles
 * Redirects to unauthorized page if not
 */
export async function requireRole(
  allowedRoles: Role[],
  options?: { redirectTo?: string }
): Promise<AuthContext> {
  const context = await requireAuthContext();

  if (!hasRole(context.role, allowedRoles)) {
    redirect(options?.redirectTo ?? "/unauthorized");
  }

  return context;
}

/**
 * Require user to have at least the specified role level
 * e.g., requireMinimumRole("admin") allows admin and owner
 */
export async function requireMinimumRole(
  minimumRole: Role,
  options?: { redirectTo?: string }
): Promise<AuthContext> {
  const context = await requireAuthContext();

  if (!hasMinimumRole(context.role, minimumRole)) {
    redirect(options?.redirectTo ?? "/unauthorized");
  }

  return context;
}

/**
 * Require owner role specifically
 */
export async function requireOwner(options?: { redirectTo?: string }): Promise<AuthContext> {
  return requireRole(["owner"], options);
}

/**
 * Require admin or owner role
 */
export async function requireAdmin(options?: { redirectTo?: string }): Promise<AuthContext> {
  return requireRole(["owner", "admin"], options);
}

/**
 * Check permissions without redirecting (for conditional rendering)
 */
export function can(context: AuthContext, action: string): boolean {
  const permissions: Record<string, Role[]> = {
    // Org management
    "org:delete": ["owner"],
    "org:settings": ["owner", "admin"],
    "org:billing": ["owner"],
    "org:invite": ["owner", "admin"],

    // Workspace management
    "workspace:create": ["owner", "admin"],
    "workspace:delete": ["owner", "admin"],
    "workspace:settings": ["owner", "admin"],

    // Member management
    "member:invite": ["owner", "admin"],
    "member:remove": ["owner", "admin"],
    "member:change-role": ["owner"],

    // Content (all members can do these)
    "content:read": ["owner", "admin", "member"],
    "content:write": ["owner", "admin", "member"],
  };

  const allowedRoles = permissions[action];
  if (!allowedRoles) {
    console.warn(`Unknown permission action: ${action}`);
    return false;
  }

  return hasRole(context.role, allowedRoles);
}
