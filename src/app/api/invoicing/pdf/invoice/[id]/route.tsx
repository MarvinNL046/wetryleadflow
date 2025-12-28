import { NextRequest, NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { getInvoice } from "@/lib/actions/invoicing";
import { getDocumentBranding } from "@/lib/branding/get-branding";
import { InvoicePDF } from "@/lib/pdf/invoice-template";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const invoiceId = parseInt(id);

    if (isNaN(invoiceId)) {
      return NextResponse.json(
        { error: "Invalid invoice ID" },
        { status: 400 }
      );
    }

    const invoice = await getInvoice(invoiceId);

    if (!invoice) {
      return NextResponse.json(
        { error: "Invoice not found" },
        { status: 404 }
      );
    }

    // Get branding for this workspace (includes agency branding if applicable)
    const branding = await getDocumentBranding(invoice.workspaceId, "invoice");

    // Generate PDF
    const pdfBuffer = await renderToBuffer(
      <InvoicePDF invoice={invoice as any} branding={branding} />
    );

    // Convert Buffer to Uint8Array for NextResponse
    const uint8Array = new Uint8Array(pdfBuffer);

    // Return PDF
    return new NextResponse(uint8Array, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="${invoice.invoiceNumber}.pdf"`,
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    });
  } catch (error) {
    console.error("Failed to generate invoice PDF:", error);
    return NextResponse.json(
      { error: "Failed to generate PDF" },
      { status: 500 }
    );
  }
}
