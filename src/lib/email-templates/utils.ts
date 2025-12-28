import { type EmailTemplate } from "@/lib/db/schema";

// Available variables for email templates
export const EMAIL_TEMPLATE_VARIABLES = {
  contact: [
    { key: "contact.firstName", label: "Voornaam", example: "Jan" },
    { key: "contact.lastName", label: "Achternaam", example: "Jansen" },
    { key: "contact.fullName", label: "Volledige naam", example: "Jan Jansen" },
    { key: "contact.email", label: "E-mail", example: "jan@example.nl" },
    { key: "contact.phone", label: "Telefoon", example: "06-12345678" },
    { key: "contact.company", label: "Bedrijf", example: "Jansen BV" },
  ],
  opportunity: [
    { key: "opportunity.title", label: "Titel", example: "Website redesign" },
    { key: "opportunity.value", label: "Waarde", example: "€5.000" },
    { key: "opportunity.stage", label: "Fase", example: "Offerte verstuurd" },
  ],
  workspace: [
    { key: "workspace.name", label: "Workspace naam", example: "Mijn Bedrijf" },
  ],
  user: [
    { key: "user.name", label: "Jouw naam", example: "Piet Peters" },
    { key: "user.email", label: "Jouw e-mail", example: "piet@bedrijf.nl" },
  ],
};

export type TemplateVariable = {
  key: string;
  label: string;
  example: string;
};

/**
 * Get template type label in Dutch.
 */
export function getTemplateTypeLabel(type: EmailTemplate["type"]): string {
  const labels: Record<string, string> = {
    lead_notification: "Lead notificatie",
    follow_up: "Follow-up",
    quote_sent: "Offerte verstuurd",
    invoice_sent: "Factuur verstuurd",
    payment_reminder: "Betaalherinnering",
    welcome: "Welkom",
    custom: "Aangepast",
  };
  return labels[type] || type;
}

/**
 * Replace template variables with example values for preview.
 */
export function replaceVariablesWithExamples(text: string): string {
  let result = text;

  const allVars = [
    ...EMAIL_TEMPLATE_VARIABLES.contact,
    ...EMAIL_TEMPLATE_VARIABLES.opportunity,
    ...EMAIL_TEMPLATE_VARIABLES.workspace,
    ...EMAIL_TEMPLATE_VARIABLES.user,
  ];

  for (const variable of allVars) {
    const regex = new RegExp(`{{\\s*${variable.key.replace(".", "\\.")}\\s*}}`, "g");
    result = result.replace(regex, variable.example);
  }

  return result;
}
