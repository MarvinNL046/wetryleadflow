"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  LandingHeader,
  LandingFooter,
  GlowButton,
  GradientText,
} from "@/components/landing";
import {
  Users,
  ArrowRight,
  BarChart3,
  MessageSquare,
  TrendingUp,
  UserCheck,
  Target,
  Activity,
} from "lucide-react";

const linkedPages = [
  {
    title: "Team Features",
    description: "Discover collaboration features that help your sales team work together effectively and close more deals.",
    href: "/resources/team-collaboration/team-features",
    icon: Users,
    pillar: "Team Collaboration",
    color: "teal",
  },
  {
    title: "Team Communication",
    description: "Streamline internal communication with built-in messaging, notes, and activity feeds for seamless coordination.",
    href: "/resources/team-collaboration/team-communication",
    icon: MessageSquare,
    pillar: "Team Collaboration",
    color: "teal",
  },
  {
    title: "Team Performance",
    description: "Track individual and team performance metrics to identify top performers and coaching opportunities.",
    href: "/resources/sales-analytics/team-performance",
    icon: TrendingUp,
    pillar: "Sales Analytics",
    color: "violet",
  },
  {
    title: "Sales Reporting",
    description: "Generate comprehensive sales reports that provide actionable insights for data-driven decision making.",
    href: "/resources/sales-analytics/sales-reporting",
    icon: BarChart3,
    pillar: "Sales Analytics",
    color: "violet",
  },
];

const relatedTopics = [
  { title: "Role Management", href: "/resources/team-collaboration/role-management", color: "teal" },
  { title: "Lead Handoffs", href: "/resources/team-collaboration/lead-handoffs", color: "teal" },
  { title: "Revenue Tracking", href: "/resources/sales-analytics/revenue-tracking", color: "violet" },
  { title: "Analytics Dashboards", href: "/resources/sales-analytics/analytics-dashboards", color: "violet" },
];

export default function SalesTeamAnalyticsPage() {
  return (
    <>
      <meta name="robots" content="noindex, follow" />

      <div className="min-h-screen bg-background">
        <LandingHeader />

        <main>
          {/* Hero Section */}
          <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-20">
            <div className="absolute inset-0 -z-10">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-900/30 via-background to-background" />
              <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-teal-500/30 rounded-full blur-[128px] animate-pulse" />
              <div className="absolute top-1/3 right-1/3 w-[400px] h-[400px] bg-violet-500/20 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: "1s" }} />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center max-w-4xl mx-auto"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20"
                >
                  <Activity className="w-4 h-4 mr-2" />
                  Crossover Topic Hub
                </motion.div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
                  <GradientText animated>Sales Team Analytics</GradientText>
                </h1>

                <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                  Unite team collaboration with powerful analytics to understand how your sales
                  team performs, identify growth opportunities, and make data-driven decisions
                  that improve results across your entire organization.
                </p>

                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <span className="px-3 py-1 rounded-full bg-teal-500/10 text-teal-400">Team Collaboration</span>
                  <span className="text-muted-foreground">+</span>
                  <span className="px-3 py-1 rounded-full bg-violet-500/10 text-violet-400">Sales Analytics</span>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Introduction Section */}
          <section className="py-16 lg:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="max-w-3xl mx-auto"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500">
                    <UserCheck className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold">Empower Teams with Data-Driven Insights</h2>
                </div>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    High-performing sales teams don't just work hard, they work smart. By combining
                    robust collaboration tools with comprehensive analytics, you give your team the
                    visibility they need to understand what's working and what needs improvement.
                  </p>
                  <p>
                    From individual rep performance dashboards to team-wide conversion metrics,
                    sales team analytics helps managers identify coaching opportunities, recognize
                    top performers, and allocate resources where they'll have the greatest impact.
                  </p>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Linked Pages Grid */}
          <section className="py-16 lg:py-24 bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Explore <GradientText>Related Guides</GradientText>
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Master team collaboration and sales analytics with our detailed guides.
                </p>
              </motion.div>

              <div className="grid gap-6 md:grid-cols-2">
                {linkedPages.map((page, index) => (
                  <motion.div
                    key={page.href}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link
                      href={page.href}
                      className="group block h-full p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-teal-500/50 hover:bg-teal-500/5 transition-all duration-300"
                    >
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${page.color === "teal" ? "from-teal-500 to-cyan-500" : "from-violet-500 to-purple-500"}`}>
                          <page.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`text-xs px-2 py-0.5 rounded-full ${page.color === "teal" ? "bg-teal-500/10 text-teal-400" : "bg-violet-500/10 text-violet-400"}`}>
                              {page.pillar}
                            </span>
                          </div>
                          <h3 className="text-xl font-bold mb-2 group-hover:text-teal-400 transition-colors">
                            {page.title}
                          </h3>
                          <p className="text-muted-foreground text-sm mb-4">
                            {page.description}
                          </p>
                          <span className="inline-flex items-center text-sm font-medium text-teal-400 group-hover:text-teal-300">
                            Read Guide
                            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Key Benefits Section */}
          <section className="py-16 lg:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Why Team + Analytics = <GradientText>Growth</GradientText>
                </h2>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    icon: Target,
                    title: "Performance Visibility",
                    description: "See exactly how each team member performs with real-time metrics, activity tracking, and conversion rates."
                  },
                  {
                    icon: TrendingUp,
                    title: "Identify Trends",
                    description: "Spot patterns in team performance to replicate success and address challenges before they impact results."
                  },
                  {
                    icon: Users,
                    title: "Collaborative Insights",
                    description: "Share dashboards and reports across teams to foster healthy competition and collective improvement."
                  }
                ].map((benefit, index) => (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="p-6 rounded-2xl bg-gradient-to-br from-teal-500/5 to-cyan-500/5 border border-border hover:border-teal-500/30 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500/20 to-cyan-500/20 flex items-center justify-center mb-4">
                      <benefit.icon className="w-6 h-6 text-teal-500" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground text-sm">{benefit.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Related Topics Section */}
          <section className="py-16 lg:py-24 bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="p-8 rounded-2xl border border-border/50 bg-card/30"
              >
                <h3 className="text-lg font-semibold mb-4">Related Topics</h3>
                <div className="flex flex-wrap gap-3">
                  {relatedTopics.map((topic) => (
                    <Link
                      key={topic.href}
                      href={topic.href}
                      className={`px-4 py-2 rounded-full ${topic.color === "teal" ? "bg-teal-500/10 text-teal-400 hover:bg-teal-500/20" : "bg-violet-500/10 text-violet-400 hover:bg-violet-500/20"} transition-colors text-sm`}
                    >
                      {topic.title}
                    </Link>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 lg:py-32">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center max-w-3xl mx-auto"
              >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
                  Ready to <GradientText>Elevate Your Team</GradientText>?
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  LeadFlow combines powerful team collaboration tools with comprehensive analytics
                  to help your sales team perform at their best. See the difference data makes.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href="/handler/sign-up">
                    <GlowButton size="lg" className="group">
                      Start Free Trial
                      <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </GlowButton>
                  </Link>
                  <Link
                    href="/resources/team-collaboration"
                    className="inline-flex items-center gap-2 px-6 py-3 text-base font-medium rounded-full border border-border hover:bg-accent transition-colors"
                  >
                    Explore Team Collaboration Hub
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>
        </main>

        <LandingFooter />
      </div>
    </>
  );
}
