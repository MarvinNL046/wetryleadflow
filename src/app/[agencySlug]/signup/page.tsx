import { notFound } from "next/navigation";
import {
  getAgencyBySlug,
  getAgencySaasSettings,
  getAgencyPricingPlans,
} from "@/lib/actions/agency-saas";
import { ClientSignupForm } from "@/components/agency/client-signup-form";

interface Props {
  params: Promise<{ agencySlug: string }>;
  searchParams: Promise<{ plan?: string }>;
}

export default async function ClientSignupPage({ params, searchParams }: Props) {
  const { agencySlug } = await params;
  const { plan: selectedPlanId } = await searchParams;

  // Get agency
  const agency = await getAgencyBySlug(agencySlug);

  if (!agency || !agency.saasMode) {
    notFound();
  }

  // Get SaaS settings
  const settings = await getAgencySaasSettings(agency.id);

  if (!settings?.selfSignupEnabled) {
    notFound();
  }

  // Get pricing plans
  const plans = await getAgencyPricingPlans(agency.id);

  if (plans.length === 0) {
    notFound();
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-blue-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950"
      style={{
        "--primary-color": agency.primaryColor || "#8b5cf6",
        "--secondary-color": agency.secondaryColor || "#3b82f6",
      } as React.CSSProperties}
    >
      <div className="mx-auto max-w-4xl px-4 py-16">
        {/* Agency Header */}
        <div className="mb-12 text-center">
          {agency.logoUrl && (
            <img
              src={agency.logoUrl}
              alt={agency.appName || agency.name}
              className="mx-auto mb-4 h-16 w-auto"
            />
          )}
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            {settings?.signupPageTitle || `Welcome to ${agency.appName || agency.name}`}
          </h1>
          {settings?.signupPageDescription && (
            <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
              {settings.signupPageDescription}
            </p>
          )}
        </div>

        {/* Signup Form */}
        <ClientSignupForm
          agency={agency}
          settings={settings}
          plans={plans}
          selectedPlanId={selectedPlanId ? parseInt(selectedPlanId) : undefined}
        />

        {/* Footer Links */}
        {(settings?.termsUrl || settings?.privacyUrl) && (
          <div className="mt-8 text-center text-sm text-zinc-500">
            By signing up, you agree to our{" "}
            {settings.termsUrl && (
              <a
                href={settings.termsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-zinc-700"
              >
                Terms of Service
              </a>
            )}
            {settings.termsUrl && settings.privacyUrl && " and "}
            {settings.privacyUrl && (
              <a
                href={settings.privacyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-zinc-700"
              >
                Privacy Policy
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
