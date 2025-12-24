import { NextResponse } from "next/server";
import { requireAgencyOwner } from "@/lib/auth/agency";
import {
  createConnectedAccount,
  createAccountLink,
  hasConnectedAccount,
  getStripeAccountStatus,
} from "@/lib/stripe/connect";

export async function POST() {
  try {
    const membership = await requireAgencyOwner();
    const agency = membership.agency;

    // Check if already has a connected account
    const hasAccount = await hasConnectedAccount(agency.id);

    if (hasAccount) {
      // Check if onboarding is complete
      const status = await getStripeAccountStatus(agency.id);

      if (status?.onboardingComplete) {
        return NextResponse.json(
          { error: "Stripe account already connected and active" },
          { status: 400 }
        );
      }

      // Create a new account link for incomplete onboarding
      const accountLink = await createAccountLink(
        status!.accountId,
        agency.slug
      );

      return NextResponse.json({ url: accountLink.url });
    }

    // Create new connected account
    const account = await createConnectedAccount(
      agency.id,
      agency.email,
      agency.name
    );

    // Create onboarding link
    const accountLink = await createAccountLink(account.id, agency.slug);

    return NextResponse.json({ url: accountLink.url });
  } catch (error) {
    console.error("Error initiating Stripe Connect onboarding:", error);
    return NextResponse.json(
      { error: "Failed to initiate Stripe Connect" },
      { status: 500 }
    );
  }
}
