import * as React from "react";
import type { EmailBranding } from "@/lib/branding/get-branding";
import { createBrandedStyles, DEFAULT_EMAIL_BRANDING, getPoweredByText } from "../branded-styles";

interface QuotationEmailProps {
  customerName: string;
  quotationNumber: string;
  total: string;
  validUntil?: string;
  companyName: string;
  companyEmail?: string;
  introduction?: string;
  viewUrl: string;
  // Agency branding support
  branding?: EmailBranding;
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
  branding = DEFAULT_EMAIL_BRANDING,
}: QuotationEmailProps) {
  // Create branded styles
  const styles = createBrandedStyles(branding);

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        {/* Header */}
        <div style={styles.headerSection}>
          <div style={styles.logoContainer}>
            {branding.logoUrl ? (
              <img src={branding.logoUrl} alt={companyName} style={styles.logoImage} />
            ) : (
              <span style={styles.logoText}>{companyName}</span>
            )}
          </div>
        </div>

        <div style={styles.badge}>
          <span style={styles.badgeText}>OFFERTE</span>
        </div>

        <h1 style={styles.heading}>Offerte {quotationNumber}</h1>

        <p style={styles.text}>
          Beste <strong>{customerName}</strong>,
        </p>

        {introduction ? (
          <p style={styles.text}>{introduction}</p>
        ) : (
          <p style={styles.text}>
            Bedankt voor uw interesse! Hierbij ontvangt u onze offerte <strong>{quotationNumber}</strong>.
          </p>
        )}

        {/* Quotation Summary Box */}
        <div style={styles.summaryBox}>
          <div style={styles.summaryRow}>
            <span style={styles.summaryLabel}>Offertenummer</span>
            <span style={styles.summaryValue}>{quotationNumber}</span>
          </div>
          <div style={styles.summaryRow}>
            <span style={styles.summaryLabel}>Totaalbedrag</span>
            <span style={styles.summaryValueHighlight}>{total}</span>
          </div>
          {validUntil && (
            <div style={styles.summaryRow}>
              <span style={styles.summaryLabel}>Geldig tot</span>
              <span style={styles.summaryValue}>{validUntil}</span>
            </div>
          )}
        </div>

        <div style={styles.buttonContainer}>
          <a href={viewUrl} style={styles.button}>
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

        <p style={styles.textSmall}>
          Heeft u vragen over deze offerte? Neem gerust contact met ons op
          {companyEmail && (
            <> via <a href={`mailto:${companyEmail}`} style={styles.link}>{companyEmail}</a></>
          )}.
        </p>

        <hr style={styles.divider} />

        <p style={styles.footer}>
          Met vriendelijke groet,
          <br />
          <strong>{companyName}</strong>
        </p>

        <p style={styles.footerSmall}>
          {getPoweredByText(branding)}
        </p>
      </div>
    </div>
  );
}

// Notice section styles (specific to quotation)
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

export default QuotationEmail;
