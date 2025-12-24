// ============================================
// Action Types (for type safety)
// ============================================
export const AuditActions = {
  // Contacts
  CONTACT_CREATED: "contact.created",
  CONTACT_UPDATED: "contact.updated",
  CONTACT_DELETED: "contact.deleted",
  // Opportunities
  OPPORTUNITY_CREATED: "opportunity.created",
  OPPORTUNITY_UPDATED: "opportunity.updated",
  OPPORTUNITY_DELETED: "opportunity.deleted",
  OPPORTUNITY_MOVED: "opportunity.moved",
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
  USER_PROFILE_UPDATED: "user.profile_updated",
  USER_DELETED: "user.deleted",
  // Auth
  USER_SIGNED_IN: "user.signed_in",
  USER_SIGNED_OUT: "user.signed_out",
  // Impersonation
  IMPERSONATE_START: "user.impersonate_start",
  IMPERSONATE_STOP: "user.impersonate_stop",
  // Org & Workspace
  ORG_CREATED: "org.created",
  ORG_UPDATED: "org.updated",
  ORG_DELETED: "org.deleted",
  WORKSPACE_CREATED: "workspace.created",
  WORKSPACE_UPDATED: "workspace.updated",
} as const;

export type AuditAction = (typeof AuditActions)[keyof typeof AuditActions];

// ============================================
// Entity Types
// ============================================
export const EntityTypes = {
  CONTACT: "contact",
  OPPORTUNITY: "opportunity",
  PIPELINE: "pipeline",
  NOTE: "note",
  USER: "user",
  MEMBERSHIP: "membership",
  ORG: "org",
  WORKSPACE: "workspace",
} as const;

export type EntityType = (typeof EntityTypes)[keyof typeof EntityTypes];
