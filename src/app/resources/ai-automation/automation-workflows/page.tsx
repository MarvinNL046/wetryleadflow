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
  Workflow,
  Zap,
  Clock,
  Mail,
  Bell,
  Calendar,
  CheckCircle2,
  ArrowRight,
  RefreshCw,
  MessageSquare,
  FileText,
  Target,
  Users,
  Settings,
  Play,
  Pause
} from "lucide-react";

export default function AutomationWorkflowsPage() {
  return (
    <div className="min-h-screen bg-background">
      <LandingHeader />

      <main>
        {/* Hero Section */}
        <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden pt-20">
          {/* Background Effects */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-900/20 via-background to-background" />
            <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-green-500/30 rounded-full blur-[128px] animate-pulse" />
            <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: "1s" }} />
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
                className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium rounded-full bg-green-500/10 text-green-400 border border-green-500/20"
              >
                <Workflow className="w-4 h-4 mr-2" />
                Powerful Sales Automation
              </motion.div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
                Sales Automation Workflows <GradientText animated>That Work</GradientText>
              </h1>

              <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                Stop wasting hours on repetitive tasks. LeadFlow&apos;s automation workflows handle
                follow-ups, task assignments, notifications, and data updates automatically,
                so your sales team can focus on what they do best: closing deals.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/handler/sign-up">
                  <GlowButton size="lg" className="group">
                    Start Automating Today
                    <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </GlowButton>
                </Link>
                <Link
                  href="/resources/ai-automation/smart-lead-routing"
                  className="inline-flex items-center gap-2 px-6 py-3 text-base font-medium rounded-full border border-border hover:bg-accent transition-colors"
                >
                  Learn About Smart Lead Routing
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* What Are Automation Workflows Section */}
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
                  What Are <GradientText>Sales Automation Workflows</GradientText>?
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Sales automation workflows are sequences of automated actions triggered by
                    specific events or conditions in your CRM. When a lead submits a form,
                    reaches a certain score, or progresses through your pipeline, workflows
                    spring into action, executing predefined tasks without any manual intervention.
                  </p>
                  <p>
                    Think of workflows as your tireless digital assistant that never forgets
                    a follow-up, never misses a deadline, and never takes a day off. They
                    ensure that every lead receives consistent, timely attention regardless
                    of how busy your team gets, preventing valuable opportunities from
                    slipping through the cracks.
                  </p>
                  <p>
                    LeadFlow&apos;s workflow builder makes it easy to create sophisticated
                    automation sequences without writing a single line of code. Using a
                    visual drag-and-drop interface, you can connect triggers, conditions,
                    and actions to build workflows that match your exact sales process.
                    From simple follow-up reminders to complex multi-step sequences spanning
                    weeks, LeadFlow handles it all.
                  </p>
                  <p>
                    The best part? AI enhances every workflow with intelligent timing
                    optimization, personalization, and predictive capabilities that make
                    your automations more effective than traditional rule-based systems.
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
                <div className="absolute -inset-4 bg-gradient-to-r from-green-500/20 via-purple-500/20 to-blue-500/20 rounded-3xl blur-2xl opacity-60" />
                <div className="relative rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl overflow-hidden p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-semibold">Lead Nurture Workflow</h3>
                    <span className="px-2 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-medium">Active</span>
                  </div>

                  <div className="space-y-4">
                    {[
                      { icon: Zap, label: "Trigger", description: "New lead from Meta Ads", color: "bg-yellow-500/20 text-yellow-400" },
                      { icon: Mail, label: "Action", description: "Send welcome email", color: "bg-blue-500/20 text-blue-400" },
                      { icon: Clock, label: "Wait", description: "2 days", color: "bg-purple-500/20 text-purple-400" },
                      { icon: MessageSquare, label: "Action", description: "Send follow-up SMS", color: "bg-blue-500/20 text-blue-400" },
                      { icon: Target, label: "Condition", description: "If score > 70", color: "bg-orange-500/20 text-orange-400" },
                      { icon: Users, label: "Action", description: "Assign to sales rep", color: "bg-green-500/20 text-green-400" },
                    ].map((step, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="flex items-center gap-3"
                      >
                        <div className={`w-10 h-10 rounded-lg ${step.color} flex items-center justify-center flex-shrink-0`}>
                          <step.icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1 p-3 rounded-lg bg-muted/30 border border-border/50">
                          <span className="text-xs text-muted-foreground">{step.label}</span>
                          <p className="font-medium text-sm">{step.description}</p>
                        </div>
                        {index < 5 && (
                          <div className="w-0.5 h-8 bg-border absolute left-[19px] mt-16" />
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Workflow Triggers Section */}
        <section className="py-20 lg:py-32 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Workflow Triggers"
              title="Start Workflows Automatically"
              titleGradient="Workflows Automatically"
              description="Workflows activate instantly when the right conditions are met, ensuring no opportunity is ever missed."
            />

            <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Zap,
                  title: "New Lead Created",
                  description: "Trigger workflows the moment a new lead enters your system from any source: ads, forms, imports, or API integrations."
                },
                {
                  icon: RefreshCw,
                  title: "Stage Changes",
                  description: "Automate actions when leads move through pipeline stages. Send congratulations emails, create tasks, or update team members."
                },
                {
                  icon: Target,
                  title: "Score Thresholds",
                  description: "Trigger workflows when lead scores cross specific thresholds, enabling tiered engagement strategies based on lead quality."
                },
                {
                  icon: Calendar,
                  title: "Time-Based Triggers",
                  description: "Schedule workflows to run at specific times, on certain days, or after periods of inactivity to re-engage dormant leads."
                },
                {
                  icon: Mail,
                  title: "Email Interactions",
                  description: "React to email opens, clicks, and replies with automated follow-up sequences that strike while interest is hot."
                },
                {
                  icon: FileText,
                  title: "Form Submissions",
                  description: "Capture form submissions and immediately route leads into appropriate nurture sequences based on their responses."
                }
              ].map((trigger, index) => (
                <motion.div
                  key={trigger.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 rounded-2xl bg-card border border-border hover:border-green-500/50 transition-all hover:shadow-lg hover:shadow-green-500/10"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/20 to-cyan-500/20 flex items-center justify-center mb-4">
                    <trigger.icon className="w-6 h-6 text-green-500" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{trigger.title}</h3>
                  <p className="text-muted-foreground">{trigger.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Workflow Actions Section */}
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Powerful Actions"
              title="What Your Workflows Can Do"
              titleGradient="Workflows Can Do"
              description="Combine dozens of actions to create sophisticated automation sequences that handle complex sales processes."
            />

            <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Mail, title: "Send Emails", description: "Personalized email sequences with merge fields and dynamic content" },
                { icon: MessageSquare, title: "Send SMS", description: "Text message notifications and follow-ups to mobile numbers" },
                { icon: Bell, title: "Notifications", description: "Alert team members via email, Slack, or in-app notifications" },
                { icon: Users, title: "Assign Leads", description: "Route leads to specific reps or teams based on criteria" },
                { icon: CheckCircle2, title: "Create Tasks", description: "Generate follow-up tasks with due dates and priorities" },
                { icon: FileText, title: "Update Records", description: "Automatically update lead fields, stages, and scores" },
                { icon: Calendar, title: "Schedule Meetings", description: "Book appointments using calendar integration" },
                { icon: Settings, title: "Webhook Calls", description: "Trigger external systems via webhooks and APIs" },
              ].map((action, index) => (
                <motion.div
                  key={action.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="p-5 rounded-xl bg-card border border-border hover:border-green-500/30 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500/20 to-purple-500/20 flex items-center justify-center mb-3">
                    <action.icon className="w-5 h-5 text-green-500" />
                  </div>
                  <h3 className="font-semibold mb-1">{action.title}</h3>
                  <p className="text-sm text-muted-foreground">{action.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pre-Built Templates Section */}
        <section className="py-20 lg:py-32 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
                  Start Fast with <GradientText>Pre-Built Templates</GradientText>
                </h2>
                <p className="text-muted-foreground mb-8">
                  Don&apos;t start from scratch. LeadFlow includes dozens of proven workflow
                  templates designed by sales automation experts. Customize them to fit
                  your process and go live in minutes instead of hours.
                </p>
                <div className="space-y-4">
                  {[
                    "New Lead Welcome Sequence",
                    "Hot Lead Fast-Track",
                    "Cold Lead Re-Engagement",
                    "Post-Demo Follow-Up",
                    "Lost Deal Win-Back",
                    "Customer Onboarding",
                  ].map((template, index) => (
                    <motion.div
                      key={template}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-green-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      </div>
                      <span className="font-medium">{template}</span>
                    </motion.div>
                  ))}
                </div>
                <Link href="/handler/sign-up" className="inline-block mt-8">
                  <GlowButton size="lg" className="group">
                    Browse Workflow Templates
                    <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </GlowButton>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative"
              >
                <div className="absolute -inset-4 bg-gradient-to-r from-green-500/20 via-purple-500/20 to-cyan-500/20 rounded-3xl blur-2xl opacity-60" />
                <div className="relative rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl overflow-hidden p-6">
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { name: "Welcome Series", runs: "2,847", status: "active" },
                      { name: "Demo Follow-Up", runs: "1,234", status: "active" },
                      { name: "Re-Engagement", runs: "892", status: "paused" },
                      { name: "Win-Back", runs: "456", status: "active" },
                    ].map((workflow, index) => (
                      <motion.div
                        key={workflow.name}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="p-4 rounded-xl bg-muted/30 border border-border/50"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-sm">{workflow.name}</span>
                          {workflow.status === "active" ? (
                            <Play className="w-4 h-4 text-green-500" />
                          ) : (
                            <Pause className="w-4 h-4 text-yellow-500" />
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">{workflow.runs} runs this month</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* AI-Enhanced Workflows */}
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="AI Enhancement"
              title="Smarter Workflows with AI"
              titleGradient="Smarter Workflows"
              description="LeadFlow's AI makes your automation workflows more effective by optimizing timing, personalization, and targeting."
            />

            <div className="mt-16 grid md:grid-cols-2 gap-8">
              {[
                {
                  title: "Optimal Send Time Prediction",
                  description: "AI analyzes engagement patterns to determine when each individual lead is most likely to open emails and respond. Workflows automatically schedule messages at the optimal moment for maximum impact."
                },
                {
                  title: "Dynamic Content Personalization",
                  description: "Beyond simple merge fields, AI generates personalized content recommendations based on lead characteristics, behavior history, and what has worked for similar leads in the past."
                },
                {
                  title: "Intelligent Path Selection",
                  description: "When workflows branch, AI predicts which path will be most effective for each lead and routes them accordingly, continuously learning from outcomes to improve future decisions."
                },
                {
                  title: "Automated A/B Testing",
                  description: "AI runs continuous experiments on workflow variations, automatically identifying winning approaches and rolling them out across your entire lead database without manual intervention."
                }
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-8 rounded-2xl bg-gradient-to-br from-green-500/5 to-purple-500/5 border border-border hover:border-green-500/30 transition-colors"
                >
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className="py-20 lg:py-32 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Real Results"
              title="The Power of Sales Automation"
              titleGradient="Sales Automation"
              description="Companies using LeadFlow's automation workflows see dramatic improvements in efficiency and results."
            />

            <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { metric: "15+", label: "Hours Saved Weekly", description: "Per sales rep on manual tasks" },
                { metric: "3x", label: "More Follow-Ups", description: "Executed consistently" },
                { metric: "47%", label: "Higher Response Rates", description: "With optimized timing" },
                { metric: "28%", label: "Increase in Conversions", description: "Through better nurturing" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center p-6 rounded-2xl bg-card border border-border"
                >
                  <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-500 to-cyan-500 bg-clip-text text-transparent mb-2">
                    {stat.metric}
                  </div>
                  <h3 className="font-semibold mb-1">{stat.label}</h3>
                  <p className="text-sm text-muted-foreground">{stat.description}</p>
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
                Ready to <GradientText>Automate Your Sales</GradientText>?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Stop doing repetitive tasks manually and let LeadFlow&apos;s powerful automation
                workflows handle the heavy lifting. Start your free trial today and build
                your first workflow in minutes.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/handler/sign-up">
                  <GlowButton size="lg" className="group">
                    Start Your Free Trial
                    <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </GlowButton>
                </Link>
                <Link
                  href="/resources/ai-automation/machine-learning-crm"
                  className="inline-flex items-center gap-2 px-6 py-3 text-base font-medium rounded-full border border-border hover:bg-accent transition-colors"
                >
                  Explore Machine Learning in CRM
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Related Resources */}
        <section className="py-20 lg:py-32 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Learn More"
              title="Related AI & Automation Resources"
              description="Discover more ways to optimize your sales process with AI and automation."
            />

            <div className="mt-12 grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "Smart Lead Routing",
                  description: "Route leads to the right reps instantly with AI-powered matching.",
                  href: "/resources/ai-automation/smart-lead-routing"
                },
                {
                  title: "AI Lead Scoring",
                  description: "Prioritize your best leads with intelligent scoring algorithms.",
                  href: "/resources/ai-automation/ai-lead-scoring"
                },
                {
                  title: "Predictive Analytics",
                  description: "Forecast revenue and identify trends with AI-powered analytics.",
                  href: "/resources/ai-automation/predictive-analytics"
                }
              ].map((resource, index) => (
                <motion.div
                  key={resource.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link
                    href={resource.href}
                    className="block p-6 rounded-2xl bg-card border border-border hover:border-green-500/50 transition-all hover:shadow-lg hover:shadow-green-500/10 h-full"
                  >
                    <h3 className="text-lg font-semibold mb-2">{resource.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{resource.description}</p>
                    <span className="text-green-500 text-sm font-medium inline-flex items-center">
                      Learn more <ArrowRight className="ml-1 w-4 h-4" />
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
