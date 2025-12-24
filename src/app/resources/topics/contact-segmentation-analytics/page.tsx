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
  Tags,
  FolderOpen,
  BarChart3,
  TrendingUp,
  UserCheck,
  ArrowRight,
  PieChart,
  Target,
  Layers,
} from "lucide-react";


const relatedContent = [
  {
    title: "Lead Segmentation",
    description: "Organize leads into meaningful segments based on behavior, demographics, and engagement.",
    href: "/resources/contact-management/lead-segmentation",
    icon: Tags,
    pillar: "Contact Management",
  },
  {
    title: "Contact Organization",
    description: "Build a clean, organized contact database that scales with your business growth.",
    href: "/resources/contact-management/contact-organization",
    icon: FolderOpen,
    pillar: "Contact Management",
  },
  {
    title: "Conversion Metrics",
    description: "Track the metrics that matter most for understanding your sales funnel effectiveness.",
    href: "/resources/sales-analytics/conversion-metrics",
    icon: TrendingUp,
    pillar: "Sales Analytics",
  },
  {
    title: "Team Performance",
    description: "Measure and improve your sales team's performance with actionable analytics.",
    href: "/resources/sales-analytics/team-performance",
    icon: UserCheck,
    pillar: "Sales Analytics",
  },
  {
    title: "Activity Tracking",
    description: "Monitor every touchpoint with your contacts for complete relationship visibility.",
    href: "/resources/contact-management/activity-tracking",
    icon: Users,
    pillar: "Contact Management",
  },
  {
    title: "Analytics Dashboards",
    description: "Build custom dashboards that surface the insights you need at a glance.",
    href: "/resources/sales-analytics/analytics-dashboards",
    icon: PieChart,
    pillar: "Sales Analytics",
  },
];

const relatedTopics = [
  {
    title: "AI Lead Scoring Strategies",
    description: "Combine AI automation with lead generation for smarter prospecting.",
    href: "/resources/topics/ai-lead-scoring-strategies",
  },
  {
    title: "Automated Email Sequences",
    description: "Master sales automation and CRM integration for follow-up excellence.",
    href: "/resources/topics/automated-email-sequences",
  },
  {
    title: "Meta Ads Pipeline Integration",
    description: "Connect Meta advertising with your sales pipeline for seamless lead flow.",
    href: "/resources/topics/meta-ads-pipeline-integration",
  },
  {
    title: "Team CRM Collaboration",
    description: "Enable team collaboration through effective CRM practices and workflows.",
    href: "/resources/topics/team-crm-collaboration",
  },
];

