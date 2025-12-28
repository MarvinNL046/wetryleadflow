import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Image,
} from "@react-pdf/renderer";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import type { DocumentBranding } from "@/lib/branding/get-branding";

// Register fonts (using default for now)
Font.register({
  family: "Helvetica",
  fonts: [
    { src: "Helvetica" },
    { src: "Helvetica-Bold", fontWeight: "bold" },
  ],
});

// Static styles (colors are applied dynamically)
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: "Helvetica",
    color: "#1f2937",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 40,
  },
  companyInfo: {
    maxWidth: "50%",
  },
  logoContainer: {
    marginBottom: 8,
  },
  logo: {
    width: 120,
    maxHeight: 50,
    objectFit: "contain",
  },
  companyName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
    // color applied dynamically
  },
  companyDetails: {
    fontSize: 9,
    color: "#6b7280",
    lineHeight: 1.4,
  },
  quotationInfo: {
    textAlign: "right",
  },
  quotationTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#1f2937",
  },
  quotationNumber: {
    fontSize: 11,
    marginBottom: 4,
  },
  quotationDate: {
    fontSize: 9,
    color: "#6b7280",
  },
  customerSection: {
    marginBottom: 30,
    padding: 15,
    backgroundColor: "#f9fafb",
    borderRadius: 4,
  },
  customerLabel: {
    fontSize: 8,
    color: "#6b7280",
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  customerName: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 4,
  },
  customerDetails: {
    fontSize: 9,
    color: "#4b5563",
    lineHeight: 1.4,
  },
  table: {
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: "row",
    padding: 10,
    borderRadius: 4,
    marginBottom: 2,
    // backgroundColor applied dynamically
  },
  tableHeaderText: {
    color: "white",
    fontSize: 9,
    fontWeight: "bold",
  },
  tableRow: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  tableRowAlt: {
    backgroundColor: "#f9fafb",
  },
  colDescription: {
    flex: 3,
  },
  colQuantity: {
    flex: 1,
    textAlign: "center",
  },
  colPrice: {
    flex: 1,
    textAlign: "right",
  },
  colTax: {
    flex: 1,
    textAlign: "center",
  },
  colTotal: {
    flex: 1,
    textAlign: "right",
  },
  totalsSection: {
    marginTop: 10,
    marginLeft: "auto",
    width: 200,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  totalLabel: {
    fontSize: 9,
    color: "#6b7280",
  },
  totalValue: {
    fontSize: 10,
  },
  grandTotalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    marginTop: 4,
    borderRadius: 4,
    paddingHorizontal: 10,
    // backgroundColor applied dynamically
  },
  grandTotalLabel: {
    fontSize: 11,
    fontWeight: "bold",
    color: "white",
  },
  grandTotalValue: {
    fontSize: 11,
    fontWeight: "bold",
    color: "white",
  },
  validitySection: {
    marginTop: 30,
    padding: 15,
    backgroundColor: "#fef3c7",
    borderRadius: 4,
  },
  validityTitle: {
    fontSize: 10,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#92400e",
  },
  validityText: {
    fontSize: 9,
    color: "#78350f",
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: "center",
    fontSize: 8,
    color: "#9ca3af",
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
  },
  contentSection: {
    marginTop: 20,
    marginBottom: 20,
  },
  contentLabel: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#6b7280",
    marginBottom: 4,
  },
  contentText: {
    fontSize: 9,
    color: "#4b5563",
    lineHeight: 1.5,
  },
});

function formatCurrency(amount: string | number, currency: string = "EUR") {
  const num = typeof amount === "string" ? parseFloat(amount) : amount;
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: currency === "JPY" ? 0 : 2,
    maximumFractionDigits: currency === "JPY" ? 0 : 2,
  }).format(num);
}

interface QuotationData {
  id: number;
  quotationNumber: string;
  status: string;
  issueDate: Date;
  validUntil?: Date | null;
  currency: string;
  title?: string | null;
  introduction?: string | null;
  terms?: string | null;
  subtotal: string;
  taxAmount: string;
  discountAmount?: string | null;
  total: string;
  contact: {
    firstName?: string | null;
    lastName?: string | null;
    company?: string | null;
    email?: string | null;
    phone?: string | null;
    address?: string | null;
  } | null;
  lineItems: Array<{
    id: number;
    description: string;
    quantity: string;
    unit: string;
    unitPrice: string;
    taxRate: string;
    total: string;
  }>;
}

interface QuotationPDFProps {
  quotation: QuotationData;
  branding: DocumentBranding;
}

