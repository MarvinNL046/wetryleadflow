/**
 * Meta (Facebook) Lead Ads Integration
 *
 * This module provides integration with Facebook/Meta Lead Ads:
 * - OAuth connection flow
 * - Page and form management
 * - Webhook handling for real-time leads
 * - Lead retrieval and processing
 *
 * Required permissions:
 * - pages_show_list: List user's pages
 * - pages_read_engagement: Read page data
 * - leads_retrieval: Download lead data
 * - pages_manage_ads: Subscribe to webhooks
 */

export * from "./client";
export * from "./processor";
