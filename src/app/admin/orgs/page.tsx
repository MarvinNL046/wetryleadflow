import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllOrgs, getAllAgencies } from "@/lib/actions/admin";
import { formatDistanceToNow } from "date-fns";
import { ExternalLink, Building2, Users, DollarSign, TrendingUp, Crown, UserCheck } from "lucide-react";
import { DeleteOrgButton } from "@/components/admin/delete-org-button";

export default async function AdminOrgsPage() {
  const [orgs, agencies] = await Promise.all([getAllOrgs(), getAllAgencies()]);

  // Create agency lookup map
  const agencyMap = new Map(agencies.map((a) => [a.id, a]));

  // Calculate totals
  const totalMembers = orgs.reduce((sum, org) => sum + org.stats.members, 0);
  const totalValue = orgs.reduce((sum, org) => sum + org.stats.opportunityValue, 0);

  // Separate direct users and agency clients
  const directUsers = orgs.filter((org) => !org.agencyId);
  const agencyClients = orgs.filter((org) => org.agencyId);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Organizations</h1>
        <p className="text-zinc-500">{orgs.length} total customers</p>
      </div>

      {/* Stats Cards */}
      <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <div className="dashboard-stat-card rounded-xl border border-zinc-200/50 bg-white/80 p-5 backdrop-blur-sm dark:border-zinc-800/50 dark:bg-zinc-900/80">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-zinc-500">Total Organizations</p>
              <p className="mt-2 text-2xl font-bold">{orgs.length}</p>
            </div>
            <div className="stat-icon-gradient purple flex h-10 w-10 items-center justify-center rounded-lg">
              <Building2 className="h-5 w-5 text-purple-500" />
            </div>
          </div>
        </div>

        <div className="dashboard-stat-card rounded-xl border border-zinc-200/50 bg-white/80 p-5 backdrop-blur-sm dark:border-zinc-800/50 dark:bg-zinc-900/80">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-zinc-500">Direct Users (ZZP/MKB)</p>
              <p className="mt-2 text-2xl font-bold">{directUsers.length}</p>
              <p className="text-xs text-zinc-400">
                {directUsers.filter((o) => o.subscriptionTier === "pro").length} pro, {directUsers.filter((o) => o.subscriptionTier === "enterprise").length} enterprise
              </p>
            </div>
            <div className="stat-icon-gradient blue flex h-10 w-10 items-center justify-center rounded-lg">
              <UserCheck className="h-5 w-5 text-blue-500" />
            </div>
          </div>
        </div>

        <div className="dashboard-stat-card rounded-xl border border-zinc-200/50 bg-white/80 p-5 backdrop-blur-sm dark:border-zinc-800/50 dark:bg-zinc-900/80">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-zinc-500">Agency Clients</p>
              <p className="mt-2 text-2xl font-bold">{agencyClients.length}</p>
              <p className="text-xs text-zinc-400">
                via {agencies.length} agencies
              </p>
            </div>
            <div className="stat-icon-gradient amber flex h-10 w-10 items-center justify-center rounded-lg">
              <Crown className="h-5 w-5 text-amber-500" />
            </div>
          </div>
        </div>

        <div className="dashboard-stat-card rounded-xl border border-zinc-200/50 bg-white/80 p-5 backdrop-blur-sm dark:border-zinc-800/50 dark:bg-zinc-900/80">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-zinc-500">Total Members</p>
              <p className="mt-2 text-2xl font-bold">{totalMembers}</p>
            </div>
            <div className="stat-icon-gradient green flex h-10 w-10 items-center justify-center rounded-lg">
              <Users className="h-5 w-5 text-green-500" />
            </div>
          </div>
        </div>

        <div className="dashboard-stat-card rounded-xl border border-zinc-200/50 bg-white/80 p-5 backdrop-blur-sm dark:border-zinc-800/50 dark:bg-zinc-900/80">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-zinc-500">Total Pipeline Value</p>
              <p className="mt-2 text-2xl font-bold">
                {new Intl.NumberFormat("nl-NL", {
                  style: "currency",
                  currency: "EUR",
                  maximumFractionDigits: 0,
                }).format(totalValue)}
              </p>
            </div>
            <div className="stat-icon-gradient purple flex h-10 w-10 items-center justify-center rounded-lg">
              <DollarSign className="h-5 w-5 text-purple-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Organizations Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Organizations</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Organization</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Subscription</TableHead>
                <TableHead>Members</TableHead>
                <TableHead>Contacts</TableHead>
                <TableHead>Opportunities</TableHead>
                <TableHead>Pipeline Value</TableHead>
                <TableHead>Created</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orgs.map((org) => {
                const agency = org.agencyId ? agencyMap.get(org.agencyId) : null;
                const isDirectUser = !org.agencyId;

                return (
                  <TableRow key={org.id} className="group">
                    <TableCell>
                      <div>
                        <span className="font-medium">{org.name}</span>
                        <p className="text-xs text-zinc-500">{org.slug}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      {isDirectUser ? (
                        <Badge variant="outline" className="gap-1 border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300">
                          <UserCheck className="h-3 w-3" />
                          Direct
                        </Badge>
                      ) : (
                        <div className="flex flex-col gap-1">
                          <Badge variant="outline" className="gap-1 border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-300">
                            <Crown className="h-3 w-3" />
                            Agency
                          </Badge>
                          {agency && (
                            <span className="text-xs text-zinc-500">{agency.name}</span>
                          )}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      {isDirectUser && (
                        <div className="flex flex-col gap-1">
                          <Badge
                            variant="outline"
                            className={
                              org.subscriptionTier === "enterprise"
                                ? "border-purple-200 bg-purple-50 text-purple-700 dark:border-purple-800 dark:bg-purple-950 dark:text-purple-300"
                                : org.subscriptionTier === "pro"
                                ? "border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-300"
                                : "border-zinc-200 bg-zinc-50 text-zinc-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300"
                            }
                          >
                            {org.subscriptionTier === "enterprise" ? "Enterprise" : org.subscriptionTier === "pro" ? "Pro" : "Free"}
                          </Badge>
                          <Badge
                            variant="outline"
                            className={
                              org.subscriptionStatus === "active"
                                ? "text-xs border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-300"
                                : org.subscriptionStatus === "trialing"
                                ? "text-xs border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300"
                                : org.subscriptionStatus === "past_due"
                                ? "text-xs border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-300"
                                : "text-xs border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-300"
                            }
                          >
                            {org.subscriptionStatus}
                          </Badge>
                        </div>
                      )}
                      {!isDirectUser && (
                        <span className="text-xs text-zinc-400">via agency</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="gap-1">
                        <Users className="h-3 w-3" />
                        {org.stats.members}
                      </Badge>
                    </TableCell>
                    <TableCell>{org.stats.contacts}</TableCell>
                    <TableCell>{org.stats.opportunities}</TableCell>
                    <TableCell className="font-medium">
                      {new Intl.NumberFormat("nl-NL", {
                        style: "currency",
                        currency: "EUR",
                      }).format(org.stats.opportunityValue)}
                    </TableCell>
                    <TableCell className="text-zinc-500">
                      {formatDistanceToNow(new Date(org.createdAt), {
                        addSuffix: true,
                      })}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                        <Button
                          variant="ghost"
                          size="sm"
                          asChild
                        >
                          <Link href={`/admin/orgs/${org.id}`}>
                            <ExternalLink className="h-4 w-4" />
                          </Link>
                        </Button>
                        <DeleteOrgButton
                          orgId={org.id}
                          orgName={org.name}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
