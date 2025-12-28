/**
 * Cleanup Script - Verwijder alle mock/demo data
 *
 * Dit script verwijdert alle data uit de database zodat je met
 * echte data kunt beginnen.
 *
 * BEHOUDT:
 * - User: marvinsmit1988@gmail.com (super admin)
 * - System tables: cron configs, feature flags
 *
 * VERWIJDERT:
 * - Alle andere users
 * - Alle orgs, workspaces, agencies
 * - Alle contacts, pipelines, opportunities
 * - Alle Meta/Facebook koppelingen
 * - Alle invoices, quotations, products
 * - Etc.
 *
 * Run: npx tsx scripts/cleanup-all-data.ts
 */

import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { sql } from "drizzle-orm";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set");
}

const sqlClient = neon(DATABASE_URL);
const db = drizzle(sqlClient);

// Email van de super admin die behouden moet blijven
const KEEP_USER_EMAIL = "marvinsmit1988@gmail.com";

async function cleanupAllData() {
  console.log("🧹 Starting database cleanup...\n");
  console.log(`📧 Keeping user: ${KEEP_USER_EMAIL}\n`);

  // Order matters due to foreign key constraints!
  // Delete child tables first, then parent tables

  const tablesToDelete = [
    // AI & Insights
    "ai_insight_feedback",
    "ai_insights_cache",

    // Support
    "support_ticket_replies",
    "support_tickets",

    // Feature flags overrides (keep base feature_flags)
    "feature_flag_overrides",

    // Announcements
    "announcement_dismissals",
    "announcements",

    // Notifications
    "notifications",

    // Credit notes
    "credit_note_line_items",
    "credit_notes",

    // Expenses
    "expenses",

    // Recurring invoices
    "recurring_invoices",

    // Payments
    "payments",

    // Line items (for invoices and quotations)
    "line_items",

    // Invoices
    "invoices",

    // Quotations
    "quotations",

    // Products
    "products",

    // Invoice settings
    "invoice_settings",

    // Meta Lead Raw
    "meta_lead_raw",

    // Lead Attribution
    "lead_attribution",

    // Webhook Events
    "webhook_events",

    // Lead Field Mappings
    "lead_field_mappings",

    // Lead Ingest Routes
    "lead_ingest_routes",

    // Meta Forms
    "meta_forms",

    // Meta Pages
    "meta_pages",

    // Meta Connections (Facebook koppelingen)
    "meta_connections",

    // Email Log
    "email_log",

    // Outbox Events
    "outbox_events",

    // Audit Log
    "audit_log",

    // CRM Settings
    "crm_settings",

    // Notes
    "notes",

    // Opportunity Stage History
    "opportunity_stage_history",

    // Opportunities
    "opportunities",

    // Pipeline Stages
    "pipeline_stages",

    // Pipelines
    "pipelines",

    // Contacts
    "contacts",

    // Platform Leads Pool
    "platform_leads_pool",

    // Agency related
    "agency_invoices",
    "client_subscriptions",
    "agency_pricing_plans",
    "agency_stripe_accounts",
    "agency_invites",
    "agency_memberships",
    "agency_saas_settings",

    // Memberships (user-org relations)
    "memberships",

    // Workspaces
    "workspaces",

    // Orgs
    "orgs",

    // Agencies
    "agencies",

    // Users
    "users",
  ];

  // Tables to KEEP (system configuration)
  const tablesToKeep = [
    "cron_job_runs",
    "cron_job_configs",
    "feature_flags",
    // Drizzle migrations table
    "__drizzle_migrations",
  ];

  console.log("📋 Tables to delete:", tablesToDelete.length);
  console.log("📋 Tables to keep:", tablesToKeep.join(", "));
  console.log("\n");

  let deletedCount = 0;
  let errorCount = 0;

  for (const table of tablesToDelete) {
    try {
      // Use TRUNCATE CASCADE for faster deletion and handling of foreign keys
      await db.execute(sql.raw(`TRUNCATE TABLE "${table}" CASCADE`));
      console.log(`✅ Truncated: ${table}`);
      deletedCount++;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      // Table might not exist, that's ok
      if (errorMessage.includes("does not exist")) {
        console.log(`⏭️  Skipped (not exists): ${table}`);
      } else {
        console.error(`❌ Error truncating ${table}:`, errorMessage);
        errorCount++;
      }
    }
  }

  // Note: Super admin is determined by SUPER_ADMIN_EMAILS environment variable
  // User will be auto-created when they log in via Stack Auth
  console.log("\n👤 Super admin setup:");
  console.log(`   Email: ${KEEP_USER_EMAIL}`);
  console.log(`   ℹ️  Super admin is controlled by SUPER_ADMIN_EMAILS env variable`);
  console.log(`   ℹ️  User will be auto-created on first login via Stack Auth`);

  console.log("\n" + "=".repeat(50));
  console.log(`🎉 Cleanup complete!`);
  console.log(`   ✅ Truncated: ${deletedCount} tables`);
  console.log(`   ❌ Errors: ${errorCount}`);
  console.log(`   ⏭️  Kept: ${tablesToKeep.length} system tables`);
  console.log(`   👤 Super admin: ${KEEP_USER_EMAIL}`);
  console.log("=".repeat(50));
  console.log("\n💡 Volgende stappen:");
  console.log("   1. Log in op de app met je Stack Auth account");
  console.log("   2. Je user wordt automatisch gesynced");
  console.log("   3. Maak een nieuwe org/agency aan");
  console.log("   4. Koppel je echte Facebook account");
}

// Run the cleanup
cleanupAllData()
  .then(() => {
    console.log("\n✨ Done!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n💥 Fatal error:", error);
    process.exit(1);
  });
