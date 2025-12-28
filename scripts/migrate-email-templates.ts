import { neon } from "@neondatabase/serverless";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL!);

async function migrate() {
  console.log("Creating email_template_type enum...");
  try {
    await sql`
      CREATE TYPE "email_template_type" AS ENUM (
        'lead_notification',
        'follow_up',
        'quote_sent',
        'invoice_sent',
        'payment_reminder',
        'welcome',
        'custom'
      )
    `;
    console.log("✓ Enum created");
  } catch (e: unknown) {
    const error = e as { code?: string };
    if (error.code === "42710") {
      console.log("✓ Enum already exists");
    } else {
      throw e;
    }
  }

  console.log("Creating email_templates table...");
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS "email_templates" (
        "id" serial PRIMARY KEY NOT NULL,
        "workspace_id" integer NOT NULL REFERENCES "workspaces"("id") ON DELETE CASCADE,
        "name" varchar(100) NOT NULL,
        "type" "email_template_type" DEFAULT 'custom' NOT NULL,
        "subject" varchar(500) NOT NULL,
        "body_html" text NOT NULL,
        "body_text" text,
        "variables" jsonb DEFAULT '[]'::jsonb,
        "is_active" boolean DEFAULT true NOT NULL,
        "is_default" boolean DEFAULT false NOT NULL,
        "created_by_id" integer REFERENCES "users"("id") ON DELETE SET NULL,
        "last_used_at" timestamp,
        "usage_count" integer DEFAULT 0 NOT NULL,
        "created_at" timestamp DEFAULT now() NOT NULL,
        "updated_at" timestamp DEFAULT now() NOT NULL
      )
    `;
    console.log("✓ Table created");
  } catch (e) {
    console.error("Error creating table:", e);
    throw e;
  }

  console.log("Creating indexes...");
  await sql`CREATE INDEX IF NOT EXISTS "email_template_workspace_idx" ON "email_templates" ("workspace_id")`;
  await sql`CREATE INDEX IF NOT EXISTS "email_template_type_idx" ON "email_templates" ("type")`;
  await sql`CREATE INDEX IF NOT EXISTS "email_template_active_idx" ON "email_templates" ("is_active")`;

  try {
    await sql`CREATE UNIQUE INDEX IF NOT EXISTS "email_template_workspace_name_idx" ON "email_templates" ("workspace_id", "name")`;
  } catch (e: unknown) {
    const error = e as { code?: string };
    if (error.code === "42P07") {
      console.log("✓ Unique index already exists");
    } else {
      throw e;
    }
  }

  console.log("✓ Indexes created");
  console.log("\n✅ Migration complete!");
}

migrate().catch(console.error);
