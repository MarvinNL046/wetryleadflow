// ============================================
// Outbox Event Types
// ============================================
export const OutboxEventTypes = {
  // Contacts
  CONTACT_CREATED: "contact.created",
  CONTACT_UPDATED: "contact.updated",
  CONTACT_DELETED: "contact.deleted",
  // Deals
  DEAL_CREATED: "deal.created",
  DEAL_UPDATED: "deal.updated",
  DEAL_DELETED: "deal.deleted",
  DEAL_MOVED: "deal.moved",
  DEAL_WON: "deal.won",
  DEAL_LOST: "deal.lost",
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
  DEAL: "deal",
  PIPELINE: "pipeline",
  NOTE: "note",
  USER: "user",
} as const;

export type EntityType = (typeof EntityTypes)[keyof typeof EntityTypes];
