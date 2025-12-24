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
  Sparkles,
  ArrowRight,
  Target,
  Brain,
  Route,
  FileInput,
  Zap,
  TrendingUp,
  Bot,
  Filter,
} from "lucide-react";

export default function LeadQualificationAutomationClient() {
  const relatedContent = [
    {
      title: "Lead Magnets That Convert",
      description: "Create irresistible offers that capture high-quality leads ready for qualification.",
      href: "/resources/lead-generation/lead-magnets",
      icon: Target,
      pillar: "Lead Generation",
    },
    {
      title: "AI Lead Scoring",
      description: "Leverage machine learning to automatically score and prioritize your most promising leads.",
      href: "/resources/ai-automation/ai-lead-scoring",
      icon: Brain,
      pillar: "AI & Automation",
    },
    {
      title: "Smart Lead Routing",
      description: "Automatically route qualified leads to the right sales reps based on criteria you define.",
      href: "/resources/ai-automation/smart-lead-routing",
      icon: Route,
      pillar: "AI & Automation",
    },
    {
      title: "Form Optimization",
      description: "Build high-converting forms that capture the data you need for effective qualification.",
      href: "/resources/lead-generation/form-optimization",
      icon: FileInput,
      pillar: "Lead Generation",
    },
  ];

  const relatedTopics = [
    { title: "Pipeline Bottleneck Analysis", href: "/resources/topics/pipeline-bottleneck-analysis" },
    { title: "Team Performance Tracking", href: "/resources/topics/team-performance-tracking" },
    { title: "Facebook Lead Automation", href: "/resources/topics/facebook-lead-automation" },
  ];

  return (
    <>
      <LandingHeader />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-background to-background" />
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-500/30 rounded-full blur-[128px] animate-pulse" />
            <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-violet-500/20 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: "1s" }} />
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto text-center"
            >
              <span className="inline-flex items-center px-3 py-1 mb-6 text-sm font-medium rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                <Sparkles className="w-4 h-4 mr-2" />
                Lead Generation + AI & Automation
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
                <GradientText>Lead Qualification</GradientText> Automation
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Combine powerful lead generation strategies with AI-driven automation to qualify leads faster, route them smarter, and close more deals with less manual effort.
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
                  Why <GradientText>Automated Qualification</GradientText> Matters
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Manual lead qualification wastes time and lets hot leads go cold. Automation ensures every lead gets evaluated instantly and routed to the right person.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { icon: Zap, title: "Instant Response", description: "Qualify and route leads in seconds, not hours, keeping engagement high." },
                  { icon: TrendingUp, title: "Better Conversion", description: "AI-scored leads convert 3x better than manually qualified ones." },
                  { icon: Bot, title: "24/7 Operation", description: "Never miss a hot lead, even outside business hours." },
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="p-6 rounded-xl bg-card border border-border"
                  >
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500/20 to-violet-500/20 flex items-center justify-center mb-4">
                      <item.icon className="w-6 h-6 text-purple-500" />
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
                <span className="inline-flex items-center px-3 py-1 mb-4 text-sm font-medium rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  <Filter className="w-4 h-4 mr-2" />
                  Deep Dive Resources
                </span>
                <h2 className="text-3xl font-bold mb-4">
                  Explore <GradientText>Related Content</GradientText>
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Master every aspect of lead qualification automation with these in-depth guides.
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
                      <div className="p-6 rounded-xl bg-card border border-border hover:border-purple-500/50 transition-all duration-300 h-full">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500/20 to-violet-500/20 flex items-center justify-center flex-shrink-0 group-hover:from-purple-500/30 group-hover:to-violet-500/30 transition-colors">
                            <item.icon className="w-6 h-6 text-purple-500" />
                          </div>
                          <div className="flex-1">
                            <span className="text-xs text-purple-400 mb-1 block">{item.pillar}</span>
                            <h3 className="text-lg font-semibold mb-2 group-hover:text-purple-400 transition-colors">
                              {item.title}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                            <span className="inline-flex items-center text-sm text-purple-400 group-hover:text-purple-300">
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
                    className="px-4 py-2 rounded-full bg-card border border-border hover:border-purple-500/50 text-sm text-muted-foreground hover:text-purple-400 transition-all"
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
                Ready to <GradientText>Automate Lead Qualification</GradientText>?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                LeadFlow combines AI scoring, smart routing, and automation workflows to qualify your leads instantly. Start your free trial and see the difference.
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
