"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@stackframe/stack";
import {
  Shield,
  LayoutDashboard,
  Building2,
  Building,
  Users,
  Link2,
  Activity,
  ScrollText,
  Zap,
  Mail,
  ArrowLeft,
  CreditCard,
  TrendingUp,
  Clock,
  Megaphone,
  Flag,
  MessageSquare,
  Loader2,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { ImpersonationBanner } from "@/components/admin/impersonation-banner";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/billing", label: "Billing", icon: CreditCard, isNew: true },
  { href: "/admin/revenue", label: "Revenue", icon: TrendingUp, isNew: true },
  { href: "/admin/agencies", label: "Agencies", icon: Building },
  { href: "/admin/orgs", label: "Organizations", icon: Building2 },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/integrations", label: "Integrations", icon: Link2 },
  { href: "/admin/cron", label: "Cron Jobs", icon: Clock, isNew: true },
  { href: "/admin/system", label: "System", icon: Activity },
  { href: "/admin/announcements", label: "Announcements", icon: Megaphone, isNew: true },
  { href: "/admin/features", label: "Features", icon: Flag, isNew: true },
  { href: "/admin/support", label: "Support", icon: MessageSquare, isNew: true },
  { href: "/admin/audit", label: "Audit Log", icon: ScrollText },
  { href: "/admin/outbox", label: "Automations", icon: Zap },
  { href: "/admin/emails", label: "Emails", icon: Mail },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useUser({ or: "redirect" });
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    async function checkAdmin() {
      try {
        const res = await fetch("/api/auth/is-admin");
        const data = await res.json();

        if (!data.isAdmin) {
          router.replace("/unauthorized");
        } else {
          setIsAuthorized(true);
        }
      } catch {
        router.replace("/unauthorized");
      } finally {
        setIsChecking(false);
      }
    }

    if (user) {
      checkAdmin();
    }
  }, [user, router]);

  // Show loading while checking authorization
  if (isChecking || !isAuthorized) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-zinc-400" />
          <p className="text-sm text-zinc-500">Checking authorization...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="dashboard-sidebar relative w-64 border-r border-zinc-200/50 dark:border-zinc-800/50">
        {/* Gradient accent line - red/orange for admin */}
        <div className="absolute left-0 top-0 h-full w-[2px] bg-gradient-to-b from-red-500 via-orange-500 to-amber-500 opacity-60 dark:opacity-80" />

        {/* Logo */}
        <div className="relative z-10 flex h-14 items-center border-b border-zinc-200/50 px-4 dark:border-zinc-800/50">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-red-500 to-orange-500">
              <Shield className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-bold">
              Admin<span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent"> Panel</span>
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="relative z-10 space-y-1 p-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href ||
              (item.href !== "/admin" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "dashboard-nav-item flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "active bg-gradient-to-r from-red-500/10 to-orange-500/10 text-red-600 dark:text-red-400"
                    : "text-zinc-600 hover:bg-zinc-100/50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/50 dark:hover:text-zinc-100"
                )}
              >
                <item.icon className={cn(
                  "h-4 w-4 transition-colors",
                  isActive && "text-red-500"
                )} />
                {item.label}
                {/* NEW badge for new features */}
                {item.isNew && (
                  <span className="ml-auto rounded-full bg-gradient-to-r from-red-500 to-orange-500 px-1.5 py-0.5 text-[10px] font-semibold text-white">
                    NEW
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom section */}
        <div className="absolute bottom-0 left-0 right-0 z-10 p-4">
          {/* Back to CRM button */}
          <Link
            href="/crm"
            className="mb-3 flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-blue-600 px-3 py-2.5 text-sm font-medium text-white shadow-lg shadow-violet-500/25 transition-all hover:shadow-violet-500/40"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to CRM
          </Link>

          {/* Divider */}
          <div className="mb-3 border-t border-zinc-200/50 dark:border-zinc-800/50" />

          {/* User info */}
          <div className="rounded-xl border border-red-200/30 bg-gradient-to-br from-red-50/50 to-orange-50/50 p-3 dark:border-red-900/30 dark:from-red-950/30 dark:to-orange-950/30">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar className="h-9 w-9 ring-2 ring-red-500/20">
                  {user?.profileImageUrl && <AvatarImage src={user.profileImageUrl} />}
                  <AvatarFallback className="bg-gradient-to-br from-red-500 to-orange-500 text-xs text-white">
                    {user?.displayName?.[0] ?? user?.primaryEmail?.[0]?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                {/* Admin indicator */}
                <div className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-white bg-red-500 dark:border-zinc-900">
                  <Shield className="h-2 w-2 text-white" />
                </div>
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="truncate text-sm font-medium">
                  {user?.displayName ?? "Admin"}
                </p>
                <p className="truncate text-xs text-zinc-500">
                  {user?.primaryEmail}
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="dashboard-bg flex-1 overflow-auto">
        <ImpersonationBanner />
        <div className="relative z-10">
          {children}
        </div>
      </main>
    </div>
  );
}
