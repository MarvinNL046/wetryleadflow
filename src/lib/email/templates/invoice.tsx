import * as React from "react";
import type { EmailBranding } from "@/lib/branding/get-branding";
import { createBrandedStyles, DEFAULT_EMAIL_BRANDING, getPoweredByText } from "../branded-styles";

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
  // Agency branding support
  branding?: EmailBranding;
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
  branding = DEFAULT_EMAIL_BRANDING,
}: InvoiceEmailProps) {
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
          <span style={styles.badgeText}>FACTUUR</span>
        </div>

        <h1 style={styles.heading}>Factuur {invoiceNumber}</h1>

        <p style={styles.text}>
          Beste <strong>{customerName}</strong>,
        </p>

        {introduction ? (
          <p style={styles.text}>{introduction}</p>
        ) : (
          <p style={styles.text}>
            Hierbij ontvangt u factuur <strong>{invoiceNumber}</strong> voor onze diensten.
          </p>
        )}

        {/* Invoice Summary Box */}
        <div style={styles.summaryBox}>
          <div style={styles.summaryRow}>
            <span style={styles.summaryLabel}>Factuurnummer</span>
            <span style={styles.summaryValue}>{invoiceNumber}</span>
          </div>
          <div style={styles.summaryRow}>
            <span style={styles.summaryLabel}>Totaalbedrag</span>
            <span style={styles.summaryValueHighlight}>{total}</span>
          </div>
          <div style={styles.summaryRow}>
            <span style={styles.summaryLabel}>Vervaldatum</span>
            <span style={styles.summaryValue}>{dueDate}</span>
          </div>
          <div style={styles.summaryRow}>
            <span style={styles.summaryLabel}>Betalingstermijn</span>
            <span style={styles.summaryValue}>{paymentTerms} dagen</span>
          </div>
        </div>

        <div style={styles.buttonContainer}>
          {paymentUrl && (
            <a href={paymentUrl} style={styles.payButton}>
              💳 Betaal nu {total}
            </a>
          )}
          <a href={viewUrl} style={paymentUrl ? styles.secondaryButton : styles.button}>
            Bekijk Factuur
          </a>
        </div>

        {/* Payment Info */}
        {iban && (
          <div style={styles.paymentSection}>
            <h2 style={styles.paymentHeading}>💳 Betalingsgegevens</h2>
            <p style={styles.paymentText}>
              Gelieve het bedrag over te maken naar:
            </p>
            <div style={styles.paymentDetails}>
              <div style={styles.paymentRow}>
                <span style={styles.paymentLabel}>IBAN:</span>
                <span style={styles.paymentValue}>{iban}</span>
              </div>
              <div style={styles.paymentRow}>
                <span style={styles.paymentLabel}>O.v.v.:</span>
                <span style={styles.paymentValue}>{invoiceNumber}</span>
              </div>
            </div>
          </div>
        )}

        <p style={styles.textSmall}>
          Heeft u vragen over deze factuur? Neem gerust contact met ons op
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

export default InvoiceEmail;
