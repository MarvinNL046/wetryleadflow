import { config } from "dotenv";
config({ path: ".env.local" });

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { orgs, workspaces, users, memberships } from "./schema";

async function seed() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL environment variable is not set");
  }

  const sql = neon(process.env.DATABASE_URL);
  const db = drizzle(sql);

  console.log("Seeding database...");

  // 1. Create demo org
  const [org] = await db
    .insert(orgs)
    .values({
      name: "LeadFlow Demo",
      slug: "leadflow-demo",
    })
    .returning();
  console.log("Created org:", org.name);

  // 2. Create default workspace
  const [workspace] = await db
    .insert(workspaces)
    .values({
      orgId: org.id,
      name: "Default",
      slug: "default",
    })
    .returning();
  console.log("Created workspace:", workspace.name);

  // 3. Create demo user (replace externalId with your Stack Auth user ID later)
  const [user] = await db
    .insert(users)
    .values({
      externalId: "demo-user-001", // Replace with actual Stack Auth ID
      email: "demo@leadflow.com",
      name: "Demo User",
    })
    .returning();
  console.log("Created user:", user.email);

  // 4. Create membership (user as owner of org)
  const [membership] = await db
    .insert(memberships)
    .values({
      userId: user.id,
      orgId: org.id,
      role: "owner",
    })
    .returning();
  console.log("Created membership: user", user.id, "→ org", org.id, "as", membership.role);

  console.log("\nSeed completed!");
  console.log("Summary:");
  console.log(`  - Org: ${org.name} (id: ${org.id})`);
  console.log(`  - Workspace: ${workspace.name} (id: ${workspace.id})`);
  console.log(`  - User: ${user.email} (id: ${user.id})`);
  console.log(`  - Membership: ${membership.role}`);
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Seed failed:", err);
    process.exit(1);
  });
