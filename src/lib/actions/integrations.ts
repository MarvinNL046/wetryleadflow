"use server";

import { db } from "@/lib/db";
import {
  metaConnections,
  metaPages,
  metaForms,
  leadIngestRoutes,
  leadFieldMappings,
  pipelines,
  pipelineStages,
  users,
  memberships,
} from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { requireAuthContext } from "@/lib/auth/context";
import { decryptToken } from "@/lib/crypto";
import {
  fetchPageForms,
  unsubscribePageFromLeadgen,
  subscribePageToLeadgen
} from "@/lib/integrations/meta/client";
import { revalidatePath } from "next/cache";

/**
 * Get Meta connection status for the current org
 */
export async function getMetaConnectionStatus() {
  const ctx = await requireAuthContext();

  const connection = await db.query.metaConnections.findFirst({
    where: and(
      eq(metaConnections.orgId, ctx.org.id),
      eq(metaConnections.isActive, true)
    ),
  });

  if (!connection) {
    return { connected: false };
  }

  const pages = await db.query.metaPages.findMany({
    where: and(
      eq(metaPages.orgId, ctx.org.id),
      eq(metaPages.connectionId, connection.id),
      eq(metaPages.isActive, true)
    ),
  });

  return {
    connected: true,
    connection: {
      id: connection.id,
      userName: connection.metaUserName,
      connectedAt: connection.createdAt,
      tokenExpiresAt: connection.tokenExpiresAt,
    },
    pages: pages.map((p) => ({
      id: p.id,
      pageId: p.pageId,
      pageName: p.pageName,
      subscribedToLeadgen: p.subscribedToLeadgen,
    })),
  };
}

/**
 * Disconnect Meta integration
 */
export async function disconnectMeta() {
  const ctx = await requireAuthContext();

  // Get the connection
  const connection = await db.query.metaConnections.findFirst({
    where: and(
      eq(metaConnections.orgId, ctx.org.id),
      eq(metaConnections.isActive, true)
    ),
  });

  if (!connection) {
    throw new Error("No active Meta connection found");
  }

  // Get pages to unsubscribe
  const pages = await db.query.metaPages.findMany({
    where: and(
      eq(metaPages.connectionId, connection.id),
      eq(metaPages.isActive, true)
    ),
  });

  // Try to unsubscribe from webhooks (best effort)
  for (const page of pages) {
    try {
      const pageToken = decryptToken(page.pageAccessTokenEncrypted);
      await unsubscribePageFromLeadgen(page.pageId, pageToken);
    } catch (error) {
      console.error(`Failed to unsubscribe page ${page.pageName}:`, error);
      // Continue anyway
    }
  }

  // Deactivate pages
  await db
    .update(metaPages)
    .set({ isActive: false, updatedAt: new Date() })
    .where(eq(metaPages.connectionId, connection.id));

  // Deactivate connection
  await db
    .update(metaConnections)
    .set({ isActive: false, updatedAt: new Date() })
    .where(eq(metaConnections.id, connection.id));

  revalidatePath("/crm/settings/integrations");

  return { success: true };
}

/**
 * Get forms for a page and sync them to our database
 */
export async function syncPageForms(pageDbId: number) {
  const ctx = await requireAuthContext();

  const page = await db.query.metaPages.findFirst({
    where: and(
      eq(metaPages.id, pageDbId),
      eq(metaPages.orgId, ctx.org.id),
      eq(metaPages.isActive, true)
    ),
  });

  if (!page) {
    throw new Error("Page not found");
  }

  const pageToken = decryptToken(page.pageAccessTokenEncrypted);
  const forms = await fetchPageForms(page.pageId, pageToken);

  // Sync forms to database
  for (const form of forms) {
    const existing = await db.query.metaForms.findFirst({
      where: and(
        eq(metaForms.pageId, page.id),
        eq(metaForms.formId, form.id)
      ),
    });

    if (existing) {
      await db
        .update(metaForms)
        .set({
          formName: form.name,
          formFields: form.questions,
          lastSyncAt: new Date(),
          updatedAt: new Date(),
        })
        .where(eq(metaForms.id, existing.id));
    } else {
      await db.insert(metaForms).values({
        orgId: ctx.org.id,
        pageId: page.id,
        formId: form.id,
        formName: form.name,
        formFields: form.questions,
        lastSyncAt: new Date(),
      });
    }
  }

  revalidatePath("/crm/settings/integrations");

  return forms;
}

