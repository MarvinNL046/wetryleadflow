import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getAllUsers } from "@/lib/actions/admin";
import { formatDistanceToNow } from "date-fns";
import { ImpersonateButton } from "@/components/admin/impersonate-button";
import { DeleteUserButton } from "@/components/admin/delete-user-button";
import { Users, UserPlus, Building2, Clock } from "lucide-react";

export default async function AdminUsersPage() {
  const users = await getAllUsers();

  // Calculate stats
  const today = new Date();
  const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
  const newUsersThisWeek = users.filter(
    (u) => new Date(u.createdAt) > sevenDaysAgo
  ).length;
  const totalMemberships = users.reduce((sum, u) => sum + u.memberships.length, 0);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Users</h1>
        <p className="text-zinc-500">{users.length} registered accounts</p>
      </div>

      {/* Stats Cards */}
      <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="dashboard-stat-card rounded-xl border border-zinc-200/50 bg-white/80 p-5 backdrop-blur-sm dark:border-zinc-800/50 dark:bg-zinc-900/80">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-zinc-500">Total Users</p>
              <p className="mt-2 text-2xl font-bold">{users.length}</p>
            </div>
            <div className="stat-icon-gradient blue flex h-10 w-10 items-center justify-center rounded-lg">
              <Users className="h-5 w-5 text-blue-500" />
            </div>
          </div>
        </div>

        <div className="dashboard-stat-card rounded-xl border border-zinc-200/50 bg-white/80 p-5 backdrop-blur-sm dark:border-zinc-800/50 dark:bg-zinc-900/80">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-zinc-500">New This Week</p>
              <p className="mt-2 text-2xl font-bold text-green-600">{newUsersThisWeek}</p>
            </div>
            <div className="stat-icon-gradient green flex h-10 w-10 items-center justify-center rounded-lg">
              <UserPlus className="h-5 w-5 text-green-500" />
            </div>
          </div>
        </div>

        <div className="dashboard-stat-card rounded-xl border border-zinc-200/50 bg-white/80 p-5 backdrop-blur-sm dark:border-zinc-800/50 dark:bg-zinc-900/80">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-zinc-500">Total Memberships</p>
              <p className="mt-2 text-2xl font-bold">{totalMemberships}</p>
            </div>
            <div className="stat-icon-gradient purple flex h-10 w-10 items-center justify-center rounded-lg">
              <Building2 className="h-5 w-5 text-purple-500" />
            </div>
          </div>
        </div>

        <div className="dashboard-stat-card rounded-xl border border-zinc-200/50 bg-white/80 p-5 backdrop-blur-sm dark:border-zinc-800/50 dark:bg-zinc-900/80">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-zinc-500">Avg Orgs/User</p>
              <p className="mt-2 text-2xl font-bold">
                {users.length > 0 ? (totalMemberships / users.length).toFixed(1) : "0"}
              </p>
            </div>
            <div className="stat-icon-gradient amber flex h-10 w-10 items-center justify-center rounded-lg">
              <Clock className="h-5 w-5 text-amber-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Organizations</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id} className="group">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        {user.avatarUrl && <AvatarImage src={user.avatarUrl} />}
                        <AvatarFallback className="bg-gradient-to-br from-violet-500 to-blue-500 text-xs text-white">
                          {user.name?.[0] ?? user.email[0].toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{user.name ?? "—"}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-zinc-500">{user.email}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {user.memberships.map((m) => (
                        <Badge
                          key={m.id}
                          variant={m.role === "owner" ? "default" : "secondary"}
                          className={
                            m.role === "owner"
                              ? "bg-gradient-to-r from-violet-500 to-blue-500 text-white"
                              : ""
                          }
                        >
                          {m.org.name} ({m.role})
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-zinc-500">
                    {formatDistanceToNow(new Date(user.createdAt), {
                      addSuffix: true,
                    })}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <ImpersonateButton userId={user.id} userEmail={user.email} />
                      <DeleteUserButton
                        userId={user.id}
                        userEmail={user.email}
                        userName={user.name ?? undefined}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
