// ============================================
// Outbox Event Types
// ============================================
export const OutboxEventTypes = {
  // Contacts
  CONTACT_CREATED: "contact.created",
  CONTACT_UPDATED: "contact.updated",
  CONTACT_DELETED: "contact.deleted",
  CONTACT_FOLLOW_UP_NEEDED: "contact.follow_up_needed", // Triggered after 3+ unsuccessful calls
  // Opportunities
  OPPORTUNITY_CREATED: "opportunity.created",
  OPPORTUNITY_UPDATED: "opportunity.updated",
  OPPORTUNITY_DELETED: "opportunity.deleted",
  OPPORTUNITY_MOVED: "opportunity.moved",
  OPPORTUNITY_WON: "opportunity.won",
  OPPORTUNITY_LOST: "opportunity.lost",
  // Pipelines
  PIPELINE_CREATED: "pipeline.created",
  // Notes
  NOTE_CREATED: "note.created",
  // Users
  USER_INVITED: "user.invited",
  USER_SIGNED_UP: "user.signed_up",
} as const;

export type OutboxEventType = (typeof OutboxEventTypes)[keyof typeof OutboxEventTypes];

// ============================================
// Entity Types
// ============================================
export const EntityTypes = {
  CONTACT: "contact",
  OPPORTUNITY: "opportunity",
  PIPELINE: "pipeline",
  NOTE: "note",
  USER: "user",
} as const;

export type EntityType = (typeof EntityTypes)[keyof typeof EntityTypes];
