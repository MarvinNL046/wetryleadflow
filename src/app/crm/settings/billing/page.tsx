"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Check,
  CreditCard,
  Zap,
  Crown,
  Sparkles,
  ExternalLink,
  Loader2,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

// Pricing tiers
const TIERS = {
  free: {
    name: "Free",
    price: 0,
    description: "Voor kleine teams die net beginnen",
    features: [
      "Tot 100 contacten",
      "1 pipeline",
      "Basis CRM functies",
      "Community support",
    ],
    icon: Zap,
    color: "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400",
  },
  pro: {
    name: "Pro",
    price: 29,
    description: "Voor groeiende bedrijven",
    features: [
      "Onbeperkt contacten",
      "Onbeperkt pipelines",
      "AI Insights",
      "Meta Lead Ads integratie",
      "Automatische follow-ups",
      "Email support",
    ],
    icon: Crown,
    color: "bg-violet-100 text-violet-600 dark:bg-violet-900 dark:text-violet-400",
    popular: true,
  },
  enterprise: {
    name: "Enterprise",
    price: 99,
    description: "Voor grote organisaties",
    features: [
      "Alles in Pro",
      "Geavanceerde analytics",
      "Custom integraties",
      "Dedicated support",
      "SLA garantie",
      "Multi-workspace",
    ],
    icon: Sparkles,
    color: "bg-amber-100 text-amber-600 dark:bg-amber-900 dark:text-amber-400",
  },
};

type Tier = keyof typeof TIERS;

interface SubscriptionInfo {
  isAgencyClient: boolean;
  tier?: Tier;
  status?: string;
  hasStripeCustomer?: boolean;
  hasSubscription?: boolean;
  subscription?: {
    status: string;
    currentPeriodEnd: string;
    cancelAtPeriodEnd: boolean;
    interval: string;
  };
  message?: string;
}

