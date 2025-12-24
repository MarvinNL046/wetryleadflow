import { config } from "dotenv";
config({ path: ".env.local" });

import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

async function createReliabilityTables() {
  console.log("Creating reliability tables for production...\n");

  // Create webhook_events table
  console.log("1. Creating webhook_events table...");
  await sql`
    CREATE TABLE IF NOT EXISTS "webhook_events" (
      "id" serial PRIMARY KEY NOT NULL,
      "provider" varchar(50) NOT NULL,
      "external_event_id" varchar(255) NOT NULL,
      "event_type" varchar(100),
      "payload" jsonb NOT NULL,
      "status" varchar(20) NOT NULL DEFAULT 'pending',
      "error_message" text,
      "retry_count" integer NOT NULL DEFAULT 0,
      "processed_at" timestamp,
      "created_at" timestamp DEFAULT now() NOT NULL,
      CONSTRAINT "webhook_events_provider_event_unique" UNIQUE ("provider", "external_event_id")
    )
  `;
  await sql`CREATE INDEX IF NOT EXISTS "webhook_events_provider_idx" ON "webhook_events" ("provider")`;
  await sql`CREATE INDEX IF NOT EXISTS "webhook_events_status_idx" ON "webhook_events" ("status")`;
  await sql`CREATE INDEX IF NOT EXISTS "webhook_events_created_idx" ON "webhook_events" ("created_at")`;
  console.log("   ✅ webhook_events created");

  // Create meta_lead_raw table
  console.log("2. Creating meta_lead_raw table...");
  await sql`
    CREATE TABLE IF NOT EXISTS "meta_lead_raw" (
      "id" serial PRIMARY KEY NOT NULL,
      "org_id" integer NOT NULL REFERENCES "orgs"("id") ON DELETE CASCADE,
      "leadgen_id" varchar(100) NOT NULL UNIQUE,
      "page_id" varchar(100) NOT NULL,
      "form_id" varchar(100),
      "ad_id" varchar(100),
      "adgroup_id" varchar(100),
      "campaign_id" varchar(100),
      "payload" jsonb NOT NULL,
      "field_data" jsonb,
      "status" varchar(20) NOT NULL DEFAULT 'pending',
      "contact_id" integer REFERENCES "contacts"("id") ON DELETE SET NULL,
      "error_message" text,
      "retry_count" integer NOT NULL DEFAULT 0,
      "fetched_at" timestamp DEFAULT now() NOT NULL,
      "processed_at" timestamp,
      "created_at" timestamp DEFAULT now() NOT NULL
    )
  `;
  await sql`CREATE INDEX IF NOT EXISTS "meta_lead_raw_org_idx" ON "meta_lead_raw" ("org_id")`;
  await sql`CREATE INDEX IF NOT EXISTS "meta_lead_raw_status_idx" ON "meta_lead_raw" ("status")`;
  await sql`CREATE INDEX IF NOT EXISTS "meta_lead_raw_page_idx" ON "meta_lead_raw" ("page_id")`;
  await sql`CREATE INDEX IF NOT EXISTS "meta_lead_raw_created_idx" ON "meta_lead_raw" ("created_at")`;
  console.log("   ✅ meta_lead_raw created");

  // Create webhook processing status enum if not exists
  console.log("3. Creating processing_status enum...");
  try {
    await sql`CREATE TYPE "processing_status" AS ENUM ('pending', 'processing', 'completed', 'failed', 'skipped')`;
    console.log("   ✅ processing_status enum created");
  } catch (e: any) {
    if (e.message?.includes("already exists")) {
      console.log("   ℹ️ processing_status enum already exists");
    } else {
      throw e;
    }
  }

  console.log("\n✅ All reliability tables created!");
}

createReliabilityTables().catch(console.error);
