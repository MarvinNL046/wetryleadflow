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
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Enums
export const roleEnum = pgEnum("role", ["owner", "admin", "member"]);

// ============================================
// Organizations (Tenants)
// ============================================
export const orgs = pgTable("orgs", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const orgsRelations = relations(orgs, ({ many }) => ({
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
  deals: many(deals),
  notes: many(notes),
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
  deals: many(deals),
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
  deals: many(deals),
}));

// ============================================
// CRM: Deals
// ============================================
export const deals = pgTable("deals", {
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
  index("deal_workspace_idx").on(table.workspaceId),
  index("deal_pipeline_idx").on(table.pipelineId),
  index("deal_stage_idx").on(table.stageId),
  index("deal_contact_idx").on(table.contactId),
]);

export const dealsRelations = relations(deals, ({ one, many }) => ({
  workspace: one(workspaces, {
    fields: [deals.workspaceId],
    references: [workspaces.id],
  }),
  pipeline: one(pipelines, {
    fields: [deals.pipelineId],
    references: [pipelines.id],
  }),
  stage: one(pipelineStages, {
    fields: [deals.stageId],
    references: [pipelineStages.id],
  }),
  contact: one(contacts, {
    fields: [deals.contactId],
    references: [contacts.id],
  }),
  assignedTo: one(users, {
    fields: [deals.assignedToId],
    references: [users.id],
  }),
  createdBy: one(users, {
    fields: [deals.createdById],
    references: [users.id],
  }),
  stageHistory: many(dealStageHistory),
  notes: many(notes),
}));

// ============================================
// CRM: Deal Stage History
// ============================================
export const dealStageHistory = pgTable("deal_stage_history", {
  id: serial("id").primaryKey(),
  dealId: integer("deal_id")
    .notNull()
    .references(() => deals.id, { onDelete: "cascade" }),
  fromStageId: integer("from_stage_id").references(() => pipelineStages.id),
  toStageId: integer("to_stage_id")
    .notNull()
    .references(() => pipelineStages.id),
  movedById: integer("moved_by_id").references(() => users.id),
  movedAt: timestamp("moved_at").defaultNow().notNull(),
}, (table) => [
  index("history_deal_idx").on(table.dealId),
  index("history_moved_at_idx").on(table.movedAt),
]);

export const dealStageHistoryRelations = relations(dealStageHistory, ({ one }) => ({
  deal: one(deals, {
    fields: [dealStageHistory.dealId],
    references: [deals.id],
  }),
  fromStage: one(pipelineStages, {
    fields: [dealStageHistory.fromStageId],
    references: [pipelineStages.id],
  }),
  toStage: one(pipelineStages, {
    fields: [dealStageHistory.toStageId],
    references: [pipelineStages.id],
  }),
  movedBy: one(users, {
    fields: [dealStageHistory.movedById],
    references: [users.id],
  }),
}));

// ============================================
// CRM: Notes
// ============================================
export const noteTypeEnum = pgEnum("note_type", ["contact", "deal"]);

export const notes = pgTable("notes", {
  id: serial("id").primaryKey(),
  workspaceId: integer("workspace_id")
    .notNull()
    .references(() => workspaces.id, { onDelete: "cascade" }),
  type: noteTypeEnum("type").notNull(),
  contactId: integer("contact_id").references(() => contacts.id, { onDelete: "cascade" }),
  dealId: integer("deal_id").references(() => deals.id, { onDelete: "cascade" }),
  content: text("content").notNull(),
  createdById: integer("created_by_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => [
  index("note_workspace_idx").on(table.workspaceId),
  index("note_contact_idx").on(table.contactId),
  index("note_deal_idx").on(table.dealId),
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
  deal: one(deals, {
    fields: [notes.dealId],
    references: [deals.id],
  }),
  createdBy: one(users, {
    fields: [notes.createdById],
    references: [users.id],
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
  action: varchar("action", { length: 100 }).notNull(), // e.g., "deal.moved", "contact.created"
  // Target entity
  entityType: varchar("entity_type", { length: 50 }).notNull(), // e.g., "deal", "contact", "user"
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
  eventType: varchar("event_type", { length: 100 }).notNull(), // e.g., "deal.moved", "contact.created"
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

export type Deal = typeof deals.$inferSelect;
export type NewDeal = typeof deals.$inferInsert;

export type DealStageHistory = typeof dealStageHistory.$inferSelect;
export type NewDealStageHistory = typeof dealStageHistory.$inferInsert;

export type Note = typeof notes.$inferSelect;
export type NewNote = typeof notes.$inferInsert;

export type AuditLog = typeof auditLog.$inferSelect;
export type NewAuditLog = typeof auditLog.$inferInsert;

export type OutboxEvent = typeof outboxEvents.$inferSelect;
export type NewOutboxEvent = typeof outboxEvents.$inferInsert;

export type EmailLog = typeof emailLog.$inferSelect;
export type NewEmailLog = typeof emailLog.$inferInsert;
