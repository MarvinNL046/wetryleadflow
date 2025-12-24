import * as React from "react";

interface SupportTicketReplyEmailProps {
  ticketId: number;
  ticketSubject: string;
  userName: string;
  adminName: string;
  replyMessage: string;
  originalMessage?: string;
}

export function SupportTicketReplyEmail({
  ticketId,
  ticketSubject,
  userName,
  adminName,
  replyMessage,
  originalMessage,
}: SupportTicketReplyEmailProps) {
  return (
    <div style={container}>
      <div style={content}>
        <div style={header}>
          <span style={badge}>Support Update</span>
        </div>

        <h1 style={heading}>Reactie op je ticket</h1>
        <p style={subheading}>Ticket #{ticketId}: {ticketSubject}</p>

        <p style={greeting}>Hoi {userName},</p>
        <p style={intro}>
          Je hebt een reactie ontvangen op je support ticket van ons team.
        </p>

        <div style={replyBox}>
          <div style={replyHeader}>
            <span style={adminBadge}>LeadFlow Support</span>
            <span style={adminNameStyle}>{adminName}</span>
          </div>
          <p style={replyText}>{replyMessage}</p>
        </div>

        {originalMessage && (
          <div style={originalBox}>
            <h3 style={originalHeading}>Jouw oorspronkelijke bericht:</h3>
            <p style={originalText}>{originalMessage}</p>
          </div>
        )}

        <p style={callToAction}>
          Als je nog vragen hebt, kun je direct reageren op deze email of een nieuw
          support ticket aanmaken via de app.
        </p>

        <hr style={divider} />

        <p style={footer}>
          Dit is een automatisch bericht van LeadFlow Support.<br />
          Je ontvangt deze email omdat je een support ticket hebt ingediend.
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
  marginBottom: "16px",
};

const badge: React.CSSProperties = {
  display: "inline-block",
  padding: "4px 12px",
  borderRadius: "9999px",
  backgroundColor: "#7c3aed",
  color: "#ffffff",
  fontSize: "12px",
  fontWeight: "600",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
};

const heading: React.CSSProperties = {
  fontSize: "24px",
  fontWeight: "bold",
  color: "#18181b",
  marginBottom: "8px",
};

const subheading: React.CSSProperties = {
  fontSize: "14px",
  color: "#71717a",
  marginBottom: "24px",
};

const greeting: React.CSSProperties = {
  fontSize: "16px",
  color: "#18181b",
  marginBottom: "8px",
};

const intro: React.CSSProperties = {
  fontSize: "16px",
  color: "#52525b",
  marginBottom: "24px",
  lineHeight: "24px",
};

const replyBox: React.CSSProperties = {
  backgroundColor: "#faf5ff",
  border: "1px solid #e9d5ff",
  borderRadius: "8px",
  padding: "20px",
  marginBottom: "24px",
};

const replyHeader: React.CSSProperties = {
  marginBottom: "12px",
  display: "flex",
  alignItems: "center",
  gap: "8px",
};

const adminBadge: React.CSSProperties = {
  display: "inline-block",
  padding: "2px 8px",
  borderRadius: "4px",
  backgroundColor: "#7c3aed",
  color: "#ffffff",
  fontSize: "10px",
  fontWeight: "600",
  textTransform: "uppercase",
};

const adminNameStyle: React.CSSProperties = {
  fontSize: "14px",
  fontWeight: "600",
  color: "#6b21a8",
};

const replyText: React.CSSProperties = {
  fontSize: "16px",
  lineHeight: "24px",
  color: "#18181b",
  whiteSpace: "pre-wrap",
};

const originalBox: React.CSSProperties = {
  backgroundColor: "#f4f4f5",
  borderRadius: "6px",
  padding: "16px",
  marginBottom: "24px",
};

const originalHeading: React.CSSProperties = {
  fontSize: "12px",
  fontWeight: "600",
  color: "#71717a",
  marginBottom: "8px",
  textTransform: "uppercase",
};

const originalText: React.CSSProperties = {
  fontSize: "14px",
  lineHeight: "20px",
  color: "#52525b",
  whiteSpace: "pre-wrap",
};

const callToAction: React.CSSProperties = {
  fontSize: "14px",
  color: "#52525b",
  lineHeight: "22px",
  marginBottom: "24px",
};

const divider: React.CSSProperties = {
  border: "none",
  borderTop: "1px solid #e4e4e7",
  margin: "24px 0",
};

const footer: React.CSSProperties = {
  fontSize: "12px",
  color: "#a1a1aa",
  textAlign: "center",
  lineHeight: "18px",
};

export default SupportTicketReplyEmail;
