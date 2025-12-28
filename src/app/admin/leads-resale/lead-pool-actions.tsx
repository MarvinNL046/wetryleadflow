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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  MoreHorizontal,
  MapPinOff,
  Clock,
  CheckCircle2,
  XCircle,
  Loader2,
  DollarSign,
  Ban,
} from "lucide-react";
import { updatePlatformLeadStatus } from "@/lib/actions/admin";

type LeadPoolStatus = "available" | "reserved" | "sold" | "expired" | "withdrawn";

interface LeadPoolActionsProps {
  leadId: number;
  currentStatus: string;
}

export function LeadPoolActions({
  leadId,
  currentStatus,
}: LeadPoolActionsProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const [soldDialogOpen, setSoldDialogOpen] = useState(false);
  const [price, setPrice] = useState("");

  async function handleStatusChange(status: LeadPoolStatus, data?: { price?: string }) {
    setIsOpen(false);
    startTransition(async () => {
      await updatePlatformLeadStatus(leadId, status, data);
      router.refresh();
    });
  }

  async function handleMarkAsSold() {
    setSoldDialogOpen(false);
    startTransition(async () => {
      await updatePlatformLeadStatus(leadId, "sold", {
        price: price || undefined,
      });
      setPrice("");
      router.refresh();
    });
  }

  return (
    <>
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
              Beschikbaar maken
            </DropdownMenuItem>
          )}
          {currentStatus !== "reserved" && currentStatus !== "sold" && (
            <DropdownMenuItem onClick={() => handleStatusChange("reserved")}>
              <Clock className="mr-2 h-4 w-4 text-blue-500" />
              Reserveren
            </DropdownMenuItem>
          )}
          {currentStatus !== "sold" && (
            <DropdownMenuItem onClick={() => setSoldDialogOpen(true)}>
              <DollarSign className="mr-2 h-4 w-4 text-green-500" />
              Markeer als verkocht
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          {currentStatus !== "expired" && (
            <DropdownMenuItem
              onClick={() => handleStatusChange("expired")}
              className="text-zinc-500"
            >
              <Ban className="mr-2 h-4 w-4" />
              Markeer als verlopen
            </DropdownMenuItem>
          )}
          <DropdownMenuItem
            onClick={() => handleStatusChange("withdrawn")}
            className="text-red-600 dark:text-red-400"
          >
            <XCircle className="mr-2 h-4 w-4" />
            Verwijderen uit pool
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Sold Dialog */}
      <Dialog open={soldDialogOpen} onOpenChange={setSoldDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Lead markeren als verkocht</DialogTitle>
            <DialogDescription>
              Voer optioneel de verkoopprijs in voor deze lead.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="price">Verkoopprijs (€)</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0"
                placeholder="bijv. 25.00"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setSoldDialogOpen(false);
                setPrice("");
              }}
            >
              Annuleren
            </Button>
            <Button
              onClick={handleMarkAsSold}
              disabled={isPending}
              className="bg-green-600 hover:bg-green-700"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verwerken...
                </>
              ) : (
                <>
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Markeer als verkocht
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
