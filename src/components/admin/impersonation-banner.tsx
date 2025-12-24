"use client";

import { useEffect, useState } from "react";
import { AlertTriangle, X } from "lucide-react";
import { getImpersonationState, stopImpersonation, type ImpersonationState } from "@/lib/auth/impersonate";

export function ImpersonationBanner() {
  const [state, setState] = useState<ImpersonationState | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getImpersonationState().then(setState);
  }, []);

  if (!state) {
    return null;
  }

  const handleStop = async () => {
    setLoading(true);
    try {
      await stopImpersonation();
    } catch (error) {
      console.error("Failed to stop impersonation:", error);
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-amber-500 text-amber-950">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2">
        <div className="flex items-center gap-3">
          <AlertTriangle className="h-5 w-5" />
          <span className="text-sm font-medium">
            Impersonating: <strong>{state.targetUserEmail}</strong>
          </span>
          <span className="text-xs opacity-75">
            (as {state.adminUserEmail})
          </span>
        </div>
        <button
          onClick={handleStop}
          disabled={loading}
          className="flex items-center gap-1.5 rounded-md bg-amber-600 px-3 py-1.5 text-sm font-medium hover:bg-amber-700 disabled:opacity-50"
        >
          <X className="h-4 w-4" />
          {loading ? "Stopping..." : "Stop Impersonating"}
        </button>
      </div>
    </div>
  );
}
