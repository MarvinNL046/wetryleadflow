"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Activity,
  Clock,
  MousePointerClick,
  Mail,
  Phone,
  Calendar,
  CheckCircle2,
  Eye,
  MessageSquare,
  FileText,
  Bell,
  LineChart,
  Zap,
  History
} from "lucide-react";
import { LandingHeader } from "@/components/landing/layout/landing-header";
import { LandingFooter } from "@/components/landing/layout/landing-footer";
import { GlowButton } from "@/components/landing/ui/glow-button";
import { GradientText } from "@/components/landing/ui/gradient-text";
import { SectionHeading } from "@/components/landing/ui/section-heading";

export default function ActivityTrackingPage() {
  return (
    <div className="min-h-screen bg-background">
      <LandingHeader />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-background to-background" />
          <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-cyan-500/30 rounded-full blur-[128px] animate-pulse" />
          <div className="absolute bottom-0 right-1/3 w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: "1s" }} />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-sm font-medium text-purple-400 mb-6">
              <Activity className="w-4 h-4" />
              Contact Management
            </span>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
              Contact Activity Tracking{" "}
              <GradientText animated>Best Practices</GradientText>
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Every interaction tells a story. Learn how to capture, analyze, and
              leverage contact activity data to build stronger relationships and
              close more deals. Never miss a follow-up again.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/handler/sign-up">
                <GlowButton size="lg" className="group">
                  Start Tracking Free
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </GlowButton>
              </Link>
              <Link href="/resources/contact-management/lead-segmentation" className="text-muted-foreground hover:text-foreground transition-colors">
                ← Back to Segmentation
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Activity Tracking Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="The Importance"
            title="Why Activity Tracking Changes Everything"
            titleGradient="Everything"
            description="Understanding your contacts' behavior is the key to timely, relevant engagement that converts."
          />

          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Clock,
                title: "Perfect Timing",
                stat: "47%",
                description: "of deals go to the first responder. Activity tracking ensures you reach out at the optimal moment."
              },
              {
                icon: Eye,
                title: "Intent Signals",
                stat: "3x",
                description: "higher conversion when you can identify buying signals from prospect activity patterns."
              },
              {
                icon: MessageSquare,
                title: "Context Rich",
                stat: "60%",
                description: "more effective conversations when you have full context of previous interactions."
              },
              {
                icon: Bell,
                title: "Never Miss",
                stat: "0",
                description: "follow-ups forgotten when activity triggers automated reminders and notifications."
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-card border border-border text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-purple-500" />
                </div>
                <span className="text-3xl font-bold text-purple-500">{item.stat}</span>
                <h3 className="text-lg font-semibold mb-2 mt-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Types of Activities Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Activity Types"
            title="What Activities Should You Track?"
            titleGradient="Track"
            description="A comprehensive activity tracking strategy captures both explicit interactions and implicit signals."
          />

          <div className="mt-16 grid lg:grid-cols-2 gap-12">
            {/* Explicit Activities */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="p-8 rounded-2xl bg-card border border-border h-full">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-purple-500" />
                  </div>
                  Explicit Activities
                </h3>
                <p className="text-muted-foreground mb-6">
                  Direct interactions between your team and contacts. These activities
                  require manual logging or integration with communication tools.
                </p>
                <div className="space-y-4">
                  {[
                    { icon: Mail, activity: "Email Conversations", description: "Sent, received, opens, clicks, and replies" },
                    { icon: Phone, activity: "Phone Calls", description: "Call duration, outcome, and notes" },
                    { icon: Calendar, activity: "Meetings", description: "Scheduled meetings, attendance, and follow-ups" },
                    { icon: MessageSquare, activity: "Live Chat", description: "Chat sessions, topics, and resolution" },
                    { icon: FileText, activity: "Document Sharing", description: "Proposals, contracts, and resources sent" }
                  ].map((item) => (
                    <div key={item.activity} className="flex items-start gap-4 p-4 rounded-xl bg-muted/50">
                      <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center shrink-0">
                        <item.icon className="w-5 h-5 text-purple-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{item.activity}</h4>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Implicit Activities */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="p-8 rounded-2xl bg-card border border-border h-full">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                    <MousePointerClick className="w-5 h-5 text-blue-500" />
                  </div>
                  Implicit Activities
                </h3>
                <p className="text-muted-foreground mb-6">
                  Behavioral signals captured automatically through tracking. These reveal
                  intent and interest without direct interaction.
                </p>
                <div className="space-y-4">
                  {[
                    { icon: Eye, activity: "Page Views", description: "Pages visited, time spent, and frequency" },
                    { icon: MousePointerClick, activity: "Content Downloads", description: "Ebooks, whitepapers, and case studies" },
                    { icon: LineChart, activity: "Feature Usage", description: "Product features explored during trial" },
                    { icon: Bell, activity: "Form Submissions", description: "Demo requests, contact forms, and surveys" },
                    { icon: Activity, activity: "Engagement Patterns", description: "Active times, session frequency, and depth" }
                  ].map((item) => (
                    <div key={item.activity} className="flex items-start gap-4 p-4 rounded-xl bg-muted/50">
                      <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
                        <item.icon className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{item.activity}</h4>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Best Practices Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Best Practices"
            title="Activity Tracking Best Practices"
            titleGradient="Best Practices"
            description="Follow these guidelines to build an activity tracking system that delivers actionable insights."
          />

          <div className="mt-16 space-y-12">
            {/* Practice 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="grid lg:grid-cols-2 gap-8 items-center"
            >
              <div>
                <h3 className="text-2xl font-bold mb-4">1. Automate Everything Possible</h3>
                <p className="text-muted-foreground mb-4">
                  Manual activity logging is the enemy of adoption. If your team has to remember
                  to log every call and email, data quality will suffer. The best activity
                  tracking systems capture interactions automatically through integrations.
                </p>
                <p className="text-muted-foreground mb-4">
                  Connect your email client (Gmail, Outlook), calendar, phone system, and
                  chat tools directly to your CRM. Every interaction gets logged without
                  any extra effort from your team.
                </p>
                <ul className="space-y-2">
                  {[
                    "Sync email automatically with 2-way integration",
                    "Connect calendar for meeting tracking",
                    "Integrate phone system for call logging",
                    "Link website tracking for behavioral data"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-3xl blur-2xl opacity-60" />
                <div className="relative p-6 rounded-2xl bg-card border border-border">
                  <h4 className="font-semibold mb-4">Automation Coverage</h4>
                  <div className="space-y-4">
                    {[
                      { source: "Email Sync", coverage: 100, status: "Automatic" },
                      { source: "Calendar Events", coverage: 100, status: "Automatic" },
                      { source: "Website Activity", coverage: 95, status: "Automatic" },
                      { source: "Phone Calls", coverage: 85, status: "Auto + Manual notes" },
                      { source: "Meeting Notes", coverage: 70, status: "Manual entry" }
                    ].map((item) => (
                      <div key={item.source}>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{item.source}</span>
                          <span className="text-muted-foreground">{item.status}</span>
                        </div>
                        <div className="h-2 rounded-full bg-muted overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                            style={{ width: `${item.coverage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Practice 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="grid lg:grid-cols-2 gap-8 items-center"
            >
              <div className="order-2 lg:order-1 relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-3xl blur-2xl opacity-60" />
                <div className="relative p-6 rounded-2xl bg-card border border-border">
                  <h4 className="font-semibold mb-4">Activity Timeline View</h4>
                  <div className="space-y-4">
                    {[
                      { time: "Today, 2:34 PM", activity: "Opened pricing email", type: "email", score: "+5" },
                      { time: "Today, 11:20 AM", activity: "Visited pricing page (3 min)", type: "web", score: "+10" },
                      { time: "Yesterday", activity: "Downloaded ROI Calculator", type: "content", score: "+15" },
                      { time: "3 days ago", activity: "Call with Sarah - Demo scheduled", type: "call", score: "+20" },
                      { time: "1 week ago", activity: "Signed up for free trial", type: "signup", score: "+25" }
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-4 p-3 rounded-lg bg-muted/50">
                        <div className="w-2 h-2 rounded-full bg-purple-500 mt-2 shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-sm font-medium truncate">{item.activity}</span>
                            <span className="text-xs text-green-500 font-medium shrink-0">{item.score}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">{item.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <h3 className="text-2xl font-bold mb-4">2. Create a Unified Timeline</h3>
                <p className="text-muted-foreground mb-4">
                  A contact&apos;s activity should be visible in one place—a unified timeline
                  that shows every touchpoint across all channels. When a sales rep opens
                  a contact record, they should immediately see the full history.
                </p>
                <p className="text-muted-foreground mb-4">
                  The timeline should be chronological by default but filterable by activity
                  type. Include both your team&apos;s activities and the contact&apos;s own behavior
                  to paint a complete picture of the relationship.
                </p>
                <ul className="space-y-2">
                  {[
                    "Display all activities in chronological order",
                    "Include both team and contact activities",
                    "Enable filtering by activity type",
                    "Show activity scores and engagement metrics"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Practice 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="grid lg:grid-cols-2 gap-8 items-center"
            >
              <div>
                <h3 className="text-2xl font-bold mb-4">3. Set Up Activity-Based Alerts</h3>
                <p className="text-muted-foreground mb-4">
                  Activity data is only valuable if you act on it. Configure real-time
                  notifications that alert your team when high-value activities occur.
                  Strike while the iron is hot.
                </p>
                <p className="text-muted-foreground mb-4">
                  Create alerts for intent signals like pricing page visits, demo requests,
                  and content downloads. Set up escalation rules so the right person gets
                  notified based on account ownership and activity type.
                </p>
                <ul className="space-y-2">
                  {[
                    "Alert when key pages are visited",
                    "Notify on return visitor activity",
                    "Escalate high-score activity immediately",
                    "Send digest reports for account owners"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-3xl blur-2xl opacity-60" />
                <div className="relative p-6 rounded-2xl bg-card border border-border">
                  <h4 className="font-semibold mb-4">Alert Configuration</h4>
                  <div className="space-y-3">
                    {[
                      { trigger: "Pricing page visit", action: "Slack + Email", priority: "High" },
                      { trigger: "Demo request submitted", action: "Immediate call", priority: "Critical" },
                      { trigger: "Return visitor (dormant 30d)", action: "Task created", priority: "Medium" },
                      { trigger: "Multiple stakeholders active", action: "Account alert", priority: "High" }
                    ].map((alert) => (
                      <div key={alert.trigger} className="p-4 rounded-xl bg-muted/50 border border-border">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-sm">{alert.trigger}</span>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            alert.priority === "Critical" ? "bg-red-500/20 text-red-400" :
                            alert.priority === "High" ? "bg-orange-500/20 text-orange-400" :
                            "bg-blue-500/20 text-blue-400"
                          }`}>{alert.priority}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">Action: {alert.action}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Practice 4 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="grid lg:grid-cols-2 gap-8 items-center"
            >
              <div className="order-2 lg:order-1 relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-green-500/20 to-purple-500/20 rounded-3xl blur-2xl opacity-60" />
                <div className="relative p-6 rounded-2xl bg-card border border-border">
                  <h4 className="font-semibold mb-4">Lead Scoring Model</h4>
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-muted/50">
                      <h5 className="font-medium mb-3">Behavioral Scoring</h5>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Pricing page view</span>
                          <span className="text-green-500">+15 pts</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Case study download</span>
                          <span className="text-green-500">+10 pts</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Email click</span>
                          <span className="text-green-500">+5 pts</span>
                        </div>
                        <div className="flex justify-between">
                          <span>30 days inactive</span>
                          <span className="text-red-500">-20 pts</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Example Contact Score</span>
                        <span className="text-2xl font-bold text-purple-500">87</span>
                      </div>
                      <div className="mt-2 h-2 rounded-full bg-muted overflow-hidden">
                        <div className="h-full w-[87%] bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <h3 className="text-2xl font-bold mb-4">4. Use Activities for Lead Scoring</h3>
                <p className="text-muted-foreground mb-4">
                  Activity data should feed directly into your lead scoring model. Assign
                  point values to different activities based on their correlation with
                  conversion. High-intent activities like pricing page visits and demo
                  requests should score higher than general engagement.
                </p>
                <p className="text-muted-foreground mb-4">
                  Don&apos;t forget negative scoring for inactivity. A lead who hasn&apos;t engaged
                  in 30 days should have their score decay. This keeps your pipeline
                  focused on currently engaged prospects.
                </p>
                <ul className="space-y-2">
                  {[
                    "Assign points based on conversion correlation",
                    "Weight high-intent activities heavily",
                    "Implement score decay for inactivity",
                    "Review and adjust scoring model quarterly"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* LeadFlow Features */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="LeadFlow Features"
            title="Activity Tracking in LeadFlow"
            titleGradient="LeadFlow"
            description="Comprehensive activity tracking built into every aspect of the platform."
          />

          <div className="mt-16 grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Zap,
                title: "Real-Time Tracking",
                description: "See contact activity as it happens. Live updates show when leads visit your site, open emails, or engage with content."
              },
              {
                icon: History,
                title: "Complete History",
                description: "Every interaction is preserved forever. Scroll back through years of activity to understand the full relationship journey."
              },
              {
                icon: Bell,
                title: "Smart Notifications",
                description: "Get notified instantly when high-value activities occur. Customizable alerts ensure you never miss a buying signal."
              },
              {
                icon: LineChart,
                title: "Engagement Analytics",
                description: "Track engagement trends over time. See which contacts are heating up and which are cooling off."
              },
              {
                icon: Activity,
                title: "Activity Scoring",
                description: "Every activity contributes to lead scores automatically. AI weighs activities by their conversion impact."
              },
              {
                icon: Eye,
                title: "Visitor Intelligence",
                description: "Know when contacts visit your website, which pages they view, and how long they spend."
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-card border border-border hover:border-purple-500/50 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-purple-500" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
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
            transition={{ duration: 0.5 }}
            className="relative max-w-4xl mx-auto"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-cyan-500/20 rounded-3xl blur-2xl opacity-60" />
            <div className="relative p-12 rounded-2xl bg-card border border-border text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Never Miss Another Buying Signal
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                LeadFlow tracks every interaction automatically, scores engagement
                in real-time, and alerts you when it&apos;s time to act. Start converting
                more leads today.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/handler/sign-up">
                  <GlowButton size="lg" className="group">
                    Start Free Trial
                    <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </GlowButton>
                </Link>
                <Link href="/resources/contact-management/notes-history" className="text-muted-foreground hover:text-foreground transition-colors">
                  Continue to Notes & History →
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Resources */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8 text-center">Related Resources</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                title: "Lead Segmentation",
                description: "Use activity data to create dynamic segments for targeted outreach.",
                href: "/resources/contact-management/lead-segmentation"
              },
              {
                title: "Notes & History",
                description: "Combine activity tracking with rich notes for complete context.",
                href: "/resources/contact-management/notes-history"
              },
              {
                title: "Contact Organization",
                description: "Organize contacts based on engagement levels and activity patterns.",
                href: "/resources/contact-management/contact-organization"
              }
            ].map((resource) => (
              <Link
                key={resource.title}
                href={resource.href}
                className="p-6 rounded-xl bg-card border border-border hover:border-purple-500/50 transition-colors"
              >
                <h3 className="font-semibold mb-2">{resource.title}</h3>
                <p className="text-sm text-muted-foreground">{resource.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
}
