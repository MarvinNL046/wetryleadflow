import { NextRequest, NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { getCreditNote, getInvoiceSettingsForCreditNote } from "@/lib/actions/credit-notes";
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

    const [creditNote, settings] = await Promise.all([
      getCreditNote(creditNoteId),
      getInvoiceSettingsForCreditNote(),
    ]);

    if (!creditNote) {
      return NextResponse.json(
        { error: "Credit note not found" },
        { status: 404 }
      );
    }

    // Generate PDF
    const pdfBuffer = await renderToBuffer(
      <CreditNotePDF creditNote={creditNote as any} settings={settings || {}} />
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
