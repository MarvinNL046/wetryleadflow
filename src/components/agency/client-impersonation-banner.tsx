"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Building2, X, Loader2 } from "lucide-react";
import { stopAgencyClientImpersonation } from "@/lib/auth/agency-client-impersonate";

interface ClientImpersonationBannerProps {
  targetOrgName: string;
  targetUserEmail: string;
  agencyUserEmail: string;
}

export function ClientImpersonationBanner({
  targetOrgName,
  targetUserEmail,
  agencyUserEmail,
}: ClientImpersonationBannerProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleStopImpersonation = async () => {
    setIsLoading(true);
    try {
      await stopAgencyClientImpersonation();
    } catch (error) {
      console.error("Failed to stop client impersonation:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between bg-gradient-to-r from-violet-500 to-purple-500 px-4 py-2 text-white shadow-lg">
      <div className="flex items-center gap-3">
        <Building2 className="h-5 w-5" />
        <span className="text-sm font-medium">
          Agency Mode: Viewing <strong>{targetOrgName}</strong> as client ({targetUserEmail})
        </span>
        <span className="text-xs opacity-75">Logged in as: {agencyUserEmail}</span>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleStopImpersonation}
        disabled={isLoading}
        className="text-white hover:bg-white/20 hover:text-white"
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <>
            <X className="mr-1 h-4 w-4" />
            Back to Agency
          </>
        )}
      </Button>
    </div>
  );
}
