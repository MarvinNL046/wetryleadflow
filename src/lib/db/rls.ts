/**
 * RLS (Row Level Security) Context Helpers
 *
 * Since we use Neon HTTP (stateless), we need to set context variables
 * within each transaction. These helpers make it easy to run queries
 * with proper RLS context.
 */

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { sql } from "drizzle-orm";
import * as schema from "./schema";

export interface RLSContext {
  workspaceId: number;
  orgId: number;
  userId?: number;
}

/**
 * Get a database instance with RLS context set
 * Use this for queries that should be RLS-protected
 */
export async function withRLSContext<T>(
  context: RLSContext,
  callback: (db: ReturnType<typeof drizzle<typeof schema>>) => Promise<T>
): Promise<T> {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL environment variable is not set");
  }

  const sqlClient = neon(url);
  const db = drizzle(sqlClient, { schema });

  // Set RLS context variables
  await db.execute(sql`
    SELECT set_config('app.current_workspace_id', ${String(context.workspaceId)}, true);
  `);
  await db.execute(sql`
    SELECT set_config('app.current_org_id', ${String(context.orgId)}, true);
  `);
  if (context.userId) {
    await db.execute(sql`
      SELECT set_config('app.current_user_id', ${String(context.userId)}, true);
    `);
  }

  // Execute the callback with the context-aware db
  return callback(db);
}

/**
 * Get a database instance with RLS bypass enabled
 * Use this for admin operations, migrations, webhooks, etc.
 */
export async function withRLSBypass<T>(
  callback: (db: ReturnType<typeof drizzle<typeof schema>>) => Promise<T>
): Promise<T> {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL environment variable is not set");
  }

  const sqlClient = neon(url);
  const db = drizzle(sqlClient, { schema });

  // Enable RLS bypass
  await db.execute(sql`
    SELECT set_config('app.rls_bypass', 'true', true);
  `);

  // Execute the callback
  return callback(db);
}

/**
 * Check if RLS is enabled on a table
 */
export async function isRLSEnabled(tableName: string): Promise<boolean> {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL environment variable is not set");
  }

  const sqlClient = neon(url);
  const db = drizzle(sqlClient, { schema });

  const result = await db.execute(sql`
    SELECT relrowsecurity
    FROM pg_class
    WHERE relname = ${tableName}
  `);

  return (result.rows[0] as { relrowsecurity: boolean })?.relrowsecurity ?? false;
}

/**
 * List all tables with RLS enabled
 */
export async function listRLSTables(): Promise<string[]> {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL environment variable is not set");
  }

  const sqlClient = neon(url);
  const db = drizzle(sqlClient, { schema });

  const result = await db.execute(sql`
    SELECT relname
    FROM pg_class
    WHERE relrowsecurity = true
    AND relkind = 'r'
    ORDER BY relname
  `);

  return (result.rows as { relname: string }[]).map(row => row.relname);
}

/**
 * Test RLS is working by trying to access data without context
 * Returns true if RLS is properly blocking unauthorized access
 */
export async function testRLSBlocking(tableName: string): Promise<{
  blocking: boolean;
  message: string;
}> {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL environment variable is not set");
  }

  const sqlClient = neon(url);
  const db = drizzle(sqlClient, { schema });

  try {
    // Try to select without setting context
    const result = await db.execute(sql.raw(`SELECT COUNT(*) as count FROM ${tableName}`));
    const count = Number((result.rows[0] as { count: string }).count);

    if (count === 0) {
      return {
        blocking: true,
        message: `RLS is blocking: 0 rows returned without context`,
      };
    } else {
      return {
        blocking: false,
        message: `RLS may not be working: ${count} rows returned without context`,
      };
    }
  } catch (error) {
    return {
      blocking: true,
      message: `RLS blocking with error: ${(error as Error).message}`,
    };
  }
}
