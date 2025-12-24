"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@stackframe/stack";
import {
  Building2,
  LayoutDashboard,
  Users,
  Palette,
  CreditCard,
  Settings,
  ArrowLeft,
  LogOut,
  Sparkles,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/agency", label: "Dashboard", icon: LayoutDashboard },
  { href: "/agency/clients", label: "Clients", icon: Building2 },
  { href: "/agency/team", label: "Team", icon: Users },
  { href: "/agency/branding", label: "Branding", icon: Palette },
  { href: "/agency/saas", label: "SaaS Mode", icon: Sparkles },
  { href: "/agency/billing", label: "Billing", icon: CreditCard },
  { href: "/agency/settings", label: "Settings", icon: Settings },
];

interface AgencySidebarProps {
  hasImpersonationBanner?: boolean;
}

export function AgencySidebar({ hasImpersonationBanner }: AgencySidebarProps) {
  const user = useUser({ or: "redirect" });
  const pathname = usePathname();

  return (
    <aside className={cn(
      "dashboard-sidebar relative w-64 border-r border-zinc-200/50 dark:border-zinc-800/50",
      hasImpersonationBanner && "pt-10"
    )}>
      {/* Gradient accent line - purple/blue for agency */}
      <div className="absolute left-0 top-0 h-full w-[2px] bg-gradient-to-b from-violet-500 via-purple-500 to-blue-500 opacity-60 dark:opacity-80" />

      {/* Logo */}
      <div className="relative z-10 flex h-14 items-center border-b border-zinc-200/50 px-4 dark:border-zinc-800/50">
        <Link href="/agency" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-purple-600">
            <Building2 className="h-4 w-4 text-white" />
          </div>
          <span className="text-lg font-bold">
            Agency<span className="bg-gradient-to-r from-violet-500 to-purple-600 bg-clip-text text-transparent"> Portal</span>
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 space-y-1 p-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href ||
            (item.href !== "/agency" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "dashboard-nav-item flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "active bg-gradient-to-r from-violet-500/10 to-purple-500/10 text-violet-600 dark:text-violet-400"
                  : "text-zinc-600 hover:bg-zinc-100/50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/50 dark:hover:text-zinc-100"
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
      </nav>

      {/* Bottom section */}
      <div className="absolute bottom-0 left-0 right-0 z-10 p-4">
        {/* Go to CRM button */}
        <Link
          href="/crm"
          className="mb-3 flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-blue-600 px-3 py-2.5 text-sm font-medium text-white shadow-lg shadow-violet-500/25 transition-all hover:shadow-violet-500/40"
        >
          <ArrowLeft className="h-4 w-4" />
          Go to CRM
        </Link>

        {/* Divider */}
        <div className="mb-3 border-t border-zinc-200/50 dark:border-zinc-800/50" />

        {/* User info */}
        <div className="rounded-xl border border-violet-200/30 bg-gradient-to-br from-violet-50/50 to-purple-50/50 p-3 dark:border-violet-900/30 dark:from-violet-950/30 dark:to-purple-950/30">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Avatar className="h-9 w-9 ring-2 ring-violet-500/20">
                {user?.profileImageUrl && <AvatarImage src={user.profileImageUrl} />}
                <AvatarFallback className="bg-gradient-to-br from-violet-500 to-purple-500 text-xs text-white">
                  {user?.displayName?.[0] ?? user?.primaryEmail?.[0]?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
              {/* Agency indicator */}
              <div className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-white bg-violet-500 dark:border-zinc-900">
                <Building2 className="h-2 w-2 text-white" />
              </div>
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-sm font-medium">
                {user?.displayName ?? "Agency Owner"}
              </p>
              <p className="truncate text-xs text-zinc-500">
                {user?.primaryEmail}
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
  );
}
