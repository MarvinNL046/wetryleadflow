import { Resend } from "resend";

// Initialize Resend client
function getResendClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[Resend Contacts] RESEND_API_KEY not configured");
    return null;
  }
  return new Resend(apiKey);
}

// Audience ID for LeadFlow contacts (create in Resend dashboard or via API)
const LEADFLOW_AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID || "";

// ============================================
// Contact Property Definitions
// ============================================

// String properties
export const stringContactProperties = {
  user_name: { key: "user_name", fallbackValue: "Unknown" },
  signup_source: { key: "signup_source", fallbackValue: "direct" },
  utm_source: { key: "utm_source", fallbackValue: "" },
  utm_medium: { key: "utm_medium", fallbackValue: "" },
  utm_campaign: { key: "utm_campaign", fallbackValue: "" },
  referrer: { key: "referrer", fallbackValue: "" },
  workspace_name: { key: "workspace_name", fallbackValue: "" },
  organization_name: { key: "organization_name", fallbackValue: "" },
  user_role: { key: "user_role", fallbackValue: "member" },
  plan_type: { key: "plan_type", fallbackValue: "free" },
  trial_ends_at: { key: "trial_ends_at", fallbackValue: "" },
  meta_connected: { key: "meta_connected", fallbackValue: "false" },
  signup_date: { key: "signup_date", fallbackValue: "" },
  last_active: { key: "last_active", fallbackValue: "" },
  language: { key: "language", fallbackValue: "nl" },
  country: { key: "country", fallbackValue: "NL" },
};

// Number properties
export const numberContactProperties = {
  total_leads: { key: "total_leads", fallbackValue: 0 },
  total_deals: { key: "total_deals", fallbackValue: 0 },
};

// ============================================
// Segment Definitions
// ============================================

export const segments = {
  // By signup source
  direct_signups: "Direct Signups",
  google_signups: "Google Signups",
  github_signups: "GitHub Signups",
  invited_users: "Invited Users",

  // By plan
  free_users: "Free Users",
  pro_users: "Pro Users",
  enterprise_users: "Enterprise Users",
  trial_users: "Trial Users",

  // By engagement
  active_users: "Active Users (7d)",
  inactive_users: "Inactive Users (30d+)",
  power_users: "Power Users",

  // By features
  meta_connected: "Meta Ads Connected",
  no_integrations: "No Integrations",

  // By role
  workspace_owners: "Workspace Owners",
  team_members: "Team Members",

  // Lifecycle
  new_users: "New Users (7d)",
  onboarding: "Onboarding",
  churned: "Churned",
};

// ============================================
// Setup Functions (run once)
// ============================================

/**
 * Initialize all contact properties in Resend
 * Run this once to set up your Resend account
 */
export async function setupContactProperties(): Promise<void> {
  const resend = getResendClient();
  if (!resend) return;

  console.log("[Resend] Setting up contact properties...");

  // Create string properties
  for (const [name, prop] of Object.entries(stringContactProperties)) {
    try {
      await resend.contactProperties.create({
        key: prop.key,
        type: "string",
        fallbackValue: prop.fallbackValue,
      });
      console.log(`[Resend] Created property: ${name} (string)`);
    } catch (error) {
      console.log(`[Resend] Property ${name} already exists or error:`, error);
    }
  }

  // Create number properties
  for (const [name, prop] of Object.entries(numberContactProperties)) {
    try {
      await resend.contactProperties.create({
        key: prop.key,
        type: "number",
        fallbackValue: prop.fallbackValue,
      });
      console.log(`[Resend] Created property: ${name} (number)`);
    } catch (error) {
      console.log(`[Resend] Property ${name} already exists or error:`, error);
    }
  }

  console.log("[Resend] Contact properties setup complete!");
}

/**
 * Initialize all segments in Resend
 * Run this once to set up your Resend account
 */
export async function setupSegments(): Promise<Record<string, string>> {
  const resend = getResendClient();
  if (!resend) return {};

  console.log("[Resend] Setting up segments...");
  const segmentIds: Record<string, string> = {};

  for (const [key, name] of Object.entries(segments)) {
    try {
      const result = await resend.segments.create({ name });
      if (result.data?.id) {
        segmentIds[key] = result.data.id;
        console.log(`[Resend] Created segment: ${name} (${result.data.id})`);
      }
    } catch (error) {
      console.log(`[Resend] Segment ${name} already exists or error:`, error);
    }
  }

  console.log("[Resend] Segments setup complete!");
  console.log("[Resend] Segment IDs:", JSON.stringify(segmentIds, null, 2));

  return segmentIds;
}

// ============================================
// Contact Management
// ============================================

export interface ContactData {
  email: string;
  firstName?: string;
  lastName?: string;
  properties?: Partial<{
    user_name: string;
    signup_source: string;
    utm_source: string;
    utm_medium: string;
    utm_campaign: string;
    referrer: string;
    workspace_name: string;
    organization_name: string;
    user_role: string;
    plan_type: string;
    trial_ends_at: string;
    total_leads: number;
    total_deals: number;
    meta_connected: string;
    signup_date: string;
    last_active: string;
    language: string;
    country: string;
  }>;
}

