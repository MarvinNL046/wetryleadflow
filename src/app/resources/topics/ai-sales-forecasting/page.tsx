"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Brain,
  BarChart3,
  TrendingUp,
  Target,
  ArrowRight,
  CheckCircle,
  Sparkles,
  PieChart,
  DollarSign,
  Clock,
  Activity,
} from "lucide-react";
import {
  LandingHeader,
  LandingFooter,
  GlowButton,
  SectionHeading,
} from "@/components/landing";

export default function AISalesForecastingPage() {
  const relatedContent = [
    {
      title: "Predictive Analytics",
      href: "/resources/ai-automation/predictive-analytics",
      description: "Leverage AI to predict sales outcomes and identify opportunities.",
      icon: TrendingUp,
      pillar: "AI & Automation",
    },
    {
      title: "Machine Learning CRM",
      href: "/resources/ai-automation/machine-learning-crm",
      description: "How machine learning transforms modern CRM capabilities.",
      icon: Brain,
      pillar: "AI & Automation",
    },
    {
      title: "Revenue Tracking",
      href: "/resources/sales-analytics/revenue-tracking",
      description: "Track and analyze revenue performance with powerful dashboards.",
      icon: DollarSign,
      pillar: "Sales Analytics",
    },
    {
      title: "Analytics Dashboards",
      href: "/resources/sales-analytics/analytics-dashboards",
      description: "Build custom dashboards for real-time sales insights.",
      icon: BarChart3,
      pillar: "Sales Analytics",
    },
    {
      title: "Sales Reporting",
      href: "/resources/sales-analytics/sales-reporting",
      description: "Generate comprehensive reports to drive data-driven decisions.",
      icon: PieChart,
      pillar: "Sales Analytics",
    },
  ];

  const relatedTopics = [
    {
      title: "Real Estate Lead Generation",
      href: "/resources/topics/real-estate-lead-generation",
      description: "Capture and convert property leads effectively.",
    },
    {
      title: "SaaS Pipeline Optimization",
      href: "/resources/topics/saas-pipeline-optimization",
      description: "Optimize your SaaS sales pipeline.",
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
            {/* Violet gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-purple-500/10" />
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto text-center"
              >
                <div className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20">
                  <Brain className="w-4 h-4 mr-2" />
                  AI & Automation + Sales Analytics
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                  <span className="bg-gradient-to-r from-violet-500 to-purple-500 bg-clip-text text-transparent">
                    AI Sales Forecasting
                  </span>{" "}
                  Intelligence Hub
                </h1>

                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Combine the power of AI-driven predictions with comprehensive sales analytics
                  to forecast revenue with unprecedented accuracy. Move from guesswork to
                  data-driven confidence.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/handler/sign-up">
                    <GlowButton size="lg">
                      Start Forecasting Smarter
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </GlowButton>
                  </Link>
                  <Link href="/resources/ai-automation/predictive-analytics">
                    <GlowButton variant="secondary" size="lg">
                      Explore Predictive Analytics
                    </GlowButton>
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>

          {/* The Problem with Traditional Forecasting */}
          <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <SectionHeading
                badge="The Problem"
                title="Why Traditional Sales Forecasting Fails"
                titleGradient="Traditional Sales Forecasting"
                description="Manual forecasting methods are fundamentally flawed. AI changes everything."
              />

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                {[
                  {
                    icon: Target,
                    title: "Subjective Deal Assessments",
                    description:
                      "Sales reps often overestimate their deals based on optimism rather than data. AI eliminates this bias by analyzing actual engagement patterns and historical outcomes.",
                  },
                  {
                    icon: Clock,
                    title: "Stale Pipeline Data",
                    description:
                      "By the time you compile your forecast, the data is already outdated. AI provides real-time predictions that update as new information flows in.",
                  },
                  {
                    icon: Activity,
                    title: "Missing Signals",
                    description:
                      "Human analysis cannot process the hundreds of signals that indicate deal health. AI detects patterns invisible to even the most experienced sales leaders.",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="p-6 rounded-2xl bg-background border border-border hover:border-violet-500/50 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center mb-4">
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* AI Forecasting Capabilities */}
          <section className="py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <SectionHeading
                badge="AI Capabilities"
                title="How AI Transforms Sales Forecasting"
                titleGradient="AI Transforms"
                description="LeadFlow combines multiple AI technologies to deliver forecasts you can trust."
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
                      title: "Machine Learning Deal Scoring",
                      description:
                        "Our ML models analyze thousands of deal characteristics to predict win probability with 85%+ accuracy. Scores update in real-time as deals progress.",
                    },
                    {
                      title: "Pattern Recognition Engine",
                      description:
                        "AI identifies patterns that correlate with successful closes: engagement cadence, stakeholder involvement, competitive signals, and more.",
                    },
                    {
                      title: "Anomaly Detection",
                      description:
                        "Get alerted when deals deviate from expected patterns. Early warning systems identify at-risk opportunities before they slip.",
                    },
                    {
                      title: "Revenue Intelligence",
                      description:
                        "Combine forecasting with deep analytics to understand not just what will happen, but why. Drive strategic decisions with complete visibility.",
                    },
                  ].map((strategy, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-5 h-5 text-violet-500" />
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
                  <div className="rounded-2xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 border border-violet-500/30 p-8">
                    <div className="flex items-center gap-2 mb-6">
                      <Sparkles className="w-5 h-5 text-violet-400" />
                      <h3 className="text-lg font-semibold">AI Forecast Dashboard</h3>
                    </div>

                    {/* Forecast Chart Visualization */}
                    <div className="space-y-4 mb-6">
                      <div className="flex items-end gap-2 h-48">
                        {[45, 52, 48, 62, 58, 71, 68, 78, 82, 88, 95, 102].map((value, index) => (
                          <motion.div
                            key={index}
                            initial={{ height: 0 }}
                            whileInView={{ height: `${(value / 110) * 100}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.05 }}
                            className={`flex-1 rounded-t-lg ${
                              index >= 9 ? 'bg-gradient-to-t from-violet-500/50 to-violet-400/50 border-2 border-dashed border-violet-400' : 'bg-gradient-to-t from-violet-500 to-purple-500'
                            }`}
                          />
                        ))}
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Q1</span>
                        <span>Q2</span>
                        <span>Q3</span>
                        <span>Q4 (Predicted)</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 rounded-lg bg-background/50">
                        <p className="text-xs text-muted-foreground">Confidence Level</p>
                        <p className="text-lg font-bold text-violet-400">94%</p>
                      </div>
                      <div className="p-3 rounded-lg bg-background/50">
                        <p className="text-xs text-muted-foreground">Predicted Revenue</p>
                        <p className="text-lg font-bold text-green-500">$1.8M</p>
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
                title="AI Forecasting & Analytics Resources"
                titleGradient="Analytics Resources"
                description="Explore the complete toolkit for AI-powered sales intelligence."
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
                      className="block p-6 rounded-2xl bg-background border border-border hover:border-violet-500/50 transition-all hover:shadow-lg hover:shadow-violet-500/10 h-full"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                          <resource.icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <span className="text-xs text-violet-400 font-medium">
                            {resource.pillar}
                          </span>
                          <h3 className="font-semibold mt-1 mb-2">{resource.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {resource.description}
                          </p>
                          <span className="inline-flex items-center text-sm text-violet-400 mt-4">
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

          {/* Impact Metrics */}
          <section className="py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <SectionHeading
                badge="Impact"
                title="The Business Impact of AI Forecasting"
                titleGradient="AI Forecasting"
                description="See what accurate, AI-powered forecasting delivers to your business."
              />

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
                {[
                  {
                    icon: Target,
                    metric: "94%",
                    label: "Forecast Accuracy",
                    description: "AI predictions consistently outperform manual forecasts.",
                  },
                  {
                    icon: TrendingUp,
                    metric: "35%",
                    label: "Reduced Deal Slippage",
                    description: "Early warnings help save at-risk opportunities.",
                  },
                  {
                    icon: Clock,
                    metric: "10hrs",
                    label: "Weekly Time Saved",
                    description: "Automated forecasting eliminates manual compilation.",
                  },
                  {
                    icon: DollarSign,
                    metric: "22%",
                    label: "Revenue Growth",
                    description: "Better insights drive smarter resource allocation.",
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
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center mx-auto mb-4">
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-4xl font-bold mb-1">
                      <span className="bg-gradient-to-r from-violet-500 to-purple-500 bg-clip-text text-transparent">
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

          {/* Use Cases Section */}
          <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <SectionHeading
                badge="Applications"
                title="AI Forecasting Use Cases"
                titleGradient="Use Cases"
                description="How leading sales teams leverage AI forecasting for competitive advantage."
              />

              <div className="grid md:grid-cols-2 gap-8 mt-12">
                {[
                  {
                    title: "Board-Level Reporting",
                    description: "Present revenue forecasts with confidence. AI-backed predictions include confidence intervals and methodology transparency that executives trust.",
                  },
                  {
                    title: "Resource Planning",
                    description: "Allocate headcount, budget, and support resources based on predicted revenue. Make hiring and investment decisions with data, not hope.",
                  },
                  {
                    title: "Deal Prioritization",
                    description: "Focus your team on the opportunities most likely to close. AI scoring helps reps spend time where it matters most.",
                  },
                  {
                    title: "Pipeline Health Monitoring",
                    description: "Continuously monitor pipeline coverage, velocity, and conversion rates. Get ahead of problems before they impact your numbers.",
                  },
                ].map((useCase, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="p-8 rounded-2xl bg-gradient-to-br from-violet-500/5 to-purple-500/5 border border-border"
                  >
                    <h3 className="text-xl font-semibold mb-3">{useCase.title}</h3>
                    <p className="text-muted-foreground">{useCase.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 bg-gradient-to-br from-violet-500/10 via-transparent to-purple-500/10">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-3xl mx-auto text-center"
              >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                  Ready for{" "}
                  <span className="bg-gradient-to-r from-violet-500 to-purple-500 bg-clip-text text-transparent">
                    AI-Powered Forecasting
                  </span>
                  ?
                </h2>
                <p className="text-xl text-muted-foreground mb-8">
                  Start your free trial today and experience the confidence that comes
                  with accurate, AI-driven sales forecasting.
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
                      className="block p-6 rounded-2xl bg-muted/50 border border-border hover:border-violet-500/50 transition-colors group h-full"
                    >
                      <h3 className="font-semibold mb-2 group-hover:text-violet-400 transition-colors">
                        {topic.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">{topic.description}</p>
                      <span className="inline-flex items-center text-sm text-violet-400 mt-4">
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
