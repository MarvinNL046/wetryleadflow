import { neon } from "@neondatabase/serverless";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

async function migrate() {
  const sql = neon(process.env.DATABASE_URL!);

  console.log("Running notifications migration...");

  // Add follow-up columns to pipeline_stages
  await sql`
    ALTER TABLE pipeline_stages ADD COLUMN IF NOT EXISTS follow_up_days INTEGER;
  `;
  await sql`
    ALTER TABLE pipeline_stages ADD COLUMN IF NOT EXISTS follow_up_enabled BOOLEAN NOT NULL DEFAULT false;
  `;

  // Add stage behavior columns
  await sql`
    ALTER TABLE pipeline_stages ADD COLUMN IF NOT EXISTS is_final_attempt BOOLEAN NOT NULL DEFAULT false;
  `;
  await sql`
    ALTER TABLE pipeline_stages ADD COLUMN IF NOT EXISTS send_email_on_lost BOOLEAN NOT NULL DEFAULT false;
  `;
  await sql`
    ALTER TABLE pipeline_stages ADD COLUMN IF NOT EXISTS auto_move_to_lost BOOLEAN NOT NULL DEFAULT false;
  `;

  console.log("Added follow-up and behavior columns to pipeline_stages");

  // Create notification type enum
  await sql`
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
  `;

  console.log("Created notification_type enum");

  // Create notifications table
  await sql`
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
  `;

  console.log("Created notifications table");

  // Create indexes
  await sql`CREATE INDEX IF NOT EXISTS notification_workspace_idx ON notifications(workspace_id);`;
  await sql`CREATE INDEX IF NOT EXISTS notification_user_idx ON notifications(user_id);`;
  await sql`CREATE INDEX IF NOT EXISTS notification_read_idx ON notifications(is_read);`;
  await sql`CREATE INDEX IF NOT EXISTS notification_scheduled_idx ON notifications(scheduled_for);`;
  await sql`CREATE INDEX IF NOT EXISTS notification_type_idx ON notifications(type);`;

  console.log("Created notification indexes");
  console.log("Migration completed successfully!");
}

migrate().catch(console.error);
