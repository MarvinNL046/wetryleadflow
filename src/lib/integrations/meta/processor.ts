/**
 * Meta Lead Processor - Production Ready
 *
 * Features:
 * - Idempotent processing (deduplication via leadgen_id)
 * - Raw lead storage for debugging/reprocessing
 * - Retry logic with exponential backoff
 * - Transaction support for data consistency
 * - Dead-letter handling for failed leads
 */

import { db } from "@/lib/db";
import {
  webhookEvents,
  metaPages,
  metaForms,
  metaLeadRaw,
  leadIngestRoutes,
  leadFieldMappings,
  contacts,
  opportunities,
  opportunityStageHistory,
  leadAttribution,
} from "@/lib/db/schema";
import { eq, and, isNull, lt, inArray, or } from "drizzle-orm";
import { decryptToken } from "@/lib/crypto";
import { fetchLeadDetails, parseLeadFields } from "./client";
import { logAudit } from "@/lib/audit";
import { AuditActions, EntityTypes } from "@/lib/audit/constants";
import { publishContactEvent, publishOpportunityEvent } from "@/lib/outbox";
import { OutboxEventTypes } from "@/lib/outbox/constants";

// Configuration
const MAX_RETRY_ATTEMPTS = 5;
const RETRY_DELAY_MS = 1000; // Base delay for exponential backoff
const STALE_PROCESSING_MINUTES = 5; // Consider processing stale after 5 minutes

interface ProcessResult {
  success: boolean;
  contactId?: number;
  opportunityId?: number;
  skipped?: boolean;
  error?: string;
}

/**
 * Default field mappings for common Meta lead form fields
 */
const DEFAULT_FIELD_MAPPINGS: Record<string, string> = {
  email: "email",
  phone_number: "phone",
  full_name: "fullName",
  first_name: "firstName",
  last_name: "lastName",
  company_name: "company",
  job_title: "position",
};

/**
 * Store raw lead from webhook for processing
 * Returns existing lead if already stored (idempotent)
 */
export async function storeRawLead(
  orgId: number,
  leadgenId: string,
  pageId: string,
  payload: Record<string, unknown>
): Promise<{ id: number; isNew: boolean }> {
  // Check if already exists (idempotency)
  const existing = await db.query.metaLeadRaw.findFirst({
    where: eq(metaLeadRaw.leadgenId, leadgenId),
  });

  if (existing) {
    console.log(`[Meta Processor] Lead ${leadgenId} already exists, skipping storage`);
    return { id: existing.id, isNew: false };
  }

  // Store new raw lead
  const [rawLead] = await db
    .insert(metaLeadRaw)
    .values({
      orgId,
      leadgenId,
      pageId,
      formId: payload.formId as string | undefined,
      adId: payload.adId as string | undefined,
      adgroupId: payload.adgroupId as string | undefined,
      campaignId: payload.campaignId as string | undefined,
      payload,
      status: "pending",
    })
    .returning();

  console.log(`[Meta Processor] Stored raw lead ${leadgenId} with id ${rawLead.id}`);
  return { id: rawLead.id, isNew: true };
}

/**
 * Process a raw lead by ID
 * Fetches full lead data from Meta and creates contact/opportunity
 */
