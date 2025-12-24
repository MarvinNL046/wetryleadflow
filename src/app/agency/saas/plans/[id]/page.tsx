import { requireAgencyOwner } from "@/lib/auth/agency";
import { getAgencyPlan } from "@/lib/actions/agency-plans";
import { redirect, notFound } from "next/navigation";
import { PlanEditor } from "@/components/agency/plan-editor";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditPlanPage({ params }: Props) {
  const { id } = await params;
  const membership = await requireAgencyOwner();
  const agency = membership.agency;

  // Redirect if not SaaS Pro tier
  if (agency.tier !== "saas_pro") {
    redirect("/agency/billing?upgrade=saas_pro");
  }

  const plan = await getAgencyPlan(parseInt(id));

  if (!plan) {
    notFound();
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Edit Plan</h1>
        <p className="text-muted-foreground">
          Update your pricing plan settings
        </p>
      </div>

      <PlanEditor mode="edit" plan={plan} />
    </div>
  );
}
