"use server";

import { db } from "@/lib/db";
import {
  agencies,
  agencySaasSettings,
  agencyPricingPlans,
  agencyStripeAccounts,
  orgs,
  workspaces,
  clientSubscriptions,
  memberships,
  users,
} from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { stackServerApp } from "@/stack/server";
import {
  createConnectedCustomer,
  createClientSubscription,
} from "@/lib/stripe/subscriptions";
import { syncUserToDb } from "@/lib/auth/sync";

/**
 * Get agency by slug with SaaS settings and pricing plans
 */
export async function getAgencyBySlug(slug: string) {
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
      isActive: agencies.isActive,
      saasMode: agencies.saasMode,
      tier: agencies.tier,
    })
    .from(agencies)
    .where(and(eq(agencies.slug, slug), eq(agencies.isActive, true)))
    .limit(1);

  return agency || null;
}

/**
 * Get SaaS settings for an agency
 */
export async function getAgencySaasSettings(agencyId: number) {
  const [settings] = await db
    .select()
    .from(agencySaasSettings)
    .where(eq(agencySaasSettings.agencyId, agencyId))
    .limit(1);

  return settings || null;
}

/**
 * Get active pricing plans for an agency
 */
export async function getAgencyPricingPlans(agencyId: number) {
  const plans = await db
    .select()
    .from(agencyPricingPlans)
    .where(
      and(
        eq(agencyPricingPlans.agencyId, agencyId),
        eq(agencyPricingPlans.isActive, true)
      )
    )
    .orderBy(agencyPricingPlans.sortOrder);

  return plans;
}

/**
 * Get connected Stripe account ID for an agency
 */
export async function getAgencyStripeAccountId(agencyId: number) {
  const [account] = await db
    .select({ stripeAccountId: agencyStripeAccounts.stripeAccountId })
    .from(agencyStripeAccounts)
    .where(
      and(
        eq(agencyStripeAccounts.agencyId, agencyId),
        eq(agencyStripeAccounts.onboardingComplete, true)
      )
    )
    .limit(1);

  return account?.stripeAccountId || null;
}

/**
 * Create a client organization for an agency (SaaS signup flow)
 * User must be authenticated - userId is taken from auth, not parameters
 */
export async function createClientOrganization(data: {
  agencyId: number;
  companyName: string;
  slug: string;
  billingEmail: string;
  planId: number;
}) {
  // Verify user is authenticated
  const stackUser = await stackServerApp.getUser();
  if (!stackUser) {
    return { error: "Not authenticated" };
  }

  const { agencyId, companyName, slug, billingEmail, planId } = data;

  // Verify agency exists and is active
  const [agency] = await db
    .select({ id: agencies.id, isActive: agencies.isActive, saasMode: agencies.saasMode })
    .from(agencies)
    .where(eq(agencies.id, agencyId))
    .limit(1);

  if (!agency || !agency.isActive) {
    return { error: "Agency not found or inactive" };
  }

  if (!agency.saasMode) {
    return { error: "Agency does not accept self-service signups" };
  }

  // Sync user to database and get user ID
  const dbUser = await syncUserToDb({
    id: stackUser.id,
    primaryEmail: stackUser.primaryEmail,
    displayName: stackUser.displayName,
    profileImageUrl: stackUser.profileImageUrl,
  });

  // Check if slug is available
  const existingOrg = await db
    .select({ id: orgs.id })
    .from(orgs)
    .where(eq(orgs.slug, slug))
    .limit(1);

  if (existingOrg.length > 0) {
    return { error: "Organization slug already taken" };
  }

  // Get the plan
  const [plan] = await db
    .select()
    .from(agencyPricingPlans)
    .where(eq(agencyPricingPlans.id, planId))
    .limit(1);

  if (!plan) {
    return { error: "Invalid plan selected" };
  }

  // Get the agency's Stripe account ID
  const stripeAccountId = await getAgencyStripeAccountId(agencyId);

  if (!stripeAccountId) {
    return { error: "Agency payment system not configured" };
  }

  // Get SaaS settings for trial days
  const settings = await getAgencySaasSettings(agencyId);
  const trialDays = settings?.trialDays || 14;

  // Create the organization
  const [newOrg] = await db
    .insert(orgs)
    .values({
      name: companyName,
      slug,
      agencyId,
      billingEmail,
    })
    .returning();

  // Create default workspace
  await db.insert(workspaces).values({
    orgId: newOrg.id,
    name: "Main Workspace",
    slug: "main",
  });

  // Add user as owner of the new org
  await db.insert(memberships).values({
    orgId: newOrg.id,
    userId: dbUser.id,
    role: "owner",
  });

  // Create Stripe customer on connected account
  const customer = await createConnectedCustomer(
    stripeAccountId,
    billingEmail,
    companyName,
    {
      org_id: newOrg.id.toString(),
      agency_id: agencyId.toString(),
    }
  );

  // Update org with Stripe customer ID
  await db
    .update(orgs)
    .set({ stripeCustomerId: customer.id })
    .where(eq(orgs.id, newOrg.id));

  // Create subscription with trial
  if (plan.stripePriceIdMonthly) {
    await createClientSubscription(
      stripeAccountId,
      customer.id,
      plan.stripePriceIdMonthly,
      newOrg.id,
      agencyId,
      planId,
      trialDays
    );
  } else {
    // Create trial subscription record without Stripe
    await db.insert(clientSubscriptions).values({
      orgId: newOrg.id,
      agencyId,
      planId,
      stripeCustomerId: customer.id,
      status: "trialing",
      billingInterval: "monthly",
      currentPeriodStart: new Date(),
      currentPeriodEnd: new Date(Date.now() + trialDays * 24 * 60 * 60 * 1000),
    });
  }

  return { success: true, orgId: newOrg.id, orgSlug: newOrg.slug };
}

/**
 * Check if an org slug is available
 */
export async function isOrgSlugAvailable(slug: string) {
  const [existing] = await db
    .select({ id: orgs.id })
    .from(orgs)
    .where(eq(orgs.slug, slug))
    .limit(1);

  return !existing;
}
