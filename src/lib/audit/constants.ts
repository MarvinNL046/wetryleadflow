// ============================================
// Action Types (for type safety)
// ============================================
export const AuditActions = {
  // Contacts
  CONTACT_CREATED: "contact.created",
  CONTACT_UPDATED: "contact.updated",
  CONTACT_DELETED: "contact.deleted",
  // Deals
  DEAL_CREATED: "deal.created",
  DEAL_UPDATED: "deal.updated",
  DEAL_DELETED: "deal.deleted",
  DEAL_MOVED: "deal.moved",
  // Pipelines
  PIPELINE_CREATED: "pipeline.created",
  PIPELINE_UPDATED: "pipeline.updated",
  PIPELINE_DELETED: "pipeline.deleted",
  // Notes
  NOTE_CREATED: "note.created",
  NOTE_DELETED: "note.deleted",
  // Users & Members
  USER_INVITED: "user.invited",
  USER_REMOVED: "user.removed",
  USER_ROLE_CHANGED: "user.role_changed",
  // Auth
  USER_SIGNED_IN: "user.signed_in",
  USER_SIGNED_OUT: "user.signed_out",
  // Org & Workspace
  ORG_CREATED: "org.created",
  ORG_UPDATED: "org.updated",
  WORKSPACE_CREATED: "workspace.created",
  WORKSPACE_UPDATED: "workspace.updated",
} as const;

export type AuditAction = (typeof AuditActions)[keyof typeof AuditActions];

// ============================================
// Entity Types
// ============================================
export const EntityTypes = {
  CONTACT: "contact",
  DEAL: "deal",
  PIPELINE: "pipeline",
  NOTE: "note",
  USER: "user",
  MEMBERSHIP: "membership",
  ORG: "org",
  WORKSPACE: "workspace",
} as const;

export type EntityType = (typeof EntityTypes)[keyof typeof EntityTypes];
