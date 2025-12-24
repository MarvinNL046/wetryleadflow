"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Shield, X, Loader2 } from "lucide-react";
import { stopAgencyImpersonation } from "@/lib/actions/agency-impersonation";

interface ImpersonationBannerProps {
  agencyName: string;
  adminEmail: string;
}

export function ImpersonationBanner({
  agencyName,
  adminEmail,
}: ImpersonationBannerProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleStopImpersonation = async () => {
    setIsLoading(true);
    try {
      await stopAgencyImpersonation();
    } catch (error) {
      console.error("Failed to stop impersonation:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-2 text-white shadow-lg">
      <div className="flex items-center gap-3">
        <Shield className="h-5 w-5" />
        <span className="text-sm font-medium">
          Super Admin Mode: Viewing <strong>{agencyName}</strong> as owner
        </span>
        <span className="text-xs opacity-75">({adminEmail})</span>
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
            Exit
          </>
        )}
      </Button>
    </div>
  );
}
