"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  LandingHeader,
  LandingFooter,
  GlowButton,
  GradientText,
  SectionHeading
} from "@/components/landing";
import {
  Activity,
  Users,
  FileText,
  BarChart3,
  ArrowRight,
  CheckCircle2,
  Clock,
  Eye,
  TrendingUp,
  MessageSquare,
  Sparkles,
  History
} from "lucide-react";

const relatedContent = [
  {
    title: "Activity Tracking",
    description: "Learn how to track every touchpoint and interaction with your contacts for complete relationship visibility.",
    href: "/resources/contact-management/activity-tracking",
    pillar: "Contact Management",
    icon: Activity,
    gradient: "from-rose-500 to-pink-500"
  },
  {
    title: "Notes & History",
    description: "Master the art of maintaining comprehensive contact histories and notes for better relationship management.",
    href: "/resources/contact-management/notes-history",
    pillar: "Contact Management",
    icon: FileText,
    gradient: "from-pink-500 to-rose-500"
  },
  {
    title: "Team Performance Analytics",
    description: "Analyze team performance metrics to understand how activities correlate with sales success.",
    href: "/resources/sales-analytics/team-performance",
    pillar: "Sales Analytics",
    icon: Users,
    gradient: "from-rose-500 to-red-500"
  },
  {
    title: "Conversion Metrics",
    description: "Track conversion rates across your funnel and understand which activities drive the best results.",
    href: "/resources/sales-analytics/conversion-metrics",
    pillar: "Sales Analytics",
    icon: TrendingUp,
    gradient: "from-red-500 to-rose-500"
  }
];

const relatedTopics = [
  { title: "Instagram Lead Nurturing", href: "/resources/topics/instagram-lead-nurturing" },
  { title: "Deal Velocity Optimization", href: "/resources/topics/deal-velocity-optimization" },
  { title: "Lead Handoff Automation", href: "/resources/topics/lead-handoff-automation" },
  { title: "Predictive Lead Scoring", href: "/resources/topics/predictive-lead-scoring" }
];

