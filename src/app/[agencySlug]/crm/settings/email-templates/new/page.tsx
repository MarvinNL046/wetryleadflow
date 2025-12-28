import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { EmailTemplateEditor } from "@/components/crm/email-template-editor";

interface NewEmailTemplatePageProps {
  params: Promise<{ agencySlug: string }>;
}

export default async function NewEmailTemplatePage({ params }: NewEmailTemplatePageProps) {
  const { agencySlug } = await params;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Header */}
      <div className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto max-w-5xl px-8 py-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild className="rounded-lg">
              <Link href={`/${agencySlug}/crm/settings/email-templates`}>
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Nieuwe template</h1>
              <p className="mt-1 text-zinc-500">
                Maak een nieuwe e-mail template aan
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl p-8">
        <EmailTemplateEditor />
      </div>
    </div>
  );
}
