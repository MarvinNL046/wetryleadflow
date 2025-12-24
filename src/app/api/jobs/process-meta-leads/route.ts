import { NextRequest, NextResponse } from "next/server";
import { verifySignatureAppRouter } from "@upstash/qstash/nextjs";
import { processRawLead, processPendingLeads } from "@/lib/integrations/meta/processor";

/**
 * POST /api/jobs/process-meta-leads
 * Process Meta leads asynchronously
 * Called by QStash or scheduled job
 */
async function handler(request: NextRequest) {
  const startTime = Date.now();

  try {
    const body = await request.json().catch(() => ({}));
    const { rawLeadIds } = body as { rawLeadIds?: number[] };

    let results: { processed: number; failed: number; skipped: number };

    if (rawLeadIds && rawLeadIds.length > 0) {
      // Process specific leads
      results = { processed: 0, failed: 0, skipped: 0 };

      for (const id of rawLeadIds) {
        const result = await processRawLead(id);
        if (result.success) {
          if (result.skipped) {
            results.skipped++;
          } else {
            results.processed++;
          }
        } else {
          results.failed++;
        }
      }

      console.log(
        `[Meta Job] Processed ${rawLeadIds.length} specific leads:`,
        results
      );
    } else {
      // Process all pending leads
      results = await processPendingLeads(50);
      console.log("[Meta Job] Processed pending leads:", results);
    }

    const duration = Date.now() - startTime;

    return NextResponse.json({
      success: true,
      ...results,
      duration,
    });
  } catch (error) {
    console.error("[Meta Job] Error:", error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

// Verify QStash signature in production
export const POST = process.env.NODE_ENV === "production"
  ? verifySignatureAppRouter(handler)
  : handler;
