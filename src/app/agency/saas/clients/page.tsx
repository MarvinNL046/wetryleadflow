import { requireAgencyOwner } from "@/lib/auth/agency";
import { getClientSubscriptions } from "@/lib/actions/agency-plans";
import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDistanceToNow } from "date-fns";
import { Users } from "lucide-react";

export default async function ClientsPage() {
  const membership = await requireAgencyOwner();
  const agency = membership.agency;

  // Redirect if not SaaS Pro tier
  if (agency.tier !== "saas_pro") {
    redirect("/agency/billing?upgrade=saas_pro");
  }

  const subscriptions = await getClientSubscriptions();

  const statusColors: Record<string, string> = {
    active: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    trialing: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    past_due: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    canceled: "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400",
    incomplete: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">
          Client Subscriptions
        </h1>
        <p className="text-muted-foreground">
          Manage your client billing and subscriptions
        </p>
      </div>

      {subscriptions.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="mb-4 rounded-full bg-violet-100 p-4 dark:bg-violet-900/30">
              <Users className="h-8 w-8 text-violet-600 dark:text-violet-400" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">No clients yet</h3>
            <p className="max-w-sm text-center text-muted-foreground">
              Once clients sign up for your plans, they&apos;ll appear here
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>All Subscriptions</CardTitle>
            <CardDescription>
              {subscriptions.length} total subscription
              {subscriptions.length !== 1 ? "s" : ""}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Billing</TableHead>
                  <TableHead>Period End</TableHead>
                  <TableHead>Created</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {subscriptions.map(({ subscription, org, plan }) => (
                  <TableRow key={subscription.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{org.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {org.billingEmail}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{plan.name}</p>
                        <p className="text-sm text-muted-foreground">
                          &euro;{plan.priceMonthly}/mo
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={statusColors[subscription.status] || ""}
                      >
                        {subscription.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="capitalize">
                      {subscription.billingInterval}
                    </TableCell>
                    <TableCell>
                      {subscription.currentPeriodEnd ? (
                        <span className="text-sm">
                          {formatDistanceToNow(
                            new Date(subscription.currentPeriodEnd),
                            { addSuffix: true }
                          )}
                        </span>
                      ) : (
                        "-"
                      )}
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-muted-foreground">
                        {formatDistanceToNow(new Date(subscription.createdAt), {
                          addSuffix: true,
                        })}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
