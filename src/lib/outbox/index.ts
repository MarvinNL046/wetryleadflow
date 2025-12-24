"use server";

import { eq, and, lte, sql } from "drizzle-orm";
import { db, outboxEvents } from "@/lib/db";
import type { NewOutboxEvent, OutboxEvent } from "@/lib/db/schema";
import type { OutboxEventType, EntityType } from "./constants";
import { scheduleOutboxProcessing } from "@/lib/qstash";

// Re-export types
export type { OutboxEventType, EntityType };

// ============================================
// Event Context
// ============================================
interface EventContext {
  orgId: number;
  workspaceId: number;
}

interface EventData {
  eventType: OutboxEventType;
  entityType: EntityType;
  entityId: number;
  payload: Record<string, unknown>;
  scheduledFor?: Date;
}

// ============================================
// Publish Event to Outbox
// ============================================
export async function publishEvent(
  context: EventContext,
  data: EventData,
  options?: { triggerProcessing?: boolean }
): Promise<OutboxEvent> {
  const [event] = await db
    .insert(outboxEvents)
    .values({
      orgId: context.orgId,
      workspaceId: context.workspaceId,
      eventType: data.eventType,
      entityType: data.entityType,
      entityId: data.entityId,
      payload: data.payload,
      scheduledFor: data.scheduledFor ?? new Date(),
      status: "pending",
    })
    .returning();

  // Optionally trigger immediate processing via QStash
  if (options?.triggerProcessing !== false) {
    // Fire and forget - don't await to not slow down the main flow
    scheduleOutboxProcessing(1).catch(() => {
      // Ignore errors - events will be picked up by the next cron run
    });
  }

  return event;
}

// ============================================
// Batch Publish Events
// ============================================
export async function publishEvents(
  context: EventContext,
  events: EventData[]
): Promise<OutboxEvent[]> {
  if (events.length === 0) return [];

  const values: NewOutboxEvent[] = events.map((data) => ({
    orgId: context.orgId,
    workspaceId: context.workspaceId,
    eventType: data.eventType,
    entityType: data.entityType,
    entityId: data.entityId,
    payload: data.payload,
    scheduledFor: data.scheduledFor ?? new Date(),
    status: "pending" as const,
  }));

  const inserted = await db.insert(outboxEvents).values(values).returning();
  return inserted;
}

// ============================================
// Claim Events for Processing
// ============================================
export async function claimPendingEvents(
  limit: number = 10
): Promise<OutboxEvent[]> {
  const now = new Date();

  // Atomically claim pending events that are due
  const claimed = await db
    .update(outboxEvents)
    .set({
      status: "processing",
      attempts: sql`${outboxEvents.attempts} + 1`,
      updatedAt: now,
    })
    .where(
      and(
        eq(outboxEvents.status, "pending"),
        lte(outboxEvents.scheduledFor, now),
        sql`${outboxEvents.attempts} < ${outboxEvents.maxAttempts}`
      )
    )
    .returning();

  return claimed.slice(0, limit);
}

// ============================================
// Mark Event as Completed
// ============================================
export async function markEventCompleted(eventId: number): Promise<void> {
  await db
    .update(outboxEvents)
    .set({
      status: "completed",
      processedAt: new Date(),
      updatedAt: new Date(),
    })
    .where(eq(outboxEvents.id, eventId));
}

// ============================================
// Mark Event as Failed
// ============================================
export async function markEventFailed(
  eventId: number,
  error: string
): Promise<void> {
  const event = await db.query.outboxEvents.findFirst({
    where: eq(outboxEvents.id, eventId),
  });

  if (!event) return;

  // If max attempts reached, mark as permanently failed
  // Otherwise, reset to pending for retry
  const newStatus = event.attempts >= event.maxAttempts ? "failed" : "pending";

  await db
    .update(outboxEvents)
    .set({
      status: newStatus,
      lastError: error,
      updatedAt: new Date(),
      // Schedule retry with exponential backoff (30s, 60s, 120s)
      scheduledFor:
        newStatus === "pending"
          ? new Date(Date.now() + Math.pow(2, event.attempts) * 30000)
          : event.scheduledFor,
    })
    .where(eq(outboxEvents.id, eventId));
}

// ============================================
// Get Pending Event Count
// ============================================
export async function getPendingEventCount(): Promise<number> {
  const [result] = await db
    .select({ count: sql<number>`count(*)` })
    .from(outboxEvents)
    .where(eq(outboxEvents.status, "pending"));

  return result.count;
}

// ============================================
// Convenience: Publish Opportunity Event
// ============================================
export async function publishOpportunityEvent(
  context: EventContext,
  eventType: "opportunity.created" | "opportunity.updated" | "opportunity.deleted" | "opportunity.moved" | "opportunity.won" | "opportunity.lost",
  opportunityId: number,
  payload: Record<string, unknown>
): Promise<OutboxEvent> {
  return publishEvent(context, {
    eventType,
    entityType: "opportunity",
    entityId: opportunityId,
    payload,
  });
}

// ============================================
// Convenience: Publish Contact Event
// ============================================
export async function publishContactEvent(
  context: EventContext,
  eventType: "contact.created" | "contact.updated" | "contact.deleted" | "contact.follow_up_needed",
  contactId: number,
  payload: Record<string, unknown>
): Promise<OutboxEvent> {
  return publishEvent(context, {
    eventType,
    entityType: "contact",
    entityId: contactId,
    payload,
  });
}
