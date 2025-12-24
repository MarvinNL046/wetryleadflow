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
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  Target,
  Clock,
  Zap,
  Search,
  BarChart3,
  Users,
  MessageSquare,
  Settings,
  Filter,
  LayoutGrid,
  Layers,
  XCircle,
  ArrowDownRight,
  Gauge,
} from "lucide-react";

export default function BottleneckAnalysisPage() {
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
              <AlertTriangle className="w-4 h-4" />
              Pipeline Management
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
              Find and Fix <GradientText>Pipeline Bottlenecks</GradientText>
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Every sales pipeline has hidden bottlenecks that slow deals down and hurt conversion rates. Learn how to systematically identify these friction points and eliminate them to improve pipeline flow and close more deals.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/handler/sign-up">
                <GlowButton size="lg" className="group">
                  Analyze Your Pipeline
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </GlowButton>
              </Link>
              <Link href="/resources/pipeline-management/kanban-boards" className="text-muted-foreground hover:text-foreground transition-colors">
                Learn about Kanban Boards →
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Understanding Bottlenecks Section */}
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
                Understanding <GradientText>Pipeline Bottlenecks</GradientText>
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                A bottleneck is any point in your sales pipeline where deals slow down or get stuck. Like a traffic jam on a highway, bottlenecks restrict the flow of opportunities through your system, reducing the number of deals that reach the finish line.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                Bottlenecks are especially dangerous because they create cascading effects. When deals pile up at one stage, reps become overwhelmed, follow-up suffers, and opportunities go stale. Meanwhile, earlier stages continue feeding the bottleneck, making the problem worse.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                The key insight is that improving any stage other than the bottleneck won&apos;t improve overall throughput. If your pipeline is constrained at the proposal stage, generating more leads or improving discovery won&apos;t help—you&apos;ll just pile up more deals waiting for proposals.
              </p>
              <p className="text-lg text-muted-foreground">
                LeadFlow&apos;s pipeline analytics automatically identify bottlenecks by analyzing time-in-stage patterns, conversion rates, and deal accumulation across your pipeline stages.
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
                <h4 className="font-semibold mb-4">Pipeline Flow Analysis</h4>
                <div className="space-y-4">
                  {[
                    { stage: "New Leads", count: 45, flow: "healthy", time: "2.1d" },
                    { stage: "Discovery", count: 32, flow: "healthy", time: "4.3d" },
                    { stage: "Qualified", count: 28, flow: "healthy", time: "5.2d" },
                    { stage: "Proposal", count: 47, flow: "bottleneck", time: "12.8d" },
                    { stage: "Negotiation", count: 12, flow: "healthy", time: "6.1d" },
                    { stage: "Closed", count: 8, flow: "healthy", time: "—" },
                  ].map((item, index) => (
                    <div key={item.stage}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{item.stage}</span>
                          {item.flow === "bottleneck" && (
                            <span className="text-xs text-red-400 bg-red-500/10 px-2 py-0.5 rounded-full">
                              Bottleneck
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-muted-foreground">{item.count} deals</span>
                          <span className={item.flow === "bottleneck" ? "text-red-400" : "text-muted-foreground"}>
                            {item.time}
                          </span>
                        </div>
                      </div>
                      <div className="h-6 bg-muted/30 rounded-lg overflow-hidden relative">
                        <div
                          className={`h-full rounded-lg transition-all ${
                            item.flow === "bottleneck"
                              ? "bg-red-500/50"
                              : "bg-gradient-to-r from-purple-500/50 to-cyan-500/50"
                          }`}
                          style={{ width: `${(item.count / 50) * 100}%` }}
                        />
                        {item.flow === "bottleneck" && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <AlertTriangle className="w-4 h-4 text-red-400" />
                          </div>
                        )}
                      </div>
                      {index < 5 && (
                        <div className="flex justify-center my-2">
                          <ArrowDownRight className="w-4 h-4 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Common Bottlenecks Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Common Issues"
            title="The Most Common Pipeline Bottlenecks"
            titleGradient="Pipeline Bottlenecks"
            description="Recognize these frequent bottleneck patterns and their root causes."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {[
              {
                icon: MessageSquare,
                title: "Proposal Stage Congestion",
                cause: "Limited bandwidth for creating custom proposals",
                symptoms: "Deals pile up waiting for proposals, long delays between verbal agreement and formal pricing",
                solution: "Create proposal templates, implement proposal automation tools, or add dedicated proposal resources. LeadFlow integrates with proposal tools to streamline the process.",
              },
              {
                icon: Users,
                title: "Discovery Gridlock",
                cause: "Reps spending too much time on early-stage education",
                symptoms: "Long discovery cycles, low conversion to qualified status, reps overwhelmed with early-stage meetings",
                solution: "Implement better qualification upfront, create self-service educational content, or use SDRs to handle initial discovery before AE engagement.",
              },
              {
                icon: Clock,
                title: "Legal and Contract Delays",
                cause: "Complex review processes and limited legal resources",
                symptoms: "Deals stall in final stages, long time from proposal acceptance to signature, deals lost to competitor speed",
                solution: "Pre-approve standard contract terms, create tiered review processes based on deal risk, and build relationships with procurement teams early.",
              },
              {
                icon: Target,
                title: "Qualification Overflow",
                cause: "Too many leads with insufficient lead scoring",
                symptoms: "Reps spending time on unqualified leads, low conversion rates, inconsistent pipeline quality",
                solution: "Implement stricter qualification criteria, use LeadFlow&apos;s AI lead scoring to prioritize, and create marketing automation to nurture not-ready leads.",
              },
              {
                icon: Settings,
                title: "Technical Validation Delays",
                cause: "Limited SE resources or complex technical requirements",
                symptoms: "POC backlogs, extended evaluation periods, technical concerns blocking business conversations",
                solution: "Create self-service evaluation options, prioritize SE time based on deal value and probability, and develop technical content that addresses common concerns.",
              },
              {
                icon: Filter,
                title: "Stakeholder Access Barriers",
                cause: "Difficulty reaching decision-makers or multiple approval layers",
                symptoms: "Deals stuck waiting for executive meetings, champion unable to advance internally, committee review delays",
                solution: "Multi-thread relationships early, provide champion enablement materials, and develop executive-specific value propositions.",
              },
            ].map((bottleneck, index) => (
              <motion.div
                key={bottleneck.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-2xl border border-border/50 bg-card/50 hover:bg-card/80 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500/20 to-orange-500/20 flex items-center justify-center mb-4">
                  <bottleneck.icon className="w-6 h-6 text-red-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{bottleneck.title}</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-muted-foreground font-medium">Root Cause: </span>
                    <span className="text-muted-foreground">{bottleneck.cause}</span>
                  </div>
                  <div>
                    <span className="text-yellow-400 font-medium">Symptoms: </span>
                    <span className="text-muted-foreground">{bottleneck.symptoms}</span>
                  </div>
                  <div>
                    <span className="text-green-400 font-medium">Solution: </span>
                    <span className="text-muted-foreground">{bottleneck.solution}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Analysis Framework Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Analysis Framework"
            title="How to Identify Bottlenecks in Your Pipeline"
            titleGradient="Identify Bottlenecks"
            description="Follow this systematic approach to find and diagnose pipeline constraints."
          />

          <div className="max-w-4xl mx-auto mt-16 space-y-8">
            {[
              {
                step: "01",
                title: "Analyze Time-in-Stage Metrics",
                content: "Start by measuring how long deals spend in each stage. Look for stages where time significantly exceeds your benchmarks or historical averages. LeadFlow automatically tracks time-in-stage for every deal and highlights outliers. A sudden increase in average time often signals an emerging bottleneck.",
              },
              {
                step: "02",
                title: "Examine Stage-to-Stage Conversion Rates",
                content: "Calculate the percentage of deals that successfully move from each stage to the next. Low conversion rates indicate either poor qualification at the previous stage or problems within the current stage. Compare current rates to historical performance to spot negative trends before they become critical.",
              },
              {
                step: "03",
                title: "Count Deals Per Stage",
                content: "A healthy pipeline has a funnel shape—many deals at the top, fewer at each subsequent stage. If deals accumulate at a particular stage, breaking the funnel shape, you&apos;ve found a bottleneck. LeadFlow&apos;s pipeline visualization makes this pattern immediately visible.",
              },
              {
                step: "04",
                title: "Interview Your Sales Team",
                content: "Data tells you where bottlenecks exist; your reps can tell you why. Ask them where they feel stuck, what activities take disproportionate time, and what resources they lack. Often, frontline feedback reveals process issues that pure data analysis misses.",
              },
              {
                step: "05",
                title: "Review Lost Deal Reasons",
                content: "Analyze why deals fall out of the pipeline. If many deals are lost at the same stage for similar reasons, you&apos;ve identified both a bottleneck and its cause. LeadFlow tracks loss reasons and can generate reports showing patterns in deal attrition.",
              },
              {
                step: "06",
                title: "Benchmark Against Best Performers",
                content: "Compare bottleneck metrics across your team. If some reps move deals through a stage faster than others, study what they do differently. Their techniques might be scalable to the whole team. LeadFlow&apos;s rep-level analytics make this comparison easy.",
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

      {/* Fixing Bottlenecks Section */}
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
                Strategies for <GradientText>Eliminating</GradientText> Bottlenecks
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Once you&apos;ve identified a bottleneck, use these proven strategies to increase throughput and restore pipeline flow.
              </p>

              <div className="space-y-6">
                {[
                  {
                    title: "Add Capacity",
                    description: "The most direct solution: hire more people, add tools, or reallocate existing resources to the constrained stage. Calculate the ROI of additional capacity against the value of deals currently stuck.",
                  },
                  {
                    title: "Automate Repetitive Tasks",
                    description: "Many bottlenecks involve manual, repetitive work that could be automated. Proposal generation, contract creation, scheduling—all can be streamlined with the right tools and templates.",
                  },
                  {
                    title: "Improve Upstream Qualification",
                    description: "Sometimes the best way to fix a bottleneck is to reduce the volume of deals reaching it. Stricter qualification criteria mean fewer but better deals competing for limited resources.",
                  },
                  {
                    title: "Create Parallel Paths",
                    description: "Can you split the bottleneck stage into parallel tracks? Different paths for different deal sizes, segments, or complexity levels can increase overall throughput.",
                  },
                  {
                    title: "Reduce Scope or Complexity",
                    description: "Simplify what happens at the bottleneck stage. Shorter proposals, standardized contracts, or abbreviated evaluations can dramatically speed up throughput.",
                  },
                ].map((strategy, index) => (
                  <motion.div
                    key={strategy.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{strategy.title}</h4>
                      <p className="text-sm text-muted-foreground">{strategy.description}</p>
                    </div>
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
              <div className="relative rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">Bottleneck Resolution Impact</h4>
                  <span className="text-xs text-green-400 bg-green-500/10 px-2 py-1 rounded-full">After Fix</span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Pipeline Velocity", before: "€6.2K/day", after: "€9.8K/day", change: "+58%" },
                    { label: "Proposal Stage Time", before: "12.8 days", after: "5.2 days", change: "-59%" },
                    { label: "Conversion Rate", before: "18%", after: "27%", change: "+50%" },
                    { label: "Deals Closed/Mo", before: "12", after: "19", change: "+58%" },
                  ].map((metric) => (
                    <div key={metric.label} className="p-4 rounded-xl bg-muted/30">
                      <div className="text-xs text-muted-foreground mb-2">{metric.label}</div>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-sm text-muted-foreground line-through">{metric.before}</span>
                          <div className="text-lg font-bold">{metric.after}</div>
                        </div>
                        <span className="text-green-400 text-sm font-medium">{metric.change}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20">
                  <div className="flex items-center gap-2 text-green-400">
                    <TrendingUp className="w-5 h-5" />
                    <span className="font-medium">Annual Revenue Impact: +€432,000</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Based on fixing the proposal stage bottleneck
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* LeadFlow Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="order-2 lg:order-1"
            >
              <div className="space-y-4">
                {[
                  {
                    icon: Search,
                    title: "Automatic Bottleneck Detection",
                    description: "LeadFlow continuously monitors your pipeline and alerts you when bottlenecks emerge, before they become critical problems.",
                  },
                  {
                    icon: BarChart3,
                    title: "Stage Analytics Dashboard",
                    description: "Comprehensive metrics for every stage including time-in-stage, conversion rates, deal accumulation, and trend analysis.",
                  },
                  {
                    icon: Gauge,
                    title: "Pipeline Health Score",
                    description: "A single metric that summarizes overall pipeline flow, combining multiple indicators into an actionable score.",
                  },
                  {
                    icon: AlertTriangle,
                    title: "Early Warning Alerts",
                    description: "Configurable alerts when metrics exceed thresholds, giving you time to address issues before they impact results.",
                  },
                  {
                    icon: Target,
                    title: "Resolution Recommendations",
                    description: "AI-powered suggestions for addressing identified bottlenecks based on your specific data and industry benchmarks.",
                  },
                ].map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-start gap-4 p-4 rounded-xl bg-card/50 border border-border/50"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{feature.title}</h4>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="order-1 lg:order-2"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                LeadFlow&apos;s <GradientText>Bottleneck Analysis</GradientText> Tools
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Don&apos;t wait for bottlenecks to cripple your pipeline. LeadFlow proactively identifies constraints and helps you resolve them before they impact revenue.
              </p>
              <p className="text-lg text-muted-foreground">
                Our AI-powered analytics continuously analyze your pipeline flow, comparing current performance to historical benchmarks and identifying patterns that indicate emerging problems. You get actionable alerts and specific recommendations, not just data.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Resources Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Related Resources"
            title="Complete Your Pipeline Management Knowledge"
            titleGradient="Pipeline Management"
            description="Explore these related resources to build a comprehensive pipeline strategy."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {[
              {
                title: "Kanban Boards",
                description: "Visualize your pipeline and spot bottlenecks at a glance.",
                href: "/resources/pipeline-management/kanban-boards",
                icon: LayoutGrid,
              },
              {
                title: "Stage Optimization",
                description: "Configure stages to prevent bottlenecks from forming.",
                href: "/resources/pipeline-management/stage-optimization",
                icon: Layers,
              },
              {
                title: "Deal Velocity",
                description: "Speed up deals throughout your entire pipeline.",
                href: "/resources/pipeline-management/deal-velocity",
                icon: Zap,
              },
              {
                title: "Sales Forecasting",
                description: "Predict how bottlenecks impact revenue.",
                href: "/resources/pipeline-management/sales-forecasting",
                icon: BarChart3,
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
      <section className="py-20 bg-muted/30">
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
                Ready to Eliminate Your Pipeline Bottlenecks?
              </h2>
              <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
                LeadFlow&apos;s intelligent analytics help you find and fix bottlenecks before they impact your revenue. Start your free trial today.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/handler/sign-up">
                  <GlowButton size="lg" variant="secondary" className="group">
                    Start Free Trial
                    <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </GlowButton>
                </Link>
                <Link href="/" className="text-white/80 hover:text-white transition-colors">
                  See All Features →
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
