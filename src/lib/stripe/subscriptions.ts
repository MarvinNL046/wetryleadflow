import "server-only";
import Stripe from "stripe";
import { stripe } from "./client";
import { db } from "@/lib/db";
import {
  clientSubscriptions,
  agencyPricingPlans,
  orgs,
  agencyInvoices,
} from "@/lib/db/schema";
import { eq } from "drizzle-orm";

/**
 * Create a Stripe customer on the connected account
 */
export async function createConnectedCustomer(
  connectedAccountId: string,
  email: string,
  name: string,
  metadata?: Record<string, string>
) {
  const customer = await stripe.customers.create(
    {
      email,
      name,
      metadata,
    },
    {
      stripeAccount: connectedAccountId,
    }
  );

  return customer;
}

/**
 * Create a checkout session for a client to subscribe to an agency plan
 */
export async function createClientCheckoutSession(
  connectedAccountId: string,
  priceId: string,
  orgId: number,
  agencyId: number,
  planId: number,
  successUrl: string,
  cancelUrl: string
) {
  // Get org details
  const [org] = await db
    .select()
    .from(orgs)
    .where(eq(orgs.id, orgId))
    .limit(1);

  if (!org) {
    throw new Error("Organization not found");
  }

  const session = await stripe.checkout.sessions.create(
    {
      mode: "subscription",
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: successUrl,
      cancel_url: cancelUrl,
      customer_email: org.billingEmail || undefined,
      metadata: {
        org_id: orgId.toString(),
        agency_id: agencyId.toString(),
        plan_id: planId.toString(),
      },
      subscription_data: {
        metadata: {
          org_id: orgId.toString(),
          agency_id: agencyId.toString(),
          plan_id: planId.toString(),
        },
      },
    },
    {
      stripeAccount: connectedAccountId,
    }
  );

  return session;
}

/**
 * Create a subscription directly (for trial or free plans)
 */
export async function createClientSubscription(
  connectedAccountId: string,
  customerId: string,
  priceId: string,
  orgId: number,
  agencyId: number,
  planId: number,
  trialDays: number = 0
) {
  const subscriptionData: Record<string, unknown> = {
    customer: customerId,
    items: [{ price: priceId }],
    metadata: {
      org_id: orgId.toString(),
      agency_id: agencyId.toString(),
      plan_id: planId.toString(),
    },
  };

  if (trialDays > 0) {
    subscriptionData.trial_period_days = trialDays;
  }

  const subscription = await stripe.subscriptions.create(
    subscriptionData as Stripe.SubscriptionCreateParams,
    {
      stripeAccount: connectedAccountId,
    }
  );

  // Get period dates from the subscription
  const periodStart = (subscription as { current_period_start?: number }).current_period_start;
  const periodEnd = (subscription as { current_period_end?: number }).current_period_end;

  // Store subscription in database
  await db.insert(clientSubscriptions).values({
    orgId,
    agencyId,
    planId,
    stripeSubscriptionId: subscription.id,
    stripeCustomerId: customerId,
    status: subscription.status === "trialing" ? "trialing" : "active",
    billingInterval:
      subscription.items.data[0].price.recurring?.interval === "year"
        ? "yearly"
        : "monthly",
    currentPeriodStart: periodStart ? new Date(periodStart * 1000) : null,
    currentPeriodEnd: periodEnd ? new Date(periodEnd * 1000) : null,
    cancelAtPeriodEnd: subscription.cancel_at_period_end,
  });

  return subscription;
}

/**
 * Cancel a client subscription
 */
export async function cancelClientSubscription(
  connectedAccountId: string,
  subscriptionId: string,
  immediately: boolean = false
) {
  if (immediately) {
    await stripe.subscriptions.cancel(subscriptionId, {
      stripeAccount: connectedAccountId,
    });

    // Update database
    await db
      .update(clientSubscriptions)
      .set({
        status: "canceled",
        updatedAt: new Date(),
      })
      .where(eq(clientSubscriptions.stripeSubscriptionId, subscriptionId));
  } else {
    await stripe.subscriptions.update(
      subscriptionId,
      { cancel_at_period_end: true },
      { stripeAccount: connectedAccountId }
    );

    // Update database
    await db
      .update(clientSubscriptions)
      .set({
        cancelAtPeriodEnd: true,
        updatedAt: new Date(),
      })
      .where(eq(clientSubscriptions.stripeSubscriptionId, subscriptionId));
  }
}

/**
 * Update a client subscription to a new plan
 */
export async function updateClientSubscription(
  connectedAccountId: string,
  subscriptionId: string,
  newPriceId: string,
  newPlanId: number
) {
  // Get current subscription
  const subscription = await stripe.subscriptions.retrieve(subscriptionId, {
    stripeAccount: connectedAccountId,
  });

  // Update subscription
  const updatedSubscription = await stripe.subscriptions.update(
    subscriptionId,
    {
      items: [
        {
          id: subscription.items.data[0].id,
          price: newPriceId,
        },
      ],
      proration_behavior: "create_prorations",
    },
    { stripeAccount: connectedAccountId }
  );

  // Update database
  await db
    .update(clientSubscriptions)
    .set({
      planId: newPlanId,
      billingInterval:
        updatedSubscription.items.data[0].price.recurring?.interval === "year"
          ? "yearly"
          : "monthly",
      updatedAt: new Date(),
    })
    .where(eq(clientSubscriptions.stripeSubscriptionId, subscriptionId));

  return updatedSubscription;
}

/**
 * Create a billing portal session for a client
 */
export async function createClientPortalSession(
  connectedAccountId: string,
  customerId: string,
  returnUrl: string
) {
  const session = await stripe.billingPortal.sessions.create(
    {
      customer: customerId,
      return_url: returnUrl,
    },
    { stripeAccount: connectedAccountId }
  );

  return session;
}

/**
 * Sync invoice from Stripe to database
 */
export async function syncInvoice(
  agencyId: number,
  orgId: number,
  stripeInvoice: {
    id: string;
    amount_due: number;
    currency: string;
    status: string | null;
    hosted_invoice_url: string | null;
    invoice_pdf: string | null;
    paid_at?: number;
  }
) {
  const existingInvoice = await db
    .select()
    .from(agencyInvoices)
    .where(eq(agencyInvoices.stripeInvoiceId, stripeInvoice.id))
    .limit(1);

  const status = stripeInvoice.status as
    | "draft"
    | "open"
    | "paid"
    | "uncollectible"
    | "void"
    | null;

  if (existingInvoice.length > 0) {
    // Update existing invoice
    await db
      .update(agencyInvoices)
      .set({
        status: status || "draft",
        invoiceUrl: stripeInvoice.hosted_invoice_url || null,
        invoicePdfUrl: stripeInvoice.invoice_pdf || null,
        paidAt: stripeInvoice.paid_at
          ? new Date(stripeInvoice.paid_at * 1000)
          : null,
      })
      .where(eq(agencyInvoices.stripeInvoiceId, stripeInvoice.id));
  } else {
    // Create new invoice
    await db.insert(agencyInvoices).values({
      agencyId,
      orgId,
      stripeInvoiceId: stripeInvoice.id,
      amount: (stripeInvoice.amount_due / 100).toString(), // Convert from cents
      currency: stripeInvoice.currency.toUpperCase(),
      status: status || "draft",
      invoiceUrl: stripeInvoice.hosted_invoice_url || null,
      invoicePdfUrl: stripeInvoice.invoice_pdf || null,
      paidAt: stripeInvoice.paid_at
        ? new Date(stripeInvoice.paid_at * 1000)
        : null,
    });
  }
}
