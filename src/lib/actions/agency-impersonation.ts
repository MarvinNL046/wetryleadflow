"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { agencies } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { stackServerApp } from "@/stack/server";
import { isSuperAdmin } from "@/lib/auth/superadmin";

// Agency impersonation cookie for super-admins
const AGENCY_IMPERSONATE_COOKIE = "leadflow_agency_impersonate";

export interface AgencyImpersonationState {
  agencyId: number;
  agencyName: string;
  adminUserId: string;
  adminUserEmail: string;
  startedAt: string;
}

/**
 * Start impersonating an agency (super-admin only)
 */
export async function startAgencyImpersonation(agencyId: number) {
  const user = await stackServerApp.getUser();

  if (!user || !isSuperAdmin(user.primaryEmail)) {
    throw new Error("Unauthorized");
  }

  // Get the agency
  const [agency] = await db
    .select({
      id: agencies.id,
      name: agencies.name,
    })
    .from(agencies)
    .where(eq(agencies.id, agencyId))
    .limit(1);

  if (!agency) {
    throw new Error("Agency not found");
  }

  const state: AgencyImpersonationState = {
    agencyId: agency.id,
    agencyName: agency.name,
    adminUserId: user.id,
    adminUserEmail: user.primaryEmail || "",
    startedAt: new Date().toISOString(),
  };

  // Set impersonation cookie
  const cookieStore = await cookies();
  cookieStore.set(AGENCY_IMPERSONATE_COOKIE, JSON.stringify(state), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 4, // 4 hours
    path: "/",
  });

  redirect("/agency");
}

/**
 * Stop impersonating an agency
 */
export async function stopAgencyImpersonation() {
  const cookieStore = await cookies();
  cookieStore.delete(AGENCY_IMPERSONATE_COOKIE);
  redirect("/admin/agencies");
}
