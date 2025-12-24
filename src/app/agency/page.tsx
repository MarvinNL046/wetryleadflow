import { requireAgencyMember } from "@/lib/auth/agency";
import { getAgencyStats } from "@/lib/actions/agency";
import { getOnboardingStatus } from "@/lib/actions/agency-onboarding";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Users, TrendingUp, CreditCard, ArrowUpRight, Plus } from "lucide-react";
import Link from "next/link";
import { OnboardingChecklist } from "@/components/agency/onboarding-checklist";
import { redirect } from "next/navigation";

export default async function AgencyDashboardPage() {
  const { agency, role } = await requireAgencyMember();
  const stats = await getAgencyStats();
  const onboarding = await getOnboardingStatus(agency.id);

  // Redirect to onboarding if profile not completed
  if (!agency.onboardingCompleted) {
    redirect("/agency/onboarding");
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-purple-600">
            {agency.logoUrl ? (
              <img src={agency.logoUrl} alt={agency.name} className="h-10 w-10 rounded-lg object-cover" />
            ) : (
              <Building2 className="h-6 w-6 text-white" />
            )}
          </div>
          <div>
            <h1 className="text-2xl font-bold">{agency.name}</h1>
            <p className="text-zinc-500">Agency Dashboard</p>
          </div>
        </div>
      </div>

      {/* Onboarding Checklist */}
      <OnboardingChecklist
        agency={{
          name: agency.name,
          slug: agency.slug,
          tier: agency.tier || "starter",
          logoUrl: agency.logoUrl,
          primaryColor: agency.primaryColor,
          appName: agency.appName,
          stripeCustomerId: agency.stripeCustomerId,
          saasMode: agency.saasMode || false,
        }}
        hasClients={onboarding.hasClients}
        hasStripeConnect={onboarding.hasStripeConnect}
        hasPricingPlans={onboarding.hasPricingPlans}
        hasSaasSettings={onboarding.hasSaasSettings}
      />

      {/* Stats Grid */}
      <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-zinc-200/50 bg-white/50 backdrop-blur-sm dark:border-zinc-800/50 dark:bg-zinc-900/50">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-400">
              <Building2 className="h-4 w-4 text-violet-500" />
              Clients
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.clientCount}</div>
            <p className="text-xs text-zinc-500">
              {agency.maxOrgs === -1 ? "unlimited" : `of ${agency.maxOrgs} available`}
            </p>
          </CardContent>
        </Card>

        <Card className="border-zinc-200/50 bg-white/50 backdrop-blur-sm dark:border-zinc-800/50 dark:bg-zinc-900/50">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-400">
              <Users className="h-4 w-4 text-blue-500" />
              Total Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.totalUsers}</div>
            <p className="text-xs text-zinc-500">across all clients</p>
          </CardContent>
        </Card>

        <Card className="border-zinc-200/50 bg-white/50 backdrop-blur-sm dark:border-zinc-800/50 dark:bg-zinc-900/50">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-400">
              <TrendingUp className="h-4 w-4 text-green-500" />
              Leads This Month
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.leadsThisMonth}</div>
            <p className="text-xs text-zinc-500">combined from all clients</p>
          </CardContent>
        </Card>

        <Card className="border-zinc-200/50 bg-white/50 backdrop-blur-sm dark:border-zinc-800/50 dark:bg-zinc-900/50">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-400">
              <CreditCard className="h-4 w-4 text-amber-500" />
              Subscription
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold capitalize">
              {agency.tier || "starter"}
            </div>
            <p className="text-xs text-zinc-500">
              {agency.subscriptionStatus === "trialing"
                ? "14 days trial"
                : agency.subscriptionStatus}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="mb-4 text-lg font-semibold">Quick Actions</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <Link
            href="/agency/clients"
            className="group flex items-center gap-4 rounded-xl border border-zinc-200/50 bg-white/50 p-4 transition-all hover:border-violet-300 hover:shadow-lg hover:shadow-violet-500/10 dark:border-zinc-800/50 dark:bg-zinc-900/50 dark:hover:border-violet-700"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-violet-100 text-violet-600 transition-colors group-hover:bg-violet-500 group-hover:text-white dark:bg-violet-900/50 dark:text-violet-400">
              <Plus className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium">Add New Client</h3>
              <p className="text-sm text-zinc-500">Onboard a new client organization</p>
            </div>
            <ArrowUpRight className="h-5 w-5 text-zinc-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-violet-500" />
          </Link>

          <Link
            href="/agency/branding"
            className="group flex items-center gap-4 rounded-xl border border-zinc-200/50 bg-white/50 p-4 transition-all hover:border-purple-300 hover:shadow-lg hover:shadow-purple-500/10 dark:border-zinc-800/50 dark:bg-zinc-900/50 dark:hover:border-purple-700"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 text-purple-600 transition-colors group-hover:bg-purple-500 group-hover:text-white dark:bg-purple-900/50 dark:text-purple-400">
              <span className="text-2xl">🎨</span>
            </div>
            <div className="flex-1">
              <h3 className="font-medium">Customize Branding</h3>
              <p className="text-sm text-zinc-500">Update logo, colors & app name</p>
            </div>
            <ArrowUpRight className="h-5 w-5 text-zinc-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-purple-500" />
          </Link>

          <Link
            href="/agency/team"
            className="group flex items-center gap-4 rounded-xl border border-zinc-200/50 bg-white/50 p-4 transition-all hover:border-blue-300 hover:shadow-lg hover:shadow-blue-500/10 dark:border-zinc-800/50 dark:bg-zinc-900/50 dark:hover:border-blue-700"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600 transition-colors group-hover:bg-blue-500 group-hover:text-white dark:bg-blue-900/50 dark:text-blue-400">
              <Users className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium">Invite Team Member</h3>
              <p className="text-sm text-zinc-500">Add colleagues to your agency</p>
            </div>
            <ArrowUpRight className="h-5 w-5 text-zinc-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-blue-500" />
          </Link>
        </div>
      </div>

      {/* Branding Preview */}
      {(role === "owner" || role === "admin") && (
        <div className="rounded-xl border border-zinc-200/50 bg-white/50 p-6 dark:border-zinc-800/50 dark:bg-zinc-900/50">
          <h2 className="mb-4 text-lg font-semibold">Your Branded CRM</h2>
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-3">
              {agency.logoUrl ? (
                <img
                  src={agency.logoUrl}
                  alt={agency.name}
                  className="h-10 w-10 rounded-lg object-cover"
                />
              ) : (
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-lg text-white"
                  style={{ backgroundColor: agency.primaryColor || "#8b5cf6" }}
                >
                  <span className="font-bold">{agency.name.charAt(0)}</span>
                </div>
              )}
              <span className="font-semibold">
                {agency.appName || agency.name}
              </span>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-zinc-100 px-3 py-1.5 dark:bg-zinc-800">
              <code className="text-sm text-zinc-600 dark:text-zinc-400">
                {agency.slug}.wetryleadflow.com
              </code>
            </div>
            <Link
              href={`/${agency.slug}/crm`}
              className="ml-auto text-sm font-medium text-violet-600 hover:text-violet-700 dark:text-violet-400"
            >
              Preview →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
