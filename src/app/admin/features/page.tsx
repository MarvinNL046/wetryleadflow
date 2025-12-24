"use client";

import { useEffect, useState, useTransition } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  getFeatureFlagStats,
  getFeatureFlags,
  createFeatureFlag,
  toggleFeatureFlag,
  deleteFeatureFlag,
} from "@/lib/actions/admin";
import {
  Flag,
  Plus,
  Trash2,
  Loader2,
  RefreshCw,
  ToggleLeft,
  ToggleRight,
  Percent,
  Layers,
  Beaker,
  Settings2,
  Zap,
} from "lucide-react";

type FeatureFlagStats = Awaited<ReturnType<typeof getFeatureFlagStats>>;
type FeatureFlag = Awaited<ReturnType<typeof getFeatureFlags>>[number];

function getTypeBadge(type: string) {
  switch (type) {
    case "boolean":
      return (
        <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
          <ToggleLeft className="mr-1 h-3 w-3" />
          Boolean
        </Badge>
      );
    case "percentage":
      return (
        <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
          <Percent className="mr-1 h-3 w-3" />
          Percentage
        </Badge>
      );
    case "tier_based":
      return (
        <Badge className="bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400">
          <Layers className="mr-1 h-3 w-3" />
          Tier-based
        </Badge>
      );
    default:
      return <Badge variant="outline">{type}</Badge>;
  }
}

