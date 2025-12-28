"use server";

import { db } from "@/lib/db";
import { agencies, agencyMemberships, orgs, memberships, contacts, workspaces, users } from "@/lib/db/schema";
import { eq, and, count, sql, or } from "drizzle-orm";
import { stackServerApp } from "@/stack/server";
import { revalidatePath } from "next/cache";
import { requireAgencyMember, requireAgencyOwner, requireAgencyAdmin } from "@/lib/auth/agency";
import { DEFAULT_AGENCY_LOGO } from "@/lib/constants";

/**
 * Get or create the database user for a Stack Auth user
 */
async function getOrCreateDbUser(stackUser: { id: string; primaryEmail: string | null; displayName: string | null }) {
  const email = stackUser.primaryEmail || `user-${stackUser.id}@placeholder.local`;

  // Check if user exists
  let dbUser = await db.query.users.findFirst({
    where: or(eq(users.externalId, stackUser.id), eq(users.email, email)),
  });

  if (!dbUser) {
    // Create new database user
    const [newUser] = await db
      .insert(users)
      .values({
        externalId: stackUser.id,
        email,
        name: stackUser.displayName,
      })
      .returning();
    dbUser = newUser;
  }

  return dbUser;
}

/**
 * Check if the current user already has an agency membership
 */
export async function checkUserHasAgency(): Promise<{ hasAgency: boolean }> {
  const user = await stackServerApp.getUser();
  if (!user) {
    return { hasAgency: false };
  }

  const [membership] = await db
    .select({ id: agencyMemberships.id })
    .from(agencyMemberships)
    .where(eq(agencyMemberships.userId, user.id))
    .limit(1);

  return { hasAgency: !!membership };
}

/**
 * Check if a slug is available (not taken by another agency)
 * Server action version for client-side use
 */
export async function checkSlugAvailable(slug: string): Promise<boolean> {
  const [existing] = await db
    .select({ id: agencies.id })
    .from(agencies)
    .where(eq(agencies.slug, slug.toLowerCase()))
    .limit(1);

  return !existing;
}

/**
 * Create a new agency (self-service signup)
 */
export async function createAgency(data: {
  name: string;
  slug: string;
  email: string;
  website?: string;
}) {
  const user = await stackServerApp.getUser();
  if (!user) {
    return { error: "Not authenticated" };
  }

  // Validate slug format
  const slugRegex = /^[a-z0-9][a-z0-9-]*[a-z0-9]$|^[a-z0-9]{1}$/;
  if (!slugRegex.test(data.slug.toLowerCase())) {
    return { error: "Invalid slug format. Use lowercase letters, numbers, and hyphens only." };
  }

  // Check if slug is available
  const available = await checkSlugAvailable(data.slug);
  if (!available) {
    return { error: "This URL slug is already taken" };
  }

  // Reserved slugs
  const reserved = new Set([
    "api", "admin", "agency", "agency-signup", "crm", "settings",
    "auth", "handler", "webhooks", "blog", "pricing", "about",
    "contact", "terms", "privacy", "help", "support"
  ]);
  if (reserved.has(data.slug.toLowerCase())) {
    return { error: "This URL slug is reserved" };
  }

  try {
    // Get or create the database user
    const dbUser = await getOrCreateDbUser(user);

    // Create agency
    const [agency] = await db
      .insert(agencies)
      .values({
        name: data.name,
        slug: data.slug.toLowerCase(),
        email: data.email,
        website: data.website || null,
        subscriptionStatus: "trialing",
      })
      .returning();

    // Add user as agency owner
    await db.insert(agencyMemberships).values({
      agencyId: agency.id,
      userId: user.id,
      role: "owner",
    });

    // Create the agency's own org for their leads (not a client, so agencyId is null)
    const [agencyOrg] = await db
      .insert(orgs)
      .values({
        name: `${data.name}`,
        slug: `agency-${agency.id}-own`,
        // agencyId is null - this is the agency's own org, not a client
      })
      .returning();

    // Create default workspace for agency's leads
    await db.insert(workspaces).values({
      orgId: agencyOrg.id,
      name: "Leads",
      slug: "leads",
    });

    // Add agency owner as org owner (for CRM access)
    await db.insert(memberships).values({
      userId: dbUser.id,
      orgId: agencyOrg.id,
      role: "owner",
    });

    revalidatePath("/agency");
    revalidatePath("/crm");
    return { success: true, agencyId: agency.id, slug: agency.slug };
  } catch (error) {
    console.error("[createAgency] Error:", error);
    return { error: "Failed to create agency. Please try again." };
  }
}

