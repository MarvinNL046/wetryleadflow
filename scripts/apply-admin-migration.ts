import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";

// Load environment variables
config({ path: ".env.local" });

const statements = [
  // Cron job status enum
  `DO $$ BEGIN CREATE TYPE cron_job_status AS ENUM ('running', 'success', 'failed', 'timeout'); EXCEPTION WHEN duplicate_object THEN null; END $$`,

  // Cron job runs table
  `CREATE TABLE IF NOT EXISTS cron_job_runs (
    id SERIAL PRIMARY KEY,
    job_name VARCHAR(100) NOT NULL,
    status cron_job_status NOT NULL,
    started_at TIMESTAMP NOT NULL,
    completed_at TIMESTAMP,
    duration INTEGER,
    items_processed INTEGER DEFAULT 0,
    error_message TEXT,
    metadata JSONB,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL
  )`,
  `CREATE INDEX IF NOT EXISTS cron_job_runs_name_idx ON cron_job_runs(job_name)`,
  `CREATE INDEX IF NOT EXISTS cron_job_runs_status_idx ON cron_job_runs(status)`,
  `CREATE INDEX IF NOT EXISTS cron_job_runs_started_idx ON cron_job_runs(started_at)`,

  // Cron job configs table
  `CREATE TABLE IF NOT EXISTS cron_job_configs (
    id SERIAL PRIMARY KEY,
    job_name VARCHAR(100) NOT NULL UNIQUE,
    schedule VARCHAR(100) NOT NULL,
    description TEXT,
    is_enabled BOOLEAN DEFAULT TRUE NOT NULL,
    last_run_at TIMESTAMP,
    next_run_at TIMESTAMP,
    consecutive_failures INTEGER DEFAULT 0 NOT NULL,
    alert_threshold INTEGER DEFAULT 3 NOT NULL,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP DEFAULT NOW() NOT NULL
  )`,

  // Announcement enums
  `DO $$ BEGIN CREATE TYPE announcement_type AS ENUM ('info', 'warning', 'feature', 'maintenance'); EXCEPTION WHEN duplicate_object THEN null; END $$`,
  `DO $$ BEGIN CREATE TYPE announcement_status AS ENUM ('draft', 'scheduled', 'active', 'expired'); EXCEPTION WHEN duplicate_object THEN null; END $$`,

  // Announcements table
  `CREATE TABLE IF NOT EXISTS announcements (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    type announcement_type DEFAULT 'info' NOT NULL,
    status announcement_status DEFAULT 'draft' NOT NULL,
    target VARCHAR(20) DEFAULT 'all' NOT NULL,
    target_agency_ids JSONB,
    target_org_ids JSONB,
    publish_at TIMESTAMP,
    expires_at TIMESTAMP,
    dismissible BOOLEAN DEFAULT TRUE NOT NULL,
    show_on_dashboard BOOLEAN DEFAULT TRUE NOT NULL,
    created_by VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP DEFAULT NOW() NOT NULL
  )`,
  `CREATE INDEX IF NOT EXISTS announcements_status_idx ON announcements(status)`,
  `CREATE INDEX IF NOT EXISTS announcements_type_idx ON announcements(type)`,
  `CREATE INDEX IF NOT EXISTS announcements_publish_idx ON announcements(publish_at)`,

  // Announcement dismissals table
  `CREATE TABLE IF NOT EXISTS announcement_dismissals (
    id SERIAL PRIMARY KEY,
    announcement_id INTEGER NOT NULL REFERENCES announcements(id) ON DELETE CASCADE,
    user_id VARCHAR(255) NOT NULL,
    dismissed_at TIMESTAMP DEFAULT NOW() NOT NULL
  )`,
  `CREATE UNIQUE INDEX IF NOT EXISTS dismissal_user_announcement_idx ON announcement_dismissals(announcement_id, user_id)`,
  `CREATE INDEX IF NOT EXISTS dismissal_announcement_idx ON announcement_dismissals(announcement_id)`,

  // Feature flag enum
  `DO $$ BEGIN CREATE TYPE feature_flag_type AS ENUM ('boolean', 'percentage', 'tier_based'); EXCEPTION WHEN duplicate_object THEN null; END $$`,

  // Feature flags table
  `CREATE TABLE IF NOT EXISTS feature_flags (
    id SERIAL PRIMARY KEY,
    key VARCHAR(100) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    type feature_flag_type DEFAULT 'boolean' NOT NULL,
    default_enabled BOOLEAN DEFAULT FALSE NOT NULL,
    rollout_percentage INTEGER DEFAULT 0,
    enabled_tiers JSONB,
    is_beta BOOLEAN DEFAULT FALSE NOT NULL,
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP DEFAULT NOW() NOT NULL
  )`,
  `CREATE INDEX IF NOT EXISTS feature_flags_key_idx ON feature_flags(key)`,
  `CREATE INDEX IF NOT EXISTS feature_flags_active_idx ON feature_flags(is_active)`,

  // Feature flag overrides table
  `CREATE TABLE IF NOT EXISTS feature_flag_overrides (
    id SERIAL PRIMARY KEY,
    feature_flag_id INTEGER NOT NULL REFERENCES feature_flags(id) ON DELETE CASCADE,
    org_id INTEGER REFERENCES orgs(id) ON DELETE CASCADE,
    agency_id INTEGER REFERENCES agencies(id) ON DELETE CASCADE,
    enabled BOOLEAN NOT NULL,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL
  )`,
  `CREATE INDEX IF NOT EXISTS override_flag_idx ON feature_flag_overrides(feature_flag_id)`,
  `CREATE INDEX IF NOT EXISTS override_org_idx ON feature_flag_overrides(org_id)`,
  `CREATE INDEX IF NOT EXISTS override_agency_idx ON feature_flag_overrides(agency_id)`,

  // Support ticket enums
  `DO $$ BEGIN CREATE TYPE support_ticket_status AS ENUM ('new', 'in_progress', 'waiting_reply', 'resolved', 'closed'); EXCEPTION WHEN duplicate_object THEN null; END $$`,
  `DO $$ BEGIN CREATE TYPE support_ticket_priority AS ENUM ('low', 'medium', 'high', 'urgent'); EXCEPTION WHEN duplicate_object THEN null; END $$`,
  `DO $$ BEGIN CREATE TYPE support_ticket_type AS ENUM ('bug', 'feature_request', 'question', 'feedback', 'other'); EXCEPTION WHEN duplicate_object THEN null; END $$`,

  // Support tickets table
  `CREATE TABLE IF NOT EXISTS support_tickets (
    id SERIAL PRIMARY KEY,
    org_id INTEGER REFERENCES orgs(id) ON DELETE SET NULL,
    user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    user_email VARCHAR(255) NOT NULL,
    user_name VARCHAR(255),
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type support_ticket_type DEFAULT 'feedback' NOT NULL,
    status support_ticket_status DEFAULT 'new' NOT NULL,
    priority support_ticket_priority DEFAULT 'medium' NOT NULL,
    assigned_to VARCHAR(255),
    user_agent TEXT,
    page_url VARCHAR(500),
    metadata JSONB,
    resolved_at TIMESTAMP,
    resolution_notes TEXT,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP DEFAULT NOW() NOT NULL
  )`,
  `CREATE INDEX IF NOT EXISTS support_ticket_status_idx ON support_tickets(status)`,
  `CREATE INDEX IF NOT EXISTS support_ticket_priority_idx ON support_tickets(priority)`,
  `CREATE INDEX IF NOT EXISTS support_ticket_user_idx ON support_tickets(user_id)`,
  `CREATE INDEX IF NOT EXISTS support_ticket_org_idx ON support_tickets(org_id)`,
  `CREATE INDEX IF NOT EXISTS support_ticket_created_idx ON support_tickets(created_at)`,

  // Support ticket replies table
  `CREATE TABLE IF NOT EXISTS support_ticket_replies (
    id SERIAL PRIMARY KEY,
    ticket_id INTEGER NOT NULL REFERENCES support_tickets(id) ON DELETE CASCADE,
    is_admin_reply BOOLEAN DEFAULT FALSE NOT NULL,
    sender_email VARCHAR(255) NOT NULL,
    sender_name VARCHAR(255),
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL
  )`,
  `CREATE INDEX IF NOT EXISTS reply_ticket_idx ON support_ticket_replies(ticket_id)`,
];

async function main() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL not found in environment");
  }

  const sql = neon(databaseUrl);

  console.log("Applying admin tables migration...");
  console.log(`Running ${statements.length} statements...`);

  let success = 0;
  let failed = 0;

  for (let i = 0; i < statements.length; i++) {
    const stmt = statements[i];
    try {
      await sql.query(stmt, [], {});
      success++;
      process.stdout.write(".");
    } catch (error: unknown) {
      const err = error as { message?: string };
      // Ignore "already exists" errors
      if (err.message?.includes("already exists")) {
        success++;
        process.stdout.write("s");
      } else {
        failed++;
        console.error(`\n❌ Statement ${i + 1} failed:`, err.message);
      }
    }
  }

  console.log(`\n\n✅ Migration complete: ${success} successful, ${failed} failed`);
}

main().catch(console.error);
