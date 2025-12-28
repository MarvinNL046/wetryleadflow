"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  MoreHorizontal,
  Pencil,
  Copy,
  Trash2,
  ToggleLeft,
  ToggleRight,
  Mail,
  FileText,
} from "lucide-react";
import { type EmailTemplate } from "@/lib/db/schema";
import {
  deleteEmailTemplate,
  duplicateEmailTemplate,
  toggleEmailTemplate,
} from "@/lib/actions/email-templates";
import { getTemplateTypeLabel } from "@/lib/email-templates/utils";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";
import { nl } from "date-fns/locale";

interface EmailTemplatesListProps {
  templates: EmailTemplate[];
}

export function EmailTemplatesList({ templates }: EmailTemplatesListProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const handleDuplicate = async (id: number) => {
    startTransition(async () => {
      try {
        await duplicateEmailTemplate(id);
        toast.success("Template gedupliceerd");
        router.refresh();
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Fout bij dupliceren");
      }
    });
  };

  const handleToggle = async (id: number, currentActive: boolean) => {
    startTransition(async () => {
      try {
        await toggleEmailTemplate(id, !currentActive);
        toast.success(currentActive ? "Template gedeactiveerd" : "Template geactiveerd");
        router.refresh();
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Fout bij wijzigen");
      }
    });
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    startTransition(async () => {
      try {
        await deleteEmailTemplate(deleteId);
        toast.success("Template verwijderd");
        setDeleteId(null);
        router.refresh();
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Fout bij verwijderen");
      }
    });
  };

  const getTypeBadgeColor = (type: EmailTemplate["type"]) => {
    const colors: Record<string, string> = {
      lead_notification: "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300",
      follow_up: "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300",
      quote_sent: "bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300",
      invoice_sent: "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300",
      payment_reminder: "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300",
      welcome: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/50 dark:text-cyan-300",
      custom: "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300",
    };
    return colors[type] || colors.custom;
  };

  if (templates.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-zinc-300 bg-white p-12 text-center dark:border-zinc-700 dark:bg-zinc-900">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
          <FileText className="h-6 w-6 text-zinc-400" />
        </div>
        <h3 className="mt-4 font-semibold">Geen templates</h3>
        <p className="mt-1 text-sm text-zinc-500">
          Maak je eerste e-mail template om te beginnen
        </p>
        <Button asChild className="mt-4">
          <Link href="/crm/settings/email-templates/new">Template maken</Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4">
        {templates.map((template) => (
          <div
            key={template.id}
            className="group relative rounded-lg border border-zinc-200 bg-white p-4 transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                    template.isActive
                      ? "bg-purple-100 dark:bg-purple-900/50"
                      : "bg-zinc-100 dark:bg-zinc-800"
                  }`}
                >
                  <Mail
                    className={`h-5 w-5 ${
                      template.isActive
                        ? "text-purple-600 dark:text-purple-400"
                        : "text-zinc-400"
                    }`}
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{template.name}</h3>
                    <Badge variant="secondary" className={getTypeBadgeColor(template.type)}>
                      {getTemplateTypeLabel(template.type)}
                    </Badge>
                    {!template.isActive && (
                      <Badge variant="outline" className="text-zinc-500">
                        Inactief
                      </Badge>
                    )}
                    {template.isDefault && (
                      <Badge variant="outline" className="border-purple-200 text-purple-600">
                        Standaard
                      </Badge>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-zinc-500 line-clamp-1">
                    Onderwerp: {template.subject}
                  </p>
                  <div className="mt-2 flex items-center gap-4 text-xs text-zinc-400">
                    <span>
                      Aangemaakt{" "}
                      {formatDistanceToNow(new Date(template.createdAt), {
                        addSuffix: true,
                        locale: nl,
                      })}
                    </span>
                    {template.usageCount > 0 && (
                      <span>{template.usageCount}x gebruikt</span>
                    )}
                    {template.lastUsedAt && (
                      <span>
                        Laatst gebruikt{" "}
                        {formatDistanceToNow(new Date(template.lastUsedAt), {
                          addSuffix: true,
                          locale: nl,
                        })}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="opacity-0 group-hover:opacity-100"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href={`/crm/settings/email-templates/${template.id}`}>
                      <Pencil className="mr-2 h-4 w-4" />
                      Bewerken
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleDuplicate(template.id)}
                    disabled={isPending}
                  >
                    <Copy className="mr-2 h-4 w-4" />
                    Dupliceren
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleToggle(template.id, template.isActive)}
                    disabled={isPending}
                  >
                    {template.isActive ? (
                      <>
                        <ToggleLeft className="mr-2 h-4 w-4" />
                        Deactiveren
                      </>
                    ) : (
                      <>
                        <ToggleRight className="mr-2 h-4 w-4" />
                        Activeren
                      </>
                    )}
                  </DropdownMenuItem>
                  {!template.isDefault && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => setDeleteId(template.id)}
                        className="text-red-600"
                        disabled={isPending}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Verwijderen
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
      </div>

      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Template verwijderen?</AlertDialogTitle>
            <AlertDialogDescription>
              Weet je zeker dat je deze template wilt verwijderen? Dit kan niet ongedaan
              worden gemaakt.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuleren</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
              disabled={isPending}
            >
              Verwijderen
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
