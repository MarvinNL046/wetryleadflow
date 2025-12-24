import { NextResponse } from "next/server";
import { stackServerApp } from "@/stack/server";
import { isSuperAdmin } from "@/lib/auth/superadmin";

export async function GET() {
  try {
    const user = await stackServerApp.getUser();
    const adminEmails = process.env.SUPER_ADMIN_EMAILS || "(not set)";

    if (!user) {
      return NextResponse.json({
        isAdmin: false,
        reason: "no_user",
        adminEmailsConfigured: adminEmails !== "(not set)"
      });
    }

    const isAdmin = isSuperAdmin(user.primaryEmail);

    return NextResponse.json({
      isAdmin,
      userEmail: user.primaryEmail,
      adminEmailsConfigured: adminEmails !== "(not set)",
      // Show first 3 chars of configured emails for debugging
      adminEmailsPreview: adminEmails.substring(0, 10) + "..."
    });
  } catch (error) {
    return NextResponse.json({
      isAdmin: false,
      reason: "error",
      error: String(error)
    });
  }
}
