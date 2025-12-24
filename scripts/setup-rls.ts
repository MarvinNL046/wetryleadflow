/**
 * RLS (Row Level Security) Setup Script
 *
 * This script enables RLS on all tenant-scoped tables and creates
 * policies that enforce workspace/org isolation.
 *
 * Run with: npx tsx scripts/setup-rls.ts
 */

import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { db } from "../src/lib/db";
import { sql } from "drizzle-orm";

// Helper to create a policy (drops existing one first)
async function createPolicy(
  table: string,
  policyName: string,
  using: string,
  withCheck: string
) {
  await db.execute(sql.raw(`DROP POLICY IF EXISTS ${policyName} ON ${table}`));
  await db.execute(sql.raw(`
    CREATE POLICY ${policyName} ON ${table}
      USING (${using})
      WITH CHECK (${withCheck})
  `));
}

async function setupRLS() {
  console.log("🔒 Setting up Row Level Security (RLS)...\n");

  // ============================================
  // Step 1: Create helper functions
  // ============================================
  console.log("📝 Creating context helper functions...");

  await db.execute(sql`
    CREATE OR REPLACE FUNCTION current_workspace_id() RETURNS INTEGER AS $$
      SELECT NULLIF(current_setting('app.current_workspace_id', true), '')::INTEGER
    $$ LANGUAGE SQL STABLE
  `);
  console.log("   ✅ current_workspace_id()");

  await db.execute(sql`
    CREATE OR REPLACE FUNCTION current_org_id() RETURNS INTEGER AS $$
      SELECT NULLIF(current_setting('app.current_org_id', true), '')::INTEGER
    $$ LANGUAGE SQL STABLE
  `);
  console.log("   ✅ current_org_id()");

  await db.execute(sql`
    CREATE OR REPLACE FUNCTION current_app_user_id() RETURNS INTEGER AS $$
      SELECT NULLIF(current_setting('app.current_user_id', true), '')::INTEGER
    $$ LANGUAGE SQL STABLE
  `);
  console.log("   ✅ current_app_user_id()");

  await db.execute(sql`
    CREATE OR REPLACE FUNCTION rls_bypass_enabled() RETURNS BOOLEAN AS $$
      SELECT COALESCE(current_setting('app.rls_bypass', true), 'false')::BOOLEAN
    $$ LANGUAGE SQL STABLE
  `);
  console.log("   ✅ rls_bypass_enabled()");
  console.log("");

  // ============================================
  // Step 2: Enable RLS on all tables
  // ============================================
  console.log("📝 Enabling RLS on tables...");

  const allTables = [
    // Workspace-scoped
    'contacts', 'pipelines', 'opportunities', 'notes',
    'crm_settings', 'outbox_events', 'lead_ingest_routes',
    // Org-scoped
    'workspaces', 'memberships', 'meta_connections',
    'meta_pages', 'meta_forms', 'meta_lead_raw',
    // Audit/log
    'audit_log', 'email_log',
    // Child tables
    'pipeline_stages', 'opportunity_stage_history',
    'lead_field_mappings', 'lead_attribution',
    // Core tables (membership-based access)
    'orgs', 'users',
    // System tables (admin only)
    'webhook_events',
  ];

  for (const table of allTables) {
    try {
      await db.execute(sql.raw(`ALTER TABLE ${table} ENABLE ROW LEVEL SECURITY`));
      await db.execute(sql.raw(`ALTER TABLE ${table} FORCE ROW LEVEL SECURITY`));
      console.log(`   ✅ ${table}`);
    } catch (error) {
      console.log(`   ⚠️  ${table}: ${(error as Error).message}`);
    }
  }
  console.log("");

  // ============================================
  // Step 3: Create workspace isolation policies
  // ============================================
  console.log("📝 Creating workspace isolation policies...");

  const workspacePolicy = `
    rls_bypass_enabled()
    OR workspace_id = current_workspace_id()
  `;

  const workspaceTables = [
    'contacts', 'pipelines', 'opportunities', 'notes',
    'crm_settings', 'outbox_events', 'lead_ingest_routes',
  ];

  for (const table of workspaceTables) {
    await createPolicy(table, 'workspace_isolation', workspacePolicy, workspacePolicy);
    console.log(`   ✅ ${table}`);
  }
  console.log("");

  // ============================================
  // Step 4: Create org isolation policies
  // ============================================
  console.log("📝 Creating org isolation policies...");

  const orgPolicy = `
    rls_bypass_enabled()
    OR org_id = current_org_id()
  `;

  const orgTables = [
    'workspaces', 'memberships', 'meta_connections',
    'meta_pages', 'meta_forms', 'meta_lead_raw',
  ];

  for (const table of orgTables) {
    await createPolicy(table, 'org_isolation', orgPolicy, orgPolicy);
    console.log(`   ✅ ${table}`);
  }
  console.log("");

  // ============================================
  // Step 5: Create policies for audit/log tables (nullable workspace)
  // ============================================
  console.log("📝 Creating audit table policies...");

  const auditPolicy = `
    rls_bypass_enabled()
    OR workspace_id IS NULL
    OR workspace_id = current_workspace_id()
  `;

  for (const table of ['audit_log', 'email_log']) {
    await createPolicy(table, 'workspace_isolation', auditPolicy, auditPolicy);
    console.log(`   ✅ ${table}`);
  }
  console.log("");

  // ============================================
  // Step 6: Create policies for child tables (via parent lookup)
  // ============================================
  console.log("📝 Creating child table policies...");

  // Pipeline Stages (via pipelines)
  await createPolicy(
    'pipeline_stages',
    'workspace_isolation',
    `rls_bypass_enabled() OR EXISTS (
      SELECT 1 FROM pipelines
      WHERE pipelines.id = pipeline_stages.pipeline_id
      AND pipelines.workspace_id = current_workspace_id()
    )`,
    `rls_bypass_enabled() OR EXISTS (
      SELECT 1 FROM pipelines
      WHERE pipelines.id = pipeline_stages.pipeline_id
      AND pipelines.workspace_id = current_workspace_id()
    )`
  );
  console.log("   ✅ pipeline_stages");

  // Opportunity Stage History (via opportunities)
  await createPolicy(
    'opportunity_stage_history',
    'workspace_isolation',
    `rls_bypass_enabled() OR EXISTS (
      SELECT 1 FROM opportunities
      WHERE opportunities.id = opportunity_stage_history.opportunity_id
      AND opportunities.workspace_id = current_workspace_id()
    )`,
    `rls_bypass_enabled() OR EXISTS (
      SELECT 1 FROM opportunities
      WHERE opportunities.id = opportunity_stage_history.opportunity_id
      AND opportunities.workspace_id = current_workspace_id()
    )`
  );
  console.log("   ✅ opportunity_stage_history");

  // Lead Field Mappings (via lead_ingest_routes)
  await createPolicy(
    'lead_field_mappings',
    'workspace_isolation',
    `rls_bypass_enabled() OR EXISTS (
      SELECT 1 FROM lead_ingest_routes
      WHERE lead_ingest_routes.id = lead_field_mappings.route_id
      AND lead_ingest_routes.workspace_id = current_workspace_id()
    )`,
    `rls_bypass_enabled() OR EXISTS (
      SELECT 1 FROM lead_ingest_routes
      WHERE lead_ingest_routes.id = lead_field_mappings.route_id
      AND lead_ingest_routes.workspace_id = current_workspace_id()
    )`
  );
  console.log("   ✅ lead_field_mappings");

  // Lead Attribution (via contacts)
  await createPolicy(
    'lead_attribution',
    'workspace_isolation',
    `rls_bypass_enabled() OR EXISTS (
      SELECT 1 FROM contacts
      WHERE contacts.id = lead_attribution.contact_id
      AND contacts.workspace_id = current_workspace_id()
    )`,
    `rls_bypass_enabled() OR EXISTS (
      SELECT 1 FROM contacts
      WHERE contacts.id = lead_attribution.contact_id
      AND contacts.workspace_id = current_workspace_id()
    )`
  );
  console.log("   ✅ lead_attribution");
  console.log("");

  // ============================================
  // Step 7: Create policies for orgs (via membership)
  // ============================================
  console.log("📝 Creating org membership policies...");

  // Users can only see orgs they're a member of
  await createPolicy(
    'orgs',
    'membership_access',
    `rls_bypass_enabled() OR EXISTS (
      SELECT 1 FROM memberships
      WHERE memberships.org_id = orgs.id
      AND memberships.user_id = current_app_user_id()
    )`,
    `rls_bypass_enabled() OR EXISTS (
      SELECT 1 FROM memberships
      WHERE memberships.org_id = orgs.id
      AND memberships.user_id = current_app_user_id()
    )`
  );
  console.log("   ✅ orgs");
  console.log("");

  // ============================================
  // Step 8: Create policies for users (via shared org membership)
  // ============================================
  console.log("📝 Creating user visibility policies...");

  // Users can see themselves + other users in their orgs
  await createPolicy(
    'users',
    'user_visibility',
    `rls_bypass_enabled()
    OR users.id = current_app_user_id()
    OR EXISTS (
      SELECT 1 FROM memberships m1
      JOIN memberships m2 ON m1.org_id = m2.org_id
      WHERE m1.user_id = users.id
      AND m2.user_id = current_app_user_id()
    )`,
    `rls_bypass_enabled()
    OR users.id = current_app_user_id()`
  );
  console.log("   ✅ users");
  console.log("");

  // ============================================
  // Step 9: Create policies for webhook_events (admin/system only)
  // ============================================
  console.log("📝 Creating webhook_events policies...");

  // webhook_events are system-level, only accessible with bypass
  await createPolicy(
    'webhook_events',
    'admin_only',
    `rls_bypass_enabled()`,
    `rls_bypass_enabled()`
  );
  console.log("   ✅ webhook_events (admin only)");
  console.log("");

  // ============================================
  // Step 10: Verify indexes exist for RLS performance
  // ============================================
  console.log("📝 Creating indexes for RLS performance...");

  const indexes = [
    { name: 'idx_contacts_workspace_rls', table: 'contacts', column: 'workspace_id' },
    { name: 'idx_pipelines_workspace_rls', table: 'pipelines', column: 'workspace_id' },
    { name: 'idx_opportunities_workspace_rls', table: 'opportunities', column: 'workspace_id' },
    { name: 'idx_notes_workspace_rls', table: 'notes', column: 'workspace_id' },
    { name: 'idx_crm_settings_workspace_rls', table: 'crm_settings', column: 'workspace_id' },
    { name: 'idx_workspaces_org_rls', table: 'workspaces', column: 'org_id' },
    { name: 'idx_memberships_org_rls', table: 'memberships', column: 'org_id' },
  ];

  for (const idx of indexes) {
    try {
      await db.execute(sql.raw(`CREATE INDEX IF NOT EXISTS ${idx.name} ON ${idx.table}(${idx.column})`));
    } catch {
      // Index may already exist with different name
    }
  }
  console.log("   ✅ Indexes created/verified");
  console.log("");

  console.log("✅ RLS setup complete!\n");
  console.log("📋 Summary:");
  console.log("   • 22 tables with RLS enabled");
  console.log("   • Workspace isolation: 7 tables");
  console.log("   • Org isolation: 6 tables");
  console.log("   • Audit tables: 2 tables");
  console.log("   • Child tables: 4 tables");
  console.log("   • Membership-based: 2 tables (orgs, users)");
  console.log("   • System/Admin only: 1 table (webhook_events)\n");
  console.log("🔑 Usage:");
  console.log("   • Set context before queries: SET app.current_workspace_id = '123'");
  console.log("   • Bypass for admin: SET app.rls_bypass = 'true'\n");
}

setupRLS()
  .then(() => {
    console.log("Done!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Error setting up RLS:", error);
    process.exit(1);
  });
