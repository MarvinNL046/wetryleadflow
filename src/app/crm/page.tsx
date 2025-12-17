import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getContacts, getPipelines, getDeals } from "@/lib/actions/crm";
import { Users, Kanban, DollarSign, Plus } from "lucide-react";

export default async function CRMPage() {
  const [contacts, pipelines, deals] = await Promise.all([
    getContacts(),
    getPipelines(),
    getDeals(),
  ]);

  const totalValue = deals.reduce((sum, deal) => {
    return sum + (deal.value ? parseFloat(deal.value) : 0);
  }, 0);

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">CRM Overview</h1>
          <p className="text-zinc-500">Manage your contacts and deals</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Contacts</CardTitle>
            <Users className="h-4 w-4 text-zinc-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contacts.length}</div>
            <Link
              href="/crm/contacts"
              className="text-xs text-zinc-500 hover:underline"
            >
              View all contacts
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Deals</CardTitle>
            <Kanban className="h-4 w-4 text-zinc-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{deals.length}</div>
            <Link
              href="/crm/pipelines"
              className="text-xs text-zinc-500 hover:underline"
            >
              View pipelines
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pipeline Value</CardTitle>
            <DollarSign className="h-4 w-4 text-zinc-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Intl.NumberFormat("nl-NL", {
                style: "currency",
                currency: "EUR",
              }).format(totalValue)}
            </div>
            <p className="text-xs text-zinc-500">Total deal value</p>
          </CardContent>
        </Card>
      </div>

      {pipelines.length === 0 && (
        <Card className="mt-8">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Kanban className="mb-4 h-12 w-12 text-zinc-400" />
            <h3 className="mb-2 text-lg font-semibold">No pipelines yet</h3>
            <p className="mb-4 text-sm text-zinc-500">
              Create your first pipeline to start tracking deals
            </p>
            <Button asChild>
              <Link href="/crm/pipelines">
                <Plus className="mr-2 h-4 w-4" />
                Create Pipeline
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
