"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface OnboardingProgressProps {
  currentStep: number;
  totalSteps: number;
}

export function OnboardingProgress({ currentStep, totalSteps }: OnboardingProgressProps) {
  return (
    <div className="flex items-center justify-center gap-2">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <motion.div
          key={index}
          className={cn(
            "h-2 rounded-full transition-colors",
            index === currentStep
              ? "w-8 bg-gradient-to-r from-violet-500 to-blue-500"
              : index < currentStep
              ? "w-2 bg-violet-500"
              : "w-2 bg-zinc-200 dark:bg-zinc-700"
          )}
          initial={false}
          animate={{
            scale: index === currentStep ? 1 : 0.9,
          }}
          transition={{ duration: 0.2 }}
        />
      ))}
    </div>
  );
}
