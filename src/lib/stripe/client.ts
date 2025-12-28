import Stripe from "stripe";

// Create Stripe client lazily to support build-time compilation
// without requiring environment variables
let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error("STRIPE_SECRET_KEY is not set");
    }
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      typescript: true,
    });
  }
  return _stripe;
}

// Export for backward compatibility - use getStripe() for lazy initialization
export const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, { typescript: true })
  : (null as unknown as Stripe);

// LeadFlow Agency tier prices (configured in Stripe Dashboard)
export const AGENCY_TIERS = {
  starter: {
    name: "Starter",
    price: 97,
    currency: "EUR",
    maxOrgs: 3,
    saasEnabled: false,
    features: [
      "3 sub-accounts",
      "Basic whitelabel",
      "Email support",
    ],
    stripePriceId: process.env.STRIPE_PRICE_STARTER,
  },
  unlimited: {
    name: "Unlimited",
    price: 297,
    currency: "EUR",
    maxOrgs: -1, // Unlimited
    saasEnabled: false,
    features: [
      "Unlimited sub-accounts",
      "Full whitelabel",
      "Priority support",
      "Team management",
    ],
    stripePriceId: process.env.STRIPE_PRICE_UNLIMITED,
  },
  saas_pro: {
    name: "SaaS Pro",
    price: 497,
    currency: "EUR",
    maxOrgs: -1, // Unlimited
    saasEnabled: true,
    features: [
      "Everything in Unlimited",
      "Stripe Connect integration",
      "Custom pricing plans",
      "Client self-signup",
      "Automated billing",
      "Revenue dashboard",
    ],
    stripePriceId: process.env.STRIPE_PRICE_SAAS_PRO,
  },
} as const;

export type AgencyTier = keyof typeof AGENCY_TIERS;

// LeadFlow direct user tier prices (for ZZP/MKB users, not via agency)
export const USER_TIERS = {
  free: {
    name: "Free",
    price: 0,
    currency: "EUR",
    features: [
      "Tot 100 contacten",
      "1 pipeline",
      "Basis CRM functies",
      "Community support",
    ],
    stripePriceId: null,
  },
  pro: {
    name: "Pro",
    price: 29,
    currency: "EUR",
    features: [
      "Onbeperkt contacten",
      "Onbeperkt pipelines",
      "AI Insights",
      "Meta Lead Ads integratie",
      "Automatische follow-ups",
      "Email support",
    ],
    stripePriceIdMonthly: process.env.STRIPE_PRICE_USER_PRO_MONTHLY,
    stripePriceIdYearly: process.env.STRIPE_PRICE_USER_PRO_YEARLY,
  },
  enterprise: {
    name: "Enterprise",
    price: 99,
    currency: "EUR",
    features: [
      "Alles in Pro",
      "Geavanceerde analytics",
      "Custom integraties",
      "Dedicated support",
      "SLA garantie",
      "Multi-workspace",
    ],
    stripePriceIdMonthly: process.env.STRIPE_PRICE_USER_ENTERPRISE_MONTHLY,
    stripePriceIdYearly: process.env.STRIPE_PRICE_USER_ENTERPRISE_YEARLY,
  },
} as const;

export type UserTier = keyof typeof USER_TIERS;
