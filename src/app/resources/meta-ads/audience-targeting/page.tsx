"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  LandingHeader,
  LandingFooter,
  GlowButton,
  GradientText,
  SectionHeading,
} from "@/components/landing";
import {
  ArrowRight,
  CheckCircle2,
  Target,
  Users,
  UserPlus,
  RefreshCw,
  Brain,
  BarChart3,
  Layers,
  Crosshair,
  Globe,
  Briefcase,
  Heart,
  DollarSign,
} from "lucide-react";

export default function AudienceTargetingPage() {
  return (
    <div className="min-h-screen bg-background">
      <LandingHeader />
      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-background to-background" />
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-500/30 rounded-full blur-[128px] animate-pulse" />
            <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-[128px] animate-pulse" />
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto text-center"
            >
              <span className="inline-flex items-center px-3 py-1 mb-6 text-sm font-medium rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                Meta Ads Integration
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
                Audience Targeting for{" "}
                <GradientText>Lead Generation</GradientText>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Master Meta&apos;s powerful audience targeting capabilities to reach
                your ideal customers. Learn how to build, refine, and optimize
                audiences for maximum lead quality and conversion.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/handler/sign-up">
                  <GlowButton size="lg" className="group">
                    Start Targeting Smarter
                    <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </GlowButton>
                </Link>
                <Link
                  href="/resources/meta-ads/ad-optimization"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Ad Optimization Guide →
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Why Targeting Matters Section */}
        <section className="py-20 border-t border-border/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Why <GradientText>Audience Targeting</GradientText> Matters
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  The difference between a successful lead generation campaign and
                  a wasteful one often comes down to targeting. Meta&apos;s advertising
                  platform gives you access to one of the most sophisticated
                  targeting systems ever created, with data on over 3 billion
                  users across Facebook, Instagram, and the Audience Network.
                </p>
                <p className="text-lg text-muted-foreground mb-6">
                  Effective targeting isn&apos;t just about reaching more people; it&apos;s
                  about reaching the right people at the right time with the right
                  message. When your ads appear in front of highly qualified
                  prospects, your cost-per-lead drops, lead quality improves, and
                  your sales team spends less time filtering out unqualified
                  contacts.
                </p>
                <p className="text-lg text-muted-foreground">
                  LeadFlow takes this even further by syncing your CRM data back
                  to Meta, enabling powerful targeting strategies based on your
                  actual customer data and conversion patterns.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative"
              >
                <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 via-cyan-500/20 to-blue-500/20 rounded-3xl blur-2xl opacity-60" />
                <div className="relative rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl p-8">
                  <h3 className="text-xl font-semibold mb-6">
                    Impact of Better Targeting
                  </h3>
                  <div className="space-y-6">
                    {[
                      {
                        metric: "40%",
                        label: "Lower Cost Per Lead",
                        description:
                          "With precise targeting vs. broad audiences",
                      },
                      {
                        metric: "3x",
                        label: "Higher Conversion Rate",
                        description:
                          "When using lookalike audiences from CRM data",
                      },
                      {
                        metric: "60%",
                        label: "Better Lead Quality",
                        description:
                          "Using Custom Audiences from existing customers",
                      },
                      {
                        metric: "25%",
                        label: "Faster Sales Cycles",
                        description:
                          "With pre-qualified, properly targeted leads",
                      },
                    ].map((stat) => (
                      <div key={stat.label} className="flex items-start gap-4">
                        <div className="text-3xl font-bold text-purple-400">
                          {stat.metric}
                        </div>
                        <div>
                          <div className="font-medium">{stat.label}</div>
                          <div className="text-sm text-muted-foreground">
                            {stat.description}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Audience Types Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Audience Types"
              title="Understanding Meta Audience Types"
              titleGradient="Audience Types"
              description="Meta offers three main audience types, each serving different purposes in your lead generation strategy."
            />

            <div className="mt-16 grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Users,
                  title: "Custom Audiences",
                  description:
                    "Target people who have already interacted with your business. Upload customer lists, retarget website visitors, or engage users who've interacted with your content.",
                  useCases: [
                    "Retarget past website visitors",
                    "Re-engage existing customers",
                    "Upload CRM contact lists",
                    "Target video viewers",
                    "Reach form abandoners",
                  ],
                  bestFor: "Mid-to-bottom funnel campaigns",
                },
                {
                  icon: UserPlus,
                  title: "Lookalike Audiences",
                  description:
                    "Reach new people who share characteristics with your best customers. Meta's AI finds users similar to your source audience, expanding your reach to qualified prospects.",
                  useCases: [
                    "Scale beyond existing audience",
                    "Find similar high-value customers",
                    "Expand to new markets",
                    "Test new demographics",
                    "Prospect efficiently",
                  ],
                  bestFor: "Top-to-mid funnel expansion",
                },
                {
                  icon: Crosshair,
                  title: "Detailed Targeting",
                  description:
                    "Target based on demographics, interests, and behaviors. Combine multiple criteria to create highly specific audience segments for your campaigns.",
                  useCases: [
                    "Reach specific job titles",
                    "Target by interests",
                    "Filter by purchase behavior",
                    "Segment by life events",
                    "Focus on income levels",
                  ],
                  bestFor: "Cold prospecting and awareness",
                },
              ].map((audience, index) => (
                <motion.div
                  key={audience.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-8 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center mb-4">
                    <audience.icon className="w-6 h-6 text-purple-500" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{audience.title}</h3>
                  <p className="text-muted-foreground text-sm mb-6">
                    {audience.description}
                  </p>
                  <div className="space-y-3 mb-4">
                    {audience.useCases.map((useCase, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{useCase}</span>
                      </div>
                    ))}
                  </div>
                  <div className="pt-4 border-t border-border/50">
                    <span className="text-xs text-purple-400">Best for: </span>
                    <span className="text-xs text-muted-foreground">
                      {audience.bestFor}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Detailed Targeting Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Targeting Options"
              title="Detailed Targeting Categories"
              titleGradient="Targeting Categories"
              description="Explore the full range of targeting options available for lead generation campaigns."
            />

            <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Globe,
                  title: "Demographics",
                  items: [
                    "Age and gender",
                    "Education level",
                    "Relationship status",
                    "Parental status",
                    "Generation (Gen Z, Millennial, etc.)",
                    "Home ownership",
                  ],
                },
                {
                  icon: Heart,
                  title: "Interests",
                  items: [
                    "Business and industry",
                    "Entertainment",
                    "Family and relationships",
                    "Fitness and wellness",
                    "Food and drink",
                    "Hobbies and activities",
                  ],
                },
                {
                  icon: Briefcase,
                  title: "Behaviors",
                  items: [
                    "Purchase behavior",
                    "Device usage",
                    "Travel patterns",
                    "Digital activities",
                    "Consumer classification",
                    "Business purchase intent",
                  ],
                },
                {
                  icon: DollarSign,
                  title: "B2B Targeting",
                  items: [
                    "Job titles",
                    "Industries",
                    "Company size",
                    "Seniority level",
                    "Office type",
                    "Business decision makers",
                  ],
                },
              ].map((category, index) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm"
                >
                  <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4">
                    <category.icon className="w-5 h-5 text-purple-500" />
                  </div>
                  <h3 className="text-lg font-semibold mb-4">{category.title}</h3>
                  <ul className="space-y-2">
                    {category.items.map((item, i) => (
                      <li key={i} className="text-sm text-muted-foreground">
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Lookalike Strategy Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <SectionHeading
                badge="Advanced Strategy"
                title="Building Effective Lookalike Audiences"
                titleGradient="Lookalike Audiences"
                description="Lookalike audiences are your most powerful tool for scaling lead generation. Here's how to use them effectively."
              />

              <div className="mt-12 space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="p-8 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm"
                >
                  <h3 className="text-xl font-semibold mb-4">
                    1. Start with Quality Source Audiences
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Your lookalike audience is only as good as your source
                    audience. Instead of using all website visitors or all leads,
                    create source audiences from your highest-value segments.
                    Consider using converters, repeat customers, or leads with
                    high AI scores from LeadFlow.
                  </p>
                  <p className="text-muted-foreground">
                    LeadFlow&apos;s bi-directional sync makes this easy. Automatically
                    create Custom Audiences from contacts that match specific
                    criteria in your CRM, such as customers with lifetime value
                    above a certain threshold or leads that converted within a
                    specific timeframe.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="p-8 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm"
                >
                  <h3 className="text-xl font-semibold mb-4">
                    2. Test Different Lookalike Percentages
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Meta allows you to create lookalike audiences ranging from 1%
                    to 10% of the population in your target country. A 1%
                    lookalike is the most similar to your source audience but
                    smaller in size, while 10% is larger but less similar.
                  </p>
                  <div className="grid md:grid-cols-3 gap-4 mt-6">
                    <div className="p-4 rounded-xl bg-muted/30 border border-border/30">
                      <div className="text-2xl font-bold text-purple-400 mb-1">
                        1-2%
                      </div>
                      <div className="text-sm font-medium mb-2">High Quality</div>
                      <div className="text-xs text-muted-foreground">
                        Best for premium offers and high-ticket items
                      </div>
                    </div>
                    <div className="p-4 rounded-xl bg-muted/30 border border-border/30">
                      <div className="text-2xl font-bold text-blue-400 mb-1">
                        3-5%
                      </div>
                      <div className="text-sm font-medium mb-2">Balanced</div>
                      <div className="text-xs text-muted-foreground">
                        Good balance of quality and reach for most campaigns
                      </div>
                    </div>
                    <div className="p-4 rounded-xl bg-muted/30 border border-border/30">
                      <div className="text-2xl font-bold text-cyan-400 mb-1">
                        6-10%
                      </div>
                      <div className="text-sm font-medium mb-2">Scale Focus</div>
                      <div className="text-xs text-muted-foreground">
                        Maximum reach for awareness and high-volume goals
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="p-8 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm"
                >
                  <h3 className="text-xl font-semibold mb-4">
                    3. Layer Lookalikes with Detailed Targeting
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    While Meta generally recommends keeping lookalike audiences
                    broad, strategic layering can improve results for some
                    campaigns. Consider adding interest or behavioral targeting
                    on top of your lookalike to further refine your audience.
                  </p>
                  <p className="text-muted-foreground">
                    For example, if you&apos;re selling B2B software, you might create
                    a lookalike of your best customers and then layer on job
                    title or industry targeting to ensure you&apos;re reaching
                    decision-makers.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* LeadFlow Integration Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="LeadFlow Advantage"
              title="Supercharge Targeting with LeadFlow"
              titleGradient="LeadFlow"
              description="Leverage your CRM data to create more effective audiences and continuously optimize targeting."
            />

            <div className="mt-16 grid md:grid-cols-2 gap-8">
              {[
                {
                  icon: RefreshCw,
                  title: "Automatic Audience Sync",
                  description:
                    "LeadFlow automatically syncs your CRM segments to Meta as Custom Audiences. Create audiences based on lead score, deal stage, customer lifetime value, or any custom property.",
                },
                {
                  icon: Brain,
                  title: "AI-Powered Segmentation",
                  description:
                    "Our AI analyzes your lead and customer data to identify the characteristics that predict conversion. Use these insights to build more effective source audiences for lookalikes.",
                },
                {
                  icon: Target,
                  title: "Exclusion Audiences",
                  description:
                    "Automatically exclude existing customers and active leads from acquisition campaigns. Stop wasting budget on people already in your pipeline or customer base.",
                },
                {
                  icon: BarChart3,
                  title: "Audience Performance Analytics",
                  description:
                    "Track which audiences generate not just leads, but leads that convert. Understand true cost-per-customer by audience segment and optimize accordingly.",
                },
                {
                  icon: Layers,
                  title: "Dynamic Audience Updates",
                  description:
                    "As contacts move through your pipeline in LeadFlow, their audience memberships update automatically. Retarget based on real-time CRM status.",
                },
                {
                  icon: Users,
                  title: "Customer Value Lookalikes",
                  description:
                    "Build lookalike audiences from your highest-value customers, not just all customers. LeadFlow's revenue tracking helps identify your best customers for lookalike seeding.",
                },
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-purple-500" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative max-w-4xl mx-auto"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 via-cyan-500/20 to-blue-500/20 rounded-3xl blur-2xl opacity-60" />
              <div className="relative p-12 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Target Your <GradientText>Ideal Customers</GradientText>
                </h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Connect LeadFlow to your Meta Ads account and start building
                  audiences that actually convert. Free trial includes full
                  audience sync capabilities.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href="/handler/sign-up">
                    <GlowButton size="lg" className="group">
                      Start Free Trial
                      <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </GlowButton>
                  </Link>
                  <Link
                    href="/resources/meta-ads/ad-optimization"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Optimize Your Ads →
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Related Resources */}
        <section className="py-20 border-t border-border/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-8 text-center">
              Related Resources
            </h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                {
                  title: "Meta Lead Form Optimization",
                  description:
                    "Create high-converting lead forms that capture quality leads.",
                  href: "/resources/meta-ads/meta-lead-forms",
                },
                {
                  title: "Ad Optimization Strategies",
                  description:
                    "Maximize your Meta ad performance and ROI.",
                  href: "/resources/meta-ads/ad-optimization",
                },
                {
                  title: "Instagram Lead Generation",
                  description:
                    "Effective strategies for generating leads on Instagram.",
                  href: "/resources/meta-ads/instagram-lead-generation",
                },
              ].map((resource) => (
                <Link
                  key={resource.title}
                  href={resource.href}
                  className="p-6 rounded-xl border border-border/50 bg-card/50 hover:border-purple-500/30 transition-colors group"
                >
                  <h3 className="font-semibold mb-2 group-hover:text-purple-400 transition-colors">
                    {resource.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {resource.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <LandingFooter />
    </div>
  );
}
