import Link from "next/link";
import { requireAuthContext } from "@/lib/auth/context";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Plug,
  ChevronRight,
  Route,
  Workflow,
  User,
  Building2,
  Kanban,
  Mail,
  Bell,
  Shield,
  Palette,
  ExternalLink,
  CreditCard,
} from "lucide-react";

export default async function CRMSettingsPage() {
  const ctx = await requireAuthContext();

  // Check if user is via agency (no direct billing)
  const isAgencyClient = !!ctx.org.agencyId;

  const settingsSections = [
    {
      title: "Account",
      description: "Persoonlijke en organisatie instellingen",
      items: [
        {
          href: "/settings",
          icon: User,
          title: "Profiel",
          description: "Je naam en persoonlijke gegevens",
          color: "bg-violet-100 text-violet-600 dark:bg-violet-900 dark:text-violet-400",
          external: false,
        },
        {
          href: "/settings",
          icon: Building2,
          title: "Organisatie",
          description: "Bedrijfsnaam en instellingen",
          color: "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400",
          external: false,
        },
        {
          href: "/settings",
          icon: Palette,
          title: "Uiterlijk",
          description: "Donker/licht thema instellen",
          color: "bg-pink-100 text-pink-600 dark:bg-pink-900 dark:text-pink-400",
          external: false,
        },
        // Only show billing for direct users (not agency clients)
        ...(!isAgencyClient ? [{
          href: "/crm/settings/billing",
          icon: CreditCard,
          title: "Abonnement & Billing",
          description: "Beheer je plan en betalingen",
          color: "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400",
          external: false,
        }] : []),
      ],
    },
    {
      title: "CRM Configuratie",
      description: "Pipelines, integraties en automatisering",
      items: [
        {
          href: "/crm/pipelines",
          icon: Kanban,
          title: "Pipelines",
          description: "Beheer je sales pipelines en stages",
          color: "bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-400",
          external: false,
        },
        {
          href: "/crm/settings/integrations",
          icon: Plug,
          title: "Integraties",
          description: "Facebook Lead Ads en andere koppelingen",
          color: "bg-cyan-100 text-cyan-600 dark:bg-cyan-900 dark:text-cyan-400",
          external: false,
        },
        {
          href: "/crm/settings/follow-ups",
          icon: Route,
          title: "Follow-Up Regels",
          description: "Automatische follow-ups en terugbelperiodes",
          color: "bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-400",
          external: false,
        },
      ],
    },
    {
      title: "Automatisering",
      description: "Email en notificatie instellingen",
      items: [
        {
          href: "/crm/settings/email-templates",
          icon: Mail,
          title: "Email Templates",
          description: "Pas automatische emails aan",
          color: "bg-amber-100 text-amber-600 dark:bg-amber-900 dark:text-amber-400",
          external: false,
        },
        {
          href: "#",
          icon: Bell,
          title: "Notificaties",
          description: "Stel in wanneer je meldingen ontvangt",
          color: "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400",
          comingSoon: true,
        },
        {
          href: "#",
          icon: Workflow,
          title: "Workflows",
          description: "Automatische acties en triggers",
          color: "bg-rose-100 text-rose-600 dark:bg-rose-900 dark:text-rose-400",
          comingSoon: true,
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Header with user info */}
      <div className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto max-w-4xl px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Instellingen</h1>
              <p className="mt-1 text-zinc-500">
                Beheer je account en CRM configuratie
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="font-medium">{ctx.user.name ?? ctx.user.email}</p>
                <p className="text-sm text-zinc-500">{ctx.org.name}</p>
              </div>
              <Avatar className="h-12 w-12 border-2 border-violet-500/20">
                {ctx.user.avatarUrl && <AvatarImage src={ctx.user.avatarUrl} />}
                <AvatarFallback className="bg-gradient-to-br from-violet-500 to-blue-500 text-white">
                  {ctx.user.name?.[0] ?? ctx.user.email[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl p-8">
        {/* Quick Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-100 dark:bg-violet-900">
                <User className="h-5 w-5 text-violet-600 dark:text-violet-400" />
              </div>
              <div>
                <p className="text-sm text-zinc-500">Rol</p>
                <p className="font-semibold capitalize">{ctx.role}</p>
              </div>
            </div>
          </div>
          <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900">
                <Building2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-zinc-500">Workspace</p>
                <p className="font-semibold">{ctx.workspace.name}</p>
              </div>
            </div>
          </div>
          <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900">
                <Shield className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-zinc-500">Status</p>
                <p className="font-semibold text-green-600 dark:text-green-400">Actief</p>
              </div>
            </div>
          </div>
        </div>

        {/* Settings Sections */}
        <div className="space-y-8">
          {settingsSections.map((section) => (
            <div key={section.title}>
              <div className="mb-4">
                <h2 className="text-lg font-semibold">{section.title}</h2>
                <p className="text-sm text-zinc-500">{section.description}</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isComingSoon = "comingSoon" in item && item.comingSoon;

                  if (isComingSoon) {
                    return (
                      <div
                        key={item.title}
                        className="relative overflow-hidden rounded-lg border border-zinc-200 bg-white p-4 opacity-60 dark:border-zinc-800 dark:bg-zinc-900"
                      >
                        <div className="flex items-start gap-3">
                          <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg ${item.color}`}>
                            <Icon className="h-5 w-5" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{item.title}</h3>
                              <span className="rounded bg-zinc-100 px-1.5 py-0.5 text-xs font-medium text-zinc-500 dark:bg-zinc-800">
                                Binnenkort
                              </span>
                            </div>
                            <p className="mt-0.5 text-sm text-zinc-500 line-clamp-1">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={item.title}
                      href={item.href}
                      className="group relative overflow-hidden rounded-lg border border-zinc-200 bg-white p-4 transition-all hover:border-violet-500/30 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-violet-500/30"
                    >
                      <div className="flex items-start gap-3">
                        <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg ${item.color}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{item.title}</h3>
                            {"external" in item && item.external && (
                              <ExternalLink className="h-3 w-3 text-zinc-400" />
                            )}
                          </div>
                          <p className="mt-0.5 text-sm text-zinc-500 line-clamp-1">
                            {item.description}
                          </p>
                        </div>
                        <ChevronRight className="h-5 w-5 flex-shrink-0 text-zinc-300 transition-transform group-hover:translate-x-1 group-hover:text-violet-500 dark:text-zinc-600" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Help Section */}
        <div className="mt-12 rounded-lg border border-zinc-200 bg-gradient-to-r from-violet-50 to-blue-50 p-6 dark:border-zinc-800 dark:from-violet-950/50 dark:to-blue-950/50">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 text-white">
              <Mail className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold">Hulp nodig?</h3>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                Heb je vragen over de instellingen of loop je ergens tegenaan?
              </p>
              <Button variant="outline" size="sm" className="mt-3" asChild>
                <a href="mailto:support@leadflow.nl">
                  Contact Support
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
