"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useOnboarding } from "../onboarding-provider";
import { ArrowLeft, ArrowRight, Facebook, Link2, Clock, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function IntegrationStep() {
  const { nextStep, prevStep, refreshStatus } = useOnboarding();
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnectMeta = async () => {
    setIsConnecting(true);
    // In a real implementation, this would redirect to Meta OAuth
    // For now, we'll just simulate and move to next step
    window.location.href = "/api/meta/auth";
  };

  const handleSkipForNow = async () => {
    await refreshStatus();
    await nextStep();
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
          <Link2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
            Meta Lead Ads koppelen
          </h2>
          <p className="text-sm text-zinc-500">Importeer leads automatisch</p>
        </div>
      </div>

      {/* Benefits */}
      <div className="mb-6 space-y-3">
        <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-800/50">
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50">
              <Facebook className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="font-medium text-zinc-900 dark:text-white">
                Automatische lead import
              </h3>
              <p className="mt-1 text-sm text-zinc-500">
                Leads van Facebook en Instagram komen direct in je CRM terecht
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-800/50">
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/50">
              <Clock className="h-4 w-4 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h3 className="font-medium text-zinc-900 dark:text-white">
                Real-time synchronisatie
              </h3>
              <p className="mt-1 text-sm text-zinc-500">
                Nieuwe leads worden binnen seconden toegevoegd
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-800/50">
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-100 dark:bg-violet-900/50">
              <CheckCircle2 className="h-4 w-4 text-violet-600 dark:text-violet-400" />
            </div>
            <div>
              <h3 className="font-medium text-zinc-900 dark:text-white">
                Formulier tracking
              </h3>
              <p className="mt-1 text-sm text-zinc-500">
                Zie precies via welk formulier elke lead binnenkomt
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Connect button */}
      <div className="mb-6">
        <Button
          onClick={handleConnectMeta}
          disabled={isConnecting}
          className="w-full bg-[#1877F2] hover:bg-[#166FE5] text-white h-12"
        >
          <Facebook className="mr-2 h-5 w-5" />
          {isConnecting ? "Verbinden..." : "Verbinden met Facebook"}
        </Button>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Button
          onClick={prevStep}
          variant="outline"
          className="flex-1"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Terug
        </Button>
        <Button
          onClick={handleSkipForNow}
          variant="ghost"
          className="flex-1 text-zinc-500"
        >
          Later instellen
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
