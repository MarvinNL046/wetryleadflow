import { config } from "dotenv";
config({ path: ".env.local" });

import { neon } from "@neondatabase/serverless";

async function runMigration() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set");
  }

  const sql = neon(process.env.DATABASE_URL);

  console.log("Running SaaS Mode migration...");

  // Create enums
  try {
    await sql`CREATE TYPE "agency_tier" AS ENUM ('starter', 'unlimited', 'saas_pro')`;
    console.log("✓ Created agency_tier enum");
  } catch (e: unknown) { const err = e as { code?: string }; if (err.code === "42710") console.log("⚠ agency_tier already exists"); else throw e; }

  try {
    await sql`CREATE TYPE "billing_interval" AS ENUM ('monthly', 'yearly')`;
    console.log("✓ Created billing_interval enum");
  } catch (e: unknown) { const err = e as { code?: string }; if (err.code === "42710") console.log("⚠ billing_interval already exists"); else throw e; }

  try {
    await sql`CREATE TYPE "stripe_account_type" AS ENUM ('express', 'standard')`;
    console.log("✓ Created stripe_account_type enum");
  } catch (e: unknown) { const err = e as { code?: string }; if (err.code === "42710") console.log("⚠ stripe_account_type already exists"); else throw e; }

  try {
    await sql`CREATE TYPE "client_subscription_status" AS ENUM ('trialing', 'active', 'past_due', 'canceled', 'incomplete')`;
    console.log("✓ Created client_subscription_status enum");
  } catch (e: unknown) { const err = e as { code?: string }; if (err.code === "42710") console.log("⚠ client_subscription_status already exists"); else throw e; }

  try {
    await sql`CREATE TYPE "agency_invoice_status" AS ENUM ('draft', 'open', 'paid', 'uncollectible', 'void')`;
    console.log("✓ Created agency_invoice_status enum");
  } catch (e: unknown) { const err = e as { code?: string }; if (err.code === "42710") console.log("⚠ agency_invoice_status already exists"); else throw e; }

  // Extend agencies table
  try { await sql`ALTER TABLE "agencies" ADD COLUMN "tier" "agency_tier" DEFAULT 'starter' NOT NULL`; console.log("✓ Added agencies.tier"); }
  catch (e: unknown) { const err = e as { code?: string }; if (err.code === "42701") console.log("⚠ agencies.tier already exists"); else throw e; }

  try { await sql`ALTER TABLE "agencies" ADD COLUMN "stripe_price_id" varchar(255)`; console.log("✓ Added agencies.stripe_price_id"); }
  catch (e: unknown) { const err = e as { code?: string }; if (err.code === "42701") console.log("⚠ agencies.stripe_price_id already exists"); else throw e; }

  try { await sql`ALTER TABLE "agencies" ADD COLUMN "stripe_subscription_id" varchar(255)`; console.log("✓ Added agencies.stripe_subscription_id"); }
  catch (e: unknown) { const err = e as { code?: string }; if (err.code === "42701") console.log("⚠ agencies.stripe_subscription_id already exists"); else throw e; }

  try { await sql`ALTER TABLE "agencies" ADD COLUMN "saas_mode" boolean DEFAULT false NOT NULL`; console.log("✓ Added agencies.saas_mode"); }
  catch (e: unknown) { const err = e as { code?: string }; if (err.code === "42701") console.log("⚠ agencies.saas_mode already exists"); else throw e; }

  // Extend orgs table
  try { await sql`ALTER TABLE "orgs" ADD COLUMN "billing_email" varchar(255)`; console.log("✓ Added orgs.billing_email"); }
  catch (e: unknown) { const err = e as { code?: string }; if (err.code === "42701") console.log("⚠ orgs.billing_email already exists"); else throw e; }

  try { await sql`ALTER TABLE "orgs" ADD COLUMN "stripe_customer_id" varchar(255)`; console.log("✓ Added orgs.stripe_customer_id"); }
  catch (e: unknown) { const err = e as { code?: string }; if (err.code === "42701") console.log("⚠ orgs.stripe_customer_id already exists"); else throw e; }

  // Create agency_stripe_accounts table
  try {
    await sql`
      CREATE TABLE "agency_stripe_accounts" (
        "id" serial PRIMARY KEY,
        "agency_id" integer NOT NULL UNIQUE REFERENCES "agencies"("id") ON DELETE CASCADE,
        "stripe_account_id" varchar(255) NOT NULL UNIQUE,
        "stripe_account_type" "stripe_account_type" DEFAULT 'express' NOT NULL,
        "charges_enabled" boolean DEFAULT false NOT NULL,
        "payouts_enabled" boolean DEFAULT false NOT NULL,
        "details_submitted" boolean DEFAULT false NOT NULL,
        "onboarding_complete" boolean DEFAULT false NOT NULL,
        "created_at" timestamp DEFAULT now() NOT NULL,
        "updated_at" timestamp DEFAULT now() NOT NULL
      )
    `;
    console.log("✓ Created agency_stripe_accounts table");
  } catch (e: unknown) { const err = e as { code?: string }; if (err.code === "42P07") console.log("⚠ agency_stripe_accounts already exists"); else throw e; }

  // Create agency_pricing_plans table
  try {
    await sql`
      CREATE TABLE "agency_pricing_plans" (
        "id" serial PRIMARY KEY,
        "agency_id" integer NOT NULL REFERENCES "agencies"("id") ON DELETE CASCADE,
        "name" varchar(255) NOT NULL,
        "description" text,
        "price_monthly" decimal(10, 2) NOT NULL,
        "price_yearly" decimal(10, 2),
        "currency" varchar(3) DEFAULT 'EUR' NOT NULL,
        "stripe_product_id" varchar(255),
        "stripe_price_id_monthly" varchar(255),
        "stripe_price_id_yearly" varchar(255),
        "features" jsonb DEFAULT '[]'::jsonb,
        "max_contacts" integer,
        "max_pipelines" integer,
        "max_users" integer,
        "is_active" boolean DEFAULT true NOT NULL,
        "is_default" boolean DEFAULT false NOT NULL,
        "sort_order" integer DEFAULT 0 NOT NULL,
        "created_at" timestamp DEFAULT now() NOT NULL,
        "updated_at" timestamp DEFAULT now() NOT NULL
      )
    `;
    console.log("✓ Created agency_pricing_plans table");
  } catch (e: unknown) { const err = e as { code?: string }; if (err.code === "42P07") console.log("⚠ agency_pricing_plans already exists"); else throw e; }

  // Create client_subscriptions table
  try {
    await sql`
      CREATE TABLE "client_subscriptions" (
        "id" serial PRIMARY KEY,
        "org_id" integer NOT NULL UNIQUE REFERENCES "orgs"("id") ON DELETE CASCADE,
        "agency_id" integer NOT NULL REFERENCES "agencies"("id") ON DELETE CASCADE,
        "plan_id" integer NOT NULL REFERENCES "agency_pricing_plans"("id"),
        "stripe_subscription_id" varchar(255),
        "stripe_customer_id" varchar(255),
        "status" "client_subscription_status" DEFAULT 'trialing' NOT NULL,
        "billing_interval" "billing_interval" DEFAULT 'monthly' NOT NULL,
        "current_period_start" timestamp,
        "current_period_end" timestamp,
        "cancel_at_period_end" boolean DEFAULT false NOT NULL,
        "created_at" timestamp DEFAULT now() NOT NULL,
        "updated_at" timestamp DEFAULT now() NOT NULL
      )
    `;
    console.log("✓ Created client_subscriptions table");
  } catch (e: unknown) { const err = e as { code?: string }; if (err.code === "42P07") console.log("⚠ client_subscriptions already exists"); else throw e; }

  // Create agency_saas_settings table
  try {
    await sql`
      CREATE TABLE "agency_saas_settings" (
        "id" serial PRIMARY KEY,
        "agency_id" integer NOT NULL UNIQUE REFERENCES "agencies"("id") ON DELETE CASCADE,
        "saas_enabled" boolean DEFAULT false NOT NULL,
        "self_signup_enabled" boolean DEFAULT true NOT NULL,
        "require_payment_on_signup" boolean DEFAULT false NOT NULL,
        "trial_days" integer DEFAULT 14 NOT NULL,
        "signup_page_title" varchar(255),
        "signup_page_description" text,
        "terms_url" varchar(500),
        "privacy_url" varchar(500),
        "custom_css" text,
        "created_at" timestamp DEFAULT now() NOT NULL,
        "updated_at" timestamp DEFAULT now() NOT NULL
      )
    `;
    console.log("✓ Created agency_saas_settings table");
  } catch (e: unknown) { const err = e as { code?: string }; if (err.code === "42P07") console.log("⚠ agency_saas_settings already exists"); else throw e; }

  // Create agency_invoices table
  try {
    await sql`
      CREATE TABLE "agency_invoices" (
        "id" serial PRIMARY KEY,
        "agency_id" integer NOT NULL REFERENCES "agencies"("id") ON DELETE CASCADE,
        "org_id" integer NOT NULL REFERENCES "orgs"("id") ON DELETE CASCADE,
        "stripe_invoice_id" varchar(255) NOT NULL UNIQUE,
        "amount" decimal(10, 2) NOT NULL,
        "currency" varchar(3) DEFAULT 'EUR' NOT NULL,
        "status" "agency_invoice_status" DEFAULT 'draft' NOT NULL,
        "invoice_url" varchar(500),
        "invoice_pdf_url" varchar(500),
        "paid_at" timestamp,
        "created_at" timestamp DEFAULT now() NOT NULL
      )
    `;
    console.log("✓ Created agency_invoices table");
  } catch (e: unknown) { const err = e as { code?: string }; if (err.code === "42P07") console.log("⚠ agency_invoices already exists"); else throw e; }

  // Create indexes
  const indexes = [
    { name: "agencies_tier_idx", sql: sql`CREATE INDEX IF NOT EXISTS "agencies_tier_idx" ON "agencies" ("tier")` },
    { name: "agency_stripe_account_agency_idx", sql: sql`CREATE INDEX IF NOT EXISTS "agency_stripe_account_agency_idx" ON "agency_stripe_accounts" ("agency_id")` },
    { name: "agency_pricing_plan_agency_idx", sql: sql`CREATE INDEX IF NOT EXISTS "agency_pricing_plan_agency_idx" ON "agency_pricing_plans" ("agency_id")` },
    { name: "agency_pricing_plan_active_idx", sql: sql`CREATE INDEX IF NOT EXISTS "agency_pricing_plan_active_idx" ON "agency_pricing_plans" ("is_active")` },
    { name: "client_subscription_org_idx", sql: sql`CREATE INDEX IF NOT EXISTS "client_subscription_org_idx" ON "client_subscriptions" ("org_id")` },
    { name: "client_subscription_agency_idx", sql: sql`CREATE INDEX IF NOT EXISTS "client_subscription_agency_idx" ON "client_subscriptions" ("agency_id")` },
    { name: "client_subscription_status_idx", sql: sql`CREATE INDEX IF NOT EXISTS "client_subscription_status_idx" ON "client_subscriptions" ("status")` },
    { name: "agency_saas_settings_agency_idx", sql: sql`CREATE INDEX IF NOT EXISTS "agency_saas_settings_agency_idx" ON "agency_saas_settings" ("agency_id")` },
    { name: "agency_invoice_agency_idx", sql: sql`CREATE INDEX IF NOT EXISTS "agency_invoice_agency_idx" ON "agency_invoices" ("agency_id")` },
    { name: "agency_invoice_org_idx", sql: sql`CREATE INDEX IF NOT EXISTS "agency_invoice_org_idx" ON "agency_invoices" ("org_id")` },
    { name: "agency_invoice_status_idx", sql: sql`CREATE INDEX IF NOT EXISTS "agency_invoice_status_idx" ON "agency_invoices" ("status")` },
  ];

  for (const idx of indexes) {
    try {
      await idx.sql;
      console.log(`✓ Created index ${idx.name}`);
    } catch (e: unknown) {
      const err = e as { code?: string };
      if (err.code === "42P07") console.log(`⚠ Index ${idx.name} already exists`);
      else throw e;
    }
  }

  console.log("\n✓ Migration complete!");
}

runMigration().catch(console.error);
