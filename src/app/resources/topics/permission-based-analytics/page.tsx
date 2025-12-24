"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Shield,
  BarChart3,
  CheckCircle2,
  ArrowRight,
  Users,
  Lock,
  Eye,
  TrendingUp,
  PieChart,
  Settings,
} from "lucide-react";
import {
  LandingHeader,
  LandingFooter,
  GlowButton,
  GradientText,
} from "@/components/landing";

const relatedTopics = [
  {
    title: "Automated Deal Tracking",
    description: "Combine automation with CRM best practices for seamless deals",
    href: "/resources/topics/automated-deal-tracking",
    gradient: "from-yellow-500 to-orange-500",
  },
  {
    title: "Contact Import Automation",
    description: "Streamline contact imports with automated workflows",
    href: "/resources/topics/contact-import-automation",
    gradient: "from-rose-500 to-pink-500",
  },
  {
    title: "Kanban Team Workflow",
    description: "Visual pipeline management with team collaboration",
    href: "/resources/topics/kanban-team-workflow",
    gradient: "from-teal-500 to-emerald-500",
  },
];

const linkedResources = [
  {
    title: "User Permissions",
    description: "Configure granular access controls for your team",
    href: "/resources/team-collaboration/user-permissions",
    icon: Lock,
    pillar: "Team Collaboration",
  },
  {
    title: "Role Management",
    description: "Define roles with specific capabilities and data access",
    href: "/resources/team-collaboration/role-management",
    icon: Shield,
    pillar: "Team Collaboration",
  },
  {
    title: "Team Performance",
    description: "Track and optimize team productivity metrics",
    href: "/resources/sales-analytics/team-performance",
    icon: TrendingUp,
    pillar: "Sales Analytics",
  },
  {
    title: "Analytics Dashboards",
    description: "Build customized views of your sales data",
    href: "/resources/sales-analytics/analytics-dashboards",
    icon: PieChart,
    pillar: "Sales Analytics",
  },
];

export default function PermissionBasedAnalyticsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
        <LandingHeader />

        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          {/* Background Effects - Violet Gradient */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <div className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium rounded-full bg-violet-500/10 text-violet-500 border border-violet-500/20">
                <Shield className="w-4 h-4 mr-2" />
                Team Collaboration + Sales Analytics
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                Permission-Based Analytics:{" "}
                <span className="bg-gradient-to-r from-violet-400 via-purple-500 to-violet-600 bg-clip-text text-transparent">
                  Secure Insights for Every Role
                </span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Give every team member the analytics they need without exposing
                sensitive data. Learn how to combine role-based permissions with
                powerful sales analytics for secure, relevant insights.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/handler/sign-up">
                  <GlowButton size="lg">
                    Set Up Secure Analytics
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </GlowButton>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Value Proposition Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Right Data,{" "}
                <span className="bg-gradient-to-r from-violet-400 to-purple-500 bg-clip-text text-transparent">
                  Right People
                </span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Not everyone needs to see everything. Permission-based analytics
                ensures each team member gets relevant insights while protecting
                sensitive data and maintaining competitive fairness within teams.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Eye,
                  title: "Role-Appropriate Views",
                  description:
                    "Sales reps see their performance, managers see team metrics, executives see company-wide KPIs.",
                },
                {
                  icon: Lock,
                  title: "Data Protection",
                  description:
                    "Sensitive information like commission structures and individual performance stays private.",
                },
                {
                  icon: TrendingUp,
                  title: "Focused Insights",
                  description:
                    "When people see only relevant data, they make better decisions faster.",
                },
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-8 rounded-2xl bg-background border border-border hover:border-violet-500/50 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center mb-6">
                    <benefit.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Key Concepts Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center mb-16"
            >
              <div className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium rounded-full bg-violet-500/10 text-violet-500 border border-violet-500/20">
                <Settings className="w-4 h-4 mr-2" />
                Implementation Framework
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Building Your{" "}
                <span className="bg-gradient-to-r from-violet-400 to-purple-500 bg-clip-text text-transparent">
                  Permission-Based Analytics
                </span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {[
                {
                  title: "Role-Based Dashboard Access",
                  description:
                    "Create different dashboard views for different roles. Sales reps see personal pipelines, managers see team rollups, and executives see company-wide trends.",
                  points: [
                    "Individual contributor dashboards",
                    "Team manager rollup views",
                    "Executive summary reports",
                    "Custom role configurations",
                  ],
                },
                {
                  title: "Data-Level Permissions",
                  description:
                    "Control who sees what data at a granular level. Hide sensitive fields, restrict date ranges, or limit visibility to specific deal stages.",
                  points: [
                    "Field-level visibility controls",
                    "Stage-based data restrictions",
                    "Historical data access limits",
                    "Revenue figure permissions",
                  ],
                },
                {
                  title: "Dynamic Filter Enforcement",
                  description:
                    "Automatically filter analytics based on user context. Regional managers only see their region, team leads only see their team members.",
                  points: [
                    "Territory-based filtering",
                    "Team hierarchy enforcement",
                    "Product line restrictions",
                    "Account ownership filters",
                  ],
                },
                {
                  title: "Secure Sharing Controls",
                  description:
                    "Enable controlled sharing of reports and dashboards. Set expiration dates, watermark exports, and track who accesses what.",
                  points: [
                    "Time-limited share links",
                    "Export watermarking",
                    "Access audit logging",
                    "Download restrictions",
                  ],
                },
              ].map((concept, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-8 rounded-2xl bg-muted/50 border border-border"
                >
                  <h3 className="text-xl font-bold mb-4">{concept.title}</h3>
                  <p className="text-muted-foreground mb-6">{concept.description}</p>
                  <ul className="space-y-2">
                    {concept.points.map((point, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-violet-500" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Role Examples Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Analytics by{" "}
                <span className="bg-gradient-to-r from-violet-400 to-purple-500 bg-clip-text text-transparent">
                  Role
                </span>
              </h2>
              <p className="text-lg text-muted-foreground">
                See how different team members experience analytics in a
                permission-based system.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  role: "Sales Representative",
                  icon: Users,
                  sees: [
                    "Personal pipeline and deals",
                    "Individual activity metrics",
                    "Personal quota attainment",
                    "Own customer interactions",
                  ],
                  restricted: [
                    "Peer performance data",
                    "Team commission details",
                    "Company-wide revenue",
                  ],
                },
                {
                  role: "Team Manager",
                  icon: BarChart3,
                  sees: [
                    "Team aggregate performance",
                    "Individual rep metrics",
                    "Team pipeline health",
                    "Coaching opportunities",
                  ],
                  restricted: [
                    "Other team data",
                    "Executive dashboards",
                    "Company financials",
                  ],
                },
                {
                  role: "Executive",
                  icon: TrendingUp,
                  sees: [
                    "Company-wide KPIs",
                    "All team performance",
                    "Revenue forecasting",
                    "Strategic metrics",
                  ],
                  restricted: [
                    "Individual rep activities",
                    "Granular deal details",
                    "Day-to-day operations",
                  ],
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 rounded-2xl bg-background border border-border"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-bold">{item.role}</h3>
                  </div>
                  <div className="mb-4">
                    <p className="text-sm font-medium text-violet-500 mb-2">Can See:</p>
                    <ul className="space-y-1">
                      {item.sees.map((s, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                          <CheckCircle2 className="w-3 h-3 text-green-500" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">Restricted:</p>
                    <ul className="space-y-1">
                      {item.restricted.map((r, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                          <Lock className="w-3 h-3 text-red-400" />
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Related Resources Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Deep Dive Into{" "}
                <GradientText>Related Resources</GradientText>
              </h2>
              <p className="text-lg text-muted-foreground">
                Explore detailed guides on the individual topics that make up
                permission-based analytics.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {linkedResources.map((resource, index) => (
                <Link key={index} href={resource.href}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="p-6 rounded-2xl bg-background border border-border hover:border-violet-500/50 transition-all hover:shadow-lg hover:shadow-violet-500/10 h-full"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                        <resource.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <span className="text-xs text-violet-500 font-medium">
                          {resource.pillar}
                        </span>
                        <h3 className="font-semibold mb-2">{resource.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          {resource.description}
                        </p>
                        <span className="text-violet-500 text-sm flex items-center gap-1">
                          Read guide <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Secure Your{" "}
                <span className="bg-gradient-to-r from-violet-400 to-purple-500 bg-clip-text text-transparent">
                  Analytics Today
                </span>
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Give your team the insights they need without compromising on
                security. Start your free trial and set up permission-based
                analytics in minutes.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/handler/sign-up">
                  <GlowButton size="lg">
                    Start Free Trial
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </GlowButton>
                </Link>
              </div>
              <p className="mt-6 text-sm text-muted-foreground">
                14-day free trial. No credit card required. Cancel anytime.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Related Topics Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Explore{" "}
                <GradientText>Related Topics</GradientText>
              </h2>
              <p className="text-lg text-muted-foreground">
                Discover more crossover strategies that combine multiple disciplines
                for maximum impact.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {relatedTopics.map((topic, index) => (
                <Link key={index} href={topic.href}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="p-6 rounded-2xl bg-background border border-border hover:border-purple-500/50 transition-all hover:shadow-lg h-full"
                  >
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${topic.gradient} flex items-center justify-center mb-4`}>
                      <ArrowRight className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-semibold mb-2">{topic.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {topic.description}
                    </p>
                    <span className="text-purple-500 text-sm flex items-center gap-1">
                      Explore topic <ArrowRight className="w-3 h-3" />
                    </span>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <LandingFooter />
    </div>
  );
}
