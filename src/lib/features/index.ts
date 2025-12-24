"use server";

import { db } from "@/lib/db";
import { featureFlags, featureFlagOverrides } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";

interface FeatureFlagContext {
  orgId?: number;
  agencyId?: number;
  tier?: string;
  userId?: string;
}

/**
 * Check if a feature flag is enabled for a given context
 */
export async function isFeatureEnabled(
  key: string,
  context: FeatureFlagContext = {}
): Promise<boolean> {
  // Find the feature flag by key
  const flag = await db.query.featureFlags.findFirst({
    where: eq(featureFlags.key, key),
  });

  // If flag doesn't exist or is not active, return false
  if (!flag || !flag.isActive) {
    return false;
  }

  // Check for specific overrides first (most specific wins)
  if (context.orgId) {
    const orgOverride = await db.query.featureFlagOverrides.findFirst({
      where: and(
        eq(featureFlagOverrides.featureFlagId, flag.id),
        eq(featureFlagOverrides.orgId, context.orgId)
      ),
    });

    if (orgOverride) {
      return orgOverride.enabled;
    }
  }

  if (context.agencyId) {
    const agencyOverride = await db.query.featureFlagOverrides.findFirst({
      where: and(
        eq(featureFlagOverrides.featureFlagId, flag.id),
        eq(featureFlagOverrides.agencyId, context.agencyId)
      ),
    });

    if (agencyOverride) {
      return agencyOverride.enabled;
    }
  }

  // Handle different flag types
  switch (flag.type) {
    case "boolean":
      return flag.defaultEnabled ?? false;

    case "percentage":
      // Use a deterministic hash based on userId or a random number
      if (context.userId) {
        const hash = simpleHash(context.userId + key);
        return (hash % 100) < (flag.rolloutPercentage ?? 0);
      }
      // Without userId, use random (not recommended for production)
      return Math.random() * 100 < (flag.rolloutPercentage ?? 0);

    case "tier_based":
      if (!context.tier || !flag.enabledTiers) {
        return flag.defaultEnabled ?? false;
      }
      const enabledTiers = flag.enabledTiers as string[];
      return enabledTiers.includes(context.tier);

    default:
      return flag.defaultEnabled ?? false;
  }
}

/**
 * Get all enabled features for a context
 */
export async function getEnabledFeatures(
  context: FeatureFlagContext = {}
): Promise<string[]> {
  const allFlags = await db.query.featureFlags.findMany({
    where: eq(featureFlags.isActive, true),
  });

  const enabledKeys: string[] = [];

  for (const flag of allFlags) {
    const isEnabled = await isFeatureEnabled(flag.key, context);
    if (isEnabled) {
      enabledKeys.push(flag.key);
    }
  }

  return enabledKeys;
}

/**
 * Simple hash function for percentage-based feature flags
 */
function simpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

/**
 * Get a feature flag by key (for debugging)
 */
export async function getFeatureFlag(key: string) {
  const flag = await db.query.featureFlags.findFirst({
    where: eq(featureFlags.key, key),
  });

  if (!flag) return null;

  const overrides = await db.query.featureFlagOverrides.findMany({
    where: eq(featureFlagOverrides.featureFlagId, flag.id),
  });

  return {
    ...flag,
    overrides,
  };
}
