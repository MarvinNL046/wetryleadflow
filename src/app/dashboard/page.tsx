import Link from "next/link";
import { requireAuthContext } from "@/lib/auth/context";
import { can } from "@/lib/auth/rbac";
import { isSuperAdmin } from "@/lib/auth/superadmin";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Shield, LogOut } from "lucide-react";

export default async function DashboardPage() {
  const ctx = await requireAuthContext();
  const isAdmin = isSuperAdmin(ctx.user.email);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Header */}
      <header className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-8 py-4">
          <Link href="/dashboard" className="text-xl font-bold">
            LeadFlow
          </Link>
          <div className="flex items-center gap-4">
            {isAdmin && (
              <Button variant="outline" size="sm" asChild>
                <Link href="/admin">
                  <Shield className="mr-2 h-4 w-4" />
                  Admin
                </Link>
              </Button>
            )}
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                {ctx.user.avatarUrl && <AvatarImage src={ctx.user.avatarUrl} />}
                <AvatarFallback className="text-xs">
                  {ctx.user.name?.[0] ?? ctx.user.email[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">{ctx.user.name ?? ctx.user.email}</span>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/handler/sign-out">
                <LogOut className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-2xl p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              Welcome back, {ctx.user.name ?? ctx.user.email}!
            </p>
          </div>
          <Button asChild>
            <Link href="/crm">Open CRM</Link>
          </Button>
        </div>

        <div className="mt-8 space-y-6">
          {/* User Info */}
          <section className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="text-lg font-semibold">User</h2>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-zinc-500">Email</dt>
                <dd>{ctx.user.email}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-zinc-500">Name</dt>
                <dd>{ctx.user.name ?? "-"}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-zinc-500">ID</dt>
                <dd className="font-mono text-xs">{ctx.user.externalId}</dd>
              </div>
            </dl>
          </section>

          {/* Organization Info */}
          <section className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="text-lg font-semibold">Organization</h2>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-zinc-500">Name</dt>
                <dd>{ctx.org.name}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-zinc-500">Slug</dt>
                <dd className="font-mono">{ctx.org.slug}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-zinc-500">Your Role</dt>
                <dd>
                  <span className="rounded bg-zinc-100 px-2 py-0.5 text-xs font-medium dark:bg-zinc-800">
                    {ctx.role}
                  </span>
                </dd>
              </div>
            </dl>
          </section>

          {/* Workspace Info */}
          <section className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="text-lg font-semibold">Workspace</h2>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-zinc-500">Name</dt>
                <dd>{ctx.workspace.name}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-zinc-500">Slug</dt>
                <dd className="font-mono">{ctx.workspace.slug}</dd>
              </div>
            </dl>
          </section>

          {/* Permissions */}
          <section className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="text-lg font-semibold">Permissions</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {[
                "org:settings",
                "org:billing",
                "member:invite",
                "workspace:create",
                "content:write",
              ].map((action) => (
                <span
                  key={action}
                  className={`rounded px-2 py-1 text-xs font-medium ${
                    can(ctx, action)
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                  }`}
                >
                  {action}: {can(ctx, action) ? "yes" : "no"}
                </span>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
