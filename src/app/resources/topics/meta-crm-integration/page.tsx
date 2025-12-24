"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  LandingHeader,
  LandingFooter,
  GlowButton,
  GradientText,
} from "@/components/landing";
import {
  Facebook,
  ArrowRight,
  Database,
  FileText,
  Settings,
  Layers,
  Link2,
  Zap,
} from "lucide-react";

const linkedPages = [
  {
    title: "Facebook Lead Ads",
    description: "Master Facebook Lead Ads to capture high-quality leads directly from the platform with pre-filled forms.",
    href: "/resources/meta-ads/facebook-lead-ads",
    icon: Facebook,
    pillar: "Meta Ads",
    color: "blue",
  },
  {
    title: "Meta Lead Forms",
    description: "Design and optimize Meta lead forms that convert visitors into qualified leads for your sales team.",
    href: "/resources/meta-ads/meta-lead-forms",
    icon: FileText,
    pillar: "Meta Ads",
    color: "blue",
  },
  {
    title: "Pipeline Setup",
    description: "Configure your CRM pipeline stages to match your sales process and maximize deal flow efficiency.",
    href: "/resources/crm-best-practices/pipeline-setup",
    icon: Layers,
    pillar: "CRM Best Practices",
    color: "green",
  },
  {
    title: "CRM Customization",
    description: "Customize your CRM fields, views, and workflows to perfectly match your business requirements.",
    href: "/resources/crm-best-practices/crm-customization",
    icon: Settings,
    pillar: "CRM Best Practices",
    color: "green",
  },
];

const relatedTopics = [
  { title: "Audience Targeting", href: "/resources/meta-ads/audience-targeting", color: "blue" },
  { title: "Instagram Lead Gen", href: "/resources/meta-ads/instagram-lead-generation", color: "blue" },
  { title: "Deal Tracking", href: "/resources/crm-best-practices/deal-tracking", color: "green" },
  { title: "Data Hygiene", href: "/resources/crm-best-practices/data-hygiene", color: "green" },
];

export default function MetaCRMIntegrationPage() {
  return (
    <>
      <meta name="robots" content="noindex, follow" />

      <div className="min-h-screen bg-background">
        <LandingHeader />

        <main>
          {/* Hero Section */}
          <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-20">
            <div className="absolute inset-0 -z-10">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/30 via-background to-background" />
              <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-500/30 rounded-full blur-[128px] animate-pulse" />
              <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-cyan-500/20 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: "1s" }} />
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
                  className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20"
                >
                  <Link2 className="w-4 h-4 mr-2" />
                  Crossover Topic Hub
                </motion.div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
                  <GradientText animated>Meta CRM Integration</GradientText>
                </h1>

                <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                  Bridge the gap between Meta advertising and CRM management. Learn how to seamlessly
                  connect Facebook and Instagram lead ads with your CRM for automated lead capture,
                  instant follow-ups, and complete sales pipeline visibility.
                </p>

                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400">Meta Ads</span>
                  <span className="text-muted-foreground">+</span>
                  <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-400">CRM Best Practices</span>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Introduction Section */}
          <section className="py-16 lg:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="max-w-3xl mx-auto"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500">
                    <Database className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold">Seamless Lead Flow from Ads to CRM</h2>
                </div>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Meta's advertising platform generates billions of leads every month, but without
                    proper CRM integration, those leads often go cold before your team can respond.
                    The connection between ad capture and CRM follow-up is where deals are won or lost.
                  </p>
                  <p>
                    By integrating Meta lead forms directly with your CRM, you ensure instant lead
                    capture, automatic data enrichment, and immediate workflow triggers. No more
                    manual exports, no more delayed responses, no more lost opportunities.
                  </p>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Linked Pages Grid */}
          <section className="py-16 lg:py-24 bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Explore <GradientText>Related Guides</GradientText>
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Master Meta advertising and CRM configuration with our in-depth guides.
                </p>
              </motion.div>

              <div className="grid gap-6 md:grid-cols-2">
                {linkedPages.map((page, index) => (
                  <motion.div
                    key={page.href}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link
                      href={page.href}
                      className="group block h-full p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-blue-500/50 hover:bg-blue-500/5 transition-all duration-300"
                    >
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${page.color === "blue" ? "from-blue-500 to-cyan-500" : "from-green-500 to-emerald-500"}`}>
                          <page.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`text-xs px-2 py-0.5 rounded-full ${page.color === "blue" ? "bg-blue-500/10 text-blue-400" : "bg-green-500/10 text-green-400"}`}>
                              {page.pillar}
                            </span>
                          </div>
                          <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">
                            {page.title}
                          </h3>
                          <p className="text-muted-foreground text-sm mb-4">
                            {page.description}
                          </p>
                          <span className="inline-flex items-center text-sm font-medium text-blue-400 group-hover:text-blue-300">
                            Read Guide
                            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Key Benefits Section */}
          <section className="py-16 lg:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Why Integrate Meta + CRM = <GradientText>Success</GradientText>
                </h2>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    icon: Zap,
                    title: "Instant Lead Capture",
                    description: "Leads flow directly from Meta ads into your CRM in real-time, triggering immediate follow-up sequences."
                  },
                  {
                    icon: Database,
                    title: "Complete Data Sync",
                    description: "All form fields, ad context, and campaign data syncs automatically for full lead attribution."
                  },
                  {
                    icon: Settings,
                    title: "Custom Field Mapping",
                    description: "Map Meta form fields to your CRM's custom fields for a perfect data structure match."
                  }
                ].map((benefit, index) => (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/5 to-cyan-500/5 border border-border hover:border-blue-500/30 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center mb-4">
                      <benefit.icon className="w-6 h-6 text-blue-500" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground text-sm">{benefit.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Related Topics Section */}
          <section className="py-16 lg:py-24 bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="p-8 rounded-2xl border border-border/50 bg-card/30"
              >
                <h3 className="text-lg font-semibold mb-4">Related Topics</h3>
                <div className="flex flex-wrap gap-3">
                  {relatedTopics.map((topic) => (
                    <Link
                      key={topic.href}
                      href={topic.href}
                      className={`px-4 py-2 rounded-full ${topic.color === "blue" ? "bg-blue-500/10 text-blue-400 hover:bg-blue-500/20" : "bg-green-500/10 text-green-400 hover:bg-green-500/20"} transition-colors text-sm`}
                    >
                      {topic.title}
                    </Link>
                  ))}
                </div>
              </motion.div>
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
                  Ready to <GradientText>Connect Meta to Your CRM</GradientText>?
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  LeadFlow offers native Meta integration that syncs your Facebook and Instagram
                  leads instantly. Start capturing and converting leads faster than ever.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href="/handler/sign-up">
                    <GlowButton size="lg" className="group">
                      Start Free Trial
                      <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </GlowButton>
                  </Link>
                  <Link
                    href="/resources/meta-ads"
                    className="inline-flex items-center gap-2 px-6 py-3 text-base font-medium rounded-full border border-border hover:bg-accent transition-colors"
                  >
                    Explore Meta Ads Hub
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