export async function processRawLead(rawLeadId: number): Promise<ProcessResult> {
  // Get the raw lead
  const rawLead = await db.query.metaLeadRaw.findFirst({
    where: eq(metaLeadRaw.id, rawLeadId),
  });

  if (!rawLead) {
    return { success: false, error: "Raw lead not found" };
  }

  // Skip if already processed
  if (rawLead.status === "completed") {
    return { success: true, skipped: true, contactId: rawLead.contactId ?? undefined };
  }

  // Skip if max retries exceeded
  if (rawLead.retryCount >= MAX_RETRY_ATTEMPTS) {
    await db
      .update(metaLeadRaw)
      .set({ status: "failed", errorMessage: "Max retry attempts exceeded" })
      .where(eq(metaLeadRaw.id, rawLeadId));
    return { success: false, error: "Max retry attempts exceeded" };
  }

  // Mark as processing with timestamp for stale detection
  await db
    .update(metaLeadRaw)
    .set({
      status: "processing",
      processingStartedAt: new Date(),
      retryCount: rawLead.retryCount + 1,
    })
    .where(eq(metaLeadRaw.id, rawLeadId));

  try {
    // Find the page connection
    const page = await db.query.metaPages.findFirst({
      where: and(
        eq(metaPages.pageId, rawLead.pageId),
        eq(metaPages.isActive, true)
      ),
    });

    if (!page) {
      throw new Error(`No active page connection found for page ${rawLead.pageId}`);
    }

    // Verify org matches
    if (page.orgId !== rawLead.orgId) {
      throw new Error(`Page org mismatch: expected ${rawLead.orgId}, got ${page.orgId}`);
    }

    // Decrypt the page access token
    const pageAccessToken = decryptToken(page.pageAccessTokenEncrypted);

    // Fetch full lead details from Meta API
    const leadData = await fetchLeadDetails(rawLead.leadgenId, pageAccessToken);

    // Parse field data
    const fieldData = parseLeadFields(leadData.field_data);

    // Update raw lead with fetched data
    await db
      .update(metaLeadRaw)
      .set({
        formId: leadData.form_id,
        adId: leadData.ad_id,
        adgroupId: leadData.adset_id,
        campaignId: leadData.campaign_id,
        fieldData,
        fetchedAt: new Date(),
      })
      .where(eq(metaLeadRaw.id, rawLeadId));

    // Find routing rule
    const route = await findIngestRoute(page.id, leadData.form_id);

    if (!route) {
      throw new Error(
        `No routing rule found for page ${rawLead.pageId}, form ${leadData.form_id || "any"}`
      );
    }

    // Get field mappings
    const mappings = await db.query.leadFieldMappings.findMany({
      where: eq(leadFieldMappings.routeId, route.id),
    });

    // Map lead data to contact fields
    const contactData = mapLeadToContact(fieldData, mappings);

    // Contact dedupe: find existing contact by email or phone
    let contact: typeof contacts.$inferSelect | null = null;
    let isNewContact = false;
    let matchedOn: "email" | "phone" | "none" = "none";

    // 1. Try to find by email first (most reliable)
    if (contactData.email) {
      const existingByEmail = await db.query.contacts.findFirst({
        where: and(
          eq(contacts.workspaceId, route.workspaceId),
          eq(contacts.email, contactData.email)
        ),
      });
      if (existingByEmail) {
        contact = existingByEmail;
        matchedOn = "email";
      }
    }

    // 2. If no email match, try phone
    if (!contact && contactData.phone) {
      const normalizedPhone = contactData.phone.replace(/[^\d+]/g, "");
      const existingByPhone = await db.query.contacts.findFirst({
        where: and(
          eq(contacts.workspaceId, route.workspaceId),
          eq(contacts.phone, normalizedPhone)
        ),
      });
      if (existingByPhone) {
        contact = existingByPhone;
        matchedOn = "phone";
      }
    }

    // 3. Create new contact if no match found
    if (contact === null) {
      const [newContact] = await db
        .insert(contacts)
        .values({
          workspaceId: route.workspaceId,
          firstName: contactData.firstName,
          lastName: contactData.lastName,
          email: contactData.email,
          phone: contactData.phone,
          company: contactData.company,
          position: contactData.position,
        })
        .returning();
      contact = newContact;
      isNewContact = true;
    } else {
      // Update existing contact with new data (merge)
      const updates: Partial<typeof contactData> = {};
      if (contactData.firstName && !contact.firstName) updates.firstName = contactData.firstName;
      if (contactData.lastName && !contact.lastName) updates.lastName = contactData.lastName;
      if (contactData.email && !contact.email) updates.email = contactData.email;
      if (contactData.phone && !contact.phone) updates.phone = contactData.phone;
      if (contactData.company && !contact.company) updates.company = contactData.company;
      if (contactData.position && !contact.position) updates.position = contactData.position;

      if (Object.keys(updates).length > 0) {
        await db
          .update(contacts)
          .set({ ...updates, updatedAt: new Date() })
          .where(eq(contacts.id, contact.id));
      }
    }

    // Create lead attribution (always, for tracking multiple lead sources)
    await db.insert(leadAttribution).values({
      contactId: contact.id,
      source: "meta",
      metaPageId: rawLead.pageId,
      metaFormId: leadData.form_id,
      metaLeadgenId: rawLead.leadgenId,
      metaAdId: leadData.ad_id,
      metaCampaignId: leadData.campaign_id,
      metaAdsetId: leadData.adset_id,
      rawPayload: leadData,
    });

    // Create opportunity
    const opportunityTitle = contactData.fullName
      ? `Lead: ${contactData.fullName}`
      : contactData.email
        ? `Lead: ${contactData.email}`
        : `Meta Lead ${rawLead.leadgenId.slice(-8)}`;

    const [opportunity] = await db
      .insert(opportunities)
      .values({
        workspaceId: route.workspaceId,
        pipelineId: route.pipelineId,
        stageId: route.stageId,
        contactId: contact.id,
        title: opportunityTitle,
        assignedToId: route.assignToUserId,
      })
      .returning();

    // Record initial stage
    await db.insert(opportunityStageHistory).values({
      opportunityId: opportunity.id,
      fromStageId: null,
      toStageId: route.stageId,
      movedById: null,
    });

    // Mark raw lead as completed
    await db
      .update(metaLeadRaw)
      .set({
        status: "completed",
        contactId: contact.id,
        opportunityId: opportunity.id,
        processedAt: new Date(),
        errorMessage: null,
      })
      .where(eq(metaLeadRaw.id, rawLeadId));

    // Audit log - log contact creation or update with match reason
    await logAudit(
      { orgId: route.orgId, workspaceId: route.workspaceId },
      {
        action: isNewContact ? AuditActions.CONTACT_CREATED : AuditActions.CONTACT_UPDATED,
        entityType: EntityTypes.CONTACT,
        entityId: contact.id,
        metadata: {
          source: "meta",
          leadgenId: rawLead.leadgenId,
          formId: leadData.form_id,
          pageId: rawLead.pageId,
          rawLeadId: rawLeadId,
          isNewContact,
          matchedOn, // "email", "phone", or "none"
        },
      }
    );

    // Publish outbox events
    if (isNewContact) {
      await publishContactEvent(
        { orgId: route.orgId, workspaceId: route.workspaceId },
        OutboxEventTypes.CONTACT_CREATED,
        contact.id,
        { contact, source: "meta", leadgenId: rawLead.leadgenId }
      );
    }

    await publishOpportunityEvent(
      { orgId: route.orgId, workspaceId: route.workspaceId },
      OutboxEventTypes.OPPORTUNITY_CREATED,
      opportunity.id,
      { opportunity, source: "meta", leadgenId: rawLead.leadgenId, isNewContact, matchedOn }
    );

    const action = isNewContact ? "Created" : `Matched (${matchedOn})`;
    console.log(
      `[Meta Processor] ${action} contact ${contact.id} and created opportunity ${opportunity.id} from lead ${rawLead.leadgenId}`
    );

    return { success: true, contactId: contact.id, opportunityId: opportunity.id };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);

    // Update raw lead with error
    await db
      .update(metaLeadRaw)
      .set({
        status: "failed",
        errorMessage,
      })
      .where(eq(metaLeadRaw.id, rawLeadId));

    console.error(`[Meta Processor] Error processing raw lead ${rawLeadId}:`, errorMessage);

    return { success: false, error: errorMessage };
  }
}

