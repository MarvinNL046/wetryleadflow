import { NextRequest, NextResponse } from "next/server";
import { getAuthContext } from "@/lib/auth/context";
import { getStripe } from "@/lib/stripe/client";
import { db } from "@/lib/db";
import { orgs } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

/**
 * POST /api/stripe/portal
 *
 * Create a Stripe Customer Portal session for subscription management.
 * Users can manage billing, update payment methods, view invoices, and cancel.
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
        { error: "Agency clients cannot access direct portal. Contact your agency for billing." },
        { status: 400 }
      );
    }

    // Check if customer exists
    if (!ctx.org.stripeCustomerId) {
      return NextResponse.json(
        { error: "No billing account found. Please subscribe to a plan first." },
        { status: 400 }
      );
    }

    const stripe = getStripe();

    // Build return URL
    const baseUrl = request.headers.get("origin") || process.env.NEXT_PUBLIC_APP_URL;
    const returnUrl = `${baseUrl}/crm/settings/billing`;

    // Create portal session
    const session = await stripe.billingPortal.sessions.create({
      customer: ctx.org.stripeCustomerId,
      return_url: returnUrl,
    });

    return NextResponse.json({
      url: session.url,
    });
  } catch (error) {
    console.error("[Stripe Portal] Error:", error);
    return NextResponse.json(
      { error: "Failed to create portal session" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/stripe/portal
 *
 * Get subscription status for the current org.
 */
export async function GET() {
  try {
    const ctx = await getAuthContext();
    if (!ctx) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // Get org with subscription info
    const [org] = await db
      .select({
        id: orgs.id,
        name: orgs.name,
        subscriptionTier: orgs.subscriptionTier,
        subscriptionStatus: orgs.subscriptionStatus,
        stripeCustomerId: orgs.stripeCustomerId,
        stripeSubscriptionId: orgs.stripeSubscriptionId,
        agencyId: orgs.agencyId,
      })
      .from(orgs)
      .where(eq(orgs.id, ctx.org.id))
      .limit(1);

    if (!org) {
      return NextResponse.json(
        { error: "Organization not found" },
        { status: 404 }
      );
    }

    // If via agency, return agency billing info
    if (org.agencyId) {
      return NextResponse.json({
        isAgencyClient: true,
        message: "Neem contact op met je agency voor billing vragen.",
      });
    }

    // Get subscription details from Stripe if active
    let subscriptionDetails = null;
    if (org.stripeSubscriptionId) {
      try {
        const stripe = getStripe();
        const subscription = await stripe.subscriptions.retrieve(org.stripeSubscriptionId);

        // Access properties safely with type assertion
        const subData = subscription as unknown as {
          status: string;
          current_period_end: number;
          cancel_at_period_end: boolean;
          items: { data: Array<{ price: { id: string; recurring?: { interval: string } } }> };
        };

        subscriptionDetails = {
          status: subData.status,
          currentPeriodEnd: new Date(subData.current_period_end * 1000).toISOString(),
          cancelAtPeriodEnd: subData.cancel_at_period_end,
          priceId: subData.items.data[0]?.price.id,
          interval: subData.items.data[0]?.price.recurring?.interval,
        };
      } catch (e) {
        console.error("Failed to fetch subscription from Stripe:", e);
      }
    }

    return NextResponse.json({
      isAgencyClient: false,
      tier: org.subscriptionTier,
      status: org.subscriptionStatus,
      hasStripeCustomer: !!org.stripeCustomerId,
      hasSubscription: !!org.stripeSubscriptionId,
      subscription: subscriptionDetails,
    });
  } catch (error) {
    console.error("[Stripe Portal] GET Error:", error);
    return NextResponse.json(
      { error: "Failed to get subscription info" },
      { status: 500 }
    );
  }
}
