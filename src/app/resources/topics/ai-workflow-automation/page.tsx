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
  Brain,
  ArrowRight,
  Workflow,
  Cpu,
  Zap,
  Bell,
  Sparkles,
  Bot,
} from "lucide-react";

const linkedPages = [
  {
    title: "Automation Workflows",
    description: "Build intelligent automation workflows that respond to triggers and optimize your sales process automatically.",
    href: "/resources/ai-automation/automation-workflows",
    icon: Workflow,
    pillar: "AI & Automation",
    color: "purple",
  },
  {
    title: "Machine Learning CRM",
    description: "Discover how machine learning transforms CRM capabilities and drives smarter business decisions.",
    href: "/resources/ai-automation/machine-learning-crm",
    icon: Cpu,
    pillar: "AI & Automation",
    color: "purple",
  },
  {
    title: "Task Automation",
    description: "Automate repetitive sales tasks like follow-ups, reminders, and data entry to save hours every week.",
    href: "/resources/sales-automation/task-automation",
    icon: Zap,
    pillar: "Sales Automation",
    color: "yellow",
  },
  {
    title: "Smart Notifications",
    description: "Get intelligent alerts when leads take key actions, ensuring you never miss an opportunity.",
    href: "/resources/sales-automation/smart-notifications",
    icon: Bell,
    pillar: "Sales Automation",
    color: "yellow",
  },
];

const relatedTopics = [
  { title: "Predictive Analytics", href: "/resources/ai-automation/predictive-analytics", color: "purple" },
  { title: "Email Sequences", href: "/resources/sales-automation/email-sequences", color: "yellow" },
  { title: "Smart Lead Routing", href: "/resources/ai-automation/smart-lead-routing", color: "purple" },
  { title: "Follow-Up Automation", href: "/resources/sales-automation/follow-up-automation", color: "yellow" },
];

export default function AIWorkflowAutomationPage() {
  return (
    <>
      <meta name="robots" content="noindex, follow" />

      <div className="min-h-screen bg-background">
        <LandingHeader />

        <main>
          {/* Hero Section */}
          <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-20">
            <div className="absolute inset-0 -z-10">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/30 via-background to-background" />
              <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-500/30 rounded-full blur-[128px] animate-pulse" />
              <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-pink-500/20 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: "1s" }} />
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
                  className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20"
                >
                  <Bot className="w-4 h-4 mr-2" />
                  Crossover Topic Hub
                </motion.div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
                  <GradientText animated>AI Workflow Automation</GradientText>
                </h1>

                <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                  Combine the power of artificial intelligence with sales automation workflows
                  to create intelligent systems that work 24/7. Learn how AI enhances automation
                  and transforms your sales process into a self-optimizing machine.
                </p>

                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400">AI & Automation</span>
                  <span className="text-muted-foreground">+</span>
                  <span className="px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-400">Sales Automation</span>
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
                  <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold">The Power of AI-Driven Automation</h2>
                </div>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Traditional automation follows rules you set. AI-powered automation learns,
                    adapts, and optimizes itself over time. When you combine machine learning
                    with workflow automation, your sales processes become smarter with every
                    lead that passes through.
                  </p>
                  <p>
                    From predicting the best time to send follow-ups to automatically routing
                    leads based on conversion likelihood, AI transforms static workflows into
                    dynamic, intelligent systems that continuously improve your results.
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
                  Deep-dive into specific aspects of AI workflow automation with our comprehensive guides.
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
                      className="group block h-full p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-purple-500/50 hover:bg-purple-500/5 transition-all duration-300"
                    >
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${page.color === "purple" ? "from-purple-500 to-pink-500" : "from-yellow-500 to-orange-500"}`}>
                          <page.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`text-xs px-2 py-0.5 rounded-full ${page.color === "purple" ? "bg-purple-500/10 text-purple-400" : "bg-yellow-500/10 text-yellow-400"}`}>
                              {page.pillar}
                            </span>
                          </div>
                          <h3 className="text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors">
                            {page.title}
                          </h3>
                          <p className="text-muted-foreground text-sm mb-4">
                            {page.description}
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
                  Why AI + Automation = <GradientText>Results</GradientText>
                </h2>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    icon: Brain,
                    title: "Self-Optimizing Workflows",
                    description: "AI analyzes outcomes and automatically adjusts timing, messaging, and routing for better results."
                  },
                  {
                    icon: Zap,
                    title: "Instant Adaptation",
                    description: "Respond to lead behavior in real-time with intelligent triggers that go beyond simple rules."
                  },
                  {
                    icon: Sparkles,
                    title: "Personalization at Scale",
                    description: "Deliver individualized experiences to thousands of leads without manual intervention."
                  }
                ].map((benefit, index) => (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="p-6 rounded-2xl bg-gradient-to-br from-purple-500/5 to-pink-500/5 border border-border hover:border-purple-500/30 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mb-4">
                      <benefit.icon className="w-6 h-6 text-purple-500" />
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
                      className={`px-4 py-2 rounded-full ${topic.color === "purple" ? "bg-purple-500/10 text-purple-400 hover:bg-purple-500/20" : "bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20"} transition-colors text-sm`}
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
                  Ready to <GradientText>Automate Intelligently</GradientText>?
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Experience the future of sales automation with LeadFlow's AI-powered workflows.
                  Start your free trial and see how intelligent automation can transform your results.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href="/handler/sign-up">
                    <GlowButton size="lg" className="group">
                      Start Free Trial
                      <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </GlowButton>
                  </Link>
                  <Link
                    href="/resources/ai-automation"
                    className="inline-flex items-center gap-2 px-6 py-3 text-base font-medium rounded-full border border-border hover:bg-accent transition-colors"
                  >
                    Explore AI & Automation Hub
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