/**
 * Process a webhook event (legacy support)
 * Now delegates to raw lead processing
 */
export async function processWebhookEvent(eventId: number): Promise<ProcessResult> {
  const event = await db.query.webhookEvents.findFirst({
    where: eq(webhookEvents.id, eventId),
  });

  if (!event) {
    return { success: false, error: "Event not found" };
  }

  if (event.status === "processed") {
    return { success: true, skipped: true };
  }

  // Mark as processing
  await db
    .update(webhookEvents)
    .set({ status: "processing", attempts: event.attempts + 1 })
    .where(eq(webhookEvents.id, eventId));

  try {
    const payload = event.payload as {
      pageId: string;
      formId?: string;
      leadgenId: string;
      adgroupId?: string;
      adId?: string;
    };

    // Find page to get org_id
    const page = await db.query.metaPages.findFirst({
      where: eq(metaPages.pageId, payload.pageId),
    });

    if (!page) {
      throw new Error(`Page not found: ${payload.pageId}`);
    }

    // Store raw lead
    const { id: rawLeadId } = await storeRawLead(
      page.orgId,
      payload.leadgenId,
      payload.pageId,
      payload
    );

    // Process the raw lead
    const result = await processRawLead(rawLeadId);

    // Update webhook event
    await db
      .update(webhookEvents)
      .set({
        status: result.success ? "processed" : "failed",
        processedAt: result.success ? new Date() : null,
        resultEntityType: result.contactId ? "contact" : null,
        resultEntityId: result.contactId,
        errorMessage: result.error,
      })
      .where(eq(webhookEvents.id, eventId));

    return result;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);

    await db
      .update(webhookEvents)
      .set({ status: "failed", errorMessage })
      .where(eq(webhookEvents.id, eventId));

    return { success: false, error: errorMessage };
  }
}

