import * as React from "react";

interface DealStatusEmailProps {
  recipientName: string;
  dealTitle: string;
  dealValue: number;
  contactName: string;
  status: "won" | "lost";
  closedByName?: string;
  closedDate: string;
  daysInPipeline: number;
  notes?: string;
  dashboardUrl: string;
  workspaceName: string;
}

export function DealStatusEmail({
  recipientName,
  dealTitle,
  dealValue,
  contactName,
  status,
  closedByName,
  closedDate,
  daysInPipeline,
  notes,
  dashboardUrl,
  workspaceName,
}: DealStatusEmailProps) {
  const isWon = status === "won";
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR" }).format(value);

  return (
    <div style={container}>
      <div style={content}>
        {/* Header Banner */}
        <div style={{
          ...headerBanner,
          background: isWon
            ? "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)"
            : "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
        }}>
          <span style={statusEmoji}>{isWon ? "🎉" : "😔"}</span>
          <span style={statusBadge}>
            DEAL {isWon ? "GEWONNEN" : "VERLOREN"}
          </span>
        </div>

        <div style={mainContent}>
          <h1 style={heading}>
            {isWon
              ? "Gefeliciteerd met de gewonnen deal!"
              : "Helaas, deze deal is verloren"}
          </h1>

          <p style={text}>
            Hoi <strong>{recipientName}</strong>,
          </p>

          <p style={text}>
            {isWon ? (
              <>
                Geweldig nieuws! De deal <strong>&quot;{dealTitle}&quot;</strong> met{" "}
                <strong>{contactName}</strong> is succesvol afgesloten.
              </>
            ) : (
              <>
                De deal <strong>&quot;{dealTitle}&quot;</strong> met{" "}
                <strong>{contactName}</strong> is helaas niet doorgegaan.
              </>
            )}
          </p>

          {/* Deal Card */}
          <div style={{
            ...dealCard,
            borderColor: isWon ? "#22c55e" : "#ef4444",
          }}>
            <div style={dealHeader}>
              <div>
                <h2 style={dealTitle_style}>{dealTitle}</h2>
                <p style={dealContact}>{contactName}</p>
              </div>
              <div style={dealValue_style}>
                {formatCurrency(dealValue)}
              </div>
            </div>

            <div style={dealStats}>
              <div style={statItem}>
                <span style={statLabel}>Status</span>
                <span style={{
                  ...statValueBadge,
                  backgroundColor: isWon ? "#dcfce7" : "#fee2e2",
                  color: isWon ? "#15803d" : "#dc2626",
                }}>
                  {isWon ? "Gewonnen" : "Verloren"}
                </span>
              </div>
              <div style={statItem}>
                <span style={statLabel}>Afgesloten op</span>
                <span style={statValue}>{closedDate}</span>
              </div>
              <div style={statItem}>
                <span style={statLabel}>Dagen in pipeline</span>
                <span style={statValue}>{daysInPipeline} dagen</span>
              </div>
              {closedByName && (
                <div style={statItem}>
                  <span style={statLabel}>Afgesloten door</span>
                  <span style={statValue}>{closedByName}</span>
                </div>
              )}
            </div>

            {notes && (
              <div style={notesSection}>
                <p style={notesLabel}>Notities</p>
                <p style={notesText}>{notes}</p>
              </div>
            )}
          </div>

          {/* Message based on status */}
          {isWon ? (
            <div style={celebrationBox}>
              <p style={celebrationText}>
                🚀 <strong>Goed gedaan!</strong> Blijf zo doorgaan.
                Deze deal draagt bij aan het succes van {workspaceName}.
              </p>
            </div>
          ) : (
            <div style={learningBox}>
              <p style={learningTitle}>💡 Leer van deze ervaring</p>
              <ul style={learningList}>
                <li>Was de timing goed?</li>
                <li>Was het aanbod passend bij de behoefte?</li>
                <li>Hoe was de communicatie?</li>
              </ul>
            </div>
          )}

          {/* CTA */}
          <div style={buttonContainer}>
            <a href={dashboardUrl} style={button}>
              Bekijk Dashboard
            </a>
          </div>

          <hr style={divider} />

          <p style={footer}>
            LeadFlow - Lead Generation & CRM Platform
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
  padding: "24px",
  textAlign: "center",
};

const statusEmoji: React.CSSProperties = {
  fontSize: "32px",
  display: "block",
  marginBottom: "8px",
};

const statusBadge: React.CSSProperties = {
  color: "#ffffff",
  fontSize: "14px",
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

const dealCard: React.CSSProperties = {
  border: "2px solid",
  borderRadius: "12px",
  overflow: "hidden",
  marginTop: "24px",
  marginBottom: "24px",
};

const dealHeader: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  padding: "20px",
  backgroundColor: "#f8fafc",
  borderBottom: "1px solid #e4e4e7",
};

const dealTitle_style: React.CSSProperties = {
  fontSize: "18px",
  fontWeight: "600",
  color: "#18181b",
  margin: "0 0 4px",
};

const dealContact: React.CSSProperties = {
  fontSize: "14px",
  color: "#71717a",
  margin: 0,
};

const dealValue_style: React.CSSProperties = {
  fontSize: "24px",
  fontWeight: "bold",
  color: "#18181b",
};

const dealStats: React.CSSProperties = {
  padding: "16px 20px",
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "16px",
};

const statItem: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "4px",
};

const statLabel: React.CSSProperties = {
  fontSize: "11px",
  fontWeight: "600",
  color: "#71717a",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
};

const statValue: React.CSSProperties = {
  fontSize: "14px",
  fontWeight: "500",
  color: "#18181b",
};

const statValueBadge: React.CSSProperties = {
  display: "inline-block",
  fontSize: "12px",
  fontWeight: "600",
  padding: "2px 8px",
  borderRadius: "4px",
  width: "fit-content",
};

const notesSection: React.CSSProperties = {
  padding: "16px 20px",
  backgroundColor: "#fafafa",
  borderTop: "1px solid #e4e4e7",
};

const notesLabel: React.CSSProperties = {
  fontSize: "11px",
  fontWeight: "600",
  color: "#71717a",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
  marginBottom: "8px",
};

const notesText: React.CSSProperties = {
  fontSize: "14px",
  color: "#3f3f46",
  lineHeight: "22px",
  margin: 0,
};

const celebrationBox: React.CSSProperties = {
  backgroundColor: "#f0fdf4",
  border: "1px solid #bbf7d0",
  borderRadius: "8px",
  padding: "16px",
  marginBottom: "24px",
};

const celebrationText: React.CSSProperties = {
  fontSize: "14px",
  color: "#15803d",
  margin: 0,
  textAlign: "center",
};

const learningBox: React.CSSProperties = {
  backgroundColor: "#fefce8",
  border: "1px solid #fef08a",
  borderRadius: "8px",
  padding: "16px",
  marginBottom: "24px",
};

const learningTitle: React.CSSProperties = {
  fontSize: "14px",
  fontWeight: "600",
  color: "#a16207",
  marginBottom: "8px",
};

const learningList: React.CSSProperties = {
  margin: 0,
  paddingLeft: "20px",
  fontSize: "13px",
  color: "#a16207",
  lineHeight: "22px",
};

const buttonContainer: React.CSSProperties = {
  textAlign: "center",
};

const button: React.CSSProperties = {
  background: "linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)",
  color: "#ffffff",
  padding: "14px 32px",
  borderRadius: "8px",
  textDecoration: "none",
  fontWeight: "600",
  fontSize: "15px",
  display: "inline-block",
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

export default DealStatusEmail;
