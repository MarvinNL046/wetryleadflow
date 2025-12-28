"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { orgs, memberships } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { requireAgencyMember } from "@/lib/auth/agency";
import { stackServerApp } from "@/stack/server";
import { logAuditEvent } from "@/lib/audit";
import { AuditActions, EntityTypes } from "@/lib/audit/constants";

const AGENCY_CLIENT_IMPERSONATE_COOKIE = "leadflow_agency_client_impersonate";
const IMPERSONATE_MAX_AGE = 60 * 60 * 4; // 4 hours max

export interface AgencyClientImpersonationState {
  targetUserId: number;
  targetUserEmail: string;
  targetOrgId: number;
  targetOrgName: string;
  agencyId: number;
  agencyUserId: string;
  agencyUserEmail: string;
  startedAt: string;
}

/**
 * Start impersonating a client user (agency owner/admin only)
 */
export async function startAgencyClientImpersonation(clientOrgId: number) {
  const membership = await requireAgencyMember();
  const agencyUser = await stackServerApp.getUser();

  if (!agencyUser) {
    throw new Error("Not authenticated");
  }

  const { agency, role } = membership;

  // Only agency owners and admins can impersonate
  if (role !== "owner" && role !== "admin") {
    throw new Error("Only agency owners and admins can impersonate clients");
  }

  // Verify the org belongs to this agency
  const clientOrg = await db.query.orgs.findFirst({
    where: and(
      eq(orgs.id, clientOrgId),
      eq(orgs.agencyId, agency.id)
    ),
  });

  if (!clientOrg) {
    throw new Error("Client organization not found or does not belong to your agency");
  }

  // Get the first owner of the client org
  const clientMembership = await db.query.memberships.findFirst({
    where: and(
      eq(memberships.orgId, clientOrgId),
      eq(memberships.role, "owner")
    ),
    with: {
      user: true,
    },
  });

  if (!clientMembership || !clientMembership.user) {
    throw new Error("Client organization has no owner to impersonate");
  }

  const targetUser = clientMembership.user;

  const state: AgencyClientImpersonationState = {
    targetUserId: targetUser.id,
    targetUserEmail: targetUser.email,
    targetOrgId: clientOrg.id,
    targetOrgName: clientOrg.name,
    agencyId: agency.id,
    agencyUserId: agencyUser.id,
    agencyUserEmail: agencyUser.primaryEmail || "",
    startedAt: new Date().toISOString(),
  };

  // Set impersonation cookie
  const cookieStore = await cookies();
  cookieStore.set(AGENCY_CLIENT_IMPERSONATE_COOKIE, JSON.stringify(state), {
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
      targetOrgName: clientOrg.name,
      agencyUserEmail: agencyUser.primaryEmail,
      agencyName: agency.name,
      isAgencyClientImpersonation: true,
    },
  });

  redirect(`/${agency.slug}/crm`);
}

/**
 * Stop impersonating a client and return to agency
 */
export async function stopAgencyClientImpersonation() {
  const cookieStore = await cookies();
  const impersonateCookie = cookieStore.get(AGENCY_CLIENT_IMPERSONATE_COOKIE);

  if (impersonateCookie) {
    try {
      const state: AgencyClientImpersonationState = JSON.parse(impersonateCookie.value);

      // Log the impersonation end
      await logAuditEvent({
        action: AuditActions.IMPERSONATE_STOP,
        entityType: EntityTypes.USER,
        entityId: state.targetUserId,
        details: {
          targetUserEmail: state.targetUserEmail,
          targetOrgName: state.targetOrgName,
          agencyUserEmail: state.agencyUserEmail,
          duration: Math.round(
            (Date.now() - new Date(state.startedAt).getTime()) / 1000
          ),
          isAgencyClientImpersonation: true,
        },
      });
    } catch {
      // Ignore parsing errors
    }
  }

  // Remove the cookie
  cookieStore.delete(AGENCY_CLIENT_IMPERSONATE_COOKIE);

  redirect("/agency/clients");
}

/**
 * Get current agency client impersonation state (if any)
 */
export async function getAgencyClientImpersonationState(): Promise<AgencyClientImpersonationState | null> {
  const cookieStore = await cookies();
  const impersonateCookie = cookieStore.get(AGENCY_CLIENT_IMPERSONATE_COOKIE);

  if (!impersonateCookie) {
    return null;
  }

  try {
    return JSON.parse(impersonateCookie.value) as AgencyClientImpersonationState;
  } catch {
    return null;
  }
}

/**
 * Check if currently impersonating a client
 */
export async function isImpersonatingClient(): Promise<boolean> {
  const state = await getAgencyClientImpersonationState();
  return state !== null;
}
