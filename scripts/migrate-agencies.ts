/**
 * Migration script to add agency tables
 * Run with: npx tsx scripts/migrate-agencies.ts
 */

import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";

// Load environment variables
config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL!);

async function migrate() {
  console.log("Starting agency tables migration...");

  try {
    // Create agency_role enum
    console.log("Creating agency_role enum...");
    await sql`
      DO $$ BEGIN
        CREATE TYPE agency_role AS ENUM ('owner', 'admin', 'member');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `;

    // Create subscription_status enum
    console.log("Creating subscription_status enum...");
    await sql`
      DO $$ BEGIN
        CREATE TYPE subscription_status AS ENUM ('trialing', 'active', 'past_due', 'canceled', 'paused');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `;

    // Create agencies table
    console.log("Creating agencies table...");
    await sql`
      CREATE TABLE IF NOT EXISTS agencies (
        id SERIAL PRIMARY KEY,
        slug VARCHAR(100) UNIQUE NOT NULL,
        name VARCHAR(255) NOT NULL,
        logo_url VARCHAR(500),
        primary_color VARCHAR(7),
        secondary_color VARCHAR(7),
        app_name VARCHAR(100),
        email VARCHAR(255) NOT NULL,
        website VARCHAR(255),
        stripe_customer_id VARCHAR(255),
        subscription_status subscription_status DEFAULT 'trialing',
        max_orgs INTEGER DEFAULT 10,
        is_active BOOLEAN DEFAULT true NOT NULL,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL,
        updated_at TIMESTAMP DEFAULT NOW() NOT NULL
      );
    `;

    // Create indexes on agencies
    console.log("Creating indexes on agencies...");
    await sql`CREATE INDEX IF NOT EXISTS agencies_slug_idx ON agencies(slug);`;
    await sql`CREATE INDEX IF NOT EXISTS agencies_active_idx ON agencies(is_active);`;

    // Create agency_memberships table
    console.log("Creating agency_memberships table...");
    await sql`
      CREATE TABLE IF NOT EXISTS agency_memberships (
        id SERIAL PRIMARY KEY,
        agency_id INTEGER NOT NULL REFERENCES agencies(id) ON DELETE CASCADE,
        user_id VARCHAR(255) NOT NULL,
        role agency_role DEFAULT 'member' NOT NULL,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL
      );
    `;

    // Create indexes on agency_memberships
    console.log("Creating indexes on agency_memberships...");
    await sql`CREATE UNIQUE INDEX IF NOT EXISTS agency_membership_user_agency_idx ON agency_memberships(agency_id, user_id);`;
    await sql`CREATE INDEX IF NOT EXISTS agency_membership_user_idx ON agency_memberships(user_id);`;
    await sql`CREATE INDEX IF NOT EXISTS agency_membership_agency_idx ON agency_memberships(agency_id);`;

    // Create agency_invites table
    console.log("Creating agency_invites table...");
    await sql`
      CREATE TABLE IF NOT EXISTS agency_invites (
        id SERIAL PRIMARY KEY,
        agency_id INTEGER NOT NULL REFERENCES agencies(id) ON DELETE CASCADE,
        email VARCHAR(255) NOT NULL,
        role agency_role DEFAULT 'member' NOT NULL,
        token VARCHAR(255) UNIQUE NOT NULL,
        expires_at TIMESTAMP NOT NULL,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL
      );
    `;

    // Create indexes on agency_invites
    console.log("Creating indexes on agency_invites...");
    await sql`CREATE INDEX IF NOT EXISTS agency_invite_agency_idx ON agency_invites(agency_id);`;
    await sql`CREATE INDEX IF NOT EXISTS agency_invite_email_idx ON agency_invites(email);`;
    await sql`CREATE INDEX IF NOT EXISTS agency_invite_token_idx ON agency_invites(token);`;

    // Add agency_id column to orgs table
    console.log("Adding agency_id to orgs table...");
    await sql`
      DO $$ BEGIN
        ALTER TABLE orgs ADD COLUMN agency_id INTEGER REFERENCES agencies(id) ON DELETE SET NULL;
      EXCEPTION
        WHEN duplicate_column THEN null;
      END $$;
    `;

    // Create index on orgs.agency_id
    console.log("Creating index on orgs.agency_id...");
    await sql`CREATE INDEX IF NOT EXISTS orgs_agency_idx ON orgs(agency_id);`;

    console.log("✅ Migration completed successfully!");
  } catch (error) {
    console.error("❌ Migration failed:", error);
    process.exit(1);
  }
}

migrate();
