"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Rocket,
  Globe,
  FileInput,
  Target,
  ArrowRight,
  CheckCircle,
  Layers,
  Users,
  TrendingUp,
  Zap,
} from "lucide-react";
import {
  LandingHeader,
  LandingFooter,
  GlowButton,
  GradientText,
} from "@/components/landing";

export default function SaaSLeadGenerationPage() {
  const relatedContent = [
    {
      title: "SaaS Sales CRM",
      href: "/resources/industry-solutions/saas-sales",
      description:
        "Purpose-built CRM for SaaS companies to manage trials, demos, and subscription conversions.",
      pillar: "Industry Solutions",
    },
    {
      title: "Landing Page Optimization",
      href: "/resources/lead-generation/landing-pages",
      description:
        "Create high-converting landing pages that capture leads and drive trial signups.",
      pillar: "Lead Generation",
    },
    {
      title: "Lead Capture Tools",
      href: "/resources/lead-generation/lead-capture-tools",
      description:
        "Comprehensive toolkit for capturing leads from websites, ads, and social channels.",
      pillar: "Lead Generation",
    },
    {
      title: "Traffic Sources",
      href: "/resources/lead-generation/traffic-sources",
      description:
        "Identify and optimize the traffic sources that generate your highest-quality SaaS leads.",
      pillar: "Lead Generation",
    },
  ];

  const relatedTopics = [
    {
      title: "Real Estate Pipeline Management",
      href: "/resources/topics/real-estate-pipeline-management",
      description: "Pipeline management for real estate professionals",
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
            {/* Background gradient - Blue theme */}
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
                <div className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  <Rocket className="w-4 h-4 mr-2" />
                  Topic Hub: SaaS + Lead Generation
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                  Supercharge{" "}
                  <span className="bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">
                    SaaS Lead Generation
                  </span>{" "}
                  and Convert More Trials
                </h1>

                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Combine SaaS-specific CRM features with powerful lead
                  generation tools to fill your pipeline with qualified trials
                  and convert them into paying customers.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/handler/sign-up">
                    <GlowButton size="lg">
                      Start Free Trial
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </GlowButton>
                  </Link>
                  <Link href="/resources/industry-solutions/saas-sales">
                    <GlowButton variant="secondary" size="lg">
                      Explore SaaS CRM
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
                <div className="inline-flex items-center px-4 py-2 mb-4 text-sm font-medium rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  Why This Matters
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Why{" "}
                  <span className="bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">
                    Lead Generation
                  </span>{" "}
                  is Critical for SaaS Growth
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  SaaS companies live and die by their pipeline. Consistent lead
                  generation combined with smart nurturing is the key to
                  predictable MRR growth.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    icon: Globe,
                    title: "Multi-Channel Capture",
                    description:
                      "Capture leads from your website, content, ads, and product trials in one place.",
                  },
                  {
                    icon: FileInput,
                    title: "Smart Forms",
                    description:
                      "Progressive profiling forms that capture more data without overwhelming prospects.",
                  },
                  {
                    icon: Target,
                    title: "Lead Scoring",
                    description:
                      "Automatically score leads based on engagement and fit to prioritize sales effort.",
                  },
                  {
                    icon: TrendingUp,
                    title: "Conversion Tracking",
                    description:
                      "Track the entire journey from visitor to trial to paid customer.",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="p-6 rounded-2xl bg-background border border-border hover:border-blue-500/50 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-4">
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
                <div className="inline-flex items-center px-4 py-2 mb-4 text-sm font-medium rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  Deep Dive
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Explore{" "}
                  <span className="bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">
                    Related Resources
                  </span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Dive deeper into specific topics that combine SaaS industry
                  knowledge with lead generation best practices.
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
                      className="block p-6 rounded-2xl bg-muted/50 border border-border hover:border-blue-500/50 transition-all group h-full"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                          <Layers className="w-5 h-5 text-blue-400" />
                        </div>
                        <span className="text-xs px-2 py-1 rounded-full bg-blue-500/10 text-blue-400">
                          {content.pillar}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                        {content.title}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {content.description}
                      </p>
                      <span className="inline-flex items-center text-sm text-blue-400">
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
                    <span className="bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">
                      Achieve
                    </span>
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    SaaS companies using LeadFlow&apos;s lead generation tools
                    report significant improvements in trial signups and
                    conversion rates.
                  </p>
                  <ul className="space-y-4">
                    {[
                      "Capture leads from every channel automatically",
                      "Score leads by engagement and product-market fit",
                      "Nurture trials with automated email sequences",
                      "Track conversion metrics from visitor to customer",
                      "Identify your highest-performing traffic sources",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5" />
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
                    { metric: "3x", label: "More Qualified Leads" },
                    { metric: "45%", label: "Higher Trial Conversion" },
                    { metric: "60%", label: "Faster Lead Response" },
                    { metric: "2x", label: "MRR Growth Rate" },
                  ].map((stat, index) => (
                    <div
                      key={index}
                      className="p-6 rounded-2xl bg-background border border-border text-center"
                    >
                      <p className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">
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
                <div className="inline-flex items-center px-4 py-2 mb-4 text-sm font-medium rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  Explore More
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Related{" "}
                  <span className="bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">
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
                      className="block p-6 rounded-2xl bg-muted/50 border border-border hover:border-blue-500/50 transition-all group"
                    >
                      <h3 className="font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                        {topic.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {topic.description}
                      </p>
                      <span className="inline-flex items-center text-sm text-blue-400 mt-4">
                        Explore <ArrowRight className="ml-1 w-4 h-4" />
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 bg-gradient-to-br from-blue-500/10 via-transparent to-cyan-500/10">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-3xl mx-auto text-center"
              >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                  Ready to Accelerate{" "}
                  <span className="bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">
                    SaaS Growth
                  </span>
                  ?
                </h2>
                <p className="text-xl text-muted-foreground mb-8">
                  Join thousands of SaaS companies who use LeadFlow to generate
                  more leads, convert more trials, and grow MRR predictably.
                  Start your free trial today.
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
