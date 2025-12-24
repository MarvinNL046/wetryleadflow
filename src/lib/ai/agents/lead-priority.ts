import { Agent, run } from "@openai/agents";
import { z } from "zod";
import { db } from "@/lib/db";
import { contacts, opportunities, pipelineStages, leadAttribution } from "@/lib/db/schema";
import { eq, desc, sql } from "drizzle-orm";
import { AI_CONFIG, getInsightLanguage, type InsightLanguage } from "../config";
import { getCachedInsight, cacheInsight, markCacheGenerating, markCacheError, isGenerating } from "../cache";
import { requireAIConfig } from "../client";

/**
 * Lead Priority Agent
 *
 * An AI agent that analyzes leads and provides prioritization recommendations.
 * Uses the OpenAI Agents SDK with structured outputs for type-safe responses.
 */

// Zod schema for the agent's structured output
const LeadPriorityOutputSchema = z.object({
  priorityLeads: z.array(z.object({
    leadId: z.number(),
    priorityRank: z.number().min(1).max(10),
    urgency: z.enum(["critical", "high", "medium", "low"]),
    reason: z.string(),
    recommendedAction: z.string(),
    estimatedValue: z.number().optional(),
  })).max(10),
  warningLeads: z.array(z.object({
    leadId: z.number(),
    warning: z.string(),
    daysInactive: z.number().optional(),
  })).max(5),
  insightsSummary: z.string(),
});

// TypeScript types
export interface PriorityLead {
  leadId: number;
  priorityRank: number;
  urgency: "critical" | "high" | "medium" | "low";
  reason: string;
  recommendedAction: string;
  estimatedValue?: number;
}

export interface WarningLead {
  leadId: number;
  warning: string;
  daysInactive?: number;
}

export interface LeadPriorityInsight {
  priorityLeads: PriorityLead[];
  warningLeads: WarningLead[];
  insightsSummary: string;
  generatedAt: string;
  dataPoints: number;
}

// Input data structure
interface LeadData {
  id: number;
  name: string;
  email: string | null;
  phone: string | null;
  source: string | null;
  status: string;
  callCount: number;
  lastCallResult: string | null;
  daysSinceCreated: number;
  daysSinceLastContact: number | null;
  opportunityValue: number | null;
  opportunityStage: string | null;
  hasFollowUp: boolean;
  followUpOverdue: boolean;
}

interface WorkspaceStats {
  totalLeads: number;
  leadsThisWeek: number;
  avgDealValue: number | null;
  topSource: string | null;
}

// Instructions for the agent
const INSTRUCTIONS_NL = `Je bent een ervaren sales advisor die helpt met het prioriteren van leads.

Analyseer de leads en geef concrete, actiegerichte aanbevelingen.

Prioriteringscriteria (in volgorde van belangrijkheid):
1. Leads met hoge opportunity waarde
2. Leads die lang wachten op contact (dreigen koud te worden)
3. Leads met achterstallige follow-ups
4. Recent binnengekomen leads (hot leads)
5. Leads van goed presterende bronnen

Wees specifiek in je aanbevelingen:
- Gebruik concrete tijden ("bel voor 14:00")
- Geef specifieke acties ("verstuur offerte", "plan demo")
- Leg kort uit waarom deze lead prioriteit heeft

Let op leads die dreigen verloren te gaan en geef waarschuwingen.`;

const INSTRUCTIONS_EN = `You are an experienced sales advisor helping to prioritize leads.

Analyze the leads and provide concrete, action-oriented recommendations.

Prioritization criteria (in order of importance):
1. Leads with high opportunity value
2. Leads waiting long for contact (risk of going cold)
3. Leads with overdue follow-ups
4. Recently incoming leads (hot leads)
5. Leads from high-performing sources

Be specific in your recommendations:
- Use concrete times ("call before 2 PM")
- Give specific actions ("send quote", "schedule demo")
- Briefly explain why this lead has priority

Watch for leads at risk of being lost and provide warnings.`;

/**
 * Create the Lead Priority Agent
 */
function createLeadPriorityAgent(language: InsightLanguage) {
  return new Agent({
    name: "LeadPriorityAgent",
    instructions: language === "nl" ? INSTRUCTIONS_NL : INSTRUCTIONS_EN,
    model: AI_CONFIG.model,
    outputType: LeadPriorityOutputSchema,
  });
}

/**
 * Format lead data for the agent prompt
 */
