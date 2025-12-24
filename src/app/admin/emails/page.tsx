"use client";

import { useEffect, useState } from "react";
import { getEmailStats } from "@/lib/actions/admin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Mail,
  Send,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock,
  FileText,
  RefreshCw,
} from "lucide-react";

type EmailStats = Awaited<ReturnType<typeof getEmailStats>>;

export default function AdminEmailsPage() {
  const [stats, setStats] = useState<EmailStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getEmailStats();
      setStats(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load stats");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-zinc-300 border-t-violet-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-800 dark:border-red-900 dark:bg-red-950/30 dark:text-red-400">
          {error}
        </div>
      </div>
    );
  }

  if (!stats) return null;

  const totalEmails = Object.values(stats.statusCounts).reduce((a, b) => a + b, 0);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "sent":
        return <Send className="h-4 w-4 text-blue-500" />;
      case "delivered":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "bounced":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case "failed":
        return <XCircle className="h-4 w-4 text-red-500" />;
      case "pending":
        return <Clock className="h-4 w-4 text-zinc-400" />;
      default:
        return <Mail className="h-4 w-4 text-zinc-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      pending: "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300",
      sent: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
      delivered: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
      bounced: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
      failed: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    };
    return styles[status] || "bg-zinc-100 text-zinc-700";
  };

  const formatTemplateName = (name: string) => {
    return name
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Email Log</h1>
          <p className="text-zinc-500">Monitor transactional email delivery and status</p>
        </div>
        <button
          onClick={loadStats}
          className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-blue-600 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-violet-500/25 transition-all hover:shadow-violet-500/40"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh
        </button>
      </div>

      {/* Stats Cards */}
      <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <div className="dashboard-stat-card rounded-xl border border-zinc-200/50 bg-white/80 p-5 backdrop-blur-sm dark:border-zinc-800/50 dark:bg-zinc-900/80">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-zinc-500">Total</p>
              <p className="mt-2 text-2xl font-bold">{totalEmails}</p>
            </div>
            <div className="stat-icon-gradient purple flex h-10 w-10 items-center justify-center rounded-lg">
              <Mail className="h-5 w-5 text-purple-500" />
            </div>
          </div>
        </div>

        <div className="dashboard-stat-card rounded-xl border border-zinc-200/50 bg-white/80 p-5 backdrop-blur-sm dark:border-zinc-800/50 dark:bg-zinc-900/80">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-zinc-500">Sent</p>
              <p className="mt-2 text-2xl font-bold text-blue-600">{stats.statusCounts.sent || 0}</p>
            </div>
            <div className="stat-icon-gradient blue flex h-10 w-10 items-center justify-center rounded-lg">
              <Send className="h-5 w-5 text-blue-500" />
            </div>
          </div>
        </div>

        <div className="dashboard-stat-card rounded-xl border border-zinc-200/50 bg-white/80 p-5 backdrop-blur-sm dark:border-zinc-800/50 dark:bg-zinc-900/80">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-zinc-500">Delivered</p>
              <p className="mt-2 text-2xl font-bold text-green-600">{stats.statusCounts.delivered || 0}</p>
            </div>
            <div className="stat-icon-gradient green flex h-10 w-10 items-center justify-center rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-500" />
            </div>
          </div>
        </div>

        <div className="dashboard-stat-card rounded-xl border border-zinc-200/50 bg-white/80 p-5 backdrop-blur-sm dark:border-zinc-800/50 dark:bg-zinc-900/80">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-zinc-500">Bounced</p>
              <p className="mt-2 text-2xl font-bold text-yellow-600">{stats.statusCounts.bounced || 0}</p>
            </div>
            <div className="stat-icon-gradient amber flex h-10 w-10 items-center justify-center rounded-lg">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
            </div>
          </div>
        </div>

        <div className="dashboard-stat-card rounded-xl border border-zinc-200/50 bg-white/80 p-5 backdrop-blur-sm dark:border-zinc-800/50 dark:bg-zinc-900/80">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-zinc-500">Failed</p>
              <p className="mt-2 text-2xl font-bold text-red-600">{stats.statusCounts.failed || 0}</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-red-100 to-orange-100 dark:from-red-900/30 dark:to-orange-900/30">
              <XCircle className="h-5 w-5 text-red-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Template Breakdown */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <FileText className="h-4 w-4 text-violet-500" />
            Templates (Last 7 Days)
          </CardTitle>
        </CardHeader>
        <CardContent>
          {stats.templateCounts.length === 0 ? (
            <p className="text-sm text-zinc-500">No emails sent in the last 7 days</p>
          ) : (
            <div className="space-y-3">
              {stats.templateCounts.map(({ templateName, count }) => {
                const percentage = totalEmails > 0 ? (count / totalEmails) * 100 : 0;
                return (
                  <div key={templateName}>
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-sm font-medium">
                        {formatTemplateName(templateName)}
                      </span>
                      <span className="text-sm text-zinc-500">{count} emails</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-violet-500 to-blue-500"
                        style={{ width: `${Math.max(percentage, 1)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Emails */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Mail className="h-4 w-4 text-blue-500" />
            Recent Emails
          </CardTitle>
        </CardHeader>
        <CardContent>
          {stats.recentEmails.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                <Mail className="h-8 w-8 text-blue-500" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">No Emails Yet</h3>
              <p className="max-w-sm text-sm text-zinc-500">
                Transactional emails will appear here when sent.
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>To</TableHead>
                  <TableHead>Template</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Org</TableHead>
                  <TableHead>Sent</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stats.recentEmails.map((email) => (
                  <TableRow key={email.id}>
                    <TableCell>
                      <span className="font-medium">{email.to}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-zinc-600 dark:text-zinc-400">
                        {formatTemplateName(email.templateName)}
                      </span>
                    </TableCell>
                    <TableCell className="max-w-[200px] truncate">
                      <span className="text-sm text-zinc-600 dark:text-zinc-400">
                        {email.subject}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge className={`gap-1 ${getStatusBadge(email.status)}`}>
                        {getStatusIcon(email.status)}
                        {email.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-zinc-500">
                        {email.org?.name || "-"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-zinc-500">
                        {email.sentAt
                          ? new Date(email.sentAt).toLocaleString()
                          : email.createdAt
                          ? new Date(email.createdAt).toLocaleString()
                          : "-"}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
