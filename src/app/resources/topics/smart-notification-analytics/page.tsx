"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Bell,
  BarChart3,
  Zap,
  Users,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  Activity,
  PieChart,
  Target,
  LineChart,
  Sparkles,
} from "lucide-react";
import {
  LandingHeader,
  LandingFooter,
  GlowButton,
  GradientText,
  SectionHeading,
} from "@/components/landing";

export default function SmartNotificationAnalyticsPage() {
  const linkedTopics = [
    {
      title: "Smart Notifications",
      description: "Get intelligent alerts when leads take important actions so you can respond at the perfect moment.",
      href: "/resources/sales-automation/smart-notifications",
      icon: Bell,
      pillar: "Sales Automation",
    },
    {
      title: "Follow-Up Automation",
      description: "Automate your follow-up sequences based on lead behavior and engagement signals.",
      href: "/resources/sales-automation/follow-up-automation",
      icon: Zap,
      pillar: "Sales Automation",
    },
    {
      title: "Team Performance",
      description: "Track and improve how your team responds to notifications and converts leads.",
      href: "/resources/sales-analytics/team-performance",
      icon: Users,
      pillar: "Sales Analytics",
    },
    {
      title: "Analytics Dashboards",
      description: "Visualize notification effectiveness and response metrics in real-time dashboards.",
      href: "/resources/sales-analytics/analytics-dashboards",
      icon: BarChart3,
      pillar: "Sales Analytics",
    },
  ];

  const relatedTopics = [
    {
      title: "Conversion Metrics",
      href: "/resources/sales-analytics/conversion-metrics",
    },
    {
      title: "Sales Reporting",
      href: "/resources/sales-analytics/sales-reporting",
    },
    {
      title: "Task Automation",
      href: "/resources/sales-automation/task-automation",
    },
    {
      title: "Email Sequences",
      href: "/resources/sales-automation/email-sequences",
    },
  ];

  const benefits = [
    {
      icon: Activity,
      title: "Real-Time Insights",
      description: "See which notifications drive action and which get ignored, enabling continuous optimization.",
    },
    {
      icon: Target,
      title: "Precision Timing",
      description: "AI-powered notifications delivered at the moment when engagement is most likely to succeed.",
    },
    {
      icon: TrendingUp,
      title: "Performance Tracking",
      description: "Measure response rates, follow-up speed, and conversion impact of every notification type.",
    },
    {
      icon: PieChart,
      title: "Team Accountability",
      description: "Track how each team member responds to notifications and their resulting conversion rates.",
    },
  ];

  const notificationTypes = [
    {
      type: "Hot Lead Alert",
      description: "Triggered when a lead shows high-intent behavior like pricing page visits or demo requests.",
      metrics: ["95% response rate target", "< 5 min response time", "3x conversion vs. cold outreach"],
    },
    {
      type: "Re-engagement Signal",
      description: "Alerts when dormant leads return and show renewed interest in your product.",
      metrics: ["Identify win-back opportunities", "Track return visit patterns", "Measure reactivation success"],
    },
    {
      type: "Deal Risk Warning",
      description: "Proactive alerts when pipeline deals show signs of stalling or competitor engagement.",
      metrics: ["Early intervention tracking", "Save rate measurement", "Risk score accuracy"],
    },
    {
      type: "Milestone Celebration",
      description: "Positive notifications when deals progress, helping maintain team motivation.",
      metrics: ["Team morale impact", "Deal velocity correlation", "Win rate by notification type"],
    },
  ];

  const analyticsMetrics = [
    {
      metric: "Notification Response Rate",
      value: "Track %",
      description: "Percentage of notifications that receive timely action from your team.",
    },
    {
      metric: "Average Response Time",
      value: "Minutes",
      description: "How quickly your team acts on notifications after they are sent.",
    },
    {
      metric: "Notification-to-Conversion",
      value: "Track %",
      description: "Rate at which acted-upon notifications result in positive outcomes.",
    },
    {
      metric: "Alert Accuracy Score",
      value: "Score",
      description: "How often notifications correctly identify actionable opportunities.",
    },
  ];

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
              <div className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20">
                <Bell className="w-4 h-4 mr-2" />
                Crossover Topic
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                <GradientText className="bg-gradient-to-r from-violet-500 via-purple-500 to-violet-600 bg-clip-text text-transparent">Smart Notification</GradientText> Analytics Mastery
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Unite intelligent notifications with powerful analytics to respond faster,
                measure effectiveness, and continuously optimize your sales response strategy.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/handler/sign-up">
                  <GlowButton size="lg">
                    Start Tracking Performance
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </GlowButton>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Why This Matters Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Why It Matters"
              title="The Power of Measured Notifications"
              titleGradient="Measured Notifications"
              description="When you measure notification effectiveness, you can optimize response strategies for maximum conversion."
            />

            <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 rounded-2xl bg-background border border-border hover:border-violet-500/50 transition-all hover:shadow-lg hover:shadow-violet-500/10"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center mb-4">
                    <benefit.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Linked Topics Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Explore Topics"
              title="Essential Resources for Notification Excellence"
              titleGradient="Notification Excellence"
              description="Master these interconnected topics to build a data-driven notification strategy."
            />

            <div className="mt-16 grid md:grid-cols-2 gap-8">
              {linkedTopics.map((topic, index) => (
                <Link key={index} href={topic.href}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group p-8 rounded-2xl bg-muted/50 border border-border hover:border-violet-500/50 transition-all hover:shadow-lg hover:shadow-violet-500/10 h-full"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                        <topic.icon className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <span className="text-xs font-medium text-violet-400 uppercase tracking-wider">
                          {topic.pillar}
                        </span>
                        <h3 className="text-xl font-bold mt-1 mb-2 group-hover:text-violet-400 transition-colors">
                          {topic.title}
                        </h3>
                        <p className="text-muted-foreground mb-4">{topic.description}</p>
                        <span className="text-violet-500 text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                          Read more <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Notification Types Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Notification Types"
              title="Key Notifications to Track"
              titleGradient="Notifications to Track"
              description="Understand and measure these critical notification types for optimal performance."
            />

            <div className="mt-16 grid md:grid-cols-2 gap-6">
              {notificationTypes.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 rounded-2xl bg-background border border-border hover:border-violet-500/50 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center">
                      <Bell className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold">{item.type}</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">{item.description}</p>
                  <div className="space-y-2">
                    {item.metrics.map((metric, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-violet-500" />
                        <span className="text-muted-foreground">{metric}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Analytics Metrics Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Key Metrics"
              title="Essential Analytics to Monitor"
              titleGradient="Analytics to Monitor"
              description="Track these metrics to continuously improve your notification effectiveness."
            />

            <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {analyticsMetrics.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 rounded-2xl bg-muted/50 border border-border text-center"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center mx-auto mb-4">
                    <LineChart className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-1">{item.metric}</h3>
                  <span className="text-xs font-medium text-violet-400 uppercase tracking-wider">
                    {item.value}
                  </span>
                  <p className="text-sm text-muted-foreground mt-3">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Best Practices Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Best Practices"
              title="Optimize Your Notification Strategy"
              titleGradient="Notification Strategy"
              description="Implement these strategies to maximize the impact of your smart notifications."
            />

            <div className="mt-16 space-y-6">
              {[
                {
                  title: "Set Response Time Benchmarks",
                  description: "Establish clear response time targets for each notification type. Hot lead alerts should have sub-5-minute response goals, while informational notifications can have longer windows.",
                },
                {
                  title: "A/B Test Notification Triggers",
                  description: "Experiment with different trigger conditions to find the optimal balance between notification volume and quality. Too many alerts cause fatigue; too few miss opportunities.",
                },
                {
                  title: "Correlate Notifications with Outcomes",
                  description: "Track which notification types lead to meetings, proposals, and closed deals. Use this data to prioritize high-impact alerts and refine low-performing ones.",
                },
                {
                  title: "Review Analytics Weekly",
                  description: "Schedule regular reviews of notification performance metrics. Identify trends, celebrate wins, and address areas where response rates or conversion rates are declining.",
                },
              ].map((practice, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex gap-4 p-6 rounded-2xl bg-background border border-border"
                >
                  <div className="flex-shrink-0">
                    <CheckCircle2 className="w-6 h-6 text-violet-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{practice.title}</h3>
                    <p className="text-muted-foreground">{practice.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Related Topics Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Related Topics"
              title="Expand Your Automation Knowledge"
              titleGradient="Automation Knowledge"
              description="Explore these related resources to further optimize your sales processes."
            />

            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedTopics.map((topic, index) => (
                <Link key={index} href={topic.href}>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="p-4 rounded-xl bg-muted/50 border border-border hover:border-violet-500/50 transition-all text-center"
                  >
                    <span className="text-sm font-medium hover:text-violet-400 transition-colors">
                      {topic.title}
                    </span>
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
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Master{" "}
                <GradientText className="bg-gradient-to-r from-violet-500 via-purple-500 to-violet-600 bg-clip-text text-transparent">Smart Notifications?</GradientText>
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Join thousands of sales teams using LeadFlow to send intelligent notifications,
                track response performance, and convert more leads. Start your free trial today.
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
                No credit card required. 14-day free trial with full access.
              </p>
            </motion.div>
          </div>
        </section>

        <LandingFooter />
    </div>
  );
}
