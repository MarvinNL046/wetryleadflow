"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Building2, Plus, Users, ExternalLink, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { createClientOrg, getAgencyClients } from "@/lib/actions/agency";
import { useEffect } from "react";
import { formatDistanceToNow } from "date-fns";

interface Client {
  id: number;
  name: string;
  slug: string;
  createdAt: Date;
}

export default function AgencyClientsPage() {
  const router = useRouter();
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newClientName, setNewClientName] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadClients();
  }, []);

  async function loadClients() {
    setIsLoading(true);
    try {
      const data = await getAgencyClients();
      setClients(data);
    } catch (err) {
      console.error("Failed to load clients:", err);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleCreateClient() {
    if (!newClientName.trim()) return;

    setIsCreating(true);
    setError(null);

    try {
      const result = await createClientOrg({ name: newClientName.trim() });

      if (result.error) {
        setError(result.error);
      } else {
        setNewClientName("");
        setIsDialogOpen(false);
        loadClients();
      }
    } catch (err) {
      setError("Failed to create client. Please try again.");
    } finally {
      setIsCreating(false);
    }
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Client Organizations</h1>
          <p className="text-zinc-500">Manage your client accounts</p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-violet-600 to-purple-600">
              <Plus className="mr-2 h-4 w-4" />
              Add Client
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Client</DialogTitle>
              <DialogDescription>
                Add a new client organization to your agency. They will get their
                own branded CRM portal.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Client Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., Bakkerij Jansen"
                  value={newClientName}
                  onChange={(e) => setNewClientName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleCreateClient()}
                />
              </div>
              {error && (
                <p className="text-sm text-red-500">{error}</p>
              )}
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleCreateClient}
                disabled={isCreating || !newClientName.trim()}
                className="bg-gradient-to-r from-violet-600 to-purple-600"
              >
                {isCreating ? "Creating..." : "Create Client"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Clients Grid */}
      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse border-zinc-200/50 bg-white/50 dark:border-zinc-800/50 dark:bg-zinc-900/50">
              <CardHeader>
                <div className="h-6 w-32 rounded bg-zinc-200 dark:bg-zinc-700" />
              </CardHeader>
              <CardContent>
                <div className="h-4 w-24 rounded bg-zinc-200 dark:bg-zinc-700" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : clients.length === 0 ? (
        <Card className="border-dashed border-zinc-300 bg-zinc-50/50 dark:border-zinc-700 dark:bg-zinc-900/50">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-violet-100 dark:bg-violet-900/50">
              <Building2 className="h-8 w-8 text-violet-600 dark:text-violet-400" />
            </div>
            <h3 className="mb-2 text-lg font-medium">No clients yet</h3>
            <p className="mb-4 text-center text-zinc-500">
              Add your first client to get started with your whitelabeled CRM.
            </p>
            <Button
              onClick={() => setIsDialogOpen(true)}
              className="bg-gradient-to-r from-violet-600 to-purple-600"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Your First Client
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {clients.map((client) => (
            <Card
              key={client.id}
              className="group border-zinc-200/50 bg-white/50 transition-all hover:border-violet-300 hover:shadow-lg hover:shadow-violet-500/10 dark:border-zinc-800/50 dark:bg-zinc-900/50 dark:hover:border-violet-700"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="flex items-center gap-3 text-lg">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 text-white">
                    {client.name.charAt(0)}
                  </div>
                  <span>{client.name}</span>
                </CardTitle>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => router.push(`/org/${client.slug}`)}>
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Open CRM
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push(`/agency/clients/${client.id}`)}>
                      <Users className="mr-2 h-4 w-4" />
                      Manage Users
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-zinc-500">
                  <span>/{client.slug}</span>
                  <span>
                    Added {formatDistanceToNow(new Date(client.createdAt), { addSuffix: true })}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
