import * as React from "react";

interface AutomationStatusEmailProps {
  recipientName: string;
  automationName: string;
  status: "executed" | "failed";
  eventType: string;
  entityType: string;
  entityName: string;
  errorMessage?: string;
  executedAt: string;
  orgName: string;
  dashboardUrl: string;
}

export function AutomationStatusEmail({
  recipientName,
  automationName,
  status,
  eventType,
  entityType,
  entityName,
  errorMessage,
  executedAt,
  orgName,
  dashboardUrl,
}: AutomationStatusEmailProps) {
  const isSuccess = status === "executed";

  return (
    <div style={container}>
      <div style={content}>
        <div style={isSuccess ? successBanner : errorBanner}>
          {isSuccess ? "Automation Executed" : "Automation Failed"}
        </div>

        <h1 style={heading}>
          {isSuccess
            ? `${automationName} completed successfully`
            : `${automationName} failed to execute`}
        </h1>

        <p style={text}>Hi {recipientName},</p>

        <p style={text}>
          {isSuccess
            ? "An automation was triggered and completed successfully."
            : "An automation was triggered but failed to complete. Please review the details below."}
        </p>

        <div style={detailsCard}>
          <h3 style={detailsHeading}>Details</h3>
          <table style={detailsTable}>
            <tbody>
              <tr>
                <td style={detailsLabel}>Automation</td>
                <td style={detailsValue}>{automationName}</td>
              </tr>
              <tr>
                <td style={detailsLabel}>Trigger</td>
                <td style={detailsValue}>{eventType}</td>
              </tr>
              <tr>
                <td style={detailsLabel}>{entityType}</td>
                <td style={detailsValue}>{entityName}</td>
              </tr>
              <tr>
                <td style={detailsLabel}>Executed At</td>
                <td style={detailsValue}>{executedAt}</td>
              </tr>
              {errorMessage && (
                <tr>
                  <td style={detailsLabel}>Error</td>
                  <td style={{ ...detailsValue, color: "#dc2626" }}>
                    {errorMessage}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {!isSuccess && (
          <p style={text}>
            The system will automatically retry this automation. If the problem
            persists, please check your automation settings.
          </p>
        )}

        <div style={buttonContainer}>
          <a href={dashboardUrl} style={button}>
            View Dashboard
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
  padding: "0",
  maxWidth: "600px",
  margin: "0 auto",
  overflow: "hidden",
};

const successBanner: React.CSSProperties = {
  backgroundColor: "#22c55e",
  color: "#ffffff",
  padding: "12px 20px",
  fontSize: "14px",
  fontWeight: "500",
  textAlign: "center",
};

const errorBanner: React.CSSProperties = {
  backgroundColor: "#ef4444",
  color: "#ffffff",
  padding: "12px 20px",
  fontSize: "14px",
  fontWeight: "500",
  textAlign: "center",
};

const heading: React.CSSProperties = {
  fontSize: "20px",
  fontWeight: "bold",
  color: "#18181b",
  margin: "24px 40px 16px",
};

const text: React.CSSProperties = {
  fontSize: "16px",
  lineHeight: "24px",
  color: "#3f3f46",
  margin: "0 40px 16px",
};

const detailsCard: React.CSSProperties = {
  backgroundColor: "#fafafa",
  border: "1px solid #e4e4e7",
  borderRadius: "8px",
  margin: "24px 40px",
  padding: "20px",
};

const detailsHeading: React.CSSProperties = {
  fontSize: "14px",
  fontWeight: "600",
  color: "#18181b",
  marginTop: "0",
  marginBottom: "16px",
};

const detailsTable: React.CSSProperties = {
  width: "100%",
  borderCollapse: "collapse",
};

const detailsLabel: React.CSSProperties = {
  fontSize: "14px",
  color: "#71717a",
  padding: "4px 0",
  verticalAlign: "top",
  width: "120px",
};

const detailsValue: React.CSSProperties = {
  fontSize: "14px",
  color: "#18181b",
  padding: "4px 0",
  verticalAlign: "top",
};

const buttonContainer: React.CSSProperties = {
  textAlign: "center",
  margin: "32px 40px",
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
  margin: "0 40px",
};

const footer: React.CSSProperties = {
  fontSize: "12px",
  color: "#a1a1aa",
  textAlign: "center",
  padding: "24px 40px",
};

export default AutomationStatusEmail;
