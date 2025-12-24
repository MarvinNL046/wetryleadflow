"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Head from "next/head";
import {
  LandingHeader,
  LandingFooter,
  GlowButton,
  GradientText,
} from "@/components/landing";
import {
  Megaphone,
  Target,
  Zap,
  ArrowRight,
  CheckCircle,
  BookOpen,
  TrendingUp,
  Instagram,
  Facebook,
  FileText,
  Users,
  Mail,
} from "lucide-react";

const linkedResources = [
  {
    title: "Facebook Lead Ads",
    description: "Create high-converting Facebook lead ads that capture qualified prospects.",
    href: "/resources/meta-ads/facebook-lead-ads",
    pillar: "Meta Ads",
    icon: Facebook,
  },
  {
    title: "Instagram Lead Generation",
    description: "Leverage Instagram's visual platform to generate quality leads.",
    href: "/resources/meta-ads/instagram-lead-generation",
    pillar: "Meta Ads",
    icon: Instagram,
  },
  {
    title: "Meta Lead Forms",
    description: "Design and optimize lead forms that maximize conversion rates.",
    href: "/resources/meta-ads/meta-lead-forms",
    pillar: "Meta Ads",
    icon: FileText,
  },
  {
    title: "Audience Targeting",
    description: "Reach the right people with precise targeting strategies.",
    href: "/resources/meta-ads/audience-targeting",
    pillar: "Meta Ads",
    icon: Users,
  },
  {
    title: "Email Sequences",
    description: "Nurture Meta leads with automated email follow-up sequences.",
    href: "/resources/sales-automation/email-sequences",
    pillar: "Sales Automation",
    icon: Mail,
  },
];

const relatedTopics = [
  { title: "Complete Lead Funnel", href: "/resources/topics/complete-lead-funnel" },
  { title: "AI-Powered Sales Stack", href: "/resources/topics/ai-powered-sales-stack" },
  { title: "Full Sales Analytics Suite", href: "/resources/topics/full-sales-analytics-suite" },
];

const benefits = [
  "Direct CRM integration for instant lead capture from Meta platforms",
  "Advanced audience targeting to reach high-intent prospects",
  "Mobile-optimized lead forms that convert at higher rates",
  "Automated follow-up sequences triggered by ad engagement",
  "Cross-platform campaigns spanning Facebook and Instagram",
  "ROI tracking from ad click to closed deal",
];

export default function MetaAdsCompleteGuidePage() {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex, follow" />
      </Head>
      <div className="min-h-screen bg-background">
        <LandingHeader />

        <main>
          {/* Hero Section */}
          <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-20">
            {/* Background Effects */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/30 via-indigo-900/20 to-background" />
              <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[128px] animate-pulse" />
              <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: "1s" }} />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center max-w-4xl mx-auto"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/20 mb-6">
                  <BookOpen className="w-4 h-4 text-blue-400" />
                  <span className="text-sm text-blue-300">Topic Hub</span>
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
                  Meta Ads{" "}
                  <GradientText animated className="bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400">
                    Complete Guide
                  </GradientText>
                </h1>

                <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                  Master Meta advertising from setup to sale. Combine Facebook and Instagram ads
                  with lead generation and sales automation for maximum ROI.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
                  <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-300 text-sm border border-blue-500/20">
                    Meta Ads
                  </span>
                  <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 text-sm border border-indigo-500/20">
                    Lead Generation
                  </span>
                  <span className="px-3 py-1 rounded-full bg-violet-500/10 text-violet-300 text-sm border border-violet-500/20">
                    Sales Automation
                  </span>
                </div>

                <Link href="/handler/sign-up">
                  <GlowButton size="lg" className="group">
                    Connect Your Meta Ads
                    <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </GlowButton>
                </Link>
              </motion.div>
            </div>
          </section>

          {/* Benefits Section */}
          <section className="py-16 lg:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="max-w-4xl mx-auto"
              >
                <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
                  Why Master Meta Ads Integration?
                </h2>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-start gap-3 p-4 rounded-xl bg-card/50 border border-border/50"
                    >
                      <CheckCircle className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{benefit}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          {/* Linked Resources Section */}
          <section className="py-16 lg:py-24 bg-gradient-to-b from-background to-blue-950/10">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center mb-12"
              >
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Essential Resources
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Master each component of Meta advertising success
                </p>
              </motion.div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {linkedResources.map((resource, index) => (
                  <motion.div
                    key={resource.href}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link href={resource.href} className="block h-full">
                      <div className="group relative h-full rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-6 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
                        <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 mb-4">
                          <resource.icon className="w-6 h-6 text-white" />
                        </div>

                        <span className="text-xs text-blue-400 font-medium mb-2 block">
                          {resource.pillar}
                        </span>

                        <h3 className="text-lg font-bold mb-2 group-hover:text-blue-400 transition-colors">
                          {resource.title}
                        </h3>

                        <p className="text-sm text-muted-foreground mb-4">
                          {resource.description}
                        </p>

                        <div className="flex items-center text-sm text-blue-400 font-medium">
                          Read Guide
                          <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Related Topics Section */}
          <section className="py-16 lg:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="max-w-3xl mx-auto"
              >
                <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
                  Related Topics
                </h2>

                <div className="grid gap-4">
                  {relatedTopics.map((topic, index) => (
                    <motion.div
                      key={topic.href}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Link href={topic.href}>
                        <div className="flex items-center justify-between p-4 rounded-xl bg-card/50 border border-border/50 hover:border-blue-500/50 transition-all duration-300 group">
                          <span className="font-medium group-hover:text-blue-400 transition-colors">
                            {topic.title}
                          </span>
                          <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-blue-400 transition-all group-hover:translate-x-1" />
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 lg:py-32 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-violet-500/10" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center max-w-3xl mx-auto"
              >
                <Megaphone className="w-12 h-12 text-blue-400 mx-auto mb-6" />

                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
                  Ready to Master{" "}
                  <GradientText className="bg-gradient-to-r from-blue-400 to-indigo-400">
                    Meta Advertising?
                  </GradientText>
                </h2>

                <p className="text-lg text-muted-foreground mb-8">
                  Connect your Meta ads to LeadFlow and turn ad spend into closed deals.
                  Start free and see instant results.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href="/handler/sign-up">
                    <GlowButton size="lg" className="group">
                      Start Your Free Trial
                      <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </GlowButton>
                  </Link>
                  <Link href="/resources">
                    <GlowButton variant="secondary" size="lg">
                      Explore All Resources
                    </GlowButton>
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>
        </main>

        <LandingFooter />
      </div>
    </>
  );
}

