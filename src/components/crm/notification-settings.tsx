"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Bell,
  Mail,
  FileText,
  UserPlus,
  Clock,
  AlertCircle,
  FileCheck,
  Receipt,
  Send,
  Sparkles,
  RotateCcw,
  Loader2,
  ExternalLink,
} from "lucide-react";
import { type EmailTemplate } from "@/lib/db/schema";
import {
  updateNotificationPreference,
  resetNotificationPreference,
} from "@/lib/actions/notification-preferences";
import {
  NOTIFICATION_EVENTS,
  NOTIFICATION_MODES,
  type NotificationEventType,
  type NotificationModeType,
} from "@/lib/notifications/utils";
import { toast } from "sonner";

interface NotificationPreferenceWithTemplate {
  id: number;
  workspaceId: number;
  eventType: NotificationEventType;
  mode: NotificationModeType;
  customTemplateId: number | null;
  emailEnabled: boolean;
  createdAt: Date;
  updatedAt: Date;
  templateName: string | null;
}

interface NotificationSettingsProps {
  preferences: NotificationPreferenceWithTemplate[];
  templates: EmailTemplate[];
}

const EVENT_ICONS: Record<NotificationEventType, React.ReactNode> = {
  new_lead: <UserPlus className="h-5 w-5" />,
  lead_assigned: <UserPlus className="h-5 w-5" />,
  follow_up_reminder: <Clock className="h-5 w-5" />,
  lead_lost: <AlertCircle className="h-5 w-5" />,
  invoice_sent: <Receipt className="h-5 w-5" />,
  invoice_reminder: <Clock className="h-5 w-5" />,
  quote_sent: <FileCheck className="h-5 w-5" />,
  team_invite: <Send className="h-5 w-5" />,
  welcome: <Sparkles className="h-5 w-5" />,
};

const EVENT_CATEGORIES = {
  leads: {
    label: "Leads",
    events: ["new_lead", "lead_assigned", "follow_up_reminder", "lead_lost"] as NotificationEventType[],
  },
  invoicing: {
    label: "Facturatie",
    events: ["invoice_sent", "invoice_reminder", "quote_sent"] as NotificationEventType[],
  },
  team: {
    label: "Team & Account",
    events: ["team_invite", "welcome"] as NotificationEventType[],
  },
};

