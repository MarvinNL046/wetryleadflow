"use client";

import { useEffect, useState } from "react";
import { getEmailStats } from "@/lib/actions/admin";
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
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-zinc-300 border-t-zinc-900" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
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
      pending: "bg-zinc-100 text-zinc-700",
      sent: "bg-blue-100 text-blue-700",
      delivered: "bg-green-100 text-green-700",
      bounced: "bg-yellow-100 text-yellow-700",
      failed: "bg-red-100 text-red-700",
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
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
            Email Log
          </h1>
          <p className="text-sm text-zinc-500">
            Monitor transactional email delivery and status
          </p>
        </div>
        <button
          onClick={loadStats}
          className="flex items-center gap-2 rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh
        </button>
      </div>

      {/* Status Overview */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-zinc-500" />
            <span className="text-sm text-zinc-500">Total</span>
          </div>
          <p className="mt-2 text-2xl font-bold text-zinc-900 dark:text-white">
            {totalEmails}
          </p>
        </div>

        <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center gap-2">
            <Send className="h-5 w-5 text-blue-500" />
            <span className="text-sm text-zinc-500">Sent</span>
          </div>
          <p className="mt-2 text-2xl font-bold text-zinc-900 dark:text-white">
            {stats.statusCounts.sent || 0}
          </p>
        </div>

        <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <span className="text-sm text-zinc-500">Delivered</span>
          </div>
          <p className="mt-2 text-2xl font-bold text-zinc-900 dark:text-white">
            {stats.statusCounts.delivered || 0}
          </p>
        </div>

        <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
            <span className="text-sm text-zinc-500">Bounced</span>
          </div>
          <p className="mt-2 text-2xl font-bold text-zinc-900 dark:text-white">
            {stats.statusCounts.bounced || 0}
          </p>
        </div>

        <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center gap-2">
            <XCircle className="h-5 w-5 text-red-500" />
            <span className="text-sm text-zinc-500">Failed</span>
          </div>
          <p className="mt-2 text-2xl font-bold text-zinc-900 dark:text-white">
            {stats.statusCounts.failed || 0}
          </p>
        </div>
      </div>

      {/* Template Breakdown */}
      <div className="mb-8 rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="border-b border-zinc-200 px-6 py-4 dark:border-zinc-800">
          <h2 className="flex items-center gap-2 font-semibold text-zinc-900 dark:text-white">
            <FileText className="h-5 w-5" />
            Templates (Last 7 Days)
          </h2>
        </div>
        <div className="p-6">
          {stats.templateCounts.length === 0 ? (
            <p className="text-sm text-zinc-500">No emails sent in the last 7 days</p>
          ) : (
            <div className="space-y-3">
              {stats.templateCounts.map(({ templateName, count }) => {
                const percentage = totalEmails > 0 ? (count / totalEmails) * 100 : 0;
                return (
                  <div key={templateName}>
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                        {formatTemplateName(templateName)}
                      </span>
                      <span className="text-sm text-zinc-500">{count} emails</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                      <div
                        className="h-full rounded-full bg-blue-500"
                        style={{ width: `${Math.max(percentage, 1)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Recent Emails */}
      <div className="rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="border-b border-zinc-200 px-6 py-4 dark:border-zinc-800">
          <h2 className="flex items-center gap-2 font-semibold text-zinc-900 dark:text-white">
            <Mail className="h-5 w-5" />
            Recent Emails
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-200 text-left text-sm font-medium text-zinc-500 dark:border-zinc-800">
                <th className="px-6 py-3">To</th>
                <th className="px-6 py-3">Template</th>
                <th className="px-6 py-3">Subject</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Org</th>
                <th className="px-6 py-3">Sent</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentEmails.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-zinc-500">
                    No emails found
                  </td>
                </tr>
              ) : (
                stats.recentEmails.map((email) => (
                  <tr
                    key={email.id}
                    className="border-b border-zinc-100 dark:border-zinc-800"
                  >
                    <td className="px-6 py-4">
                      <span className="font-medium text-zinc-900 dark:text-white">
                        {email.to}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-zinc-600 dark:text-zinc-400">
                        {formatTemplateName(email.templateName)}
                      </span>
                    </td>
                    <td className="max-w-[200px] truncate px-6 py-4">
                      <span className="text-sm text-zinc-600 dark:text-zinc-400">
                        {email.subject}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${getStatusBadge(
                          email.status
                        )}`}
                      >
                        {getStatusIcon(email.status)}
                        {email.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-zinc-600 dark:text-zinc-400">
                        {email.org?.name || "-"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-zinc-500">
                        {email.sentAt
                          ? new Date(email.sentAt).toLocaleString()
                          : email.createdAt
                          ? new Date(email.createdAt).toLocaleString()
                          : "-"}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
