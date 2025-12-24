"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Megaphone,
  Target,
  Users,
  Activity,
  Filter,
  Sparkles,
  ArrowRight,
  CheckCircle,
  TrendingUp,
  DollarSign,
  Eye,
  BarChart3,
  Layers,
} from "lucide-react";
import {
  LandingHeader,
  LandingFooter,
  GlowButton,
  SectionHeading,
} from "@/components/landing";

export default function MetaAudienceTargetingPage() {
  const relatedContent = [
    {
      title: "Audience Targeting",
      href: "/resources/meta-ads/audience-targeting",
      description: "Master Meta's powerful audience targeting capabilities for lead generation.",
      icon: Target,
      pillar: "Meta Ads",
    },
    {
      title: "Ad Optimization",
      href: "/resources/meta-ads/ad-optimization",
      description: "Optimize your Meta ad campaigns for maximum lead quality and volume.",
      icon: Sparkles,
      pillar: "Meta Ads",
    },
    {
      title: "Lead Segmentation",
      href: "/resources/contact-management/lead-segmentation",
      description: "Segment your leads to mirror your Meta audience targeting strategy.",
      icon: Filter,
      pillar: "Contact Management",
    },
    {
      title: "Activity Tracking",
      href: "/resources/contact-management/activity-tracking",
      description: "Track lead engagement to improve targeting and lookalike audiences.",
      icon: Activity,
      pillar: "Contact Management",
    },
    {
      title: "Facebook Lead Ads",
      href: "/resources/meta-ads/facebook-lead-ads",
      description: "Create high-converting Facebook lead ads that sync with LeadFlow.",
      icon: Megaphone,
      pillar: "Meta Ads",
    },
  ];

  const relatedTopics = [
    {
      title: "Real Estate Lead Generation",
      href: "/resources/topics/real-estate-lead-generation",
      description: "Capture and convert property leads effectively.",
    },
    {
      title: "SaaS Pipeline Optimization",
      href: "/resources/topics/saas-pipeline-optimization",
      description: "Optimize your SaaS sales pipeline.",
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
  ];

  return (
    <div className="min-h-screen bg-background">
        <LandingHeader />
        <main>
          {/* Hero Section */}
          <section className="relative pt-32 pb-20 overflow-hidden">
            {/* Blue/Indigo gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-indigo-500/10" />
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto text-center"
              >
                <div className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  <Megaphone className="w-4 h-4 mr-2" />
                  Meta Ads + Contact Management
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                  <span className="bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
                    Meta Audience Targeting
                  </span>{" "}
                  Strategy Guide
                </h1>

                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Connect your Meta advertising with intelligent contact management to create
                  a closed-loop lead generation system. Better targeting, better leads, better results.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/handler/sign-up">
                    <GlowButton size="lg">
                      Improve Your Targeting
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </GlowButton>
                  </Link>
                  <Link href="/resources/meta-ads/audience-targeting">
                    <GlowButton variant="secondary" size="lg">
                      Explore Audience Targeting
                    </GlowButton>
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>

          {/* The Targeting Challenge */}
          <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <SectionHeading
                badge="The Challenge"
                title="Why Most Meta Ad Targeting Underperforms"
                titleGradient="Meta Ad Targeting"
                description="Without CRM integration, you're targeting blind and missing valuable optimization opportunities."
              />

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                {[
                  {
                    icon: Eye,
                    title: "No Feedback Loop",
                    description:
                      "Meta optimizes for leads, not customers. Without conversion data from your CRM, the algorithm cannot learn which leads actually close.",
                  },
                  {
                    icon: Layers,
                    title: "Generic Lookalikes",
                    description:
                      "Basic lookalike audiences are built from all leads, including low-quality ones. Your best customers should be the seed for expansion.",
                  },
                  {
                    icon: Filter,
                    title: "Disconnected Segmentation",
                    description:
                      "Your CRM segments and Meta audiences exist in separate worlds. Alignment creates targeting precision that compounds over time.",
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
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center mb-4">
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Integration Strategy */}
          <section className="py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <SectionHeading
                badge="Strategy"
                title="The CRM-Powered Targeting Strategy"
                titleGradient="CRM-Powered Targeting"
                description="Connect your CRM data to Meta for targeting that actually drives revenue."
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
                      title: "Customer Value-Based Lookalikes",
                      description:
                        "Build lookalike audiences from your highest-value customers, not just any leads. LeadFlow segments automatically sync to Meta for precision targeting.",
                    },
                    {
                      title: "Conversion Event Optimization",
                      description:
                        "Send CRM conversion events back to Meta so campaigns optimize for actual sales, not just form submissions. Watch lead quality improve dramatically.",
                    },
                    {
                      title: "Exclusion Audience Management",
                      description:
                        "Automatically exclude existing customers and active opportunities from acquisition campaigns. Stop wasting budget on people already in your pipeline.",
                    },
                    {
                      title: "Retargeting by Lead Stage",
                      description:
                        "Create dynamic retargeting audiences based on pipeline stage. Show different messaging to new leads versus stalled opportunities.",
                    },
                  ].map((strategy, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-5 h-5 text-blue-500" />
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
                  <div className="rounded-2xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-500/30 p-8">
                    <div className="flex items-center gap-2 mb-6">
                      <Target className="w-5 h-5 text-blue-400" />
                      <h3 className="text-lg font-semibold">Audience Sync Overview</h3>
                    </div>

                    {/* Data Flow Visualization */}
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-lg bg-background/50">
                          <p className="text-xs text-muted-foreground mb-1">LeadFlow Segment</p>
                          <p className="font-medium text-sm">High-Value Customers</p>
                          <p className="text-xs text-blue-400 mt-2">2,847 contacts</p>
                        </div>
                        <div className="p-4 rounded-lg bg-background/50">
                          <p className="text-xs text-muted-foreground mb-1">Meta Audience</p>
                          <p className="font-medium text-sm">1% Lookalike (US)</p>
                          <p className="text-xs text-blue-400 mt-2">2.1M reach</p>
                        </div>
                      </div>

                      <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Sync Status</span>
                          <span className="text-xs text-green-400">Active</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-background/50 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: "100%" }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, delay: 0.5 }}
                              className="h-full bg-gradient-to-r from-blue-500 to-indigo-500"
                            />
                          </div>
                          <span className="text-xs text-muted-foreground">Synced</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        <div className="p-3 rounded-lg bg-background/50 text-center">
                          <p className="text-lg font-bold text-blue-400">12</p>
                          <p className="text-xs text-muted-foreground">Audiences</p>
                        </div>
                        <div className="p-3 rounded-lg bg-background/50 text-center">
                          <p className="text-lg font-bold text-blue-400">47K</p>
                          <p className="text-xs text-muted-foreground">Contacts</p>
                        </div>
                        <div className="p-3 rounded-lg bg-background/50 text-center">
                          <p className="text-lg font-bold text-green-400">Live</p>
                          <p className="text-xs text-muted-foreground">Status</p>
                        </div>
                      </div>
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
                title="Meta Ads & Contact Management Resources"
                titleGradient="Contact Management"
                description="Everything you need to master the Meta-CRM connection."
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
                      className="block p-6 rounded-2xl bg-background border border-border hover:border-blue-500/50 transition-all hover:shadow-lg hover:shadow-blue-500/10 h-full"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center flex-shrink-0">
                          <resource.icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <span className="text-xs text-blue-400 font-medium">
                            {resource.pillar}
                          </span>
                          <h3 className="font-semibold mt-1 mb-2">{resource.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {resource.description}
                          </p>
                          <span className="inline-flex items-center text-sm text-blue-400 mt-4">
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
                title="The Impact of CRM-Powered Targeting"
                titleGradient="CRM-Powered Targeting"
                description="See what happens when Meta ads and CRM work together."
              />

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
                {[
                  {
                    icon: DollarSign,
                    metric: "45%",
                    label: "Lower Cost Per Lead",
                    description: "Better targeting means less waste and more qualified leads.",
                  },
                  {
                    icon: TrendingUp,
                    metric: "3.2x",
                    label: "Higher ROAS",
                    description: "Conversion optimization dramatically improves ad efficiency.",
                  },
                  {
                    icon: Users,
                    metric: "60%",
                    label: "Better Lead Quality",
                    description: "Lookalikes from best customers attract similar prospects.",
                  },
                  {
                    icon: BarChart3,
                    metric: "28%",
                    label: "Higher Close Rates",
                    description: "Quality leads convert at significantly higher rates.",
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
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center mx-auto mb-4">
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-4xl font-bold mb-1">
                      <span className="bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
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

          {/* Audience Types */}
          <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <SectionHeading
                badge="Audience Types"
                title="CRM-Powered Meta Audiences to Build"
                titleGradient="Meta Audiences"
                description="Create these audience types for comprehensive targeting coverage."
              />

              <div className="grid md:grid-cols-2 gap-8 mt-12">
                {[
                  {
                    title: "High-Value Customer Lookalikes",
                    description: "Seed audiences with customers who have the highest lifetime value. These lookalikes attract prospects with similar characteristics and buying patterns.",
                  },
                  {
                    title: "Fast-Close Lookalikes",
                    description: "Build audiences from leads who converted quickly. Target prospects likely to move through your pipeline faster with less friction.",
                  },
                  {
                    title: "Product-Specific Audiences",
                    description: "Create separate lookalikes for each product line based on actual customers. Target expansion opportunities with precision.",
                  },
                  {
                    title: "Exclusion Audiences",
                    description: "Automatically exclude existing customers, open opportunities, and recent lost deals from acquisition campaigns to maximize efficiency.",
                  },
                ].map((audience, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="p-8 rounded-2xl bg-gradient-to-br from-blue-500/5 to-indigo-500/5 border border-border"
                  >
                    <h3 className="text-xl font-semibold mb-3">{audience.title}</h3>
                    <p className="text-muted-foreground">{audience.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 bg-gradient-to-br from-blue-500/10 via-transparent to-indigo-500/10">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-3xl mx-auto text-center"
              >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                  Ready to Supercharge Your{" "}
                  <span className="bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
                    Meta Targeting
                  </span>
                  ?
                </h2>
                <p className="text-xl text-muted-foreground mb-8">
                  Start your free trial today and connect your CRM data to Meta
                  for targeting that actually drives revenue.
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
                      className="block p-6 rounded-2xl bg-muted/50 border border-border hover:border-blue-500/50 transition-colors group h-full"
                    >
                      <h3 className="font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                        {topic.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">{topic.description}</p>
                      <span className="inline-flex items-center text-sm text-blue-400 mt-4">
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
