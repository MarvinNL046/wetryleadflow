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
  Megaphone,
  Globe,
  Target,
  Smartphone,
  CheckCircle,
  Sparkles,
  Zap,
  MousePointer,
} from "lucide-react";

export default function MultiChannelLeadCapturePage() {
  const linkedResources = [
    {
      title: "Lead Capture Tools",
      description:
        "Discover the essential tools and techniques to capture leads effectively from every touchpoint.",
      href: "/resources/lead-generation/lead-capture-tools",
      pillar: "Lead Generation",
      icon: MousePointer,
    },
    {
      title: "Traffic Sources",
      description:
        "Learn how to leverage different traffic sources to maximize your lead generation potential.",
      href: "/resources/lead-generation/traffic-sources",
      pillar: "Lead Generation",
      icon: Globe,
    },
    {
      title: "Facebook Lead Ads",
      description:
        "Master Facebook Lead Ads to capture high-quality leads directly within the platform.",
      href: "/resources/meta-ads/facebook-lead-ads",
      pillar: "Meta Ads",
      icon: Megaphone,
    },
    {
      title: "Instagram Lead Generation",
      description:
        "Tap into Instagram's visual platform to generate and nurture leads for your business.",
      href: "/resources/meta-ads/instagram-lead-generation",
      pillar: "Meta Ads",
      icon: Smartphone,
    },
  ];

  const relatedTopics = [
    {
      title: "CRM Customization Guide",
      href: "/resources/topics/crm-customization-guide",
    },
    {
      title: "AI Contact Management",
      href: "/resources/topics/ai-contact-management",
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
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-cyan-500/10" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <span className="inline-flex items-center px-3 py-1 mb-6 text-sm font-medium rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <Target className="w-4 h-4 mr-2" />
                Topic Hub
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                Master{" "}
                <GradientText>Multi-Channel Lead Capture</GradientText>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Combine powerful lead generation strategies with Meta advertising
                to capture prospects from every channel. Learn to build a
                comprehensive lead capture system that feeds your pipeline
                consistently.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/handler/sign-up">
                  <GlowButton size="lg">
                    Capture More Leads Today
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
                <span className="inline-flex items-center px-3 py-1 mb-4 text-sm font-medium rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  Overview
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  The Power of Multi-Channel Lead Generation
                </h2>
              </div>

              <div className="prose prose-invert max-w-none">
                <p className="text-lg text-muted-foreground mb-6">
                  Modern buyers do not follow a linear path. They discover brands
                  on social media, research on websites, engage through ads, and
                  convert through multiple touchpoints. Relying on a single
                  channel leaves money on the table and creates dangerous
                  dependencies.
                </p>
                <p className="text-lg text-muted-foreground mb-6">
                  The combination of organic lead generation strategies with paid
                  Meta advertising creates a powerful engine for consistent lead
                  flow. While organic methods build long-term assets, paid
                  campaigns provide immediate results and precise targeting
                  capabilities.
                </p>
                <p className="text-lg text-muted-foreground">
                  This hub brings together resources from lead generation
                  fundamentals and Meta ads mastery, helping you build a
                  comprehensive capture system that reaches prospects wherever
                  they are.
                </p>
              </div>

              <div className="mt-12 grid sm:grid-cols-3 gap-6">
                {[
                  {
                    stat: "3.5x",
                    label: "More leads with multi-channel",
                    color: "from-blue-500/10 to-cyan-500/10",
                  },
                  {
                    stat: "68%",
                    label: "Lower cost per lead",
                    color: "from-cyan-500/10 to-blue-500/10",
                  },
                  {
                    stat: "52%",
                    label: "Higher conversion rates",
                    color: "from-blue-500/10 to-indigo-500/10",
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
                    <div className="text-3xl font-bold text-blue-400 mb-2">
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
              <span className="inline-flex items-center px-3 py-1 mb-4 text-sm font-medium rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                Deep Dive Resources
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Explore Related Guides
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Master each channel with these in-depth guides covering lead
                generation and Meta advertising strategies.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
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
                    className="block h-full p-6 bg-background/50 backdrop-blur-sm border border-border rounded-2xl hover:border-blue-500/50 transition-all hover:shadow-lg hover:shadow-blue-500/10"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                        <resource.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <span className="text-xs font-medium text-blue-400 mb-1 block">
                          {resource.pillar}
                        </span>
                        <h3 className="text-xl font-semibold mb-2">
                          {resource.title}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-4">
                          {resource.description}
                        </p>
                        <span className="text-blue-400 text-sm font-medium inline-flex items-center">
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

        {/* Channel Strategy */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="inline-flex items-center px-3 py-1 mb-4 text-sm font-medium rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                Strategy
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Building Your Multi-Channel Strategy
              </h2>
            </div>

            <div className="max-w-4xl mx-auto space-y-6">
              {[
                {
                  title: "Diversify Your Traffic Sources",
                  content:
                    "Do not rely on a single channel. Combine organic search, social media, paid advertising, and referral traffic to create a resilient lead generation system that is not vulnerable to algorithm changes.",
                },
                {
                  title: "Align Messaging Across Channels",
                  content:
                    "Maintain consistent brand voice and value propositions across all channels while adapting format and style to each platform's unique characteristics and audience expectations.",
                },
                {
                  title: "Optimize for Platform-Specific Behavior",
                  content:
                    "Facebook users scroll feeds differently than Instagram users browse stories. Tailor your lead capture approach to match how people naturally use each platform.",
                },
                {
                  title: "Centralize Lead Data",
                  content:
                    "Feed leads from all channels into a unified CRM system. This enables consistent follow-up, accurate attribution, and comprehensive analytics across your entire funnel.",
                },
              ].map((strategy, index) => (
                <motion.div
                  key={strategy.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex gap-4 p-6 bg-background border border-border rounded-xl"
                >
                  <div className="flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      {strategy.title}
                    </h3>
                    <p className="text-muted-foreground">{strategy.content}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Integration Benefits */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="inline-flex items-center px-3 py-1 mb-4 text-sm font-medium rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <Zap className="w-4 h-4 mr-2" />
                LeadFlow Advantage
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Unified Lead Capture with LeadFlow
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                LeadFlow connects all your lead sources into one powerful system.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                {
                  title: "Native Meta Integration",
                  description:
                    "Leads from Facebook and Instagram ads flow directly into LeadFlow within seconds, ready for immediate follow-up.",
                },
                {
                  title: "Multi-Source Attribution",
                  description:
                    "Track which channels and campaigns generate your best leads with comprehensive attribution reporting.",
                },
                {
                  title: "Instant Notifications",
                  description:
                    "Get alerted the moment a new lead arrives from any channel, ensuring fast response times.",
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
              <span className="inline-flex items-center px-3 py-1 mb-4 text-sm font-medium rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
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
                    className="block p-4 bg-background border border-border rounded-xl hover:border-blue-500/50 transition-colors text-center"
                  >
                    <span className="text-foreground font-medium hover:text-blue-400 transition-colors">
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
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 mb-6">
                <Sparkles className="w-8 h-8 text-blue-400" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Capture Leads from{" "}
                <GradientText>Every Channel</GradientText>?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                LeadFlow unifies your lead capture across all channels. Stop
                losing leads to fragmented systems and start converting more
                prospects into customers.
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
