import { requireAgencyOwner } from "@/lib/auth/agency";
import { redirect } from "next/navigation";
import { PlanEditor } from "@/components/agency/plan-editor";

export default async function NewPlanPage() {
  const membership = await requireAgencyOwner();
  const agency = membership.agency;

  // Redirect if not SaaS Pro tier
  if (agency.tier !== "saas_pro") {
    redirect("/agency/billing?upgrade=saas_pro");
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Create New Plan</h1>
        <p className="text-muted-foreground">
          Set up a new pricing plan for your clients
        </p>
      </div>

      <PlanEditor mode="create" />
    </div>
  );
}