function formatLeadsForPrompt(leads: LeadData[], stats: WorkspaceStats, language: InsightLanguage): string {
  const statsHeader = language === "nl"
    ? `WORKSPACE STATISTIEKEN:
- Totaal leads: ${stats.totalLeads}
- Leads deze week: ${stats.leadsThisWeek}
- Gemiddelde dealwaarde: ${stats.avgDealValue ? `€${stats.avgDealValue.toLocaleString()}` : "onbekend"}
- Beste bron: ${stats.topSource || "onbekend"}`
    : `WORKSPACE STATISTICS:
- Total leads: ${stats.totalLeads}
- Leads this week: ${stats.leadsThisWeek}
- Average deal value: ${stats.avgDealValue ? `€${stats.avgDealValue.toLocaleString()}` : "unknown"}
- Top source: ${stats.topSource || "unknown"}`;

  const leadsHeader = language === "nl"
    ? `\n\nLEADS OM TE ANALYSEREN (${leads.length} leads):`
    : `\n\nLEADS TO ANALYZE (${leads.length} leads):`;

  const leadsData = leads.map((lead) => {
    const parts = [
      `ID: ${lead.id}`,
      `Naam: ${lead.name}`,
      `Status: ${lead.status}`,
      `Bron: ${lead.source || "onbekend"}`,
      `Dagen sinds aanmaak: ${lead.daysSinceCreated}`,
    ];

    if (lead.opportunityValue) {
      parts.push(`Waarde: €${lead.opportunityValue.toLocaleString()}`);
    }
    if (lead.opportunityStage) {
      parts.push(`Stage: ${lead.opportunityStage}`);
    }
    if (lead.callCount > 0) {
      parts.push(`Gesprekken: ${lead.callCount}`);
      if (lead.lastCallResult) {
        parts.push(`Laatste resultaat: ${lead.lastCallResult}`);
      }
    }
    if (lead.daysSinceLastContact !== null) {
      parts.push(`Dagen sinds contact: ${lead.daysSinceLastContact}`);
    }
    if (lead.hasFollowUp) {
      parts.push(`Follow-up: ${lead.followUpOverdue ? "ACHTERSTALLIG" : "gepland"}`);
    }

    return parts.join(" | ");
  }).join("\n");

  const instruction = language === "nl"
    ? `\n\nAnalyseer deze leads en geef een prioriteitenlijst.`
    : `\n\nAnalyze these leads and provide a priority list.`;

  return statsHeader + leadsHeader + "\n" + leadsData + instruction;
}

/**
 * Build lead context from database
 */
async function buildLeadContext(workspaceId: number): Promise<{ leads: LeadData[]; stats: WorkspaceStats }> {
  const now = new Date();

  // Fetch contacts with their opportunities and attribution
  const contactsWithData = await db
    .select({
      id: contacts.id,
      firstName: contacts.firstName,
      lastName: contacts.lastName,
      email: contacts.email,
      phone: contacts.phone,
      callCount: contacts.callCount,
      lastCallAt: contacts.lastCallAt,
      lastCallResult: contacts.lastCallResult,
      nextFollowUpAt: contacts.nextFollowUpAt,
      createdAt: contacts.createdAt,
      opportunityValue: opportunities.value,
      stageName: pipelineStages.name,
      source: leadAttribution.source,
    })
    .from(contacts)
    .leftJoin(opportunities, eq(opportunities.contactId, contacts.id))
    .leftJoin(pipelineStages, eq(opportunities.stageId, pipelineStages.id))
    .leftJoin(leadAttribution, eq(leadAttribution.contactId, contacts.id))
    .where(eq(contacts.workspaceId, workspaceId))
    .orderBy(desc(contacts.createdAt))
    .limit(100);

  const leads: LeadData[] = contactsWithData.map((c) => {
    const daysSinceCreated = Math.floor(
      (now.getTime() - c.createdAt.getTime()) / (1000 * 60 * 60 * 24)
    );
    const daysSinceLastContact = c.lastCallAt
      ? Math.floor((now.getTime() - c.lastCallAt.getTime()) / (1000 * 60 * 60 * 24))
      : null;

    const hasFollowUp = !!c.nextFollowUpAt;
    const followUpOverdue = hasFollowUp && c.nextFollowUpAt! < now;

    return {
      id: c.id,
      name: [c.firstName, c.lastName].filter(Boolean).join(" ") || "Onbekend",
      email: c.email,
      phone: c.phone,
      source: c.source,
      status: c.stageName || "new",
      callCount: c.callCount,
      lastCallResult: c.lastCallResult,
      daysSinceCreated,
      daysSinceLastContact,
      opportunityValue: c.opportunityValue ? parseFloat(c.opportunityValue) : null,
      opportunityStage: c.stageName,
      hasFollowUp,
      followUpOverdue,
    };
  });

  // Get workspace statistics
  const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  const [statsResult] = await db
    .select({
      totalLeads: sql<number>`count(distinct ${contacts.id})`,
      leadsThisWeek: sql<number>`count(distinct case when ${contacts.createdAt} > ${oneWeekAgo} then ${contacts.id} end)`,
      avgDealValue: sql<number>`avg(${opportunities.value}::numeric)`,
    })
    .from(contacts)
    .leftJoin(opportunities, eq(opportunities.contactId, contacts.id))
    .where(eq(contacts.workspaceId, workspaceId));

  const [topSourceResult] = await db
    .select({
      source: leadAttribution.source,
    })
    .from(leadAttribution)
    .innerJoin(contacts, eq(contacts.id, leadAttribution.contactId))
    .where(eq(contacts.workspaceId, workspaceId))
    .groupBy(leadAttribution.source)
    .orderBy(desc(sql`count(*)`))
    .limit(1);

  return {
    leads,
    stats: {
      totalLeads: Number(statsResult?.totalLeads ?? 0),
      leadsThisWeek: Number(statsResult?.leadsThisWeek ?? 0),
      avgDealValue: statsResult?.avgDealValue ? Number(statsResult.avgDealValue) : null,
      topSource: topSourceResult?.source || null,
    },
  };
}

