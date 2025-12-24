"use client";

import { Button } from "@/components/ui/button";
import { useOnboarding } from "../onboarding-provider";
import { Sparkles, ArrowRight, X } from "lucide-react";
import { useUser } from "@stackframe/stack";

export function WelcomeStep() {
  const { nextStep, skip } = useOnboarding();
  const user = useUser();
  const firstName = user?.displayName?.split(" ")[0] || "daar";

  return (
    <div className="text-center">
      {/* Icon */}
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-blue-500 shadow-lg shadow-violet-500/25">
        <Sparkles className="h-8 w-8 text-white" />
      </div>

      {/* Greeting */}
      <h2 className="mb-2 text-2xl font-bold text-zinc-900 dark:text-white">
        Welkom bij LeadFlow, {firstName}!
      </h2>
      <p className="mb-8 text-zinc-600 dark:text-zinc-400">
        We helpen je om in 2 minuten je CRM klaar te maken voor gebruik.
      </p>

      {/* Features preview */}
      <div className="mb-8 grid grid-cols-3 gap-4 text-center">
        <div className="rounded-lg bg-zinc-50 p-3 dark:bg-zinc-800">
          <div className="mb-1 text-2xl">📊</div>
          <p className="text-xs text-zinc-600 dark:text-zinc-400">Pipeline</p>
        </div>
        <div className="rounded-lg bg-zinc-50 p-3 dark:bg-zinc-800">
          <div className="mb-1 text-2xl">📱</div>
          <p className="text-xs text-zinc-600 dark:text-zinc-400">Meta Ads</p>
        </div>
        <div className="rounded-lg bg-zinc-50 p-3 dark:bg-zinc-800">
          <div className="mb-1 text-2xl">👥</div>
          <p className="text-xs text-zinc-600 dark:text-zinc-400">Leads</p>
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-3">
        <Button
          onClick={nextStep}
          className="w-full bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700"
          size="lg"
        >
          Laten we beginnen
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
        <Button
          onClick={skip}
          variant="ghost"
          className="w-full text-zinc-500"
        >
          <X className="mr-2 h-4 w-4" />
          Skip voor nu
        </Button>
      </div>
    </div>
  );
}
