"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useOnboarding } from "./onboarding-provider";
import { OnboardingProgress } from "./onboarding-progress";
import { WelcomeStep } from "./steps/welcome-step";
import { ProfileStep } from "./steps/profile-step";
import { PipelineStep } from "./steps/pipeline-step";
import { IntegrationStep } from "./steps/integration-step";
import { CompletionStep } from "./steps/completion-step";

const STEPS = [
  { component: WelcomeStep, key: "welcome" },
  { component: ProfileStep, key: "profile" },
  { component: PipelineStep, key: "pipeline" },
  { component: IntegrationStep, key: "integration" },
  { component: CompletionStep, key: "completion" },
];

export function OnboardingModal() {
  const { isOpen, currentStep, isLoading } = useOnboarding();

  if (!isOpen || isLoading) return null;

  const CurrentStepComponent = STEPS[currentStep]?.component || WelcomeStep;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="relative mx-4 w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-zinc-900"
        >
          {/* Progress indicator */}
          {currentStep < STEPS.length - 1 && (
            <div className="border-b border-zinc-100 px-6 py-4 dark:border-zinc-800">
              <OnboardingProgress
                currentStep={currentStep}
                totalSteps={STEPS.length - 1}
              />
            </div>
          )}

          {/* Step content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="p-6"
            >
              <CurrentStepComponent />
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
