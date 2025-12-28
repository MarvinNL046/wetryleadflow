import { neon } from "@neondatabase/serverless";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL!);

async function createEnum(name: string, values: string[]) {
  try {
    const valuesStr = values.map(v => `'${v}'`).join(", ");
    await sql.unsafe(`CREATE TYPE "public"."${name}" AS ENUM (${valuesStr})`);
    console.log(`✓ Enum ${name} created`);
  } catch (e: unknown) {
    const error = e as { code?: string };
    if (error.code === "42710") {
      console.log(`✓ Enum ${name} already exists`);
    } else {
      throw e;
    }
  }
}

async function migrate() {
  // Email Templates
  console.log("\n=== Email Templates ===");

  await createEnum("email_template_type", [
    "lead_notification",
    "follow_up",
    "quote_sent",
    "invoice_sent",
    "payment_reminder",
    "welcome",
    "custom"
  ]);

  console.log("Creating email_templates table...");
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

  await sql`CREATE INDEX IF NOT EXISTS "email_template_workspace_idx" ON "email_templates" ("workspace_id")`;
  await sql`CREATE INDEX IF NOT EXISTS "email_template_type_idx" ON "email_templates" ("type")`;
  await sql`CREATE INDEX IF NOT EXISTS "email_template_active_idx" ON "email_templates" ("is_active")`;

  try {
    await sql`CREATE UNIQUE INDEX IF NOT EXISTS "email_template_workspace_name_idx" ON "email_templates" ("workspace_id", "name")`;
  } catch (e: unknown) {
    const error = e as { code?: string };
    if (error.code === "42P07") {
      console.log("✓ Unique index already exists");
    }
  }
  console.log("✓ Indexes created");

  // Notification Preferences
  console.log("\n=== Notification Preferences ===");

  await createEnum("notification_event", [
    "new_lead",
    "lead_assigned",
    "follow_up_reminder",
    "lead_lost",
    "invoice_sent",
    "invoice_reminder",
    "quote_sent",
    "team_invite",
    "welcome"
  ]);

  await createEnum("notification_mode", [
    "disabled",
    "system_default",
    "custom_template"
  ]);

  console.log("Creating notification_preferences table...");
  await sql.unsafe(`
    CREATE TABLE IF NOT EXISTS "notification_preferences" (
      "id" serial PRIMARY KEY NOT NULL,
      "workspace_id" integer NOT NULL REFERENCES "workspaces"("id") ON DELETE CASCADE,
      "event_type" "public"."notification_event" NOT NULL,
      "mode" "public"."notification_mode" DEFAULT 'system_default' NOT NULL,
      "custom_template_id" integer REFERENCES "email_templates"("id") ON DELETE SET NULL,
      "email_enabled" boolean DEFAULT true NOT NULL,
      "created_at" timestamp DEFAULT now() NOT NULL,
      "updated_at" timestamp DEFAULT now() NOT NULL
    )
  `);
  console.log("✓ Table created");

  await sql.unsafe(`CREATE INDEX IF NOT EXISTS "notification_pref_workspace_idx" ON "notification_preferences" ("workspace_id")`);

  try {
    await sql.unsafe(`CREATE UNIQUE INDEX IF NOT EXISTS "notification_pref_workspace_event_idx" ON "notification_preferences" ("workspace_id", "event_type")`);
  } catch (e: unknown) {
    const error = e as { code?: string };
    if (error.code === "42P07") {
      console.log("✓ Unique index already exists");
    }
  }
  console.log("✓ Indexes created");

  console.log("\n✅ All migrations complete!");
}

migrate().catch(console.error);
