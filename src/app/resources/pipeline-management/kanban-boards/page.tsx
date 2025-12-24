"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  LandingHeader,
  LandingFooter,
  GlowButton,
  GradientText,
  SectionHeading,
} from "@/components/landing";
import {
  LayoutGrid,
  ArrowRight,
  CheckCircle2,
  Zap,
  Users,
  TrendingUp,
  Eye,
  MousePointer,
  RefreshCw,
  Target,
  Clock,
  BarChart3,
} from "lucide-react";

export default function KanbanBoardsPage() {
  return (
    <div className="min-h-screen bg-background">
      <LandingHeader />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-background to-background" />
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-500/30 rounded-full blur-[128px] animate-pulse" />
          <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: "1s" }} />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-sm font-medium text-purple-400 mb-6">
              <LayoutGrid className="w-4 h-4" />
              Pipeline Management
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
              Kanban Boards for <GradientText>Sales Pipeline</GradientText> Excellence
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Transform your sales process with visual kanban boards that give your team complete visibility into every deal. Move leads through stages with drag-and-drop simplicity while maintaining full control over your pipeline.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/handler/sign-up">
                <GlowButton size="lg" className="group">
                  Start Using Kanban Boards
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </GlowButton>
              </Link>
              <Link href="/resources/pipeline-management/stage-optimization" className="text-muted-foreground hover:text-foreground transition-colors">
                Learn about Stage Optimization →
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What is Kanban Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                What Makes Kanban Boards <GradientText>Essential</GradientText> for Sales?
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Kanban boards originated in Japanese manufacturing as a visual system to manage work in progress. Today, they have become the gold standard for sales pipeline management because they provide immediate clarity on where every deal stands in your sales process.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                Unlike traditional spreadsheets or list-based CRM views, kanban boards let your sales team see the entire pipeline at a glance. Each column represents a stage in your sales process, and each card represents a deal or lead. This visual approach makes it instantly clear where deals are stuck, which opportunities need attention, and how close you are to hitting your targets.
              </p>
              <p className="text-lg text-muted-foreground">
                With LeadFlow&apos;s intelligent kanban system, you get more than just a visual board. Our AI-powered platform automatically suggests when deals should move to the next stage, alerts you to stalled opportunities, and provides predictive insights to help you close more deals faster.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 via-cyan-500/20 to-blue-500/20 rounded-3xl blur-2xl opacity-60" />
              <div className="relative rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl p-6">
                <div className="grid grid-cols-4 gap-3">
                  {["New Leads", "Contacted", "Qualified", "Won"].map((stage, i) => (
                    <div key={stage} className="space-y-2">
                      <div className="text-xs font-medium text-muted-foreground">{stage}</div>
                      <div className="space-y-2">
                        {Array.from({ length: 4 - i }).map((_, j) => (
                          <div
                            key={j}
                            className={`h-16 rounded-lg border border-border/50 ${
                              i === 0 ? "bg-blue-500/10" :
                              i === 1 ? "bg-yellow-500/10" :
                              i === 2 ? "bg-purple-500/10" :
                              "bg-green-500/10"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Key Benefits"
            title="Why Sales Teams Love Kanban Boards"
            titleGradient="Kanban Boards"
            description="Discover how visual pipeline management transforms sales performance and team productivity."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {[
              {
                icon: Eye,
                title: "Complete Pipeline Visibility",
                description: "See every deal across all stages at once. No more digging through lists or running reports to understand your pipeline health. Kanban boards give you instant clarity on where deals stand and which need immediate attention.",
              },
              {
                icon: MousePointer,
                title: "Drag-and-Drop Simplicity",
                description: "Move deals between stages with a simple drag-and-drop motion. LeadFlow automatically logs the stage change, timestamps the update, and triggers any associated automation workflows.",
              },
              {
                icon: Users,
                title: "Team Collaboration",
                description: "Multiple team members can work on the same board simultaneously. Assign deals to specific reps, leave comments on cards, and maintain complete visibility into team activities.",
              },
              {
                icon: RefreshCw,
                title: "Real-Time Updates",
                description: "Changes sync instantly across all devices and users. When a rep updates a deal on their phone, the board reflects that change immediately for everyone viewing it.",
              },
              {
                icon: Target,
                title: "Focus on What Matters",
                description: "Kanban boards naturally highlight bottlenecks by showing where deals accumulate. This visual signal helps managers identify process problems and coach reps on moving deals forward.",
              },
              {
                icon: BarChart3,
                title: "Data-Driven Insights",
                description: "LeadFlow tracks how long deals spend in each stage, conversion rates between stages, and velocity metrics to help you optimize your sales process over time.",
              },
            ].map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-2xl border border-border/50 bg-card/50 hover:bg-card/80 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center mb-4">
                  <benefit.icon className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Use Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Best Practices"
            title="How to Set Up Your Sales Kanban Board"
            titleGradient="Kanban Board"
            description="Follow these proven strategies to create a kanban system that drives results for your sales team."
          />

          <div className="max-w-4xl mx-auto mt-16 space-y-8">
            {[
              {
                step: "01",
                title: "Define Your Sales Stages",
                content: "Start by mapping out your actual sales process. Most B2B sales teams use stages like New Lead, Contacted, Discovery Call, Proposal Sent, Negotiation, and Closed Won/Lost. The key is to reflect how your team actually sells, not how you think they should sell. LeadFlow allows you to customize stages completely, so you can match your unique process.",
              },
              {
                step: "02",
                title: "Set Stage Entry Criteria",
                content: "Define what qualifies a deal to enter each stage. For example, a lead might only move to &apos;Qualified&apos; after you&apos;ve confirmed budget, authority, need, and timeline (BANT). Clear criteria prevent deals from being prematurely moved and give your pipeline data integrity.",
              },
              {
                step: "03",
                title: "Establish Work-in-Progress Limits",
                content: "Kanban&apos;s power comes from limiting how many deals can be in each stage. If your reps can only handle 10 active proposals at once, set that limit. This prevents overload and ensures deals get the attention they deserve. LeadFlow can enforce these limits and alert managers when thresholds are approached.",
              },
              {
                step: "04",
                title: "Configure Card Details",
                content: "Each card should display the information reps need at a glance: deal value, company name, key contact, next action date, and deal health score. LeadFlow&apos;s AI automatically calculates deal health based on engagement, time in stage, and historical patterns.",
              },
              {
                step: "05",
                title: "Build Your Automation Rules",
                content: "Set up automations to keep your board current. LeadFlow can automatically move cards based on triggers, send reminders when deals stall, and notify team members of important changes. This reduces manual work and ensures nothing falls through the cracks.",
              },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex gap-6"
              >
                <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-xl">
                  {item.step}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground">{item.content}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* LeadFlow Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                LeadFlow&apos;s <GradientText>Intelligent</GradientText> Kanban Features
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Go beyond basic kanban with features designed specifically for modern sales teams who need to close more deals in less time.
              </p>

              <div className="space-y-4">
                {[
                  "AI-powered deal scoring shows which opportunities are most likely to close",
                  "Automatic stage suggestions based on email engagement and meeting outcomes",
                  "Custom swimlanes to organize by rep, product line, or deal size",
                  "Time-in-stage tracking with automatic alerts for stalled deals",
                  "Integrated activity logging so every touchpoint is captured on the card",
                  "Mobile-optimized boards for updating deals on the go",
                  "Bulk actions to move or update multiple deals at once",
                  "Advanced filtering to focus on specific segments of your pipeline",
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 via-cyan-500/20 to-blue-500/20 rounded-3xl blur-2xl opacity-60" />
              <div className="relative rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">Deal Health Dashboard</h4>
                  <span className="text-xs text-muted-foreground">Updated live</span>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: "Healthy", value: "24", color: "text-green-500", bg: "bg-green-500/10" },
                    { label: "At Risk", value: "8", color: "text-yellow-500", bg: "bg-yellow-500/10" },
                    { label: "Critical", value: "3", color: "text-red-500", bg: "bg-red-500/10" },
                  ].map((stat) => (
                    <div key={stat.label} className={`p-4 rounded-xl ${stat.bg}`}>
                      <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                      <div className="text-xs text-muted-foreground">{stat.label}</div>
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium">Pipeline Velocity</div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full w-3/4 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full" />
                  </div>
                  <div className="text-xs text-muted-foreground">75% of target velocity</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Resources Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Related Resources"
            title="Continue Learning About Pipeline Management"
            titleGradient="Pipeline Management"
            description="Explore more ways to optimize your sales pipeline and close deals faster."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {[
              {
                title: "Pipeline Stage Optimization",
                description: "Learn how to configure and optimize each stage of your sales pipeline.",
                href: "/resources/pipeline-management/stage-optimization",
                icon: TrendingUp,
              },
              {
                title: "Deal Velocity",
                description: "Discover strategies to accelerate deals through your pipeline.",
                href: "/resources/pipeline-management/deal-velocity",
                icon: Zap,
              },
              {
                title: "Sales Forecasting",
                description: "Build accurate forecasts using your pipeline data.",
                href: "/resources/pipeline-management/sales-forecasting",
                icon: BarChart3,
              },
              {
                title: "Bottleneck Analysis",
                description: "Identify and eliminate pipeline bottlenecks.",
                href: "/resources/pipeline-management/bottleneck-analysis",
                icon: Clock,
              },
            ].map((resource) => (
              <Link
                key={resource.title}
                href={resource.href}
                className="group p-6 rounded-2xl border border-border/50 bg-card/50 hover:bg-card/80 hover:border-purple-500/30 transition-all"
              >
                <resource.icon className="w-8 h-8 text-purple-400 mb-4" />
                <h3 className="font-semibold mb-2 group-hover:text-purple-400 transition-colors">{resource.title}</h3>
                <p className="text-sm text-muted-foreground">{resource.description}</p>
              </Link>
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
            transition={{ duration: 0.5 }}
            className="relative rounded-3xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600" />
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />

            <div className="relative px-8 py-16 md:px-16 md:py-20 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Transform Your Sales Pipeline?
              </h2>
              <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
                Join thousands of sales teams using LeadFlow&apos;s intelligent kanban boards to close more deals and hit their targets consistently.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/handler/sign-up">
                  <GlowButton size="lg" variant="secondary" className="group">
                    Start Free Trial
                    <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </GlowButton>
                </Link>
                <Link href="/" className="text-white/80 hover:text-white transition-colors">
                  Learn more about LeadFlow →
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
}
