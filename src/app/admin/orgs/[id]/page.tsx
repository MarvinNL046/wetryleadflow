import { notFound } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { getOrgDetails } from "@/lib/actions/admin";
import { formatDistanceToNow } from "date-fns";
import { ArrowLeft, Building2, Users, Layers, DollarSign } from "lucide-react";

export default async function AdminOrgDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const orgId = parseInt(id, 10);

  if (isNaN(orgId)) {
    notFound();
  }

  const org = await getOrgDetails(orgId);

  if (!org) {
    notFound();
  }

  const totalContacts = org.workspaces.reduce((sum, w) => sum + w.stats.contacts, 0);
  const totalOpportunities = org.workspaces.reduce((sum, w) => sum + w.stats.opportunities, 0);
  const totalValue = org.workspaces.reduce((sum, w) => sum + w.stats.opportunityValue, 0);

  return (
    <div className="p-8">
      <div className="mb-8">
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link href="/admin/orgs">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Organizations
          </Link>
        </Button>
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
            <Building2 className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{org.name}</h1>
            <p className="text-zinc-500">/{org.slug}</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-8 grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-zinc-500">Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{org.memberships.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-zinc-500">Workspaces</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{org.workspaces.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-zinc-500">Total Contacts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalContacts}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-zinc-500">Pipeline Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Intl.NumberFormat("nl-NL", {
                style: "currency",
                currency: "EUR",
                maximumFractionDigits: 0,
              }).format(totalValue)}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Members */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Members ({org.memberships.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {org.memberships.map((membership) => (
                <div
                  key={membership.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      {membership.user.avatarUrl && (
                        <AvatarImage src={membership.user.avatarUrl} />
                      )}
                      <AvatarFallback className="text-xs">
                        {membership.user.name?.[0] ??
                          membership.user.email[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">
                        {membership.user.name ?? membership.user.email}
                      </p>
                      <p className="text-xs text-zinc-500">
                        {membership.user.email}
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant={membership.role === "owner" ? "default" : "secondary"}
                  >
                    {membership.role}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Workspaces */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Layers className="h-5 w-5" />
              Workspaces ({org.workspaces.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {org.workspaces.map((workspace) => (
                <div
                  key={workspace.id}
                  className="rounded-lg border p-4"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="font-medium">{workspace.name}</h3>
                    <span className="text-xs text-zinc-500">/{workspace.slug}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div>
                      <span className="text-zinc-500">Contacts:</span>{" "}
                      <span className="font-medium">{workspace.stats.contacts}</span>
                    </div>
                    <div>
                      <span className="text-zinc-500">Opportunities:</span>{" "}
                      <span className="font-medium">{workspace.stats.opportunities}</span>
                    </div>
                    <div>
                      <span className="text-zinc-500">Pipelines:</span>{" "}
                      <span className="font-medium">{workspace.stats.pipelines}</span>
                    </div>
                  </div>
                  {workspace.stats.opportunityValue > 0 && (
                    <div className="mt-2 flex items-center gap-1 text-sm">
                      <DollarSign className="h-3 w-3 text-zinc-400" />
                      <span className="font-medium">
                        {new Intl.NumberFormat("nl-NL", {
                          style: "currency",
                          currency: "EUR",
                        }).format(workspace.stats.opportunityValue)}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Separator className="my-8" />

      <div className="text-sm text-zinc-500">
        Created {formatDistanceToNow(new Date(org.createdAt), { addSuffix: true })}
      </div>
    </div>
  );
}
