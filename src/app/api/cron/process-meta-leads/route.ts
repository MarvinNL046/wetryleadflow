import { NextRequest, NextResponse } from "next/server";
import {
  processPendingLeads,
  getProcessingStats,
  recoverStaleProcessingLeads,
} from "@/lib/integrations/meta/processor";

// Verify cron secret for security
const CRON_SECRET = process.env.CRON_SECRET;

/**
 * GET /api/cron/process-meta-leads
 * Scheduled job to process pending/failed Meta leads
 *
 * Can be triggered by:
 * - Vercel Cron (vercel.json)
 * - QStash Scheduler
 * - External cron service (e.g., cron-job.org)
 *
 * Security: Requires CRON_SECRET header for authentication
 */
export async function GET(request: NextRequest) {
  const startTime = Date.now();

  // Verify authorization
  const authHeader = request.headers.get("authorization");
  const cronHeader = request.headers.get("x-cron-secret");

  // Accept either Bearer token or custom header
  const providedSecret = authHeader?.replace("Bearer ", "") || cronHeader;

  // In production, require secret. In development, allow without secret for testing
  if (process.env.NODE_ENV === "production" && CRON_SECRET) {
    if (providedSecret !== CRON_SECRET) {
      console.log("[Meta Cron] Unauthorized request");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  try {
    console.log("[Meta Cron] Starting scheduled lead processing...");

    // First, recover any stale processing leads
    const recovered = await recoverStaleProcessingLeads();

    // Process pending leads with batch size of 100
    const results = await processPendingLeads(100);

    // Get stats for monitoring
    const stats = await getProcessingStats();

    const duration = Date.now() - startTime;

    console.log("[Meta Cron] Completed in", duration, "ms:", results);

    return NextResponse.json({
      success: true,
      ...results,
      recovered: recovered.recovered,
      stats,
      duration,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("[Meta Cron] Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : String(error),
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/cron/process-meta-leads
 * Alternative endpoint for services that prefer POST (like QStash)
 */
export async function POST(request: NextRequest) {
  return GET(request);
}
