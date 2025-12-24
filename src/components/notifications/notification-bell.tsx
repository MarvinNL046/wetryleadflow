"use client";

import { useState, useEffect, useTransition } from "react";
import { Bell, Check, Trash2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  getNotifications,
  getUnreadNotificationCount,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
} from "@/lib/actions/notifications";
import { formatDistanceToNow } from "date-fns";
import { nl } from "date-fns/locale";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface Notification {
  id: number;
  type: string;
  title: string;
  message: string | null;
  actionUrl: string | null;
  isRead: boolean;
  createdAt: Date;
}

const notificationTypeStyles: Record<string, { bg: string; text: string }> = {
  follow_up: { bg: "bg-amber-100 dark:bg-amber-900/30", text: "text-amber-600 dark:text-amber-400" },
  lead_new: { bg: "bg-green-100 dark:bg-green-900/30", text: "text-green-600 dark:text-green-400" },
  invoice_paid: { bg: "bg-emerald-100 dark:bg-emerald-900/30", text: "text-emerald-600 dark:text-emerald-400" },
  invoice_overdue: { bg: "bg-red-100 dark:bg-red-900/30", text: "text-red-600 dark:text-red-400" },
  opportunity_won: { bg: "bg-violet-100 dark:bg-violet-900/30", text: "text-violet-600 dark:text-violet-400" },
  opportunity_lost: { bg: "bg-zinc-100 dark:bg-zinc-800", text: "text-zinc-600 dark:text-zinc-400" },
  system: { bg: "bg-blue-100 dark:bg-blue-900/30", text: "text-blue-600 dark:text-blue-400" },
};

export function NotificationBell() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  // Load notifications
  const loadNotifications = async () => {
    try {
      const [notifs, count] = await Promise.all([
        getNotifications({ limit: 10 }),
        getUnreadNotificationCount(),
      ]);
      setNotifications(notifs);
      setUnreadCount(count);
    } catch (error) {
      console.error("Failed to load notifications:", error);
    }
  };

  useEffect(() => {
    loadNotifications();
    // Poll every 30 seconds
    const interval = setInterval(loadNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleMarkAsRead = async (id: number) => {
    startTransition(async () => {
      await markNotificationAsRead(id);
      await loadNotifications();
    });
  };

  const handleMarkAllAsRead = async () => {
    startTransition(async () => {
      await markAllNotificationsAsRead();
      await loadNotifications();
    });
  };

  const handleDelete = async (id: number) => {
    startTransition(async () => {
      await deleteNotification(id);
      await loadNotifications();
    });
  };

  const handleClick = async (notification: Notification) => {
    if (!notification.isRead) {
      await handleMarkAsRead(notification.id);
    }
    if (notification.actionUrl) {
      setIsOpen(false);
      router.push(notification.actionUrl);
    }
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
              {unreadCount > 99 ? "99+" : unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="flex items-center justify-between px-3 py-2">
          <span className="font-semibold">Notificaties</span>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="h-7 text-xs"
              onClick={handleMarkAllAsRead}
              disabled={isPending}
            >
              <Check className="mr-1 h-3 w-3" />
              Alles gelezen
            </Button>
          )}
        </div>
        <DropdownMenuSeparator />

        <div className="max-h-[400px] overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="py-8 text-center text-sm text-zinc-500">
              Geen notificaties
            </div>
          ) : (
            notifications.map((notification) => {
              const style = notificationTypeStyles[notification.type] || notificationTypeStyles.system;
              return (
                <div
                  key={notification.id}
                  className={cn(
                    "relative cursor-pointer border-b border-zinc-100 px-3 py-3 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800/50",
                    !notification.isRead && "bg-violet-50/50 dark:bg-violet-900/10"
                  )}
                  onClick={() => handleClick(notification)}
                >
                  <div className="flex items-start gap-3">
                    <div className={cn("mt-0.5 h-2 w-2 flex-shrink-0 rounded-full", style.bg)} />
                    <div className="flex-1 min-w-0">
                      <p className={cn(
                        "text-sm font-medium",
                        !notification.isRead && "text-zinc-900 dark:text-zinc-100"
                      )}>
                        {notification.title}
                      </p>
                      {notification.message && (
                        <p className="mt-0.5 text-xs text-zinc-500 line-clamp-2">
                          {notification.message}
                        </p>
                      )}
                      <p className="mt-1 text-xs text-zinc-400">
                        {formatDistanceToNow(new Date(notification.createdAt), {
                          addSuffix: true,
                          locale: nl,
                        })}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      {notification.actionUrl && (
                        <ExternalLink className="h-3 w-3 text-zinc-400" />
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(notification.id);
                        }}
                      >
                        <Trash2 className="h-3 w-3 text-zinc-400 hover:text-red-500" />
                      </Button>
                    </div>
                  </div>
                  {!notification.isRead && (
                    <div className="absolute left-1 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-violet-500" />
                  )}
                </div>
              );
            })
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
