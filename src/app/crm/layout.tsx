"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useUser } from "@stackframe/stack";
import { Users, Kanban, LayoutDashboard, LogOut, Shield, Cog, User, BarChart3, MessageSquare, BookOpen, Receipt } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FeedbackModal } from "@/components/feedback/feedback-modal";
import { OnboardingProvider, OnboardingModal, SidebarChecklist } from "@/components/onboarding";
import { NotificationBell } from "@/components/notifications/notification-bell";
import { AnnouncementsClient } from "@/components/announcements/announcements-client";
import { cn } from "@/lib/utils";

type NavItem = {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
};

type NavSection = {
  title: string;
  items: NavItem[];
};

const navSections: NavSection[] = [
  {
    title: "Overzicht",
    items: [
      { href: "/crm", label: "Dashboard", icon: LayoutDashboard },
    ],
  },
  {
    title: "CRM",
    items: [
      { href: "/crm/contacts", label: "Contacts", icon: Users },
      { href: "/crm/pipelines", label: "Pipelines", icon: Kanban },
    ],
  },
  {
    title: "Financiën",
    items: [
      { href: "/crm/invoicing", label: "Facturatie", icon: Receipt },
    ],
  },
  {
    title: "Inzichten",
    items: [
      { href: "/crm/analytics", label: "Analytics", icon: BarChart3 },
    ],
  },
];