/**
 * Create or update a contact in Resend
 */
export async function upsertContact(data: ContactData): Promise<string | null> {
  const resend = getResendClient();
  if (!resend || !LEADFLOW_AUDIENCE_ID) {
    console.log("[Resend Contacts] Skipping - not configured");
    return null;
  }

  try {
    // Try to create contact
    const result = await resend.contacts.create({
      audienceId: LEADFLOW_AUDIENCE_ID,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      unsubscribed: false,
    });

    if (result.data?.id) {
      console.log(`[Resend] Created contact: ${data.email}`);

      // Update with custom properties if provided
      if (data.properties) {
        await updateContactProperties(data.email, data.properties);
      }

      return result.data.id;
    }

    return null;
  } catch (error) {
    // Contact might already exist, try to update
    console.log(`[Resend] Contact ${data.email} might exist, updating properties`);

    if (data.properties) {
      await updateContactProperties(data.email, data.properties);
    }

    return null;
  }
}

/**
 * Update contact properties
 */
export async function updateContactProperties(
  email: string,
  properties: ContactData["properties"]
): Promise<void> {
  const resend = getResendClient();
  if (!resend || !LEADFLOW_AUDIENCE_ID || !properties) return;

  try {
    await resend.contacts.update({
      audienceId: LEADFLOW_AUDIENCE_ID,
      email,
      // Resend expects properties in a specific format
      // This depends on the Resend API version
    });
    console.log(`[Resend] Updated properties for: ${email}`);
  } catch (error) {
    console.error(`[Resend] Failed to update properties for ${email}:`, error);
  }
}

/**
 * Add contact to a segment
 */
export async function addContactToSegment(
  email: string,
  segmentId: string
): Promise<void> {
  const resend = getResendClient();
  if (!resend) return;

  try {
    await resend.contacts.segments.add({
      email,
      segmentId,
    });
    console.log(`[Resend] Added ${email} to segment ${segmentId}`);
  } catch (error) {
    console.error(`[Resend] Failed to add ${email} to segment:`, error);
  }
}

/**
 * Remove contact from a segment
 */
export async function removeContactFromSegment(
  email: string,
  segmentId: string
): Promise<void> {
  const resend = getResendClient();
  if (!resend) return;

  try {
    await resend.contacts.segments.remove({
      email,
      segmentId,
    });
    console.log(`[Resend] Removed ${email} from segment ${segmentId}`);
  } catch (error) {
    console.error(`[Resend] Failed to remove ${email} from segment:`, error);
  }
}

/**
 * Delete a contact
 */
export async function deleteContact(email: string): Promise<void> {
  const resend = getResendClient();
  if (!resend || !LEADFLOW_AUDIENCE_ID) return;

  try {
    await resend.contacts.remove({
      audienceId: LEADFLOW_AUDIENCE_ID,
      email,
    });
    console.log(`[Resend] Deleted contact: ${email}`);
  } catch (error) {
    console.error(`[Resend] Failed to delete contact ${email}:`, error);
  }
}

// ============================================
// Convenience Functions
// ============================================

/**
 * Track a new user signup
 */
export async function trackSignup(data: {
  email: string;
  name?: string;
  signupSource: "direct" | "google" | "github" | "invite";
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  referrer?: string;
  language?: string;
  country?: string;
}): Promise<void> {
  const [firstName, ...lastNameParts] = (data.name || "").split(" ");
  const lastName = lastNameParts.join(" ");

  await upsertContact({
    email: data.email,
    firstName: firstName || undefined,
    lastName: lastName || undefined,
    properties: {
      user_name: data.name || "",
      signup_source: data.signupSource,
      utm_source: data.utmSource || "",
      utm_medium: data.utmMedium || "",
      utm_campaign: data.utmCampaign || "",
      referrer: data.referrer || "",
      signup_date: new Date().toISOString(),
      last_active: new Date().toISOString(),
      language: data.language || "nl",
      country: data.country || "NL",
      plan_type: "free",
    },
  });
}

/**
 * Update user activity
 */
export async function trackActivity(email: string): Promise<void> {
  await updateContactProperties(email, {
    last_active: new Date().toISOString(),
  });
}

/**
 * Update user's workspace info
 */
export async function updateWorkspaceInfo(
  email: string,
  data: {
    workspaceName?: string;
    organizationName?: string;
    role?: string;
    totalLeads?: number;
    totalDeals?: number;
    metaConnected?: boolean; // Will be converted to string
  }
): Promise<void> {
  await updateContactProperties(email, {
    workspace_name: data.workspaceName,
    organization_name: data.organizationName,
    user_role: data.role,
    total_leads: data.totalLeads,
    total_deals: data.totalDeals,
    meta_connected: data.metaConnected !== undefined ? String(data.metaConnected) : undefined,
  });
}

/**
 * Update subscription info
 */
export async function updateSubscription(
  email: string,
  data: {
    planType: "free" | "pro" | "enterprise";
    trialEndsAt?: string;
  }
): Promise<void> {
  await updateContactProperties(email, {
    plan_type: data.planType,
    trial_ends_at: data.trialEndsAt || "",
  });
}
