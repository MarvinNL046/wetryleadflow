import type { OutboxEvent } from "@/lib/db/schema";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { users, orgs, deals, pipelineStages } from "@/lib/db/schema";
import { sendDealAssignedEmail, sendAutomationStatusEmail } from "@/lib/email/send";

// Type for event payload
type EventPayload = Record<string, unknown>;

// Event handler type
export type EventHandler = (event: OutboxEvent) => Promise<void>;

// ============================================
// Deal Created Handler
// ============================================
async function handleDealCreated(event: OutboxEvent): Promise<void> {
  console.log(`[Outbox] Processing deal.created:`, event.entityId);

  const payload = event.payload as EventPayload;
  const deal = payload.deal as { title?: string; assignedToId?: number } | undefined;

  // If deal is assigned to someone, send email notification
  if (deal?.assignedToId) {
    const assignee = await db.query.users.findFirst({
      where: eq(users.id, deal.assignedToId),
    });

    const org = await db.query.orgs.findFirst({
      where: eq(orgs.id, event.orgId),
    });

    if (assignee && org) {
      const createdBy = payload.createdBy as { email?: string } | undefined;

      await sendDealAssignedEmail({
        to: assignee.email,
        assigneeName: assignee.name || assignee.email,
        assignerName: createdBy?.email || "Someone",
        dealTitle: deal.title || "Untitled Deal",
        dealUrl: `${process.env.NEXT_PUBLIC_APP_URL}/crm/pipelines`,
        orgName: org.name,
        orgId: event.orgId,
        workspaceId: event.workspaceId,
        dealId: event.entityId,
        stageName: "New",
      });
    }
  }
}

// ============================================
// Deal Moved Handler
// ============================================
async function handleDealMoved(event: OutboxEvent): Promise<void> {
  console.log(`[Outbox] Processing deal.moved:`, event.entityId);

  const payload = event.payload as EventPayload;
  const deal = payload.deal as { title?: string; assignedToId?: number } | undefined;
  const toStageId = payload.toStageId as number | undefined;

  // Get stage info
  let stageName = "Unknown Stage";
  if (toStageId) {
    const stage = await db.query.pipelineStages.findFirst({
      where: eq(pipelineStages.id, toStageId),
    });
    if (stage) {
      stageName = stage.name;
    }
  }

  // Notify assigned user about stage change
  if (deal?.assignedToId) {
    const assignee = await db.query.users.findFirst({
      where: eq(users.id, deal.assignedToId),
    });

    const org = await db.query.orgs.findFirst({
      where: eq(orgs.id, event.orgId),
    });

    if (assignee && org) {
      const movedBy = payload.movedBy as { email?: string } | undefined;

      // Only notify if someone else moved the deal
      if (movedBy?.email && movedBy.email !== assignee.email) {
        await sendDealAssignedEmail({
          to: assignee.email,
          assigneeName: assignee.name || assignee.email,
          assignerName: movedBy.email,
          dealTitle: deal.title || "Untitled Deal",
          dealUrl: `${process.env.NEXT_PUBLIC_APP_URL}/crm/pipelines`,
          orgName: org.name,
          orgId: event.orgId,
          workspaceId: event.workspaceId,
          dealId: event.entityId,
          stageName,
        });
      }
    }
  }

  // Check for stage-specific automations (e.g., "Won" or "Lost" stages)
  if (stageName.toLowerCase() === "won" || stageName.toLowerCase() === "lost") {
    console.log(`[Outbox] Deal ${event.entityId} moved to ${stageName} stage - trigger automations`);
    // Future: Add more automation triggers here
  }
}

// ============================================
// Deal Won Handler
// ============================================
async function handleDealWon(event: OutboxEvent): Promise<void> {
  console.log(`[Outbox] Processing deal.won:`, event.entityId);
  // Future: Send congratulations email, create invoice, etc.
}

// ============================================
// Deal Lost Handler
// ============================================
async function handleDealLost(event: OutboxEvent): Promise<void> {
  console.log(`[Outbox] Processing deal.lost:`, event.entityId);
  // Future: Send follow-up sequence, update analytics, etc.
}

// ============================================
// Contact Created Handler
// ============================================
async function handleContactCreated(event: OutboxEvent): Promise<void> {
  console.log(`[Outbox] Processing contact.created:`, event.entityId);
  // Future: Send welcome email, add to sequence, enrich data, etc.
}

// ============================================
// Default Handler
// ============================================
async function handleDefault(event: OutboxEvent): Promise<void> {
  console.log(`[Outbox] No handler for ${event.eventType}, marking as processed:`, event.id);
}

// ============================================
// Event Handlers Registry
// ============================================
export const eventHandlers: Record<string, EventHandler> = {
  "deal.created": handleDealCreated,
  "deal.moved": handleDealMoved,
  "deal.won": handleDealWon,
  "deal.lost": handleDealLost,
  "contact.created": handleContactCreated,
};

// ============================================
// Get Handler for Event Type
// ============================================
export function getHandler(eventType: string): EventHandler {
  return eventHandlers[eventType] || handleDefault;
}