/**
 * Get pages with their forms for the current org
 */
export async function getMetaPagesWithForms() {
  const ctx = await requireAuthContext();

  const pages = await db.query.metaPages.findMany({
    where: and(
      eq(metaPages.orgId, ctx.org.id),
      eq(metaPages.isActive, true)
    ),
    with: {
      forms: true,
    },
  });

  return pages.map((p) => ({
    id: p.id,
    pageId: p.pageId,
    pageName: p.pageName,
    subscribedToLeadgen: p.subscribedToLeadgen,
    forms: p.forms.map((f) => ({
      id: f.id,
      formId: f.formId,
      formName: f.formName,
      isActive: f.isActive,
    })),
  }));
}

/**
 * Toggle leadgen subscription for a page
 */
export async function togglePageLeadgenSubscription(pageDbId: number, subscribe: boolean) {
  const ctx = await requireAuthContext();

  const page = await db.query.metaPages.findFirst({
    where: and(
      eq(metaPages.id, pageDbId),
      eq(metaPages.orgId, ctx.org.id),
      eq(metaPages.isActive, true)
    ),
  });

  if (!page) {
    throw new Error("Page not found");
  }

  const pageToken = decryptToken(page.pageAccessTokenEncrypted);

  if (subscribe) {
    await subscribePageToLeadgen(page.pageId, pageToken);
    await db
      .update(metaPages)
      .set({
        subscribedToLeadgen: true,
        webhookSubscribedAt: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(metaPages.id, pageDbId));
  } else {
    await unsubscribePageFromLeadgen(page.pageId, pageToken);
    await db
      .update(metaPages)
      .set({
        subscribedToLeadgen: false,
        webhookSubscribedAt: null,
        updatedAt: new Date(),
      })
      .where(eq(metaPages.id, pageDbId));
  }

  revalidatePath("/crm/settings/integrations");

  return { success: true };
}

/**
 * Get ingest routes for the current workspace
 */
export async function getLeadIngestRoutes() {
  const ctx = await requireAuthContext();

  const routes = await db.query.leadIngestRoutes.findMany({
    where: eq(leadIngestRoutes.workspaceId, ctx.workspace.id),
    with: {
      metaPage: true,
      metaForm: true,
      pipeline: true,
      stage: true,
      assignToUser: true,
    },
  });

  return routes;
}

/**
 * Create or update a lead ingest route
 */
export async function upsertLeadIngestRoute(data: {
  id?: number;
  metaPageId: number;
  metaFormId?: number | null;
  pipelineId: number;
  stageId: number;
  assignToUserId?: number | null;
  isActive?: boolean;
}) {
  const ctx = await requireAuthContext();

  if (data.id) {
    // Update existing
    await db
      .update(leadIngestRoutes)
      .set({
        metaPageId: data.metaPageId,
        metaFormId: data.metaFormId,
        pipelineId: data.pipelineId,
        stageId: data.stageId,
        assignToUserId: data.assignToUserId,
        isActive: data.isActive ?? true,
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(leadIngestRoutes.id, data.id),
          eq(leadIngestRoutes.workspaceId, ctx.workspace.id)
        )
      );
  } else {
    // Create new
    await db.insert(leadIngestRoutes).values({
      orgId: ctx.org.id,
      workspaceId: ctx.workspace.id,
      source: "meta",
      metaPageId: data.metaPageId,
      metaFormId: data.metaFormId,
      pipelineId: data.pipelineId,
      stageId: data.stageId,
      assignToUserId: data.assignToUserId,
      isActive: data.isActive ?? true,
    });
  }

  revalidatePath("/crm/settings/integrations");

  return { success: true };
}

/**
 * Delete a lead ingest route
 */
export async function deleteLeadIngestRoute(routeId: number) {
  const ctx = await requireAuthContext();

  await db
    .delete(leadIngestRoutes)
    .where(
      and(
        eq(leadIngestRoutes.id, routeId),
        eq(leadIngestRoutes.workspaceId, ctx.workspace.id)
      )
    );

  revalidatePath("/crm/settings/integrations");

  return { success: true };
}

/**
 * Get pipelines with stages for routing configuration
 */
export async function getPipelinesForRouting() {
  const ctx = await requireAuthContext();

  const pipelineList = await db.query.pipelines.findMany({
    where: eq(pipelines.workspaceId, ctx.workspace.id),
    with: {
      stages: {
        orderBy: (stages, { asc }) => [asc(stages.order)],
      },
    },
  });

  return pipelineList.map((p) => ({
    id: p.id,
    name: p.name,
    stages: p.stages.map((s) => ({
      id: s.id,
      name: s.name,
      order: s.order,
    })),
  }));
}

/**
 * Get workspace members for assignment
 */
export async function getWorkspaceMembers() {
  const ctx = await requireAuthContext();

  const membershipList = await db.query.memberships.findMany({
    where: eq(memberships.orgId, ctx.org.id),
    with: {
      user: true,
    },
  });

  return membershipList.map((m) => ({
    id: m.user.id,
    name: m.user.name ?? m.user.email,
    email: m.user.email,
    role: m.role,
  }));
}

/**
 * Get field mappings for a route
 */
export async function getFieldMappings(routeId: number) {
  const ctx = await requireAuthContext();

  // Verify route belongs to workspace
  const route = await db.query.leadIngestRoutes.findFirst({
    where: and(
      eq(leadIngestRoutes.id, routeId),
      eq(leadIngestRoutes.workspaceId, ctx.workspace.id)
    ),
  });

  if (!route) {
    throw new Error("Route not found");
  }

  return db.query.leadFieldMappings.findMany({
    where: eq(leadFieldMappings.routeId, routeId),
  });
}

/**
 * Update field mappings for a route
 */
export async function updateFieldMappings(
  routeId: number,
  mappings: Array<{
    sourceFieldKey: string;
    sourceFieldLabel?: string;
    targetField: string;
    transform?: string;
  }>
) {
  const ctx = await requireAuthContext();

  // Verify route belongs to workspace
  const route = await db.query.leadIngestRoutes.findFirst({
    where: and(
      eq(leadIngestRoutes.id, routeId),
      eq(leadIngestRoutes.workspaceId, ctx.workspace.id)
    ),
  });

  if (!route) {
    throw new Error("Route not found");
  }

  // Delete existing mappings
  await db.delete(leadFieldMappings).where(eq(leadFieldMappings.routeId, routeId));

  // Insert new mappings
  if (mappings.length > 0) {
    await db.insert(leadFieldMappings).values(
      mappings.map((m) => ({
        routeId,
        sourceFieldKey: m.sourceFieldKey,
        sourceFieldLabel: m.sourceFieldLabel,
        targetField: m.targetField,
        transform: m.transform,
      }))
    );
  }

  revalidatePath("/crm/settings/integrations");

  return { success: true };
}

/**
 * Get form fields from Meta (cached in our DB)
 */
export async function getMetaFormFields(formDbId: number) {
  const ctx = await requireAuthContext();

  const form = await db.query.metaForms.findFirst({
    where: and(
      eq(metaForms.id, formDbId),
      eq(metaForms.orgId, ctx.org.id)
    ),
  });

  if (!form) {
    throw new Error("Form not found");
  }

  // formFields is cached JSON array of { key, label, type }
  return (form.formFields as Array<{ key: string; label: string; type: string }>) || [];
}

/**
 * Get all routes with their mappings for display
 */
export async function getLeadRoutesWithMappings() {
  const ctx = await requireAuthContext();

  const routes = await db.query.leadIngestRoutes.findMany({
    where: eq(leadIngestRoutes.workspaceId, ctx.workspace.id),
    with: {
      metaPage: true,
      metaForm: true,
      pipeline: true,
      stage: true,
      assignToUser: true,
      fieldMappings: true,
    },
  });

  return routes.map((r) => ({
    id: r.id,
    source: r.source,
    isActive: r.isActive,
    page: r.metaPage ? { id: r.metaPage.id, name: r.metaPage.pageName } : null,
    form: r.metaForm ? { id: r.metaForm.id, name: r.metaForm.formName } : null,
    pipeline: { id: r.pipeline.id, name: r.pipeline.name },
    stage: { id: r.stage.id, name: r.stage.name },
    assignTo: r.assignToUser ? { id: r.assignToUser.id, name: r.assignToUser.name ?? r.assignToUser.email } : null,
    mappingCount: r.fieldMappings.length,
  }));
}

/**
 * Get all Meta forms with stats for the forms management page
 */
export async function getMetaFormsWithStats() {
  const ctx = await requireAuthContext();

  // Get all forms for this org
  const forms = await db.query.metaForms.findMany({
    where: eq(metaForms.orgId, ctx.org.id),
    with: {
      page: true,
    },
    orderBy: (forms, { desc }) => [desc(forms.createdAt)],
  });

  // Get lead counts per form using raw SQL for efficiency
  const { sql } = await import("drizzle-orm");
  const leadStats = await db.execute(sql`
    SELECT
      la.meta_form_id as form_id,
      COUNT(*)::int as lead_count,
      MAX(la.created_at) as last_lead_at
    FROM lead_attribution la
    JOIN contacts c ON c.id = la.contact_id
    WHERE c.workspace_id = ${ctx.workspace.id}
      AND la.meta_form_id IS NOT NULL
    GROUP BY la.meta_form_id
  `);

  // Create a map for quick lookup
  const statsMap = new Map<string, { leadCount: number; lastLeadAt: Date | null }>();
  for (const row of leadStats.rows as Array<{ form_id: string; lead_count: number; last_lead_at: Date | null }>) {
    statsMap.set(row.form_id, {
      leadCount: row.lead_count,
      lastLeadAt: row.last_lead_at,
    });
  }

  return forms.map((form) => {
    const stats = statsMap.get(form.formId) || { leadCount: 0, lastLeadAt: null };
    return {
      id: form.id,
      formId: form.formId,
      formName: form.formName,
      customName: form.formName, // For now same, can add custom name field later
      isActive: form.isActive,
      lastSyncAt: form.lastSyncAt,
      createdAt: form.createdAt,
      page: form.page ? { id: form.page.id, name: form.page.pageName } : null,
      formFields: (form.formFields as Array<{ key: string; label: string; type: string }>) || [],
      leadCount: stats.leadCount,
      lastLeadAt: stats.lastLeadAt,
    };
  });
}

/**
 * Update form settings (isActive, custom name)
 */
export async function updateMetaFormSettings(formId: number, data: {
  isActive?: boolean;
  customName?: string;
}) {
  const ctx = await requireAuthContext();

  // Verify form belongs to org
  const form = await db.query.metaForms.findFirst({
    where: and(
      eq(metaForms.id, formId),
      eq(metaForms.orgId, ctx.org.id)
    ),
  });

  if (!form) {
    throw new Error("Form not found");
  }

  const updateData: Record<string, unknown> = { updatedAt: new Date() };
  if (data.isActive !== undefined) {
    updateData.isActive = data.isActive;
  }
  if (data.customName !== undefined) {
    updateData.formName = data.customName;
  }

  await db
    .update(metaForms)
    .set(updateData)
    .where(eq(metaForms.id, formId));

  revalidatePath("/crm/settings/integrations/meta/forms");

  return { success: true };
}

/**
 * Sync all forms from all connected Meta pages
 */
export async function syncAllMetaForms() {
  const ctx = await requireAuthContext();

  // Get all active pages
  const pages = await db.query.metaPages.findMany({
    where: and(
      eq(metaPages.orgId, ctx.org.id),
      eq(metaPages.isActive, true)
    ),
  });

  const results = [];
  for (const page of pages) {
    try {
      const forms = await syncPageForms(page.id);
      results.push({ pageId: page.id, pageName: page.pageName, forms: forms.length, success: true });
    } catch (error) {
      console.error(`Failed to sync forms for page ${page.pageName}:`, error);
      results.push({ pageId: page.id, pageName: page.pageName, success: false, error: String(error) });
    }
  }

  revalidatePath("/crm/settings/integrations/meta/forms");

  return results;
}
