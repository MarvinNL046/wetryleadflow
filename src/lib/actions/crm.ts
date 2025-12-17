"use server";

import { revalidatePath } from "next/cache";
import { eq, and, asc } from "drizzle-orm";
import { db } from "@/lib/db";
import {
  contacts,
  pipelines,
  pipelineStages,
  deals,
  dealStageHistory,
  notes,
} from "@/lib/db/schema";
import { requireAuthContext } from "@/lib/auth/context";
import {
  logContactAction,
  logDealAction,
  logPipelineAction,
  logNoteAction,
} from "@/lib/audit";
import { AuditActions } from "@/lib/audit/constants";
import { publishContactEvent, publishDealEvent } from "@/lib/outbox";
import { OutboxEventTypes } from "@/lib/outbox/constants";

// ============================================
// Contacts
// ============================================

export async function getContacts() {
  const ctx = await requireAuthContext();

  const result = await db.query.contacts.findMany({
    where: eq(contacts.workspaceId, ctx.workspace.id),
    orderBy: (contacts, { desc }) => [desc(contacts.createdAt)],
  });

  return result;
}

export async function createContact(data: {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  company?: string;
  position?: string;
}) {
  const ctx = await requireAuthContext();

  const [contact] = await db
    .insert(contacts)
    .values({
      workspaceId: ctx.workspace.id,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      company: data.company,
      position: data.position,
      createdById: ctx.user.id,
    })
    .returning();

  // Audit log
  await logContactAction(
    { orgId: ctx.org.id, workspaceId: ctx.workspace.id, userId: ctx.user.id, userEmail: ctx.user.email },
    AuditActions.CONTACT_CREATED,
    contact.id,
    { firstName: data.firstName, lastName: data.lastName, email: data.email, company: data.company }
  );

  // Outbox event for automations
  await publishContactEvent(
    { orgId: ctx.org.id, workspaceId: ctx.workspace.id },
    OutboxEventTypes.CONTACT_CREATED,
    contact.id,
    { contact, createdBy: { id: ctx.user.id, email: ctx.user.email } }
  );

  revalidatePath("/crm/contacts");
  return contact;
}

export async function updateContact(
  contactId: number,
  data: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    company?: string;
    position?: string;
  }
) {
  const ctx = await requireAuthContext();

  const [updated] = await db
    .update(contacts)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(
      and(
        eq(contacts.id, contactId),
        eq(contacts.workspaceId, ctx.workspace.id)
      )
    )
    .returning();

  // Audit log
  if (updated) {
    await logContactAction(
      { orgId: ctx.org.id, workspaceId: ctx.workspace.id, userId: ctx.user.id, userEmail: ctx.user.email },
      AuditActions.CONTACT_UPDATED,
      contactId,
      { changes: data }
    );
  }

  revalidatePath("/crm/contacts");
  return updated;
}

export async function deleteContact(contactId: number) {
  const ctx = await requireAuthContext();

  // Get contact info before deleting for audit
  const contact = await db.query.contacts.findFirst({
    where: and(eq(contacts.id, contactId), eq(contacts.workspaceId, ctx.workspace.id)),
  });

  await db
    .delete(contacts)
    .where(
      and(
        eq(contacts.id, contactId),
        eq(contacts.workspaceId, ctx.workspace.id)
      )
    );

  // Audit log
  await logContactAction(
    { orgId: ctx.org.id, workspaceId: ctx.workspace.id, userId: ctx.user.id, userEmail: ctx.user.email },
    AuditActions.CONTACT_DELETED,
    contactId,
    contact ? { firstName: contact.firstName, lastName: contact.lastName, email: contact.email } : undefined
  );

  revalidatePath("/crm/contacts");
}

// ============================================
// Pipelines
// ============================================

const DEFAULT_STAGES = [
  { name: "Lead", order: 0, color: "#6366f1" },
  { name: "Qualified", order: 1, color: "#8b5cf6" },
  { name: "Proposal", order: 2, color: "#a855f7" },
  { name: "Negotiation", order: 3, color: "#f59e0b" },
  { name: "Won", order: 4, color: "#22c55e" },
  { name: "Lost", order: 5, color: "#ef4444" },
];

export async function getPipelines() {
  const ctx = await requireAuthContext();

  const result = await db.query.pipelines.findMany({
    where: eq(pipelines.workspaceId, ctx.workspace.id),
    with: {
      stages: {
        orderBy: [asc(pipelineStages.order)],
      },
    },
  });

  return result;
}

