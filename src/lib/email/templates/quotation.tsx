import * as React from "react";

interface QuotationEmailProps {
  customerName: string;
  quotationNumber: string;
  total: string;
  validUntil?: string;
  companyName: string;
  companyEmail?: string;
  introduction?: string;
  viewUrl: string;
}

export function QuotationEmail({
  customerName,
  quotationNumber,
  total,
  validUntil,
  companyName,
  companyEmail,
  introduction,
  viewUrl,
}: QuotationEmailProps) {
  return (
    <div style={container}>
      <div style={content}>
        {/* Header */}
        <div style={headerSection}>
          <div style={logoContainer}>
            <span style={logoText}>{companyName}</span>
          </div>
        </div>

        <div style={quotationBadge}>
          <span style={badgeText}>OFFERTE</span>
        </div>

        <h1 style={heading}>Offerte {quotationNumber}</h1>

        <p style={text}>
          Beste <strong>{customerName}</strong>,
        </p>

        {introduction ? (
          <p style={text}>{introduction}</p>
        ) : (
          <p style={text}>
            Bedankt voor uw interesse! Hierbij ontvangt u onze offerte <strong>{quotationNumber}</strong>.
          </p>
        )}

        {/* Quotation Summary Box */}
        <div style={summaryBox}>
          <div style={summaryRow}>
            <span style={summaryLabel}>Offertenummer</span>
            <span style={summaryValue}>{quotationNumber}</span>
          </div>
          <div style={summaryRow}>
            <span style={summaryLabel}>Totaalbedrag</span>
            <span style={summaryValueHighlight}>{total}</span>
          </div>
          {validUntil && (
            <div style={summaryRow}>
              <span style={summaryLabel}>Geldig tot</span>
              <span style={summaryValue}>{validUntil}</span>
            </div>
          )}
        </div>

        <div style={buttonContainer}>
          <a href={viewUrl} style={button}>
            Bekijk Offerte
          </a>
        </div>

        {/* Validity Notice */}
        {validUntil && (
          <div style={noticeSection}>
            <p style={noticeText}>
              ⏰ Deze offerte is geldig tot <strong>{validUntil}</strong>.
              Na deze datum kunnen prijzen en voorwaarden afwijken.
            </p>
          </div>
        )}

        <p style={textSmall}>
          Heeft u vragen over deze offerte? Neem gerust contact met ons op
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
          Deze offerte is verzonden via LeadFlow
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
  color: "#2563eb",
};

const quotationBadge: React.CSSProperties = {
  textAlign: "center",
  marginBottom: "16px",
};

const badgeText: React.CSSProperties = {
  backgroundColor: "#2563eb",
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

const textSmall: React.CSSProperties = {
  fontSize: "14px",
  lineHeight: "22px",
  color: "#52525b",
  marginBottom: "16px",
};

const summaryBox: React.CSSProperties = {
  backgroundColor: "#f8fafc",
  borderRadius: "8px",
  padding: "20px 24px",
  margin: "24px 0",
  border: "1px solid #e2e8f0",
};

const summaryRow: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  padding: "8px 0",
  borderBottom: "1px solid #e2e8f0",
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
  color: "#2563eb",
};

const buttonContainer: React.CSSProperties = {
  textAlign: "center",
  margin: "32px 0",
};

const button: React.CSSProperties = {
  background: "linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)",
  color: "#ffffff",
  padding: "14px 36px",
  borderRadius: "8px",
  textDecoration: "none",
  fontWeight: "600",
  fontSize: "16px",
  display: "inline-block",
  boxShadow: "0 4px 14px rgba(37, 99, 235, 0.4)",
};

const noticeSection: React.CSSProperties = {
  backgroundColor: "#fef3c7",
  borderRadius: "8px",
  padding: "16px 20px",
  marginBottom: "24px",
  border: "1px solid #fcd34d",
};

const noticeText: React.CSSProperties = {
  fontSize: "14px",
  color: "#92400e",
  margin: 0,
};

const link: React.CSSProperties = {
  color: "#2563eb",
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

export default QuotationEmail;
