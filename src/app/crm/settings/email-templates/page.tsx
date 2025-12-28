import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail, Plus } from "lucide-react";
import { getEmailTemplates } from "@/lib/actions/email-templates";
import { EmailTemplatesList } from "@/components/crm/email-templates-list";

export default async function EmailTemplatesPage() {
  const templates = await getEmailTemplates();

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Header */}
      <div className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto max-w-5xl px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" asChild className="rounded-lg">
                <Link href="/crm/settings">
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </Button>
              <div>
                <h1 className="text-2xl font-bold">E-mail Templates</h1>
                <p className="mt-1 text-zinc-500">
                  Beheer aangepaste e-mail templates voor je communicatie
                </p>
              </div>
            </div>
            <Button asChild>
              <Link href="/crm/settings/email-templates/new">
                <Plus className="mr-2 h-4 w-4" />
                Nieuwe template
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl p-8">
        {/* Info Card */}
        <div className="mb-8 rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/50">
              <Mail className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h2 className="font-semibold">Wat zijn e-mail templates?</h2>
              <p className="mt-1 text-sm text-zinc-500">
                E-mail templates zijn voorgedefinieerde berichten die je kunt gebruiken om snel
                professionele e-mails te versturen. Gebruik variabelen zoals{" "}
                <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-800">
                  {"{{contact.firstName}}"}
                </code>{" "}
                om automatisch klantgegevens in te vullen.
              </p>
            </div>
          </div>
        </div>

        {/* Templates List */}
        <EmailTemplatesList templates={templates} />
      </div>
    </div>
  );
}
