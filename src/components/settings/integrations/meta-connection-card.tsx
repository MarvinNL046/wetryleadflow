"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import { Facebook, CheckCircle, XCircle, Loader2, ExternalLink } from "lucide-react";
import { disconnectMeta } from "@/lib/actions/integrations";
import { formatDistanceToNow } from "date-fns";

interface MetaConnectionCardProps {
  connected: boolean;
  connection?: {
    id: number;
    userName: string | null;
    connectedAt: Date;
    tokenExpiresAt: Date | null;
  };
  pages?: Array<{
    id: number;
    pageId: string;
    pageName: string;
    subscribedToLeadgen: boolean;
  }>;
  /** Custom return URL after OAuth flow (defaults to /crm/settings/integrations) */
  returnUrl?: string;
}

export function MetaConnectionCard({
  connected,
  connection,
  pages = [],
  returnUrl = "/crm/settings/integrations",
}: MetaConnectionCardProps) {
  const router = useRouter();
  const [isDisconnecting, setIsDisconnecting] = useState(false);

  const handleConnect = () => {
    // Redirect to OAuth flow with custom return URL
    window.location.href = `/api/auth/meta/connect?returnUrl=${encodeURIComponent(returnUrl)}`;
  };

  const handleDisconnect = async () => {
    setIsDisconnecting(true);
    try {
      await disconnectMeta();
      router.refresh();
    } catch (error) {
      console.error("Failed to disconnect:", error);
    } finally {
      setIsDisconnecting(false);
    }
  };

  return (
    <div className="rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-start justify-between p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900">
            <Facebook className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Meta Lead Ads</h3>
            <p className="mt-1 text-sm text-zinc-500">
              Automatically import leads from Facebook and Instagram ads
            </p>
          </div>
        </div>
        <Badge variant={connected ? "default" : "secondary"}>
          {connected ? (
            <>
              <CheckCircle className="mr-1 h-3 w-3" />
              Connected
            </>
          ) : (
            <>
              <XCircle className="mr-1 h-3 w-3" />
              Not connected
            </>
          )}
        </Badge>
      </div>

      {connected && connection && (
        <div className="border-t border-zinc-100 px-6 py-4 dark:border-zinc-800">
          <dl className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <dt className="text-zinc-500">Connected as</dt>
              <dd className="font-medium">{connection.userName || "Unknown"}</dd>
            </div>
            <div>
              <dt className="text-zinc-500">Connected</dt>
              <dd className="font-medium">
                {formatDistanceToNow(new Date(connection.connectedAt), { addSuffix: true })}
              </dd>
            </div>
          </dl>

          {pages.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Connected Pages ({pages.length})
              </h4>
              <ul className="mt-2 space-y-2">
                {pages.map((page) => (
                  <li
                    key={page.id}
                    className="flex items-center justify-between rounded-md bg-zinc-50 px-3 py-2 dark:bg-zinc-800"
                  >
                    <span className="text-sm">{page.pageName}</span>
                    <Badge
                      variant={page.subscribedToLeadgen ? "default" : "outline"}
                      className="text-xs"
                    >
                      {page.subscribedToLeadgen ? "Receiving leads" : "Not subscribed"}
                    </Badge>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <div className="flex items-center justify-between border-t border-zinc-100 px-6 py-4 dark:border-zinc-800">
        {connected ? (
          <>
            <Button variant="outline" size="sm" asChild>
              <a
                href="https://business.facebook.com/latest/leads_center"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Meta Leads Center
              </a>
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm" disabled={isDisconnecting}>
                  {isDisconnecting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Disconnect
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Disconnect Meta Lead Ads?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will stop importing new leads from your Facebook and Instagram ads.
                    Existing leads and contacts will not be affected.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDisconnect}>
                    Disconnect
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </>
        ) : (
          <Button onClick={handleConnect} className="w-full">
            <Facebook className="mr-2 h-4 w-4" />
            Connect with Facebook
          </Button>
        )}
      </div>
    </div>
  );
}
