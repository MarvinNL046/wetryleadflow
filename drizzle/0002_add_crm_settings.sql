-- Add CRM Settings table for per-workspace configuration
CREATE TABLE IF NOT EXISTS "crm_settings" (
  "id" serial PRIMARY KEY NOT NULL,
  "workspace_id" integer NOT NULL UNIQUE,
  "auto_follow_up_enabled" boolean DEFAULT false NOT NULL,
  "follow_up_days" integer DEFAULT 0 NOT NULL,
  "max_call_attempts" integer DEFAULT 0 NOT NULL,
  "send_email_on_lost" boolean DEFAULT false NOT NULL,
  "callback_periods" jsonb DEFAULT '[]'::jsonb NOT NULL,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL,
  CONSTRAINT "crm_settings_workspace_id_fkey" FOREIGN KEY ("workspace_id") REFERENCES "workspaces"("id") ON DELETE CASCADE
);

-- Add index for workspace lookup
CREATE INDEX IF NOT EXISTS "crm_settings_workspace_idx" ON "crm_settings" ("workspace_id");
