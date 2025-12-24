"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { StatCard } from "@/components/dashboard";
import { IncomingLeads } from "@/components/crm/incoming-leads";
import { AIInsightsPanel } from "@/components/ai";
import {
  Users,
  Kanban,
  DollarSign,
  Plus,
  TrendingUp,
  Zap,
  Target,
  ArrowRight,
  Activity,
  Sparkles,
  Clock,
} from "lucide-react";

interface Contact {
  id: number;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  company: string | null;
  createdAt: Date;
}

interface Opportunity {
  id: number;
  title: string;
  value: string | null;
  stage: {
    id: number;
    name: string;
  } | null;
  createdAt: Date;
}

interface Lead {
  id: number;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  phone: string | null;
  company: string | null;
  street: string | null;
  houseNumber: string | null;
  houseNumberAddition: string | null;
  postalCode: string | null;
  city: string | null;
  province: string | null;
  country: string | null;
  callCount: number | null;
  lastCallResult: string | null;
  createdAt: Date;
  opportunities: Array<{
    id: number;
    stage: { name: string; color: string | null } | null;
  }>;
  leadSource: string | null;
  metaFormName: string | null;
}

interface CallbackPeriod {
  days: number;
  label: string;
  enabled: boolean;
}

interface Pipeline {
  id: number;
  name: string;
}

