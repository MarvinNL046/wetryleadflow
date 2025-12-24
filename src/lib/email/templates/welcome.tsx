import * as React from "react";

interface WelcomeEmailProps {
  userName: string;
  workspaceName?: string;
  loginUrl: string;
}

export function WelcomeEmail({
  userName,
  workspaceName,
  loginUrl,
}: WelcomeEmailProps) {
  return (
    <div style={container}>
      <div style={content}>
        {/* Header with gradient */}
        <div style={headerSection}>
          <div style={logoContainer}>
            <span style={logoText}>Lead</span>
            <span style={logoAccent}>Flow</span>
          </div>
        </div>

        <h1 style={heading}>Welkom bij LeadFlow! 🎉</h1>

        <p style={text}>
          Hoi <strong>{userName}</strong>,
        </p>

        <p style={text}>
          Geweldig dat je aan boord bent! Je account is succesvol aangemaakt
          {workspaceName && (
            <> voor <strong>{workspaceName}</strong></>
          )}.
        </p>

        <p style={text}>
          Met LeadFlow kun je:
        </p>

        <ul style={featureList}>
          <li style={featureItem}>
            <span style={checkmark}>✓</span>
            Leads automatisch importeren vanuit Meta Ads
          </li>
          <li style={featureItem}>
            <span style={checkmark}>✓</span>
            Je sales pipeline visueel beheren met Kanban boards
          </li>
          <li style={featureItem}>
            <span style={checkmark}>✓</span>
            Follow-ups automatiseren en nooit meer een lead missen
          </li>
          <li style={featureItem}>
            <span style={checkmark}>✓</span>
            Real-time analytics en rapportages bekijken
          </li>
        </ul>

        <div style={buttonContainer}>
          <a href={loginUrl} style={button}>
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

        <p style={text}>
          Heb je vragen? Reply direct op deze email of check onze{" "}
          <a href="https://wetryleadflow.com/resources" style={link}>
            resources pagina
          </a>.
        </p>

        <hr style={divider} />

        <p style={footer}>
          Met vriendelijke groet,
          <br />
          Het LeadFlow Team
        </p>

        <p style={footerSmall}>
          LeadFlow - Lead Generation & CRM Platform
          <br />
          <a href="https://wetryleadflow.com" style={footerLink}>wetryleadflow.com</a>
        </p>
      </div>
    </div>
  );
}

// Inline styles for email compatibility
const container: React.CSSProperties = {
  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  backgroundColor: "#f4f4f5",
  padding: "40px 20px",
};

const content: React.CSSProperties = {
  backgroundColor: "#ffffff",
  borderRadius: "12px",
  padding: "40px",
  maxWidth: "600px",
  margin: "0 auto",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
};

const headerSection: React.CSSProperties = {
  textAlign: "center",
  marginBottom: "32px",
};

const logoContainer: React.CSSProperties = {
  display: "inline-block",
  fontSize: "28px",
  fontWeight: "bold",
};

const logoText: React.CSSProperties = {
  color: "#18181b",
};

const logoAccent: React.CSSProperties = {
  background: "linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

const heading: React.CSSProperties = {
  fontSize: "28px",
  fontWeight: "bold",
  color: "#18181b",
  marginBottom: "24px",
  textAlign: "center",
};

const text: React.CSSProperties = {
  fontSize: "16px",
  lineHeight: "26px",
  color: "#3f3f46",
  marginBottom: "16px",
};

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
  color: "#22c55e",
  fontWeight: "bold",
  marginRight: "12px",
};

const buttonContainer: React.CSSProperties = {
  textAlign: "center",
  margin: "32px 0",
};

const button: React.CSSProperties = {
  background: "linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)",
  color: "#ffffff",
  padding: "14px 36px",
  borderRadius: "8px",
  textDecoration: "none",
  fontWeight: "600",
  fontSize: "16px",
  display: "inline-block",
  boxShadow: "0 4px 14px rgba(139, 92, 246, 0.4)",
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

const link: React.CSSProperties = {
  color: "#8b5cf6",
  textDecoration: "underline",
};

const divider: React.CSSProperties = {
  border: "none",
  borderTop: "1px solid #e4e4e7",
  margin: "32px 0",
};

const footer: React.CSSProperties = {
  fontSize: "15px",
  color: "#3f3f46",
  lineHeight: "24px",
};

const footerSmall: React.CSSProperties = {
  fontSize: "12px",
  color: "#a1a1aa",
  textAlign: "center",
  marginTop: "24px",
};

const footerLink: React.CSSProperties = {
  color: "#a1a1aa",
  textDecoration: "underline",
};

export default WelcomeEmail;
