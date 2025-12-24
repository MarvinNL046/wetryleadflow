"use server";

import { revalidatePath } from "next/cache";
import { eq, and, asc, desc, lte, isNotNull, inArray } from "drizzle-orm";
import { db } from "@/lib/db";
import {
  contacts,
  pipelines,
  pipelineStages,
  opportunities,
  opportunityStageHistory,
  notes,
  leadAttribution,
  metaForms,
} from "@/lib/db/schema";
import { requireAuthContext } from "@/lib/auth/context";
import {
  logContactAction,
  logOpportunityAction,
  logPipelineAction,
  logNoteAction,
} from "@/lib/audit";
import { AuditActions } from "@/lib/audit/constants";
import { publishContactEvent, publishOpportunityEvent } from "@/lib/outbox";
import { OutboxEventTypes } from "@/lib/outbox/constants";
import { getCrmSettingsByWorkspaceId } from "@/lib/actions/crm-settings";
import type { CrmSettingsData } from "@/lib/types/crm-settings";

// ============================================
// Contacts
// ============================================

export async function getContacts() {
  const ctx = await requireAuthContext();

  // Get contacts with lead attribution
  const result = await db.query.contacts.findMany({
    where: eq(contacts.workspaceId, ctx.workspace.id),
    orderBy: (contacts, { desc }) => [desc(contacts.createdAt)],
    with: {
      leadAttribution: true,
    },
  });

  // Get unique form IDs from lead attributions
  const formIds = result
    .map(c => c.leadAttribution?.metaFormId)
    .filter((id): id is string => !!id);

  // Look up form names from metaForms table
  let formNameMap: Record<string, string> = {};
  if (formIds.length > 0) {
    const forms = await db.query.metaForms.findMany({
      where: inArray(metaForms.formId, formIds),
    });
    formNameMap = forms.reduce((acc, form) => {
      if (form.formId && form.formName) {
        acc[form.formId] = form.formName;
      }
      return acc;
    }, {} as Record<string, string>);
  }

  // Add form name to each contact
  return result.map(contact => ({
    ...contact,
    // Add source information
    leadSource: contact.leadAttribution?.source ?? null,
    metaFormName: contact.leadAttribution?.metaFormId
      ? formNameMap[contact.leadAttribution.metaFormId] ?? null
      : null,
  }));
}

