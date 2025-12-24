import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/lib/db";
import { metaConnections, metaPages } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { encryptToken } from "@/lib/crypto";
import {
  exchangeForLongLivedToken,
  fetchUserPages,
  subscribePageToLeadgen,
} from "@/lib/integrations/meta/client";

const META_APP_ID = process.env.META_APP_ID;
const META_APP_SECRET = process.env.META_APP_SECRET;
const OAUTH_REDIRECT_URI = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/meta/callback`;

interface StateData {
  state: string;
  orgId: number;
  userId: number;
  returnUrl: string;
}

/**
 * GET /api/auth/meta/callback
 * Handles OAuth callback from Meta
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");
  const errorDescription = searchParams.get("error_description");

  // Handle errors from Meta
  if (error) {
    console.error("[Meta OAuth] Error from Meta:", error, errorDescription);
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/settings/integrations?error=${encodeURIComponent(error)}`
    );
  }

  if (!code || !state) {
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/settings/integrations?error=missing_params`
    );
  }

  try {
    // Verify state from cookie
    const cookieStore = await cookies();
    const stateCookie = cookieStore.get("meta_oauth_state");

    if (!stateCookie?.value) {
      console.error("[Meta OAuth] Missing state cookie");
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/settings/integrations?error=invalid_state`
      );
    }

    const stateData: StateData = JSON.parse(stateCookie.value);

    if (stateData.state !== state) {
      console.error("[Meta OAuth] State mismatch");
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/settings/integrations?error=invalid_state`
      );
    }

    // Clear the state cookie
    cookieStore.delete("meta_oauth_state");

    // Exchange code for access token
    const tokenUrl = new URL("https://graph.facebook.com/v21.0/oauth/access_token");
    tokenUrl.searchParams.set("client_id", META_APP_ID!);
    tokenUrl.searchParams.set("client_secret", META_APP_SECRET!);
    tokenUrl.searchParams.set("redirect_uri", OAUTH_REDIRECT_URI);
    tokenUrl.searchParams.set("code", code);

    const tokenResponse = await fetch(tokenUrl.toString());
    const tokenData = await tokenResponse.json();

    if (tokenData.error) {
      console.error("[Meta OAuth] Token exchange error:", tokenData.error);
      throw new Error(tokenData.error.message || "Token exchange failed");
    }

    const shortLivedToken = tokenData.access_token;

    // Exchange for long-lived token (~60 days)
    const longLivedData = await exchangeForLongLivedToken(shortLivedToken);
    const longLivedToken = longLivedData.access_token;
    const expiresIn = longLivedData.expires_in; // seconds

    // Get user info
    const userInfoUrl = new URL("https://graph.facebook.com/v21.0/me");
    userInfoUrl.searchParams.set("access_token", longLivedToken);
    userInfoUrl.searchParams.set("fields", "id,name");

    const userInfoResponse = await fetch(userInfoUrl.toString());
    const userInfo = await userInfoResponse.json();

    if (userInfo.error) {
      throw new Error(userInfo.error.message || "Failed to get user info");
    }

    console.log("[Meta OAuth] User authenticated:", userInfo.name, userInfo.id);

    // Check if connection already exists for this org
    const existingConnection = await db.query.metaConnections.findFirst({
      where: and(
        eq(metaConnections.orgId, stateData.orgId),
        eq(metaConnections.metaUserId, userInfo.id)
      ),
    });

    let connectionId: number;

    if (existingConnection) {
      // Update existing connection
      await db
        .update(metaConnections)
        .set({
          accessTokenEncrypted: encryptToken(longLivedToken),
          tokenExpiresAt: expiresIn
            ? new Date(Date.now() + expiresIn * 1000)
            : null,
          metaUserName: userInfo.name,
          isActive: true,
          updatedAt: new Date(),
        })
        .where(eq(metaConnections.id, existingConnection.id));

      connectionId = existingConnection.id;
      console.log("[Meta OAuth] Updated existing connection:", connectionId);
    } else {
      // Create new connection
      const [newConnection] = await db
        .insert(metaConnections)
        .values({
          orgId: stateData.orgId,
          metaUserId: userInfo.id,
          metaUserName: userInfo.name,
          accessTokenEncrypted: encryptToken(longLivedToken),
          tokenExpiresAt: expiresIn
            ? new Date(Date.now() + expiresIn * 1000)
            : null,
          scopes: "pages_show_list,pages_read_engagement,leads_retrieval,pages_manage_ads,business_management",
          isActive: true,
        })
        .returning();

      connectionId = newConnection.id;
      console.log("[Meta OAuth] Created new connection:", connectionId);
    }

    // Fetch user's pages
    const pages = await fetchUserPages(longLivedToken);
    console.log("[Meta OAuth] Found", pages.length, "pages");

    // Store pages (page tokens from long-lived user token never expire)
    for (const page of pages) {
      if (!page.access_token) continue;

      const existingPage = await db.query.metaPages.findFirst({
        where: and(
          eq(metaPages.orgId, stateData.orgId),
          eq(metaPages.pageId, page.id)
        ),
      });

      if (existingPage) {
        // Update existing page
        await db
          .update(metaPages)
          .set({
            connectionId,
            pageName: page.name,
            pageAccessTokenEncrypted: encryptToken(page.access_token),
            isActive: true,
            updatedAt: new Date(),
          })
          .where(eq(metaPages.id, existingPage.id));
      } else {
        // Create new page
        await db.insert(metaPages).values({
          orgId: stateData.orgId,
          connectionId,
          pageId: page.id,
          pageName: page.name,
          pageAccessTokenEncrypted: encryptToken(page.access_token),
          subscribedToLeadgen: false,
          isActive: true,
        });
      }

      // Subscribe page to leadgen webhooks
      try {
        await subscribePageToLeadgen(page.id, page.access_token);
        await db
          .update(metaPages)
          .set({
            subscribedToLeadgen: true,
            webhookSubscribedAt: new Date(),
          })
          .where(
            and(
              eq(metaPages.orgId, stateData.orgId),
              eq(metaPages.pageId, page.id)
            )
          );
        console.log("[Meta OAuth] Subscribed page to leadgen:", page.name);
      } catch (subError) {
        console.error("[Meta OAuth] Failed to subscribe page:", page.name, subError);
        // Continue - page is still saved, subscription can be retried
      }
    }

    console.log("[Meta OAuth] Connection complete for org:", stateData.orgId);

    // Redirect back to integrations page with success
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}${stateData.returnUrl}?meta=connected`
    );
  } catch (error) {
    console.error("[Meta OAuth] Callback error:", error);
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/settings/integrations?error=connection_failed`
    );
  }
}
