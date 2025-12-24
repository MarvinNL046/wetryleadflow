"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { completeOnboarding, skipOnboarding } from "@/lib/actions/agency-onboarding";
import {
  Palette,
  Upload,
  ArrowRight,
  Building2,
  Sparkles,
  Check,
  Loader2,
  Rocket,
  Shield,
  Zap,
  Users,
  Globe,
  BarChart3,
} from "lucide-react";

const INDUSTRIES = [
  { value: "marketing", label: "Marketing & Advertising" },
  { value: "realestate", label: "Real Estate" },
  { value: "finance", label: "Finance & Insurance" },
  { value: "ecommerce", label: "E-commerce" },
  { value: "saas", label: "SaaS & Tech" },
  { value: "consulting", label: "Consulting" },
  { value: "healthcare", label: "Healthcare" },
  { value: "education", label: "Education" },
  { value: "other", label: "Other" },
];

const COMPANY_SIZES = [
  { value: "solo", label: "Just me" },
  { value: "2-5", label: "2-5 employees" },
  { value: "6-20", label: "6-20 employees" },
  { value: "21-50", label: "21-50 employees" },
  { value: "50+", label: "50+ employees" },
];

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
  "#000000", // Black
];

// Building steps for the loader
const BUILD_STEPS = [
  { icon: Shield, label: "Securing your workspace...", duration: 800 },
  { icon: Palette, label: "Applying your branding...", duration: 1000 },
  { icon: Globe, label: "Setting up your subdomain...", duration: 900 },
  { icon: Users, label: "Configuring team permissions...", duration: 700 },
  { icon: BarChart3, label: "Initializing analytics...", duration: 600 },
  { icon: Zap, label: "Optimizing performance...", duration: 500 },
  { icon: Rocket, label: "Launching your platform...", duration: 1000 },
];

export default function AgencyOnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState<"form" | "building" | "complete">("form");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [buildStep, setBuildStep] = useState(0);

  // Form state
  const [appName, setAppName] = useState("");
  const [primaryColor, setPrimaryColor] = useState("#8b5cf6");
  const [industry, setIndustry] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  // Handle logo upload (preview only, actual upload would need more work)
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
      router.push("/agency");
    }, 1500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await completeOnboarding({
        appName: appName || undefined,
        primaryColor,
        logoUrl: logoPreview || undefined, // In production, upload to storage first
        industry: industry || undefined,
        companySize: companySize || undefined,
      });

      // Start the building animation
      await runBuildAnimation();
    } catch (error) {
      console.error("Error completing onboarding:", error);
      setIsSubmitting(false);
    }
  };

  const handleSkip = async () => {
    setIsSubmitting(true);
    try {
      await skipOnboarding();
      await runBuildAnimation();
    } catch (error) {
      console.error("Error skipping onboarding:", error);
      setIsSubmitting(false);
    }
  };

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
          <h1 className="mb-2 text-2xl font-bold">Welkom! Laten we starten</h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Personaliseer je platform in een paar simpele stappen
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="rounded-2xl border border-zinc-200/50 bg-white/80 p-6 backdrop-blur-sm dark:border-zinc-800/50 dark:bg-zinc-900/80">
            {/* App Name */}
            <div className="mb-6">
              <Label htmlFor="appName" className="mb-2 flex items-center gap-2">
                <Building2 className="h-4 w-4 text-violet-500" />
                Platform naam
              </Label>
              <Input
                id="appName"
                placeholder="bijv. MyCRM, LeadPro, etc."
                value={appName}
                onChange={(e) => setAppName(e.target.value)}
                className="text-lg"
              />
              <p className="mt-1 text-xs text-zinc-500">
                Dit zien je klanten als ze inloggen
              </p>
            </div>

            {/* Logo Upload */}
            <div className="mb-6">
              <Label className="mb-2 flex items-center gap-2">
                <Upload className="h-4 w-4 text-violet-500" />
                Logo uploaden
              </Label>
              <div className="flex items-center gap-4">
                <div className="flex h-20 w-20 items-center justify-center rounded-xl border-2 border-dashed border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800">
                  {logoPreview ? (
                    <img
                      src={logoPreview}
                      alt="Logo preview"
                      className="h-16 w-16 rounded-lg object-cover"
                    />
                  ) : (
                    <Upload className="h-6 w-6 text-zinc-400" />
                  )}
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
                    <Button type="button" variant="outline" asChild>
                      <span className="cursor-pointer">Kies bestand</span>
                    </Button>
                  </label>
                  <p className="mt-1 text-xs text-zinc-500">
                    PNG, JPG of SVG. Max 2MB.
                  </p>
                </div>
              </div>
            </div>

            {/* Primary Color */}
            <div className="mb-6">
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
                    className={`h-10 w-10 rounded-lg transition-all ${
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
                  className="h-10 w-10 cursor-pointer rounded-lg border-0"
                />
              </div>
            </div>

            {/* Industry */}
            <div className="mb-6">
              <Label className="mb-2">Branche (optioneel)</Label>
              <Select value={industry} onValueChange={setIndustry}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecteer je branche" />
                </SelectTrigger>
                <SelectContent>
                  {INDUSTRIES.map((ind) => (
                    <SelectItem key={ind.value} value={ind.value}>
                      {ind.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Company Size */}
            <div>
              <Label className="mb-2">Team grootte (optioneel)</Label>
              <Select value={companySize} onValueChange={setCompanySize}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecteer team grootte" />
                </SelectTrigger>
                <SelectContent>
                  {COMPANY_SIZES.map((size) => (
                    <SelectItem key={size.value} value={size.value}>
                      {size.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Preview */}
          <div className="rounded-xl border border-zinc-200/50 bg-white/50 p-4 dark:border-zinc-800/50 dark:bg-zinc-900/50">
            <p className="mb-2 text-xs font-medium text-zinc-500">PREVIEW</p>
            <div className="flex items-center gap-3">
              {logoPreview ? (
                <img
                  src={logoPreview}
                  alt="Preview"
                  className="h-10 w-10 rounded-lg object-cover"
                />
              ) : (
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-lg text-white"
                  style={{ backgroundColor: primaryColor }}
                >
                  <span className="font-bold">{(appName || "A").charAt(0)}</span>
                </div>
              )}
              <span className="font-semibold" style={{ color: primaryColor }}>
                {appName || "Jouw Platform"}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              type="button"
              variant="ghost"
              onClick={handleSkip}
              disabled={isSubmitting}
              className="flex-1"
            >
              Later instellen
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-gradient-to-r from-violet-600 to-purple-600"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Bezig...
                </>
              ) : (
                <>
                  Platform bouwen
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
