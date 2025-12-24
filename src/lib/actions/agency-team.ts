"use server";

import { db } from "@/lib/db";
import { agencies, agencyMemberships, agencyInvites, orgs, memberships, workspaces } from "@/lib/db/schema";
import { eq, and, desc } from "drizzle-orm";
import { requireAgencyAdmin, requireAgencyOwner, getCurrentAgencyMembership } from "@/lib/auth/agency";
import { stackServerApp } from "@/stack/server";
import { sendAgencyInviteEmail } from "@/lib/email/send";
import { revalidatePath } from "next/cache";
import crypto from "crypto";

// ============================================
// Invite Team Member
// ============================================
export async function inviteTeamMember(data: {
  email: string;
  role: "admin" | "member";
}): Promise<{ success: boolean; error?: string }> {
  try {
    const { agency } = await requireAgencyAdmin();
    const user = await stackServerApp.getUser();

    if (!user) {
      return { success: false, error: "Not authenticated" };
    }

    const email = data.email.toLowerCase().trim();

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { success: false, error: "Invalid email address" };
    }

    // Check if user is already a member
    const existingMembers = await db
      .select({ userId: agencyMemberships.userId })
      .from(agencyMemberships)
      .where(eq(agencyMemberships.agencyId, agency.id));

    // Check Stack Auth users by email
    for (const member of existingMembers) {
      try {
        const stackUser = await stackServerApp.getUser(member.userId);
        if (stackUser?.primaryEmail?.toLowerCase() === email) {
          return { success: false, error: "This person is already a team member" };
        }
      } catch {
        // User might not exist in Stack Auth anymore
      }
    }

    // Check if there's already a pending invite for this email
    const [existingInvite] = await db
      .select({ id: agencyInvites.id })
      .from(agencyInvites)
      .where(
        and(
          eq(agencyInvites.agencyId, agency.id),
          eq(agencyInvites.email, email)
        )
      )
      .limit(1);

    if (existingInvite) {
      return { success: false, error: "An invite has already been sent to this email" };
    }

    // Generate secure token
    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days expiration

    // Create invite
    await db.insert(agencyInvites).values({
      agencyId: agency.id,
      email,
      role: data.role,
      token,
      expiresAt,
    });

    // Send invite email
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const inviteUrl = `${baseUrl}/agency/invite/${token}`;

    await sendAgencyInviteEmail({
      to: email,
      inviterName: user.displayName || user.primaryEmail || "A team member",
      agencyName: agency.name,
      inviteUrl,
      role: data.role,
      agencyId: agency.id,
    });

    revalidatePath("/agency/team");
    return { success: true };
  } catch (error) {
    console.error("[inviteTeamMember] Error:", error);
    return { success: false, error: "Failed to send invite. Please try again." };
  }
}

// ============================================
// Get Pending Invites
// ============================================
export async function getPendingInvites(): Promise<Array<{
  id: number;
  email: string;
  role: string;
  expiresAt: Date;
  createdAt: Date;
}>> {
  try {
    const { agency } = await requireAgencyAdmin();

    const invites = await db
      .select({
        id: agencyInvites.id,
        email: agencyInvites.email,
        role: agencyInvites.role,
        expiresAt: agencyInvites.expiresAt,
        createdAt: agencyInvites.createdAt,
      })
      .from(agencyInvites)
      .where(eq(agencyInvites.agencyId, agency.id))
      .orderBy(desc(agencyInvites.createdAt));

    // Filter out expired invites (cleanup would be nice but we filter for now)
    const now = new Date();
    return invites.filter((invite) => invite.expiresAt > now);
  } catch (error) {
    console.error("[getPendingInvites] Error:", error);
    return [];
  }
}

