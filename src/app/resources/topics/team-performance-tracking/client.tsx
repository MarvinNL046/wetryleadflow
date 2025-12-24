"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  LandingHeader,
  LandingFooter,
  GlowButton,
} from "@/components/landing";
import {
  ArrowRight,
  Users,
  Shield,
  UserCog,
  BarChart3,
  Activity,
  Award,
  Target,
  TrendingUp,
  Eye,
} from "lucide-react";

export default function TeamPerformanceTrackingClient() {
  const relatedContent = [
    {
      title: "Team Performance Metrics",
      description: "Track individual and team KPIs to drive accountability and celebrate wins.",
      href: "/resources/sales-analytics/team-performance",
      icon: Award,
      pillar: "Sales Analytics",
    },
    {
      title: "User Permissions",
      description: "Set up granular access controls to protect sensitive data while enabling collaboration.",
      href: "/resources/team-collaboration/user-permissions",
      icon: Shield,
      pillar: "Team Collaboration",
    },
    {
      title: "Role Management",
      description: "Define roles and responsibilities that align with your sales process.",
      href: "/resources/team-collaboration/role-management",
      icon: UserCog,
      pillar: "Team Collaboration",
    },
    {
      title: "Analytics Dashboards",
      description: "Build custom dashboards that give every team member the insights they need.",
      href: "/resources/sales-analytics/analytics-dashboards",
      icon: BarChart3,
      pillar: "Sales Analytics",
    },
  ];

  const relatedTopics = [
    { title: "Pipeline Bottleneck Analysis", href: "/resources/topics/pipeline-bottleneck-analysis" },
    { title: "Lead Qualification Automation", href: "/resources/topics/lead-qualification-automation" },
    { title: "CRM Data Migration", href: "/resources/topics/crm-data-migration" },
  ];

  return (
    <>
      <LandingHeader />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-900/20 via-background to-background" />
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-teal-500/30 rounded-full blur-[128px] animate-pulse" />
            <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-emerald-500/20 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: "1s" }} />
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto text-center"
            >
              <span className="inline-flex items-center px-3 py-1 mb-6 text-sm font-medium rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20">
                <Users className="w-4 h-4 mr-2" />
                Team Collaboration + Sales Analytics
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
                Team <span className="bg-gradient-to-r from-teal-400 to-emerald-500 bg-clip-text text-transparent">Performance Tracking</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Unite team collaboration tools with powerful analytics to monitor performance, manage permissions effectively, and drive results across your entire sales organization.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Overview Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto"
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">
                  Build a <span className="bg-gradient-to-r from-teal-400 to-emerald-500 bg-clip-text text-transparent">High-Performing Team</span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Great sales teams are built on visibility, accountability, and the right tools. Performance tracking makes all three possible.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { icon: Eye, title: "Full Visibility", description: "See individual and team metrics in real-time to catch issues early and recognize wins." },
                  { icon: Activity, title: "Activity Tracking", description: "Monitor calls, emails, and meetings to ensure consistent effort across the team." },
                  { icon: TrendingUp, title: "Growth Insights", description: "Identify top performers and replicate their success patterns across your organization." },
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="p-6 rounded-xl bg-card border border-border"
                  >
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-teal-500/20 to-emerald-500/20 flex items-center justify-center mb-4">
                      <item.icon className="w-6 h-6 text-teal-500" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Related Content Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="max-w-5xl mx-auto"
            >
              <div className="text-center mb-12">
                <span className="inline-flex items-center px-3 py-1 mb-4 text-sm font-medium rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20">
                  <Target className="w-4 h-4 mr-2" />
                  Deep Dive Resources
                </span>
                <h2 className="text-3xl font-bold mb-4">
                  Explore <span className="bg-gradient-to-r from-teal-400 to-emerald-500 bg-clip-text text-transparent">Related Content</span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Master team management and performance analytics with these in-depth guides.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {relatedContent.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link href={item.href} className="block group">
                      <div className="p-6 rounded-xl bg-card border border-border hover:border-teal-500/50 transition-all duration-300 h-full">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-teal-500/20 to-emerald-500/20 flex items-center justify-center flex-shrink-0 group-hover:from-teal-500/30 group-hover:to-emerald-500/30 transition-colors">
                            <item.icon className="w-6 h-6 text-teal-500" />
                          </div>
                          <div className="flex-1">
                            <span className="text-xs text-teal-400 mb-1 block">{item.pillar}</span>
                            <h3 className="text-lg font-semibold mb-2 group-hover:text-teal-400 transition-colors">
                              {item.title}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                            <span className="inline-flex items-center text-sm text-teal-400 group-hover:text-teal-300">
                              Read more
                              <ArrowRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Related Topics Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h3 className="text-xl font-semibold mb-6">Related Topics</h3>
              <div className="flex flex-wrap justify-center gap-3">
                {relatedTopics.map((topic) => (
                  <Link
                    key={topic.href}
                    href={topic.href}
                    className="px-4 py-2 rounded-full bg-card border border-border hover:border-teal-500/50 text-sm text-muted-foreground hover:text-teal-400 transition-all"
                  >
                    {topic.title}
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to <span className="bg-gradient-to-r from-teal-400 to-emerald-500 bg-clip-text text-transparent">Unlock Team Potential</span>?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                LeadFlow gives you complete visibility into team performance with customizable dashboards and role-based access. Start your free trial today.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/handler/sign-up">
                  <GlowButton size="lg" className="group">
                    Start Free Trial
                    <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </GlowButton>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <LandingFooter />
    </>
  );
}
