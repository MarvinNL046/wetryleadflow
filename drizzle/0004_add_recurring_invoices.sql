-- Create recurring frequency enum
DO $$ BEGIN
    CREATE TYPE "recurring_frequency" AS ENUM('weekly', 'monthly', 'quarterly', 'yearly');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Create recurring_invoices table
CREATE TABLE IF NOT EXISTS "recurring_invoices" (
    "id" serial PRIMARY KEY NOT NULL,
    "workspace_id" integer NOT NULL REFERENCES "workspaces"("id") ON DELETE CASCADE,
    "contact_id" integer NOT NULL REFERENCES "contacts"("id") ON DELETE CASCADE,
    -- Template info
    "title" varchar(255),
    "introduction" text,
    "terms" text,
    "notes" text,
    -- Line items stored as JSON template
    "line_items_template" jsonb DEFAULT '[]'::jsonb NOT NULL,
    -- Schedule
    "frequency" "recurring_frequency" DEFAULT 'monthly' NOT NULL,
    "day_of_month" integer DEFAULT 1 NOT NULL,
    "day_of_week" integer,
    -- Payment terms
    "payment_terms" integer DEFAULT 14 NOT NULL,
    "currency" varchar(3) DEFAULT 'EUR' NOT NULL,
    -- Dates
    "start_date" timestamp NOT NULL,
    "end_date" timestamp,
    "next_run_date" timestamp NOT NULL,
    "last_run_date" timestamp,
    -- Control
    "is_active" boolean DEFAULT true NOT NULL,
    "auto_send" boolean DEFAULT false NOT NULL,
    -- Stats
    "invoices_generated" integer DEFAULT 0 NOT NULL,
    -- Timestamps
    "created_at" timestamp DEFAULT now() NOT NULL,
    "updated_at" timestamp DEFAULT now() NOT NULL
);

-- Create indexes
CREATE INDEX IF NOT EXISTS "recurring_invoices_workspace_idx" ON "recurring_invoices" ("workspace_id");
CREATE INDEX IF NOT EXISTS "recurring_invoices_contact_idx" ON "recurring_invoices" ("contact_id");
CREATE INDEX IF NOT EXISTS "recurring_invoices_next_run_idx" ON "recurring_invoices" ("next_run_date");
CREATE INDEX IF NOT EXISTS "recurring_invoices_active_idx" ON "recurring_invoices" ("is_active");
