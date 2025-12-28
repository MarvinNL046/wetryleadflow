import { NextResponse } from "next/server";
import { requireAuthContext } from "@/lib/auth/context";
import { db } from "@/lib/db";
import { agencies, invoiceSettings } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const ctx = await requireAuthContext();

    // Check if workspace is under an agency
    const isAgencyClient = !!ctx.org.agencyId;
    let agencyBranding = null;

    if (isAgencyClient && ctx.org.agencyId) {
      // Fetch agency branding
      const agency = await db
        .select({
          name: agencies.name,
          appName: agencies.appName,
          logoUrl: agencies.logoUrl,
          primaryColor: agencies.primaryColor,
          secondaryColor: agencies.secondaryColor,
        })
        .from(agencies)
        .where(eq(agencies.id, ctx.org.agencyId))
        .limit(1);

      if (agency[0]) {
        agencyBranding = agency[0];
      }
    }

    // Fetch workspace invoice settings (for company logo)
    const settings = await db
      .select({
        companyName: invoiceSettings.companyName,
        companyLogo: invoiceSettings.companyLogo,
      })
      .from(invoiceSettings)
      .where(eq(invoiceSettings.workspaceId, ctx.workspace.id))
      .limit(1);

    const workspaceSettings = settings[0];

    // Default LeadFlow branding
    const defaultBranding = {
      appName: "LeadFlow",
      logoUrl: null,
      primaryColor: "#8b5cf6",
      secondaryColor: "#3b82f6",
    };

    // Determine effective branding
    const effectiveBranding = {
      isAgencyClient,
      agencyName: agencyBranding?.name || null,
      appName: agencyBranding?.appName || defaultBranding.appName,
      logoUrl: agencyBranding?.logoUrl || null,
      primaryColor: agencyBranding?.primaryColor || defaultBranding.primaryColor,
      secondaryColor: agencyBranding?.secondaryColor || defaultBranding.secondaryColor,
      companyName: workspaceSettings?.companyName || null,
      companyLogo: workspaceSettings?.companyLogo || null,
    };

    return NextResponse.json(effectiveBranding);
  } catch (error) {
    console.error("Failed to fetch branding:", error);
    return NextResponse.json(
      { error: "Failed to fetch branding" },
      { status: 500 }
    );
  }
}