// ============================================
// Revoke Invite
// ============================================
export async function revokeInvite(inviteId: number): Promise<{ success: boolean; error?: string }> {
  try {
    const { agency } = await requireAgencyAdmin();

    // Verify invite belongs to this agency
    const [invite] = await db
      .select({ id: agencyInvites.id })
      .from(agencyInvites)
      .where(
        and(
          eq(agencyInvites.id, inviteId),
          eq(agencyInvites.agencyId, agency.id)
        )
      )
      .limit(1);

    if (!invite) {
      return { success: false, error: "Invite not found" };
    }

    await db.delete(agencyInvites).where(eq(agencyInvites.id, inviteId));

    revalidatePath("/agency/team");
    return { success: true };
  } catch (error) {
    console.error("[revokeInvite] Error:", error);
    return { success: false, error: "Failed to revoke invite" };
  }
}

// ============================================
// Accept Invite (via token)
// ============================================
export async function acceptInvite(token: string): Promise<{
  success: boolean;
  agencySlug?: string;
  error?: string;
}> {
  try {
    const user = await stackServerApp.getUser();
    if (!user) {
      return { success: false, error: "Not authenticated" };
    }

    // Find invite by token
    const [invite] = await db
      .select({
        id: agencyInvites.id,
        agencyId: agencyInvites.agencyId,
        email: agencyInvites.email,
        role: agencyInvites.role,
        expiresAt: agencyInvites.expiresAt,
      })
      .from(agencyInvites)
      .where(eq(agencyInvites.token, token))
      .limit(1);

    if (!invite) {
      return { success: false, error: "Invalid or expired invite link" };
    }

    // Check if expired
    if (invite.expiresAt < new Date()) {
      // Clean up expired invite
      await db.delete(agencyInvites).where(eq(agencyInvites.id, invite.id));
      return { success: false, error: "This invite has expired" };
    }

    // Check if user email matches invite email
    if (user.primaryEmail?.toLowerCase() !== invite.email.toLowerCase()) {
      return {
        success: false,
        error: `This invite was sent to ${invite.email}. Please sign in with that email address.`,
      };
    }

    // Check if already a member
    const [existingMembership] = await db
      .select({ id: agencyMemberships.id })
      .from(agencyMemberships)
      .where(
        and(
          eq(agencyMemberships.agencyId, invite.agencyId),
          eq(agencyMemberships.userId, user.id)
        )
      )
      .limit(1);

    if (existingMembership) {
      // Already a member, just delete the invite and redirect
      await db.delete(agencyInvites).where(eq(agencyInvites.id, invite.id));

      const [agency] = await db
        .select({ slug: agencies.slug })
        .from(agencies)
        .where(eq(agencies.id, invite.agencyId))
        .limit(1);

      return { success: true, agencySlug: agency?.slug };
    }

    // Create membership
    await db.insert(agencyMemberships).values({
      agencyId: invite.agencyId,
      userId: user.id,
      role: invite.role,
    });

    // Delete invite
    await db.delete(agencyInvites).where(eq(agencyInvites.id, invite.id));

    // Get agency slug for redirect
    const [agency] = await db
      .select({ slug: agencies.slug })
      .from(agencies)
      .where(eq(agencies.id, invite.agencyId))
      .limit(1);

    return { success: true, agencySlug: agency?.slug };
  } catch (error) {
    console.error("[acceptInvite] Error:", error);
    return { success: false, error: "Failed to accept invite" };
  }
}

// ============================================
// Get Invite Info (for display before accepting)
// ============================================
export async function getInviteInfo(token: string): Promise<{
  valid: boolean;
  agencyName?: string;
  role?: string;
  email?: string;
  expired?: boolean;
  error?: string;
}> {
  try {
    const [invite] = await db
      .select({
        agencyId: agencyInvites.agencyId,
        email: agencyInvites.email,
        role: agencyInvites.role,
        expiresAt: agencyInvites.expiresAt,
      })
      .from(agencyInvites)
      .where(eq(agencyInvites.token, token))
      .limit(1);

    if (!invite) {
      return { valid: false, error: "Invalid invite link" };
    }

    if (invite.expiresAt < new Date()) {
      return { valid: false, expired: true, error: "This invite has expired" };
    }

    const [agency] = await db
      .select({ name: agencies.name })
      .from(agencies)
      .where(eq(agencies.id, invite.agencyId))
      .limit(1);

    return {
      valid: true,
      agencyName: agency?.name,
      role: invite.role,
      email: invite.email,
    };
  } catch (error) {
    console.error("[getInviteInfo] Error:", error);
    return { valid: false, error: "Failed to get invite info" };
  }
}