/**
 * Create agency with onboarding in one step (for streamlined signup flow)
 */
export async function createAgencyWithOnboarding(data: {
  name: string;
  slug: string;
  email: string;
  website?: string;
  appName?: string;
  logoUrl?: string;
  primaryColor?: string;
}) {
  const user = await stackServerApp.getUser();
  if (!user) {
    return { error: "Not authenticated" };
  }

  // Validate slug format
  const slugRegex = /^[a-z0-9][a-z0-9-]*[a-z0-9]$|^[a-z0-9]{1}$/;
  if (!slugRegex.test(data.slug.toLowerCase())) {
    return { error: "Invalid slug format. Use lowercase letters, numbers, and hyphens only." };
  }

  // Check if slug is available
  const available = await checkSlugAvailable(data.slug);
  if (!available) {
    return { error: "This URL slug is already taken" };
  }

  // Reserved slugs
  const reserved = new Set([
    "api", "admin", "agency", "agency-signup", "crm", "settings",
    "auth", "handler", "webhooks", "blog", "pricing", "about",
    "contact", "terms", "privacy", "help", "support"
  ]);
  if (reserved.has(data.slug.toLowerCase())) {
    return { error: "This URL slug is reserved" };
  }

  try {
    // Get or create the database user
    const dbUser = await getOrCreateDbUser(user);

    // Create agency with branding and mark onboarding as complete
    // Use default LeadFlow logo if no custom logo is provided
    const [agency] = await db
      .insert(agencies)
      .values({
        name: data.name,
        slug: data.slug.toLowerCase(),
        email: data.email,
        website: data.website || null,
        appName: data.appName || data.name,
        logoUrl: data.logoUrl || DEFAULT_AGENCY_LOGO,
        primaryColor: data.primaryColor || "#8b5cf6",
        subscriptionStatus: "trialing",
        onboardingCompleted: true, // Mark as completed since we're doing it in one step
      })
      .returning();

    // Add user as agency owner
    await db.insert(agencyMemberships).values({
      agencyId: agency.id,
      userId: user.id,
      role: "owner",
    });

    // Create the agency's own org for their leads (not a client, so agencyId is null)
    const [agencyOrg] = await db
      .insert(orgs)
      .values({
        name: `${data.name}`,
        slug: `agency-${agency.id}-own`,
        // agencyId is null - this is the agency's own org, not a client
      })
      .returning();

    // Create default workspace for agency's leads
    await db.insert(workspaces).values({
      orgId: agencyOrg.id,
      name: "Leads",
      slug: "leads",
    });

    // Add agency owner as org owner (for CRM access)
    await db.insert(memberships).values({
      userId: dbUser.id,
      orgId: agencyOrg.id,
      role: "owner",
    });

    revalidatePath("/agency");
    revalidatePath("/crm");
    return { success: true, agencyId: agency.id, slug: agency.slug };
  } catch (error) {
    console.error("[createAgencyWithOnboarding] Error:", error);
    return { error: "Failed to create agency. Please try again." };
  }
}

/**
 * Get agency statistics (for agency dashboard)
 * Requires authenticated agency member
 */
export async function getAgencyStats() {
  const { agency } = await requireAgencyMember();
  const agencyId = agency.id;

  // Count client orgs
  const [clientStats] = await db
    .select({ count: count() })
    .from(orgs)
    .where(eq(orgs.agencyId, agencyId));

  // Count total users across all client orgs
  const userStats = await db.execute<{ count: string }>(sql`
    SELECT COUNT(DISTINCT m.user_id) as count
    FROM memberships m
    JOIN orgs o ON o.id = m.org_id
    WHERE o.agency_id = ${agencyId}
  `);

  // Count leads this month
  const leadStats = await db.execute<{ count: string }>(sql`
    SELECT COUNT(*) as count
    FROM contacts c
    JOIN workspaces w ON w.id = c.workspace_id
    JOIN orgs o ON o.id = w.org_id
    WHERE o.agency_id = ${agencyId}
    AND c.created_at >= date_trunc('month', now())
  `);

  return {
    clientCount: Number(clientStats?.count || 0),
    totalUsers: Number(userStats.rows?.[0]?.count || 0),
    leadsThisMonth: Number(leadStats.rows?.[0]?.count || 0),
  };
}

