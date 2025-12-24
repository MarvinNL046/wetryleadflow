import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe/client";
import { db } from "@/lib/db";
import { invoices, invoiceSettings } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const sessionId = searchParams.get("session_id");

  // Basic validation
  if (!sessionId) {
    return NextResponse.json(
      { success: false, error: "Session ID required" },
      { status: 400 }
    );
  }

  // Validate session ID format (Stripe session IDs start with cs_)
  if (!sessionId.startsWith("cs_")) {
    return NextResponse.json(
      { success: false, error: "Invalid session format" },
      { status: 400 }
    );
  }

  try {
    // Retrieve the checkout session from Stripe
    // Note: The session_id acts as a secure token - only someone who completed
    // the checkout flow would have access to this ID
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // Verify session is complete or processing (not expired/canceled)
    if (session.status === "expired") {
      return NextResponse.json(
        { success: false, error: "Payment session has expired" },
        { status: 410 }
      );
    }

    // Get invoice details from metadata
    const invoiceId = session.metadata?.invoiceId;
    if (!invoiceId) {
      return NextResponse.json(
        { success: false, error: "Invalid payment session" },
        { status: 400 }
      );
    }

    // Validate invoiceId is numeric
    const invoiceIdNum = parseInt(invoiceId);
    if (isNaN(invoiceIdNum)) {
      return NextResponse.json(
        { success: false, error: "Invalid invoice reference" },
        { status: 400 }
      );
    }

    // Get invoice - only return minimal necessary info
    const [invoice] = await db
      .select({
        id: invoices.id,
        invoiceNumber: invoices.invoiceNumber,
        total: invoices.total,
        currency: invoices.currency,
        workspaceId: invoices.workspaceId,
      })
      .from(invoices)
      .where(eq(invoices.id, invoiceIdNum))
      .limit(1);

    if (!invoice) {
      return NextResponse.json(
        { success: false, error: "Invoice not found" },
        { status: 404 }
      );
    }

    // Get company name from settings (minimal info for receipt)
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

    // Return only minimal info needed for confirmation page
    // Note: This is a public endpoint for customers who just paid
    // The Stripe session_id serves as the authorization token
    return NextResponse.json({
      success: true,
      invoiceNumber: invoice.invoiceNumber,
      amount,
      companyName: settings?.companyName || "",
      paymentStatus: session.payment_status,
    });
  } catch (error) {
    console.error("Error verifying payment:", error);
    // Don't expose internal error details
    return NextResponse.json(
      { success: false, error: "Failed to verify payment" },
      { status: 500 }
    );
  }
}
