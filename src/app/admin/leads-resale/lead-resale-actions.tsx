"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, MapPinOff, Clock, CheckCircle2, XCircle, Loader2, DollarSign } from "lucide-react";

interface LeadResaleActionsProps {
  leadId: number;
  currentStatus: string;
  updateLeadResaleStatus: (
    leadId: number,
    status: string,
    notes?: string
  ) => Promise<void>;
}

export function LeadResaleActions({
  leadId,
  currentStatus,
  updateLeadResaleStatus,
}: LeadResaleActionsProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);

  async function handleStatusChange(status: string) {
    setIsOpen(false);
    startTransition(async () => {
      await updateLeadResaleStatus(leadId, status);
      router.refresh();
    });
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" disabled={isPending}>
          {isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <MoreHorizontal className="h-4 w-4" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {currentStatus !== "available" && (
          <DropdownMenuItem onClick={() => handleStatusChange("available")}>
            <MapPinOff className="mr-2 h-4 w-4 text-orange-500" />
            Terug naar Nieuw
          </DropdownMenuItem>
        )}
        {currentStatus !== "pending" && (
          <DropdownMenuItem onClick={() => handleStatusChange("pending")}>
            <Clock className="mr-2 h-4 w-4 text-amber-500" />
            In behandeling
          </DropdownMenuItem>
        )}
        {currentStatus !== "sold" && (
          <DropdownMenuItem onClick={() => handleStatusChange("sold")}>
            <DollarSign className="mr-2 h-4 w-4 text-green-500" />
            Markeer als verkocht
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => handleStatusChange("removed")}
          className="text-red-600 dark:text-red-400"
        >
          <XCircle className="mr-2 h-4 w-4" />
          Verwijderen uit lijst
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
