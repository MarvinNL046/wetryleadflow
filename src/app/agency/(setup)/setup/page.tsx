"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@stackframe/stack";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createAgencyWithOnboarding, checkUserHasAgency, checkSlugAvailable } from "@/lib/actions/agency";
import { DEFAULT_AGENCY_LOGO } from "@/lib/constants";
import {
  Building2,
  Palette,
  Upload,
  ArrowRight,
  Check,
  X,
  Loader2,
  Rocket,
  Shield,
  Zap,
  Users,
  Globe,
  BarChart3,
  Sparkles,
} from "lucide-react";

const PRESET_COLORS = [
  "#8b5cf6", // Violet
  "#6366f1", // Indigo
  "#3b82f6", // Blue
  "#0ea5e9", // Sky
  "#14b8a6", // Teal
  "#22c55e", // Green
  "#eab308", // Yellow
  "#f97316", // Orange
  "#ef4444", // Red
  "#ec4899", // Pink
];

const BUILD_STEPS = [
  { icon: Shield, label: "Je werkruimte beveiligen...", duration: 1200 },
  { icon: Palette, label: "Branding toepassen...", duration: 1400 },
  { icon: Globe, label: "Subdomain instellen...", duration: 1200 },
  { icon: Users, label: "Rechten configureren...", duration: 1000 },
  { icon: BarChart3, label: "Analytics initialiseren...", duration: 900 },
  { icon: Zap, label: "Performance optimaliseren...", duration: 800 },
  { icon: Rocket, label: "Platform lanceren...", duration: 1500 },
];

