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
import { getAllOrgs } from "@/lib/actions/admin";
import { formatDistanceToNow } from "date-fns";
import { ExternalLink } from "lucide-react";

export default async function AdminOrgsPage() {
  const orgs = await getAllOrgs();

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Organizations</h1>
        <p className="text-zinc-500">{orgs.length} total customers</p>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Organization</TableHead>
              <TableHead>Members</TableHead>
              <TableHead>Workspaces</TableHead>
              <TableHead>Contacts</TableHead>
              <TableHead>Deals</TableHead>
              <TableHead>Pipeline Value</TableHead>
              <TableHead>Created</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orgs.map((org) => (
              <TableRow key={org.id}>
                <TableCell>
                  <div>
                    <span className="font-medium">{org.name}</span>
                    <p className="text-xs text-zinc-500">{org.slug}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">{org.stats.members}</Badge>
                </TableCell>
                <TableCell>{org.stats.workspaces}</TableCell>
                <TableCell>{org.stats.contacts}</TableCell>
                <TableCell>{org.stats.deals}</TableCell>
                <TableCell>
                  {new Intl.NumberFormat("nl-NL", {
                    style: "currency",
                    currency: "EUR",
                  }).format(org.stats.dealValue)}
                </TableCell>
                <TableCell className="text-zinc-500">
                  {formatDistanceToNow(new Date(org.createdAt), {
                    addSuffix: true,
                  })}
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/admin/orgs/${org.id}`}>
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
