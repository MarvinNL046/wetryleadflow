"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  LayoutDashboard,
  BarChart3,
  ArrowRight,
  CheckCircle2,
  Target,
  Eye,
  TrendingUp,
  Gauge,
  Layers,
  Zap,
  Settings,
  Monitor
} from "lucide-react";
import { LandingHeader, LandingFooter, GlowButton, GradientText, SectionHeading } from "@/components/landing";

export default function AnalyticsDashboardsPage() {
  return (
    <div className="min-h-screen bg-background">
      <LandingHeader />

      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-background to-background" />
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-500/30 rounded-full blur-[128px] animate-pulse" />
            <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-500/20 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: "1s" }} />
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-sm font-medium text-purple-400 mb-6">
                <LayoutDashboard className="w-4 h-4" />
                Sales Analytics
              </span>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
                Building Effective <GradientText>Sales Dashboards</GradientText>
              </h1>

              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                A well-designed sales dashboard transforms complex data into instant insights, enabling your team to make faster, smarter decisions. Learn the principles and practices of dashboard design that drives results.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/handler/sign-up">
                  <GlowButton size="lg" className="group">
                    Build Your Dashboard
                    <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </GlowButton>
                </Link>
                <Link href="/resources/sales-analytics/sales-reporting" className="text-muted-foreground hover:text-foreground transition-colors">
                  Learn about sales reporting →
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Why Dashboards Matter Section */}
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
                badge="Dashboard Power"
                title="Why Sales Dashboards Are Essential for Modern Sales Teams"
                titleGradient="Essential"
                centered={false}
              />

              <div className="mt-8 prose prose-lg dark:prose-invert max-w-none">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  In the age of information overload, sales dashboards serve as the lens that brings critical data into sharp focus. Unlike static reports that quickly become outdated, dashboards provide a real-time window into sales performance, enabling teams to monitor, analyze, and react to changes as they happen.
                </p>

                <p className="text-lg text-muted-foreground leading-relaxed mt-4">
                  The best sales dashboards do more than display numbers - they tell a story. They surface the metrics that matter, highlight trends and anomalies, and guide users toward the insights they need to take action. A great dashboard answers questions before they're asked and reveals opportunities that might otherwise go unnoticed.
                </p>

                <p className="text-lg text-muted-foreground leading-relaxed mt-4">
                  Research shows that organizations with effective analytics dashboards are significantly more likely to make faster decisions and outperform their competition. But effectiveness doesn't come from having dashboards - it comes from having the right dashboards, designed with intention and aligned with business objectives.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mt-12">
                {[
                  {
                    icon: Eye,
                    title: "Real-Time Visibility",
                    description: "See exactly where you stand against targets at any moment"
                  },
                  {
                    icon: Zap,
                    title: "Faster Decisions",
                    description: "Reduce time to insight and enable rapid response to changes"
                  },
                  {
                    icon: Target,
                    title: "Goal Alignment",
                    description: "Keep your team focused on the metrics that drive success"
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

        {/* Types of Dashboards Section */}
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Dashboard Types"
              title="Essential Sales Dashboards for Every Organization"
              titleGradient="Essential"
              description="Different audiences need different views. Build a dashboard ecosystem that serves everyone from frontline reps to executives."
            />

            <div className="grid lg:grid-cols-2 gap-8 mt-12 max-w-6xl mx-auto">
              {[
                {
                  icon: Gauge,
                  title: "Executive Dashboard",
                  description: "High-level overview designed for C-suite and senior leadership. Shows revenue performance against plan, key trends, and strategic metrics. Should be scannable in under 30 seconds with clear indicators of business health.",
                  keyMetrics: ["Revenue vs. Target", "Pipeline Health", "Forecast Accuracy", "Win Rate Trends"],
                  audience: "CEO, CRO, VP Sales"
                },
                {
                  icon: TrendingUp,
                  title: "Pipeline Dashboard",
                  description: "Detailed view of all opportunities across stages, designed for sales managers and operations. Enables pipeline inspection, deal prioritization, and forecasting. Should reveal where deals are stuck and which need attention.",
                  keyMetrics: ["Stage Distribution", "Aging Analysis", "Coverage Ratio", "Velocity by Stage"],
                  audience: "Sales Managers, Revenue Operations"
                },
                {
                  icon: Monitor,
                  title: "Individual Performance Dashboard",
                  description: "Personal scorecard for sales reps showing their metrics against quota and peers. Motivates through transparency and helps reps self-diagnose performance issues. Should update in real-time as activities are logged.",
                  keyMetrics: ["Quota Attainment", "Activity Metrics", "Win Rate", "Pipeline Value"],
                  audience: "Account Executives, SDRs"
                },
                {
                  icon: Layers,
                  title: "Team Leaderboard Dashboard",
                  description: "Competitive view showing how team members rank across key metrics. Creates healthy competition and recognition. Should be displayed prominently in sales areas and updated continuously.",
                  keyMetrics: ["Revenue Ranking", "Activity Ranking", "Win Rate Ranking", "Pipeline Ranking"],
                  audience: "All Sales Team Members"
                },
                {
                  icon: BarChart3,
                  title: "Marketing-Sales Alignment Dashboard",
                  description: "Bridges the gap between marketing and sales by showing lead flow, conversion rates by source, and marketing-sourced pipeline. Essential for joint planning and optimization discussions.",
                  keyMetrics: ["Lead Volume by Source", "MQL to SQL Conversion", "Pipeline by Campaign", "Time to Contact"],
                  audience: "CMO, Sales Leadership, Marketing Ops"
                },
                {
                  icon: Settings,
                  title: "Operations Dashboard",
                  description: "Deep-dive view for sales operations showing process efficiency, data quality, and system health. Enables proactive identification of operational issues before they impact sales performance.",
                  keyMetrics: ["Data Completeness", "Process Compliance", "System Usage", "SLA Adherence"],
                  audience: "Sales Operations, CRM Admin"
                }
              ].map((dashboard, index) => (
                <motion.div
                  key={dashboard.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="p-6 rounded-2xl bg-card border border-border/50 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center flex-shrink-0">
                      <dashboard.icon className="w-6 h-6 text-purple-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">{dashboard.title}</h3>
                      <p className="text-muted-foreground mb-4">{dashboard.description}</p>
                      <div className="space-y-3">
                        <div>
                          <span className="text-sm text-purple-400 font-medium">Key Metrics:</span>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {dashboard.keyMetrics.map((metric) => (
                              <span key={metric} className="px-2 py-1 rounded-full bg-purple-500/10 text-xs text-purple-300">
                                {metric}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="text-sm">
                          <span className="text-blue-400 font-medium">Audience:</span>
                          <span className="text-muted-foreground ml-2">{dashboard.audience}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Design Principles Section */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <SectionHeading
                badge="Design Principles"
                title="Principles of Effective Dashboard Design"
                titleGradient="Effective"
                centered={false}
              />

              <div className="mt-12 space-y-8">
                {[
                  {
                    title: "Lead with the Most Important Metrics",
                    content: "Human attention is scarce. Place your most critical KPIs in the top-left corner where eyes naturally land first. Use size, color, and position to create a clear visual hierarchy that guides viewers to the most important information. A dashboard that buries the lead fails its fundamental purpose."
                  },
                  {
                    title: "Embrace Simplicity Over Complexity",
                    content: "The best dashboards show only what's needed - nothing more, nothing less. Resist the temptation to cram in every available metric. Each widget should earn its place by directly supporting decision-making. If a chart requires explanation to understand, it's probably too complex."
                  },
                  {
                    title: "Use Appropriate Visualizations",
                    content: "Different data types call for different chart types. Use line charts for trends over time, bar charts for comparisons, gauges for progress toward targets, and tables when exact numbers matter. Pie charts are almost never the right choice. Match the visualization to the insight you're trying to convey."
                  },
                  {
                    title: "Provide Context and Benchmarks",
                    content: "A number without context is just a number. Always show metrics against targets, prior periods, or benchmarks. Use conditional formatting (red/yellow/green) to instantly communicate whether performance is good or bad. Context transforms data into actionable insight."
                  },
                  {
                    title: "Enable Drill-Down Exploration",
                    content: "Dashboards should answer immediate questions but also enable deeper exploration. Build in the ability to click through from summary metrics to detailed views. When someone spots an anomaly, they should be able to investigate without switching tools."
                  },
                  {
                    title: "Design for the Display Environment",
                    content: "Consider where and how the dashboard will be viewed. TV monitors in the sales area need larger fonts and simpler layouts. Mobile views require prioritized metrics that work on small screens. Personal dashboards can be more detailed since users interact directly."
                  }
                ].map((principle, index) => (
                  <motion.div
                    key={principle.title}
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
                      <h3 className="text-xl font-semibold mb-2">{principle.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{principle.content}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Building Dashboards Section */}
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <SectionHeading
                badge="Implementation Guide"
                title="How to Build Dashboards That Get Used"
                titleGradient="Get Used"
                centered={false}
              />

              <div className="mt-8 prose prose-lg dark:prose-invert max-w-none">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Building a dashboard is easy. Building a dashboard that people actually use to make better decisions is hard. Follow these implementation practices to ensure your dashboards deliver lasting value.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mt-12">
                {[
                  {
                    step: "01",
                    title: "Start with User Requirements",
                    description: "Interview the intended users. What questions do they need answered? What decisions do they make? What frustrates them about current reporting? Design for their needs, not your assumptions."
                  },
                  {
                    step: "02",
                    title: "Prototype Before Building",
                    description: "Sketch dashboard layouts on paper or in simple tools before investing in development. Get feedback on structure and content before worrying about visual polish."
                  },
                  {
                    step: "03",
                    title: "Ensure Data Quality First",
                    description: "A beautiful dashboard built on bad data is worse than useless - it's actively harmful. Validate data accuracy and completeness before launch. Build in data quality monitors."
                  },
                  {
                    step: "04",
                    title: "Launch Small, Iterate Fast",
                    description: "Start with a minimal dashboard covering essential metrics. Gather user feedback and iterate. Adding features is easier than removing them once people become dependent."
                  },
                  {
                    step: "05",
                    title: "Train Users Thoroughly",
                    description: "Even intuitive dashboards benefit from training. Show users where to find what they need, how to interpret visualizations, and what actions to take based on different scenarios."
                  },
                  {
                    step: "06",
                    title: "Establish Review Cadences",
                    description: "Schedule regular reviews of dashboard effectiveness. Are people using them? Are the metrics still relevant? Dashboards should evolve as business needs change."
                  }
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="p-6 rounded-2xl bg-card border border-border/50"
                  >
                    <div className="flex items-start gap-4">
                      <span className="text-3xl font-bold text-purple-500/30">{item.step}</span>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                        <p className="text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Common Mistakes Section */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <SectionHeading
                badge="Avoid These Mistakes"
                title="Dashboard Design Pitfalls to Avoid"
                titleGradient="Avoid"
                centered={false}
              />

              <div className="grid md:grid-cols-2 gap-6 mt-12">
                {[
                  {
                    title: "Metric Overload",
                    description: "Cramming 50 metrics into one dashboard doesn't make it comprehensive - it makes it unusable. Focus on the vital few, not the trivial many."
                  },
                  {
                    title: "Static Thinking",
                    description: "A dashboard built once and never updated becomes stale and ignored. Business needs change; dashboards should change with them."
                  },
                  {
                    title: "Ignoring Mobile Users",
                    description: "Sales reps are often on the move. If your dashboard doesn't work on mobile, you're missing a huge opportunity for engagement."
                  },
                  {
                    title: "No Clear Ownership",
                    description: "Without someone responsible for dashboard maintenance and evolution, they quickly become outdated and unreliable."
                  }
                ].map((mistake, index) => (
                  <motion.div
                    key={mistake.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="p-6 rounded-2xl bg-card border border-red-500/20 hover:border-red-500/40 transition-colors"
                  >
                    <h3 className="text-lg font-semibold mb-2 text-red-400">{mistake.title}</h3>
                    <p className="text-muted-foreground">{mistake.description}</p>
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
                <LayoutDashboard className="w-12 h-12 text-purple-500 mx-auto mb-6" />
                <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                  Get Beautiful <GradientText>Dashboards</GradientText> Out of the Box
                </h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  LeadFlow includes pre-built dashboards for executives, managers, and reps - all designed with these best practices baked in. Start making data-driven decisions from day one.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href="/handler/sign-up">
                    <GlowButton size="lg">Start Your Free Trial</GlowButton>
                  </Link>
                  <Link href="/resources/sales-analytics/team-performance" className="text-muted-foreground hover:text-foreground transition-colors">
                    Learn about team performance →
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
                  title: "Sales Conversion Metrics That Matter",
                  description: "Master the metrics that reveal funnel health and drive growth.",
                  href: "/resources/sales-analytics/conversion-metrics"
                },
                {
                  title: "Sales Reporting Best Practices",
                  description: "Create reports that inform strategy and drive accountability.",
                  href: "/resources/sales-analytics/sales-reporting"
                },
                {
                  title: "Revenue Tracking & Attribution",
                  description: "Understand which activities and channels generate revenue.",
                  href: "/resources/sales-analytics/revenue-tracking"
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
