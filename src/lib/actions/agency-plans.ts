"use server";

import { db } from "@/lib/db";
import {
  agencyPricingPlans,
  agencySaasSettings,
  clientSubscriptions,
  orgs,
} from "@/lib/db/schema";
import { eq, and, desc, count } from "drizzle-orm";
import { requireAgencyOwner } from "@/lib/auth/agency";
import { stripe } from "@/lib/stripe/client";
import { getConnectedAccountId } from "@/lib/stripe/connect";
import { revalidatePath } from "next/cache";

/**
 * Get all pricing plans for the current agency
 */
export async function getAgencyPlans() {
  const membership = await requireAgencyOwner();

  const plans = await db
    .select()
    .from(agencyPricingPlans)
    .where(eq(agencyPricingPlans.agencyId, membership.agencyId))
    .orderBy(agencyPricingPlans.sortOrder);

  return plans;
}

/**
 * Get a single pricing plan by ID
 */
export async function getAgencyPlan(planId: number) {
  const membership = await requireAgencyOwner();

  const [plan] = await db
    .select()
    .from(agencyPricingPlans)
    .where(
      and(
        eq(agencyPricingPlans.id, planId),
        eq(agencyPricingPlans.agencyId, membership.agencyId)
      )
    )
    .limit(1);

  return plan || null;
}

/**
 * Create a new pricing plan
 */
export async function createAgencyPlan(data: {
  name: string;
  description?: string;
  priceMonthly: number;
  priceYearly?: number;
  features: string[];
  maxContacts?: number;
  maxPipelines?: number;
  maxUsers?: number;
  isDefault?: boolean;
}) {
  const membership = await requireAgencyOwner();

  // Get connected Stripe account
  const stripeAccountId = await getConnectedAccountId(membership.agencyId);

  if (!stripeAccountId) {
    return { error: "Stripe account not connected" };
  }

  try {
    // Create Stripe product on connected account
    const product = await stripe.products.create(
      {
        name: data.name,
        description: data.description,
        metadata: {
          agency_id: membership.agencyId.toString(),
        },
      },
      { stripeAccount: stripeAccountId }
    );

    // Create monthly price
    const monthlyPrice = await stripe.prices.create(
      {
        product: product.id,
        unit_amount: Math.round(data.priceMonthly * 100),
        currency: "eur",
        recurring: { interval: "month" },
      },
      { stripeAccount: stripeAccountId }
    );

    // Create yearly price if provided
    let yearlyPrice = null;
    if (data.priceYearly && data.priceYearly > 0) {
      yearlyPrice = await stripe.prices.create(
        {
          product: product.id,
          unit_amount: Math.round(data.priceYearly * 100),
          currency: "eur",
          recurring: { interval: "year" },
        },
        { stripeAccount: stripeAccountId }
      );
    }

    // If this is marked as default, unset other defaults
    if (data.isDefault) {
      await db
        .update(agencyPricingPlans)
        .set({ isDefault: false })
        .where(eq(agencyPricingPlans.agencyId, membership.agencyId));
    }

    // Get max sort order
    const [maxSort] = await db
      .select({ maxOrder: agencyPricingPlans.sortOrder })
      .from(agencyPricingPlans)
      .where(eq(agencyPricingPlans.agencyId, membership.agencyId))
      .orderBy(desc(agencyPricingPlans.sortOrder))
      .limit(1);

    // Create plan in database
    const [plan] = await db
      .insert(agencyPricingPlans)
      .values({
        agencyId: membership.agencyId,
        name: data.name,
        description: data.description,
        priceMonthly: data.priceMonthly.toString(),
        priceYearly: data.priceYearly?.toString(),
        currency: "EUR",
        stripeProductId: product.id,
        stripePriceIdMonthly: monthlyPrice.id,
        stripePriceIdYearly: yearlyPrice?.id,
        features: data.features,
        maxContacts: data.maxContacts,
        maxPipelines: data.maxPipelines,
        maxUsers: data.maxUsers,
        isActive: true,
        isDefault: data.isDefault || false,
        sortOrder: (maxSort?.maxOrder || 0) + 1,
      })
      .returning();

    revalidatePath("/agency/saas/plans");
    return { success: true, plan };
  } catch (error) {
    console.error("Error creating plan:", error);
    return { error: "Failed to create plan" };
  }
}

/**
 * Update an existing pricing plan
 */