/**
 * Get client organizations for agency
 */
export async function getAgencyClients() {
  const { agency } = await requireAgencyMember();

  const clients = await db
    .select({
      id: orgs.id,
      name: orgs.name,
      slug: orgs.slug,
      createdAt: orgs.createdAt,
    })
    .from(orgs)
    .where(eq(orgs.agencyId, agency.id))
    .orderBy(orgs.createdAt);

  return clients;
}

/**
 * Update agency branding
 */
export async function updateAgencyBranding(data: {
  appName?: string;
  logoUrl?: string;
  primaryColor?: string;
  secondaryColor?: string;
}) {
  const { agency } = await requireAgencyOwner();

  await db
    .update(agencies)
    .set({
      appName: data.appName,
      logoUrl: data.logoUrl,
      primaryColor: data.primaryColor,
      secondaryColor: data.secondaryColor,
      updatedAt: new Date(),
    })
    .where(eq(agencies.id, agency.id));

  revalidatePath("/agency/branding");
  revalidatePath(`/${agency.slug}`);
  return { success: true };
}

/**
 * Update agency settings
 */
export async function updateAgencySettings(data: {
  name?: string;
  email?: string;
  website?: string;
}) {
  const { agency } = await requireAgencyOwner();

  await db
    .update(agencies)
    .set({
      name: data.name,
      email: data.email,
      website: data.website,
      updatedAt: new Date(),
    })
    .where(eq(agencies.id, agency.id));

  revalidatePath("/agency/settings");
  return { success: true };
}

/**
 * Create a client org for the agency
 */
/**
 * Get current agency branding for client-side use
 */
export async function getAgencyBrandingForClient() {
  const { agency } = await requireAgencyMember();
  return {
    name: agency.name,
    appName: agency.appName,
    logoUrl: agency.logoUrl,
    primaryColor: agency.primaryColor,
    secondaryColor: agency.secondaryColor,
  };
}

/**
 * Get current agency settings for client-side use
 */
export async function getAgencySettingsForClient() {
  const { agency } = await requireAgencyMember();
  return {
    name: agency.name,
    email: agency.email,
    website: agency.website,
    slug: agency.slug,
  };
}

export async function createClientOrg(data: {
  name: string;
}) {
  const { agency } = await requireAgencyAdmin();

  // Check if agency has reached max orgs
  const [count] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(orgs)
    .where(eq(orgs.agencyId, agency.id));

  if (count.count >= (agency.maxOrgs || 10)) {
    return { error: "Maximum client limit reached. Please upgrade your plan." };
  }

  // Generate unique slug from name
  const baseSlug = data.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  let slug = baseSlug;
  let counter = 1;

  // Find unique slug
  while (true) {
    const [existing] = await db
      .select({ id: orgs.id })
      .from(orgs)
      .where(eq(orgs.slug, slug))
      .limit(1);

    if (!existing) break;
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  // Create org
  const [org] = await db
    .insert(orgs)
    .values({
      name: data.name,
      slug,
      agencyId: agency.id,
    })
    .returning();

  revalidatePath("/agency/clients");
  return { success: true, orgId: org.id };
}

/**
 * Delete an agency (only owner can do this)
 * Requires confirmation text: "{agency-name} DELETE"
 */
export async function deleteAgency(confirmText: string): Promise<{
  success: boolean;
  error?: string;
}> {
  try {
    const { agency, role } = await requireAgencyOwner();

    // Verify confirmation text
    const expectedText = `${agency.name} DELETE`;
    if (confirmText !== expectedText) {
      return { success: false, error: "Confirmation text does not match" };
    }

    // Only owner can delete
    if (role !== "owner") {
      return { success: false, error: "Only the owner can delete the agency" };
    }

    // Delete all related data (cascade should handle most, but be explicit)
    // The database has ON DELETE CASCADE, but we'll also clean up manually for safety

    // Get all client orgs for this agency
    const clientOrgs = await db
      .select({ id: orgs.id })
      .from(orgs)
      .where(eq(orgs.agencyId, agency.id));

    // Delete the agency (cascades to memberships, invites, etc.)
    await db.delete(agencies).where(eq(agencies.id, agency.id));

    return { success: true };
  } catch (error) {
    console.error("[deleteAgency] Error:", error);
    return { success: false, error: "Failed to delete agency. Please try again." };
  }
}
