import Link from "next/link";
import { requireAuthContext } from "@/lib/auth/context";
import { can } from "@/lib/auth/rbac";
import { isSuperAdmin } from "@/lib/auth/superadmin";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Shield, LogOut, ArrowLeft } from "lucide-react";
import { ProfileForm } from "@/components/settings/profile-form";
import { OrgSettingsForm } from "@/components/settings/org-settings-form";
import { ThemeToggle } from "@/components/settings/theme-toggle";
import { DeleteAccountDialog } from "@/components/settings/delete-account-dialog";

export default async function SettingsPage() {
  const ctx = await requireAuthContext();
  const isAdmin = isSuperAdmin(ctx.user.email);
  const canEditOrg = can(ctx, "org:settings");

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Header */}
      <header className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-8 py-4">
          <div className="flex items-center gap-4">
            <Link
              href="/crm"
              className="flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to CRM
            </Link>
          </div>
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Account Settings</h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Manage your profile and preferences
          </p>
        </div>

        <div className="space-y-8">
          {/* Profile Settings */}
          <section className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="text-lg font-semibold">Profile</h2>
            <p className="mt-1 text-sm text-zinc-500">
              Update your personal information
            </p>
            <div className="mt-6">
              <ProfileForm user={{ name: ctx.user.name, email: ctx.user.email }} />
            </div>
          </section>

          {/* Appearance */}
          <section className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="text-lg font-semibold">Appearance</h2>
            <p className="mt-1 text-sm text-zinc-500">
              Customize how LeadFlow looks
            </p>
            <div className="mt-6">
              <ThemeToggle />
            </div>
          </section>

          {/* Organization Settings */}
          <section className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">Organization</h2>
                <p className="mt-1 text-sm text-zinc-500">
                  Manage your organization settings
                </p>
              </div>
              <span className="rounded bg-zinc-100 px-2 py-0.5 text-xs font-medium dark:bg-zinc-800">
                {ctx.role}
              </span>
            </div>
            <div className="mt-6">
              <OrgSettingsForm
                org={{ name: ctx.org.name, slug: ctx.org.slug }}
                canEdit={canEditOrg}
              />
            </div>
          </section>

          {/* Workspace Info (read-only for now) */}
          <section className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="text-lg font-semibold">Workspace</h2>
            <p className="mt-1 text-sm text-zinc-500">
              Your current workspace
            </p>
            <dl className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-zinc-500">Name</dt>
                <dd className="font-medium">{ctx.workspace.name}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-zinc-500">Slug</dt>
                <dd className="font-mono text-zinc-600 dark:text-zinc-400">{ctx.workspace.slug}</dd>
              </div>
            </dl>
          </section>

          {/* Danger Zone */}
          <section className="rounded-lg border border-red-200 bg-red-50 p-6 dark:border-red-900 dark:bg-red-950">
            <h2 className="text-lg font-semibold text-red-800 dark:text-red-200">Danger Zone</h2>
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              Permanent actions that cannot be undone
            </p>
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between rounded-md border border-red-200 bg-white p-4 dark:border-red-800 dark:bg-red-950">
                <div>
                  <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
                    Delete Account
                  </h3>
                  <p className="text-sm text-red-600 dark:text-red-400">
                    Permanently delete your account and all associated data
                  </p>
                </div>
                <DeleteAccountDialog />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
