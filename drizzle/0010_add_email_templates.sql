-- Email Templates: Custom user-defined email templates
-- Migration: 0010_add_email_templates

-- Create email template type enum
CREATE TYPE "email_template_type" AS ENUM (
  'lead_notification',
  'follow_up',
  'quote_sent',
  'invoice_sent',
  'payment_reminder',
  'welcome',
  'custom'
);

-- Create email_templates table
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
);

-- Create indexes
CREATE INDEX IF NOT EXISTS "email_template_workspace_idx" ON "email_templates" ("workspace_id");
CREATE INDEX IF NOT EXISTS "email_template_type_idx" ON "email_templates" ("type");
CREATE INDEX IF NOT EXISTS "email_template_active_idx" ON "email_templates" ("is_active");
CREATE UNIQUE INDEX IF NOT EXISTS "email_template_workspace_name_idx" ON "email_templates" ("workspace_id", "name");
