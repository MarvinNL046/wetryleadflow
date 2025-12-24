"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  LandingHeader,
  LandingFooter,
  GlowButton,
  GradientText,
} from "@/components/landing";
import { Gauge, ArrowRight, Kanban, TrendingUp, Zap, LineChart, Search } from "lucide-react";

const subpillars = [
  {
    title: "Kanban Boards",
    description: "Visualize your entire sales pipeline with intuitive drag-and-drop Kanban boards for effortless deal management.",
    href: "/resources/pipeline-management/kanban-boards",
    icon: Kanban,
  },
  {
    title: "Stage Optimization",
    description: "Fine-tune your pipeline stages to match your sales process and maximize conversion at every step.",
    href: "/resources/pipeline-management/stage-optimization",
    icon: TrendingUp,
  },
  {
    title: "Deal Velocity",
    description: "Track and improve how quickly deals move through your pipeline to close more sales faster.",
    href: "/resources/pipeline-management/deal-velocity",
    icon: Zap,
  },
  {
    title: "Sales Forecasting",
    description: "Predict future revenue with accurate sales forecasts based on pipeline data and historical trends.",
    href: "/resources/pipeline-management/sales-forecasting",
    icon: LineChart,
  },
  {
    title: "Bottleneck Analysis",
    description: "Identify and eliminate pipeline bottlenecks that slow down your sales process and hurt conversion rates.",
    href: "/resources/pipeline-management/bottleneck-analysis",
    icon: Search,
  },
];

export default function PipelineManagementPillarPage() {
  return (
    <>
      <meta name="robots" content="noindex, follow" />

      <div className="min-h-screen bg-background">
        <LandingHeader />

        <main>
          <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden pt-20">
            <div className="absolute inset-0 -z-10">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-background to-background" />
              <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[128px] animate-pulse" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center max-w-4xl mx-auto"
              >
                <div className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  <Gauge className="w-4 h-4 mr-2" />
                  Pipeline Management Hub
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
                  <GradientText animated>Pipeline Management</GradientText>
                </h1>

                <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                  Master your sales pipeline with visual tools, stage optimization, and data-driven insights to close more deals faster.
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
                      className="group block h-full p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all duration-300"
                    >
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500">
                          <item.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h2 className="text-xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">
                            {item.title}
                          </h2>
                          <p className="text-muted-foreground text-sm mb-4">
                            {item.description}
                          </p>
                          <span className="inline-flex items-center text-sm font-medium text-cyan-400 group-hover:text-cyan-300">
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
                  <Link href="/resources/crm-best-practices" className="px-4 py-2 rounded-full bg-green-500/10 text-green-400 hover:bg-green-500/20 transition-colors text-sm">
                    CRM Best Practices
                  </Link>
                  <Link href="/resources/sales-analytics" className="px-4 py-2 rounded-full bg-violet-500/10 text-violet-400 hover:bg-violet-500/20 transition-colors text-sm">
                    Sales Analytics
                  </Link>
                  <Link href="/resources/ai-automation" className="px-4 py-2 rounded-full bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 transition-colors text-sm">
                    AI & Automation
                  </Link>
                  <Link href="/resources/team-collaboration" className="px-4 py-2 rounded-full bg-teal-500/10 text-teal-400 hover:bg-teal-500/20 transition-colors text-sm">
                    Team Collaboration
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
