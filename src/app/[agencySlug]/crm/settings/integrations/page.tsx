import Link from "next/link";
import { ArrowLeft, BarChart3, Search, Linkedin, Music2, Pin, Sparkles, Clock, Calendar, Megaphone, ArrowRight } from "lucide-react";
import { requireAuthContext } from "@/lib/auth/context";
import {
  getMetaConnectionStatus,
  getMetaPagesWithForms,
  getPipelinesForRouting,
  getWorkspaceMembers,
  getLeadRoutesWithMappings,
} from "@/lib/actions/integrations";
import { MetaConnectionCard } from "@/components/settings/integrations/meta-connection-card";
import { LeadRoutingConfig } from "@/components/settings/integrations/lead-routing-config";
import { FieldMappingConfig } from "@/components/settings/integrations/field-mapping-config";

// Upcoming integrations data
const upcomingIntegrations = [
  {
    id: "google-analytics",
    name: "Google Analytics 4",
    description: "View website traffic, user behavior, and conversion data directly in your CRM dashboard",
    icon: BarChart3,
    category: "Analytics",
    color: "from-orange-500 to-yellow-500",
    features: ["Website traffic metrics", "User behavior analytics", "Conversion tracking", "Real-time data"],
    status: "coming_soon" as const,
  },
  {
    id: "google-search-console",
    name: "Google Search Console",
    description: "Monitor search performance, keywords, and SEO metrics alongside your sales data",
    icon: Search,
    category: "Analytics",
    color: "from-blue-500 to-cyan-500",
    features: ["Search impressions & clicks", "Keyword rankings", "CTR analytics", "Page performance"],
    status: "coming_soon" as const,
  },
  {
    id: "google-calendar",
    name: "Google Calendar",
    description: "Sync appointments, schedule follow-ups, and manage meetings directly from your CRM",
    icon: Calendar,
    category: "Productivity",
    color: "from-green-500 to-emerald-600",
    features: ["Two-way sync", "Meeting scheduling", "Follow-up reminders", "Availability sharing"],
    status: "coming_soon" as const,
  },
  {
    id: "linkedin-lead-gen",
    name: "LinkedIn Lead Gen Forms",
    description: "Automatically import leads from your LinkedIn advertising campaigns",
    icon: Linkedin,
    category: "Lead Generation",
    color: "from-blue-600 to-blue-800",
    features: ["Auto-import leads", "Form submissions sync", "Campaign attribution", "B2B targeting"],
    status: "planned" as const,
  },
  {
    id: "tiktok-lead-gen",
    name: "TikTok Lead Generation",
    description: "Capture leads from TikTok ads and sync them to your pipeline",
    icon: Music2,
    category: "Lead Generation",
    color: "from-pink-500 to-violet-600",
    features: ["Lead form sync", "Video ad attribution", "Audience insights", "Gen-Z targeting"],
    status: "planned" as const,
  },
  {
    id: "pinterest-lead-ads",
    name: "Pinterest Lead Ads",
    description: "Import leads from Pinterest advertising campaigns automatically",
    icon: Pin,
    category: "Lead Generation",
    color: "from-red-500 to-red-700",
    features: ["Lead forms sync", "Pin attribution", "Visual discovery leads", "Shopping intent data"],
    status: "planned" as const,
  },
];

interface PageProps {
  params: Promise<{ agencySlug: string }>;
}