// ============================================
// Remove Team Member
// ============================================
export async function removeTeamMember(membershipId: number): Promise<{ success: boolean; error?: string }> {
  try {
    const { agency, role } = await requireAgencyAdmin();

    // Get the membership to remove
    const [membership] = await db
      .select({
        id: agencyMemberships.id,
        userId: agencyMemberships.userId,
        role: agencyMemberships.role,
      })
      .from(agencyMemberships)
      .where(
        and(
          eq(agencyMemberships.id, membershipId),
          eq(agencyMemberships.agencyId, agency.id)
        )
      )
      .limit(1);

    if (!membership) {
      return { success: false, error: "Team member not found" };
    }

    // Cannot remove owner
    if (membership.role === "owner") {
      return { success: false, error: "Cannot remove the agency owner" };
    }

    // Only owner can remove admins
    if (membership.role === "admin" && role !== "owner") {
      return { success: false, error: "Only the owner can remove admins" };
    }

    await db.delete(agencyMemberships).where(eq(agencyMemberships.id, membershipId));

    revalidatePath("/agency/team");
    return { success: true };
  } catch (error) {
    console.error("[removeTeamMember] Error:", error);
    return { success: false, error: "Failed to remove team member" };
  }
}

// ============================================
// Update Member Role
// ============================================
export async function updateMemberRole(
  membershipId: number,
  newRole: "admin" | "member"
): Promise<{ success: boolean; error?: string }> {
  try {
    const { agency } = await requireAgencyOwner(); // Only owner can change roles

    // Get the membership to update
    const [membership] = await db
      .select({
        id: agencyMemberships.id,
        role: agencyMemberships.role,
      })
      .from(agencyMemberships)
      .where(
        and(
          eq(agencyMemberships.id, membershipId),
          eq(agencyMemberships.agencyId, agency.id)
        )
      )
      .limit(1);

    if (!membership) {
      return { success: false, error: "Team member not found" };
    }

    // Cannot change owner role
    if (membership.role === "owner") {
      return { success: false, error: "Cannot change the owner's role" };
    }

    await db
      .update(agencyMemberships)
      .set({ role: newRole })
      .where(eq(agencyMemberships.id, membershipId));

    revalidatePath("/agency/team");
    return { success: true };
  } catch (error) {
    console.error("[updateMemberRole] Error:", error);
    return { success: false, error: "Failed to update role" };
  }
}

// ============================================
// Get Team Members (for team page)
// ============================================
export async function getTeamMembers(): Promise<Array<{
  id: number;
  userId: string;
  role: string;
  email: string;
  displayName: string;
  profileImageUrl: string | null;
  createdAt: Date;
}>> {
  try {
    const { agency } = await requireAgencyAdmin();

    const members = await db
      .select({
        id: agencyMemberships.id,
        userId: agencyMemberships.userId,
        role: agencyMemberships.role,
        createdAt: agencyMemberships.createdAt,
      })
      .from(agencyMemberships)
      .where(eq(agencyMemberships.agencyId, agency.id));

    // Fetch user details from Stack Auth
    const usersWithDetails = await Promise.all(
      members.map(async (member) => {
        try {
          const user = await stackServerApp.getUser(member.userId);
          return {
            ...member,
            email: user?.primaryEmail || "Unknown",
            displayName: user?.displayName || user?.primaryEmail || "Unknown User",
            profileImageUrl: user?.profileImageUrl || null,
          };
        } catch {
          return {
            ...member,
            email: "Unknown",
            displayName: "Unknown User",
            profileImageUrl: null,
          };
        }
      })
    );

    return usersWithDetails;
  } catch (error) {
    console.error("[getTeamMembers] Error:", error);
    return [];
  }
}
