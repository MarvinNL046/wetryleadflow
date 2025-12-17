import Link from "next/link";
import { requireSuperAdmin } from "@/lib/auth/superadmin";
import { Shield, Building2, Users, LayoutDashboard, ScrollText, Zap, Mail } from "lucide-react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireSuperAdmin();

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 border-r border-zinc-200 bg-zinc-900 text-white dark:border-zinc-800">
        <div className="flex h-14 items-center gap-2 border-b border-zinc-800 px-4">
          <Shield className="h-5 w-5 text-red-500" />
          <span className="font-semibold">Admin Panel</span>
        </div>
        <nav className="space-y-1 p-4">
          <Link
            href="/admin"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-zinc-300 hover:bg-zinc-800 hover:text-white"
          >
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Link>
          <Link
            href="/admin/orgs"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-zinc-300 hover:bg-zinc-800 hover:text-white"
          >
            <Building2 className="h-4 w-4" />
            Organizations
          </Link>
          <Link
            href="/admin/users"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-zinc-300 hover:bg-zinc-800 hover:text-white"
          >
            <Users className="h-4 w-4" />
            Users
          </Link>
          <Link
            href="/admin/audit"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-zinc-300 hover:bg-zinc-800 hover:text-white"
          >
            <ScrollText className="h-4 w-4" />
            Audit Log
          </Link>
          <Link
            href="/admin/outbox"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-zinc-300 hover:bg-zinc-800 hover:text-white"
          >
            <Zap className="h-4 w-4" />
            Automations
          </Link>
          <Link
            href="/admin/emails"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-zinc-300 hover:bg-zinc-800 hover:text-white"
          >
            <Mail className="h-4 w-4" />
            Emails
          </Link>
        </nav>
        <div className="absolute bottom-4 left-4 right-4">
          <div className="rounded-md bg-zinc-800 p-3">
            <p className="text-xs text-zinc-500">Logged in as</p>
            <p className="truncate text-sm font-medium">{user.primaryEmail}</p>
          </div>
          <Link
            href="/dashboard"
            className="mt-2 block rounded-md bg-zinc-800 px-3 py-2 text-center text-sm text-zinc-300 hover:bg-zinc-700"
          >
            Back to App
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto bg-zinc-50 dark:bg-zinc-950">
        {children}
      </main>
    </div>
  );
}
