"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, AlertTriangle, Loader2 } from "lucide-react";
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
import { canDeleteAgency, deleteAgency } from "@/lib/actions/admin";

interface DeleteAgencyButtonProps {
  agencyId: number;
  agencyName: string;
}

export function DeleteAgencyButton({ agencyId, agencyName }: DeleteAgencyButtonProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(false);
  const [warnings, setWarnings] = useState<string[]>([]);
  const [orgCount, setOrgCount] = useState(0);
  const [memberCount, setMemberCount] = useState(0);

  const handleOpenChange = async (isOpen: boolean) => {
    setOpen(isOpen);
    if (isOpen) {
      // Check deletion warnings
      setChecking(true);
      try {
        const result = await canDeleteAgency(agencyId);
        setWarnings(result.warnings);
        setOrgCount(result.orgCount);
        setMemberCount(result.memberCount);
      } catch (error) {
        setWarnings([error instanceof Error ? error.message : "Failed to check"]);
      } finally {
        setChecking(false);
      }
    } else {
      // Reset state
      setWarnings([]);
      setOrgCount(0);
      setMemberCount(0);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteAgency(agencyId);
      setOpen(false);
      router.refresh();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Failed to delete agency");
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
            Delete Agency
          </AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div className="space-y-3">
              {checking ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Checking agency data...</span>
                </div>
              ) : (
                <>
                  <p>
                    Are you sure you want to delete <strong>{agencyName}</strong>?
                  </p>
                  <p className="text-sm text-red-500">
                    This action cannot be undone. All agency data will be permanently removed.
                  </p>

                  {(orgCount > 0 || memberCount > 0) && (
                    <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-900">
                      <p className="mb-2 text-sm font-medium">Impact Summary:</p>
                      <ul className="list-inside list-disc space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
                        {orgCount > 0 && (
                          <li>
                            {orgCount} client organization(s) will become direct LeadFlow customers
                          </li>
                        )}
                        {memberCount > 0 && (
                          <li>{memberCount} team member(s) will lose agency access</li>
                        )}
                      </ul>
                    </div>
                  )}

                  {warnings.length > 0 && (
                    <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 dark:border-amber-900/50 dark:bg-amber-950/30">
                      <p className="mb-2 font-medium text-amber-800 dark:text-amber-400">
                        Warnings:
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
              "Delete Agency"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
