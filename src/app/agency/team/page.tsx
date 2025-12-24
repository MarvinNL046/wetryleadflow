"use client";

import { useState, useEffect } from "react";
import { useUser } from "@stackframe/stack";
import {
  Users,
  Mail,
  Shield,
  Crown,
  UserPlus,
  MoreHorizontal,
  Trash2,
  UserCog,
  Clock,
  XCircle,
  Loader2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { InviteMemberDialog } from "@/components/agency/invite-member-dialog";
import {
  getTeamMembers,
  getPendingInvites,
  removeTeamMember,
  updateMemberRole,
  revokeInvite,
} from "@/lib/actions/agency-team";
import { formatDistanceToNow } from "date-fns";

interface TeamMember {
  id: number;
  userId: string;
  role: string;
  email: string;
  displayName: string;
  profileImageUrl: string | null;
  createdAt: Date;
}

interface PendingInvite {
  id: number;
  email: string;
  role: string;
  expiresAt: Date;
  createdAt: Date;
}

export default function AgencyTeamPage() {
  const user = useUser();
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [invites, setInvites] = useState<PendingInvite[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);

  // Confirmation dialogs
  const [memberToRemove, setMemberToRemove] = useState<TeamMember | null>(null);
  const [memberToChangeRole, setMemberToChangeRole] = useState<{
    member: TeamMember;
    newRole: "admin" | "member";
  } | null>(null);
  const [inviteToRevoke, setInviteToRevoke] = useState<PendingInvite | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Get current user's role
  const currentUserMembership = team.find((m) => m.userId === user?.id);
  const isOwner = currentUserMembership?.role === "owner";

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setIsLoading(true);
    try {
      const [teamData, invitesData] = await Promise.all([
        getTeamMembers(),
        getPendingInvites(),
      ]);
      setTeam(teamData);
      setInvites(invitesData);
    } catch (error) {
      console.error("Failed to load team data:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleRemoveMember() {
    if (!memberToRemove) return;

    setIsProcessing(true);
    const result = await removeTeamMember(memberToRemove.id);
    setIsProcessing(false);

    if (result.success) {
      setTeam((prev) => prev.filter((m) => m.id !== memberToRemove.id));
    }
    setMemberToRemove(null);
  }

  async function handleChangeRole() {
    if (!memberToChangeRole) return;

    setIsProcessing(true);
    const result = await updateMemberRole(
      memberToChangeRole.member.id,
      memberToChangeRole.newRole
    );
    setIsProcessing(false);

    if (result.success) {
      setTeam((prev) =>
        prev.map((m) =>
          m.id === memberToChangeRole.member.id
            ? { ...m, role: memberToChangeRole.newRole }
            : m
        )
      );
    }
    setMemberToChangeRole(null);
  }

  async function handleRevokeInvite() {
    if (!inviteToRevoke) return;

    setIsProcessing(true);
    const result = await revokeInvite(inviteToRevoke.id);
    setIsProcessing(false);

    if (result.success) {
      setInvites((prev) => prev.filter((i) => i.id !== inviteToRevoke.id));
    }
    setInviteToRevoke(null);
  }

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-violet-500" />
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Team Members</h1>
          <p className="text-zinc-500">Manage your agency team</p>
        </div>

        <Button
          onClick={() => setIsInviteDialogOpen(true)}
          className="bg-gradient-to-r from-violet-600 to-purple-600"
        >
          <UserPlus className="mr-2 h-4 w-4" />
          Invite Member
        </Button>
      </div>

      {/* Role Legend */}
      <div className="mb-6 flex flex-wrap gap-4">
        <div className="flex items-center gap-2 text-sm">
          <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-400">
            <Crown className="mr-1 h-3 w-3" />
            Owner
          </Badge>
          <span className="text-zinc-500">Full control, billing & branding</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Badge className="bg-violet-100 text-violet-700 dark:bg-violet-900/50 dark:text-violet-400">
            <Shield className="mr-1 h-3 w-3" />
            Admin
          </Badge>
          <span className="text-zinc-500">Manage clients & users</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Badge variant="secondary">
            <Users className="mr-1 h-3 w-3" />
            Member
          </Badge>
          <span className="text-zinc-500">View only access</span>
        </div>
      </div>

      {/* Team List */}
      <Card className="border-zinc-200/50 bg-white/50 dark:border-zinc-800/50 dark:bg-zinc-900/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-violet-500" />
            Team ({team.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="divide-y divide-zinc-200/50 dark:divide-zinc-800/50">
            {team.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between py-4 first:pt-0 last:pb-0"
              >
                <div className="flex items-center gap-4">
                  <Avatar className="h-10 w-10">
                    {member.profileImageUrl && (
                      <AvatarImage src={member.profileImageUrl} />
                    )}
                    <AvatarFallback className="bg-gradient-to-br from-violet-500 to-purple-500 text-white">
                      {member.displayName.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{member.displayName}</p>
                    <p className="flex items-center gap-1 text-sm text-zinc-500">
                      <Mail className="h-3 w-3" />
                      {member.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {member.role === "owner" ? (
                    <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-400">
                      <Crown className="mr-1 h-3 w-3" />
                      Owner
                    </Badge>
                  ) : member.role === "admin" ? (
                    <Badge className="bg-violet-100 text-violet-700 dark:bg-violet-900/50 dark:text-violet-400">
                      <Shield className="mr-1 h-3 w-3" />
                      Admin
                    </Badge>
                  ) : (
                    <Badge variant="secondary">
                      <Users className="mr-1 h-3 w-3" />
                      Member
                    </Badge>
                  )}

                  {/* Actions dropdown (only for non-owners) */}
                  {member.role !== "owner" && isOwner && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() =>
                            setMemberToChangeRole({
                              member,
                              newRole: member.role === "admin" ? "member" : "admin",
                            })
                          }
                        >
                          <UserCog className="mr-2 h-4 w-4" />
                          {member.role === "admin"
                            ? "Change to Member"
                            : "Promote to Admin"}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => setMemberToRemove(member)}
                          className="text-red-600 focus:text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Remove from Team
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Pending Invites */}
      <Card className="mt-6 border-zinc-200/50 bg-white/50 dark:border-zinc-800/50 dark:bg-zinc-900/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-blue-500" />
            Pending Invites ({invites.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {invites.length === 0 ? (
            <p className="py-8 text-center text-zinc-500">
              No pending invites. Use the &quot;Invite Member&quot; button to add
              team members.
            </p>
          ) : (
            <div className="divide-y divide-zinc-200/50 dark:divide-zinc-800/50">
              {invites.map((invite) => (
                <div
                  key={invite.id}
                  className="flex items-center justify-between py-4 first:pt-0 last:pb-0"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50">
                      <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="font-medium">{invite.email}</p>
                      <div className="flex items-center gap-2 text-sm text-zinc-500">
                        <Clock className="h-3 w-3" />
                        Expires{" "}
                        {formatDistanceToNow(new Date(invite.expiresAt), {
                          addSuffix: true,
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {invite.role === "admin" ? (
                      <Badge className="bg-violet-100 text-violet-700 dark:bg-violet-900/50 dark:text-violet-400">
                        <Shield className="mr-1 h-3 w-3" />
                        Admin
                      </Badge>
                    ) : (
                      <Badge variant="secondary">
                        <Users className="mr-1 h-3 w-3" />
                        Member
                      </Badge>
                    )}

                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-zinc-500 hover:text-red-600"
                      onClick={() => setInviteToRevoke(invite)}
                    >
                      <XCircle className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Invite Dialog */}
      <InviteMemberDialog
        open={isInviteDialogOpen}
        onOpenChange={setIsInviteDialogOpen}
        onSuccess={loadData}
      />

      {/* Remove Member Confirmation */}
      <AlertDialog
        open={!!memberToRemove}
        onOpenChange={() => setMemberToRemove(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Team Member</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove{" "}
              <strong>{memberToRemove?.displayName}</strong> from your agency
              team? They will lose access to all agency features.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isProcessing}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleRemoveMember}
              disabled={isProcessing}
              className="bg-red-600 hover:bg-red-700"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Removing...
                </>
              ) : (
                "Remove"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Change Role Confirmation */}
      <AlertDialog
        open={!!memberToChangeRole}
        onOpenChange={() => setMemberToChangeRole(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Change Role</AlertDialogTitle>
            <AlertDialogDescription>
              Change <strong>{memberToChangeRole?.member.displayName}</strong>
              &apos;s role to{" "}
              <strong>
                {memberToChangeRole?.newRole === "admin" ? "Admin" : "Member"}
              </strong>
              ?
              {memberToChangeRole?.newRole === "admin" ? (
                <span className="mt-2 block">
                  Admins can manage client organizations and invite team members.
                </span>
              ) : (
                <span className="mt-2 block">
                  Members have view-only access to the agency dashboard.
                </span>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isProcessing}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleChangeRole}
              disabled={isProcessing}
              className="bg-gradient-to-r from-violet-600 to-purple-600"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Change Role"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Revoke Invite Confirmation */}
      <AlertDialog
        open={!!inviteToRevoke}
        onOpenChange={() => setInviteToRevoke(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Revoke Invitation</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to revoke the invitation sent to{" "}
              <strong>{inviteToRevoke?.email}</strong>? They will no longer be
              able to join your team using this invite link.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isProcessing}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleRevokeInvite}
              disabled={isProcessing}
              className="bg-red-600 hover:bg-red-700"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Revoking...
                </>
              ) : (
                "Revoke"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
