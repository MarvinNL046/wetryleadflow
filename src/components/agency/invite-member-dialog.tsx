"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Mail, Shield, Users, Loader2, CheckCircle2 } from "lucide-react";
import { inviteTeamMember } from "@/lib/actions/agency-team";

interface InviteMemberDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function InviteMemberDialog({
  open,
  onOpenChange,
  onSuccess,
}: InviteMemberDialogProps) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"admin" | "member">("member");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    setIsLoading(true);
    setError(null);

    const result = await inviteTeamMember({ email, role });

    setIsLoading(false);

    if (result.success) {
      setSuccess(true);
      setTimeout(() => {
        setEmail("");
        setRole("member");
        setSuccess(false);
        onOpenChange(false);
        onSuccess?.();
      }, 1500);
    } else {
      setError(result.error || "Failed to send invite");
    }
  }

  function handleOpenChange(open: boolean) {
    if (!open) {
      setEmail("");
      setRole("member");
      setError(null);
      setSuccess(false);
    }
    onOpenChange(open);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-violet-500" />
            Invite Team Member
          </DialogTitle>
          <DialogDescription>
            Send an invitation email to add someone to your agency team.
          </DialogDescription>
        </DialogHeader>

        {success ? (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/50">
              <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <p className="text-lg font-medium text-green-600 dark:text-green-400">
              Invitation Sent!
            </p>
            <p className="text-sm text-zinc-500">
              An email has been sent to {email}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Input */}
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="colleague@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>

            {/* Role Select */}
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select
                value={role}
                onValueChange={(value) => setRole(value as "admin" | "member")}
                disabled={isLoading}
              >
                <SelectTrigger id="role">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-violet-500" />
                      <div>
                        <span className="font-medium">Admin</span>
                        <span className="ml-2 text-xs text-zinc-500">
                          Manage clients & users
                        </span>
                      </div>
                    </div>
                  </SelectItem>
                  <SelectItem value="member">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-blue-500" />
                      <div>
                        <span className="font-medium">Member</span>
                        <span className="ml-2 text-xs text-zinc-500">
                          View only access
                        </span>
                      </div>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Role Description */}
            <div className="rounded-lg border border-zinc-200/50 bg-zinc-50/50 p-3 dark:border-zinc-800/50 dark:bg-zinc-900/50">
              {role === "admin" ? (
                <div className="flex items-start gap-3">
                  <Shield className="mt-0.5 h-4 w-4 text-violet-500" />
                  <div>
                    <p className="text-sm font-medium">Admin Permissions</p>
                    <ul className="mt-1 text-xs text-zinc-500">
                      <li>• Manage client organizations</li>
                      <li>• Invite and manage team members</li>
                      <li>• Access all agency features</li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-3">
                  <Users className="mt-0.5 h-4 w-4 text-blue-500" />
                  <div>
                    <p className="text-sm font-medium">Member Permissions</p>
                    <ul className="mt-1 text-xs text-zinc-500">
                      <li>• View agency dashboard</li>
                      <li>• Access client portals</li>
                      <li>• View-only access to settings</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Error Message */}
            {error && (
              <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
                {error}
              </div>
            )}

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => handleOpenChange(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading || !email.trim()}
                className="bg-gradient-to-r from-violet-600 to-purple-600"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Mail className="mr-2 h-4 w-4" />
                    Send Invitation
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
