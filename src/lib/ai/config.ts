/**
 * AI Insights Configuration
 *
 * Contains all configuration for AI-powered insights including
 * model settings, cache TTLs, and feature availability rules.
 */

// Model configuration for OpenAI Agents SDK
// Balans tussen kwaliteit en kosten - GEEN GPT-5 (te duur)
export const AI_CONFIG = {
  // Default: GPT-4o-mini - uitstekende kwaliteit voor de prijs
  // Goed voor lead prioritering en dagelijkse analyses
  model: "gpt-4o-mini" as const,

  // Premium: GPT-5 mini voor complexere analyses waar kwaliteit cruciaal is
  // Gebruik voor pipeline health en performance insights
  modelPremium: "gpt-5-mini" as const,

  // Budget: GPT-5 nano voor simpele taken en hoge volumes
  modelBudget: "gpt-5-nano" as const,
};

// Cache TTL in hours for each insight type
export const CACHE_TTL = {
  lead_priority: 2,      // Leads change often, refresh every 2 hours
  pipeline_health: 6,    // Pipeline analysis, less urgent
  next_actions: 4,       // Daily actions, moderate refresh
  performance: 12,       // Historical data, slower to change
} as const;

// Get cache TTL in milliseconds
export function getCacheTTLMs(insightType: keyof typeof CACHE_TTL): number {
  return CACHE_TTL[insightType] * 60 * 60 * 1000;
}

// Tier-based feature availability
// User tiers: free, pro, enterprise
export type SubscriptionTier = "free" | "pro" | "enterprise";
// Agency tiers: starter, unlimited, saas_pro
export type AgencyTier = "starter" | "unlimited" | "saas_pro";

/**
 * Check if a subscription tier has access to AI insights.
 * Only Pro and Enterprise tiers have access.
 */
export function canUseAIInsights(tier: SubscriptionTier): boolean {
  return tier === "pro" || tier === "enterprise";
}

/**
 * Check if an agency tier has access to AI insights for clients.
 * Unlimited and SaaS Pro tiers have access.
 */
export function agencyCanUseAIInsights(agencyTier: AgencyTier): boolean {
  return agencyTier === "unlimited" || agencyTier === "saas_pro";
}

// Supported languages for AI insights
export type InsightLanguage = "nl" | "en";

/**
 * Detect language from locale string.
 * Defaults to Dutch for Dutch locales, English otherwise.
 */
export function getInsightLanguage(locale?: string | null): InsightLanguage {
  if (!locale) return "nl"; // Default to Dutch for this Dutch product
  return locale.startsWith("nl") ? "nl" : "en";
}

// Insight type enum matching database
export type InsightType = "lead_priority" | "pipeline_health" | "next_actions" | "performance";

// Cost estimation (for monitoring) - GPT-4o pricing
export const COST_ESTIMATES = {
  lead_priority: 0.02,    // ~$0.02 per generation
  pipeline_health: 0.03,  // ~$0.03 per generation
  next_actions: 0.02,     // ~$0.02 per generation
  performance: 0.04,      // ~$0.04 per generation
} as const;
