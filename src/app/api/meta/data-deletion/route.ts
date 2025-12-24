import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { db } from "@/lib/db";
import {
  metaConnections,
  metaPages,
  metaForms,
  metaLeadRaw,
  leadAttribution,
  contacts,
  leadIngestRoutes,
  leadFieldMappings,
} from "@/lib/db/schema";
import { eq, inArray } from "drizzle-orm";

const APP_SECRET = process.env.META_APP_SECRET;
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://wetryleadflow.com";

/**
 * Parse signed request from Meta
 * https://developers.facebook.com/docs/games/gamesonfacebook/login#parsingsr
 */
function parseSignedRequest(signedRequest: string, secret: string): { user_id: string } | null {
  try {
    const [encodedSig, payload] = signedRequest.split(".");

    if (!encodedSig || !payload) {
      return null;
    }

    // Decode the signature
    const sig = Buffer.from(encodedSig.replace(/-/g, "+").replace(/_/g, "/"), "base64");

    // Decode the payload
    const data = JSON.parse(
      Buffer.from(payload.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString("utf-8")
    );

    // Verify signature
    const expectedSig = crypto
      .createHmac("sha256", secret)
      .update(payload)
      .digest();

    if (!crypto.timingSafeEqual(sig, expectedSig)) {
      console.error("[Meta Data Deletion] Signature verification failed");
      return null;
    }

    return data;
  } catch (error) {
    console.error("[Meta Data Deletion] Error parsing signed request:", error);
    return null;
  }
}

/**
 * POST /api/meta/data-deletion
 *
 * Meta Data Deletion Callback
 * Called by Meta when a user requests deletion of their data
 *
 * https://developers.facebook.com/docs/development/create-an-app/app-dashboard/data-deletion-callback
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const signedRequest = formData.get("signed_request") as string;

    if (!signedRequest) {
      return NextResponse.json(
        { error: "Missing signed_request" },
        { status: 400 }
      );
    }

    if (!APP_SECRET) {
      console.error("[Meta Data Deletion] META_APP_SECRET not configured");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    // Parse and verify the signed request
    const data = parseSignedRequest(signedRequest, APP_SECRET);

    if (!data || !data.user_id) {
      return NextResponse.json(
        { error: "Invalid signed_request" },
        { status: 400 }
      );
    }

    const metaUserId = data.user_id;
    const confirmationCode = crypto.randomBytes(16).toString("hex");

    console.log("[Meta Data Deletion] Processing deletion request for Meta user:", metaUserId);

    // ==============================================
    // STEP 1: Find all connections for this Meta user
    // ==============================================
    const connections = await db.query.metaConnections.findMany({
      where: eq(metaConnections.metaUserId, metaUserId),
    });

    if (connections.length === 0) {
      console.log("[Meta Data Deletion] No connections found for user:", metaUserId);
      // Still return success - user may not have data with us
      return NextResponse.json({
        url: `${APP_URL}/data-deletion/status?code=${confirmationCode}`,
        confirmation_code: confirmationCode,
      });
    }

    const connectionIds = connections.map(c => c.id);
    console.log(`[Meta Data Deletion] Found ${connections.length} connections`);

    // ==============================================
    // STEP 2: Find all pages for these connections
    // ==============================================
    const pages = await db.query.metaPages.findMany({
      where: inArray(metaPages.connectionId, connectionIds),
    });

    const pageIds = pages.map(p => p.pageId);
    const pageDbIds = pages.map(p => p.id);
    console.log(`[Meta Data Deletion] Found ${pages.length} pages`);

    // ==============================================
    // STEP 3: Find contacts that came from these pages
    // ==============================================
    let contactsToDelete: number[] = [];

    if (pageIds.length > 0) {
      const attributions = await db.query.leadAttribution.findMany({
        where: inArray(leadAttribution.metaPageId, pageIds),
      });
      contactsToDelete = attributions.map(a => a.contactId);
      console.log(`[Meta Data Deletion] Found ${contactsToDelete.length} contacts to delete`);
    }

    // ==============================================
    // STEP 4: Delete data in correct order (foreign keys)
    // ==============================================
    const deletedCounts = {
      contacts: 0,
      leadAttribution: 0,
      metaLeadRaw: 0,
      leadFieldMappings: 0,
      leadIngestRoutes: 0,
      metaForms: 0,
      metaPages: 0,
      metaConnections: 0,
    };

    // 4a. Delete contacts (this cascades to lead_attribution, notes, opportunities)
    if (contactsToDelete.length > 0) {
      await db.delete(contacts).where(inArray(contacts.id, contactsToDelete));
      deletedCounts.contacts = contactsToDelete.length;
    }

    // 4b. Delete raw lead data
    if (pageIds.length > 0) {
      await db.delete(metaLeadRaw).where(inArray(metaLeadRaw.pageId, pageIds));
    }

    // 4c. Delete lead ingest routes and field mappings
    if (pageDbIds.length > 0) {
      // First find routes
      const routes = await db.query.leadIngestRoutes.findMany({
        where: inArray(leadIngestRoutes.metaPageId, pageDbIds),
      });

      if (routes.length > 0) {
        const routeIds = routes.map(r => r.id);
        // Delete field mappings
        await db.delete(leadFieldMappings).where(inArray(leadFieldMappings.routeId, routeIds));
        // Delete routes
        await db.delete(leadIngestRoutes).where(inArray(leadIngestRoutes.id, routeIds));
        deletedCounts.leadIngestRoutes = routes.length;
      }
    }

    // 4d. Delete meta forms
    if (pageDbIds.length > 0) {
      await db.delete(metaForms).where(inArray(metaForms.pageId, pageDbIds));
    }

    // 4e. Delete meta pages
    if (connectionIds.length > 0) {
      await db.delete(metaPages).where(inArray(metaPages.connectionId, connectionIds));
      deletedCounts.metaPages = pages.length;
    }

    // 4f. Delete meta connections
    await db.delete(metaConnections).where(eq(metaConnections.metaUserId, metaUserId));
    deletedCounts.metaConnections = connections.length;

    // ==============================================
    // STEP 5: Log the deletion for compliance
    // ==============================================
    console.log("[Meta Data Deletion] Deletion completed:", {
      metaUserId,
      confirmationCode,
      timestamp: new Date().toISOString(),
      deletedCounts,
    });

    // Return the required response format
    // Meta expects a URL where users can check their deletion status
    const statusUrl = `${APP_URL}/data-deletion/status?code=${confirmationCode}`;

    return NextResponse.json({
      url: statusUrl,
      confirmation_code: confirmationCode,
    });
  } catch (error) {
    console.error("[Meta Data Deletion] Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/meta/data-deletion
 *
 * Health check / info endpoint
 */
export async function GET() {
  return NextResponse.json({
    endpoint: "Meta Data Deletion Callback",
    method: "POST",
    description: "This endpoint receives data deletion requests from Meta",
    status: "active",
    privacy_policy: `${APP_URL}/privacy`,
    data_deletion_instructions: `${APP_URL}/data-deletion`,
  });
}
