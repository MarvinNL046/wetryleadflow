import { NextResponse } from "next/server";
import { stackServerApp } from "@/stack/server";
import { isSuperAdmin } from "@/lib/auth/superadmin";

export async function GET() {
  try {
    const user = await stackServerApp.getUser();

    if (!user) {
      return NextResponse.json({ isAdmin: false });
    }

    const isAdmin = isSuperAdmin(user.primaryEmail);

    return NextResponse.json({ isAdmin });
  } catch {
    return NextResponse.json({ isAdmin: false });
  }
}
