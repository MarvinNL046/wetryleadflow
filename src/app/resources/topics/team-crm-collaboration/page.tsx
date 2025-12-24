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
  Users,
  Shield,
  Settings,
  Sparkles,
  MessageSquare,
  UserCog,
  ArrowRight,
  CheckCircle2,
  Lock,
  Database,
} from "lucide-react";


const relatedContent = [
  {
    title: "Team Features",
    description: "Discover collaboration features that keep your sales team aligned and productive.",
    href: "/resources/team-collaboration/team-features",
    icon: Users,
    pillar: "Team Collaboration",
  },
  {
    title: "Role Management",
    description: "Set up role-based permissions that give team members the right level of access.",
    href: "/resources/team-collaboration/role-management",
    icon: Shield,
    pillar: "Team Collaboration",
  },
  {
    title: "CRM Customization",
    description: "Tailor your CRM fields, stages, and workflows to match your unique sales process.",
    href: "/resources/crm-best-practices/crm-customization",
    icon: Settings,
    pillar: "CRM Best Practices",
  },
  {
    title: "Data Hygiene",
    description: "Maintain a clean, accurate CRM database that your entire team can trust.",
    href: "/resources/crm-best-practices/data-hygiene",
    icon: Database,
    pillar: "CRM Best Practices",
  },
  {
    title: "Team Communication",
    description: "Enable seamless communication within your CRM for faster deal collaboration.",
    href: "/resources/team-collaboration/team-communication",
    icon: MessageSquare,
    pillar: "Team Collaboration",
  },
  {
    title: "User Permissions",
    description: "Configure granular permissions that protect sensitive data while enabling productivity.",
    href: "/resources/team-collaboration/user-permissions",
    icon: Lock,
    pillar: "Team Collaboration",
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
    title: "Meta Ads Pipeline Integration",
    description: "Connect Meta advertising with your sales pipeline for seamless lead flow.",
    href: "/resources/topics/meta-ads-pipeline-integration",
  },
  {
    title: "Contact Segmentation Analytics",
    description: "Combine contact management with analytics for data-driven sales strategies.",
    href: "/resources/topics/contact-segmentation-analytics",
  },
];

