"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Building,
  Users,
  Shield,
  Key,
  ArrowRight,
  CheckCircle,
  Layers,
  UserCog,
  MessageSquare,
  BarChart3,
} from "lucide-react";
import {
  LandingHeader,
  LandingFooter,
  GlowButton,
  GradientText,
} from "@/components/landing";

export default function AgencyTeamManagementPage() {
  const relatedContent = [
    {
      title: "Agency CRM",
      href: "/resources/industry-solutions/agency-crm",
      description:
        "Complete CRM solution designed specifically for marketing and creative agencies to manage clients and campaigns.",
      pillar: "Industry Solutions",
    },
    {
      title: "Team Features",
      href: "/resources/team-collaboration/team-features",
      description:
        "Powerful collaboration tools that keep your entire agency team aligned and productive.",
      pillar: "Team Collaboration",
    },
    {
      title: "Role Management",
      href: "/resources/team-collaboration/role-management",
      description:
        "Define roles and responsibilities clearly so every team member knows their part in client success.",
      pillar: "Team Collaboration",
    },
    {
      title: "User Permissions",
      href: "/resources/team-collaboration/user-permissions",
      description:
        "Granular permission controls to protect sensitive client data while enabling team productivity.",
      pillar: "Team Collaboration",
    },
  ];

  const relatedTopics = [
    {
      title: "Real Estate Pipeline Management",
      href: "/resources/topics/real-estate-pipeline-management",
      description: "Pipeline management for real estate professionals",
    },
    {
      title: "SaaS Lead Generation",
      href: "/resources/topics/saas-lead-generation",
      description: "Lead generation strategies for SaaS companies",
    },
    {
      title: "Consultant Client Tracking",
      href: "/resources/topics/consultant-client-tracking",
      description: "Client management for consultants",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
        <LandingHeader />
        <main>
          {/* Hero Section */}
          <section className="relative pt-32 pb-20 overflow-hidden">
            {/* Background gradient - Purple theme */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/10" />
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto text-center"
              >
                <div className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  <Building className="w-4 h-4 mr-2" />
                  Topic Hub: Agency + Team Collaboration
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                  Streamline{" "}
                  <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                    Agency Team Management
                  </span>{" "}
                  for Client Success
                </h1>

                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Combine agency-specific CRM features with powerful team
                  collaboration tools to keep your entire team aligned on client
                  work and deliverables.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/handler/sign-up">
                    <GlowButton size="lg">
                      Start Free Trial
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </GlowButton>
                  </Link>
                  <Link href="/resources/industry-solutions/agency-crm">
                    <GlowButton variant="secondary" size="lg">
                      Explore Agency CRM
                    </GlowButton>
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Why This Combination Section */}
          <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <div className="inline-flex items-center px-4 py-2 mb-4 text-sm font-medium rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  Why This Matters
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Why{" "}
                  <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                    Team Collaboration
                  </span>{" "}
                  is Critical for Agencies
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Agencies juggle multiple clients, campaigns, and team members.
                  Strong collaboration tools ensure nothing falls through the
                  cracks and every client gets exceptional service.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    icon: Users,
                    title: "Team Visibility",
                    description:
                      "See who is working on what across all clients and campaigns at a glance.",
                  },
                  {
                    icon: Shield,
                    title: "Data Security",
                    description:
                      "Protect sensitive client data with role-based permissions and access controls.",
                  },
                  {
                    icon: UserCog,
                    title: "Role Clarity",
                    description:
                      "Define clear roles so every team member knows their responsibilities.",
                  },
                  {
                    icon: MessageSquare,
                    title: "Client Communication",
                    description:
                      "Keep all client communications organized and accessible to the team.",
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
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4">
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">
                      {item.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Related Content Section */}
          <section className="py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <div className="inline-flex items-center px-4 py-2 mb-4 text-sm font-medium rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  Deep Dive
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Explore{" "}
                  <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                    Related Resources
                  </span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Dive deeper into specific topics that combine agency industry
                  knowledge with team collaboration best practices.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-8">
                {relatedContent.map((content, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={content.href}
                      className="block p-6 rounded-2xl bg-muted/50 border border-border hover:border-purple-500/50 transition-all group h-full"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                          <Layers className="w-5 h-5 text-purple-400" />
                        </div>
                        <span className="text-xs px-2 py-1 rounded-full bg-purple-500/10 text-purple-400">
                          {content.pillar}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-purple-400 transition-colors">
                        {content.title}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {content.description}
                      </p>
                      <span className="inline-flex items-center text-sm text-purple-400">
                        Read more <ArrowRight className="ml-1 w-4 h-4" />
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Key Benefits Section */}
          <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    What You Will{" "}
                    <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                      Achieve
                    </span>
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    Agencies using LeadFlow&apos;s team collaboration features
                    report significant improvements in productivity and client
                    satisfaction.
                  </p>
                  <ul className="space-y-4">
                    {[
                      "Centralize all client communications and history",
                      "Assign tasks and track progress across team members",
                      "Control access to sensitive client information",
                      "Streamline handoffs between team members",
                      "Scale operations without losing quality",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-purple-500 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="grid grid-cols-2 gap-4"
                >
                  {[
                    { metric: "50%", label: "Less Duplicated Work" },
                    { metric: "35%", label: "Faster Onboarding" },
                    { metric: "4x", label: "Better Visibility" },
                    { metric: "90%", label: "Client Retention" },
                  ].map((stat, index) => (
                    <div
                      key={index}
                      className="p-6 rounded-2xl bg-background border border-border text-center"
                    >
                      <p className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                        {stat.metric}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </section>

          {/* Related Topics Section */}
          <section className="py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <div className="inline-flex items-center px-4 py-2 mb-4 text-sm font-medium rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  Explore More
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Related{" "}
                  <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                    Topics
                  </span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Discover other topic hubs that combine industry solutions with
                  powerful CRM features.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-6">
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
                      className="block p-6 rounded-2xl bg-muted/50 border border-border hover:border-purple-500/50 transition-all group"
                    >
                      <h3 className="font-semibold mb-2 group-hover:text-purple-400 transition-colors">
                        {topic.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {topic.description}
                      </p>
                      <span className="inline-flex items-center text-sm text-purple-400 mt-4">
                        Explore <ArrowRight className="ml-1 w-4 h-4" />
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/10">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-3xl mx-auto text-center"
              >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                  Ready to Transform{" "}
                  <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                    Agency Operations
                  </span>
                  ?
                </h2>
                <p className="text-xl text-muted-foreground mb-8">
                  Join hundreds of agencies who use LeadFlow to streamline team
                  collaboration and deliver exceptional client results. Start
                  your free trial today.
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
        </main>
        <LandingFooter />
    </div>
  );
}