export function QuotationPDF({ quotation, branding }: QuotationPDFProps) {
  const customerName =
    quotation.contact?.company ||
    `${quotation.contact?.firstName ?? ""} ${quotation.contact?.lastName ?? ""}`.trim();

  // Dynamic color from branding
  const primaryColor = branding.primaryColor;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.companyInfo}>
            {/* Logo */}
            {branding.logoUrl && (
              <View style={styles.logoContainer}>
                <Image src={branding.logoUrl} style={styles.logo} />
              </View>
            )}
            <Text style={[styles.companyName, { color: primaryColor }]}>
              {branding.companyName || branding.appName}
            </Text>
            <Text style={styles.companyDetails}>
              {branding.companyAddress && `${branding.companyAddress}\n`}
              {branding.companyEmail && `${branding.companyEmail}\n`}
              {branding.companyPhone && `${branding.companyPhone}\n`}
              {branding.companyWebsite && branding.companyWebsite}
            </Text>
          </View>
          <View style={styles.quotationInfo}>
            <Text style={styles.quotationTitle}>OFFERTE</Text>
            <Text style={styles.quotationNumber}>{quotation.quotationNumber}</Text>
            <Text style={styles.quotationDate}>
              Datum: {format(new Date(quotation.issueDate), "d MMMM yyyy", { locale: nl })}
            </Text>
            {quotation.validUntil && (
              <Text style={styles.quotationDate}>
                Geldig tot: {format(new Date(quotation.validUntil), "d MMMM yyyy", { locale: nl })}
              </Text>
            )}
          </View>
        </View>

        {/* Customer */}
        <View style={styles.customerSection}>
          <Text style={styles.customerLabel}>Aan</Text>
          <Text style={styles.customerName}>{customerName}</Text>
          <Text style={styles.customerDetails}>
            {quotation.contact?.address && `${quotation.contact.address}\n`}
            {quotation.contact?.email && `${quotation.contact.email}\n`}
            {quotation.contact?.phone && quotation.contact.phone}
          </Text>
        </View>

        {/* Title */}
        {quotation.title && (
          <View style={styles.contentSection}>
            <Text style={[styles.contentLabel, { fontSize: 12 }]}>
              {quotation.title}
            </Text>
          </View>
        )}

        {/* Introduction */}
        {quotation.introduction && (
          <View style={styles.contentSection}>
            <Text style={styles.contentText}>{quotation.introduction}</Text>
          </View>
        )}

        {/* Line Items Table */}
        <View style={styles.table}>
          <View style={[styles.tableHeader, { backgroundColor: primaryColor }]}>
            <Text style={[styles.tableHeaderText, styles.colDescription]}>
              Omschrijving
            </Text>
            <Text style={[styles.tableHeaderText, styles.colQuantity]}>
              Aantal
            </Text>
            <Text style={[styles.tableHeaderText, styles.colPrice]}>Prijs</Text>
            <Text style={[styles.tableHeaderText, styles.colTax]}>BTW</Text>
            <Text style={[styles.tableHeaderText, styles.colTotal]}>Totaal</Text>
          </View>
          {quotation.lineItems.map((item, index) => (
            <View
              key={item.id}
              style={[styles.tableRow, index % 2 === 1 ? styles.tableRowAlt : {}]}
            >
              <Text style={styles.colDescription}>{item.description}</Text>
              <Text style={styles.colQuantity}>
                {item.quantity} {item.unit}
              </Text>
              <Text style={styles.colPrice}>{formatCurrency(item.unitPrice, quotation.currency)}</Text>
              <Text style={styles.colTax}>{item.taxRate}%</Text>
              <Text style={styles.colTotal}>{formatCurrency(item.total, quotation.currency)}</Text>
            </View>
          ))}
        </View>

        {/* Totals */}
        <View style={styles.totalsSection}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Subtotaal</Text>
            <Text style={styles.totalValue}>
              {formatCurrency(quotation.subtotal, quotation.currency)}
            </Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>BTW</Text>
            <Text style={styles.totalValue}>
              {formatCurrency(quotation.taxAmount, quotation.currency)}
            </Text>
          </View>
          {parseFloat(quotation.discountAmount ?? "0") > 0 && (
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Korting</Text>
              <Text style={styles.totalValue}>
                -{formatCurrency(quotation.discountAmount!, quotation.currency)}
              </Text>
            </View>
          )}
          <View style={[styles.grandTotalRow, { backgroundColor: primaryColor }]}>
            <Text style={styles.grandTotalLabel}>Totaal</Text>
            <Text style={styles.grandTotalValue}>
              {formatCurrency(quotation.total, quotation.currency)}
            </Text>
          </View>
        </View>

        {/* Validity Notice */}
        {quotation.validUntil && (
          <View style={styles.validitySection}>
            <Text style={styles.validityTitle}>Geldigheid</Text>
            <Text style={styles.validityText}>
              Deze offerte is geldig tot{" "}
              {format(new Date(quotation.validUntil), "d MMMM yyyy", { locale: nl })}.
              Na deze datum kunnen prijzen en voorwaarden afwijken.
            </Text>
          </View>
        )}

        {/* Terms */}
        {quotation.terms && (
          <View style={styles.contentSection}>
            <Text style={styles.contentLabel}>Voorwaarden</Text>
            <Text style={styles.contentText}>{quotation.terms}</Text>
          </View>
        )}

        {/* Footer */}
        <View style={styles.footer}>
          <Text>
            {branding.companyName || branding.appName}
            {branding.kvkNumber && ` | KVK: ${branding.kvkNumber}`}
            {branding.vatNumber && ` | BTW: ${branding.vatNumber}`}
          </Text>
          {branding.defaultFooter && <Text>{branding.defaultFooter}</Text>}
        </View>
      </Page>
    </Document>
  );
}
