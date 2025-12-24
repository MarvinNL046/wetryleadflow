"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import { useUser } from "@stackframe/stack";
import {
  Users,
  Kanban,
  LayoutDashboard,
  LogOut,
  Cog,
  User,
  BarChart3,
  MessageSquare,
  BookOpen,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FeedbackModal } from "@/components/feedback/feedback-modal";
import {
  OnboardingProvider,
  OnboardingModal,
  SidebarChecklist,
} from "@/components/onboarding";
import { BrandedHeader } from "@/components/agency/branded-header";
import { useAgency } from "@/lib/agency/context";
import { cn } from "@/lib/utils";

export default function AgencyCRMLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useUser({ or: "redirect" });
  const pathname = usePathname();
  const params = useParams();
  const agencySlug = params.agencySlug as string;
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const { agency } = useAgency();

  const org = user?.selectedTeam;

  // Build nav items with agency prefix
  const navItems = [
    { href: `/${agencySlug}/crm`, label: "Overview", icon: LayoutDashboard },
    { href: `/${agencySlug}/crm/contacts`, label: "Contacts", icon: Users },
    { href: `/${agencySlug}/crm/pipelines`, label: "Pipelines", icon: Kanban },
    { href: `/${agencySlug}/crm/analytics`, label: "Analytics", icon: BarChart3 },
  ];

  return (
    <OnboardingProvider>
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="dashboard-sidebar relative w-64 border-r border-zinc-200/50 dark:border-zinc-800/50">
          {/* Gradient accent line - uses agency colors */}
          <div className="sidebar-accent-line agency-sidebar-accent" />

          {/* Logo - Agency branded */}
          <div className="relative z-10 flex h-14 items-center border-b border-zinc-200/50 px-4 dark:border-zinc-800/50">
            <Link href={`/${agencySlug}/crm`}>
              <BrandedHeader />
            </Link>
          </div>

          {/* Navigation */}
          <nav className="relative z-10 space-y-1 p-4">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== `/${agencySlug}/crm` &&
                  pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "dashboard-nav-item agency-nav-item flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "active"
                      : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                  )}
                  style={
                    isActive
                      ? { color: agency?.primaryColor || "#8b5cf6" }
                      : undefined
                  }
                >
                  <item.icon
                    className="h-4 w-4 transition-colors"
                    style={
                      isActive
                        ? { color: agency?.primaryColor || "#8b5cf6" }
                        : undefined
                    }
                  />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Setup Checklist - shows if onboarding incomplete */}
          <div className="relative z-10 px-4 py-2">
            <SidebarChecklist />
          </div>

          {/* Bottom section */}
          <div className="absolute bottom-0 left-0 right-0 z-10 p-4">
            {/* Infocentrum Button */}
            <Link
              href={`/${agencySlug}/crm/infocentrum`}
              className="mb-2 flex w-full items-center justify-center gap-2 rounded-lg border border-blue-200/50 bg-blue-50/50 px-3 py-2 text-xs font-medium text-blue-700 transition-all hover:bg-blue-100/50 dark:border-blue-800/50 dark:bg-blue-900/20 dark:text-blue-300 dark:hover:bg-blue-900/40"
            >
              <BookOpen className="h-3 w-3" />
              Infocentrum
            </Link>

            {/* Feedback Button */}
            <button
              onClick={() => setIsFeedbackOpen(true)}
              className="mb-2 flex w-full items-center justify-center gap-2 rounded-lg border px-3 py-2 text-xs font-medium transition-all"
              style={{
                borderColor: `${agency?.primaryColor || "#8b5cf6"}33`,
                backgroundColor: `${agency?.primaryColor || "#8b5cf6"}0d`,
                color: agency?.primaryColor || "#8b5cf6",
              }}
            >
              <MessageSquare className="h-3 w-3" />
              Feedback
            </button>

            {/* CRM Settings */}
            <Link
              href={`/${agencySlug}/crm/settings`}
              className="quick-action-btn mb-3 flex w-full items-center justify-center gap-2 rounded-lg border border-zinc-200/50 bg-zinc-100/50 px-3 py-2 text-xs font-medium text-zinc-700 hover:bg-zinc-200/50 dark:border-zinc-800/50 dark:bg-zinc-900/50 dark:text-zinc-300 dark:hover:bg-zinc-800/50"
            >
              <Cog className="h-3 w-3" />
              CRM Settings
            </Link>

            {/* Divider */}
            <div className="mb-3 border-t border-zinc-200/50 dark:border-zinc-800/50" />

            {/* Account link */}
            <Link
              href={`/${agencySlug}/settings`}
              className="quick-action-btn mb-3 flex w-full items-center justify-center gap-2 rounded-lg border border-zinc-200/50 bg-zinc-100/50 px-3 py-2 text-xs font-medium text-zinc-700 hover:bg-zinc-200/50 dark:border-zinc-800/50 dark:bg-zinc-900/50 dark:text-zinc-300 dark:hover:bg-zinc-800/50"
            >
              <User className="h-3 w-3" />
              Account
            </Link>

            {/* User info */}
            <div className="user-card-glow rounded-xl border border-zinc-200/50 bg-zinc-100/80 p-3 dark:border-zinc-800/50 dark:bg-zinc-900/80">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar className="h-9 w-9 ring-2 ring-violet-500/20">
                    {user?.profileImageUrl && (
                      <AvatarImage src={user.profileImageUrl} />
                    )}
                    <AvatarFallback
                      className="text-xs text-white"
                      style={{
                        background: `linear-gradient(135deg, ${agency?.primaryColor || "#8b5cf6"}, ${agency?.secondaryColor || "#3b82f6"})`,
                      }}
                    >
                      {user?.displayName?.[0] ??
                        user?.primaryEmail?.[0]?.toUpperCase()}
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
          <div className="relative z-10">{children}</div>
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
