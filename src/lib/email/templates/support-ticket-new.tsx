import * as React from "react";

interface SupportTicketNewEmailProps {
  ticketId: number;
  subject: string;
  userName: string;
  userEmail: string;
  message: string;
  type: string;
  priority: string;
  pageUrl?: string;
  orgName?: string;
}

const typeLabels: Record<string, string> = {
  bug: "Bug Report",
  feature_request: "Feature Request",
  question: "Vraag",
  feedback: "Feedback",
  other: "Anders",
};

const typeColors: Record<string, string> = {
  bug: "#ef4444",
  feature_request: "#8b5cf6",
  question: "#3b82f6",
  feedback: "#22c55e",
  other: "#71717a",
};

const priorityColors: Record<string, string> = {
  urgent: "#dc2626",
  high: "#f97316",
  medium: "#eab308",
  low: "#71717a",
};

export function SupportTicketNewEmail({
  ticketId,
  subject,
  userName,
  userEmail,
  message,
  type,
  priority,
  pageUrl,
  orgName,
}: SupportTicketNewEmailProps) {
  const adminUrl = `${process.env.NEXT_PUBLIC_APP_URL || "https://app.wetryleadflow.com"}/admin/support/${ticketId}`;

  return (
    <div style={container}>
      <div style={content}>
        <div style={header}>
          <span style={{ ...badge, backgroundColor: typeColors[type] || "#71717a" }}>
            {typeLabels[type] || type}
          </span>
          <span style={{ ...badge, backgroundColor: priorityColors[priority] || "#71717a", marginLeft: "8px" }}>
            {priority.charAt(0).toUpperCase() + priority.slice(1)}
          </span>
        </div>

        <h1 style={heading}>Nieuw Support Ticket #{ticketId}</h1>
        <p style={subheading}>{subject}</p>

        <div style={infoBox}>
          <p style={infoRow}>
            <strong>Van:</strong> {userName} ({userEmail})
          </p>
          {orgName && (
            <p style={infoRow}>
              <strong>Organisatie:</strong> {orgName}
            </p>
          )}
          {pageUrl && (
            <p style={infoRow}>
              <strong>Pagina:</strong> {pageUrl}
            </p>
          )}
        </div>

        <div style={messageBox}>
          <h2 style={messageHeading}>Bericht</h2>
          <p style={messageText}>{message}</p>
        </div>

        <div style={buttonContainer}>
          <a href={adminUrl} style={button}>
            Bekijk in Admin Panel →
          </a>
        </div>

        <hr style={divider} />

        <p style={footer}>
          LeadFlow Support System - {new Date().toLocaleDateString("nl-NL", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
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
  fontSize: "16px",
  color: "#52525b",
  marginBottom: "24px",
};

const infoBox: React.CSSProperties = {
  backgroundColor: "#f4f4f5",
  borderRadius: "6px",
  padding: "16px",
  marginBottom: "24px",
};

const infoRow: React.CSSProperties = {
  fontSize: "14px",
  color: "#3f3f46",
  margin: "4px 0",
};

const messageBox: React.CSSProperties = {
  border: "1px solid #e4e4e7",
  borderRadius: "6px",
  padding: "20px",
  marginBottom: "24px",
};

const messageHeading: React.CSSProperties = {
  fontSize: "14px",
  fontWeight: "600",
  color: "#71717a",
  marginBottom: "12px",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
};

const messageText: React.CSSProperties = {
  fontSize: "16px",
  lineHeight: "24px",
  color: "#18181b",
  whiteSpace: "pre-wrap",
};

const buttonContainer: React.CSSProperties = {
  textAlign: "center",
  marginBottom: "24px",
};

const button: React.CSSProperties = {
  display: "inline-block",
  backgroundColor: "#7c3aed",
  color: "#ffffff",
  padding: "12px 24px",
  borderRadius: "6px",
  textDecoration: "none",
  fontWeight: "600",
  fontSize: "14px",
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

export default SupportTicketNewEmail;