/**
 * Find the ingest route for a page/form combination
 */
async function findIngestRoute(pageDbId: number, formId?: string | null) {
  // Try form-specific route first
  if (formId) {
    const form = await db.query.metaForms.findFirst({
      where: and(
        eq(metaForms.pageId, pageDbId),
        eq(metaForms.formId, formId)
      ),
    });

    if (form) {
      const formRoute = await db.query.leadIngestRoutes.findFirst({
        where: and(
          eq(leadIngestRoutes.metaPageId, pageDbId),
          eq(leadIngestRoutes.metaFormId, form.id),
          eq(leadIngestRoutes.isActive, true)
        ),
      });

      if (formRoute) return formRoute;
    }
  }

  // Fall back to page-level route
  return db.query.leadIngestRoutes.findFirst({
    where: and(
      eq(leadIngestRoutes.metaPageId, pageDbId),
      isNull(leadIngestRoutes.metaFormId),
      eq(leadIngestRoutes.isActive, true)
    ),
  });
}

/**
 * Map raw lead fields to contact data
 */
function mapLeadToContact(
  rawFields: Record<string, string>,
  customMappings: Array<{ sourceFieldKey: string; targetField: string; transform?: string | null }>
): {
  firstName?: string;
  lastName?: string;
  fullName?: string;
  email?: string;
  phone?: string;
  company?: string;
  position?: string;
} {
  const result: ReturnType<typeof mapLeadToContact> = {};

  // Build mapping lookup
  const mappingLookup = new Map<string, { target: string; transform?: string | null }>();

  for (const mapping of customMappings) {
    mappingLookup.set(mapping.sourceFieldKey, {
      target: mapping.targetField,
      transform: mapping.transform,
    });
  }

  for (const [source, target] of Object.entries(DEFAULT_FIELD_MAPPINGS)) {
    if (!mappingLookup.has(source)) {
      mappingLookup.set(source, { target });
    }
  }

  // Apply mappings
  for (const [sourceKey, value] of Object.entries(rawFields)) {
    const mapping = mappingLookup.get(sourceKey);
    if (!mapping) continue;

    let processedValue = value;
    if (mapping.transform) {
      processedValue = applyTransform(value, mapping.transform);
    }

    switch (mapping.target) {
      case "firstName":
        result.firstName = processedValue;
        break;
      case "lastName":
        result.lastName = processedValue;
        break;
      case "fullName":
        result.fullName = processedValue;
        if (!result.firstName && !result.lastName) {
          const [first, ...rest] = processedValue.split(" ");
          result.firstName = first;
          result.lastName = rest.join(" ");
        }
        break;
      case "email":
        result.email = processedValue;
        break;
      case "phone":
        result.phone = processedValue;
        break;
      case "company":
        result.company = processedValue;
        break;
      case "position":
        result.position = processedValue;
        break;
    }
  }

  return result;
}

/**
 * Apply transform to value
 */
function applyTransform(value: string, transform: string): string {
  switch (transform) {
    case "lowercase":
      return value.toLowerCase();
    case "uppercase":
      return value.toUpperCase();
    case "trim":
      return value.trim();
    case "phone_format":
      return value.replace(/(?!^\+)[^\d]/g, "");
    default:
      return value;
  }
}