/**
 * Get lead priority insight for a workspace.
 * Uses caching to avoid unnecessary API calls.
 */
export async function getLeadPriorityInsight(
  workspaceId: number,
  options: {
    forceRefresh?: boolean;
    locale?: string | null;
  } = {}
): Promise<{
  insight: LeadPriorityInsight | null;
  cached: boolean;
  generating: boolean;
  error?: string;
}> {
  const { forceRefresh = false, locale } = options;

  // Check if currently generating
  if (await isGenerating(workspaceId, "lead_priority")) {
    return { insight: null, cached: false, generating: true };
  }

  // Check cache (unless force refresh)
  if (!forceRefresh) {
    const cached = await getCachedInsight<LeadPriorityInsight>(workspaceId, "lead_priority");
    if (cached) {
      return { insight: cached.data, cached: true, generating: false };
    }
  }

  // Generate new insight
  try {
    // Validate API configuration
    requireAIConfig();

    // Mark as generating to prevent duplicate requests
    await markCacheGenerating(workspaceId, "lead_priority");

    const language = getInsightLanguage(locale);
    const { leads, stats } = await buildLeadContext(workspaceId);

    // If no leads, return empty insight
    if (leads.length === 0) {
      const emptyInsight: LeadPriorityInsight = {
        priorityLeads: [],
        warningLeads: [],
        insightsSummary: language === "nl"
          ? "Geen actieve leads gevonden om te analyseren."
          : "No active leads found to analyze.",
        generatedAt: new Date().toISOString(),
        dataPoints: 0,
      };
      await cacheInsight(workspaceId, "lead_priority", emptyInsight);
      return { insight: emptyInsight, cached: false, generating: false };
    }

    // Create and run the agent
    const agent = createLeadPriorityAgent(language);
    const prompt = formatLeadsForPrompt(leads, stats, language);

    const result = await run(agent, prompt);

    // Parse the structured output
    const parsed = LeadPriorityOutputSchema.parse(result.finalOutput);

    // Build the full insight with metadata
    const insight: LeadPriorityInsight = {
      priorityLeads: parsed.priorityLeads,
      warningLeads: parsed.warningLeads,
      insightsSummary: parsed.insightsSummary,
      generatedAt: new Date().toISOString(),
      dataPoints: leads.length,
    };

    await cacheInsight(workspaceId, "lead_priority", insight);

    return { insight, cached: false, generating: false };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    await markCacheError(workspaceId, "lead_priority", errorMessage);
    console.error("[AI Lead Priority] Generation error:", error);
    return { insight: null, cached: false, generating: false, error: errorMessage };
  }
}
