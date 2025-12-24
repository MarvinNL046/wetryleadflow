import { chromium } from 'playwright';

const BASE_URL = 'http://localhost:3000';
const TIMESTAMP = Date.now();
const TEST_EMAIL = `test-agency-${TIMESTAMP}@example.com`;
const TEST_PASSWORD = 'TestPassword123!';
const UNIQUE_AGENCY_NAME = `Test Agency ${TIMESTAMP}`;

async function testAgencySignupFlow() {
  console.log('🚀 Starting Full Agency Signup Flow Test\n');
  console.log(`📧 Test email: ${TEST_EMAIL}`);
  console.log(`🏢 Agency name: ${UNIQUE_AGENCY_NAME}\n`);

  const browser = await chromium.launch({
    headless: false,
    slowMo: 100
  });

  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 }
  });

  const page = await context.newPage();

  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log(`   🔴 Console error: ${msg.text().substring(0, 100)}`);
    }
  });

  try {
    // Step 1-3: Navigate to signup
    console.log('📍 Step 1-3: Navigating through get-started to signup...');
    await page.goto(`${BASE_URL}/get-started`);
    await page.waitForLoadState('networkidle');

    await page.locator('button:has-text("Marketing Agency")').first().click();
    await page.waitForTimeout(300);

    await page.locator('button:has-text("Start Agency Trial")').first().click();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    console.log(`   ✅ On signup page: ${page.url()}\n`);

    // Step 4: Select Email & Password
    console.log('📍 Step 4: Filling Stack Auth signup form...');
    const emailPasswordBtn = await page.locator('button:has-text("Email & Password")').first();
    if (await emailPasswordBtn.isVisible()) {
      await emailPasswordBtn.click();
      await page.waitForTimeout(1000);
    }

    // Fill email
    await page.locator('input[type="email"]').first().fill(TEST_EMAIL);
    console.log(`   ✅ Email: ${TEST_EMAIL}`);

    // Fill both password fields
    const passwordInputs = await page.locator('input[type="password"]').all();
    if (passwordInputs.length >= 2) {
      await passwordInputs[0].fill(TEST_PASSWORD);
      await passwordInputs[1].fill(TEST_PASSWORD);
      console.log('   ✅ Password fields filled');
    }

    // Submit
    console.log('\n📍 Step 5: Creating Stack Auth account...');
    await page.locator('button[type="submit"]').first().click();
    await page.waitForTimeout(5000);
    await page.waitForLoadState('networkidle');

    const urlAfterSignup = page.url();
    console.log(`   ✅ Redirected to: ${urlAfterSignup}\n`);

    if (!urlAfterSignup.includes('/agency-signup')) {
      console.log('   ❌ Did not redirect to agency-signup');
      await page.screenshot({ path: '/tmp/agency-flow-error.png' });
      return;
    }

    // Step 6: Fill agency form
    console.log('📍 Step 6: Filling agency registration form...');
    await page.waitForTimeout(2000);

    // Fill agency name with unique name
    const nameInput = await page.locator('input#name').first();
    await nameInput.clear();
    await nameInput.fill(UNIQUE_AGENCY_NAME);
    console.log(`   ✅ Agency name: ${UNIQUE_AGENCY_NAME}`);

    // Wait for slug to auto-generate
    await page.waitForTimeout(1500);

    // Clear and manually set slug to ensure uniqueness
    const slugInput = await page.locator('input#slug').first();
    const uniqueSlug = `test-agency-${TIMESTAMP}`;
    await slugInput.clear();
    await slugInput.fill(uniqueSlug);
    console.log(`   ✅ Slug: ${uniqueSlug}`);

    // Wait for slug availability check
    console.log('   ⏳ Waiting for slug availability check...');
    await page.waitForTimeout(3000);

    // Check for green checkmark (slug available)
    const greenCheck = await page.locator('.text-green-500 svg, svg.text-green-500').first();
    const redX = await page.locator('.text-red-500 svg, svg.text-red-500').first();

    if (await greenCheck.isVisible()) {
      console.log('   ✅ Slug is available!');
    } else if (await redX.isVisible()) {
      console.log('   ❌ Slug is NOT available');
    } else {
      console.log('   ⚠️ Slug check status unknown');
    }

    await page.screenshot({ path: '/tmp/agency-flow-form-filled.png' });

    // Step 7: Submit agency form
    console.log('\n📍 Step 7: Creating agency...');

    const createBtn = await page.locator('button:has-text("Agency Aanmaken")').first();
    const btnText = await createBtn.textContent();
    const isDisabled = await createBtn.isDisabled();

    console.log(`   Button: "${btnText?.trim()}"`);
    console.log(`   Enabled: ${!isDisabled}`);

    if (!isDisabled) {
      await createBtn.click();
      console.log('   ✅ Clicked create button');

      await page.waitForTimeout(5000);
      await page.waitForLoadState('networkidle');

      const finalUrl = page.url();
      console.log(`\n📍 Final URL: ${finalUrl}`);

      await page.screenshot({ path: '/tmp/agency-flow-result.png' });

      if (finalUrl.includes('/agency/onboarding')) {
        console.log('\n🎉 SUCCESS! Agency created → Onboarding page!\n');
      } else if (finalUrl.includes('/agency')) {
        console.log('\n🎉 SUCCESS! Agency created → Dashboard!\n');
      }
    } else {
      console.log('   ❌ Button still disabled - checking form state...');

      // Debug: check all form values
      const nameVal = await nameInput.inputValue();
      const slugVal = await slugInput.inputValue();
      const emailVal = await page.locator('input#email').first().inputValue();

      console.log(`   Form values: name="${nameVal}", slug="${slugVal}", email="${emailVal}"`);

      // Check for error messages
      const errorText = await page.locator('.text-red-500, .text-red-600').allTextContents();
      if (errorText.length > 0) {
        console.log(`   Errors: ${errorText.join(', ')}`);
      }
    }

    await page.screenshot({ path: '/tmp/agency-flow-final.png', fullPage: true });
    console.log('\n✅ Screenshots saved to /tmp/agency-flow-*.png');

    console.log('\n⏳ Browser stays open for 15 seconds...');
    await page.waitForTimeout(15000);

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    await page.screenshot({ path: '/tmp/agency-flow-error.png' });
  } finally {
    await browser.close();
    console.log('\n🏁 Test completed');
  }
}

testAgencySignupFlow().catch(console.error);
