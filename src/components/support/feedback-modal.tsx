"use client";

import { useState, useTransition } from "react";
import { useUser } from "@stackframe/stack";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createSupportTicket } from "@/lib/actions/support";
import {
  Loader2,
  Send,
  CheckCircle2,
  Bug,
  Lightbulb,
  HelpCircle,
  MessageSquareText,
} from "lucide-react";

interface FeedbackModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ticketTypes = [
  { value: "bug", label: "Bug melden", icon: Bug, color: "text-red-500" },
  { value: "feature_request", label: "Feature aanvragen", icon: Lightbulb, color: "text-amber-500" },
  { value: "question", label: "Vraag stellen", icon: HelpCircle, color: "text-blue-500" },
  { value: "feedback", label: "Feedback geven", icon: MessageSquareText, color: "text-green-500" },
];

export function FeedbackModal({ open, onOpenChange }: FeedbackModalProps) {
  const user = useUser();
  const [isPending, startTransition] = useTransition();
  const [submitted, setSubmitted] = useState(false);
  const [type, setType] = useState<string>("feedback");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.primaryEmail) return;

    startTransition(async () => {
      try {
        // User email/name is now retrieved from auth internally
        await createSupportTicket({
          subject,
          message,
          type: type as "bug" | "feature_request" | "question" | "feedback" | "other",
          pageUrl: window.location.href,
          userAgent: navigator.userAgent,
        });

        setSubmitted(true);
        setTimeout(() => {
          onOpenChange(false);
          // Reset form
          setSubmitted(false);
          setType("feedback");
          setSubject("");
          setMessage("");
        }, 2000);
      } catch (error) {
        console.error("Failed to submit feedback:", error);
      }
    });
  };

  if (submitted) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col items-center justify-center py-8">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
              <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-lg font-semibold">Bedankt!</h3>
            <p className="text-center text-sm text-zinc-500">
              Je bericht is verzonden. We nemen zo snel mogelijk contact met je op.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Feedback of hulp nodig?</DialogTitle>
          <DialogDescription>
            Laat ons weten hoe we je kunnen helpen. We reageren meestal binnen 24 uur.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Type Selection */}
          <div className="grid grid-cols-2 gap-2">
            {ticketTypes.map((t) => {
              const Icon = t.icon;
              return (
                <button
                  key={t.value}
                  type="button"
                  onClick={() => setType(t.value)}
                  className={`flex items-center gap-2 rounded-lg border p-3 text-left transition-colors ${
                    type === t.value
                      ? "border-violet-500 bg-violet-50 dark:bg-violet-900/20"
                      : "border-zinc-200 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800/50"
                  }`}
                >
                  <Icon className={`h-4 w-4 ${t.color}`} />
                  <span className="text-sm font-medium">{t.label}</span>
                </button>
              );
            })}
          </div>

          {/* Subject */}
          <div className="space-y-2">
            <Label htmlFor="subject">Onderwerp</Label>
            <Input
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Korte beschrijving van je vraag of probleem"
              required
            />
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message">Bericht</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Beschrijf je vraag, probleem of feedback zo gedetailleerd mogelijk..."
              rows={5}
              required
            />
          </div>

          {/* User Info */}
          {user && (
            <div className="rounded-lg bg-zinc-50 p-3 text-sm dark:bg-zinc-800/50">
              <p className="text-zinc-500">
                Verzonden als: <span className="font-medium text-zinc-700 dark:text-zinc-300">{user.displayName || user.primaryEmail}</span>
              </p>
            </div>
          )}

          {/* Submit */}
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Annuleren
            </Button>
            <Button type="submit" disabled={isPending || !subject || !message}>
              {isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Send className="mr-2 h-4 w-4" />
              )}
              Versturen
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
