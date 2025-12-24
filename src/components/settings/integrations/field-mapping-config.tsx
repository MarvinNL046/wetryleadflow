"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  ArrowRight,
  Loader2,
  Settings2,
  RefreshCw,
  AlertCircle,
} from "lucide-react";
import {
  getMetaFormFields,
  getFieldMappings,
  updateFieldMappings,
} from "@/lib/actions/integrations";

// LeadFlow contact fields that can be mapped to
const LEADFLOW_FIELDS = [
  { key: "firstName", label: "First Name", type: "text" },
  { key: "lastName", label: "Last Name", type: "text" },
  { key: "fullName", label: "Full Name", type: "text" },
  { key: "email", label: "Email", type: "email" },
  { key: "phone", label: "Phone", type: "phone" },
  { key: "company", label: "Company", type: "text" },
  { key: "jobTitle", label: "Job Title", type: "text" },
  { key: "address", label: "Address", type: "text" },
  { key: "city", label: "City", type: "text" },
  { key: "state", label: "State/Province", type: "text" },
  { key: "postalCode", label: "Postal Code", type: "text" },
  { key: "country", label: "Country", type: "text" },
  { key: "notes", label: "Notes", type: "text" },
  { key: "customField1", label: "Custom Field 1", type: "text" },
  { key: "customField2", label: "Custom Field 2", type: "text" },
  { key: "customField3", label: "Custom Field 3", type: "text" },
];

// Available transforms
const TRANSFORMS = [
  { key: "", label: "No transformation" },
  { key: "phone_e164", label: "Format phone (E.164)" },
  { key: "phone_national", label: "Format phone (national)" },
  { key: "lowercase", label: "Lowercase" },
  { key: "uppercase", label: "Uppercase" },
  { key: "trim", label: "Trim whitespace" },
  { key: "name_capitalize", label: "Capitalize name" },
];

interface ExistingRoute {
  id: number;
  source: string;
  isActive: boolean;
  page: { id: number; name: string } | null;
  form: { id: number; name: string | null } | null;
  pipeline: { id: number; name: string };
  stage: { id: number; name: string };
  assignTo: { id: number; name: string } | null;
  mappingCount: number;
}

interface FieldMappingConfigProps {
  routes: ExistingRoute[];
}

interface MetaField {
  key: string;
  label: string;
  type: string;
}

interface Mapping {
  sourceFieldKey: string;
  sourceFieldLabel?: string;
  targetField: string;
  transform?: string;
}

