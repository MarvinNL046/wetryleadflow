import type { OutboxEvent } from "@/lib/db/schema";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { users, orgs, opportunities, pipelineStages } from "@/lib/db/schema";
import { sendOpportunityAssignedEmail, sendAutomationStatusEmail } from "@/lib/email/send";

// Type for event payload
type EventPayload = Record<string, unknown>;

// Event handler type
export type EventHandler = (event: OutboxEvent) => Promise<void>;

// ============================================
// Opportunity Created Handler
// ============================================
async function handleOpportunityCreated(event: OutboxEvent): Promise<void> {
  console.log(`[Outbox] Processing opportunity.created:`, event.entityId);

  const payload = event.payload as EventPayload;
  const opportunity = payload.opportunity as { title?: string; assignedToId?: number } | undefined;

  // If opportunity is assigned to someone, send email notification
  if (opportunity?.assignedToId) {
    const assignee = await db.query.users.findFirst({
      where: eq(users.id, opportunity.assignedToId),
    });

    const org = await db.query.orgs.findFirst({
      where: eq(orgs.id, event.orgId),
    });

    if (assignee && org) {
      const createdBy = payload.createdBy as { email?: string } | undefined;

      await sendOpportunityAssignedEmail({
        to: assignee.email,
        assigneeName: assignee.name || assignee.email,
        assignerName: createdBy?.email || "Someone",
        opportunityTitle: opportunity.title || "Untitled Opportunity",
        opportunityUrl: `${process.env.NEXT_PUBLIC_APP_URL}/crm/pipelines`,
        orgName: org.name,
        orgId: event.orgId,
        workspaceId: event.workspaceId,
        opportunityId: event.entityId,
        stageName: "New",
      });
    }
  }
}

// ============================================
// Opportunity Moved Handler
// ============================================
async function handleOpportunityMoved(event: OutboxEvent): Promise<void> {
  console.log(`[Outbox] Processing opportunity.moved:`, event.entityId);

  const payload = event.payload as EventPayload;
  const opportunity = payload.opportunity as { title?: string; assignedToId?: number } | undefined;
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
  if (opportunity?.assignedToId) {
    const assignee = await db.query.users.findFirst({
      where: eq(users.id, opportunity.assignedToId),
    });

    const org = await db.query.orgs.findFirst({
      where: eq(orgs.id, event.orgId),
    });

    if (assignee && org) {
      const movedBy = payload.movedBy as { email?: string } | undefined;

      // Only notify if someone else moved the opportunity
      if (movedBy?.email && movedBy.email !== assignee.email) {
        await sendOpportunityAssignedEmail({
          to: assignee.email,
          assigneeName: assignee.name || assignee.email,
          assignerName: movedBy.email,
          opportunityTitle: opportunity.title || "Untitled Opportunity",
          opportunityUrl: `${process.env.NEXT_PUBLIC_APP_URL}/crm/pipelines`,
          orgName: org.name,
          orgId: event.orgId,
          workspaceId: event.workspaceId,
          opportunityId: event.entityId,
          stageName,
        });
      }
    }
  }

  // Check for stage-specific automations (e.g., "Won" or "Lost" stages)
  if (stageName.toLowerCase() === "won" || stageName.toLowerCase() === "lost") {
    console.log(`[Outbox] Opportunity ${event.entityId} moved to ${stageName} stage - trigger automations`);
    // Future: Add more automation triggers here
  }
}

// ============================================
// Opportunity Won Handler
// ============================================
async function handleOpportunityWon(event: OutboxEvent): Promise<void> {
  console.log(`[Outbox] Processing opportunity.won:`, event.entityId);
  // Future: Send congratulations email, create invoice, etc.
}

// ============================================
// Opportunity Lost Handler
// ============================================
async function handleOpportunityLost(event: OutboxEvent): Promise<void> {
  console.log(`[Outbox] Processing opportunity.lost:`, event.entityId);
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
  "opportunity.created": handleOpportunityCreated,
  "opportunity.moved": handleOpportunityMoved,
  "opportunity.won": handleOpportunityWon,
  "opportunity.lost": handleOpportunityLost,
  "contact.created": handleContactCreated,
};

// ============================================
// Get Handler for Event Type
// ============================================
export function getHandler(eventType: string): EventHandler {
  return eventHandlers[eventType] || handleDefault;
}
