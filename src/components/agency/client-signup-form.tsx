"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  createClientOrganization,
  isOrgSlugAvailable,
} from "@/lib/actions/agency-saas";
import {
  Check,
  X,
  Loader2,
  Building2,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import type { AgencyPricingPlan, AgencySaasSettings } from "@/lib/db/schema";

interface ClientSignupFormProps {
  agency: {
    id: number;
    slug: string;
    name: string;
    appName: string | null;
    primaryColor: string | null;
  };
  settings: AgencySaasSettings | null;
  plans: AgencyPricingPlan[];
  selectedPlanId?: number;
}

export function ClientSignupForm({
  agency,
  settings,
  plans,
  selectedPlanId,
}: ClientSignupFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [companyName, setCompanyName] = useState("");
  const [slug, setSlug] = useState("");
  const [email, setEmail] = useState("");
  const [selectedPlan, setSelectedPlan] = useState<number>(
    selectedPlanId || plans.find((p) => p.isDefault)?.id || plans[0]?.id || 0
  );

  // Slug validation
  const [isCheckingSlug, setIsCheckingSlug] = useState(false);
  const [slugAvailable, setSlugAvailable] = useState<boolean | null>(null);

  // Auto-generate slug from company name
  useEffect(() => {
    if (companyName && !slug) {
      const generatedSlug = companyName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      setSlug(generatedSlug);
    }
  }, [companyName, slug]);

  // Check slug availability with debounce
  useEffect(() => {
    if (!slug || slug.length < 2) {
      setSlugAvailable(null);
      return;
    }

    const timer = setTimeout(async () => {
      setIsCheckingSlug(true);
      try {
        const available = await isOrgSlugAvailable(slug);
        setSlugAvailable(available);
      } catch {
        setSlugAvailable(null);
      } finally {
        setIsCheckingSlug(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [slug]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // User ID is now retrieved from auth internally
      const result = await createClientOrganization({
        agencyId: agency.id,
        companyName,
        slug,
        billingEmail: email,
        planId: selectedPlan,
      });

      if ("error" in result) {
        setError(result.error ?? "Unknown error");
        setIsLoading(false);
        return;
      }

      // Redirect to success page
      router.push(`/${agency.slug}/signup/success?org=${result.orgSlug}`);
    } catch (err) {
      console.error("Signup error:", err);
      setError("Something went wrong. Please try again.");
      setIsLoading(false);
    }
  }

  const isFormValid =
    companyName.trim() &&
    slug.trim() &&
    email.trim() &&
    slugAvailable === true &&
    !isCheckingSlug &&
    selectedPlan;

  const trialDays = settings?.trialDays || 14;

  return (
    <div className="space-y-8">
      {/* Plan Selection */}
      {plans.length > 1 && (
        <Card className="border-zinc-200/50 bg-white/80 backdrop-blur-sm dark:border-zinc-800/50 dark:bg-zinc-900/80">
          <CardHeader>
            <CardTitle>Choose Your Plan</CardTitle>
            <CardDescription>
              Start with a {trialDays}-day free trial. No credit card required.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={selectedPlan.toString()}
              onValueChange={(value: string) => setSelectedPlan(parseInt(value))}
              className="grid gap-4 md:grid-cols-2"
            >
              {plans.map((plan) => (
                <div key={plan.id} className="relative">
                  <RadioGroupItem
                    value={plan.id.toString()}
                    id={`plan-${plan.id}`}
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor={`plan-${plan.id}`}
                    className="flex cursor-pointer flex-col rounded-xl border-2 border-zinc-200 bg-white p-4 transition-all peer-checked:border-violet-500 peer-checked:bg-violet-50/50 dark:border-zinc-700 dark:bg-zinc-800 dark:peer-checked:border-violet-500 dark:peer-checked:bg-violet-900/20"
                  >
                    {plan.isDefault && (
                      <span className="absolute -top-2 right-4 rounded-full bg-gradient-to-r from-violet-600 to-blue-600 px-2 py-0.5 text-xs font-semibold text-white">
                        Popular
                      </span>
                    )}
                    <span className="text-lg font-semibold">{plan.name}</span>
                    <div className="mt-2">
                      <span className="text-2xl font-bold">
                        €{plan.priceMonthly}
                      </span>
                      <span className="text-zinc-500">/month</span>
                    </div>
                    {plan.description && (
                      <p className="mt-2 text-sm text-zinc-500">
                        {plan.description}
                      </p>
                    )}
                    {plan.features && (plan.features as string[]).length > 0 && (
                      <ul className="mt-3 space-y-1">
                        {(plan.features as string[]).slice(0, 4).map((feature, i) => (
                          <li
                            key={i}
                            className="flex items-center text-sm text-zinc-600 dark:text-zinc-400"
                          >
                            <Check className="mr-2 h-4 w-4 text-green-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    )}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>
      )}

      {/* Signup Form */}
      <Card className="border-zinc-200/50 bg-white/80 backdrop-blur-sm dark:border-zinc-800/50 dark:bg-zinc-900/80">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-violet-600 to-blue-600">
              <Building2 className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle>Create Your Account</CardTitle>
              <CardDescription>
                Get started with {agency.appName || agency.name}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                placeholder="Acme Inc."
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">URL Slug</Label>
              <div className="flex items-center gap-2">
                <span className="text-sm text-zinc-500">
                  {agency.appName?.toLowerCase() || agency.slug}.app/
                </span>
                <div className="relative flex-1">
                  <Input
                    id="slug"
                    placeholder="acme-inc"
                    value={slug}
                    onChange={(e) =>
                      setSlug(
                        e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "")
                      )
                    }
                    className={
                      slugAvailable === true
                        ? "border-green-500 pr-8"
                        : slugAvailable === false
                          ? "border-red-500 pr-8"
                          : ""
                    }
                    required
                  />
                  {slug.length >= 2 && (
                    <div className="absolute right-2 top-1/2 -translate-y-1/2">
                      {isCheckingSlug ? (
                        <Loader2 className="h-4 w-4 animate-spin text-zinc-400" />
                      ) : slugAvailable === true ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : slugAvailable === false ? (
                        <X className="h-4 w-4 text-red-500" />
                      ) : null}
                    </div>
                  )}
                </div>
              </div>
              {slugAvailable === false && (
                <p className="text-xs text-red-500">
                  This URL is already taken
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <p className="text-xs text-zinc-500">
                We&apos;ll send your login details here
              </p>
            </div>

            {error && (
              <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/30 dark:text-red-400">
                {error}
              </div>
            )}

            <div className="rounded-lg bg-violet-50 p-4 dark:bg-violet-900/20">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                <span className="font-medium text-violet-900 dark:text-violet-100">
                  {trialDays}-Day Free Trial
                </span>
              </div>
              <p className="mt-1 text-sm text-violet-700 dark:text-violet-300">
                No credit card required. Start using all features right away.
              </p>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-violet-600 to-blue-600"
              disabled={!isFormValid || isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Account...
                </>
              ) : (
                <>
                  Start Free Trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
