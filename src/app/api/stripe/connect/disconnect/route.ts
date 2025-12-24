import { NextResponse } from "next/server";
import { requireAgencyOwner } from "@/lib/auth/agency";
import { disconnectStripeAccount } from "@/lib/stripe/connect";

export async function POST() {
  try {
    const membership = await requireAgencyOwner();
    const agency = membership.agency;

    const result = await disconnectStripeAccount(agency.id);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error disconnecting Stripe account:", error);
    return NextResponse.json(
      { error: "Failed to disconnect Stripe account" },
      { status: 500 }
    );
  }
}
