"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Building2,
  Kanban,
  TrendingUp,
  Gauge,
  ArrowRight,
  CheckCircle,
  Layers,
  Target,
  BarChart3,
  Clock,
} from "lucide-react";
import {
  LandingHeader,
  LandingFooter,
  GlowButton,
  GradientText,
} from "@/components/landing";

export default function RealEstatePipelineManagementPage() {
  const relatedContent = [
    {
      title: "Real Estate CRM",
      href: "/resources/industry-solutions/real-estate-crm",
      description:
        "Complete CRM solution designed specifically for real estate professionals to manage leads and close more deals.",
      pillar: "Industry Solutions",
    },
    {
      title: "Kanban Boards for Sales",
      href: "/resources/pipeline-management/kanban-boards",
      description:
        "Visual pipeline management with drag-and-drop functionality to track every deal from first contact to closing.",
      pillar: "Pipeline Management",
    },
    {
      title: "Stage Optimization",
      href: "/resources/pipeline-management/stage-optimization",
      description:
        "Optimize your pipeline stages to reduce bottlenecks and accelerate deals through your sales process.",
      pillar: "Pipeline Management",
    },
    {
      title: "Deal Velocity Tracking",
      href: "/resources/pipeline-management/deal-velocity",
      description:
        "Measure and improve how quickly deals move through your pipeline to forecast revenue accurately.",
      pillar: "Pipeline Management",
    },
  ];

  const relatedTopics = [
    {
      title: "SaaS Lead Generation",
      href: "/resources/topics/saas-lead-generation",
      description: "Lead generation strategies for SaaS companies",
    },
    {
      title: "Agency Team Management",
      href: "/resources/topics/agency-team-management",
      description: "Team collaboration for marketing agencies",
    },
    {
      title: "E-commerce Lead Capture",
      href: "/resources/topics/ecommerce-lead-capture",
      description: "Capture and convert e-commerce visitors",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
        <LandingHeader />
        <main>
          {/* Hero Section */}
          <section className="relative pt-32 pb-20 overflow-hidden">
            {/* Background gradient - Amber theme */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-orange-500/10" />
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto text-center"
              >
                <div className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  <Building2 className="w-4 h-4 mr-2" />
                  Topic Hub: Real Estate + Pipeline Management
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                  Master{" "}
                  <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                    Real Estate Pipeline Management
                  </span>{" "}
                  for Maximum Closings
                </h1>

                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Combine industry-specific real estate features with powerful
                  pipeline management tools to track every listing, buyer, and
                  deal through your sales process.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/handler/sign-up">
                    <GlowButton size="lg">
                      Start Free Trial
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </GlowButton>
                  </Link>
                  <Link href="/resources/industry-solutions/real-estate-crm">
                    <GlowButton variant="secondary" size="lg">
                      Explore Real Estate CRM
                    </GlowButton>
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Why This Combination Section */}
          <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <div className="inline-flex items-center px-4 py-2 mb-4 text-sm font-medium rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  Why This Matters
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Why{" "}
                  <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                    Pipeline Management
                  </span>{" "}
                  is Critical for Real Estate
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Real estate deals have unique stages from listing to closing.
                  A visual pipeline helps you track every property and client
                  without letting opportunities slip through the cracks.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    icon: Kanban,
                    title: "Visual Deal Tracking",
                    description:
                      "See every listing and buyer at a glance with customizable pipeline stages.",
                  },
                  {
                    icon: Gauge,
                    title: "Velocity Insights",
                    description:
                      "Know exactly how long deals take at each stage to identify bottlenecks.",
                  },
                  {
                    icon: Target,
                    title: "Stage Optimization",
                    description:
                      "Fine-tune your pipeline stages to match your real estate workflow.",
                  },
                  {
                    icon: BarChart3,
                    title: "Revenue Forecasting",
                    description:
                      "Predict closings and commissions based on pipeline probability.",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="p-6 rounded-2xl bg-background border border-border hover:border-amber-500/50 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mb-4">
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">
                      {item.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Related Content Section */}
          <section className="py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <div className="inline-flex items-center px-4 py-2 mb-4 text-sm font-medium rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  Deep Dive
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Explore{" "}
                  <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                    Related Resources
                  </span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Dive deeper into specific topics that combine real estate
                  industry knowledge with pipeline management best practices.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-8">
                {relatedContent.map((content, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={content.href}
                      className="block p-6 rounded-2xl bg-muted/50 border border-border hover:border-amber-500/50 transition-all group h-full"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                          <Layers className="w-5 h-5 text-amber-400" />
                        </div>
                        <span className="text-xs px-2 py-1 rounded-full bg-amber-500/10 text-amber-400">
                          {content.pillar}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-amber-400 transition-colors">
                        {content.title}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {content.description}
                      </p>
                      <span className="inline-flex items-center text-sm text-amber-400">
                        Read more <ArrowRight className="ml-1 w-4 h-4" />
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Key Benefits Section */}
          <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    What You Will{" "}
                    <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                      Achieve
                    </span>
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    Real estate professionals using LeadFlow&apos;s pipeline
                    management tools report significant improvements in deal
                    velocity and closing rates.
                  </p>
                  <ul className="space-y-4">
                    {[
                      "Track listings from lead to closing with visual pipelines",
                      "Reduce deal cycle time by identifying stage bottlenecks",
                      "Never miss a follow-up with automated stage reminders",
                      "Forecast commissions accurately with probability scoring",
                      "Collaborate with team members on shared deals",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-amber-500 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="grid grid-cols-2 gap-4"
                >
                  {[
                    { metric: "40%", label: "Faster Closings" },
                    { metric: "3x", label: "Pipeline Visibility" },
                    { metric: "25%", label: "More Deals Won" },
                    { metric: "10hrs", label: "Saved Weekly" },
                  ].map((stat, index) => (
                    <div
                      key={index}
                      className="p-6 rounded-2xl bg-background border border-border text-center"
                    >
                      <p className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                        {stat.metric}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </section>

          {/* Related Topics Section */}
          <section className="py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <div className="inline-flex items-center px-4 py-2 mb-4 text-sm font-medium rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  Explore More
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Related{" "}
                  <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                    Topics
                  </span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Discover other topic hubs that combine industry solutions with
                  powerful CRM features.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-6">
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
                      className="block p-6 rounded-2xl bg-muted/50 border border-border hover:border-amber-500/50 transition-all group"
                    >
                      <h3 className="font-semibold mb-2 group-hover:text-amber-400 transition-colors">
                        {topic.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {topic.description}
                      </p>
                      <span className="inline-flex items-center text-sm text-amber-400 mt-4">
                        Explore <ArrowRight className="ml-1 w-4 h-4" />
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 bg-gradient-to-br from-amber-500/10 via-transparent to-orange-500/10">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-3xl mx-auto text-center"
              >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                  Ready to Transform Your{" "}
                  <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                    Real Estate Pipeline
                  </span>
                  ?
                </h2>
                <p className="text-xl text-muted-foreground mb-8">
                  Join thousands of real estate professionals who use LeadFlow
                  to manage their pipeline visually and close more deals. Start
                  your free trial today.
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
        </main>
        <LandingFooter />
    </div>
  );
}
