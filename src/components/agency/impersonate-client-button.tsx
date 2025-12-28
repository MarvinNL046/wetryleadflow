"use client";

import { useState } from "react";
import { Eye, Loader2 } from "lucide-react";
import { startAgencyClientImpersonation } from "@/lib/auth/agency-client-impersonate";

interface ImpersonateClientButtonProps {
  clientOrgId: number;
  clientName: string;
  asMenuItem?: boolean;
}

export function ImpersonateClientButton({
  clientOrgId,
  clientName,
  asMenuItem = false,
}: ImpersonateClientButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleImpersonate = async () => {
    setIsLoading(true);
    try {
      await startAgencyClientImpersonation(clientOrgId);
    } catch (error) {
      console.error("Failed to impersonate client:", error);
      setIsLoading(false);
    }
  };

  if (asMenuItem) {
    return (
      <button
        onClick={handleImpersonate}
        disabled={isLoading}
        className="flex w-full items-center px-2 py-1.5 text-sm outline-none hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-50"
      >
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Eye className="mr-2 h-4 w-4" />
        )}
        View as Client
      </button>
    );
  }

  return (
    <button
      onClick={handleImpersonate}
      disabled={isLoading}
      className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-violet-600 transition-colors hover:bg-violet-50 disabled:opacity-50 dark:text-violet-400 dark:hover:bg-violet-950/30"
      title={`View ${clientName}'s CRM as the client`}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <>
          <Eye className="h-4 w-4" />
          View as Client
        </>
      )}
    </button>
  );
}
