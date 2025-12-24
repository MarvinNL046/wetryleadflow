"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Building2,
  Target,
  FileText,
  Magnet,
  FormInput,
  MousePointer2,
  ArrowRight,
  CheckCircle,
  TrendingUp,
  Users,
  DollarSign,
  Clock,
} from "lucide-react";
import {
  LandingHeader,
  LandingFooter,
  GlowButton,
  SectionHeading,
} from "@/components/landing";

export default function RealEstateLeadGenerationPage() {
  const relatedContent = [
    {
      title: "Real Estate CRM",
      href: "/resources/industry-solutions/real-estate-crm",
      description: "The ultimate CRM solution built specifically for real estate agents and brokers.",
      icon: Building2,
      pillar: "Industry Solutions",
    },
    {
      title: "Lead Magnets",
      href: "/resources/lead-generation/lead-magnets",
      description: "Create irresistible offers that attract high-quality property buyers and sellers.",
      icon: Magnet,
      pillar: "Lead Generation",
    },
    {
      title: "Landing Pages",
      href: "/resources/lead-generation/landing-pages",
      description: "Design high-converting landing pages for property listings and open houses.",
      icon: FileText,
      pillar: "Lead Generation",
    },
    {
      title: "Lead Capture Tools",
      href: "/resources/lead-generation/lead-capture-tools",
      description: "Capture every website visitor and turn them into potential clients.",
      icon: MousePointer2,
      pillar: "Lead Generation",
    },
    {
      title: "Form Optimization",
      href: "/resources/lead-generation/form-optimization",
      description: "Optimize your property inquiry forms for maximum conversion rates.",
      icon: FormInput,
      pillar: "Lead Generation",
    },
  ];

  const relatedTopics = [
    {
      title: "SaaS Pipeline Optimization",
      href: "/resources/topics/saas-pipeline-optimization",
      description: "Optimize your sales pipeline for SaaS growth.",
    },
    {
      title: "AI Sales Forecasting",
      href: "/resources/topics/ai-sales-forecasting",
      description: "Predict revenue with AI-powered analytics.",
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
            {/* Amber gradient background */}
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
                <div className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20">
                  <Building2 className="w-4 h-4 mr-2" />
                  Industry Solutions + Lead Generation
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                  <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                    Real Estate Lead Generation
                  </span>{" "}
                  Mastery Guide
                </h1>

                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Combine powerful lead generation strategies with industry-specific CRM features to
                  dominate your real estate market. Learn how to capture, nurture, and convert more
                  property buyers and sellers.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/handler/sign-up">
                    <GlowButton size="lg">
                      Start Generating Leads
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

          {/* Why This Matters Section */}
          <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <SectionHeading
                badge="The Opportunity"
                title="Why Real Estate Lead Generation Requires a Specialized Approach"
                titleGradient="Specialized Approach"
                description="The real estate market demands unique lead generation tactics that generic solutions simply cannot provide."
              />

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                {[
                  {
                    icon: Target,
                    title: "Hyper-Local Targeting",
                    description:
                      "Real estate is inherently local. Your lead generation must target specific neighborhoods, school districts, and price ranges to attract qualified buyers and motivated sellers.",
                  },
                  {
                    icon: Clock,
                    title: "Time-Sensitive Decisions",
                    description:
                      "Property decisions happen quickly. A lead captured today needs immediate follow-up. Delay means losing deals to faster-responding competitors.",
                  },
                  {
                    icon: DollarSign,
                    title: "High Transaction Values",
                    description:
                      "With average commissions in the thousands, even a small improvement in lead conversion translates to significant revenue increases for your business.",
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
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Key Strategies Section */}
          <section className="py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <SectionHeading
                badge="Strategies"
                title="Essential Real Estate Lead Generation Strategies"
                titleGradient="Lead Generation Strategies"
                description="Master these proven tactics to build a consistent pipeline of qualified property leads."
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
                      title: "Property-Specific Landing Pages",
                      description:
                        "Create dedicated landing pages for each listing with virtual tours, neighborhood information, and lead capture forms that convert curious browsers into qualified leads.",
                    },
                    {
                      title: "Home Valuation Lead Magnets",
                      description:
                        "Offer instant home valuations to attract sellers. These high-intent leads are actively considering listing their property and respond well to timely follow-up.",
                    },
                    {
                      title: "Neighborhood Market Reports",
                      description:
                        "Position yourself as the local expert by offering downloadable market reports. These establish authority while capturing leads interested in specific areas.",
                    },
                    {
                      title: "Open House Registration Systems",
                      description:
                        "Replace paper sign-in sheets with digital registration that captures complete contact information and property preferences for immediate CRM entry.",
                    },
                  ].map((strategy, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-5 h-5 text-amber-500" />
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
                  <div className="aspect-square rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30 p-8 flex items-center justify-center">
                    <div className="text-center">
                      <TrendingUp className="w-24 h-24 mx-auto text-amber-500 mb-4" />
                      <p className="text-2xl font-bold">
                        <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                          3x Lead Conversion
                        </span>
                      </p>
                      <p className="text-muted-foreground">
                        When combining industry CRM with lead generation best practices
                      </p>
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
                title="Explore Real Estate Lead Generation Resources"
                titleGradient="Lead Generation Resources"
                description="Deep dive into each aspect of building your real estate lead generation system."
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
                      className="block p-6 rounded-2xl bg-background border border-border hover:border-amber-500/50 transition-all hover:shadow-lg hover:shadow-amber-500/10 h-full"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                          <resource.icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <span className="text-xs text-amber-500 font-medium">
                            {resource.pillar}
                          </span>
                          <h3 className="font-semibold mt-1 mb-2">{resource.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {resource.description}
                          </p>
                          <span className="inline-flex items-center text-sm text-amber-500 mt-4">
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

          {/* Results Section */}
          <section className="py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <SectionHeading
                badge="Results"
                title="What Real Estate Agents Achieve"
                titleGradient="Real Estate Agents"
                description="Join thousands of agents who have transformed their lead generation with LeadFlow."
              />

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
                {[
                  {
                    icon: Target,
                    metric: "250%",
                    label: "More Leads Captured",
                    description: "Average increase in monthly lead volume with optimized capture systems.",
                  },
                  {
                    icon: Clock,
                    metric: "< 2 min",
                    label: "Response Time",
                    description: "Automated responses ensure no lead waits for attention.",
                  },
                  {
                    icon: Users,
                    metric: "65%",
                    label: "Conversion Rate Increase",
                    description: "From lead to client with proper nurturing sequences.",
                  },
                  {
                    icon: DollarSign,
                    metric: "$47K",
                    label: "Average Added Revenue",
                    description: "Per year from improved lead generation and follow-up.",
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
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mx-auto mb-4">
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-4xl font-bold mb-1">
                      <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
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
                  Ready to Generate More{" "}
                  <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                    Real Estate Leads
                  </span>
                  ?
                </h2>
                <p className="text-xl text-muted-foreground mb-8">
                  Start your free trial today and discover how LeadFlow can transform
                  your real estate business with powerful lead generation and CRM features.
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
                      className="block p-6 rounded-2xl bg-muted/50 border border-border hover:border-amber-500/50 transition-colors group h-full"
                    >
                      <h3 className="font-semibold mb-2 group-hover:text-amber-500 transition-colors">
                        {topic.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">{topic.description}</p>
                      <span className="inline-flex items-center text-sm text-amber-500 mt-4">
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
