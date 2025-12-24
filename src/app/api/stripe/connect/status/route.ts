import { NextResponse } from "next/server";
import { requireAgencyMember } from "@/lib/auth/agency";
import {
  getStripeAccountStatus,
  createDashboardLink,
} from "@/lib/stripe/connect";

export async function GET() {
  try {
    const membership = await requireAgencyMember();
    const agency = membership.agency;

    const status = await getStripeAccountStatus(agency.id);

    if (!status) {
      return NextResponse.json({ connected: false });
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

    return NextResponse.json({
      connected: true,
      ...status,
      dashboardUrl,
    });
  } catch (error) {
    console.error("Error getting Stripe Connect status:", error);
    return NextResponse.json(
      { error: "Failed to get Stripe Connect status" },
      { status: 500 }
    );
  }
}
