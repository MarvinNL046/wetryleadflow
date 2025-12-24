"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, AlertTriangle, Loader2, Building2, Users, UserCircle, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { canDeleteOrg, deleteOrg } from "@/lib/actions/admin";

interface DeleteOrgButtonProps {
  orgId: number;
  orgName: string;
}

export function DeleteOrgButton({ orgId, orgName }: DeleteOrgButtonProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(false);
  const [warnings, setWarnings] = useState<string[]>([]);
  const [stats, setStats] = useState<{
    memberCount: number;
    contactCount: number;
    opportunityCount: number;
    workspaceCount: number;
  } | null>(null);

  const handleOpenChange = async (isOpen: boolean) => {
    setOpen(isOpen);
    if (isOpen) {
      // Check org stats
      setChecking(true);
      try {
        const result = await canDeleteOrg(orgId);
        setWarnings(result.warnings);
        setStats({
          memberCount: result.memberCount,
          contactCount: result.contactCount,
          opportunityCount: result.opportunityCount,
          workspaceCount: result.workspaceCount,
        });
      } catch (error) {
        setWarnings([error instanceof Error ? error.message : "Failed to check"]);
      } finally {
        setChecking(false);
      }
    } else {
      // Reset state
      setWarnings([]);
      setStats(null);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteOrg(orgId);
      setOpen(false);
      router.refresh();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Failed to delete organization");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={handleOpenChange}>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 gap-1.5 text-red-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30"
        >
          <Trash2 className="h-4 w-4" />
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            Delete Organization
          </AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div className="space-y-3">
              {checking ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Checking organization data...</span>
                </div>
              ) : (
                <>
                  <p>
                    Are you sure you want to delete <strong>{orgName}</strong>?
                  </p>
                  <p className="text-sm text-red-500">
                    This action cannot be undone. All organization data will be permanently removed.
                  </p>

                  {stats && (
                    <div className="grid grid-cols-2 gap-3 rounded-lg border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-900">
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-zinc-500" />
                        <span className="text-sm">{stats.workspaceCount} workspace(s)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-zinc-500" />
                        <span className="text-sm">{stats.memberCount} member(s)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <UserCircle className="h-4 w-4 text-zinc-500" />
                        <span className="text-sm">{stats.contactCount} contact(s)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Target className="h-4 w-4 text-zinc-500" />
                        <span className="text-sm">{stats.opportunityCount} opportunity/ies</span>
                      </div>
                    </div>
                  )}

                  {warnings.length > 0 && (
                    <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 dark:border-amber-900/50 dark:bg-amber-950/30">
                      <p className="mb-2 font-medium text-amber-800 dark:text-amber-400">
                        Warning:
                      </p>
                      <ul className="list-inside list-disc space-y-1 text-sm text-amber-700 dark:text-amber-500">
                        {warnings.map((warning, i) => (
                          <li key={i}>{warning}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              )}
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              handleDelete();
            }}
            disabled={loading || checking}
            className="bg-red-600 hover:bg-red-700"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              "Delete Organization"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
