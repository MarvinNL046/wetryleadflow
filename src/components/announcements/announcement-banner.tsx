"use client";

import { useTransition } from "react";
import { X, Info, AlertTriangle, Sparkles, Wrench } from "lucide-react";
import { dismissAnnouncement } from "@/lib/actions/announcements";

interface Announcement {
  id: number;
  title: string;
  content: string;
  type: "info" | "warning" | "feature" | "maintenance";
  dismissible: boolean;
}

interface AnnouncementBannerProps {
  announcements: Announcement[];
}

const typeConfig = {
  info: {
    icon: Info,
    bg: "bg-blue-50 dark:bg-blue-950/50",
    border: "border-blue-200 dark:border-blue-900",
    text: "text-blue-800 dark:text-blue-200",
    iconColor: "text-blue-500",
  },
  warning: {
    icon: AlertTriangle,
    bg: "bg-amber-50 dark:bg-amber-950/50",
    border: "border-amber-200 dark:border-amber-900",
    text: "text-amber-800 dark:text-amber-200",
    iconColor: "text-amber-500",
  },
  feature: {
    icon: Sparkles,
    bg: "bg-violet-50 dark:bg-violet-950/50",
    border: "border-violet-200 dark:border-violet-900",
    text: "text-violet-800 dark:text-violet-200",
    iconColor: "text-violet-500",
  },
  maintenance: {
    icon: Wrench,
    bg: "bg-red-50 dark:bg-red-950/50",
    border: "border-red-200 dark:border-red-900",
    text: "text-red-800 dark:text-red-200",
    iconColor: "text-red-500",
  },
};

export function AnnouncementBanner({ announcements }: AnnouncementBannerProps) {
  const [isPending, startTransition] = useTransition();

  if (announcements.length === 0) return null;

  const handleDismiss = (announcementId: number) => {
    startTransition(async () => {
      await dismissAnnouncement(announcementId);
    });
  };

  return (
    <div className="space-y-2">
      {announcements.map((announcement) => {
        const config = typeConfig[announcement.type] || typeConfig.info;
        const Icon = config.icon;

        return (
          <div
            key={announcement.id}
            className={`relative flex items-start gap-3 rounded-lg border p-4 ${config.bg} ${config.border}`}
          >
            <Icon className={`mt-0.5 h-5 w-5 flex-shrink-0 ${config.iconColor}`} />
            <div className="flex-1 min-w-0">
              <p className={`font-medium ${config.text}`}>{announcement.title}</p>
              <p className={`mt-1 text-sm ${config.text} opacity-80`}>
                {announcement.content}
              </p>
            </div>
            {announcement.dismissible && (
              <button
                onClick={() => handleDismiss(announcement.id)}
                disabled={isPending}
                className={`flex-shrink-0 rounded-md p-1 transition-colors hover:bg-black/10 dark:hover:bg-white/10 ${config.text}`}
                title="Sluiten"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
