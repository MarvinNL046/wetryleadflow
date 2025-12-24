"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { requireSuperAdmin } from "./superadmin";
import { logAuditEvent } from "@/lib/audit";
import { AuditActions, EntityTypes } from "@/lib/audit/constants";

const IMPERSONATE_COOKIE = "leadflow_impersonate";
const IMPERSONATE_MAX_AGE = 60 * 60 * 4; // 4 hours max

export interface ImpersonationState {
  targetUserId: number;
  targetUserEmail: string;
  adminUserId: string;
  adminUserEmail: string;
  startedAt: string;
}

/**
 * Start impersonating a user (super admin only)
 */
export async function startImpersonation(targetUserId: number) {
  const admin = await requireSuperAdmin();

  // Get target user
  const targetUser = await db.query.users.findFirst({
    where: eq(users.id, targetUserId),
  });

  if (!targetUser) {
    throw new Error("User not found");
  }

  // Don't allow impersonating yourself
  if (targetUser.externalId === admin.id) {
    throw new Error("Cannot impersonate yourself");
  }

  const state: ImpersonationState = {
    targetUserId: targetUser.id,
    targetUserEmail: targetUser.email,
    adminUserId: admin.id,
    adminUserEmail: admin.primaryEmail || "",
    startedAt: new Date().toISOString(),
  };

  // Set impersonation cookie
  const cookieStore = await cookies();
  cookieStore.set(IMPERSONATE_COOKIE, JSON.stringify(state), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: IMPERSONATE_MAX_AGE,
    path: "/",
  });

  // Log the impersonation start
  await logAuditEvent({
    action: AuditActions.IMPERSONATE_START,
    entityType: EntityTypes.USER,
    entityId: targetUser.id,
    details: {
      targetUserEmail: targetUser.email,
      adminUserEmail: admin.primaryEmail,
    },
  });

  redirect("/crm");
}

/**
 * Stop impersonating and return to admin
 */
export async function stopImpersonation() {
  const cookieStore = await cookies();
  const impersonateCookie = cookieStore.get(IMPERSONATE_COOKIE);

  if (impersonateCookie) {
    try {
      const state: ImpersonationState = JSON.parse(impersonateCookie.value);

      // Log the impersonation end
      await logAuditEvent({
        action: AuditActions.IMPERSONATE_STOP,
        entityType: EntityTypes.USER,
        entityId: state.targetUserId,
        details: {
          targetUserEmail: state.targetUserEmail,
          adminUserEmail: state.adminUserEmail,
          duration: Math.round(
            (Date.now() - new Date(state.startedAt).getTime()) / 1000
          ),
        },
      });
    } catch {
      // Ignore parsing errors
    }
  }

  // Remove the cookie
  cookieStore.delete(IMPERSONATE_COOKIE);

  redirect("/admin/users");
}

/**
 * Get current impersonation state (if any)
 */
export async function getImpersonationState(): Promise<ImpersonationState | null> {
  const cookieStore = await cookies();
  const impersonateCookie = cookieStore.get(IMPERSONATE_COOKIE);

  if (!impersonateCookie) {
    return null;
  }

  try {
    return JSON.parse(impersonateCookie.value) as ImpersonationState;
  } catch {
    return null;
  }
}

/**
 * Check if currently impersonating
 */
export async function isImpersonating(): Promise<boolean> {
  const state = await getImpersonationState();
  return state !== null;
}
