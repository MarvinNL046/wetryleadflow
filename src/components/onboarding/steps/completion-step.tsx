"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useOnboarding } from "../onboarding-provider";
import {
  CheckCircle2,
  Circle,
  ArrowRight,
  Sparkles,
  PartyPopper
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function CompletionStep() {
  const { close, status } = useOnboarding();
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    // Trigger confetti animation after a short delay
    const timer = setTimeout(() => setShowConfetti(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const handleGoToDashboard = () => {
    close();
  };

  const completedSteps = [
    {
      label: "Profiel ingesteld",
      completed: status?.progress?.steps.profile ?? false,
    },
    {
      label: "Pipeline aangemaakt",
      completed: status?.progress?.steps.pipeline ?? false,
    },
    {
      label: "Meta koppeling",
      completed: status?.progress?.steps.metaConnected ?? false,
      optional: true,
    },
  ];

  return (
    <div className="text-center">
      {/* Confetti Animation */}
      {showConfetti && (
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", duration: 0.6 }}
          className="mx-auto mb-6"
        >
          <div className="relative mx-auto flex h-20 w-20 items-center justify-center">
            {/* Background glow */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-500/20 to-blue-500/20 blur-xl" />

            {/* Icon container */}
            <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-blue-500 shadow-lg shadow-violet-500/25">
              <PartyPopper className="h-8 w-8 text-white" />
            </div>

            {/* Floating sparkles */}
            <motion.div
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: [0, 1, 0], y: -20 }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
              className="absolute -right-2 -top-2"
            >
              <Sparkles className="h-4 w-4 text-yellow-400" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: [0, 1, 0], y: -20 }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
              className="absolute -left-2 top-0"
            >
              <Sparkles className="h-3 w-3 text-violet-400" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: [0, 1, 0], y: -15 }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
              className="absolute -bottom-1 right-0"
            >
              <Sparkles className="h-3 w-3 text-blue-400" />
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="mb-2 text-2xl font-bold text-zinc-900 dark:text-white">
          Je CRM is klaar!
        </h2>
        <p className="mb-6 text-zinc-600 dark:text-zinc-400">
          Je kunt nu beginnen met het beheren van je leads
        </p>
      </motion.div>

      {/* Completion summary */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mb-8 space-y-2 rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-left dark:border-zinc-700 dark:bg-zinc-800/50"
      >
        {completedSteps.map((step, idx) => (
          <div key={idx} className="flex items-center gap-3">
            {step.completed ? (
              <CheckCircle2 className="h-5 w-5 text-green-500" />
            ) : (
              <Circle className="h-5 w-5 text-zinc-300 dark:text-zinc-600" />
            )}
            <span
              className={cn(
                "text-sm",
                step.completed
                  ? "text-zinc-900 dark:text-white"
                  : "text-zinc-400 dark:text-zinc-500"
              )}
            >
              {step.label}
              {step.optional && !step.completed && (
                <span className="ml-1 text-xs text-zinc-400">(later)</span>
              )}
            </span>
          </div>
        ))}
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <Button
          onClick={handleGoToDashboard}
          className="w-full bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700"
          size="lg"
        >
          Ga naar Dashboard
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </motion.div>
    </div>
  );
}
