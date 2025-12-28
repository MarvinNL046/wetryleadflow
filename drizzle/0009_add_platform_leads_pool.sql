-- Platform Leads Pool: System-wide lost leads for super-admin resale
-- This table is completely isolated from workspace RLS - only super-admin access

-- Create the status enum
DO $$ BEGIN
  CREATE TYPE "platform_lead_pool_status" AS ENUM('available', 'reserved', 'sold', 'expired', 'withdrawn');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Create the platform leads pool table
CREATE TABLE IF NOT EXISTS "platform_leads_pool" (
  "id" serial PRIMARY KEY NOT NULL,

  -- Reference to original contact (nullable in case contact is deleted)
  "original_contact_id" integer REFERENCES "contacts"("id") ON DELETE SET NULL,

  -- Source tracking - where did this lead come from
  "source_workspace_id" integer REFERENCES "workspaces"("id") ON DELETE SET NULL,
  "source_org_id" integer REFERENCES "orgs"("id") ON DELETE SET NULL,
  "source_agency_id" integer REFERENCES "agencies"("id") ON DELETE SET NULL,

  -- Denormalized lead data (preserved even if original is deleted)
  "first_name" varchar(255),
  "last_name" varchar(255),
  "email" varchar(255),
  "phone" varchar(50),
  "company" varchar(255),
  "street" varchar(255),
  "house_number" varchar(20),
  "postal_code" varchar(20),
  "city" varchar(255),
  "province" varchar(255),
  "country" varchar(100),

  -- Categorization
  "label" varchar(255),
  "reason" varchar(255),
  "notes" text,

  -- Status tracking
  "status" "platform_lead_pool_status" NOT NULL DEFAULT 'available',

  -- Sale information
  "sold_to_org_id" integer REFERENCES "orgs"("id") ON DELETE SET NULL,
  "sold_to_workspace_id" integer REFERENCES "workspaces"("id") ON DELETE SET NULL,
  "sold_to_agency_id" integer REFERENCES "agencies"("id") ON DELETE SET NULL,
  "price" decimal(10, 2),
  "sold_at" timestamp,
  "sold_by_id" integer REFERENCES "users"("id") ON DELETE SET NULL,

  -- Reservation (for pending sales)
  "reserved_until" timestamp,
  "reserved_by_id" integer REFERENCES "users"("id") ON DELETE SET NULL,

  -- Audit trail
  "added_by_id" integer REFERENCES "users"("id") ON DELETE SET NULL,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL
);

-- Create indexes for efficient queries
CREATE INDEX IF NOT EXISTS "platform_leads_pool_status_idx" ON "platform_leads_pool" ("status");
CREATE INDEX IF NOT EXISTS "platform_leads_pool_source_org_idx" ON "platform_leads_pool" ("source_org_id");
CREATE INDEX IF NOT EXISTS "platform_leads_pool_source_agency_idx" ON "platform_leads_pool" ("source_agency_id");
CREATE INDEX IF NOT EXISTS "platform_leads_pool_city_idx" ON "platform_leads_pool" ("city");
CREATE INDEX IF NOT EXISTS "platform_leads_pool_postal_idx" ON "platform_leads_pool" ("postal_code");
CREATE INDEX IF NOT EXISTS "platform_leads_pool_created_idx" ON "platform_leads_pool" ("created_at");
CREATE INDEX IF NOT EXISTS "platform_leads_pool_sold_to_idx" ON "platform_leads_pool" ("sold_to_org_id");

-- IMPORTANT: RLS Policies for super-admin only access
-- By default, no access - only super-admin functions bypass RLS

-- Enable RLS on the table
ALTER TABLE "platform_leads_pool" ENABLE ROW LEVEL SECURITY;

-- No SELECT policy = no one can read by default
-- Super-admin access will be through server actions with requireSuperAdmin()
