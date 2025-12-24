import "server-only";
import { getStripe } from "./client";

interface CreateInvoicePaymentLinkParams {
  invoiceId: number;
  invoiceNumber: string;
  workspaceId: number;
  amount: number; // Amount in cents
  currency: string;
  customerEmail: string;
  customerName: string;
  companyName: string;
  title?: string;
}

interface PaymentLinkResult {
  sessionId: string;
  url: string;
}

/**
 * Create a Stripe Checkout Session for invoice payment
 *
 * Uses Checkout Sessions instead of Payment Links because:
 * - Each invoice needs a unique payment session
 * - We can track payment status via webhooks
 * - We can pre-fill customer information
 */
export async function createInvoicePaymentLink({
  invoiceId,
  invoiceNumber,
  workspaceId,
  amount,
  currency,
  customerEmail,
  customerName,
  companyName,
  title,
}: CreateInvoicePaymentLinkParams): Promise<PaymentLinkResult> {
  const stripe = getStripe();
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  // Create Checkout Session
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card", "ideal", "bancontact"], // Popular NL/BE methods
    customer_email: customerEmail,
    line_items: [
      {
        price_data: {
          currency: currency.toLowerCase(),
          product_data: {
            name: `Factuur ${invoiceNumber}`,
            description: title || `Betaling aan ${companyName}`,
          },
          unit_amount: amount, // Already in cents
        },
        quantity: 1,
      },
    ],
    metadata: {
      type: "invoice_payment",
      invoiceId: invoiceId.toString(),
      workspaceId: workspaceId.toString(),
      invoiceNumber,
      customerName,
    },
    success_url: `${baseUrl}/pay/success?session_id={CHECKOUT_SESSION_ID}&invoice=${invoiceId}`,
    cancel_url: `${baseUrl}/pay/cancelled?invoice=${invoiceId}`,
    // Set expiration to 24 hours (default is 24h, max is 24h for payments)
    expires_at: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
  });

  if (!session.url) {
    throw new Error("Failed to create checkout session URL");
  }

  return {
    sessionId: session.id,
    url: session.url,
  };
}

/**
 * Retrieve a Checkout Session by ID
 */
export async function getCheckoutSession(sessionId: string) {
  const stripe = getStripe();
  return stripe.checkout.sessions.retrieve(sessionId);
}

/**
 * Check if a payment session is completed
 */
export async function isPaymentComplete(sessionId: string): Promise<boolean> {
  const session = await getCheckoutSession(sessionId);
  return session.payment_status === "paid";
}
