import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe/client";
import { db } from "@/lib/db";
import { invoices, invoiceSettings } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const sessionId = searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json(
      { success: false, error: "Session ID required" },
      { status: 400 }
    );
  }

  try {
    // Retrieve the checkout session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // Get invoice details from metadata
    const invoiceId = session.metadata?.invoiceId;
    if (!invoiceId) {
      return NextResponse.json(
        { success: false, error: "Invalid payment session" },
        { status: 400 }
      );
    }

    // Get invoice and related data
    const [invoice] = await db
      .select({
        id: invoices.id,
        invoiceNumber: invoices.invoiceNumber,
        total: invoices.total,
        currency: invoices.currency,
        workspaceId: invoices.workspaceId,
      })
      .from(invoices)
      .where(eq(invoices.id, parseInt(invoiceId)))
      .limit(1);

    if (!invoice) {
      return NextResponse.json(
        { success: false, error: "Invoice not found" },
        { status: 404 }
      );
    }

    // Get company name from settings
    const [settings] = await db
      .select({ companyName: invoiceSettings.companyName })
      .from(invoiceSettings)
      .where(eq(invoiceSettings.workspaceId, invoice.workspaceId))
      .limit(1);

    // Format amount for display
    const amount = new Intl.NumberFormat("nl-NL", {
      style: "currency",
      currency: invoice.currency || "EUR",
    }).format(parseFloat(invoice.total || "0"));

    return NextResponse.json({
      success: true,
      invoiceNumber: invoice.invoiceNumber,
      amount,
      companyName: settings?.companyName || "",
      paymentStatus: session.payment_status,
    });
  } catch (error) {
    console.error("Error verifying payment:", error);
    return NextResponse.json(
      { success: false, error: "Failed to verify payment" },
      { status: 500 }
    );
  }
}
