import { NextRequest, NextResponse } from "next/server";
import { requireAuthContext } from "@/lib/auth/context";
import { randomBytes } from "crypto";
import { cookies } from "next/headers";

const META_APP_ID = process.env.META_APP_ID;
const OAUTH_REDIRECT_URI = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/meta/callback`;

// Required permissions for Lead Ads
// Note: In development mode, these only work for app admins/developers/testers
// For production, these need to be approved via App Review
const SCOPES = [
  "pages_show_list",        // List pages user manages
  "pages_read_engagement",  // Read page content
  "leads_retrieval",        // Access lead data from Lead Ads
  "pages_manage_ads",       // Manage ads on pages
  "business_management",    // Access business assets
].join(",");

/**
 * GET /api/auth/meta/connect
 * Initiates Meta OAuth flow
 */
export async function GET(request: NextRequest) {
  try {
    // Require authentication
    const ctx = await requireAuthContext();

    if (!META_APP_ID) {
      return NextResponse.json(
        { error: "Meta integration is not configured" },
        { status: 500 }
      );
    }

    // Generate state for CSRF protection
    const state = randomBytes(32).toString("hex");

    // Store state and org info in a secure cookie
    const stateData = JSON.stringify({
      state,
      orgId: ctx.org.id,
      userId: ctx.user.id,
      returnUrl: request.nextUrl.searchParams.get("returnUrl") || "/settings/integrations",
    });

    const cookieStore = await cookies();
    cookieStore.set("meta_oauth_state", stateData, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 10, // 10 minutes
      path: "/",
    });

    // Build Facebook OAuth URL
    const authUrl = new URL("https://www.facebook.com/v21.0/dialog/oauth");
    authUrl.searchParams.set("client_id", META_APP_ID);
    authUrl.searchParams.set("redirect_uri", OAUTH_REDIRECT_URI);
    authUrl.searchParams.set("scope", SCOPES);
    authUrl.searchParams.set("state", state);
    authUrl.searchParams.set("response_type", "code");

    console.log("[Meta OAuth] Redirecting to Facebook login for org:", ctx.org.id);

    return NextResponse.redirect(authUrl.toString());
  } catch (error) {
    console.error("[Meta OAuth] Error initiating connection:", error);
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/settings/integrations?error=auth_failed`
    );
  }
}
