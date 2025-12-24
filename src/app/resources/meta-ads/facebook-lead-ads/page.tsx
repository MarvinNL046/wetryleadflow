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
  Zap,
  Target,
  Users,
  BarChart3,
  Settings,
  Database,
  RefreshCw,
  Shield,
} from "lucide-react";

export default function FacebookLeadAdsPage() {
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
                Facebook Lead Ads:{" "}
                <GradientText>Complete Integration Guide</GradientText>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Learn how to seamlessly connect your Facebook Lead Ads to
                LeadFlow and automatically capture, qualify, and convert leads
                into customers with our powerful CRM integration.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/handler/sign-up">
                  <GlowButton size="lg" className="group">
                    Start Free Integration
                    <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </GlowButton>
                </Link>
                <Link
                  href="/resources/meta-ads/meta-lead-forms"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Learn about Lead Forms →
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* What Are Facebook Lead Ads Section */}
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
                  What Are <GradientText>Facebook Lead Ads?</GradientText>
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Facebook Lead Ads are a powerful advertising format that
                  allows businesses to collect lead information directly within
                  the Facebook and Instagram platforms. Unlike traditional ads
                  that redirect users to external landing pages, Lead Ads
                  present a pre-populated form that users can submit with just a
                  few taps.
                </p>
                <p className="text-lg text-muted-foreground mb-6">
                  When a potential customer sees your Lead Ad, they can express
                  interest by clicking the call-to-action button. Facebook then
                  displays an instant form that automatically fills in
                  information from the user&apos;s profile, such as their name, email
                  address, and phone number. This frictionless experience
                  significantly increases conversion rates compared to
                  traditional landing pages.
                </p>
                <p className="text-lg text-muted-foreground">
                  The real power of Facebook Lead Ads comes from integrating
                  them with a CRM like LeadFlow. Without proper integration,
                  leads sit in Facebook&apos;s native lead center where they can
                  become stale. With LeadFlow, leads are instantly captured,
                  scored by AI, and routed to your sales team for immediate
                  follow-up.
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
                    Key Benefits of Facebook Lead Ads
                  </h3>
                  <div className="space-y-4">
                    {[
                      "Pre-filled forms reduce friction and boost conversions",
                      "Native experience keeps users on Facebook platform",
                      "Mobile-optimized for the 98% of Facebook mobile users",
                      "Lower cost-per-lead compared to landing pages",
                      "Seamless integration with CRM systems like LeadFlow",
                      "Advanced targeting options for qualified leads",
                    ].map((benefit, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Integration Steps Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Step-by-Step Guide"
              title="How to Integrate Facebook Lead Ads with LeadFlow"
              titleGradient="LeadFlow"
              description="Follow these simple steps to connect your Facebook Lead Ads and start capturing leads automatically in your LeadFlow dashboard."
            />

            <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  step: "01",
                  icon: Settings,
                  title: "Connect Your Facebook Account",
                  description:
                    "Navigate to LeadFlow integrations and click 'Connect Facebook'. Authorize LeadFlow to access your Facebook Business account and ad campaigns.",
                },
                {
                  step: "02",
                  icon: Target,
                  title: "Select Your Ad Accounts",
                  description:
                    "Choose which Facebook Ad accounts and pages you want to sync with LeadFlow. You can connect multiple accounts for different campaigns.",
                },
                {
                  step: "03",
                  icon: Database,
                  title: "Map Lead Form Fields",
                  description:
                    "Match your Facebook Lead Form fields to LeadFlow contact properties. This ensures all captured data flows into the right places in your CRM.",
                },
                {
                  step: "04",
                  icon: RefreshCw,
                  title: "Enable Real-Time Sync",
                  description:
                    "Activate real-time synchronization to instantly capture new leads. LeadFlow pulls leads the moment they submit their information.",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="absolute -inset-px bg-gradient-to-b from-purple-500/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm h-full">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-4xl font-bold text-purple-500/30">
                        {item.step}
                      </span>
                      <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                        <item.icon className="w-6 h-6 text-purple-500" />
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Powerful Features"
              title="Why LeadFlow for Facebook Lead Ads Integration"
              titleGradient="Facebook Lead Ads"
              description="LeadFlow provides the most comprehensive Facebook Lead Ads integration, giving you tools to capture, qualify, and convert leads faster than ever."
            />

            <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Zap,
                  title: "Instant Lead Capture",
                  description:
                    "Leads appear in your dashboard within seconds of form submission. No more manual downloads or delayed syncs that cause you to miss opportunities.",
                },
                {
                  icon: BarChart3,
                  title: "AI-Powered Lead Scoring",
                  description:
                    "Every Facebook lead is automatically scored by our AI based on their profile data, engagement history, and likelihood to convert.",
                },
                {
                  icon: Users,
                  title: "Smart Lead Routing",
                  description:
                    "Automatically assign leads to the right sales rep based on territory, product interest, lead score, or custom rules you define.",
                },
                {
                  icon: Target,
                  title: "Campaign Attribution",
                  description:
                    "Track exactly which Facebook campaigns, ad sets, and ads are generating your best leads. Optimize spend based on real revenue data.",
                },
                {
                  icon: Shield,
                  title: "Duplicate Prevention",
                  description:
                    "LeadFlow automatically detects and merges duplicate leads, ensuring clean data and preventing multiple reps from contacting the same person.",
                },
                {
                  icon: RefreshCw,
                  title: "Bi-Directional Sync",
                  description:
                    "Changes made in LeadFlow sync back to Facebook Custom Audiences, enabling powerful retargeting and lookalike audience creation.",
                },
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-purple-500/30 transition-colors"
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

        {/* Best Practices Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <SectionHeading
                badge="Expert Tips"
                title="Best Practices for Facebook Lead Ads Success"
                titleGradient="Success"
                description="Maximize your Facebook Lead Ads performance with these proven strategies used by top-performing LeadFlow customers."
              />

              <div className="mt-12 space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="p-8 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm"
                >
                  <h3 className="text-xl font-semibold mb-4">
                    1. Optimize Your Lead Form Questions
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    The questions you include in your lead form directly impact
                    both conversion rate and lead quality. While fewer questions
                    typically yield more leads, asking the right qualifying
                    questions can dramatically improve lead quality and sales
                    efficiency.
                  </p>
                  <p className="text-muted-foreground">
                    LeadFlow recommends a balanced approach: use 3-5 questions
                    including at least one custom question beyond the standard
                    contact information. This helps filter out low-intent leads
                    while maintaining healthy conversion rates. Consider asking
                    about budget, timeline, or specific product interest to help
                    your sales team prioritize follow-up.
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
                    2. Speed to Lead is Critical
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Research shows that responding to leads within 5 minutes
                    increases conversion rates by 900%. This is why real-time
                    integration with LeadFlow is so important. When a prospect
                    fills out your Facebook Lead Form, they&apos;re at peak interest
                    and engagement.
                  </p>
                  <p className="text-muted-foreground">
                    LeadFlow&apos;s instant notifications, automatic lead routing,
                    and mobile app ensure your sales team can respond within
                    minutes, not hours. Set up automated welcome emails and SMS
                    messages to engage leads immediately while your rep prepares
                    a personalized follow-up.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="p-8 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm"
                >
                  <h3 className="text-xl font-semibold mb-4">
                    3. Use Contextual Thank You Pages
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Don&apos;t waste the post-submission experience with a generic
                    thank you message. Facebook Lead Ads allow you to direct
                    users to a custom thank you page where you can provide
                    additional value and keep engagement high.
                  </p>
                  <p className="text-muted-foreground">
                    Consider directing leads to a helpful resource, scheduling
                    page, or product demo. LeadFlow tracks these post-submission
                    interactions, giving you additional engagement data to
                    inform lead scoring and sales prioritization.
                  </p>
                </motion.div>
              </div>
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
              className="relative max-w-4xl mx-auto"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 via-cyan-500/20 to-blue-500/20 rounded-3xl blur-2xl opacity-60" />
              <div className="relative p-12 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Ready to Supercharge Your{" "}
                  <GradientText>Facebook Lead Ads?</GradientText>
                </h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Join thousands of businesses using LeadFlow to capture,
                  qualify, and convert Facebook leads faster. Get started with
                  our free trial and see results in minutes.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href="/handler/sign-up">
                    <GlowButton size="lg" className="group">
                      Start Free Trial
                      <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </GlowButton>
                  </Link>
                  <Link
                    href="/resources/meta-ads/instagram-lead-generation"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Explore Instagram Integration →
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
                  title: "Instagram Lead Generation",
                  description:
                    "Learn strategies for generating high-quality leads on Instagram.",
                  href: "/resources/meta-ads/instagram-lead-generation",
                },
                {
                  title: "Optimizing Meta Lead Forms",
                  description:
                    "Best practices for creating high-converting lead forms.",
                  href: "/resources/meta-ads/meta-lead-forms",
                },
                {
                  title: "Audience Targeting Guide",
                  description:
                    "Master Facebook audience targeting for better lead quality.",
                  href: "/resources/meta-ads/audience-targeting",
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
