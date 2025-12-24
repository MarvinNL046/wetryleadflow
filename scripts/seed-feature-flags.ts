import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";

// Load environment variables
config({ path: ".env.local" });

const featureFlags = [
  {
    key: "ai_lead_scoring",
    name: "AI Lead Scoring",
    description: "Automatische lead scoring op basis van engagement en profiel data",
    type: "tier_based",
    default_enabled: false,
    enabled_tiers: JSON.stringify(["unlimited", "saas_pro"]),
    is_beta: true,
    is_active: true,
  },
  {
    key: "whatsapp_integration",
    name: "WhatsApp Integratie",
    description: "Directe WhatsApp berichten versturen vanuit het CRM",
    type: "boolean",
    default_enabled: false,
    is_beta: true,
    is_active: true,
  },
  {
    key: "advanced_reporting",
    name: "Uitgebreide Rapportages",
    description: "Geavanceerde analytics en custom dashboards",
    type: "tier_based",
    default_enabled: false,
    enabled_tiers: JSON.stringify(["saas_pro"]),
    is_beta: false,
    is_active: true,
  },
  {
    key: "email_sequences",
    name: "Email Sequences",
    description: "Geautomatiseerde email follow-up sequences",
    type: "percentage",
    default_enabled: false,
    rollout_percentage: 25,
    is_beta: true,
    is_active: true,
  },
  {
    key: "dark_mode",
    name: "Donker Thema",
    description: "Donkere modus voor het CRM interface",
    type: "boolean",
    default_enabled: true,
    is_beta: false,
    is_active: true,
  },
];

async function main() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL not found in environment");
  }

  const sql = neon(databaseUrl);

  console.log("Seeding feature flags...");

  for (const flag of featureFlags) {
    try {
      await sql.query(
        `INSERT INTO feature_flags (key, name, description, type, default_enabled, rollout_percentage, enabled_tiers, is_beta, is_active, created_at, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW(), NOW())
         ON CONFLICT (key) DO NOTHING`,
        [
          flag.key,
          flag.name,
          flag.description,
          flag.type,
          flag.default_enabled,
          flag.rollout_percentage ?? 0,
          flag.enabled_tiers ?? null,
          flag.is_beta,
          flag.is_active,
        ],
        {}
      );
      console.log(`✅ ${flag.name}`);
    } catch (error: unknown) {
      const err = error as { message?: string };
      console.error(`❌ ${flag.name}: ${err.message}`);
    }
  }

  console.log("\n✅ Feature flags seeded!");
}

main().catch(console.error);
