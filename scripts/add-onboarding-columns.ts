import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { db } from "../src/lib/db";
import { sql } from "drizzle-orm";

async function migrate() {
  console.log("Adding onboarding columns to crm_settings...");

  await db.execute(sql`
    ALTER TABLE crm_settings
    ADD COLUMN IF NOT EXISTS onboarding_completed BOOLEAN NOT NULL DEFAULT FALSE,
    ADD COLUMN IF NOT EXISTS onboarding_skipped BOOLEAN NOT NULL DEFAULT FALSE,
    ADD COLUMN IF NOT EXISTS onboarding_completed_at TIMESTAMP,
    ADD COLUMN IF NOT EXISTS onboarding_progress JSONB DEFAULT '{"currentStep": 0, "steps": {"welcome": false, "profile": false, "pipeline": false, "metaConnected": false}}'::jsonb
  `);

  console.log("✓ Migration complete!");
  process.exit(0);
}

migrate().catch((err) => {
  console.error(err);
  process.exit(1);
});
