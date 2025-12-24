"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Users,
  Trophy,
  BarChart3,
  ArrowRight,
  CheckCircle2,
  Target,
  Clock,
  TrendingUp,
  Award,
  Activity,
  UserCheck,
  Briefcase
} from "lucide-react";
import { LandingHeader, LandingFooter, GlowButton, GradientText, SectionHeading } from "@/components/landing";

export default function TeamPerformancePage() {
  return (
    <div className="min-h-screen bg-background">
      <LandingHeader />

      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-background to-background" />
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/30 rounded-full blur-[128px] animate-pulse" />
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
                <Trophy className="w-4 h-4" />
                Sales Analytics
              </span>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
                Measuring Sales Team <GradientText>Performance</GradientText>
              </h1>

              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                High-performing sales teams are built on transparent, fair, and comprehensive performance measurement. Discover the metrics and methodologies that elevate individual contributors and drive team excellence.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/handler/sign-up">
                  <GlowButton size="lg" className="group">
                    Measure Team Performance
                    <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </GlowButton>
                </Link>
                <Link href="/resources/sales-analytics/conversion-metrics" className="text-muted-foreground hover:text-foreground transition-colors">
                  Learn about conversion metrics →
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Why Measure Performance Section */}
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
                badge="The Foundation of Excellence"
                title="Why Measuring Sales Team Performance Is Critical for Success"
                titleGradient="Performance"
                centered={false}
              />

              <div className="mt-8 prose prose-lg dark:prose-invert max-w-none">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Sales performance measurement goes far beyond simply tracking who closed the most deals last month. Effective performance management creates a culture of continuous improvement, provides coaching opportunities, and ensures fair compensation and recognition. When done right, it transforms your sales organization from a group of individuals into a cohesive, high-performing team.
                </p>

                <p className="text-lg text-muted-foreground leading-relaxed mt-4">
                  The challenge many organizations face is finding the right balance between metrics that drive behavior and metrics that reflect true value creation. Overemphasizing easily gamed metrics like call volume can lead to quantity over quality, while focusing solely on revenue ignores the activities and behaviors that generate long-term success.
                </p>

                <p className="text-lg text-muted-foreground leading-relaxed mt-4">
                  Modern sales analytics platforms enable nuanced performance measurement that accounts for deal complexity, market conditions, and individual development trajectories. By leveraging comprehensive performance data, sales leaders can identify top performers worthy of promotion, struggling reps who need support, and systemic issues affecting the entire team.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mt-12">
                {[
                  {
                    icon: Trophy,
                    title: "Recognize Excellence",
                    description: "Identify and reward top performers based on comprehensive achievement data"
                  },
                  {
                    icon: Target,
                    title: "Enable Coaching",
                    description: "Pinpoint specific areas where individual reps can improve their skills"
                  },
                  {
                    icon: TrendingUp,
                    title: "Drive Accountability",
                    description: "Create transparency that motivates the entire team to excel"
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

        {/* Key Performance Metrics Section */}
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Performance Metrics"
              title="Essential KPIs for Evaluating Sales Team Performance"
              titleGradient="KPIs"
              description="A balanced scorecard of metrics that capture both results and the activities that drive them."
            />

            <div className="grid lg:grid-cols-2 gap-8 mt-12 max-w-6xl mx-auto">
              {[
                {
                  icon: Target,
                  title: "Quota Attainment",
                  description: "The foundational metric that measures what percentage of their sales target each rep achieves. Track not just binary hit/miss but the distribution of attainment levels. Understanding the gap between quota and actual performance helps calibrate future targets and identify training needs.",
                  insight: "Top teams see 60-70% of reps hitting quota consistently"
                },
                {
                  icon: Activity,
                  title: "Activity Metrics",
                  description: "Leading indicators like calls made, emails sent, meetings scheduled, and proposals delivered. While activities alone don't guarantee results, tracking them reveals effort levels and helps diagnose why some reps underperform despite working hard.",
                  insight: "Use ratios like calls-to-meetings to measure efficiency"
                },
                {
                  icon: TrendingUp,
                  title: "Win Rate by Rep",
                  description: "Individual win rates compared to team averages highlight selling skill differences. A rep with high activity but low win rate needs closing skills training, while someone with few opportunities but high win rate might need help with prospecting.",
                  insight: "Variance in win rates often indicates coaching opportunities"
                },
                {
                  icon: Clock,
                  title: "Average Deal Cycle",
                  description: "How quickly each rep moves deals through the pipeline reveals selling effectiveness. Longer cycles may indicate poor qualification, inability to create urgency, or getting stuck in procurement processes.",
                  insight: "Compare cycles across similar deal sizes for fair evaluation"
                },
                {
                  icon: Briefcase,
                  title: "Pipeline Coverage",
                  description: "The ratio of pipeline value to quota shows whether reps have enough opportunities to hit their numbers. Recommended coverage varies by industry but typically ranges from 3x to 5x quota.",
                  insight: "Early warning system for quota attainment risk"
                },
                {
                  icon: UserCheck,
                  title: "Customer Retention & Expansion",
                  description: "For teams with account management responsibilities, measuring retention rates, upsell revenue, and customer satisfaction scores ensures reps nurture existing relationships while pursuing new business.",
                  insight: "Acquiring new customers costs 5-25x more than retention"
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
                      <div className="flex items-center gap-2 text-sm">
                        <Award className="w-4 h-4 text-purple-400" />
                        <span className="text-purple-400">{metric.insight}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Building a Performance Culture Section */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <SectionHeading
                badge="Performance Culture"
                title="Building a Data-Driven Performance Culture"
                titleGradient="Data-Driven"
                centered={false}
              />

              <div className="mt-12 space-y-8">
                {[
                  {
                    title: "Create Transparent Scorecards",
                    content: "Every sales rep should have access to a personal scorecard that tracks their key metrics against targets and peer benchmarks. Transparency creates healthy competition and ensures everyone understands exactly where they stand. LeadFlow's individual performance dashboards provide this visibility automatically, updating in real-time as reps log activities and close deals."
                  },
                  {
                    title: "Conduct Regular Performance Reviews",
                    content: "Monthly one-on-ones focused on metrics enable timely coaching interventions. Rather than waiting for quarterly reviews to discover problems, weekly or bi-weekly check-ins on leading indicators allow managers to course-correct before it's too late. Use data to make these conversations objective and actionable rather than subjective and emotional."
                  },
                  {
                    title: "Implement Peer Learning Programs",
                    content: "Performance data reveals not just who's struggling but who's excelling. Pair high performers with those who need development, create shadowing programs, and facilitate knowledge sharing sessions where top reps teach their techniques. This lifts the entire team's capability and creates a collaborative rather than cutthroat environment."
                  },
                  {
                    title: "Align Compensation with Desired Behaviors",
                    content: "Your compensation structure should reinforce the metrics you're measuring. If you want reps to focus on customer retention, include retention bonuses. If pipeline health matters, consider accelerators for exceeding coverage targets. Misalignment between what you measure and what you pay for creates confusion and suboptimal behavior."
                  },
                  {
                    title: "Celebrate Wins and Learn from Losses",
                    content: "Use performance data to publicly recognize achievements and conduct blameless post-mortems on lost deals. Understanding why deals are won or lost across the team reveals patterns that inform training priorities and process improvements. Make data-driven learning a team sport, not a punitive exercise."
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

        {/* Avoiding Common Pitfalls Section */}
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <SectionHeading
                badge="Common Mistakes"
                title="Performance Measurement Pitfalls to Avoid"
                titleGradient="Avoid"
                centered={false}
              />

              <div className="mt-8 prose prose-lg dark:prose-invert max-w-none">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Even well-intentioned performance measurement programs can backfire when implemented poorly. Understanding common pitfalls helps you design a system that motivates rather than demoralizes your sales team.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mt-12">
                {[
                  {
                    title: "Measuring Too Many Metrics",
                    description: "When everything is a priority, nothing is. Focus on 5-7 key metrics rather than overwhelming reps with dozens of KPIs they can't all optimize simultaneously."
                  },
                  {
                    title: "Ignoring Context and Fairness",
                    description: "Territory quality, market conditions, and account portfolios affect performance. Comparing a rep in a mature market to one building a new territory isn't fair without adjustments."
                  },
                  {
                    title: "Overweighting Lagging Indicators",
                    description: "Revenue and closed deals are important but they're outcomes. Balance lagging indicators with leading metrics that can be influenced in real-time."
                  },
                  {
                    title: "Creating Perverse Incentives",
                    description: "Metrics can be gamed. If you only measure new business, reps may neglect existing customers. If you only measure activity, quality suffers. Design metrics holistically."
                  }
                ].map((pitfall, index) => (
                  <motion.div
                    key={pitfall.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="p-6 rounded-2xl bg-card border border-red-500/20 hover:border-red-500/40 transition-colors"
                  >
                    <h3 className="text-lg font-semibold mb-2 text-red-400">{pitfall.title}</h3>
                    <p className="text-muted-foreground">{pitfall.description}</p>
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
                <Users className="w-12 h-12 text-purple-500 mx-auto mb-6" />
                <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                  Elevate Your Team's <GradientText>Performance</GradientText>
                </h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  LeadFlow's team performance analytics give managers and reps the visibility they need to improve. Real-time leaderboards, individual scorecards, and coaching insights drive excellence across your organization.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href="/handler/sign-up">
                    <GlowButton size="lg">Start Your Free Trial</GlowButton>
                  </Link>
                  <Link href="/resources/sales-analytics/revenue-tracking" className="text-muted-foreground hover:text-foreground transition-colors">
                    Learn about revenue tracking →
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
                  description: "Deep dive into the conversion metrics that reveal your funnel's health.",
                  href: "/resources/sales-analytics/conversion-metrics"
                },
                {
                  title: "Revenue Tracking & Attribution",
                  description: "Learn how to properly attribute revenue to activities and campaigns.",
                  href: "/resources/sales-analytics/revenue-tracking"
                },
                {
                  title: "Sales Reporting Best Practices",
                  description: "Create reports that drive action and inform strategic decisions.",
                  href: "/resources/sales-analytics/sales-reporting"
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
