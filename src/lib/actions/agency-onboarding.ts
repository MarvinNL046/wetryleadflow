"use server";

import { db } from "@/lib/db";
import { agencies, orgs, agencyStripeAccounts, agencyPricingPlans, agencySaasSettings } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { requireAgencyOwner } from "@/lib/auth/agency";

/**
 * Get onboarding status for an agency
 */
export async function getOnboardingStatus(agencyId: number) {
  // Check if agency has clients
  const clients = await db
    .select({ id: orgs.id })
    .from(orgs)
    .where(eq(orgs.agencyId, agencyId))
    .limit(1);

  // Check if agency has Stripe Connect
  const stripeAccount = await db
    .select({ id: agencyStripeAccounts.id, onboardingComplete: agencyStripeAccounts.onboardingComplete })
    .from(agencyStripeAccounts)
    .where(eq(agencyStripeAccounts.agencyId, agencyId))
    .limit(1);

  // Check if agency has pricing plans
  const pricingPlans = await db
    .select({ id: agencyPricingPlans.id })
    .from(agencyPricingPlans)
    .where(and(eq(agencyPricingPlans.agencyId, agencyId), eq(agencyPricingPlans.isActive, true)))
    .limit(1);

  // Check if agency has SaaS settings enabled
  const saasSettings = await db
    .select({ selfSignupEnabled: agencySaasSettings.selfSignupEnabled })
    .from(agencySaasSettings)
    .where(eq(agencySaasSettings.agencyId, agencyId))
    .limit(1);

  return {
    hasClients: clients.length > 0,
    hasStripeConnect: stripeAccount.length > 0 && stripeAccount[0].onboardingComplete === true,
    hasPricingPlans: pricingPlans.length > 0,
    hasSaasSettings: saasSettings.length > 0 && saasSettings[0].selfSignupEnabled === true,
  };
}

/**
 * Complete the initial onboarding (profile setup)
 */
export async function completeOnboarding(data: {
  appName?: string;
  logoUrl?: string;
  primaryColor?: string;
  secondaryColor?: string;
  industry?: string;
  companySize?: string;
  phone?: string;
}) {
  const { agency } = await requireAgencyOwner();

  await db
    .update(agencies)
    .set({
      appName: data.appName || agency.name,
      logoUrl: data.logoUrl,
      primaryColor: data.primaryColor || "#8b5cf6",
      secondaryColor: data.secondaryColor,
      onboardingCompleted: true,
      updatedAt: new Date(),
    })
    .where(eq(agencies.id, agency.id));

  return { success: true };
}

/**
 * Skip onboarding (mark as completed without filling in details)
 */
export async function skipOnboarding() {
  const { agency } = await requireAgencyOwner();

  await db
    .update(agencies)
    .set({
      onboardingCompleted: true,
      updatedAt: new Date(),
    })
    .where(eq(agencies.id, agency.id));

  return { success: true };
}
