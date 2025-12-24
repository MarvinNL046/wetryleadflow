/**
 * AI Insights Module
 *
 * Provides AI-powered sales intelligence for the CRM dashboard.
 * Uses the OpenAI Agents SDK with GPT-5 mini for cost-effective insights.
 */

// Client and configuration
export { isAIConfigured, requireAIConfig } from "./client";
export { AI_CONFIG, CACHE_TTL, canUseAIInsights, agencyCanUseAIInsights, getInsightLanguage } from "./config";
export type { InsightType, InsightLanguage, SubscriptionTier, AgencyTier } from "./config";

// Cache utilities
export { getCachedInsight, cacheInsight, isGenerating } from "./cache";

// Agents
export { getLeadPriorityInsight } from "./agents/lead-priority";

// Types
export type { LeadPriorityInsight, PriorityLead, WarningLead } from "./agents/lead-priority";
