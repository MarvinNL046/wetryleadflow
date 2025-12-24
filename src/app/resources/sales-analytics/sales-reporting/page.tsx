"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  FileText,
  BarChart3,
  ArrowRight,
  CheckCircle2,
  Target,
  Clock,
  TrendingUp,
  Users,
  Calendar,
  FileSpreadsheet,
  Presentation,
  Filter
} from "lucide-react";
import { LandingHeader, LandingFooter, GlowButton, GradientText, SectionHeading } from "@/components/landing";

export default function SalesReportingPage() {
  return (
    <div className="min-h-screen bg-background">
      <LandingHeader />

      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-background to-background" />
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/30 rounded-full blur-[128px] animate-pulse" />
            <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: "1s" }} />
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-sm font-medium text-purple-400 mb-6">
                <FileText className="w-4 h-4" />
                Sales Analytics
              </span>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
                Sales Reporting <GradientText>Best Practices</GradientText>
              </h1>

              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Great sales reports transform raw data into actionable insights that drive better decisions. Learn how to create reports that inform strategy, motivate teams, and accelerate revenue growth.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/handler/sign-up">
                  <GlowButton size="lg" className="group">
                    Create Better Reports
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

        {/* Why Reports Matter Section */}
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
                badge="The Power of Reporting"
                title="Why Sales Reporting Is the Foundation of Revenue Excellence"
                titleGradient="Foundation"
                centered={false}
              />

              <div className="mt-8 prose prose-lg dark:prose-invert max-w-none">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Sales reporting is far more than a compliance exercise or something managers request to feel informed. When done correctly, sales reports become the connective tissue between strategy and execution, providing the feedback loop that enables continuous improvement and data-driven decision making.
                </p>

                <p className="text-lg text-muted-foreground leading-relaxed mt-4">
                  The most effective sales organizations treat reporting as a strategic asset. They use reports not just to understand what happened, but to predict what will happen and prescribe what should happen next. This shift from descriptive to predictive to prescriptive analytics transforms sales from an art to a science.
                </p>

                <p className="text-lg text-muted-foreground leading-relaxed mt-4">
                  However, creating reports that actually drive action requires thoughtful design. Too many sales teams drown in data while thirsting for insight. They produce dozens of reports that no one reads, filled with metrics that don't matter. Breaking free from this reporting theater requires a fundamental rethinking of what reports should accomplish and who they serve.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mt-12">
                {[
                  {
                    icon: Target,
                    title: "Strategic Alignment",
                    description: "Ensure daily activities align with quarterly and annual business objectives"
                  },
                  {
                    icon: TrendingUp,
                    title: "Performance Visibility",
                    description: "Understand exactly where you stand relative to goals at any moment"
                  },
                  {
                    icon: Clock,
                    title: "Timely Intervention",
                    description: "Identify and address issues before they impact your bottom line"
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

        {/* Essential Reports Section */}
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Essential Reports"
              title="The Sales Reports Every Organization Needs"
              titleGradient="Every Organization"
              description="Build your reporting foundation with these critical reports that provide comprehensive visibility into sales performance."
            />

            <div className="grid lg:grid-cols-2 gap-8 mt-12 max-w-6xl mx-auto">
              {[
                {
                  icon: FileSpreadsheet,
                  title: "Pipeline Report",
                  description: "Your pipeline report should show all active opportunities by stage, including deal value, expected close date, and probability. This report enables forecasting, helps managers identify stuck deals, and reveals whether reps have enough coverage to hit their numbers.",
                  frequency: "Weekly at minimum, daily in fast-moving environments",
                  audience: "Sales reps, managers, executives"
                },
                {
                  icon: Calendar,
                  title: "Sales Activity Report",
                  description: "Track leading indicators like calls, emails, meetings, and demos. Activity reports reveal effort levels and help correlate specific activities with revenue outcomes. They're essential for coaching and identifying best practices.",
                  frequency: "Daily or weekly depending on sales cycle",
                  audience: "Sales reps, frontline managers"
                },
                {
                  icon: TrendingUp,
                  title: "Win/Loss Analysis Report",
                  description: "Understand why deals are won or lost by tracking close rates by competitor, industry, deal size, and other segments. This intelligence informs product development, positioning, and sales training priorities.",
                  frequency: "Monthly or quarterly deep dives",
                  audience: "Sales leadership, product, marketing"
                },
                {
                  icon: Users,
                  title: "Sales Performance Report",
                  description: "Individual and team scorecards showing quota attainment, pipeline health, activity metrics, and key conversion rates. This report enables fair evaluation and identifies both top performers and those needing support.",
                  frequency: "Weekly for management, monthly for executives",
                  audience: "All levels of sales organization"
                },
                {
                  icon: Presentation,
                  title: "Forecast Report",
                  description: "Roll up expected revenue by period, category, and confidence level. Accurate forecasting requires understanding commit vs. best case vs. pipeline, and tracking forecast accuracy over time.",
                  frequency: "Weekly updates, monthly deep analysis",
                  audience: "Sales leadership, finance, executives"
                },
                {
                  icon: Filter,
                  title: "Lead Source Report",
                  description: "Analyze which lead sources generate the most pipeline and revenue. This report bridges marketing and sales, enabling informed decisions about lead generation investments and channel optimization.",
                  frequency: "Monthly for tactical decisions, quarterly for strategy",
                  audience: "Sales and marketing leadership"
                }
              ].map((report, index) => (
                <motion.div
                  key={report.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="p-6 rounded-2xl bg-card border border-border/50 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center flex-shrink-0">
                      <report.icon className="w-6 h-6 text-purple-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">{report.title}</h3>
                      <p className="text-muted-foreground mb-4">{report.description}</p>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-purple-400" />
                          <span className="text-muted-foreground">{report.frequency}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-blue-400" />
                          <span className="text-muted-foreground">{report.audience}</span>
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
                title="Creating Reports That Actually Drive Action"
                titleGradient="Drive Action"
                centered={false}
              />

              <div className="mt-12 space-y-8">
                {[
                  {
                    title: "Start with the Decision, Not the Data",
                    content: "Before creating any report, ask: 'What decision will this report inform?' If you can't answer that question clearly, don't create the report. Every metric, chart, and data point should serve a purpose. This discipline prevents report bloat and ensures reports remain actionable rather than merely informational."
                  },
                  {
                    title: "Match Reporting Cadence to Action Cycles",
                    content: "Reports should arrive when decisions need to be made. Daily activity reports enable daily coaching. Weekly pipeline reports support weekly forecast calls. Monthly performance summaries inform monthly business reviews. Misaligned cadence means reports arrive too late to matter or too early to be accurate."
                  },
                  {
                    title: "Design for Your Audience",
                    content: "Executives need high-level summaries and exception-based reporting. Frontline managers need detailed performance data for coaching. Sales reps need personal scorecards and activity tracking. Create audience-specific views rather than one-size-fits-all reports that serve no one well."
                  },
                  {
                    title: "Include Context and Comparisons",
                    content: "A number without context is just a number. Always include comparisons - period over period, actual vs. target, individual vs. team average. Context transforms data into insight. When someone looks at a metric, they should immediately understand whether it's good, bad, or neutral."
                  },
                  {
                    title: "Automate Everything Possible",
                    content: "Manual report creation is a waste of valuable sales time and introduces errors. Modern CRMs like LeadFlow generate reports automatically, ensuring data is always current and freeing your team to focus on selling rather than spreadsheet manipulation."
                  },
                  {
                    title: "Build in Accountability",
                    content: "Reports should have owners who are responsible for reviewing and acting on them. Schedule regular report reviews in team meetings. When reports reveal issues, assign follow-up actions with clear ownership and deadlines. Reports without accountability become reports without impact."
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

        {/* Common Mistakes Section */}
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <SectionHeading
                badge="Avoid These Mistakes"
                title="Common Sales Reporting Pitfalls"
                titleGradient="Pitfalls"
                centered={false}
              />

              <div className="mt-8 prose prose-lg dark:prose-invert max-w-none">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Even well-intentioned reporting programs can fail to deliver value. Recognizing common mistakes helps you build a reporting practice that truly serves your organization.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mt-12">
                {[
                  {
                    title: "Reporting Vanity Metrics",
                    description: "Metrics that look impressive but don't correlate with business outcomes. Focus on metrics that drive revenue, not just activity for activity's sake."
                  },
                  {
                    title: "Data Quality Issues",
                    description: "Reports are only as good as the underlying data. If your CRM data is incomplete or inaccurate, reports will mislead rather than inform."
                  },
                  {
                    title: "Too Many Reports",
                    description: "Information overload leads to analysis paralysis. A few excellent reports beat dozens of mediocre ones. Quality over quantity always."
                  },
                  {
                    title: "Inconsistent Definitions",
                    description: "When different teams define metrics differently, comparisons become meaningless. Establish and document clear definitions for all key terms."
                  },
                  {
                    title: "Backward-Looking Only",
                    description: "Historical reports show what happened but not what to do about it. Include forward-looking indicators and actionable recommendations."
                  },
                  {
                    title: "No Follow-Through",
                    description: "The best report is worthless if no one acts on it. Build accountability mechanisms and track whether report insights lead to action."
                  }
                ].map((mistake, index) => (
                  <motion.div
                    key={mistake.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="p-6 rounded-2xl bg-card border border-amber-500/20 hover:border-amber-500/40 transition-colors"
                  >
                    <h3 className="text-lg font-semibold mb-2 text-amber-400">{mistake.title}</h3>
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
                <BarChart3 className="w-12 h-12 text-purple-500 mx-auto mb-6" />
                <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                  Transform Your <GradientText>Sales Reporting</GradientText>
                </h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  LeadFlow automatically generates all the essential sales reports you need, with real-time data and actionable insights. Stop building spreadsheets and start closing deals.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href="/handler/sign-up">
                    <GlowButton size="lg">Start Your Free Trial</GlowButton>
                  </Link>
                  <Link href="/resources/sales-analytics/conversion-metrics" className="text-muted-foreground hover:text-foreground transition-colors">
                    Learn about conversion metrics →
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
                  title: "Building Effective Sales Dashboards",
                  description: "Transform reports into interactive dashboards that drive daily action.",
                  href: "/resources/sales-analytics/analytics-dashboards"
                },
                {
                  title: "Revenue Tracking & Attribution",
                  description: "Understand where your revenue comes from and which activities drive it.",
                  href: "/resources/sales-analytics/revenue-tracking"
                },
                {
                  title: "Measuring Team Performance",
                  description: "Create fair and motivating performance measurement systems.",
                  href: "/resources/sales-analytics/team-performance"
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
