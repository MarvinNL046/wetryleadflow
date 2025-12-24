import * as React from "react";

interface FeedbackEmailProps {
  userName: string;
  userEmail: string;
  feedbackType: "bug" | "feature" | "improvement" | "other";
  message: string;
  currentPage?: string;
  workspaceName?: string;
}

const feedbackTypeLabels: Record<string, string> = {
  bug: "Bug Report",
  feature: "Feature Request",
  improvement: "Improvement Suggestion",
  other: "General Feedback",
};

const feedbackTypeColors: Record<string, string> = {
  bug: "#ef4444",
  feature: "#8b5cf6",
  improvement: "#3b82f6",
  other: "#71717a",
};

export function FeedbackEmail({
  userName,
  userEmail,
  feedbackType,
  message,
  currentPage,
  workspaceName,
}: FeedbackEmailProps) {
  return (
    <div style={container}>
      <div style={content}>
        <div style={header}>
          <span style={{ ...badge, backgroundColor: feedbackTypeColors[feedbackType] }}>
            {feedbackTypeLabels[feedbackType]}
          </span>
        </div>

        <h1 style={heading}>New Feedback Received</h1>

        <div style={infoBox}>
          <p style={infoRow}>
            <strong>From:</strong> {userName} ({userEmail})
          </p>
          {workspaceName && (
            <p style={infoRow}>
              <strong>Workspace:</strong> {workspaceName}
            </p>
          )}
          {currentPage && (
            <p style={infoRow}>
              <strong>Page:</strong> {currentPage}
            </p>
          )}
        </div>

        <div style={messageBox}>
          <h2 style={messageHeading}>Message</h2>
          <p style={messageText}>{message}</p>
        </div>

        <hr style={divider} />

        <p style={footer}>
          LeadFlow Feedback System - {new Date().toLocaleDateString("nl-NL", {
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

export default FeedbackEmail;
