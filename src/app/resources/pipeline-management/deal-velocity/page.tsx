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
  Zap,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  Target,
  Clock,
  BarChart3,
  Users,
  MessageSquare,
  Calendar,
  DollarSign,
  Gauge,
  Timer,
  LayoutGrid,
  AlertTriangle,
} from "lucide-react";

export default function DealVelocityPage() {
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
              <Zap className="w-4 h-4" />
              Pipeline Management
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
              Improve <GradientText>Deal Velocity</GradientText> in Your Pipeline
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Speed wins in sales. Learn how to accelerate deal velocity without sacrificing deal quality, moving more opportunities through your pipeline faster to hit revenue targets consistently.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/handler/sign-up">
                <GlowButton size="lg" className="group">
                  Accelerate Your Pipeline
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </GlowButton>
              </Link>
              <Link href="/resources/pipeline-management/sales-forecasting" className="text-muted-foreground hover:text-foreground transition-colors">
                Learn about Sales Forecasting →
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What is Deal Velocity Section */}
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
                What is <GradientText>Deal Velocity</GradientText> and Why Does It Matter?
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Deal velocity measures how quickly opportunities move through your sales pipeline from first touch to closed deal. It&apos;s one of the most important predictors of sales performance because it directly impacts your ability to generate revenue.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                The deal velocity formula combines four key factors: the number of opportunities in your pipeline, your average deal value, your win rate, and your average sales cycle length. By optimizing any of these factors, you can dramatically increase the revenue your pipeline generates.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                For example, reducing your average sales cycle from 60 days to 45 days means you can close 33% more deals in the same time period, assuming all else remains equal. That&apos;s a significant revenue boost without needing to increase your pipeline volume or win rate.
              </p>
              <p className="text-lg text-muted-foreground">
                LeadFlow tracks deal velocity in real-time, giving you visibility into how quickly deals are moving and where slowdowns are occurring. Our AI-powered insights help you identify opportunities to accelerate without compromising deal quality or customer relationships.
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
                <h4 className="font-semibold mb-6 text-center">Deal Velocity Formula</h4>
                <div className="bg-muted/50 rounded-xl p-6 mb-6">
                  <div className="text-center">
                    <div className="text-lg font-mono">
                      <span className="text-purple-400">Opportunities</span>
                      <span className="text-muted-foreground"> × </span>
                      <span className="text-blue-400">Deal Value</span>
                      <span className="text-muted-foreground"> × </span>
                      <span className="text-cyan-400">Win Rate</span>
                    </div>
                    <div className="border-t border-border/50 my-3" />
                    <div className="text-lg font-mono">
                      <span className="text-yellow-400">Sales Cycle Length</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Opportunities", value: "120", color: "text-purple-400" },
                    { label: "Avg Deal Value", value: "€15,000", color: "text-blue-400" },
                    { label: "Win Rate", value: "25%", color: "text-cyan-400" },
                    { label: "Cycle Length", value: "45 days", color: "text-yellow-400" },
                  ].map((item) => (
                    <div key={item.label} className="p-3 rounded-lg bg-muted/30 text-center">
                      <div className={`text-xl font-bold ${item.color}`}>{item.value}</div>
                      <div className="text-xs text-muted-foreground">{item.label}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20">
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground">Velocity Score</div>
                    <div className="text-3xl font-bold text-green-400">€10,000/day</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Strategies Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Acceleration Strategies"
            title="Proven Tactics to Increase Deal Velocity"
            titleGradient="Deal Velocity"
            description="Implement these strategies to move deals through your pipeline faster while maintaining quality."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {[
              {
                icon: Target,
                title: "Improve Lead Qualification",
                description: "Better qualified leads move faster. Implement stricter qualification criteria upfront to ensure you&apos;re only pursuing opportunities with genuine fit and intent. LeadFlow&apos;s AI scoring identifies high-quality leads automatically, helping reps focus on deals most likely to close quickly.",
              },
              {
                icon: MessageSquare,
                title: "Accelerate Response Times",
                description: "Speed to lead matters. Responding to inbound inquiries within 5 minutes instead of 5 hours can dramatically improve conversion rates and deal velocity. LeadFlow&apos;s instant lead notifications and automated first-response sequences ensure no lead waits for attention.",
              },
              {
                icon: Calendar,
                title: "Reduce Scheduling Friction",
                description: "Meeting scheduling is a hidden velocity killer. Every back-and-forth email adds days to your sales cycle. Use scheduling tools integrated with LeadFlow to let prospects book directly into available slots, eliminating delays between stages.",
              },
              {
                icon: Users,
                title: "Multi-Thread Your Deals",
                description: "Single-threaded deals are slow and risky. Building relationships with multiple stakeholders creates momentum and reduces the chance of a single person stalling the deal. LeadFlow tracks all contacts involved in a deal and alerts you when engagement drops.",
              },
              {
                icon: DollarSign,
                title: "Align Pricing with Urgency",
                description: "Create genuine urgency with time-limited offers or early-adopter pricing. When buyers have a compelling reason to move quickly, deals accelerate. Track offer performance in LeadFlow to understand which incentives drive the fastest closes.",
              },
              {
                icon: Clock,
                title: "Set and Enforce Deadlines",
                description: "Mutual action plans with agreed deadlines keep deals on track. When both buyer and seller commit to a timeline, velocity increases. LeadFlow&apos;s task management helps you track commitments and follow up when deadlines slip.",
              },
            ].map((strategy, index) => (
              <motion.div
                key={strategy.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-2xl border border-border/50 bg-card/50 hover:bg-card/80 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center mb-4">
                  <strategy.icon className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{strategy.title}</h3>
                <p className="text-muted-foreground">{strategy.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Common Velocity Killers Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Warning Signs"
            title="Common Deal Velocity Killers to Avoid"
            titleGradient="Velocity Killers"
            description="Recognize and eliminate these common factors that slow down your sales pipeline."
          />

          <div className="max-w-4xl mx-auto mt-16 space-y-6">
            {[
              {
                title: "Pursuing Unqualified Opportunities",
                description: "Chasing deals that will never close wastes time and drags down velocity metrics. Implement rigorous qualification frameworks like BANT or MEDDIC and have the discipline to disqualify early. A smaller pipeline of qualified deals moves faster than a bloated one full of unlikely opportunities.",
                impact: "Can add 30-60 days to average sales cycle",
              },
              {
                title: "Inadequate Discovery",
                description: "Rushing through discovery to get to the proposal creates problems later. When you don&apos;t fully understand the buyer&apos;s needs, timeline, and decision process, you end up with proposals that miss the mark and extended negotiation cycles. Invest time upfront to save time later.",
                impact: "Leads to 40% longer proposal-to-close times",
              },
              {
                title: "Single-Threaded Relationships",
                description: "Relying on a single contact creates fragility. If that person goes on vacation, changes priorities, or leaves the company, your deal stalls. Building relationships with 3-5 stakeholders creates momentum and resilience.",
                impact: "Single-threaded deals have 50% lower win rates",
              },
              {
                title: "Proposal Delays",
                description: "Every day between verbal commitment and formal proposal is a day for the buyer to reconsider or for competitors to swoop in. Have proposal templates ready and streamlined approval processes so you can strike while interest is hot.",
                impact: "Win rate drops 7% for each week of delay",
              },
              {
                title: "Legal and Procurement Bottlenecks",
                description: "Complex contract negotiations can add weeks or months to your sales cycle. Understand your buyer&apos;s procurement process early, prepare for common objections, and have pre-approved contract language ready for standard requests.",
                impact: "Enterprise deals average 45+ days in legal review",
              },
              {
                title: "Lack of Follow-Up Discipline",
                description: "Deals don&apos;t die dramatically; they fade away from neglect. Without systematic follow-up, promising opportunities go cold. LeadFlow&apos;s automated reminders and engagement tracking ensure no deal slips through the cracks.",
                impact: "80% of deals require 5+ follow-ups to close",
              },
            ].map((killer, index) => (
              <motion.div
                key={killer.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-2xl border border-border/50 bg-card/50"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center flex-shrink-0">
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold">{killer.title}</h3>
                      <span className="text-xs text-red-400 bg-red-500/10 px-2 py-1 rounded-full">{killer.impact}</span>
                    </div>
                    <p className="text-muted-foreground">{killer.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Measuring Velocity Section */}
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
                Measuring and <GradientText>Tracking</GradientText> Deal Velocity
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                What gets measured gets managed. Tracking deal velocity and its component metrics helps you identify opportunities for improvement and measure the impact of your optimization efforts.
              </p>
              <div className="space-y-4">
                {[
                  "Overall pipeline velocity score calculated daily",
                  "Stage-by-stage time tracking and benchmarks",
                  "Win rate trends by deal size and source",
                  "Sales cycle length analysis with cohort comparisons",
                  "Rep-level velocity metrics for coaching",
                  "Velocity forecasting based on current pipeline",
                  "Automated alerts when deals exceed time thresholds",
                  "Historical velocity trends and seasonality patterns",
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
              <div className="relative rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">Velocity Dashboard</h4>
                  <span className="text-xs text-green-400 bg-green-500/10 px-2 py-1 rounded-full">Live</span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "This Month", value: "€312K", change: "+18%", positive: true },
                    { label: "Avg Cycle", value: "38 days", change: "-5 days", positive: true },
                    { label: "Win Rate", value: "27%", change: "+3%", positive: true },
                    { label: "Velocity", value: "€8.2K/day", change: "+12%", positive: true },
                  ].map((stat) => (
                    <div key={stat.label} className="p-4 rounded-xl bg-muted/30">
                      <div className="text-xs text-muted-foreground mb-1">{stat.label}</div>
                      <div className="text-xl font-bold">{stat.value}</div>
                      <div className={`text-xs ${stat.positive ? "text-green-400" : "text-red-400"}`}>
                        {stat.change}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  <div className="text-sm font-medium">Stage Velocity</div>
                  {[
                    { stage: "Discovery → Qualified", days: "4.2d", target: "5d", status: "good" },
                    { stage: "Qualified → Proposal", days: "8.7d", target: "7d", status: "warning" },
                    { stage: "Proposal → Negotiation", days: "6.1d", target: "7d", status: "good" },
                    { stage: "Negotiation → Close", days: "12.3d", target: "10d", status: "warning" },
                  ].map((stage) => (
                    <div key={stage.stage} className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
                      <span className="text-sm">{stage.stage}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium">{stage.days}</span>
                        <div className={`w-2 h-2 rounded-full ${
                          stage.status === "good" ? "bg-green-500" : "bg-yellow-500"
                        }`} />
                      </div>
                    </div>
                  ))}
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
            title="More Pipeline Management Resources"
            titleGradient="Pipeline Management"
            description="Continue optimizing your sales pipeline with these related guides."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {[
              {
                title: "Kanban Boards",
                description: "Visualize your pipeline with intuitive kanban boards.",
                href: "/resources/pipeline-management/kanban-boards",
                icon: LayoutGrid,
              },
              {
                title: "Stage Optimization",
                description: "Configure stages for maximum conversion.",
                href: "/resources/pipeline-management/stage-optimization",
                icon: TrendingUp,
              },
              {
                title: "Sales Forecasting",
                description: "Predict revenue accurately with pipeline data.",
                href: "/resources/pipeline-management/sales-forecasting",
                icon: BarChart3,
              },
              {
                title: "Bottleneck Analysis",
                description: "Find and fix pipeline friction points.",
                href: "/resources/pipeline-management/bottleneck-analysis",
                icon: AlertTriangle,
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
                Ready to Accelerate Your Deal Velocity?
              </h2>
              <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
                LeadFlow gives you the tools, insights, and automation you need to move deals through your pipeline faster than ever before.
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
