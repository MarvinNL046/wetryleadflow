import { getAllAgencies } from "@/lib/actions/admin";
import { requireSuperAdmin } from "@/lib/auth/superadmin";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDistanceToNow } from "date-fns";
import {
  Building,
  CheckCircle,
  XCircle,
  Users,
  Building2,
  ExternalLink,
  AlertTriangle,
} from "lucide-react";
import Link from "next/link";
import { DeleteAgencyButton } from "@/components/admin/delete-agency-button";
import { ImpersonateAgencyButton } from "@/components/admin/impersonate-agency-button";
import { CreateTestAgencyButton } from "@/components/admin/create-test-agency-button";

function SubscriptionBadge({ status }: { status: string }) {
  switch (status) {
    case "active":
      return (
        <Badge className="bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400">
          Active
        </Badge>
      );
    case "trialing":
      return (
        <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400">
          Trial
        </Badge>
      );
    case "past_due":
      return (
        <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-400">
          <AlertTriangle className="mr-1 h-3 w-3" />
          Past Due
        </Badge>
      );
    case "canceled":
      return (
        <Badge className="bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400">
          Canceled
        </Badge>
      );
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
}

export default async function AdminAgenciesPage() {
  await requireSuperAdmin();
  const agencies = await getAllAgencies();

  const activeCount = agencies.filter((a) => a.isActive).length;
  const totalClients = agencies.reduce((sum, a) => sum + a.orgCount, 0);
  const totalMembers = agencies.reduce((sum, a) => sum + a.memberCount, 0);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Agencies</h1>
          <p className="text-zinc-500">Manage whitelabel partners</p>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-8 grid gap-4 md:grid-cols-4">
        <Card className="border-zinc-200/50 bg-white/50 backdrop-blur-sm dark:border-zinc-800/50 dark:bg-zinc-900/50">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-400">
              <Building className="h-4 w-4 text-violet-500" />
              Total Agencies
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{agencies.length}</div>
          </CardContent>
        </Card>

        <Card className="border-zinc-200/50 bg-white/50 backdrop-blur-sm dark:border-zinc-800/50 dark:bg-zinc-900/50">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-400">
              <CheckCircle className="h-4 w-4 text-green-500" />
              Active
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{activeCount}</div>
          </CardContent>
        </Card>

        <Card className="border-zinc-200/50 bg-white/50 backdrop-blur-sm dark:border-zinc-800/50 dark:bg-zinc-900/50">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-400">
              <Building2 className="h-4 w-4 text-blue-500" />
              Total Clients
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalClients}</div>
          </CardContent>
        </Card>

        <Card className="border-zinc-200/50 bg-white/50 backdrop-blur-sm dark:border-zinc-800/50 dark:bg-zinc-900/50">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-400">
              <Users className="h-4 w-4 text-amber-500" />
              Agency Members
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalMembers}</div>
          </CardContent>
        </Card>
      </div>

      {/* Agencies Table */}
      <Card className="border-zinc-200/50 bg-white/50 backdrop-blur-sm dark:border-zinc-800/50 dark:bg-zinc-900/50">
        <CardHeader>
          <CardTitle>All Agencies</CardTitle>
        </CardHeader>
        <CardContent>
          {agencies.length === 0 ? (
            <div className="py-12 text-center">
              <Building className="mx-auto mb-4 h-12 w-12 text-zinc-300 dark:text-zinc-700" />
              <p className="mb-4 text-zinc-500">No agencies yet</p>
              <CreateTestAgencyButton />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Agency</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Clients</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Subscription</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {agencies.map((agency) => (
                  <TableRow key={agency.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        {agency.logoUrl ? (
                          <img
                            src={agency.logoUrl}
                            alt={agency.name}
                            className="h-8 w-8 rounded object-cover"
                          />
                        ) : (
                          <div
                            className="flex h-8 w-8 items-center justify-center rounded text-white"
                            style={{
                              backgroundColor: agency.primaryColor || "#8b5cf6",
                            }}
                          >
                            {agency.name.charAt(0)}
                          </div>
                        )}
                        <div>
                          <Link
                            href={`/admin/agencies/${agency.id}`}
                            className="font-medium hover:underline"
                          >
                            {agency.name}
                          </Link>
                          {agency.appName && agency.appName !== agency.name && (
                            <p className="text-xs text-zinc-500">
                              {agency.appName}
                            </p>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <code className="rounded bg-zinc-100 px-2 py-1 text-sm dark:bg-zinc-800">
                        /{agency.slug}
                      </code>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        {agency.orgCount} / {agency.maxOrgs}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {agency.isActive ? (
                        <Badge className="bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400">
                          <CheckCircle className="mr-1 h-3 w-3" />
                          Active
                        </Badge>
                      ) : (
                        <Badge className="bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400">
                          <XCircle className="mr-1 h-3 w-3" />
                          Inactive
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <SubscriptionBadge status={agency.subscriptionStatus || "trialing"} />
                    </TableCell>
                    <TableCell className="text-zinc-500">
                      {formatDistanceToNow(new Date(agency.createdAt), {
                        addSuffix: true,
                      })}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <ImpersonateAgencyButton
                          agencyId={agency.id}
                          agencyName={agency.name}
                        />
                        <Link
                          href={`/${agency.slug}/crm`}
                          className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
                          target="_blank"
                        >
                          CRM
                          <ExternalLink className="h-3 w-3" />
                        </Link>
                        <DeleteAgencyButton
                          agencyId={agency.id}
                          agencyName={agency.name}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
