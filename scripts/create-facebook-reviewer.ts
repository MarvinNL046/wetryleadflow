/**
 * Facebook Reviewer Account Setup
 *
 * Creates a demo account for Facebook App Review process.
 * Run with: npx tsx scripts/create-facebook-reviewer.ts
 */

import { config } from "dotenv";
config({ path: ".env.local" });

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";
import {
  orgs,
  workspaces,
  users,
  memberships,
  pipelines,
  pipelineStages,
  contacts,
  opportunities,
  crmSettings,
} from "../src/lib/db/schema";

// Facebook Reviewer Credentials
const REVIEWER_CONFIG = {
  email: "reviewer@leadflow.app",
  externalId: "facebook-reviewer-2025", // Will be replaced when they sign up via Stack Auth
  name: "Facebook Reviewer",
  orgName: "Demo Company BV",
  orgSlug: "demo-company-review",
  workspaceName: "Sales Team",
};

async function createFacebookReviewer() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL environment variable is not set");
  }

  const sql = neon(process.env.DATABASE_URL);
  const db = drizzle(sql);

  console.log("🔵 Creating Facebook Reviewer Account...\n");

  // Check if reviewer already exists
  const [existingUser] = await db
    .select()
    .from(users)
    .where(eq(users.email, REVIEWER_CONFIG.email))
    .limit(1);

  if (existingUser) {
    console.log("⚠️  Reviewer account already exists!");
    console.log(`   Email: ${REVIEWER_CONFIG.email}`);
    return;
  }

  // 1. Create demo org for reviewer
  console.log("📁 Creating organization...");
  const [org] = await db
    .insert(orgs)
    .values({
      name: REVIEWER_CONFIG.orgName,
      slug: REVIEWER_CONFIG.orgSlug,
    })
    .returning();
  console.log(`   ✅ ${org.name} (id: ${org.id})`);

  // 2. Create workspace
  console.log("📂 Creating workspace...");
  const [workspace] = await db
    .insert(workspaces)
    .values({
      orgId: org.id,
      name: REVIEWER_CONFIG.workspaceName,
      slug: "sales-team",
    })
    .returning();
  console.log(`   ✅ ${workspace.name} (id: ${workspace.id})`);

  // 3. Create reviewer user
  console.log("👤 Creating reviewer user...");
  const [user] = await db
    .insert(users)
    .values({
      externalId: REVIEWER_CONFIG.externalId,
      email: REVIEWER_CONFIG.email,
      name: REVIEWER_CONFIG.name,
    })
    .returning();
  console.log(`   ✅ ${user.email} (id: ${user.id})`);

  // 4. Create membership
  console.log("🔗 Creating membership...");
  await db.insert(memberships).values({
    userId: user.id,
    orgId: org.id,
    role: "owner",
  });
  console.log(`   ✅ ${user.name} is owner of ${org.name}`);

  // 5. Create CRM settings
  console.log("⚙️  Creating CRM settings...");
  await db.insert(crmSettings).values({
    workspaceId: workspace.id,
    autoFollowUpEnabled: true,
    followUpDays: 3,
    maxCallAttempts: 5,
  });
  console.log("   ✅ CRM settings configured");

  // 6. Create demo pipeline
  console.log("📊 Creating demo pipeline...");
  const [pipeline] = await db
    .insert(pipelines)
    .values({
      workspaceId: workspace.id,
      name: "Lead Opvolging",
    })
    .returning();
  console.log(`   ✅ ${pipeline.name}`);

  // 7. Create pipeline stages
  console.log("📈 Creating pipeline stages...");
  const stages = [
    { name: "Nieuw", order: 1, color: "#3B82F6" },
    { name: "Gebeld", order: 2, color: "#8B5CF6" },
    { name: "Afspraak", order: 3, color: "#F59E0B" },
    { name: "Offerte", order: 4, color: "#10B981" },
    { name: "Gewonnen", order: 5, color: "#22C55E" },
    { name: "Verloren", order: 6, color: "#EF4444" },
  ];

  const createdStages: { id: number; name: string }[] = [];
  for (const stage of stages) {
    const [created] = await db
      .insert(pipelineStages)
      .values({
        pipelineId: pipeline.id,
        name: stage.name,
        order: stage.order,
        color: stage.color,
      })
      .returning();
    createdStages.push(created);
    console.log(`   ✅ ${stage.name}`);
  }

  // 8. Create demo contacts
  console.log("👥 Creating demo contacts...");
  const demoContacts = [
    { firstName: "Jan", lastName: "de Vries", email: "jan@example.nl", phone: "+31612345678", status: "new" as const },
    { firstName: "Lisa", lastName: "Bakker", email: "lisa@example.nl", phone: "+31623456789", status: "contacted" as const },
    { firstName: "Peter", lastName: "Jansen", email: "peter@example.nl", phone: "+31634567890", status: "qualified" as const },
    { firstName: "Emma", lastName: "Visser", email: "emma@example.nl", phone: "+31645678901", status: "new" as const },
    { firstName: "Thomas", lastName: "Smit", email: "thomas@example.nl", phone: "+31656789012", status: "contacted" as const },
  ];

  for (const contact of demoContacts) {
    const [created] = await db
      .insert(contacts)
      .values({
        workspaceId: workspace.id,
        ...contact,
        source: "meta_lead_ad",
      })
      .returning();

    // Create opportunity for some contacts
    if (contact.status === "qualified") {
      await db.insert(opportunities).values({
        workspaceId: workspace.id,
        contactId: created.id,
        pipelineId: pipeline.id,
        stageId: createdStages[3].id, // Offerte stage
        title: `Deal met ${contact.firstName} ${contact.lastName}`,
        value: "2500.00",
        currency: "EUR",
        status: "open",
      });
    }
    console.log(`   ✅ ${contact.firstName} ${contact.lastName}`);
  }

  console.log("\n" + "=".repeat(60));
  console.log("✅ FACEBOOK REVIEWER ACCOUNT CREATED!");
  console.log("=".repeat(60));
  console.log("\n📋 REVIEWER INSTRUCTIONS:\n");
  console.log("1. Go to: https://wetryleadflow.com/handler/sign-up");
  console.log(`2. Sign up with email: ${REVIEWER_CONFIG.email}`);
  console.log("3. After sign-up, the account will be linked automatically");
  console.log("\n📊 PRE-CONFIGURED DATA:");
  console.log(`   • Organization: ${org.name}`);
  console.log(`   • Workspace: ${workspace.name}`);
  console.log(`   • Pipeline: ${pipeline.name} (6 stages)`);
  console.log(`   • Demo contacts: ${demoContacts.length}`);
  console.log("\n🔵 META LEAD ADS TESTING:");
  console.log("   • The reviewer can connect their Facebook Page");
  console.log("   • Submit a test lead via Facebook Lead Ads");
  console.log("   • The lead will appear in the CRM automatically");
  console.log("\n");
}

createFacebookReviewer()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("❌ Error:", err);
    process.exit(1);
  });
