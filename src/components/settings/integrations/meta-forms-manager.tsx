"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  RefreshCw,
  Users,
  Clock,
  Settings2,
  Megaphone,
  CheckCircle2,
  XCircle,
  Pencil,
  Eye,
  ArrowRight,
  Loader2,
  FileText,
  Calendar,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { nl } from "date-fns/locale";
import { updateMetaFormSettings, syncAllMetaForms } from "@/lib/actions/integrations";
import Link from "next/link";

interface MetaForm {
  id: number;
  formId: string;
  formName: string | null;
  customName: string | null;
  isActive: boolean;
  lastSyncAt: Date | null;
  createdAt: Date;
  page: { id: number; name: string } | null;
  formFields: Array<{ key: string; label: string; type: string }>;
  leadCount: number;
  lastLeadAt: Date | null;
}

interface MetaFormsManagerProps {
  forms: MetaForm[];
}

export function MetaFormsManager({ forms }: MetaFormsManagerProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isSyncing, setIsSyncing] = useState(false);
  const [editingForm, setEditingForm] = useState<MetaForm | null>(null);
  const [customName, setCustomName] = useState("");
  const [viewingFieldsForm, setViewingFieldsForm] = useState<MetaForm | null>(null);

  const handleSync = async () => {
    setIsSyncing(true);
    try {
      await syncAllMetaForms();
      router.refresh();
    } catch (error) {
      console.error("Sync failed:", error);
    } finally {
      setIsSyncing(false);
    }
  };

  const handleToggleActive = async (formId: number, isActive: boolean) => {
    startTransition(async () => {
      await updateMetaFormSettings(formId, { isActive });
      router.refresh();
    });
  };

  const handleEditName = (form: MetaForm) => {
    setEditingForm(form);
    setCustomName(form.customName || form.formName || "");
  };

  const handleSaveName = async () => {
    if (!editingForm) return;

    startTransition(async () => {
      await updateMetaFormSettings(editingForm.id, { customName });
      setEditingForm(null);
      router.refresh();
    });
  };

  const totalLeads = forms.reduce((sum, form) => sum + form.leadCount, 0);
  const activeFormsCount = forms.filter((f) => f.isActive).length;

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-100 dark:bg-violet-900/30">
              <Megaphone className="h-5 w-5 text-violet-600 dark:text-violet-400" />
            </div>
            <div>
              <p className="text-sm text-zinc-500">Totaal Forms</p>
              <p className="text-xl font-bold">{forms.length}</p>
            </div>
          </div>

          <div className="h-8 w-px bg-zinc-200 dark:bg-zinc-700" />

          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30">
              <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-zinc-500">Actief</p>
              <p className="text-xl font-bold">{activeFormsCount}</p>
            </div>
          </div>

          <div className="h-8 w-px bg-zinc-200 dark:bg-zinc-700" />

          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
              <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-zinc-500">Totaal Leads</p>
              <p className="text-xl font-bold">{totalLeads}</p>
            </div>
          </div>
        </div>

        <Button onClick={handleSync} disabled={isSyncing} variant="outline">
          {isSyncing ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <RefreshCw className="mr-2 h-4 w-4" />
          )}
          Sync Forms
        </Button>
      </div>

      {/* Forms Grid */}
      {forms.length === 0 ? (
        <div className="rounded-xl border border-dashed border-zinc-300 bg-zinc-50/50 p-12 text-center dark:border-zinc-700 dark:bg-zinc-900/50">
          <Megaphone className="mx-auto h-12 w-12 text-zinc-400" />
          <h3 className="mt-4 text-lg font-semibold">Geen formulieren gevonden</h3>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Klik op &quot;Sync Forms&quot; om je Facebook Lead Forms op te halen
          </p>
          <Button onClick={handleSync} className="mt-4" disabled={isSyncing}>
            {isSyncing ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="mr-2 h-4 w-4" />
            )}
            Sync Forms
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {forms.map((form) => (
            <div
              key={form.id}
              className={`group relative overflow-hidden rounded-xl border bg-white p-5 transition-all hover:shadow-md dark:bg-zinc-900 ${
                form.isActive
                  ? "border-zinc-200 dark:border-zinc-800"
                  : "border-zinc-200 bg-zinc-50 opacity-75 dark:border-zinc-800 dark:bg-zinc-900/50"
              }`}
            >
              {/* Status Badge */}
              <div className="absolute right-3 top-3">
                <Badge
                  variant={form.isActive ? "default" : "secondary"}
                  className={
                    form.isActive
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      : ""
                  }
                >
                  {form.isActive ? (
                    <>
                      <CheckCircle2 className="mr-1 h-3 w-3" />
                      Actief
                    </>
                  ) : (
                    <>
                      <XCircle className="mr-1 h-3 w-3" />
                      Inactief
                    </>
                  )}
                </Badge>
              </div>

              {/* Form Icon & Name */}
              <div className="mb-4">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-violet-600">
                  <Megaphone className="h-6 w-6 text-white" />
                </div>
                <div className="flex items-start gap-2">
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-lg font-semibold text-zinc-900 dark:text-white">
                      {form.customName || form.formName || "Unnamed Form"}
                    </h3>
                    {form.page && (
                      <p className="mt-0.5 truncate text-sm text-zinc-500">
                        {form.page.name}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => handleEditName(form)}
                    className="mt-1 rounded p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Stats */}
              <div className="mb-4 grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-zinc-50 p-3 dark:bg-zinc-800">
                  <div className="flex items-center gap-2 text-zinc-500">
                    <Users className="h-4 w-4" />
                    <span className="text-xs">Leads</span>
                  </div>
                  <p className="mt-1 text-xl font-bold text-zinc-900 dark:text-white">
                    {form.leadCount}
                  </p>
                </div>
                <div className="rounded-lg bg-zinc-50 p-3 dark:bg-zinc-800">
                  <div className="flex items-center gap-2 text-zinc-500">
                    <Clock className="h-4 w-4" />
                    <span className="text-xs">Laatste Lead</span>
                  </div>
                  <p className="mt-1 text-sm font-medium text-zinc-900 dark:text-white">
                    {form.lastLeadAt
                      ? formatDistanceToNow(new Date(form.lastLeadAt), {
                          addSuffix: true,
                          locale: nl,
                        })
                      : "—"}
                  </p>
                </div>
              </div>

              {/* Fields Preview */}
              {form.formFields.length > 0 && (
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1.5">
                    {form.formFields.slice(0, 3).map((field) => (
                      <span
                        key={field.key}
                        className="rounded-md bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                      >
                        {field.label}
                      </span>
                    ))}
                    {form.formFields.length > 3 && (
                      <span className="rounded-md bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                        +{form.formFields.length - 3} meer
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-between border-t border-zinc-100 pt-4 dark:border-zinc-800">
                <div className="flex items-center gap-2">
                  <Switch
                    checked={form.isActive}
                    onCheckedChange={(checked) => handleToggleActive(form.id, checked)}
                    disabled={isPending}
                  />
                  <span className="text-sm text-zinc-600 dark:text-zinc-400">
                    {form.isActive ? "Actief" : "Inactief"}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setViewingFieldsForm(form)}
                  >
                    <Settings2 className="mr-1 h-4 w-4" />
                    Velden
                  </Button>
                  {form.leadCount > 0 && (
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/crm/contacts?formId=${form.formId}`}>
                        <Eye className="mr-1 h-4 w-4" />
                        Bekijk
                      </Link>
                    </Button>
                  )}
                </div>
              </div>

              {/* Last Sync Info */}
              {form.lastSyncAt && (
                <p className="mt-2 text-xs text-zinc-400">
                  Gesynchroniseerd{" "}
                  {formatDistanceToNow(new Date(form.lastSyncAt), {
                    addSuffix: true,
                    locale: nl,
                  })}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Edit Name Dialog */}
      <Dialog open={!!editingForm} onOpenChange={() => setEditingForm(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Formulier naam bewerken</DialogTitle>
            <DialogDescription>
              Geef je formulier een herkenbare naam voor in het CRM
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="customName">Aangepaste naam</Label>
              <Input
                id="customName"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                placeholder="Bijv. Airco Installatie Leads"
              />
            </div>
            {editingForm?.formName && (
              <p className="text-sm text-zinc-500">
                Originele naam: <span className="font-medium">{editingForm.formName}</span>
              </p>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingForm(null)}>
              Annuleren
            </Button>
            <Button onClick={handleSaveName} disabled={isPending}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Opslaan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Fields Dialog */}
      <Dialog open={!!viewingFieldsForm} onOpenChange={() => setViewingFieldsForm(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Formulier velden</DialogTitle>
            <DialogDescription>
              {viewingFieldsForm?.customName || viewingFieldsForm?.formName}
            </DialogDescription>
          </DialogHeader>
          <div className="max-h-[400px] space-y-2 overflow-y-auto py-4">
            {viewingFieldsForm?.formFields.length === 0 ? (
              <p className="text-sm text-zinc-500">
                Geen velden gevonden. Probeer het formulier te synchroniseren.
              </p>
            ) : (
              viewingFieldsForm?.formFields.map((field, index) => (
                <div
                  key={field.key}
                  className="flex items-center justify-between rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 dark:border-zinc-700 dark:bg-zinc-800"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-100 text-sm font-medium text-violet-600 dark:bg-violet-900/30 dark:text-violet-400">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-zinc-900 dark:text-white">
                        {field.label}
                      </p>
                      <p className="text-xs text-zinc-500">{field.key}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {field.type}
                  </Badge>
                </div>
              ))
            )}
          </div>
          <DialogFooter>
            <div className="flex items-center gap-2 text-sm text-zinc-500">
              <FileText className="h-4 w-4" />
              {viewingFieldsForm?.formFields.length || 0} velden
            </div>
            <Button variant="outline" onClick={() => setViewingFieldsForm(null)}>
              Sluiten
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
