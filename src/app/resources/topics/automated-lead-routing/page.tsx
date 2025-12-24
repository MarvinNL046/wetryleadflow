"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Route,
  Brain,
  Workflow,
  Globe,
  FormInput,
  ArrowRight,
  CheckCircle,
  Zap,
  Users,
  Clock,
  Target,
  Shuffle,
  GitBranch,
} from "lucide-react";
import {
  LandingHeader,
  LandingFooter,
  GlowButton,
  SectionHeading,
} from "@/components/landing";

export default function AutomatedLeadRoutingPage() {
  const relatedContent = [
    {
      title: "Smart Lead Routing",
      href: "/resources/ai-automation/smart-lead-routing",
      description: "AI-powered lead distribution that matches leads to the best-fit sales reps.",
      icon: Route,
      pillar: "AI & Automation",
    },
    {
      title: "Automation Workflows",
      href: "/resources/ai-automation/automation-workflows",
      description: "Build powerful automation workflows that work while you sleep.",
      icon: Workflow,
      pillar: "AI & Automation",
    },
    {
      title: "Traffic Sources",
      href: "/resources/lead-generation/traffic-sources",
      description: "Capture leads from multiple channels and route them automatically.",
      icon: Globe,
      pillar: "Lead Generation",
    },
    {
      title: "Form Optimization",
      href: "/resources/lead-generation/form-optimization",
      description: "Design forms that capture routing data for intelligent distribution.",
      icon: FormInput,
      pillar: "Lead Generation",
    },
    {
      title: "AI Lead Scoring",
      href: "/resources/ai-automation/ai-lead-scoring",
      description: "Score leads automatically to prioritize routing decisions.",
      icon: Brain,
      pillar: "AI & Automation",
    },
  ];

  const relatedTopics = [
    {
      title: "Real Estate Lead Generation",
      href: "/resources/topics/real-estate-lead-generation",
      description: "Capture and convert property leads effectively.",
    },
    {
      title: "SaaS Pipeline Optimization",
      href: "/resources/topics/saas-pipeline-optimization",
      description: "Optimize your SaaS sales pipeline.",
    },
    {
      title: "AI Sales Forecasting",
      href: "/resources/topics/ai-sales-forecasting",
      description: "Predict revenue with AI-powered analytics.",
    },
    {
      title: "Meta Audience Targeting",
      href: "/resources/topics/meta-audience-targeting",
      description: "Target the right audiences on Meta platforms.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
        <LandingHeader />
        <main>
          {/* Hero Section */}
          <section className="relative pt-32 pb-20 overflow-hidden">
            {/* Purple gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-fuchsia-500/10" />
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-fuchsia-500/20 rounded-full blur-3xl" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto text-center"
              >
                <div className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  <Route className="w-4 h-4 mr-2" />
                  AI & Automation + Lead Generation
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                  <span className="bg-gradient-to-r from-purple-500 to-fuchsia-500 bg-clip-text text-transparent">
                    Automated Lead Routing
                  </span>{" "}
                  Mastery Guide
                </h1>

                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Combine intelligent automation with lead generation best practices to ensure
                  every lead reaches the right sales rep instantly. Eliminate delays,
                  improve response times, and boost conversion rates.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/handler/sign-up">
                    <GlowButton size="lg">
                      Automate Your Lead Routing
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </GlowButton>
                  </Link>
                  <Link href="/resources/ai-automation/smart-lead-routing">
                    <GlowButton variant="secondary" size="lg">
                      Explore Smart Routing
                    </GlowButton>
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Why Speed Matters */}
          <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <SectionHeading
                badge="The Challenge"
                title="Why Lead Routing Speed Is Critical"
                titleGradient="Speed Is Critical"
                description="In sales, every minute counts. Manual lead routing creates delays that kill deals."
              />

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                {[
                  {
                    icon: Clock,
                    title: "The 5-Minute Window",
                    description:
                      "Studies show that responding to leads within 5 minutes increases conversion rates by 9x. Manual routing makes this nearly impossible at scale.",
                  },
                  {
                    icon: Shuffle,
                    title: "Misrouted Leads",
                    description:
                      "Sending leads to the wrong rep wastes time and frustrates both salespeople and prospects. Smart routing matches leads to the best-fit rep automatically.",
                  },
                  {
                    icon: Users,
                    title: "Uneven Distribution",
                    description:
                      "Without automation, some reps get overloaded while others starve. Balanced routing ensures fair distribution and optimal team performance.",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="p-6 rounded-2xl bg-background border border-border hover:border-purple-500/50 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-fuchsia-500 flex items-center justify-center mb-4">
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Routing Strategies */}
          <section className="py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <SectionHeading
                badge="Strategies"
                title="Intelligent Lead Routing Strategies"
                titleGradient="Lead Routing Strategies"
                description="Configure routing rules that match your sales process and team structure."
              />

              <div className="grid lg:grid-cols-2 gap-12 mt-12">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="space-y-6"
                >
                  {[
                    {
                      title: "Geographic Territory Routing",
                      description:
                        "Automatically route leads to reps who own specific territories. LeadFlow detects location from form data, IP address, or company information.",
                    },
                    {
                      title: "Round-Robin Distribution",
                      description:
                        "Distribute leads evenly across your team with weighted round-robin. Adjust weights based on rep experience, capacity, or performance.",
                    },
                    {
                      title: "Skill-Based Matching",
                      description:
                        "Route leads based on product interest, deal size, or industry to reps with relevant expertise. AI learns which reps perform best with which lead types.",
                    },
                    {
                      title: "Account-Based Routing",
                      description:
                        "Automatically route leads from target accounts to their assigned account owners. Ensure strategic prospects always reach the right team.",
                    },
                  ].map((strategy, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-5 h-5 text-purple-500" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{strategy.title}</h3>
                        <p className="text-muted-foreground text-sm">
                          {strategy.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="rounded-2xl bg-gradient-to-br from-purple-500/20 to-fuchsia-500/20 border border-purple-500/30 p-8">
                    <div className="flex items-center gap-2 mb-6">
                      <GitBranch className="w-5 h-5 text-purple-400" />
                      <h3 className="text-lg font-semibold">Routing Flow Visualization</h3>
                    </div>

                    {/* Routing Flow Diagram */}
                    <div className="space-y-4">
                      <div className="p-4 rounded-lg bg-background/50 text-center">
                        <span className="text-sm font-medium">New Lead Captured</span>
                      </div>
                      <div className="flex justify-center">
                        <div className="w-px h-8 bg-purple-500/50" />
                      </div>
                      <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/30 text-center">
                        <span className="text-sm font-medium text-purple-400">AI Scoring & Analysis</span>
                      </div>
                      <div className="flex justify-center">
                        <div className="w-px h-8 bg-purple-500/50" />
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="p-3 rounded-lg bg-background/50 text-center">
                          <span className="text-xs">Enterprise</span>
                          <p className="text-xs text-muted-foreground mt-1">Sarah K.</p>
                        </div>
                        <div className="p-3 rounded-lg bg-background/50 text-center">
                          <span className="text-xs">Mid-Market</span>
                          <p className="text-xs text-muted-foreground mt-1">John D.</p>
                        </div>
                        <div className="p-3 rounded-lg bg-background/50 text-center">
                          <span className="text-xs">SMB</span>
                          <p className="text-xs text-muted-foreground mt-1">Mike R.</p>
                        </div>
                      </div>
                      <div className="flex justify-center">
                        <div className="w-px h-8 bg-purple-500/50" />
                      </div>
                      <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30 text-center">
                        <span className="text-sm font-medium text-green-400">Instant Notification & Assignment</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Related Content Hub */}
          <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <SectionHeading
                badge="Resources"
                title="Lead Routing & Automation Resources"
                titleGradient="Automation Resources"
                description="Master every aspect of automated lead routing with these guides."
              />

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                {relatedContent.map((resource, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={resource.href}
                      className="block p-6 rounded-2xl bg-background border border-border hover:border-purple-500/50 transition-all hover:shadow-lg hover:shadow-purple-500/10 h-full"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-fuchsia-500 flex items-center justify-center flex-shrink-0">
                          <resource.icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <span className="text-xs text-purple-400 font-medium">
                            {resource.pillar}
                          </span>
                          <h3 className="font-semibold mt-1 mb-2">{resource.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {resource.description}
                          </p>
                          <span className="inline-flex items-center text-sm text-purple-400 mt-4">
                            Learn more <ArrowRight className="ml-1 w-4 h-4" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Results Section */}
          <section className="py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <SectionHeading
                badge="Results"
                title="What Automated Routing Achieves"
                titleGradient="Automated Routing"
                description="Teams using LeadFlow's automated routing see dramatic improvements."
              />

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
                {[
                  {
                    icon: Zap,
                    metric: "< 30s",
                    label: "Average Routing Time",
                    description: "Leads reach the right rep in under 30 seconds.",
                  },
                  {
                    icon: Target,
                    metric: "67%",
                    label: "Higher Contact Rates",
                    description: "Faster response means more conversations started.",
                  },
                  {
                    icon: Users,
                    metric: "40%",
                    label: "Better Rep Utilization",
                    description: "Balanced distribution maximizes team productivity.",
                  },
                  {
                    icon: Clock,
                    metric: "8hrs",
                    label: "Weekly Time Saved",
                    description: "Eliminate manual lead assignment completely.",
                  },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center p-6 rounded-2xl bg-muted/50 border border-border"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-fuchsia-500 flex items-center justify-center mx-auto mb-4">
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-4xl font-bold mb-1">
                      <span className="bg-gradient-to-r from-purple-500 to-fuchsia-500 bg-clip-text text-transparent">
                        {stat.metric}
                      </span>
                    </p>
                    <p className="font-semibold mb-2">{stat.label}</p>
                    <p className="text-sm text-muted-foreground">{stat.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Implementation Checklist */}
          <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <SectionHeading
                badge="Implementation"
                title="Automated Routing Implementation Checklist"
                titleGradient="Implementation Checklist"
                description="Follow these steps to set up effective lead routing."
              />

              <div className="max-w-3xl mx-auto mt-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="space-y-4"
                >
                  {[
                    "Define your routing criteria (geography, company size, product interest, etc.)",
                    "Map your sales team structure and territories in LeadFlow",
                    "Configure form fields to capture routing-relevant data",
                    "Set up round-robin rules for fair lead distribution",
                    "Enable AI scoring to enhance routing decisions",
                    "Create fallback rules for edge cases and overflow",
                    "Set up instant notifications for assigned leads",
                    "Monitor routing metrics and optimize continuously",
                  ].map((step, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-4 rounded-xl bg-background border border-border"
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-fuchsia-500 flex items-center justify-center flex-shrink-0 text-white font-bold text-sm">
                        {index + 1}
                      </div>
                      <p className="text-sm mt-1">{step}</p>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 bg-gradient-to-br from-purple-500/10 via-transparent to-fuchsia-500/10">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-3xl mx-auto text-center"
              >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                  Ready to{" "}
                  <span className="bg-gradient-to-r from-purple-500 to-fuchsia-500 bg-clip-text text-transparent">
                    Automate Lead Routing
                  </span>
                  ?
                </h2>
                <p className="text-xl text-muted-foreground mb-8">
                  Start your free trial today and ensure every lead reaches the right
                  sales rep instantly with intelligent automation.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/handler/sign-up">
                    <GlowButton size="lg">
                      Start Your Free Trial
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </GlowButton>
                  </Link>
                  <Link href="/#pricing">
                    <GlowButton variant="secondary" size="lg">
                      View Pricing
                    </GlowButton>
                  </Link>
                </div>
                <p className="text-sm text-muted-foreground mt-6">
                  No credit card required. 14-day free trial. Cancel anytime.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Related Topics */}
          <section className="py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <SectionHeading
                badge="Related Topics"
                title="Explore More Crossover Topics"
                description="Discover other ways to combine LeadFlow features for maximum impact."
              />

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
                {relatedTopics.map((topic, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={topic.href}
                      className="block p-6 rounded-2xl bg-muted/50 border border-border hover:border-purple-500/50 transition-colors group h-full"
                    >
                      <h3 className="font-semibold mb-2 group-hover:text-purple-400 transition-colors">
                        {topic.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">{topic.description}</p>
                      <span className="inline-flex items-center text-sm text-purple-400 mt-4">
                        Explore <ArrowRight className="ml-1 w-4 h-4" />
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
