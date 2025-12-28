import { NextRequest, NextResponse } from "next/server";
import { put, del } from "@vercel/blob";
import { requireAuthContext } from "@/lib/auth/context";
import { db } from "@/lib/db";
import { invoiceSettings } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function POST(request: NextRequest) {
  try {
    const ctx = await requireAuthContext();

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "Geen bestand geüpload" },
        { status: 400 }
      );
    }

    // Validate file type
    const validTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp", "image/svg+xml"];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Ongeldig bestandstype. Gebruik PNG, JPG, WebP of SVG." },
        { status: 400 }
      );
    }

    // Validate file size (max 2MB)
    const maxSize = 2 * 1024 * 1024; // 2MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "Bestand is te groot. Maximum is 2MB." },
        { status: 400 }
      );
    }

    // Get current logo to delete later
    const currentSettings = await db.query.invoiceSettings.findFirst({
      where: eq(invoiceSettings.workspaceId, ctx.workspace.id),
    });

    // Upload to Vercel Blob
    const filename = `logos/${ctx.workspace.id}/${Date.now()}-${file.name}`;
    const blob = await put(filename, file, {
      access: "public",
      addRandomSuffix: true,
    });

    // Update database with new logo URL
    if (currentSettings) {
      await db
        .update(invoiceSettings)
        .set({
          companyLogo: blob.url,
          updatedAt: new Date(),
        })
        .where(eq(invoiceSettings.workspaceId, ctx.workspace.id));
    } else {
      // Create settings if not exists
      await db.insert(invoiceSettings).values({
        workspaceId: ctx.workspace.id,
        companyLogo: blob.url,
      });
    }

    // Try to delete old logo from blob storage
    if (currentSettings?.companyLogo?.includes("blob.vercel-storage.com")) {
      try {
        await del(currentSettings.companyLogo);
      } catch (e) {
        // Ignore deletion errors
        console.warn("Could not delete old logo:", e);
      }
    }

    return NextResponse.json({
      success: true,
      url: blob.url,
    });
  } catch (error) {
    console.error("Logo upload failed:", error);
    return NextResponse.json(
      { error: "Upload mislukt. Probeer het opnieuw." },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    const ctx = await requireAuthContext();

    // Get current logo
    const currentSettings = await db.query.invoiceSettings.findFirst({
      where: eq(invoiceSettings.workspaceId, ctx.workspace.id),
    });

    if (currentSettings?.companyLogo) {
      // Try to delete from blob storage
      if (currentSettings.companyLogo.includes("blob.vercel-storage.com")) {
        try {
          await del(currentSettings.companyLogo);
        } catch (e) {
          console.warn("Could not delete logo from blob:", e);
        }
      }

      // Remove from database
      await db
        .update(invoiceSettings)
        .set({
          companyLogo: null,
          updatedAt: new Date(),
        })
        .where(eq(invoiceSettings.workspaceId, ctx.workspace.id));
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Logo delete failed:", error);
    return NextResponse.json(
      { error: "Verwijderen mislukt" },
      { status: 500 }
    );
  }
}
