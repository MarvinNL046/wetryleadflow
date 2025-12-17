"use server";

import { eq, count, sql, desc, and, gte, lte } from "drizzle-orm";
import { db } from "@/lib/db";
import { orgs, users, workspaces, memberships, contacts, deals, pipelines, auditLog, outboxEvents, emailLog } from "@/lib/db/schema";
import { requireSuperAdmin } from "@/lib/auth/superadmin";

/**
 * Get platform-wide statistics
 */
export async function getAdminStats() {
  await requireSuperAdmin();

  const [orgCount] = await db.select({ count: count() }).from(orgs);
  const [userCount] = await db.select({ count: count() }).from(users);
  const [contactCount] = await db.select({ count: count() }).from(contacts);
  const [dealCount] = await db.select({ count: count() }).from(deals);

  const [totalValue] = await db
    .select({ total: sql<string>`COALESCE(SUM(${deals.value}), 0)` })
    .from(deals);

  return {
    orgs: orgCount.count,
    users: userCount.count,
    contacts: contactCount.count,
    deals: dealCount.count,
    totalPipelineValue: parseFloat(totalValue.total || "0"),
  };
}

/**
 * Get all organizations with stats
 */
export async function getAllOrgs() {
  await requireSuperAdmin();

  const allOrgs = await db.query.orgs.findMany({
    orderBy: [desc(orgs.createdAt)],
  });

  // Get stats for each org
  const orgsWithStats = await Promise.all(
    allOrgs.map(async (org) => {
      const [memberCount] = await db
        .select({ count: count() })
        .from(memberships)
        .where(eq(memberships.orgId, org.id));

      const [workspaceCount] = await db
        .select({ count: count() })
        .from(workspaces)
        .where(eq(workspaces.orgId, org.id));

      // Get workspace IDs for this org
      const orgWorkspaces = await db
        .select({ id: workspaces.id })
        .from(workspaces)
        .where(eq(workspaces.orgId, org.id));

      const workspaceIds = orgWorkspaces.map((w) => w.id);

      let contactCount = 0;
      let dealCount = 0;
      let dealValue = 0;

      if (workspaceIds.length > 0) {
        const [contacts] = await db
          .select({ count: count() })
          .from(db._.fullSchema.contacts)
          .where(sql`${db._.fullSchema.contacts.workspaceId} IN ${workspaceIds}`);
        contactCount = contacts.count;

        const [deals] = await db
          .select({
            count: count(),
            value: sql<string>`COALESCE(SUM(${db._.fullSchema.deals.value}), 0)`
          })
          .from(db._.fullSchema.deals)
          .where(sql`${db._.fullSchema.deals.workspaceId} IN ${workspaceIds}`);
        dealCount = deals.count;
        dealValue = parseFloat(deals.value || "0");
      }

      return {
        ...org,
        stats: {
          members: memberCount.count,
          workspaces: workspaceCount.count,
          contacts: contactCount,
          deals: dealCount,
          dealValue,
        },
      };
    })
  );

  return orgsWithStats;
}

/**
 * Get all users with their org memberships
 */
export async function getAllUsers() {
  await requireSuperAdmin();

  const allUsers = await db.query.users.findMany({
    orderBy: [desc(users.createdAt)],
    with: {
      memberships: {
        with: {
          org: true,
        },
      },
    },
  });

  return allUsers;
}

/**
 * Get detailed org information
 */
export async function getOrgDetails(orgId: number) {
  await requireSuperAdmin();

  const org = await db.query.orgs.findFirst({
    where: eq(orgs.id, orgId),
    with: {
      workspaces: true,
      memberships: {
        with: {
          user: true,
        },
      },
    },
  });

  if (!org) return null;

  // Get workspace stats
  const workspacesWithStats = await Promise.all(
    org.workspaces.map(async (workspace) => {
      const [contactCount] = await db
        .select({ count: count() })
        .from(contacts)
        .where(eq(contacts.workspaceId, workspace.id));

      const [dealStats] = await db
        .select({
          count: count(),
          value: sql<string>`COALESCE(SUM(${deals.value}), 0)`,
        })
        .from(deals)
        .where(eq(deals.workspaceId, workspace.id));

      const [pipelineCount] = await db
        .select({ count: count() })
        .from(pipelines)
        .where(eq(pipelines.workspaceId, workspace.id));

      return {
        ...workspace,
        stats: {
          contacts: contactCount.count,
          deals: dealStats.count,
          dealValue: parseFloat(dealStats.value || "0"),
          pipelines: pipelineCount.count,
        },
      };
    })
  );

  return {
    ...org,
    workspaces: workspacesWithStats,
  };
}

