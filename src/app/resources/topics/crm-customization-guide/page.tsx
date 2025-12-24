"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  LandingHeader,
  LandingFooter,
  GlowButton,
  GradientText,
} from "@/components/landing";
import {
  ArrowRight,
  Settings,
  Users,
  Shield,
  Database,
  Layers,
  CheckCircle,
  Sparkles,
} from "lucide-react";

export default function CrmCustomizationGuidePage() {
  const linkedResources = [
    {
      title: "CRM Customization Tips",
      description:
        "Learn how to tailor your CRM fields, layouts, and workflows to match your unique business processes.",
      href: "/resources/crm-best-practices/crm-customization",
      pillar: "CRM Best Practices",
      icon: Settings,
    },
    {
      title: "Data Hygiene Best Practices",
      description:
        "Keep your CRM data clean, accurate, and actionable with proven data management strategies.",
      href: "/resources/crm-best-practices/data-hygiene",
      pillar: "CRM Best Practices",
      icon: Database,
    },
    {
      title: "Role Management",
      description:
        "Configure user roles effectively to ensure team members have the right access and permissions.",
      href: "/resources/team-collaboration/role-management",
      pillar: "Team Collaboration",
      icon: Users,
    },
    {
      title: "User Permissions",
      description:
        "Set up granular permissions that protect sensitive data while enabling team productivity.",
      href: "/resources/team-collaboration/user-permissions",
      pillar: "Team Collaboration",
      icon: Shield,
    },
  ];

  const relatedTopics = [
    {
      title: "AI Contact Management",
      href: "/resources/topics/ai-contact-management",
    },
    {
      title: "Industry CRM Solutions",
      href: "/resources/topics/industry-crm-solutions",
    },
    {
      title: "Automated Revenue Tracking",
      href: "/resources/topics/automated-revenue-tracking",
    },
  ];

  return (
    <>
      <head>
        <meta name="robots" content="noindex, follow" />
      </head>
      <div className="min-h-screen bg-background text-foreground">
        <LandingHeader />

        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-emerald-500/10" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl" />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <span className="inline-flex items-center px-3 py-1 mb-6 text-sm font-medium rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                <Layers className="w-4 h-4 mr-2" />
                Topic Hub
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                Complete Guide to{" "}
                <GradientText>CRM Customization</GradientText>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Master CRM customization and team collaboration. Learn how to
                configure your CRM to match your workflow, manage user roles
                effectively, and maintain data integrity across your
                organization.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/handler/sign-up">
                  <GlowButton size="lg">
                    Start Customizing Your CRM
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </GlowButton>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Overview Section */}
        <section className="py-20 border-t border-border/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto"
            >
              <div className="text-center mb-12">
                <span className="inline-flex items-center px-3 py-1 mb-4 text-sm font-medium rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                  Overview
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Why CRM Customization and Team Setup Matter
                </h2>
              </div>

              <div className="prose prose-invert max-w-none">
                <p className="text-lg text-muted-foreground mb-6">
                  A CRM is only as effective as its configuration. Out-of-the-box
                  settings rarely match the unique workflows, terminology, and
                  processes that make your business distinct. The intersection of
                  CRM customization and team collaboration creates a powerful
                  foundation for sales success.
                </p>
                <p className="text-lg text-muted-foreground mb-6">
                  When your CRM fields match the information your team actually
                  needs, adoption rates soar. When user roles and permissions are
                  thoughtfully configured, teams work efficiently without data
                  security concerns. When data hygiene practices are embedded in
                  your processes, every decision is based on accurate information.
                </p>
                <p className="text-lg text-muted-foreground">
                  This hub brings together essential resources from CRM best
                  practices and team collaboration to help you build a CRM
                  environment that truly serves your organization.
                </p>
              </div>

              <div className="mt-12 grid sm:grid-cols-3 gap-6">
                {[
                  {
                    stat: "47%",
                    label: "Higher adoption with customization",
                    color: "from-green-500/10 to-emerald-500/10",
                  },
                  {
                    stat: "60%",
                    label: "Better data quality",
                    color: "from-green-500/10 to-teal-500/10",
                  },
                  {
                    stat: "35%",
                    label: "Team productivity improvement",
                    color: "from-emerald-500/10 to-green-500/10",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`text-center p-6 bg-gradient-to-br ${item.color} rounded-xl border border-border`}
                  >
                    <div className="text-3xl font-bold text-green-400 mb-2">
                      {item.stat}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {item.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Linked Resources Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="inline-flex items-center px-3 py-1 mb-4 text-sm font-medium rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                Deep Dive Resources
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Explore Related Guides
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Dive deeper into each aspect of CRM customization and team setup
                with these comprehensive guides.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {linkedResources.map((resource, index) => (
                <motion.div
                  key={resource.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link
                    href={resource.href}
                    className="block h-full p-6 bg-background/50 backdrop-blur-sm border border-border rounded-2xl hover:border-green-500/50 transition-all hover:shadow-lg hover:shadow-green-500/10"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
                        <resource.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <span className="text-xs font-medium text-green-400 mb-1 block">
                          {resource.pillar}
                        </span>
                        <h3 className="text-xl font-semibold mb-2">
                          {resource.title}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-4">
                          {resource.description}
                        </p>
                        <span className="text-green-400 text-sm font-medium inline-flex items-center">
                          Read guide <ArrowRight className="ml-1 w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Key Takeaways */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="inline-flex items-center px-3 py-1 mb-4 text-sm font-medium rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                Key Takeaways
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Building Your Customized CRM Environment
              </h2>
            </div>

            <div className="max-w-4xl mx-auto space-y-6">
              {[
                {
                  title: "Start with Your Sales Process",
                  content:
                    "Map out your actual sales workflow before customizing. Understanding how deals move through your organization helps you create fields, stages, and automations that genuinely support your team.",
                },
                {
                  title: "Balance Access with Security",
                  content:
                    "Configure roles and permissions that give team members what they need without exposing sensitive data. The right balance increases productivity while maintaining data integrity.",
                },
                {
                  title: "Embed Data Quality in Workflows",
                  content:
                    "Make data hygiene automatic rather than manual. Required fields, validation rules, and regular cleanup processes ensure your CRM data stays accurate and actionable.",
                },
                {
                  title: "Document and Train",
                  content:
                    "Every customization should be documented and communicated. When team members understand why the CRM is configured a certain way, they are more likely to use it correctly.",
                },
              ].map((takeaway, index) => (
                <motion.div
                  key={takeaway.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex gap-4 p-6 bg-background border border-border rounded-xl"
                >
                  <div className="flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      {takeaway.title}
                    </h3>
                    <p className="text-muted-foreground">{takeaway.content}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Related Topics */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="inline-flex items-center px-3 py-1 mb-4 text-sm font-medium rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                Explore More
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Related Topics
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Continue learning with these related topic hubs.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
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
                    className="block p-4 bg-background border border-border rounded-xl hover:border-green-500/50 transition-colors text-center"
                  >
                    <span className="text-foreground font-medium hover:text-green-400 transition-colors">
                      {topic.title}
                    </span>
                    <ArrowRight className="w-4 h-4 text-muted-foreground mt-2 mx-auto" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 mb-6">
                <Sparkles className="w-8 h-8 text-green-400" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Build Your{" "}
                <GradientText>Perfect CRM Setup</GradientText>?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                LeadFlow gives you powerful customization tools combined with
                intuitive team management. Create the CRM experience your
                organization deserves without complexity or code.
              </p>
              <Link href="/handler/sign-up">
                <GlowButton size="lg">
                  Start Your Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </GlowButton>
              </Link>
            </motion.div>
          </div>
        </section>

        <LandingFooter />
      </div>
    </>
  );
}
