import Link from "next/link";
import { ArrowLeft, Facebook } from "lucide-react";
import { requireAuthContext } from "@/lib/auth/context";
import { getMetaFormsWithStats, getMetaConnectionStatus } from "@/lib/actions/integrations";
import { redirect } from "next/navigation";
import { MetaFormsManager } from "@/components/settings/integrations/meta-forms-manager";

interface PageProps {
  params: Promise<{ agencySlug: string }>;
}

export default async function AgencyMetaFormsPage({ params }: PageProps) {
  const { agencySlug } = await params;
  await requireAuthContext();

  // Check if Meta is connected
  const metaStatus = await getMetaConnectionStatus();

  if (!metaStatus.connected) {
    redirect(`/${agencySlug}/crm/settings/integrations`);
  }

  const forms = await getMetaFormsWithStats();

  return (
    <div className="p-8">
      <div className="mb-8">
        <Link
          href={`/${agencySlug}/crm/settings/integrations`}
          className="mb-4 inline-flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
        >
          <ArrowLeft className="h-4 w-4" />
          Terug naar Integraties
        </Link>

        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
            <Facebook className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Meta Lead Forms</h1>
            <p className="mt-1 text-zinc-600 dark:text-zinc-400">
              Beheer je Facebook en Instagram lead formulieren
            </p>
          </div>
        </div>
      </div>

      <MetaFormsManager forms={forms} />
    </div>
  );
}
