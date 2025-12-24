import { db } from "@/lib/db";
import { aiInsightsCache, type AiInsightsCache, type NewAiInsightsCache } from "@/lib/db/schema";
import { eq, and, gt, desc, sql } from "drizzle-orm";
import { getCacheTTLMs, type InsightType } from "./config";

/**
 * AI Insights Cache Utilities
 *
 * Provides database-based caching for AI insights with automatic
 * expiration and status management.
 */

/**
 * Get a valid cached insight for a workspace.
 * Returns null if no valid cache exists or if it's expired.
 */
export async function getCachedInsight<T = unknown>(
  workspaceId: number,
  insightType: InsightType
): Promise<{ data: T; generatedAt: Date; id: number } | null> {
  const now = new Date();

  const [cached] = await db
    .select()
    .from(aiInsightsCache)
    .where(
      and(
        eq(aiInsightsCache.workspaceId, workspaceId),
        eq(aiInsightsCache.insightType, insightType),
        eq(aiInsightsCache.status, "valid"),
        gt(aiInsightsCache.expiresAt, now)
      )
    )
    .orderBy(desc(aiInsightsCache.generatedAt))
    .limit(1);

  if (!cached) {
    return null;
  }

  return {
    data: cached.data as T,
    generatedAt: cached.generatedAt,
    id: cached.id,
  };
}

/**
 * Store a new insight in the cache.
 */
export async function cacheInsight<T>(
  workspaceId: number,
  insightType: InsightType,
  data: T,
  tokenUsage?: { inputTokens: number; outputTokens: number }
): Promise<AiInsightsCache> {
  const now = new Date();
  const ttlMs = getCacheTTLMs(insightType);
  const expiresAt = new Date(now.getTime() + ttlMs);

  // Invalidate old caches for this workspace/type
  await db
    .update(aiInsightsCache)
    .set({ status: "stale", updatedAt: now })
    .where(
      and(
        eq(aiInsightsCache.workspaceId, workspaceId),
        eq(aiInsightsCache.insightType, insightType),
        eq(aiInsightsCache.status, "valid")
      )
    );

  // Insert new cache entry
  const [newCache] = await db
    .insert(aiInsightsCache)
    .values({
      workspaceId,
      insightType,
      data: data as object,
      generatedAt: now,
      expiresAt,
      inputTokens: tokenUsage?.inputTokens,
      outputTokens: tokenUsage?.outputTokens,
      status: "valid",
    })
    .returning();

  return newCache;
}

/**
 * Mark a cache entry as generating (in progress).
 * Used to prevent duplicate generation requests.
 */
export async function markCacheGenerating(
  workspaceId: number,
  insightType: InsightType
): Promise<void> {
  const now = new Date();
  const expiresAt = new Date(now.getTime() + 5 * 60 * 1000); // 5 minute lock

  await db.insert(aiInsightsCache).values({
    workspaceId,
    insightType,
    data: {},
    generatedAt: now,
    expiresAt,
    status: "generating",
  });
}

/**
 * Mark a cache entry as error.
 */
export async function markCacheError(
  workspaceId: number,
  insightType: InsightType,
  errorMessage: string
): Promise<void> {
  const now = new Date();

  await db
    .update(aiInsightsCache)
    .set({
      status: "error",
      errorMessage,
      updatedAt: now,
    })
    .where(
      and(
        eq(aiInsightsCache.workspaceId, workspaceId),
        eq(aiInsightsCache.insightType, insightType),
        eq(aiInsightsCache.status, "generating")
      )
    );
}

/**
 * Check if an insight is currently being generated.
 */
export async function isGenerating(
  workspaceId: number,
  insightType: InsightType
): Promise<boolean> {
  const now = new Date();

  const [generating] = await db
    .select({ id: aiInsightsCache.id })
    .from(aiInsightsCache)
    .where(
      and(
        eq(aiInsightsCache.workspaceId, workspaceId),
        eq(aiInsightsCache.insightType, insightType),
        eq(aiInsightsCache.status, "generating"),
        gt(aiInsightsCache.expiresAt, now) // Lock not expired
      )
    )
    .limit(1);

  return !!generating;
}

/**
 * Get the last error for an insight type.
 */
export async function getLastError(
  workspaceId: number,
  insightType: InsightType
): Promise<{ message: string; time: Date } | null> {
  const [error] = await db
    .select({
      message: aiInsightsCache.errorMessage,
      time: aiInsightsCache.updatedAt,
    })
    .from(aiInsightsCache)
    .where(
      and(
        eq(aiInsightsCache.workspaceId, workspaceId),
        eq(aiInsightsCache.insightType, insightType),
        eq(aiInsightsCache.status, "error")
      )
    )
    .orderBy(desc(aiInsightsCache.updatedAt))
    .limit(1);

  if (!error || !error.message) {
    return null;
  }

  return {
    message: error.message,
    time: error.time,
  };
}

/**
 * Clean up old cache entries.
 * Call this periodically to remove stale/expired entries.
 */
export async function cleanupOldCache(olderThanDays: number = 7): Promise<number> {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - olderThanDays);

  const result = await db
    .delete(aiInsightsCache)
    .where(
      sql`${aiInsightsCache.createdAt} < ${cutoff}`
    );

  return result.rowCount ?? 0;
}
