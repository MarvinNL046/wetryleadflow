-- SaaS Mode Migration
-- Adds new enums, tables and columns for Agency SaaS Mode functionality

-- New Enums
DO $$ BEGIN
    CREATE TYPE "agency_tier" AS ENUM ('starter', 'unlimited', 'saas_pro');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE "billing_interval" AS ENUM ('monthly', 'yearly');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE "stripe_account_type" AS ENUM ('express', 'standard');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE "client_subscription_status" AS ENUM ('trialing', 'active', 'past_due', 'canceled', 'incomplete');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE "agency_invoice_status" AS ENUM ('draft', 'open', 'paid', 'uncollectible', 'void');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Extend agencies table
ALTER TABLE "agencies" ADD COLUMN IF NOT EXISTS "tier" "agency_tier" DEFAULT 'starter' NOT NULL;
ALTER TABLE "agencies" ADD COLUMN IF NOT EXISTS "stripe_price_id" varchar(255);
ALTER TABLE "agencies" ADD COLUMN IF NOT EXISTS "stripe_subscription_id" varchar(255);
ALTER TABLE "agencies" ADD COLUMN IF NOT EXISTS "saas_mode" boolean DEFAULT false NOT NULL;

-- Extend orgs table
ALTER TABLE "orgs" ADD COLUMN IF NOT EXISTS "billing_email" varchar(255);
ALTER TABLE "orgs" ADD COLUMN IF NOT EXISTS "stripe_customer_id" varchar(255);

-- Create agency_stripe_accounts table
CREATE TABLE IF NOT EXISTS "agency_stripe_accounts" (
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
);

-- Create agency_pricing_plans table
CREATE TABLE IF NOT EXISTS "agency_pricing_plans" (
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
);

-- Create client_subscriptions table
CREATE TABLE IF NOT EXISTS "client_subscriptions" (
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
);

-- Create agency_saas_settings table
CREATE TABLE IF NOT EXISTS "agency_saas_settings" (
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
);

-- Create agency_invoices table
CREATE TABLE IF NOT EXISTS "agency_invoices" (
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
);

-- Create indexes
CREATE INDEX IF NOT EXISTS "agencies_tier_idx" ON "agencies" ("tier");
CREATE INDEX IF NOT EXISTS "agency_stripe_account_agency_idx" ON "agency_stripe_accounts" ("agency_id");
CREATE INDEX IF NOT EXISTS "agency_pricing_plan_agency_idx" ON "agency_pricing_plans" ("agency_id");
CREATE INDEX IF NOT EXISTS "agency_pricing_plan_active_idx" ON "agency_pricing_plans" ("is_active");
CREATE INDEX IF NOT EXISTS "client_subscription_org_idx" ON "client_subscriptions" ("org_id");
CREATE INDEX IF NOT EXISTS "client_subscription_agency_idx" ON "client_subscriptions" ("agency_id");
CREATE INDEX IF NOT EXISTS "client_subscription_status_idx" ON "client_subscriptions" ("status");
CREATE INDEX IF NOT EXISTS "agency_saas_settings_agency_idx" ON "agency_saas_settings" ("agency_id");
CREATE INDEX IF NOT EXISTS "agency_invoice_agency_idx" ON "agency_invoices" ("agency_id");
CREATE INDEX IF NOT EXISTS "agency_invoice_org_idx" ON "agency_invoices" ("org_id");
CREATE INDEX IF NOT EXISTS "agency_invoice_status_idx" ON "agency_invoices" ("status");
