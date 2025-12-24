"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Save,
  Loader2,
  Plus,
  Trash2,
  Settings,
  Calendar,
  CheckCircle2,
} from "lucide-react";
import {
  updateCrmSettings,
  addCallbackPeriod,
  removeCallbackPeriod,
} from "@/lib/actions/crm-settings";
import type { CrmSettingsData, CallbackPeriod } from "@/lib/types/crm-settings";

interface FollowUpSettingsFormProps {
  settings: CrmSettingsData;
}

export function FollowUpSettingsForm({ settings }: FollowUpSettingsFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [showAddPeriod, setShowAddPeriod] = useState(false);
  const [newPeriodDays, setNewPeriodDays] = useState("");
  const [newPeriodLabel, setNewPeriodLabel] = useState("");

  // Form state
  const [autoFollowUpEnabled, setAutoFollowUpEnabled] = useState(
    settings.autoFollowUpEnabled
  );
  const [followUpDays, setFollowUpDays] = useState(
    settings.followUpDays.toString()
  );
  const [maxCallAttempts, setMaxCallAttempts] = useState(
    settings.maxCallAttempts.toString()
  );
  const [sendEmailOnLost, setSendEmailOnLost] = useState(settings.sendEmailOnLost);
  const [callbackPeriods, setCallbackPeriods] = useState<CallbackPeriod[]>(
    settings.callbackPeriods
  );

  const hasChanges =
    autoFollowUpEnabled !== settings.autoFollowUpEnabled ||
    followUpDays !== settings.followUpDays.toString() ||
    maxCallAttempts !== settings.maxCallAttempts.toString() ||
    sendEmailOnLost !== settings.sendEmailOnLost ||
    JSON.stringify(callbackPeriods) !== JSON.stringify(settings.callbackPeriods);

  function handleTogglePeriod(days: number, enabled: boolean) {
    setCallbackPeriods((prev) =>
      prev.map((p) => (p.days === days ? { ...p, enabled } : p))
    );
  }

  function handleSave() {
    startTransition(async () => {
      try {
        await updateCrmSettings({
          autoFollowUpEnabled,
          followUpDays: parseInt(followUpDays) || 0,
          maxCallAttempts: parseInt(maxCallAttempts) || 0,
          sendEmailOnLost,
          callbackPeriods,
        });
        router.refresh();
      } catch (error) {
        console.error("Failed to save settings:", error);
        alert("Er ging iets mis bij het opslaan");
      }
    });
  }

  function handleAddPeriod() {
    const days = parseInt(newPeriodDays);
    if (!days || days <= 0) {
      alert("Voer een geldig aantal dagen in");
      return;
    }
    if (!newPeriodLabel.trim()) {
      alert("Voer een label in");
      return;
    }
    if (callbackPeriods.some((p) => p.days === days)) {
      alert(`Periode met ${days} dagen bestaat al`);
      return;
    }

    startTransition(async () => {
      try {
        await addCallbackPeriod(days, newPeriodLabel.trim());
        setShowAddPeriod(false);
        setNewPeriodDays("");
        setNewPeriodLabel("");
        router.refresh();
      } catch (error) {
        console.error("Failed to add period:", error);
        alert("Er ging iets mis");
      }
    });
  }

  function handleRemovePeriod(days: number) {
    startTransition(async () => {
      try {
        await removeCallbackPeriod(days);
        router.refresh();
      } catch (error) {
        console.error("Failed to remove period:", error);
        alert("Er ging iets mis");
      }
    });
  }

  return (
    <div className="space-y-6">
      {/* Main Toggle */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-100 dark:bg-violet-900">
                <Settings className="h-5 w-5 text-violet-600 dark:text-violet-400" />
              </div>
              <div>
                <CardTitle>Automatische Follow-Ups</CardTitle>
                <CardDescription>
                  Leads automatisch terugplaatsen naar Lead stage na belpogingen
                </CardDescription>
              </div>
            </div>
            <Switch
              checked={autoFollowUpEnabled}
              onCheckedChange={setAutoFollowUpEnabled}
            />
          </div>
        </CardHeader>
        {autoFollowUpEnabled && (
          <CardContent className="space-y-6 border-t pt-6">
            {/* Follow-up Days */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="followUpDays">Dagen voor terugkeer naar Lead</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="followUpDays"
                    type="number"
                    min="1"
                    max="30"
                    value={followUpDays}
                    onChange={(e) => setFollowUpDays(e.target.value)}
                    className="w-24"
                  />
                  <span className="text-sm text-zinc-500">dagen</span>
                </div>
                <p className="text-xs text-zinc-500">
                  Na dit aantal dagen komt een &quot;niet opgenomen&quot; lead terug in de Lead stage
                </p>
              </div>

              {/* Max Call Attempts */}
              <div className="space-y-2">
                <Label htmlFor="maxCallAttempts">Maximale belpogingen</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="maxCallAttempts"
                    type="number"
                    min="1"
                    max="10"
                    value={maxCallAttempts}
                    onChange={(e) => setMaxCallAttempts(e.target.value)}
                    className="w-24"
                  />
                  <span className="text-sm text-zinc-500">pogingen</span>
                </div>
                <p className="text-xs text-zinc-500">
                  Na dit aantal keer niet opnemen gaat de lead naar Lost
                </p>
              </div>
            </div>

            {/* Send Email Toggle */}
            <div className="flex items-center justify-between rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-900">
                  <span className="text-lg">📧</span>
                </div>
                <div>
                  <p className="font-medium">Email versturen bij Lost</p>
                  <p className="text-sm text-zinc-500">
                    Automatisch een follow-up email sturen na max pogingen
                  </p>
                </div>
              </div>
              <Switch
                checked={sendEmailOnLost}
                onCheckedChange={setSendEmailOnLost}
              />
            </div>
          </CardContent>
        )}
      </Card>

      {/* Callback Periods */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-100 dark:bg-cyan-900">
                <Calendar className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
              </div>
              <div>
                <CardTitle>Terugbel Periodes</CardTitle>
                <CardDescription>
                  Opties die verschijnen bij &quot;Later Terugbellen&quot; in de popup
                </CardDescription>
              </div>
            </div>
            <Dialog open={showAddPeriod} onOpenChange={setShowAddPeriod}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Periode Toevoegen
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Nieuwe Terugbel Periode</DialogTitle>
                  <DialogDescription>
                    Voeg een aangepaste terugbelperiode toe
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="newDays">Aantal dagen</Label>
                    <Input
                      id="newDays"
                      type="number"
                      min="1"
                      placeholder="bijv. 14"
                      value={newPeriodDays}
                      onChange={(e) => setNewPeriodDays(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newLabel">Label</Label>
                    <Input
                      id="newLabel"
                      placeholder="bijv. 2 Weken"
                      value={newPeriodLabel}
                      onChange={(e) => setNewPeriodLabel(e.target.value)}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setShowAddPeriod(false)}
                  >
                    Annuleren
                  </Button>
                  <Button onClick={handleAddPeriod} disabled={isPending}>
                    {isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      "Toevoegen"
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {callbackPeriods.length === 0 ? (
            <div className="rounded-lg border-2 border-dashed border-zinc-200 p-8 text-center dark:border-zinc-800">
              <Calendar className="mx-auto h-8 w-8 text-zinc-400" />
              <p className="mt-2 text-sm text-zinc-500">
                Nog geen terugbelperiodes ingesteld
              </p>
              <p className="mt-1 text-xs text-zinc-400">
                Voeg periodes toe om de &quot;Later Terugbellen&quot; optie te activeren
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {callbackPeriods.map((period) => (
                <div
                  key={period.days}
                  className="flex items-center justify-between rounded-lg border border-zinc-200 p-3 dark:border-zinc-800"
                >
                  <div className="flex items-center gap-3">
                    <Switch
                      checked={period.enabled}
                      onCheckedChange={(checked) =>
                        handleTogglePeriod(period.days, checked)
                      }
                    />
                    <div>
                      <p className="font-medium">{period.label}</p>
                      <p className="text-sm text-zinc-500">
                        {period.days} dagen
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemovePeriod(period.days)}
                    disabled={isPending}
                    className="text-zinc-400 hover:text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
          <p className="mt-4 text-xs text-zinc-500">
            Ingeschakelde periodes worden getoond in de &quot;Later Terugbellen&quot; popup.
            De lead komt na de gekozen periode automatisch terug in de Lead stage.
          </p>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex items-center justify-between rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex items-center gap-2">
          {hasChanges ? (
            <>
              <div className="h-2 w-2 rounded-full bg-amber-500" />
              <span className="text-sm text-zinc-500">Niet-opgeslagen wijzigingen</span>
            </>
          ) : (
            <>
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span className="text-sm text-zinc-500">Alle wijzigingen opgeslagen</span>
            </>
          )}
        </div>
        <Button
          onClick={handleSave}
          disabled={isPending || !hasChanges}
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
    </div>
  );
}
