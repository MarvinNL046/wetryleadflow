import * as React from "react";

interface AgencyInviteEmailProps {
  inviterName: string;
  agencyName: string;
  inviteUrl: string;
  role: string;
}

export function AgencyInviteEmail({
  inviterName,
  agencyName,
  inviteUrl,
  role,
}: AgencyInviteEmailProps) {
  const roleLabel = role === "admin" ? "Admin" : "Team Member";

  return (
    <div style={container}>
      <div style={content}>
        {/* Header with agency branding */}
        <div style={header}>
          <div style={logoContainer}>
            <span style={logoText}>Agency Portal</span>
          </div>
        </div>

        <h1 style={heading}>You&apos;re invited to join {agencyName}</h1>

        <p style={text}>
          <strong>{inviterName}</strong> has invited you to join{" "}
          <strong>{agencyName}</strong> on LeadFlow Agency Portal as a{" "}
          <strong>{roleLabel}</strong>.
        </p>

        <div style={roleBox}>
          <p style={roleTitle}>Your Role: {roleLabel}</p>
          <p style={roleDescription}>
            {role === "admin" ? (
              <>As an Admin, you can manage client organizations and team members.</>
            ) : (
              <>As a Team Member, you can view agency data and access client portals.</>
            )}
          </p>
        </div>

        <p style={text}>
          LeadFlow Agency Portal allows agencies to manage multiple client organizations
          with their own branded CRM experience.
        </p>

        <div style={buttonContainer}>
          <a href={inviteUrl} style={button}>
            Accept Invitation
          </a>
        </div>

        <p style={footerText}>
          This invitation will expire in 7 days. If you didn&apos;t expect this
          invitation, you can safely ignore this email.
        </p>

        <hr style={divider} />

        <p style={footer}>
          LeadFlow - Agency Portal
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
  borderRadius: "8px",
  padding: "40px",
  maxWidth: "600px",
  margin: "0 auto",
};

const header: React.CSSProperties = {
  marginBottom: "24px",
  textAlign: "center",
};

const logoContainer: React.CSSProperties = {
  display: "inline-block",
  padding: "8px 16px",
  backgroundColor: "#8b5cf6",
  borderRadius: "8px",
};

const logoText: React.CSSProperties = {
  color: "#ffffff",
  fontSize: "14px",
  fontWeight: "600",
};

const heading: React.CSSProperties = {
  fontSize: "24px",
  fontWeight: "bold",
  color: "#18181b",
  marginBottom: "24px",
};

const text: React.CSSProperties = {
  fontSize: "16px",
  lineHeight: "24px",
  color: "#3f3f46",
  marginBottom: "16px",
};

const roleBox: React.CSSProperties = {
  backgroundColor: "#f4f4f5",
  borderRadius: "8px",
  padding: "16px",
  marginBottom: "24px",
  borderLeft: "4px solid #8b5cf6",
};

const roleTitle: React.CSSProperties = {
  fontSize: "14px",
  fontWeight: "600",
  color: "#8b5cf6",
  marginBottom: "8px",
  marginTop: "0",
};

const roleDescription: React.CSSProperties = {
  fontSize: "14px",
  color: "#52525b",
  margin: "0",
};

const buttonContainer: React.CSSProperties = {
  textAlign: "center",
  margin: "32px 0",
};

const button: React.CSSProperties = {
  backgroundColor: "#8b5cf6",
  color: "#ffffff",
  padding: "12px 32px",
  borderRadius: "6px",
  textDecoration: "none",
  fontWeight: "500",
  fontSize: "16px",
  display: "inline-block",
};

const footerText: React.CSSProperties = {
  fontSize: "14px",
  color: "#71717a",
  marginTop: "24px",
};

const divider: React.CSSProperties = {
  border: "none",
  borderTop: "1px solid #e4e4e7",
  margin: "32px 0",
};

const footer: React.CSSProperties = {
  fontSize: "12px",
  color: "#a1a1aa",
  textAlign: "center",
};

export default AgencyInviteEmail;