export function NotificationSettings({ preferences, templates }: NotificationSettingsProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [loadingEvent, setLoadingEvent] = useState<NotificationEventType | null>(null);

  // Create a map of preferences by event type
  const prefMap = new Map<NotificationEventType, NotificationPreferenceWithTemplate>();
  for (const pref of preferences) {
    prefMap.set(pref.eventType, pref);
  }

  const getPreference = (eventType: NotificationEventType) => {
    return prefMap.get(eventType) || {
      eventType,
      mode: "system_default" as NotificationModeType,
      emailEnabled: true,
      customTemplateId: null,
      templateName: null,
    };
  };

  const handleModeChange = async (eventType: NotificationEventType, mode: NotificationModeType) => {
    setLoadingEvent(eventType);
    startTransition(async () => {
      try {
        const pref = getPreference(eventType);
        await updateNotificationPreference(eventType, {
          mode,
          customTemplateId: mode === "custom_template" ? pref.customTemplateId : null,
          emailEnabled: pref.emailEnabled,
        });
        toast.success("Instellingen opgeslagen");
        router.refresh();
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Fout bij opslaan");
      } finally {
        setLoadingEvent(null);
      }
    });
  };

  const handleTemplateChange = async (eventType: NotificationEventType, templateId: string) => {
    setLoadingEvent(eventType);
    startTransition(async () => {
      try {
        const pref = getPreference(eventType);
        await updateNotificationPreference(eventType, {
          mode: "custom_template",
          customTemplateId: templateId ? parseInt(templateId) : null,
          emailEnabled: pref.emailEnabled,
        });
        toast.success("Template geselecteerd");
        router.refresh();
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Fout bij opslaan");
      } finally {
        setLoadingEvent(null);
      }
    });
  };

  const handleToggle = async (eventType: NotificationEventType, enabled: boolean) => {
    setLoadingEvent(eventType);
    startTransition(async () => {
      try {
        const pref = getPreference(eventType);
        await updateNotificationPreference(eventType, {
          mode: enabled ? (pref.mode === "disabled" ? "system_default" : pref.mode) : "disabled",
          customTemplateId: pref.customTemplateId,
          emailEnabled: enabled,
        });
        toast.success(enabled ? "Notificatie ingeschakeld" : "Notificatie uitgeschakeld");
        router.refresh();
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Fout bij opslaan");
      } finally {
        setLoadingEvent(null);
      }
    });
  };

  const handleReset = async (eventType: NotificationEventType) => {
    setLoadingEvent(eventType);
    startTransition(async () => {
      try {
        await resetNotificationPreference(eventType);
        toast.success("Teruggezet naar standaard");
        router.refresh();
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Fout bij resetten");
      } finally {
        setLoadingEvent(null);
      }
    });
  };

  const activeTemplates = templates.filter((t) => t.isActive);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Notificatie instellingen</h1>
          <p className="text-zinc-500">
            Configureer wanneer en hoe je e-mail notificaties ontvangt
          </p>
        </div>
        <Button asChild variant="outline">
          <Link href="/crm/settings/email-templates">
            <FileText className="mr-2 h-4 w-4" />
            E-mail templates beheren
          </Link>
        </Button>
      </div>

      {/* Categories */}
      {Object.entries(EVENT_CATEGORIES).map(([categoryKey, category]) => (
        <div key={categoryKey} className="space-y-4">
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <Bell className="h-5 w-5 text-purple-500" />
            {category.label}
          </h2>

          <div className="space-y-4">
            {category.events.map((eventType) => {
              const event = NOTIFICATION_EVENTS[eventType];
              const pref = getPreference(eventType);
              const isLoading = loadingEvent === eventType && isPending;
              const isEnabled = pref.emailEnabled && pref.mode !== "disabled";

              return (
                <div
                  key={eventType}
                  className={`rounded-lg border p-4 transition-colors ${
                    isEnabled
                      ? "border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"
                      : "border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/50"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    {/* Event Info */}
                    <div className="flex items-start gap-3">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                          isEnabled
                            ? "bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400"
                            : "bg-zinc-100 text-zinc-400 dark:bg-zinc-800"
                        }`}
                      >
                        {EVENT_ICONS[eventType]}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{event.label}</h3>
                          {pref.mode === "custom_template" && pref.templateName && (
                            <Badge variant="secondary" className="text-xs">
                              {pref.templateName}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-zinc-500">{event.description}</p>
                      </div>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center gap-4">
                      {isLoading && <Loader2 className="h-4 w-4 animate-spin text-zinc-400" />}

                      <Switch
                        checked={isEnabled}
                        onCheckedChange={(checked) => handleToggle(eventType, checked)}
                        disabled={isPending}
                      />
                    </div>
                  </div>

                  {/* Configuration (shown when enabled) */}
                  {isEnabled && (
                    <div className="mt-4 grid gap-4 border-t border-zinc-200 pt-4 dark:border-zinc-800 sm:grid-cols-2">
                      {/* Mode Selection */}
                      <div className="space-y-2">
                        <Label className="text-sm text-zinc-500">E-mail template</Label>
                        <Select
                          value={pref.mode}
                          onValueChange={(value) =>
                            handleModeChange(eventType, value as NotificationModeType)
                          }
                          disabled={isPending}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="system_default">
                              <div className="flex items-center gap-2">
                                <Mail className="h-4 w-4" />
                                {NOTIFICATION_MODES.system_default.label}
                              </div>
                            </SelectItem>
                            <SelectItem value="custom_template">
                              <div className="flex items-center gap-2">
                                <FileText className="h-4 w-4" />
                                {NOTIFICATION_MODES.custom_template.label}
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Custom Template Selection */}
                      {pref.mode === "custom_template" && (
                        <div className="space-y-2">
                          <Label className="text-sm text-zinc-500">Selecteer template</Label>
                          {activeTemplates.length > 0 ? (
                            <Select
                              value={pref.customTemplateId?.toString() || ""}
                              onValueChange={(value) => handleTemplateChange(eventType, value)}
                              disabled={isPending}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Kies een template..." />
                              </SelectTrigger>
                              <SelectContent>
                                {activeTemplates.map((template) => (
                                  <SelectItem key={template.id} value={template.id.toString()}>
                                    {template.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          ) : (
                            <div className="rounded-md border border-dashed border-zinc-300 p-3 text-center dark:border-zinc-700">
                              <p className="text-sm text-zinc-500">
                                Geen templates beschikbaar
                              </p>
                              <Button asChild variant="link" size="sm" className="mt-1">
                                <Link href="/crm/settings/email-templates/new">
                                  <ExternalLink className="mr-1 h-3 w-3" />
                                  Template maken
                                </Link>
                              </Button>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Reset Button */}
                      {(pref.mode !== "system_default" || !pref.emailEnabled) && (
                        <div className="flex items-end sm:col-span-2">
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleReset(eventType)}
                            disabled={isPending}
                            className="text-zinc-500"
                          >
                            <RotateCcw className="mr-2 h-3 w-3" />
                            Terug naar standaard
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {/* Info Section */}
      <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-900 dark:bg-blue-950/50">
        <div className="flex gap-3">
          <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <div>
            <h3 className="font-medium text-blue-900 dark:text-blue-100">
              Over e-mail notificaties
            </h3>
            <p className="mt-1 text-sm text-blue-700 dark:text-blue-300">
              Deze instellingen bepalen wanneer en welke e-mails er worden verstuurd vanuit
              LeadFlow. Je kunt kiezen om de standaard templates te gebruiken of je eigen
              aangepaste templates in te stellen voor een persoonlijke touch.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
