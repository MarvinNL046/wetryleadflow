import "server-only";
import { cookies } from "next/headers";
import { db } from "@/lib/db";
import { agencies, agencyMemberships } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { stackServerApp } from "@/stack/server";
import { isSuperAdmin } from "./superadmin";

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
 * Get agency impersonation state (for super-admins)
 */
export async function getAgencyImpersonationState(): Promise<AgencyImpersonationState | null> {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(AGENCY_IMPERSONATE_COOKIE);

  if (!cookie) return null;

  try {
    return JSON.parse(cookie.value) as AgencyImpersonationState;
  } catch {
    return null;
  }
}

/**
 * Get current user's agency membership
 * Super-admins can impersonate any agency, but also check for actual membership
 * Super-admins without impersonation or membership get auto-access to first available agency
 */
export async function getCurrentAgencyMembership() {
  const user = await stackServerApp.getUser();
  if (!user) return null;

  const isAdmin = isSuperAdmin(user.primaryEmail);

  // Check if super-admin is impersonating an agency
  if (isAdmin) {
    const impersonationState = await getAgencyImpersonationState();

    if (impersonationState) {
      // Get the impersonated agency
      const [agency] = await db
        .select({
          id: agencies.id,
          slug: agencies.slug,
          name: agencies.name,
          appName: agencies.appName,
          logoUrl: agencies.logoUrl,
          primaryColor: agencies.primaryColor,
          secondaryColor: agencies.secondaryColor,
          email: agencies.email,
          website: agencies.website,
          maxOrgs: agencies.maxOrgs,
          subscriptionStatus: agencies.subscriptionStatus,
          stripeCustomerId: agencies.stripeCustomerId,
          isActive: agencies.isActive,
          createdAt: agencies.createdAt,
          tier: agencies.tier,
          saasMode: agencies.saasMode,
          stripePriceId: agencies.stripePriceId,
          stripeSubscriptionId: agencies.stripeSubscriptionId,
          onboardingCompleted: agencies.onboardingCompleted,
        })
        .from(agencies)
        .where(eq(agencies.id, impersonationState.agencyId))
        .limit(1);

      if (agency) {
        return {
          id: 0, // Virtual membership ID for super-admin
          agencyId: agency.id,
          userId: user.id,
          role: "owner" as const, // Super-admin gets owner role
          agency,
          isSuperAdmin: true, // Flag to indicate super-admin access
        };
      }
    }
  }

  // Check actual membership (for both regular users AND super-admins who own agencies)
  const [membership] = await db
    .select({
      id: agencyMemberships.id,
      agencyId: agencyMemberships.agencyId,
      userId: agencyMemberships.userId,
      role: agencyMemberships.role,
      agency: {
        id: agencies.id,
        slug: agencies.slug,
        name: agencies.name,
        appName: agencies.appName,
        logoUrl: agencies.logoUrl,
        primaryColor: agencies.primaryColor,
        secondaryColor: agencies.secondaryColor,
        email: agencies.email,
        website: agencies.website,
        maxOrgs: agencies.maxOrgs,
        subscriptionStatus: agencies.subscriptionStatus,
        stripeCustomerId: agencies.stripeCustomerId,
        isActive: agencies.isActive,
        createdAt: agencies.createdAt,
        // SaaS Mode fields
        tier: agencies.tier,
        saasMode: agencies.saasMode,
        stripePriceId: agencies.stripePriceId,
        stripeSubscriptionId: agencies.stripeSubscriptionId,
        // Onboarding
        onboardingCompleted: agencies.onboardingCompleted,
      },
    })
    .from(agencyMemberships)
    .innerJoin(agencies, eq(agencies.id, agencyMemberships.agencyId))
    .where(eq(agencyMemberships.userId, user.id))
    .limit(1);

  if (membership) {
    return membership;
  }

  // Super-admin without membership: auto-access first available agency
  if (isAdmin) {
    const [firstAgency] = await db
      .select({
        id: agencies.id,
        slug: agencies.slug,
        name: agencies.name,
        appName: agencies.appName,
        logoUrl: agencies.logoUrl,
        primaryColor: agencies.primaryColor,
        secondaryColor: agencies.secondaryColor,
        email: agencies.email,
        website: agencies.website,
        maxOrgs: agencies.maxOrgs,
        subscriptionStatus: agencies.subscriptionStatus,
        stripeCustomerId: agencies.stripeCustomerId,
        isActive: agencies.isActive,
        createdAt: agencies.createdAt,
        tier: agencies.tier,
        saasMode: agencies.saasMode,
        stripePriceId: agencies.stripePriceId,
        stripeSubscriptionId: agencies.stripeSubscriptionId,
        onboardingCompleted: agencies.onboardingCompleted,
      })
      .from(agencies)
      .limit(1);

    if (firstAgency) {
      return {
        id: 0, // Virtual membership ID for super-admin
        agencyId: firstAgency.id,
        userId: user.id,
        role: "owner" as const, // Super-admin gets owner role
        agency: firstAgency,
        isSuperAdmin: true, // Flag to indicate super-admin access
      };
    }
  }

  return null;
}

/**
 * Require user to be an agency member
 * Super-admins without impersonation are redirected to agency selection
 * Regular users without membership are redirected to home
 */
export async function requireAgencyMember() {
  const user = await stackServerApp.getUser();

  if (!user) {
    redirect("/handler/sign-in");
  }

  const membership = await getCurrentAgencyMembership();

  if (!membership) {
    // Super-admins should select an agency to view
    if (isSuperAdmin(user.primaryEmail)) {
      redirect("/admin/agencies");
    }
    // Regular users redirected to home
    redirect("/");
  }

  return membership;
}

/**
 * Require user to be an agency owner or admin
 * Redirects to agency dashboard if not authorized
 */
export async function requireAgencyAdmin() {
  const membership = await requireAgencyMember();

  if (membership.role !== "owner" && membership.role !== "admin") {
    redirect("/agency");
  }

  return membership;
}

/**
 * Require user to be an agency owner
 * Redirects to agency dashboard if not authorized
 */
export async function requireAgencyOwner() {
  const membership = await requireAgencyMember();

  if (membership.role !== "owner") {
    redirect("/agency");
  }

  return membership;
}

/**
 * Check if user is an agency member (returns boolean, no redirect)
 */
export async function isAgencyMember(): Promise<boolean> {
  const membership = await getCurrentAgencyMembership();
  return !!membership;
}

/**
 * Check if user is an agency owner (returns boolean, no redirect)
 */
export async function isAgencyOwner(): Promise<boolean> {
  const membership = await getCurrentAgencyMembership();
  return membership?.role === "owner";
}

/**
 * Check if currently impersonating an agency
 */
export async function isImpersonatingAgency(): Promise<boolean> {
  const user = await stackServerApp.getUser();
  if (!user || !isSuperAdmin(user.primaryEmail)) return false;

  const state = await getAgencyImpersonationState();
  return state !== null;
}
