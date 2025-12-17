"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getDeal, createNote, deleteDeal } from "@/lib/actions/crm";
import { formatDistanceToNow } from "date-fns";
import {
  User,
  Building2,
  Calendar,
  DollarSign,
  Clock,
  Trash2,
  MessageSquare,
} from "lucide-react";

interface DealDrawerProps {
  dealId: number | null;
  open: boolean;
  onClose: () => void;
}

type DealData = Awaited<ReturnType<typeof getDeal>>;

export function DealDrawer({ dealId, open, onClose }: DealDrawerProps) {
  const router = useRouter();
  const [deal, setDeal] = useState<DealData | null>(null);
  const [loading, setLoading] = useState(false);
  const [noteContent, setNoteContent] = useState("");
  const [addingNote, setAddingNote] = useState(false);

  useEffect(() => {
    if (dealId && open) {
      setLoading(true);
      getDeal(dealId)
        .then(setDeal)
        .finally(() => setLoading(false));
    }
  }, [dealId, open]);

  async function handleAddNote() {
    if (!deal || !noteContent.trim()) return;
    setAddingNote(true);

    try {
      await createNote({
        type: "deal",
        dealId: deal.id,
        content: noteContent,
      });
      setNoteContent("");
      // Refresh deal data
      const updated = await getDeal(deal.id);
      setDeal(updated);
    } catch (error) {
      console.error("Failed to add note:", error);
    } finally {
      setAddingNote(false);
    }
  }

  async function handleDelete() {
    if (!deal) return;
    if (!confirm("Are you sure you want to delete this deal?")) return;

    await deleteDeal(deal.id);
    onClose();
    router.refresh();
  }

  return (
    <Sheet open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <SheetContent className="w-full overflow-y-auto sm:max-w-lg">
        {loading ? (
          <div className="flex h-full items-center justify-center">
            <p className="text-zinc-500">Loading...</p>
          </div>
        ) : deal ? (
          <>
            <SheetHeader>
              <div className="flex items-start justify-between">
                <SheetTitle className="text-xl">{deal.title}</SheetTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-red-500 hover:bg-red-50 hover:text-red-600"
                  onClick={handleDelete}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <Badge
                style={{
                  backgroundColor: (deal.stage.color ?? "#6366f1") + "20",
                  color: deal.stage.color ?? "#6366f1",
                }}
              >
                {deal.stage.name}
              </Badge>
            </SheetHeader>

            <div className="mt-6 space-y-6">
              {/* Deal Info */}
              <div className="space-y-3">
                {deal.value && (
                  <div className="flex items-center gap-3">
                    <DollarSign className="h-4 w-4 text-zinc-400" />
                    <span className="font-semibold">
                      {new Intl.NumberFormat("nl-NL", {
                        style: "currency",
                        currency: deal.currency ?? "EUR",
                      }).format(parseFloat(deal.value))}
                    </span>
                  </div>
                )}

                {deal.contact && (
                  <div className="flex items-center gap-3">
                    <User className="h-4 w-4 text-zinc-400" />
                    <span>
                      {[deal.contact.firstName, deal.contact.lastName]
                        .filter(Boolean)
                        .join(" ")}
                    </span>
                  </div>
                )}

                {deal.contact?.company && (
                  <div className="flex items-center gap-3">
                    <Building2 className="h-4 w-4 text-zinc-400" />
                    <span>{deal.contact.company}</span>
                  </div>
                )}

                {deal.expectedCloseDate && (
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-zinc-400" />
                    <span>
                      Expected:{" "}
                      {new Date(deal.expectedCloseDate).toLocaleDateString()}
                    </span>
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-zinc-400" />
                  <span className="text-sm text-zinc-500">
                    Created{" "}
                    {formatDistanceToNow(new Date(deal.createdAt), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
              </div>

              <Separator />

              {/* Stage History */}
              <div>
                <h3 className="mb-3 font-semibold">Stage History</h3>
                <div className="space-y-2">
                  {deal.stageHistory.map((history) => (
                    <div
                      key={history.id}
                      className="flex items-center gap-2 text-sm"
                    >
                      <div
                        className="h-2 w-2 rounded-full"
                        style={{
                          backgroundColor:
                            history.toStage.color ?? "#6366f1",
                        }}
                      />
                      <span>
                        {history.fromStage
                          ? `${history.fromStage.name} → ${history.toStage.name}`
                          : `Started in ${history.toStage.name}`}
                      </span>
                      <span className="text-zinc-400">
                        {formatDistanceToNow(new Date(history.movedAt), {
                          addSuffix: true,
                        })}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Notes */}
              <div>
                <h3 className="mb-3 font-semibold">Notes</h3>

                <div className="mb-4 space-y-2">
                  <Textarea
                    placeholder="Add a note..."
                    value={noteContent}
                    onChange={(e) => setNoteContent(e.target.value)}
                    rows={3}
                  />
                  <Button
                    size="sm"
                    onClick={handleAddNote}
                    disabled={!noteContent.trim() || addingNote}
                  >
                    <MessageSquare className="mr-2 h-4 w-4" />
                    {addingNote ? "Adding..." : "Add Note"}
                  </Button>
                </div>

                <div className="space-y-3">
                  {deal.notes.length === 0 ? (
                    <p className="text-sm text-zinc-500">No notes yet</p>
                  ) : (
                    deal.notes.map((note) => (
                      <div
                        key={note.id}
                        className="rounded-lg bg-zinc-50 p-3 dark:bg-zinc-900"
                      >
                        <div className="mb-2 flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs">
                              {note.createdBy?.name?.[0] ?? "U"}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-medium">
                            {note.createdBy?.name ?? "Unknown"}
                          </span>
                          <span className="text-xs text-zinc-400">
                            {formatDistanceToNow(new Date(note.createdAt), {
                              addSuffix: true,
                            })}
                          </span>
                        </div>
                        <p className="whitespace-pre-wrap text-sm">
                          {note.content}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex h-full items-center justify-center">
            <p className="text-zinc-500">Deal not found</p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