export async function updateAgencyPlan(
  planId: number,
  data: {
    name?: string;
    description?: string;
    priceMonthly?: number;
    priceYearly?: number;
    features?: string[];
    maxContacts?: number;
    maxPipelines?: number;
    maxUsers?: number;
    isDefault?: boolean;
    isActive?: boolean;
  }
) {
  const membership = await requireAgencyOwner();

  // Verify plan belongs to agency
  const [existingPlan] = await db
    .select()
    .from(agencyPricingPlans)
    .where(
      and(
        eq(agencyPricingPlans.id, planId),
        eq(agencyPricingPlans.agencyId, membership.agencyId)
      )
    )
    .limit(1);

  if (!existingPlan) {
    return { error: "Plan not found" };
  }

  // Get connected Stripe account
  const stripeAccountId = await getConnectedAccountId(membership.agencyId);

  try {
    // Update Stripe product if name/description changed
    if (
      stripeAccountId &&
      existingPlan.stripeProductId &&
      (data.name || data.description)
    ) {
      await stripe.products.update(
        existingPlan.stripeProductId,
        {
          name: data.name || existingPlan.name,
          description: data.description ?? existingPlan.description ?? undefined,
        },
        { stripeAccount: stripeAccountId }
      );
    }

    // Note: Stripe doesn't allow updating prices, so if price changes,
    // we'd need to create new prices and archive old ones.
    // For simplicity, we only update non-price fields here.

    // If this is marked as default, unset other defaults
    if (data.isDefault) {
      await db
        .update(agencyPricingPlans)
        .set({ isDefault: false })
        .where(eq(agencyPricingPlans.agencyId, membership.agencyId));
    }

    // Update plan in database
    const [updatedPlan] = await db
      .update(agencyPricingPlans)
      .set({
        name: data.name ?? existingPlan.name,
        description: data.description,
        features: data.features ?? existingPlan.features,
        maxContacts: data.maxContacts,
        maxPipelines: data.maxPipelines,
        maxUsers: data.maxUsers,
        isDefault: data.isDefault ?? existingPlan.isDefault,
        isActive: data.isActive ?? existingPlan.isActive,
        updatedAt: new Date(),
      })
      .where(eq(agencyPricingPlans.id, planId))
      .returning();

    revalidatePath("/agency/saas/plans");
    revalidatePath(`/agency/saas/plans/${planId}`);
    return { success: true, plan: updatedPlan };
  } catch (error) {
    console.error("Error updating plan:", error);
    return { error: "Failed to update plan" };
  }
}

/**
 * Delete (archive) a pricing plan
 */
export async function deleteAgencyPlan(planId: number) {
  const membership = await requireAgencyOwner();

  // Verify plan belongs to agency
  const [existingPlan] = await db
    .select()
    .from(agencyPricingPlans)
    .where(
      and(
        eq(agencyPricingPlans.id, planId),
        eq(agencyPricingPlans.agencyId, membership.agencyId)
      )
    )
    .limit(1);

  if (!existingPlan) {
    return { error: "Plan not found" };
  }

  // Check if plan has active subscriptions
  const [activeSubscriptions] = await db
    .select({ count: count() })
    .from(clientSubscriptions)
    .where(
      and(
        eq(clientSubscriptions.planId, planId),
        eq(clientSubscriptions.status, "active")
      )
    );

  if (activeSubscriptions && activeSubscriptions.count > 0) {
    return {
      error: `Cannot delete plan with ${activeSubscriptions.count} active subscriptions`,
    };
  }

  try {
    // Archive in Stripe
    const stripeAccountId = await getConnectedAccountId(membership.agencyId);
    if (stripeAccountId && existingPlan.stripeProductId) {
      await stripe.products.update(
        existingPlan.stripeProductId,
        { active: false },
        { stripeAccount: stripeAccountId }
      );
    }

    // Soft delete by setting isActive to false
    await db
      .update(agencyPricingPlans)
      .set({ isActive: false, updatedAt: new Date() })
      .where(eq(agencyPricingPlans.id, planId));

    revalidatePath("/agency/saas/plans");
    return { success: true };
  } catch (error) {
    console.error("Error deleting plan:", error);
    return { error: "Failed to delete plan" };
  }
}

/**
 * Update plan sort order
 */
export async function updatePlanSortOrder(planIds: number[]) {
  const membership = await requireAgencyOwner();

  try {
    // Update each plan's sort order
    await Promise.all(
      planIds.map((planId, index) =>
        db
          .update(agencyPricingPlans)
          .set({ sortOrder: index, updatedAt: new Date() })
          .where(
            and(
              eq(agencyPricingPlans.id, planId),
              eq(agencyPricingPlans.agencyId, membership.agencyId)
            )
          )
      )
    );

    revalidatePath("/agency/saas/plans");
    return { success: true };
  } catch (error) {
    console.error("Error updating sort order:", error);
    return { error: "Failed to update sort order" };
  }
}

