"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Briefcase,
  GitBranch,
  Settings,
  AlertTriangle,
  HandCoins,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  Clock,
  Target,
  Zap,
  Users,
} from "lucide-react";
import {
  LandingHeader,
  LandingFooter,
  GlowButton,
  GradientText,
  SectionHeading,
} from "@/components/landing";

export default function ConsultantPipelineManagementPage() {
  const linkedTopics = [
    {
      title: "Consultant CRM Solutions",
      description: "CRM strategies tailored for consultants managing multiple client engagements and proposals.",
      href: "/resources/industry-solutions/consultant-crm",
      icon: Briefcase,
      pillar: "Industry Solutions",
    },
    {
      title: "Pipeline Setup Guide",
      description: "Learn how to structure your sales pipeline stages for optimal deal progression and visibility.",
      href: "/resources/crm-best-practices/pipeline-setup",
      icon: Settings,
      pillar: "CRM Best Practices",
    },
    {
      title: "Bottleneck Analysis",
      description: "Identify and eliminate pipeline bottlenecks that slow down your deal velocity.",
      href: "/resources/pipeline-management/bottleneck-analysis",
      icon: AlertTriangle,
      pillar: "Pipeline Management",
    },
    {
      title: "Deal Tracking",
      description: "Master the art of tracking deals through every stage from initial contact to closed-won.",
      href: "/resources/crm-best-practices/deal-tracking",
      icon: HandCoins,
      pillar: "CRM Best Practices",
    },
  ];

  const relatedTopics = [
    {
      title: "Deal Velocity",
      href: "/resources/pipeline-management/deal-velocity",
    },
    {
      title: "Sales Forecasting",
      href: "/resources/pipeline-management/sales-forecasting",
    },
    {
      title: "Stage Optimization",
      href: "/resources/pipeline-management/stage-optimization",
    },
    {
      title: "Revenue Tracking",
      href: "/resources/sales-analytics/revenue-tracking",
    },
  ];

  const benefits = [
    {
      icon: GitBranch,
      title: "Visual Pipeline Control",
      description: "See all your consulting opportunities at a glance with intuitive kanban-style pipeline views.",
    },
    {
      icon: Clock,
      title: "Proposal Tracking",
      description: "Never lose track of pending proposals with automated reminders and status updates.",
    },
    {
      icon: TrendingUp,
      title: "Revenue Forecasting",
      description: "Predict future revenue with confidence based on pipeline data and historical close rates.",
    },
    {
      icon: Target,
      title: "Win Rate Optimization",
      description: "Identify patterns in won and lost deals to continuously improve your closing strategies.",
    },
  ];

  const stages = [
    {
      stage: "Initial Inquiry",
      description: "First contact from potential client. Qualify the opportunity and assess fit.",
      actions: ["Respond within 24 hours", "Schedule discovery call", "Research company background"],
    },
    {
      stage: "Discovery & Scoping",
      description: "Deep dive into client needs, challenges, and desired outcomes.",
      actions: ["Conduct needs assessment", "Document requirements", "Identify stakeholders"],
    },
    {
      stage: "Proposal Development",
      description: "Create tailored proposal addressing specific client requirements.",
      actions: ["Draft scope of work", "Calculate pricing", "Define deliverables and timeline"],
    },
    {
      stage: "Negotiation",
      description: "Address concerns, refine terms, and finalize agreement details.",
      actions: ["Handle objections", "Adjust scope if needed", "Prepare contract"],
    },
    {
      stage: "Closed Won",
      description: "Contract signed and project ready to begin.",
      actions: ["Onboard client", "Schedule kickoff", "Set up project infrastructure"],
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
        <LandingHeader />

        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          {/* Background Effects - Green Gradient */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl" />
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <div className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                <Briefcase className="w-4 h-4 mr-2" />
                Crossover Topic
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                <GradientText className="bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 bg-clip-text text-transparent">Consultant Pipeline</GradientText> Management Excellence
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Merge consultant-specific CRM strategies with advanced pipeline management
                to win more clients and grow your consulting practice predictably.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/handler/sign-up">
                  <GlowButton size="lg">
                    Optimize Your Pipeline
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </GlowButton>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Why This Matters Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Why It Matters"
              title="The Consultant Pipeline Challenge"
              titleGradient="Pipeline Challenge"
              description="Consultants need specialized pipeline management that handles long sales cycles and relationship-based selling."
            />

            <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 rounded-2xl bg-background border border-border hover:border-green-500/50 transition-all hover:shadow-lg hover:shadow-green-500/10"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mb-4">
                    <benefit.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Linked Topics Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Explore Topics"
              title="Essential Resources for Consulting Success"
              titleGradient="Consulting Success"
              description="Master these interconnected topics to build a predictable consulting business."
            />

            <div className="mt-16 grid md:grid-cols-2 gap-8">
              {linkedTopics.map((topic, index) => (
                <Link key={index} href={topic.href}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group p-8 rounded-2xl bg-muted/50 border border-border hover:border-green-500/50 transition-all hover:shadow-lg hover:shadow-green-500/10 h-full"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
                        <topic.icon className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <span className="text-xs font-medium text-green-400 uppercase tracking-wider">
                          {topic.pillar}
                        </span>
                        <h3 className="text-xl font-bold mt-1 mb-2 group-hover:text-green-400 transition-colors">
                          {topic.title}
                        </h3>
                        <p className="text-muted-foreground mb-4">{topic.description}</p>
                        <span className="text-green-500 text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                          Read more <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Pipeline Stages Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Pipeline Stages"
              title="The Ideal Consultant Pipeline"
              titleGradient="Ideal Pipeline"
              description="Structure your pipeline with these proven stages for consulting engagements."
            />

            <div className="mt-16 space-y-6">
              {stages.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 rounded-2xl bg-background border border-border hover:border-green-500/50 transition-colors"
                >
                  <div className="flex items-start gap-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0 text-white font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">{item.stage}</h3>
                      <p className="text-muted-foreground mb-4">{item.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {item.actions.map((action, idx) => (
                          <span
                            key={idx}
                            className="text-xs px-3 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/20"
                          >
                            {action}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Best Practices Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Best Practices"
              title="Pipeline Management Best Practices"
              titleGradient="Best Practices"
              description="Implement these strategies to maximize your consulting pipeline effectiveness."
            />

            <div className="mt-16 grid md:grid-cols-2 gap-6">
              {[
                {
                  title: "Qualify Early and Often",
                  description: "Don't waste time on poorly-fit opportunities. Use clear qualification criteria at each stage to focus on high-probability deals.",
                },
                {
                  title: "Set Next Steps for Every Deal",
                  description: "Every opportunity should have a clear next action with a specific date. Deals without next steps stagnate and die.",
                },
                {
                  title: "Review Pipeline Weekly",
                  description: "Schedule a weekly pipeline review to assess deal health, update stages, and identify at-risk opportunities before they slip away.",
                },
                {
                  title: "Track Stage Duration",
                  description: "Monitor how long deals spend in each stage. Unusually long durations often signal problems that need immediate attention.",
                },
              ].map((practice, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex gap-4 p-6 rounded-2xl bg-muted/50 border border-border"
                >
                  <div className="flex-shrink-0">
                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{practice.title}</h3>
                    <p className="text-muted-foreground">{practice.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Related Topics Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Related Topics"
              title="Continue Building Your Expertise"
              titleGradient="Your Expertise"
              description="Explore these related resources to further enhance your consulting practice."
            />

            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedTopics.map((topic, index) => (
                <Link key={index} href={topic.href}>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="p-4 rounded-xl bg-background border border-border hover:border-green-500/50 transition-all text-center"
                  >
                    <span className="text-sm font-medium hover:text-green-400 transition-colors">
                      {topic.title}
                    </span>
                  </motion.div>
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
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Grow Your{" "}
                <GradientText className="bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 bg-clip-text text-transparent">Consulting Business?</GradientText>
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Join thousands of consultants using LeadFlow to manage their pipeline,
                win more clients, and build predictable revenue. Start your free trial today.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/handler/sign-up">
                  <GlowButton size="lg">
                    Start Free Trial
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </GlowButton>
                </Link>
              </div>
              <p className="mt-6 text-sm text-muted-foreground">
                No credit card required. 14-day free trial with full access.
              </p>
            </motion.div>
          </div>
        </section>

        <LandingFooter />
    </div>
  );
}