export async function createPipeline(name: string) {
  const ctx = await requireAuthContext();

  // Create pipeline
  const [pipeline] = await db
    .insert(pipelines)
    .values({
      workspaceId: ctx.workspace.id,
      name,
    })
    .returning();

  // Create default stages
  await db.insert(pipelineStages).values(
    DEFAULT_STAGES.map((stage) => ({
      pipelineId: pipeline.id,
      name: stage.name,
      order: stage.order,
      color: stage.color,
    }))
  );

  // Audit log
  await logPipelineAction(
    { orgId: ctx.org.id, workspaceId: ctx.workspace.id, userId: ctx.user.id, userEmail: ctx.user.email },
    AuditActions.PIPELINE_CREATED,
    pipeline.id,
    { name, stages: DEFAULT_STAGES.map((s) => s.name) }
  );

  revalidatePath("/crm/pipelines");
  return pipeline;
}

export async function getPipelineWithDeals(pipelineId: number) {
  const ctx = await requireAuthContext();

  const pipeline = await db.query.pipelines.findFirst({
    where: and(
      eq(pipelines.id, pipelineId),
      eq(pipelines.workspaceId, ctx.workspace.id)
    ),
    with: {
      stages: {
        orderBy: [asc(pipelineStages.order)],
        with: {
          deals: {
            with: {
              contact: true,
            },
          },
        },
      },
    },
  });

  return pipeline;
}

// ============================================
// Deals
// ============================================

export async function getDeals(pipelineId?: number) {
  const ctx = await requireAuthContext();

  const whereClause = pipelineId
    ? and(eq(deals.workspaceId, ctx.workspace.id), eq(deals.pipelineId, pipelineId))
    : eq(deals.workspaceId, ctx.workspace.id);

  const result = await db.query.deals.findMany({
    where: whereClause,
    with: {
      contact: true,
      stage: true,
      pipeline: true,
    },
    orderBy: (deals, { desc }) => [desc(deals.createdAt)],
  });

  return result;
}

export async function getDeal(dealId: number) {
  const ctx = await requireAuthContext();

  const deal = await db.query.deals.findFirst({
    where: and(
      eq(deals.id, dealId),
      eq(deals.workspaceId, ctx.workspace.id)
    ),
    with: {
      contact: true,
      stage: true,
      pipeline: {
        with: {
          stages: {
            orderBy: [asc(pipelineStages.order)],
          },
        },
      },
      stageHistory: {
        with: {
          fromStage: true,
          toStage: true,
          movedBy: true,
        },
        orderBy: (history, { desc }) => [desc(history.movedAt)],
      },
      notes: {
        with: {
          createdBy: true,
        },
        orderBy: (notes, { desc }) => [desc(notes.createdAt)],
      },
    },
  });

  return deal;
}

export async function createDeal(data: {
  pipelineId: number;
  stageId: number;
  title: string;
  contactId?: number;
  value?: string;
  expectedCloseDate?: Date;
}) {
  const ctx = await requireAuthContext();

  // Create the deal
  const [deal] = await db
    .insert(deals)
    .values({
      workspaceId: ctx.workspace.id,
      pipelineId: data.pipelineId,
      stageId: data.stageId,
      contactId: data.contactId,
      title: data.title,
      value: data.value,
      expectedCloseDate: data.expectedCloseDate,
      createdById: ctx.user.id,
    })
    .returning();

  // Record initial stage in history
  await db.insert(dealStageHistory).values({
    dealId: deal.id,
    fromStageId: null,
    toStageId: data.stageId,
    movedById: ctx.user.id,
  });

  // Audit log
  await logDealAction(
    { orgId: ctx.org.id, workspaceId: ctx.workspace.id, userId: ctx.user.id, userEmail: ctx.user.email },
    AuditActions.DEAL_CREATED,
    deal.id,
    { title: data.title, pipelineId: data.pipelineId, stageId: data.stageId, value: data.value }
  );

  // Outbox event for automations
  await publishDealEvent(
    { orgId: ctx.org.id, workspaceId: ctx.workspace.id },
    OutboxEventTypes.DEAL_CREATED,
    deal.id,
    { deal, createdBy: { id: ctx.user.id, email: ctx.user.email } }
  );

  revalidatePath("/crm/pipelines");
  return deal;
}

