"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  initiateStripeConnect,
  disconnectStripeConnect,
  enableSaasMode,
  disableSaasMode,
} from "@/lib/actions/stripe-connect";
import {
  CreditCard,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Loader2,
  Unplug,
  Zap,
} from "lucide-react";
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

interface StripeConnectCardProps {
  status: {
    connected: boolean;
    accountId?: string;
    chargesEnabled?: boolean;
    payoutsEnabled?: boolean;
    detailsSubmitted?: boolean;
    onboardingComplete?: boolean;
    dashboardUrl?: string | null;
    requirements?: {
      currently_due?: string[] | null;
      eventually_due?: string[] | null;
      past_due?: string[] | null;
    } | null;
  };
  agencyName: string;
  saasMode: boolean;
}

export function StripeConnectCard({
  status,
  agencyName,
  saasMode,
}: StripeConnectCardProps) {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isDisconnecting, setIsDisconnecting] = useState(false);
  const [isTogglingMode, setIsTogglingMode] = useState(false);

  async function handleConnect() {
    setIsConnecting(true);
    try {
      const result = await initiateStripeConnect();
      if (result.url) {
        window.location.href = result.url;
      } else if (result.error) {
        alert(result.error);
      }
    } catch (error) {
      console.error("Error connecting Stripe:", error);
      alert("Failed to connect Stripe");
    } finally {
      setIsConnecting(false);
    }
  }

  async function handleDisconnect() {
    setIsDisconnecting(true);
    try {
      const result = await disconnectStripeConnect();
      if (result.success) {
        window.location.reload();
      } else if (result.error) {
        alert(result.error);
      }
    } catch (error) {
      console.error("Error disconnecting Stripe:", error);
      alert("Failed to disconnect Stripe");
    } finally {
      setIsDisconnecting(false);
    }
  }

  async function handleToggleSaasMode() {
    setIsTogglingMode(true);
    try {
      const result = saasMode
        ? await disableSaasMode()
        : await enableSaasMode();
      if ("success" in result && result.success) {
        window.location.reload();
      } else if ("error" in result) {
        alert(result.error);
      }
    } catch (error) {
      console.error("Error toggling SaaS mode:", error);
      alert("Failed to toggle SaaS mode");
    } finally {
      setIsTogglingMode(false);
    }
  }

  const hasRequirements =
    status.requirements?.currently_due?.length ||
    status.requirements?.past_due?.length;

  return (
    <div className="space-y-6">
      {/* Connection Status Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-100 dark:bg-violet-900/30">
                <CreditCard className="h-5 w-5 text-violet-600 dark:text-violet-400" />
              </div>
              <div>
                <CardTitle>Stripe Connect</CardTitle>
                <CardDescription>
                  Accept payments from your clients
                </CardDescription>
              </div>
            </div>
            {status.connected && (
              <Badge
                variant={status.onboardingComplete ? "default" : "secondary"}
                className={
                  status.onboardingComplete
                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                    : ""
                }
              >
                {status.onboardingComplete ? (
                  <>
                    <CheckCircle2 className="mr-1 h-3 w-3" />
                    Connected
                  </>
                ) : (
                  <>
                    <AlertCircle className="mr-1 h-3 w-3" />
                    Setup Required
                  </>
                )}
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {!status.connected ? (
            <>
              <p className="text-sm text-muted-foreground">
                Connect your Stripe account to start accepting payments from
                your clients. You&apos;ll receive payments directly to your bank
                account.
              </p>
              <div className="flex items-center gap-2">
                <Button onClick={handleConnect} disabled={isConnecting}>
                  {isConnecting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Connecting...
                    </>
                  ) : (
                    <>
                      <CreditCard className="mr-2 h-4 w-4" />
                      Connect Stripe Account
                    </>
                  )}
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="rounded-lg border bg-muted/50 p-4">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="flex items-center gap-2">
                    <div
                      className={`h-2 w-2 rounded-full ${
                        status.chargesEnabled ? "bg-green-500" : "bg-yellow-500"
                      }`}
                    />
                    <span className="text-sm">
                      Charges:{" "}
                      {status.chargesEnabled ? "Enabled" : "Pending"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className={`h-2 w-2 rounded-full ${
                        status.payoutsEnabled ? "bg-green-500" : "bg-yellow-500"
                      }`}
                    />
                    <span className="text-sm">
                      Payouts:{" "}
                      {status.payoutsEnabled ? "Enabled" : "Pending"}
                    </span>
                  </div>
                </div>
              </div>

              {hasRequirements && (
                <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-800 dark:bg-yellow-900/20">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="mt-0.5 h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                    <div>
                      <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                        Action Required
                      </p>
                      <p className="mt-1 text-sm text-yellow-700 dark:text-yellow-300">
                        Please complete the remaining verification steps in
                        your Stripe dashboard.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex flex-wrap items-center gap-2">
                {!status.onboardingComplete && (
                  <Button onClick={handleConnect} disabled={isConnecting}>
                    {isConnecting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Opening...
                      </>
                    ) : (
                      "Complete Setup"
                    )}
                  </Button>
                )}

                {status.dashboardUrl && (
                  <Button variant="outline" asChild>
                    <a
                      href={status.dashboardUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Stripe Dashboard
                    </a>
                  </Button>
                )}

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      className="text-destructive hover:text-destructive"
                    >
                      <Unplug className="mr-2 h-4 w-4" />
                      Disconnect
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Disconnect Stripe?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will disconnect your Stripe account from{" "}
                        {agencyName}. You won&apos;t be able to accept payments
                        from clients until you reconnect.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDisconnect}
                        disabled={isDisconnecting}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        {isDisconnecting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Disconnecting...
                          </>
                        ) : (
                          "Disconnect"
                        )}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* SaaS Mode Toggle Card */}
      {status.connected && status.onboardingComplete && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
                  <Zap className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <CardTitle>SaaS Mode</CardTitle>
                  <CardDescription>
                    Enable automated client billing
                  </CardDescription>
                </div>
              </div>
              <Badge
                variant={saasMode ? "default" : "secondary"}
                className={
                  saasMode
                    ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                    : ""
                }
              >
                {saasMode ? "Active" : "Inactive"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              {saasMode
                ? "SaaS Mode is active. Your clients can sign up and pay for subscriptions automatically."
                : "Enable SaaS Mode to let clients self-signup and pay for their subscriptions through your Stripe account."}
            </p>

            {saasMode && (
              <div className="rounded-lg border bg-muted/50 p-4">
                <h4 className="text-sm font-medium mb-2">Active Features:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Client self-signup at /{`{your-slug}`}/signup</li>
                  <li>• Custom pricing plans</li>
                  <li>• Automated recurring billing</li>
                  <li>• Client subscription management</li>
                </ul>
              </div>
            )}

            <Button
              onClick={handleToggleSaasMode}
              disabled={isTogglingMode}
              variant={saasMode ? "outline" : "default"}
            >
              {isTogglingMode ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {saasMode ? "Disabling..." : "Enabling..."}
                </>
              ) : saasMode ? (
                "Disable SaaS Mode"
              ) : (
                <>
                  <Zap className="mr-2 h-4 w-4" />
                  Enable SaaS Mode
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
