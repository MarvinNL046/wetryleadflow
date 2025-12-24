"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { OnboardingStatus, getOnboardingStatus, skipOnboarding, completeOnboarding, updateOnboardingProgress } from "@/lib/actions/onboarding";

interface OnboardingContextType {
  isOpen: boolean;
  status: OnboardingStatus | null;
  currentStep: number;
  isLoading: boolean;
  open: () => void;
  close: () => void;
  openOnboarding: () => void;
  closeOnboarding: () => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  skip: () => Promise<void>;
  complete: () => Promise<void>;
  refreshStatus: () => Promise<void>;
}

const OnboardingContext = createContext<OnboardingContextType | null>(null);

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error("useOnboarding must be used within OnboardingProvider");
  }
  return context;
}

interface OnboardingProviderProps {
  children: ReactNode;
  initialStatus?: OnboardingStatus | null;
}

export function OnboardingProvider({ children, initialStatus }: OnboardingProviderProps) {
  const [status, setStatus] = useState<OnboardingStatus | null>(initialStatus || null);
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(!initialStatus);

  const refreshStatus = useCallback(async () => {
    try {
      const newStatus = await getOnboardingStatus();
      setStatus(newStatus);
      setCurrentStep(newStatus.progress.currentStep);
    } catch (error) {
      console.error("Failed to fetch onboarding status:", error);
    }
  }, []);

  // Fetch status on mount if not provided
  useEffect(() => {
    if (!initialStatus) {
      refreshStatus().finally(() => setIsLoading(false));
    } else {
      setCurrentStep(initialStatus.progress.currentStep);
      setIsLoading(false);
    }
  }, [initialStatus, refreshStatus]);

  // Auto-open onboarding for new users
  useEffect(() => {
    if (!isLoading && status && !status.completed && !status.skipped) {
      // Check if they haven't even started (step 0 and no pipelines)
      if (status.progress.currentStep === 0 && !status.hasPipelines) {
        setIsOpen(true);
      }
    }
  }, [isLoading, status]);

  const openOnboarding = useCallback(() => setIsOpen(true), []);
  const closeOnboarding = useCallback(() => setIsOpen(false), []);

  const nextStep = useCallback(async () => {
    const newStep = currentStep + 1;
    setCurrentStep(newStep);
    await updateOnboardingProgress({ currentStep: newStep });
  }, [currentStep]);

  const prevStep = useCallback(async () => {
    if (currentStep > 0) {
      const newStep = currentStep - 1;
      setCurrentStep(newStep);
      await updateOnboardingProgress({ currentStep: newStep });
    }
  }, [currentStep]);

  const goToStep = useCallback(async (step: number) => {
    setCurrentStep(step);
    await updateOnboardingProgress({ currentStep: step });
  }, []);

  const skip = useCallback(async () => {
    await skipOnboarding();
    setIsOpen(false);
    await refreshStatus();
  }, [refreshStatus]);

  const complete = useCallback(async () => {
    await completeOnboarding();
    setIsOpen(false);
    await refreshStatus();
  }, [refreshStatus]);

  return (
    <OnboardingContext.Provider
      value={{
        isOpen,
        status,
        currentStep,
        isLoading,
        open: openOnboarding,
        close: closeOnboarding,
        openOnboarding,
        closeOnboarding,
        nextStep,
        prevStep,
        goToStep,
        skip,
        complete,
        refreshStatus,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}
