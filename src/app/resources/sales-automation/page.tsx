"use client";

import { Metadata } from "next";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  LandingHeader,
  LandingFooter,
  GlowButton,
  GradientText,
} from "@/components/landing";
import { Zap, ArrowRight, Mail, RefreshCw, CheckSquare, Calendar, Bell } from "lucide-react";

// Note: For noindex in app router, add this to a separate metadata export or use generateMetadata
// export const metadata: Metadata = {
//   robots: { index: false, follow: true }
// };

const subpillars = [
  {
    title: "Email Sequences",
    description: "Build automated email sequences that nurture leads and drive conversions. Learn best practices for drip campaigns and personalized messaging.",
    href: "/resources/sales-automation/email-sequences",
    icon: Mail,
  },
  {
    title: "Follow-up Automation",
    description: "Never let a lead slip through the cracks. Automate your follow-up process to engage prospects at the perfect moment.",
    href: "/resources/sales-automation/follow-up-automation",
    icon: RefreshCw,
  },
  {
    title: "Task Automation",
    description: "Streamline repetitive sales tasks and free up time for high-value activities. Automate data entry, reminders, and workflows.",
    href: "/resources/sales-automation/task-automation",
    icon: CheckSquare,
  },
  {
    title: "Appointment Scheduling",
    description: "Eliminate back-and-forth emails with automated scheduling. Let prospects book meetings directly into your calendar.",
    href: "/resources/sales-automation/appointment-scheduling",
    icon: Calendar,
  },
  {
    title: "Smart Notifications",
    description: "Get real-time alerts when leads take action. Prioritize hot prospects with intelligent notification systems.",
    href: "/resources/sales-automation/smart-notifications",
    icon: Bell,
  },
];

export default function SalesAutomationPillarPage() {
  return (
    <>
      {/* noindex, follow for SEO */}
      <meta name="robots" content="noindex, follow" />

      <div className="min-h-screen bg-background">
        <LandingHeader />

        <main>
          {/* Hero Section */}
          <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden pt-20">
            <div className="absolute inset-0 -z-10">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-yellow-900/20 via-background to-background" />
              <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-yellow-500/20 rounded-full blur-[128px] animate-pulse" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center max-w-4xl mx-auto"
              >
                <div className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
                  <Zap className="w-4 h-4 mr-2" />
                  Sales Automation Hub
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
                  Master <GradientText animated>Sales Automation</GradientText>
                </h1>

                <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                  Supercharge your sales process with powerful automation. Save time, close more deals,
                  and scale your revenue without scaling your team.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Subpillar Links */}
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
                      className="group block h-full p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-yellow-500/50 hover:bg-yellow-500/5 transition-all duration-300"
                    >
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500">
                          <item.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h2 className="text-xl font-bold mb-2 group-hover:text-yellow-400 transition-colors">
                            {item.title}
                          </h2>
                          <p className="text-muted-foreground text-sm mb-4">
                            {item.description}
                          </p>
                          <span className="inline-flex items-center text-sm font-medium text-yellow-400 group-hover:text-yellow-300">
                            Read Guide
                            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Internal Links to Other Pillars */}
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
                  <Link href="/resources/ai-automation" className="px-4 py-2 rounded-full bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 transition-colors text-sm">
                    AI & Automation
                  </Link>
                  <Link href="/resources/pipeline-management" className="px-4 py-2 rounded-full bg-green-500/10 text-green-400 hover:bg-green-500/20 transition-colors text-sm">
                    Pipeline Management
                  </Link>
                  <Link href="/resources/crm-best-practices" className="px-4 py-2 rounded-full bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 transition-colors text-sm">
                    CRM Best Practices
                  </Link>
                </div>
              </motion.div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-12 text-center"
              >
                <Link href="/handler/sign-up">
                  <GlowButton size="lg" className="group">
                    Automate Your Sales Free
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
