import type { NotificationPreference } from "@/lib/db/schema";

export type NotificationEventType = NotificationPreference["eventType"];
export type NotificationModeType = NotificationPreference["mode"];

// Event labels and descriptions in Dutch
export const NOTIFICATION_EVENTS: Record<NotificationEventType, { label: string; description: string }> = {
  new_lead: {
    label: "Nieuwe lead",
    description: "Wanneer een nieuwe lead binnenkomt via een formulier of integratie",
  },
  lead_assigned: {
    label: "Lead toegewezen",
    description: "Wanneer een lead aan jou of een teamlid wordt toegewezen",
  },
  follow_up_reminder: {
    label: "Follow-up herinnering",
    description: "Herinnering voor geplande follow-up acties",
  },
  lead_lost: {
    label: "Lead verloren",
    description: "Wanneer een lead als verloren wordt gemarkeerd",
  },
  invoice_sent: {
    label: "Factuur verzonden",
    description: "Bevestiging wanneer een factuur naar de klant is gestuurd",
  },
  invoice_reminder: {
    label: "Factuur herinnering",
    description: "Automatische betalingsherinnering voor openstaande facturen",
  },
  quote_sent: {
    label: "Offerte verzonden",
    description: "Bevestiging wanneer een offerte naar de klant is gestuurd",
  },
  team_invite: {
    label: "Team uitnodiging",
    description: "Wanneer je wordt uitgenodigd voor een team of workspace",
  },
  welcome: {
    label: "Welkom e-mail",
    description: "Welkomstbericht voor nieuwe gebruikers of klanten",
  },
};

export const NOTIFICATION_MODES: Record<NotificationModeType, { label: string; description: string }> = {
  disabled: {
    label: "Uitgeschakeld",
    description: "Geen e-mail versturen voor dit event",
  },
  system_default: {
    label: "Standaard template",
    description: "Gebruik de standaard LeadFlow e-mail template",
  },
  custom_template: {
    label: "Aangepaste template",
    description: "Gebruik een zelfgemaakte e-mail template",
  },
};
