import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { webhookEvents, metaPages, metaLeadRaw } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { Client } from "@upstash/qstash";

// Verify token for Meta webhook subscription
const VERIFY_TOKEN = process.env.META_WEBHOOK_VERIFY_TOKEN;
const APP_URL = process.env.NEXT_PUBLIC_APP_URL;

// QStash client for async processing
const qstash = process.env.QSTASH_TOKEN
  ? new Client({ token: process.env.QSTASH_TOKEN })
  : null;

/**
 * GET /api/webhooks/meta
 * Meta webhook verification (challenge-response)
 * Called by Meta when setting up the webhook subscription
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  // Check if this is a subscription verification
  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("[Meta Webhook] Verification successful");
    // Return the challenge as plain text
    return new NextResponse(challenge, {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });
  }

  console.log("[Meta Webhook] Verification failed");
  return NextResponse.json({ error: "Verification failed" }, { status: 403 });
}

/**
 * POST /api/webhooks/meta
 * Receive webhook events from Meta
 * Must respond quickly (< 20s) to avoid retries
 */
export async function POST(request: NextRequest) {
  const startTime = Date.now();

  try {
    const body = await request.json();

    // Meta sends events in batches within an "entry" array
    const { object, entry } = body;

    // Only process page events
    if (object !== "page") {
      console.log("[Meta Webhook] Ignoring non-page event:", object);
      return NextResponse.json({ received: true });
    }

    const eventsToProcess: number[] = [];

    // Process each entry
    for (const pageEntry of entry || []) {
      const pageId = pageEntry.id;
      const changes = pageEntry.changes || [];

      // Find the org for this page
      const page = await db.query.metaPages.findFirst({
        where: eq(metaPages.pageId, pageId),
        columns: { orgId: true },
      });

      if (!page) {
        console.log("[Meta Webhook] Unknown page, skipping:", pageId);
        continue;
      }

      for (const change of changes) {
        // We're interested in leadgen events
        if (change.field === "leadgen") {
          const leadgenId = change.value?.leadgen_id;
          const formId = change.value?.form_id;
          const adgroupId = change.value?.adgroup_id;
          const adId = change.value?.ad_id;
          const campaignId = change.value?.campaign_id;

          if (!leadgenId) {
            console.log("[Meta Webhook] Missing leadgen_id in event");
            continue;
          }

          // Idempotency check via metaLeadRaw
          const existingLead = await db.query.metaLeadRaw.findFirst({
            where: eq(metaLeadRaw.leadgenId, leadgenId),
            columns: { id: true },
          });

          if (existingLead) {
            console.log("[Meta Webhook] Duplicate lead, skipping:", leadgenId);
            continue;
          }

          // Store in metaLeadRaw for reliable processing
          const [rawLead] = await db
            .insert(metaLeadRaw)
            .values({
              orgId: page.orgId,
              leadgenId,
              pageId,
              formId,
              adId,
              adgroupId,
              campaignId,
              payload: {
                pageId,
                formId,
                leadgenId,
                adgroupId,
                adId,
                campaignId,
                rawEntry: pageEntry,
              },
              status: "pending",
            })
            .returning();

          eventsToProcess.push(rawLead.id);

          // Also store in webhookEvents for audit trail
          await db.insert(webhookEvents).values({
            provider: "meta",
            externalEventId: leadgenId,
            eventType: "leadgen",
            payload: {
              pageId,
              formId,
              leadgenId,
              adgroupId,
              adId,
              campaignId,
              rawLeadId: rawLead.id,
            },
            status: "received",
            attempts: 0,
          });

          console.log("[Meta Webhook] Stored lead:", leadgenId, "rawLeadId:", rawLead.id);
        }
      }

      // Also check for messaging events (leadgen can come via messaging too)
      const messaging = pageEntry.messaging || [];
      for (const msg of messaging) {
        if (msg.leadgen) {
          const leadgenId = msg.leadgen.leadgen_id;

          if (!leadgenId) continue;

          // Same idempotency check
          const existingLead = await db.query.metaLeadRaw.findFirst({
            where: eq(metaLeadRaw.leadgenId, leadgenId),
            columns: { id: true },
          });

          if (existingLead) {
            console.log("[Meta Webhook] Duplicate messaging lead, skipping:", leadgenId);
            continue;
          }

          const [rawLead] = await db
            .insert(metaLeadRaw)
            .values({
              orgId: page.orgId,
              leadgenId,
              pageId,
              payload: {
                pageId,
                leadgenId,
                via: "messaging",
                rawEntry: pageEntry,
              },
              status: "pending",
            })
            .returning();

          eventsToProcess.push(rawLead.id);

          await db.insert(webhookEvents).values({
            provider: "meta",
            externalEventId: leadgenId,
            eventType: "leadgen",
            payload: {
              pageId,
              leadgenId,
              via: "messaging",
              rawLeadId: rawLead.id,
            },
            status: "received",
            attempts: 0,
          });

          console.log("[Meta Webhook] Stored messaging lead:", leadgenId);
        }
      }
    }

    // Trigger async processing via QStash if available
    if (eventsToProcess.length > 0 && qstash && APP_URL) {
      try {
        await qstash.publishJSON({
          url: `${APP_URL}/api/jobs/process-meta-leads`,
          body: { rawLeadIds: eventsToProcess },
          retries: 3,
        });
        console.log("[Meta Webhook] Enqueued", eventsToProcess.length, "leads for processing");
      } catch (qstashError) {
        // Log but don't fail - leads will be picked up by scheduled job
        console.error("[Meta Webhook] QStash enqueue failed:", qstashError);
      }
    }

    const duration = Date.now() - startTime;
    console.log("[Meta Webhook] Processed in", duration, "ms");

    // Always respond quickly with 200 to acknowledge receipt
    return NextResponse.json({ received: true, count: eventsToProcess.length });
  } catch (error) {
    console.error("[Meta Webhook] Error processing event:", error);

    // Still return 200 to prevent Meta from retrying
    // We'll handle errors in our own retry mechanism
    return NextResponse.json({ received: true, error: "Internal processing error" });
  }
}
