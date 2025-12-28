import * as React from "react";
import type { EmailBranding } from "@/lib/branding/get-branding";
import { createBrandedStyles, DEFAULT_EMAIL_BRANDING, getPoweredByText } from "../branded-styles";

interface WelcomeEmailProps {
  userName: string;
  workspaceName?: string;
  loginUrl: string;
  // Agency branding support
  branding?: EmailBranding;
}

export function WelcomeEmail({
  userName,
  workspaceName,
  loginUrl,
  branding = DEFAULT_EMAIL_BRANDING,
}: WelcomeEmailProps) {
  // Create branded styles
  const styles = createBrandedStyles(branding);
  const primaryColor = branding.primaryColor || DEFAULT_EMAIL_BRANDING.primaryColor;

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        {/* Header */}
        <div style={styles.headerSection}>
          <div style={styles.logoContainer}>
            {branding.logoUrl ? (
              <img src={branding.logoUrl} alt={branding.appName} style={styles.logoImage} />
            ) : (
              <span style={styles.logoText}>{branding.appName}</span>
            )}
          </div>
        </div>

        <div style={styles.badge}>
          <span style={styles.badgeText}>WELKOM</span>
        </div>

        <h1 style={styles.heading}>Welkom bij {branding.appName}! 🎉</h1>

        <p style={styles.text}>
          Hoi <strong>{userName}</strong>,
        </p>

        <p style={styles.text}>
          Geweldig dat je aan boord bent! Je account is succesvol aangemaakt
          {workspaceName && (
            <> voor <strong>{workspaceName}</strong></>
          )}.
        </p>

        <p style={styles.text}>
          Met {branding.appName} kun je:
        </p>

        <ul style={featureList}>
          <li style={featureItem}>
            <span style={{ ...checkmark, color: primaryColor }}>✓</span>
            Leads automatisch importeren vanuit Meta Ads
          </li>
          <li style={featureItem}>
            <span style={{ ...checkmark, color: primaryColor }}>✓</span>
            Je sales pipeline visueel beheren met Kanban boards
          </li>
          <li style={featureItem}>
            <span style={{ ...checkmark, color: primaryColor }}>✓</span>
            Follow-ups automatiseren en nooit meer een lead missen
          </li>
          <li style={featureItem}>
            <span style={{ ...checkmark, color: primaryColor }}>✓</span>
            Real-time analytics en rapportages bekijken
          </li>
        </ul>

        <div style={styles.buttonContainer}>
          <a href={loginUrl} style={styles.button}>
            Ga naar je Dashboard
          </a>
        </div>

        <div style={tipsSection}>
          <h2 style={tipsHeading}>💡 Snelle start tips</h2>
          <ol style={tipsList}>
            <li style={tipItem}>Koppel je Meta Ads account voor automatische lead import</li>
            <li style={tipItem}>Maak je eerste pipeline aan met custom stages</li>
            <li style={tipItem}>Nodig je team uit om samen te werken</li>
          </ol>
        </div>

        <p style={styles.text}>
          Heb je vragen? Reply direct op deze email of neem contact met ons op.
        </p>

        <hr style={styles.divider} />

        <p style={styles.footer}>
          Met vriendelijke groet,
          <br />
          <strong>Het {branding.appName} Team</strong>
        </p>

        <p style={styles.footerSmall}>
          {getPoweredByText(branding)}
        </p>
      </div>
    </div>
  );
}

// Welcome-specific styles
const featureList: React.CSSProperties = {
  listStyle: "none",
  padding: 0,
  margin: "24px 0",
};

const featureItem: React.CSSProperties = {
  fontSize: "15px",
  lineHeight: "24px",
  color: "#3f3f46",
  marginBottom: "12px",
  paddingLeft: "8px",
};

const checkmark: React.CSSProperties = {
  fontWeight: "bold",
  marginRight: "12px",
};

const tipsSection: React.CSSProperties = {
  backgroundColor: "#f8fafc",
  borderRadius: "8px",
  padding: "20px 24px",
  marginTop: "32px",
  marginBottom: "24px",
};

const tipsHeading: React.CSSProperties = {
  fontSize: "16px",
  fontWeight: "600",
  color: "#18181b",
  marginBottom: "12px",
};

const tipsList: React.CSSProperties = {
  margin: 0,
  paddingLeft: "20px",
};

const tipItem: React.CSSProperties = {
  fontSize: "14px",
  lineHeight: "22px",
  color: "#52525b",
  marginBottom: "8px",
};

export default WelcomeEmail;
