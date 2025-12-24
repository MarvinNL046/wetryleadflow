"use client";

import { useState, useTransition, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { deleteAccount, checkAccountDeletion } from "@/lib/actions/settings";
import { Loader2, AlertTriangle } from "lucide-react";

export function DeleteAccountDialog() {
  const [open, setOpen] = useState(false);
  const [confirmation, setConfirmation] = useState("");
  const [isPending, startTransition] = useTransition();
  const [isChecking, setIsChecking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [soleOwnerOrgs, setSoleOwnerOrgs] = useState<{ id: number; name: string }[]>([]);
  const [deleteOrgs, setDeleteOrgs] = useState(false);

  // Check for blocking organizations when dialog opens
  useEffect(() => {
    if (open) {
      setIsChecking(true);
      checkAccountDeletion()
        .then((result) => {
          setSoleOwnerOrgs(result.soleOwnerOrgs);
        })
        .catch((err) => {
          setError(err instanceof Error ? err.message : "Failed to check account");
        })
        .finally(() => {
          setIsChecking(false);
        });
    }
  }, [open]);

  const handleDelete = () => {
    setError(null);

    startTransition(async () => {
      try {
        await deleteAccount(confirmation, deleteOrgs);
        // If successful, user will be redirected
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to delete account");
      }
    });
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!isPending) {
      setOpen(newOpen);
      if (!newOpen) {
        setConfirmation("");
        setError(null);
        setSoleOwnerOrgs([]);
        setDeleteOrgs(false);
      }
    }
  };

  const isConfirmed = confirmation.toLowerCase() === "delete";
  const canProceed = soleOwnerOrgs.length === 0 || deleteOrgs;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete Account</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="h-5 w-5" />
            Delete Account
          </DialogTitle>
          <DialogDescription className="text-left">
            This action is <strong>permanent</strong> and cannot be undone. All your data will be deleted.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {isChecking ? (
            <div className="flex items-center gap-2 text-sm text-zinc-500">
              <Loader2 className="h-4 w-4 animate-spin" />
              Checking account...
            </div>
          ) : (
            <>
              <div className="rounded-md bg-red-50 p-4 dark:bg-red-950">
                <h4 className="text-sm font-medium text-red-800 dark:text-red-200">
                  What will be deleted:
                </h4>
                <ul className="mt-2 list-inside list-disc text-sm text-red-700 dark:text-red-300">
                  <li>Your user profile and settings</li>
                  <li>Your membership in all organizations</li>
                  <li>Access to all workspaces</li>
                </ul>
              </div>

              {soleOwnerOrgs.length > 0 && (
                <div className="rounded-md border border-amber-200 bg-amber-50 p-4 dark:border-amber-900 dark:bg-amber-950">
                  <h4 className="text-sm font-medium text-amber-800 dark:text-amber-200">
                    You are the sole owner of:
                  </h4>
                  <ul className="mt-2 list-inside list-disc text-sm text-amber-700 dark:text-amber-300">
                    {soleOwnerOrgs.map((org) => (
                      <li key={org.id}>{org.name}</li>
                    ))}
                  </ul>
                  <label className="mt-3 flex cursor-pointer items-center gap-2">
                    <input
                      type="checkbox"
                      checked={deleteOrgs}
                      onChange={(e) => setDeleteOrgs(e.target.checked)}
                      className="h-4 w-4 rounded border-amber-300 text-amber-600 focus:ring-amber-500"
                    />
                    <span className="text-sm font-medium text-amber-800 dark:text-amber-200">
                      Also delete these organizations and all their data
                    </span>
                  </label>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="confirmation">
                  Type <span className="font-mono font-bold text-red-600">delete</span> to confirm
                </Label>
                <Input
                  id="confirmation"
                  type="text"
                  value={confirmation}
                  onChange={(e) => setConfirmation(e.target.value)}
                  placeholder="delete"
                  disabled={isPending}
                  className="font-mono"
                  autoComplete="off"
                />
              </div>
            </>
          )}

          {error && (
            <div className="rounded-md bg-red-100 p-3 text-sm text-red-800 dark:bg-red-900 dark:text-red-200">
              {error}
            </div>
          )}
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            variant="outline"
            onClick={() => handleOpenChange(false)}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={!isConfirmed || isPending || isChecking || !canProceed}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              "Delete My Account"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
