"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChevronDown,
  Copy,
  Eye,
  Save,
  Loader2,
  Variable,
  Mail,
  User,
  Building,
  Target,
} from "lucide-react";
import { type EmailTemplate } from "@/lib/db/schema";
import {
  createEmailTemplate,
  updateEmailTemplate,
  previewEmailTemplate,
} from "@/lib/actions/email-templates";
import { EMAIL_TEMPLATE_VARIABLES } from "@/lib/email-templates/utils";
import { toast } from "sonner";

const TEMPLATE_TYPES = [
  { value: "custom", label: "Aangepast" },
  { value: "lead_notification", label: "Lead notificatie" },
  { value: "follow_up", label: "Follow-up" },
  { value: "quote_sent", label: "Offerte verstuurd" },
  { value: "invoice_sent", label: "Factuur verstuurd" },
  { value: "payment_reminder", label: "Betaalherinnering" },
  { value: "welcome", label: "Welkom" },
] as const;

interface EmailTemplateEditorProps {
  template?: EmailTemplate | null;
}

export function EmailTemplateEditor({ template }: EmailTemplateEditorProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");

  const [name, setName] = useState(template?.name || "");
  const [type, setType] = useState<EmailTemplate["type"]>(template?.type || "custom");
  const [subject, setSubject] = useState(template?.subject || "");
  const [bodyHtml, setBodyHtml] = useState(template?.bodyHtml || getDefaultTemplate());

  const [preview, setPreview] = useState<{ subject: string; html: string } | null>(null);
  const [variablesOpen, setVariablesOpen] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Naam is verplicht");
      return;
    }
    if (!subject.trim()) {
      toast.error("Onderwerp is verplicht");
      return;
    }
    if (!bodyHtml.trim()) {
      toast.error("E-mail inhoud is verplicht");
      return;
    }

    startTransition(async () => {
      try {
        const usedVars = extractUsedVariables(bodyHtml + subject);

        if (template) {
          await updateEmailTemplate(template.id, {
            name,
            type,
            subject,
            bodyHtml,
            variables: usedVars,
          });
          toast.success("Template bijgewerkt");
        } else {
          await createEmailTemplate({
            name,
            type,
            subject,
            bodyHtml,
            variables: usedVars,
          });
          toast.success("Template aangemaakt");
        }
        router.push("/crm/settings/email-templates");
        router.refresh();
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Fout bij opslaan");
      }
    });
  };

  const handlePreview = async () => {
    startTransition(async () => {
      try {
        const result = await previewEmailTemplate(bodyHtml, subject);
        setPreview(result);
        setActiveTab("preview");
      } catch {
        toast.error("Fout bij genereren preview");
      }
    });
  };

  const insertVariable = (variable: string) => {
    const varText = `{{${variable}}}`;

    // Try to insert at cursor position in textarea
    const textarea = document.querySelector('textarea[name="bodyHtml"]') as HTMLTextAreaElement;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newValue = bodyHtml.substring(0, start) + varText + bodyHtml.substring(end);
      setBodyHtml(newValue);

      // Restore focus and cursor position
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + varText.length, start + varText.length);
      }, 0);
    } else {
      setBodyHtml(bodyHtml + varText);
    }

    toast.success("Variabele ingevoegd");
  };

  const copyVariable = (variable: string) => {
    navigator.clipboard.writeText(`{{${variable}}}`);
    toast.success("Variabele gekopieerd");
  };

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, React.ReactNode> = {
      contact: <User className="h-4 w-4" />,
      opportunity: <Target className="h-4 w-4" />,
      workspace: <Building className="h-4 w-4" />,
      user: <Mail className="h-4 w-4" />,
    };
    return icons[category] || <Variable className="h-4 w-4" />;
  };

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      contact: "Contact",
      opportunity: "Opportunity",
      workspace: "Workspace",
      user: "Gebruiker",
    };
    return labels[category] || category;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Info */}
      <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="mb-4 font-semibold">Template details</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Naam *</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="bijv. Welkom nieuwe klant"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="type">Type</Label>
            <Select value={type} onValueChange={(v) => setType(v as EmailTemplate["type"])}>
              <SelectTrigger id="type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {TEMPLATE_TYPES.map((t) => (
                  <SelectItem key={t.value} value={t.value}>
                    {t.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Subject */}
      <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="mb-4 font-semibold">Onderwerp</h2>
        <Input
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="bijv. Welkom bij {{workspace.name}}!"
          required
        />
        <p className="mt-2 text-xs text-zinc-500">
          Gebruik variabelen zoals {"{{contact.firstName}}"} voor personalisatie
        </p>
      </div>

      {/* Editor with Variables Sidebar */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Variables Panel */}
        <div className="lg:col-span-1">
          <Collapsible open={variablesOpen} onOpenChange={setVariablesOpen}>
            <div className="rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
              <CollapsibleTrigger className="flex w-full items-center justify-between p-4">
                <div className="flex items-center gap-2">
                  <Variable className="h-4 w-4" />
                  <span className="font-semibold">Variabelen</span>
                </div>
                <ChevronDown className={`h-4 w-4 transition-transform ${variablesOpen ? "rotate-180" : ""}`} />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="space-y-4 border-t border-zinc-200 p-4 dark:border-zinc-800">
                  {Object.entries(EMAIL_TEMPLATE_VARIABLES).map(([category, vars]) => (
                    <div key={category}>
                      <div className="mb-2 flex items-center gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-400">
                        {getCategoryIcon(category)}
                        {getCategoryLabel(category)}
                      </div>
                      <div className="space-y-1">
                        {vars.map((v) => (
                          <div
                            key={v.key}
                            className="group flex items-center justify-between rounded-md p-2 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                          >
                            <div>
                              <code className="text-xs text-purple-600 dark:text-purple-400">
                                {`{{${v.key}}}`}
                              </code>
                              <p className="text-xs text-zinc-500">{v.label}</p>
                            </div>
                            <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() => insertVariable(v.key)}
                              >
                                <Variable className="h-3 w-3" />
                              </Button>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() => copyVariable(v.key)}
                              >
                                <Copy className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>
        </div>

        {/* Editor / Preview */}
        <div className="lg:col-span-2">
          <div className="rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "edit" | "preview")}>
              <div className="flex items-center justify-between border-b border-zinc-200 px-4 dark:border-zinc-800">
                <TabsList className="border-0 bg-transparent">
                  <TabsTrigger value="edit">Bewerken</TabsTrigger>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                </TabsList>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handlePreview}
                  disabled={isPending}
                >
                  <Eye className="mr-2 h-4 w-4" />
                  Preview genereren
                </Button>
              </div>

              <TabsContent value="edit" className="m-0 p-4">
                <Textarea
                  name="bodyHtml"
                  value={bodyHtml}
                  onChange={(e) => setBodyHtml(e.target.value)}
                  placeholder="<p>Beste {{contact.firstName}},</p>..."
                  className="min-h-[400px] font-mono text-sm"
                  required
                />
                <p className="mt-2 text-xs text-zinc-500">
                  Gebruik HTML voor opmaak. Inline styles worden aanbevolen voor e-mail compatibiliteit.
                </p>
              </TabsContent>

              <TabsContent value="preview" className="m-0">
                {preview ? (
                  <div className="p-4">
                    <div className="mb-4 rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
                      <div className="text-sm text-zinc-500">Onderwerp:</div>
                      <div className="font-medium">{preview.subject}</div>
                    </div>
                    <div className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
                      <div
                        className="prose prose-sm max-w-none dark:prose-invert"
                        dangerouslySetInnerHTML={{ __html: preview.html }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex h-[400px] items-center justify-center text-zinc-500">
                    <div className="text-center">
                      <Eye className="mx-auto h-8 w-8 opacity-50" />
                      <p className="mt-2">Klik op &quot;Preview genereren&quot; om een voorbeeld te zien</p>
                    </div>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Used Variables */}
      {bodyHtml && (
        <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center gap-2 text-sm text-zinc-500">
            <span>Gebruikte variabelen:</span>
            {extractUsedVariables(bodyHtml + subject).map((v) => (
              <Badge key={v} variant="secondary" className="text-xs">
                {v}
              </Badge>
            ))}
            {extractUsedVariables(bodyHtml + subject).length === 0 && (
              <span className="text-zinc-400">Geen variabelen gevonden</span>
            )}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/crm/settings/email-templates")}
        >
          Annuleren
        </Button>
        <Button type="submit" disabled={isPending}>
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Opslaan...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              {template ? "Bijwerken" : "Aanmaken"}
            </>
          )}
        </Button>
      </div>
    </form>
  );
}

function getDefaultTemplate(): string {
  return `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <p>Beste {{contact.firstName}},</p>

  <p>Bedankt voor je interesse!</p>

  <p>Met vriendelijke groet,<br>
  {{user.name}}<br>
  {{workspace.name}}</p>
</div>`;
}

function extractUsedVariables(text: string): string[] {
  const regex = /\{\{\s*([a-zA-Z_.]+)\s*\}\}/g;
  const matches = new Set<string>();
  let match;
  while ((match = regex.exec(text)) !== null) {
    matches.add(match[1]);
  }
  return Array.from(matches);
}
