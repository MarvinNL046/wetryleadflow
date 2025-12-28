-- Notification Preferences: Per-workspace email notification settings
-- Migration: 0011_add_notification_preferences

-- Create notification event enum
CREATE TYPE "notification_event" AS ENUM (
  'new_lead',
  'lead_assigned',
  'follow_up_reminder',
  'lead_lost',
  'invoice_sent',
  'invoice_reminder',
  'quote_sent',
  'team_invite',
  'welcome'
);

-- Create notification mode enum
CREATE TYPE "notification_mode" AS ENUM (
  'disabled',
  'system_default',
  'custom_template'
);

-- Create notification_preferences table
CREATE TABLE IF NOT EXISTS "notification_preferences" (
  "id" serial PRIMARY KEY NOT NULL,
  "workspace_id" integer NOT NULL REFERENCES "workspaces"("id") ON DELETE CASCADE,
  "event_type" "notification_event" NOT NULL,
  "mode" "notification_mode" DEFAULT 'system_default' NOT NULL,
  "custom_template_id" integer REFERENCES "email_templates"("id") ON DELETE SET NULL,
  "email_enabled" boolean DEFAULT true NOT NULL,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL
);

-- Create indexes
CREATE INDEX IF NOT EXISTS "notification_pref_workspace_idx" ON "notification_preferences" ("workspace_id");
CREATE UNIQUE INDEX IF NOT EXISTS "notification_pref_workspace_event_idx" ON "notification_preferences" ("workspace_id", "event_type");
