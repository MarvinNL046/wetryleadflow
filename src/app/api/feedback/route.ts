import { NextRequest, NextResponse } from "next/server";
import { sendEmail, FeedbackEmail, SupportTicketNewEmail } from "@/lib/email";
import { getAuthContext } from "@/lib/auth/context";
import { db } from "@/lib/db";
import { supportTickets } from "@/lib/db/schema";

const SUPPORT_EMAIL = process.env.SUPPORT_EMAIL || "support@wetryleadflow.com";

const FEEDBACK_EMAIL = process.env.FEEDBACK_EMAIL || "hello@wetryleadflow.com";

// Map feedback types to support ticket types
const feedbackTypeMap: Record<string, "bug" | "feature_request" | "question" | "feedback" | "other"> = {
  bug: "bug",
  feature: "feature_request",
  improvement: "feedback",
  other: "other",
};

export async function POST(request: NextRequest) {
  try {
    const ctx = await getAuthContext();

    if (!ctx) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { feedbackType, message, currentPage } = body;

    if (!feedbackType || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Get user info
    const userName = ctx.user.name || ctx.user.email || "Unknown User";
    const userEmail = ctx.user.email || "unknown@email.com";
    const workspaceName = ctx.workspace?.name;

    // Create support ticket in database
    const ticketType = feedbackTypeMap[feedbackType] || "feedback";
    const priority = feedbackType === "bug" ? "high" : "medium";
    const subject = `[${feedbackType.charAt(0).toUpperCase() + feedbackType.slice(1)}] ${message.slice(0, 100)}${message.length > 100 ? "..." : ""}`;
    const orgName = ctx.org?.name;

    let ticketId: number | null = null;
    try {
      const [ticket] = await db.insert(supportTickets).values({
        userEmail,
        userName,
        subject,
        message,
        type: ticketType,
        status: "new",
        priority,
        pageUrl: currentPage,
        userAgent: request.headers.get("user-agent") || undefined,
        orgId: ctx.org?.id,
        metadata: {
          workspaceName,
          feedbackType,
        },
      }).returning({ id: supportTickets.id });
      ticketId = ticket.id;
    } catch (dbError) {
      console.error("[Feedback] Failed to create ticket:", dbError);
      // Continue with email sending even if ticket creation fails
    }

    // Send support ticket notification to admin (with link to ticket)
    if (ticketId) {
      const supportResult = await sendEmail({
        to: SUPPORT_EMAIL,
        subject: `[Support #${ticketId}] ${subject}`,
        template: SupportTicketNewEmail({
          ticketId,
          subject,
          userName,
          userEmail,
          message,
          type: ticketType,
          priority,
          pageUrl: currentPage,
          orgName,
        }),
        templateName: "support-ticket-new",
        replyTo: userEmail,
        relatedEntity: {
          type: "support_ticket",
          id: ticketId,
        },
        metadata: {
          feedbackType,
          ticketId,
        },
      });

      if (!supportResult.success) {
        console.error("[Feedback] Failed to send support notification:", supportResult.error);
      }
    }

    // Also send the original feedback email for legacy purposes
    const result = await sendEmail({
      to: FEEDBACK_EMAIL,
      subject: `[LeadFlow Feedback] ${feedbackType.charAt(0).toUpperCase() + feedbackType.slice(1)}: ${message.slice(0, 50)}${message.length > 50 ? "..." : ""}`,
      template: FeedbackEmail({
        userName,
        userEmail,
        feedbackType,
        message,
        currentPage,
        workspaceName,
      }),
      templateName: "feedback",
      replyTo: userEmail,
      context: {
        workspaceId: ctx.workspace?.id,
      },
      metadata: {
        feedbackType,
        currentPage,
      },
    });

    if (!result.success) {
      console.error("[Feedback] Failed to send email:", result.error);
      // Don't fail the request if email fails but ticket was created
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Feedback] Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
