import { NextRequest, NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { requireAuthContext } from "@/lib/auth/context";
import { getDocumentBranding, DocumentType } from "@/lib/branding/get-branding";
import { InvoicePDF } from "@/lib/pdf/invoice-template";
import { QuotationPDF } from "@/lib/pdf/quotation-template";

// Sample data for preview
const sampleInvoice = {
  id: 0,
  invoiceNumber: "FAC-2025-0001",
  invoiceDate: new Date().toISOString(),
  dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
  status: "draft" as const,
  subtotal: "1500.00",
  taxAmount: "315.00",
  total: "1815.00",
  paidAmount: "0.00",
  notes: null,
  terms: null,
  reference: "Voorbeeld factuur",
  contact: {
    id: 0,
    firstName: "Jan",
    lastName: "de Vries",
    email: "jan@voorbeeld.nl",
    company: "Voorbeeld BV",
  },
  items: [
    {
      id: 1,
      description: "Consultancy diensten",
      quantity: "10",
      unitPrice: "100.00",
      taxRate: "21",
      total: "1000.00",
    },
    {
      id: 2,
      description: "Software licentie",
      quantity: "1",
      unitPrice: "500.00",
      taxRate: "21",
      total: "500.00",
    },
  ],
};

const sampleQuotation = {
  id: 0,
  quotationNumber: "OFF-2025-0001",
  quotationDate: new Date().toISOString(),
  validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
  status: "draft" as const,
  subtotal: "2500.00",
  taxAmount: "525.00",
  total: "3025.00",
  notes: null,
  terms: null,
  reference: "Voorbeeld offerte",
  introduction: "Graag bieden wij u het volgende aan:",
  contact: {
    id: 0,
    firstName: "Jan",
    lastName: "de Vries",
    email: "jan@voorbeeld.nl",
    company: "Voorbeeld BV",
  },
  items: [
    {
      id: 1,
      description: "Website redesign",
      quantity: "1",
      unitPrice: "2000.00",
      taxRate: "21",
      total: "2000.00",
    },
    {
      id: 2,
      description: "Hosting (12 maanden)",
      quantity: "12",
      unitPrice: "41.67",
      taxRate: "21",
      total: "500.00",
    },
  ],
};

export async function GET(request: NextRequest) {
  try {
    const ctx = await requireAuthContext();
    const { searchParams } = new URL(request.url);
    const type = (searchParams.get("type") || "invoice") as DocumentType;

    // Get branding for this workspace
    const branding = await getDocumentBranding(ctx.workspace.id, type);

    // Generate PDF based on type
    let pdfBuffer: Buffer;
    let filename: string;

    if (type === "quotation") {
      pdfBuffer = await renderToBuffer(
        <QuotationPDF quotation={sampleQuotation as any} branding={branding} />
      );
      filename = "voorbeeld-offerte.pdf";
    } else {
      pdfBuffer = await renderToBuffer(
        <InvoicePDF invoice={sampleInvoice as any} branding={branding} />
      );
      filename = "voorbeeld-factuur.pdf";
    }

    const uint8Array = new Uint8Array(pdfBuffer);

    return new NextResponse(uint8Array, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="${filename}"`,
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    });
  } catch (error) {
    console.error("Preview PDF failed:", error);
    return NextResponse.json(
      { error: "Preview genereren mislukt" },
      { status: 500 }
    );
  }
}
