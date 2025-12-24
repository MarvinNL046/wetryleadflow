import { requireAgencyOwner } from "@/lib/auth/agency";
import { getStripeConnectStatus } from "@/lib/actions/stripe-connect";
import Link from "next/link";
import {
  CreditCard,
  Check,
  Zap,
  Building2,
  Crown,
  ArrowUpRight,
  Sparkles,
  Link as LinkIcon,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AGENCY_TIERS } from "@/lib/stripe/client";

export default async function AgencyBillingPage() {
  const { agency } = await requireAgencyOwner();
  const connectStatus = agency.tier === "saas_pro" ? await getStripeConnectStatus() : null;

  const currentTier = agency.tier || "starter";
  const tierData = AGENCY_TIERS[currentTier];

  // Convert tiers to plan array for display
  const plans = [
    {
      id: "starter" as const,
      name: AGENCY_TIERS.starter.name,
      price: `€${AGENCY_TIERS.starter.price}`,
      period: "/month",
      description: "Perfect for small agencies",
      features: AGENCY_TIERS.starter.features,
      maxOrgs: AGENCY_TIERS.starter.maxOrgs,
      saasEnabled: AGENCY_TIERS.starter.saasEnabled,
      popular: false,
    },
    {
      id: "unlimited" as const,
      name: AGENCY_TIERS.unlimited.name,
      price: `€${AGENCY_TIERS.unlimited.price}`,
      period: "/month",
      description: "For growing agencies",
      features: AGENCY_TIERS.unlimited.features,
      maxOrgs: AGENCY_TIERS.unlimited.maxOrgs,
      saasEnabled: AGENCY_TIERS.unlimited.saasEnabled,
      popular: true,
    },
    {
      id: "saas_pro" as const,
      name: AGENCY_TIERS.saas_pro.name,
      price: `€${AGENCY_TIERS.saas_pro.price}`,
      period: "/month",
      description: "Full SaaS platform",
      features: AGENCY_TIERS.saas_pro.features,
      maxOrgs: AGENCY_TIERS.saas_pro.maxOrgs,
      saasEnabled: AGENCY_TIERS.saas_pro.saasEnabled,
      popular: false,
    },
  ];

  const currentPlan = plans.find((p) => p.id === currentTier) || plans[0];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Billing & Subscription</h1>
        <p className="text-zinc-500">Manage your agency subscription</p>
      </div>

      {/* Current Plan */}
      <Card className="mb-8 border-violet-200/50 bg-gradient-to-r from-violet-50 to-purple-50 dark:border-violet-800/50 dark:from-violet-950/30 dark:to-purple-950/30">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Crown className="h-5 w-5 text-amber-500" />
                Current Plan
              </CardTitle>
              <CardDescription>Your active subscription details</CardDescription>
            </div>
            <Badge
              className={
                agency.subscriptionStatus === "active"
                  ? "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400"
                  : agency.subscriptionStatus === "trialing"
                    ? "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400"
                    : "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-400"
              }
            >
              {agency.subscriptionStatus === "trialing"
                ? "Trial"
                : agency.subscriptionStatus === "active"
                  ? "Active"
                  : agency.subscriptionStatus}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-3xl font-bold">{currentPlan.name}</p>
              <p className="text-zinc-500">
                {currentPlan.maxOrgs === -1
                  ? "Unlimited client organizations"
                  : `Up to ${currentPlan.maxOrgs} client organizations`}
              </p>
              {currentPlan.saasEnabled && (
                <div className="mt-2 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-violet-500" />
                  <span className="text-sm font-medium text-violet-600 dark:text-violet-400">
                    SaaS Mode Enabled
                  </span>
                </div>
              )}
            </div>
            {agency.subscriptionStatus === "trialing" && (
              <div className="text-right">
                <p className="text-sm text-blue-600 dark:text-blue-400">
                  Trial ends in 14 days
                </p>
                <Button className="mt-2 bg-gradient-to-r from-violet-600 to-purple-600">
                  <Zap className="mr-2 h-4 w-4" />
                  Upgrade Now
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* SaaS Pro: Stripe Connect Quick Link */}
      {agency.tier === "saas_pro" && (
        <Card className="mb-8 border-blue-200/50 bg-blue-50/50 dark:border-blue-800/50 dark:bg-blue-900/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LinkIcon className="h-5 w-5 text-blue-500" />
              Stripe Connect
            </CardTitle>
            <CardDescription>
              Connect your Stripe account to bill your clients
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                {connectStatus?.connected ? (
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-100 text-green-700">
                      Connected
                    </Badge>
                    {agency.saasMode ? (
                      <span className="text-sm text-green-600">
                        SaaS Mode active
                      </span>
                    ) : (
                      <span className="text-sm text-amber-600">
                        Enable SaaS Mode to start billing
                      </span>
                    )}
                  </div>
                ) : (
                  <span className="text-sm text-zinc-500">
                    Connect your Stripe account to start billing clients
                  </span>
                )}
              </div>
              <Link href="/agency/billing/connect">
                <Button variant="outline">
                  {connectStatus?.connected ? "Manage" : "Connect"}
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Plans */}
      <h2 className="mb-4 text-lg font-semibold">Available Plans</h2>
      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={`relative border-zinc-200/50 bg-white/50 transition-all hover:shadow-lg dark:border-zinc-800/50 dark:bg-zinc-900/50 ${
              plan.popular
                ? "ring-2 ring-violet-500 ring-offset-2 dark:ring-offset-zinc-950"
                : ""
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge className="bg-gradient-to-r from-violet-600 to-purple-600 text-white">
                  Most Popular
                </Badge>
              </div>
            )}
            {plan.saasEnabled && (
              <div className="absolute right-4 top-4">
                <Badge
                  variant="outline"
                  className="border-violet-300 text-violet-600"
                >
                  <Sparkles className="mr-1 h-3 w-3" />
                  SaaS
                </Badge>
              </div>
            )}
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-violet-500" />
                {plan.name}
              </CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-zinc-500">{plan.period}</span>
              </div>
              <ul className="mb-6 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                className={`w-full ${
                  plan.popular
                    ? "bg-gradient-to-r from-violet-600 to-purple-600"
                    : ""
                }`}
                variant={plan.popular ? "default" : "outline"}
                disabled={currentTier === plan.id}
              >
                {currentTier === plan.id ? (
                  "Current Plan"
                ) : (
                  <>
                    {plans.findIndex((p) => p.id === plan.id) >
                    plans.findIndex((p) => p.id === currentTier)
                      ? "Upgrade"
                      : "Downgrade"}
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Payment Method */}
      <Card className="mt-8 border-zinc-200/50 bg-white/50 dark:border-zinc-800/50 dark:bg-zinc-900/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-violet-500" />
            Payment Method
          </CardTitle>
          <CardDescription>Manage your payment details</CardDescription>
        </CardHeader>
        <CardContent>
          {agency.stripeCustomerId ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-16 items-center justify-center rounded bg-zinc-100 dark:bg-zinc-800">
                  <CreditCard className="h-5 w-5 text-zinc-500" />
                </div>
                <div>
                  <p className="font-medium">•••• •••• •••• 4242</p>
                  <p className="text-sm text-zinc-500">Expires 12/25</p>
                </div>
              </div>
              <Button variant="outline">Update</Button>
            </div>
          ) : (
            <div className="py-8 text-center">
              <CreditCard className="mx-auto mb-4 h-12 w-12 text-zinc-300 dark:text-zinc-700" />
              <p className="mb-4 text-zinc-500">No payment method on file</p>
              <Button className="bg-gradient-to-r from-violet-600 to-purple-600">
                Add Payment Method
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