/**
 * Get audit logs with filtering
 */
export async function getAuditLogs(options?: {
  orgId?: number;
  action?: string;
  entityType?: string;
  limit?: number;
  offset?: number;
}) {
  await requireSuperAdmin();

  const limit = options?.limit ?? 50;
  const offset = options?.offset ?? 0;

  const logs = await db.query.auditLog.findMany({
    orderBy: [desc(auditLog.createdAt)],
    limit,
    offset,
    with: {
      org: true,
      workspace: true,
      user: true,
    },
  });

  const [totalCount] = await db.select({ count: count() }).from(auditLog);

  return {
    logs,
    total: totalCount.count,
    limit,
    offset,
  };
}

/**
 * Get audit log stats for dashboard
 */
export async function getAuditStats() {
  await requireSuperAdmin();

  const [total] = await db.select({ count: count() }).from(auditLog);

  // Get counts by action type (last 7 days)
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const recentActions = await db
    .select({
      action: auditLog.action,
      count: count(),
    })
    .from(auditLog)
    .where(gte(auditLog.createdAt, sevenDaysAgo))
    .groupBy(auditLog.action)
    .orderBy(desc(count()));

  return {
    total: total.count,
    recentActions,
  };
}

/**
 * Get outbox events with stats
 */
export async function getOutboxStats() {
  await requireSuperAdmin();

  // Get counts by status
  const statusCounts = await db
    .select({
      status: outboxEvents.status,
      count: count(),
    })
    .from(outboxEvents)
    .groupBy(outboxEvents.status);

  // Get recent events
  const recentEvents = await db.query.outboxEvents.findMany({
    orderBy: [desc(outboxEvents.createdAt)],
    limit: 50,
    with: {
      org: true,
      workspace: true,
    },
  });

  // Get counts by event type (last 24 hours)
  const oneDayAgo = new Date();
  oneDayAgo.setDate(oneDayAgo.getDate() - 1);

  const eventTypeCounts = await db
    .select({
      eventType: outboxEvents.eventType,
      count: count(),
    })
    .from(outboxEvents)
    .where(gte(outboxEvents.createdAt, oneDayAgo))
    .groupBy(outboxEvents.eventType)
    .orderBy(desc(count()));

  return {
    statusCounts: statusCounts.reduce(
      (acc, { status, count }) => ({ ...acc, [status]: count }),
      {} as Record<string, number>
    ),
    eventTypeCounts,
    recentEvents,
  };
}

/**
 * Manually trigger outbox processing (for admin)
 */
export async function triggerOutboxProcessing() {
  await requireSuperAdmin();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/jobs/outbox`,
    { method: "GET" }
  );

  if (!response.ok) {
    throw new Error("Failed to trigger outbox processing");
  }

  return response.json();
}

/**
 * Get email log stats and recent emails
 */
export async function getEmailStats() {
  await requireSuperAdmin();

  // Get counts by status
  const statusCounts = await db
    .select({
      status: emailLog.status,
      count: count(),
    })
    .from(emailLog)
    .groupBy(emailLog.status);

  // Get counts by template (last 7 days)
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const templateCounts = await db
    .select({
      templateName: emailLog.templateName,
      count: count(),
    })
    .from(emailLog)
    .where(gte(emailLog.createdAt, sevenDaysAgo))
    .groupBy(emailLog.templateName)
    .orderBy(desc(count()));

  // Get recent emails
  const recentEmails = await db.query.emailLog.findMany({
    orderBy: [desc(emailLog.createdAt)],
    limit: 50,
    with: {
      org: true,
    },
  });

  return {
    statusCounts: statusCounts.reduce(
      (acc, { status, count }) => ({ ...acc, [status]: count }),
      {} as Record<string, number>
    ),
    templateCounts,
    recentEmails,
  };
}