export default function CRMLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useUser({ or: "redirect" });
  const pathname = usePathname();
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Check if user is super admin via API
  useEffect(() => {
    async function checkAdmin() {
      try {
        const res = await fetch("/api/auth/is-admin");
        const data = await res.json();
        setIsAdmin(data.isAdmin);
      } catch {
        setIsAdmin(false);
      }
    }
    if (user) {
      checkAdmin();
    }
  }, [user]);

  const org = user?.selectedTeam;

  return (
    <OnboardingProvider>
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="dashboard-sidebar relative w-64 border-r border-zinc-200/50 dark:border-zinc-800/50">
        {/* Gradient accent line */}
        <div className="sidebar-accent-line" />

        {/* Logo */}
        <div className="relative z-10 flex h-14 items-center justify-between border-b border-zinc-200/50 px-4 dark:border-zinc-800/50">
          <Link href="/crm" className="flex items-center gap-2">
            <Image
              src="/logo/wetryleadflow-logo-trans-bg.webp"
              alt="LeadFlow"
              width={32}
              height={32}
              className="h-7 w-auto"
              priority
            />
            <span className="text-lg font-bold">
              Lead<span className="bg-gradient-to-r from-violet-500 to-blue-500 bg-clip-text text-transparent">Flow</span>
            </span>
          </Link>
          <NotificationBell />
        </div>

        {/* Navigation */}
        <nav className="relative z-10 space-y-4 p-4">
          {navSections.map((section, sectionIndex) => (
            <div key={section.title}>
              {/* Section divider (not for first section) */}
              {sectionIndex > 0 && (
                <div className="mb-3 border-t border-zinc-200/50 dark:border-zinc-800/50" />
              )}

              {/* Section title */}
              <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                {section.title}
              </p>

              {/* Section items */}
              <div className="space-y-1">
                {section.items.map((item) => {
                  const isActive = pathname === item.href ||
                    (item.href !== "/crm" && pathname.startsWith(item.href));

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "dashboard-nav-item flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                        isActive
                          ? "active text-violet-600 dark:text-violet-400"
                          : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                      )}
                    >
                      <item.icon className={cn(
                        "h-4 w-4 transition-colors",
                        isActive && "text-violet-500"
                      )} />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Setup Checklist - shows if onboarding incomplete */}
        <div className="relative z-10 px-4 py-2">
          <SidebarChecklist />
        </div>

        {/* Bottom section */}
        <div className="absolute bottom-0 left-0 right-0 z-10 p-4">
          {/* Infocentrum Button */}
          <Link
            href="/crm/infocentrum"
            className="mb-2 flex w-full items-center justify-center gap-2 rounded-lg border border-blue-200/50 bg-blue-50/50 px-3 py-2 text-xs font-medium text-blue-700 transition-all hover:bg-blue-100/50 dark:border-blue-800/50 dark:bg-blue-900/20 dark:text-blue-300 dark:hover:bg-blue-900/40"
          >
            <BookOpen className="h-3 w-3" />
            Infocentrum
          </Link>

          {/* Feedback Button */}
          <button
            onClick={() => setIsFeedbackOpen(true)}
            className="mb-2 flex w-full items-center justify-center gap-2 rounded-lg border border-violet-200/50 bg-violet-50/50 px-3 py-2 text-xs font-medium text-violet-700 transition-all hover:bg-violet-100/50 dark:border-violet-800/50 dark:bg-violet-900/20 dark:text-violet-300 dark:hover:bg-violet-900/40"
          >
            <MessageSquare className="h-3 w-3" />
            Feedback
          </button>

          {/* CRM Settings */}
          <Link
            href="/crm/settings"
            className="quick-action-btn mb-3 flex w-full items-center justify-center gap-2 rounded-lg border border-zinc-200/50 bg-zinc-100/50 px-3 py-2 text-xs font-medium text-zinc-700 hover:bg-zinc-200/50 dark:border-zinc-800/50 dark:bg-zinc-900/50 dark:text-zinc-300 dark:hover:bg-zinc-800/50"
          >
            <Cog className="h-3 w-3" />
            CRM Settings
          </Link>

          {/* Divider */}
          <div className="mb-3 border-t border-zinc-200/50 dark:border-zinc-800/50" />

          {/* Quick links */}
          <div className="mb-3 flex gap-2">
            <Link
              href="/settings"
              className="quick-action-btn flex flex-1 items-center justify-center gap-2 rounded-lg border border-zinc-200/50 bg-zinc-100/50 px-3 py-2 text-xs font-medium text-zinc-700 hover:bg-zinc-200/50 dark:border-zinc-800/50 dark:bg-zinc-900/50 dark:text-zinc-300 dark:hover:bg-zinc-800/50"
            >
              <User className="h-3 w-3" />
              Account
            </Link>
            {isAdmin && (
              <Link
                href="/admin"
                className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-blue-600 px-3 py-2 text-xs font-medium text-white shadow-lg shadow-violet-500/25 transition-shadow hover:shadow-violet-500/40"
              >
                <Shield className="h-3 w-3" />
                Admin
              </Link>
            )}
          </div>

          {/* User info */}
          <div className="user-card-glow rounded-xl border border-zinc-200/50 bg-zinc-100/80 p-3 dark:border-zinc-800/50 dark:bg-zinc-900/80">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar className="h-9 w-9 ring-2 ring-violet-500/20">
                  {user?.profileImageUrl && <AvatarImage src={user.profileImageUrl} />}
                  <AvatarFallback className="bg-gradient-to-br from-violet-500 to-blue-500 text-xs text-white">
                    {user?.displayName?.[0] ?? user?.primaryEmail?.[0]?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                {/* Online indicator */}
                <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-zinc-100 bg-green-500 dark:border-zinc-900" />
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="truncate text-sm font-medium">
                  {user?.displayName ?? user?.primaryEmail}
                </p>
                <p className="truncate text-xs text-zinc-500">
                  {org?.displayName ?? "Personal"}
                </p>
              </div>
            </div>
          </div>

          {/* Sign out */}
          <Link
            href="/handler/sign-out"
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-zinc-200/50 px-3 py-2 text-sm font-medium text-zinc-600 transition-all hover:border-red-200 hover:bg-red-50 hover:text-red-600 dark:border-zinc-800/50 dark:text-zinc-400 dark:hover:border-red-900/50 dark:hover:bg-red-950/30 dark:hover:text-red-400"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="dashboard-bg flex-1 overflow-auto">
        <div className="relative z-10">
          {/* Announcements Banner */}
          {user?.id && <AnnouncementsClient />}
          {children}
        </div>
      </main>

      {/* Feedback Modal */}
      <FeedbackModal
        isOpen={isFeedbackOpen}
        onClose={() => setIsFeedbackOpen(false)}
      />

      {/* Onboarding Modal */}
      <OnboardingModal />
    </div>
    </OnboardingProvider>
  );
}