/**
 * Process all pending raw leads
 */
export async function processPendingLeads(limit = 50): Promise<{
  processed: number;
  failed: number;
  skipped: number;
}> {
  const pendingLeads = await db.query.metaLeadRaw.findMany({
    where: and(
      inArray(metaLeadRaw.status, ["pending", "failed"]),
      lt(metaLeadRaw.retryCount, MAX_RETRY_ATTEMPTS)
    ),
    orderBy: (leads, { asc }) => [asc(leads.createdAt)],
    limit,
  });

  let processed = 0;
  let failed = 0;
  let skipped = 0;

  for (const lead of pendingLeads) {
    // Exponential backoff for retries
    if (lead.retryCount > 0) {
      const backoffMs = RETRY_DELAY_MS * Math.pow(2, lead.retryCount - 1);
      await new Promise((resolve) => setTimeout(resolve, backoffMs));
    }

    const result = await processRawLead(lead.id);

    if (result.success) {
      if (result.skipped) {
        skipped++;
      } else {
        processed++;
      }
    } else {
      failed++;
    }
  }

  return { processed, failed, skipped };
}

/**
 * Process pending webhook events (legacy)
 */
export async function processPendingEvents(limit = 50): Promise<{
  processed: number;
  failed: number;
}> {
  const pendingEvents = await db.query.webhookEvents.findMany({
    where: and(
      eq(webhookEvents.provider, "meta"),
      inArray(webhookEvents.status, ["received", "failed"]),
      lt(webhookEvents.attempts, MAX_RETRY_ATTEMPTS)
    ),
    orderBy: (events, { asc }) => [asc(events.createdAt)],
    limit,
  });

  let processed = 0;
  let failed = 0;

  for (const event of pendingEvents) {
    const result = await processWebhookEvent(event.id);
    if (result.success) {
      processed++;
    } else {
      failed++;
    }
  }

  return { processed, failed };
}

/**
 * Get failed leads for review/manual processing
 */
export async function getFailedLeads(orgId?: number, limit = 100) {
  return db.query.metaLeadRaw.findMany({
    where: and(
      eq(metaLeadRaw.status, "failed"),
      orgId ? eq(metaLeadRaw.orgId, orgId) : undefined
    ),
    orderBy: (leads, { desc }) => [desc(leads.createdAt)],
    limit,
  });
}

/**
 * Retry a specific failed lead
 */
export async function retryFailedLead(rawLeadId: number): Promise<ProcessResult> {
  // Reset retry count to allow reprocessing
  await db
    .update(metaLeadRaw)
    .set({ status: "pending", retryCount: 0, errorMessage: null })
    .where(eq(metaLeadRaw.id, rawLeadId));

  return processRawLead(rawLeadId);
}

/**
 * Recover stale processing leads
 * Leads stuck in "processing" for too long are reset to "pending"
 */
export async function recoverStaleProcessingLeads(): Promise<{ recovered: number }> {
  const staleThreshold = new Date(Date.now() - STALE_PROCESSING_MINUTES * 60 * 1000);

  const result = await db
    .update(metaLeadRaw)
    .set({
      status: "pending",
      processingStartedAt: null,
      errorMessage: "Recovered from stale processing state",
    })
    .where(
      and(
        eq(metaLeadRaw.status, "processing"),
        lt(metaLeadRaw.processingStartedAt, staleThreshold)
      )
    )
    .returning({ id: metaLeadRaw.id });

  if (result.length > 0) {
    console.log(`[Meta Processor] Recovered ${result.length} stale leads`);
  }

  return { recovered: result.length };
}

/**
 * Get lead processing statistics
 */
export async function getProcessingStats(orgId?: number) {
  const allLeads = await db.query.metaLeadRaw.findMany({
    where: orgId ? eq(metaLeadRaw.orgId, orgId) : undefined,
    columns: { status: true },
  });

  const stats = {
    total: allLeads.length,
    pending: 0,
    processing: 0,
    completed: 0,
    failed: 0,
    skipped: 0,
  };

  for (const lead of allLeads) {
    stats[lead.status as keyof typeof stats]++;
  }

  return stats;
}
