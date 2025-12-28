import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { getEmailTemplate } from "@/lib/actions/email-templates";
import { EmailTemplateEditor } from "@/components/crm/email-template-editor";

interface EditEmailTemplatePageProps {
  params: Promise<{ agencySlug: string; id: string }>;
}

export default async function EditEmailTemplatePage({ params }: EditEmailTemplatePageProps) {
  const { agencySlug, id } = await params;
  const templateId = parseInt(id, 10);

  if (isNaN(templateId)) {
    notFound();
  }

  const template = await getEmailTemplate(templateId);

  if (!template) {
    notFound();
  }

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
              <h1 className="text-2xl font-bold">Template bewerken</h1>
              <p className="mt-1 text-zinc-500">{template.name}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl p-8">
        <EmailTemplateEditor template={template} />
      </div>
    </div>
  );
}
