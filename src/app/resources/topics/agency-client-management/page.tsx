"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Building2,
  Users,
  FileText,
  History,
  Upload,
  ArrowRight,
  Briefcase,
  CheckCircle2,
  Target,
  MessageSquare,
  FolderOpen,
  Zap,
} from "lucide-react";
import {
  LandingHeader,
  LandingFooter,
  GlowButton,
  GradientText,
  SectionHeading,
} from "@/components/landing";

export default function AgencyClientManagementPage() {
  const linkedTopics = [
    {
      title: "Agency CRM Solutions",
      description: "Discover CRM strategies designed specifically for agencies managing multiple client accounts and campaigns.",
      href: "/resources/industry-solutions/agency-crm",
      icon: Building2,
      pillar: "Industry Solutions",
    },
    {
      title: "Contact Organization",
      description: "Learn how to structure and organize your client contacts for maximum efficiency and quick access.",
      href: "/resources/contact-management/contact-organization",
      icon: Users,
      pillar: "Contact Management",
    },
    {
      title: "Notes & History Tracking",
      description: "Keep detailed records of all client interactions, meetings, and communications in one place.",
      href: "/resources/contact-management/notes-history",
      icon: FileText,
      pillar: "Contact Management",
    },
    {
      title: "Import & Export Tools",
      description: "Seamlessly migrate client data and maintain backups with powerful import/export capabilities.",
      href: "/resources/contact-management/import-export",
      icon: Upload,
      pillar: "Contact Management",
    },
  ];

  const relatedTopics = [
    {
      title: "Real Estate CRM",
      href: "/resources/industry-solutions/real-estate-crm",
    },
    {
      title: "Lead Segmentation",
      href: "/resources/contact-management/lead-segmentation",
    },
    {
      title: "Activity Tracking",
      href: "/resources/contact-management/activity-tracking",
    },
    {
      title: "Team Collaboration",
      href: "/resources/team-collaboration/team-features",
    },
  ];

  const benefits = [
    {
      icon: Briefcase,
      title: "Multi-Client Management",
      description: "Handle dozens of client accounts from a single dashboard without losing track of any details.",
    },
    {
      icon: History,
      title: "Complete Client History",
      description: "Access the full timeline of interactions, projects, and communications for every client relationship.",
    },
    {
      icon: MessageSquare,
      title: "Centralized Communication",
      description: "Keep all client emails, notes, and conversations organized and searchable in one place.",
    },
    {
      icon: FolderOpen,
      title: "Project Organization",
      description: "Link contacts to projects, campaigns, and deliverables for seamless workflow management.",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
        <LandingHeader />

        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          {/* Background Effects - Rose Gradient */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-rose-500/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl" />
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <div className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20">
                <Building2 className="w-4 h-4 mr-2" />
                Crossover Topic
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                Master <GradientText className="bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 bg-clip-text text-transparent">Agency Client Management</GradientText>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Combine industry-specific CRM strategies with powerful contact management
                tools to deliver exceptional service to every client in your agency.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/handler/sign-up">
                  <GlowButton size="lg">
                    Start Managing Clients
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </GlowButton>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Why This Matters Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Why It Matters"
              title="The Agency Client Challenge"
              titleGradient="Client Challenge"
              description="Agencies face unique challenges managing multiple clients, projects, and relationships simultaneously."
            />

            <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 rounded-2xl bg-background border border-border hover:border-rose-500/50 transition-all hover:shadow-lg hover:shadow-rose-500/10"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center mb-4">
                    <benefit.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Linked Topics Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Explore Topics"
              title="Essential Resources for Agency Success"
              titleGradient="Agency Success"
              description="Dive deep into these interconnected topics to build a comprehensive client management strategy."
            />

            <div className="mt-16 grid md:grid-cols-2 gap-8">
              {linkedTopics.map((topic, index) => (
                <Link key={index} href={topic.href}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group p-8 rounded-2xl bg-muted/50 border border-border hover:border-rose-500/50 transition-all hover:shadow-lg hover:shadow-rose-500/10 h-full"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                        <topic.icon className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <span className="text-xs font-medium text-rose-400 uppercase tracking-wider">
                          {topic.pillar}
                        </span>
                        <h3 className="text-xl font-bold mt-1 mb-2 group-hover:text-rose-400 transition-colors">
                          {topic.title}
                        </h3>
                        <p className="text-muted-foreground mb-4">{topic.description}</p>
                        <span className="text-rose-500 text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                          Read more <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Key Strategies Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Key Strategies"
              title="Best Practices for Agency Client Management"
              titleGradient="Best Practices"
              description="Implement these proven strategies to elevate your client relationships and agency operations."
            />

            <div className="mt-16 space-y-6">
              {[
                {
                  title: "Create Client-Centric Workflows",
                  description: "Design your processes around client needs, not internal convenience. Map out the client journey from onboarding to delivery and ensure every touchpoint is documented and optimized for their success.",
                },
                {
                  title: "Implement Regular Check-In Cadences",
                  description: "Establish consistent communication rhythms with each client. Weekly updates, monthly reviews, and quarterly strategy sessions keep relationships strong and prevent issues from escalating.",
                },
                {
                  title: "Centralize All Client Information",
                  description: "Maintain a single source of truth for each client relationship. Contact details, project history, preferences, and communication logs should be instantly accessible to any team member.",
                },
                {
                  title: "Leverage Automation for Consistency",
                  description: "Use automation to ensure nothing falls through the cracks. Automated reminders, follow-ups, and status updates maintain professionalism while freeing your team for strategic work.",
                },
              ].map((strategy, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex gap-4 p-6 rounded-2xl bg-background border border-border"
                >
                  <div className="flex-shrink-0">
                    <CheckCircle2 className="w-6 h-6 text-rose-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{strategy.title}</h3>
                    <p className="text-muted-foreground">{strategy.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Related Topics Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Related Topics"
              title="Continue Your Learning Journey"
              titleGradient="Learning Journey"
              description="Explore these related resources to further enhance your agency management skills."
            />

            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedTopics.map((topic, index) => (
                <Link key={index} href={topic.href}>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="p-4 rounded-xl bg-muted/50 border border-border hover:border-rose-500/50 transition-all text-center"
                  >
                    <span className="text-sm font-medium hover:text-rose-400 transition-colors">
                      {topic.title}
                    </span>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Transform Your{" "}
                <GradientText className="bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 bg-clip-text text-transparent">Agency Operations?</GradientText>
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Join thousands of agencies using LeadFlow to manage client relationships,
                track communications, and deliver exceptional results. Start your free trial today.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/handler/sign-up">
                  <GlowButton size="lg">
                    Start Free Trial
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </GlowButton>
                </Link>
              </div>
              <p className="mt-6 text-sm text-muted-foreground">
                No credit card required. 14-day free trial with full access.
              </p>
            </motion.div>
          </div>
        </section>

        <LandingFooter />
    </div>
  );
}
