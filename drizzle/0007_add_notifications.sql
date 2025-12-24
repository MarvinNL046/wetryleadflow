-- Add follow-up settings to pipeline stages
ALTER TABLE pipeline_stages ADD COLUMN IF NOT EXISTS follow_up_days INTEGER;
ALTER TABLE pipeline_stages ADD COLUMN IF NOT EXISTS follow_up_enabled BOOLEAN NOT NULL DEFAULT false;

-- Create notification type enum
DO $$ BEGIN
  CREATE TYPE notification_type AS ENUM (
    'follow_up',
    'lead_new',
    'invoice_paid',
    'invoice_overdue',
    'opportunity_won',
    'opportunity_lost',
    'system'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id SERIAL PRIMARY KEY,
  workspace_id INTEGER NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  type notification_type NOT NULL,
  title VARCHAR(255) NOT NULL,
  message TEXT,
  entity_type VARCHAR(50),
  entity_id INTEGER,
  action_url VARCHAR(500),
  is_read BOOLEAN NOT NULL DEFAULT false,
  read_at TIMESTAMP,
  scheduled_for TIMESTAMP NOT NULL DEFAULT NOW(),
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS notification_workspace_idx ON notifications(workspace_id);
CREATE INDEX IF NOT EXISTS notification_user_idx ON notifications(user_id);
CREATE INDEX IF NOT EXISTS notification_read_idx ON notifications(is_read);
CREATE INDEX IF NOT EXISTS notification_scheduled_idx ON notifications(scheduled_for);
CREATE INDEX IF NOT EXISTS notification_type_idx ON notifications(type);
