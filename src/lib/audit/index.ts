"use server";

import { headers } from "next/headers";
import { db, auditLog } from "@/lib/db";
import type { NewAuditLog } from "@/lib/db/schema";
import type { AuditAction, EntityType } from "./constants";

// Re-export constants for convenience (these are just types, not values)
export type { AuditAction, EntityType };

// ============================================
// Audit Context Interface
// ============================================
interface AuditContext {
  orgId?: number | null;
  workspaceId?: number | null;
  userId?: number | null;
  userEmail?: string | null;
}

interface AuditEntry {
  action: AuditAction;
  entityType: EntityType;
  entityId?: number | null;
  metadata?: Record<string, unknown>;
}

// ============================================
// Helper to get request context
// ============================================
async function getRequestContext(): Promise<{ ipAddress?: string; userAgent?: string }> {
  try {
    const headersList = await headers();
    const forwardedFor = headersList.get("x-forwarded-for");
    const ipAddress = forwardedFor?.split(",")[0]?.trim() || headersList.get("x-real-ip") || undefined;
    const userAgent = headersList.get("user-agent") || undefined;
    return { ipAddress, userAgent };
  } catch {
    // Headers not available (e.g., in scripts)
    return {};
  }
}

// ============================================
// Main Audit Logging Function
// ============================================
export async function logAudit(
  context: AuditContext,
  entry: AuditEntry
): Promise<void> {
  try {
    const requestContext = await getRequestContext();

    const logEntry: NewAuditLog = {
      orgId: context.orgId ?? null,
      workspaceId: context.workspaceId ?? null,
      userId: context.userId ?? null,
      userEmail: context.userEmail ?? null,
      action: entry.action,
      entityType: entry.entityType,
      entityId: entry.entityId ?? null,
      metadata: entry.metadata ?? null,
      ipAddress: requestContext.ipAddress ?? null,
      userAgent: requestContext.userAgent ?? null,
    };

    await db.insert(auditLog).values(logEntry);
  } catch (error) {
    // Log error but don't throw - audit logging should not break the main flow
    console.error("[Audit] Failed to log action:", error);
  }
}

// ============================================
// Convenience Functions
// ============================================

/**
 * Log a contact action
 */
export async function logContactAction(
  context: AuditContext,
  action: "contact.created" | "contact.updated" | "contact.deleted",
  contactId: number,
  metadata?: Record<string, unknown>
): Promise<void> {
  await logAudit(context, {
    action,
    entityType: "contact",
    entityId: contactId,
    metadata,
  });
}

/**
 * Log a deal action
 */
export async function logDealAction(
  context: AuditContext,
  action: "deal.created" | "deal.updated" | "deal.deleted" | "deal.moved",
  dealId: number,
  metadata?: Record<string, unknown>
): Promise<void> {
  await logAudit(context, {
    action,
    entityType: "deal",
    entityId: dealId,
    metadata,
  });
}

/**
 * Log a pipeline action
 */
export async function logPipelineAction(
  context: AuditContext,
  action: "pipeline.created" | "pipeline.updated" | "pipeline.deleted",
  pipelineId: number,
  metadata?: Record<string, unknown>
): Promise<void> {
  await logAudit(context, {
    action,
    entityType: "pipeline",
    entityId: pipelineId,
    metadata,
  });
}

/**
 * Log a user/membership action
 */
export async function logUserAction(
  context: AuditContext,
  action: "user.invited" | "user.removed" | "user.role_changed" | "user.signed_in" | "user.signed_out",
  targetUserId?: number,
  metadata?: Record<string, unknown>
): Promise<void> {
  await logAudit(context, {
    action,
    entityType: action.includes("role") ? "membership" : "user",
    entityId: targetUserId,
    metadata,
  });
}

/**
 * Log a note action
 */
export async function logNoteAction(
  context: AuditContext,
  action: "note.created" | "note.deleted",
  noteId: number,
  metadata?: Record<string, unknown>
): Promise<void> {
  await logAudit(context, {
    action,
    entityType: "note",
    entityId: noteId,
    metadata,
  });
}
