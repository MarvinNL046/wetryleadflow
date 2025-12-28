import * as React from "react";
import type { EmailBranding } from "@/lib/branding/get-branding";
import { DEFAULT_EMAIL_BRANDING, getPoweredByText } from "../branded-styles";

interface NewLeadEmailProps {
  recipientName: string;
  leadName: string;
  leadEmail?: string;
  leadPhone?: string;
  leadSource: string;
  campaignName?: string;
  formName?: string;
  customFields?: Array<{
    label: string;
    value: string;
  }>;
  leadUrl: string;
  workspaceName: string;
  // Agency branding support
  branding?: EmailBranding;
}

const sourceLabels: Record<string, string> = {
  meta: "Meta Ads",
  manual: "Handmatig",
  api: "API",
  import: "Import",
  website: "Website",
};

const sourceColors: Record<string, { bg: string; text: string }> = {
  meta: { bg: "#dbeafe", text: "#1d4ed8" },
  manual: { bg: "#dcfce7", text: "#15803d" },
  api: { bg: "#f3e8ff", text: "#7c3aed" },
  import: { bg: "#fef3c7", text: "#b45309" },
  website: { bg: "#e0e7ff", text: "#4338ca" },
};

// Helper function to convert hex to rgba
function hexToRgba(hex: string, alpha: number): string {
  const cleanHex = hex.replace("#", "");
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function NewLeadEmail({
  recipientName,
  leadName,
  leadEmail,
  leadPhone,
  leadSource,
  campaignName,
  formName,
  customFields,
  leadUrl,
  workspaceName,
  branding = DEFAULT_EMAIL_BRANDING,
}: NewLeadEmailProps) {
  const sourceLabel = sourceLabels[leadSource] || leadSource;
  const sourceColor = sourceColors[leadSource] || { bg: "#f4f4f5", text: "#52525b" };

  // Dynamic colors based on branding
  const primaryColor = branding.primaryColor || DEFAULT_EMAIL_BRANDING.primaryColor;
  const secondaryColor = branding.secondaryColor || DEFAULT_EMAIL_BRANDING.secondaryColor;

  return (
    <div style={container}>
      <div style={content}>
        {/* Header - New Lead banner (always green for success/celebration) */}
        <div style={headerBanner}>
          <span style={newBadge}>NIEUWE LEAD</span>
        </div>

        <div style={mainContent}>
          {/* Logo/Branding */}
          <div style={logoSection}>
            {branding.logoUrl ? (
              <img src={branding.logoUrl} alt={branding.appName} style={logoImage} />
            ) : (
              <span style={{ ...logoText, color: primaryColor }}>{branding.appName}</span>
            )}
          </div>

          <h1 style={heading}>
            🎉 Nieuwe lead binnengekomen!
          </h1>

          <p style={text}>
            Hoi <strong>{recipientName}</strong>,
          </p>

          <p style={text}>
            Er is zojuist een nieuwe lead binnengekomen voor <strong>{workspaceName}</strong>.
          </p>

          {/* Lead Card */}
          <div style={leadCard}>
            <div style={leadHeader}>
              <div style={{
                ...leadAvatar,
                background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
              }}>
                {leadName.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 style={leadName_style}>{leadName}</h2>
                <span style={{
                  ...sourceBadge,
                  backgroundColor: sourceColor.bg,
                  color: sourceColor.text,
                }}>
                  {sourceLabel}
                </span>
              </div>
            </div>

            <div style={leadDetails}>
              {leadEmail && (
                <div style={detailRow}>
                  <span style={detailLabel}>Email</span>
                  <a href={`mailto:${leadEmail}`} style={{ ...detailValue, color: primaryColor }}>
                    {leadEmail}
                  </a>
                </div>
              )}
              {leadPhone && (
                <div style={detailRow}>
                  <span style={detailLabel}>Telefoon</span>
                  <a href={`tel:${leadPhone}`} style={{ ...detailValue, color: primaryColor }}>
                    {leadPhone}
                  </a>
                </div>
              )}
              {campaignName && (
                <div style={detailRow}>
                  <span style={detailLabel}>Campagne</span>
                  <span style={detailValueText}>{campaignName}</span>
                </div>
              )}
              {formName && (
                <div style={detailRow}>
                  <span style={detailLabel}>Formulier</span>
                  <span style={detailValueText}>{formName}</span>
                </div>
              )}
            </div>

            {/* Custom Fields */}
            {customFields && customFields.length > 0 && (
              <div style={customFieldsSection}>
                <p style={customFieldsLabel}>Extra informatie</p>
                {customFields.map((field, index) => (
                  <div key={index} style={detailRow}>
                    <span style={detailLabel}>{field.label}</span>
                    <span style={detailValueText}>{field.value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* CTA */}
          <div style={buttonContainer}>
            <a href={leadUrl} style={{
              ...button,
              background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
              boxShadow: `0 4px 14px ${hexToRgba(primaryColor, 0.4)}`,
            }}>
              Bekijk Lead in CRM
            </a>
          </div>

          <p style={tipText}>
            💡 <strong>Tip:</strong> Neem binnen 5 minuten contact op voor de beste conversiekans!
          </p>

          <hr style={divider} />

          <p style={footer}>
            {getPoweredByText(branding)}
          </p>
        </div>
      </div>
    </div>
  );
}

// Inline styles
const container: React.CSSProperties = {
  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  backgroundColor: "#f4f4f5",
  padding: "40px 20px",
};

const content: React.CSSProperties = {
  backgroundColor: "#ffffff",
  borderRadius: "12px",
  maxWidth: "600px",
  margin: "0 auto",
  overflow: "hidden",
};

const headerBanner: React.CSSProperties = {
  background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
  padding: "16px",
  textAlign: "center",
};

const newBadge: React.CSSProperties = {
  color: "#ffffff",
  fontSize: "12px",
  fontWeight: "700",
  letterSpacing: "2px",
};

const mainContent: React.CSSProperties = {
  padding: "32px 40px 40px",
};

const logoSection: React.CSSProperties = {
  textAlign: "center",
  marginBottom: "24px",
};

const logoImage: React.CSSProperties = {
  maxWidth: "150px",
  maxHeight: "50px",
  objectFit: "contain",
};

const logoText: React.CSSProperties = {
  fontSize: "24px",
  fontWeight: "bold",
};

const heading: React.CSSProperties = {
  fontSize: "24px",
  fontWeight: "bold",
  color: "#18181b",
  marginBottom: "24px",
  textAlign: "center",
};

const text: React.CSSProperties = {
  fontSize: "15px",
  lineHeight: "24px",
  color: "#3f3f46",
  marginBottom: "16px",
};

const leadCard: React.CSSProperties = {
  border: "1px solid #e4e4e7",
  borderRadius: "12px",
  overflow: "hidden",
  marginTop: "24px",
  marginBottom: "24px",
};

const leadHeader: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
  padding: "20px",
  backgroundColor: "#f8fafc",
  borderBottom: "1px solid #e4e4e7",
};

const leadAvatar: React.CSSProperties = {
  width: "48px",
  height: "48px",
  borderRadius: "50%",
  color: "#ffffff",
  fontSize: "20px",
  fontWeight: "600",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const leadName_style: React.CSSProperties = {
  fontSize: "18px",
  fontWeight: "600",
  color: "#18181b",
  margin: "0 0 6px",
};

const sourceBadge: React.CSSProperties = {
  display: "inline-block",
  fontSize: "11px",
  fontWeight: "600",
  padding: "3px 10px",
  borderRadius: "9999px",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
};

const leadDetails: React.CSSProperties = {
  padding: "16px 20px",
};

const detailRow: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "8px 0",
  borderBottom: "1px solid #f4f4f5",
};

const detailLabel: React.CSSProperties = {
  fontSize: "13px",
  color: "#71717a",
};

const detailValue: React.CSSProperties = {
  fontSize: "14px",
  fontWeight: "500",
  textDecoration: "none",
};

const detailValueText: React.CSSProperties = {
  fontSize: "14px",
  fontWeight: "500",
  color: "#18181b",
};

const customFieldsSection: React.CSSProperties = {
  padding: "16px 20px",
  backgroundColor: "#fafafa",
  borderTop: "1px solid #e4e4e7",
};

const customFieldsLabel: React.CSSProperties = {
  fontSize: "11px",
  fontWeight: "600",
  color: "#71717a",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
  marginBottom: "12px",
};

const buttonContainer: React.CSSProperties = {
  textAlign: "center",
  marginBottom: "24px",
};

const button: React.CSSProperties = {
  color: "#ffffff",
  padding: "14px 32px",
  borderRadius: "8px",
  textDecoration: "none",
  fontWeight: "600",
  fontSize: "15px",
  display: "inline-block",
};

const tipText: React.CSSProperties = {
  fontSize: "13px",
  color: "#52525b",
  backgroundColor: "#fef3c7",
  padding: "12px 16px",
  borderRadius: "8px",
  textAlign: "center",
};

const divider: React.CSSProperties = {
  border: "none",
  borderTop: "1px solid #e4e4e7",
  margin: "32px 0 16px",
};

const footer: React.CSSProperties = {
  fontSize: "12px",
  color: "#a1a1aa",
  textAlign: "center",
};

export default NewLeadEmail;
