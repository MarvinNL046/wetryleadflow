import Link from "next/link";
import { requireAuthContext } from "@/lib/auth/context";
import { isSuperAdmin } from "@/lib/auth/superadmin";
import { Users, Kanban, LayoutDashboard, LogOut, Shield, Home } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default async function CRMLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const ctx = await requireAuthContext();
  const isAdmin = isSuperAdmin(ctx.user.email);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="relative w-64 border-r border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="flex h-14 items-center border-b border-zinc-200 px-4 dark:border-zinc-800">
          <Link href="/dashboard" className="text-lg font-semibold">
            LeadFlow
          </Link>
        </div>

        <nav className="space-y-1 p-4">
          <Link
            href="/crm"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900"
          >
            <LayoutDashboard className="h-4 w-4" />
            Overview
          </Link>
          <Link
            href="/crm/contacts"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900"
          >
            <Users className="h-4 w-4" />
            Contacts
          </Link>
          <Link
            href="/crm/pipelines"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900"
          >
            <Kanban className="h-4 w-4" />
            Pipelines
          </Link>
        </nav>

        {/* Bottom section */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950">
          {/* Quick links */}
          <div className="mb-3 flex gap-2">
            <Link
              href="/dashboard"
              className="flex flex-1 items-center justify-center gap-2 rounded-md bg-zinc-100 px-3 py-2 text-xs font-medium text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              <Home className="h-3 w-3" />
              Dashboard
            </Link>
            {isAdmin && (
              <Link
                href="/admin"
                className="flex items-center justify-center gap-2 rounded-md bg-zinc-900 px-3 py-2 text-xs font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
              >
                <Shield className="h-3 w-3" />
                Admin
              </Link>
            )}
          </div>

          {/* User info */}
          <div className="flex items-center gap-3 rounded-md bg-zinc-100 p-3 dark:bg-zinc-900">
            <Avatar className="h-8 w-8">
              {ctx.user.avatarUrl && <AvatarImage src={ctx.user.avatarUrl} />}
              <AvatarFallback className="text-xs">
                {ctx.user.name?.[0] ?? ctx.user.email[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-sm font-medium">
                {ctx.user.name ?? ctx.user.email}
              </p>
              <p className="truncate text-xs text-zinc-500">{ctx.org.name}</p>
            </div>
          </div>

          {/* Sign out */}
          <Link
            href="/handler/sign-out"
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-md border border-zinc-200 px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto bg-white dark:bg-zinc-950">
        {children}
      </main>
    </div>
  );
}