function formatDate(date: Date | null): string {
  if (!date) return "-";
  return new Date(date).toLocaleDateString("nl-NL", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function FeatureFlagsPage() {
  const [stats, setStats] = useState<FeatureFlagStats | null>(null);
  const [flags, setFlags] = useState<FeatureFlag[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    key: "",
    name: "",
    description: "",
    type: "boolean" as "boolean" | "percentage" | "tier_based",
    defaultEnabled: false,
    rolloutPercentage: 0,
    isBeta: false,
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const [statsData, flagsData] = await Promise.all([
        getFeatureFlagStats(),
        getFeatureFlags(),
      ]);
      setStats(statsData);
      setFlags(flagsData);
    } catch (error) {
      console.error("Failed to load feature flags:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreate = async () => {
    if (!formData.key || !formData.name) return;

    startTransition(async () => {
      await createFeatureFlag({
        key: formData.key,
        name: formData.name,
        description: formData.description || undefined,
        type: formData.type,
        defaultEnabled: formData.defaultEnabled,
        rolloutPercentage: formData.rolloutPercentage,
        isBeta: formData.isBeta,
      });
      setFormData({
        key: "",
        name: "",
        description: "",
        type: "boolean",
        defaultEnabled: false,
        rolloutPercentage: 0,
        isBeta: false,
      });
      setDialogOpen(false);
      await loadData();
    });
  };

  const handleToggle = async (id: number) => {
    startTransition(async () => {
      await toggleFeatureFlag(id);
      await loadData();
    });
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Weet je zeker dat je deze feature flag wilt verwijderen?")) return;

    startTransition(async () => {
      await deleteFeatureFlag(id);
      await loadData();
    });
  };

  if (loading && !stats) {
    return (
      <div className="flex h-full items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-violet-500" />
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">Feature Flags</h1>
            <Badge className="bg-gradient-to-r from-red-500 to-orange-500 text-white">
              NEW
            </Badge>
          </div>
          <p className="text-zinc-500">Beheer feature rollouts en beta features</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => loadData()}
            disabled={loading}
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            Vernieuwen
          </Button>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Nieuw
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Nieuwe Feature Flag</DialogTitle>
                <DialogDescription>
                  Maak een nieuwe feature flag voor rollout control.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="key">Key</Label>
                  <Input
                    id="key"
                    value={formData.key}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        key: e.target.value.toLowerCase().replace(/\s+/g, "_"),
                      })
                    }
                    placeholder="feature_key"
                    className="font-mono"
                  />
                  <p className="text-xs text-zinc-500">Unieke identifier, lowercase met underscores</p>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="name">Naam</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Feature naam..."
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Beschrijving</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Wat doet deze feature..."
                    rows={2}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="type">Type</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) =>
                      setFormData({ ...formData, type: value as typeof formData.type })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="boolean">
                        <span className="flex items-center gap-2">
                          <ToggleLeft className="h-4 w-4 text-blue-500" />
                          Boolean (aan/uit)
                        </span>
                      </SelectItem>
                      <SelectItem value="percentage">
                        <span className="flex items-center gap-2">
                          <Percent className="h-4 w-4 text-amber-500" />
                          Percentage rollout
                        </span>
                      </SelectItem>
                      <SelectItem value="tier_based">
                        <span className="flex items-center gap-2">
                          <Layers className="h-4 w-4 text-violet-500" />
                          Tier-based
                        </span>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {formData.type === "percentage" && (
                  <div className="grid gap-2">
                    <Label htmlFor="rollout">Rollout Percentage</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="rollout"
                        type="number"
                        min="0"
                        max="100"
                        value={formData.rolloutPercentage}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            rolloutPercentage: parseInt(e.target.value) || 0,
                          })
                        }
                        className="w-24"
                      />
                      <span className="text-sm text-zinc-500">%</span>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2">
                    <Switch
                      checked={formData.defaultEnabled}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, defaultEnabled: checked })
                      }
                    />
                    <span className="text-sm">Standaard aan</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <Switch
                      checked={formData.isBeta}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, isBeta: checked })
                      }
                    />
                    <span className="text-sm">Beta feature</span>
                  </label>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Annuleren
                </Button>
                <Button onClick={handleCreate} disabled={isPending || !formData.key}>
                  {isPending ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Plus className="mr-2 h-4 w-4" />
                  )}
                  Aanmaken
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Grid */}
      {stats && (
        <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="dashboard-stat-card rounded-xl border border-zinc-200/50 bg-white/80 p-5 backdrop-blur-sm dark:border-zinc-800/50 dark:bg-zinc-900/80">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-zinc-500">Totaal</p>
                <p className="mt-2 text-2xl font-bold">{stats.total}</p>
                <p className="mt-1 text-xs text-zinc-400">feature flags</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-purple-500">
                <Flag className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>

          <div className="dashboard-stat-card rounded-xl border border-green-200/50 bg-gradient-to-br from-green-50/80 to-emerald-50/80 p-5 dark:border-green-900/50 dark:from-green-950/50 dark:to-emerald-950/50">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-zinc-500">Actief</p>
                <p className="mt-2 text-2xl font-bold text-green-600 dark:text-green-400">
                  {stats.active}
                </p>
                <p className="mt-1 text-xs text-zinc-400">ingeschakeld</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-emerald-500">
                <ToggleRight className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>

          <div className="dashboard-stat-card rounded-xl border border-amber-200/50 bg-gradient-to-br from-amber-50/80 to-orange-50/80 p-5 dark:border-amber-900/50 dark:from-amber-950/50 dark:to-orange-950/50">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-zinc-500">Beta</p>
                <p className="mt-2 text-2xl font-bold text-amber-600 dark:text-amber-400">
                  {stats.beta}
                </p>
                <p className="mt-1 text-xs text-zinc-400">in beta</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-orange-500">
                <Beaker className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>

          <div className="dashboard-stat-card rounded-xl border border-zinc-200/50 bg-white/80 p-5 dark:border-zinc-800/50 dark:bg-zinc-900/80">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-zinc-500">Overrides</p>
                <p className="mt-2 text-2xl font-bold">{stats.totalOverrides}</p>
                <p className="mt-1 text-xs text-zinc-400">custom configs</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-zinc-400 to-zinc-500">
                <Settings2 className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Feature Flags Table */}
      <Card>
        <CardHeader>
          <CardTitle>Alle Feature Flags</CardTitle>
        </CardHeader>
        <CardContent>
          {flags.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Key</TableHead>
                  <TableHead>Naam</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-center">Rollout</TableHead>
                  <TableHead className="text-center">Overrides</TableHead>
                  <TableHead>Aangemaakt</TableHead>
                  <TableHead className="w-[100px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {flags.map((flag) => (
                  <TableRow key={flag.id}>
                    <TableCell>
                      <code className="rounded bg-zinc-100 px-2 py-1 text-sm dark:bg-zinc-800">
                        {flag.key}
                      </code>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{flag.name}</span>
                        {flag.isBeta && (
                          <Badge className="bg-amber-100 text-amber-700 text-[10px] dark:bg-amber-900/30 dark:text-amber-400">
                            BETA
                          </Badge>
                        )}
                      </div>
                      {flag.description && (
                        <p className="max-w-xs truncate text-xs text-zinc-500">
                          {flag.description}
                        </p>
                      )}
                    </TableCell>
                    <TableCell>{getTypeBadge(flag.type)}</TableCell>
                    <TableCell className="text-center">
                      <Switch
                        checked={flag.isActive}
                        onCheckedChange={() => handleToggle(flag.id)}
                        disabled={isPending}
                      />
                    </TableCell>
                    <TableCell className="text-center">
                      {flag.type === "percentage" ? (
                        <span className="font-mono text-sm">
                          {flag.rolloutPercentage}%
                        </span>
                      ) : flag.defaultEnabled ? (
                        <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                          Aan
                        </Badge>
                      ) : (
                        <Badge className="bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                          Uit
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      {flag.overrideCount > 0 ? (
                        <Badge variant="outline">{flag.overrideCount}</Badge>
                      ) : (
                        <span className="text-xs text-zinc-400">-</span>
                      )}
                    </TableCell>
                    <TableCell className="text-sm text-zinc-500">
                      {formatDate(flag.createdAt)}
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDelete(flag.id)}
                        disabled={isPending}
                        title="Verwijderen"
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="flex flex-col items-center justify-center py-8">
              <Flag className="mb-2 h-8 w-8 text-zinc-300" />
              <p className="text-sm text-zinc-500">Nog geen feature flags</p>
              <Button size="sm" className="mt-4" onClick={() => setDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Eerste flag maken
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Usage Example Card */}
      <Card className="mt-4">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Zap className="h-4 w-4 text-amber-500" />
            Gebruik in Code
          </CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="overflow-x-auto rounded-lg bg-zinc-900 p-4 text-sm text-zinc-100">
            <code>{`import { isFeatureEnabled } from "@/lib/features";

// Check if feature is enabled
const enabled = await isFeatureEnabled("feature_key", {
  orgId: 123,      // Optional: check org-specific override
  agencyId: 456,   // Optional: check agency-specific override
  tier: "unlimited" // Optional: check tier-based access
});

if (enabled) {
  // Show new feature
}`}</code>
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}
