import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe/client";
import { db } from "@/lib/db";
import {
  webhookEvents,
  agencies,
  agencyStripeAccounts,
  clientSubscriptions,
  agencyInvoices,
  invoices,
} from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";

// Helper type for subscription data
type SubscriptionData = {
  id: string;
  status: string;
  current_period_start: number;
  current_period_end: number;
  cancel_at_period_end: boolean;
  items: { data: Array<{ price: { id: string; recurring?: { interval: string } } }> };
  metadata: Record<string, string>;
  customer: string;
};

// Helper type for invoice data
type InvoiceData = {
  id: string;
  subscription?: string | null;
  amount_paid?: number;
  currency: string;
  status_transitions?: { paid_at?: number | null };
  hosted_invoice_url?: string | null;
};

// Webhook secret for verifying events
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;
const connectWebhookSecret = process.env.STRIPE_CONNECT_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  const body = await request.text();
  const headersList = await headers();
  const signature = headersList.get("stripe-signature")!;

  let event: Stripe.Event;
  let isConnectEvent = false;

  // Try to verify with platform webhook secret first
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch {
    // Try connect webhook secret
    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        connectWebhookSecret
      );
      isConnectEvent = true;
    } catch (err) {
      console.error("Webhook signature verification failed:", err);
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 400 }
      );
    }
  }

  // Check for idempotency - skip if already processed
  const existingEvent = await db
    .select({ id: webhookEvents.id })
    .from(webhookEvents)
    .where(
      and(
        eq(webhookEvents.provider, "stripe"),
        eq(webhookEvents.externalEventId, event.id)
      )
    )
    .limit(1);

  if (existingEvent.length > 0) {
    return NextResponse.json({ received: true, duplicate: true });
  }

  // Log the event
  const [webhookRecord] = await db
    .insert(webhookEvents)
    .values({
      provider: "stripe",
      externalEventId: event.id,
      eventType: event.type,
      payload: event.data.object as unknown as Record<string, unknown>,
      status: "processing",
    })
    .returning();

  try {
    // Handle different event types
    if (isConnectEvent) {
      await handleConnectEvent(event);
    } else {
      await handlePlatformEvent(event);
    }

    // Mark as processed
    await db
      .update(webhookEvents)
      .set({
        status: "processed",
        processedAt: new Date(),
      })
      .where(eq(webhookEvents.id, webhookRecord.id));

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Error processing webhook:", error);

    // Mark as failed
    await db
      .update(webhookEvents)
      .set({
        status: "failed",
        errorMessage:
          error instanceof Error ? error.message : "Unknown error",
        attempts: webhookRecord.attempts + 1,
      })
      .where(eq(webhookEvents.id, webhookRecord.id));

    // Return 200 to acknowledge receipt (Stripe will retry if we return error)
    return NextResponse.json({ received: true, error: true });
  }
}

/**
 * Handle platform-level events (agency subscriptions to LeadFlow)
 */
async function handlePlatformEvent(event: Stripe.Event) {
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      // Handle invoice payments (not subscriptions)
      if (session.mode === "payment" && session.metadata?.type === "invoice_payment") {
        await handleInvoicePaymentComplete(session);
      }
      break;
    }

    case "customer.subscription.created":
    case "customer.subscription.updated": {
      const subscription = event.data.object as unknown as SubscriptionData;
      await handleAgencySubscriptionChange(subscription);
      break;
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object as unknown as SubscriptionData;
      await handleAgencySubscriptionCanceled(subscription);
      break;
    }

    case "account.updated": {
      const account = event.data.object as Stripe.Account;
      await handleConnectedAccountUpdate(account);
      break;
    }

    default:
      console.log(`Unhandled platform event: ${event.type}`);
  }
}

/**
 * Handle Connect events (client subscriptions via agency's Stripe)
 */
async function handleConnectEvent(event: Stripe.Event) {
  const connectedAccountId = event.account;

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      if (session.mode === "subscription" && session.subscription) {
        await handleClientCheckoutComplete(
          session,
          connectedAccountId!
        );
      }
      break;
    }

    case "customer.subscription.updated": {
      const subscription = event.data.object as unknown as SubscriptionData;
      await handleClientSubscriptionChange(
        subscription,
        connectedAccountId!
      );
      break;
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object as unknown as SubscriptionData;
      await handleClientSubscriptionCanceled(
        subscription,
        connectedAccountId!
      );
      break;
    }

    case "invoice.payment_succeeded": {
      const invoice = event.data.object as unknown as InvoiceData;
      await handleInvoicePaid(invoice, connectedAccountId!);
      break;
    }

    case "invoice.payment_failed": {
      const invoice = event.data.object as unknown as InvoiceData;
      await handleInvoiceFailed(invoice, connectedAccountId!);
      break;
    }

    default:
      console.log(`Unhandled connect event: ${event.type}`);
  }
}

