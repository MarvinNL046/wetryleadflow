import { requireAgencyOwner } from "@/lib/auth/agency";
import { getSaasDashboardStats, getOrCreateSaasSettings } from "@/lib/actions/agency-plans";
import { getStripeConnectStatus } from "@/lib/actions/stripe-connect";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Users,
  CreditCard,
  TrendingUp,
  Package,
  Settings,
  ExternalLink,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

export default async function SaasDashboardPage() {
  const membership = await requireAgencyOwner();
  const agency = membership.agency;

  // Redirect if not SaaS Pro tier
  if (agency.tier !== "saas_pro") {
    redirect("/agency/billing?upgrade=saas_pro");
  }

  const [stats, settings, connectStatus] = await Promise.all([
    getSaasDashboardStats(),
    getOrCreateSaasSettings(),
    getStripeConnectStatus(),
  ]);

  const isFullySetup =
    connectStatus.connected &&
    ("onboardingComplete" in connectStatus ? connectStatus.onboardingComplete : false) &&
    agency.saasMode;

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">SaaS Dashboard</h1>
        <p className="text-muted-foreground">
          Manage your white-label SaaS business
        </p>
      </div>

      {/* Setup Checklist */}
      {!isFullySetup && (
        <Card className="mb-8 border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-900/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-800 dark:text-amber-200">
              <AlertCircle className="h-5 w-5" />
              Complete Setup
            </CardTitle>
            <CardDescription className="text-amber-700 dark:text-amber-300">
              Complete these steps to start accepting client payments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                {connectStatus.connected ? (
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                ) : (
                  <div className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-amber-400 text-xs font-bold text-amber-600">
                    1
                  </div>
                )}
                <span className={connectStatus.connected ? "text-green-700" : ""}>
                  Connect Stripe account
                </span>
                {!connectStatus.connected && (
                  <Link href="/agency/billing/connect">
                    <Button size="sm" variant="outline">
                      Connect
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                )}
              </div>

              <div className="flex items-center gap-3">
                {stats.plansCount > 0 ? (
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                ) : (
                  <div className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-amber-400 text-xs font-bold text-amber-600">
                    2
                  </div>
                )}
                <span className={stats.plansCount > 0 ? "text-green-700" : ""}>
                  Create at least one pricing plan
                </span>
                {stats.plansCount === 0 && (
                  <Link href="/agency/saas/plans">
                    <Button size="sm" variant="outline">
                      Create Plan
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                )}
              </div>

              <div className="flex items-center gap-3">
                {agency.saasMode ? (
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                ) : (
                  <div className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-amber-400 text-xs font-bold text-amber-600">
                    3
                  </div>
                )}
                <span className={agency.saasMode ? "text-green-700" : ""}>
                  Enable SaaS mode
                </span>
                {!agency.saasMode && connectStatus.connected && (
                  <Link href="/agency/billing/connect">
                    <Button size="sm" variant="outline">
                      Enable
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats Grid */}
      <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalClients}</div>
            <p className="text-xs text-muted-foreground">
              {stats.trialingSubscriptions} on trial
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Subscriptions
            </CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeSubscriptions}</div>
            <p className="text-xs text-muted-foreground">Paying customers</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">MRR</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              &euro;{stats.mrr.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              Monthly Recurring Revenue
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pricing Plans</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.plansCount}</div>
            <p className="text-xs text-muted-foreground">Active plans</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Link href="/agency/saas/plans">
          <Card className="cursor-pointer transition-shadow hover:shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5 text-violet-500" />
                Pricing Plans
              </CardTitle>
              <CardDescription>
                Create and manage your subscription plans
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                Manage Plans
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </Link>

        <Link href="/agency/saas/settings">
          <Card className="cursor-pointer transition-shadow hover:shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-blue-500" />
                SaaS Settings
              </CardTitle>
              <CardDescription>
                Configure signup page and trial settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                Configure
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </Link>

        <Link href="/agency/saas/clients">
          <Card className="cursor-pointer transition-shadow hover:shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-green-500" />
                Client Subscriptions
              </CardTitle>
              <CardDescription>
                View and manage client billing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                View Clients
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Signup Link */}
      {isFullySetup && settings.selfSignupEnabled && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Client Signup Page</CardTitle>
            <CardDescription>
              Share this link with potential clients to let them sign up
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <code className="flex-1 rounded-lg bg-zinc-100 px-4 py-2 text-sm dark:bg-zinc-800">
                {typeof window !== "undefined"
                  ? `${window.location.origin}/${agency.slug}/signup`
                  : `https://yourapp.com/${agency.slug}/signup`}
              </code>
              <Button variant="outline" asChild>
                <a
                  href={`/${agency.slug}/signup`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Preview
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
