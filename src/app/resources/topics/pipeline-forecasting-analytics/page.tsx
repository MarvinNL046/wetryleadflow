"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  LandingHeader,
  LandingFooter,
  GlowButton,
  GradientText,
} from "@/components/landing";
import {
  TrendingUp,
  ArrowRight,
  Gauge,
  DollarSign,
  BarChart3,
  LineChart,
  PieChart,
  Activity,
} from "lucide-react";

const linkedPages = [
  {
    title: "Sales Forecasting",
    description: "Predict future revenue with AI-powered forecasting that analyzes your pipeline health and historical data.",
    href: "/resources/pipeline-management/sales-forecasting",
    icon: TrendingUp,
    pillar: "Pipeline Management",
    color: "cyan",
  },
  {
    title: "Deal Velocity",
    description: "Track how fast deals move through your pipeline and identify bottlenecks that slow down closes.",
    href: "/resources/pipeline-management/deal-velocity",
    icon: Gauge,
    pillar: "Pipeline Management",
    color: "cyan",
  },
  {
    title: "Revenue Tracking",
    description: "Monitor revenue performance in real-time with comprehensive tracking across all sales channels.",
    href: "/resources/sales-analytics/revenue-tracking",
    icon: DollarSign,
    pillar: "Sales Analytics",
    color: "violet",
  },
  {
    title: "Analytics Dashboards",
    description: "Build custom dashboards that visualize the metrics that matter most to your sales organization.",
    href: "/resources/sales-analytics/analytics-dashboards",
    icon: BarChart3,
    pillar: "Sales Analytics",
    color: "violet",
  },
];

const relatedTopics = [
  { title: "Kanban Boards", href: "/resources/pipeline-management/kanban-boards", color: "cyan" },
  { title: "Stage Optimization", href: "/resources/pipeline-management/stage-optimization", color: "cyan" },
  { title: "Conversion Metrics", href: "/resources/sales-analytics/conversion-metrics", color: "violet" },
  { title: "Team Performance", href: "/resources/sales-analytics/team-performance", color: "violet" },
];

export default function PipelineForecastingAnalyticsPage() {
  return (
    <>
      <meta name="robots" content="noindex, follow" />

      <div className="min-h-screen bg-background">
        <LandingHeader />

        <main>
          {/* Hero Section */}
          <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-20">
            <div className="absolute inset-0 -z-10">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/30 via-background to-background" />
              <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-cyan-500/30 rounded-full blur-[128px] animate-pulse" />
              <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-violet-500/20 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: "1s" }} />
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
                  className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                >
                  <LineChart className="w-4 h-4 mr-2" />
                  Crossover Topic Hub
                </motion.div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
                  <GradientText animated>Pipeline Forecasting & Analytics</GradientText>
                </h1>

                <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                  Combine pipeline management with advanced analytics to predict revenue,
                  optimize deal flow, and make data-driven decisions. Turn your sales
                  pipeline into a powerful forecasting engine.
                </p>

                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400">Pipeline Management</span>
                  <span className="text-muted-foreground">+</span>
                  <span className="px-3 py-1 rounded-full bg-violet-500/10 text-violet-400">Sales Analytics</span>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Introduction Section */}
          <section className="py-16 lg:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="max-w-3xl mx-auto"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500">
                    <PieChart className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold">Transform Pipeline Data into Predictive Intelligence</h2>
                </div>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Your sales pipeline holds the key to understanding your business's future.
                    When you combine structured pipeline management with advanced analytics,
                    you unlock the ability to forecast revenue with confidence, identify risks
                    before they impact results, and optimize every stage of your sales process.
                  </p>
                  <p>
                    From tracking deal velocity to predicting close rates, pipeline forecasting
                    analytics gives sales leaders the visibility they need to hit targets
                    consistently and scale their teams effectively.
                  </p>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Linked Pages Grid */}
          <section className="py-16 lg:py-24 bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Explore <GradientText>Related Guides</GradientText>
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Master pipeline management and sales analytics with our in-depth guides.
                </p>
              </motion.div>

              <div className="grid gap-6 md:grid-cols-2">
                {linkedPages.map((page, index) => (
                  <motion.div
                    key={page.href}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link
                      href={page.href}
                      className="group block h-full p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all duration-300"
                    >
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${page.color === "cyan" ? "from-cyan-500 to-blue-500" : "from-violet-500 to-purple-500"}`}>
                          <page.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`text-xs px-2 py-0.5 rounded-full ${page.color === "cyan" ? "bg-cyan-500/10 text-cyan-400" : "bg-violet-500/10 text-violet-400"}`}>
                              {page.pillar}
                            </span>
                          </div>
                          <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">
                            {page.title}
                          </h3>
                          <p className="text-muted-foreground text-sm mb-4">
                            {page.description}
                          </p>
                          <span className="inline-flex items-center text-sm font-medium text-cyan-400 group-hover:text-cyan-300">
                            Read Guide
                            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Key Benefits Section */}
          <section className="py-16 lg:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Why Pipeline + Analytics = <GradientText>Predictability</GradientText>
                </h2>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    icon: TrendingUp,
                    title: "Accurate Revenue Forecasting",
                    description: "Predict future revenue with confidence using AI models trained on your historical pipeline data."
                  },
                  {
                    icon: Activity,
                    title: "Real-Time Pipeline Health",
                    description: "Monitor pipeline metrics in real-time to catch issues early and keep deals on track."
                  },
                  {
                    icon: BarChart3,
                    title: "Data-Driven Optimization",
                    description: "Use analytics insights to optimize stage conversion rates and accelerate deal velocity."
                  }
                ].map((benefit, index) => (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="p-6 rounded-2xl bg-gradient-to-br from-cyan-500/5 to-blue-500/5 border border-border hover:border-cyan-500/30 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center mb-4">
                      <benefit.icon className="w-6 h-6 text-cyan-500" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground text-sm">{benefit.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Related Topics Section */}
          <section className="py-16 lg:py-24 bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="p-8 rounded-2xl border border-border/50 bg-card/30"
              >
                <h3 className="text-lg font-semibold mb-4">Related Topics</h3>
                <div className="flex flex-wrap gap-3">
                  {relatedTopics.map((topic) => (
                    <Link
                      key={topic.href}
                      href={topic.href}
                      className={`px-4 py-2 rounded-full ${topic.color === "cyan" ? "bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20" : "bg-violet-500/10 text-violet-400 hover:bg-violet-500/20"} transition-colors text-sm`}
                    >
                      {topic.title}
                    </Link>
                  ))}
                </div>
              </motion.div>
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
                  Ready to <GradientText>Forecast with Confidence</GradientText>?
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  LeadFlow combines powerful pipeline management with AI-driven analytics
                  to help you predict and achieve your revenue goals consistently.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href="/handler/sign-up">
                    <GlowButton size="lg" className="group">
                      Start Free Trial
                      <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </GlowButton>
                  </Link>
                  <Link
                    href="/resources/pipeline-management"
                    className="inline-flex items-center gap-2 px-6 py-3 text-base font-medium rounded-full border border-border hover:bg-accent transition-colors"
                  >
                    Explore Pipeline Management Hub
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>
        </main>

        <LandingFooter />
      </div>
    </>
  );
}
