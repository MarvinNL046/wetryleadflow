"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  LandingHeader,
  LandingFooter,
  GlowButton,
  GradientText,
  SectionHeading
} from "@/components/landing";
import {
  Instagram,
  Heart,
  Mail,
  Zap,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  Users,
  Target,
  MessageSquare,
  BarChart3,
  Clock
} from "lucide-react";

const relatedContent = [
  {
    title: "Instagram Lead Generation",
    description: "Learn how to capture high-quality leads directly from Instagram with optimized lead forms and compelling ad creative.",
    href: "/resources/meta-ads/instagram-lead-generation",
    pillar: "Meta Ads",
    icon: Instagram,
    gradient: "from-pink-500 to-rose-500"
  },
  {
    title: "Ad Optimization Strategies",
    description: "Master the art of optimizing your Meta ads for maximum ROI and lead quality through data-driven testing.",
    href: "/resources/meta-ads/ad-optimization",
    pillar: "Meta Ads",
    icon: Target,
    gradient: "from-pink-500 to-fuchsia-500"
  },
  {
    title: "Email Sequences",
    description: "Build automated email sequences that nurture Instagram leads through your sales funnel with personalized content.",
    href: "/resources/sales-automation/email-sequences",
    pillar: "Sales Automation",
    icon: Mail,
    gradient: "from-rose-500 to-pink-500"
  },
  {
    title: "Task Automation",
    description: "Automate follow-up tasks and reminders to ensure no Instagram lead falls through the cracks.",
    href: "/resources/sales-automation/task-automation",
    pillar: "Sales Automation",
    icon: Zap,
    gradient: "from-fuchsia-500 to-pink-500"
  }
];

const relatedTopics = [
  { title: "Deal Velocity Optimization", href: "/resources/topics/deal-velocity-optimization" },
  { title: "Contact Activity Insights", href: "/resources/topics/contact-activity-insights" },
  { title: "Lead Handoff Automation", href: "/resources/topics/lead-handoff-automation" },
  { title: "Predictive Lead Scoring", href: "/resources/topics/predictive-lead-scoring" }
];

