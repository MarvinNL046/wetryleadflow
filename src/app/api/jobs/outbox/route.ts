import { NextRequest, NextResponse } from "next/server";
import { verifySignatureAppRouter } from "@upstash/qstash/nextjs";
import {
  claimPendingEvents,
  markEventCompleted,
  markEventFailed,
} from "@/lib/outbox";
import { getHandler } from "@/lib/outbox/handlers";
import type { OutboxEvent } from "@/lib/db/schema";

// Process a single event
async function processEvent(event: OutboxEvent): Promise<void> {
  const handler = getHandler(event.eventType);
  await handler(event);
}

// Main job runner
async function runOutboxJob(): Promise<{ processed: number; failed: number }> {
  const events = await claimPendingEvents(10);

  let processed = 0;
  let failed = 0;

  for (const event of events) {
    try {
      await processEvent(event);
      await markEventCompleted(event.id);
      processed++;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      console.error(`[Outbox] Failed to process event ${event.id}:`, errorMessage);
      await markEventFailed(event.id, errorMessage);
      failed++;
    }
  }

  return { processed, failed };
}

// POST handler - called by QStash
async function handler(req: NextRequest) {
  try {
    const result = await runOutboxJob();

    return NextResponse.json({
      success: true,
      ...result,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("[Outbox] Job runner error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}

// Wrap with QStash signature verification for production
// In development, skip verification
export const POST = process.env.NODE_ENV === "production"
  ? verifySignatureAppRouter(handler)
  : handler;

// GET handler for manual triggering (admin only in production)
export async function GET(req: NextRequest) {
  // In production, require a secret key for manual triggers
  if (process.env.NODE_ENV === "production") {
    const authHeader = req.headers.get("authorization");
    const expectedToken = process.env.JOBS_SECRET_KEY;

    if (!expectedToken || authHeader !== `Bearer ${expectedToken}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  try {
    const result = await runOutboxJob();

    return NextResponse.json({
      success: true,
      ...result,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("[Outbox] Job runner error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
