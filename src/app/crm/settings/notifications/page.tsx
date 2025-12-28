import { Metadata } from "next";
import { getNotificationPreferences } from "@/lib/actions/notification-preferences";
import { getEmailTemplates } from "@/lib/actions/email-templates";
import { NotificationSettings } from "@/components/crm/notification-settings";

export const metadata: Metadata = {
  title: "Notificatie instellingen - LeadFlow",
  description: "Configureer e-mail notificaties en templates",
};

export default async function NotificationSettingsPage() {
  const [preferences, templates] = await Promise.all([
    getNotificationPreferences(),
    getEmailTemplates(),
  ]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <NotificationSettings preferences={preferences} templates={templates} />
    </div>
  );
}
