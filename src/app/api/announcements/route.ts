import { NextResponse } from "next/server";
import { getAuthContext } from "@/lib/auth/context";
import { getActiveAnnouncements } from "@/lib/actions/announcements";

export async function GET() {
  try {
    const ctx = await getAuthContext();

    if (!ctx) {
      return NextResponse.json({ announcements: [] });
    }

    // User ID is now retrieved from auth internally
    const announcements = await getActiveAnnouncements({
      orgId: ctx.org?.id,
      agencyId: ctx.org?.agencyId ?? undefined,
    });

    return NextResponse.json({ announcements });
  } catch (error) {
    console.error("[Announcements] Error fetching:", error);
    return NextResponse.json({ announcements: [] });
  }
}