export default function ContactSegmentationAnalyticsPage() {
  return (
    <div className="min-h-screen bg-background">
        <LandingHeader />

        <main>
          {/* Hero Section */}
          <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-20">
            {/* Background Effects - Pink Theme */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-pink-900/30 via-background to-background" />
              <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-pink-500/25 rounded-full blur-[128px] animate-pulse" />
              <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-rose-500/20 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: "1s" }} />
              <div className="absolute bottom-1/4 left-1/3 w-[300px] h-[300px] bg-fuchsia-500/15 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "2s" }} />
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
                  className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium rounded-full bg-pink-500/10 text-pink-400 border border-pink-500/20"
                >
                  <Tags className="w-4 h-4 mr-2" />
                  Contact Management + Sales Analytics
                </motion.div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
                  Contact Segmentation{" "}
                  <GradientText animated>& Analytics</GradientText>
                </h1>

                <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                  Transform raw contact data into actionable insights. Learn how strategic
                  segmentation combined with powerful analytics creates a data-driven
                  approach to understanding and converting your leads.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href="/handler/sign-up">
                    <GlowButton size="lg" className="group">
                      Start Segmenting Smarter
                      <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </GlowButton>
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Introduction Section */}
          <section className="py-20 lg:py-28">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
                    Data-Driven <GradientText>Contact Intelligence</GradientText>
                  </h2>
                  <div className="prose prose-lg prose-invert max-w-none">
                    <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                      Your contact database is more than a list of names and emails - it&apos;s a
                      goldmine of business intelligence waiting to be unlocked. When you combine
                      thoughtful segmentation strategies with robust analytics, you gain the
                      ability to understand not just who your contacts are, but how they behave,
                      what they need, and when they&apos;re ready to buy.
                    </p>
                    <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                      Effective segmentation goes beyond basic demographics. Modern CRM systems
                      allow you to segment by engagement level, purchase history, industry,
                      company size, content interests, and dozens of other attributes. When
                      these segments are then analyzed for patterns and trends, you uncover
                      insights that drive smarter marketing and more effective sales conversations.
                    </p>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      This resource hub connects the best practices from contact management
                      with the power of sales analytics. Discover how to build segments that
                      matter, track the metrics that predict success, and create feedback loops
                      that continuously improve your understanding of what works.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Segmentation Visual */}
          <section className="py-20 lg:py-28 bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                  From Segments to <GradientText>Insights</GradientText>
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  See how segmentation and analytics work together to drive better decisions.
                </p>
              </motion.div>

              <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
                {/* Segmentation Side */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="p-6 rounded-2xl bg-card border border-border"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500/20 to-rose-500/20 flex items-center justify-center">
                      <Tags className="w-5 h-5 text-pink-500" />
                    </div>
                    <h3 className="text-xl font-semibold">Contact Segments</h3>
                  </div>
                  <div className="space-y-3">
                    {[
                      { name: "Hot Leads", count: 234, color: "bg-red-500" },
                      { name: "Enterprise Accounts", count: 89, color: "bg-purple-500" },
                      { name: "Engaged This Week", count: 412, color: "bg-blue-500" },
                      { name: "Past Customers", count: 156, color: "bg-green-500" },
                    ].map((segment) => (
                      <div key={segment.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${segment.color}`} />
                          <span className="text-sm font-medium">{segment.name}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">{segment.count} contacts</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Analytics Side */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="p-6 rounded-2xl bg-card border border-border"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500/20 to-rose-500/20 flex items-center justify-center">
                      <BarChart3 className="w-5 h-5 text-pink-500" />
                    </div>
                    <h3 className="text-xl font-semibold">Segment Analytics</h3>
                  </div>
                  <div className="space-y-4">
                    {[
                      { metric: "Conversion Rate", hot: "34%", enterprise: "28%", engaged: "12%", past: "45%" },
                      { metric: "Avg Deal Size", hot: "$4,200", enterprise: "$18,500", engaged: "$2,800", past: "$5,100" },
                      { metric: "Response Rate", hot: "67%", enterprise: "52%", engaged: "38%", past: "71%" },
                    ].map((row) => (
                      <div key={row.metric} className="p-3 rounded-lg bg-muted/50">
                        <p className="text-xs text-muted-foreground mb-2">{row.metric}</p>
                        <div className="grid grid-cols-4 gap-2 text-xs">
                          <div className="text-center">
                            <div className="w-2 h-2 rounded-full bg-red-500 mx-auto mb-1" />
                            <span className="font-medium">{row.hot}</span>
                          </div>
                          <div className="text-center">
                            <div className="w-2 h-2 rounded-full bg-purple-500 mx-auto mb-1" />
                            <span className="font-medium">{row.enterprise}</span>
                          </div>
                          <div className="text-center">
                            <div className="w-2 h-2 rounded-full bg-blue-500 mx-auto mb-1" />
                            <span className="font-medium">{row.engaged}</span>
                          </div>
                          <div className="text-center">
                            <div className="w-2 h-2 rounded-full bg-green-500 mx-auto mb-1" />
                            <span className="font-medium">{row.past}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Key Benefits */}
          <section className="py-20 lg:py-28">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                  Why This <GradientText>Combination Wins</GradientText>
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Segmentation without analytics is guessing. Analytics without segmentation is noise.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    icon: Target,
                    title: "Precision Targeting",
                    description: "Identify exactly which segments have the highest conversion potential and focus your resources where they matter most.",
                  },
                  {
                    icon: TrendingUp,
                    title: "Predictive Insights",
                    description: "Analyze segment behavior patterns to predict future outcomes and proactively adjust your sales strategy.",
                  },
                  {
                    icon: Layers,
                    title: "Personalized Engagement",
                    description: "Tailor messaging and offers to each segment based on data-driven understanding of what resonates.",
                  },
                ].map((benefit, index) => (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="p-6 rounded-2xl bg-card border border-border hover:border-pink-500/50 transition-all"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500/20 to-rose-500/20 flex items-center justify-center mb-4">
                      <benefit.icon className="w-6 h-6 text-pink-500" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Related Content Grid */}
          <section className="py-20 lg:py-28 bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                  Explore <GradientText>Related Resources</GradientText>
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Deep dive into contact management and sales analytics from our resource library.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedContent.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className="block p-6 rounded-2xl bg-card border border-border hover:border-pink-500/50 transition-all hover:shadow-lg hover:shadow-pink-500/10 h-full group"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500/20 to-rose-500/20 flex items-center justify-center flex-shrink-0">
                          <item.icon className="w-6 h-6 text-pink-500" />
                        </div>
                        <div className="flex-1">
                          <span className="text-xs text-pink-400 font-medium">{item.pillar}</span>
                          <h3 className="text-lg font-semibold mt-1 mb-2 group-hover:text-pink-400 transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-muted-foreground text-sm mb-3">{item.description}</p>
                          <span className="text-pink-500 text-sm font-medium inline-flex items-center">
                            Read more <ArrowRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 lg:py-28">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center max-w-3xl mx-auto"
              >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
                  Ready to Unlock <GradientText>Contact Insights</GradientText>?
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  LeadFlow combines powerful segmentation tools with comprehensive analytics
                  dashboards. See the patterns in your data and act on them.
                </p>
                <Link href="/handler/sign-up">
                  <GlowButton size="lg" className="group">
                    Start Your Free Trial
                    <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </GlowButton>
                </Link>
              </motion.div>
            </div>
          </section>

          {/* Related Topics Section */}
          <section className="py-20 lg:py-28 bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                  Related <GradientText>Topics</GradientText>
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Explore more crossover topics that combine multiple areas of sales and marketing expertise.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {relatedTopics.map((topic, index) => (
                  <motion.div
                    key={topic.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link
                      href={topic.href}
                      className="block p-6 rounded-2xl border border-border hover:border-pink-500/30 transition-all hover:bg-muted/50 group"
                    >
                      <h3 className="text-lg font-semibold mb-2 group-hover:text-pink-400 transition-colors">
                        {topic.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-3">{topic.description}</p>
                      <span className="text-pink-500 text-sm font-medium inline-flex items-center">
                        Explore topic <ArrowRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </main>

        <LandingFooter />
    </div>
  );
}
