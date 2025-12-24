"use client";

import { useState, useEffect } from "react";
import { getOnboardingStepCount, type OnboardingProgress } from "@/lib/actions/onboarding";
import { ClipboardList, Check, Circle, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useOnboarding } from "./onboarding-provider";

interface OnboardingStepsStatus {
  completed: number;
  total: number;
  steps?: OnboardingProgress["steps"];
}

export function SidebarChecklist() {
  const { open, status, isLoading } = useOnboarding();
  const [isOpen, setIsOpen] = useState(false);
  const [stepStatus, setStepStatus] = useState<OnboardingStepsStatus | null>(null);

  useEffect(() => {
    async function fetchStatus() {
      const result = await getOnboardingStepCount();
      setStepStatus(result);
    }
    fetchStatus();
  }, [status]);

  // Don't show if onboarding is completed or still loading
  if (isLoading || status?.completed) {
    return null;
  }

  // Don't show if we don't have step status yet
  if (!stepStatus) {
    return null;
  }

  const { completed, total, steps } = stepStatus;

  // Don't show if all steps are completed
  if (completed >= total) {
    return null;
  }

  const checklistItems = [
    { key: "profile", label: "Profiel ingesteld", completed: steps?.profile ?? false },
    { key: "pipeline", label: "Pipeline aangemaakt", completed: steps?.pipeline ?? false },
    { key: "metaConnected", label: "Meta koppeling", completed: steps?.metaConnected ?? false },
  ];

  return (
    <div className="relative">
      {/* Main button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex w-full items-center justify-between gap-2 rounded-lg border px-3 py-2 text-xs font-medium transition-all",
          "border-amber-200/50 bg-amber-50/50 text-amber-700 hover:bg-amber-100/50",
          "dark:border-amber-800/50 dark:bg-amber-900/20 dark:text-amber-300 dark:hover:bg-amber-900/40"
        )}
      >
        <div className="flex items-center gap-2">
          <ClipboardList className="h-3.5 w-3.5" />
          <span>Setup</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="rounded-full bg-amber-200/50 px-1.5 py-0.5 text-[10px] font-semibold dark:bg-amber-800/50">
            {completed}/{total}
          </span>
          <ChevronDown
            className={cn(
              "h-3.5 w-3.5 transition-transform",
              isOpen && "rotate-180"
            )}
          />
        </div>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute bottom-full left-0 right-0 mb-2 overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-lg dark:border-zinc-700 dark:bg-zinc-800">
          <div className="p-3">
            <h4 className="mb-2 text-xs font-semibold text-zinc-900 dark:text-white">
              Setup Checklist
            </h4>
            <div className="space-y-1.5">
              {checklistItems.map((item) => (
                <div
                  key={item.key}
                  className="flex items-center gap-2 text-xs"
                >
                  {item.completed ? (
                    <Check className="h-3.5 w-3.5 text-green-500" />
                  ) : (
                    <Circle className="h-3.5 w-3.5 text-zinc-300 dark:text-zinc-600" />
                  )}
                  <span
                    className={cn(
                      item.completed
                        ? "text-zinc-500 line-through dark:text-zinc-400"
                        : "text-zinc-700 dark:text-zinc-300"
                    )}
                  >
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Continue button */}
          <div className="border-t border-zinc-200 p-2 dark:border-zinc-700">
            <button
              onClick={() => {
                setIsOpen(false);
                open();
              }}
              className="w-full rounded-md bg-gradient-to-r from-violet-600 to-blue-600 px-3 py-1.5 text-xs font-medium text-white transition-all hover:from-violet-700 hover:to-blue-700"
            >
              Doorgaan met setup
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
