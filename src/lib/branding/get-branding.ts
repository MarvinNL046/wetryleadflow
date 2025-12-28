import { db } from "@/lib/db";
import { workspaces, orgs, agencies, invoiceSettings } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

// ============================================
// LeadFlow Default Branding
// ============================================
const LEADFLOW_DEFAULTS = {
  appName: "LeadFlow",
  logoUrl: null,
  primaryColor: "#8b5cf6", // Purple - main brand color
  secondaryColor: "#3b82f6", // Blue - accent color
} as const;

// Document-specific accent colors (used when no custom branding)
export const DOCUMENT_COLORS = {
  invoice: "#7c3aed", // Purple for invoices
  quotation: "#2563eb", // Blue for quotations
  creditNote: "#dc2626", // Red for credit notes
} as const;

export type DocumentType = keyof typeof DOCUMENT_COLORS;

// ============================================
// Document Branding Interface
// ============================================
export interface DocumentBranding {
  // Brand identity
  appName: string;
  logoUrl: string | null;
  primaryColor: string;
  secondaryColor: string;

  // Company details (from invoiceSettings)
  companyName: string | null;
  companyAddress: string | null;
  companyEmail: string | null;
  companyPhone: string | null;
  companyWebsite: string | null;

  // Business info
  kvkNumber: string | null;
  vatNumber: string | null;
  iban: string | null;
  bic: string | null;

  // Templates
  defaultIntroduction: string | null;
  defaultTerms: string | null;
  defaultFooter: string | null;
}

// ============================================
// Email Branding Interface
// ============================================
export interface EmailBranding {
  appName: string;
  logoUrl: string | null;
  primaryColor: string;
  secondaryColor: string;
  // Email is always sent from LeadFlow domain (no custom domains per agency)
  fromName: string;
  fromEmail: string;
}

// ============================================
// Get Document Branding for PDFs
// ============================================
// Priority: Workspace branding → Agency branding → LeadFlow defaults
export async function getDocumentBranding(
  workspaceId: number,
  documentType: DocumentType = "invoice"
): Promise<DocumentBranding> {
  // Fetch workspace → org → agency relationship with invoice settings
  const result = await db
    .select({
      // Workspace
      workspaceId: workspaces.id,
      // Org
      orgId: orgs.id,
      agencyId: orgs.agencyId,
      // Agency branding (if exists)
      agencyLogoUrl: agencies.logoUrl,
      agencyPrimaryColor: agencies.primaryColor,
      agencySecondaryColor: agencies.secondaryColor,
      agencyAppName: agencies.appName,
      // Invoice settings (includes workspace branding)
      companyName: invoiceSettings.companyName,
      companyAddress: invoiceSettings.companyAddress,
      companyEmail: invoiceSettings.companyEmail,
      companyPhone: invoiceSettings.companyPhone,
      companyWebsite: invoiceSettings.companyWebsite,
      companyLogo: invoiceSettings.companyLogo,
      // Workspace-level branding
      brandingAppName: invoiceSettings.brandingAppName,
      brandingPrimaryColor: invoiceSettings.brandingPrimaryColor,
      brandingSecondaryColor: invoiceSettings.brandingSecondaryColor,
      // Other settings
      kvkNumber: invoiceSettings.kvkNumber,
      vatNumber: invoiceSettings.vatNumber,
      iban: invoiceSettings.iban,
      bic: invoiceSettings.bic,
      defaultIntroduction: invoiceSettings.defaultIntroduction,
      defaultTerms: invoiceSettings.defaultTerms,
      defaultFooter: invoiceSettings.defaultFooter,
    })
    .from(workspaces)
    .innerJoin(orgs, eq(workspaces.orgId, orgs.id))
    .leftJoin(agencies, eq(orgs.agencyId, agencies.id))
    .leftJoin(invoiceSettings, eq(invoiceSettings.workspaceId, workspaces.id))
    .where(eq(workspaces.id, workspaceId))
    .limit(1);

  const data = result[0];

  if (!data) {
    // Workspace not found - return defaults
    console.warn(`[Branding] Workspace ${workspaceId} not found, using defaults`);
    return {
      appName: LEADFLOW_DEFAULTS.appName,
      logoUrl: null,
      primaryColor: DOCUMENT_COLORS[documentType],
      secondaryColor: LEADFLOW_DEFAULTS.secondaryColor,
      companyName: null,
      companyAddress: null,
      companyEmail: null,
      companyPhone: null,
      companyWebsite: null,
      kvkNumber: null,
      vatNumber: null,
      iban: null,
      bic: null,
      defaultIntroduction: null,
      defaultTerms: null,
      defaultFooter: null,
    };
  }

  // Check branding sources (priority: workspace > agency > default)
  const hasWorkspaceBranding = (
    data.brandingAppName ||
    data.brandingPrimaryColor ||
    data.companyLogo
  );

  const hasAgencyBranding = data.agencyId && (
    data.agencyLogoUrl ||
    data.agencyPrimaryColor ||
    data.agencyAppName
  );

  // Logo priority: workspace logo > agency logo
  const logoUrl = data.companyLogo || data.agencyLogoUrl || null;

  // Primary color priority: workspace > agency > document-specific default
  const primaryColor =
    data.brandingPrimaryColor ||
    data.agencyPrimaryColor ||
    DOCUMENT_COLORS[documentType];

  // Secondary color priority: workspace > agency > default
  const secondaryColor =
    data.brandingSecondaryColor ||
    data.agencySecondaryColor ||
    LEADFLOW_DEFAULTS.secondaryColor;

  // App name priority: workspace > agency > LeadFlow
  const appName =
    data.brandingAppName ||
    data.agencyAppName ||
    LEADFLOW_DEFAULTS.appName;

  if (hasWorkspaceBranding) {
    console.log(`[Branding] Using workspace branding for workspace ${workspaceId}`);
  } else if (hasAgencyBranding) {
    console.log(`[Branding] Using agency branding for workspace ${workspaceId}`);
  }

  return {
    appName,
    logoUrl,
    primaryColor,
    secondaryColor,
    companyName: data.companyName,
    companyAddress: data.companyAddress,
    companyEmail: data.companyEmail,
    companyPhone: data.companyPhone,
    companyWebsite: data.companyWebsite,
    kvkNumber: data.kvkNumber,
    vatNumber: data.vatNumber,
    iban: data.iban,
    bic: data.bic,
    defaultIntroduction: data.defaultIntroduction,
    defaultTerms: data.defaultTerms,
    defaultFooter: data.defaultFooter,
  };
}

