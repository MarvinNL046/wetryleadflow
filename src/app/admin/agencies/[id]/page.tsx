import { notFound } from "next/navigation";
import Link from "next/link";
import { getAgencyDetails } from "@/lib/actions/admin";
import { requireSuperAdmin } from "@/lib/auth/superadmin";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDistanceToNow, format } from "date-fns";
import {
  ArrowLeft,
  Building,
  Building2,
  Users,
  ExternalLink,
  CheckCircle,
  XCircle,
  Crown,
  Shield,
  Mail,
  Globe,
  Palette,
  CreditCard,
} from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminAgencyDetailPage({ params }: PageProps) {
  await requireSuperAdmin();
  const { id } = await params;
  const agencyId = parseInt(id, 10);

  if (isNaN(agencyId)) {
    notFound();
  }

  const agency = await getAgencyDetails(agencyId);

  if (!agency) {
    notFound();
  }

  return (
    <div className="p-8">
      {/* Back Link */}
      <Link
        href="/admin/agencies"
        className="mb-6 inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Agencies
      </Link>

      {/* Header */}
      <div className="mb-8 flex items-start justify-between">
        <div className="flex items-center gap-4">
          {agency.logoUrl ? (
            <img
              src={agency.logoUrl}
              alt={agency.name}
              className="h-16 w-16 rounded-xl object-cover"
            />
          ) : (
            <div
              className="flex h-16 w-16 items-center justify-center rounded-xl text-2xl font-bold text-white"
              style={{ backgroundColor: agency.primaryColor || "#8b5cf6" }}
            >
              {agency.name.charAt(0)}
            </div>
          )}
          <div>
            <h1 className="text-2xl font-bold">{agency.name}</h1>
            {agency.appName && agency.appName !== agency.name && (
              <p className="text-zinc-500">Displays as: {agency.appName}</p>
            )}
            <div className="mt-1 flex items-center gap-2">
              <code className="rounded bg-zinc-100 px-2 py-0.5 text-sm dark:bg-zinc-800">
                /{agency.slug}
              </code>
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
            </div>
          </div>
        </div>

        <Link
          href={`/${agency.slug}/crm`}
          target="_blank"
        >
          <Button variant="outline" className="gap-2">
            <ExternalLink className="h-4 w-4" />
            Preview CRM
          </Button>
        </Link>
      </div>

      {/* Info Cards */}
      <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-zinc-200/50 bg-white/50 backdrop-blur-sm dark:border-zinc-800/50 dark:bg-zinc-900/50">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-400">
              <Building2 className="h-4 w-4 text-violet-500" />
              Clients
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{agency.orgs.length}</div>
            <p className="text-xs text-zinc-500">of {agency.maxOrgs} max</p>
          </CardContent>
        </Card>

        <Card className="border-zinc-200/50 bg-white/50 backdrop-blur-sm dark:border-zinc-800/50 dark:bg-zinc-900/50">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-400">
              <Users className="h-4 w-4 text-blue-500" />
              Team Members
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{agency.members.length}</div>
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
              {agency.subscriptionStatus || "trialing"}
            </div>
          </CardContent>
        </Card>

        <Card className="border-zinc-200/50 bg-white/50 backdrop-blur-sm dark:border-zinc-800/50 dark:bg-zinc-900/50">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-400">
              <Building className="h-4 w-4 text-green-500" />
              Created
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm font-medium">
              {format(new Date(agency.createdAt), "MMM d, yyyy")}
            </div>
            <p className="text-xs text-zinc-500">
              {formatDistanceToNow(new Date(agency.createdAt), { addSuffix: true })}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Agency Details */}
        <Card className="border-zinc-200/50 bg-white/50 backdrop-blur-sm dark:border-zinc-800/50 dark:bg-zinc-900/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5 text-violet-500" />
              Agency Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-zinc-400" />
              <div>
                <p className="text-xs text-zinc-500">Contact Email</p>
                <p className="font-medium">{agency.email}</p>
              </div>
            </div>

            {agency.website && (
              <div className="flex items-center gap-3">
                <Globe className="h-4 w-4 text-zinc-400" />
                <div>
                  <p className="text-xs text-zinc-500">Website</p>
                  <a
                    href={agency.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-violet-600 hover:underline dark:text-violet-400"
                  >
                    {agency.website}
                  </a>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3">
              <Palette className="h-4 w-4 text-zinc-400" />
              <div>
                <p className="text-xs text-zinc-500">Brand Colors</p>
                <div className="mt-1 flex items-center gap-2">
                  <div
                    className="h-6 w-6 rounded"
                    style={{ backgroundColor: agency.primaryColor || "#8b5cf6" }}
                    title={agency.primaryColor || "#8b5cf6"}
                  />
                  <div
                    className="h-6 w-6 rounded"
                    style={{ backgroundColor: agency.secondaryColor || "#3b82f6" }}
                    title={agency.secondaryColor || "#3b82f6"}
                  />
                </div>
              </div>
            </div>

            {agency.stripeCustomerId && (
              <div className="flex items-center gap-3">
                <CreditCard className="h-4 w-4 text-zinc-400" />
                <div>
                  <p className="text-xs text-zinc-500">Stripe Customer</p>
                  <code className="text-sm">{agency.stripeCustomerId}</code>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Team Members */}
        <Card className="border-zinc-200/50 bg-white/50 backdrop-blur-sm dark:border-zinc-800/50 dark:bg-zinc-900/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-500" />
              Team Members ({agency.members.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {agency.members.length === 0 ? (
              <p className="py-4 text-center text-zinc-500">No team members</p>
            ) : (
              <div className="space-y-3">
                {agency.members.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between rounded-lg border border-zinc-200/50 p-3 dark:border-zinc-800/50"
                  >
                    <div>
                      <code className="text-sm">{member.userId}</code>
                      <p className="text-xs text-zinc-500">
                        Joined {formatDistanceToNow(new Date(member.createdAt), { addSuffix: true })}
                      </p>
                    </div>
                    {member.role === "owner" ? (
                      <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-400">
                        <Crown className="mr-1 h-3 w-3" />
                        Owner
                      </Badge>
                    ) : member.role === "admin" ? (
                      <Badge className="bg-violet-100 text-violet-700 dark:bg-violet-900/50 dark:text-violet-400">
                        <Shield className="mr-1 h-3 w-3" />
                        Admin
                      </Badge>
                    ) : (
                      <Badge variant="secondary">Member</Badge>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Client Organizations */}
      <Card className="mt-6 border-zinc-200/50 bg-white/50 backdrop-blur-sm dark:border-zinc-800/50 dark:bg-zinc-900/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-violet-500" />
            Client Organizations ({agency.orgs.length})
          </CardTitle>
          <CardDescription>
            Organizations managed by this agency
          </CardDescription>
        </CardHeader>
        <CardContent>
          {agency.orgs.length === 0 ? (
            <p className="py-8 text-center text-zinc-500">No client organizations yet</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Organization</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Members</TableHead>
                  <TableHead>Contacts</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {agency.orgs.map((org) => (
                  <TableRow key={org.id}>
                    <TableCell>
                      <Link
                        href={`/admin/orgs/${org.id}`}
                        className="font-medium hover:underline"
                      >
                        {org.name}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <code className="text-sm">{org.slug}</code>
                    </TableCell>
                    <TableCell>{org.memberCount}</TableCell>
                    <TableCell>{org.contactCount}</TableCell>
                    <TableCell className="text-zinc-500">
                      {formatDistanceToNow(new Date(org.createdAt), { addSuffix: true })}
                    </TableCell>
                    <TableCell className="text-right">
                      <Link
                        href={`/admin/orgs/${org.id}`}
                        className="text-sm text-violet-600 hover:text-violet-700 dark:text-violet-400"
                      >
                        View Details
                      </Link>
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
