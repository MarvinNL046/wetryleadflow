import * as React from "react";

interface CreditNoteEmailProps {
  customerName: string;
  creditNoteNumber: string;
  total: string;
  issueDate: string;
  reason?: string;
  companyName: string;
  companyEmail?: string;
  iban?: string;
  relatedInvoice?: string;
  viewUrl: string;
}

export function CreditNoteEmail({
  customerName,
  creditNoteNumber,
  total,
  issueDate,
  reason,
  companyName,
  companyEmail,
  iban,
  relatedInvoice,
  viewUrl,
}: CreditNoteEmailProps) {
  return (
    <div style={container}>
      <div style={content}>
        {/* Header */}
        <div style={headerSection}>
          <div style={logoContainer}>
            <span style={logoText}>{companyName}</span>
          </div>
        </div>

        <div style={creditNoteBadge}>
          <span style={badgeText}>CREDITNOTA</span>
        </div>

        <h1 style={heading}>Creditnota {creditNoteNumber}</h1>

        <p style={text}>
          Beste <strong>{customerName}</strong>,
        </p>

        <p style={text}>
          Hierbij ontvangt u creditnota <strong>{creditNoteNumber}</strong>.
          {relatedInvoice && (
            <> Deze is gerelateerd aan factuur <strong>{relatedInvoice}</strong>.</>
          )}
        </p>

        {reason && (
          <div style={reasonBox}>
            <span style={reasonLabel}>Reden:</span>
            <span style={reasonText}>{reason}</span>
          </div>
        )}

        {/* Credit Note Summary Box */}
        <div style={summaryBox}>
          <div style={summaryRow}>
            <span style={summaryLabel}>Creditnotanummer</span>
            <span style={summaryValue}>{creditNoteNumber}</span>
          </div>
          <div style={summaryRow}>
            <span style={summaryLabel}>Datum</span>
            <span style={summaryValue}>{issueDate}</span>
          </div>
          {relatedInvoice && (
            <div style={summaryRow}>
              <span style={summaryLabel}>Gerelateerde factuur</span>
              <span style={summaryValue}>{relatedInvoice}</span>
            </div>
          )}
          <div style={summaryRowHighlight}>
            <span style={summaryLabelHighlight}>Te crediteren bedrag</span>
            <span style={summaryValueHighlight}>{total}</span>
          </div>
        </div>

        <div style={buttonContainer}>
          <a href={viewUrl} style={button}>
            Bekijk Creditnota
          </a>
        </div>

        {/* Credit Info */}
        <div style={creditSection}>
          <h2 style={creditHeading}>Creditering</h2>
          <p style={creditText}>
            Het bedrag van <strong>{total}</strong> wordt verrekend met een openstaande factuur
            of teruggestort op uw rekening.
          </p>
          {iban && (
            <div style={creditDetails}>
              <p style={creditDetailText}>
                Voor terugstorting verzoeken wij u uw IBAN door te geven indien wij deze nog niet hebben.
              </p>
              <div style={creditRow}>
                <span style={creditLabel}>Referentie:</span>
                <span style={creditValue}>{creditNoteNumber}</span>
              </div>
            </div>
          )}
        </div>

        <p style={textSmall}>
          Heeft u vragen over deze creditnota? Neem gerust contact met ons op
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
          Deze creditnota is verzonden via LeadFlow
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

const creditNoteBadge: React.CSSProperties = {
  textAlign: "center",
  marginBottom: "16px",
};

const badgeText: React.CSSProperties = {
  backgroundColor: "#dc2626",
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

const reasonBox: React.CSSProperties = {
  backgroundColor: "#fef2f2",
  borderRadius: "8px",
  padding: "12px 16px",
  marginBottom: "16px",
  border: "1px solid #fecaca",
};

const reasonLabel: React.CSSProperties = {
  fontSize: "12px",
  fontWeight: "600",
  color: "#991b1b",
  display: "block",
  marginBottom: "4px",
};

const reasonText: React.CSSProperties = {
  fontSize: "14px",
  color: "#7f1d1d",
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

const summaryRowHighlight: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  padding: "12px 0",
  marginTop: "8px",
  backgroundColor: "#fef2f2",
  marginLeft: "-24px",
  marginRight: "-24px",
  paddingLeft: "24px",
  paddingRight: "24px",
  marginBottom: "-20px",
  borderRadius: "0 0 8px 8px",
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

const summaryLabelHighlight: React.CSSProperties = {
  fontSize: "14px",
  fontWeight: "600",
  color: "#991b1b",
};

const summaryValueHighlight: React.CSSProperties = {
  fontSize: "18px",
  fontWeight: "700",
  color: "#dc2626",
};

const buttonContainer: React.CSSProperties = {
  textAlign: "center",
  margin: "32px 0",
};

const button: React.CSSProperties = {
  background: "linear-gradient(135deg, #dc2626 0%, #ef4444 100%)",
  color: "#ffffff",
  padding: "14px 36px",
  borderRadius: "8px",
  textDecoration: "none",
  fontWeight: "600",
  fontSize: "16px",
  display: "inline-block",
  boxShadow: "0 4px 14px rgba(220, 38, 38, 0.4)",
};

const creditSection: React.CSSProperties = {
  backgroundColor: "#fef2f2",
  borderRadius: "8px",
  padding: "20px 24px",
  marginBottom: "24px",
  border: "1px solid #fecaca",
};

const creditHeading: React.CSSProperties = {
  fontSize: "16px",
  fontWeight: "600",
  color: "#991b1b",
  marginBottom: "12px",
};

const creditText: React.CSSProperties = {
  fontSize: "14px",
  color: "#7f1d1d",
  marginBottom: "12px",
};

const creditDetails: React.CSSProperties = {
  backgroundColor: "#ffffff",
  borderRadius: "6px",
  padding: "12px 16px",
};

const creditDetailText: React.CSSProperties = {
  fontSize: "13px",
  color: "#64748b",
  marginBottom: "8px",
};

const creditRow: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  padding: "4px 0",
};

const creditLabel: React.CSSProperties = {
  fontSize: "13px",
  color: "#64748b",
};

const creditValue: React.CSSProperties = {
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

export default CreditNoteEmail;
