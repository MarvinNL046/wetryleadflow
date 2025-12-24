import { NextRequest, NextResponse } from "next/server";
import * as React from "react";
import { db } from "@/lib/db";
import { opportunities, pipelineStages, opportunityStageHistory, notifications, contacts, workspaces, pipelines } from "@/lib/db/schema";
import { eq, and, lte, sql, isNotNull, ilike, or } from "drizzle-orm";
import { sendEmail, FarewellEmail } from "@/lib/email";

// Verify cron secret for security
const CRON_SECRET = process.env.CRON_SECRET;

/**
 * GET /api/cron/generate-follow-up-reminders
 * Scheduled job to create follow-up notifications for opportunities
 * that have been in a stage longer than the configured follow-up days.
 *
 * Per-stage settings:
 * - followUpEnabled: Enable follow-up reminders for this stage
 * - followUpDays: Days before triggering a follow-up
 * - isFinalAttempt: If true, this is the last attempt before Lost
 * - autoMoveToLost: Auto-move to Lost stage after follow-up period
 * - sendEmailOnLost: Send farewell email when moving to Lost
 *
 * Runs hourly (configured in vercel.json)
 */
export async function GET(request: NextRequest) {
  const startTime = Date.now();

  // Verify authorization
  const authHeader = request.headers.get("authorization");
  const cronHeader = request.headers.get("x-cron-secret");
  const providedSecret = authHeader?.replace("Bearer ", "") || cronHeader;

  if (process.env.NODE_ENV === "production" && CRON_SECRET) {
    if (providedSecret !== CRON_SECRET) {
      console.log("[Follow-up Reminders] Unauthorized request");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  try {
    console.log("[Follow-up Reminders] Starting scheduled reminder processing...");

    const now = new Date();
    let notificationsCreated = 0;
    let opportunitiesMovedToLost = 0;
    let emailsSent = 0;
    let errors = 0;

    // Find all stages with follow-up enabled
    const stagesWithFollowUp = await db
      .select({
        id: pipelineStages.id,
        pipelineId: pipelineStages.pipelineId,
        name: pipelineStages.name,
        followUpDays: pipelineStages.followUpDays,
        isFinalAttempt: pipelineStages.isFinalAttempt,
        autoMoveToLost: pipelineStages.autoMoveToLost,
        sendEmailOnLost: pipelineStages.sendEmailOnLost,
      })
      .from(pipelineStages)
      .where(
        and(
          eq(pipelineStages.followUpEnabled, true),
          isNotNull(pipelineStages.followUpDays)
        )
      );

    console.log(`[Follow-up Reminders] Found ${stagesWithFollowUp.length} stages with follow-up enabled`);

    // Process each stage
    for (const stage of stagesWithFollowUp) {
      try {
        const followUpDays = stage.followUpDays!;

        // Find the "Lost" stage for this pipeline (for autoMoveToLost)
        let lostStage: { id: number; name: string } | null = null;
        if (stage.autoMoveToLost) {
          const [foundLostStage] = await db
            .select({ id: pipelineStages.id, name: pipelineStages.name })
            .from(pipelineStages)
            .where(
              and(
                eq(pipelineStages.pipelineId, stage.pipelineId),
                or(
                  ilike(pipelineStages.name, "%verloren%"),
                  ilike(pipelineStages.name, "%lost%")
                )
              )
            )
            .limit(1);
          lostStage = foundLostStage || null;
        }

        // Find opportunities in this stage that have been there longer than followUpDays
        // by checking the most recent stage history entry
        const opportunitiesInStage = await db
          .select({
            opportunityId: opportunities.id,
            workspaceId: opportunities.workspaceId,
            title: opportunities.title,
            contactId: opportunities.contactId,
            stageId: opportunities.stageId,
            // Get the latest stage move timestamp
            lastMoved: sql<Date>`(
              SELECT moved_at FROM opportunity_stage_history
              WHERE opportunity_id = ${opportunities.id}
              AND to_stage_id = ${stage.id}
              ORDER BY moved_at DESC
              LIMIT 1
            )`,
          })
          .from(opportunities)
          .where(eq(opportunities.stageId, stage.id));

        for (const opp of opportunitiesInStage) {
          try {
            // Skip if no stage history (shouldn't happen but safety check)
            if (!opp.lastMoved) {
              continue;
            }

            // Calculate days in stage
            const daysInStage = Math.floor(
              (now.getTime() - new Date(opp.lastMoved).getTime()) / (1000 * 60 * 60 * 24)
            );

            // Check if follow-up is due
            if (daysInStage < followUpDays) {
              continue;
            }

            // Check if notification already exists for this opportunity
            const [existingNotification] = await db
              .select({ id: notifications.id })
              .from(notifications)
              .where(
                and(
                  eq(notifications.workspaceId, opp.workspaceId),
                  eq(notifications.entityType, "opportunity"),
                  eq(notifications.entityId, opp.opportunityId),
                  eq(notifications.type, "follow_up"),
                  eq(notifications.isRead, false)
                )
              )
              .limit(1);

            // Get contact info
            let contactName = opp.title;
            let contactEmail: string | null = null;
            let contactCompany: string | null = null;
            if (opp.contactId) {
              const [contact] = await db
                .select({
                  firstName: contacts.firstName,
                  lastName: contacts.lastName,
                  company: contacts.company,
                  email: contacts.email,
                })
                .from(contacts)
                .where(eq(contacts.id, opp.contactId))
                .limit(1);

              if (contact) {
                contactName = contact.company ||
                  `${contact.firstName || ""} ${contact.lastName || ""}`.trim() ||
                  opp.title;
                contactEmail = contact.email;
                contactCompany = contact.company;
              }
            }

            // If this stage has autoMoveToLost enabled and we have a Lost stage
            if (stage.autoMoveToLost && lostStage) {
              // Move opportunity to Lost stage
              await db
                .update(opportunities)
                .set({
                  stageId: lostStage.id,
                  updatedAt: now,
                })
                .where(eq(opportunities.id, opp.opportunityId));

              // Record stage history
              await db.insert(opportunityStageHistory).values({
                opportunityId: opp.opportunityId,
                fromStageId: stage.id,
                toStageId: lostStage.id,
                movedAt: now,
                movedById: null, // System action
              });

              opportunitiesMovedToLost++;
              console.log(`[Follow-up Reminders] Auto-moved opportunity ${opp.opportunityId} to "${lostStage.name}" (was ${daysInStage} days in "${stage.name}")`);

              // Send farewell email if enabled
              if (stage.sendEmailOnLost && contactEmail) {
                try {
                  // Get workspace/org info for email
                  const [workspace] = await db
                    .select({
                      name: workspaces.name,
                      orgId: workspaces.orgId,
                    })
                    .from(workspaces)
                    .where(eq(workspaces.id, opp.workspaceId))
                    .limit(1);

                  if (workspace) {
                    await sendEmail({
                      to: contactEmail,
                      subject: `Bedankt voor uw interesse - ${workspace.name}`,
                      templateName: "farewell",
                      template: React.createElement(FarewellEmail, {
                        contactName: contactName,
                        companyName: workspace.name,
                        orgName: workspace.name,
                      }),
                      context: {
                        orgId: workspace.orgId,
                        workspaceId: opp.workspaceId,
                      },
                      relatedEntity: {
                        type: "opportunity",
                        id: opp.opportunityId,
                      },
                    });

                    emailsSent++;
                    console.log(`[Follow-up Reminders] Sent farewell email to ${contactEmail}`);
                  }
                } catch (emailError) {
                  console.error(`[Follow-up Reminders] Failed to send farewell email to ${contactEmail}:`, emailError);
                  errors++;
                }
              }

              // Create notification about the auto-move
              await db.insert(notifications).values({
                workspaceId: opp.workspaceId,
                userId: null, // Workspace-wide notification
                type: "opportunity_lost",
                title: `Lead verloren: ${contactName}`,
                message: `Deze lead is automatisch naar "${lostStage.name}" verplaatst na ${daysInStage} dagen in "${stage.name}".${stage.sendEmailOnLost && contactEmail ? " Er is een afscheidsmail verzonden." : ""}`,
                entityType: "opportunity",
                entityId: opp.opportunityId,
                actionUrl: `/crm/pipelines?opportunity=${opp.opportunityId}`,
                scheduledFor: now,
              });

              notificationsCreated++;
            } else if (!existingNotification) {
              // Create regular follow-up notification (if no unread one exists)
              await db.insert(notifications).values({
                workspaceId: opp.workspaceId,
                userId: null, // Workspace-wide notification
                type: "follow_up",
                title: `Follow-up: ${contactName}`,
                message: stage.isFinalAttempt
                  ? `⚠️ LAATSTE POGING: Deze lead staat al ${daysInStage} dagen in "${stage.name}". Dit is de laatste poging!`
                  : `Deze lead staat al ${daysInStage} dagen in "${stage.name}". Tijd voor opvolging!`,
                entityType: "opportunity",
                entityId: opp.opportunityId,
                actionUrl: `/crm/pipelines?opportunity=${opp.opportunityId}`,
                scheduledFor: now,
              });

              notificationsCreated++;
              console.log(`[Follow-up Reminders] Created notification for opportunity ${opp.opportunityId} (${daysInStage} days in "${stage.name}"${stage.isFinalAttempt ? " - FINAL ATTEMPT" : ""})`);
            }

          } catch (error) {
            console.error(`[Follow-up Reminders] Error processing opportunity ${opp.opportunityId}:`, error);
            errors++;
          }
        }

      } catch (error) {
        console.error(`[Follow-up Reminders] Error processing stage ${stage.id}:`, error);
        errors++;
      }
    }

    const duration = Date.now() - startTime;
    console.log(`[Follow-up Reminders] Completed in ${duration}ms: ${notificationsCreated} notifications created, ${opportunitiesMovedToLost} opportunities moved to Lost, ${emailsSent} emails sent, ${errors} errors`);

    return NextResponse.json({
      success: true,
      stagesProcessed: stagesWithFollowUp.length,
      notificationsCreated,
      opportunitiesMovedToLost,
      emailsSent,
      errors,
      duration,
    });

  } catch (error) {
    console.error("[Follow-up Reminders] Fatal error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