export default function BillingPage() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState<Tier | null>(null);
  const [portalLoading, setPortalLoading] = useState(false);
  const [info, setInfo] = useState<SubscriptionInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [billingInterval, setBillingInterval] = useState<"monthly" | "yearly">("monthly");

  const success = searchParams.get("success") === "true";
  const canceled = searchParams.get("canceled") === "true";

  useEffect(() => {
    fetchSubscriptionInfo();
  }, []);

  async function fetchSubscriptionInfo() {
    try {
      const res = await fetch("/api/stripe/portal");
      if (!res.ok) throw new Error("Failed to fetch subscription info");
      const data = await res.json();
      setInfo(data);
    } catch (e) {
      setError("Kon abonnement informatie niet laden");
    } finally {
      setLoading(false);
    }
  }

  async function handleUpgrade(tier: Tier) {
    if (tier === "free") return;

    setCheckoutLoading(tier);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tier, interval: billingInterval }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Checkout failed");
      }

      const { url } = await res.json();
      window.location.href = url;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Er ging iets mis");
      setCheckoutLoading(null);
    }
  }

  async function handleManageBilling() {
    setPortalLoading(true);
    try {
      const res = await fetch("/api/stripe/portal", {
        method: "POST",
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Portal failed");
      }

      const { url } = await res.json();
      window.location.href = url;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Er ging iets mis");
      setPortalLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-violet-500" />
      </div>
    );
  }

  // Agency client view
  if (info?.isAgencyClient) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
        <div className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
          <div className="mx-auto max-w-4xl px-8 py-6">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" asChild className="rounded-lg">
                <Link href="/crm/settings">
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </Button>
              <div>
                <h1 className="text-2xl font-bold">Abonnement</h1>
                <p className="mt-1 text-zinc-500">Beheer via je agency</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-4xl p-8">
          <div className="rounded-lg border border-zinc-200 bg-white p-8 text-center dark:border-zinc-800 dark:bg-zinc-900">
            <CreditCard className="mx-auto h-12 w-12 text-zinc-400" />
            <h2 className="mt-4 text-xl font-semibold">Agency Billing</h2>
            <p className="mt-2 text-zinc-500">{info.message}</p>
          </div>
        </div>
      </div>
    );
  }

  const currentTier = info?.tier || "free";

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Header */}
      <div className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto max-w-5xl px-8 py-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild className="rounded-lg">
              <Link href="/crm/settings">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Abonnement & Billing</h1>
              <p className="mt-1 text-zinc-500">
                Beheer je abonnement en betalingen
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl p-8">
        {/* Success/Cancel Messages */}
        {success && (
          <div className="mb-6 flex items-center gap-3 rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-900 dark:bg-green-950/50">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <div>
              <p className="font-medium text-green-800 dark:text-green-200">
                Betaling geslaagd!
              </p>
              <p className="text-sm text-green-700 dark:text-green-300">
                Je abonnement is nu actief. Geniet van alle features!
              </p>
            </div>
          </div>
        )}

        {canceled && (
          <div className="mb-6 flex items-center gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-900 dark:bg-amber-950/50">
            <AlertCircle className="h-5 w-5 text-amber-600" />
            <p className="text-amber-800 dark:text-amber-200">
              Checkout geannuleerd. Je kunt altijd later upgraden.
            </p>
          </div>
        )}

        {error && (
          <div className="mb-6 flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950/50">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <p className="text-red-800 dark:text-red-200">{error}</p>
          </div>
        )}

        {/* Current Plan Status */}
        {info?.hasSubscription && info?.subscription && (
          <div className="mb-8 rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-lg font-semibold">Huidig Abonnement</h2>
                  <Badge
                    variant={
                      info.subscription.status === "active"
                        ? "default"
                        : info.subscription.status === "trialing"
                        ? "secondary"
                        : "destructive"
                    }
                  >
                    {info.subscription.status === "active"
                      ? "Actief"
                      : info.subscription.status === "trialing"
                      ? "Proefperiode"
                      : info.subscription.status}
                  </Badge>
                </div>
                <p className="mt-1 text-zinc-500">
                  {TIERS[currentTier]?.name} -{" "}
                  {info.subscription.interval === "year" ? "Jaarlijks" : "Maandelijks"}
                </p>
                {info.subscription.cancelAtPeriodEnd && (
                  <p className="mt-2 text-sm text-amber-600">
                    ⚠️ Wordt geannuleerd op{" "}
                    {new Date(info.subscription.currentPeriodEnd).toLocaleDateString("nl-NL")}
                  </p>
                )}
              </div>
              <Button
                variant="outline"
                onClick={handleManageBilling}
                disabled={portalLoading}
              >
                {portalLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <ExternalLink className="mr-2 h-4 w-4" />
                )}
                Beheer Abonnement
              </Button>
            </div>
          </div>
        )}

        {/* Billing Interval Toggle */}
        <div className="mb-8 flex justify-center">
          <div className="inline-flex rounded-lg border border-zinc-200 bg-white p-1 dark:border-zinc-800 dark:bg-zinc-900">
            <button
              onClick={() => setBillingInterval("monthly")}
              className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                billingInterval === "monthly"
                  ? "bg-violet-100 text-violet-700 dark:bg-violet-900 dark:text-violet-300"
                  : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
              }`}
            >
              Maandelijks
            </button>
            <button
              onClick={() => setBillingInterval("yearly")}
              className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                billingInterval === "yearly"
                  ? "bg-violet-100 text-violet-700 dark:bg-violet-900 dark:text-violet-300"
                  : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
              }`}
            >
              Jaarlijks
              <span className="ml-1.5 rounded bg-green-100 px-1.5 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900 dark:text-green-300">
                -20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {(Object.entries(TIERS) as [Tier, (typeof TIERS)[Tier]][]).map(
            ([tierId, tier]) => {
              const Icon = tier.icon;
              const isCurrentTier = currentTier === tierId;
              const isDowngrade =
                (currentTier === "enterprise" && tierId !== "enterprise") ||
                (currentTier === "pro" && tierId === "free");
              const price =
                billingInterval === "yearly"
                  ? Math.round(tier.price * 12 * 0.8)
                  : tier.price;

              return (
                <div
                  key={tierId}
                  className={`relative rounded-xl border bg-white p-6 dark:bg-zinc-900 ${
                    "popular" in tier && tier.popular
                      ? "border-violet-500 shadow-lg shadow-violet-500/10"
                      : "border-zinc-200 dark:border-zinc-800"
                  }`}
                >
                  {"popular" in tier && tier.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="bg-violet-500 text-white">
                        Meest Populair
                      </Badge>
                    </div>
                  )}

                  <div className="mb-4 flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-lg ${tier.color}`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{tier.name}</h3>
                      {isCurrentTier && (
                        <Badge variant="outline" className="text-xs">
                          Huidig
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="mb-4">
                    <span className="text-3xl font-bold">€{price}</span>
                    <span className="text-zinc-500">
                      /{billingInterval === "yearly" ? "jaar" : "maand"}
                    </span>
                  </div>

                  <p className="mb-6 text-sm text-zinc-500">{tier.description}</p>

                  <ul className="mb-6 space-y-3">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm">
                        <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {tierId === "free" ? (
                    <Button variant="outline" className="w-full" disabled>
                      Gratis Plan
                    </Button>
                  ) : isCurrentTier ? (
                    <Button variant="outline" className="w-full" disabled>
                      Huidig Plan
                    </Button>
                  ) : isDowngrade ? (
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={handleManageBilling}
                      disabled={portalLoading || !info?.hasSubscription}
                    >
                      Downgrade
                    </Button>
                  ) : (
                    <Button
                      className={`w-full ${
                        "popular" in tier && tier.popular
                          ? "bg-violet-600 hover:bg-violet-700"
                          : ""
                      }`}
                      onClick={() => handleUpgrade(tierId)}
                      disabled={checkoutLoading !== null}
                    >
                      {checkoutLoading === tierId ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : null}
                      Upgrade naar {tier.name}
                    </Button>
                  )}
                </div>
              );
            }
          )}
        </div>

        {/* FAQ Section */}
        <div className="mt-12 rounded-lg border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="mb-6 text-xl font-semibold">Veelgestelde Vragen</h2>

          <div className="space-y-6">
            <div>
              <h3 className="font-medium">Kan ik mijn abonnement op elk moment annuleren?</h3>
              <p className="mt-1 text-sm text-zinc-500">
                Ja, je kunt je abonnement op elk moment annuleren. Je behoudt toegang tot je
                huidige plan tot het einde van de factureringsperiode.
              </p>
            </div>

            <div>
              <h3 className="font-medium">Wat gebeurt er met mijn data als ik downgrade?</h3>
              <p className="mt-1 text-sm text-zinc-500">
                Je data blijft behouden. Als je de limieten van het lagere plan overschrijdt,
                kun je bestaande data bekijken maar geen nieuwe toevoegen.
              </p>
            </div>

            <div>
              <h3 className="font-medium">Hoe werkt de jaarlijkse korting?</h3>
              <p className="mt-1 text-sm text-zinc-500">
                Bij jaarlijkse betaling krijg je 20% korting. Je betaalt vooruit voor 12
                maanden en bespaart 2+ maanden aan kosten.
              </p>
            </div>

            <div>
              <h3 className="font-medium">Welke betaalmethoden accepteren jullie?</h3>
              <p className="mt-1 text-sm text-zinc-500">
                We accepteren alle gangbare creditcards (Visa, Mastercard, American Express),
                iDEAL, en SEPA bankoverschrijvingen via Stripe.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