// ============================================
// Platform Event Handlers (Agency → LeadFlow)
// ============================================

async function handleAgencySubscriptionChange(subscription: SubscriptionData) {
  // Find agency by Stripe customer ID (stored in metadata or separate lookup)
  // For now, we'll use the subscription metadata
  const agencyId = subscription.metadata?.agency_id;
  if (!agencyId) {
    console.error("No agency_id in subscription metadata");
    return;
  }

  // Determine tier from price
  const priceId = subscription.items.data[0]?.price.id;
  let tier: "starter" | "unlimited" | "saas_pro" = "starter";

  if (priceId === process.env.STRIPE_PRICE_SAAS_PRO) {
    tier = "saas_pro";
  } else if (priceId === process.env.STRIPE_PRICE_UNLIMITED) {
    tier = "unlimited";
  }

  // Update agency
  await db
    .update(agencies)
    .set({
      tier,
      stripeSubscriptionId: subscription.id,
      stripePriceId: priceId,
      saasMode: tier === "saas_pro" ? true : undefined,
      updatedAt: new Date(),
    })
    .where(eq(agencies.id, parseInt(agencyId)));
}

async function handleAgencySubscriptionCanceled(subscription: SubscriptionData) {
  const agencyId = subscription.metadata?.agency_id;
  if (!agencyId) return;

  // Downgrade to starter
  await db
    .update(agencies)
    .set({
      tier: "starter",
      stripeSubscriptionId: null,
      stripePriceId: null,
      saasMode: false,
      updatedAt: new Date(),
    })
    .where(eq(agencies.id, parseInt(agencyId)));
}

async function handleConnectedAccountUpdate(account: Stripe.Account) {
  const [existingAccount] = await db
    .select()
    .from(agencyStripeAccounts)
    .where(eq(agencyStripeAccounts.stripeAccountId, account.id))
    .limit(1);

  if (!existingAccount) return;

  await db
    .update(agencyStripeAccounts)
    .set({
      chargesEnabled: account.charges_enabled,
      payoutsEnabled: account.payouts_enabled,
      detailsSubmitted: account.details_submitted,
      onboardingComplete:
        account.charges_enabled &&
        account.payouts_enabled &&
        account.details_submitted,
      updatedAt: new Date(),
    })
    .where(eq(agencyStripeAccounts.stripeAccountId, account.id));
}

/**
 * Handle invoice payment completion via Stripe Checkout
 */
async function handleInvoicePaymentComplete(session: Stripe.Checkout.Session) {
  const invoiceId = session.metadata?.invoiceId;
  if (!invoiceId) {
    console.error("No invoiceId in checkout session metadata");
    return;
  }

  // Find the invoice
  const [invoice] = await db
    .select()
    .from(invoices)
    .where(eq(invoices.id, parseInt(invoiceId)))
    .limit(1);

  if (!invoice) {
    console.error(`Invoice not found: ${invoiceId}`);
    return;
  }

  // Calculate amount paid from session
  const amountPaid = (session.amount_total || 0) / 100;
  const previouslyPaid = parseFloat(invoice.amountPaid || "0");
  const totalPaid = previouslyPaid + amountPaid;
  const invoiceTotal = parseFloat(invoice.total || "0");
  const newAmountDue = Math.max(0, invoiceTotal - totalPaid);

  // Update invoice status to paid
  await db
    .update(invoices)
    .set({
      status: newAmountDue <= 0 ? "paid" : "sent",
      amountPaid: totalPaid.toFixed(2),
      amountDue: newAmountDue.toFixed(2),
      paidAt: new Date(),
      paymentMethod: "stripe",
      paymentReference: session.payment_intent as string || session.id,
      updatedAt: new Date(),
    })
    .where(eq(invoices.id, parseInt(invoiceId)));

  console.log(`Invoice ${invoice.invoiceNumber} marked as paid via Stripe`);
}

// ============================================
// Connect Event Handlers (Client → Agency)
// ============================================

