"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye, Loader2 } from "lucide-react";
import { startAgencyImpersonation } from "@/lib/actions/agency-impersonation";

interface ImpersonateAgencyButtonProps {
  agencyId: number;
  agencyName: string;
}

export function ImpersonateAgencyButton({
  agencyId,
  agencyName,
}: ImpersonateAgencyButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleImpersonate = async () => {
    setIsLoading(true);
    try {
      await startAgencyImpersonation(agencyId);
    } catch (error) {
      console.error("Failed to impersonate agency:", error);
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleImpersonate}
      disabled={isLoading}
      className="text-violet-600 hover:text-violet-700 hover:bg-violet-50 dark:text-violet-400 dark:hover:bg-violet-950/30"
      title={`View ${agencyName}'s dashboard`}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <>
          <Eye className="mr-1 h-4 w-4" />
          View
        </>
      )}
    </Button>
  );
}
