import { NextRequest, NextResponse } from "next/server";
import { processPendingEvents } from "@/lib/integrations/meta/processor";

// Secret key for job authentication
const JOBS_SECRET_KEY = process.env.JOBS_SECRET_KEY;

/**
 * POST /api/jobs/meta-leads
 * Process pending Meta lead webhook events
 * Called via QStash or cron
 */
export async function POST(request: NextRequest) {
  // Verify authorization
  const authHeader = request.headers.get("authorization");
  const expectedAuth = `Bearer ${JOBS_SECRET_KEY}`;

  // Check for QStash signature or our secret key
  const qstashSignature = request.headers.get("upstash-signature");

  if (!qstashSignature && authHeader !== expectedAuth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await processPendingEvents(50);

    console.log(
      `[Meta Leads Job] Processed ${result.processed} events, ${result.failed} failed`
    );

    return NextResponse.json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.error("[Meta Leads Job] Error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
