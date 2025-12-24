"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  LandingHeader,
  LandingFooter,
  GlowButton,
  GradientText,
} from "@/components/landing";
import { BookOpen, ArrowRight, Layers, Target, ArrowRightLeft, Settings, Sparkles } from "lucide-react";

const subpillars = [
  {
    title: "Pipeline Setup",
    description: "Learn how to structure your sales pipeline for maximum efficiency and visibility into your sales process.",
    href: "/resources/crm-best-practices/pipeline-setup",
    icon: Layers,
  },
  {
    title: "Deal Tracking",
    description: "Master the art of tracking deals through your pipeline and never lose sight of important opportunities.",
    href: "/resources/crm-best-practices/deal-tracking",
    icon: Target,
  },
  {
    title: "CRM Migration",
    description: "Seamlessly migrate from your existing CRM without losing data or disrupting your sales operations.",
    href: "/resources/crm-best-practices/crm-migration",
    icon: ArrowRightLeft,
  },
  {
    title: "CRM Customization",
    description: "Customize your CRM to match your unique sales process and team workflows.",
    href: "/resources/crm-best-practices/crm-customization",
    icon: Settings,
  },
  {
    title: "Data Hygiene",
    description: "Keep your CRM data clean, accurate, and actionable with proven data hygiene practices.",
    href: "/resources/crm-best-practices/data-hygiene",
    icon: Sparkles,
  },
];

export default function CRMBestPracticesPillarPage() {
  return (
    <>
      <meta name="robots" content="noindex, follow" />

      <div className="min-h-screen bg-background">
        <LandingHeader />

        <main>
          <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden pt-20">
            <div className="absolute inset-0 -z-10">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-900/20 via-background to-background" />
              <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-green-500/20 rounded-full blur-[128px] animate-pulse" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center max-w-4xl mx-auto"
              >
                <div className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                  <BookOpen className="w-4 h-4 mr-2" />
                  CRM Best Practices Hub
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
                  <GradientText animated>CRM Best Practices</GradientText>
                </h1>

                <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                  Optimize your CRM setup and processes to get the most out of your sales technology investment.
                </p>
              </motion.div>
            </div>
          </section>

          <section className="py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {subpillars.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className="group block h-full p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-green-500/50 hover:bg-green-500/5 transition-all duration-300"
                    >
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500">
                          <item.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h2 className="text-xl font-bold mb-2 group-hover:text-green-400 transition-colors">
                            {item.title}
                          </h2>
                          <p className="text-muted-foreground text-sm mb-4">
                            {item.description}
                          </p>
                          <span className="inline-flex items-center text-sm font-medium text-green-400 group-hover:text-green-300">
                            Read Guide
                            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-16 p-8 rounded-2xl border border-border/50 bg-card/30"
              >
                <h3 className="text-lg font-semibold mb-4">Related Topics</h3>
                <div className="flex flex-wrap gap-3">
                  <Link href="/resources/pipeline-management" className="px-4 py-2 rounded-full bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 transition-colors text-sm">
                    Pipeline Management
                  </Link>
                  <Link href="/resources/contact-management" className="px-4 py-2 rounded-full bg-pink-500/10 text-pink-400 hover:bg-pink-500/20 transition-colors text-sm">
                    Contact Management
                  </Link>
                  <Link href="/resources/team-collaboration" className="px-4 py-2 rounded-full bg-teal-500/10 text-teal-400 hover:bg-teal-500/20 transition-colors text-sm">
                    Team Collaboration
                  </Link>
                  <Link href="/resources/sales-analytics" className="px-4 py-2 rounded-full bg-violet-500/10 text-violet-400 hover:bg-violet-500/20 transition-colors text-sm">
                    Sales Analytics
                  </Link>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-12 text-center"
              >
                <Link href="/handler/sign-up">
                  <GlowButton size="lg" className="group">
                    Start Using LeadFlow Free
                    <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </GlowButton>
                </Link>
              </motion.div>
            </div>
          </section>
        </main>

        <LandingFooter />
      </div>
    </>
  );
}
