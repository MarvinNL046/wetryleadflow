import * as React from "react";
import { sendEmail } from "./index";
import { InviteEmail, AgencyInviteEmail, OpportunityAssignedEmail, AutomationStatusEmail } from "./templates";

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
// Send Agency Invite Email
// ============================================
interface SendAgencyInviteEmailParams {
  to: string;
  inviterName: string;
  agencyName: string;
  inviteUrl: string;
  role: string;
  agencyId: number;
}

export async function sendAgencyInviteEmail(params: SendAgencyInviteEmailParams) {
  return sendEmail({
    to: params.to,
    subject: `You're invited to join ${params.agencyName} on LeadFlow`,
    templateName: "agency_invite",
    template: React.createElement(AgencyInviteEmail, {
      inviterName: params.inviterName,
      agencyName: params.agencyName,
      inviteUrl: params.inviteUrl,
      role: params.role,
    }),
    // Note: agencyId tracked in metadata since email_log schema only has orgId/workspaceId
    metadata: {
      agencyId: params.agencyId,
      inviterName: params.inviterName,
      agencyName: params.agencyName,
      role: params.role,
    },
  });
}

// ============================================
// Send Opportunity Assigned Email
// ============================================
interface SendOpportunityAssignedEmailParams {
  to: string;
  assigneeName: string;
  assignerName: string;
  opportunityTitle: string;
  opportunityValue?: string;
  stageName: string;
  contactName?: string;
  opportunityUrl: string;
  orgName: string;
  orgId: number;
  workspaceId: number;
  opportunityId: number;
}

export async function sendOpportunityAssignedEmail(params: SendOpportunityAssignedEmailParams) {
  return sendEmail({
    to: params.to,
    subject: `New opportunity assigned: ${params.opportunityTitle}`,
    templateName: "opportunity_assigned",
    template: React.createElement(OpportunityAssignedEmail, {
      assigneeName: params.assigneeName,
      assignerName: params.assignerName,
      opportunityTitle: params.opportunityTitle,
      opportunityValue: params.opportunityValue,
      stageName: params.stageName,
      contactName: params.contactName,
      opportunityUrl: params.opportunityUrl,
      orgName: params.orgName,
    }),
    context: {
      orgId: params.orgId,
      workspaceId: params.workspaceId,
    },
    relatedEntity: {
      type: "opportunity",
      id: params.opportunityId,
    },
    metadata: {
      assignerName: params.assignerName,
      opportunityTitle: params.opportunityTitle,
      opportunityValue: params.opportunityValue,
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
