"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useOnboarding } from "../onboarding-provider";
import { createPipelineFromTemplate, PipelineTemplate } from "@/lib/actions/onboarding";
import { ArrowLeft, ArrowRight, Kanban, Loader2, Phone, Home, Pencil, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const TEMPLATES: Array<{
  id: PipelineTemplate;
  name: string;
  description: string;
  icon: typeof Phone;
  stages: string[];
}> = [
  {
    id: "sales",
    name: "Sales Pipeline",
    description: "Klassieke sales funnel",
    icon: Phone,
    stages: ["Lead", "Gekwalificeerd", "Offerte", "Onderhandeling", "Gewonnen"],
  },
  {
    id: "leads",
    name: "Lead Pipeline",
    description: "Perfect voor telefonische acquisitie",
    icon: Home,
    stages: ["Nieuw", "1x Gebeld", "Niet Bereikbaar", "Afspraak", "Gewonnen"],
  },
  {
    id: "custom",
    name: "Custom",
    description: "Begin met een lege pipeline",
    icon: Pencil,
    stages: ["Nieuw", "In Behandeling", "Afgerond"],
  },
];

export function PipelineStep() {
  const { nextStep, prevStep, refreshStatus } = useOnboarding();
  const [selectedTemplate, setSelectedTemplate] = useState<PipelineTemplate>("leads");
  const [isLoading, setIsLoading] = useState(false);

  const handleCreatePipeline = async () => {
    setIsLoading(true);
    try {
      await createPipelineFromTemplate(selectedTemplate);
      await refreshStatus();
      await nextStep();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
          <Kanban className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
            Kies een pipeline template
          </h2>
          <p className="text-sm text-zinc-500">Je kunt dit later altijd aanpassen</p>
        </div>
      </div>

      {/* Templates */}
      <div className="space-y-3">
        {TEMPLATES.map((template) => {
          const Icon = template.icon;
          const isSelected = selectedTemplate === template.id;

          return (
            <button
              key={template.id}
              onClick={() => setSelectedTemplate(template.id)}
              className={cn(
                "relative w-full rounded-xl border-2 p-4 text-left transition-all",
                isSelected
                  ? "border-violet-500 bg-violet-50 dark:border-violet-500 dark:bg-violet-900/20"
                  : "border-zinc-200 hover:border-zinc-300 dark:border-zinc-700 dark:hover:border-zinc-600"
              )}
            >
              {isSelected && (
                <div className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-violet-500">
                  <Check className="h-3 w-3 text-white" />
                </div>
              )}

              <div className="flex items-start gap-3">
                <div className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-lg",
                  isSelected
                    ? "bg-violet-100 dark:bg-violet-900/50"
                    : "bg-zinc-100 dark:bg-zinc-800"
                )}>
                  <Icon className={cn(
                    "h-5 w-5",
                    isSelected
                      ? "text-violet-600 dark:text-violet-400"
                      : "text-zinc-500"
                  )} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-zinc-900 dark:text-white">
                    {template.name}
                  </h3>
                  <p className="text-sm text-zinc-500">{template.description}</p>

                  {/* Stage preview */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {template.stages.map((stage, idx) => (
                      <span
                        key={idx}
                        className={cn(
                          "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs",
                          isSelected
                            ? "bg-violet-100 text-violet-700 dark:bg-violet-900/50 dark:text-violet-300"
                            : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                        )}
                      >
                        {idx < template.stages.length - 1 && (
                          <span className="mr-0.5">{idx + 1}.</span>
                        )}
                        {stage}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Actions */}
      <div className="mt-6 flex gap-3">
        <Button
          onClick={prevStep}
          variant="outline"
          className="flex-1"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Terug
        </Button>
        <Button
          onClick={handleCreatePipeline}
          className="flex-1 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <>
              Aanmaken
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
