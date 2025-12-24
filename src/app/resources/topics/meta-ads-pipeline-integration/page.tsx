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
  Instagram,
  GitBranch,
  Layers,
  TrendingUp,
  ArrowRight,
  Zap,
  Target,
  BarChart3,
  RefreshCw,
} from "lucide-react";


const relatedContent = [
  {
    title: "Facebook Lead Ads",
    description: "Create high-converting Facebook lead ads that capture quality prospects directly in-app.",
    href: "/resources/meta-ads/facebook-lead-ads",
    icon: Facebook,
    pillar: "Meta Ads",
  },
  {
    title: "Instagram Lead Generation",
    description: "Leverage Instagram's visual platform to generate qualified leads for your business.",
    href: "/resources/meta-ads/instagram-lead-generation",
    icon: Instagram,
    pillar: "Meta Ads",
  },
  {
    title: "Kanban Boards",
    description: "Visualize your sales pipeline with intuitive kanban-style deal management.",
    href: "/resources/pipeline-management/kanban-boards",
    icon: Layers,
    pillar: "Pipeline Management",
  },
  {
    title: "Stage Optimization",
    description: "Optimize each pipeline stage to maximize conversion rates and reduce deal cycle time.",
    href: "/resources/pipeline-management/stage-optimization",
    icon: TrendingUp,
    pillar: "Pipeline Management",
  },
  {
    title: "Audience Targeting",
    description: "Master Meta's audience targeting to reach your ideal customers with precision.",
    href: "/resources/meta-ads/audience-targeting",
    icon: Target,
    pillar: "Meta Ads",
  },
  {
    title: "Deal Velocity",
    description: "Accelerate deal velocity by identifying and removing pipeline bottlenecks.",
    href: "/resources/pipeline-management/deal-velocity",
    icon: Zap,
    pillar: "Pipeline Management",
  },
];

