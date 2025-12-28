import * as React from "react";

interface OutsideAreaEmailProps {
  contactName: string;
  companyName: string;
  orgName: string;
  customMessage?: string;
}

export function OutsideAreaEmail({
  contactName,
  companyName,
  orgName,
  customMessage,
}: OutsideAreaEmailProps) {
  // Split custom message into paragraphs
  const messageParagraphs = customMessage
    ? customMessage.split("\n\n").filter(Boolean)
    : [];

  return (
    <div style={container}>
      <div style={content}>
        {/* Header */}
        <div style={headerBanner}>
          <span style={headerIcon}>📍</span>
          <span style={headerTitle}>BERICHT OVER UW AANVRAAG</span>
        </div>

        <div style={mainContent}>
          {customMessage ? (
            // Render custom message
            <>
              {messageParagraphs.map((paragraph, index) => (
                <p key={index} style={text}>
                  {paragraph.split("\n").map((line, lineIndex) => (
                    <React.Fragment key={lineIndex}>
                      {line}
                      {lineIndex < paragraph.split("\n").length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </p>
              ))}
            </>
          ) : (
            // Fallback default content
            <>
              <p style={text}>
                Beste <strong>{contactName}</strong>,
              </p>
              <p style={text}>
                Bedankt voor uw interesse in {companyName}! Helaas valt uw locatie
                buiten ons huidige werkgebied.
              </p>
              <p style={text}>
                Met vriendelijke groet,
                <br />
                Het {companyName} team
              </p>
            </>
          )}

          <hr style={divider} />

          <p style={footer}>
            {orgName} - Dit bericht is verzonden via LeadFlow
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
  background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
  padding: "20px",
  textAlign: "center",
};

const headerIcon: React.CSSProperties = {
  fontSize: "24px",
  display: "block",
  marginBottom: "4px",
};

const headerTitle: React.CSSProperties = {
  color: "#ffffff",
  fontSize: "12px",
  fontWeight: "700",
  letterSpacing: "2px",
};

const mainContent: React.CSSProperties = {
  padding: "32px 40px 40px",
};

const text: React.CSSProperties = {
  fontSize: "15px",
  lineHeight: "24px",
  color: "#3f3f46",
  marginBottom: "16px",
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

export default OutsideAreaEmail;
