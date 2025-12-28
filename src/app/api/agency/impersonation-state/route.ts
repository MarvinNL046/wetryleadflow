import { NextResponse } from "next/server";
import { getAgencyClientImpersonationState } from "@/lib/auth/agency-client-impersonate";

export async function GET() {
  try {
    const state = await getAgencyClientImpersonationState();
    return NextResponse.json({ state });
  } catch {
    return NextResponse.json({ state: null });
  }
}
