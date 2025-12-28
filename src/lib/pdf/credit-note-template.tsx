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
  creditNoteInfo: {
    textAlign: "right",
  },
  creditNoteTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#dc2626", // Credit notes always use red for the title
  },
  creditNoteNumber: {
    fontSize: 11,
    marginBottom: 4,
  },
  creditNoteDate: {
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
  relatedInvoice: {
    marginBottom: 20,
    padding: 12,
    backgroundColor: "#fef3c7",
    borderRadius: 4,
  },
  relatedInvoiceLabel: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#92400e",
    marginBottom: 4,
  },
  relatedInvoiceText: {
    fontSize: 9,
    color: "#78350f",
  },
  reasonSection: {
    marginBottom: 20,
    padding: 12,
    backgroundColor: "#fef2f2",
    borderRadius: 4,
  },
  reasonLabel: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#991b1b",
    marginBottom: 4,
  },
  reasonText: {
    fontSize: 9,
    color: "#7f1d1d",
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
  creditInfoSection: {
    marginTop: 30,
    padding: 15,
    backgroundColor: "#fef2f2",
    borderRadius: 4,
  },
  creditInfoTitle: {
    fontSize: 10,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#991b1b",
  },
  creditInfoDetails: {
    fontSize: 9,
    color: "#4b5563",
    lineHeight: 1.5,
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
  statusBadge: {
    marginTop: 8,
    padding: 4,
    backgroundColor: "#fee2e2",
    borderRadius: 2,
    alignSelf: "flex-end",
  },
  statusText: {
    fontSize: 8,
    color: "#dc2626",
    fontWeight: "bold",
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

const statusLabels: Record<string, string> = {
  draft: "CONCEPT",
  issued: "UITGEGEVEN",
  applied: "VERREKEND",
  refunded: "TERUGBETAALD",
  cancelled: "GEANNULEERD",
};

interface CreditNoteData {
  id: number;
  creditNoteNumber: string;
  status: string;
  issueDate: Date;
  currency: string;
  reason?: string | null;
  notes?: string | null;
  subtotal: string;
  taxAmount: string;
  total: string;
  contact: {
    firstName?: string | null;
    lastName?: string | null;
    company?: string | null;
    email?: string | null;
    phone?: string | null;
    address?: string | null;
  } | null;
  invoice?: {
    id: number;
    invoiceNumber: string;
    total: string;
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

interface CreditNotePDFProps {
  creditNote: CreditNoteData;
  branding: DocumentBranding;
}

export function CreditNotePDF({ creditNote, branding }: CreditNotePDFProps) {
  const customerName =
    creditNote.contact?.company ||
    `${creditNote.contact?.firstName ?? ""} ${creditNote.contact?.lastName ?? ""}`.trim();

  // Dynamic color from branding - for credit notes we use the primary color for company name
  // but keep red (#dc2626) for the table header and totals since credit notes should clearly
  // indicate they are credit/refund documents
  const companyNameColor = branding.primaryColor;
  const creditNoteColor = "#dc2626"; // Red for credit notes

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
            <Text style={[styles.companyName, { color: companyNameColor }]}>
              {branding.companyName || branding.appName}
            </Text>
            <Text style={styles.companyDetails}>
              {branding.companyAddress && `${branding.companyAddress}\n`}
              {branding.companyEmail && `${branding.companyEmail}\n`}
              {branding.companyPhone && `${branding.companyPhone}\n`}
              {branding.companyWebsite && branding.companyWebsite}
            </Text>
          </View>
          <View style={styles.creditNoteInfo}>
            <Text style={styles.creditNoteTitle}>CREDITNOTA</Text>
            <Text style={styles.creditNoteNumber}>{creditNote.creditNoteNumber}</Text>
            <Text style={styles.creditNoteDate}>
              Datum: {format(new Date(creditNote.issueDate), "d MMMM yyyy", { locale: nl })}
            </Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>
                {statusLabels[creditNote.status] || creditNote.status.toUpperCase()}
              </Text>
            </View>
          </View>
        </View>

        {/* Customer */}
        <View style={styles.customerSection}>
          <Text style={styles.customerLabel}>Klantgegevens</Text>
          <Text style={styles.customerName}>{customerName}</Text>
          <Text style={styles.customerDetails}>
            {creditNote.contact?.address && `${creditNote.contact.address}\n`}
            {creditNote.contact?.email && `${creditNote.contact.email}\n`}
            {creditNote.contact?.phone && creditNote.contact.phone}
          </Text>
        </View>

        {/* Related Invoice */}
        {creditNote.invoice && (
          <View style={styles.relatedInvoice}>
            <Text style={styles.relatedInvoiceLabel}>Gerelateerde factuur</Text>
            <Text style={styles.relatedInvoiceText}>
              {creditNote.invoice.invoiceNumber} - Origineel bedrag: {formatCurrency(creditNote.invoice.total, creditNote.currency)}
            </Text>
          </View>
        )}

        {/* Reason */}
        {creditNote.reason && (
          <View style={styles.reasonSection}>
            <Text style={styles.reasonLabel}>Reden voor creditnota</Text>
            <Text style={styles.reasonText}>{creditNote.reason}</Text>
          </View>
        )}

        {/* Line Items Table */}
        <View style={styles.table}>
          <View style={[styles.tableHeader, { backgroundColor: creditNoteColor }]}>
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
          {creditNote.lineItems.map((item, index) => (
            <View
              key={item.id}
              style={[styles.tableRow, index % 2 === 1 ? styles.tableRowAlt : {}]}
            >
              <Text style={styles.colDescription}>{item.description}</Text>
              <Text style={styles.colQuantity}>
                {item.quantity} {item.unit}
              </Text>
              <Text style={styles.colPrice}>{formatCurrency(item.unitPrice, creditNote.currency)}</Text>
              <Text style={styles.colTax}>{item.taxRate}%</Text>
              <Text style={styles.colTotal}>{formatCurrency(item.total, creditNote.currency)}</Text>
            </View>
          ))}
        </View>

        {/* Totals */}
        <View style={styles.totalsSection}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Subtotaal</Text>
            <Text style={styles.totalValue}>
              {formatCurrency(creditNote.subtotal, creditNote.currency)}
            </Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>BTW</Text>
            <Text style={styles.totalValue}>
              {formatCurrency(creditNote.taxAmount, creditNote.currency)}
            </Text>
          </View>
          <View style={[styles.grandTotalRow, { backgroundColor: creditNoteColor }]}>
            <Text style={styles.grandTotalLabel}>Te crediteren</Text>
            <Text style={styles.grandTotalValue}>
              {formatCurrency(creditNote.total, creditNote.currency)}
            </Text>
          </View>
        </View>

        {/* Credit Info */}
        <View style={styles.creditInfoSection}>
          <Text style={styles.creditInfoTitle}>Creditering</Text>
          <Text style={styles.creditInfoDetails}>
            {creditNote.status === "issued" && (
              `Dit bedrag van ${formatCurrency(creditNote.total, creditNote.currency)} wordt verrekend met een openstaande factuur of terugbetaald.\n\n`
            )}
            {creditNote.status === "applied" && creditNote.invoice && (
              `Dit bedrag is verrekend met factuur ${creditNote.invoice.invoiceNumber}.\n\n`
            )}
            {creditNote.status === "refunded" && (
              `Dit bedrag is terugbetaald.\n\n`
            )}
            {branding.iban && `Voor terugbetaling:\nIBAN: ${branding.iban}\n`}
            {branding.bic && `BIC: ${branding.bic}\n`}
            Referentie: {creditNote.creditNoteNumber}
          </Text>
        </View>

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
