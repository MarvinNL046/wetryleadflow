import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import { format } from "date-fns";
import { nl } from "date-fns/locale";

// Register fonts (using default for now)
Font.register({
  family: "Helvetica",
  fonts: [
    { src: "Helvetica" },
    { src: "Helvetica-Bold", fontWeight: "bold" },
  ],
});

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
  companyName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#7c3aed",
  },
  companyDetails: {
    fontSize: 9,
    color: "#6b7280",
    lineHeight: 1.4,
  },
  invoiceInfo: {
    textAlign: "right",
  },
  invoiceTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#1f2937",
  },
  invoiceNumber: {
    fontSize: 11,
    marginBottom: 4,
  },
  invoiceDate: {
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
    backgroundColor: "#7c3aed",
    padding: 10,
    borderRadius: 4,
    marginBottom: 2,
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
    backgroundColor: "#7c3aed",
    borderRadius: 4,
    paddingHorizontal: 10,
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
  paymentSection: {
    marginTop: 30,
    padding: 15,
    backgroundColor: "#f0fdf4",
    borderRadius: 4,
  },
  paymentTitle: {
    fontSize: 10,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#166534",
  },
  paymentDetails: {
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

interface InvoiceData {
  id: number;
  invoiceNumber: string;
  status: string;
  issueDate: Date;
  dueDate: Date;
  paymentTerms: number;
  currency: string;
  title?: string | null;
  introduction?: string | null;
  terms?: string | null;
  subtotal: string;
  taxAmount: string;
  discountAmount?: string | null;
  total: string;
  amountPaid?: string | null;
  amountDue?: string | null;
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

interface InvoiceSettings {
  companyName?: string | null;
  companyAddress?: string | null;
  companyEmail?: string | null;
  companyPhone?: string | null;
  companyWebsite?: string | null;
  kvkNumber?: string | null;
  vatNumber?: string | null;
  iban?: string | null;
  bic?: string | null;
  defaultFooter?: string | null;
}

interface InvoicePDFProps {
  invoice: InvoiceData;
  settings: InvoiceSettings;
}

export function InvoicePDF({ invoice, settings }: InvoicePDFProps) {
  const customerName =
    invoice.contact?.company ||
    `${invoice.contact?.firstName ?? ""} ${invoice.contact?.lastName ?? ""}`.trim();

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.companyInfo}>
            <Text style={styles.companyName}>
              {settings.companyName || "LeadFlow"}
            </Text>
            <Text style={styles.companyDetails}>
              {settings.companyAddress && `${settings.companyAddress}\n`}
              {settings.companyEmail && `${settings.companyEmail}\n`}
              {settings.companyPhone && `${settings.companyPhone}\n`}
              {settings.companyWebsite && settings.companyWebsite}
            </Text>
          </View>
          <View style={styles.invoiceInfo}>
            <Text style={styles.invoiceTitle}>FACTUUR</Text>
            <Text style={styles.invoiceNumber}>{invoice.invoiceNumber}</Text>
            <Text style={styles.invoiceDate}>
              Datum: {format(new Date(invoice.issueDate), "d MMMM yyyy", { locale: nl })}
            </Text>
            <Text style={styles.invoiceDate}>
              Vervaldatum: {format(new Date(invoice.dueDate), "d MMMM yyyy", { locale: nl })}
            </Text>
          </View>
        </View>

        {/* Customer */}
        <View style={styles.customerSection}>
          <Text style={styles.customerLabel}>Factuuradres</Text>
          <Text style={styles.customerName}>{customerName}</Text>
          <Text style={styles.customerDetails}>
            {invoice.contact?.address && `${invoice.contact.address}\n`}
            {invoice.contact?.email && `${invoice.contact.email}\n`}
            {invoice.contact?.phone && invoice.contact.phone}
          </Text>
        </View>

        {/* Introduction */}
        {invoice.introduction && (
          <View style={styles.contentSection}>
            <Text style={styles.contentText}>{invoice.introduction}</Text>
          </View>
        )}

        {/* Line Items Table */}
        <View style={styles.table}>
          <View style={styles.tableHeader}>
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
          {invoice.lineItems.map((item, index) => (
            <View
              key={item.id}
              style={[styles.tableRow, index % 2 === 1 ? styles.tableRowAlt : {}]}
            >
              <Text style={styles.colDescription}>{item.description}</Text>
              <Text style={styles.colQuantity}>
                {item.quantity} {item.unit}
              </Text>
              <Text style={styles.colPrice}>{formatCurrency(item.unitPrice, invoice.currency)}</Text>
              <Text style={styles.colTax}>{item.taxRate}%</Text>
              <Text style={styles.colTotal}>{formatCurrency(item.total, invoice.currency)}</Text>
            </View>
          ))}
        </View>

        {/* Totals */}
        <View style={styles.totalsSection}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Subtotaal</Text>
            <Text style={styles.totalValue}>
              {formatCurrency(invoice.subtotal, invoice.currency)}
            </Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>BTW</Text>
            <Text style={styles.totalValue}>
              {formatCurrency(invoice.taxAmount, invoice.currency)}
            </Text>
          </View>
          {parseFloat(invoice.discountAmount ?? "0") > 0 && (
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Korting</Text>
              <Text style={styles.totalValue}>
                -{formatCurrency(invoice.discountAmount!, invoice.currency)}
              </Text>
            </View>
          )}
          <View style={styles.grandTotalRow}>
            <Text style={styles.grandTotalLabel}>Totaal</Text>
            <Text style={styles.grandTotalValue}>
              {formatCurrency(invoice.total, invoice.currency)}
            </Text>
          </View>
        </View>

        {/* Payment Info */}
        <View style={styles.paymentSection}>
          <Text style={styles.paymentTitle}>Betalingsgegevens</Text>
          <Text style={styles.paymentDetails}>
            Gelieve het bedrag van {formatCurrency(invoice.total, invoice.currency)} over te maken
            binnen {invoice.paymentTerms} dagen.
            {"\n\n"}
            {settings.iban && `IBAN: ${settings.iban}\n`}
            {settings.bic && `BIC: ${settings.bic}\n`}
            O.v.v.: {invoice.invoiceNumber}
          </Text>
        </View>

        {/* Terms */}
        {invoice.terms && (
          <View style={styles.contentSection}>
            <Text style={styles.contentLabel}>Voorwaarden</Text>
            <Text style={styles.contentText}>{invoice.terms}</Text>
          </View>
        )}

        {/* Footer */}
        <View style={styles.footer}>
          <Text>
            {settings.companyName || "LeadFlow"}
            {settings.kvkNumber && ` | KVK: ${settings.kvkNumber}`}
            {settings.vatNumber && ` | BTW: ${settings.vatNumber}`}
          </Text>
          {settings.defaultFooter && <Text>{settings.defaultFooter}</Text>}
        </View>
      </Page>
    </Document>
  );
}
