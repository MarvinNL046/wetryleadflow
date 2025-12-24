import { requireAgencyOwner } from "@/lib/auth/agency";
import { getStripeConnectStatus } from "@/lib/actions/stripe-connect";
import { StripeConnectCard } from "@/components/agency/stripe-connect-card";
import { redirect } from "next/navigation";

export default async function StripeConnectPage() {
  const membership = await requireAgencyOwner();
  const agency = membership.agency;

  // Redirect if not SaaS Pro tier
  if (agency.tier !== "saas_pro") {
    redirect("/agency/billing?upgrade=saas_pro");
  }

  const connectStatus = await getStripeConnectStatus();

  // Normalize status for component
  const normalizedStatus = {
    connected: connectStatus.connected,
    accountId: "accountId" in connectStatus ? connectStatus.accountId : undefined,
    chargesEnabled: "chargesEnabled" in connectStatus ? connectStatus.chargesEnabled : undefined,
    payoutsEnabled: "payoutsEnabled" in connectStatus ? connectStatus.payoutsEnabled : undefined,
    detailsSubmitted: "detailsSubmitted" in connectStatus ? connectStatus.detailsSubmitted : undefined,
    onboardingComplete: "onboardingComplete" in connectStatus ? connectStatus.onboardingComplete : undefined,
    dashboardUrl: "dashboardUrl" in connectStatus ? connectStatus.dashboardUrl : undefined,
    requirements: "requirements" in connectStatus && connectStatus.requirements ? {
      currently_due: connectStatus.requirements.currently_due ?? null,
      eventually_due: connectStatus.requirements.eventually_due ?? null,
      past_due: connectStatus.requirements.past_due ?? null,
    } : null,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Stripe Connect</h1>
        <p className="text-muted-foreground">
          Connect your Stripe account to bill your clients directly
        </p>
      </div>

      <StripeConnectCard
        status={normalizedStatus}
        agencyName={agency.name}
        saasMode={agency.saasMode}
      />
    </div>
  );
}
