import "server-only";

import { db } from "@/lib/db";
import { agencies } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { cache } from "react";

// Default LeadFlow logo for agencies that don't have their own
export const DEFAULT_AGENCY_LOGO = "/logo/wetryleadflow-logo-trans-bg.webp";

/**
 * Get agency by slug (cached for the request)
 */
export const getAgencyBySlug = cache(async (slug: string) => {
  const [agency] = await db
    .select({
      id: agencies.id,
      slug: agencies.slug,
      name: agencies.name,
      appName: agencies.appName,
      logoUrl: agencies.logoUrl,
      primaryColor: agencies.primaryColor,
      secondaryColor: agencies.secondaryColor,
    })
    .from(agencies)
    .where(and(eq(agencies.slug, slug), eq(agencies.isActive, true)))
    .limit(1);

  return agency || null;
});

/**
 * Get agency by ID (cached for the request)
 */
export const getAgencyById = cache(async (id: number) => {
  const [agency] = await db
    .select({
      id: agencies.id,
      slug: agencies.slug,
      name: agencies.name,
      appName: agencies.appName,
      logoUrl: agencies.logoUrl,
      primaryColor: agencies.primaryColor,
      secondaryColor: agencies.secondaryColor,
      email: agencies.email,
      website: agencies.website,
      maxOrgs: agencies.maxOrgs,
      subscriptionStatus: agencies.subscriptionStatus,
      isActive: agencies.isActive,
      createdAt: agencies.createdAt,
    })
    .from(agencies)
    .where(eq(agencies.id, id))
    .limit(1);

  return agency || null;
});

/**
 * Check if a slug is available (not taken by another agency)
 */
export async function isSlugAvailable(slug: string): Promise<boolean> {
  const [existing] = await db
    .select({ id: agencies.id })
    .from(agencies)
    .where(eq(agencies.slug, slug.toLowerCase()))
    .limit(1);

  return !existing;
}
