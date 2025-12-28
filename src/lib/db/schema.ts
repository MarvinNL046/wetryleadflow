import {
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
  integer,
  pgEnum,
  uniqueIndex,
  index,
  decimal,
  jsonb,
  boolean,
  bigint,
  uuid,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Enums
export const roleEnum = pgEnum("role", ["owner", "admin", "member"]);
export const agencyRoleEnum = pgEnum("agency_role", ["owner", "admin", "member"]);
export const subscriptionStatusEnum = pgEnum("subscription_status", [
  "trialing",
  "active",
  "past_due",
  "canceled",
  "paused",
]);
export const agencyTierEnum = pgEnum("agency_tier", [
  "starter",
  "unlimited",
  "saas_pro",
]);
// User tiers for direct LeadFlow customers (ZZP/MKB)
export const userTierEnum = pgEnum("user_tier", [
  "free",      // Starter - gratis
  "pro",       // Pro - €29/maand
  "enterprise" // Enterprise - custom
]);
export const billingIntervalEnum = pgEnum("billing_interval", [
  "monthly",
  "yearly",
]);

// ============================================
// Agencies (Whitelabel Partners)
// ============================================
export const agencies = pgTable("agencies", {
  id: serial("id").primaryKey(),

  // Identifiers
  slug: varchar("slug", { length: 100 }).unique().notNull(),
  name: varchar("name", { length: 255 }).notNull(),

  // Branding
  logoUrl: varchar("logo_url", { length: 500 }),
  primaryColor: varchar("primary_color", { length: 7 }), // #8b5cf6
  secondaryColor: varchar("secondary_color", { length: 7 }),
  appName: varchar("app_name", { length: 100 }), // Custom app name instead of "LeadFlow"

  // Contact
  email: varchar("email", { length: 255 }).notNull(),
  website: varchar("website", { length: 255 }),

  // Billing (Stripe integration ready)
  stripeCustomerId: varchar("stripe_customer_id", { length: 255 }),
  subscriptionStatus: subscriptionStatusEnum("subscription_status").default("trialing"),

  // Settings
  maxOrgs: integer("max_orgs").default(10),
  isActive: boolean("is_active").default(true).notNull(),

  // SaaS Mode fields
  tier: agencyTierEnum("tier").default("starter").notNull(),
  stripePriceId: varchar("stripe_price_id", { length: 255 }),
  stripeSubscriptionId: varchar("stripe_subscription_id", { length: 255 }),
  saasMode: boolean("saas_mode").default(false).notNull(),

  // Onboarding
  onboardingCompleted: boolean("onboarding_completed").default(false).notNull(),

  // Timestamps
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => [
  index("agencies_slug_idx").on(table.slug),
  index("agencies_active_idx").on(table.isActive),
  index("agencies_tier_idx").on(table.tier),
]);

export const agenciesRelations = relations(agencies, ({ one, many }) => ({
  memberships: many(agencyMemberships),
  orgs: many(orgs),
  invites: many(agencyInvites),
  // SaaS Mode relations
  stripeAccount: one(agencyStripeAccounts),
  pricingPlans: many(agencyPricingPlans),
  clientSubscriptions: many(clientSubscriptions),
  saasSettings: one(agencySaasSettings),
  invoices: many(agencyInvoices),
}));

// ============================================
// Agency Memberships (User ↔ Agency ↔ Role)
// ============================================
export const agencyMemberships = pgTable("agency_memberships", {
  id: serial("id").primaryKey(),
  agencyId: integer("agency_id")
    .notNull()
    .references(() => agencies.id, { onDelete: "cascade" }),
  userId: varchar("user_id", { length: 255 }).notNull(), // Stack Auth user ID (external)

  role: agencyRoleEnum("role").default("member").notNull(),
  // owner: Full control, billing, branding
  // admin: Manage orgs and users
  // member: View only

  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => [
  uniqueIndex("agency_membership_user_agency_idx").on(table.agencyId, table.userId),
  index("agency_membership_user_idx").on(table.userId),
  index("agency_membership_agency_idx").on(table.agencyId),
]);

export const agencyMembershipsRelations = relations(agencyMemberships, ({ one }) => ({
  agency: one(agencies, {
    fields: [agencyMemberships.agencyId],
    references: [agencies.id],
  }),
}));

// ============================================
// Agency Invites
// ============================================
export const agencyInvites = pgTable("agency_invites", {
  id: serial("id").primaryKey(),
  agencyId: integer("agency_id")
    .notNull()
    .references(() => agencies.id, { onDelete: "cascade" }),
  email: varchar("email", { length: 255 }).notNull(),
  role: agencyRoleEnum("role").default("member").notNull(),
  token: varchar("token", { length: 255 }).unique().notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => [
  index("agency_invite_agency_idx").on(table.agencyId),
  index("agency_invite_email_idx").on(table.email),
  index("agency_invite_token_idx").on(table.token),
]);

export const agencyInvitesRelations = relations(agencyInvites, ({ one }) => ({
  agency: one(agencies, {
    fields: [agencyInvites.agencyId],
    references: [agencies.id],
  }),
}));

// ============================================
// Agency Stripe Connect Accounts (SaaS Mode)
// ============================================
export const stripeAccountTypeEnum = pgEnum("stripe_account_type", [
  "express",
  "standard",
]);

export const agencyStripeAccounts = pgTable("agency_stripe_accounts", {
  id: serial("id").primaryKey(),
  agencyId: integer("agency_id")
    .notNull()
    .unique()
    .references(() => agencies.id, { onDelete: "cascade" }),
  // Stripe Connect account
  stripeAccountId: varchar("stripe_account_id", { length: 255 }).notNull().unique(),
  stripeAccountType: stripeAccountTypeEnum("stripe_account_type").default("express").notNull(),
  // Account status
  chargesEnabled: boolean("charges_enabled").default(false).notNull(),
  payoutsEnabled: boolean("payouts_enabled").default(false).notNull(),
  detailsSubmitted: boolean("details_submitted").default(false).notNull(),
  onboardingComplete: boolean("onboarding_complete").default(false).notNull(),
  // Timestamps
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => [
  index("agency_stripe_account_agency_idx").on(table.agencyId),
]);

export const agencyStripeAccountsRelations = relations(agencyStripeAccounts, ({ one }) => ({
  agency: one(agencies, {
    fields: [agencyStripeAccounts.agencyId],
    references: [agencies.id],
  }),
}));

// ============================================
// Agency Pricing Plans (SaaS Mode)
// ============================================
export const agencyPricingPlans = pgTable("agency_pricing_plans", {
  id: serial("id").primaryKey(),
  agencyId: integer("agency_id")
    .notNull()
    .references(() => agencies.id, { onDelete: "cascade" }),
  // Plan details
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  // Pricing
  priceMonthly: decimal("price_monthly", { precision: 10, scale: 2 }).notNull(),
  priceYearly: decimal("price_yearly", { precision: 10, scale: 2 }),
  currency: varchar("currency", { length: 3 }).default("EUR").notNull(),
  // Stripe IDs (synced to agency's Connect account)
  stripeProductId: varchar("stripe_product_id", { length: 255 }),
  stripePriceIdMonthly: varchar("stripe_price_id_monthly", { length: 255 }),
  stripePriceIdYearly: varchar("stripe_price_id_yearly", { length: 255 }),
  // Features & limits
  features: jsonb("features").$type<string[]>().default([]),
  maxContacts: integer("max_contacts"),
  maxPipelines: integer("max_pipelines"),
  maxUsers: integer("max_users"),
  // Display
  isActive: boolean("is_active").default(true).notNull(),
  isDefault: boolean("is_default").default(false).notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
  // Timestamps
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => [
  index("agency_pricing_plan_agency_idx").on(table.agencyId),
  index("agency_pricing_plan_active_idx").on(table.isActive),
]);

export const agencyPricingPlansRelations = relations(agencyPricingPlans, ({ one, many }) => ({
  agency: one(agencies, {
    fields: [agencyPricingPlans.agencyId],
    references: [agencies.id],
  }),
  subscriptions: many(clientSubscriptions),
}));

// ============================================
// Client Subscriptions (SaaS Mode)
// ============================================
export const clientSubscriptionStatusEnum = pgEnum("client_subscription_status", [
  "trialing",
  "active",
  "past_due",
  "canceled",
  "incomplete",
]);

export const clientSubscriptions = pgTable("client_subscriptions", {
  id: serial("id").primaryKey(),
  orgId: integer("org_id")
    .notNull()
    .unique()
    .references(() => orgs.id, { onDelete: "cascade" }),
  agencyId: integer("agency_id")
    .notNull()
    .references(() => agencies.id, { onDelete: "cascade" }),
  planId: integer("plan_id")
    .notNull()
    .references(() => agencyPricingPlans.id),
  // Stripe subscription (on agency's Connect account)
  stripeSubscriptionId: varchar("stripe_subscription_id", { length: 255 }),
  stripeCustomerId: varchar("stripe_customer_id", { length: 255 }),
  // Status
  status: clientSubscriptionStatusEnum("status").default("trialing").notNull(),
  // Billing period
  billingInterval: billingIntervalEnum("billing_interval").default("monthly").notNull(),
  currentPeriodStart: timestamp("current_period_start"),
  currentPeriodEnd: timestamp("current_period_end"),
  cancelAtPeriodEnd: boolean("cancel_at_period_end").default(false).notNull(),
  // Timestamps
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => [
  index("client_subscription_org_idx").on(table.orgId),
  index("client_subscription_agency_idx").on(table.agencyId),
  index("client_subscription_status_idx").on(table.status),
]);

export const clientSubscriptionsRelations = relations(clientSubscriptions, ({ one }) => ({
  org: one(orgs, {
    fields: [clientSubscriptions.orgId],
    references: [orgs.id],
  }),
  agency: one(agencies, {
    fields: [clientSubscriptions.agencyId],
    references: [agencies.id],
  }),
  plan: one(agencyPricingPlans, {
    fields: [clientSubscriptions.planId],
    references: [agencyPricingPlans.id],
  }),
}));

// ============================================
// Agency SaaS Settings (SaaS Mode)
// ============================================
export const agencySaasSettings = pgTable("agency_saas_settings", {
  id: serial("id").primaryKey(),
  agencyId: integer("agency_id")
    .notNull()
    .unique()
    .references(() => agencies.id, { onDelete: "cascade" }),
  // Feature toggles
  saasEnabled: boolean("saas_enabled").default(false).notNull(),
  selfSignupEnabled: boolean("self_signup_enabled").default(true).notNull(),
  requirePaymentOnSignup: boolean("require_payment_on_signup").default(false).notNull(),
  // Trial settings
  trialDays: integer("trial_days").default(14).notNull(),
  // Signup page customization
  signupPageTitle: varchar("signup_page_title", { length: 255 }),
  signupPageDescription: text("signup_page_description"),
  // Legal
  termsUrl: varchar("terms_url", { length: 500 }),
  privacyUrl: varchar("privacy_url", { length: 500 }),
  // Custom styling
  customCss: text("custom_css"),
  // Timestamps
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => [
  index("agency_saas_settings_agency_idx").on(table.agencyId),
]);

export const agencySaasSettingsRelations = relations(agencySaasSettings, ({ one }) => ({
  agency: one(agencies, {
    fields: [agencySaasSettings.agencyId],
    references: [agencies.id],
  }),
}));

// ============================================
// Agency Invoices (SaaS Mode - tracking only)
// ============================================
export const agencyInvoiceStatusEnum = pgEnum("agency_invoice_status", [
  "draft",
  "open",
  "paid",
  "uncollectible",
  "void",
]);

export const agencyInvoices = pgTable("agency_invoices", {
  id: serial("id").primaryKey(),
  agencyId: integer("agency_id")
    .notNull()
    .references(() => agencies.id, { onDelete: "cascade" }),
  orgId: integer("org_id")
    .notNull()
    .references(() => orgs.id, { onDelete: "cascade" }),
  // Stripe invoice
  stripeInvoiceId: varchar("stripe_invoice_id", { length: 255 }).notNull().unique(),
  // Amount
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  currency: varchar("currency", { length: 3 }).default("EUR").notNull(),
  // Status
  status: agencyInvoiceStatusEnum("status").default("draft").notNull(),
  invoiceUrl: varchar("invoice_url", { length: 500 }),
  invoicePdfUrl: varchar("invoice_pdf_url", { length: 500 }),
  // Timestamps
  paidAt: timestamp("paid_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => [
  index("agency_invoice_agency_idx").on(table.agencyId),
  index("agency_invoice_org_idx").on(table.orgId),
  index("agency_invoice_status_idx").on(table.status),
]);

export const agencyInvoicesRelations = relations(agencyInvoices, ({ one }) => ({
  agency: one(agencies, {
    fields: [agencyInvoices.agencyId],
    references: [agencies.id],
  }),
  org: one(orgs, {
    fields: [agencyInvoices.orgId],
    references: [orgs.id],
  }),
}));

// ============================================
// Organizations (Tenants)
// ============================================
export const orgs = pgTable("orgs", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  // Agency reference (nullable for direct LeadFlow customers)
  agencyId: integer("agency_id").references(() => agencies.id, { onDelete: "set null" }),
  // Direct user subscription (for ZZP/MKB - only used when agencyId is null)
  subscriptionStatus: subscriptionStatusEnum("subscription_status").default("trialing"),
  subscriptionTier: userTierEnum("subscription_tier").default("free"),
  stripeSubscriptionId: varchar("stripe_subscription_id", { length: 255 }),
  // Client billing (for SaaS Mode - billed by agency)
  billingEmail: varchar("billing_email", { length: 255 }),
  stripeCustomerId: varchar("stripe_customer_id", { length: 255 }), // Customer on agency's Stripe Connect account
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => [
  index("orgs_agency_idx").on(table.agencyId),
  index("orgs_subscription_status_idx").on(table.subscriptionStatus),
  index("orgs_subscription_tier_idx").on(table.subscriptionTier),
]);

export const orgsRelations = relations(orgs, ({ one, many }) => ({
  agency: one(agencies, {
    fields: [orgs.agencyId],
    references: [agencies.id],
  }),
  workspaces: many(workspaces),
  memberships: many(memberships),
}));

// ============================================
// Workspaces (Sub-accounts within orgs)
// ============================================
export const workspaces = pgTable("workspaces", {
  id: serial("id").primaryKey(),
  orgId: integer("org_id")
    .notNull()
    .references(() => orgs.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => [
  uniqueIndex("workspace_org_slug_idx").on(table.orgId, table.slug),
]);

export const workspacesRelations = relations(workspaces, ({ one }) => ({
  org: one(orgs, {
    fields: [workspaces.orgId],
    references: [orgs.id],
  }),
}));

// ============================================
// Users (linked to external auth provider)
// ============================================
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  externalId: varchar("external_id", { length: 255 }).notNull().unique(), // Stack Auth user ID
  email: varchar("email", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }),
  avatarUrl: text("avatar_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  memberships: many(memberships),
}));

// ============================================
// Memberships (User ↔ Org ↔ Role)
// ============================================
export const memberships = pgTable("memberships", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  orgId: integer("org_id")
    .notNull()
    .references(() => orgs.id, { onDelete: "cascade" }),
  role: roleEnum("role").notNull().default("member"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => [
  uniqueIndex("membership_user_org_idx").on(table.userId, table.orgId),
]);

export const membershipsRelations = relations(memberships, ({ one }) => ({
  user: one(users, {
    fields: [memberships.userId],
    references: [users.id],
  }),
  org: one(orgs, {
    fields: [memberships.orgId],
    references: [orgs.id],
  }),
}));

// ============================================
// CRM: Contacts
// ============================================
export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  workspaceId: integer("workspace_id")
    .notNull()
    .references(() => workspaces.id, { onDelete: "cascade" }),
  firstName: varchar("first_name", { length: 255 }),
  lastName: varchar("last_name", { length: 255 }),
  email: varchar("email", { length: 255 }),
  phone: varchar("phone", { length: 50 }),
  company: varchar("company", { length: 255 }),
  position: varchar("position", { length: 255 }),
  // Address fields
  street: varchar("street", { length: 255 }),
  houseNumber: varchar("house_number", { length: 20 }),
  houseNumberAddition: varchar("house_number_addition", { length: 10 }),
  postalCode: varchar("postal_code", { length: 20 }),
  city: varchar("city", { length: 255 }),
  province: varchar("province", { length: 255 }),
  country: varchar("country", { length: 100 }).default("Nederland"),
  // Call tracking
  callCount: integer("call_count").notNull().default(0),
  lastCallAt: timestamp("last_call_at"),
  lastCallResult: varchar("last_call_result", { length: 50 }), // "answered", "not_answered", etc.
  // Follow-up scheduling
  nextFollowUpAt: timestamp("next_follow_up_at"), // When to call again
  followUpEmailSent: boolean("follow_up_email_sent").default(false), // Track if 3-call email was sent
  // Outside area / resale tracking
  outsideArea: boolean("outside_area").default(false), // Lead is outside service area
  forResale: boolean("for_resale").default(false), // Available for resale to other businesses
  resaleStatus: varchar("resale_status", { length: 50 }), // "available", "pending", "sold"
  resaleSoldAt: timestamp("resale_sold_at"), // When lead was sold
  resaleNotes: text("resale_notes"), // Notes for resale
  createdById: integer("created_by_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => [
  index("contact_workspace_idx").on(table.workspaceId),
  index("contact_email_idx").on(table.email),
]);

export const contactsRelations = relations(contacts, ({ one, many }) => ({
  workspace: one(workspaces, {
    fields: [contacts.workspaceId],
    references: [workspaces.id],
  }),
  createdBy: one(users, {
    fields: [contacts.createdById],
    references: [users.id],
  }),
  opportunities: many(opportunities),
  notes: many(notes),
  leadAttribution: one(leadAttribution),
}));

// ============================================
// CRM: Pipelines
// ============================================
export const pipelines = pgTable("pipelines", {
  id: serial("id").primaryKey(),
  workspaceId: integer("workspace_id")
    .notNull()
    .references(() => workspaces.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => [
  index("pipeline_workspace_idx").on(table.workspaceId),
]);

export const pipelinesRelations = relations(pipelines, ({ one, many }) => ({
  workspace: one(workspaces, {
    fields: [pipelines.workspaceId],
    references: [workspaces.id],
  }),
  stages: many(pipelineStages),
  opportunities: many(opportunities),
}));

// ============================================
// CRM: Pipeline Stages
// ============================================
export const pipelineStages = pgTable("pipeline_stages", {
  id: serial("id").primaryKey(),
  pipelineId: integer("pipeline_id")
    .notNull()
    .references(() => pipelines.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 255 }).notNull(),
  order: integer("order").notNull().default(0),
  color: varchar("color", { length: 7 }).default("#6366f1"), // hex color
  // Follow-up automation
  followUpDays: integer("follow_up_days"), // Days after which to send follow-up reminder (null = disabled)
  followUpEnabled: boolean("follow_up_enabled").default(false).notNull(),
  // Stage behavior
  isFinalAttempt: boolean("is_final_attempt").default(false).notNull(), // If true, next follow-up moves to Lost
  sendEmailOnLost: boolean("send_email_on_lost").default(false).notNull(), // Send email when moving to Lost from this stage
  autoMoveToLost: boolean("auto_move_to_lost").default(false).notNull(), // Auto-move to Lost after follow-up period
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => [
  index("stage_pipeline_idx").on(table.pipelineId),
  index("stage_order_idx").on(table.pipelineId, table.order),
]);

export const pipelineStagesRelations = relations(pipelineStages, ({ one, many }) => ({
  pipeline: one(pipelines, {
    fields: [pipelineStages.pipelineId],
    references: [pipelines.id],
  }),
  opportunities: many(opportunities),
}));

// ============================================
// CRM: Opportunities
// ============================================
export const opportunities = pgTable("opportunities", {
  id: serial("id").primaryKey(),
  workspaceId: integer("workspace_id")
    .notNull()
    .references(() => workspaces.id, { onDelete: "cascade" }),
  pipelineId: integer("pipeline_id")
    .notNull()
    .references(() => pipelines.id, { onDelete: "cascade" }),
  stageId: integer("stage_id")
    .notNull()
    .references(() => pipelineStages.id),
  contactId: integer("contact_id")
    .references(() => contacts.id, { onDelete: "set null" }),
  title: varchar("title", { length: 255 }).notNull(),
  value: decimal("value", { precision: 12, scale: 2 }),
  currency: varchar("currency", { length: 3 }).default("EUR"),
  expectedCloseDate: timestamp("expected_close_date"),
  assignedToId: integer("assigned_to_id").references(() => users.id),
  createdById: integer("created_by_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => [
  index("opportunity_workspace_idx").on(table.workspaceId),
  index("opportunity_pipeline_idx").on(table.pipelineId),
  index("opportunity_stage_idx").on(table.stageId),
  index("opportunity_contact_idx").on(table.contactId),
]);

export const opportunitiesRelations = relations(opportunities, ({ one, many }) => ({
  workspace: one(workspaces, {
    fields: [opportunities.workspaceId],
    references: [workspaces.id],
  }),
  pipeline: one(pipelines, {
    fields: [opportunities.pipelineId],
    references: [pipelines.id],
  }),
  stage: one(pipelineStages, {
    fields: [opportunities.stageId],
    references: [pipelineStages.id],
  }),
  contact: one(contacts, {
    fields: [opportunities.contactId],
    references: [contacts.id],
  }),
  assignedTo: one(users, {
    fields: [opportunities.assignedToId],
    references: [users.id],
  }),
  createdBy: one(users, {
    fields: [opportunities.createdById],
    references: [users.id],
  }),
  stageHistory: many(opportunityStageHistory),
  notes: many(notes),
}));

// ============================================
// CRM: Opportunity Stage History
// ============================================
export const opportunityStageHistory = pgTable("opportunity_stage_history", {
  id: serial("id").primaryKey(),
  opportunityId: integer("opportunity_id")
    .notNull()
    .references(() => opportunities.id, { onDelete: "cascade" }),
  fromStageId: integer("from_stage_id").references(() => pipelineStages.id),
  toStageId: integer("to_stage_id")
    .notNull()
    .references(() => pipelineStages.id),
  movedById: integer("moved_by_id").references(() => users.id),
  movedAt: timestamp("moved_at").defaultNow().notNull(),
}, (table) => [
  index("opportunity_history_idx").on(table.opportunityId),
  index("opportunity_history_moved_at_idx").on(table.movedAt),
]);

export const opportunityStageHistoryRelations = relations(opportunityStageHistory, ({ one }) => ({
  opportunity: one(opportunities, {
    fields: [opportunityStageHistory.opportunityId],
    references: [opportunities.id],
  }),
  fromStage: one(pipelineStages, {
    fields: [opportunityStageHistory.fromStageId],
    references: [pipelineStages.id],
  }),
  toStage: one(pipelineStages, {
    fields: [opportunityStageHistory.toStageId],
    references: [pipelineStages.id],
  }),
  movedBy: one(users, {
    fields: [opportunityStageHistory.movedById],
    references: [users.id],
  }),
}));

// ============================================
// CRM: Notes
// ============================================
export const noteTypeEnum = pgEnum("note_type", ["contact", "opportunity"]);

export const notes = pgTable("notes", {
  id: serial("id").primaryKey(),
  workspaceId: integer("workspace_id")
    .notNull()
    .references(() => workspaces.id, { onDelete: "cascade" }),
  type: noteTypeEnum("type").notNull(),
  contactId: integer("contact_id").references(() => contacts.id, { onDelete: "cascade" }),
  opportunityId: integer("opportunity_id").references(() => opportunities.id, { onDelete: "cascade" }),
  content: text("content").notNull(),
  createdById: integer("created_by_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => [
  index("note_workspace_idx").on(table.workspaceId),
  index("note_contact_idx").on(table.contactId),
  index("note_opportunity_idx").on(table.opportunityId),
]);

export const notesRelations = relations(notes, ({ one }) => ({
  workspace: one(workspaces, {
    fields: [notes.workspaceId],
    references: [workspaces.id],
  }),
  contact: one(contacts, {
    fields: [notes.contactId],
    references: [contacts.id],
  }),
  opportunity: one(opportunities, {
    fields: [notes.opportunityId],
    references: [opportunities.id],
  }),
  createdBy: one(users, {
    fields: [notes.createdById],
    references: [users.id],
  }),
}));

// ============================================
// CRM Settings (per workspace configuration)
// ============================================
export const crmSettings = pgTable("crm_settings", {
  id: serial("id").primaryKey(),
  workspaceId: integer("workspace_id")
    .notNull()
    .references(() => workspaces.id, { onDelete: "cascade" })
    .unique(), // One settings record per workspace
  // Follow-up configuration
  autoFollowUpEnabled: boolean("auto_follow_up_enabled").notNull().default(false),
  followUpDays: integer("follow_up_days").notNull().default(0), // Days before moving back to Lead (0 = disabled)
  maxCallAttempts: integer("max_call_attempts").notNull().default(0), // Attempts before Lost (0 = disabled)
  sendEmailOnLost: boolean("send_email_on_lost").notNull().default(false),
  // Callback periods (JSON array of { days: number, label: string, enabled: boolean })
  callbackPeriods: jsonb("callback_periods").$type<Array<{
    days: number;
    label: string;
    enabled: boolean;
  }>>().notNull().default([]),
  // Onboarding state
  onboardingCompleted: boolean("onboarding_completed").notNull().default(false),
  onboardingSkipped: boolean("onboarding_skipped").notNull().default(false),
  onboardingCompletedAt: timestamp("onboarding_completed_at"),
  onboardingProgress: jsonb("onboarding_progress").$type<{
    currentStep: number;
    steps: {
      welcome: boolean;
      profile: boolean;
      pipeline: boolean;
      metaConnected: boolean;
    };
    companyName?: string;
    businessType?: "products" | "services" | "both";
  }>().default({
    currentStep: 0,
    steps: {
      welcome: false,
      profile: false,
      pipeline: false,
      metaConnected: false,
    },
  }),
  // Timestamps
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => [
  index("crm_settings_workspace_idx").on(table.workspaceId),
]);

export const crmSettingsRelations = relations(crmSettings, ({ one }) => ({
  workspace: one(workspaces, {
    fields: [crmSettings.workspaceId],
    references: [workspaces.id],
  }),
}));

// ============================================
// Audit Log (append-only)
// ============================================
export const auditLog = pgTable("audit_log", {
  id: serial("id").primaryKey(),
  // Scope
  orgId: integer("org_id").references(() => orgs.id, { onDelete: "cascade" }),
  workspaceId: integer("workspace_id").references(() => workspaces.id, { onDelete: "cascade" }),
  // Actor
  userId: integer("user_id").references(() => users.id, { onDelete: "set null" }),
  userEmail: varchar("user_email", { length: 255 }), // Denormalized for history
  // Action
  action: varchar("action", { length: 100 }).notNull(), // e.g., "opportunity.moved", "contact.created"
  // Target entity
  entityType: varchar("entity_type", { length: 50 }).notNull(), // e.g., "opportunity", "contact", "user"
  entityId: integer("entity_id"),
  // Details
  metadata: jsonb("metadata"), // Action-specific data (old values, new values, etc.)
  // Request context (for security auditing)
  ipAddress: varchar("ip_address", { length: 45 }),
  userAgent: text("user_agent"),
  // Timestamp (append-only, no updatedAt)
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => [
  index("audit_org_idx").on(table.orgId),
  index("audit_workspace_idx").on(table.workspaceId),
  index("audit_user_idx").on(table.userId),
  index("audit_action_idx").on(table.action),
  index("audit_entity_idx").on(table.entityType, table.entityId),
  index("audit_created_at_idx").on(table.createdAt),
]);

export const auditLogRelations = relations(auditLog, ({ one }) => ({
  org: one(orgs, {
    fields: [auditLog.orgId],
    references: [orgs.id],
  }),
  workspace: one(workspaces, {
    fields: [auditLog.workspaceId],
    references: [workspaces.id],
  }),
  user: one(users, {
    fields: [auditLog.userId],
    references: [users.id],
  }),
}));

// ============================================
// Outbox Events (for automations)
// ============================================
export const outboxEventStatusEnum = pgEnum("outbox_event_status", [
  "pending",
  "processing",
  "completed",
  "failed",
]);

export const outboxEvents = pgTable("outbox_events", {
  id: serial("id").primaryKey(),
  // Scope
  orgId: integer("org_id")
    .notNull()
    .references(() => orgs.id, { onDelete: "cascade" }),
  workspaceId: integer("workspace_id")
    .notNull()
    .references(() => workspaces.id, { onDelete: "cascade" }),
  // Event details
  eventType: varchar("event_type", { length: 100 }).notNull(), // e.g., "opportunity.moved", "contact.created"
  entityType: varchar("entity_type", { length: 50 }).notNull(),
  entityId: integer("entity_id").notNull(),
  // Payload
  payload: jsonb("payload").notNull(), // Full event data for processing
  // Processing state
  status: outboxEventStatusEnum("status").notNull().default("pending"),
  attempts: integer("attempts").notNull().default(0),
  maxAttempts: integer("max_attempts").notNull().default(3),
  lastError: text("last_error"),
  // Scheduling
  scheduledFor: timestamp("scheduled_for").defaultNow().notNull(),
  processedAt: timestamp("processed_at"),
  // Timestamps
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => [
  index("outbox_status_idx").on(table.status),
  index("outbox_scheduled_idx").on(table.scheduledFor),
  index("outbox_org_idx").on(table.orgId),
  index("outbox_workspace_idx").on(table.workspaceId),
  index("outbox_event_type_idx").on(table.eventType),
]);

export const outboxEventsRelations = relations(outboxEvents, ({ one }) => ({
  org: one(orgs, {
    fields: [outboxEvents.orgId],
    references: [orgs.id],
  }),
  workspace: one(workspaces, {
    fields: [outboxEvents.workspaceId],
    references: [workspaces.id],
  }),
}));

// ============================================
// Email Log (transactional email tracking)
// ============================================
export const emailStatusEnum = pgEnum("email_status", [
  "pending",
  "sent",
  "delivered",
  "bounced",
  "failed",
]);

export const emailLog = pgTable("email_log", {
  id: serial("id").primaryKey(),
  // Scope (optional - some emails are platform-level)
  orgId: integer("org_id").references(() => orgs.id, { onDelete: "cascade" }),
  workspaceId: integer("workspace_id").references(() => workspaces.id, { onDelete: "cascade" }),
  // Email details
  templateName: varchar("template_name", { length: 100 }).notNull(), // e.g., "invite", "lead_assigned"
  to: varchar("to", { length: 255 }).notNull(),
  from: varchar("from", { length: 255 }).notNull(),
  subject: varchar("subject", { length: 500 }).notNull(),
  // Status tracking
  status: emailStatusEnum("status").notNull().default("pending"),
  resendId: varchar("resend_id", { length: 100 }), // Resend message ID
  // Error tracking
  errorMessage: text("error_message"),
  // Metadata
  metadata: jsonb("metadata"), // Template variables, context, etc.
  // Related entities (for linking back)
  relatedEntityType: varchar("related_entity_type", { length: 50 }),
  relatedEntityId: integer("related_entity_id"),
  // Timestamps
  sentAt: timestamp("sent_at"),
  deliveredAt: timestamp("delivered_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => [
  index("email_log_org_idx").on(table.orgId),
  index("email_log_status_idx").on(table.status),
  index("email_log_template_idx").on(table.templateName),
  index("email_log_to_idx").on(table.to),
  index("email_log_created_at_idx").on(table.createdAt),
]);

export const emailLogRelations = relations(emailLog, ({ one }) => ({
  org: one(orgs, {
    fields: [emailLog.orgId],
    references: [orgs.id],
  }),
  workspace: one(workspaces, {
    fields: [emailLog.workspaceId],
    references: [workspaces.id],
  }),
}));

// ============================================
// Meta Integration: Connections (OAuth tokens)
// ============================================
export const metaConnections = pgTable("meta_connections", {
  id: serial("id").primaryKey(),
  orgId: integer("org_id")
    .notNull()
    .references(() => orgs.id, { onDelete: "cascade" }),
  // Meta user info
  metaUserId: varchar("meta_user_id", { length: 100 }).notNull(),
  metaUserName: varchar("meta_user_name", { length: 255 }),
  // Token (encrypted at rest)
  accessTokenEncrypted: text("access_token_encrypted").notNull(),
  tokenExpiresAt: timestamp("token_expires_at"),
  // Scopes granted
  scopes: text("scopes"), // comma-separated list
  // Status
  isActive: boolean("is_active").notNull().default(true),
  lastSyncAt: timestamp("last_sync_at"),
  // Timestamps
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => [
  index("meta_conn_org_idx").on(table.orgId),
  uniqueIndex("meta_conn_org_user_idx").on(table.orgId, table.metaUserId),
]);

export const metaConnectionsRelations = relations(metaConnections, ({ one, many }) => ({
  org: one(orgs, {
    fields: [metaConnections.orgId],
    references: [orgs.id],
  }),
  pages: many(metaPages),
}));

// ============================================
// Meta Integration: Pages
// ============================================
export const metaPages = pgTable("meta_pages", {
  id: serial("id").primaryKey(),
  orgId: integer("org_id")
    .notNull()
    .references(() => orgs.id, { onDelete: "cascade" }),
  connectionId: integer("connection_id")
    .notNull()
    .references(() => metaConnections.id, { onDelete: "cascade" }),
  // Page info
  pageId: varchar("page_id", { length: 100 }).notNull(),
  pageName: varchar("page_name", { length: 255 }).notNull(),
  // Page access token (encrypted, long-lived)
  pageAccessTokenEncrypted: text("page_access_token_encrypted").notNull(),
  // Webhook subscription status
  subscribedToLeadgen: boolean("subscribed_to_leadgen").notNull().default(false),
  webhookSubscribedAt: timestamp("webhook_subscribed_at"),
  // Status
  isActive: boolean("is_active").notNull().default(true),
  // Timestamps
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => [
  index("meta_page_org_idx").on(table.orgId),
  uniqueIndex("meta_page_org_page_idx").on(table.orgId, table.pageId),
]);

export const metaPagesRelations = relations(metaPages, ({ one, many }) => ({
  org: one(orgs, {
    fields: [metaPages.orgId],
    references: [orgs.id],
  }),
  connection: one(metaConnections, {
    fields: [metaPages.connectionId],
    references: [metaConnections.id],
  }),
  forms: many(metaForms),
  ingestRoutes: many(leadIngestRoutes),
}));

// ============================================
// Meta Integration: Lead Forms
// ============================================
export const metaForms = pgTable("meta_forms", {
  id: serial("id").primaryKey(),
  orgId: integer("org_id")
    .notNull()
    .references(() => orgs.id, { onDelete: "cascade" }),
  pageId: integer("page_id")
    .notNull()
    .references(() => metaPages.id, { onDelete: "cascade" }),
  // Form info from Meta
  formId: varchar("form_id", { length: 100 }).notNull(),
  formName: varchar("form_name", { length: 255 }),
  // Form questions/fields (cached from Meta for mapping UI)
  formFields: jsonb("form_fields"), // Array of { key, label, type }
  // Status
  isActive: boolean("is_active").notNull().default(true),
  lastSyncAt: timestamp("last_sync_at"),
  // Timestamps
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => [
  index("meta_form_org_idx").on(table.orgId),
  index("meta_form_page_idx").on(table.pageId),
  uniqueIndex("meta_form_page_form_idx").on(table.pageId, table.formId),
]);

export const metaFormsRelations = relations(metaForms, ({ one, many }) => ({
  org: one(orgs, {
    fields: [metaForms.orgId],
    references: [orgs.id],
  }),
  page: one(metaPages, {
    fields: [metaForms.pageId],
    references: [metaPages.id],
  }),
  ingestRoutes: many(leadIngestRoutes),
}));

// ============================================
// Lead Ingest Routes (routing rules)
// ============================================
export const leadSourceEnum = pgEnum("lead_source", ["meta", "manual", "api", "import"]);

export const leadIngestRoutes = pgTable("lead_ingest_routes", {
  id: serial("id").primaryKey(),
  orgId: integer("org_id")
    .notNull()
    .references(() => orgs.id, { onDelete: "cascade" }),
  // Source identification
  source: leadSourceEnum("source").notNull(),
  // Meta-specific (nullable for other sources)
  metaPageId: integer("meta_page_id").references(() => metaPages.id, { onDelete: "cascade" }),
  metaFormId: integer("meta_form_id").references(() => metaForms.id, { onDelete: "cascade" }),
  // Destination
  workspaceId: integer("workspace_id")
    .notNull()
    .references(() => workspaces.id, { onDelete: "cascade" }),
  pipelineId: integer("pipeline_id")
    .notNull()
    .references(() => pipelines.id, { onDelete: "cascade" }),
  stageId: integer("stage_id")
    .notNull()
    .references(() => pipelineStages.id),
  // Optional: auto-assign to user
  assignToUserId: integer("assign_to_user_id").references(() => users.id),
  // Status
  isActive: boolean("is_active").notNull().default(true),
  // Timestamps
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => [
  index("ingest_route_org_idx").on(table.orgId),
  index("ingest_route_source_idx").on(table.source),
  // Unique route per page+form combination
  uniqueIndex("ingest_route_meta_unique_idx").on(table.metaPageId, table.metaFormId),
]);

export const leadIngestRoutesRelations = relations(leadIngestRoutes, ({ one, many }) => ({
  org: one(orgs, {
    fields: [leadIngestRoutes.orgId],
    references: [orgs.id],
  }),
  metaPage: one(metaPages, {
    fields: [leadIngestRoutes.metaPageId],
    references: [metaPages.id],
  }),
  metaForm: one(metaForms, {
    fields: [leadIngestRoutes.metaFormId],
    references: [metaForms.id],
  }),
  workspace: one(workspaces, {
    fields: [leadIngestRoutes.workspaceId],
    references: [workspaces.id],
  }),
  pipeline: one(pipelines, {
    fields: [leadIngestRoutes.pipelineId],
    references: [pipelines.id],
  }),
  stage: one(pipelineStages, {
    fields: [leadIngestRoutes.stageId],
    references: [pipelineStages.id],
  }),
  assignToUser: one(users, {
    fields: [leadIngestRoutes.assignToUserId],
    references: [users.id],
  }),
  fieldMappings: many(leadFieldMappings),
}));

// ============================================
// Lead Field Mappings (custom field mapping)
// ============================================
export const leadFieldMappings = pgTable("lead_field_mappings", {
  id: serial("id").primaryKey(),
  routeId: integer("route_id")
    .notNull()
    .references(() => leadIngestRoutes.id, { onDelete: "cascade" }),
  // Source field (from Meta form)
  sourceFieldKey: varchar("source_field_key", { length: 255 }).notNull(),
  sourceFieldLabel: varchar("source_field_label", { length: 255 }),
  // Target field in LeadFlow
  targetField: varchar("target_field", { length: 100 }).notNull(), // e.g., "firstName", "email", "phone", "custom:xyz"
  // Transform (optional)
  transform: varchar("transform", { length: 50 }), // e.g., "lowercase", "phone_format"
  // Timestamps
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => [
  index("field_mapping_route_idx").on(table.routeId),
  uniqueIndex("field_mapping_route_source_idx").on(table.routeId, table.sourceFieldKey),
]);

export const leadFieldMappingsRelations = relations(leadFieldMappings, ({ one }) => ({
  route: one(leadIngestRoutes, {
    fields: [leadFieldMappings.routeId],
    references: [leadIngestRoutes.id],
  }),
}));

// ============================================
// Webhook Events (idempotency tracking)
// ============================================
export const webhookProviderEnum = pgEnum("webhook_provider", ["meta", "stripe", "other"]);
export const webhookEventStatusEnum = pgEnum("webhook_event_status", [
  "received",
  "processing",
  "processed",
  "failed",
  "skipped",
]);

export const webhookEvents = pgTable("webhook_events", {
  id: serial("id").primaryKey(),
  // Provider info
  provider: webhookProviderEnum("provider").notNull(),
  externalEventId: varchar("external_event_id", { length: 255 }).notNull(), // e.g., leadgen_id for Meta
  // Event type
  eventType: varchar("event_type", { length: 100 }).notNull(), // e.g., "leadgen"
  // Raw payload
  payload: jsonb("payload").notNull(),
  // Processing status
  status: webhookEventStatusEnum("status").notNull().default("received"),
  processedAt: timestamp("processed_at"),
  errorMessage: text("error_message"),
  // Retry tracking
  attempts: integer("attempts").notNull().default(0),
  // Result reference
  resultEntityType: varchar("result_entity_type", { length: 50 }), // e.g., "contact"
  resultEntityId: integer("result_entity_id"),
  // Timestamps
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => [
  // Unique per provider + external ID (idempotency key)
  uniqueIndex("webhook_event_idempotency_idx").on(table.provider, table.externalEventId),
  index("webhook_event_status_idx").on(table.status),
  index("webhook_event_created_idx").on(table.createdAt),
]);

// ============================================
// Lead Attribution (source tracking for contacts)
// ============================================
export const leadAttribution = pgTable("lead_attribution", {
  id: serial("id").primaryKey(),
  contactId: integer("contact_id")
    .notNull()
    .references(() => contacts.id, { onDelete: "cascade" }),
  // Source
  source: leadSourceEnum("source").notNull(),
  // Meta-specific attribution
  metaPageId: varchar("meta_page_id", { length: 100 }),
  metaFormId: varchar("meta_form_id", { length: 100 }),
  metaLeadgenId: varchar("meta_leadgen_id", { length: 100 }),
  metaAdId: varchar("meta_ad_id", { length: 100 }),
  metaCampaignId: varchar("meta_campaign_id", { length: 100 }),
  metaAdsetId: varchar("meta_adset_id", { length: 100 }),
  // UTM parameters (if available)
  utmSource: varchar("utm_source", { length: 255 }),
  utmMedium: varchar("utm_medium", { length: 255 }),
  utmCampaign: varchar("utm_campaign", { length: 255 }),
  utmContent: varchar("utm_content", { length: 255 }),
  utmTerm: varchar("utm_term", { length: 255 }),
  // Raw data for debugging
  rawPayload: jsonb("raw_payload"),
  // Timestamps
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => [
  uniqueIndex("lead_attr_contact_idx").on(table.contactId),
  index("lead_attr_source_idx").on(table.source),
  index("lead_attr_meta_leadgen_idx").on(table.metaLeadgenId),
]);

export const leadAttributionRelations = relations(leadAttribution, ({ one }) => ({
  contact: one(contacts, {
    fields: [leadAttribution.contactId],
    references: [contacts.id],
  }),
}));

// ============================================
// Meta Lead Raw (raw lead storage for reliability)
// ============================================
export const metaLeadStatusEnum = pgEnum("meta_lead_status", [
  "pending",
  "processing",
  "completed",
  "failed",
  "skipped",
]);

export const metaLeadRaw = pgTable("meta_lead_raw", {
  id: serial("id").primaryKey(),
  orgId: integer("org_id")
    .notNull()
    .references(() => orgs.id, { onDelete: "cascade" }),
  // Meta identifiers
  leadgenId: varchar("leadgen_id", { length: 100 }).notNull().unique(),
  pageId: varchar("page_id", { length: 100 }).notNull(),
  formId: varchar("form_id", { length: 100 }),
  // Ad attribution
  adId: varchar("ad_id", { length: 100 }),
  adgroupId: varchar("adgroup_id", { length: 100 }),
  campaignId: varchar("campaign_id", { length: 100 }),
  // Raw data
  payload: jsonb("payload").notNull(),
  fieldData: jsonb("field_data"), // Parsed field data for easy access
  // Processing status
  status: metaLeadStatusEnum("status").notNull().default("pending"),
  contactId: integer("contact_id").references(() => contacts.id, { onDelete: "set null" }),
  opportunityId: integer("opportunity_id").references(() => opportunities.id, { onDelete: "set null" }),
  errorMessage: text("error_message"),
  retryCount: integer("retry_count").notNull().default(0),
  // Timestamps
  fetchedAt: timestamp("fetched_at").defaultNow().notNull(),
  processingStartedAt: timestamp("processing_started_at"), // For stale detection
  processedAt: timestamp("processed_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => [
  index("meta_lead_raw_org_idx").on(table.orgId),
  index("meta_lead_raw_status_idx").on(table.status),
  index("meta_lead_raw_page_idx").on(table.pageId),
  index("meta_lead_raw_created_idx").on(table.createdAt),
]);

export const metaLeadRawRelations = relations(metaLeadRaw, ({ one }) => ({
  org: one(orgs, {
    fields: [metaLeadRaw.orgId],
    references: [orgs.id],
  }),
  contact: one(contacts, {
    fields: [metaLeadRaw.contactId],
    references: [contacts.id],
  }),
  opportunity: one(opportunities, {
    fields: [metaLeadRaw.opportunityId],
    references: [opportunities.id],
  }),
}));

// ============================================
// Invoicing: Products (reusable items catalog)
// ============================================
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  workspaceId: integer("workspace_id")
    .notNull()
    .references(() => workspaces.id, { onDelete: "cascade" }),
  // Product details
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  sku: varchar("sku", { length: 100 }), // Artikelnummer
  // Pricing
  unitPrice: decimal("unit_price", { precision: 12, scale: 2 }).notNull(),
  currency: varchar("currency", { length: 3 }).default("EUR").notNull(),
  unit: varchar("unit", { length: 50 }).default("stuk").notNull(), // stuk, uur, maand, etc.
  // Tax
  taxRate: decimal("tax_rate", { precision: 5, scale: 2 }).default("21.00").notNull(), // BTW percentage
  // Status
  isActive: boolean("is_active").default(true).notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
  // Timestamps
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => [
  index("product_workspace_idx").on(table.workspaceId),
  index("product_active_idx").on(table.isActive),
]);

export const productsRelations = relations(products, ({ one }) => ({
  workspace: one(workspaces, {
    fields: [products.workspaceId],
    references: [workspaces.id],
  }),
}));

// ============================================
// Invoicing: Quotations (Offertes)
// ============================================
export const quotationStatusEnum = pgEnum("quotation_status", [
  "draft",
  "sent",
  "accepted",
  "rejected",
  "expired",
]);

export const quotations = pgTable("quotations", {
  id: serial("id").primaryKey(),
  workspaceId: integer("workspace_id")
    .notNull()
    .references(() => workspaces.id, { onDelete: "cascade" }),
  contactId: integer("contact_id")
    .notNull()
    .references(() => contacts.id, { onDelete: "cascade" }),
  opportunityId: integer("opportunity_id")
    .references(() => opportunities.id, { onDelete: "set null" }),
  // Nummering
  quotationNumber: varchar("quotation_number", { length: 50 }).notNull().unique(),
  // Status
  status: quotationStatusEnum("status").default("draft").notNull(),
  // Amounts (calculated from line items)
  subtotal: decimal("subtotal", { precision: 12, scale: 2 }).default("0").notNull(),
  taxAmount: decimal("tax_amount", { precision: 12, scale: 2 }).default("0").notNull(),
  discountAmount: decimal("discount_amount", { precision: 12, scale: 2 }).default("0").notNull(),
  total: decimal("total", { precision: 12, scale: 2 }).default("0").notNull(),
  currency: varchar("currency", { length: 3 }).default("EUR").notNull(),
  // Discount (optional document-level)
  discountType: varchar("discount_type", { length: 10 }), // percentage | fixed
  discountValue: decimal("discount_value", { precision: 12, scale: 2 }),
  // Dates
  issueDate: timestamp("issue_date").notNull(),
  validUntil: timestamp("valid_until"),
  // Content
  title: varchar("title", { length: 255 }),
  introduction: text("introduction"),
  terms: text("terms"),
  notes: text("notes"), // Internal notes
  // Tracking
  sentAt: timestamp("sent_at"),
  viewedAt: timestamp("viewed_at"),
  acceptedAt: timestamp("accepted_at"),
  rejectedAt: timestamp("rejected_at"),
  convertedToInvoiceId: integer("converted_to_invoice_id"),
  // PDF
  pdfUrl: varchar("pdf_url", { length: 500 }),
  // Timestamps
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => [
  index("quotation_workspace_idx").on(table.workspaceId),
  index("quotation_contact_idx").on(table.contactId),
  index("quotation_status_idx").on(table.status),
]);

export const quotationsRelations = relations(quotations, ({ one, many }) => ({
  workspace: one(workspaces, {
    fields: [quotations.workspaceId],
    references: [workspaces.id],
  }),
  contact: one(contacts, {
    fields: [quotations.contactId],
    references: [contacts.id],
  }),
  opportunity: one(opportunities, {
    fields: [quotations.opportunityId],
    references: [opportunities.id],
  }),
  lineItems: many(lineItems),
}));

// ============================================
// Invoicing: Invoices (Facturen)
// ============================================
export const invoiceStatusEnum = pgEnum("invoice_status", [
  "draft",
  "sent",
  "viewed",
  "paid",
  "overdue",
  "cancelled",
]);

export const invoices = pgTable("invoices", {
  id: serial("id").primaryKey(),
  workspaceId: integer("workspace_id")
    .notNull()
    .references(() => workspaces.id, { onDelete: "cascade" }),
  contactId: integer("contact_id")
    .notNull()
    .references(() => contacts.id, { onDelete: "cascade" }),
  opportunityId: integer("opportunity_id")
    .references(() => opportunities.id, { onDelete: "set null" }),
  quotationId: integer("quotation_id")
    .references(() => quotations.id, { onDelete: "set null" }),
  // Nummering
  invoiceNumber: varchar("invoice_number", { length: 50 }).notNull().unique(),
  // Status
  status: invoiceStatusEnum("status").default("draft").notNull(),
  // Amounts
  subtotal: decimal("subtotal", { precision: 12, scale: 2 }).default("0").notNull(),
  taxAmount: decimal("tax_amount", { precision: 12, scale: 2 }).default("0").notNull(),
  discountAmount: decimal("discount_amount", { precision: 12, scale: 2 }).default("0").notNull(),
  total: decimal("total", { precision: 12, scale: 2 }).default("0").notNull(),
  amountPaid: decimal("amount_paid", { precision: 12, scale: 2 }).default("0").notNull(),
  amountDue: decimal("amount_due", { precision: 12, scale: 2 }).default("0").notNull(),
  currency: varchar("currency", { length: 3 }).default("EUR").notNull(),
  // Discount
  discountType: varchar("discount_type", { length: 10 }),
  discountValue: decimal("discount_value", { precision: 12, scale: 2 }),
  // Dates
  issueDate: timestamp("issue_date").notNull(),
  dueDate: timestamp("due_date").notNull(),
  // Content
  title: varchar("title", { length: 255 }),
  introduction: text("introduction"),
  terms: text("terms"),
  notes: text("notes"),
  // Payment
  paymentTerms: integer("payment_terms").default(14).notNull(),
  paymentMethod: varchar("payment_method", { length: 50 }),
  paymentReference: varchar("payment_reference", { length: 255 }),
  // Stripe Payment Link
  stripePaymentLinkId: varchar("stripe_payment_link_id", { length: 255 }),
  stripePaymentLinkUrl: varchar("stripe_payment_link_url", { length: 500 }),
  // Tracking
  sentAt: timestamp("sent_at"),
  viewedAt: timestamp("viewed_at"),
  paidAt: timestamp("paid_at"),
  lastReminderAt: timestamp("last_reminder_at"),
  reminderCount: integer("reminder_count").default(0).notNull(),
  // PDF
  pdfUrl: varchar("pdf_url", { length: 500 }),
  // Timestamps
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => [
  index("invoice_workspace_idx").on(table.workspaceId),
  index("invoice_contact_idx").on(table.contactId),
  index("invoice_status_idx").on(table.status),
  index("invoice_due_date_idx").on(table.dueDate),
]);

export const invoicesRelations = relations(invoices, ({ one, many }) => ({
  workspace: one(workspaces, {
    fields: [invoices.workspaceId],
    references: [workspaces.id],
  }),
  contact: one(contacts, {
    fields: [invoices.contactId],
    references: [contacts.id],
  }),
  opportunity: one(opportunities, {
    fields: [invoices.opportunityId],
    references: [opportunities.id],
  }),
  quotation: one(quotations, {
    fields: [invoices.quotationId],
    references: [quotations.id],
  }),
  lineItems: many(lineItems),
  payments: many(payments),
}));

// ============================================
// Invoicing: Line Items (shared for quotations and invoices)
// ============================================
export const lineItems = pgTable("line_items", {
  id: serial("id").primaryKey(),
  // Polymorphic relation (one must be set)
  quotationId: integer("quotation_id")
    .references(() => quotations.id, { onDelete: "cascade" }),
  invoiceId: integer("invoice_id")
    .references(() => invoices.id, { onDelete: "cascade" }),
  // Link to product catalog (optional)
  productId: integer("product_id")
    .references(() => products.id, { onDelete: "set null" }),
  // Item details
  description: varchar("description", { length: 500 }).notNull(),
  quantity: decimal("quantity", { precision: 10, scale: 2 }).default("1").notNull(),
  unit: varchar("unit", { length: 50 }).default("stuk").notNull(),
  unitPrice: decimal("unit_price", { precision: 12, scale: 2 }).notNull(),
  // Tax
  taxRate: decimal("tax_rate", { precision: 5, scale: 2 }).default("21.00").notNull(),
  taxAmount: decimal("tax_amount", { precision: 12, scale: 2 }).default("0").notNull(),
  // Discount per line
  discountPercent: decimal("discount_percent", { precision: 5, scale: 2 }).default("0").notNull(),
  // Calculated totals
  subtotal: decimal("subtotal", { precision: 12, scale: 2 }).default("0").notNull(), // qty * price - discount
  total: decimal("total", { precision: 12, scale: 2 }).default("0").notNull(), // subtotal + tax
  // Ordering
  sortOrder: integer("sort_order").default(0).notNull(),
  // Timestamp
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => [
  index("line_item_quotation_idx").on(table.quotationId),
  index("line_item_invoice_idx").on(table.invoiceId),
]);

export const lineItemsRelations = relations(lineItems, ({ one }) => ({
  quotation: one(quotations, {
    fields: [lineItems.quotationId],
    references: [quotations.id],
  }),
  invoice: one(invoices, {
    fields: [lineItems.invoiceId],
    references: [invoices.id],
  }),
  product: one(products, {
    fields: [lineItems.productId],
    references: [products.id],
  }),
}));

// ============================================
// Invoicing: Payments (for partial payments)
// ============================================
export const payments = pgTable("payments", {
  id: serial("id").primaryKey(),
  invoiceId: integer("invoice_id")
    .notNull()
    .references(() => invoices.id, { onDelete: "cascade" }),
  // Amount
  amount: decimal("amount", { precision: 12, scale: 2 }).notNull(),
  currency: varchar("currency", { length: 3 }).default("EUR").notNull(),
  // Details
  paymentDate: timestamp("payment_date").notNull(),
  paymentMethod: varchar("payment_method", { length: 50 }), // bank, ideal, cash, stripe
  reference: varchar("reference", { length: 255 }), // Transaction reference
  // Notes
  notes: text("notes"),
  // Stripe
  stripePaymentIntentId: varchar("stripe_payment_intent_id", { length: 255 }),
  // Timestamp
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => [
  index("payment_invoice_idx").on(table.invoiceId),
]);

export const paymentsRelations = relations(payments, ({ one }) => ({
  invoice: one(invoices, {
    fields: [payments.invoiceId],
    references: [invoices.id],
  }),
}));

// ============================================
// Invoicing: Settings (per workspace)
// ============================================
export const invoiceSettings = pgTable("invoice_settings", {
  id: serial("id").primaryKey(),
  workspaceId: integer("workspace_id")
    .notNull()
    .unique()
    .references(() => workspaces.id, { onDelete: "cascade" }),
  // Numbering
  quotationPrefix: varchar("quotation_prefix", { length: 20 }).default("OFF").notNull(),
  quotationNextNumber: integer("quotation_next_number").default(1).notNull(),
  invoicePrefix: varchar("invoice_prefix", { length: 20 }).default("FAC").notNull(),
  invoiceNextNumber: integer("invoice_next_number").default(1).notNull(),
  creditNotePrefix: varchar("credit_note_prefix", { length: 20 }).default("CN").notNull(),
  creditNoteNextNumber: integer("credit_note_next_number").default(1).notNull(),
  // Defaults
  defaultPaymentTerms: integer("default_payment_terms").default(14).notNull(),
  defaultTaxRate: decimal("default_tax_rate", { precision: 5, scale: 2 }).default("21.00").notNull(),
  defaultCurrency: varchar("default_currency", { length: 3 }).default("EUR").notNull(),
  // Company details (for PDF)
  companyName: varchar("company_name", { length: 255 }),
  companyAddress: text("company_address"),
  companyEmail: varchar("company_email", { length: 255 }),
  companyPhone: varchar("company_phone", { length: 50 }),
  companyWebsite: varchar("company_website", { length: 255 }),
  companyLogo: varchar("company_logo", { length: 500 }),
  // Business info
  kvkNumber: varchar("kvk_number", { length: 20 }), // KVK
  vatNumber: varchar("vat_number", { length: 30 }), // BTW
  iban: varchar("iban", { length: 50 }),
  bic: varchar("bic", { length: 20 }),
  // Templates
  defaultIntroduction: text("default_introduction"),
  defaultTerms: text("default_terms"),
  defaultFooter: text("default_footer"),
  // Reminders
  enableReminders: boolean("enable_reminders").default(true).notNull(),
  reminderDays: jsonb("reminder_days").$type<number[]>().default([7, 14, 30]).notNull(),
  // Timestamps
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => [
  index("invoice_settings_workspace_idx").on(table.workspaceId),
]);

export const invoiceSettingsRelations = relations(invoiceSettings, ({ one }) => ({
  workspace: one(workspaces, {
    fields: [invoiceSettings.workspaceId],
    references: [workspaces.id],
  }),
}));

// ============================================
// Invoicing: Recurring Invoices
// ============================================
export const recurringFrequencyEnum = pgEnum("recurring_frequency", [
  "weekly",
  "monthly",
  "quarterly",
  "yearly",
]);

export const recurringInvoices = pgTable("recurring_invoices", {
  id: serial("id").primaryKey(),
  workspaceId: integer("workspace_id")
    .notNull()
    .references(() => workspaces.id, { onDelete: "cascade" }),
  contactId: integer("contact_id")
    .notNull()
    .references(() => contacts.id, { onDelete: "cascade" }),
  // Template info
  title: varchar("title", { length: 255 }),
  introduction: text("introduction"),
  terms: text("terms"),
  notes: text("notes"),
  // Line items stored as JSON template
  lineItemsTemplate: jsonb("line_items_template").$type<{
    productId?: number;
    description: string;
    quantity: number;
    unit: string;
    unitPrice: number;
    taxRate: number;
    discountPercent: number;
  }[]>().default([]).notNull(),
  // Schedule
  frequency: recurringFrequencyEnum("frequency").default("monthly").notNull(),
  dayOfMonth: integer("day_of_month").default(1).notNull(), // 1-28 for safety
  dayOfWeek: integer("day_of_week"), // 0-6 for weekly
  // Payment terms
  paymentTerms: integer("payment_terms").default(14).notNull(),
  currency: varchar("currency", { length: 3 }).default("EUR").notNull(),
  // Dates
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date"), // null = indefinite
  nextRunDate: timestamp("next_run_date").notNull(),
  lastRunDate: timestamp("last_run_date"),
  // Control
  isActive: boolean("is_active").default(true).notNull(),
  autoSend: boolean("auto_send").default(false).notNull(), // Auto-send when generated
  // Stats
  invoicesGenerated: integer("invoices_generated").default(0).notNull(),
  // Timestamps
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => [
  index("recurring_invoices_workspace_idx").on(table.workspaceId),
  index("recurring_invoices_contact_idx").on(table.contactId),
  index("recurring_invoices_next_run_idx").on(table.nextRunDate),
  index("recurring_invoices_active_idx").on(table.isActive),
]);

export const recurringInvoicesRelations = relations(recurringInvoices, ({ one }) => ({
  workspace: one(workspaces, {
    fields: [recurringInvoices.workspaceId],
    references: [workspaces.id],
  }),
  contact: one(contacts, {
    fields: [recurringInvoices.contactId],
    references: [contacts.id],
  }),
}));

// ============================================
// Credit Notes (Creditnota's)
// ============================================
export const creditNoteStatusEnum = pgEnum("credit_note_status", [
  "draft",
  "issued",
  "applied", // Applied to an invoice
  "refunded", // Refunded to customer
  "cancelled",
]);

export const creditNotes = pgTable("credit_notes", {
  id: serial("id").primaryKey(),
  workspaceId: integer("workspace_id")
    .notNull()
    .references(() => workspaces.id, { onDelete: "cascade" }),
  contactId: integer("contact_id")
    .notNull()
    .references(() => contacts.id, { onDelete: "cascade" }),
  invoiceId: integer("invoice_id")
    .references(() => invoices.id, { onDelete: "set null" }), // Original invoice being credited
  // Nummering
  creditNoteNumber: varchar("credit_note_number", { length: 50 }).notNull().unique(),
  // Status
  status: creditNoteStatusEnum("status").default("draft").notNull(),
  // Amounts
  subtotal: decimal("subtotal", { precision: 12, scale: 2 }).default("0").notNull(),
  taxAmount: decimal("tax_amount", { precision: 12, scale: 2 }).default("0").notNull(),
  total: decimal("total", { precision: 12, scale: 2 }).default("0").notNull(),
  currency: varchar("currency", { length: 3 }).default("EUR").notNull(),
  // Reason & Content
  reason: text("reason"), // Reason for credit note
  notes: text("notes"), // Internal notes
  // Dates
  issueDate: timestamp("issue_date").notNull(),
  // Tracking
  sentAt: timestamp("sent_at"),
  appliedAt: timestamp("applied_at"), // When applied to invoice
  refundedAt: timestamp("refunded_at"), // When refunded
  // PDF
  pdfUrl: varchar("pdf_url", { length: 500 }),
  // Timestamps
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => [
  index("credit_note_workspace_idx").on(table.workspaceId),
  index("credit_note_contact_idx").on(table.contactId),
  index("credit_note_invoice_idx").on(table.invoiceId),
  index("credit_note_status_idx").on(table.status),
]);

export const creditNoteLineItems = pgTable("credit_note_line_items", {
  id: serial("id").primaryKey(),
  creditNoteId: integer("credit_note_id")
    .notNull()
    .references(() => creditNotes.id, { onDelete: "cascade" }),
  productId: integer("product_id")
    .references(() => products.id, { onDelete: "set null" }),
  // Item details
  description: varchar("description", { length: 500 }).notNull(),
  quantity: decimal("quantity", { precision: 10, scale: 3 }).notNull(),
  unit: varchar("unit", { length: 20 }).default("stuk").notNull(),
  unitPrice: decimal("unit_price", { precision: 12, scale: 2 }).notNull(),
  taxRate: decimal("tax_rate", { precision: 5, scale: 2 }).default("21").notNull(),
  // Calculated
  subtotal: decimal("subtotal", { precision: 12, scale: 2 }).notNull(),
  taxAmount: decimal("tax_amount", { precision: 12, scale: 2 }).notNull(),
  total: decimal("total", { precision: 12, scale: 2 }).notNull(),
  // Ordering
  sortOrder: integer("sort_order").default(0).notNull(),
}, (table) => [
  index("credit_note_line_items_credit_note_idx").on(table.creditNoteId),
]);

export const creditNotesRelations = relations(creditNotes, ({ one, many }) => ({
  workspace: one(workspaces, {
    fields: [creditNotes.workspaceId],
    references: [workspaces.id],
  }),
  contact: one(contacts, {
    fields: [creditNotes.contactId],
    references: [contacts.id],
  }),
  invoice: one(invoices, {
    fields: [creditNotes.invoiceId],
    references: [invoices.id],
  }),
  lineItems: many(creditNoteLineItems),
}));

export const creditNoteLineItemsRelations = relations(creditNoteLineItems, ({ one }) => ({
  creditNote: one(creditNotes, {
    fields: [creditNoteLineItems.creditNoteId],
    references: [creditNotes.id],
  }),
  product: one(products, {
    fields: [creditNoteLineItems.productId],
    references: [products.id],
  }),
}));

// ============================================
// Expenses (Uitgaven / Inkomende facturen)
// ============================================
export const expenseStatusEnum = pgEnum("expense_status", [
  "pending",    // In afwachting van goedkeuring
  "approved",   // Goedgekeurd
  "paid",       // Betaald
  "rejected",   // Afgewezen
]);

export const expenseCategoryEnum = pgEnum("expense_category", [
  "office",           // Kantoorkosten
  "travel",           // Reiskosten
  "software",         // Software & abonnementen
  "marketing",        // Marketing & reclame
  "supplies",         // Kantoorbenodigdheden
  "utilities",        // Nutsvoorzieningen
  "insurance",        // Verzekeringen
  "professional",     // Professionele diensten
  "equipment",        // Apparatuur
  "other",            // Overig
]);

export const expenses = pgTable("expenses", {
  id: serial("id").primaryKey(),
  workspaceId: integer("workspace_id")
    .notNull()
    .references(() => workspaces.id, { onDelete: "cascade" }),
  // Vendor info
  vendorName: varchar("vendor_name", { length: 255 }).notNull(),
  vendorEmail: varchar("vendor_email", { length: 255 }),
  // Invoice details
  invoiceNumber: varchar("invoice_number", { length: 100 }),
  description: text("description"),
  category: expenseCategoryEnum("category").default("other").notNull(),
  // Amounts
  subtotal: decimal("subtotal", { precision: 12, scale: 2 }).notNull(),
  taxAmount: decimal("tax_amount", { precision: 12, scale: 2 }).default("0").notNull(),
  taxRate: decimal("tax_rate", { precision: 5, scale: 2 }).default("21").notNull(),
  total: decimal("total", { precision: 12, scale: 2 }).notNull(),
  currency: varchar("currency", { length: 3 }).default("EUR").notNull(),
  // Dates
  invoiceDate: timestamp("invoice_date").notNull(),
  dueDate: timestamp("due_date"),
  paidAt: timestamp("paid_at"),
  // Status
  status: expenseStatusEnum("status").default("pending").notNull(),
  // Attachments
  receiptUrl: varchar("receipt_url", { length: 500 }), // Uploaded receipt/invoice
  // Notes
  notes: text("notes"),
  // Tracking
  createdBy: varchar("created_by", { length: 255 }),
  approvedBy: varchar("approved_by", { length: 255 }),
  // Timestamps
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => [
  index("expense_workspace_idx").on(table.workspaceId),
  index("expense_category_idx").on(table.category),
  index("expense_status_idx").on(table.status),
  index("expense_invoice_date_idx").on(table.invoiceDate),
  index("expense_vendor_idx").on(table.vendorName),
]);

export const expensesRelations = relations(expenses, ({ one }) => ({
  workspace: one(workspaces, {
    fields: [expenses.workspaceId],
    references: [workspaces.id],
  }),
}));

// ============================================
// Notifications
// ============================================
export const notificationTypeEnum = pgEnum("notification_type", [
  "follow_up",       // Follow-up reminder for opportunity
  "lead_new",        // New lead received
  "invoice_paid",    // Invoice was paid
  "invoice_overdue", // Invoice is overdue
  "opportunity_won", // Opportunity marked as won
  "opportunity_lost", // Opportunity marked as lost
  "system",          // System notification
]);

export const notifications = pgTable("notifications", {
  id: serial("id").primaryKey(),
  workspaceId: integer("workspace_id")
    .notNull()
    .references(() => workspaces.id, { onDelete: "cascade" }),
  userId: integer("user_id")
    .references(() => users.id, { onDelete: "cascade" }), // null = all workspace users
  // Notification content
  type: notificationTypeEnum("type").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  message: text("message"),
  // Related entity
  entityType: varchar("entity_type", { length: 50 }), // opportunity, contact, invoice
  entityId: integer("entity_id"),
  // Action URL
  actionUrl: varchar("action_url", { length: 500 }),
  // Status
  isRead: boolean("is_read").default(false).notNull(),
  readAt: timestamp("read_at"),
  // Scheduling
  scheduledFor: timestamp("scheduled_for").defaultNow().notNull(), // When to show the notification
  // Timestamps
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => [
  index("notification_workspace_idx").on(table.workspaceId),
  index("notification_user_idx").on(table.userId),
  index("notification_read_idx").on(table.isRead),
  index("notification_scheduled_idx").on(table.scheduledFor),
  index("notification_type_idx").on(table.type),
]);

export const notificationsRelations = relations(notifications, ({ one }) => ({
  workspace: one(workspaces, {
    fields: [notifications.workspaceId],
    references: [workspaces.id],
  }),
  user: one(users, {
    fields: [notifications.userId],
    references: [users.id],
  }),
}));

// ============================================
// Type exports
// ============================================
export type Org = typeof orgs.$inferSelect;
export type NewOrg = typeof orgs.$inferInsert;

export type Workspace = typeof workspaces.$inferSelect;
export type NewWorkspace = typeof workspaces.$inferInsert;

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Membership = typeof memberships.$inferSelect;
export type NewMembership = typeof memberships.$inferInsert;

export type Contact = typeof contacts.$inferSelect;
export type NewContact = typeof contacts.$inferInsert;

export type Pipeline = typeof pipelines.$inferSelect;
export type NewPipeline = typeof pipelines.$inferInsert;

export type PipelineStage = typeof pipelineStages.$inferSelect;
export type NewPipelineStage = typeof pipelineStages.$inferInsert;

export type Opportunity = typeof opportunities.$inferSelect;
export type NewOpportunity = typeof opportunities.$inferInsert;

export type OpportunityStageHistory = typeof opportunityStageHistory.$inferSelect;
export type NewOpportunityStageHistory = typeof opportunityStageHistory.$inferInsert;

export type Note = typeof notes.$inferSelect;
export type NewNote = typeof notes.$inferInsert;

export type AuditLog = typeof auditLog.$inferSelect;
export type NewAuditLog = typeof auditLog.$inferInsert;

export type OutboxEvent = typeof outboxEvents.$inferSelect;
export type NewOutboxEvent = typeof outboxEvents.$inferInsert;

export type EmailLog = typeof emailLog.$inferSelect;
export type NewEmailLog = typeof emailLog.$inferInsert;

export type MetaConnection = typeof metaConnections.$inferSelect;
export type NewMetaConnection = typeof metaConnections.$inferInsert;

export type MetaPage = typeof metaPages.$inferSelect;
export type NewMetaPage = typeof metaPages.$inferInsert;

export type MetaForm = typeof metaForms.$inferSelect;
export type NewMetaForm = typeof metaForms.$inferInsert;

export type LeadIngestRoute = typeof leadIngestRoutes.$inferSelect;
export type NewLeadIngestRoute = typeof leadIngestRoutes.$inferInsert;

export type LeadFieldMapping = typeof leadFieldMappings.$inferSelect;
export type NewLeadFieldMapping = typeof leadFieldMappings.$inferInsert;

export type WebhookEvent = typeof webhookEvents.$inferSelect;
export type NewWebhookEvent = typeof webhookEvents.$inferInsert;

export type LeadAttribution = typeof leadAttribution.$inferSelect;
export type NewLeadAttribution = typeof leadAttribution.$inferInsert;

export type MetaLeadRaw = typeof metaLeadRaw.$inferSelect;
export type NewMetaLeadRaw = typeof metaLeadRaw.$inferInsert;

export type CrmSettings = typeof crmSettings.$inferSelect;
export type NewCrmSettings = typeof crmSettings.$inferInsert;

export type Agency = typeof agencies.$inferSelect;
export type NewAgency = typeof agencies.$inferInsert;

export type AgencyMembership = typeof agencyMemberships.$inferSelect;
export type NewAgencyMembership = typeof agencyMemberships.$inferInsert;

export type AgencyInvite = typeof agencyInvites.$inferSelect;
export type NewAgencyInvite = typeof agencyInvites.$inferInsert;

// SaaS Mode types
export type AgencyStripeAccount = typeof agencyStripeAccounts.$inferSelect;
export type NewAgencyStripeAccount = typeof agencyStripeAccounts.$inferInsert;

export type AgencyPricingPlan = typeof agencyPricingPlans.$inferSelect;
export type NewAgencyPricingPlan = typeof agencyPricingPlans.$inferInsert;

export type ClientSubscription = typeof clientSubscriptions.$inferSelect;
export type NewClientSubscription = typeof clientSubscriptions.$inferInsert;

export type AgencySaasSettings = typeof agencySaasSettings.$inferSelect;
export type NewAgencySaasSettings = typeof agencySaasSettings.$inferInsert;

export type AgencyInvoice = typeof agencyInvoices.$inferSelect;
export type NewAgencyInvoice = typeof agencyInvoices.$inferInsert;

// Invoicing types
export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;

export type Quotation = typeof quotations.$inferSelect;
export type NewQuotation = typeof quotations.$inferInsert;

export type Invoice = typeof invoices.$inferSelect;
export type NewInvoice = typeof invoices.$inferInsert;

export type LineItem = typeof lineItems.$inferSelect;
export type NewLineItem = typeof lineItems.$inferInsert;

export type Payment = typeof payments.$inferSelect;
export type NewPayment = typeof payments.$inferInsert;

export type InvoiceSettings = typeof invoiceSettings.$inferSelect;
export type NewInvoiceSettings = typeof invoiceSettings.$inferInsert;

export type RecurringInvoice = typeof recurringInvoices.$inferSelect;
export type NewRecurringInvoice = typeof recurringInvoices.$inferInsert;

export type Expense = typeof expenses.$inferSelect;
export type NewExpense = typeof expenses.$inferInsert;

export type CreditNote = typeof creditNotes.$inferSelect;
export type NewCreditNote = typeof creditNotes.$inferInsert;

export type CreditNoteLineItem = typeof creditNoteLineItems.$inferSelect;
export type NewCreditNoteLineItem = typeof creditNoteLineItems.$inferInsert;

export type Notification = typeof notifications.$inferSelect;
export type NewNotification = typeof notifications.$inferInsert;

// ============================================
// Admin: Cron Job Monitoring
// ============================================
export const cronJobStatusEnum = pgEnum("cron_job_status", [
  "running",
  "success",
  "failed",
  "timeout",
]);

export const cronJobRuns = pgTable("cron_job_runs", {
  id: serial("id").primaryKey(),
  jobName: varchar("job_name", { length: 100 }).notNull(),
  status: cronJobStatusEnum("status").notNull(),
  startedAt: timestamp("started_at").notNull(),
  completedAt: timestamp("completed_at"),
  duration: integer("duration"), // milliseconds
  itemsProcessed: integer("items_processed").default(0),
  errorMessage: text("error_message"),
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => [
  index("cron_job_runs_name_idx").on(table.jobName),
  index("cron_job_runs_status_idx").on(table.status),
  index("cron_job_runs_started_idx").on(table.startedAt),
]);

export const cronJobConfigs = pgTable("cron_job_configs", {
  id: serial("id").primaryKey(),
  jobName: varchar("job_name", { length: 100 }).notNull().unique(),
  schedule: varchar("schedule", { length: 100 }).notNull(), // cron expression
  description: text("description"),
  isEnabled: boolean("is_enabled").default(true).notNull(),
  lastRunAt: timestamp("last_run_at"),
  nextRunAt: timestamp("next_run_at"),
  consecutiveFailures: integer("consecutive_failures").default(0).notNull(),
  alertThreshold: integer("alert_threshold").default(3).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ============================================
// Admin: Announcements System
// ============================================
export const announcementTypeEnum = pgEnum("announcement_type", [
  "info",
  "warning",
  "feature",
  "maintenance",
]);

export const announcementStatusEnum = pgEnum("announcement_status", [
  "draft",
  "scheduled",
  "active",
  "expired",
]);

export const announcements = pgTable("announcements", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content").notNull(),
  type: announcementTypeEnum("type").default("info").notNull(),
  status: announcementStatusEnum("status").default("draft").notNull(),
  target: varchar("target", { length: 20 }).default("all").notNull(), // all, agencies, orgs, specific
  targetAgencyIds: jsonb("target_agency_ids").$type<number[]>(),
  targetOrgIds: jsonb("target_org_ids").$type<number[]>(),
  publishAt: timestamp("publish_at"),
  expiresAt: timestamp("expires_at"),
  dismissible: boolean("dismissible").default(true).notNull(),
  showOnDashboard: boolean("show_on_dashboard").default(true).notNull(),
  createdBy: varchar("created_by", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => [
  index("announcements_status_idx").on(table.status),
  index("announcements_type_idx").on(table.type),
  index("announcements_publish_idx").on(table.publishAt),
]);

export const announcementDismissals = pgTable("announcement_dismissals", {
  id: serial("id").primaryKey(),
  announcementId: integer("announcement_id")
    .notNull()
    .references(() => announcements.id, { onDelete: "cascade" }),
  userId: varchar("user_id", { length: 255 }).notNull(),
  dismissedAt: timestamp("dismissed_at").defaultNow().notNull(),
}, (table) => [
  uniqueIndex("dismissal_user_announcement_idx").on(table.announcementId, table.userId),
  index("dismissal_announcement_idx").on(table.announcementId),
]);

export const announcementsRelations = relations(announcements, ({ many }) => ({
  dismissals: many(announcementDismissals),
}));

export const announcementDismissalsRelations = relations(announcementDismissals, ({ one }) => ({
  announcement: one(announcements, {
    fields: [announcementDismissals.announcementId],
    references: [announcements.id],
  }),
}));

// ============================================
// Admin: Feature Flags
// ============================================
export const featureFlagTypeEnum = pgEnum("feature_flag_type", [
  "boolean",
  "percentage",
  "tier_based",
]);

export const featureFlags = pgTable("feature_flags", {
  id: serial("id").primaryKey(),
  key: varchar("key", { length: 100 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  type: featureFlagTypeEnum("type").default("boolean").notNull(),
  defaultEnabled: boolean("default_enabled").default(false).notNull(),
  rolloutPercentage: integer("rollout_percentage").default(0),
  enabledTiers: jsonb("enabled_tiers").$type<string[]>(), // ["starter", "unlimited", "saas_pro"]
  isBeta: boolean("is_beta").default(false).notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => [
  index("feature_flags_key_idx").on(table.key),
  index("feature_flags_active_idx").on(table.isActive),
]);

export const featureFlagOverrides = pgTable("feature_flag_overrides", {
  id: serial("id").primaryKey(),
  featureFlagId: integer("feature_flag_id")
    .notNull()
    .references(() => featureFlags.id, { onDelete: "cascade" }),
  orgId: integer("org_id").references(() => orgs.id, { onDelete: "cascade" }),
  agencyId: integer("agency_id").references(() => agencies.id, { onDelete: "cascade" }),
  enabled: boolean("enabled").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => [
  index("override_flag_idx").on(table.featureFlagId),
  index("override_org_idx").on(table.orgId),
  index("override_agency_idx").on(table.agencyId),
]);

export const featureFlagsRelations = relations(featureFlags, ({ many }) => ({
  overrides: many(featureFlagOverrides),
}));

export const featureFlagOverridesRelations = relations(featureFlagOverrides, ({ one }) => ({
  flag: one(featureFlags, {
    fields: [featureFlagOverrides.featureFlagId],
    references: [featureFlags.id],
  }),
  org: one(orgs, {
    fields: [featureFlagOverrides.orgId],
    references: [orgs.id],
  }),
  agency: one(agencies, {
    fields: [featureFlagOverrides.agencyId],
    references: [agencies.id],
  }),
}));

// ============================================
// Admin: Support Tickets
// ============================================
export const supportTicketStatusEnum = pgEnum("support_ticket_status", [
  "new",
  "in_progress",
  "waiting_reply",
  "resolved",
  "closed",
]);

export const supportTicketPriorityEnum = pgEnum("support_ticket_priority", [
  "low",
  "medium",
  "high",
  "urgent",
]);

export const supportTicketTypeEnum = pgEnum("support_ticket_type", [
  "bug",
  "feature_request",
  "question",
  "feedback",
  "other",
]);

export const supportTickets = pgTable("support_tickets", {
  id: serial("id").primaryKey(),
  orgId: integer("org_id").references(() => orgs.id, { onDelete: "set null" }),
  userId: integer("user_id").references(() => users.id, { onDelete: "set null" }),
  userEmail: varchar("user_email", { length: 255 }).notNull(),
  userName: varchar("user_name", { length: 255 }),
  subject: varchar("subject", { length: 255 }).notNull(),
  message: text("message").notNull(),
  type: supportTicketTypeEnum("type").default("feedback").notNull(),
  status: supportTicketStatusEnum("status").default("new").notNull(),
  priority: supportTicketPriorityEnum("priority").default("medium").notNull(),
  assignedTo: varchar("assigned_to", { length: 255 }),
  userAgent: text("user_agent"),
  pageUrl: varchar("page_url", { length: 500 }),
  metadata: jsonb("metadata"),
  resolvedAt: timestamp("resolved_at"),
  resolutionNotes: text("resolution_notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => [
  index("support_ticket_status_idx").on(table.status),
  index("support_ticket_priority_idx").on(table.priority),
  index("support_ticket_user_idx").on(table.userId),
  index("support_ticket_org_idx").on(table.orgId),
  index("support_ticket_created_idx").on(table.createdAt),
]);

export const supportTicketReplies = pgTable("support_ticket_replies", {
  id: serial("id").primaryKey(),
  ticketId: integer("ticket_id")
    .notNull()
    .references(() => supportTickets.id, { onDelete: "cascade" }),
  isAdminReply: boolean("is_admin_reply").default(false).notNull(),
  senderEmail: varchar("sender_email", { length: 255 }).notNull(),
  senderName: varchar("sender_name", { length: 255 }),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => [
  index("reply_ticket_idx").on(table.ticketId),
]);

export const supportTicketsRelations = relations(supportTickets, ({ one, many }) => ({
  org: one(orgs, {
    fields: [supportTickets.orgId],
    references: [orgs.id],
  }),
  user: one(users, {
    fields: [supportTickets.userId],
    references: [users.id],
  }),
  replies: many(supportTicketReplies),
}));

export const supportTicketRepliesRelations = relations(supportTicketReplies, ({ one }) => ({
  ticket: one(supportTickets, {
    fields: [supportTicketReplies.ticketId],
    references: [supportTickets.id],
  }),
}));

// Admin types
export type CronJobRun = typeof cronJobRuns.$inferSelect;
export type NewCronJobRun = typeof cronJobRuns.$inferInsert;

export type CronJobConfig = typeof cronJobConfigs.$inferSelect;
export type NewCronJobConfig = typeof cronJobConfigs.$inferInsert;

export type Announcement = typeof announcements.$inferSelect;
export type NewAnnouncement = typeof announcements.$inferInsert;

export type AnnouncementDismissal = typeof announcementDismissals.$inferSelect;
export type NewAnnouncementDismissal = typeof announcementDismissals.$inferInsert;

export type FeatureFlag = typeof featureFlags.$inferSelect;
export type NewFeatureFlag = typeof featureFlags.$inferInsert;

export type FeatureFlagOverride = typeof featureFlagOverrides.$inferSelect;
export type NewFeatureFlagOverride = typeof featureFlagOverrides.$inferInsert;

export type SupportTicket = typeof supportTickets.$inferSelect;
export type NewSupportTicket = typeof supportTickets.$inferInsert;

export type SupportTicketReply = typeof supportTicketReplies.$inferSelect;
export type NewSupportTicketReply = typeof supportTicketReplies.$inferInsert;

// ============================================
// AI Insights Cache & Feedback
// ============================================
export const aiInsightTypeEnum = pgEnum("ai_insight_type", [
  "lead_priority",
  "pipeline_health",
  "next_actions",
  "performance",
]);

export const aiInsightStatusEnum = pgEnum("ai_insight_status", [
  "valid",
  "stale",
  "generating",
  "error",
]);

export const aiInsightFeedbackTypeEnum = pgEnum("ai_insight_feedback_type", [
  "acted",
  "dismissed",
  "helpful",
  "not_helpful",
]);

export const aiInsightsCache = pgTable("ai_insights_cache", {
  id: serial("id").primaryKey(),
  workspaceId: integer("workspace_id")
    .notNull()
    .references(() => workspaces.id, { onDelete: "cascade" }),
  insightType: aiInsightTypeEnum("insight_type").notNull(),
  data: jsonb("data").notNull(),
  generatedAt: timestamp("generated_at").defaultNow().notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  inputTokens: integer("input_tokens"),
  outputTokens: integer("output_tokens"),
  status: aiInsightStatusEnum("status").default("valid").notNull(),
  errorMessage: text("error_message"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => [
  index("ai_insights_workspace_idx").on(table.workspaceId),
  index("ai_insights_type_idx").on(table.insightType),
  index("ai_insights_status_idx").on(table.status),
  index("ai_insights_expires_idx").on(table.expiresAt),
]);

export const aiInsightFeedback = pgTable("ai_insight_feedback", {
  id: serial("id").primaryKey(),
  workspaceId: integer("workspace_id")
    .notNull()
    .references(() => workspaces.id, { onDelete: "cascade" }),
  insightType: aiInsightTypeEnum("insight_type").notNull(),
  feedbackType: aiInsightFeedbackTypeEnum("feedback_type").notNull(),
  insightCacheId: integer("insight_cache_id").references(() => aiInsightsCache.id, { onDelete: "set null" }),
  entityType: varchar("entity_type", { length: 50 }),
  entityId: integer("entity_id"),
  comment: text("comment"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => [
  index("ai_feedback_workspace_idx").on(table.workspaceId),
  index("ai_feedback_type_idx").on(table.insightType),
  index("ai_feedback_created_idx").on(table.createdAt),
]);

export const aiInsightsCacheRelations = relations(aiInsightsCache, ({ one, many }) => ({
  workspace: one(workspaces, {
    fields: [aiInsightsCache.workspaceId],
    references: [workspaces.id],
  }),
  feedback: many(aiInsightFeedback),
}));

export const aiInsightFeedbackRelations = relations(aiInsightFeedback, ({ one }) => ({
  workspace: one(workspaces, {
    fields: [aiInsightFeedback.workspaceId],
    references: [workspaces.id],
  }),
  insightCache: one(aiInsightsCache, {
    fields: [aiInsightFeedback.insightCacheId],
    references: [aiInsightsCache.id],
  }),
}));

// AI Insights types
export type AiInsightsCache = typeof aiInsightsCache.$inferSelect;
export type NewAiInsightsCache = typeof aiInsightsCache.$inferInsert;

export type AiInsightFeedback = typeof aiInsightFeedback.$inferSelect;
export type NewAiInsightFeedback = typeof aiInsightFeedback.$inferInsert;

// ============================================
// Platform Lead Pool (System-wide Lost Leads)
// ============================================
// This table stores leads that are "lost" from their original workspace
// but available for resale to other businesses by the platform admin.
// Completely isolated from workspace RLS - only super-admin access.

export const platformLeadPoolStatusEnum = pgEnum("platform_lead_pool_status", [
  "available",    // New, not yet claimed
  "reserved",     // Reserved by a potential buyer
  "sold",         // Successfully sold to another business
  "expired",      // No longer available (too old, etc.)
  "withdrawn",    // Removed by admin
]);

export const platformLeadsPool = pgTable("platform_leads_pool", {
  id: serial("id").primaryKey(),

  // Reference to original contact (nullable in case contact is deleted)
  originalContactId: integer("original_contact_id").references(() => contacts.id, { onDelete: "set null" }),

  // Source tracking - where did this lead come from
  sourceWorkspaceId: integer("source_workspace_id").references(() => workspaces.id, { onDelete: "set null" }),
  sourceOrgId: integer("source_org_id").references(() => orgs.id, { onDelete: "set null" }),
  sourceAgencyId: integer("source_agency_id").references(() => agencies.id, { onDelete: "set null" }),

  // Denormalized lead data (preserved even if original is deleted)
  firstName: varchar("first_name", { length: 255 }),
  lastName: varchar("last_name", { length: 255 }),
  email: varchar("email", { length: 255 }),
  phone: varchar("phone", { length: 50 }),
  company: varchar("company", { length: 255 }),
  street: varchar("street", { length: 255 }),
  houseNumber: varchar("house_number", { length: 20 }),
  postalCode: varchar("postal_code", { length: 20 }),
  city: varchar("city", { length: 255 }),
  province: varchar("province", { length: 255 }),
  country: varchar("country", { length: 100 }),

  // Categorization
  label: varchar("label", { length: 255 }), // e.g., "Buiten werkgebied", "Te ver"
  reason: varchar("reason", { length: 255 }), // Why it became available (outside_area, not_interested, etc.)
  notes: text("notes"), // Admin notes

  // Status tracking
  status: platformLeadPoolStatusEnum("status").default("available").notNull(),

  // Sale information
  soldToOrgId: integer("sold_to_org_id").references(() => orgs.id, { onDelete: "set null" }),
  soldToWorkspaceId: integer("sold_to_workspace_id").references(() => workspaces.id, { onDelete: "set null" }),
  soldToAgencyId: integer("sold_to_agency_id").references(() => agencies.id, { onDelete: "set null" }),
  price: decimal("price", { precision: 10, scale: 2 }),
  soldAt: timestamp("sold_at"),
  soldById: integer("sold_by_id").references(() => users.id, { onDelete: "set null" }),

  // Reservation (for pending sales)
  reservedUntil: timestamp("reserved_until"),
  reservedById: integer("reserved_by_id").references(() => users.id, { onDelete: "set null" }),

  // Audit trail
  addedById: integer("added_by_id").references(() => users.id, { onDelete: "set null" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => [
  index("platform_leads_pool_status_idx").on(table.status),
  index("platform_leads_pool_source_org_idx").on(table.sourceOrgId),
  index("platform_leads_pool_source_agency_idx").on(table.sourceAgencyId),
  index("platform_leads_pool_city_idx").on(table.city),
  index("platform_leads_pool_postal_idx").on(table.postalCode),
  index("platform_leads_pool_created_idx").on(table.createdAt),
  index("platform_leads_pool_sold_to_idx").on(table.soldToOrgId),
]);

export const platformLeadsPoolRelations = relations(platformLeadsPool, ({ one }) => ({
  originalContact: one(contacts, {
    fields: [platformLeadsPool.originalContactId],
    references: [contacts.id],
  }),
  sourceWorkspace: one(workspaces, {
    fields: [platformLeadsPool.sourceWorkspaceId],
    references: [workspaces.id],
  }),
  sourceOrg: one(orgs, {
    fields: [platformLeadsPool.sourceOrgId],
    references: [orgs.id],
  }),
  sourceAgency: one(agencies, {
    fields: [platformLeadsPool.sourceAgencyId],
    references: [agencies.id],
  }),
  soldToOrg: one(orgs, {
    fields: [platformLeadsPool.soldToOrgId],
    references: [orgs.id],
  }),
  soldToWorkspace: one(workspaces, {
    fields: [platformLeadsPool.soldToWorkspaceId],
    references: [workspaces.id],
  }),
  soldToAgency: one(agencies, {
    fields: [platformLeadsPool.soldToAgencyId],
    references: [agencies.id],
  }),
  addedBy: one(users, {
    fields: [platformLeadsPool.addedById],
    references: [users.id],
  }),
  soldBy: one(users, {
    fields: [platformLeadsPool.soldById],
    references: [users.id],
  }),
  reservedBy: one(users, {
    fields: [platformLeadsPool.reservedById],
    references: [users.id],
  }),
}));

// Platform Leads Pool types
export type PlatformLeadPool = typeof platformLeadsPool.$inferSelect;
export type NewPlatformLeadPool = typeof platformLeadsPool.$inferInsert;

// ============================================
// Email Templates (Custom User Templates)
// ============================================
export const emailTemplateTypeEnum = pgEnum("email_template_type", [
  "lead_notification",   // New lead received
  "follow_up",          // Follow-up reminder
  "quote_sent",         // Quotation sent
  "invoice_sent",       // Invoice sent
  "payment_reminder",   // Payment reminder
  "welcome",            // Welcome email
  "custom",             // User-defined template
]);

export const emailTemplates = pgTable("email_templates", {
  id: serial("id").primaryKey(),
  workspaceId: integer("workspace_id")
    .notNull()
    .references(() => workspaces.id, { onDelete: "cascade" }),
  // Template identification
  name: varchar("name", { length: 100 }).notNull(),
  type: emailTemplateTypeEnum("type").default("custom").notNull(),
  // Content
  subject: varchar("subject", { length: 500 }).notNull(),
  bodyHtml: text("body_html").notNull(),
  bodyText: text("body_text"), // Plain text fallback
  // Variables (stored as JSON array of available vars)
  // e.g., ["contact.firstName", "contact.email", "opportunity.title"]
  variables: jsonb("variables").$type<string[]>().default([]),
  // Status
  isActive: boolean("is_active").default(true).notNull(),
  isDefault: boolean("is_default").default(false).notNull(), // System default template
  // Metadata
  createdById: integer("created_by_id").references(() => users.id, { onDelete: "set null" }),
  lastUsedAt: timestamp("last_used_at"),
  usageCount: integer("usage_count").default(0).notNull(),
  // Timestamps
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => [
  index("email_template_workspace_idx").on(table.workspaceId),
  index("email_template_type_idx").on(table.type),
  index("email_template_active_idx").on(table.isActive),
  uniqueIndex("email_template_workspace_name_idx").on(table.workspaceId, table.name),
]);

export const emailTemplatesRelations = relations(emailTemplates, ({ one }) => ({
  workspace: one(workspaces, {
    fields: [emailTemplates.workspaceId],
    references: [workspaces.id],
  }),
  createdBy: one(users, {
    fields: [emailTemplates.createdById],
    references: [users.id],
  }),
}));

// Email Templates types
export type EmailTemplate = typeof emailTemplates.$inferSelect;
export type NewEmailTemplate = typeof emailTemplates.$inferInsert;

// ============================================
// Notification Preferences (Per-Workspace Email Settings)
// ============================================
export const notificationEventEnum = pgEnum("notification_event", [
  // Lead events
  "new_lead",              // New lead received (Meta, API, manual)
  "lead_assigned",         // Lead/opportunity assigned to user
  // Follow-up events
  "follow_up_reminder",    // Follow-up reminder
  "lead_lost",             // Lead marked as lost after max attempts
  // Invoicing events
  "invoice_sent",          // Invoice sent to customer
  "invoice_reminder",      // Payment reminder
  "quote_sent",            // Quotation sent
  // Team events
  "team_invite",           // Team member invited
  "welcome",               // Welcome email for new users
]);

export const notificationModeEnum = pgEnum("notification_mode", [
  "disabled",        // Don't send email
  "system_default",  // Use built-in system template
  "custom_template", // Use custom workspace template
]);

export const notificationPreferences = pgTable("notification_preferences", {
  id: serial("id").primaryKey(),
  workspaceId: integer("workspace_id")
    .notNull()
    .references(() => workspaces.id, { onDelete: "cascade" }),
  // Event configuration
  eventType: notificationEventEnum("event_type").notNull(),
  // How to handle this event
  mode: notificationModeEnum("mode").default("system_default").notNull(),
  // Custom template (only used when mode = custom_template)
  customTemplateId: integer("custom_template_id").references(() => emailTemplates.id, { onDelete: "set null" }),
  // Additional settings
  emailEnabled: boolean("email_enabled").default(true).notNull(),
  // Timestamps
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => [
  index("notification_pref_workspace_idx").on(table.workspaceId),
  uniqueIndex("notification_pref_workspace_event_idx").on(table.workspaceId, table.eventType),
]);

export const notificationPreferencesRelations = relations(notificationPreferences, ({ one }) => ({
  workspace: one(workspaces, {
    fields: [notificationPreferences.workspaceId],
    references: [workspaces.id],
  }),
  customTemplate: one(emailTemplates, {
    fields: [notificationPreferences.customTemplateId],
    references: [emailTemplates.id],
  }),
}));

// Notification Preferences types
export type NotificationPreference = typeof notificationPreferences.$inferSelect;
export type NewNotificationPreference = typeof notificationPreferences.$inferInsert;
