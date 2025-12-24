"use server";

import { db } from "@/lib/db";
import { supportTickets, supportTicketReplies, users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { stackServerApp } from "@/stack/server";

interface CreateTicketData {
  subject: string;
  message: string;
  type?: "bug" | "feature_request" | "question" | "feedback" | "other";
  pageUrl?: string;
  userAgent?: string;
  metadata?: Record<string, unknown>;
}

/**
 * Create a new support ticket (user-facing)
 * Requires authentication - uses email from Stack Auth
 */
export async function createSupportTicket(data: CreateTicketData) {
  const stackUser = await stackServerApp.getUser();
  if (!stackUser || !stackUser.primaryEmail) {
    throw new Error("Not authenticated");
  }

  // Get user's org if they have one
  const dbUser = await db.query.users.findFirst({
    where: eq(users.externalId, stackUser.id),
  });

  const [ticket] = await db
    .insert(supportTickets)
    .values({
      userEmail: stackUser.primaryEmail,
      userName: stackUser.displayName || undefined,
      subject: data.subject,
      message: data.message,
      type: data.type || "feedback",
      userId: dbUser?.id,
      pageUrl: data.pageUrl,
      userAgent: data.userAgent,
      metadata: data.metadata,
      status: "new",
      priority: "medium",
    })
    .returning();

  // TODO: Send email notification to admin

  return ticket;
}

/**
 * Get tickets for the authenticated user
 * Requires authentication - only returns user's own tickets
 */
export async function getUserTickets() {
  const stackUser = await stackServerApp.getUser();
  if (!stackUser || !stackUser.primaryEmail) {
    throw new Error("Not authenticated");
  }

  const tickets = await db.query.supportTickets.findMany({
    where: eq(supportTickets.userEmail, stackUser.primaryEmail),
    orderBy: (tickets, { desc }) => [desc(tickets.createdAt)],
    with: {
      replies: true,
    },
  });

  return tickets;
}

/**
 * Add a reply to a ticket (from user side)
 * Requires authentication - verifies user owns the ticket
 */
export async function addUserReply(ticketId: number, message: string) {
  const stackUser = await stackServerApp.getUser();
  if (!stackUser || !stackUser.primaryEmail) {
    throw new Error("Not authenticated");
  }

  // Verify user owns the ticket
  const ticket = await db.query.supportTickets.findFirst({
    where: eq(supportTickets.id, ticketId),
  });

  if (!ticket || ticket.userEmail !== stackUser.primaryEmail) {
    throw new Error("Ticket not found or unauthorized");
  }

  const [reply] = await db
    .insert(supportTicketReplies)
    .values({
      ticketId,
      isAdminReply: false,
      senderEmail: stackUser.primaryEmail,
      senderName: stackUser.displayName || undefined,
      message,
    })
    .returning();

  // Update ticket status to indicate user replied
  await db
    .update(supportTickets)
    .set({
      status: "in_progress",
      updatedAt: new Date(),
    })
    .where(eq(supportTickets.id, ticketId));

  revalidatePath(`/support/${ticketId}`);

  return reply;
}
