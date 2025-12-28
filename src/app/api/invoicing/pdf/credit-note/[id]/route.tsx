import { NextRequest, NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { getCreditNote } from "@/lib/actions/credit-notes";
import { getDocumentBranding } from "@/lib/branding/get-branding";
import { CreditNotePDF } from "@/lib/pdf/credit-note-template";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const creditNoteId = parseInt(id);

    if (isNaN(creditNoteId)) {
      return NextResponse.json(
        { error: "Invalid credit note ID" },
        { status: 400 }
      );
    }

    const creditNote = await getCreditNote(creditNoteId);

    if (!creditNote) {
      return NextResponse.json(
        { error: "Credit note not found" },
        { status: 404 }
      );
    }

    // Get branding for this workspace (includes agency branding if applicable)
    const branding = await getDocumentBranding(creditNote.workspaceId, "creditNote");

    // Generate PDF
    const pdfBuffer = await renderToBuffer(
      <CreditNotePDF creditNote={creditNote as any} branding={branding} />
    );

    // Convert Buffer to Uint8Array for NextResponse
    const uint8Array = new Uint8Array(pdfBuffer);

    // Return PDF
    return new NextResponse(uint8Array, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="${creditNote.creditNoteNumber}.pdf"`,
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    });
  } catch (error) {
    console.error("Failed to generate credit note PDF:", error);
    return NextResponse.json(
      { error: "Failed to generate PDF" },
      { status: 500 }
    );
  }
}
