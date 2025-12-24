"use server";

import { db } from "@/lib/db";
import { cronJobRuns, cronJobConfigs } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

/**
 * Log the start of a cron job run
 * Returns the run ID for later updates
 */
export async function logCronStart(jobName: string): Promise<number> {
  const [run] = await db
    .insert(cronJobRuns)
    .values({
      jobName,
      status: "running",
      startedAt: new Date(),
    })
    .returning({ id: cronJobRuns.id });

  // Update last run timestamp on config
  await db
    .update(cronJobConfigs)
    .set({ lastRunAt: new Date() })
    .where(eq(cronJobConfigs.jobName, jobName));

  return run.id;
}

/**
 * Log a successful cron job completion
 */
export async function logCronSuccess(
  runId: number,
  itemsProcessed: number = 0,
  metadata?: Record<string, unknown>
): Promise<void> {
  const now = new Date();

  // Get the run to calculate duration
  const run = await db.query.cronJobRuns.findFirst({
    where: eq(cronJobRuns.id, runId),
  });

  const duration = run ? now.getTime() - run.startedAt.getTime() : 0;

  await db
    .update(cronJobRuns)
    .set({
      status: "success",
      completedAt: now,
      duration,
      itemsProcessed,
      metadata: metadata || null,
    })
    .where(eq(cronJobRuns.id, runId));

  // Reset consecutive failures on the config
  if (run) {
    await db
      .update(cronJobConfigs)
      .set({ consecutiveFailures: 0 })
      .where(eq(cronJobConfigs.jobName, run.jobName));
  }
}

/**
 * Log a failed cron job
 */
export async function logCronFailure(
  runId: number,
  error: Error | string
): Promise<void> {
  const now = new Date();
  const errorMessage = error instanceof Error ? error.message : error;

  // Get the run to calculate duration and update config
  const run = await db.query.cronJobRuns.findFirst({
    where: eq(cronJobRuns.id, runId),
  });

  const duration = run ? now.getTime() - run.startedAt.getTime() : 0;

  await db
    .update(cronJobRuns)
    .set({
      status: "failed",
      completedAt: now,
      duration,
      errorMessage,
    })
    .where(eq(cronJobRuns.id, runId));

  // Increment consecutive failures on the config
  if (run) {
    const config = await db.query.cronJobConfigs.findFirst({
      where: eq(cronJobConfigs.jobName, run.jobName),
    });

    if (config) {
      await db
        .update(cronJobConfigs)
        .set({
          consecutiveFailures: (config.consecutiveFailures || 0) + 1
        })
        .where(eq(cronJobConfigs.jobName, run.jobName));
    }
  }
}

/**
 * Log a cron job timeout
 */
export async function logCronTimeout(runId: number): Promise<void> {
  const now = new Date();

  const run = await db.query.cronJobRuns.findFirst({
    where: eq(cronJobRuns.id, runId),
  });

  const duration = run ? now.getTime() - run.startedAt.getTime() : 0;

  await db
    .update(cronJobRuns)
    .set({
      status: "timeout",
      completedAt: now,
      duration,
      errorMessage: "Job timed out",
    })
    .where(eq(cronJobRuns.id, runId));

  // Increment consecutive failures on the config
  if (run) {
    const config = await db.query.cronJobConfigs.findFirst({
      where: eq(cronJobConfigs.jobName, run.jobName),
    });

    if (config) {
      await db
        .update(cronJobConfigs)
        .set({
          consecutiveFailures: (config.consecutiveFailures || 0) + 1
        })
        .where(eq(cronJobConfigs.jobName, run.jobName));
    }
  }
}

/**
 * Initialize or update cron job config
 */
export async function ensureCronConfig(
  jobName: string,
  schedule: string,
  description?: string
): Promise<void> {
  const existing = await db.query.cronJobConfigs.findFirst({
    where: eq(cronJobConfigs.jobName, jobName),
  });

  if (existing) {
    await db
      .update(cronJobConfigs)
      .set({
        schedule,
        description: description || existing.description,
      })
      .where(eq(cronJobConfigs.jobName, jobName));
  } else {
    await db
      .insert(cronJobConfigs)
      .values({
        jobName,
        schedule,
        description,
        isEnabled: true,
        consecutiveFailures: 0,
        alertThreshold: 3,
      });
  }
}

/**
 * Helper to wrap a cron job function with logging
 */
export function withCronLogging<T>(
  jobName: string,
  fn: () => Promise<{ itemsProcessed?: number; metadata?: Record<string, unknown> }>
): () => Promise<T> {
  return async () => {
    const runId = await logCronStart(jobName);

    try {
      const result = await fn();
      await logCronSuccess(runId, result.itemsProcessed || 0, result.metadata);
      return result as T;
    } catch (error) {
      await logCronFailure(runId, error as Error);
      throw error;
    }
  };
}