export default function ContactActivityInsightsPage() {
  return (
    <div className="min-h-screen bg-background">
      <head>
        <meta name="robots" content="noindex, follow" />
      </head>
      <LandingHeader />

        <main>
          {/* Hero Section */}
          <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden pt-20">
            {/* Background Effects - Rose Theme */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-rose-900/20 via-background to-background" />
              <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-rose-500/30 rounded-full blur-[128px] animate-pulse" />
              <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-pink-500/20 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: "1s" }} />
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
                  className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20"
                >
                  <Activity className="w-4 h-4 mr-2" />
                  Contact Management + Sales Analytics
                </motion.div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
                  Contact Activity Insights: <span className="bg-gradient-to-r from-rose-500 via-pink-500 to-red-500 bg-clip-text text-transparent">Know Your Customers</span>
                </h1>

                <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                  Combine comprehensive contact activity tracking with powerful analytics to gain
                  deep insights into customer behavior. Understand what actions drive engagement
                  and conversion at every touchpoint.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href="/handler/sign-up">
                    <GlowButton size="lg" className="group">
                      Start Tracking Activities
                      <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </GlowButton>
                  </Link>
                  <Link
                    href="/resources/contact-management/activity-tracking"
                    className="inline-flex items-center gap-2 px-6 py-3 text-base font-medium rounded-full border border-border hover:bg-accent transition-colors"
                  >
                    Explore Activity Tracking
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Introduction Section */}
          <section className="py-20 lg:py-32">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
                    The Power of <span className="bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">Activity Intelligence</span>
                  </h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      Every interaction with a contact tells a story. Emails opened, calls made,
                      meetings scheduled, notes added, each activity provides valuable data about
                      engagement levels and buying intent. When you combine this activity data with
                      sophisticated analytics, patterns emerge that transform how you approach sales.
                    </p>
                    <p>
                      By bridging contact management with sales analytics, you move beyond simple
                      record-keeping to predictive intelligence. Understand which activities lead
                      to conversions, identify at-risk relationships before they churn, and
                      optimize your team&apos;s efforts based on what actually works.
                    </p>
                    <p>
                      LeadFlow captures every touchpoint automatically and surfaces actionable
                      insights, helping you understand not just what happened, but what should
                      happen next to move each relationship forward.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="relative"
                >
                  <div className="absolute -inset-4 bg-gradient-to-r from-rose-500/20 via-pink-500/20 to-red-500/20 rounded-3xl blur-2xl opacity-60" />
                  <div className="relative rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl overflow-hidden p-6">
                    <h4 className="font-semibold mb-4">Recent Contact Activity</h4>
                    <div className="space-y-3">
                      {[
                        { icon: MessageSquare, activity: "Email opened", contact: "Sarah M.", time: "2 min ago", color: "text-rose-500" },
                        { icon: Clock, activity: "Meeting scheduled", contact: "John D.", time: "15 min ago", color: "text-pink-500" },
                        { icon: FileText, activity: "Note added", contact: "Emily R.", time: "1 hour ago", color: "text-red-500" },
                        { icon: Eye, activity: "Proposal viewed", contact: "Mike T.", time: "2 hours ago", color: "text-rose-500" },
                        { icon: Activity, activity: "Website visit", contact: "Lisa K.", time: "3 hours ago", color: "text-pink-500" }
                      ].map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border border-border/50"
                        >
                          <div className={`w-8 h-8 rounded-full bg-rose-500/10 flex items-center justify-center ${item.color}`}>
                            <item.icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">{item.activity}</p>
                            <p className="text-xs text-muted-foreground">{item.contact}</p>
                          </div>
                          <span className="text-xs text-muted-foreground whitespace-nowrap">{item.time}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Key Benefits */}
          <section className="py-20 lg:py-32 bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <SectionHeading
                badge="Cross-Pillar Benefits"
                title="Why Activity Insights Transform Sales"
                titleGradient="Activity Insights"
                description="Combining contact activity data with analytics creates a complete picture of customer engagement and opportunity."
              />

              <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    icon: History,
                    title: "Complete Relationship Timeline",
                    description: "See every interaction in chronological order for full context on any contact relationship."
                  },
                  {
                    icon: Sparkles,
                    title: "Engagement Scoring",
                    description: "Automatically score contacts based on activity levels to identify your most engaged prospects."
                  },
                  {
                    icon: BarChart3,
                    title: "Activity-to-Outcome Analysis",
                    description: "Understand which activities correlate with closed deals and optimize your approach."
                  },
                  {
                    icon: Users,
                    title: "Team Activity Comparison",
                    description: "Compare activity patterns across your team to identify and replicate top performer behaviors."
                  },
                  {
                    icon: TrendingUp,
                    title: "Conversion Path Mapping",
                    description: "Map the typical activity sequence that leads to conversion for each customer segment."
                  },
                  {
                    icon: Eye,
                    title: "Real-Time Activity Alerts",
                    description: "Get notified instantly when high-value contacts engage with your emails, proposals, or content."
                  }
                ].map((benefit, index) => (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="p-6 rounded-2xl bg-card border border-border hover:border-rose-500/50 transition-all hover:shadow-lg hover:shadow-rose-500/10"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500/20 to-pink-500/20 flex items-center justify-center mb-4">
                      <benefit.icon className="w-6 h-6 text-rose-500" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Related Content Grid */}
          <section className="py-20 lg:py-32">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <SectionHeading
                badge="Deep Dive Resources"
                title="Explore Related Content"
                description="Master contact activity insights with comprehensive guides from multiple pillars."
              />

              <div className="mt-12 grid md:grid-cols-2 gap-6">
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
                      className="block p-6 rounded-2xl bg-card border border-border hover:border-rose-500/50 transition-all hover:shadow-lg hover:shadow-rose-500/10 h-full group"
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center flex-shrink-0`}>
                          <item.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <span className="text-xs font-medium text-rose-500 uppercase tracking-wider">{item.pillar}</span>
                          <h3 className="text-lg font-semibold mt-1 mb-2 group-hover:text-rose-500 transition-colors">{item.title}</h3>
                          <p className="text-muted-foreground text-sm mb-4">{item.description}</p>
                          <span className="text-rose-500 text-sm font-medium inline-flex items-center">
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

          {/* Related Topics */}
          <section className="py-20 lg:py-32 bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <SectionHeading
                badge="Related Topics"
                title="Explore More Crossover Topics"
                description="Discover other powerful combinations of LeadFlow features to optimize your sales process."
              />

              <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
                      className="block p-4 rounded-xl bg-card border border-border hover:border-rose-500/50 transition-all text-center group"
                    >
                      <h3 className="font-medium group-hover:text-rose-500 transition-colors">{topic.title}</h3>
                    </Link>
                  </motion.div>
                ))}
              </div>
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
                  Ready to Unlock <span className="bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">Activity Insights</span>?
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Start capturing and analyzing contact activities today with LeadFlow.
                  Gain the intelligence you need to build stronger relationships and
                  close more deals.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href="/handler/sign-up">
                    <GlowButton size="lg" className="group">
                      Start Your Free Trial
                      <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </GlowButton>
                  </Link>
                  <Link
                    href="/resources"
                    className="inline-flex items-center gap-2 px-6 py-3 text-base font-medium rounded-full border border-border hover:bg-accent transition-colors"
                  >
                    Browse All Resources
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>
        </main>

      <LandingFooter />
    </div>
  );
}
