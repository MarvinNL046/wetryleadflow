"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Loader2 } from "lucide-react";
import { createTestAgency } from "@/lib/actions/admin";
import { useRouter } from "next/navigation";

export function CreateTestAgencyButton() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleCreate = async () => {
    setIsLoading(true);
    try {
      const result = await createTestAgency();
      if (result.success) {
        router.refresh();
      } else if (result.agencyId) {
        // Agency already exists, just refresh
        router.refresh();
      }
    } catch (error) {
      console.error("Failed to create test agency:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button onClick={handleCreate} disabled={isLoading}>
      {isLoading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Plus className="mr-2 h-4 w-4" />
      )}
      Create Test Agency
    </Button>
  );
}
