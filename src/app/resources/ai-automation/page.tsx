"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  LandingHeader,
  LandingFooter,
  GlowButton,
  GradientText,
} from "@/components/landing";
import { Brain, ArrowRight, Sparkles, TrendingUp, GitBranch, Workflow, Cpu } from "lucide-react";

const subpillars = [
  {
    title: "AI Lead Scoring",
    description: "Use artificial intelligence to automatically score and prioritize your leads based on conversion likelihood.",
    href: "/resources/ai-automation/ai-lead-scoring",
    icon: Sparkles,
  },
  {
    title: "Predictive Analytics",
    description: "Leverage machine learning to predict customer behavior, sales outcomes, and identify opportunities.",
    href: "/resources/ai-automation/predictive-analytics",
    icon: TrendingUp,
  },
  {
    title: "Smart Lead Routing",
    description: "Automatically route leads to the right sales rep based on AI-powered matching algorithms.",
    href: "/resources/ai-automation/smart-lead-routing",
    icon: GitBranch,
  },
  {
    title: "Automation Workflows",
    description: "Build intelligent automation workflows that respond to triggers and optimize your sales process.",
    href: "/resources/ai-automation/automation-workflows",
    icon: Workflow,
  },
  {
    title: "Machine Learning CRM",
    description: "Discover how machine learning transforms CRM capabilities and drives smarter business decisions.",
    href: "/resources/ai-automation/machine-learning-crm",
    icon: Cpu,
  },
];

export default function AIAutomationPillarPage() {
  return (
    <>
      <meta name="robots" content="noindex, follow" />

      <div className="min-h-screen bg-background">
        <LandingHeader />

        <main>
          <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden pt-20">
            <div className="absolute inset-0 -z-10">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-background to-background" />
              <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[128px] animate-pulse" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center max-w-4xl mx-auto"
              >
                <div className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  <Brain className="w-4 h-4 mr-2" />
                  AI & Automation Hub
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
                  <GradientText animated>AI & Automation</GradientText> for Sales
                </h1>

                <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                  Harness the power of artificial intelligence to automate your sales process and close more deals.
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
                      className="group block h-full p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-purple-500/50 hover:bg-purple-500/5 transition-all duration-300"
                    >
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500">
                          <item.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h2 className="text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors">
                            {item.title}
                          </h2>
                          <p className="text-muted-foreground text-sm mb-4">
                            {item.description}
                          </p>
                          <span className="inline-flex items-center text-sm font-medium text-purple-400 group-hover:text-purple-300">
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
                  <Link href="/resources/lead-generation" className="px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors text-sm">
                    Lead Generation
                  </Link>
                  <Link href="/resources/sales-automation" className="px-4 py-2 rounded-full bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20 transition-colors text-sm">
                    Sales Automation
                  </Link>
                  <Link href="/resources/sales-analytics" className="px-4 py-2 rounded-full bg-violet-500/10 text-violet-400 hover:bg-violet-500/20 transition-colors text-sm">
                    Sales Analytics
                  </Link>
                  <Link href="/resources/pipeline-management" className="px-4 py-2 rounded-full bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 transition-colors text-sm">
                    Pipeline Management
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
                    Try AI-Powered CRM Free
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
