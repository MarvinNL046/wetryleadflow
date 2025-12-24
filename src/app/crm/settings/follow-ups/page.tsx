import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, Phone, Mail, Calendar, AlertCircle } from "lucide-react";
import { getCrmSettings } from "@/lib/actions/crm-settings";
import { FollowUpSettingsForm } from "@/components/crm/follow-up-settings-form";

export default async function FollowUpSettingsPage() {
  const settings = await getCrmSettings();

  const isConfigured =
    settings.autoFollowUpEnabled &&
    settings.followUpDays > 0 &&
    settings.maxCallAttempts > 0;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Header */}
      <div className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto max-w-4xl px-8 py-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild className="rounded-lg">
              <Link href="/crm/settings">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Follow-Up Instellingen</h1>
              <p className="mt-1 text-zinc-500">
                Configureer automatische lead follow-ups en terugbelperiodes
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl p-8">
        {/* Status Banner */}
        {!isConfigured && (
          <div className="mb-8 flex items-start gap-4 rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/50 dark:bg-amber-950/30">
            <AlertCircle className="h-5 w-5 flex-shrink-0 text-amber-600 dark:text-amber-400" />
            <div>
              <h3 className="font-medium text-amber-800 dark:text-amber-200">
                Follow-ups nog niet geconfigureerd
              </h3>
              <p className="mt-1 text-sm text-amber-700 dark:text-amber-300">
                Stel hieronder de instellingen in om automatische follow-ups te activeren.
                Nieuwe leads worden pas automatisch verwerkt nadat je de instellingen hebt opgeslagen.
              </p>
            </div>
          </div>
        )}

        {/* How It Works */}
        <div className="mb-8 rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="mb-4 text-lg font-semibold">Hoe werkt het?</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col items-center text-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50">
                <Phone className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-medium">1. Bellen</h3>
              <p className="mt-1 text-sm text-zinc-500">
                Lead belt niet op → &quot;1x Gebeld&quot; stage
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/50">
                <Clock className="h-6 w-6 text-amber-600 dark:text-amber-400" />
              </div>
              <h3 className="font-medium">2. Wachten</h3>
              <p className="mt-1 text-sm text-zinc-500">
                Na X dagen automatisch terug naar &quot;Lead&quot;
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/50">
                <Mail className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="font-medium">3. Maximum</h3>
              <p className="mt-1 text-sm text-zinc-500">
                Na X pogingen → email (optioneel) + &quot;Lost&quot;
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/50">
                <Calendar className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-medium">4. Terugbellen</h3>
              <p className="mt-1 text-sm text-zinc-500">
                &quot;Later terugbellen&quot; → Wachtrij → na periode terug
              </p>
            </div>
          </div>
        </div>

        {/* Settings Form */}
        <FollowUpSettingsForm settings={settings} />
      </div>
    </div>
  );
}
