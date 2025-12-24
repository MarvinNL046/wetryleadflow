"use client";

import { useState } from "react";
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
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Plus, Pencil, Trash2, Route, Loader2 } from "lucide-react";
import {
  upsertLeadIngestRoute,
  deleteLeadIngestRoute,
  syncPageForms,
} from "@/lib/actions/integrations";

interface Page {
  id: number;
  pageName: string;
  forms: Array<{ id: number; formId: string; formName: string | null }>;
}

interface Pipeline {
  id: number;
  name: string;
  stages: Array<{ id: number; name: string; order: number }>;
}

interface Member {
  id: number;
  name: string;
  email: string;
}

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

interface LeadRoutingConfigProps {
  pages: Page[];
  pipelines: Pipeline[];
  members: Member[];
  existingRoutes: ExistingRoute[];
}

export function LeadRoutingConfig({
  pages,
  pipelines,
  members,
  existingRoutes,
}: LeadRoutingConfigProps) {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRoute, setEditingRoute] = useState<ExistingRoute | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isSyncingForms, setIsSyncingForms] = useState<number | null>(null);

  // Form state
  const [selectedPageId, setSelectedPageId] = useState<string>("");
  const [selectedFormId, setSelectedFormId] = useState<string>("");
  const [selectedPipelineId, setSelectedPipelineId] = useState<string>("");
  const [selectedStageId, setSelectedStageId] = useState<string>("");
  const [selectedAssigneeId, setSelectedAssigneeId] = useState<string>("");
  const [isActive, setIsActive] = useState(true);

  const selectedPage = pages.find((p) => p.id === parseInt(selectedPageId));
  const selectedPipeline = pipelines.find((p) => p.id === parseInt(selectedPipelineId));

  const openCreateDialog = () => {
    setEditingRoute(null);
    setSelectedPageId("");
    setSelectedFormId("");
    setSelectedPipelineId(pipelines[0]?.id.toString() || "");
    setSelectedStageId(pipelines[0]?.stages[0]?.id.toString() || "");
    setSelectedAssigneeId("");
    setIsActive(true);
    setIsDialogOpen(true);
  };

  const openEditDialog = (route: ExistingRoute) => {
    setEditingRoute(route);
    setSelectedPageId(route.page?.id.toString() || "");
    setSelectedFormId(route.form?.id.toString() || "");
    setSelectedPipelineId(route.pipeline.id.toString());
    setSelectedStageId(route.stage.id.toString());
    setSelectedAssigneeId(route.assignTo?.id.toString() || "");
    setIsActive(route.isActive);
    setIsDialogOpen(true);
  };

  const handleSyncForms = async (pageId: number) => {
    setIsSyncingForms(pageId);
    try {
      await syncPageForms(pageId);
      router.refresh();
    } catch (error) {
      console.error("Failed to sync forms:", error);
    } finally {
      setIsSyncingForms(null);
    }
  };

  const handleSave = async () => {
    if (!selectedPageId || !selectedPipelineId || !selectedStageId) return;

    setIsSaving(true);
    try {
      await upsertLeadIngestRoute({
        id: editingRoute?.id,
        metaPageId: parseInt(selectedPageId),
        metaFormId: selectedFormId ? parseInt(selectedFormId) : null,
        pipelineId: parseInt(selectedPipelineId),
        stageId: parseInt(selectedStageId),
        assignToUserId: selectedAssigneeId ? parseInt(selectedAssigneeId) : null,
        isActive,
      });
      setIsDialogOpen(false);
      router.refresh();
    } catch (error) {
      console.error("Failed to save route:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (routeId: number) => {
    try {
      await deleteLeadIngestRoute(routeId);
      router.refresh();
    } catch (error) {
      console.error("Failed to delete route:", error);
    }
  };

  if (pages.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-zinc-300 p-8 text-center dark:border-zinc-700">
        <Route className="mx-auto h-12 w-12 text-zinc-400" />
        <h3 className="mt-4 text-lg font-semibold">No pages connected</h3>
        <p className="mt-2 text-sm text-zinc-500">
          Connect your Meta account and pages first to configure lead routing.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Lead Routing Rules</h3>
          <p className="text-sm text-zinc-500">
            Configure where leads from each page/form should go
          </p>
        </div>
        <Button onClick={openCreateDialog}>
          <Plus className="mr-2 h-4 w-4" />
          Add Route
        </Button>
      </div>

      {existingRoutes.length === 0 ? (
        <div className="rounded-lg border border-dashed border-zinc-300 p-6 text-center dark:border-zinc-700">
          <p className="text-sm text-zinc-500">
            No routing rules configured yet. Add a route to start receiving leads.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {existingRoutes.map((route) => (
            <div
              key={route.id}
              className="flex items-center justify-between rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900">
                  <Route className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">
                      {route.page?.name || "All Pages"}
                    </span>
                    {route.form && (
                      <>
                        <span className="text-zinc-400">/</span>
                        <span className="text-zinc-600 dark:text-zinc-400">
                          {route.form.name || "Unknown Form"}
                        </span>
                      </>
                    )}
                    {!route.form && (
                      <Badge variant="outline" className="text-xs">
                        All Forms
                      </Badge>
                    )}
                  </div>
                  <div className="mt-1 flex items-center gap-2 text-sm text-zinc-500">
                    <span>
                      {route.pipeline.name} / {route.stage.name}
                    </span>
                    {route.assignTo && (
                      <>
                        <span className="text-zinc-300">|</span>
                        <span>Assigned to {route.assignTo.name}</span>
                      </>
                    )}
                    {route.mappingCount > 0 && (
                      <>
                        <span className="text-zinc-300">|</span>
                        <span>{route.mappingCount} field mappings</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={route.isActive ? "default" : "secondary"}>
                  {route.isActive ? "Active" : "Inactive"}
                </Badge>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => openEditDialog(route)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Route?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will stop routing leads from this page/form. Existing
                        leads will not be affected.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(route.id)}>
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {editingRoute ? "Edit Route" : "Create Route"}
            </DialogTitle>
            <DialogDescription>
              Configure where leads should be routed based on the source page and
              form.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Page Selection */}
            <div className="space-y-2">
              <Label>Source Page</Label>
              <Select value={selectedPageId} onValueChange={setSelectedPageId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a page" />
                </SelectTrigger>
                <SelectContent>
                  {pages.map((page) => (
                    <SelectItem key={page.id} value={page.id.toString()}>
                      {page.pageName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Form Selection */}
            {selectedPage && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Source Form (optional)</Label>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSyncForms(selectedPage.id)}
                    disabled={isSyncingForms === selectedPage.id}
                  >
                    {isSyncingForms === selectedPage.id ? (
                      <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                    ) : null}
                    Sync Forms
                  </Button>
                </div>
                <Select value={selectedFormId} onValueChange={setSelectedFormId}>
                  <SelectTrigger>
                    <SelectValue placeholder="All forms (catch-all)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All forms (catch-all)</SelectItem>
                    {selectedPage.forms.map((form) => (
                      <SelectItem key={form.id} value={form.id.toString()}>
                        {form.formName || form.formId}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-zinc-500">
                  Leave empty to route all leads from this page
                </p>
              </div>
            )}

            {/* Pipeline Selection */}
            <div className="space-y-2">
              <Label>Target Pipeline</Label>
              <Select
                value={selectedPipelineId}
                onValueChange={(val) => {
                  setSelectedPipelineId(val);
                  const pipeline = pipelines.find((p) => p.id === parseInt(val));
                  setSelectedStageId(pipeline?.stages[0]?.id.toString() || "");
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a pipeline" />
                </SelectTrigger>
                <SelectContent>
                  {pipelines.map((pipeline) => (
                    <SelectItem key={pipeline.id} value={pipeline.id.toString()}>
                      {pipeline.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Stage Selection */}
            {selectedPipeline && (
              <div className="space-y-2">
                <Label>Initial Stage</Label>
                <Select value={selectedStageId} onValueChange={setSelectedStageId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a stage" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedPipeline.stages.map((stage) => (
                      <SelectItem key={stage.id} value={stage.id.toString()}>
                        {stage.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Assignee Selection */}
            <div className="space-y-2">
              <Label>Auto-assign to (optional)</Label>
              <Select value={selectedAssigneeId} onValueChange={setSelectedAssigneeId}>
                <SelectTrigger>
                  <SelectValue placeholder="No auto-assignment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">No auto-assignment</SelectItem>
                  {members.map((member) => (
                    <SelectItem key={member.id} value={member.id.toString()}>
                      {member.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Active Toggle */}
            <div className="flex items-center justify-between">
              <div>
                <Label>Active</Label>
                <p className="text-xs text-zinc-500">
                  Inactive routes will not receive new leads
                </p>
              </div>
              <Switch checked={isActive} onCheckedChange={setIsActive} />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={!selectedPageId || !selectedPipelineId || !selectedStageId || isSaving}
            >
              {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {editingRoute ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
