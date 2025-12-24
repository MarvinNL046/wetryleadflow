"use client";

import { useState } from "react";
import { UserCog } from "lucide-react";
import { Button } from "@/components/ui/button";
import { startImpersonation } from "@/lib/auth/impersonate";

interface ImpersonateButtonProps {
  userId: number;
  userEmail: string;
}

export function ImpersonateButton({ userId, userEmail }: ImpersonateButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleImpersonate = async () => {
    if (!confirm(`Start impersonating ${userEmail}?\n\nYou will see the app as this user sees it.`)) {
      return;
    }

    setLoading(true);
    try {
      await startImpersonation(userId);
    } catch (error) {
      alert(error instanceof Error ? error.message : "Failed to start impersonation");
      setLoading(false);
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleImpersonate}
      disabled={loading}
      className="h-8 gap-1.5 text-zinc-500 hover:text-zinc-900"
    >
      <UserCog className="h-4 w-4" />
      {loading ? "..." : "Impersonate"}
    </Button>
  );
}
