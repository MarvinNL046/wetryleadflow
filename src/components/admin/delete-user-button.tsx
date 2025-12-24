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
import { canDeleteUser, deleteUser } from "@/lib/actions/admin";

interface DeleteUserButtonProps {
  userId: number;
  userEmail: string;
  userName?: string;
}

export function DeleteUserButton({ userId, userEmail, userName }: DeleteUserButtonProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(false);
  const [canDelete, setCanDelete] = useState<boolean | null>(null);
  const [reasons, setReasons] = useState<string[]>([]);
  const [orgsToDelete, setOrgsToDelete] = useState<{ id: number; name: string }[]>([]);
  const [forceDelete, setForceDelete] = useState(false);

  const handleOpenChange = async (isOpen: boolean) => {
    setOpen(isOpen);
    if (isOpen) {
      // Check if user can be deleted
      setChecking(true);
      try {
        const result = await canDeleteUser(userId);
        setCanDelete(result.canDelete);
        setReasons(result.reasons);
        setOrgsToDelete(result.orgsToTransfer);
      } catch (error) {
        setReasons([error instanceof Error ? error.message : "Failed to check"]);
        setCanDelete(false);
      } finally {
        setChecking(false);
      }
    } else {
      // Reset state
      setCanDelete(null);
      setReasons([]);
      setOrgsToDelete([]);
      setForceDelete(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteUser(userId, forceDelete);
      setOpen(false);
      router.refresh();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Failed to delete user");
    } finally {
      setLoading(false);
    }
  };

  const displayName = userName || userEmail;

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
            Delete User
          </AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div className="space-y-3">
              {checking ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Checking if user can be deleted...</span>
                </div>
              ) : (
                <>
                  <p>
                    Are you sure you want to delete <strong>{displayName}</strong>?
                  </p>
                  <p className="text-sm text-red-500">
                    This action cannot be undone. All user data will be permanently removed.
                  </p>

                  {reasons.length > 0 && (
                    <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 dark:border-amber-900/50 dark:bg-amber-950/30">
                      <p className="mb-2 font-medium text-amber-800 dark:text-amber-400">
                        Warning:
                      </p>
                      <ul className="list-inside list-disc space-y-1 text-sm text-amber-700 dark:text-amber-500">
                        {reasons.map((reason, i) => (
                          <li key={i}>{reason}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {orgsToDelete.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-sm">
                        Organizations that will be deleted if you force delete:
                      </p>
                      <ul className="list-inside list-disc text-sm text-zinc-500">
                        {orgsToDelete.map((org) => (
                          <li key={org.id}>{org.name}</li>
                        ))}
                      </ul>
                      <label className="flex cursor-pointer items-center gap-2 pt-2">
                        <input
                          type="checkbox"
                          checked={forceDelete}
                          onChange={(e) => setForceDelete(e.target.checked)}
                          className="h-4 w-4 rounded border-zinc-300 text-red-600 focus:ring-red-500"
                        />
                        <span className="text-sm font-medium">
                          Force delete user and their organizations
                        </span>
                      </label>
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
            disabled={loading || checking || (!canDelete && !forceDelete)}
            className="bg-red-600 hover:bg-red-700"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              "Delete User"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
