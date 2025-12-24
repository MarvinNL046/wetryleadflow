"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Bell,
  Zap,
  Target,
  Clock,
  TrendingUp,
  Users,
  Mail,
  CheckCircle2,
  ArrowRight,
  Smartphone,
  MessageSquare,
  Activity,
  Eye,
  MousePointerClick,
  AlertCircle,
  Filter,
} from "lucide-react";
import {
  LandingHeader,
  LandingFooter,
  GlowButton,
  GradientText,
  SectionHeading,
} from "@/components/landing";

export default function SmartNotificationsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <LandingHeader />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20">
              <Bell className="w-4 h-4 mr-2" />
              Sales Automation
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Smart Sales Notifications:{" "}
              <GradientText>Never Miss a Moment</GradientText>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              In sales, timing is everything. Smart notifications alert you the instant
              a lead takes action, enabling you to reach out at the perfect moment
              when interest is highest and competition hasn&apos;t caught up.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/handler/sign-up">
                <GlowButton size="lg">
                  Enable Smart Notifications
                  <ArrowRight className="w-5 h-5 ml-2" />
                </GlowButton>
              </Link>
              <Link
                href="/resources/sales-automation/appointment-scheduling"
                className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
              >
                Explore appointment scheduling
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Notifications Matter Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="The Importance"
            title="Why Real-Time Notifications Transform Sales"
            titleGradient="Transform"
            description="Understanding the critical role of timing in modern sales success."
          />

          <div className="mt-16 grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold mb-4">
                The Speed Advantage
              </h3>
              <p className="text-muted-foreground mb-6">
                Research from Harvard Business Review reveals that sales teams who
                contact leads within an hour of receiving an inquiry are nearly
                seven times more likely to have a meaningful conversation than those
                who wait just one hour longer. Within five minutes? Your odds of
                qualification increase by 21 times.
              </p>
              <p className="text-muted-foreground mb-6">
                But speed isn&apos;t just about new inquiries. Every interaction a lead
                has with your content, from opening an email to visiting your pricing
                page to downloading a case study, signals intent. These micro-moments
                of engagement are windows of opportunity that close quickly. Without
                real-time notifications, you&apos;re blind to these signals and miss
                critical timing windows.
              </p>
              <p className="text-muted-foreground">
                Smart notifications transform your sales approach from reactive to
                proactive. Instead of wondering when to follow up, you know exactly
                when leads are engaged and interested, allowing you to reach out
                when your message will have maximum impact.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { icon: Clock, label: "5-Minute Response", value: "21x higher qualification", color: "text-green-500" },
                { icon: Target, label: "Hot Lead Detection", value: "35% more conversions", color: "text-blue-500" },
                { icon: TrendingUp, label: "Engagement Timing", value: "400% better results", color: "text-purple-500" },
                { icon: Zap, label: "First Response", value: "50% of deals won", color: "text-orange-500" },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="p-6 rounded-2xl bg-background border border-border hover:border-purple-500/50 transition-colors"
                >
                  <stat.icon className={`w-8 h-8 ${stat.color} mb-3`} />
                  <div className="font-semibold mb-1">{stat.label}</div>
                  <div className="text-sm text-muted-foreground">{stat.value}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Types of Notifications Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Notification Types"
            title="Essential Sales Notifications You Need"
            titleGradient="Essential"
            description="The key events and activities that deserve your immediate attention."
          />

          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Mail,
                title: "Email Engagement Alerts",
                description:
                  "Know the instant a prospect opens your email, clicks a link, or downloads an attachment. These engagement signals indicate active interest and create the perfect moment for a timely follow-up call or message that references their specific interest.",
                triggers: [
                  "Email opens",
                  "Link clicks",
                  "Attachment downloads",
                  "Reply detection",
                ],
              },
              {
                icon: Eye,
                title: "Website Visitor Notifications",
                description:
                  "Get alerted when known leads visit your website, especially high-intent pages like pricing, features, or case studies. Understanding what content your prospects consume helps you tailor your outreach and demonstrates you understand their specific needs.",
                triggers: [
                  "Page visits",
                  "Time on site",
                  "Pricing page views",
                  "Return visitor alerts",
                ],
              },
              {
                icon: MousePointerClick,
                title: "Lead Activity Alerts",
                description:
                  "Be notified when leads take significant actions: form submissions, content downloads, webinar registrations, or demo requests. These high-intent activities signal buying readiness and deserve immediate, personalized response.",
                triggers: [
                  "Form submissions",
                  "Content downloads",
                  "Webinar signups",
                  "Demo requests",
                ],
              },
              {
                icon: Activity,
                title: "Deal Progress Notifications",
                description:
                  "Stay informed about deal movement: stage changes, proposal views, contract opens, and competitor mentions. These notifications keep you ahead of deal dynamics and help you intervene at critical moments to keep opportunities moving forward.",
                triggers: [
                  "Stage changes",
                  "Proposal activity",
                  "Contract views",
                  "Stalled deal alerts",
                ],
              },
              {
                icon: Users,
                title: "Lead Scoring Alerts",
                description:
                  "Receive notifications when leads cross important score thresholds, indicating they&apos;ve reached sales-ready status. This ensures hot leads get immediate attention while preventing premature outreach to leads who need more nurturing.",
                triggers: [
                  "Score threshold reached",
                  "Score increase spikes",
                  "MQL qualification",
                  "SQL conversion",
                ],
              },
              {
                icon: AlertCircle,
                title: "Risk & Opportunity Alerts",
                description:
                  "Get early warning about at-risk deals and emerging opportunities. Notifications about declining engagement, competitor activity, or sudden interest spikes help you proactively address concerns and capitalize on momentum.",
                triggers: [
                  "Engagement decline",
                  "Competitor mentions",
                  "Sudden interest spikes",
                  "Contract expiration",
                ],
              },
            ].map((notification, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-8 rounded-2xl bg-muted/50 border border-border hover:border-purple-500/50 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-purple-500 flex items-center justify-center mb-6">
                  <notification.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{notification.title}</h3>
                <p className="text-muted-foreground mb-6">{notification.description}</p>
                <ul className="space-y-2">
                  {notification.triggers.map((trigger, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      {trigger}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Smart Notification Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Intelligence"
            title="What Makes Notifications Smart"
            titleGradient="Smart"
            description="Beyond basic alerts: intelligent features that make notifications actionable."
          />

          <div className="mt-16 space-y-8">
            {[
              {
                number: "01",
                title: "Contextual Information",
                content:
                  "Smart notifications don't just tell you what happened; they provide the context you need to act effectively. When a lead opens your proposal, LeadFlow shows you how many times they've viewed it, which sections they spent the most time on, and whether they shared it with colleagues. This context transforms a simple alert into actionable intelligence that informs your follow-up strategy.",
              },
              {
                number: "02",
                title: "Intelligent Prioritization",
                content:
                  "Not all notifications are equally important. LeadFlow uses lead scoring, deal value, and engagement patterns to prioritize notifications so you can focus on the activities that matter most. A pricing page visit from a $100K opportunity gets higher priority than an email open from an early-stage lead. This intelligent prioritization prevents notification fatigue while ensuring critical signals never get missed.",
              },
              {
                number: "03",
                title: "Customizable Rules and Filters",
                content:
                  "Every sales process is different, and your notifications should reflect your priorities. LeadFlow lets you create custom notification rules based on any combination of lead attributes, behaviors, and deal characteristics. Get notified only about enterprise leads, only during business hours, or only when specific high-intent actions occur. You control exactly what deserves your attention.",
              },
              {
                number: "04",
                title: "Multi-Channel Delivery",
                content:
                  "Important notifications need to reach you wherever you are. LeadFlow delivers alerts via email, push notifications, SMS, Slack, Microsoft Teams, or browser notifications, and you can configure different channels for different priority levels. Critical hot lead alerts can hit your phone immediately while routine updates batch into email digests.",
              },
              {
                number: "05",
                title: "Actionable Quick Actions",
                content:
                  "The best time to act on a notification is immediately. LeadFlow notifications include quick action buttons that let you respond directly from the alert: click to call, send a templated email, or schedule a task without switching contexts. These one-click actions reduce friction between notification and response, enabling faster follow-up.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex gap-6 p-6 rounded-2xl bg-background border border-border"
              >
                <div className="text-4xl font-bold text-orange-500/30">
                  {feature.number}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.content}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Practices Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Best Practices"
            title="Notification Management Best Practices"
            titleGradient="Best Practices"
            description="How to configure notifications that drive action without creating overwhelm."
          />

          <div className="mt-16 grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Start Selective, Expand Gradually",
                description:
                  "Begin with notifications for only the highest-impact events: hot lead alerts, demo requests, and proposal views. As you develop habits around responding to these, gradually add more notification types. This prevents early overwhelm and ensures you build sustainable notification response patterns.",
                icon: Filter,
              },
              {
                title: "Set Up Notification Schedules",
                description:
                  "Not every notification needs immediate delivery. Configure daily or weekly digest emails for lower-priority events, while keeping real-time alerts for time-sensitive activities. This batching approach reduces interruptions while ensuring nothing important falls through the cracks.",
                icon: Clock,
              },
              {
                title: "Create Team-Wide Standards",
                description:
                  "Establish team standards for which notifications everyone receives and expected response times for different priority levels. This consistency ensures coverage across the team and prevents leads from falling through gaps when individual reps are unavailable.",
                icon: Users,
              },
              {
                title: "Review and Refine Regularly",
                description:
                  "Schedule monthly reviews of your notification settings. Analyze which notifications actually led to actions and outcomes, and which just created noise. Continuously refine your configuration based on what's actually driving results for your specific sales process.",
                icon: TrendingUp,
              },
            ].map((practice, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-8 rounded-2xl bg-muted/50 border border-border"
              >
                <practice.icon className="w-10 h-10 text-purple-500 mb-4" />
                <h3 className="text-xl font-bold mb-3">{practice.title}</h3>
                <p className="text-muted-foreground">{practice.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="LeadFlow Features"
            title="Notification Features in LeadFlow"
            titleGradient="LeadFlow"
            description="Everything you need for intelligent, actionable sales notifications."
          />

          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Bell,
                title: "Real-Time Alerts",
                description:
                  "Get notified within seconds of lead activities across all tracked channels and touchpoints.",
              },
              {
                icon: Smartphone,
                title: "Mobile Push Notifications",
                description:
                  "Native mobile app notifications ensure you never miss critical alerts when away from your desk.",
              },
              {
                icon: MessageSquare,
                title: "Slack & Teams Integration",
                description:
                  "Receive notifications directly in your team communication tools for seamless workflow.",
              },
              {
                icon: Filter,
                title: "Custom Alert Rules",
                description:
                  "Build sophisticated notification rules based on any combination of lead and deal attributes.",
              },
              {
                icon: Target,
                title: "Priority Scoring",
                description:
                  "Automatic prioritization based on lead score, deal value, and engagement intensity.",
              },
              {
                icon: Zap,
                title: "One-Click Actions",
                description:
                  "Respond instantly with quick action buttons embedded in every notification.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-background border border-border hover:border-purple-500/50 transition-colors"
              >
                <feature.icon className="w-10 h-10 text-purple-500 mb-4" />
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Start Responding at the{" "}
              <GradientText>Perfect Moment</GradientText>
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Stop guessing when to follow up. Let LeadFlow&apos;s smart notifications
              tell you exactly when your leads are ready to engage. Sign up today
              and never miss another opportunity.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/handler/sign-up">
                <GlowButton size="lg">
                  Enable Smart Notifications
                  <ArrowRight className="w-5 h-5 ml-2" />
                </GlowButton>
              </Link>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              14-day free trial. Full notification features included. No credit card required.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Related Resources */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Related Resources"
            title="Complete Your Sales Automation Stack"
            titleGradient="Automation Stack"
            description="Explore more tools to build a complete, automated sales machine."
          />

          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Email Sequences",
                description: "Automate multi-touch email campaigns that convert",
                href: "/resources/sales-automation/email-sequences",
              },
              {
                title: "Follow-Up Automation",
                description: "Never let a lead slip through with automated follow-up",
                href: "/resources/sales-automation/follow-up-automation",
              },
              {
                title: "Task Automation",
                description: "Eliminate manual tasks and focus on selling",
                href: "/resources/sales-automation/task-automation",
              },
              {
                title: "Appointment Scheduling",
                description: "Let prospects book meetings without friction",
                href: "/resources/sales-automation/appointment-scheduling",
              },
            ].map((resource, index) => (
              <Link key={index} href={resource.href}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 rounded-2xl bg-background border border-border hover:border-purple-500/50 transition-all hover:shadow-lg hover:shadow-purple-500/10 h-full"
                >
                  <h3 className="font-semibold mb-2">{resource.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {resource.description}
                  </p>
                  <span className="text-purple-500 text-sm flex items-center gap-1">
                    Learn more <ArrowRight className="w-3 h-3" />
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
