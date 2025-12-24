"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Head from "next/head";
import {
  LandingHeader,
  LandingFooter,
  GlowButton,
  GradientText,
} from "@/components/landing";
import {
  Building,
  Users,
  Settings,
  ArrowRight,
  CheckCircle,
  BookOpen,
  Shield,
  Layers,
  UserCog,
  FolderTree,
  Sliders,
} from "lucide-react";

const linkedResources = [
  {
    title: "Pipeline Setup",
    description: "Configure your sales pipeline stages for maximum efficiency and visibility.",
    href: "/resources/crm-best-practices/pipeline-setup",
    pillar: "CRM Best Practices",
    icon: Layers,
  },
  {
    title: "CRM Customization",
    description: "Tailor your CRM to match your unique sales process and workflows.",
    href: "/resources/crm-best-practices/crm-customization",
    pillar: "CRM Best Practices",
    icon: Sliders,
  },
  {
    title: "Team Features",
    description: "Enable collaboration with team workspaces, shared views, and assignments.",
    href: "/resources/team-collaboration/team-features",
    pillar: "Team Collaboration",
    icon: Users,
  },
  {
    title: "Role Management",
    description: "Set up roles and hierarchies that mirror your organization structure.",
    href: "/resources/team-collaboration/role-management",
    pillar: "Team Collaboration",
    icon: UserCog,
  },
  {
    title: "Contact Organization",
    description: "Structure your contacts database for easy access and segmentation.",
    href: "/resources/contact-management/contact-organization",
    pillar: "Contact Management",
    icon: FolderTree,
  },
];

const relatedTopics = [
  { title: "Full Sales Analytics Suite", href: "/resources/topics/full-sales-analytics-suite" },
  { title: "Complete Lead Funnel", href: "/resources/topics/complete-lead-funnel" },
  { title: "AI-Powered Sales Stack", href: "/resources/topics/ai-powered-sales-stack" },
];

const benefits = [
  "Scalable CRM architecture that grows with your business",
  "Role-based access control for data security",
  "Custom fields and workflows tailored to your needs",
  "Team hierarchies that match your org structure",
  "Centralized contact management across departments",
  "Standardized processes for consistent execution",
];

export default function EnterpriseCrmSetupPage() {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex, follow" />
      </Head>
      <div className="min-h-screen bg-background">
        <LandingHeader />

        <main>
          {/* Hero Section */}
          <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-20">
            {/* Background Effects */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-900/30 via-emerald-900/20 to-background" />
              <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-green-500/20 rounded-full blur-[128px] animate-pulse" />
              <div className="absolute bottom-0 right-1/3 w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: "1s" }} />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center max-w-4xl mx-auto"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 mb-6">
                  <BookOpen className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-green-300">Topic Hub</span>
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
                  Enterprise{" "}
                  <GradientText animated className="bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400">
                    CRM Setup
                  </GradientText>
                </h1>

                <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                  Build a CRM foundation that scales. Combine best practices, team collaboration,
                  and contact management for enterprise-grade sales operations.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
                  <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-300 text-sm border border-green-500/20">
                    CRM Best Practices
                  </span>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 text-sm border border-emerald-500/20">
                    Team Collaboration
                  </span>
                  <span className="px-3 py-1 rounded-full bg-teal-500/10 text-teal-300 text-sm border border-teal-500/20">
                    Contact Management
                  </span>
                </div>

                <Link href="/handler/sign-up">
                  <GlowButton size="lg" className="group">
                    Set Up Your Enterprise CRM
                    <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </GlowButton>
                </Link>
              </motion.div>
            </div>
          </section>

          {/* Benefits Section */}
          <section className="py-16 lg:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="max-w-4xl mx-auto"
              >
                <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
                  Why Enterprise CRM Setup Matters
                </h2>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-start gap-3 p-4 rounded-xl bg-card/50 border border-border/50"
                    >
                      <CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{benefit}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          {/* Linked Resources Section */}
          <section className="py-16 lg:py-24 bg-gradient-to-b from-background to-green-950/10">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center mb-12"
              >
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Essential Resources
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Master each component of your enterprise CRM setup
                </p>
              </motion.div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {linkedResources.map((resource, index) => (
                  <motion.div
                    key={resource.href}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link href={resource.href} className="block h-full">
                      <div className="group relative h-full rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-6 hover:border-green-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10">
                        <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 mb-4">
                          <resource.icon className="w-6 h-6 text-white" />
                        </div>

                        <span className="text-xs text-green-400 font-medium mb-2 block">
                          {resource.pillar}
                        </span>

                        <h3 className="text-lg font-bold mb-2 group-hover:text-green-400 transition-colors">
                          {resource.title}
                        </h3>

                        <p className="text-sm text-muted-foreground mb-4">
                          {resource.description}
                        </p>

                        <div className="flex items-center text-sm text-green-400 font-medium">
                          Read Guide
                          <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Related Topics Section */}
          <section className="py-16 lg:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="max-w-3xl mx-auto"
              >
                <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
                  Related Topics
                </h2>

                <div className="grid gap-4">
                  {relatedTopics.map((topic, index) => (
                    <motion.div
                      key={topic.href}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Link href={topic.href}>
                        <div className="flex items-center justify-between p-4 rounded-xl bg-card/50 border border-border/50 hover:border-green-500/50 transition-all duration-300 group">
                          <span className="font-medium group-hover:text-green-400 transition-colors">
                            {topic.title}
                          </span>
                          <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-green-400 transition-all group-hover:translate-x-1" />
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 lg:py-32 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-teal-500/10" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center max-w-3xl mx-auto"
              >
                <Building className="w-12 h-12 text-green-400 mx-auto mb-6" />

                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
                  Ready to Build Your{" "}
                  <GradientText className="bg-gradient-to-r from-green-400 to-emerald-400">
                    Enterprise CRM?
                  </GradientText>
                </h2>

                <p className="text-lg text-muted-foreground mb-8">
                  Start with a solid foundation that scales. LeadFlow gives you the
                  enterprise features you need without the complexity.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href="/handler/sign-up">
                    <GlowButton size="lg" className="group">
                      Start Your Free Trial
                      <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </GlowButton>
                  </Link>
                  <Link href="/resources">
                    <GlowButton variant="secondary" size="lg">
                      Explore All Resources
                    </GlowButton>
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

