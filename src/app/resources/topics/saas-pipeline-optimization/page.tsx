"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Cloud,
  Kanban,
  Gauge,
  LineChart,
  TrendingUp,
  ArrowRight,
  CheckCircle,
  Zap,
  Target,
  DollarSign,
  Clock,
  BarChart3,
} from "lucide-react";
import {
  LandingHeader,
  LandingFooter,
  GlowButton,
  SectionHeading,
} from "@/components/landing";

export default function SaaSPipelineOptimizationPage() {
  const relatedContent = [
    {
      title: "SaaS Sales CRM",
      href: "/resources/industry-solutions/saas-sales",
      description: "Purpose-built CRM for B2B SaaS companies with recurring revenue focus.",
      icon: Cloud,
      pillar: "Industry Solutions",
    },
    {
      title: "Kanban Boards",
      href: "/resources/pipeline-management/kanban-boards",
      description: "Visualize your sales pipeline with customizable kanban boards.",
      icon: Kanban,
      pillar: "Pipeline Management",
    },
    {
      title: "Deal Velocity",
      href: "/resources/pipeline-management/deal-velocity",
      description: "Accelerate deals through your pipeline with velocity tracking.",
      icon: Gauge,
      pillar: "Pipeline Management",
    },
    {
      title: "Sales Forecasting",
      href: "/resources/pipeline-management/sales-forecasting",
      description: "Predict revenue with accurate pipeline-based forecasting.",
      icon: LineChart,
      pillar: "Pipeline Management",
    },
    {
      title: "Bottleneck Analysis",
      href: "/resources/pipeline-management/bottleneck-analysis",
      description: "Identify and eliminate friction points in your sales process.",
      icon: TrendingUp,
      pillar: "Pipeline Management",
    },
  ];

  const relatedTopics = [
    {
      title: "Real Estate Lead Generation",
      href: "/resources/topics/real-estate-lead-generation",
      description: "Capture and convert property leads effectively.",
    },
    {
      title: "AI Sales Forecasting",
      href: "/resources/topics/ai-sales-forecasting",
      description: "Predict revenue with AI-powered analytics.",
    },
    {
      title: "Automated Lead Routing",
      href: "/resources/topics/automated-lead-routing",
      description: "Route leads intelligently with automation.",
    },
    {
      title: "Meta Audience Targeting",
      href: "/resources/topics/meta-audience-targeting",
      description: "Target the right audiences on Meta platforms.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
        <LandingHeader />
        <main>
          {/* Hero Section */}
          <section className="relative pt-32 pb-20 overflow-hidden">
            {/* Cyan gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-teal-500/10" />
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto text-center"
              >
                <div className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium rounded-full bg-cyan-500/10 text-cyan-500 border border-cyan-500/20">
                  <Cloud className="w-4 h-4 mr-2" />
                  Industry Solutions + Pipeline Management
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                  <span className="bg-gradient-to-r from-cyan-500 to-teal-500 bg-clip-text text-transparent">
                    SaaS Pipeline Optimization
                  </span>{" "}
                  Complete Guide
                </h1>

                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Master the art of SaaS sales pipeline management. Learn how to increase deal
                  velocity, improve conversion rates, and build predictable recurring revenue
                  with LeadFlow.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/handler/sign-up">
                    <GlowButton size="lg">
                      Optimize Your Pipeline
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </GlowButton>
                  </Link>
                  <Link href="/resources/industry-solutions/saas-sales">
                    <GlowButton variant="secondary" size="lg">
                      Explore SaaS Sales CRM
                    </GlowButton>
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>

          {/* SaaS Pipeline Challenges */}
          <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <SectionHeading
                badge="The Challenge"
                title="Why SaaS Pipelines Are Different"
                titleGradient="SaaS Pipelines"
                description="SaaS sales requires a unique approach to pipeline management that traditional methods cannot address."
              />

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                {[
                  {
                    icon: TrendingUp,
                    title: "Recurring Revenue Focus",
                    description:
                      "SaaS success depends on lifetime value, not just initial deals. Your pipeline must account for expansion, renewals, and churn prevention alongside new business.",
                  },
                  {
                    icon: Clock,
                    title: "Complex Sales Cycles",
                    description:
                      "B2B SaaS deals involve multiple stakeholders, trials, demos, and security reviews. Pipeline stages must reflect this complexity to provide accurate forecasting.",
                  },
                  {
                    icon: Zap,
                    title: "Velocity Is Everything",
                    description:
                      "In competitive SaaS markets, speed wins. Slow-moving deals often indicate poor fit or competitive pressure that needs immediate attention.",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="p-6 rounded-2xl bg-background border border-border hover:border-cyan-500/50 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center mb-4">
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Optimization Framework */}
          <section className="py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <SectionHeading
                badge="Framework"
                title="The SaaS Pipeline Optimization Framework"
                titleGradient="Optimization Framework"
                description="Follow this proven framework to build a high-performing SaaS sales pipeline."
              />

              <div className="grid lg:grid-cols-2 gap-12 mt-12">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="space-y-6"
                >
                  {[
                    {
                      title: "Define SaaS-Specific Pipeline Stages",
                      description:
                        "Create stages that reflect the SaaS buying journey: Discovery, Demo, Trial, Proposal, Security Review, Contract, and Closed Won. Each stage should have clear entry and exit criteria.",
                    },
                    {
                      title: "Track Deal Velocity by Stage",
                      description:
                        "Measure how long deals spend in each stage. Identify bottlenecks where deals stall and implement strategies to accelerate movement through slow stages.",
                    },
                    {
                      title: "Implement Stage-Based Probability",
                      description:
                        "Assign realistic win probabilities to each stage based on historical data. Use these for weighted pipeline forecasting that actually reflects reality.",
                    },
                    {
                      title: "Monitor Pipeline Coverage Ratios",
                      description:
                        "Maintain optimal pipeline coverage for your target. Most SaaS companies need 3-4x pipeline coverage, but this varies by deal size and sales cycle length.",
                    },
                  ].map((strategy, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-5 h-5 text-cyan-500" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{strategy.title}</h3>
                        <p className="text-muted-foreground text-sm">
                          {strategy.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="rounded-2xl bg-gradient-to-br from-cyan-500/20 to-teal-500/20 border border-cyan-500/30 p-8">
                    <h3 className="text-lg font-semibold mb-6">Pipeline Velocity Calculator</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-4 rounded-lg bg-background/50">
                        <span className="text-muted-foreground">Number of Opportunities</span>
                        <span className="font-bold text-cyan-500">45</span>
                      </div>
                      <div className="flex justify-between items-center p-4 rounded-lg bg-background/50">
                        <span className="text-muted-foreground">Average Deal Value</span>
                        <span className="font-bold text-cyan-500">$24,000</span>
                      </div>
                      <div className="flex justify-between items-center p-4 rounded-lg bg-background/50">
                        <span className="text-muted-foreground">Win Rate</span>
                        <span className="font-bold text-cyan-500">25%</span>
                      </div>
                      <div className="flex justify-between items-center p-4 rounded-lg bg-background/50">
                        <span className="text-muted-foreground">Sales Cycle Length</span>
                        <span className="font-bold text-cyan-500">45 days</span>
                      </div>
                      <div className="border-t border-cyan-500/30 pt-4">
                        <div className="flex justify-between items-center p-4 rounded-lg bg-cyan-500/10">
                          <span className="font-semibold">Pipeline Velocity</span>
                          <span className="text-2xl font-bold bg-gradient-to-r from-cyan-500 to-teal-500 bg-clip-text text-transparent">
                            $6,000/day
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Related Content Hub */}
          <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <SectionHeading
                badge="Resources"
                title="SaaS Pipeline Management Resources"
                titleGradient="Pipeline Management"
                description="Deep dive into each component of SaaS pipeline optimization."
              />

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                {relatedContent.map((resource, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={resource.href}
                      className="block p-6 rounded-2xl bg-background border border-border hover:border-cyan-500/50 transition-all hover:shadow-lg hover:shadow-cyan-500/10 h-full"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center flex-shrink-0">
                          <resource.icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <span className="text-xs text-cyan-500 font-medium">
                            {resource.pillar}
                          </span>
                          <h3 className="font-semibold mt-1 mb-2">{resource.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {resource.description}
                          </p>
                          <span className="inline-flex items-center text-sm text-cyan-500 mt-4">
                            Learn more <ArrowRight className="ml-1 w-4 h-4" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Metrics Section */}
          <section className="py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <SectionHeading
                badge="Results"
                title="SaaS Pipeline Success Metrics"
                titleGradient="Success Metrics"
                description="Track these key metrics to measure your pipeline optimization success."
              />

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
                {[
                  {
                    icon: Gauge,
                    metric: "40%",
                    label: "Faster Sales Cycles",
                    description: "Reduce time from demo to close with streamlined pipeline stages.",
                  },
                  {
                    icon: Target,
                    metric: "25%",
                    label: "Higher Win Rates",
                    description: "Better qualification and deal management improves close rates.",
                  },
                  {
                    icon: BarChart3,
                    metric: "95%",
                    label: "Forecast Accuracy",
                    description: "Stage-based probability delivers reliable revenue predictions.",
                  },
                  {
                    icon: DollarSign,
                    metric: "2.5x",
                    label: "Pipeline Velocity",
                    description: "Increase the rate at which revenue flows through your pipeline.",
                  },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center p-6 rounded-2xl bg-muted/50 border border-border"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center mx-auto mb-4">
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-4xl font-bold mb-1">
                      <span className="bg-gradient-to-r from-cyan-500 to-teal-500 bg-clip-text text-transparent">
                        {stat.metric}
                      </span>
                    </p>
                    <p className="font-semibold mb-2">{stat.label}</p>
                    <p className="text-sm text-muted-foreground">{stat.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 bg-gradient-to-br from-cyan-500/10 via-transparent to-teal-500/10">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-3xl mx-auto text-center"
              >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                  Ready to Optimize Your{" "}
                  <span className="bg-gradient-to-r from-cyan-500 to-teal-500 bg-clip-text text-transparent">
                    SaaS Pipeline
                  </span>
                  ?
                </h2>
                <p className="text-xl text-muted-foreground mb-8">
                  Start your free trial today and discover how LeadFlow can help you build
                  a high-velocity, predictable SaaS sales pipeline.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/handler/sign-up">
                    <GlowButton size="lg">
                      Start Your Free Trial
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </GlowButton>
                  </Link>
                  <Link href="/#pricing">
                    <GlowButton variant="secondary" size="lg">
                      View Pricing
                    </GlowButton>
                  </Link>
                </div>
                <p className="text-sm text-muted-foreground mt-6">
                  No credit card required. 14-day free trial. Cancel anytime.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Related Topics */}
          <section className="py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <SectionHeading
                badge="Related Topics"
                title="Explore More Crossover Topics"
                description="Discover other ways to combine LeadFlow features for maximum impact."
              />

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
                {relatedTopics.map((topic, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={topic.href}
                      className="block p-6 rounded-2xl bg-muted/50 border border-border hover:border-cyan-500/50 transition-colors group h-full"
                    >
                      <h3 className="font-semibold mb-2 group-hover:text-cyan-500 transition-colors">
                        {topic.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">{topic.description}</p>
                      <span className="inline-flex items-center text-sm text-cyan-500 mt-4">
                        Explore <ArrowRight className="ml-1 w-4 h-4" />
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
