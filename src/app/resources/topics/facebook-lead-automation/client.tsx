"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  LandingHeader,
  LandingFooter,
  GlowButton,
} from "@/components/landing";
import {
  ArrowRight,
  Facebook,
  FileText,
  Mail,
  Zap,
  Target,
  Clock,
  TrendingUp,
  Bot,
} from "lucide-react";

export default function FacebookLeadAutomationClient() {
  const relatedContent = [
    {
      title: "Facebook Lead Ads Guide",
      description: "Master Facebook Lead Ads to capture high-intent prospects directly from the platform.",
      href: "/resources/meta-ads/facebook-lead-ads",
      icon: Facebook,
      pillar: "Meta Ads",
    },
    {
      title: "Meta Lead Forms",
      description: "Design and optimize Meta lead forms that maximize conversions and data quality.",
      href: "/resources/meta-ads/meta-lead-forms",
      icon: FileText,
      pillar: "Meta Ads",
    },
    {
      title: "Email Sequences",
      description: "Create automated email sequences that nurture Facebook leads to conversion.",
      href: "/resources/sales-automation/email-sequences",
      icon: Mail,
      pillar: "Sales Automation",
    },
    {
      title: "Follow-Up Automation",
      description: "Set up instant follow-up workflows that engage leads while they are still warm.",
      href: "/resources/sales-automation/follow-up-automation",
      icon: Zap,
      pillar: "Sales Automation",
    },
  ];

  const relatedTopics = [
    { title: "Lead Qualification Automation", href: "/resources/topics/lead-qualification-automation" },
    { title: "CRM Data Migration", href: "/resources/topics/crm-data-migration" },
    { title: "Pipeline Bottleneck Analysis", href: "/resources/topics/pipeline-bottleneck-analysis" },
  ];

  return (
    <>
      <LandingHeader />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-background to-background" />
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/30 rounded-full blur-[128px] animate-pulse" />
            <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-indigo-500/20 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: "1s" }} />
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto text-center"
            >
              <span className="inline-flex items-center px-3 py-1 mb-6 text-sm font-medium rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <Facebook className="w-4 h-4 mr-2" />
                Meta Ads + Sales Automation
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
                Facebook <span className="bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">Lead Automation</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Connect Meta advertising with sales automation to capture Facebook leads instantly, trigger follow-up sequences automatically, and convert social traffic into paying customers.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Overview Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto"
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">
                  Turn Facebook Leads into <span className="bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">Revenue Automatically</span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Facebook leads go cold fast. Automation ensures every lead gets instant engagement and personalized follow-up that converts.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { icon: Clock, title: "Instant Response", description: "Engage leads within seconds of form submission while intent is highest." },
                  { icon: Bot, title: "24/7 Nurturing", description: "Automated sequences work around the clock to move leads through your funnel." },
                  { icon: TrendingUp, title: "Higher Conversion", description: "Automated lead nurturing increases conversion rates by 50% or more." },
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="p-6 rounded-xl bg-card border border-border"
                  >
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500/20 to-indigo-500/20 flex items-center justify-center mb-4">
                      <item.icon className="w-6 h-6 text-blue-500" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Related Content Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="max-w-5xl mx-auto"
            >
              <div className="text-center mb-12">
                <span className="inline-flex items-center px-3 py-1 mb-4 text-sm font-medium rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  <Target className="w-4 h-4 mr-2" />
                  Deep Dive Resources
                </span>
                <h2 className="text-3xl font-bold mb-4">
                  Explore <span className="bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">Related Content</span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Master Facebook lead generation and sales automation with these comprehensive guides.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {relatedContent.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link href={item.href} className="block group">
                      <div className="p-6 rounded-xl bg-card border border-border hover:border-blue-500/50 transition-all duration-300 h-full">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500/20 to-indigo-500/20 flex items-center justify-center flex-shrink-0 group-hover:from-blue-500/30 group-hover:to-indigo-500/30 transition-colors">
                            <item.icon className="w-6 h-6 text-blue-500" />
                          </div>
                          <div className="flex-1">
                            <span className="text-xs text-blue-400 mb-1 block">{item.pillar}</span>
                            <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                              {item.title}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                            <span className="inline-flex items-center text-sm text-blue-400 group-hover:text-blue-300">
                              Read more
                              <ArrowRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Related Topics Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h3 className="text-xl font-semibold mb-6">Related Topics</h3>
              <div className="flex flex-wrap justify-center gap-3">
                {relatedTopics.map((topic) => (
                  <Link
                    key={topic.href}
                    href={topic.href}
                    className="px-4 py-2 rounded-full bg-card border border-border hover:border-blue-500/50 text-sm text-muted-foreground hover:text-blue-400 transition-all"
                  >
                    {topic.title}
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to <span className="bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">Automate Facebook Leads</span>?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                LeadFlow integrates directly with Meta Lead Ads to sync leads instantly and trigger automated follow-up sequences. Start your free trial and watch your conversion rates soar.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/handler/sign-up">
                  <GlowButton size="lg" className="group">
                    Start Free Trial
                    <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </GlowButton>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <LandingFooter />
    </>
  );
}
