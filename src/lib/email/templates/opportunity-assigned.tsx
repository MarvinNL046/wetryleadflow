import * as React from "react";

interface OpportunityAssignedEmailProps {
  assigneeName: string;
  assignerName: string;
  opportunityTitle: string;
  opportunityValue?: string;
  stageName: string;
  contactName?: string;
  opportunityUrl: string;
  orgName: string;
}

export function OpportunityAssignedEmail({
  assigneeName,
  assignerName,
  opportunityTitle,
  opportunityValue,
  stageName,
  contactName,
  opportunityUrl,
  orgName,
}: OpportunityAssignedEmailProps) {
  return (
    <div style={container}>
      <div style={content}>
        <h1 style={heading}>New Opportunity Assigned to You</h1>

        <p style={text}>
          Hi {assigneeName}, <strong>{assignerName}</strong> has assigned an opportunity to you.
        </p>

        <div style={opportunityCard}>
          <h2 style={opportunityTitleStyle}>{opportunityTitle}</h2>
          {opportunityValue && (
            <p style={opportunityMeta}>
              <strong>Value:</strong> {opportunityValue}
            </p>
          )}
          <p style={opportunityMeta}>
            <strong>Stage:</strong> {stageName}
          </p>
          {contactName && (
            <p style={opportunityMeta}>
              <strong>Contact:</strong> {contactName}
            </p>
          )}
        </div>

        <div style={buttonContainer}>
          <a href={opportunityUrl} style={button}>
            View Opportunity
          </a>
        </div>

        <hr style={divider} />

        <p style={footer}>
          {orgName} - Powered by LeadFlow
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

const opportunityCard: React.CSSProperties = {
  backgroundColor: "#fafafa",
  border: "1px solid #e4e4e7",
  borderRadius: "8px",
  padding: "20px",
  marginBottom: "24px",
};

const opportunityTitleStyle: React.CSSProperties = {
  fontSize: "18px",
  fontWeight: "600",
  color: "#18181b",
  marginBottom: "12px",
  marginTop: "0",
};

const opportunityMeta: React.CSSProperties = {
  fontSize: "14px",
  color: "#52525b",
  margin: "4px 0",
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

export default OpportunityAssignedEmail;
