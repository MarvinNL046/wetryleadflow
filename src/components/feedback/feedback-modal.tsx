"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { MessageSquare, Bug, Lightbulb, Sparkles, HelpCircle, X, Send, Loader2, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type FeedbackType = "bug" | "feature" | "improvement" | "other";

const feedbackTypes: { value: FeedbackType; label: string; icon: React.ElementType; color: string }[] = [
  { value: "bug", label: "Bug", icon: Bug, color: "text-red-500 bg-red-100 dark:bg-red-900/30" },
  { value: "feature", label: "Feature", icon: Sparkles, color: "text-violet-500 bg-violet-100 dark:bg-violet-900/30" },
  { value: "improvement", label: "Verbetering", icon: Lightbulb, color: "text-blue-500 bg-blue-100 dark:bg-blue-900/30" },
  { value: "other", label: "Anders", icon: HelpCircle, color: "text-zinc-500 bg-zinc-100 dark:bg-zinc-800" },
];

export function FeedbackModal({ isOpen, onClose }: FeedbackModalProps) {
  const pathname = usePathname();
  const [feedbackType, setFeedbackType] = useState<FeedbackType>("improvement");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          feedbackType,
          message: message.trim(),
          currentPage: pathname,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send feedback");
      }

      setIsSuccess(true);
      setTimeout(() => {
        onClose();
        // Reset state after close animation
        setTimeout(() => {
          setMessage("");
          setFeedbackType("improvement");
          setIsSuccess(false);
        }, 200);
      }, 1500);
    } catch {
      setError("Er ging iets mis. Probeer het opnieuw.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl border border-zinc-200 bg-white p-6 shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
        >
          <X className="h-5 w-5" />
        </button>

        {isSuccess ? (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
            <h3 className="text-lg font-semibold">Bedankt voor je feedback!</h3>
            <p className="mt-1 text-sm text-zinc-500">We nemen je bericht in behandeling.</p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-blue-500">
                <MessageSquare className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Geef Feedback</h2>
                <p className="text-sm text-zinc-500">Help ons LeadFlow te verbeteren</p>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Feedback Type */}
              <div className="mb-4">
                <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Type feedback
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {feedbackTypes.map((type) => (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => setFeedbackType(type.value)}
                      className={cn(
                        "flex flex-col items-center gap-1 rounded-lg border p-3 text-xs font-medium transition-all",
                        feedbackType === type.value
                          ? "border-violet-500 bg-violet-50 text-violet-700 dark:border-violet-500 dark:bg-violet-900/30 dark:text-violet-300"
                          : "border-zinc-200 text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-600 dark:hover:bg-zinc-800"
                      )}
                    >
                      <div className={cn("rounded-md p-1.5", type.color)}>
                        <type.icon className="h-4 w-4" />
                      </div>
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div className="mb-4">
                <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Je bericht
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={
                    feedbackType === "bug"
                      ? "Beschrijf de bug en hoe we deze kunnen reproduceren..."
                      : feedbackType === "feature"
                      ? "Welke feature zou je graag zien?"
                      : feedbackType === "improvement"
                      ? "Hoe kunnen we dit verbeteren?"
                      : "Waar wil je het over hebben?"
                  }
                  rows={4}
                  className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm placeholder:text-zinc-400 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:placeholder:text-zinc-500"
                  required
                />
              </div>

              {/* Error message */}
              {error && (
                <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/30 dark:text-red-400">
                  {error}
                </div>
              )}

              {/* Current page info */}
              <div className="mb-4 rounded-lg bg-zinc-50 px-3 py-2 dark:bg-zinc-800/50">
                <p className="text-xs text-zinc-500">
                  <span className="font-medium">Huidige pagina:</span> {pathname}
                </p>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting || !message.trim()}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-violet-500/25 transition-all hover:shadow-violet-500/40 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Versturen...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Verstuur Feedback
                  </>
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </>
  );
}
