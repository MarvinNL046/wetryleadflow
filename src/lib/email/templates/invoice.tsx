import * as React from "react";

interface InvoiceEmailProps {
  customerName: string;
  invoiceNumber: string;
  total: string;
  dueDate: string;
  paymentTerms: number;
  companyName: string;
  companyEmail?: string;
  iban?: string;
  introduction?: string;
  viewUrl: string;
  paymentUrl?: string;
}

export function InvoiceEmail({
  customerName,
  invoiceNumber,
  total,
  dueDate,
  paymentTerms,
  companyName,
  companyEmail,
  iban,
  introduction,
  viewUrl,
  paymentUrl,
}: InvoiceEmailProps) {
  return (
    <div style={container}>
      <div style={content}>
        {/* Header */}
        <div style={headerSection}>
          <div style={logoContainer}>
            <span style={logoText}>{companyName}</span>
          </div>
        </div>

        <div style={invoiceBadge}>
          <span style={badgeText}>FACTUUR</span>
        </div>

        <h1 style={heading}>Factuur {invoiceNumber}</h1>

        <p style={text}>
          Beste <strong>{customerName}</strong>,
        </p>

        {introduction ? (
          <p style={text}>{introduction}</p>
        ) : (
          <p style={text}>
            Hierbij ontvangt u factuur <strong>{invoiceNumber}</strong> voor onze diensten.
          </p>
        )}

        {/* Invoice Summary Box */}
        <div style={summaryBox}>
          <div style={summaryRow}>
            <span style={summaryLabel}>Factuurnummer</span>
            <span style={summaryValue}>{invoiceNumber}</span>
          </div>
          <div style={summaryRow}>
            <span style={summaryLabel}>Totaalbedrag</span>
            <span style={summaryValueHighlight}>{total}</span>
          </div>
          <div style={summaryRow}>
            <span style={summaryLabel}>Vervaldatum</span>
            <span style={summaryValue}>{dueDate}</span>
          </div>
          <div style={summaryRow}>
            <span style={summaryLabel}>Betalingstermijn</span>
            <span style={summaryValue}>{paymentTerms} dagen</span>
          </div>
        </div>

        <div style={buttonContainer}>
          {paymentUrl && (
            <a href={paymentUrl} style={payButton}>
              💳 Betaal nu {total}
            </a>
          )}
          <a href={viewUrl} style={paymentUrl ? secondaryButton : button}>
            Bekijk Factuur
          </a>
        </div>

        {/* Payment Info */}
        {iban && (
          <div style={paymentSection}>
            <h2 style={paymentHeading}>💳 Betalingsgegevens</h2>
            <p style={paymentText}>
              Gelieve het bedrag over te maken naar:
            </p>
            <div style={paymentDetails}>
              <div style={paymentRow}>
                <span style={paymentLabel}>IBAN:</span>
                <span style={paymentValue}>{iban}</span>
              </div>
              <div style={paymentRow}>
                <span style={paymentLabel}>O.v.v.:</span>
                <span style={paymentValue}>{invoiceNumber}</span>
              </div>
            </div>
          </div>
        )}

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
          Deze factuur is verzonden via LeadFlow
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

const invoiceBadge: React.CSSProperties = {
  textAlign: "center",
  marginBottom: "16px",
};

const badgeText: React.CSSProperties = {
  backgroundColor: "#7c3aed",
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
  color: "#7c3aed",
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

const paymentValue: React.CSSProperties = {
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

export default InvoiceEmail;