export default async function AgencyIntegrationsPage({ params }: PageProps) {
  const { agencySlug } = await params;
  await requireAuthContext();

  // Fetch all data in parallel
  const [metaStatus, pages, pipelines, members, routes] = await Promise.all([
    getMetaConnectionStatus(),
    getMetaPagesWithForms(),
    getPipelinesForRouting(),
    getWorkspaceMembers(),
    getLeadRoutesWithMappings(),
  ]);

  // Build the return URL for this agency's integrations page
  const returnUrl = `/${agencySlug}/crm/settings/integrations`;

  return (
    <div className="p-8">
      <div className="mb-8">
        <Link
          href={`/${agencySlug}/crm/settings`}
          className="mb-4 inline-flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
        >
          <ArrowLeft className="h-4 w-4" />
          Terug naar CRM Instellingen
        </Link>
        <h1 className="text-3xl font-bold">Integraties</h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Koppel externe diensten om automatisch leads te importeren
        </p>
      </div>

      <div className="space-y-8">
        {/* Meta (Facebook) Lead Ads Connection */}
        <section className="max-w-2xl">
          <MetaConnectionCard
            connected={metaStatus.connected}
            connection={metaStatus.connection}
            pages={metaStatus.pages}
            returnUrl={returnUrl}
          />

          {/* Forms Management Link */}
          {metaStatus.connected && (
            <Link
              href={`/${agencySlug}/crm/settings/integrations/meta/forms`}
              className="mt-4 flex items-center justify-between rounded-lg border border-zinc-200 bg-white p-4 transition-all hover:border-violet-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-violet-700"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-100 dark:bg-violet-900/30">
                  <Megaphone className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                </div>
                <div>
                  <h3 className="font-medium text-zinc-900 dark:text-white">
                    Lead Formulieren Beheren
                  </h3>
                  <p className="text-sm text-zinc-500">
                    Bekijk en beheer je Facebook/Instagram lead formulieren
                  </p>
                </div>
              </div>
              <ArrowRight className="h-5 w-5 text-zinc-400" />
            </Link>
          )}
        </section>

        {/* Lead Routing Configuration */}
        {metaStatus.connected && (
          <section className="max-w-4xl">
            <LeadRoutingConfig
              pages={pages}
              pipelines={pipelines}
              members={members}
              existingRoutes={routes}
            />
          </section>
        )}

        {/* Field Mapping Configuration */}
        {metaStatus.connected && routes.length > 0 && (
          <section className="max-w-4xl">
            <FieldMappingConfig routes={routes} />
          </section>
        )}

        {/* Upcoming Integrations */}
        <section className="max-w-4xl">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-purple-600">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Binnenkort Beschikbaar</h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Aankomende integraties waar we aan werken
              </p>
            </div>
          </div>

          {/* Analytics Integrations */}
          <div className="mb-6">
            <h3 className="mb-3 flex items-center gap-2 text-sm font-medium text-zinc-500 dark:text-zinc-400">
              <BarChart3 className="h-4 w-4" />
              Analytics & Insights
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {upcomingIntegrations
                .filter((i) => i.category === "Analytics")
                .map((integration) => (
                  <div
                    key={integration.id}
                    className="group relative overflow-hidden rounded-xl border border-zinc-200 bg-white p-5 transition-all hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
                  >
                    {/* Status badge */}
                    <div className="absolute right-3 top-3">
                      <span className="inline-flex items-center gap-1 rounded-full bg-violet-100 px-2 py-0.5 text-xs font-medium text-violet-700 dark:bg-violet-900/30 dark:text-violet-400">
                        <Clock className="h-3 w-3" />
                        Binnenkort
                      </span>
                    </div>

                    {/* Icon */}
                    <div
                      className={`mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${integration.color} opacity-90`}
                    >
                      <integration.icon className="h-6 w-6 text-white" />
                    </div>

                    {/* Content */}
                    <h4 className="mb-1 font-semibold text-zinc-900 dark:text-white">
                      {integration.name}
                    </h4>
                    <p className="mb-3 text-sm text-zinc-600 dark:text-zinc-400">
                      {integration.description}
                    </p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-1.5">
                      {integration.features.slice(0, 3).map((feature) => (
                        <span
                          key={feature}
                          className="rounded-md bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Productivity Integrations */}
          <div className="mb-6">
            <h3 className="mb-3 flex items-center gap-2 text-sm font-medium text-zinc-500 dark:text-zinc-400">
              <Calendar className="h-4 w-4" />
              Productiviteit & Planning
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {upcomingIntegrations
                .filter((i) => i.category === "Productivity")
                .map((integration) => (
                  <div
                    key={integration.id}
                    className="group relative overflow-hidden rounded-xl border border-zinc-200 bg-white p-5 transition-all hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
                  >
                    {/* Status badge */}
                    <div className="absolute right-3 top-3">
                      <span className="inline-flex items-center gap-1 rounded-full bg-violet-100 px-2 py-0.5 text-xs font-medium text-violet-700 dark:bg-violet-900/30 dark:text-violet-400">
                        <Clock className="h-3 w-3" />
                        Binnenkort
                      </span>
                    </div>

                    {/* Icon */}
                    <div
                      className={`mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${integration.color} opacity-90`}
                    >
                      <integration.icon className="h-6 w-6 text-white" />
                    </div>

                    {/* Content */}
                    <h4 className="mb-1 font-semibold text-zinc-900 dark:text-white">
                      {integration.name}
                    </h4>
                    <p className="mb-3 text-sm text-zinc-600 dark:text-zinc-400">
                      {integration.description}
                    </p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-1.5">
                      {integration.features.slice(0, 3).map((feature) => (
                        <span
                          key={feature}
                          className="rounded-md bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Lead Generation Integrations */}
          <div>
            <h3 className="mb-3 flex items-center gap-2 text-sm font-medium text-zinc-500 dark:text-zinc-400">
              <Sparkles className="h-4 w-4" />
              Lead Generatie Platforms
            </h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {upcomingIntegrations
                .filter((i) => i.category === "Lead Generation")
                .map((integration) => (
                  <div
                    key={integration.id}
                    className="group relative overflow-hidden rounded-xl border border-zinc-200 bg-white p-5 transition-all hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
                  >
                    {/* Status badge */}
                    <div className="absolute right-3 top-3">
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                        <Clock className="h-3 w-3" />
                        Gepland
                      </span>
                    </div>

                    {/* Icon */}
                    <div
                      className={`mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${integration.color} opacity-90`}
                    >
                      <integration.icon className="h-6 w-6 text-white" />
                    </div>

                    {/* Content */}
                    <h4 className="mb-1 font-semibold text-zinc-900 dark:text-white">
                      {integration.name}
                    </h4>
                    <p className="mb-3 text-sm text-zinc-600 dark:text-zinc-400">
                      {integration.description}
                    </p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-1.5">
                      {integration.features.slice(0, 2).map((feature) => (
                        <span
                          key={feature}
                          className="rounded-md bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Request Integration */}
          <div className="mt-6 rounded-lg border border-dashed border-zinc-300 bg-zinc-50/50 p-4 text-center dark:border-zinc-700 dark:bg-zinc-800/50">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Heb je een specifieke integratie nodig?{" "}
              <a
                href="mailto:support@leadflow.nl?subject=Integratie%20Aanvraag"
                className="font-medium text-violet-600 hover:text-violet-700 dark:text-violet-400"
              >
                Laat het ons weten
              </a>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
