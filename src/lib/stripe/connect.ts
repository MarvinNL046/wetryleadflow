import "server-only";
import { stripe } from "./client";
import { db } from "@/lib/db";
import { agencyStripeAccounts, agencies } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

/**
 * Create a Stripe Connect Express account for an agency
 */
export async function createConnectedAccount(
  agencyId: number,
  email: string,
  businessName: string
) {
  // Create Stripe Express account
  const account = await stripe.accounts.create({
    type: "express",
    country: "NL", // Netherlands
    email,
    business_type: "company",
    company: {
      name: businessName,
    },
    capabilities: {
      card_payments: { requested: true },
      transfers: { requested: true },
    },
    metadata: {
      agency_id: agencyId.toString(),
    },
  });

  // Store in database
  await db.insert(agencyStripeAccounts).values({
    agencyId,
    stripeAccountId: account.id,
    stripeAccountType: "express",
    chargesEnabled: account.charges_enabled,
    payoutsEnabled: account.payouts_enabled,
    detailsSubmitted: account.details_submitted ?? false,
    onboardingComplete: false,
  });

  return account;
}

/**
 * Create an account link for Stripe Connect onboarding
 */
export async function createAccountLink(
  accountId: string,
  agencySlug: string
) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  const accountLink = await stripe.accountLinks.create({
    account: accountId,
    refresh_url: `${baseUrl}/agency/billing/connect?refresh=true`,
    return_url: `${baseUrl}/agency/billing/connect?success=true`,
    type: "account_onboarding",
  });

  return accountLink;
}

/**
 * Get the Stripe Connect account status for an agency
 */
export async function getStripeAccountStatus(agencyId: number) {
  const [stripeAccount] = await db
    .select()
    .from(agencyStripeAccounts)
    .where(eq(agencyStripeAccounts.agencyId, agencyId))
    .limit(1);

  if (!stripeAccount) {
    return null;
  }

  // Fetch latest status from Stripe
  const account = await stripe.accounts.retrieve(stripeAccount.stripeAccountId);

  // Update local status if changed
  if (
    account.charges_enabled !== stripeAccount.chargesEnabled ||
    account.payouts_enabled !== stripeAccount.payoutsEnabled ||
    account.details_submitted !== stripeAccount.detailsSubmitted
  ) {
    await db
      .update(agencyStripeAccounts)
      .set({
        chargesEnabled: account.charges_enabled,
        payoutsEnabled: account.payouts_enabled,
        detailsSubmitted: account.details_submitted ?? false,
        onboardingComplete:
          account.charges_enabled && account.payouts_enabled,
        updatedAt: new Date(),
      })
      .where(eq(agencyStripeAccounts.agencyId, agencyId));
  }

  return {
    accountId: stripeAccount.stripeAccountId,
    chargesEnabled: account.charges_enabled,
    payoutsEnabled: account.payouts_enabled,
    detailsSubmitted: account.details_submitted,
    onboardingComplete:
      account.charges_enabled && account.payouts_enabled,
    requirements: account.requirements,
  };
}

/**
 * Create a login link for Stripe Express dashboard
 */
export async function createDashboardLink(accountId: string) {
  const loginLink = await stripe.accounts.createLoginLink(accountId);
  return loginLink.url;
}

/**
 * Disconnect a Stripe Connect account
 */
export async function disconnectStripeAccount(agencyId: number) {
  const [stripeAccount] = await db
    .select()
    .from(agencyStripeAccounts)
    .where(eq(agencyStripeAccounts.agencyId, agencyId))
    .limit(1);

  if (!stripeAccount) {
    return { success: false, error: "No Stripe account found" };
  }

  try {
    // Delete the Stripe Connect account
    await stripe.accounts.del(stripeAccount.stripeAccountId);
  } catch (error) {
    // Account might already be deleted or inaccessible
    console.error("Error deleting Stripe account:", error);
  }

  // Remove from database
  await db
    .delete(agencyStripeAccounts)
    .where(eq(agencyStripeAccounts.agencyId, agencyId));

  // Disable SaaS mode for the agency
  await db
    .update(agencies)
    .set({
      saasMode: false,
      updatedAt: new Date(),
    })
    .where(eq(agencies.id, agencyId));

  return { success: true };
}

/**
 * Check if agency has a connected Stripe account
 */
export async function hasConnectedAccount(agencyId: number) {
  const [stripeAccount] = await db
    .select({ id: agencyStripeAccounts.id })
    .from(agencyStripeAccounts)
    .where(eq(agencyStripeAccounts.agencyId, agencyId))
    .limit(1);

  return !!stripeAccount;
}

/**
 * Get the connected account ID for an agency
 */
export async function getConnectedAccountId(agencyId: number) {
  const [stripeAccount] = await db
    .select({ stripeAccountId: agencyStripeAccounts.stripeAccountId })
    .from(agencyStripeAccounts)
    .where(eq(agencyStripeAccounts.agencyId, agencyId))
    .limit(1);

  return stripeAccount?.stripeAccountId || null;
}
