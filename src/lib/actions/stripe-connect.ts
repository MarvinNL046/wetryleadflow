"use server";

import { requireAgencyOwner, requireAgencyMember } from "@/lib/auth/agency";
import {
  createConnectedAccount,
  createAccountLink,
  hasConnectedAccount,
  getStripeAccountStatus,
  disconnectStripeAccount as disconnectAccount,
  createDashboardLink,
} from "@/lib/stripe/connect";
import { db } from "@/lib/db";
import { agencies } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function initiateStripeConnect() {
  const membership = await requireAgencyOwner();
  const agency = membership.agency;

  // Check if SaaS Pro tier
  if (agency.tier !== "saas_pro") {
    return { error: "Upgrade to SaaS Pro to use Stripe Connect" };
  }

  // Check if already has a connected account
  const hasAccount = await hasConnectedAccount(agency.id);

  if (hasAccount) {
    // Check if onboarding is complete
    const status = await getStripeAccountStatus(agency.id);

    if (status?.onboardingComplete) {
      return { error: "Stripe account already connected and active" };
    }

    // Create a new account link for incomplete onboarding
    const accountLink = await createAccountLink(status!.accountId, agency.slug);
    return { url: accountLink.url };
  }

  try {
    // Create new connected account
    const account = await createConnectedAccount(
      agency.id,
      agency.email,
      agency.name
    );

    // Create onboarding link
    const accountLink = await createAccountLink(account.id, agency.slug);
    return { url: accountLink.url };
  } catch (error) {
    console.error("Error initiating Stripe Connect:", error);
    return { error: "Failed to initiate Stripe Connect" };
  }
}

export async function getStripeConnectStatus() {
  const membership = await requireAgencyMember();
  const agency = membership.agency;

  const status = await getStripeAccountStatus(agency.id);

  if (!status) {
    return { connected: false };
  }

  // Get dashboard link if onboarding is complete
  let dashboardUrl: string | null = null;
  if (status.onboardingComplete) {
    try {
      dashboardUrl = await createDashboardLink(status.accountId);
    } catch (error) {
      console.error("Error creating dashboard link:", error);
    }
  }

  return {
    connected: true,
    ...status,
    dashboardUrl,
  };
}

export async function disconnectStripeConnect() {
  const membership = await requireAgencyOwner();
  const agency = membership.agency;

  const result = await disconnectAccount(agency.id);

  if (!result.success) {
    return { error: result.error };
  }

  return { success: true };
}

export async function enableSaasMode() {
  const membership = await requireAgencyOwner();
  const agency = membership.agency;

  // Check if SaaS Pro tier
  if (agency.tier !== "saas_pro") {
    return { error: "Upgrade to SaaS Pro to enable SaaS Mode" };
  }

  // Check if Stripe Connect is set up
  const status = await getStripeAccountStatus(agency.id);

  if (!status?.onboardingComplete) {
    return { error: "Complete Stripe Connect setup first" };
  }

  // Enable SaaS mode
  await db
    .update(agencies)
    .set({
      saasMode: true,
      updatedAt: new Date(),
    })
    .where(eq(agencies.id, agency.id));

  return { success: true };
}

export async function disableSaasMode() {
  const membership = await requireAgencyOwner();
  const agency = membership.agency;

  // Disable SaaS mode
  await db
    .update(agencies)
    .set({
      saasMode: false,
      updatedAt: new Date(),
    })
    .where(eq(agencies.id, agency.id));

  return { success: true };
}