export async function createContact(data: {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  company?: string;
  position?: string;
  street?: string;
  houseNumber?: string;
  houseNumberAddition?: string;
  postalCode?: string;
  city?: string;
  province?: string;
  country?: string;
  // Optional: add to pipeline
  pipelineId?: number;
  stageId?: number;
  dealValue?: string;
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
      street: data.street,
      houseNumber: data.houseNumber,
      houseNumberAddition: data.houseNumberAddition,
      postalCode: data.postalCode,
      city: data.city,
      province: data.province,
      country: data.country,
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

  // If pipeline is specified, create an opportunity for this contact
  if (data.pipelineId && data.stageId) {
    const contactName = [data.firstName, data.lastName].filter(Boolean).join(" ") || data.email || "Nieuwe lead";
    const opportunityTitle = data.company ? `${contactName} - ${data.company}` : contactName;

    const [opportunity] = await db
      .insert(opportunities)
      .values({
        workspaceId: ctx.workspace.id,
        pipelineId: data.pipelineId,
        stageId: data.stageId,
        contactId: contact.id,
        title: opportunityTitle,
        value: data.dealValue || null,
        createdById: ctx.user.id,
      })
      .returning();

    // Record initial stage in history
    await db.insert(opportunityStageHistory).values({
      opportunityId: opportunity.id,
      fromStageId: null,
      toStageId: data.stageId,
      movedById: ctx.user.id,
    });

    // Audit log for opportunity
    await logOpportunityAction(
      { orgId: ctx.org.id, workspaceId: ctx.workspace.id, userId: ctx.user.id, userEmail: ctx.user.email },
      AuditActions.OPPORTUNITY_CREATED,
      opportunity.id,
      { title: opportunityTitle, pipelineId: data.pipelineId, stageId: data.stageId, value: data.dealValue, contactId: contact.id }
    );

    revalidatePath(`/crm/pipelines/${data.pipelineId}`);
  }

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
    street?: string;
    houseNumber?: string;
    houseNumberAddition?: string;
    postalCode?: string;
    city?: string;
    province?: string;
    country?: string;
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

export async function getPipelineWithOpportunities(pipelineId: number) {
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
          opportunities: {
            with: {
              contact: {
                with: {
                  leadAttribution: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!pipeline) return null;

  // Collect all form IDs from contacts
  const allFormIds: string[] = [];
  for (const stage of pipeline.stages) {
    for (const opp of stage.opportunities) {
      const formId = opp.contact?.leadAttribution?.metaFormId;
      if (formId && !allFormIds.includes(formId)) {
        allFormIds.push(formId);
      }
    }
  }

  // Look up form names
  let formNameMap: Record<string, string> = {};
  if (allFormIds.length > 0) {
    const forms = await db.query.metaForms.findMany({
      where: inArray(metaForms.formId, allFormIds),
    });
    formNameMap = forms.reduce((acc, form) => {
      if (form.formId && form.formName) {
        acc[form.formId] = form.formName;
      }
      return acc;
    }, {} as Record<string, string>);
  }

  // Enrich pipeline with form names
  return {
    ...pipeline,
    stages: pipeline.stages.map(stage => ({
      ...stage,
      opportunities: stage.opportunities.map(opp => ({
        ...opp,
        contact: opp.contact ? {
          ...opp.contact,
          leadSource: opp.contact.leadAttribution?.source ?? null,
          metaFormName: opp.contact.leadAttribution?.metaFormId
            ? formNameMap[opp.contact.leadAttribution.metaFormId] ?? null
            : null,
        } : null,
      })),
    })),
  };
}

export async function updatePipeline(
  pipelineId: number,
  data: { name?: string }
) {
  const ctx = await requireAuthContext();

  // Verify the pipeline belongs to this workspace
  const pipeline = await db.query.pipelines.findFirst({
    where: and(
      eq(pipelines.id, pipelineId),
      eq(pipelines.workspaceId, ctx.workspace.id)
    ),
  });

  if (!pipeline) {
    throw new Error("Pipeline not found");
  }

  // Update the pipeline
  const [updatedPipeline] = await db
    .update(pipelines)
    .set({
      ...(data.name !== undefined && { name: data.name }),
    })
    .where(eq(pipelines.id, pipelineId))
    .returning();

  revalidatePath("/crm/pipelines");
  revalidatePath(`/crm/pipelines/${pipelineId}`);

  return updatedPipeline;
}

export async function updatePipelineStage(
  stageId: number,
  data: { name?: string; color?: string }
) {
  const ctx = await requireAuthContext();

  // Verify the stage belongs to a pipeline in this workspace
  const stage = await db.query.pipelineStages.findFirst({
    where: eq(pipelineStages.id, stageId),
    with: {
      pipeline: true,
    },
  });

  if (!stage || stage.pipeline.workspaceId !== ctx.workspace.id) {
    throw new Error("Stage not found");
  }

  // Update the stage
  const [updatedStage] = await db
    .update(pipelineStages)
    .set({
      ...(data.name !== undefined && { name: data.name }),
      ...(data.color !== undefined && { color: data.color }),
    })
    .where(eq(pipelineStages.id, stageId))
    .returning();

  revalidatePath("/crm/pipelines");
  revalidatePath(`/crm/pipelines/${stage.pipelineId}`);

  return updatedStage;
}

export async function updatePipelineStages(
  pipelineId: number,
  stages: Array<{
    id: number;
    name: string;
    color: string;
    followUpEnabled?: boolean;
    followUpDays?: number | null;
    isFinalAttempt?: boolean;
    sendEmailOnLost?: boolean;
    autoMoveToLost?: boolean;
  }>
) {
  const ctx = await requireAuthContext();

  // Verify the pipeline belongs to this workspace
  const pipeline = await db.query.pipelines.findFirst({
    where: and(
      eq(pipelines.id, pipelineId),
      eq(pipelines.workspaceId, ctx.workspace.id)
    ),
  });

  if (!pipeline) {
    throw new Error("Pipeline not found");
  }

  // Update each stage
  for (const stage of stages) {
    await db
      .update(pipelineStages)
      .set({
        name: stage.name,
        color: stage.color,
        followUpEnabled: stage.followUpEnabled ?? false,
        followUpDays: stage.followUpDays ?? null,
        isFinalAttempt: stage.isFinalAttempt ?? false,
        sendEmailOnLost: stage.sendEmailOnLost ?? false,
        autoMoveToLost: stage.autoMoveToLost ?? false,
      })
      .where(
        and(
          eq(pipelineStages.id, stage.id),
          eq(pipelineStages.pipelineId, pipelineId)
        )
      );
  }

  revalidatePath("/crm/pipelines");
  revalidatePath(`/crm/pipelines/${pipelineId}`);

  return { success: true };
}

// ============================================
// Opportunities
// ============================================

export async function getOpportunities(pipelineId?: number) {
  const ctx = await requireAuthContext();

  const whereClause = pipelineId
    ? and(eq(opportunities.workspaceId, ctx.workspace.id), eq(opportunities.pipelineId, pipelineId))
    : eq(opportunities.workspaceId, ctx.workspace.id);

  const result = await db.query.opportunities.findMany({
    where: whereClause,
    with: {
      contact: true,
      stage: true,
      pipeline: true,
    },
    orderBy: (opportunities, { desc }) => [desc(opportunities.createdAt)],
  });

  return result;
}

export async function getOpportunity(opportunityId: number) {
  const ctx = await requireAuthContext();

  const opportunity = await db.query.opportunities.findFirst({
    where: and(
      eq(opportunities.id, opportunityId),
      eq(opportunities.workspaceId, ctx.workspace.id)
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

  return opportunity;
}

export async function createOpportunity(data: {
  pipelineId: number;
  stageId: number;
  title: string;
  contactId?: number;
  value?: string;
  expectedCloseDate?: Date;
}) {
  const ctx = await requireAuthContext();

  // Create the opportunity
  const [opportunity] = await db
    .insert(opportunities)
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
  await db.insert(opportunityStageHistory).values({
    opportunityId: opportunity.id,
    fromStageId: null,
    toStageId: data.stageId,
    movedById: ctx.user.id,
  });

  // Audit log
  await logOpportunityAction(
    { orgId: ctx.org.id, workspaceId: ctx.workspace.id, userId: ctx.user.id, userEmail: ctx.user.email },
    AuditActions.OPPORTUNITY_CREATED,
    opportunity.id,
    { title: data.title, pipelineId: data.pipelineId, stageId: data.stageId, value: data.value }
  );

  // Outbox event for automations
  await publishOpportunityEvent(
    { orgId: ctx.org.id, workspaceId: ctx.workspace.id },
    OutboxEventTypes.OPPORTUNITY_CREATED,
    opportunity.id,
    { opportunity, createdBy: { id: ctx.user.id, email: ctx.user.email } }
  );

  revalidatePath("/crm/pipelines");
  return opportunity;
}

export async function moveOpportunityStage(opportunityId: number, newStageId: number) {
  const ctx = await requireAuthContext();

  // Get current opportunity
  const opportunity = await db.query.opportunities.findFirst({
    where: and(
      eq(opportunities.id, opportunityId),
      eq(opportunities.workspaceId, ctx.workspace.id)
    ),
  });

  if (!opportunity) throw new Error("Opportunity not found");

  const oldStageId = opportunity.stageId;

  // Update opportunity stage
  const [updated] = await db
    .update(opportunities)
    .set({
      stageId: newStageId,
      updatedAt: new Date(),
    })
    .where(eq(opportunities.id, opportunityId))
    .returning();

  // Record stage change in history
  await db.insert(opportunityStageHistory).values({
    opportunityId: opportunityId,
    fromStageId: oldStageId,
    toStageId: newStageId,
    movedById: ctx.user.id,
  });

  // Audit log
  await logOpportunityAction(
    { orgId: ctx.org.id, workspaceId: ctx.workspace.id, userId: ctx.user.id, userEmail: ctx.user.email },
    AuditActions.OPPORTUNITY_MOVED,
    opportunityId,
    { fromStageId: oldStageId, toStageId: newStageId, title: opportunity.title }
  );

  // Outbox event for automations (opportunity.moved is key for GoHighLevel-style workflows)
  await publishOpportunityEvent(
    { orgId: ctx.org.id, workspaceId: ctx.workspace.id },
    OutboxEventTypes.OPPORTUNITY_MOVED,
    opportunityId,
    {
      opportunity: updated,
      fromStageId: oldStageId,
      toStageId: newStageId,
      movedBy: { id: ctx.user.id, email: ctx.user.email },
    }
  );

  revalidatePath("/crm/pipelines");
  return updated;
}

export async function updateOpportunity(
  opportunityId: number,
  data: {
    title?: string;
    contactId?: number | null;
    value?: string;
    expectedCloseDate?: Date | null;
  }
) {
  const ctx = await requireAuthContext();

  const [updated] = await db
    .update(opportunities)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(
      and(
        eq(opportunities.id, opportunityId),
        eq(opportunities.workspaceId, ctx.workspace.id)
      )
    )
    .returning();

  // Audit log
  if (updated) {
    await logOpportunityAction(
      { orgId: ctx.org.id, workspaceId: ctx.workspace.id, userId: ctx.user.id, userEmail: ctx.user.email },
      AuditActions.OPPORTUNITY_UPDATED,
      opportunityId,
      { changes: data }
    );
  }

  revalidatePath("/crm/pipelines");
  return updated;
}

export async function deleteOpportunity(opportunityId: number) {
  const ctx = await requireAuthContext();

  // Get opportunity info before deleting for audit
  const opportunity = await db.query.opportunities.findFirst({
    where: and(eq(opportunities.id, opportunityId), eq(opportunities.workspaceId, ctx.workspace.id)),
  });

  await db
    .delete(opportunities)
    .where(
      and(
        eq(opportunities.id, opportunityId),
        eq(opportunities.workspaceId, ctx.workspace.id)
      )
    );

  // Audit log
  await logOpportunityAction(
    { orgId: ctx.org.id, workspaceId: ctx.workspace.id, userId: ctx.user.id, userEmail: ctx.user.email },
    AuditActions.OPPORTUNITY_DELETED,
    opportunityId,
    opportunity ? { title: opportunity.title, value: opportunity.value } : undefined
  );

  revalidatePath("/crm/pipelines");
}

// ============================================
// Notes
// ============================================

export async function createNote(data: {
  type: "contact" | "opportunity";
  contactId?: number;
  opportunityId?: number;
  content: string;
}) {
  const ctx = await requireAuthContext();

  const [note] = await db
    .insert(notes)
    .values({
      workspaceId: ctx.workspace.id,
      type: data.type,
      contactId: data.contactId,
      opportunityId: data.opportunityId,
      content: data.content,
      createdById: ctx.user.id,
    })
    .returning();

  // Audit log
  await logNoteAction(
    { orgId: ctx.org.id, workspaceId: ctx.workspace.id, userId: ctx.user.id, userEmail: ctx.user.email },
    AuditActions.NOTE_CREATED,
    note.id,
    { type: data.type, contactId: data.contactId, opportunityId: data.opportunityId }
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
    note ? { type: note.type, contactId: note.contactId, opportunityId: note.opportunityId } : undefined
  );

  revalidatePath("/crm");
}

// ============================================
// Lead Queue (New Leads awaiting action)
// ============================================

export async function getNewLeads() {
  const ctx = await requireAuthContext();

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);

  // Get contacts that either:
  // 1. Have no opportunities yet (brand new leads), OR
  // 2. Have a scheduled follow-up that is due (today or earlier)
  const result = await db.query.contacts.findMany({
    where: eq(contacts.workspaceId, ctx.workspace.id),
    with: {
      opportunities: {
        with: {
          stage: true,
          pipeline: true,
        },
      },
      leadAttribution: true,
    },
    orderBy: [desc(contacts.createdAt)],
    limit: 50,
  });

  // Filter leads that need action today
  const newLeads = result.filter(contact => {
    // 1. New leads with no opportunities
    if (contact.opportunities.length === 0) return true;

    // 2. Leads with scheduled follow-up that is due
    if (contact.nextFollowUpAt) {
      const followUpDate = new Date(contact.nextFollowUpAt);
      if (followUpDate <= today) return true;
    }

    // 3. Leads only in first/new stage (not yet contacted)
    const allInFirstStage = contact.opportunities.every(opp =>
      opp.stage?.order === 0 ||
      opp.stage?.name?.toLowerCase().includes("new") ||
      opp.stage?.name?.toLowerCase().includes("nieuw") ||
      opp.stage?.name?.toLowerCase().includes("lead")
    );
    if (allInFirstStage) return true;

    return false;
  });

  // Sort: scheduled follow-ups first, then by creation date
  newLeads.sort((a, b) => {
    // Prioritize overdue follow-ups
    const aFollowUp = a.nextFollowUpAt ? new Date(a.nextFollowUpAt).getTime() : Infinity;
    const bFollowUp = b.nextFollowUpAt ? new Date(b.nextFollowUpAt).getTime() : Infinity;

    if (aFollowUp !== bFollowUp) {
      return aFollowUp - bFollowUp; // Earlier follow-ups first
    }

    // Then by creation date (newest first)
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  // Look up form names for Meta leads
  const formIds = newLeads
    .map(c => c.leadAttribution?.metaFormId)
    .filter((id): id is string => !!id);

  let formNameMap: Record<string, string> = {};
  if (formIds.length > 0) {
    const forms = await db.query.metaForms.findMany({
      where: inArray(metaForms.formId, formIds),
    });
    formNameMap = forms.reduce((acc, form) => {
      if (form.formId && form.formName) {
        acc[form.formId] = form.formName;
      }
      return acc;
    }, {} as Record<string, string>);
  }

  // Enrich leads with form names
  return newLeads.slice(0, 20).map(lead => ({
    ...lead,
    leadSource: lead.leadAttribution?.source ?? null,
    metaFormName: lead.leadAttribution?.metaFormId
      ? formNameMap[lead.leadAttribution.metaFormId] ?? null
      : null,
  }));
}

export async function processLead(data: {
  contactId: number;
  action: "not_answered" | "schedule_now" | "callback_later" | "not_interested" | "invalid_number";
  pipelineId?: number;
  notes?: string;
  callbackDays?: number; // For callback_later: 7, 30, 90, 180 days
}) {
  const ctx = await requireAuthContext();

  // Get workspace CRM settings (null if not configured)
  const settings = await getCrmSettingsByWorkspaceId(ctx.workspace.id);

  // Get the contact
  const contact = await db.query.contacts.findFirst({
    where: and(
      eq(contacts.id, data.contactId),
      eq(contacts.workspaceId, ctx.workspace.id)
    ),
    with: {
      opportunities: true,
    },
  });

  if (!contact) {
    throw new Error("Contact not found");
  }

  // Track call attempt (increment on most call actions)
  const shouldIncrementCallCount = data.action !== "schedule_now" && data.action !== "not_interested";
  const newCallCount = shouldIncrementCallCount
    ? (contact.callCount ?? 0) + 1
    : (contact.callCount ?? 0);

  // Calculate next follow-up date based on action and settings
  let nextFollowUpAt: Date | null = null;

  // Use settings if configured, otherwise use sensible defaults
  const followUpDays = settings?.autoFollowUpEnabled && settings.followUpDays > 0
    ? settings.followUpDays
    : 2; // Default fallback
  const maxCallAttempts = settings?.autoFollowUpEnabled && settings.maxCallAttempts > 0
    ? settings.maxCallAttempts
    : 3; // Default fallback
  const sendEmailOnLost = settings?.sendEmailOnLost ?? false;

  if (data.action === "not_answered") {
    // Not answered: use configured follow-up days (or default 2)
    // Only set follow-up if not at max attempts
    if (newCallCount < maxCallAttempts) {
      nextFollowUpAt = new Date();
      nextFollowUpAt.setDate(nextFollowUpAt.getDate() + followUpDays);
      nextFollowUpAt.setHours(9, 0, 0, 0);
    }
  } else if (data.action === "callback_later") {
    // Callback later: use provided days or default to 7 days
    const daysToAdd = data.callbackDays ?? 7;
    nextFollowUpAt = new Date();
    nextFollowUpAt.setDate(nextFollowUpAt.getDate() + daysToAdd);
    nextFollowUpAt.setHours(9, 0, 0, 0);
  }

  // Update contact with call tracking and follow-up
  await db
    .update(contacts)
    .set({
      callCount: newCallCount,
      lastCallAt: new Date(),
      lastCallResult: data.action,
      nextFollowUpAt: nextFollowUpAt,
      updatedAt: new Date(),
    })
    .where(eq(contacts.id, data.contactId));

  // Auto-email trigger for:
  // 1. After max unsuccessful calls (if sendEmailOnLost is enabled)
  // 2. Invalid number (immediate email)
  const shouldSendMissedCallEmail = sendEmailOnLost &&
    newCallCount >= maxCallAttempts &&
    data.action === "not_answered" &&
    contact.email &&
    !contact.followUpEmailSent;

  const shouldSendInvalidNumberEmail = data.action === "invalid_number" && contact.email;

  if (shouldSendMissedCallEmail || shouldSendInvalidNumberEmail) {
    // Mark email as sent
    await db
      .update(contacts)
      .set({ followUpEmailSent: true })
      .where(eq(contacts.id, data.contactId));

    // Queue email event for processing
    await publishContactEvent(
      { orgId: ctx.org.id, workspaceId: ctx.workspace.id },
      OutboxEventTypes.CONTACT_FOLLOW_UP_NEEDED,
      contact.id,
      {
        contact: { ...contact, callCount: newCallCount },
        callCount: newCallCount,
        reason: shouldSendInvalidNumberEmail ? "invalid_number" : "3_unsuccessful_calls",
        emailTemplate: shouldSendInvalidNumberEmail ? "invalid_number" : "missed_calls",
        triggeredBy: { id: ctx.user.id, email: ctx.user.email },
      }
    );
  }

  // Get or create a pipeline (use first one if not specified)
  let pipelineId = data.pipelineId;
  if (!pipelineId) {
    const defaultPipeline = await db.query.pipelines.findFirst({
      where: eq(pipelines.workspaceId, ctx.workspace.id),
      with: {
        stages: {
          orderBy: [asc(pipelineStages.order)],
        },
      },
    });

    if (!defaultPipeline) {
      // Create a default pipeline with standard stages
      const [newPipeline] = await db
        .insert(pipelines)
        .values({
          workspaceId: ctx.workspace.id,
          name: "Sales Pipeline",
        })
        .returning();

      // Create default stages with Dutch call-count based flow
      // Note: After 3x not answered → direct to Lost (no 3x stage needed)
      // Wachtrij = for leads that requested callback later (1w/1m/3m/6m)
      const defaultStages = [
        { name: "Lead", color: "#3b82f6", order: 0 },
        { name: "1x Gebeld", color: "#f59e0b", order: 1 },
        { name: "2x Gebeld", color: "#f97316", order: 2 },
        { name: "Wachtrij", color: "#06b6d4", order: 3 },
        { name: "Gekwalificeerd", color: "#22c55e", order: 4 },
        { name: "Niet Geïnteresseerd", color: "#ec4899", order: 5 },
        { name: "Gewonnen", color: "#10b981", order: 6 },
        { name: "Verloren", color: "#6b7280", order: 7 },
      ];

      await db.insert(pipelineStages).values(
        defaultStages.map((stage) => ({
          pipelineId: newPipeline.id,
          name: stage.name,
          color: stage.color,
          order: stage.order,
        }))
      );

      pipelineId = newPipeline.id;
    } else {
      pipelineId = defaultPipeline.id;
    }
  }

  // Get pipeline stages
  const stages = await db.query.pipelineStages.findMany({
    where: eq(pipelineStages.pipelineId, pipelineId),
    orderBy: [asc(pipelineStages.order)],
  });

  // Determine target stage based on action and call count
  let targetStage = stages[0]; // Default to first stage (Lead)

  // Helper function to find stage by name patterns
  const findStageByPatterns = (patterns: string[]) => {
    for (const stage of stages) {
      const stageLower = stage.name.toLowerCase();
      if (patterns.some(p => stageLower.includes(p.toLowerCase()))) {
        return stage;
      }
    }
    return null;
  };

  if (data.action === "not_answered") {
    // Route based on call count:
    // 1x → "1x Gebeld", 2x → "2x Gebeld", maxAttempts+ → directly to "Verloren" (Lost)
    if (newCallCount >= maxCallAttempts) {
      // Max attempts reached - go directly to Lost
      const lostStage = findStageByPatterns(["verloren", "lost"]);
      targetStage = lostStage || stages[stages.length - 1] || stages[0];
    } else {
      // 1x, 2x, etc. - go to corresponding stage
      const callCountStageMap: Record<number, string[]> = {
        1: ["1x gebeld", "1x called"],
        2: ["2x gebeld", "2x called"],
      };
      const patterns = callCountStageMap[newCallCount] || [`${newCallCount}x gebeld`, `${newCallCount}x called`];
      const foundStage = findStageByPatterns(patterns);

      if (foundStage) {
        targetStage = foundStage;
      } else {
        // Fallback: use order-based lookup (1x=1, 2x=2, etc.)
        targetStage = stages[Math.min(newCallCount, stages.length - 1)] || stages[0];
      }
    }
  } else {
    // Handle other actions
    const actionStageMap: Record<string, string[]> = {
      schedule_now: ["gekwalificeerd", "qualified", "gewonnen", "won"],
      callback_later: ["wachtrij", "terugbellen", "callback", "waiting", "queue"],
      not_interested: ["niet geïnteresseerd", "not interested"],
      invalid_number: ["verloren", "lost"],
    };

    const patterns = actionStageMap[data.action] || [];
    const foundStage = findStageByPatterns(patterns);

    if (foundStage) {
      targetStage = foundStage;
    } else {
      // Fallback order for other actions (updated for new stage structure)
      const fallbackOrder: Record<string, number> = {
        schedule_now: 4,      // Gekwalificeerd
        callback_later: 3,    // Wachtrij
        not_interested: 5,    // Niet Geïnteresseerd
        invalid_number: 7,    // Verloren
      };
      const order = fallbackOrder[data.action] ?? 0;
      targetStage = stages[Math.min(order, stages.length - 1)] || stages[0];
    }
  }

  // Check if contact already has an opportunity in this pipeline
  let opportunity = contact.opportunities.find(o => o.pipelineId === pipelineId);

  if (opportunity) {
    // Move existing opportunity to new stage
    await moveOpportunityStage(opportunity.id, targetStage.id);
  } else {
    // Create new opportunity
    const contactName = [contact.firstName, contact.lastName].filter(Boolean).join(" ") || contact.email || "Lead";

    const [newOpportunity] = await db
      .insert(opportunities)
      .values({
        workspaceId: ctx.workspace.id,
        pipelineId: pipelineId,
        stageId: targetStage.id,
        contactId: contact.id,
        title: `${contactName} - ${new Date().toLocaleDateString("nl-NL")}`,
        createdById: ctx.user.id,
      })
      .returning();

    // Log initial stage
    await db.insert(opportunityStageHistory).values({
      opportunityId: newOpportunity.id,
      toStageId: targetStage.id,
      movedById: ctx.user.id,
    });

    opportunity = newOpportunity;
  }

  // Add note if provided
  if (data.notes) {
    await db.insert(notes).values({
      workspaceId: ctx.workspace.id,
      type: "opportunity",
      opportunityId: opportunity.id,
      content: `[${data.action.replace("_", " ").toUpperCase()}] ${data.notes}`,
      createdById: ctx.user.id,
    });
  }

  revalidatePath("/crm");
  return { success: true, opportunityId: opportunity.id };
}

export async function createTestLead() {
  const ctx = await requireAuthContext();

  // Create a test contact
  const testNames = [
    { first: "Jan", last: "de Vries", company: "Tech Solutions BV" },
    { first: "Sophie", last: "Bakker", company: "Digital Agency" },
    { first: "Thomas", last: "Jansen", company: "StartupXYZ" },
    { first: "Emma", last: "van den Berg", company: "Marketing Pro" },
    { first: "Lucas", last: "Visser", company: "E-commerce Store" },
  ];

  const randomName = testNames[Math.floor(Math.random() * testNames.length)];
  const randomPhone = `06${Math.floor(10000000 + Math.random() * 90000000)}`;

  const [contact] = await db
    .insert(contacts)
    .values({
      workspaceId: ctx.workspace.id,
      firstName: randomName.first,
      lastName: randomName.last,
      email: `${randomName.first.toLowerCase()}.${randomName.last.toLowerCase().replace(" ", "")}@example.com`,
      phone: randomPhone,
      company: randomName.company,
      createdById: ctx.user.id,
    })
    .returning();

  revalidatePath("/crm");
  return contact;
}

// ============================================
// Process Follow-ups (Scheduled Job)
// ============================================
// This function is called by a cron job to:
// 1. Move contacts from "1x/2x Gebeld" back to "Lead" after configured days
// 2. Move contacts from "Wachtrij" (callback_later) back to "Lead" after callback period
// Only processes workspaces that have autoFollowUpEnabled = true
export async function processFollowUps(): Promise<{
  processed: number;
  movedToLead: number;
  movedToLost: number;
  skippedDisabled: number;
}> {
  const now = new Date();

  // Find all contacts with follow-up due
  const contactsWithFollowUp = await db.query.contacts.findMany({
    where: and(
      isNotNull(contacts.nextFollowUpAt),
      lte(contacts.nextFollowUpAt, now)
    ),
    with: {
      opportunities: {
        with: {
          stage: true,
          pipeline: {
            with: {
              stages: {
                orderBy: [asc(pipelineStages.order)],
              },
            },
          },
        },
      },
      workspace: true,
    },
  });

  let processed = 0;
  let movedToLead = 0;
  let movedToLost = 0;
  let skippedDisabled = 0;

  // Cache workspace settings to avoid repeated DB calls
  const settingsCache = new Map<number, CrmSettingsData | null>();

  for (const contact of contactsWithFollowUp) {
    // Check workspace settings
    const workspaceId = contact.workspaceId;
    if (!settingsCache.has(workspaceId)) {
      settingsCache.set(workspaceId, await getCrmSettingsByWorkspaceId(workspaceId));
    }
    const settings = settingsCache.get(workspaceId);

    // Skip if follow-ups are not enabled for this workspace
    if (!settings?.autoFollowUpEnabled) {
      // Clear the follow-up date since the feature is disabled
      await db
        .update(contacts)
        .set({ nextFollowUpAt: null })
        .where(eq(contacts.id, contact.id));
      skippedDisabled++;
      continue;
    }

    // Find the active opportunity
    const opportunity = contact.opportunities[0];
    if (!opportunity || !opportunity.stage || !opportunity.pipeline) {
      // Clear the follow-up if no opportunity found
      await db
        .update(contacts)
        .set({ nextFollowUpAt: null })
        .where(eq(contacts.id, contact.id));
      continue;
    }

    const currentStageName = opportunity.stage.name.toLowerCase();
    const pipelineStagesList = opportunity.pipeline.stages;

    // Helper to find stage by pattern
    const findStage = (patterns: string[]) => {
      return pipelineStagesList.find(s =>
        patterns.some(p => s.name.toLowerCase().includes(p.toLowerCase()))
      );
    };

    let targetStage = null;

    // Check current stage and determine target
    // "Wachtrij" = leads that requested callback later (1w/1m/3m/6m)
    // "1x/2x Gebeld" = leads that weren't answered
    if (
      currentStageName.includes("1x gebeld") ||
      currentStageName.includes("2x gebeld") ||
      currentStageName.includes("wachtrij") ||
      currentStageName.includes("terugbellen") ||
      currentStageName.includes("callback") ||
      currentStageName.includes("queue")
    ) {
      // Move back to Lead for re-calling
      targetStage = findStage(["lead", "new", "nieuw"]);
      movedToLead++;
    }

    if (targetStage && targetStage.id !== opportunity.stageId) {
      // Move the opportunity to the target stage
      await db
        .update(opportunities)
        .set({
          stageId: targetStage.id,
          updatedAt: now,
        })
        .where(eq(opportunities.id, opportunity.id));

      // Log stage history
      await db.insert(opportunityStageHistory).values({
        opportunityId: opportunity.id,
        fromStageId: opportunity.stageId,
        toStageId: targetStage.id,
        // System action, no user
      });

      // Add a note about the automatic movement
      const noteContent = currentStageName.includes("wachtrij") ||
        currentStageName.includes("terugbellen") ||
        currentStageName.includes("callback")
        ? `[SYSTEEM] Terugbel-periode verstreken - terug naar Lead voor contact.`
        : `[SYSTEEM] Follow-up datum bereikt (${settings.followUpDays} dagen) - terug naar Lead voor hercontact.`;

      await db.insert(notes).values({
        workspaceId: opportunity.workspaceId,
        type: "opportunity",
        opportunityId: opportunity.id,
        content: noteContent,
      });
    }

    // Clear the follow-up date
    await db
      .update(contacts)
      .set({ nextFollowUpAt: null })
      .where(eq(contacts.id, contact.id));

    processed++;
  }

  return { processed, movedToLead, movedToLost, skippedDisabled };
}