const relatedTopics = [
  {
    title: "AI Lead Scoring Strategies",
    description: "Combine AI automation with lead generation for smarter prospecting.",
    href: "/resources/topics/ai-lead-scoring-strategies",
  },
  {
    title: "Automated Email Sequences",
    description: "Master sales automation and CRM integration for follow-up excellence.",
    href: "/resources/topics/automated-email-sequences",
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

export default function MetaAdsPipelineIntegrationPage() {
  return (
    <div className="min-h-screen bg-background">
        <LandingHeader />

        <main>
          {/* Hero Section */}
          <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-20">
            {/* Background Effects - Blue Theme */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/30 via-background to-background" />
              <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-500/25 rounded-full blur-[128px] animate-pulse" />
              <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-cyan-500/20 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: "1s" }} />
              <div className="absolute bottom-1/4 left-1/3 w-[300px] h-[300px] bg-indigo-500/15 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "2s" }} />
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
                  <Facebook className="w-4 h-4 mr-2" />
                  Meta Ads + Pipeline Management
                </motion.div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
                  Meta Ads Pipeline{" "}
                  <GradientText animated>Integration</GradientText>
                </h1>

                <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                  Connect your Meta advertising campaigns directly to your sales pipeline.
                  From Facebook lead ads to Instagram lead generation, learn how to create
                  a seamless flow that turns ad spend into closed deals.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href="/handler/sign-up">
                    <GlowButton size="lg" className="group">
                      Connect Meta Ads to Your Pipeline
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
                    From Ad Click to <GradientText>Closed Deal</GradientText>
                  </h2>
                  <div className="prose prose-lg prose-invert max-w-none">
                    <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                      Meta&apos;s advertising platforms - Facebook and Instagram - generate millions
                      of leads daily for businesses worldwide. But without proper pipeline
                      integration, these leads can get lost in spreadsheets, delayed in follow-up,
                      or worse, never contacted at all. The gap between ad platforms and your
                      sales process is where opportunities go to die.
                    </p>
                    <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                      The solution is seamless integration. When a lead submits a form on
                      Facebook or engages with your Instagram content, they should automatically
                      appear in your sales pipeline, properly categorized, scored, and ready
                      for follow-up. No manual exports, no data entry, no delays.
                    </p>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      This hub brings together resources on both Meta advertising best practices
                      and pipeline management strategies. Learn how to optimize your ad campaigns
                      for quality leads while building pipeline stages that efficiently convert
                      those leads into customers.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Integration Flow */}
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
                  The <GradientText>Integration Flow</GradientText>
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  See how Meta ads connect seamlessly with your sales pipeline for maximum conversion.
                </p>
              </motion.div>

              <div className="max-w-5xl mx-auto">
                <div className="grid md:grid-cols-5 gap-4">
                  {[
                    { icon: Facebook, title: "Meta Ad", desc: "User sees your ad on Facebook or Instagram" },
                    { icon: Target, title: "Lead Form", desc: "Prospect submits lead form with details" },
                    { icon: Zap, title: "Instant Sync", desc: "Lead appears in CRM within seconds" },
                    { icon: GitBranch, title: "Pipeline Entry", desc: "Automatically placed in correct stage" },
                    { icon: RefreshCw, title: "Follow-up", desc: "Automated sequences nurture the lead" },
                  ].map((item, index) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="relative"
                    >
                      <div className="p-4 rounded-2xl bg-card border border-border text-center h-full">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center mx-auto mb-3">
                          <item.icon className="w-6 h-6 text-blue-500" />
                        </div>
                        <h3 className="font-semibold mb-1 text-sm">{item.title}</h3>
                        <p className="text-muted-foreground text-xs">{item.desc}</p>
                      </div>
                      {index < 4 && (
                        <div className="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2 z-10">
                          <ArrowRight className="w-4 h-4 text-blue-500" />
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Key Benefits */}
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
                  Why Integration <GradientText>Matters</GradientText>
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  The difference between manual lead handling and automated integration is dramatic.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    icon: Zap,
                    title: "Instant Lead Response",
                    description: "Leads receive follow-up within minutes instead of hours. Studies show this alone can increase conversion rates by 391%.",
                  },
                  {
                    icon: BarChart3,
                    title: "True ROI Tracking",
                    description: "Track ad spend through to closed revenue. Know exactly which campaigns, audiences, and creatives drive real business results.",
                  },
                  {
                    icon: Layers,
                    title: "Visual Pipeline Control",
                    description: "See all your Meta leads in a kanban view, organized by stage. Never lose track of where each opportunity stands.",
                  },
                ].map((benefit, index) => (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="p-6 rounded-2xl bg-card border border-border hover:border-blue-500/50 transition-all"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center mb-4">
                      <benefit.icon className="w-6 h-6 text-blue-500" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </motion.div>
                ))}
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
                  Deep dive into Meta advertising and pipeline management from our resource library.
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
                      className="block p-6 rounded-2xl bg-card border border-border hover:border-blue-500/50 transition-all hover:shadow-lg hover:shadow-blue-500/10 h-full group"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center flex-shrink-0">
                          <item.icon className="w-6 h-6 text-blue-500" />
                        </div>
                        <div className="flex-1">
                          <span className="text-xs text-blue-400 font-medium">{item.pillar}</span>
                          <h3 className="text-lg font-semibold mt-1 mb-2 group-hover:text-blue-400 transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-muted-foreground text-sm mb-3">{item.description}</p>
                          <span className="text-blue-500 text-sm font-medium inline-flex items-center">
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
                  Ready to Connect <GradientText>Meta to Your CRM</GradientText>?
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  LeadFlow offers native Meta integration that syncs leads instantly to your
                  pipeline. Start converting more ad leads into customers today.
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
                      className="block p-6 rounded-2xl border border-border hover:border-blue-500/30 transition-all hover:bg-muted/50 group"
                    >
                      <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                        {topic.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-3">{topic.description}</p>
                      <span className="text-blue-500 text-sm font-medium inline-flex items-center">
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