/**
 * Get or create SaaS settings for the agency
 */
export async function getOrCreateSaasSettings() {
  const membership = await requireAgencyOwner();

  let [settings] = await db
    .select()
    .from(agencySaasSettings)
    .where(eq(agencySaasSettings.agencyId, membership.agencyId))
    .limit(1);

  if (!settings) {
    [settings] = await db
      .insert(agencySaasSettings)
      .values({
        agencyId: membership.agencyId,
        selfSignupEnabled: false,
        requirePaymentOnSignup: false,
        trialDays: 14,
      })
      .returning();
  }

  return settings;
}

/**
 * Update SaaS settings
 */
export async function updateSaasSettings(data: {
  selfSignupEnabled?: boolean;
  requirePaymentOnSignup?: boolean;
  trialDays?: number;
  signupPageTitle?: string;
  signupPageDescription?: string;
  termsUrl?: string;
  privacyUrl?: string;
  customCss?: string;
}) {
  const membership = await requireAgencyOwner();

  // Get or create settings first
  await getOrCreateSaasSettings();

  try {
    const [settings] = await db
      .update(agencySaasSettings)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(agencySaasSettings.agencyId, membership.agencyId))
      .returning();

    revalidatePath("/agency/saas/settings");
    return { success: true, settings };
  } catch (error) {
    console.error("Error updating settings:", error);
    return { error: "Failed to update settings" };
  }
}

/**
 * Get client subscriptions for the agency
 */
export async function getClientSubscriptions() {
  const membership = await requireAgencyOwner();

  const subscriptions = await db
    .select({
      subscription: clientSubscriptions,
      org: {
        id: orgs.id,
        name: orgs.name,
        slug: orgs.slug,
        billingEmail: orgs.billingEmail,
      },
      plan: {
        id: agencyPricingPlans.id,
        name: agencyPricingPlans.name,
        priceMonthly: agencyPricingPlans.priceMonthly,
      },
    })
    .from(clientSubscriptions)
    .innerJoin(orgs, eq(clientSubscriptions.orgId, orgs.id))
    .innerJoin(agencyPricingPlans, eq(clientSubscriptions.planId, agencyPricingPlans.id))
    .where(eq(clientSubscriptions.agencyId, membership.agencyId))
    .orderBy(desc(clientSubscriptions.createdAt));

  return subscriptions;
}

/**
 * Get SaaS dashboard stats
 */
export async function getSaasDashboardStats() {
  const membership = await requireAgencyOwner();

  // Get total clients (orgs under this agency)
  const [totalClients] = await db
    .select({ count: count() })
    .from(orgs)
    .where(eq(orgs.agencyId, membership.agencyId));

  // Get active subscriptions
  const [activeSubscriptions] = await db
    .select({ count: count() })
    .from(clientSubscriptions)
    .where(
      and(
        eq(clientSubscriptions.agencyId, membership.agencyId),
        eq(clientSubscriptions.status, "active")
      )
    );

  // Get trialing subscriptions
  const [trialingSubscriptions] = await db
    .select({ count: count() })
    .from(clientSubscriptions)
    .where(
      and(
        eq(clientSubscriptions.agencyId, membership.agencyId),
        eq(clientSubscriptions.status, "trialing")
      )
    );

  // Get pricing plans count
  const [plansCount] = await db
    .select({ count: count() })
    .from(agencyPricingPlans)
    .where(
      and(
        eq(agencyPricingPlans.agencyId, membership.agencyId),
        eq(agencyPricingPlans.isActive, true)
      )
    );

  // Calculate MRR (Monthly Recurring Revenue)
  const activeWithPrices = await db
    .select({
      priceMonthly: agencyPricingPlans.priceMonthly,
      billingInterval: clientSubscriptions.billingInterval,
    })
    .from(clientSubscriptions)
    .innerJoin(agencyPricingPlans, eq(clientSubscriptions.planId, agencyPricingPlans.id))
    .where(
      and(
        eq(clientSubscriptions.agencyId, membership.agencyId),
        eq(clientSubscriptions.status, "active")
      )
    );

  const mrr = activeWithPrices.reduce((sum, sub) => {
    const monthlyPrice = parseFloat(sub.priceMonthly);
    // If yearly, divide by 12 for MRR
    if (sub.billingInterval === "yearly") {
      return sum + monthlyPrice / 12;
    }
    return sum + monthlyPrice;
  }, 0);

  return {
    totalClients: totalClients?.count || 0,
    activeSubscriptions: activeSubscriptions?.count || 0,
    trialingSubscriptions: trialingSubscriptions?.count || 0,
    plansCount: plansCount?.count || 0,
    mrr,
  };
}
