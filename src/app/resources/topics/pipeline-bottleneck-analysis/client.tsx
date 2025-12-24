"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  LandingHeader,
  LandingFooter,
  GlowButton,
} from "@/components/landing";
import {
  ArrowRight,
  AlertTriangle,
  BarChart3,
  Layers,
  TrendingUp,
  Search,
  LineChart,
  FileSpreadsheet,
  Gauge,
  Target,
} from "lucide-react";

export default function PipelineBottleneckAnalysisClient() {
  const relatedContent = [
    {
      title: "Bottleneck Analysis Guide",
      description: "Identify where deals stall in your pipeline and implement strategies to keep them moving.",
      href: "/resources/pipeline-management/bottleneck-analysis",
      icon: AlertTriangle,
      pillar: "Pipeline Management",
    },
    {
      title: "Stage Optimization",
      description: "Fine-tune each stage of your sales pipeline for maximum efficiency and conversion.",
      href: "/resources/pipeline-management/stage-optimization",
      icon: Layers,
      pillar: "Pipeline Management",
    },
    {
      title: "Conversion Metrics",
      description: "Track and improve conversion rates at every stage with data-driven insights.",
      href: "/resources/sales-analytics/conversion-metrics",
      icon: TrendingUp,
      pillar: "Sales Analytics",
    },
    {
      title: "Sales Reporting",
      description: "Build comprehensive reports that surface bottlenecks and performance issues.",
      href: "/resources/sales-analytics/sales-reporting",
      icon: FileSpreadsheet,
      pillar: "Sales Analytics",
    },
  ];

  const relatedTopics = [
    { title: "Lead Qualification Automation", href: "/resources/topics/lead-qualification-automation" },
    { title: "Team Performance Tracking", href: "/resources/topics/team-performance-tracking" },
    { title: "CRM Data Migration", href: "/resources/topics/crm-data-migration" },
  ];

  return (
    <>
      <LandingHeader />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-background to-background" />
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/30 rounded-full blur-[128px] animate-pulse" />
            <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: "1s" }} />
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto text-center"
            >
              <span className="inline-flex items-center px-3 py-1 mb-6 text-sm font-medium rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <BarChart3 className="w-4 h-4 mr-2" />
                Pipeline Management + Sales Analytics
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
                Pipeline <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Bottleneck Analysis</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Combine pipeline visibility with advanced analytics to identify exactly where deals stall, why they stall, and how to fix it with data-driven strategies.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Overview Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto"
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">
                  Find Your <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Hidden Revenue Leaks</span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Most sales teams lose 20-40% of potential revenue to pipeline bottlenecks they cannot see. Analytics-driven analysis changes everything.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { icon: Search, title: "Identify Stall Points", description: "Pinpoint exactly which stages have the longest dwell times and highest drop-off rates." },
                  { icon: LineChart, title: "Trend Analysis", description: "Track bottleneck patterns over time to catch problems before they impact revenue." },
                  { icon: Gauge, title: "Velocity Metrics", description: "Measure deal velocity through each stage to optimize your entire sales cycle." },
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="p-6 rounded-xl bg-card border border-border"
                  >
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center mb-4">
                      <item.icon className="w-6 h-6 text-cyan-500" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Related Content Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="max-w-5xl mx-auto"
            >
              <div className="text-center mb-12">
                <span className="inline-flex items-center px-3 py-1 mb-4 text-sm font-medium rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  <Target className="w-4 h-4 mr-2" />
                  Deep Dive Resources
                </span>
                <h2 className="text-3xl font-bold mb-4">
                  Explore <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Related Content</span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Master pipeline optimization and sales analytics with these comprehensive guides.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {relatedContent.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link href={item.href} className="block group">
                      <div className="p-6 rounded-xl bg-card border border-border hover:border-cyan-500/50 transition-all duration-300 h-full">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center flex-shrink-0 group-hover:from-cyan-500/30 group-hover:to-blue-500/30 transition-colors">
                            <item.icon className="w-6 h-6 text-cyan-500" />
                          </div>
                          <div className="flex-1">
                            <span className="text-xs text-cyan-400 mb-1 block">{item.pillar}</span>
                            <h3 className="text-lg font-semibold mb-2 group-hover:text-cyan-400 transition-colors">
                              {item.title}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                            <span className="inline-flex items-center text-sm text-cyan-400 group-hover:text-cyan-300">
                              Read more
                              <ArrowRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Related Topics Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h3 className="text-xl font-semibold mb-6">Related Topics</h3>
              <div className="flex flex-wrap justify-center gap-3">
                {relatedTopics.map((topic) => (
                  <Link
                    key={topic.href}
                    href={topic.href}
                    className="px-4 py-2 rounded-full bg-card border border-border hover:border-cyan-500/50 text-sm text-muted-foreground hover:text-cyan-400 transition-all"
                  >
                    {topic.title}
                  </Link>
                ))}
              </div>
            </motion.div>
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
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Eliminate Bottlenecks</span>?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                LeadFlow provides real-time pipeline analytics that surface bottlenecks instantly. Start optimizing your sales process today.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/handler/sign-up">
                  <GlowButton size="lg" className="group">
                    Start Free Trial
                    <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </GlowButton>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <LandingFooter />
    </>
  );
}
