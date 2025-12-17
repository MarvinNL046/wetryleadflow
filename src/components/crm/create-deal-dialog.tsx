"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createDeal } from "@/lib/actions/crm";
import type { Contact } from "@/lib/db/schema";

interface CreateDealDialogProps {
  pipelineId: number;
  stageId: number;
  contacts: Contact[];
  trigger?: React.ReactNode;
}

export function CreateDealDialog({
  pipelineId,
  stageId,
  contacts,
  trigger,
}: CreateDealDialogProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [contactId, setContactId] = useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    try {
      await createDeal({
        pipelineId,
        stageId,
        title: formData.get("title") as string,
        contactId: contactId ? parseInt(contactId, 10) : undefined,
        value: (formData.get("value") as string) || undefined,
      });

      setOpen(false);
      setContactId("");
      router.refresh();
    } catch (error) {
      console.error("Failed to create deal:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? <Button>New Deal</Button>}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Deal</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Deal Title</Label>
            <Input
              id="title"
              name="title"
              placeholder="Website Redesign Project"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact">Contact (Optional)</Label>
            <Select value={contactId} onValueChange={setContactId}>
              <SelectTrigger>
                <SelectValue placeholder="Select a contact" />
              </SelectTrigger>
              <SelectContent>
                {contacts.map((contact) => (
                  <SelectItem key={contact.id} value={contact.id.toString()}>
                    {[contact.firstName, contact.lastName]
                      .filter(Boolean)
                      .join(" ") || contact.email}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="value">Value (EUR)</Label>
            <Input
              id="value"
              name="value"
              type="number"
              step="0.01"
              min="0"
              placeholder="10000.00"
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Deal"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