export default function AgencySetupPage() {
  const user = useUser();
  const router = useRouter();
  const [step, setStep] = useState<"form" | "building" | "complete">("form");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [buildStep, setBuildStep] = useState(0);

  // Form state
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [email, setEmail] = useState("");
  const [appName, setAppName] = useState("");
  const [primaryColor, setPrimaryColor] = useState("#8b5cf6");
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  // Slug validation
  const [isCheckingSlug, setIsCheckingSlug] = useState(false);
  const [slugAvailable, setSlugAvailable] = useState<boolean | null>(null);

  // Check if user already has an agency, redirect if so
  useEffect(() => {
    async function checkExistingAgency() {
      if (user) {
        const { hasAgency } = await checkUserHasAgency();
        if (hasAgency) {
          window.location.href = "/agency";
        }
      }
    }
    checkExistingAgency();
  }, [user]);

  // Set default email from user
  useEffect(() => {
    if (user?.primaryEmail) {
      setEmail(user.primaryEmail);
    }
  }, [user]);

  // Auto-generate slug from name
  useEffect(() => {
    if (name && !slug) {
      const generatedSlug = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      setSlug(generatedSlug);
    }
  }, [name, slug]);

  // Check slug availability with debounce
  useEffect(() => {
    if (!slug || slug.length < 2) {
      setSlugAvailable(null);
      return;
    }

    const timer = setTimeout(async () => {
      setIsCheckingSlug(true);
      try {
        const available = await checkSlugAvailable(slug);
        setSlugAvailable(available);
      } catch {
        setSlugAvailable(null);
      } finally {
        setIsCheckingSlug(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [slug]);

  // Handle logo upload
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Run the building animation
  const runBuildAnimation = async () => {
    setStep("building");
    setBuildStep(0);

    for (let i = 0; i < BUILD_STEPS.length; i++) {
      setBuildStep(i);
      await new Promise((resolve) => setTimeout(resolve, BUILD_STEPS[i].duration));
    }

    setStep("complete");

    // Redirect after a brief moment
    setTimeout(() => {
      window.location.href = "/agency";
    }, 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const result = await createAgencyWithOnboarding({
        name,
        slug,
        email,
        appName: appName || name,
        primaryColor,
        logoUrl: logoPreview || undefined,
      });

      if (result.error) {
        setError(result.error);
        setIsSubmitting(false);
        return;
      }

      // Start the building animation
      await runBuildAnimation();
    } catch (err) {
      console.error("Error creating agency:", err);
      setError("Er is iets misgegaan. Probeer het opnieuw.");
      setIsSubmitting(false);
    }
  };

  const isFormValid =
    name.trim() &&
    slug.trim() &&
    email.trim() &&
    slugAvailable === true &&
    !isCheckingSlug;

  // Redirect if not logged in
  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-violet-950 via-zinc-900 to-purple-950">
        <div className="text-center">
          <Loader2 className="mx-auto mb-4 h-8 w-8 animate-spin text-violet-500" />
          <p className="text-zinc-400">Laden...</p>
        </div>
      </div>
    );
  }

  // Building animation screen
  if (step === "building" || step === "complete") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-violet-950 via-zinc-900 to-purple-950 p-4">
        <div className="w-full max-w-md text-center">
          {/* Animated logo */}
          <div className="relative mx-auto mb-8 h-24 w-24">
            <div className="absolute inset-0 animate-ping rounded-2xl bg-violet-500/20" />
            <div className="absolute inset-2 animate-pulse rounded-xl bg-violet-500/30" />
            <div className="relative flex h-full w-full items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-xl shadow-violet-500/30">
              {step === "complete" ? (
                <Check className="h-12 w-12 text-white animate-in zoom-in" />
              ) : (
                <Rocket className="h-12 w-12 text-white" />
              )}
            </div>
          </div>

          {/* Title */}
          <h1 className="mb-2 text-2xl font-bold text-white">
            {step === "complete" ? "Je platform is klaar!" : "We bouwen je platform..."}
          </h1>
          <p className="mb-8 text-zinc-400">
            {step === "complete"
              ? "Je wordt doorgestuurd naar je dashboard"
              : "Even geduld, dit duurt maar een paar seconden"}
          </p>

          {/* Build steps */}
          <div className="space-y-3 text-left">
            {BUILD_STEPS.map((s, index) => {
              const StepIcon = s.icon;
              const isActive = index === buildStep && step === "building";
              const isComplete = index < buildStep || step === "complete";

              return (
                <div
                  key={index}
                  className={`flex items-center gap-3 rounded-lg px-4 py-2 transition-all duration-300 ${
                    isActive
                      ? "bg-violet-500/20 text-white"
                      : isComplete
                        ? "text-green-400"
                        : "text-zinc-600"
                  }`}
                >
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full transition-all ${
                      isActive
                        ? "bg-violet-500 text-white"
                        : isComplete
                          ? "bg-green-500/20 text-green-400"
                          : "bg-zinc-800 text-zinc-600"
                    }`}
                  >
                    {isComplete ? (
                      <Check className="h-4 w-4" />
                    ) : isActive ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <StepIcon className="h-4 w-4" />
                    )}
                  </div>
                  <span className="text-sm">{s.label}</span>
                </div>
              );
            })}
          </div>

          {/* Progress bar */}
          <div className="mt-8 h-1 w-full overflow-hidden rounded-full bg-zinc-800">
            <div
              className="h-full bg-gradient-to-r from-violet-500 to-purple-500 transition-all duration-500"
              style={{
                width: step === "complete" ? "100%" : `${((buildStep + 1) / BUILD_STEPS.length) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  // Form screen
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-violet-50 via-white to-purple-50 p-4 dark:from-zinc-950 dark:via-zinc-900 dark:to-purple-950">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-xl shadow-violet-500/30">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
          <h1 className="mb-2 text-2xl font-bold">Welkom bij LeadFlow!</h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Stel je agency platform in. Dit duurt maar 1 minuut.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="rounded-2xl border border-zinc-200/50 bg-white/80 p-6 backdrop-blur-sm dark:border-zinc-800/50 dark:bg-zinc-900/80">
            {/* Agency Name */}
            <div className="mb-5">
              <Label htmlFor="name" className="mb-2 flex items-center gap-2">
                <Building2 className="h-4 w-4 text-violet-500" />
                Agency Naam *
              </Label>
              <Input
                id="name"
                placeholder="Marketing Bureau XYZ"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* URL Slug */}
            <div className="mb-5">
              <Label htmlFor="slug" className="mb-2">URL Slug *</Label>
              <div className="flex items-center gap-2">
                <span className="text-sm text-zinc-500">leadflow.com/</span>
                <div className="relative flex-1">
                  <Input
                    id="slug"
                    placeholder="marketing-xyz"
                    value={slug}
                    onChange={(e) =>
                      setSlug(
                        e.target.value
                          .toLowerCase()
                          .replace(/[^a-z0-9-]/g, "")
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
                <p className="mt-1 text-xs text-red-500">
                  Deze slug is al in gebruik
                </p>
              )}
            </div>

            {/* Email */}
            <div className="mb-5">
              <Label htmlFor="email">Contact Email *</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <hr className="my-6 border-zinc-200 dark:border-zinc-700" />

            {/* App Name (optional) */}
            <div className="mb-5">
              <Label htmlFor="appName" className="mb-2 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-violet-500" />
                Platform Naam (optioneel)
              </Label>
              <Input
                id="appName"
                placeholder={name || "MyCRM, LeadPro, etc."}
                value={appName}
                onChange={(e) => setAppName(e.target.value)}
              />
              <p className="mt-1 text-xs text-zinc-500">
                Dit zien je klanten als ze inloggen (standaard: agency naam)
              </p>
            </div>

            {/* Logo Upload */}
            <div className="mb-5">
              <Label className="mb-2 flex items-center gap-2">
                <Upload className="h-4 w-4 text-violet-500" />
                Logo (optioneel - standaard LeadFlow logo)
              </Label>
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-xl border-2 border-dashed border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 overflow-hidden">
                  <img
                    src={logoPreview || DEFAULT_AGENCY_LOGO}
                    alt="Logo preview"
                    className="h-12 w-12 rounded-lg object-contain"
                  />
                </div>
                <div className="flex-1">
                  <input
                    type="file"
                    id="logo"
                    accept="image/*"
                    onChange={handleLogoChange}
                    className="hidden"
                  />
                  <label htmlFor="logo">
                    <Button type="button" variant="outline" size="sm" asChild>
                      <span className="cursor-pointer">{logoPreview ? "Wijzigen" : "Upload eigen logo"}</span>
                    </Button>
                  </label>
                </div>
              </div>
            </div>

            {/* Primary Color */}
            <div>
              <Label className="mb-2 flex items-center gap-2">
                <Palette className="h-4 w-4 text-violet-500" />
                Primaire kleur
              </Label>
              <div className="flex flex-wrap gap-2">
                {PRESET_COLORS.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setPrimaryColor(color)}
                    className={`h-8 w-8 rounded-lg transition-all ${
                      primaryColor === color
                        ? "ring-2 ring-offset-2 ring-violet-500"
                        : "hover:scale-110"
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
                <input
                  type="color"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="h-8 w-8 cursor-pointer rounded-lg border-0"
                />
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="rounded-xl border border-zinc-200/50 bg-white/50 p-4 dark:border-zinc-800/50 dark:bg-zinc-900/50">
            <p className="mb-2 text-xs font-medium text-zinc-500">PREVIEW</p>
            <div className="flex items-center gap-3">
              <img
                src={logoPreview || DEFAULT_AGENCY_LOGO}
                alt="Preview"
                className="h-10 w-10 rounded-lg object-contain"
              />
              <span className="font-semibold" style={{ color: primaryColor }}>
                {appName || name || "Jouw Platform"}
              </span>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/30 dark:text-red-400">
              {error}
            </div>
          )}

          {/* Submit */}
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-violet-600 to-purple-600"
            disabled={!isFormValid || isSubmitting}
            size="lg"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Bezig...
              </>
            ) : (
              <>
                Platform Bouwen
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>

          <p className="text-center text-xs text-zinc-500">
            14 dagen gratis trial • Je kunt alles later nog aanpassen
          </p>
        </form>
      </div>
    </div>
  );
}
