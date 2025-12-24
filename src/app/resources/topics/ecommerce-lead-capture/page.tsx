"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  FileInput,
  Gift,
  Globe,
  ArrowRight,
  CheckCircle,
  Layers,
  MousePointer,
  Mail,
  TrendingUp,
} from "lucide-react";
import {
  LandingHeader,
  LandingFooter,
  GlowButton,
  GradientText,
} from "@/components/landing";

export default function EcommerceLeadCapturePage() {
  const relatedContent = [
    {
      title: "E-commerce Lead Management",
      href: "/resources/industry-solutions/ecommerce-leads",
      description:
        "Complete solution for e-commerce businesses to capture, nurture, and convert visitors into customers.",
      pillar: "Industry Solutions",
    },
    {
      title: "Form Optimization",
      href: "/resources/lead-generation/form-optimization",
      description:
        "Optimize your forms for maximum conversions with A/B testing and smart field logic.",
      pillar: "Lead Generation",
    },
    {
      title: "Lead Magnets",
      href: "/resources/lead-generation/lead-magnets",
      description:
        "Create irresistible offers that capture email addresses and build your customer list.",
      pillar: "Lead Generation",
    },
    {
      title: "Landing Pages",
      href: "/resources/lead-generation/landing-pages",
      description:
        "Design high-converting landing pages that turn visitors into leads and customers.",
      pillar: "Lead Generation",
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
      title: "Consultant Client Tracking",
      href: "/resources/topics/consultant-client-tracking",
      description: "Client management for consultants",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
        <LandingHeader />
        <main>
          {/* Hero Section */}
          <section className="relative pt-32 pb-20 overflow-hidden">
            {/* Background gradient - Orange theme */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-red-500/10" />
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-500/20 rounded-full blur-3xl" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto text-center"
              >
                <div className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Topic Hub: E-commerce + Lead Capture
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                  Maximize{" "}
                  <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                    E-commerce Lead Capture
                  </span>{" "}
                  and Grow Revenue
                </h1>

                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Combine e-commerce-specific features with powerful lead
                  capture tools to convert more visitors into subscribers and
                  customers.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/handler/sign-up">
                    <GlowButton size="lg">
                      Start Free Trial
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </GlowButton>
                  </Link>
                  <Link href="/resources/industry-solutions/ecommerce-leads">
                    <GlowButton variant="secondary" size="lg">
                      Explore E-commerce Solution
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
                <div className="inline-flex items-center px-4 py-2 mb-4 text-sm font-medium rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20">
                  Why This Matters
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Why{" "}
                  <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                    Lead Capture
                  </span>{" "}
                  is Critical for E-commerce
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Most e-commerce visitors leave without buying. Effective lead
                  capture turns those visitors into subscribers you can nurture
                  into repeat customers.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    icon: MousePointer,
                    title: "Exit Intent Popups",
                    description:
                      "Capture leaving visitors with targeted offers before they abandon your site.",
                  },
                  {
                    icon: Gift,
                    title: "Lead Magnets",
                    description:
                      "Offer discounts, guides, or exclusive content in exchange for email addresses.",
                  },
                  {
                    icon: FileInput,
                    title: "Smart Forms",
                    description:
                      "Optimize forms for conversions with fewer fields and better design.",
                  },
                  {
                    icon: Mail,
                    title: "Email Sequences",
                    description:
                      "Nurture captured leads with automated welcome and promotional sequences.",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="p-6 rounded-2xl bg-background border border-border hover:border-orange-500/50 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center mb-4">
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
                <div className="inline-flex items-center px-4 py-2 mb-4 text-sm font-medium rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20">
                  Deep Dive
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Explore{" "}
                  <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                    Related Resources
                  </span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Dive deeper into specific topics that combine e-commerce
                  industry knowledge with lead capture best practices.
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
                      className="block p-6 rounded-2xl bg-muted/50 border border-border hover:border-orange-500/50 transition-all group h-full"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
                          <Layers className="w-5 h-5 text-orange-400" />
                        </div>
                        <span className="text-xs px-2 py-1 rounded-full bg-orange-500/10 text-orange-400">
                          {content.pillar}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-orange-400 transition-colors">
                        {content.title}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {content.description}
                      </p>
                      <span className="inline-flex items-center text-sm text-orange-400">
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
                    <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                      Achieve
                    </span>
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    E-commerce businesses using LeadFlow&apos;s lead capture
                    tools report significant improvements in list growth and
                    customer lifetime value.
                  </p>
                  <ul className="space-y-4">
                    {[
                      "Capture 3x more emails with optimized forms and popups",
                      "Convert abandoned carts with targeted recovery sequences",
                      "Build customer loyalty with personalized email journeys",
                      "Increase repeat purchases with smart segmentation",
                      "Track ROI from lead capture to purchase",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-orange-500 mt-0.5" />
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
                    { metric: "3x", label: "Email List Growth" },
                    { metric: "25%", label: "Cart Recovery Rate" },
                    { metric: "40%", label: "Higher CLV" },
                    { metric: "5x", label: "Email ROI" },
                  ].map((stat, index) => (
                    <div
                      key={index}
                      className="p-6 rounded-2xl bg-background border border-border text-center"
                    >
                      <p className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
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
                <div className="inline-flex items-center px-4 py-2 mb-4 text-sm font-medium rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20">
                  Explore More
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Related{" "}
                  <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
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
                      className="block p-6 rounded-2xl bg-muted/50 border border-border hover:border-orange-500/50 transition-all group"
                    >
                      <h3 className="font-semibold mb-2 group-hover:text-orange-400 transition-colors">
                        {topic.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {topic.description}
                      </p>
                      <span className="inline-flex items-center text-sm text-orange-400 mt-4">
                        Explore <ArrowRight className="ml-1 w-4 h-4" />
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 bg-gradient-to-br from-orange-500/10 via-transparent to-red-500/10">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-3xl mx-auto text-center"
              >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                  Ready to Capture More{" "}
                  <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                    E-commerce Leads
                  </span>
                  ?
                </h2>
                <p className="text-xl text-muted-foreground mb-8">
                  Join thousands of e-commerce businesses who use LeadFlow to
                  capture more leads, nurture subscribers, and drive repeat
                  purchases. Start your free trial today.
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
