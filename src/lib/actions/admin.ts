"use server";

import { eq, count, sql, desc, and, gte, lt, inArray } from "drizzle-orm";
import { db } from "@/lib/db";
import {
  orgs, users, workspaces, memberships, contacts, opportunities, pipelines,
  auditLog, outboxEvents, emailLog,
  metaConnections, metaPages, metaForms, metaLeadRaw, webhookEvents,
  agencies, agencyMemberships, clientSubscriptions, agencyPricingPlans, agencyInvoices,
  cronJobRuns, cronJobConfigs,
  announcements, announcementDismissals,
  featureFlags, featureFlagOverrides,
  supportTickets, supportTicketReplies,
  opportunityStageHistory, notes, leadIngestRoutes, notifications,
  agencyInvites, agencyStripeAccounts, agencySaasSettings
} from "@/lib/db/schema";
import { requireSuperAdmin } from "@/lib/auth/superadmin";
import { sendEmail, SupportTicketReplyEmail } from "@/lib/email";

/**
 * Get platform-wide statistics
 */
export async function getAdminStats() {
  await requireSuperAdmin();

  const [orgCount] = await db.select({ count: count() }).from(orgs);
  const [userCount] = await db.select({ count: count() }).from(users);
  const [contactCount] = await db.select({ count: count() }).from(contacts);
  const [opportunityCount] = await db.select({ count: count() }).from(opportunities);

  const [totalValue] = await db
    .select({ total: sql<string>`COALESCE(SUM(${opportunities.value}), 0)` })
    .from(opportunities);

  return {
    orgs: orgCount.count,
    users: userCount.count,
    contacts: contactCount.count,
    opportunities: opportunityCount.count,
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
      let opportunityCount = 0;
      let opportunityValue = 0;

      if (workspaceIds.length > 0) {
        const [contacts] = await db
          .select({ count: count() })
          .from(db._.fullSchema.contacts)
          .where(sql`${db._.fullSchema.contacts.workspaceId} IN ${workspaceIds}`);
        contactCount = contacts.count;

        const [opps] = await db
          .select({
            count: count(),
            value: sql<string>`COALESCE(SUM(${db._.fullSchema.opportunities.value}), 0)`
          })
          .from(db._.fullSchema.opportunities)
          .where(sql`${db._.fullSchema.opportunities.workspaceId} IN ${workspaceIds}`);
        opportunityCount = opps.count;
        opportunityValue = parseFloat(opps.value || "0");
      }

      return {
        ...org,
        stats: {
          members: memberCount.count,
          workspaces: workspaceCount.count,
          contacts: contactCount,
          opportunities: opportunityCount,
          opportunityValue,
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

      const [opportunityStats] = await db
        .select({
          count: count(),
          value: sql<string>`COALESCE(SUM(${opportunities.value}), 0)`,
        })
        .from(opportunities)
        .where(eq(opportunities.workspaceId, workspace.id));

      const [pipelineCount] = await db
        .select({ count: count() })
        .from(pipelines)
        .where(eq(pipelines.workspaceId, workspace.id));

      return {
        ...workspace,
        stats: {
          contacts: contactCount.count,
          opportunities: opportunityStats.count,
          opportunityValue: parseFloat(opportunityStats.value || "0"),
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

/**
 * Get Meta integration statistics for admin dashboard
 */
export async function getMetaIntegrationStats() {
  await requireSuperAdmin();

  const now = new Date();
  const sevenDaysFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
  const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  // Connection stats
  const [totalConnections] = await db.select({ count: count() }).from(metaConnections);
  const [activeConnections] = await db
    .select({ count: count() })
    .from(metaConnections)
    .where(eq(metaConnections.isActive, true));

  // Tokens expiring within 7 days
  const [expiringTokens] = await db
    .select({ count: count() })
    .from(metaConnections)
    .where(
      and(
        eq(metaConnections.isActive, true),
        lt(metaConnections.tokenExpiresAt, sevenDaysFromNow)
      )
    );

  // Page stats
  const [totalPages] = await db.select({ count: count() }).from(metaPages);
  const [webhookActivePages] = await db
    .select({ count: count() })
    .from(metaPages)
    .where(eq(metaPages.subscribedToLeadgen, true));

  // Form stats
  const [totalForms] = await db.select({ count: count() }).from(metaForms);

  // Lead stats from metaLeadRaw
  const [leadsToday] = await db
    .select({ count: count() })
    .from(metaLeadRaw)
    .where(gte(metaLeadRaw.createdAt, oneDayAgo));

  const [leadsThisWeek] = await db
    .select({ count: count() })
    .from(metaLeadRaw)
    .where(gte(metaLeadRaw.createdAt, sevenDaysAgo));

  const [pendingLeads] = await db
    .select({ count: count() })
    .from(metaLeadRaw)
    .where(eq(metaLeadRaw.status, "pending"));

  const [failedLeads] = await db
    .select({ count: count() })
    .from(metaLeadRaw)
    .where(eq(metaLeadRaw.status, "failed"));

  // Recent connections with org info
  const recentConnections = await db.query.metaConnections.findMany({
    orderBy: [desc(metaConnections.createdAt)],
    limit: 10,
    with: {
      org: true,
      pages: true,
    },
  });

  return {
    connections: {
      total: totalConnections.count,
      active: activeConnections.count,
      tokenExpiring: expiringTokens.count,
    },
    pages: {
      total: totalPages.count,
      webhookActive: webhookActivePages.count,
    },
    forms: {
      total: totalForms.count,
    },
    leads: {
      today: leadsToday.count,
      thisWeek: leadsThisWeek.count,
      pending: pendingLeads.count,
      failed: failedLeads.count,
    },
    recentConnections: recentConnections.map((conn) => ({
      id: conn.id,
      orgName: conn.org?.name || "Unknown",
      metaUserId: conn.metaUserId,
      metaUserName: conn.metaUserName,
      pagesCount: conn.pages?.length || 0,
      isActive: conn.isActive,
      lastSyncAt: conn.lastSyncAt,
      tokenExpiresAt: conn.tokenExpiresAt,
      createdAt: conn.createdAt,
    })),
  };
}

/**
 * Get system health and job queue statistics
 */
export async function getSystemHealth() {
  await requireSuperAdmin();

  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

  // Database health check (simple query)
  let databaseOk = false;
  try {
    await db.select({ count: count() }).from(orgs);
    databaseOk = true;
  } catch {
    databaseOk = false;
  }

  // Webhook stats (last 24h)
  const webhookStats = await db
    .select({
      status: webhookEvents.status,
      count: count(),
    })
    .from(webhookEvents)
    .where(gte(webhookEvents.createdAt, oneDayAgo))
    .groupBy(webhookEvents.status);

  const webhookByProvider = await db
    .select({
      provider: webhookEvents.provider,
      count: count(),
    })
    .from(webhookEvents)
    .where(gte(webhookEvents.createdAt, oneDayAgo))
    .groupBy(webhookEvents.provider);

  // Outbox job stats
  const outboxStats = await db
    .select({
      status: outboxEvents.status,
      count: count(),
    })
    .from(outboxEvents)
    .groupBy(outboxEvents.status);

  // Meta leads job stats
  const metaLeadStats = await db
    .select({
      status: metaLeadRaw.status,
      count: count(),
    })
    .from(metaLeadRaw)
    .groupBy(metaLeadRaw.status);

  // Recent failed jobs
  const recentFailedOutbox = await db.query.outboxEvents.findMany({
    where: eq(outboxEvents.status, "failed"),
    orderBy: [desc(outboxEvents.updatedAt)],
    limit: 5,
    with: {
      org: true,
    },
  });

  const recentFailedLeads = await db.query.metaLeadRaw.findMany({
    where: eq(metaLeadRaw.status, "failed"),
    orderBy: [desc(metaLeadRaw.createdAt)],
    limit: 5,
    with: {
      org: true,
    },
  });

  // Convert stats arrays to objects
  const webhookStatusCounts = webhookStats.reduce(
    (acc, { status, count }) => ({ ...acc, [status]: count }),
    {} as Record<string, number>
  );

  const webhookProviderCounts = webhookByProvider.reduce(
    (acc, { provider, count }) => ({ ...acc, [provider]: count }),
    {} as Record<string, number>
  );

  const outboxStatusCounts = outboxStats.reduce(
    (acc, { status, count }) => ({ ...acc, [status]: count }),
    {} as Record<string, number>
  );

  const metaLeadStatusCounts = metaLeadStats.reduce(
    (acc, { status, count }) => ({ ...acc, [status]: count }),
    {} as Record<string, number>
  );

  return {
    database: {
      connectionOk: databaseOk,
    },
    webhooks: {
      last24h: {
        received: webhookStatusCounts.received || 0,
        processed: webhookStatusCounts.processed || 0,
        failed: webhookStatusCounts.failed || 0,
        total: Object.values(webhookStatusCounts).reduce((a, b) => a + b, 0),
      },
      byProvider: webhookProviderCounts,
    },
    jobs: {
      outbox: {
        pending: outboxStatusCounts.pending || 0,
        processing: outboxStatusCounts.processing || 0,
        completed: outboxStatusCounts.completed || 0,
        failed: outboxStatusCounts.failed || 0,
      },
      metaLeads: {
        pending: metaLeadStatusCounts.pending || 0,
        processing: metaLeadStatusCounts.processing || 0,
        completed: metaLeadStatusCounts.completed || 0,
        failed: metaLeadStatusCounts.failed || 0,
      },
    },
    recentErrors: {
      outbox: recentFailedOutbox.map((e) => ({
        id: e.id,
        eventType: e.eventType,
        orgName: e.org?.name || "Unknown",
        lastError: e.lastError,
        attempts: e.attempts,
        createdAt: e.createdAt,
      })),
      metaLeads: recentFailedLeads.map((l) => ({
        id: l.id,
        leadgenId: l.leadgenId,
        orgName: l.org?.name || "Unknown",
        errorMessage: l.errorMessage,
        retryCount: l.retryCount,
        createdAt: l.createdAt,
      })),
    },
  };
}

/**
 * Get all agencies with stats for admin
 */
export async function getAllAgencies() {
  await requireSuperAdmin();

  const allAgencies = await db.query.agencies.findMany({
    orderBy: [desc(agencies.createdAt)],
  });

  // Get stats for each agency
  const agenciesWithStats = await Promise.all(
    allAgencies.map(async (agency) => {
      const [orgCount] = await db
        .select({ count: count() })
        .from(orgs)
        .where(eq(orgs.agencyId, agency.id));

      const [memberCount] = await db
        .select({ count: count() })
        .from(agencyMemberships)
        .where(eq(agencyMemberships.agencyId, agency.id));

      return {
        ...agency,
        orgCount: orgCount.count,
        memberCount: memberCount.count,
      };
    })
  );

  return agenciesWithStats;
}

/**
 * Get detailed agency information for admin
 */
export async function getAgencyDetails(agencyId: number) {
  await requireSuperAdmin();

  const agency = await db.query.agencies.findFirst({
    where: eq(agencies.id, agencyId),
  });

  if (!agency) return null;

  // Get orgs
  const agencyOrgs = await db.query.orgs.findMany({
    where: eq(orgs.agencyId, agencyId),
    orderBy: [desc(orgs.createdAt)],
  });

  // Get members
  const members = await db
    .select({
      id: agencyMemberships.id,
      userId: agencyMemberships.userId,
      role: agencyMemberships.role,
      createdAt: agencyMemberships.createdAt,
    })
    .from(agencyMemberships)
    .where(eq(agencyMemberships.agencyId, agencyId));

  // Get org stats
  const orgsWithStats = await Promise.all(
    agencyOrgs.map(async (org) => {
      const [memberCount] = await db
        .select({ count: count() })
        .from(memberships)
        .where(eq(memberships.orgId, org.id));

      // Get workspace IDs
      const orgWorkspaces = await db
        .select({ id: workspaces.id })
        .from(workspaces)
        .where(eq(workspaces.orgId, org.id));

      const workspaceIds = orgWorkspaces.map((w) => w.id);

      let contactCount = 0;
      if (workspaceIds.length > 0) {
        const [contacts] = await db
          .select({ count: count() })
          .from(db._.fullSchema.contacts)
          .where(sql`${db._.fullSchema.contacts.workspaceId} IN ${workspaceIds}`);
        contactCount = contacts.count;
      }

      return {
        ...org,
        memberCount: memberCount.count,
        contactCount,
      };
    })
  );

  return {
    ...agency,
    orgs: orgsWithStats,
    members,
  };
}

/**
 * Update agency status (activate/deactivate)
 */
export async function updateAgencyStatus(agencyId: number, isActive: boolean) {
  await requireSuperAdmin();

  await db
    .update(agencies)
    .set({ isActive, updatedAt: new Date() })
    .where(eq(agencies.id, agencyId));

  return { success: true };
}

/**
 * Update agency limits
 */
export async function updateAgencyLimits(agencyId: number, maxOrgs: number) {
  await requireSuperAdmin();

  await db
    .update(agencies)
    .set({ maxOrgs, updatedAt: new Date() })
    .where(eq(agencies.id, agencyId));

  return { success: true };
}

// ============================================
// BILLING & SUBSCRIPTIONS
// ============================================

/**
 * Get billing statistics for admin dashboard
 * MRR, ARR, churn rate, subscription counts
 */
export async function getBillingStats() {
  await requireSuperAdmin();

  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  // Get all active agency subscriptions
  const activeAgencies = await db
    .select({
      tier: agencies.tier,
      subscriptionStatus: agencies.subscriptionStatus,
      createdAt: agencies.createdAt,
    })
    .from(agencies)
    .where(eq(agencies.subscriptionStatus, "active"));

  // Tier pricing (monthly)
  const tierPricing: Record<string, number> = {
    starter: 97,
    unlimited: 297,
    saas_pro: 497,
  };

  // Calculate MRR from agencies
  let agencyMRR = 0;
  for (const agency of activeAgencies) {
    agencyMRR += tierPricing[agency.tier || "starter"] || 0;
  }

  // Get active client subscriptions with pricing from plans
  const activeClientSubs = await db
    .select({
      priceMonthly: agencyPricingPlans.priceMonthly,
      priceYearly: agencyPricingPlans.priceYearly,
      billingInterval: clientSubscriptions.billingInterval,
      status: clientSubscriptions.status,
    })
    .from(clientSubscriptions)
    .innerJoin(agencyPricingPlans, eq(clientSubscriptions.planId, agencyPricingPlans.id))
    .where(eq(clientSubscriptions.status, "active"));

  // Calculate MRR from client subscriptions
  let clientMRR = 0;
  for (const sub of activeClientSubs) {
    if (sub.billingInterval === "yearly") {
      const yearlyPrice = parseFloat(sub.priceYearly || sub.priceMonthly || "0");
      clientMRR += yearlyPrice / 12;
    } else {
      clientMRR += parseFloat(sub.priceMonthly || "0");
    }
  }

  const totalMRR = agencyMRR + clientMRR;
  const totalARR = totalMRR * 12;

  // Get subscription counts
  const [totalAgencies] = await db.select({ count: count() }).from(agencies);
  const [activeAgencyCount] = await db
    .select({ count: count() })
    .from(agencies)
    .where(eq(agencies.subscriptionStatus, "active"));

  const [trialAgencyCount] = await db
    .select({ count: count() })
    .from(agencies)
    .where(eq(agencies.subscriptionStatus, "trialing"));

  const [canceledAgencyCount] = await db
    .select({ count: count() })
    .from(agencies)
    .where(eq(agencies.subscriptionStatus, "canceled"));

  // Calculate churn rate (canceled in last 30 days / total active at start of period)
  const canceledRecent = await db
    .select({ count: count() })
    .from(agencies)
    .where(
      and(
        eq(agencies.subscriptionStatus, "canceled"),
        gte(agencies.updatedAt, thirtyDaysAgo)
      )
    );

  const churnRate = activeAgencyCount.count > 0
    ? (canceledRecent[0].count / (activeAgencyCount.count + canceledRecent[0].count)) * 100
    : 0;

  // Get new subscriptions this month
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const [newThisMonth] = await db
    .select({ count: count() })
    .from(agencies)
    .where(
      and(
        eq(agencies.subscriptionStatus, "active"),
        gte(agencies.createdAt, startOfMonth)
      )
    );

  // ===========================================
  // Direct Users (ZZP/MKB - orgs without agency)
  // ===========================================

  // Tier pricing for direct users
  const directUserPricing: Record<string, number> = {
    free: 0,
    pro: 29,
    enterprise: 99, // Custom pricing, use estimate
  };

  // Get all direct user orgs (no agencyId)
  const directUserOrgs = await db
    .select({
      subscriptionTier: orgs.subscriptionTier,
      subscriptionStatus: orgs.subscriptionStatus,
      createdAt: orgs.createdAt,
    })
    .from(orgs)
    .where(sql`${orgs.agencyId} IS NULL`);

  // Calculate direct user MRR
  let directUserMRR = 0;
  for (const org of directUserOrgs) {
    if (org.subscriptionStatus === "active") {
      directUserMRR += directUserPricing[org.subscriptionTier || "free"] || 0;
    }
  }

  // Direct user subscription counts
  const [totalDirectUsers] = await db
    .select({ count: count() })
    .from(orgs)
    .where(sql`${orgs.agencyId} IS NULL`);

  const [activeDirectUsers] = await db
    .select({ count: count() })
    .from(orgs)
    .where(
      and(
        sql`${orgs.agencyId} IS NULL`,
        eq(orgs.subscriptionStatus, "active")
      )
    );

  const [trialDirectUsers] = await db
    .select({ count: count() })
    .from(orgs)
    .where(
      and(
        sql`${orgs.agencyId} IS NULL`,
        eq(orgs.subscriptionStatus, "trialing")
      )
    );

  const [freeDirectUsers] = await db
    .select({ count: count() })
    .from(orgs)
    .where(
      and(
        sql`${orgs.agencyId} IS NULL`,
        eq(orgs.subscriptionTier, "free")
      )
    );

  const [proDirectUsers] = await db
    .select({ count: count() })
    .from(orgs)
    .where(
      and(
        sql`${orgs.agencyId} IS NULL`,
        eq(orgs.subscriptionTier, "pro")
      )
    );

  const [enterpriseDirectUsers] = await db
    .select({ count: count() })
    .from(orgs)
    .where(
      and(
        sql`${orgs.agencyId} IS NULL`,
        eq(orgs.subscriptionTier, "enterprise")
      )
    );

  // New direct users this month
  const [newDirectUsersThisMonth] = await db
    .select({ count: count() })
    .from(orgs)
    .where(
      and(
        sql`${orgs.agencyId} IS NULL`,
        gte(orgs.createdAt, startOfMonth)
      )
    );

  // Update total MRR to include direct users
  const combinedMRR = totalMRR + directUserMRR;
  const combinedARR = combinedMRR * 12;

  return {
    mrr: combinedMRR,
    arr: combinedARR,
    // Agency breakdown
    agencyMRR,
    clientMRR,
    churnRate: Math.round(churnRate * 10) / 10,
    subscriptions: {
      total: totalAgencies.count,
      active: activeAgencyCount.count,
      trial: trialAgencyCount.count,
      canceled: canceledAgencyCount.count,
    },
    newThisMonth: newThisMonth.count,
    clientSubscriptions: activeClientSubs.length,
    // Direct user breakdown
    directUserMRR,
    directUsers: {
      total: totalDirectUsers.count,
      active: activeDirectUsers.count,
      trial: trialDirectUsers.count,
      byTier: {
        free: freeDirectUsers.count,
        pro: proDirectUsers.count,
        enterprise: enterpriseDirectUsers.count,
      },
    },
    newDirectUsersThisMonth: newDirectUsersThisMonth.count,
  };
}

/**
 * Get subscription breakdown by tier
 */
export async function getSubscriptionsByTier() {
  await requireSuperAdmin();

  const tierCounts = await db
    .select({
      tier: agencies.tier,
      status: agencies.subscriptionStatus,
      count: count(),
    })
    .from(agencies)
    .groupBy(agencies.tier, agencies.subscriptionStatus);

  // Group by tier
  const byTier: Record<string, { active: number; trial: number; canceled: number; total: number }> = {
    starter: { active: 0, trial: 0, canceled: 0, total: 0 },
    unlimited: { active: 0, trial: 0, canceled: 0, total: 0 },
    saas_pro: { active: 0, trial: 0, canceled: 0, total: 0 },
  };

  for (const row of tierCounts) {
    const tier = row.tier || "starter";
    if (!byTier[tier]) {
      byTier[tier] = { active: 0, trial: 0, canceled: 0, total: 0 };
    }

    if (row.status === "active") byTier[tier].active = row.count;
    if (row.status === "trialing") byTier[tier].trial = row.count;
    if (row.status === "canceled") byTier[tier].canceled = row.count;
    byTier[tier].total += row.count;
  }

  return byTier;
}

/**
 * Get MRR trend over time
 */
export async function getMRRTrend(months: number = 6) {
  await requireSuperAdmin();

  const now = new Date();
  const trends: { month: string; mrr: number; agencies: number }[] = [];

  // Tier pricing
  const tierPricing: Record<string, number> = {
    starter: 97,
    unlimited: 297,
    saas_pro: 497,
  };

  for (let i = months - 1; i >= 0; i--) {
    const monthStart = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthEnd = new Date(now.getFullYear(), now.getMonth() - i + 1, 0, 23, 59, 59);

    // Get agencies that were active at end of this month
    const activeAgencies = await db
      .select({
        tier: agencies.tier,
      })
      .from(agencies)
      .where(
        and(
          lt(agencies.createdAt, monthEnd),
          sql`(${agencies.subscriptionStatus} = 'active' OR (${agencies.subscriptionStatus} = 'canceled' AND ${agencies.updatedAt} > ${monthEnd}))`
        )
      );

    let mrr = 0;
    for (const agency of activeAgencies) {
      mrr += tierPricing[agency.tier || "starter"] || 0;
    }

    trends.push({
      month: monthStart.toLocaleDateString("nl-NL", { month: "short", year: "numeric" }),
      mrr,
      agencies: activeAgencies.length,
    });
  }

  return trends;
}

/**
 * Get all subscriptions with details (paginated)
 */
export async function getAllSubscriptions(options?: {
  status?: string;
  tier?: string;
  limit?: number;
  offset?: number;
}) {
  await requireSuperAdmin();

  const limit = options?.limit ?? 50;
  const offset = options?.offset ?? 0;

  const allAgencies = await db.query.agencies.findMany({
    orderBy: [desc(agencies.createdAt)],
    limit,
    offset,
  });

  // Get org counts for each agency
  const subscriptionsWithDetails = await Promise.all(
    allAgencies.map(async (agency) => {
      const [orgCount] = await db
        .select({ count: count() })
        .from(orgs)
        .where(eq(orgs.agencyId, agency.id));

      const [memberCount] = await db
        .select({ count: count() })
        .from(agencyMemberships)
        .where(eq(agencyMemberships.agencyId, agency.id));

      return {
        id: agency.id,
        name: agency.name,
        subdomain: agency.slug, // Using slug as subdomain
        tier: agency.tier,
        subscriptionStatus: agency.subscriptionStatus,
        stripeCustomerId: agency.stripeCustomerId,
        stripeSubscriptionId: agency.stripeSubscriptionId,
        isActive: agency.isActive,
        orgCount: orgCount.count,
        memberCount: memberCount.count,
        createdAt: agency.createdAt,
        updatedAt: agency.updatedAt,
      };
    })
  );

  const [total] = await db.select({ count: count() }).from(agencies);

  return {
    subscriptions: subscriptionsWithDetails,
    total: total.count,
    limit,
    offset,
  };
}

// ============================================
// REVENUE ANALYTICS
// ============================================

/**
 * Get revenue analytics overview
 */
export async function getRevenueAnalytics() {
  await requireSuperAdmin();

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59);
  const startOfYear = new Date(now.getFullYear(), 0, 1);

  // Agency tier pricing
  const tierPricing: Record<string, number> = {
    starter: 97,
    unlimited: 297,
    saas_pro: 497,
  };

  // Direct user tier pricing (ZZP/MKB)
  const directUserPricing: Record<string, number> = {
    free: 0,
    pro: 29,
    enterprise: 99,
  };

  // Get all active agencies for MRR calculation
  const activeAgencies = await db
    .select({ tier: agencies.tier })
    .from(agencies)
    .where(eq(agencies.subscriptionStatus, "active"));

  let agencyMRR = 0;
  for (const agency of activeAgencies) {
    agencyMRR += tierPricing[agency.tier || "starter"] || 0;
  }

  // Get active direct users (ZZP/MKB - orgs without agency)
  const activeDirectUsers = await db
    .select({ tier: orgs.subscriptionTier })
    .from(orgs)
    .where(
      and(
        sql`${orgs.agencyId} IS NULL`,
        eq(orgs.subscriptionStatus, "active")
      )
    );

  let directUserMRR = 0;
  for (const user of activeDirectUsers) {
    directUserMRR += directUserPricing[user.tier || "free"] || 0;
  }

  const currentMRR = agencyMRR + directUserMRR;

  // Get agencies that were active last month for comparison
  const lastMonthAgencies = await db
    .select({ tier: agencies.tier })
    .from(agencies)
    .where(
      and(
        lt(agencies.createdAt, endOfLastMonth),
        sql`(${agencies.subscriptionStatus} = 'active' OR (${agencies.subscriptionStatus} = 'canceled' AND ${agencies.updatedAt} > ${endOfLastMonth}))`
      )
    );

  let lastMonthAgencyMRR = 0;
  for (const agency of lastMonthAgencies) {
    lastMonthAgencyMRR += tierPricing[agency.tier || "starter"] || 0;
  }

  // Get direct users that were active last month
  const lastMonthDirectUsers = await db
    .select({ tier: orgs.subscriptionTier })
    .from(orgs)
    .where(
      and(
        sql`${orgs.agencyId} IS NULL`,
        lt(orgs.createdAt, endOfLastMonth),
        sql`(${orgs.subscriptionStatus} = 'active' OR (${orgs.subscriptionStatus} = 'canceled' AND ${orgs.updatedAt} > ${endOfLastMonth}))`
      )
    );

  let lastMonthDirectUserMRR = 0;
  for (const user of lastMonthDirectUsers) {
    lastMonthDirectUserMRR += directUserPricing[user.tier || "free"] || 0;
  }

  const lastMonthMRR = lastMonthAgencyMRR + lastMonthDirectUserMRR;

  // MoM growth
  const momGrowth = lastMonthMRR > 0 ? ((currentMRR - lastMonthMRR) / lastMonthMRR) * 100 : 0;

  // Calculate total revenue from invoices (paid)
  const [totalPaidInvoices] = await db
    .select({
      total: sql<string>`COALESCE(SUM(CAST(${agencyInvoices.amount} AS DECIMAL)), 0)`,
      count: count(),
    })
    .from(agencyInvoices)
    .where(eq(agencyInvoices.status, "paid"));

  // Revenue this month
  const [monthlyRevenue] = await db
    .select({
      total: sql<string>`COALESCE(SUM(CAST(${agencyInvoices.amount} AS DECIMAL)), 0)`,
    })
    .from(agencyInvoices)
    .where(
      and(
        eq(agencyInvoices.status, "paid"),
        gte(agencyInvoices.paidAt, startOfMonth)
      )
    );

  // Revenue last month
  const [lastMonthRevenue] = await db
    .select({
      total: sql<string>`COALESCE(SUM(CAST(${agencyInvoices.amount} AS DECIMAL)), 0)`,
    })
    .from(agencyInvoices)
    .where(
      and(
        eq(agencyInvoices.status, "paid"),
        gte(agencyInvoices.paidAt, startOfLastMonth),
        lt(agencyInvoices.paidAt, startOfMonth)
      )
    );

  // Revenue this year
  const [yearlyRevenue] = await db
    .select({
      total: sql<string>`COALESCE(SUM(CAST(${agencyInvoices.amount} AS DECIMAL)), 0)`,
    })
    .from(agencyInvoices)
    .where(
      and(
        eq(agencyInvoices.status, "paid"),
        gte(agencyInvoices.paidAt, startOfYear)
      )
    );

  // ARPU (Average Revenue Per User - both agencies and direct users)
  const totalActiveCustomers = activeAgencies.length + activeDirectUsers.length;
  const arpu = totalActiveCustomers > 0 ? currentMRR / totalActiveCustomers : 0;

  return {
    mrr: currentMRR,
    arr: currentMRR * 12,
    momGrowth: Math.round(momGrowth * 10) / 10,
    totalRevenue: parseFloat(totalPaidInvoices.total || "0"),
    monthlyRevenue: parseFloat(monthlyRevenue.total || "0"),
    lastMonthRevenue: parseFloat(lastMonthRevenue.total || "0"),
    yearlyRevenue: parseFloat(yearlyRevenue.total || "0"),
    arpu: Math.round(arpu * 100) / 100,
    totalInvoicesPaid: totalPaidInvoices.count,
    // Agency breakdown
    activeAgencies: activeAgencies.length,
    agencyMRR,
    // Direct user breakdown (ZZP/MKB)
    activeDirectUsers: activeDirectUsers.length,
    directUserMRR,
  };
}

/**
 * Get revenue by month for charts
 */
export async function getRevenueByMonth(months: number = 12) {
  await requireSuperAdmin();

  const now = new Date();
  const revenue: {
    month: string;
    invoiceRevenue: number;
    agencyMRR: number;
    directUserMRR: number;
    totalMRR: number;
    total: number;
  }[] = [];

  // Agency tier pricing
  const tierPricing: Record<string, number> = {
    starter: 97,
    unlimited: 297,
    saas_pro: 497,
  };

  // Direct user tier pricing (ZZP/MKB)
  const directUserPricing: Record<string, number> = {
    free: 0,
    pro: 29,
    enterprise: 99,
  };

  for (let i = months - 1; i >= 0; i--) {
    const monthStart = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthEnd = new Date(now.getFullYear(), now.getMonth() - i + 1, 0, 23, 59, 59);

    // Get invoice revenue for this month
    const [invoiceRev] = await db
      .select({
        total: sql<string>`COALESCE(SUM(CAST(${agencyInvoices.amount} AS DECIMAL)), 0)`,
      })
      .from(agencyInvoices)
      .where(
        and(
          eq(agencyInvoices.status, "paid"),
          gte(agencyInvoices.paidAt, monthStart),
          lt(agencyInvoices.paidAt, monthEnd)
        )
      );

    // Get agency MRR (estimated from active subscriptions)
    const activeAgencies = await db
      .select({ tier: agencies.tier })
      .from(agencies)
      .where(
        and(
          lt(agencies.createdAt, monthEnd),
          sql`(${agencies.subscriptionStatus} = 'active' OR (${agencies.subscriptionStatus} = 'canceled' AND ${agencies.updatedAt} > ${monthEnd}))`
        )
      );

    let agencyMRR = 0;
    for (const agency of activeAgencies) {
      agencyMRR += tierPricing[agency.tier || "starter"] || 0;
    }

    // Get direct user MRR (ZZP/MKB - orgs without agency)
    const activeDirectUsers = await db
      .select({ tier: orgs.subscriptionTier })
      .from(orgs)
      .where(
        and(
          sql`${orgs.agencyId} IS NULL`,
          lt(orgs.createdAt, monthEnd),
          sql`(${orgs.subscriptionStatus} = 'active' OR (${orgs.subscriptionStatus} = 'canceled' AND ${orgs.updatedAt} > ${monthEnd}))`
        )
      );

    let directUserMRR = 0;
    for (const user of activeDirectUsers) {
      directUserMRR += directUserPricing[user.tier || "free"] || 0;
    }

    const invoiceRevenue = parseFloat(invoiceRev.total || "0");
    const totalMRR = agencyMRR + directUserMRR;

    revenue.push({
      month: monthStart.toLocaleDateString("nl-NL", { month: "short", year: "numeric" }),
      invoiceRevenue,
      agencyMRR,
      directUserMRR,
      totalMRR,
      total: invoiceRevenue + totalMRR,
    });
  }

  return revenue;
}

/**
 * Get growth metrics
 */
export async function getGrowthMetrics() {
  await requireSuperAdmin();

  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const sixtyDaysAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);
  const ninetyDaysAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);

  // New agencies in different periods
  const [newLast30Days] = await db
    .select({ count: count() })
    .from(agencies)
    .where(gte(agencies.createdAt, thirtyDaysAgo));

  const [newPrev30Days] = await db
    .select({ count: count() })
    .from(agencies)
    .where(
      and(
        gte(agencies.createdAt, sixtyDaysAgo),
        lt(agencies.createdAt, thirtyDaysAgo)
      )
    );

  const [newLast90Days] = await db
    .select({ count: count() })
    .from(agencies)
    .where(gte(agencies.createdAt, ninetyDaysAgo));

  // Canceled in different periods
  const [canceledLast30Days] = await db
    .select({ count: count() })
    .from(agencies)
    .where(
      and(
        eq(agencies.subscriptionStatus, "canceled"),
        gte(agencies.updatedAt, thirtyDaysAgo)
      )
    );

  const [canceledPrev30Days] = await db
    .select({ count: count() })
    .from(agencies)
    .where(
      and(
        eq(agencies.subscriptionStatus, "canceled"),
        gte(agencies.updatedAt, sixtyDaysAgo),
        lt(agencies.updatedAt, thirtyDaysAgo)
      )
    );

  // Net growth
  const netGrowth30Days = newLast30Days.count - canceledLast30Days.count;
  const netGrowthPrev30Days = newPrev30Days.count - canceledPrev30Days.count;

  // Growth rate change
  const growthRateChange = netGrowthPrev30Days !== 0
    ? ((netGrowth30Days - netGrowthPrev30Days) / Math.abs(netGrowthPrev30Days)) * 100
    : netGrowth30Days > 0 ? 100 : 0;

  return {
    newLast30Days: newLast30Days.count,
    newPrev30Days: newPrev30Days.count,
    newLast90Days: newLast90Days.count,
    canceledLast30Days: canceledLast30Days.count,
    canceledPrev30Days: canceledPrev30Days.count,
    netGrowth30Days,
    netGrowthPrev30Days,
    growthRateChange: Math.round(growthRateChange * 10) / 10,
  };
}

/**
 * Get recent payment history
 */
export async function getPaymentHistory(limit: number = 20) {
  await requireSuperAdmin();

  const recentPayments = await db.query.agencyInvoices.findMany({
    where: eq(agencyInvoices.status, "paid"),
    orderBy: [desc(agencyInvoices.paidAt)],
    limit,
    with: {
      agency: true,
    },
  });

  return recentPayments.map((payment) => ({
    id: payment.id,
    invoiceId: payment.stripeInvoiceId,
    agencyName: payment.agency?.name || "Unknown",
    amount: parseFloat(payment.amount || "0"),
    paidAt: payment.paidAt,
    createdAt: payment.createdAt,
  }));
}

// ============================================
// CRON JOB MONITORING
// ============================================

/**
 * Get cron job statistics for dashboard
 */
export async function getCronJobStats() {
  await requireSuperAdmin();

  const now = new Date();
  const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

  // Get all configs
  const configs = await db.query.cronJobConfigs.findMany();

  // Get running jobs
  const [runningCount] = await db
    .select({ count: count() })
    .from(cronJobRuns)
    .where(eq(cronJobRuns.status, "running"));

  // Get success rate (last 24h)
  const last24hRuns = await db
    .select({
      status: cronJobRuns.status,
      count: count(),
    })
    .from(cronJobRuns)
    .where(gte(cronJobRuns.startedAt, oneDayAgo))
    .groupBy(cronJobRuns.status);

  const statusCounts = last24hRuns.reduce(
    (acc, { status, count }) => ({ ...acc, [status]: count }),
    {} as Record<string, number>
  );

  const total24h = Object.values(statusCounts).reduce((a, b) => a + b, 0);
  const successCount = statusCounts.success || 0;
  const successRate = total24h > 0 ? (successCount / total24h) * 100 : 100;

  // Count jobs with failures
  const failedJobs = configs.filter(
    (c) => (c.consecutiveFailures || 0) > 0
  ).length;

  return {
    totalJobs: configs.length,
    runningNow: runningCount.count,
    successRate24h: Math.round(successRate * 10) / 10,
    failedJobs,
    runsLast24h: total24h,
    statusCounts,
  };
}

/**
 * Get all cron job configs with recent run info
 */
export async function getCronJobConfigs() {
  await requireSuperAdmin();

  const configs = await db.query.cronJobConfigs.findMany({
    orderBy: [desc(cronJobConfigs.lastRunAt)],
  });

  // Get latest run for each job
  const configsWithRuns = await Promise.all(
    configs.map(async (config) => {
      const latestRun = await db.query.cronJobRuns.findFirst({
        where: eq(cronJobRuns.jobName, config.jobName),
        orderBy: [desc(cronJobRuns.startedAt)],
      });

      return {
        ...config,
        latestRun: latestRun
          ? {
              id: latestRun.id,
              status: latestRun.status,
              startedAt: latestRun.startedAt,
              completedAt: latestRun.completedAt,
              duration: latestRun.duration,
              itemsProcessed: latestRun.itemsProcessed,
              errorMessage: latestRun.errorMessage,
            }
          : null,
      };
    })
  );

  return configsWithRuns;
}

/**
 * Get cron job run history
 */
export async function getCronJobHistory(options?: {
  jobName?: string;
  limit?: number;
  offset?: number;
}) {
  await requireSuperAdmin();

  const limit = options?.limit ?? 50;
  const offset = options?.offset ?? 0;

  const runs = await db.query.cronJobRuns.findMany({
    where: options?.jobName
      ? eq(cronJobRuns.jobName, options.jobName)
      : undefined,
    orderBy: [desc(cronJobRuns.startedAt)],
    limit,
    offset,
  });

  const [totalCount] = await db
    .select({ count: count() })
    .from(cronJobRuns)
    .where(
      options?.jobName
        ? eq(cronJobRuns.jobName, options.jobName)
        : undefined
    );

  return {
    runs,
    total: totalCount.count,
    limit,
    offset,
  };
}

/**
 * Manually trigger a cron job
 */
export async function triggerCronJob(jobName: string) {
  await requireSuperAdmin();

  // Map job names to their API endpoints
  const jobEndpoints: Record<string, string> = {
    "process-meta-leads": "/api/cron/process-meta-leads",
    "generate-recurring-invoices": "/api/cron/generate-recurring-invoices",
    "send-invoice-reminders": "/api/cron/send-invoice-reminders",
    "generate-follow-up-reminders": "/api/cron/generate-follow-up-reminders",
  };

  const endpoint = jobEndpoints[jobName];
  if (!endpoint) {
    throw new Error(`Unknown job: ${jobName}`);
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  const response = await fetch(`${baseUrl}${endpoint}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.CRON_SECRET}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to trigger job: ${response.statusText}`);
  }

  return { success: true, jobName };
}

/**
 * Update cron job configuration
 */
export async function updateCronJobConfig(
  jobName: string,
  config: { isEnabled?: boolean; alertThreshold?: number }
) {
  await requireSuperAdmin();

  await db
    .update(cronJobConfigs)
    .set(config)
    .where(eq(cronJobConfigs.jobName, jobName));

  return { success: true };
}

/**
 * Initialize default cron job configs
 */
export async function initializeCronJobConfigs() {
  await requireSuperAdmin();

  const defaultJobs = [
    {
      jobName: "process-meta-leads",
      schedule: "*/5 * * * *",
      description: "Verwerk inkomende Meta Lead Ads (elke 5 minuten)",
    },
    {
      jobName: "generate-recurring-invoices",
      schedule: "0 6 * * *",
      description: "Genereer terugkerende facturen (dagelijks 06:00)",
    },
    {
      jobName: "send-invoice-reminders",
      schedule: "0 9 * * *",
      description: "Verstuur betalingsherinneringen (dagelijks 09:00)",
    },
    {
      jobName: "generate-follow-up-reminders",
      schedule: "0 * * * *",
      description: "Genereer follow-up notificaties (elk uur)",
    },
  ];

  for (const job of defaultJobs) {
    const existing = await db.query.cronJobConfigs.findFirst({
      where: eq(cronJobConfigs.jobName, job.jobName),
    });

    if (!existing) {
      await db.insert(cronJobConfigs).values({
        ...job,
        isEnabled: true,
        consecutiveFailures: 0,
        alertThreshold: 3,
      });
    }
  }

  return { success: true, initialized: defaultJobs.length };
}

// ============================================
// ANNOUNCEMENTS SYSTEM
// ============================================

/**
 * Get announcement statistics
 */
export async function getAnnouncementStats() {
  await requireSuperAdmin();

  const now = new Date();

  const [total] = await db.select({ count: count() }).from(announcements);

  const [active] = await db
    .select({ count: count() })
    .from(announcements)
    .where(eq(announcements.status, "active"));

  const [scheduled] = await db
    .select({ count: count() })
    .from(announcements)
    .where(eq(announcements.status, "scheduled"));

  const [draft] = await db
    .select({ count: count() })
    .from(announcements)
    .where(eq(announcements.status, "draft"));

  // Get dismissal count for active announcements
  const [dismissals] = await db
    .select({ count: count() })
    .from(announcementDismissals);

  return {
    total: total.count,
    active: active.count,
    scheduled: scheduled.count,
    draft: draft.count,
    totalDismissals: dismissals.count,
  };
}

/**
 * Get all announcements with dismissal counts
 */
export async function getAnnouncements(status?: string) {
  await requireSuperAdmin();

  const allAnnouncements = await db.query.announcements.findMany({
    orderBy: [desc(announcements.createdAt)],
  });

  // Filter by status if provided
  const filtered = status
    ? allAnnouncements.filter((a) => a.status === status)
    : allAnnouncements;

  // Get dismissal counts
  const withDismissals = await Promise.all(
    filtered.map(async (announcement) => {
      const [dismissalCount] = await db
        .select({ count: count() })
        .from(announcementDismissals)
        .where(eq(announcementDismissals.announcementId, announcement.id));

      return {
        ...announcement,
        dismissalCount: dismissalCount.count,
      };
    })
  );

  return withDismissals;
}

/**
 * Create a new announcement
 */
export async function createAnnouncement(data: {
  title: string;
  content: string;
  type?: "info" | "warning" | "feature" | "maintenance";
  target?: string;
  targetAgencyIds?: number[];
  targetOrgIds?: number[];
  publishAt?: Date;
  expiresAt?: Date;
  dismissible?: boolean;
  showOnDashboard?: boolean;
}) {
  await requireSuperAdmin();

  const status = data.publishAt && data.publishAt > new Date() ? "scheduled" : "draft";

  const [announcement] = await db
    .insert(announcements)
    .values({
      title: data.title,
      content: data.content,
      type: data.type || "info",
      status,
      target: data.target || "all",
      targetAgencyIds: data.targetAgencyIds || null,
      targetOrgIds: data.targetOrgIds || null,
      publishAt: data.publishAt || null,
      expiresAt: data.expiresAt || null,
      dismissible: data.dismissible ?? true,
      showOnDashboard: data.showOnDashboard ?? true,
    })
    .returning();

  return announcement;
}

/**
 * Update an announcement
 */
export async function updateAnnouncement(
  id: number,
  data: {
    title?: string;
    content?: string;
    type?: "info" | "warning" | "feature" | "maintenance";
    status?: "draft" | "scheduled" | "active" | "expired";
    target?: string;
    targetAgencyIds?: number[];
    targetOrgIds?: number[];
    publishAt?: Date;
    expiresAt?: Date;
    dismissible?: boolean;
    showOnDashboard?: boolean;
  }
) {
  await requireSuperAdmin();

  await db
    .update(announcements)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(eq(announcements.id, id));

  return { success: true };
}

/**
 * Delete an announcement
 */
export async function deleteAnnouncement(id: number) {
  await requireSuperAdmin();

  // Delete dismissals first
  await db
    .delete(announcementDismissals)
    .where(eq(announcementDismissals.announcementId, id));

  // Delete the announcement
  await db.delete(announcements).where(eq(announcements.id, id));

  return { success: true };
}

/**
 * Publish an announcement (set to active)
 */
export async function publishAnnouncement(id: number) {
  await requireSuperAdmin();

  await db
    .update(announcements)
    .set({
      status: "active",
      publishAt: new Date(),
      updatedAt: new Date(),
    })
    .where(eq(announcements.id, id));

  return { success: true };
}

/**
 * Expire an announcement
 */
export async function expireAnnouncement(id: number) {
  await requireSuperAdmin();

  await db
    .update(announcements)
    .set({
      status: "expired",
      expiresAt: new Date(),
      updatedAt: new Date(),
    })
    .where(eq(announcements.id, id));

  return { success: true };
}

// ============================================
// FEATURE FLAGS
// ============================================

/**
 * Get feature flag statistics
 */
export async function getFeatureFlagStats() {
  await requireSuperAdmin();

  const [total] = await db.select({ count: count() }).from(featureFlags);

  const [active] = await db
    .select({ count: count() })
    .from(featureFlags)
    .where(eq(featureFlags.isActive, true));

  const [beta] = await db
    .select({ count: count() })
    .from(featureFlags)
    .where(eq(featureFlags.isBeta, true));

  const [overrides] = await db.select({ count: count() }).from(featureFlagOverrides);

  return {
    total: total.count,
    active: active.count,
    beta: beta.count,
    totalOverrides: overrides.count,
  };
}

/**
 * Get all feature flags with override counts
 */
export async function getFeatureFlags() {
  await requireSuperAdmin();

  const flags = await db.query.featureFlags.findMany({
    orderBy: [desc(featureFlags.createdAt)],
  });

  // Get override counts
  const withOverrides = await Promise.all(
    flags.map(async (flag) => {
      const [overrideCount] = await db
        .select({ count: count() })
        .from(featureFlagOverrides)
        .where(eq(featureFlagOverrides.featureFlagId, flag.id));

      return {
        ...flag,
        overrideCount: overrideCount.count,
      };
    })
  );

  return withOverrides;
}

/**
 * Create a new feature flag
 */
export async function createFeatureFlag(data: {
  key: string;
  name: string;
  description?: string;
  type?: "boolean" | "percentage" | "tier_based";
  defaultEnabled?: boolean;
  rolloutPercentage?: number;
  enabledTiers?: string[];
  isBeta?: boolean;
}) {
  await requireSuperAdmin();

  const [flag] = await db
    .insert(featureFlags)
    .values({
      key: data.key,
      name: data.name,
      description: data.description || null,
      type: data.type || "boolean",
      defaultEnabled: data.defaultEnabled ?? false,
      rolloutPercentage: data.rolloutPercentage ?? 0,
      enabledTiers: data.enabledTiers || null,
      isBeta: data.isBeta ?? false,
      isActive: true,
    })
    .returning();

  return flag;
}

/**
 * Update a feature flag
 */
export async function updateFeatureFlag(
  id: number,
  data: {
    name?: string;
    description?: string;
    type?: "boolean" | "percentage" | "tier_based";
    defaultEnabled?: boolean;
    rolloutPercentage?: number;
    enabledTiers?: string[];
    isBeta?: boolean;
    isActive?: boolean;
  }
) {
  await requireSuperAdmin();

  await db
    .update(featureFlags)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(eq(featureFlags.id, id));

  return { success: true };
}

/**
 * Toggle a feature flag on/off
 */
export async function toggleFeatureFlag(id: number) {
  await requireSuperAdmin();

  const flag = await db.query.featureFlags.findFirst({
    where: eq(featureFlags.id, id),
  });

  if (!flag) throw new Error("Feature flag not found");

  await db
    .update(featureFlags)
    .set({
      isActive: !flag.isActive,
      updatedAt: new Date(),
    })
    .where(eq(featureFlags.id, id));

  return { success: true, isActive: !flag.isActive };
}

/**
 * Delete a feature flag
 */
export async function deleteFeatureFlag(id: number) {
  await requireSuperAdmin();

  // Delete overrides first
  await db
    .delete(featureFlagOverrides)
    .where(eq(featureFlagOverrides.featureFlagId, id));

  // Delete the flag
  await db.delete(featureFlags).where(eq(featureFlags.id, id));

  return { success: true };
}

/**
 * Get feature flag overrides
 */
export async function getFeatureFlagOverrides(flagId: number) {
  await requireSuperAdmin();

  const overrides = await db.query.featureFlagOverrides.findMany({
    where: eq(featureFlagOverrides.featureFlagId, flagId),
    with: {
      org: true,
      agency: true,
    },
  });

  return overrides;
}

/**
 * Create a feature flag override
 */
export async function createFeatureFlagOverride(data: {
  featureFlagId: number;
  orgId?: number;
  agencyId?: number;
  enabled: boolean;
}) {
  await requireSuperAdmin();

  const [override] = await db
    .insert(featureFlagOverrides)
    .values({
      featureFlagId: data.featureFlagId,
      orgId: data.orgId || null,
      agencyId: data.agencyId || null,
      enabled: data.enabled,
    })
    .returning();

  return override;
}

/**
 * Delete a feature flag override
 */
export async function deleteFeatureFlagOverride(id: number) {
  await requireSuperAdmin();

  await db.delete(featureFlagOverrides).where(eq(featureFlagOverrides.id, id));

  return { success: true };
}

// ============================================
// SUPPORT INBOX
// ============================================

/**
 * Get support ticket statistics
 */
export async function getSupportStats() {
  await requireSuperAdmin();

  const now = new Date();
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  const [total] = await db.select({ count: count() }).from(supportTickets);

  const [open] = await db
    .select({ count: count() })
    .from(supportTickets)
    .where(eq(supportTickets.status, "new"));

  const [inProgress] = await db
    .select({ count: count() })
    .from(supportTickets)
    .where(eq(supportTickets.status, "in_progress"));

  const [urgent] = await db
    .select({ count: count() })
    .from(supportTickets)
    .where(eq(supportTickets.priority, "urgent"));

  const [resolvedThisWeek] = await db
    .select({ count: count() })
    .from(supportTickets)
    .where(
      and(
        eq(supportTickets.status, "resolved"),
        gte(supportTickets.resolvedAt, sevenDaysAgo)
      )
    );

  return {
    total: total.count,
    open: open.count,
    inProgress: inProgress.count,
    urgent: urgent.count,
    resolvedThisWeek: resolvedThisWeek.count,
  };
}

/**
 * Get support tickets with filters
 */
export async function getSupportTickets(filters?: {
  status?: string;
  priority?: string;
  limit?: number;
  offset?: number;
}) {
  await requireSuperAdmin();

  const limit = filters?.limit ?? 50;
  const offset = filters?.offset ?? 0;

  const tickets = await db.query.supportTickets.findMany({
    orderBy: [desc(supportTickets.createdAt)],
    limit,
    offset,
    with: {
      org: true,
      user: true,
    },
  });

  // Filter if needed
  let filtered = tickets;
  if (filters?.status) {
    filtered = filtered.filter((t) => t.status === filters.status);
  }
  if (filters?.priority) {
    filtered = filtered.filter((t) => t.priority === filters.priority);
  }

  const [totalCount] = await db.select({ count: count() }).from(supportTickets);

  return {
    tickets: filtered,
    total: totalCount.count,
    limit,
    offset,
  };
}

/**
 * Get a single support ticket by ID with replies
 */
export async function getSupportTicketById(id: number) {
  await requireSuperAdmin();

  const ticket = await db.query.supportTickets.findFirst({
    where: eq(supportTickets.id, id),
    with: {
      org: true,
      user: true,
      replies: {
        orderBy: [desc(supportTicketReplies.createdAt)],
      },
    },
  });

  return ticket;
}

/**
 * Update a support ticket
 */
export async function updateSupportTicket(
  id: number,
  data: {
    status?: "new" | "in_progress" | "waiting_reply" | "resolved" | "closed";
    priority?: "low" | "medium" | "high" | "urgent";
    assignedTo?: string;
  }
) {
  await requireSuperAdmin();

  const updateData: Record<string, unknown> = {
    ...data,
    updatedAt: new Date(),
  };

  // If resolved, set resolvedAt
  if (data.status === "resolved") {
    updateData.resolvedAt = new Date();
  }

  await db
    .update(supportTickets)
    .set(updateData)
    .where(eq(supportTickets.id, id));

  return { success: true };
}

/**
 * Add an admin reply to a support ticket
 */
export async function addSupportReply(
  ticketId: number,
  message: string,
  adminEmail: string,
  adminName?: string
) {
  await requireSuperAdmin();

  // Get the ticket info to send email notification
  const ticket = await db.query.supportTickets.findFirst({
    where: eq(supportTickets.id, ticketId),
  });

  if (!ticket) {
    throw new Error("Ticket not found");
  }

  const [reply] = await db
    .insert(supportTicketReplies)
    .values({
      ticketId,
      isAdminReply: true,
      senderEmail: adminEmail,
      senderName: adminName || "Support Team",
      message,
    })
    .returning();

  // Update ticket status to waiting_reply
  await db
    .update(supportTickets)
    .set({
      status: "waiting_reply",
      updatedAt: new Date(),
    })
    .where(eq(supportTickets.id, ticketId));

  // Send email notification to user
  const emailResult = await sendEmail({
    to: ticket.userEmail,
    subject: `[Re: Ticket #${ticketId}] ${ticket.subject}`,
    template: SupportTicketReplyEmail({
      ticketId,
      ticketSubject: ticket.subject,
      userName: ticket.userName || ticket.userEmail.split("@")[0],
      adminName: adminName || "Support Team",
      replyMessage: message,
      originalMessage: ticket.message,
    }),
    templateName: "support-ticket-reply",
    replyTo: "support@wetryleadflow.com",
    relatedEntity: {
      type: "support_ticket",
      id: ticketId,
    },
    metadata: {
      ticketId,
      replyId: reply.id,
    },
  });

  if (!emailResult.success) {
    console.error("[Support] Failed to send reply notification:", emailResult.error);
    // Don't throw - reply was saved successfully
  }

  return reply;
}

/**
 * Resolve a support ticket with notes
 */
export async function resolveSupportTicket(id: number, notes?: string) {
  await requireSuperAdmin();

  await db
    .update(supportTickets)
    .set({
      status: "resolved",
      resolvedAt: new Date(),
      resolutionNotes: notes || null,
      updatedAt: new Date(),
    })
    .where(eq(supportTickets.id, id));

  return { success: true };
}

/**
 * Close a support ticket
 */
export async function closeSupportTicket(id: number) {
  await requireSuperAdmin();

  await db
    .update(supportTickets)
    .set({
      status: "closed",
      updatedAt: new Date(),
    })
    .where(eq(supportTickets.id, id));

  return { success: true };
}

/**
 * Delete a support ticket
 */
export async function deleteSupportTicket(id: number) {
  await requireSuperAdmin();

  // Delete replies first
  await db
    .delete(supportTicketReplies)
    .where(eq(supportTicketReplies.ticketId, id));

  // Delete the ticket
  await db.delete(supportTickets).where(eq(supportTickets.id, id));

  return { success: true };
}

// ============================================
// USER & AGENCY DELETION
// ============================================

/**
 * Check if user can be safely deleted
 * Returns blocking reasons if any
 */
export async function canDeleteUser(userId: number): Promise<{
  canDelete: boolean;
  reasons: string[];
  orgsToTransfer: { id: number; name: string }[];
}> {
  await requireSuperAdmin();

  const reasons: string[] = [];
  const orgsToTransfer: { id: number; name: string }[] = [];

  // Get user's memberships
  const userMemberships = await db.query.memberships.findMany({
    where: eq(memberships.userId, userId),
    with: {
      org: true,
    },
  });

  // Check each org where user is owner
  for (const membership of userMemberships) {
    if (membership.role === "owner") {
      // Check if there are other owners
      const otherOwners = await db
        .select({ count: count() })
        .from(memberships)
        .where(
          and(
            eq(memberships.orgId, membership.orgId),
            eq(memberships.role, "owner"),
            sql`${memberships.userId} != ${userId}`
          )
        );

      if (otherOwners[0].count === 0) {
        // Check if org has other members who could become owner
        const otherMembers = await db
          .select({ count: count() })
          .from(memberships)
          .where(
            and(
              eq(memberships.orgId, membership.orgId),
              sql`${memberships.userId} != ${userId}`
            )
          );

        if (otherMembers[0].count > 0) {
          orgsToTransfer.push({
            id: membership.org.id,
            name: membership.org.name,
          });
        }
      }
    }
  }

  if (orgsToTransfer.length > 0) {
    reasons.push(
      `User is sole owner of ${orgsToTransfer.length} organization(s) with other members. Transfer ownership first.`
    );
  }

  return {
    canDelete: reasons.length === 0,
    reasons,
    orgsToTransfer,
  };
}

/**
 * Delete a user and all their data
 * This is a destructive action - use with caution!
 */
export async function deleteUser(userId: number, forceDeleteOrgs: boolean = false) {
  await requireSuperAdmin();

  // First check if deletion is allowed
  const { canDelete, reasons, orgsToTransfer } = await canDeleteUser(userId);

  if (!canDelete && !forceDeleteOrgs) {
    throw new Error(reasons.join("\n"));
  }

  // Get the user first
  const user = await db.query.users.findFirst({
    where: eq(users.id, userId),
  });

  if (!user) {
    throw new Error("User not found");
  }

  // If forceDeleteOrgs, delete orgs where user is sole owner
  if (forceDeleteOrgs && orgsToTransfer.length > 0) {
    for (const org of orgsToTransfer) {
      await deleteOrg(org.id);
    }
  }

  // Set user references to NULL in tables without cascade delete
  // These tables reference users.id without onDelete cascade:

  // contacts.createdById
  await db
    .update(contacts)
    .set({ createdById: null })
    .where(eq(contacts.createdById, userId));

  // opportunities.assignedToId & createdById
  await db
    .update(opportunities)
    .set({ assignedToId: null })
    .where(eq(opportunities.assignedToId, userId));

  await db
    .update(opportunities)
    .set({ createdById: null })
    .where(eq(opportunities.createdById, userId));

  // opportunityStageHistory.movedById
  await db
    .update(opportunityStageHistory)
    .set({ movedById: null })
    .where(eq(opportunityStageHistory.movedById, userId));

  // notes.createdById
  await db
    .update(notes)
    .set({ createdById: null })
    .where(eq(notes.createdById, userId));

  // leadIngestRoutes.assignToUserId
  await db
    .update(leadIngestRoutes)
    .set({ assignToUserId: null })
    .where(eq(leadIngestRoutes.assignToUserId, userId));

  // Delete agency memberships (uses externalId not userId)
  await db
    .delete(agencyMemberships)
    .where(eq(agencyMemberships.userId, user.externalId));

  // Delete the user (cascade will handle memberships, notifications)
  await db.delete(users).where(eq(users.id, userId));

  return { success: true, deletedEmail: user.email };
}

/**
 * Check if organization can be safely deleted
 */
export async function canDeleteOrg(orgId: number): Promise<{
  canDelete: boolean;
  warnings: string[];
  memberCount: number;
  contactCount: number;
  opportunityCount: number;
  workspaceCount: number;
}> {
  await requireSuperAdmin();

  const warnings: string[] = [];

  // Get org details
  const org = await db.query.orgs.findFirst({
    where: eq(orgs.id, orgId),
  });

  if (!org) {
    throw new Error("Organization not found");
  }

  // Count members
  const [memberCountResult] = await db
    .select({ count: count() })
    .from(memberships)
    .where(eq(memberships.orgId, orgId));

  // Count workspaces
  const [workspaceCountResult] = await db
    .select({ count: count() })
    .from(workspaces)
    .where(eq(workspaces.orgId, orgId));

  // Get workspace IDs
  const orgWorkspaces = await db
    .select({ id: workspaces.id })
    .from(workspaces)
    .where(eq(workspaces.orgId, orgId));

  const workspaceIds = orgWorkspaces.map((w) => w.id);

  let contactCount = 0;
  let opportunityCount = 0;

  if (workspaceIds.length > 0) {
    const [contactResult] = await db
      .select({ count: count() })
      .from(contacts)
      .where(sql`${contacts.workspaceId} IN ${workspaceIds}`);
    contactCount = contactResult.count;

    const [opportunityResult] = await db
      .select({ count: count() })
      .from(opportunities)
      .where(sql`${opportunities.workspaceId} IN ${workspaceIds}`);
    opportunityCount = opportunityResult.count;
  }

  if (memberCountResult.count > 0) {
    warnings.push(`Organization has ${memberCountResult.count} member(s) who will lose access.`);
  }

  if (contactCount > 0) {
    warnings.push(`${contactCount} contact(s) will be permanently deleted.`);
  }

  if (opportunityCount > 0) {
    warnings.push(`${opportunityCount} opportunity/ies will be permanently deleted.`);
  }

  return {
    canDelete: true, // Always allow deletion for super admin
    warnings,
    memberCount: memberCountResult.count,
    contactCount,
    opportunityCount,
    workspaceCount: workspaceCountResult.count,
  };
}

/**
 * Delete an organization and all its data
 */
export async function deleteOrg(orgId: number) {
  await requireSuperAdmin();

  // Get org info for return value
  const org = await db.query.orgs.findFirst({
    where: eq(orgs.id, orgId),
  });

  if (!org) {
    throw new Error("Organization not found");
  }

  // The cascade delete should handle most things:
  // - memberships (cascade)
  // - workspaces -> contacts, opportunities, pipelines, etc. (cascade)

  await db.delete(orgs).where(eq(orgs.id, orgId));

  return { success: true, deletedName: org.name };
}

/**
 * Check if agency can be safely deleted
 */
export async function canDeleteAgency(agencyId: number): Promise<{
  canDelete: boolean;
  warnings: string[];
  orgCount: number;
  memberCount: number;
}> {
  await requireSuperAdmin();

  const warnings: string[] = [];

  // Count orgs
  const [orgCountResult] = await db
    .select({ count: count() })
    .from(orgs)
    .where(eq(orgs.agencyId, agencyId));

  // Count members
  const [memberCountResult] = await db
    .select({ count: count() })
    .from(agencyMemberships)
    .where(eq(agencyMemberships.agencyId, agencyId));

  if (orgCountResult.count > 0) {
    warnings.push(
      `Agency has ${orgCountResult.count} client organization(s). They will be converted to direct LeadFlow customers.`
    );
  }

  if (memberCountResult.count > 0) {
    warnings.push(
      `Agency has ${memberCountResult.count} team member(s). They will lose agency access.`
    );
  }

  return {
    canDelete: true, // Always allow deletion, but show warnings
    warnings,
    orgCount: orgCountResult.count,
    memberCount: memberCountResult.count,
  };
}

/**
 * Create a test agency for super-admin (for development/testing)
 */
export async function createTestAgency() {
  const user = await requireSuperAdmin();

  // Check if an agency already exists
  const existing = await db.query.agencies.findFirst();
  if (existing) {
    return { success: false, error: "An agency already exists", agencyId: existing.id };
  }

  // Create a test agency
  const [agency] = await db
    .insert(agencies)
    .values({
      name: "Test Agency",
      slug: "test-agency",
      email: user.primaryEmail || "admin@test.com",
      isActive: true,
      subscriptionStatus: "active",
      tier: "unlimited",
      maxOrgs: 100,
      primaryColor: "#8b5cf6",
      secondaryColor: "#a78bfa",
      onboardingCompleted: true,
    })
    .returning();

  // Create membership for the super-admin
  await db.insert(agencyMemberships).values({
    agencyId: agency.id,
    userId: user.id,
    role: "owner",
  });

  return { success: true, agencyId: agency.id, agencyName: agency.name };
}

/**
 * Delete an agency and all its data
 * Client orgs will have agencyId set to null (become direct customers)
 */
export async function deleteAgency(agencyId: number) {
  await requireSuperAdmin();

  // Get agency info first
  const agency = await db.query.agencies.findFirst({
    where: eq(agencies.id, agencyId),
  });

  if (!agency) {
    throw new Error("Agency not found");
  }

  // The schema has onDelete: "set null" for orgs.agencyId
  // So client orgs will become direct LeadFlow customers

  // Delete in order (most have cascade, but let's be explicit):

  // 1. Delete client subscriptions
  await db
    .delete(clientSubscriptions)
    .where(eq(clientSubscriptions.agencyId, agencyId));

  // 2. Delete invoices
  await db
    .delete(agencyInvoices)
    .where(eq(agencyInvoices.agencyId, agencyId));

  // 3. Delete pricing plans
  await db
    .delete(agencyPricingPlans)
    .where(eq(agencyPricingPlans.agencyId, agencyId));

  // 4. Delete SaaS settings
  await db
    .delete(agencySaasSettings)
    .where(eq(agencySaasSettings.agencyId, agencyId));

  // 5. Delete Stripe account
  await db
    .delete(agencyStripeAccounts)
    .where(eq(agencyStripeAccounts.agencyId, agencyId));

  // 6. Delete invites
  await db
    .delete(agencyInvites)
    .where(eq(agencyInvites.agencyId, agencyId));

  // 7. Delete memberships
  await db
    .delete(agencyMemberships)
    .where(eq(agencyMemberships.agencyId, agencyId));

  // 8. Delete feature flag overrides for this agency
  await db
    .delete(featureFlagOverrides)
    .where(eq(featureFlagOverrides.agencyId, agencyId));

  // 9. Finally delete the agency itself
  await db.delete(agencies).where(eq(agencies.id, agencyId));

  return { success: true, deletedName: agency.name };
}
