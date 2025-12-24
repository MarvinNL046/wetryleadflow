"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Check,
  Circle,
  Palette,
  Users,
  CreditCard,
  Globe,
  Sparkles,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Rocket,
} from "lucide-react";

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: React.ElementType;
  completed: boolean;
  tier?: "all" | "unlimited" | "saas_pro";
  ctaText?: string;
}

interface OnboardingChecklistProps {
  agency: {
    name: string;
    slug: string;
    tier: string;
    logoUrl: string | null;
    primaryColor: string | null;
    appName: string | null;
    stripeCustomerId: string | null;
    saasMode: boolean;
  };
  hasClients: boolean;
  hasStripeConnect: boolean;
  hasPricingPlans: boolean;
  hasSaasSettings: boolean;
}

export function OnboardingChecklist({
  agency,
  hasClients,
  hasStripeConnect,
  hasPricingPlans,
  hasSaasSettings,
}: OnboardingChecklistProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  // Define onboarding steps based on tier
  const allSteps: OnboardingStep[] = [
    {
      id: "branding",
      title: "Stel je branding in",
      description: "Upload je logo en kies je kleuren",
      href: "/agency/branding",
      icon: Palette,
      completed: !!(agency.logoUrl || agency.primaryColor || agency.appName),
      tier: "all",
      ctaText: "Branding instellen",
    },
    {
      id: "first_client",
      title: "Voeg je eerste klant toe",
      description: "Maak een client organization aan",
      href: "/agency/clients",
      icon: Users,
      completed: hasClients,
      tier: "all",
      ctaText: "Klant toevoegen",
    },
    {
      id: "stripe_connect",
      title: "Koppel Stripe Connect",
      description: "Verbind je Stripe account om klanten te factureren",
      href: "/agency/billing/connect",
      icon: CreditCard,
      completed: hasStripeConnect,
      tier: "saas_pro",
      ctaText: "Stripe koppelen",
    },
    {
      id: "pricing_plans",
      title: "Maak pricing plans",
      description: "Definieer wat je klanten betalen",
      href: "/agency/saas/plans/new",
      icon: Sparkles,
      completed: hasPricingPlans,
      tier: "saas_pro",
      ctaText: "Plan maken",
    },
    {
      id: "saas_settings",
      title: "Activeer self-signup",
      description: "Laat klanten zelf aanmelden",
      href: "/agency/saas/settings",
      icon: Globe,
      completed: hasSaasSettings && agency.saasMode,
      tier: "saas_pro",
      ctaText: "Activeren",
    },
  ];

  // Filter steps based on tier
  const steps = allSteps.filter((step) => {
    if (step.tier === "all") return true;
    if (step.tier === "saas_pro" && agency.tier === "saas_pro") return true;
    if (step.tier === "unlimited" && (agency.tier === "unlimited" || agency.tier === "saas_pro")) return true;
    return false;
  });

  const completedSteps = steps.filter((s) => s.completed).length;
  const progressPercentage = Math.round((completedSteps / steps.length) * 100);
  const isComplete = completedSteps === steps.length;

  // Don't show if onboarding is complete
  if (isComplete) {
    return null;
  }

  // Find the next incomplete step
  const nextStep = steps.find((s) => !s.completed);

  return (
    <div className="mb-8 overflow-hidden rounded-xl border border-violet-200/50 bg-gradient-to-r from-violet-50 to-purple-50 dark:border-violet-800/50 dark:from-violet-950/30 dark:to-purple-950/30">
      {/* Header */}
      <div
        className="flex cursor-pointer items-center justify-between p-6"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100 dark:bg-violet-900/50">
            <Rocket className="h-6 w-6 text-violet-600 dark:text-violet-400" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Welkom bij LeadFlow!</h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Voltooi je setup om te starten
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-sm font-medium">
              {completedSteps} van {steps.length} stappen
            </div>
            <Progress value={progressPercentage} className="mt-1 h-2 w-32" />
          </div>
          {isExpanded ? (
            <ChevronUp className="h-5 w-5 text-zinc-400" />
          ) : (
            <ChevronDown className="h-5 w-5 text-zinc-400" />
          )}
        </div>
      </div>

      {/* Steps */}
      {isExpanded && (
        <div className="border-t border-violet-200/50 px-6 py-4 dark:border-violet-800/50">
          <div className="space-y-3">
            {steps.map((step, index) => {
              const isNext = step === nextStep;
              const StepIcon = step.icon;

              return (
                <div
                  key={step.id}
                  className={`flex items-center gap-4 rounded-lg p-3 transition-colors ${
                    step.completed
                      ? "bg-green-50/50 dark:bg-green-900/10"
                      : isNext
                        ? "bg-white dark:bg-zinc-800/50"
                        : "opacity-60"
                  }`}
                >
                  {/* Status icon */}
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                      step.completed
                        ? "bg-green-100 text-green-600 dark:bg-green-900/50"
                        : isNext
                          ? "bg-violet-100 text-violet-600 dark:bg-violet-900/50"
                          : "bg-zinc-100 text-zinc-400 dark:bg-zinc-800"
                    }`}
                  >
                    {step.completed ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <span className="text-sm font-medium">{index + 1}</span>
                    )}
                  </div>

                  {/* Step info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <StepIcon className="h-4 w-4 text-zinc-500" />
                      <span
                        className={`font-medium ${step.completed ? "text-green-700 dark:text-green-400" : ""}`}
                      >
                        {step.title}
                      </span>
                      {step.completed && (
                        <span className="rounded bg-green-100 px-1.5 py-0.5 text-xs text-green-700 dark:bg-green-900/50 dark:text-green-400">
                          Voltooid
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-zinc-500">{step.description}</p>
                  </div>

                  {/* Action button */}
                  {!step.completed && (
                    <Link href={step.href}>
                      <Button
                        size="sm"
                        variant={isNext ? "default" : "outline"}
                        className={isNext ? "bg-violet-600 hover:bg-violet-700" : ""}
                      >
                        {step.ctaText}
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    </Link>
                  )}
                  {step.completed && (
                    <Link href={step.href}>
                      <Button size="sm" variant="ghost">
                        Bekijken
                        <ExternalLink className="ml-1 h-3 w-3" />
                      </Button>
                    </Link>
                  )}
                </div>
              );
            })}
          </div>

          {/* Subdomain info */}
          <div className="mt-4 rounded-lg bg-white/50 p-4 dark:bg-zinc-800/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Jouw agency URL</p>
                <p className="text-xs text-zinc-500">
                  Klanten kunnen hier inloggen en aanmelden
                </p>
              </div>
              <div className="flex items-center gap-2">
                <code className="rounded bg-zinc-100 px-2 py-1 text-sm dark:bg-zinc-700">
                  {agency.slug}.wetryleadflow.com
                </code>
                <Link href={`https://${agency.slug}.wetryleadflow.com`} target="_blank">
                  <Button size="sm" variant="outline">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
