"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  createAgencyPlan,
  updateAgencyPlan,
  deleteAgencyPlan,
} from "@/lib/actions/agency-plans";
import { Loader2, Plus, X, Trash2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { AgencyPricingPlan } from "@/lib/db/schema";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface PlanEditorProps {
  mode: "create" | "edit";
  plan?: AgencyPricingPlan;
}

export function PlanEditor({ mode, plan }: PlanEditorProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [name, setName] = useState(plan?.name || "");
  const [description, setDescription] = useState(plan?.description || "");
  const [priceMonthly, setPriceMonthly] = useState(
    plan?.priceMonthly ? parseFloat(plan.priceMonthly) : 0
  );
  const [priceYearly, setPriceYearly] = useState(
    plan?.priceYearly ? parseFloat(plan.priceYearly) : 0
  );
  const [features, setFeatures] = useState<string[]>(
    (plan?.features as string[]) || [""]
  );
  const [maxContacts, setMaxContacts] = useState(plan?.maxContacts || -1);
  const [maxPipelines, setMaxPipelines] = useState(plan?.maxPipelines || -1);
  const [maxUsers, setMaxUsers] = useState(plan?.maxUsers || -1);
  const [isDefault, setIsDefault] = useState(plan?.isDefault || false);
  const [isActive, setIsActive] = useState(plan?.isActive ?? true);

  const addFeature = () => {
    setFeatures([...features, ""]);
  };

  const removeFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const updateFeature = (index: number, value: string) => {
    const updated = [...features];
    updated[index] = value;
    setFeatures(updated);
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Filter out empty features
    const cleanFeatures = features.filter((f) => f.trim());

    try {
      if (mode === "create") {
        const result = await createAgencyPlan({
          name,
          description,
          priceMonthly,
          priceYearly: priceYearly || undefined,
          features: cleanFeatures,
          maxContacts: maxContacts === -1 ? undefined : maxContacts,
          maxPipelines: maxPipelines === -1 ? undefined : maxPipelines,
          maxUsers: maxUsers === -1 ? undefined : maxUsers,
          isDefault,
        });

        if ("error" in result) {
          setError(result.error ?? "Unknown error");
          setIsLoading(false);
          return;
        }

        router.push("/agency/saas/plans");
      } else if (plan) {
        const result = await updateAgencyPlan(plan.id, {
          name,
          description,
          features: cleanFeatures,
          maxContacts: maxContacts === -1 ? undefined : maxContacts,
          maxPipelines: maxPipelines === -1 ? undefined : maxPipelines,
          maxUsers: maxUsers === -1 ? undefined : maxUsers,
          isDefault,
          isActive,
        });

        if ("error" in result) {
          setError(result.error ?? "Unknown error");
          setIsLoading(false);
          return;
        }

        router.push("/agency/saas/plans");
      }
    } catch (err) {
      console.error("Error saving plan:", err);
      setError("Something went wrong. Please try again.");
      setIsLoading(false);
    }
  }

  async function handleDelete() {
    if (!plan) return;
    setIsDeleting(true);

    try {
      const result = await deleteAgencyPlan(plan.id);

      if ("error" in result) {
        setError(result.error ?? "Unknown error");
        setIsDeleting(false);
        return;
      }

      router.push("/agency/saas/plans");
    } catch (err) {
      console.error("Error deleting plan:", err);
      setError("Something went wrong. Please try again.");
      setIsDeleting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Basic Info */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>
              Set the name and description for this plan
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Plan Name</Label>
              <Input
                id="name"
                placeholder="e.g., Starter, Pro, Enterprise"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="A brief description of what this plan includes"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </div>

            <div className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <Label htmlFor="isDefault">Default Plan</Label>
                <p className="text-sm text-muted-foreground">
                  Pre-select this plan on the signup page
                </p>
              </div>
              <Switch
                id="isDefault"
                checked={isDefault}
                onCheckedChange={setIsDefault}
              />
            </div>

            {mode === "edit" && (
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <Label htmlFor="isActive">Active</Label>
                  <p className="text-sm text-muted-foreground">
                    Inactive plans are hidden from signup
                  </p>
                </div>
                <Switch
                  id="isActive"
                  checked={isActive}
                  onCheckedChange={setIsActive}
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Pricing */}
        <Card>
          <CardHeader>
            <CardTitle>Pricing</CardTitle>
            <CardDescription>
              Set the subscription prices
              {mode === "edit" && (
                <span className="block text-amber-600 dark:text-amber-400">
                  Note: Prices cannot be changed after creation
                </span>
              )}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="priceMonthly">Monthly Price (&euro;)</Label>
              <Input
                id="priceMonthly"
                type="number"
                min="0"
                step="0.01"
                placeholder="49.00"
                value={priceMonthly || ""}
                onChange={(e) => setPriceMonthly(parseFloat(e.target.value) || 0)}
                disabled={mode === "edit"}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="priceYearly">
                Yearly Price (&euro;) <span className="text-muted-foreground">(optional)</span>
              </Label>
              <Input
                id="priceYearly"
                type="number"
                min="0"
                step="0.01"
                placeholder="490.00"
                value={priceYearly || ""}
                onChange={(e) => setPriceYearly(parseFloat(e.target.value) || 0)}
                disabled={mode === "edit"}
              />
              {priceMonthly > 0 && priceYearly > 0 && (
                <p className="text-sm text-green-600 dark:text-green-400">
                  {Math.round((1 - priceYearly / (priceMonthly * 12)) * 100)}% discount on yearly
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Limits */}
        <Card>
          <CardHeader>
            <CardTitle>Usage Limits</CardTitle>
            <CardDescription>
              Set limits for this plan (-1 for unlimited)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="maxContacts">Max Contacts</Label>
              <Input
                id="maxContacts"
                type="number"
                min="-1"
                placeholder="-1 for unlimited"
                value={maxContacts}
                onChange={(e) => setMaxContacts(parseInt(e.target.value) || -1)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxPipelines">Max Pipelines</Label>
              <Input
                id="maxPipelines"
                type="number"
                min="-1"
                placeholder="-1 for unlimited"
                value={maxPipelines}
                onChange={(e) => setMaxPipelines(parseInt(e.target.value) || -1)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxUsers">Max Users</Label>
              <Input
                id="maxUsers"
                type="number"
                min="-1"
                placeholder="-1 for unlimited"
                value={maxUsers}
                onChange={(e) => setMaxUsers(parseInt(e.target.value) || -1)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <Card>
          <CardHeader>
            <CardTitle>Features</CardTitle>
            <CardDescription>
              List the features included in this plan
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {features.map((feature, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  placeholder="e.g., Email support"
                  value={feature}
                  onChange={(e) => updateFeature(index, e.target.value)}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFeature(index)}
                  disabled={features.length === 1}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              onClick={addFeature}
              className="w-full"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Feature
            </Button>
          </CardContent>
        </Card>
      </div>

      {error && (
        <div className="mt-6 rounded-lg bg-red-50 p-4 text-sm text-red-600 dark:bg-red-900/30 dark:text-red-400">
          {error}
        </div>
      )}

      <div className="mt-8 flex items-center justify-between">
        <Link href="/agency/saas/plans">
          <Button type="button" variant="ghost">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Plans
          </Button>
        </Link>

        <div className="flex gap-3">
          {mode === "edit" && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button type="button" variant="destructive" disabled={isDeleting}>
                  {isDeleting ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="mr-2 h-4 w-4" />
                  )}
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete this plan?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will archive the plan and hide it from new signups.
                    Existing subscriptions will not be affected.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete}>
                    Delete Plan
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}

          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {mode === "create" ? "Create Plan" : "Save Changes"}
          </Button>
        </div>
      </div>
    </form>
  );
}
