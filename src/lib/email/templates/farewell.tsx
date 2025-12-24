import * as React from "react";

interface FarewellEmailProps {
  contactName: string;
  companyName: string;
  orgName: string;
  message?: string;
}

export function FarewellEmail({
  contactName,
  companyName,
  orgName,
  message,
}: FarewellEmailProps) {
  return (
    <div style={container}>
      <div style={content}>
        {/* Header */}
        <div style={headerBanner}>
          <span style={headerIcon}>👋</span>
          <span style={headerTitle}>BEDANKT VOOR UW INTERESSE</span>
        </div>

        <div style={mainContent}>
          <h1 style={heading}>Bedankt voor uw tijd</h1>

          <p style={text}>
            Beste <strong>{contactName}</strong>,
          </p>

          <p style={text}>
            Bedankt dat u heeft overwogen om met {companyName} samen te werken.
            Hoewel we op dit moment geen match lijken te hebben gevonden,
            waarderen we oprecht de tijd die u heeft genomen.
          </p>

          {message && (
            <div style={messageBox}>
              <p style={messageText}>{message}</p>
            </div>
          )}

          <div style={bulletPoints}>
            <p style={bulletTitle}>Mocht u in de toekomst:</p>
            <ul style={bulletList}>
              <li>Van gedachten veranderen</li>
              <li>Vragen hebben over onze diensten</li>
              <li>Ons willen aanbevelen aan anderen</li>
            </ul>
            <p style={text}>
              Dan staan we altijd voor u klaar!
            </p>
          </div>

          <div style={closingBox}>
            <p style={closingText}>
              Wij wensen u veel succes en hopen u in de toekomst wellicht alsnog
              van dienst te kunnen zijn.
            </p>
          </div>

          <p style={signature}>
            Met vriendelijke groet,
            <br />
            <strong>Het {companyName} team</strong>
          </p>

          <hr style={divider} />

          <p style={footer}>
            {orgName} - Dit bericht is automatisch verzonden via LeadFlow
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
  background: "linear-gradient(135deg, #6b7280 0%, #4b5563 100%)",
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

const heading: React.CSSProperties = {
  fontSize: "22px",
  fontWeight: "bold",
  color: "#18181b",
  marginBottom: "24px",
  textAlign: "center",
};

const text: React.CSSProperties = {
  fontSize: "15px",
  lineHeight: "24px",
  color: "#3f3f46",
  marginBottom: "16px",
};

const messageBox: React.CSSProperties = {
  backgroundColor: "#f8fafc",
  border: "1px solid #e4e4e7",
  borderRadius: "8px",
  padding: "16px",
  marginBottom: "20px",
};

const messageText: React.CSSProperties = {
  fontSize: "14px",
  color: "#52525b",
  fontStyle: "italic",
  margin: 0,
};

const bulletPoints: React.CSSProperties = {
  marginBottom: "24px",
};

const bulletTitle: React.CSSProperties = {
  fontSize: "15px",
  fontWeight: "600",
  color: "#18181b",
  marginBottom: "8px",
};

const bulletList: React.CSSProperties = {
  margin: "0 0 16px",
  paddingLeft: "24px",
  fontSize: "15px",
  color: "#3f3f46",
  lineHeight: "28px",
};

const closingBox: React.CSSProperties = {
  backgroundColor: "#f0f9ff",
  border: "1px solid #bae6fd",
  borderRadius: "8px",
  padding: "16px",
  marginBottom: "24px",
};

const closingText: React.CSSProperties = {
  fontSize: "14px",
  color: "#0369a1",
  margin: 0,
  textAlign: "center",
};

const signature: React.CSSProperties = {
  fontSize: "15px",
  lineHeight: "24px",
  color: "#3f3f46",
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

export default FarewellEmail;