export default function InstagramLeadNurturingPage() {
  return (
    <div className="min-h-screen bg-background">
      <head>
        <meta name="robots" content="noindex, follow" />
      </head>
      <LandingHeader />

        <main>
          {/* Hero Section */}
          <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden pt-20">
            {/* Background Effects - Pink Theme */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-pink-900/20 via-background to-background" />
              <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-pink-500/30 rounded-full blur-[128px] animate-pulse" />
              <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-rose-500/20 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: "1s" }} />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center max-w-4xl mx-auto"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium rounded-full bg-pink-500/10 text-pink-400 border border-pink-500/20"
                >
                  <Instagram className="w-4 h-4 mr-2" />
                  Meta Ads + Sales Automation
                </motion.div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
                  Instagram Lead Nurturing: <span className="bg-gradient-to-r from-pink-500 via-rose-500 to-fuchsia-500 bg-clip-text text-transparent">From Capture to Conversion</span>
                </h1>

                <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                  Discover how to seamlessly connect Instagram lead generation with automated nurturing
                  sequences. Learn to transform social media prospects into loyal customers through
                  strategic automation and personalized engagement.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href="/handler/sign-up">
                    <GlowButton size="lg" className="group">
                      Start Nurturing Leads Free
                      <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </GlowButton>
                  </Link>
                  <Link
                    href="/resources/meta-ads/instagram-lead-generation"
                    className="inline-flex items-center gap-2 px-6 py-3 text-base font-medium rounded-full border border-border hover:bg-accent transition-colors"
                  >
                    Explore Instagram Lead Gen
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Introduction Section */}
          <section className="py-20 lg:py-32">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
                    Why <span className="bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">Instagram Lead Nurturing</span> Matters
                  </h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      Instagram generates millions of leads for businesses every day, but capturing a
                      lead is only the first step. Without proper nurturing, these valuable prospects
                      quickly grow cold and forget about your brand. The key to converting Instagram
                      leads lies in creating a seamless bridge between social media advertising and
                      automated follow-up systems.
                    </p>
                    <p>
                      By combining Instagram&apos;s powerful lead generation capabilities with sophisticated
                      email sequences and task automation, you create a nurturing engine that works
                      24/7. This approach ensures every lead receives personalized attention at the
                      right time, dramatically improving conversion rates while freeing your team to
                      focus on high-value interactions.
                    </p>
                    <p>
                      LeadFlow connects these dots by instantly syncing Instagram leads with automated
                      workflows, ensuring no prospect slips through the cracks and every lead receives
                      the attention they deserve.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="relative"
                >
                  <div className="absolute -inset-4 bg-gradient-to-r from-pink-500/20 via-rose-500/20 to-fuchsia-500/20 rounded-3xl blur-2xl opacity-60" />
                  <div className="relative rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl overflow-hidden p-6">
                    <div className="space-y-4">
                      {[
                        { icon: Instagram, title: "Lead Captured", time: "Just now", status: "New lead from Instagram", color: "text-pink-500" },
                        { icon: Mail, title: "Welcome Email Sent", time: "30 seconds", status: "Automated sequence started", color: "text-rose-500" },
                        { icon: MessageSquare, title: "Follow-up Scheduled", time: "2 days", status: "Task created for sales rep", color: "text-fuchsia-500" },
                        { icon: TrendingUp, title: "Lead Score Updated", time: "Ongoing", status: "Engagement tracked", color: "text-pink-500" }
                      ].map((step, index) => (
                        <motion.div
                          key={step.title}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="flex items-center gap-4 p-4 rounded-xl bg-muted/30 border border-border/50"
                        >
                          <div className={`w-10 h-10 rounded-full bg-pink-500/10 flex items-center justify-center ${step.color}`}>
                            <step.icon className="w-5 h-5" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{step.title}</p>
                            <p className="text-sm text-muted-foreground">{step.status}</p>
                          </div>
                          <span className="text-xs text-muted-foreground">{step.time}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Key Benefits */}
          <section className="py-20 lg:py-32 bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <SectionHeading
                badge="Cross-Pillar Benefits"
                title="The Power of Integrated Lead Nurturing"
                titleGradient="Integrated Lead Nurturing"
                description="Combining Instagram advertising with sales automation creates a powerful synergy that maximizes your lead conversion potential."
              />

              <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    icon: Clock,
                    title: "Instant Response Time",
                    description: "Automatically engage Instagram leads within seconds of capture, when interest is at its peak."
                  },
                  {
                    icon: Heart,
                    title: "Personalized Journeys",
                    description: "Create tailored nurturing sequences based on lead source, interests, and engagement level."
                  },
                  {
                    icon: BarChart3,
                    title: "Full-Funnel Visibility",
                    description: "Track leads from Instagram ad click through to closed deal with complete attribution."
                  },
                  {
                    icon: Zap,
                    title: "Automated Follow-Ups",
                    description: "Never miss a follow-up with automated task creation and reminder systems."
                  },
                  {
                    icon: Users,
                    title: "Scalable Engagement",
                    description: "Nurture thousands of leads simultaneously without sacrificing personalization."
                  },
                  {
                    icon: Target,
                    title: "Higher Conversion Rates",
                    description: "Companies see 40% higher conversion rates with integrated nurturing systems."
                  }
                ].map((benefit, index) => (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="p-6 rounded-2xl bg-card border border-border hover:border-pink-500/50 transition-all hover:shadow-lg hover:shadow-pink-500/10"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500/20 to-rose-500/20 flex items-center justify-center mb-4">
                      <benefit.icon className="w-6 h-6 text-pink-500" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Related Content Grid */}
          <section className="py-20 lg:py-32">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <SectionHeading
                badge="Deep Dive Resources"
                title="Explore Related Content"
                description="Master each aspect of Instagram lead nurturing with our in-depth guides from different pillars."
              />

              <div className="mt-12 grid md:grid-cols-2 gap-6">
                {relatedContent.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className="block p-6 rounded-2xl bg-card border border-border hover:border-pink-500/50 transition-all hover:shadow-lg hover:shadow-pink-500/10 h-full group"
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center flex-shrink-0`}>
                          <item.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <span className="text-xs font-medium text-pink-500 uppercase tracking-wider">{item.pillar}</span>
                          <h3 className="text-lg font-semibold mt-1 mb-2 group-hover:text-pink-500 transition-colors">{item.title}</h3>
                          <p className="text-muted-foreground text-sm mb-4">{item.description}</p>
                          <span className="text-pink-500 text-sm font-medium inline-flex items-center">
                            Read more <ArrowRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Related Topics */}
          <section className="py-20 lg:py-32 bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <SectionHeading
                badge="Related Topics"
                title="Explore More Crossover Topics"
                description="Discover other powerful combinations of LeadFlow features to optimize your sales process."
              />

              <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
                      className="block p-4 rounded-xl bg-card border border-border hover:border-pink-500/50 transition-all text-center group"
                    >
                      <h3 className="font-medium group-hover:text-pink-500 transition-colors">{topic.title}</h3>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 lg:py-32">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center max-w-3xl mx-auto"
              >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
                  Ready to Transform Your <span className="bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">Instagram Leads</span>?
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Start connecting Instagram lead generation with powerful automation today.
                  LeadFlow makes it easy to capture, nurture, and convert social media prospects
                  into paying customers.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href="/handler/sign-up">
                    <GlowButton size="lg" className="group">
                      Start Your Free Trial
                      <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </GlowButton>
                  </Link>
                  <Link
                    href="/resources"
                    className="inline-flex items-center gap-2 px-6 py-3 text-base font-medium rounded-full border border-border hover:bg-accent transition-colors"
                  >
                    Browse All Resources
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>
        </main>

      <LandingFooter />
    </div>
  );
}