async function handleClientCheckoutComplete(
  session: Stripe.Checkout.Session,
  connectedAccountId: string
) {
  const orgId = session.metadata?.org_id;
  const agencyId = session.metadata?.agency_id;
  const planId = session.metadata?.plan_id;

  if (!orgId || !agencyId || !planId) {
    console.error("Missing metadata in checkout session");
    return;
  }

  // Get subscription details from connected account
  const subscriptionResponse = await stripe.subscriptions.retrieve(
    session.subscription as string,
    { stripeAccount: connectedAccountId }
  );

  // Cast to our subscription data type
  const subscription = subscriptionResponse as unknown as SubscriptionData;

  // Create client subscription record
  await db
    .insert(clientSubscriptions)
    .values({
      orgId: parseInt(orgId),
      agencyId: parseInt(agencyId),
      planId: parseInt(planId),
      stripeSubscriptionId: subscription.id,
      stripeCustomerId: session.customer as string,
      status: subscription.status === "trialing" ? "trialing" : "active",
      billingInterval:
        subscription.items.data[0]?.price.recurring?.interval === "year"
          ? "yearly"
          : "monthly",
      currentPeriodStart: new Date(subscription.current_period_start * 1000),
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
    })
    .onConflictDoUpdate({
      target: clientSubscriptions.orgId,
      set: {
        stripeSubscriptionId: subscription.id,
        status: subscription.status === "trialing" ? "trialing" : "active",
        currentPeriodStart: new Date(subscription.current_period_start * 1000),
        currentPeriodEnd: new Date(subscription.current_period_end * 1000),
        updatedAt: new Date(),
      },
    });
}

async function handleClientSubscriptionChange(
  subscription: SubscriptionData,
  _connectedAccountId: string
) {
  const [existingSub] = await db
    .select()
    .from(clientSubscriptions)
    .where(eq(clientSubscriptions.stripeSubscriptionId, subscription.id))
    .limit(1);

  if (!existingSub) return;

  // Map Stripe status to our status
  let status: "trialing" | "active" | "past_due" | "canceled" = "active";
  if (subscription.status === "trialing") status = "trialing";
  else if (subscription.status === "past_due") status = "past_due";
  else if (
    subscription.status === "canceled" ||
    subscription.status === "unpaid"
  )
    status = "canceled";

  await db
    .update(clientSubscriptions)
    .set({
      status,
      currentPeriodStart: new Date(subscription.current_period_start * 1000),
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
      updatedAt: new Date(),
    })
    .where(eq(clientSubscriptions.stripeSubscriptionId, subscription.id));
}

async function handleClientSubscriptionCanceled(
  subscription: SubscriptionData,
  _connectedAccountId: string
) {
  await db
    .update(clientSubscriptions)
    .set({
      status: "canceled",
      updatedAt: new Date(),
    })
    .where(eq(clientSubscriptions.stripeSubscriptionId, subscription.id));
}

async function handleInvoicePaid(
  invoice: InvoiceData,
  _connectedAccountId: string
) {
  // Find the subscription
  if (!invoice.subscription) return;

  const [sub] = await db
    .select()
    .from(clientSubscriptions)
    .where(eq(clientSubscriptions.stripeSubscriptionId, invoice.subscription))
    .limit(1);

  if (!sub) return;

  // Log the invoice
  await db.insert(agencyInvoices).values({
    agencyId: sub.agencyId,
    orgId: sub.orgId,
    stripeInvoiceId: invoice.id,
    amount: ((invoice.amount_paid || 0) / 100).toString(),
    currency: invoice.currency.toUpperCase(),
    status: "paid",
    paidAt: invoice.status_transitions?.paid_at
      ? new Date(invoice.status_transitions.paid_at * 1000)
      : new Date(),
    invoiceUrl: invoice.hosted_invoice_url,
  });

  // Update subscription status to active if it was past_due
  if (sub.status === "past_due") {
    await db
      .update(clientSubscriptions)
      .set({
        status: "active",
        updatedAt: new Date(),
      })
      .where(eq(clientSubscriptions.id, sub.id));
  }
}

async function handleInvoiceFailed(
  invoice: InvoiceData,
  _connectedAccountId: string
) {
  if (!invoice.subscription) return;

  // Update subscription status to past_due
  await db
    .update(clientSubscriptions)
    .set({
      status: "past_due",
      updatedAt: new Date(),
    })
    .where(eq(clientSubscriptions.stripeSubscriptionId, invoice.subscription));
}
