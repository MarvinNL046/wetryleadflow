import { NextRequest, NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { getQuotation } from "@/lib/actions/invoicing";
import { getDocumentBranding } from "@/lib/branding/get-branding";
import { QuotationPDF } from "@/lib/pdf/quotation-template";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const quotationId = parseInt(id);

    if (isNaN(quotationId)) {
      return NextResponse.json(
        { error: "Invalid quotation ID" },
        { status: 400 }
      );
    }

    const quotation = await getQuotation(quotationId);

    if (!quotation) {
      return NextResponse.json(
        { error: "Quotation not found" },
        { status: 404 }
      );
    }

    // Get branding for this workspace (includes agency branding if applicable)
    const branding = await getDocumentBranding(quotation.workspaceId, "quotation");

    // Generate PDF
    const pdfBuffer = await renderToBuffer(
      <QuotationPDF quotation={quotation as any} branding={branding} />
    );

    // Convert Buffer to Uint8Array for NextResponse
    const uint8Array = new Uint8Array(pdfBuffer);

    // Return PDF
    return new NextResponse(uint8Array, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="${quotation.quotationNumber}.pdf"`,
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    });
  } catch (error) {
    console.error("Failed to generate quotation PDF:", error);
    return NextResponse.json(
      { error: "Failed to generate PDF" },
      { status: 500 }
    );
  }
}
