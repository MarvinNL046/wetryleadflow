"use client";

import { useState } from "react";
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FeedbackModal } from "./feedback-modal";

export function FeedbackButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        size="icon"
        className="fixed bottom-6 right-6 z-50 h-12 w-12 rounded-full bg-violet-600 shadow-lg hover:bg-violet-700 focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
        title="Feedback geven"
      >
        <MessageSquare className="h-5 w-5" />
      </Button>
      <FeedbackModal open={open} onOpenChange={setOpen} />
    </>
  );
}
