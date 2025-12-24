import { config } from "dotenv";
config({ path: ".env.local" });

import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

async function createMetaTables() {
  console.log("Creating Meta integration tables...\n");

  // Create meta_connections table
  console.log("1. Creating meta_connections table...");
  await sql`
    CREATE TABLE IF NOT EXISTS "meta_connections" (
      "id" serial PRIMARY KEY NOT NULL,
      "org_id" integer NOT NULL REFERENCES "orgs"("id") ON DELETE CASCADE,
      "meta_user_id" varchar(100) NOT NULL,
      "meta_user_name" varchar(255),
      "access_token_encrypted" text NOT NULL,
      "token_expires_at" timestamp,
      "scopes" text,
      "is_active" boolean NOT NULL DEFAULT true,
      "last_sync_at" timestamp,
      "created_at" timestamp DEFAULT now() NOT NULL,
      "updated_at" timestamp DEFAULT now() NOT NULL
    )
  `;
  await sql`CREATE INDEX IF NOT EXISTS "meta_conn_org_idx" ON "meta_connections" ("org_id")`;
  await sql`CREATE UNIQUE INDEX IF NOT EXISTS "meta_conn_org_user_idx" ON "meta_connections" ("org_id", "meta_user_id")`;
  console.log("   ✅ meta_connections created");

  // Create meta_pages table
  console.log("2. Creating meta_pages table...");
  await sql`
    CREATE TABLE IF NOT EXISTS "meta_pages" (
      "id" serial PRIMARY KEY NOT NULL,
      "org_id" integer NOT NULL REFERENCES "orgs"("id") ON DELETE CASCADE,
      "connection_id" integer NOT NULL REFERENCES "meta_connections"("id") ON DELETE CASCADE,
      "page_id" varchar(100) NOT NULL,
      "page_name" varchar(255) NOT NULL,
      "page_access_token_encrypted" text NOT NULL,
      "subscribed_to_leadgen" boolean NOT NULL DEFAULT false,
      "webhook_subscribed_at" timestamp,
      "is_active" boolean NOT NULL DEFAULT true,
      "created_at" timestamp DEFAULT now() NOT NULL,
      "updated_at" timestamp DEFAULT now() NOT NULL
    )
  `;
  await sql`CREATE INDEX IF NOT EXISTS "meta_page_org_idx" ON "meta_pages" ("org_id")`;
  await sql`CREATE UNIQUE INDEX IF NOT EXISTS "meta_page_org_page_idx" ON "meta_pages" ("org_id", "page_id")`;
  console.log("   ✅ meta_pages created");

  // Create meta_forms table
  console.log("3. Creating meta_forms table...");
  await sql`
    CREATE TABLE IF NOT EXISTS "meta_forms" (
      "id" serial PRIMARY KEY NOT NULL,
      "org_id" integer NOT NULL REFERENCES "orgs"("id") ON DELETE CASCADE,
      "page_id" integer NOT NULL REFERENCES "meta_pages"("id") ON DELETE CASCADE,
      "form_id" varchar(100) NOT NULL,
      "form_name" varchar(255),
      "form_fields" jsonb,
      "is_active" boolean NOT NULL DEFAULT true,
      "last_sync_at" timestamp,
      "created_at" timestamp DEFAULT now() NOT NULL,
      "updated_at" timestamp DEFAULT now() NOT NULL
    )
  `;
  await sql`CREATE INDEX IF NOT EXISTS "meta_form_org_idx" ON "meta_forms" ("org_id")`;
  await sql`CREATE UNIQUE INDEX IF NOT EXISTS "meta_form_page_form_idx" ON "meta_forms" ("page_id", "form_id")`;
  console.log("   ✅ meta_forms created");

  // Create lead_ingest_routes table
  console.log("4. Creating lead_ingest_routes table...");
  await sql`
    CREATE TABLE IF NOT EXISTS "lead_ingest_routes" (
      "id" serial PRIMARY KEY NOT NULL,
      "org_id" integer NOT NULL REFERENCES "orgs"("id") ON DELETE CASCADE,
      "source" "lead_source" NOT NULL,
      "meta_page_id" integer REFERENCES "meta_pages"("id") ON DELETE CASCADE,
      "meta_form_id" integer REFERENCES "meta_forms"("id") ON DELETE CASCADE,
      "workspace_id" integer NOT NULL REFERENCES "workspaces"("id") ON DELETE CASCADE,
      "pipeline_id" integer NOT NULL REFERENCES "pipelines"("id") ON DELETE CASCADE,
      "stage_id" integer NOT NULL REFERENCES "pipeline_stages"("id"),
      "assign_to_user_id" integer REFERENCES "users"("id"),
      "is_active" boolean NOT NULL DEFAULT true,
      "created_at" timestamp DEFAULT now() NOT NULL,
      "updated_at" timestamp DEFAULT now() NOT NULL
    )
  `;
  await sql`CREATE INDEX IF NOT EXISTS "lead_route_org_idx" ON "lead_ingest_routes" ("org_id")`;
  await sql`CREATE INDEX IF NOT EXISTS "lead_route_workspace_idx" ON "lead_ingest_routes" ("workspace_id")`;
  console.log("   ✅ lead_ingest_routes created");

  // Create lead_field_mappings table
  console.log("5. Creating lead_field_mappings table...");
  await sql`
    CREATE TABLE IF NOT EXISTS "lead_field_mappings" (
      "id" serial PRIMARY KEY NOT NULL,
      "route_id" integer NOT NULL REFERENCES "lead_ingest_routes"("id") ON DELETE CASCADE,
      "source_field_key" varchar(100) NOT NULL,
      "target_field" varchar(100) NOT NULL,
      "transform" varchar(50),
      "created_at" timestamp DEFAULT now() NOT NULL
    )
  `;
  await sql`CREATE INDEX IF NOT EXISTS "lead_mapping_route_idx" ON "lead_field_mappings" ("route_id")`;
  console.log("   ✅ lead_field_mappings created");

  // Create lead_attribution table
  console.log("6. Creating lead_attribution table...");
  await sql`
    CREATE TABLE IF NOT EXISTS "lead_attribution" (
      "id" serial PRIMARY KEY NOT NULL,
      "contact_id" integer NOT NULL REFERENCES "contacts"("id") ON DELETE CASCADE,
      "source" "lead_source" NOT NULL,
      "meta_page_id" varchar(100),
      "meta_form_id" varchar(100),
      "meta_leadgen_id" varchar(100),
      "meta_ad_id" varchar(100),
      "meta_campaign_id" varchar(100),
      "meta_adset_id" varchar(100),
      "raw_payload" jsonb,
      "created_at" timestamp DEFAULT now() NOT NULL
    )
  `;
  await sql`CREATE INDEX IF NOT EXISTS "lead_attr_contact_idx" ON "lead_attribution" ("contact_id")`;
  await sql`CREATE UNIQUE INDEX IF NOT EXISTS "lead_attr_meta_lead_idx" ON "lead_attribution" ("meta_leadgen_id") WHERE "meta_leadgen_id" IS NOT NULL`;
  console.log("   ✅ lead_attribution created");

  console.log("\n✅ All Meta integration tables created!");
}

createMetaTables().catch(console.error);
