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
  Mail,
  Zap,
  Clock,
  Target,
  GitBranch,
  BarChart3,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Users,
} from "lucide-react";


const relatedContent = [
  {
    title: "Email Sequences",
    description: "Build automated email campaigns that nurture leads through your sales funnel.",
    href: "/resources/sales-automation/email-sequences",
    icon: Mail,
    pillar: "Sales Automation",
  },
  {
    title: "Follow-up Automation",
    description: "Never miss a follow-up again with intelligent automation that keeps leads engaged.",
    href: "/resources/sales-automation/follow-up-automation",
    icon: Clock,
    pillar: "Sales Automation",
  },
  {
    title: "Pipeline Setup",
    description: "Configure your sales pipeline for maximum efficiency and visibility.",
    href: "/resources/crm-best-practices/pipeline-setup",
    icon: GitBranch,
    pillar: "CRM Best Practices",
  },
  {
    title: "Deal Tracking",
    description: "Track every deal from first touch to close with comprehensive deal management.",
    href: "/resources/crm-best-practices/deal-tracking",
    icon: Target,
    pillar: "CRM Best Practices",
  },
  {
    title: "Task Automation",
    description: "Automate repetitive tasks to free up your sales team for high-value activities.",
    href: "/resources/sales-automation/task-automation",
    icon: Zap,
    pillar: "Sales Automation",
  },
  {
    title: "CRM Customization",
    description: "Tailor your CRM to match your unique sales process and workflows.",
    href: "/resources/crm-best-practices/crm-customization",
    icon: BarChart3,
    pillar: "CRM Best Practices",
  },
];

const relatedTopics = [
  {
    title: "AI Lead Scoring Strategies",
    description: "Combine AI automation with lead generation for smarter prospecting.",
    href: "/resources/topics/ai-lead-scoring-strategies",
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

export default function AutomatedEmailSequencesPage() {
  return (
    <div className="min-h-screen bg-background">
        <LandingHeader />

        <main>
          {/* Hero Section */}
          <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-20">
            {/* Background Effects - Yellow/Orange Theme */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-900/30 via-background to-background" />
              <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-yellow-500/25 rounded-full blur-[128px] animate-pulse" />
              <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-orange-500/20 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: "1s" }} />
              <div className="absolute bottom-1/4 left-1/3 w-[300px] h-[300px] bg-amber-500/15 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "2s" }} />
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
                  className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Sales Automation + CRM Best Practices
                </motion.div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
                  Automated Email{" "}
                  <GradientText animated>Sequences</GradientText>
                </h1>

                <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                  Master the art of automated follow-ups combined with CRM best practices.
                  Build email sequences that nurture leads through every stage of your pipeline,
                  ensuring no opportunity slips through the cracks.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href="/handler/sign-up">
                    <GlowButton size="lg" className="group">
                      Start Automating Follow-ups
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
                    Where <GradientText>Automation Meets Strategy</GradientText>
                  </h2>
                  <div className="prose prose-lg prose-invert max-w-none">
                    <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                      Email remains the backbone of B2B sales communication, but manually sending
                      follow-ups is both time-consuming and error-prone. The magic happens when you
                      combine intelligent email automation with a well-structured CRM pipeline.
                      Each email sequence stage maps directly to your pipeline stages, creating
                      a synchronized system that moves leads forward automatically.
                    </p>
                    <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                      Sales automation isn&apos;t just about saving time - it&apos;s about consistency and
                      timing. Studies show that leads contacted within 5 minutes of inquiry are
                      21x more likely to convert. With automated sequences triggered by CRM events,
                      you can ensure every lead receives the right message at the right moment.
                    </p>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      This resource hub connects the dots between email sequence strategy and
                      CRM configuration. Learn how to design sequences that align with your
                      pipeline stages, track engagement through deal stages, and create a
                      seamless flow from first touch to closed deal.
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
                  The Power of <GradientText>Integrated Workflows</GradientText>
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  When email automation and CRM practices work together, results multiply.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    icon: Calendar,
                    title: "Perfect Timing Every Time",
                    description: "Automated sequences fire at optimal intervals, while CRM triggers ensure messages align with pipeline movement.",
                  },
                  {
                    icon: CheckCircle2,
                    title: "Complete Pipeline Visibility",
                    description: "Every email interaction updates your CRM, giving you full visibility into engagement at each deal stage.",
                  },
                  {
                    icon: Users,
                    title: "Scalable Personalization",
                    description: "Use CRM data to personalize sequences at scale - reaching hundreds of leads with messages that feel 1-to-1.",
                  },
                ].map((benefit, index) => (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="p-6 rounded-2xl bg-card border border-border hover:border-amber-500/50 transition-all"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 flex items-center justify-center mb-4">
                      <benefit.icon className="w-6 h-6 text-amber-500" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Workflow Diagram */}
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
                  How It <GradientText>Works Together</GradientText>
                </h2>
              </motion.div>

              <div className="max-w-4xl mx-auto">
                <div className="grid md:grid-cols-4 gap-4">
                  {[
                    { step: "1", title: "Lead Enters Pipeline", desc: "New lead captured via form or ad" },
                    { step: "2", title: "Sequence Triggers", desc: "Welcome email sent automatically" },
                    { step: "3", title: "Engagement Tracked", desc: "Opens and clicks logged to CRM" },
                    { step: "4", title: "Pipeline Updates", desc: "Lead advances based on engagement" },
                  ].map((item, index) => (
                    <motion.div
                      key={item.step}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.15 }}
                      className="relative"
                    >
                      <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-500/5 to-orange-500/5 border border-border text-center">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center text-white font-bold mx-auto mb-3">
                          {item.step}
                        </div>
                        <h3 className="font-semibold mb-1">{item.title}</h3>
                        <p className="text-muted-foreground text-sm">{item.desc}</p>
                      </div>
                      {index < 3 && (
                        <div className="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2 z-10">
                          <ArrowRight className="w-4 h-4 text-amber-500" />
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Related Content Grid */}
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
                  Explore <GradientText>Related Resources</GradientText>
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Deep dive into email automation and CRM configuration from our resource library.
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
                      className="block p-6 rounded-2xl bg-card border border-border hover:border-amber-500/50 transition-all hover:shadow-lg hover:shadow-amber-500/10 h-full group"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 flex items-center justify-center flex-shrink-0">
                          <item.icon className="w-6 h-6 text-amber-500" />
                        </div>
                        <div className="flex-1">
                          <span className="text-xs text-amber-400 font-medium">{item.pillar}</span>
                          <h3 className="text-lg font-semibold mt-1 mb-2 group-hover:text-amber-400 transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-muted-foreground text-sm mb-3">{item.description}</p>
                          <span className="text-amber-500 text-sm font-medium inline-flex items-center">
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
          <section className="py-20 lg:py-28">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center max-w-3xl mx-auto"
              >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
                  Ready to Automate Your <GradientText>Follow-ups</GradientText>?
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Stop letting leads go cold. LeadFlow combines powerful email automation
                  with intuitive CRM tools to keep every prospect engaged.
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
          <section className="py-20 lg:py-28 bg-muted/30">
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
                      className="block p-6 rounded-2xl border border-border hover:border-amber-500/30 transition-all hover:bg-muted/50 group"
                    >
                      <h3 className="text-lg font-semibold mb-2 group-hover:text-amber-400 transition-colors">
                        {topic.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-3">{topic.description}</p>
                      <span className="text-amber-500 text-sm font-medium inline-flex items-center">
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