export default function TeamCRMCollaborationPage() {
  return (
    <div className="min-h-screen bg-background">
        <LandingHeader />

        <main>
          {/* Hero Section */}
          <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-20">
            {/* Background Effects - Teal Theme */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-900/30 via-background to-background" />
              <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-teal-500/25 rounded-full blur-[128px] animate-pulse" />
              <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-cyan-500/20 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: "1s" }} />
              <div className="absolute bottom-1/4 left-1/3 w-[300px] h-[300px] bg-emerald-500/15 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "2s" }} />
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
                  className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20"
                >
                  <Users className="w-4 h-4 mr-2" />
                  Team Collaboration + CRM Best Practices
                </motion.div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
                  Team CRM{" "}
                  <GradientText animated>Collaboration</GradientText>
                </h1>

                <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                  Build a CRM environment where your entire team thrives. Learn how to combine
                  collaboration features with best practices for customization, permissions,
                  and data hygiene to create a unified sales operation.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href="/handler/sign-up">
                    <GlowButton size="lg" className="group">
                      Start Collaborating Better
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
                    Building a <GradientText>Collaborative CRM Culture</GradientText>
                  </h2>
                  <div className="prose prose-lg prose-invert max-w-none">
                    <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                      A CRM is only as powerful as the team using it. When collaboration features
                      are properly configured alongside smart customization and data practices,
                      you create an environment where information flows freely, responsibilities
                      are clear, and every team member has what they need to succeed.
                    </p>
                    <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                      Team collaboration in a CRM goes beyond basic sharing. It&apos;s about creating
                      workflows where hand-offs are seamless, communication is centralized, and
                      everyone works from the same source of truth. This requires thoughtful
                      role management, the right permission structures, and CRM customization
                      that matches how your team actually works.
                    </p>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      This resource hub brings together team collaboration strategies with CRM
                      configuration best practices. Whether you&apos;re setting up a new team or
                      optimizing an existing one, you&apos;ll find the guidance needed to create
                      a collaborative environment that drives results.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Team Structure Visual */}
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
                  Collaboration <GradientText>In Action</GradientText>
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  See how different roles work together in a well-configured CRM environment.
                </p>
              </motion.div>

              <div className="max-w-4xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="p-8 rounded-2xl bg-card border border-border"
                >
                  <div className="grid md:grid-cols-3 gap-6">
                    {[
                      {
                        role: "Sales Manager",
                        permissions: ["Full pipeline access", "Team performance reports", "Lead assignment"],
                        color: "teal",
                      },
                      {
                        role: "Sales Rep",
                        permissions: ["Assigned leads only", "Activity logging", "Deal updates"],
                        color: "cyan",
                      },
                      {
                        role: "Admin",
                        permissions: ["CRM customization", "User management", "Data exports"],
                        color: "emerald",
                      },
                    ].map((item, index) => (
                      <motion.div
                        key={item.role}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="p-4 rounded-xl bg-muted/50 border border-border"
                      >
                        <div className={`w-10 h-10 rounded-full bg-${item.color}-500/20 flex items-center justify-center mx-auto mb-3`}>
                          <UserCog className={`w-5 h-5 text-${item.color}-500`} />
                        </div>
                        <h3 className="font-semibold text-center mb-3">{item.role}</h3>
                        <ul className="space-y-2">
                          {item.permissions.map((perm) => (
                            <li key={perm} className="flex items-center gap-2 text-sm text-muted-foreground">
                              <CheckCircle2 className="w-4 h-4 text-teal-500 flex-shrink-0" />
                              <span>{perm}</span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-8 p-4 rounded-xl bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border border-teal-500/20">
                    <div className="flex items-center gap-3 mb-2">
                      <Sparkles className="w-5 h-5 text-teal-500" />
                      <h4 className="font-semibold">Shared Benefits</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      All roles share access to: Real-time activity feeds, @mentions and comments,
                      task assignments, and collaborative deal notes.
                    </p>
                  </div>
                </motion.div>
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
                  The Foundation of <GradientText>Team Success</GradientText>
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  When collaboration meets best practices, teams perform at their peak.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    icon: Shield,
                    title: "Clear Accountability",
                    description: "Role-based access ensures everyone knows their responsibilities while protecting sensitive data from unauthorized access.",
                  },
                  {
                    icon: Settings,
                    title: "Customized Workflows",
                    description: "CRM customization means your tool works the way your team does, not the other way around. Custom fields, stages, and automations align with reality.",
                  },
                  {
                    icon: Database,
                    title: "Trusted Data",
                    description: "Data hygiene practices ensure your team always works with accurate, up-to-date information. Clean data = better decisions.",
                  },
                ].map((benefit, index) => (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="p-6 rounded-2xl bg-card border border-border hover:border-teal-500/50 transition-all"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500/20 to-cyan-500/20 flex items-center justify-center mb-4">
                      <benefit.icon className="w-6 h-6 text-teal-500" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Best Practices Checklist */}
          <section className="py-20 lg:py-28 bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="text-center mb-12"
                >
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                    Team CRM <GradientText>Best Practices</GradientText>
                  </h2>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    "Define clear roles before inviting team members",
                    "Create custom fields that capture data your team needs",
                    "Set up automated notifications for deal updates",
                    "Establish data entry standards and enforce them",
                    "Use @mentions to loop in team members on deals",
                    "Schedule regular data cleanup and deduplication",
                    "Create saved views for different team roles",
                    "Document your CRM processes for onboarding",
                  ].map((practice, index) => (
                    <motion.div
                      key={practice}
                      initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border"
                    >
                      <CheckCircle2 className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{practice}</span>
                    </motion.div>
                  ))}
                </div>
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
                  Deep dive into team collaboration and CRM best practices from our resource library.
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
                      className="block p-6 rounded-2xl bg-card border border-border hover:border-teal-500/50 transition-all hover:shadow-lg hover:shadow-teal-500/10 h-full group"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500/20 to-cyan-500/20 flex items-center justify-center flex-shrink-0">
                          <item.icon className="w-6 h-6 text-teal-500" />
                        </div>
                        <div className="flex-1">
                          <span className="text-xs text-teal-400 font-medium">{item.pillar}</span>
                          <h3 className="text-lg font-semibold mt-1 mb-2 group-hover:text-teal-400 transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-muted-foreground text-sm mb-3">{item.description}</p>
                          <span className="text-teal-500 text-sm font-medium inline-flex items-center">
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
                  Ready to Build a <GradientText>Better Team CRM</GradientText>?
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  LeadFlow is designed for team collaboration from the ground up. Set up
                  roles, customize your workspace, and get your team aligned in minutes.
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
                      className="block p-6 rounded-2xl border border-border hover:border-teal-500/30 transition-all hover:bg-muted/50 group"
                    >
                      <h3 className="text-lg font-semibold mb-2 group-hover:text-teal-400 transition-colors">
                        {topic.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-3">{topic.description}</p>
                      <span className="text-teal-500 text-sm font-medium inline-flex items-center">
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
