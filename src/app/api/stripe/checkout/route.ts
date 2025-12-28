import { NextRequest, NextResponse } from "next/server";
import { getAuthContext } from "@/lib/auth/context";
import { getStripe, USER_TIERS } from "@/lib/stripe/client";
import { db } from "@/lib/db";
import { orgs } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

/**
 * POST /api/stripe/checkout
 *
 * Create a Stripe Checkout session for direct user subscriptions.
 * This is for users upgrading from free to pro/enterprise (not via agency).
 */
export async function POST(request: NextRequest) {
  try {
    const ctx = await getAuthContext();
    if (!ctx) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // Only for direct users (not agency clients)
    if (ctx.org.agencyId) {
      return NextResponse.json(
        { error: "Agency clients cannot use direct checkout. Contact your agency for billing." },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { tier, interval = "monthly" } = body as {
      tier: "pro" | "enterprise";
      interval?: "monthly" | "yearly";
    };

    // Validate tier
    if (!tier || !["pro", "enterprise"].includes(tier)) {
      return NextResponse.json(
        { error: "Invalid tier. Must be 'pro' or 'enterprise'" },
        { status: 400 }
      );
    }

    // Get price ID
    const tierConfig = USER_TIERS[tier];
    const priceId = interval === "yearly"
      ? tierConfig.stripePriceIdYearly
      : tierConfig.stripePriceIdMonthly;

    if (!priceId) {
      return NextResponse.json(
        { error: "Stripe price not configured for this tier" },
        { status: 500 }
      );
    }

    const stripe = getStripe();

    // Get or create Stripe customer
    let customerId = ctx.org.stripeCustomerId;

    if (!customerId) {
      // Create new customer
      const customer = await stripe.customers.create({
        email: ctx.user.email,
        name: ctx.org.name,
        metadata: {
          org_id: ctx.org.id.toString(),
          user_id: ctx.user.id.toString(),
        },
      });
      customerId = customer.id;

      // Save customer ID to org
      await db
        .update(orgs)
        .set({
          stripeCustomerId: customerId,
          updatedAt: new Date(),
        })
        .where(eq(orgs.id, ctx.org.id));
    }

    // Build URLs
    const baseUrl = request.headers.get("origin") || process.env.NEXT_PUBLIC_APP_URL;
    const successUrl = `${baseUrl}/crm/settings/billing?success=true&session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${baseUrl}/crm/settings/billing?canceled=true`;

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: "subscription",
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        org_id: ctx.org.id.toString(),
        user_id: ctx.user.id.toString(),
        tier,
        type: "direct_user_subscription",
      },
      subscription_data: {
        metadata: {
          org_id: ctx.org.id.toString(),
          user_id: ctx.user.id.toString(),
          tier,
        },
      },
      allow_promotion_codes: true,
      billing_address_collection: "required",
      tax_id_collection: {
        enabled: true,
      },
    });

    return NextResponse.json({
      url: session.url,
      sessionId: session.id,
    });
  } catch (error) {
    console.error("[Stripe Checkout] Error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