interface CRMDashboardProps {
  stats: {
    contacts: number;
    opportunities: number;
    totalValue: number;
    pipelines: number;
    conversionRate: number;
  };
  hasPipelines: boolean;
  pipelines: Pipeline[];
  recentContacts: Contact[];
  recentOpportunities: Opportunity[];
  newLeads: Lead[];
  callbackPeriods?: CallbackPeriod[];
  maxCallAttempts?: number;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export function CRMDashboard({
  stats,
  hasPipelines,
  pipelines,
  recentContacts,
  recentOpportunities,
  newLeads,
  callbackPeriods,
  maxCallAttempts,
}: CRMDashboardProps) {
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("nl-NL", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(value);

  return (
    <div className="p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Good {getTimeOfDay()}{" "}
              <span className="inline-block animate-pulse">👋</span>
            </h1>
            <p className="mt-1 text-zinc-500 dark:text-zinc-400">
              Here&apos;s what&apos;s happening with your leads today.
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" asChild className="quick-action-btn">
              <Link href="/crm/contacts">
                <Users className="mr-2 h-4 w-4" />
                Add Contact
              </Link>
            </Button>
            <Button
              asChild
              className="bg-gradient-to-r from-violet-600 to-blue-600 text-white shadow-lg shadow-violet-500/25 transition-shadow hover:shadow-violet-500/40"
            >
              <Link href="/crm/pipelines">
                <Plus className="mr-2 h-4 w-4" />
                New Pipeline
              </Link>
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Incoming Leads Queue - Most Important! */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <IncomingLeads
          leads={newLeads}
          callbackPeriods={callbackPeriods}
          maxCallAttempts={maxCallAttempts}
        />
      </motion.div>

      {/* Stats Grid */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Contacts"
          value={stats.contacts}
          icon={Users}
          trend={{ value: 12, label: "vs last month" }}
          href="/crm/contacts"
          linkLabel="View all contacts"
          color="blue"
          delay={0}
        />
        <StatCard
          title="Active Opportunities"
          value={stats.opportunities}
          icon={Target}
          trend={{ value: 8, label: "vs last month" }}
          href="/crm/pipelines"
          linkLabel="View pipelines"
          color="purple"
          delay={0.1}
        />
        <StatCard
          title="Pipeline Value"
          value={formatCurrency(stats.totalValue)}
          icon={DollarSign}
          trend={{ value: 23, label: "vs last month" }}
          color="green"
          delay={0.2}
        />
        <StatCard
          title="Conversion Rate"
          value={`${stats.conversionRate}%`}
          icon={TrendingUp}
          trend={{ value: 5, label: "vs last month" }}
          color="amber"
          delay={0.3}
        />
      </div>

      {/* Pipeline Selector */}
      {pipelines.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500/20 to-purple-500/20">
                <Kanban className="h-4 w-4 text-violet-500" />
              </div>
              <h2 className="font-semibold">Jouw Pipelines</h2>
            </div>
            <Link
              href="/crm/pipelines"
              className="flex items-center gap-1 text-sm text-violet-500 hover:text-violet-600"
            >
              Beheren
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {pipelines.map((pipeline, index) => (
              <motion.div
                key={pipeline.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.05 }}
              >
                <Link href={`/crm/pipelines/${pipeline.id}`}>
                  <Card className="group cursor-pointer border-zinc-200/50 bg-white/80 backdrop-blur-sm transition-all hover:border-violet-300 hover:shadow-lg hover:shadow-violet-500/10 dark:border-zinc-800/50 dark:bg-zinc-900/80 dark:hover:border-violet-700">
                    <CardContent className="flex items-center gap-3 p-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 text-white shadow-lg shadow-violet-500/25 transition-transform group-hover:scale-110">
                        <Kanban className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{pipeline.name}</p>
                        <p className="text-xs text-zinc-500">Klik om te openen</p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-zinc-400 transition-transform group-hover:translate-x-1 group-hover:text-violet-500" />
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
            {/* Add New Pipeline Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + pipelines.length * 0.05 }}
            >
              <Link href="/crm/pipelines">
                <Card className="group cursor-pointer border-dashed border-zinc-300 bg-zinc-50/50 transition-all hover:border-violet-400 hover:bg-violet-50/50 dark:border-zinc-700 dark:bg-zinc-900/30 dark:hover:border-violet-600 dark:hover:bg-violet-950/30">
                  <CardContent className="flex items-center justify-center gap-2 p-4 h-[74px]">
                    <Plus className="h-5 w-5 text-zinc-400 group-hover:text-violet-500" />
                    <span className="text-sm font-medium text-zinc-500 group-hover:text-violet-600">
                      Nieuwe pipeline
                    </span>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Main Content Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-6 lg:grid-cols-3"
      >
        {/* Recent Contacts */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <Card className="dashboard-stat-card border-zinc-200/50 bg-white/80 backdrop-blur-sm dark:border-zinc-800/50 dark:bg-zinc-900/80">
            <div className="flex items-center justify-between border-b border-zinc-200/50 p-4 dark:border-zinc-800/50">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20">
                  <Users className="h-4 w-4 text-blue-500" />
                </div>
                <h2 className="font-semibold">Recent Contacts</h2>
              </div>
              <Link
                href="/crm/contacts"
                className="flex items-center gap-1 text-sm text-violet-500 hover:text-violet-600"
              >
                View all
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
            <CardContent className="p-4">
              {recentContacts.length > 0 ? (
                <div className="space-y-3">
                  {recentContacts.map((contact, index) => {
                    const displayName = contact.firstName
                      ? `${contact.firstName}${contact.lastName ? ` ${contact.lastName}` : ""}`
                      : contact.email;
                    const initial = contact.firstName?.[0] ?? contact.email?.[0]?.toUpperCase() ?? "?";

                    return (
                      <motion.div
                        key={contact.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                        className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50"
                      >
                        <Avatar className="h-9 w-9">
                          <AvatarFallback className="bg-gradient-to-br from-violet-500 to-blue-500 text-xs text-white">
                            {initial}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 overflow-hidden">
                          <p className="truncate font-medium">
                            {displayName}
                          </p>
                          <p className="truncate text-xs text-zinc-500">
                            {contact.company ?? contact.email}
                          </p>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-zinc-400">
                          <Clock className="h-3 w-3" />
                          {formatDate(contact.createdAt)}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <Users className="mb-3 h-10 w-10 text-zinc-300 dark:text-zinc-600" />
                  <p className="text-sm text-zinc-500">No contacts yet</p>
                  <Button variant="link" asChild className="mt-2">
                    <Link href="/crm/contacts">Add your first contact</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div variants={itemVariants} className="space-y-6">
          {/* AI Insights Panel */}
          <AIInsightsPanel className="dashboard-stat-card border-violet-500/20 bg-gradient-to-br from-violet-500/5 via-transparent to-blue-500/5 backdrop-blur-sm dark:border-violet-500/30" />

          {/* Activity Feed */}
          <Card className="dashboard-stat-card border-zinc-200/50 bg-white/80 backdrop-blur-sm dark:border-zinc-800/50 dark:bg-zinc-900/80">
            <div className="flex items-center gap-2 border-b border-zinc-200/50 p-4 dark:border-zinc-800/50">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-500/20">
                <Activity className="h-4 w-4 text-green-500" />
              </div>
              <h3 className="font-semibold">Recent Activity</h3>
            </div>
            <CardContent className="p-4">
              {recentOpportunities.length > 0 ? (
                <div className="space-y-3">
                  {recentOpportunities.slice(0, 3).map((opp, index) => (
                    <div
                      key={opp.id}
                      className="flex items-start gap-3 text-sm"
                    >
                      <div className="mt-1 h-2 w-2 rounded-full bg-green-500" />
                      <div>
                        <p className="font-medium">{opp.title}</p>
                        <p className="text-xs text-zinc-500">
                          {opp.value
                            ? formatCurrency(parseFloat(opp.value))
                            : "No value"}{" "}
                          · {opp.stage?.name ?? "No stage"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="py-4 text-center text-sm text-zinc-500">
                  No recent activity
                </p>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Empty State for Pipelines */}
      {!hasPipelines && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="mt-8 dashboard-stat-card border-dashed border-zinc-300 bg-zinc-50/50 dark:border-zinc-700 dark:bg-zinc-900/50">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/20 to-blue-500/20">
                <Kanban className="h-8 w-8 text-violet-500" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">No pipelines yet</h3>
              <p className="mb-6 max-w-sm text-center text-sm text-zinc-500">
                Create your first pipeline to start tracking opportunities and
                visualize your sales process.
              </p>
              <Button
                asChild
                className="bg-gradient-to-r from-violet-600 to-blue-600 text-white shadow-lg shadow-violet-500/25 transition-shadow hover:shadow-violet-500/40"
              >
                <Link href="/crm/pipelines">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Pipeline
                </Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}

function getTimeOfDay() {
  const hour = new Date().getHours();
  if (hour < 12) return "morning";
  if (hour < 18) return "afternoon";
  return "evening";
}

function formatDate(date: Date | string) {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  const now = new Date();
  const diffMs = now.getTime() - dateObj.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;

  return dateObj.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}
