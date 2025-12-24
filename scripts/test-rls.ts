/**
 * RLS Test Script
 *
 * Tests that Row Level Security is properly configured and working.
 *
 * Run with: npx tsx scripts/test-rls.ts
 */

import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { listRLSTables, testRLSBlocking, withRLSContext, withRLSBypass } from "../src/lib/db/rls";
import { db } from "../src/lib/db";
import { sql } from "drizzle-orm";

async function testRLS() {
  console.log("🔒 Testing Row Level Security (RLS)...\n");

  // ============================================
  // Step 1: List tables with RLS enabled
  // ============================================
  console.log("📋 Tables with RLS enabled:");
  try {
    const tables = await listRLSTables();
    if (tables.length === 0) {
      console.log("   ⚠️  No tables have RLS enabled. Run setup-rls.ts first.\n");
      return;
    }
    tables.forEach(t => console.log(`   ✅ ${t}`));
    console.log(`   Total: ${tables.length} tables\n`);
  } catch (error) {
    console.log(`   ❌ Error listing tables: ${(error as Error).message}\n`);
    return;
  }

  // ============================================
  // Step 2: Test that queries WITHOUT context return no data
  // ============================================
  console.log("🚫 Testing queries WITHOUT context (should be blocked):");

  const testTables = ['contacts', 'pipelines', 'opportunities'];
  for (const table of testTables) {
    const result = await testRLSBlocking(table);
    if (result.blocking) {
      console.log(`   ✅ ${table}: ${result.message}`);
    } else {
      console.log(`   ⚠️  ${table}: ${result.message}`);
    }
  }
  console.log("");

  // ============================================
  // Step 3: Test that queries WITH context work
  // ============================================
  console.log("✅ Testing queries WITH context:");

  // First, get a valid workspace ID from the database (with bypass)
  let testWorkspaceId: number | null = null;
  let testOrgId: number | null = null;

  try {
    const workspaceResult = await withRLSBypass(async (bypassDb) => {
      return bypassDb.execute(sql`SELECT id, org_id FROM workspaces LIMIT 1`);
    });

    if (workspaceResult.rows.length > 0) {
      const row = workspaceResult.rows[0] as { id: number; org_id: number };
      testWorkspaceId = row.id;
      testOrgId = row.org_id;
      console.log(`   Found test workspace: ID=${testWorkspaceId}, Org=${testOrgId}`);
    } else {
      console.log("   ⚠️  No workspaces found. Create some test data first.\n");
      return;
    }
  } catch (error) {
    console.log(`   ❌ Error getting workspace: ${(error as Error).message}\n`);
    return;
  }

  // Test querying with context
  if (testWorkspaceId && testOrgId) {
    try {
      const contactCount = await withRLSContext(
        { workspaceId: testWorkspaceId, orgId: testOrgId },
        async (rlsDb) => {
          const result = await rlsDb.execute(sql`SELECT COUNT(*) as count FROM contacts`);
          return Number((result.rows[0] as { count: string }).count);
        }
      );
      console.log(`   ✅ Contacts query with context: ${contactCount} rows returned`);

      const pipelineCount = await withRLSContext(
        { workspaceId: testWorkspaceId, orgId: testOrgId },
        async (rlsDb) => {
          const result = await rlsDb.execute(sql`SELECT COUNT(*) as count FROM pipelines`);
          return Number((result.rows[0] as { count: string }).count);
        }
      );
      console.log(`   ✅ Pipelines query with context: ${pipelineCount} rows returned`);
    } catch (error) {
      console.log(`   ❌ Error with context query: ${(error as Error).message}`);
    }
  }
  console.log("");

  // ============================================
  // Step 4: Test bypass mode
  // ============================================
  console.log("🔓 Testing RLS bypass mode:");

  try {
    const totalContacts = await withRLSBypass(async (bypassDb) => {
      const result = await bypassDb.execute(sql`SELECT COUNT(*) as count FROM contacts`);
      return Number((result.rows[0] as { count: string }).count);
    });
    console.log(`   ✅ Bypass mode works: ${totalContacts} total contacts in database`);
  } catch (error) {
    console.log(`   ❌ Bypass error: ${(error as Error).message}`);
  }
  console.log("");

  // ============================================
  // Step 5: Cross-tenant isolation test
  // ============================================
  console.log("🔐 Testing cross-tenant isolation:");

  try {
    // Get all workspaces
    const allWorkspaces = await withRLSBypass(async (bypassDb) => {
      const result = await bypassDb.execute(sql`
        SELECT w.id, w.name, w.org_id, COUNT(c.id) as contact_count
        FROM workspaces w
        LEFT JOIN contacts c ON c.workspace_id = w.id
        GROUP BY w.id, w.name, w.org_id
        ORDER BY w.id
        LIMIT 5
      `);
      return result.rows as { id: number; name: string; org_id: number; contact_count: string }[];
    });

    if (allWorkspaces.length < 2) {
      console.log("   ⚠️  Need at least 2 workspaces to test isolation");
    } else {
      console.log(`   Found ${allWorkspaces.length} workspaces to test`);

      for (const ws of allWorkspaces) {
        const countWithContext = await withRLSContext(
          { workspaceId: ws.id, orgId: ws.org_id },
          async (rlsDb) => {
            const result = await rlsDb.execute(sql`SELECT COUNT(*) as count FROM contacts`);
            return Number((result.rows[0] as { count: string }).count);
          }
        );

        const expected = Number(ws.contact_count);
        const status = countWithContext === expected ? "✅" : "❌";
        console.log(`   ${status} Workspace ${ws.id} (${ws.name}): ${countWithContext} contacts (expected: ${expected})`);
      }
    }
  } catch (error) {
    console.log(`   ❌ Error: ${(error as Error).message}`);
  }
  console.log("");

  console.log("✅ RLS testing complete!\n");
}

testRLS()
  .then(() => {
    console.log("Done!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Error testing RLS:", error);
    process.exit(1);
  });
