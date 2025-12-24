"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  LandingHeader,
  LandingFooter,
  GlowButton,
  GradientText,
} from "@/components/landing";
import {
  ArrowRight,
  Building,
  Briefcase,
  Rocket,
  Layers,
  RefreshCw,
  CheckCircle,
  Sparkles,
  Zap,
  Target,
  Home,
} from "lucide-react";

export default function IndustryCrmSolutionsPage() {
  const linkedResources = [
    {
      title: "Real Estate CRM",
      description:
        "Discover how real estate professionals use CRM to manage listings, track buyers, and close more deals.",
      href: "/resources/industry-solutions/real-estate-crm",
      pillar: "Industry Solutions",
      icon: Home,
    },
    {
      title: "Agency CRM",
      description:
        "Learn how marketing and creative agencies leverage CRM to manage clients, projects, and revenue.",
      href: "/resources/industry-solutions/agency-crm",
      pillar: "Industry Solutions",
      icon: Briefcase,
    },
    {
      title: "SaaS Sales",
      description:
        "Explore CRM strategies designed for software companies with recurring revenue models.",
      href: "/resources/industry-solutions/saas-sales",
      pillar: "Industry Solutions",
      icon: Rocket,
    },
    {
      title: "Pipeline Setup Guide",
      description:
        "Build a pipeline that matches your industry's unique sales process and conversion milestones.",
      href: "/resources/crm-best-practices/pipeline-setup",
      pillar: "CRM Best Practices",
      icon: Layers,
    },
    {
      title: "CRM Migration Guide",
      description:
        "Smoothly transition from your current system with best practices for data migration and team adoption.",
      href: "/resources/crm-best-practices/crm-migration",
      pillar: "CRM Best Practices",
      icon: RefreshCw,
    },
  ];

  const relatedTopics = [
    {
      title: "CRM Customization Guide",
      href: "/resources/topics/crm-customization-guide",
    },
    {
      title: "Multi-Channel Lead Capture",
      href: "/resources/topics/multi-channel-lead-capture",
    },
    {
      title: "Automated Revenue Tracking",
      href: "/resources/topics/automated-revenue-tracking",
    },
  ];

  return (
    <>
      <head>
        <meta name="robots" content="noindex, follow" />
      </head>
      <div className="min-h-screen bg-background text-foreground">
        <LandingHeader />

        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-yellow-500/10" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl" />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <span className="inline-flex items-center px-3 py-1 mb-6 text-sm font-medium rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <Building className="w-4 h-4 mr-2" />
                Topic Hub
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                <GradientText>Industry-Specific</GradientText> CRM Solutions
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Every industry has unique sales processes, terminology, and
                requirements. Explore how to configure and optimize your CRM for
                your specific industry while following proven best practices for
                setup and migration.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/handler/sign-up">
                  <GlowButton size="lg">
                    Find Your Industry Solution
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </GlowButton>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Overview Section */}
        <section className="py-20 border-t border-border/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto"
            >
              <div className="text-center mb-12">
                <span className="inline-flex items-center px-3 py-1 mb-4 text-sm font-medium rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  Overview
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  CRM Success Starts with Industry Fit
                </h2>
              </div>

              <div className="prose prose-invert max-w-none">
                <p className="text-lg text-muted-foreground mb-6">
                  A real estate agent tracks properties and showings. A SaaS
                  sales rep manages subscriptions and renewals. An agency
                  handles projects and retainers. Each industry has distinct
                  workflows that demand specialized CRM configuration.
                </p>
                <p className="text-lg text-muted-foreground mb-6">
                  Generic CRM setups force teams to work around limitations,
                  creating friction and reducing adoption. Industry-optimized
                  configurations align with how your team actually works,
                  capturing the data you need and presenting it in ways that
                  make sense for your business.
                </p>
                <p className="text-lg text-muted-foreground">
                  This hub combines industry-specific solutions with foundational
                  CRM best practices. Whether you are setting up a new system or
                  migrating from an existing one, these resources help you build
                  a CRM that truly serves your industry.
                </p>
              </div>

              <div className="mt-12 grid sm:grid-cols-3 gap-6">
                {[
                  {
                    stat: "47%",
                    label: "Higher adoption with industry fit",
                    color: "from-amber-500/10 to-yellow-500/10",
                  },
                  {
                    stat: "35%",
                    label: "Faster deal velocity",
                    color: "from-yellow-500/10 to-amber-500/10",
                  },
                  {
                    stat: "60%",
                    label: "Better data quality",
                    color: "from-amber-500/10 to-orange-500/10",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`text-center p-6 bg-gradient-to-br ${item.color} rounded-xl border border-border`}
                  >
                    <div className="text-3xl font-bold text-amber-400 mb-2">
                      {item.stat}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {item.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Linked Resources Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="inline-flex items-center px-3 py-1 mb-4 text-sm font-medium rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                Deep Dive Resources
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Explore Related Guides
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Find solutions for your specific industry and learn best
                practices for CRM setup and migration.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {linkedResources.map((resource, index) => (
                <motion.div
                  key={resource.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link
                    href={resource.href}
                    className="block h-full p-6 bg-background/50 backdrop-blur-sm border border-border rounded-2xl hover:border-amber-500/50 transition-all hover:shadow-lg hover:shadow-amber-500/10"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center flex-shrink-0">
                        <resource.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <span className="text-xs font-medium text-amber-400 mb-1 block">
                          {resource.pillar}
                        </span>
                        <h3 className="text-xl font-semibold mb-2">
                          {resource.title}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-4">
                          {resource.description}
                        </p>
                        <span className="text-amber-400 text-sm font-medium inline-flex items-center">
                          Read guide <ArrowRight className="ml-1 w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Industry Selection Guide */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="inline-flex items-center px-3 py-1 mb-4 text-sm font-medium rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                Selection Guide
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Choosing the Right Industry Approach
              </h2>
            </div>

            <div className="max-w-4xl mx-auto space-y-6">
              {[
                {
                  title: "Identify Your Core Sales Process",
                  content:
                    "Start by mapping how deals actually move through your organization. Industry solutions work best when they align with your natural workflow rather than forcing you into a generic process.",
                },
                {
                  title: "Consider Industry-Specific Data",
                  content:
                    "Every industry has unique data points that matter. Real estate needs property details. SaaS needs subscription metrics. Agencies need project tracking. Choose solutions that capture what your business needs.",
                },
                {
                  title: "Plan Your Migration Carefully",
                  content:
                    "Moving to a new CRM is a significant undertaking. Follow migration best practices to preserve data integrity, maintain team productivity, and ensure a smooth transition.",
                },
                {
                  title: "Build on Best Practices",
                  content:
                    "Industry-specific features should complement, not replace, CRM fundamentals. Proper pipeline setup, clean data practices, and good user adoption principles apply across all industries.",
                },
              ].map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex gap-4 p-6 bg-background border border-border rounded-xl"
                >
                  <div className="flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-amber-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground">{step.content}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* LeadFlow Advantage */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="inline-flex items-center px-3 py-1 mb-4 text-sm font-medium rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <Zap className="w-4 h-4 mr-2" />
                LeadFlow Advantage
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Flexible CRM for Every Industry
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                LeadFlow adapts to your industry with powerful customization and
                pre-built templates.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                {
                  icon: Target,
                  title: "Industry Templates",
                  description:
                    "Start with pre-configured pipelines, fields, and automations designed for your specific industry.",
                },
                {
                  icon: Layers,
                  title: "Deep Customization",
                  description:
                    "Modify every aspect of your CRM to match your exact workflow without writing code.",
                },
                {
                  icon: RefreshCw,
                  title: "Easy Migration",
                  description:
                    "Import your existing data with built-in migration tools that preserve relationships and history.",
                },
              ].map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center p-6 bg-background border border-border rounded-xl"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-yellow-500/20 flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-6 h-6 text-amber-400" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Related Topics */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="inline-flex items-center px-3 py-1 mb-4 text-sm font-medium rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                Explore More
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Related Topics
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Continue learning with these related topic hubs.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {relatedTopics.map((topic, index) => (
                <motion.div
                  key={topic.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link
                    href={topic.href}
                    className="block p-4 bg-background border border-border rounded-xl hover:border-amber-500/50 transition-colors text-center"
                  >
                    <span className="text-foreground font-medium hover:text-amber-400 transition-colors">
                      {topic.title}
                    </span>
                    <ArrowRight className="w-4 h-4 text-muted-foreground mt-2 mx-auto" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500/20 to-yellow-500/20 border border-amber-500/30 mb-6">
                <Sparkles className="w-8 h-8 text-amber-400" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready for a CRM That Fits{" "}
                <GradientText>Your Industry</GradientText>?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                LeadFlow adapts to your business, not the other way around.
                Start with industry templates or build from scratch. Either way,
                you get a CRM that works the way you work.
              </p>
              <Link href="/handler/sign-up">
                <GlowButton size="lg">
                  Start Your Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </GlowButton>
              </Link>
            </motion.div>
          </div>
        </section>

        <LandingFooter />
      </div>
    </>
  );
}
