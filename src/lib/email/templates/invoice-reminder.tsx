import * as React from "react";

interface InvoiceReminderEmailProps {
  customerName: string;
  invoiceNumber: string;
  total: string;
  amountDue: string;
  dueDate: string;
  daysOverdue: number;
  reminderNumber: number;
  companyName: string;
  companyEmail?: string;
  iban?: string;
  viewUrl: string;
  paymentUrl?: string;
}

export function InvoiceReminderEmail({
  customerName,
  invoiceNumber,
  total,
  amountDue,
  dueDate,
  daysOverdue,
  reminderNumber,
  companyName,
  companyEmail,
  iban,
  viewUrl,
  paymentUrl,
}: InvoiceReminderEmailProps) {
  // Determine urgency level based on reminder number
  const isUrgent = reminderNumber >= 2;
  const isFinal = reminderNumber >= 3;

  const getSubjectLine = () => {
    if (isFinal) return "Laatste herinnering";
    if (isUrgent) return "Tweede herinnering";
    return "Herinnering";
  };

  return (
    <div style={container}>
      <div style={content}>
        {/* Header */}
        <div style={headerSection}>
          <div style={logoContainer}>
            <span style={logoText}>{companyName}</span>
          </div>
        </div>

        <div style={isUrgent ? urgentBadge : reminderBadge}>
          <span style={badgeText}>
            {isFinal ? "LAATSTE HERINNERING" : isUrgent ? "2E HERINNERING" : "HERINNERING"}
          </span>
        </div>

        <h1 style={heading}>
          {getSubjectLine()}: Factuur {invoiceNumber}
        </h1>

        <p style={text}>
          Beste <strong>{customerName}</strong>,
        </p>

        {isFinal ? (
          <p style={textUrgent}>
            Dit is onze laatste herinnering voor factuur <strong>{invoiceNumber}</strong>.
            De betaling is nu <strong>{daysOverdue} dagen</strong> verlopen. Wij verzoeken u
            vriendelijk om het openstaande bedrag zo spoedig mogelijk te voldoen om verdere
            stappen te voorkomen.
          </p>
        ) : isUrgent ? (
          <p style={text}>
            Onze administratie toont aan dat factuur <strong>{invoiceNumber}</strong> nog niet
            is voldaan. De vervaldatum was <strong>{dueDate}</strong> ({daysOverdue} dagen geleden).
            Wij verzoeken u vriendelijk om het openstaande bedrag zo spoedig mogelijk over te maken.
          </p>
        ) : (
          <p style={text}>
            Wij willen u er vriendelijk aan herinneren dat de betaling voor factuur{" "}
            <strong>{invoiceNumber}</strong> nog openstaat. De vervaldatum was{" "}
            <strong>{dueDate}</strong>.
          </p>
        )}

        {/* Invoice Summary Box */}
        <div style={isUrgent ? summaryBoxUrgent : summaryBox}>
          <div style={summaryRow}>
            <span style={summaryLabel}>Factuurnummer</span>
            <span style={summaryValue}>{invoiceNumber}</span>
          </div>
          <div style={summaryRow}>
            <span style={summaryLabel}>Origineel bedrag</span>
            <span style={summaryValue}>{total}</span>
          </div>
          <div style={summaryRow}>
            <span style={summaryLabel}>Openstaand bedrag</span>
            <span style={summaryValueHighlight}>{amountDue}</span>
          </div>
          <div style={summaryRow}>
            <span style={summaryLabel}>Vervaldatum</span>
            <span style={isUrgent ? summaryValueOverdue : summaryValue}>{dueDate}</span>
          </div>
          <div style={summaryRow}>
            <span style={summaryLabel}>Dagen verlopen</span>
            <span style={summaryValueOverdue}>{daysOverdue} dagen</span>
          </div>
        </div>

        <div style={buttonContainer}>
          {paymentUrl && (
            <a href={paymentUrl} style={payButton}>
              Betaal nu {amountDue}
            </a>
          )}
          <a href={viewUrl} style={paymentUrl ? secondaryButton : button}>
            Bekijk Factuur
          </a>
        </div>

        {/* Payment Info */}
        {iban && (
          <div style={paymentSection}>
            <h2 style={paymentHeading}>Betalingsgegevens</h2>
            <p style={paymentText}>
              Gelieve het bedrag over te maken naar:
            </p>
            <div style={paymentDetails}>
              <div style={paymentRow}>
                <span style={paymentLabel}>IBAN:</span>
                <span style={paymentValueMono}>{iban}</span>
              </div>
              <div style={paymentRow}>
                <span style={paymentLabel}>O.v.v.:</span>
                <span style={paymentValueMono}>{invoiceNumber}</span>
              </div>
            </div>
          </div>
        )}

        <p style={textSmall}>
          Heeft u deze factuur reeds betaald? Dan kunt u deze herinnering als niet
          verzonden beschouwen. Het kan 1-2 werkdagen duren voordat wij uw betaling
          hebben verwerkt.
        </p>

        <p style={textSmall}>
          Heeft u vragen over deze factuur? Neem gerust contact met ons op
          {companyEmail && (
            <> via <a href={`mailto:${companyEmail}`} style={link}>{companyEmail}</a></>
          )}.
        </p>

        <hr style={divider} />

        <p style={footer}>
          Met vriendelijke groet,
          <br />
          <strong>{companyName}</strong>
        </p>

        <p style={footerSmall}>
          Dit is herinnering #{reminderNumber} voor deze factuur
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
  borderRadius: "12px",
  padding: "40px",
  maxWidth: "600px",
  margin: "0 auto",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
};

const headerSection: React.CSSProperties = {
  textAlign: "center",
  marginBottom: "24px",
};

const logoContainer: React.CSSProperties = {
  display: "inline-block",
  fontSize: "24px",
  fontWeight: "bold",
};

const logoText: React.CSSProperties = {
  color: "#7c3aed",
};

const reminderBadge: React.CSSProperties = {
  textAlign: "center",
  marginBottom: "16px",
};

const urgentBadge: React.CSSProperties = {
  textAlign: "center",
  marginBottom: "16px",
};

const badgeText: React.CSSProperties = {
  backgroundColor: "#f59e0b",
  color: "#ffffff",
  padding: "6px 16px",
  borderRadius: "20px",
  fontSize: "12px",
  fontWeight: "600",
  letterSpacing: "1px",
};

const heading: React.CSSProperties = {
  fontSize: "24px",
  fontWeight: "bold",
  color: "#18181b",
  marginBottom: "24px",
  textAlign: "center",
};

const text: React.CSSProperties = {
  fontSize: "16px",
  lineHeight: "26px",
  color: "#3f3f46",
  marginBottom: "16px",
};

const textUrgent: React.CSSProperties = {
  fontSize: "16px",
  lineHeight: "26px",
  color: "#dc2626",
  marginBottom: "16px",
  fontWeight: "500",
};

const textSmall: React.CSSProperties = {
  fontSize: "14px",
  lineHeight: "22px",
  color: "#52525b",
  marginBottom: "16px",
};

const summaryBox: React.CSSProperties = {
  backgroundColor: "#fef3c7",
  borderRadius: "8px",
  padding: "20px 24px",
  margin: "24px 0",
  border: "1px solid #fcd34d",
};

const summaryBoxUrgent: React.CSSProperties = {
  backgroundColor: "#fee2e2",
  borderRadius: "8px",
  padding: "20px 24px",
  margin: "24px 0",
  border: "1px solid #fca5a5",
};

const summaryRow: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  padding: "8px 0",
  borderBottom: "1px solid rgba(0,0,0,0.1)",
};

