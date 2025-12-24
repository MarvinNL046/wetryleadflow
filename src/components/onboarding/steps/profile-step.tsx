"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useOnboarding } from "../onboarding-provider";
import { saveOnboardingProfile } from "@/lib/actions/onboarding";
import { ArrowLeft, ArrowRight, Building2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type BusinessType = "products" | "services" | "both";

export function ProfileStep() {
  const { nextStep, prevStep } = useOnboarding();
  const [companyName, setCompanyName] = useState("");
  const [businessType, setBusinessType] = useState<BusinessType | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleContinue = async () => {
    setIsLoading(true);
    try {
      await saveOnboardingProfile({
        companyName: companyName || "Mijn Bedrijf",
        businessType: businessType || undefined,
      });
      await nextStep();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-100 dark:bg-violet-900/30">
          <Building2 className="h-5 w-5 text-violet-600 dark:text-violet-400" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
            Over je bedrijf
          </h2>
          <p className="text-sm text-zinc-500">Vertel ons wat meer</p>
        </div>
      </div>

      {/* Form */}
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="companyName">Bedrijfsnaam</Label>
          <Input
            id="companyName"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Bijv. Stay Cool Airco"
            className="h-12"
          />
        </div>

        <div className="space-y-3">
          <Label>Wat verkoop je? (optioneel)</Label>
          <div className="grid grid-cols-3 gap-3">
            {([
              { value: "products", label: "Producten", emoji: "📦" },
              { value: "services", label: "Diensten", emoji: "🔧" },
              { value: "both", label: "Beide", emoji: "✨" },
            ] as const).map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setBusinessType(option.value)}
                className={cn(
                  "flex flex-col items-center gap-1 rounded-xl border-2 p-4 transition-all",
                  businessType === option.value
                    ? "border-violet-500 bg-violet-50 dark:border-violet-500 dark:bg-violet-900/20"
                    : "border-zinc-200 hover:border-zinc-300 dark:border-zinc-700 dark:hover:border-zinc-600"
                )}
              >
                <span className="text-2xl">{option.emoji}</span>
                <span className="text-sm font-medium">{option.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-8 flex gap-3">
        <Button
          onClick={prevStep}
          variant="outline"
          className="flex-1"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Terug
        </Button>
        <Button
          onClick={handleContinue}
          className="flex-1 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <>
              Volgende
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
