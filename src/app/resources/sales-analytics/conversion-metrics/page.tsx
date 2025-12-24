"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  TrendingUp,
  Target,
  BarChart3,
  ArrowRight,
  CheckCircle2,
  Percent,
  Clock,
  Users,
  Zap,
  LineChart,
  PieChart,
  Activity
} from "lucide-react";
import { LandingHeader, LandingFooter, GlowButton, GradientText, SectionHeading } from "@/components/landing";

export default function ConversionMetricsPage() {
  return (
    <div className="min-h-screen bg-background">
      <LandingHeader />

      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-background to-background" />
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-500/30 rounded-full blur-[128px] animate-pulse" />
            <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: "1s" }} />
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-sm font-medium text-purple-400 mb-6">
                <TrendingUp className="w-4 h-4" />
                Sales Analytics
              </span>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
                Sales Conversion Metrics <GradientText>That Matter</GradientText>
              </h1>

              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Understanding which sales conversion metrics truly drive revenue growth is essential for any data-driven sales organization. Learn how to measure, analyze, and optimize the KPIs that transform your sales performance.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/handler/sign-up">
                  <GlowButton size="lg" className="group">
                    Track Your Metrics Free
                    <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </GlowButton>
                </Link>
                <Link href="/resources/sales-analytics/analytics-dashboards" className="text-muted-foreground hover:text-foreground transition-colors">
                  Learn about dashboards →
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* What Are Conversion Metrics Section */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto"
            >
              <SectionHeading
                badge="Understanding Conversion Metrics"
                title="What Are Sales Conversion Metrics and Why Do They Matter?"
                titleGradient="Conversion Metrics"
                centered={false}
              />

              <div className="mt-8 prose prose-lg dark:prose-invert max-w-none">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Sales conversion metrics are quantifiable measurements that track how effectively your sales process transforms prospects into paying customers. These metrics serve as the vital signs of your sales organization, providing actionable insights into every stage of your sales funnel.
                </p>

                <p className="text-lg text-muted-foreground leading-relaxed mt-4">
                  In today's competitive marketplace, relying on gut instinct or outdated manual tracking methods simply doesn't cut it. Modern sales teams need real-time visibility into their conversion performance to identify bottlenecks, optimize processes, and ultimately close more deals. Without proper conversion metrics, you're essentially flying blind, unable to pinpoint where prospects are dropping off or which sales activities generate the highest returns.
                </p>

                <p className="text-lg text-muted-foreground leading-relaxed mt-4">
                  The most successful sales organizations treat conversion metrics as their north star, using them to guide strategic decisions, allocate resources effectively, and continuously improve their sales methodology. Whether you're a startup looking to establish product-market fit or an enterprise scaling your sales operations, understanding these metrics is fundamental to sustainable growth.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mt-12">
                {[
                  {
                    icon: Target,
                    title: "Performance Visibility",
                    description: "Gain clear insights into how your sales team and processes perform at each stage of the funnel"
                  },
                  {
                    icon: Zap,
                    title: "Rapid Optimization",
                    description: "Quickly identify and address conversion bottlenecks before they impact your bottom line"
                  },
                  {
                    icon: TrendingUp,
                    title: "Predictable Growth",
                    description: "Build reliable forecasting models based on historical conversion data and trends"
                  }
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="p-6 rounded-2xl bg-card/50 border border-border/50 hover:border-purple-500/30 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-4">
                      <item.icon className="w-6 h-6 text-purple-500" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Essential Metrics Section */}
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Key Metrics"
              title="The Essential Sales Conversion Metrics Every Team Must Track"
              titleGradient="Essential"
              description="Master these fundamental metrics to transform your sales performance and drive consistent revenue growth."
            />

            <div className="grid lg:grid-cols-2 gap-8 mt-12 max-w-6xl mx-auto">
              {[
                {
                  icon: Percent,
                  title: "Lead-to-Opportunity Conversion Rate",
                  description: "This metric measures the percentage of leads that become qualified sales opportunities. It reveals the effectiveness of your lead qualification process and helps identify whether marketing is delivering quality leads or if your sales development team needs additional training.",
                  formula: "(Opportunities Created / Total Leads) x 100",
                  benchmark: "Industry benchmark: 13-25%"
                },
                {
                  icon: LineChart,
                  title: "Opportunity-to-Win Rate",
                  description: "Perhaps the most critical conversion metric, your win rate shows what percentage of qualified opportunities result in closed deals. A declining win rate often indicates competitive pressure, pricing issues, or gaps in your sales methodology.",
                  formula: "(Closed Won Deals / Total Opportunities) x 100",
                  benchmark: "Industry benchmark: 15-30%"
                },
                {
                  icon: Clock,
                  title: "Sales Cycle Length",
                  description: "Understanding how long it takes to convert a prospect into a customer helps with accurate forecasting and resource planning. Tracking cycle length by deal size, industry, or sales rep reveals optimization opportunities.",
                  formula: "Average days from first contact to closed deal",
                  benchmark: "Varies significantly by industry"
                },
                {
                  icon: Activity,
                  title: "Stage-to-Stage Conversion Rates",
                  description: "Breaking down conversions at each pipeline stage pinpoints exactly where deals stall or fall out. This granular view enables targeted improvements to specific parts of your sales process.",
                  formula: "(Deals advancing to next stage / Deals in current stage) x 100",
                  benchmark: "Should improve as deals progress"
                },
                {
                  icon: Users,
                  title: "Lead Response Time Impact",
                  description: "Research consistently shows that faster lead response dramatically improves conversion rates. Tracking how response time correlates with conversion helps justify investments in sales automation.",
                  formula: "Average time from lead creation to first sales contact",
                  benchmark: "Under 5 minutes ideal"
                },
                {
                  icon: PieChart,
                  title: "Conversion by Lead Source",
                  description: "Not all leads are created equal. Understanding which channels produce the highest-converting leads enables smarter marketing spend allocation and helps sales prioritize their efforts effectively.",
                  formula: "Conversion rates segmented by acquisition channel",
                  benchmark: "Referrals typically convert 3-5x higher"
                }
              ].map((metric, index) => (
                <motion.div
                  key={metric.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="p-6 rounded-2xl bg-card border border-border/50 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center flex-shrink-0">
                      <metric.icon className="w-6 h-6 text-purple-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">{metric.title}</h3>
                      <p className="text-muted-foreground mb-4">{metric.description}</p>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="text-purple-400 font-medium">Formula:</span>
                          <code className="px-2 py-1 rounded bg-muted text-xs">{metric.formula}</code>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-blue-400 font-medium">Benchmark:</span>
                          <span className="text-muted-foreground">{metric.benchmark}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Best Practices Section */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <SectionHeading
                badge="Best Practices"
                title="How to Effectively Track and Improve Your Conversion Metrics"
                titleGradient="Improve"
                centered={false}
              />

              <div className="mt-12 space-y-8">
                {[
                  {
                    title: "Establish Baseline Measurements",
                    content: "Before you can improve, you need to know where you stand. Spend at least one full quarter collecting accurate baseline data across all key conversion metrics. Ensure your CRM is properly configured to capture every touchpoint and that your team consistently logs their activities. This historical data becomes the foundation for all future optimization efforts."
                  },
                  {
                    title: "Segment Your Analysis",
                    content: "Aggregate conversion rates hide valuable insights. Break down your metrics by lead source, deal size, product line, sales rep, industry vertical, and company size. This segmentation reveals patterns that inform strategic decisions. You might discover that enterprise deals have lower conversion rates but higher lifetime value, or that certain industries convert twice as fast as others."
                  },
                  {
                    title: "Implement Real-Time Tracking",
                    content: "Monthly or quarterly conversion reports are outdated by the time you review them. Modern sales analytics platforms like LeadFlow provide real-time conversion dashboards that alert you to emerging issues before they become major problems. When conversion rates start declining, you can investigate and address the root cause immediately."
                  },
                  {
                    title: "Connect Metrics to Actions",
                    content: "Tracking metrics is pointless without corresponding action plans. For each key conversion metric, define clear thresholds that trigger specific responses. If your lead-to-opportunity rate drops below 15%, what actions do you take? Perhaps additional sales training, lead scoring refinement, or marketing alignment meetings. Make your metrics actionable."
                  },
                  {
                    title: "Foster a Data-Driven Culture",
                    content: "The most successful sales organizations make conversion metrics visible and celebrated. Display dashboards in common areas, discuss metrics in team meetings, and tie incentives to conversion improvements. When everyone understands how their actions impact conversion rates, accountability and performance naturally improve."
                  }
                ].map((practice, index) => (
                  <motion.div
                    key={practice.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-purple-500" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{practice.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{practice.content}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative max-w-4xl mx-auto"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 via-cyan-500/20 to-blue-500/20 rounded-3xl blur-2xl opacity-60" />

              <div className="relative p-8 lg:p-12 rounded-2xl bg-card/50 border border-border/50 text-center">
                <BarChart3 className="w-12 h-12 text-purple-500 mx-auto mb-6" />
                <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                  Start Tracking Your <GradientText>Conversion Metrics</GradientText> Today
                </h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  LeadFlow automatically calculates and visualizes all your key conversion metrics in real-time. Stop guessing and start growing with data-driven insights.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href="/handler/sign-up">
                    <GlowButton size="lg">Start Your Free Trial</GlowButton>
                  </Link>
                  <Link href="/resources/sales-analytics/team-performance" className="text-muted-foreground hover:text-foreground transition-colors">
                    Learn about team performance metrics →
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Related Resources */}
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Related Resources"
              title="Continue Learning About Sales Analytics"
              titleGradient="Learning"
            />

            <div className="grid md:grid-cols-3 gap-6 mt-12 max-w-5xl mx-auto">
              {[
                {
                  title: "Measuring Sales Team Performance",
                  description: "Learn how to evaluate individual and team performance with the right metrics.",
                  href: "/resources/sales-analytics/team-performance"
                },
                {
                  title: "Revenue Tracking & Attribution",
                  description: "Understand how to attribute revenue to specific campaigns and activities.",
                  href: "/resources/sales-analytics/revenue-tracking"
                },
                {
                  title: "Building Effective Dashboards",
                  description: "Design dashboards that drive action and keep your team focused.",
                  href: "/resources/sales-analytics/analytics-dashboards"
                }
              ].map((resource, index) => (
                <motion.div
                  key={resource.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link
                    href={resource.href}
                    className="block p-6 rounded-2xl bg-card border border-border/50 hover:border-purple-500/30 transition-colors h-full"
                  >
                    <h3 className="text-lg font-semibold mb-2">{resource.title}</h3>
                    <p className="text-muted-foreground mb-4">{resource.description}</p>
                    <span className="text-purple-400 text-sm font-medium">Read more →</span>
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
