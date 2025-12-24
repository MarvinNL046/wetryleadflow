"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useUser } from "@stackframe/stack";
import { getInviteInfo, acceptInvite } from "@/lib/actions/agency-team";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, CheckCircle2, XCircle, Loader2, UserPlus, Shield, Users } from "lucide-react";

export default function AcceptInvitePage() {
  const params = useParams();
  const router = useRouter();
  const user = useUser();
  const token = params.token as string;

  const [status, setStatus] = useState<"loading" | "ready" | "accepting" | "success" | "error">("loading");
  const [inviteInfo, setInviteInfo] = useState<{
    agencyName?: string;
    role?: string;
    email?: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function checkInvite() {
      const info = await getInviteInfo(token);

      if (!info.valid) {
        setError(info.error || "Invalid invite");
        setStatus("error");
        return;
      }

      setInviteInfo({
        agencyName: info.agencyName,
        role: info.role,
        email: info.email,
      });
      setStatus("ready");
    }

    checkInvite();
  }, [token]);

  async function handleAccept() {
    if (!user) {
      // Redirect to sign-up with return URL
      const returnUrl = `/agency/invite/${token}`;
      router.push(`/handler/sign-up?after_auth_return_to=${encodeURIComponent(returnUrl)}`);
      return;
    }

    setStatus("accepting");
    const result = await acceptInvite(token);

    if (result.success) {
      setStatus("success");
      setTimeout(() => {
        router.push("/agency");
      }, 2000);
    } else {
      setError(result.error || "Failed to accept invite");
      setStatus("error");
    }
  }

  const RoleIcon = inviteInfo?.role === "admin" ? Shield : Users;

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-950 dark:to-zinc-900">
        <Card className="w-full max-w-md border-zinc-200/50 bg-white/80 backdrop-blur dark:border-zinc-800/50 dark:bg-zinc-900/80">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-violet-500" />
            <p className="mt-4 text-zinc-500">Loading invite details...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-950 dark:to-zinc-900">
        <Card className="w-full max-w-md border-red-200/50 bg-white/80 backdrop-blur dark:border-red-800/50 dark:bg-zinc-900/80">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/50">
              <XCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
            </div>
            <CardTitle className="text-red-600 dark:text-red-400">
              Invalid Invite
            </CardTitle>
            <CardDescription>{error}</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Button variant="outline" onClick={() => router.push("/")}>
              Go to Homepage
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-950 dark:to-zinc-900">
        <Card className="w-full max-w-md border-green-200/50 bg-white/80 backdrop-blur dark:border-green-800/50 dark:bg-zinc-900/80">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/50">
              <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <CardTitle className="text-green-600 dark:text-green-400">
              Welcome to the Team!
            </CardTitle>
            <CardDescription>
              You&apos;ve successfully joined {inviteInfo?.agencyName}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-2">
            <Loader2 className="h-5 w-5 animate-spin text-zinc-400" />
            <p className="text-sm text-zinc-500">Redirecting to dashboard...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-950 dark:to-zinc-900">
      <Card className="w-full max-w-md border-zinc-200/50 bg-white/80 backdrop-blur dark:border-zinc-800/50 dark:bg-zinc-900/80">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-purple-600">
            <Building2 className="h-8 w-8 text-white" />
          </div>
          <CardTitle>You&apos;re Invited!</CardTitle>
          <CardDescription>
            Join <strong>{inviteInfo?.agencyName}</strong> on LeadFlow
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Role Info */}
          <div className="rounded-lg border border-violet-200/50 bg-violet-50/50 p-4 dark:border-violet-800/50 dark:bg-violet-900/20">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-100 dark:bg-violet-900/50">
                <RoleIcon className="h-5 w-5 text-violet-600 dark:text-violet-400" />
              </div>
              <div>
                <p className="font-medium text-violet-700 dark:text-violet-300">
                  {inviteInfo?.role === "admin" ? "Admin" : "Team Member"}
                </p>
                <p className="text-sm text-violet-600/70 dark:text-violet-400/70">
                  {inviteInfo?.role === "admin"
                    ? "Manage clients and team members"
                    : "View agency data and access client portals"}
                </p>
              </div>
            </div>
          </div>

          {/* Email Match Warning */}
          {user && user.primaryEmail?.toLowerCase() !== inviteInfo?.email?.toLowerCase() && (
            <div className="rounded-lg border border-amber-200/50 bg-amber-50/50 p-4 dark:border-amber-800/50 dark:bg-amber-900/20">
              <p className="text-sm text-amber-700 dark:text-amber-300">
                <strong>Note:</strong> This invite was sent to{" "}
                <span className="font-mono">{inviteInfo?.email}</span>. You&apos;re
                currently signed in as{" "}
                <span className="font-mono">{user.primaryEmail}</span>.
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="space-y-3">
            {user ? (
              <Button
                onClick={handleAccept}
                disabled={status === "accepting"}
                className="w-full bg-gradient-to-r from-violet-600 to-purple-600"
              >
                {status === "accepting" ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Joining...
                  </>
                ) : (
                  <>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Accept Invitation
                  </>
                )}
              </Button>
            ) : (
              <>
                <Button
                  onClick={handleAccept}
                  className="w-full bg-gradient-to-r from-violet-600 to-purple-600"
                >
                  <UserPlus className="mr-2 h-4 w-4" />
                  Sign Up to Accept
                </Button>
                <p className="text-center text-sm text-zinc-500">
                  Already have an account?{" "}
                  <a
                    href={`/handler/sign-in?after_auth_return_to=/agency/invite/${token}`}
                    className="font-medium text-violet-600 hover:text-violet-700 dark:text-violet-400"
                  >
                    Sign in
                  </a>
                </p>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
