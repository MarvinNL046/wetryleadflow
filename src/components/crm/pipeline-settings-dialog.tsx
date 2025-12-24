"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { updatePipeline, updatePipelineStages } from "@/lib/actions/crm";
import { Settings, Save, Loader2, Palette, Bell, Phone, Mail, Zap } from "lucide-react";
import { useRouter } from "next/navigation";

interface Stage {
  id: number;
  name: string;
  color: string | null;
  order: number;
  followUpEnabled?: boolean;
  followUpDays?: number | null;
  isFinalAttempt?: boolean;
  sendEmailOnLost?: boolean;
  autoMoveToLost?: boolean;
}

interface PipelineSettingsDialogProps {
  pipelineId: number;
  pipelineName: string;
  stages: Stage[];
}

const PRESET_COLORS = [
  "#3b82f6", // blue
  "#8b5cf6", // violet
  "#f59e0b", // amber
  "#f97316", // orange
  "#ef4444", // red
  "#ec4899", // pink
  "#22c55e", // green
  "#10b981", // emerald
  "#06b6d4", // cyan
  "#6b7280", // gray
];

export function PipelineSettingsDialog({
  pipelineId,
  pipelineName,
  stages: initialStages,
}: PipelineSettingsDialogProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [pipelineNameValue, setPipelineNameValue] = useState(pipelineName);
  const [stages, setStages] = useState(
    initialStages.map((s) => ({
      id: s.id,
      name: s.name,
      color: s.color || "#6366f1",
      followUpEnabled: s.followUpEnabled || false,
      followUpDays: s.followUpDays || 2,
      isFinalAttempt: s.isFinalAttempt || false,
      sendEmailOnLost: s.sendEmailOnLost || false,
      autoMoveToLost: s.autoMoveToLost || false,
    }))
  );

  function handleNameChange(stageId: number, newName: string) {
    setStages((prev) =>
      prev.map((s) => (s.id === stageId ? { ...s, name: newName } : s))
    );
  }

  function handleColorChange(stageId: number, newColor: string) {
    setStages((prev) =>
      prev.map((s) => (s.id === stageId ? { ...s, color: newColor } : s))
    );
  }

  function handleFollowUpEnabledChange(stageId: number, enabled: boolean) {
    setStages((prev) =>
      prev.map((s) => (s.id === stageId ? { ...s, followUpEnabled: enabled } : s))
    );
  }

  function handleFollowUpDaysChange(stageId: number, days: number) {
    setStages((prev) =>
      prev.map((s) => (s.id === stageId ? { ...s, followUpDays: days } : s))
    );
  }

  function handleFinalAttemptChange(stageId: number, enabled: boolean) {
    setStages((prev) =>
      prev.map((s) => (s.id === stageId ? { ...s, isFinalAttempt: enabled } : s))
    );
  }

  function handleSendEmailOnLostChange(stageId: number, enabled: boolean) {
    setStages((prev) =>
      prev.map((s) => (s.id === stageId ? { ...s, sendEmailOnLost: enabled } : s))
    );
  }

  function handleAutoMoveToLostChange(stageId: number, enabled: boolean) {
    setStages((prev) =>
      prev.map((s) => (s.id === stageId ? { ...s, autoMoveToLost: enabled } : s))
    );
  }

  async function handleSave() {
    startTransition(async () => {
      try {
        // Update pipeline name if changed
        if (pipelineNameValue !== pipelineName) {
          await updatePipeline(pipelineId, { name: pipelineNameValue });
        }
        // Update stages
        await updatePipelineStages(pipelineId, stages);
        setOpen(false);
        router.refresh();
      } catch (error) {
        console.error("Failed to update:", error);
        alert("Er ging iets mis bij het opslaan");
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" variant="outline" size="sm" className="gap-2">
          <Settings className="h-4 w-4" />
          Stages Bewerken
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Pipeline Instellingen</DialogTitle>
          <DialogDescription>
            Pas de namen en kleuren van de stages aan voor &quot;{pipelineName}&quot;.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-6">
          {/* Pipeline Name */}
          <div className="space-y-2">
            <Label htmlFor="pipeline-name" className="text-sm font-medium">
              Pipeline Naam
            </Label>
            <Input
              id="pipeline-name"
              value={pipelineNameValue}
              onChange={(e) => setPipelineNameValue(e.target.value)}
              placeholder="Pipeline naam"
              className="h-10"
            />
          </div>

          {/* Stages Section */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Stages</Label>
            {stages.map((stage, index) => (
            <div
              key={stage.id}
              className="rounded-lg border border-zinc-200 p-3 dark:border-zinc-800"
            >
              <div className="flex items-center gap-3">
                {/* Color indicator */}
                <div
                  className="h-8 w-2 flex-shrink-0 rounded-full"
                  style={{ backgroundColor: stage.color }}
                />

                {/* Stage number */}
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-zinc-100 text-xs font-medium dark:bg-zinc-800">
                  {index + 1}
                </span>

                {/* Name input */}
                <div className="flex-1">
                  <Input
                    value={stage.name}
                    onChange={(e) => handleNameChange(stage.id, e.target.value)}
                    placeholder="Stage naam"
                    className="h-9"
                  />
                </div>

                {/* Color picker */}
                <div className="relative">
                  <button
                    type="button"
                    className="flex h-9 w-9 items-center justify-center rounded-md border border-zinc-200 hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
                    onClick={() => {
                      const colorPicker = document.getElementById(
                        `color-picker-${stage.id}`
                      );
                      if (colorPicker) colorPicker.click();
                    }}
                  >
                    <Palette className="h-4 w-4" style={{ color: stage.color }} />
                  </button>
                  <input
                    id={`color-picker-${stage.id}`}
                    type="color"
                    value={stage.color}
                    onChange={(e) => handleColorChange(stage.id, e.target.value)}
                    className="invisible absolute h-0 w-0"
                  />
                </div>
              </div>

              {/* Follow-up settings */}
              <div className="mt-3 space-y-2">
                <div className="flex items-center justify-between rounded-md bg-zinc-50 px-3 py-2 dark:bg-zinc-800/50">
                  <div className="flex items-center gap-2">
                    <Bell className="h-4 w-4 text-amber-500" />
                    <span className="text-sm text-zinc-600 dark:text-zinc-400">
                      Follow-up herinnering
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    {stage.followUpEnabled && (
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-zinc-500">na</span>
                        <Input
                          type="number"
                          min={1}
                          max={30}
                          value={stage.followUpDays}
                          onChange={(e) => handleFollowUpDaysChange(stage.id, parseInt(e.target.value) || 2)}
                          className="h-7 w-14 text-center text-sm"
                        />
                        <span className="text-xs text-zinc-500">dagen</span>
                      </div>
                    )}
                    <Switch
                      checked={stage.followUpEnabled}
                      onCheckedChange={(checked) => handleFollowUpEnabledChange(stage.id, checked)}
                    />
                  </div>
                </div>

                {/* Final attempt / Lost settings */}
                {stage.followUpEnabled && (
                  <div className="space-y-2 rounded-md border border-red-100 bg-red-50/50 px-3 py-2 dark:border-red-900/30 dark:bg-red-900/10">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-red-500" />
                        <span className="text-sm text-zinc-600 dark:text-zinc-400">
                          Laatste poging
                        </span>
                      </div>
                      <Switch
                        checked={stage.isFinalAttempt}
                        onCheckedChange={(checked) => handleFinalAttemptChange(stage.id, checked)}
                      />
                    </div>

                    {stage.isFinalAttempt && (
                      <>
                        <div className="flex items-center justify-between pl-6">
                          <div className="flex items-center gap-2">
                            <Zap className="h-3 w-3 text-orange-500" />
                            <span className="text-xs text-zinc-500">
                              Auto naar Verloren
                            </span>
                          </div>
                          <Switch
                            checked={stage.autoMoveToLost}
                            onCheckedChange={(checked) => handleAutoMoveToLostChange(stage.id, checked)}
                          />
                        </div>
                        <div className="flex items-center justify-between pl-6">
                          <div className="flex items-center gap-2">
                            <Mail className="h-3 w-3 text-blue-500" />
                            <span className="text-xs text-zinc-500">
                              Stuur afscheids-email
                            </span>
                          </div>
                          <Switch
                            checked={stage.sendEmailOnLost}
                            onCheckedChange={(checked) => handleSendEmailOnLostChange(stage.id, checked)}
                          />
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
          </div>

          {/* Preset colors */}
          <div className="space-y-2">
            <Label className="text-sm text-zinc-500">Snelle kleuren</Label>
            <div className="flex flex-wrap gap-2">
              {PRESET_COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  className="h-6 w-6 rounded-full border-2 border-transparent transition-all hover:scale-110 hover:border-zinc-400"
                  style={{ backgroundColor: color }}
                  onClick={() => {
                    // Apply to the focused/selected stage (placeholder)
                    // For now this is informational
                  }}
                  title={color}
                />
              ))}
            </div>
            <p className="text-xs text-zinc-400">
              Klik op het kleur-icoon bij een stage om de kleur aan te passen
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isPending}
          >
            Annuleren
          </Button>
          <Button
            onClick={handleSave}
            disabled={isPending}
            className="gap-2 bg-gradient-to-r from-violet-600 to-blue-600 text-white"
          >
            {isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            Opslaan
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
