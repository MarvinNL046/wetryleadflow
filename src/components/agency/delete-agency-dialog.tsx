"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertTriangle, Loader2, Trash2 } from "lucide-react";
import { deleteAgency } from "@/lib/actions/agency";

interface DeleteAgencyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  agencyName: string;
}

export function DeleteAgencyDialog({
  open,
  onOpenChange,
  agencyName,
}: DeleteAgencyDialogProps) {
  const router = useRouter();
  const [confirmText, setConfirmText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const expectedText = `${agencyName} DELETE`;
  const isConfirmed = confirmText === expectedText;

  async function handleDelete() {
    if (!isConfirmed) return;

    setIsDeleting(true);
    setError(null);

    const result = await deleteAgency(confirmText);

    if (result.success) {
      // Redirect to home after successful deletion
      router.push("/");
    } else {
      setError(result.error || "Failed to delete agency");
      setIsDeleting(false);
    }
  }

  function handleOpenChange(open: boolean) {
    if (!open) {
      setConfirmText("");
      setError(null);
    }
    onOpenChange(open);
  }

  return (
    <AlertDialog open={open} onOpenChange={handleOpenChange}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/50">
            <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-400" />
          </div>
          <AlertDialogTitle className="text-center text-red-600 dark:text-red-400">
            Delete Agency
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            This action is <strong>permanent and irreversible</strong>. All agency
            data will be deleted, including:
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="my-4 rounded-lg border border-red-200/50 bg-red-50/50 p-4 dark:border-red-900/50 dark:bg-red-950/30">
          <ul className="space-y-2 text-sm text-red-700 dark:text-red-300">
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
              All client organizations and their data
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
              Team memberships and pending invites
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
              Branding settings and configurations
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
              All associated workspaces and contacts
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <Label htmlFor="confirm" className="text-sm font-medium">
            Type <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-red-600 dark:bg-zinc-800 dark:text-red-400">{expectedText}</code> to confirm:
          </Label>
          <Input
            id="confirm"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            placeholder={expectedText}
            disabled={isDeleting}
            className="font-mono"
          />
        </div>

        {error && (
          <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
            {error}
          </div>
        )}

        <AlertDialogFooter className="mt-4">
          <Button
            variant="outline"
            onClick={() => handleOpenChange(false)}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={!isConfirmed || isDeleting}
          >
            {isDeleting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Agency
              </>
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