// ============================================
// Get Email Branding
// ============================================
// Priority: Workspace branding → Agency branding → LeadFlow defaults
export async function getEmailBranding(workspaceId: number): Promise<EmailBranding> {
  // Fetch workspace → org → agency relationship with invoice settings
  const result = await db
    .select({
      // Agency branding (if exists)
      agencyLogoUrl: agencies.logoUrl,
      agencyPrimaryColor: agencies.primaryColor,
      agencySecondaryColor: agencies.secondaryColor,
      agencyAppName: agencies.appName,
      // Workspace branding from invoice settings
      companyLogo: invoiceSettings.companyLogo,
      brandingAppName: invoiceSettings.brandingAppName,
      brandingPrimaryColor: invoiceSettings.brandingPrimaryColor,
      brandingSecondaryColor: invoiceSettings.brandingSecondaryColor,
    })
    .from(workspaces)
    .innerJoin(orgs, eq(workspaces.orgId, orgs.id))
    .leftJoin(agencies, eq(orgs.agencyId, agencies.id))
    .leftJoin(invoiceSettings, eq(invoiceSettings.workspaceId, workspaces.id))
    .where(eq(workspaces.id, workspaceId))
    .limit(1);

  const data = result[0];

  // Default FROM address (always LeadFlow domain - no custom domains)
  const fromEmail = process.env.EMAIL_FROM_ADDRESS || "noreply@wetryleadflow.com";

  if (!data) {
    return {
      appName: LEADFLOW_DEFAULTS.appName,
      logoUrl: null,
      primaryColor: LEADFLOW_DEFAULTS.primaryColor,
      secondaryColor: LEADFLOW_DEFAULTS.secondaryColor,
      fromName: LEADFLOW_DEFAULTS.appName,
      fromEmail,
    };
  }

  // Priority: workspace > agency > default
  const logoUrl = data.companyLogo || data.agencyLogoUrl || null;
  const primaryColor = data.brandingPrimaryColor || data.agencyPrimaryColor || LEADFLOW_DEFAULTS.primaryColor;
  const secondaryColor = data.brandingSecondaryColor || data.agencySecondaryColor || LEADFLOW_DEFAULTS.secondaryColor;
  const appName = data.brandingAppName || data.agencyAppName || LEADFLOW_DEFAULTS.appName;

  return {
    appName,
    logoUrl,
    primaryColor,
    secondaryColor,
    fromName: appName,
    fromEmail,
  };
}

// ============================================
// Utility: Format email FROM header
// ============================================
export function formatEmailFrom(branding: EmailBranding): string {
  return `${branding.fromName} <${branding.fromEmail}>`;
}
