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
  Layers,
  ArrowRight,
  CheckCircle2,
  Zap,
  Target,
  TrendingUp,
  Settings,
  Filter,
  Clock,
  BarChart3,
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  LayoutGrid,
} from "lucide-react";

export default function StageOptimizationPage() {
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
              <Layers className="w-4 h-4" />
              Pipeline Management
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
              Pipeline Stage <GradientText>Optimization</GradientText> Tips for Sales Success
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Your sales pipeline is only as strong as its individual stages. Learn how to design, configure, and continuously optimize each stage to maximize conversion rates and accelerate deal velocity.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/handler/sign-up">
                <GlowButton size="lg" className="group">
                  Optimize Your Pipeline
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

      {/* Understanding Stages Section */}
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
                Understanding <GradientText>Pipeline Stages</GradientText> and Their Purpose
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Pipeline stages are the fundamental building blocks of your sales process. Each stage represents a meaningful milestone in the buyer&apos;s journey, from initial awareness to closed deal. When properly configured, stages create a predictable, repeatable path to revenue.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                The most common mistake sales teams make is creating stages based on internal activities rather than buyer actions. A stage like &quot;Email Sent&quot; tells you what the rep did, not where the buyer is in their decision process. Instead, stages should reflect buyer commitment levels, such as &quot;Discovery Completed&quot; or &quot;Proposal Reviewed.&quot;
              </p>
              <p className="text-lg text-muted-foreground">
                Well-designed stages do three things: they give reps clear guidance on what actions to take, they provide managers visibility into pipeline health, and they generate accurate data for forecasting. When any of these breaks down, it&apos;s usually because the stages aren&apos;t aligned with how buyers actually buy.
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
                <h4 className="font-semibold mb-4">Stage Progression Example</h4>
                <div className="space-y-3">
                  {[
                    { stage: "New Lead", probability: "10%", color: "bg-blue-500" },
                    { stage: "Discovery", probability: "25%", color: "bg-purple-500" },
                    { stage: "Qualified", probability: "50%", color: "bg-cyan-500" },
                    { stage: "Proposal", probability: "75%", color: "bg-yellow-500" },
                    { stage: "Negotiation", probability: "90%", color: "bg-orange-500" },
                    { stage: "Closed Won", probability: "100%", color: "bg-green-500" },
                  ].map((item, index) => (
                    <div key={item.stage} className="flex items-center gap-4">
                      <div className={`w-3 h-3 rounded-full ${item.color}`} />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{item.stage}</span>
                          <span className="text-xs text-muted-foreground">{item.probability}</span>
                        </div>
                        <div className="h-1.5 bg-muted rounded-full mt-1 overflow-hidden">
                          <div
                            className={`h-full ${item.color} rounded-full transition-all`}
                            style={{ width: item.probability }}
                          />
                        </div>
                      </div>
                      {index < 5 && <ArrowDownRight className="w-4 h-4 text-muted-foreground" />}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Optimization Strategies Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Optimization Strategies"
            title="Proven Techniques for Stage Optimization"
            titleGradient="Stage Optimization"
            description="Apply these battle-tested strategies to improve conversion rates at every stage of your pipeline."
          />

          <div className="grid md:grid-cols-2 gap-8 mt-16">
            {[
              {
                icon: Target,
                title: "Define Clear Entry and Exit Criteria",
                description: "Every stage needs explicit criteria that determine when a deal can enter and when it&apos;s ready to move forward. Entry criteria ensure deals are qualified before advancing. Exit criteria define what must happen before the next stage. For example, &apos;Discovery&apos; might require a completed needs assessment call (entry) and a documented list of requirements and timeline (exit). LeadFlow lets you enforce these criteria with required fields and validation rules.",
              },
              {
                icon: Filter,
                title: "Implement Stage-Specific Lead Scoring",
                description: "Different stages require different signals. Early stages should focus on fit and intent signals like company size, industry, and engagement. Later stages should weight buying signals like stakeholder involvement, competitive mentions, and timeline urgency. LeadFlow&apos;s AI dynamically adjusts scoring weights based on stage, giving you more accurate predictions throughout the sales cycle.",
              },
              {
                icon: Clock,
                title: "Set Maximum Time-in-Stage Limits",
                description: "Deals that linger too long in a stage are usually dead deals that no one has called yet. Set realistic time limits for each stage based on your historical data. LeadFlow tracks time-in-stage automatically and can trigger alerts, reassignments, or workflow actions when deals exceed thresholds. This keeps your pipeline clean and your forecasts accurate.",
              },
              {
                icon: Settings,
                title: "Configure Stage-Specific Automations",
                description: "Each stage should trigger relevant automation. New leads might receive an automated sequence. Deals entering &apos;Proposal&apos; might trigger a task for the solutions engineer. Deals moving to &apos;Negotiation&apos; might alert the sales manager. LeadFlow&apos;s automation engine lets you build sophisticated workflows that fire based on stage transitions.",
              },
              {
                icon: AlertTriangle,
                title: "Monitor Stage Conversion Rates",
                description: "Track the percentage of deals that successfully move from each stage to the next. Healthy pipelines show consistent conversion rates. If your Discovery-to-Qualified rate suddenly drops, it signals a problem with your qualification criteria or discovery process. LeadFlow provides stage-by-stage conversion analytics so you can spot and fix issues quickly.",
              },
              {
                icon: TrendingUp,
                title: "Continuously Refine Based on Data",
                description: "Your stages should evolve as your market, product, and team change. Quarterly reviews of stage performance help identify optimization opportunities. Are deals backing up in certain stages? Are conversion rates declining? Is time-in-stage increasing? LeadFlow&apos;s analytics dashboard gives you the data you need to make evidence-based refinements.",
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

      {/* Common Stage Configurations Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Stage Templates"
            title="Common Pipeline Stage Configurations"
            titleGradient="Stage Configurations"
            description="Start with these proven stage frameworks and customize them for your specific sales motion."
          />

          <div className="grid lg:grid-cols-3 gap-8 mt-16">
            {[
              {
                title: "B2B SaaS Pipeline",
                stages: [
                  { name: "Lead", description: "Inbound inquiry or outbound target" },
                  { name: "Discovery", description: "Initial conversation completed" },
                  { name: "Qualified", description: "BANT criteria confirmed" },
                  { name: "Demo/Trial", description: "Product demonstrated or trial started" },
                  { name: "Proposal", description: "Pricing and terms presented" },
                  { name: "Negotiation", description: "Active discussions on terms" },
                  { name: "Closed", description: "Deal won or lost" },
                ],
                description: "Ideal for software companies with a consultative sales process. Includes a demo/trial stage critical for technical validation.",
              },
              {
                title: "Enterprise Sales Pipeline",
                stages: [
                  { name: "Target", description: "Account identified for pursuit" },
                  { name: "Engaged", description: "Champion identified and engaged" },
                  { name: "Discovery", description: "Business case development" },
                  { name: "Technical Validation", description: "POC or technical review" },
                  { name: "Business Validation", description: "ROI and procurement alignment" },
                  { name: "Negotiation", description: "Contract and legal review" },
                  { name: "Closed", description: "Deal finalized" },
                ],
                description: "Designed for complex, multi-stakeholder deals with long sales cycles and significant technical and business validation requirements.",
              },
              {
                title: "Transactional Sales Pipeline",
                stages: [
                  { name: "New", description: "Lead captured" },
                  { name: "Contacted", description: "Initial outreach completed" },
                  { name: "Interested", description: "Expressed buying intent" },
                  { name: "Quote Sent", description: "Pricing provided" },
                  { name: "Closed", description: "Deal complete" },
                ],
                description: "Streamlined for high-volume, lower-touch sales where speed is critical. Fewer stages reduce friction and accelerate deals.",
              },
            ].map((pipeline, index) => (
              <motion.div
                key={pipeline.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-2xl border border-border/50 bg-card/50"
              >
                <h3 className="text-xl font-semibold mb-2">{pipeline.title}</h3>
                <p className="text-sm text-muted-foreground mb-6">{pipeline.description}</p>
                <div className="space-y-3">
                  {pipeline.stages.map((stage, i) => (
                    <div key={stage.name} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs text-white font-medium">{i + 1}</span>
                      </div>
                      <div>
                        <div className="font-medium text-sm">{stage.name}</div>
                        <div className="text-xs text-muted-foreground">{stage.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Metrics to Track Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="order-2 lg:order-1"
            >
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Stage Conversion Rate", value: "68%", trend: "+5%", icon: ArrowUpRight, color: "text-green-500" },
                  { label: "Avg Time in Stage", value: "4.2d", trend: "-0.8d", icon: Clock, color: "text-blue-500" },
                  { label: "Stage Win Rate", value: "24%", trend: "+3%", icon: Target, color: "text-purple-500" },
                  { label: "Pipeline Velocity", value: "32d", trend: "-4d", icon: Zap, color: "text-yellow-500" },
                ].map((metric) => (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3 }}
                    className="p-4 rounded-xl border border-border/50 bg-card/50"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <metric.icon className={`w-4 h-4 ${metric.color}`} />
                      <span className="text-xs text-muted-foreground">{metric.label}</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold">{metric.value}</span>
                      <span className={`text-xs ${metric.color}`}>{metric.trend}</span>
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
                Key Metrics for <GradientText>Stage Performance</GradientText>
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                You can&apos;t optimize what you don&apos;t measure. Track these critical metrics for each stage to identify optimization opportunities and validate improvements.
              </p>
              <div className="space-y-4">
                {[
                  "Stage Conversion Rate: Percentage of deals that successfully advance to the next stage",
                  "Average Time in Stage: How long deals typically spend in each stage",
                  "Stage Win Rate: Percentage of deals entering this stage that ultimately close",
                  "Stage Value: Total and average deal value at each stage",
                  "Stage Leakage: Where deals drop out of your pipeline",
                  "Activity-to-Advancement Ratio: Activities required to move deals forward",
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </motion.div>
                ))}
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
            title="Explore More Pipeline Management Topics"
            titleGradient="Pipeline Management"
            description="Continue building your expertise with these related guides and resources."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {[
              {
                title: "Kanban Boards",
                description: "Visual pipeline management with drag-and-drop simplicity.",
                href: "/resources/pipeline-management/kanban-boards",
                icon: LayoutGrid,
              },
              {
                title: "Deal Velocity",
                description: "Accelerate how quickly deals move through your pipeline.",
                href: "/resources/pipeline-management/deal-velocity",
                icon: Zap,
              },
              {
                title: "Sales Forecasting",
                description: "Predict revenue with confidence using pipeline data.",
                href: "/resources/pipeline-management/sales-forecasting",
                icon: BarChart3,
              },
              {
                title: "Bottleneck Analysis",
                description: "Find and fix the friction points in your pipeline.",
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
                Start Optimizing Your Pipeline Stages Today
              </h2>
              <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
                LeadFlow provides the tools, analytics, and AI-powered insights you need to build and continuously optimize a high-performing sales pipeline.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/handler/sign-up">
                  <GlowButton size="lg" variant="secondary" className="group">
                    Start Free Trial
                    <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </GlowButton>
                </Link>
                <Link href="/" className="text-white/80 hover:text-white transition-colors">
                  Explore LeadFlow Features →
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