export async function moveDealStage(dealId: number, newStageId: number) {
  const ctx = await requireAuthContext();

  // Get current deal
  const deal = await db.query.deals.findFirst({
    where: and(
      eq(deals.id, dealId),
      eq(deals.workspaceId, ctx.workspace.id)
    ),
  });

  if (!deal) throw new Error("Deal not found");

  const oldStageId = deal.stageId;

  // Update deal stage
  const [updated] = await db
    .update(deals)
    .set({
      stageId: newStageId,
      updatedAt: new Date(),
    })
    .where(eq(deals.id, dealId))
    .returning();

  // Record stage change in history
  await db.insert(dealStageHistory).values({
    dealId: dealId,
    fromStageId: oldStageId,
    toStageId: newStageId,
    movedById: ctx.user.id,
  });

  // Audit log
  await logDealAction(
    { orgId: ctx.org.id, workspaceId: ctx.workspace.id, userId: ctx.user.id, userEmail: ctx.user.email },
    AuditActions.DEAL_MOVED,
    dealId,
    { fromStageId: oldStageId, toStageId: newStageId, title: deal.title }
  );

  // Outbox event for automations (deal.moved is key for GoHighLevel-style workflows)
  await publishDealEvent(
    { orgId: ctx.org.id, workspaceId: ctx.workspace.id },
    OutboxEventTypes.DEAL_MOVED,
    dealId,
    {
      deal: updated,
      fromStageId: oldStageId,
      toStageId: newStageId,
      movedBy: { id: ctx.user.id, email: ctx.user.email },
    }
  );

  revalidatePath("/crm/pipelines");
  return updated;
}

export async function updateDeal(
  dealId: number,
  data: {
    title?: string;
    contactId?: number | null;
    value?: string;
    expectedCloseDate?: Date | null;
  }
) {
  const ctx = await requireAuthContext();

  const [updated] = await db
    .update(deals)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(
      and(
        eq(deals.id, dealId),
        eq(deals.workspaceId, ctx.workspace.id)
      )
    )
    .returning();

  // Audit log
  if (updated) {
    await logDealAction(
      { orgId: ctx.org.id, workspaceId: ctx.workspace.id, userId: ctx.user.id, userEmail: ctx.user.email },
      AuditActions.DEAL_UPDATED,
      dealId,
      { changes: data }
    );
  }

  revalidatePath("/crm/pipelines");
  return updated;
}

export async function deleteDeal(dealId: number) {
  const ctx = await requireAuthContext();

  // Get deal info before deleting for audit
  const deal = await db.query.deals.findFirst({
    where: and(eq(deals.id, dealId), eq(deals.workspaceId, ctx.workspace.id)),
  });

  await db
    .delete(deals)
    .where(
      and(
        eq(deals.id, dealId),
        eq(deals.workspaceId, ctx.workspace.id)
      )
    );

  // Audit log
  await logDealAction(
    { orgId: ctx.org.id, workspaceId: ctx.workspace.id, userId: ctx.user.id, userEmail: ctx.user.email },
    AuditActions.DEAL_DELETED,
    dealId,
    deal ? { title: deal.title, value: deal.value } : undefined
  );

  revalidatePath("/crm/pipelines");
}

// ============================================
// Notes
// ============================================

export async function createNote(data: {
  type: "contact" | "deal";
  contactId?: number;
  dealId?: number;
  content: string;
}) {
  const ctx = await requireAuthContext();

  const [note] = await db
    .insert(notes)
    .values({
      workspaceId: ctx.workspace.id,
      type: data.type,
      contactId: data.contactId,
      dealId: data.dealId,
      content: data.content,
      createdById: ctx.user.id,
    })
    .returning();

  // Audit log
  await logNoteAction(
    { orgId: ctx.org.id, workspaceId: ctx.workspace.id, userId: ctx.user.id, userEmail: ctx.user.email },
    AuditActions.NOTE_CREATED,
    note.id,
    { type: data.type, contactId: data.contactId, dealId: data.dealId }
  );

  revalidatePath("/crm");
  return note;
}

export async function deleteNote(noteId: number) {
  const ctx = await requireAuthContext();

  // Get note info before deleting for audit
  const note = await db.query.notes.findFirst({
    where: and(eq(notes.id, noteId), eq(notes.workspaceId, ctx.workspace.id)),
  });

  await db
    .delete(notes)
    .where(
      and(
        eq(notes.id, noteId),
        eq(notes.workspaceId, ctx.workspace.id)
      )
    );

  // Audit log
  await logNoteAction(
    { orgId: ctx.org.id, workspaceId: ctx.workspace.id, userId: ctx.user.id, userEmail: ctx.user.email },
    AuditActions.NOTE_DELETED,
    noteId,
    note ? { type: note.type, contactId: note.contactId, dealId: note.dealId } : undefined
  );

  revalidatePath("/crm");
}
