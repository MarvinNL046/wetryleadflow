import { requireAgencyOwner } from "@/lib/auth/agency";
import { getOrCreateSaasSettings } from "@/lib/actions/agency-plans";
import { redirect } from "next/navigation";
import { SaasSettingsForm } from "@/components/agency/saas-settings-form";

export default async function SaasSettingsPage() {
  const membership = await requireAgencyOwner();
  const agency = membership.agency;

  // Redirect if not SaaS Pro tier
  if (agency.tier !== "saas_pro") {
    redirect("/agency/billing?upgrade=saas_pro");
  }

  const settings = await getOrCreateSaasSettings();

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">SaaS Settings</h1>
        <p className="text-muted-foreground">
          Configure your client signup experience
        </p>
      </div>

      <SaasSettingsForm settings={settings} agencySlug={agency.slug} />
    </div>
  );
}
