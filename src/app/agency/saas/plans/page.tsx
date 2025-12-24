import { requireAgencyOwner } from "@/lib/auth/agency";
import { getAgencyPlans } from "@/lib/actions/agency-plans";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Check, Users } from "lucide-react";

export default async function PlansPage() {
  const membership = await requireAgencyOwner();
  const agency = membership.agency;

  // Redirect if not SaaS Pro tier
  if (agency.tier !== "saas_pro") {
    redirect("/agency/billing?upgrade=saas_pro");
  }

  const plans = await getAgencyPlans();

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Pricing Plans</h1>
          <p className="text-muted-foreground">
            Create and manage subscription plans for your clients
          </p>
        </div>
        <Link href="/agency/saas/plans/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Plan
          </Button>
        </Link>
      </div>

      {plans.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="mb-4 rounded-full bg-violet-100 p-4 dark:bg-violet-900/30">
              <Plus className="h-8 w-8 text-violet-600 dark:text-violet-400" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">No plans yet</h3>
            <p className="mb-6 max-w-sm text-center text-muted-foreground">
              Create your first pricing plan to start accepting client signups
            </p>
            <Link href="/agency/saas/plans/new">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create First Plan
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={!plan.isActive ? "opacity-60" : undefined}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {plan.name}
                      {plan.isDefault && (
                        <Badge variant="secondary" className="text-xs">
                          Default
                        </Badge>
                      )}
                    </CardTitle>
                    <CardDescription className="mt-1">
                      {plan.description || "No description"}
                    </CardDescription>
                  </div>
                  {!plan.isActive && (
                    <Badge variant="outline" className="text-xs">
                      Archived
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="text-3xl font-bold">
                    &euro;{plan.priceMonthly}
                    <span className="text-base font-normal text-muted-foreground">
                      /month
                    </span>
                  </div>
                  {plan.priceYearly && (
                    <div className="text-sm text-muted-foreground">
                      &euro;{plan.priceYearly}/year
                    </div>
                  )}
                </div>

                {/* Limits */}
                <div className="mb-4 space-y-2 border-t pt-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Contacts</span>
                    <span className="font-medium">
                      {plan.maxContacts === -1 || !plan.maxContacts
                        ? "Unlimited"
                        : plan.maxContacts.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Pipelines</span>
                    <span className="font-medium">
                      {plan.maxPipelines === -1 || !plan.maxPipelines
                        ? "Unlimited"
                        : plan.maxPipelines}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Users</span>
                    <span className="font-medium">
                      {plan.maxUsers === -1 || !plan.maxUsers
                        ? "Unlimited"
                        : plan.maxUsers}
                    </span>
                  </div>
                </div>

                {/* Features */}
                {plan.features && (plan.features as string[]).length > 0 && (
                  <div className="mb-4 border-t pt-4">
                    <p className="mb-2 text-sm font-medium">Features</p>
                    <ul className="space-y-1">
                      {(plan.features as string[]).slice(0, 4).map((feature, i) => (
                        <li
                          key={i}
                          className="flex items-center text-sm text-muted-foreground"
                        >
                          <Check className="mr-2 h-4 w-4 text-green-500" />
                          {feature}
                        </li>
                      ))}
                      {(plan.features as string[]).length > 4 && (
                        <li className="text-sm text-muted-foreground">
                          +{(plan.features as string[]).length - 4} more
                        </li>
                      )}
                    </ul>
                  </div>
                )}

                <Link href={`/agency/saas/plans/${plan.id}`}>
                  <Button variant="outline" className="w-full">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Plan
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
