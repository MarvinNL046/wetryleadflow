import { NextRequest, NextResponse } from "next/server";
import { verifySignatureAppRouter } from "@upstash/qstash/nextjs";
import { processFollowUps } from "@/lib/actions/crm";

// Main job runner
async function runFollowUpJob() {
  const result = await processFollowUps();

  console.log(
    `[Follow-ups] Processed: ${result.processed}, ` +
    `Moved to Lead: ${result.movedToLead}, ` +
    `Moved to Lost: ${result.movedToLost}, ` +
    `Skipped (disabled): ${result.skippedDisabled}`
  );

  return result;
}

// POST handler - called by QStash cron
async function handler(_req: NextRequest) {
  try {
    const result = await runFollowUpJob();

    return NextResponse.json({
      success: true,
      ...result,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("[Follow-ups] Job runner error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// Wrap with QStash signature verification for production
export const POST =
  process.env.NODE_ENV === "production"
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
    const result = await runFollowUpJob();

    return NextResponse.json({
      success: true,
      ...result,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("[Follow-ups] Job runner error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
