/**
 * Meta Graph API Client
 * Handles communication with Facebook/Meta APIs
 */

const GRAPH_API_VERSION = "v21.0";
const GRAPH_API_BASE = `https://graph.facebook.com/${GRAPH_API_VERSION}`;

export interface MetaLeadField {
  name: string;
  values: string[];
}

export interface MetaLeadData {
  id: string;
  created_time: string;
  ad_id?: string;
  ad_name?: string;
  adset_id?: string;
  adset_name?: string;
  campaign_id?: string;
  campaign_name?: string;
  form_id?: string;
  is_organic?: boolean;
  platform?: string;
  field_data: MetaLeadField[];
}

export interface MetaPageInfo {
  id: string;
  name: string;
  access_token?: string;
}

export interface MetaFormInfo {
  id: string;
  name: string;
  status: string;
  questions?: Array<{
    key: string;
    label: string;
    type: string;
  }>;
}

/**
 * Fetch lead details from Meta Graph API
 * Requires page access token with leads_retrieval permission
 */
export async function fetchLeadDetails(
  leadgenId: string,
  pageAccessToken: string
): Promise<MetaLeadData> {
  const url = new URL(`${GRAPH_API_BASE}/${leadgenId}`);
  url.searchParams.set("access_token", pageAccessToken);
  url.searchParams.set(
    "fields",
    "id,created_time,ad_id,ad_name,adset_id,adset_name,campaign_id,campaign_name,form_id,is_organic,platform,field_data"
  );

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = await response.json();
    console.error("[Meta API] Error fetching lead:", error);
    throw new Error(
      `Failed to fetch lead: ${error.error?.message || response.statusText}`
    );
  }

  return response.json();
}

/**
 * Get pages the user has access to
 * Requires user access token with pages_show_list permission
 */
export async function fetchUserPages(userAccessToken: string): Promise<MetaPageInfo[]> {
  const url = new URL(`${GRAPH_API_BASE}/me/accounts`);
  url.searchParams.set("access_token", userAccessToken);
  url.searchParams.set("fields", "id,name,access_token");

  const response = await fetch(url.toString());

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Failed to fetch pages: ${error.error?.message}`);
  }

  const data = await response.json();
  return data.data || [];
}

/**
 * Get lead forms for a page
 * Requires page access token
 */
export async function fetchPageForms(
  pageId: string,
  pageAccessToken: string
): Promise<MetaFormInfo[]> {
  const url = new URL(`${GRAPH_API_BASE}/${pageId}/leadgen_forms`);
  url.searchParams.set("access_token", pageAccessToken);
  url.searchParams.set("fields", "id,name,status,questions");

  const response = await fetch(url.toString());

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Failed to fetch forms: ${error.error?.message}`);
  }

  const data = await response.json();
  return data.data || [];
}

/**
 * Subscribe a page to leadgen webhooks
 * This enables real-time lead notifications
 */
export async function subscribePageToLeadgen(
  pageId: string,
  pageAccessToken: string
): Promise<boolean> {
  const url = new URL(`${GRAPH_API_BASE}/${pageId}/subscribed_apps`);

  const response = await fetch(url.toString(), {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      access_token: pageAccessToken,
      subscribed_fields: "leadgen",
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Failed to subscribe to leadgen: ${error.error?.message}`);
  }

  const data = await response.json();
  return data.success === true;
}

/**
 * Unsubscribe a page from leadgen webhooks
 */
export async function unsubscribePageFromLeadgen(
  pageId: string,
  pageAccessToken: string
): Promise<boolean> {
  const url = new URL(`${GRAPH_API_BASE}/${pageId}/subscribed_apps`);
  url.searchParams.set("access_token", pageAccessToken);
  url.searchParams.set("subscribed_fields", "leadgen");

  const response = await fetch(url.toString(), {
    method: "DELETE",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Failed to unsubscribe from leadgen: ${error.error?.message}`);
  }

  const data = await response.json();
  return data.success === true;
}

/**
 * Exchange short-lived token for long-lived token
 * User tokens: valid for ~60 days
 * Page tokens: never expire (when obtained from long-lived user token)
 */
export async function exchangeForLongLivedToken(
  shortLivedToken: string
): Promise<{ access_token: string; expires_in?: number }> {
  const appId = process.env.META_APP_ID;
  const appSecret = process.env.META_APP_SECRET;

  if (!appId || !appSecret) {
    throw new Error("META_APP_ID and META_APP_SECRET must be configured");
  }

  const url = new URL(`${GRAPH_API_BASE}/oauth/access_token`);
  url.searchParams.set("grant_type", "fb_exchange_token");
  url.searchParams.set("client_id", appId);
  url.searchParams.set("client_secret", appSecret);
  url.searchParams.set("fb_exchange_token", shortLivedToken);

  const response = await fetch(url.toString());

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Failed to exchange token: ${error.error?.message}`);
  }

  return response.json();
}

/**
 * Get debug info for an access token
 * Useful for checking permissions and expiration
 */
export async function debugToken(
  accessToken: string
): Promise<{
  data: {
    app_id: string;
    user_id: string;
    expires_at: number;
    is_valid: boolean;
    scopes: string[];
  };
}> {
  const appToken = `${process.env.META_APP_ID}|${process.env.META_APP_SECRET}`;

  const url = new URL(`${GRAPH_API_BASE}/debug_token`);
  url.searchParams.set("input_token", accessToken);
  url.searchParams.set("access_token", appToken);

  const response = await fetch(url.toString());

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Failed to debug token: ${error.error?.message}`);
  }

  return response.json();
}

/**
 * Parse field_data from Meta lead into a simple key-value object
 */
export function parseLeadFields(
  fieldData: MetaLeadField[]
): Record<string, string> {
  const result: Record<string, string> = {};

  for (const field of fieldData) {
    // Meta returns values as an array, we take the first value
    result[field.name] = field.values[0] || "";
  }

  return result;
}