const summaryLabel: React.CSSProperties = {
  fontSize: "14px",
  color: "#64748b",
};

const summaryValue: React.CSSProperties = {
  fontSize: "14px",
  fontWeight: "600",
  color: "#1e293b",
};

const summaryValueHighlight: React.CSSProperties = {
  fontSize: "18px",
  fontWeight: "700",
  color: "#dc2626",
};

const summaryValueOverdue: React.CSSProperties = {
  fontSize: "14px",
  fontWeight: "600",
  color: "#dc2626",
};

const buttonContainer: React.CSSProperties = {
  textAlign: "center",
  margin: "32px 0",
};

const button: React.CSSProperties = {
  background: "linear-gradient(135deg, #7c3aed 0%, #6366f1 100%)",
  color: "#ffffff",
  padding: "14px 36px",
  borderRadius: "8px",
  textDecoration: "none",
  fontWeight: "600",
  fontSize: "16px",
  display: "inline-block",
  boxShadow: "0 4px 14px rgba(124, 58, 237, 0.4)",
};

const payButton: React.CSSProperties = {
  background: "linear-gradient(135deg, #16a34a 0%, #22c55e 100%)",
  color: "#ffffff",
  padding: "16px 40px",
  borderRadius: "8px",
  textDecoration: "none",
  fontWeight: "700",
  fontSize: "18px",
  display: "inline-block",
  boxShadow: "0 4px 14px rgba(22, 163, 74, 0.4)",
  marginBottom: "16px",
};

const secondaryButton: React.CSSProperties = {
  background: "#f4f4f5",
  color: "#3f3f46",
  padding: "12px 28px",
  borderRadius: "8px",
  textDecoration: "none",
  fontWeight: "500",
  fontSize: "14px",
  display: "inline-block",
  border: "1px solid #e4e4e7",
};

const paymentSection: React.CSSProperties = {
  backgroundColor: "#f0fdf4",
  borderRadius: "8px",
  padding: "20px 24px",
  marginBottom: "24px",
  border: "1px solid #bbf7d0",
};

const paymentHeading: React.CSSProperties = {
  fontSize: "16px",
  fontWeight: "600",
  color: "#166534",
  marginBottom: "12px",
};

const paymentText: React.CSSProperties = {
  fontSize: "14px",
  color: "#166534",
  marginBottom: "12px",
};

const paymentDetails: React.CSSProperties = {
  backgroundColor: "#ffffff",
  borderRadius: "6px",
  padding: "12px 16px",
};

const paymentRow: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  padding: "4px 0",
};

const paymentLabel: React.CSSProperties = {
  fontSize: "13px",
  color: "#64748b",
};

const paymentValueMono: React.CSSProperties = {
  fontSize: "13px",
  fontWeight: "600",
  color: "#1e293b",
  fontFamily: "monospace",
};

const link: React.CSSProperties = {
  color: "#7c3aed",
  textDecoration: "underline",
};

const divider: React.CSSProperties = {
  border: "none",
  borderTop: "1px solid #e4e4e7",
  margin: "32px 0",
};

const footer: React.CSSProperties = {
  fontSize: "15px",
  color: "#3f3f46",
  lineHeight: "24px",
};

const footerSmall: React.CSSProperties = {
  fontSize: "11px",
  color: "#a1a1aa",
  textAlign: "center",
  marginTop: "24px",
};

export default InvoiceReminderEmail;
