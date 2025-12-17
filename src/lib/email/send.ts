import * as React from "react";
import { sendEmail } from "./index";
import { InviteEmail, DealAssignedEmail, AutomationStatusEmail } from "./templates";

// ============================================
// Send Team Invite Email
// ============================================
interface SendInviteEmailParams {
  to: string;
  inviterName: string;
  inviterEmail: string;
  orgName: string;
  inviteUrl: string;
  role: string;
  orgId: number;
}

export async function sendInviteEmail(params: SendInviteEmailParams) {
  return sendEmail({
    to: params.to,
    subject: `You're invited to join ${params.orgName} on LeadFlow`,
    templateName: "invite",
    template: React.createElement(InviteEmail, {
      inviterName: params.inviterName,
      inviterEmail: params.inviterEmail,
      orgName: params.orgName,
      inviteUrl: params.inviteUrl,
      role: params.role,
    }),
    context: {
      orgId: params.orgId,
    },
    metadata: {
      inviterName: params.inviterName,
      inviterEmail: params.inviterEmail,
      role: params.role,
    },
  });
}

// ============================================
// Send Deal Assigned Email
// ============================================
interface SendDealAssignedEmailParams {
  to: string;
  assigneeName: string;
  assignerName: string;
  dealTitle: string;
  dealValue?: string;
  stageName: string;
  contactName?: string;
  dealUrl: string;
  orgName: string;
  orgId: number;
  workspaceId: number;
  dealId: number;
}

export async function sendDealAssignedEmail(params: SendDealAssignedEmailParams) {
  return sendEmail({
    to: params.to,
    subject: `New deal assigned: ${params.dealTitle}`,
    templateName: "deal_assigned",
    template: React.createElement(DealAssignedEmail, {
      assigneeName: params.assigneeName,
      assignerName: params.assignerName,
      dealTitle: params.dealTitle,
      dealValue: params.dealValue,
      stageName: params.stageName,
      contactName: params.contactName,
      dealUrl: params.dealUrl,
      orgName: params.orgName,
    }),
    context: {
      orgId: params.orgId,
      workspaceId: params.workspaceId,
    },
    relatedEntity: {
      type: "deal",
      id: params.dealId,
    },
    metadata: {
      assignerName: params.assignerName,
      dealTitle: params.dealTitle,
      dealValue: params.dealValue,
    },
  });
}

// ============================================
// Send Automation Status Email
// ============================================
interface SendAutomationStatusEmailParams {
  to: string;
  recipientName: string;
  automationName: string;
  status: "executed" | "failed";
  eventType: string;
  entityType: string;
  entityName: string;
  errorMessage?: string;
  orgName: string;
  dashboardUrl: string;
  orgId: number;
  workspaceId?: number;
}

export async function sendAutomationStatusEmail(params: SendAutomationStatusEmailParams) {
  const statusText = params.status === "executed" ? "completed" : "failed";

  return sendEmail({
    to: params.to,
    subject: `Automation ${statusText}: ${params.automationName}`,
    templateName: `automation_${params.status}`,
    template: React.createElement(AutomationStatusEmail, {
      recipientName: params.recipientName,
      automationName: params.automationName,
      status: params.status,
      eventType: params.eventType,
      entityType: params.entityType,
      entityName: params.entityName,
      errorMessage: params.errorMessage,
      executedAt: new Date().toLocaleString(),
      orgName: params.orgName,
      dashboardUrl: params.dashboardUrl,
    }),
    context: {
      orgId: params.orgId,
      workspaceId: params.workspaceId,
    },
    metadata: {
      automationName: params.automationName,
      status: params.status,
      eventType: params.eventType,
      errorMessage: params.errorMessage,
    },
  });
}
