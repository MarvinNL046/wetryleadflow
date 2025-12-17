import * as React from "react";

interface InviteEmailProps {
  inviterName: string;
  inviterEmail: string;
  orgName: string;
  inviteUrl: string;
  role: string;
}

export function InviteEmail({
  inviterName,
  inviterEmail,
  orgName,
  inviteUrl,
  role,
}: InviteEmailProps) {
  return (
    <div style={container}>
      <div style={content}>
        <h1 style={heading}>You&apos;re invited to join {orgName}</h1>

        <p style={text}>
          <strong>{inviterName}</strong> ({inviterEmail}) has invited you to join{" "}
          <strong>{orgName}</strong> on LeadFlow as a <strong>{role}</strong>.
        </p>

        <p style={text}>
          LeadFlow is a powerful CRM and lead generation platform that helps teams
          manage their sales pipeline and automate their workflows.
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
          LeadFlow - Lead Generation & CRM Platform
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

const buttonContainer: React.CSSProperties = {
  textAlign: "center",
  margin: "32px 0",
};

const button: React.CSSProperties = {
  backgroundColor: "#18181b",
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

export default InviteEmail;
