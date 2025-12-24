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
  Target,
  Sparkles,
  TrendingUp,
  FileText,
  Settings,
  ArrowRight,
  Zap,
  BarChart3,
  Users,
} from "lucide-react";


const relatedContent = [
  {
    title: "AI Lead Scoring",
    description: "Use machine learning to automatically score and prioritize your most promising leads.",
    href: "/resources/ai-automation/ai-lead-scoring",
    icon: Brain,
    pillar: "AI & Automation",
  },
  {
    title: "Predictive Analytics",
    description: "Forecast sales outcomes and identify trends before they happen with AI-powered insights.",
    href: "/resources/ai-automation/predictive-analytics",
    icon: TrendingUp,
    pillar: "AI & Automation",
  },
  {
    title: "Lead Magnets",
    description: "Create compelling offers that attract high-quality leads to your sales funnel.",
    href: "/resources/lead-generation/lead-magnets",
    icon: Target,
    pillar: "Lead Generation",
  },
  {
    title: "Form Optimization",
    description: "Design high-converting forms that capture the right information without friction.",
    href: "/resources/lead-generation/form-optimization",
    icon: FileText,
    pillar: "Lead Generation",
  },
  {
    title: "Smart Lead Routing",
    description: "Automatically route leads to the right sales rep based on AI-determined criteria.",
    href: "/resources/ai-automation/smart-lead-routing",
    icon: Zap,
    pillar: "AI & Automation",
  },
  {
    title: "Lead Capture Tools",
    description: "Deploy powerful tools to capture leads from every touchpoint in your marketing.",
    href: "/resources/lead-generation/lead-capture-tools",
    icon: Settings,
    pillar: "Lead Generation",
  },
];

const relatedTopics = [
  {
    title: "Automated Email Sequences",
    description: "Master sales automation and CRM integration for follow-up excellence.",
    href: "/resources/topics/automated-email-sequences",
  },
  {
    title: "Meta Ads Pipeline Integration",
    description: "Connect Meta advertising with your sales pipeline for seamless lead flow.",
    href: "/resources/topics/meta-ads-pipeline-integration",
  },
  {
    title: "Contact Segmentation Analytics",
    description: "Combine contact management with analytics for data-driven sales strategies.",
    href: "/resources/topics/contact-segmentation-analytics",
  },
  {
    title: "Team CRM Collaboration",
    description: "Enable team collaboration through effective CRM practices and workflows.",
    href: "/resources/topics/team-crm-collaboration",
  },
];

