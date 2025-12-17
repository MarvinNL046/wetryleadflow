import { Client } from "@upstash/qstash";

// Initialize QStash client
function getQStashClient(): Client | null {
  const token = process.env.QSTASH_TOKEN;
  if (!token) {
    console.warn("[QStash] QSTASH_TOKEN not configured, scheduling disabled");
    return null;
  }
  return new Client({ token });
}

// Get the base URL for the application
function getBaseUrl(): string {
  // For local development with QStash local server
  if (process.env.QSTASH_URL) {
    return process.env.QSTASH_URL;
  }
  // Vercel deployment
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  // Custom domain
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL;
  }
  // Fallback for local development
  return "http://localhost:3000";
}

// ============================================
// Schedule Outbox Processing
// ============================================
export async function scheduleOutboxProcessing(
  delaySeconds: number = 0
): Promise<string | null> {
  const client = getQStashClient();
  if (!client) return null;

  try {
    const result = await client.publishJSON({
      url: `${getBaseUrl()}/api/jobs/outbox`,
      delay: delaySeconds,
      retries: 3,
    });

    console.log("[QStash] Scheduled outbox processing:", result.messageId);
    return result.messageId;
  } catch (error) {
    console.error("[QStash] Failed to schedule outbox processing:", error);
    return null;
  }
}

// ============================================
// Schedule Recurring Outbox Processing
// ============================================
export async function scheduleRecurringOutboxProcessing(
  cronExpression: string = "*/5 * * * *" // Every 5 minutes by default
): Promise<string | null> {
  const client = getQStashClient();
  if (!client) return null;

  try {
    const schedules = client.schedules;
    const result = await schedules.create({
      destination: `${getBaseUrl()}/api/jobs/outbox`,
      cron: cronExpression,
    });

    console.log("[QStash] Created recurring schedule:", result.scheduleId);
    return result.scheduleId;
  } catch (error) {
    console.error("[QStash] Failed to create recurring schedule:", error);
    return null;
  }
}

// ============================================
// Trigger Immediate Processing
// ============================================
export async function triggerImmediateProcessing(): Promise<string | null> {
  return scheduleOutboxProcessing(0);
}

// ============================================
// Schedule Delayed Event (for workflows)
// ============================================
export async function scheduleDelayedCallback(
  callbackUrl: string,
  payload: Record<string, unknown>,
  delaySeconds: number
): Promise<string | null> {
  const client = getQStashClient();
  if (!client) return null;

  try {
    const result = await client.publishJSON({
      url: `${getBaseUrl()}${callbackUrl}`,
      body: payload,
      delay: delaySeconds,
      retries: 3,
    });

    console.log("[QStash] Scheduled delayed callback:", result.messageId);
    return result.messageId;
  } catch (error) {
    console.error("[QStash] Failed to schedule delayed callback:", error);
    return null;
  }
}

// ============================================
// List Active Schedules (for admin)
// ============================================
export async function listSchedules(): Promise<Array<{
  scheduleId: string;
  destination: string;
  cron: string;
}> | null> {
  const client = getQStashClient();
  if (!client) return null;

  try {
    const schedules = await client.schedules.list();
    return schedules.map((s) => ({
      scheduleId: s.scheduleId,
      destination: s.destination,
      cron: s.cron || "",
    }));
  } catch (error) {
    console.error("[QStash] Failed to list schedules:", error);
    return null;
  }
}

// ============================================
// Delete Schedule (for admin)
// ============================================
export async function deleteSchedule(scheduleId: string): Promise<boolean> {
  const client = getQStashClient();
  if (!client) return false;

  try {
    await client.schedules.delete(scheduleId);
    console.log("[QStash] Deleted schedule:", scheduleId);
    return true;
  } catch (error) {
    console.error("[QStash] Failed to delete schedule:", error);
    return false;
  }
}
