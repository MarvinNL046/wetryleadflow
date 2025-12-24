/**
 * Setup script for Resend contact properties and segments
 *
 * Run this once to initialize your Resend account:
 * npx tsx scripts/setup-resend.ts
 *
 * Make sure RESEND_API_KEY is set in your environment
 */

import { Resend } from "resend";
import * as dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: ".env.local" });

const RESEND_API_KEY = process.env.RESEND_API_KEY;

if (!RESEND_API_KEY) {
  console.error("❌ RESEND_API_KEY is not set");
  process.exit(1);
}

const resend = new Resend(RESEND_API_KEY);

// ============================================
// Contact Properties to create
// ============================================
// String properties
const stringProperties = [
  { key: "user_name", fallbackValue: "Unknown" },
  { key: "signup_source", fallbackValue: "direct" },
  { key: "utm_source", fallbackValue: "" },
  { key: "utm_medium", fallbackValue: "" },
  { key: "utm_campaign", fallbackValue: "" },
  { key: "referrer", fallbackValue: "" },
  { key: "workspace_name", fallbackValue: "" },
  { key: "organization_name", fallbackValue: "" },
  { key: "user_role", fallbackValue: "member" },
  { key: "plan_type", fallbackValue: "free" },
  { key: "trial_ends_at", fallbackValue: "" },
  { key: "meta_connected", fallbackValue: "false" },
  { key: "signup_date", fallbackValue: "" },
  { key: "last_active", fallbackValue: "" },
  { key: "language", fallbackValue: "nl" },
  { key: "country", fallbackValue: "NL" },
];

// Number properties
const numberProperties = [
  { key: "total_leads", fallbackValue: 0 },
  { key: "total_deals", fallbackValue: 0 },
];

// ============================================
// Segments to create
// ============================================
const segments = [
  // By signup source
  "Direct Signups",
  "Google Signups",
  "GitHub Signups",
  "Invited Users",

  // By plan
  "Free Users",
  "Pro Users",
  "Enterprise Users",
  "Trial Users",

  // By engagement
  "Active Users",
  "Inactive Users",
  "Power Users",

  // By features
  "Meta Ads Connected",
  "No Integrations",

  // By role
  "Workspace Owners",
  "Team Members",

  // Lifecycle
  "New Users",
  "Onboarding",
  "Churned",
];

// ============================================
// Main setup function
// ============================================
async function setup() {
  console.log("🚀 Starting Resend setup...\n");

  // Step 1: Create Audience
  console.log("📋 Step 1: Creating Audience...");
  let audienceId: string | null = null;

  try {
    const { data: audiences } = await resend.audiences.list();
    const existingAudience = audiences?.data?.find(a => a.name === "LeadFlow Users");

    if (existingAudience) {
      audienceId = existingAudience.id;
      console.log(`   ✓ Audience already exists: ${audienceId}`);
    } else {
      const { data } = await resend.audiences.create({ name: "LeadFlow Users" });
      audienceId = data?.id || null;
      console.log(`   ✓ Created audience: ${audienceId}`);
    }
  } catch (error) {
    console.log(`   ⚠ Could not create/find audience:`, error);
  }

  // Step 2: Create Contact Properties
  console.log("\n📝 Step 2: Creating Contact Properties...");
  let propsCreated = 0;
  let propsSkipped = 0;

  // Create string properties
  for (const prop of stringProperties) {
    try {
      await resend.contactProperties.create({
        key: prop.key,
        type: "string",
        fallbackValue: prop.fallbackValue,
      });
      console.log(`   ✓ Created: ${prop.key} (string)`);
      propsCreated++;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      if (errorMessage.includes("already exists")) {
        console.log(`   - Skipped (exists): ${prop.key}`);
        propsSkipped++;
      } else {
        console.log(`   ✗ Failed: ${prop.key} -`, errorMessage);
      }
    }
  }

  // Create number properties
  for (const prop of numberProperties) {
    try {
      await resend.contactProperties.create({
        key: prop.key,
        type: "number",
        fallbackValue: prop.fallbackValue,
      });
      console.log(`   ✓ Created: ${prop.key} (number)`);
      propsCreated++;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      if (errorMessage.includes("already exists")) {
        console.log(`   - Skipped (exists): ${prop.key}`);
        propsSkipped++;
      } else {
        console.log(`   ✗ Failed: ${prop.key} -`, errorMessage);
      }
    }
  }

  console.log(`   Summary: ${propsCreated} created, ${propsSkipped} skipped`);

  // Step 3: Create Segments
  console.log("\n🏷️  Step 3: Creating Segments...");
  const segmentIds: Record<string, string> = {};
  let segsCreated = 0;
  let segsSkipped = 0;

  for (const segmentName of segments) {
    try {
      const { data } = await resend.segments.create({ name: segmentName });
      if (data?.id) {
        segmentIds[segmentName] = data.id;
        console.log(`   ✓ Created: ${segmentName} (${data.id})`);
        segsCreated++;
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      if (errorMessage.includes("already exists")) {
        console.log(`   - Skipped (exists): ${segmentName}`);
        segsSkipped++;
      } else {
        console.log(`   ✗ Failed: ${segmentName} -`, errorMessage);
      }
    }
  }
  console.log(`   Summary: ${segsCreated} created, ${segsSkipped} skipped`);

  // Step 4: Output configuration
  console.log("\n" + "=".repeat(50));
  console.log("✅ Setup Complete!\n");

  console.log("Add these to your .env.local:\n");
  console.log("```");
  if (audienceId) {
    console.log(`RESEND_AUDIENCE_ID="${audienceId}"`);
  }
  console.log("```\n");

  if (Object.keys(segmentIds).length > 0) {
    console.log("Segment IDs (save these for reference):");
    console.log(JSON.stringify(segmentIds, null, 2));
  }

  console.log("\n📊 View your contacts at: https://resend.com/audiences");
  console.log("🏷️  View your segments at: https://resend.com/segments");
}

// Run setup
setup().catch(console.error);