export default function AILeadScoringStrategiesPage() {
  return (
    <div className="min-h-screen bg-background">
        <LandingHeader />

        <main>
          {/* Hero Section */}
          <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-20">
            {/* Background Effects - Purple Theme */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/30 via-background to-background" />
              <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-500/30 rounded-full blur-[128px] animate-pulse" />
              <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-violet-500/20 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: "1s" }} />
              <div className="absolute bottom-1/4 left-1/3 w-[300px] h-[300px] bg-fuchsia-500/15 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "2s" }} />
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
                  <Sparkles className="w-4 h-4 mr-2" />
                  AI & Automation + Lead Generation
                </motion.div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
                  AI Lead Scoring{" "}
                  <GradientText animated>Strategies</GradientText>
                </h1>

                <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                  Combine the power of artificial intelligence with proven lead generation
                  techniques. Learn how AI-driven scoring models work with lead magnets and
                  form optimization to identify your most valuable prospects automatically.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href="/handler/sign-up">
                    <GlowButton size="lg" className="group">
                      Start Scoring Leads with AI
                      <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </GlowButton>
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Introduction Section */}
          <section className="py-20 lg:py-28">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
                    The Intersection of <GradientText>AI and Lead Generation</GradientText>
                  </h2>
                  <div className="prose prose-lg prose-invert max-w-none">
                    <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                      Modern sales teams face an overwhelming challenge: too many leads, not
                      enough time. The solution lies at the intersection of AI-powered scoring
                      and strategic lead generation. When you combine intelligent algorithms
                      with well-designed lead capture systems, you create a self-optimizing
                      machine that continuously improves your sales efficiency.
                    </p>
                    <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                      AI lead scoring analyzes hundreds of behavioral and demographic signals
                      to predict which leads are most likely to convert. But the quality of
                      those predictions depends heavily on the data you collect. That&apos;s where
                      strategic lead magnets and optimized forms come in - they ensure you&apos;re
                      capturing the right information to fuel your AI models.
                    </p>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      This hub brings together resources from both domains, showing you how to
                      build a lead generation and scoring system that works together seamlessly.
                      From creating compelling lead magnets to implementing predictive analytics,
                      you&apos;ll find everything you need to identify your best leads faster.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Key Benefits */}
          <section className="py-20 lg:py-28 bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                  Why This <GradientText>Combination Works</GradientText>
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  The synergy between AI scoring and lead generation creates compounding benefits.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    icon: Brain,
                    title: "Smarter Lead Qualification",
                    description: "AI analyzes form responses and engagement patterns to instantly qualify leads, reducing manual review time by up to 80%.",
                  },
                  {
                    icon: BarChart3,
                    title: "Data-Driven Optimization",
                    description: "Use AI insights to continuously improve your lead magnets and forms based on what actually converts.",
                  },
                  {
                    icon: Users,
                    title: "Better Sales Alignment",
                    description: "Give your sales team a clear priority list backed by predictive data, not just gut feelings.",
                  },
                ].map((benefit, index) => (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="p-6 rounded-2xl bg-card border border-border hover:border-purple-500/50 transition-all"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-violet-500/20 flex items-center justify-center mb-4">
                      <benefit.icon className="w-6 h-6 text-purple-500" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Related Content Grid */}
          <section className="py-20 lg:py-28">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                  Explore <GradientText>Related Resources</GradientText>
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Deep dive into AI scoring and lead generation strategies from our resource library.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                      className="block p-6 rounded-2xl bg-card border border-border hover:border-purple-500/50 transition-all hover:shadow-lg hover:shadow-purple-500/10 h-full group"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-violet-500/20 flex items-center justify-center flex-shrink-0">
                          <item.icon className="w-6 h-6 text-purple-500" />
                        </div>
                        <div className="flex-1">
                          <span className="text-xs text-purple-400 font-medium">{item.pillar}</span>
                          <h3 className="text-lg font-semibold mt-1 mb-2 group-hover:text-purple-400 transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-muted-foreground text-sm mb-3">{item.description}</p>
                          <span className="text-purple-500 text-sm font-medium inline-flex items-center">
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

          {/* CTA Section */}
          <section className="py-20 lg:py-28 bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center max-w-3xl mx-auto"
              >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
                  Ready to Score Leads <GradientText>Smarter</GradientText>?
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Start using AI-powered lead scoring today. LeadFlow combines intelligent
                  algorithms with seamless lead capture to help you focus on what matters most.
                </p>
                <Link href="/handler/sign-up">
                  <GlowButton size="lg" className="group">
                    Start Your Free Trial
                    <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </GlowButton>
                </Link>
              </motion.div>
            </div>
          </section>

          {/* Related Topics Section */}
          <section className="py-20 lg:py-28">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                  Related <GradientText>Topics</GradientText>
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Explore more crossover topics that combine multiple areas of sales and marketing expertise.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
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
                      className="block p-6 rounded-2xl border border-border hover:border-purple-500/30 transition-all hover:bg-muted/50 group"
                    >
                      <h3 className="text-lg font-semibold mb-2 group-hover:text-purple-400 transition-colors">
                        {topic.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-3">{topic.description}</p>
                      <span className="text-purple-500 text-sm font-medium inline-flex items-center">
                        Explore topic <ArrowRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </main>

        <LandingFooter />
    </div>
  );
}