export function FieldMappingConfig({ routes }: FieldMappingConfigProps) {
  const router = useRouter();
  const [selectedRoute, setSelectedRoute] = useState<ExistingRoute | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [metaFields, setMetaFields] = useState<MetaField[]>([]);
  const [mappings, setMappings] = useState<Mapping[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Load form fields and existing mappings when a route with a form is selected
  useEffect(() => {
    if (selectedRoute?.form) {
      loadFieldsAndMappings();
    }
  }, [selectedRoute]);

  const loadFieldsAndMappings = async () => {
    if (!selectedRoute?.form) return;

    setIsLoading(true);
    setError(null);

    try {
      const [fields, existingMappings] = await Promise.all([
        getMetaFormFields(selectedRoute.form.id),
        getFieldMappings(selectedRoute.id),
      ]);

      setMetaFields(fields);

      // Initialize mappings from existing or create empty ones
      const initialMappings: Mapping[] = fields.map((field) => {
        const existing = existingMappings.find(
          (m) => m.sourceFieldKey === field.key
        );
        return {
          sourceFieldKey: field.key,
          sourceFieldLabel: field.label,
          targetField: existing?.targetField || "",
          transform: existing?.transform || "",
        };
      });

      setMappings(initialMappings);
    } catch (err) {
      console.error("Failed to load fields:", err);
      setError("Failed to load form fields. Try syncing the form first.");
    } finally {
      setIsLoading(false);
    }
  };

  const openMappingDialog = (route: ExistingRoute) => {
    setSelectedRoute(route);
    setMetaFields([]);
    setMappings([]);
    setError(null);
    setIsDialogOpen(true);
  };

  const updateMapping = (
    sourceFieldKey: string,
    field: "targetField" | "transform",
    value: string
  ) => {
    setMappings((prev) =>
      prev.map((m) =>
        m.sourceFieldKey === sourceFieldKey ? { ...m, [field]: value } : m
      )
    );
  };

  const handleSave = async () => {
    if (!selectedRoute) return;

    setIsSaving(true);
    try {
      // Only save mappings that have a target field selected
      const validMappings = mappings.filter((m) => m.targetField);

      await updateFieldMappings(selectedRoute.id, validMappings);
      setIsDialogOpen(false);
      router.refresh();
    } catch (err) {
      console.error("Failed to save mappings:", err);
      setError("Failed to save field mappings");
    } finally {
      setIsSaving(false);
    }
  };

  // Filter routes that have a specific form selected (not "all forms")
  const routesWithForms = routes.filter((r) => r.form !== null);

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold">Field Mappings</h3>
        <p className="text-sm text-zinc-500">
          Map Meta form fields to LeadFlow contact fields
        </p>
      </div>

      {routesWithForms.length === 0 ? (
        <div className="rounded-lg border border-dashed border-zinc-300 p-6 text-center dark:border-zinc-700">
          <Settings2 className="mx-auto h-10 w-10 text-zinc-400" />
          <h3 className="mt-3 text-sm font-semibold">No form-specific routes</h3>
          <p className="mt-1 text-sm text-zinc-500">
            Edit a routing rule above and select a specific form (instead of &quot;All forms&quot;) to configure field mappings for that form.
          </p>
        </div>
      ) : (
      <div className="space-y-2">
        {routesWithForms.map((route) => (
          <div
            key={route.id}
            className="flex items-center justify-between rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900">
                <Settings2 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{route.page?.name}</span>
                  <span className="text-zinc-400">/</span>
                  <span className="text-zinc-600 dark:text-zinc-400">
                    {route.form?.name || "Unknown Form"}
                  </span>
                </div>
                <div className="text-sm text-zinc-500">
                  {route.mappingCount > 0 ? (
                    <span className="text-green-600 dark:text-green-400">
                      {route.mappingCount} field{route.mappingCount !== 1 ? "s" : ""} mapped
                    </span>
                  ) : (
                    <span className="text-amber-600 dark:text-amber-400">
                      No mappings configured
                    </span>
                  )}
                </div>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => openMappingDialog(route)}
            >
              Configure
            </Button>
          </div>
        ))}
      </div>
      )}

      {/* Field Mapping Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Configure Field Mappings</DialogTitle>
            <DialogDescription>
              {selectedRoute?.page?.name} / {selectedRoute?.form?.name}
            </DialogDescription>
          </DialogHeader>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-zinc-400" />
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-8">
              <AlertCircle className="h-10 w-10 text-amber-500" />
              <p className="mt-3 text-center text-sm text-zinc-600 dark:text-zinc-400">
                {error}
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-4"
                onClick={loadFieldsAndMappings}
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Retry
              </Button>
            </div>
          ) : metaFields.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8">
              <AlertCircle className="h-10 w-10 text-zinc-400" />
              <p className="mt-3 text-center text-sm text-zinc-600 dark:text-zinc-400">
                No form fields found. Sync the form from the routing section to
                load available fields.
              </p>
            </div>
          ) : (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-[1fr_auto_1fr_auto] items-center gap-3 text-sm font-medium text-zinc-500">
                <div>Meta Field</div>
                <div></div>
                <div>LeadFlow Field</div>
                <div>Transform</div>
              </div>

              {mappings.map((mapping) => (
                <div
                  key={mapping.sourceFieldKey}
                  className="grid grid-cols-[1fr_auto_1fr_auto] items-center gap-3"
                >
                  {/* Source field (read-only) */}
                  <div className="rounded-md border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800">
                    <div className="font-medium">
                      {mapping.sourceFieldLabel || mapping.sourceFieldKey}
                    </div>
                    <div className="text-xs text-zinc-500">
                      {mapping.sourceFieldKey}
                    </div>
                  </div>

                  {/* Arrow */}
                  <ArrowRight className="h-4 w-4 text-zinc-400" />

                  {/* Target field selector */}
                  <Select
                    value={mapping.targetField}
                    onValueChange={(val) =>
                      updateMapping(mapping.sourceFieldKey, "targetField", val)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select field..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Don&apos;t map</SelectItem>
                      {LEADFLOW_FIELDS.map((field) => (
                        <SelectItem key={field.key} value={field.key}>
                          {field.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {/* Transform selector */}
                  <Select
                    value={mapping.transform || ""}
                    onValueChange={(val) =>
                      updateMapping(mapping.sourceFieldKey, "transform", val)
                    }
                    disabled={!mapping.targetField}
                  >
                    <SelectTrigger className="w-[160px]">
                      <SelectValue placeholder="Transform..." />
                    </SelectTrigger>
                    <SelectContent>
                      {TRANSFORMS.map((transform) => (
                        <SelectItem key={transform.key} value={transform.key}>
                          {transform.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ))}

              <div className="mt-4 rounded-md bg-zinc-50 p-3 text-sm text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                <p className="font-medium">Tips:</p>
                <ul className="mt-1 list-inside list-disc space-y-1">
                  <li>Fields without a mapping will be stored in notes</li>
                  <li>
                    Use phone transforms to standardize phone number formats
                  </li>
                  <li>Name capitalize will properly format names like &quot;john doe&quot; → &quot;John Doe&quot;</li>
                </ul>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={isSaving || isLoading || metaFields.length === 0}
            >
              {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Mappings
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
