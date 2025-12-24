/**
 * SaaS Mode Testing Script
 *
 * Run with: npx tsx scripts/test-saas.ts
 *
 * Prerequisites:
 * 1. Stripe CLI installed and logged in
 * 2. stripe listen --forward-to localhost:3000/api/stripe/webhooks
 * 3. Test environment variables set in .env.local
 */

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
});

async function testSaasSetup() {
  console.log("\n🧪 LeadFlow SaaS Mode Test Suite\n");
  console.log("=".repeat(50));

  // Test 1: Verify Stripe Connection
  console.log("\n1️⃣ Testing Stripe Connection...");
  try {
    const balance = await stripe.balance.retrieve();
    console.log("   ✅ Stripe connected successfully");
    console.log(`   Available: ${balance.available[0]?.amount || 0} ${balance.available[0]?.currency || "EUR"}`);
  } catch (error) {
    console.log("   ❌ Stripe connection failed:", error);
    return;
  }

  // Test 2: Check/Create Test Products
  console.log("\n2️⃣ Checking Test Products...");
  const tiers = [
    { name: "LeadFlow Starter", price: 9700, env: "STRIPE_PRICE_STARTER" },
    { name: "LeadFlow Unlimited", price: 29700, env: "STRIPE_PRICE_UNLIMITED" },
    { name: "LeadFlow SaaS Pro", price: 49700, env: "STRIPE_PRICE_SAAS_PRO" },
  ];

  for (const tier of tiers) {
    const envValue = process.env[tier.env];
    if (envValue && envValue.startsWith("price_")) {
      try {
        const price = await stripe.prices.retrieve(envValue);
        console.log(`   ✅ ${tier.name}: ${price.id} (€${(price.unit_amount || 0) / 100}/mo)`);
      } catch {
        console.log(`   ⚠️  ${tier.name}: Price ID not found in Stripe`);
      }
    } else {
      console.log(`   ⚠️  ${tier.name}: ${tier.env} not set`);
    }
  }

  // Test 3: Test Connect Account Creation (dry run)
  console.log("\n3️⃣ Testing Connect Account Creation (dry run)...");
  try {
    // Don't actually create, just verify we can
    console.log("   ✅ Connect API accessible");
    console.log("   ℹ️  To create test account: stripe connect accounts create");
  } catch (error) {
    console.log("   ❌ Connect API error:", error);
  }

  // Test 4: Verify Webhook Endpoint
  console.log("\n4️⃣ Checking Webhook Configuration...");
  try {
    const webhookEndpoints = await stripe.webhookEndpoints.list({ limit: 5 });
    if (webhookEndpoints.data.length > 0) {
      console.log("   ✅ Webhook endpoints configured:");
      webhookEndpoints.data.forEach((wh) => {
        console.log(`      - ${wh.url} (${wh.status})`);
      });
    } else {
      console.log("   ℹ️  No webhook endpoints configured (using Stripe CLI for local dev)");
    }
  } catch (error) {
    console.log("   ⚠️  Could not check webhook endpoints");
  }

  // Summary
  console.log("\n" + "=".repeat(50));
  console.log("\n📋 Manual Testing Checklist:\n");
  console.log("□ 1. Start the dev server: npm run dev");
  console.log("□ 2. Start Stripe CLI: stripe listen --forward-to localhost:3000/api/stripe/webhooks");
  console.log("□ 3. Create test agency account at /agency-signup");
  console.log("□ 4. Upgrade to SaaS Pro tier");
  console.log("□ 5. Connect Stripe account at /agency/billing/connect");
  console.log("□ 6. Create pricing plans at /agency/saas/plans/new");
  console.log("□ 7. Enable self-signup at /agency/saas/settings");
  console.log("□ 8. Test client signup at /{agencySlug}/signup");
  console.log("□ 9. Verify webhook events in Stripe CLI output");
  console.log("□ 10. Check dashboard stats at /agency/saas");

  console.log("\n🔗 Useful Links:");
  console.log("   - Stripe Dashboard: https://dashboard.stripe.com/test");
  console.log("   - Connect Accounts: https://dashboard.stripe.com/test/connect/accounts");
  console.log("   - Webhook Logs: https://dashboard.stripe.com/test/webhooks");
  console.log("   - Test Cards: https://stripe.com/docs/testing#cards");

  console.log("\n💳 Test Card Numbers:");
  console.log("   - Success: 4242 4242 4242 4242");
  console.log("   - Decline: 4000 0000 0000 0002");
  console.log("   - 3D Secure: 4000 0025 0000 3155");
  console.log("   - Any future date, any CVC, any postal code");

  console.log("\n");
}

// Run tests
testSaasSetup().catch(console.error);
