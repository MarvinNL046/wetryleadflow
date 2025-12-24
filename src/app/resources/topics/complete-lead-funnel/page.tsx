"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Head from "next/head";
import {
  LandingHeader,
  LandingFooter,
  GlowButton,
  GradientText,
} from "@/components/landing";
import {
  Target,
  Gauge,
  Zap,
  ArrowRight,
  CheckCircle,
  BookOpen,
  TrendingUp,
  Mail,
  LayoutGrid,
  Filter,
  Clock,
} from "lucide-react";

const linkedResources = [
  {
    title: "Lead Magnets",
    description: "Create irresistible offers that capture high-quality leads and grow your pipeline.",
    href: "/resources/lead-generation/lead-magnets",
    pillar: "Lead Generation",
    icon: Target,
  },
  {
    title: "Landing Pages",
    description: "Design conversion-optimized landing pages that turn visitors into leads.",
    href: "/resources/lead-generation/landing-pages",
    pillar: "Lead Generation",
    icon: LayoutGrid,
  },
  {
    title: "Kanban Boards",
    description: "Visualize your entire sales pipeline with intuitive drag-and-drop boards.",
    href: "/resources/pipeline-management/kanban-boards",
    pillar: "Pipeline Management",
    icon: Gauge,
  },
  {
    title: "Email Sequences",
    description: "Automate your follow-up with personalized, timed email sequences.",
    href: "/resources/sales-automation/email-sequences",
    pillar: "Sales Automation",
    icon: Mail,
  },
  {
    title: "Follow-up Automation",
    description: "Never miss a follow-up with intelligent automation triggers.",
    href: "/resources/sales-automation/follow-up-automation",
    pillar: "Sales Automation",
    icon: Clock,
  },
];

const relatedTopics = [
  { title: "Full Sales Analytics Suite", href: "/resources/topics/full-sales-analytics-suite" },
  { title: "AI-Powered Sales Stack", href: "/resources/topics/ai-powered-sales-stack" },
  { title: "Meta Ads Complete Guide", href: "/resources/topics/meta-ads-complete-guide" },
];

const benefits = [
  "End-to-end funnel visibility from lead capture to close",
  "Automated lead nurturing that works 24/7",
  "Pipeline stages optimized for conversion",
  "Intelligent follow-up sequences that increase response rates",
  "Real-time tracking of lead progression",
];

export default function CompleteLeadFunnelPage() {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex, follow" />
      </Head>
      <div className="min-h-screen bg-background">
        <LandingHeader />

        <main>
          {/* Hero Section */}
          <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-20">
            {/* Background Effects */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/30 via-blue-900/20 to-background" />
              <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-[128px] animate-pulse" />
              <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: "1s" }} />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center max-w-4xl mx-auto"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 mb-6">
                  <BookOpen className="w-4 h-4 text-purple-400" />
                  <span className="text-sm text-purple-300">Topic Hub</span>
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
                  Complete{" "}
                  <GradientText animated className="bg-gradient-to-r from-purple-400 via-violet-400 to-blue-400">
                    Lead Funnel
                  </GradientText>
                </h1>

                <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                  Master the entire lead funnel from capture to close. Combine lead generation,
                  pipeline management, and sales automation into one powerful workflow.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
                  <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 text-sm border border-purple-500/20">
                    Lead Generation
                  </span>
                  <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-300 text-sm border border-blue-500/20">
                    Pipeline Management
                  </span>
                  <span className="px-3 py-1 rounded-full bg-violet-500/10 text-violet-300 text-sm border border-violet-500/20">
                    Sales Automation
                  </span>
                </div>

                <Link href="/handler/sign-up">
                  <GlowButton size="lg" className="group">
                    Build Your Funnel Today
                    <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </GlowButton>
                </Link>
              </motion.div>
            </div>
          </section>

          {/* Benefits Section */}
          <section className="py-16 lg:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="max-w-4xl mx-auto"
              >
                <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
                  Why Build a Complete Lead Funnel?
                </h2>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-start gap-3 p-4 rounded-xl bg-card/50 border border-border/50"
                    >
                      <CheckCircle className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{benefit}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          {/* Linked Resources Section */}
          <section className="py-16 lg:py-24 bg-gradient-to-b from-background to-purple-950/10">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center mb-12"
              >
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Essential Resources
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Deep dive into each component of your complete lead funnel
                </p>
              </motion.div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {linkedResources.map((resource, index) => (
                  <motion.div
                    key={resource.href}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link href={resource.href} className="block h-full">
                      <div className="group relative h-full rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-6 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
                        <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 mb-4">
                          <resource.icon className="w-6 h-6 text-white" />
                        </div>

                        <span className="text-xs text-purple-400 font-medium mb-2 block">
                          {resource.pillar}
                        </span>

                        <h3 className="text-lg font-bold mb-2 group-hover:text-purple-400 transition-colors">
                          {resource.title}
                        </h3>

                        <p className="text-sm text-muted-foreground mb-4">
                          {resource.description}
                        </p>

                        <div className="flex items-center text-sm text-purple-400 font-medium">
                          Read Guide
                          <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Related Topics Section */}
          <section className="py-16 lg:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="max-w-3xl mx-auto"
              >
                <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
                  Related Topics
                </h2>

                <div className="grid gap-4">
                  {relatedTopics.map((topic, index) => (
                    <motion.div
                      key={topic.href}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Link href={topic.href}>
                        <div className="flex items-center justify-between p-4 rounded-xl bg-card/50 border border-border/50 hover:border-purple-500/50 transition-all duration-300 group">
                          <span className="font-medium group-hover:text-purple-400 transition-colors">
                            {topic.title}
                          </span>
                          <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-purple-400 transition-all group-hover:translate-x-1" />
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 lg:py-32 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-violet-500/10 to-blue-500/10" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center max-w-3xl mx-auto"
              >
                <TrendingUp className="w-12 h-12 text-purple-400 mx-auto mb-6" />

                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
                  Ready to Build Your{" "}
                  <GradientText className="bg-gradient-to-r from-purple-400 to-blue-400">
                    Complete Funnel?
                  </GradientText>
                </h2>

                <p className="text-lg text-muted-foreground mb-8">
                  Join thousands of sales teams using LeadFlow to build high-converting funnels.
                  Start free and see results in minutes.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href="/handler/sign-up">
                    <GlowButton size="lg" className="group">
                      Start Your Free Trial
                      <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </GlowButton>
                  </Link>
                  <Link href="/resources">
                    <GlowButton variant="secondary" size="lg">
                      Explore All Resources
                    </GlowButton>
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

