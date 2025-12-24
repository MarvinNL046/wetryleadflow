"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Briefcase,
  FolderOpen,
  Activity,
  FileText,
  ArrowRight,
  CheckCircle,
  Layers,
  Users,
  Clock,
  BarChart3,
} from "lucide-react";
import {
  LandingHeader,
  LandingFooter,
  GlowButton,
  GradientText,
} from "@/components/landing";

export default function ConsultantClientTrackingPage() {
  const relatedContent = [
    {
      title: "Consultant CRM",
      href: "/resources/industry-solutions/consultant-crm",
      description:
        "Purpose-built CRM for consultants to manage prospects, clients, and projects in one place.",
      pillar: "Industry Solutions",
    },
    {
      title: "Contact Organization",
      href: "/resources/contact-management/contact-organization",
      description:
        "Keep all your contacts organized with custom fields, tags, and smart segmentation.",
      pillar: "Contact Management",
    },
    {
      title: "Activity Tracking",
      href: "/resources/contact-management/activity-tracking",
      description:
        "Track every interaction with clients to maintain context and build stronger relationships.",
      pillar: "Contact Management",
    },
    {
      title: "Notes and History",
      href: "/resources/contact-management/notes-history",
      description:
        "Keep detailed notes on every client interaction for seamless handoffs and follow-ups.",
      pillar: "Contact Management",
    },
  ];

  const relatedTopics = [
    {
      title: "Real Estate Pipeline Management",
      href: "/resources/topics/real-estate-pipeline-management",
      description: "Pipeline management for real estate professionals",
    },
    {
      title: "Agency Team Management",
      href: "/resources/topics/agency-team-management",
      description: "Team collaboration for marketing agencies",
    },
    {
      title: "E-commerce Lead Capture",
      href: "/resources/topics/ecommerce-lead-capture",
      description: "Capture and convert e-commerce visitors",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
        <LandingHeader />
        <main>
          {/* Hero Section */}
          <section className="relative pt-32 pb-20 overflow-hidden">
            {/* Background gradient - Green theme */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-teal-500/10" />
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto text-center"
              >
                <div className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <Briefcase className="w-4 h-4 mr-2" />
                  Topic Hub: Consultant + Contact Management
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                  Streamline{" "}
                  <span className="bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
                    Consultant Client Tracking
                  </span>{" "}
                  for Better Relationships
                </h1>

                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Combine consultant-specific CRM features with powerful contact
                  management tools to track every client interaction and deliver
                  exceptional service.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/handler/sign-up">
                    <GlowButton size="lg">
                      Start Free Trial
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </GlowButton>
                  </Link>
                  <Link href="/resources/industry-solutions/consultant-crm">
                    <GlowButton variant="secondary" size="lg">
                      Explore Consultant CRM
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
                <div className="inline-flex items-center px-4 py-2 mb-4 text-sm font-medium rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Why This Matters
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Why{" "}
                  <span className="bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
                    Client Tracking
                  </span>{" "}
                  is Critical for Consultants
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Consulting is a relationship business. Detailed client
                  tracking helps you maintain context, deliver personalized
                  service, and turn clients into long-term partners.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    icon: FolderOpen,
                    title: "Project Context",
                    description:
                      "Track all project details alongside client information for complete context.",
                  },
                  {
                    icon: Activity,
                    title: "Activity Timeline",
                    description:
                      "See every interaction in chronological order to pick up where you left off.",
                  },
                  {
                    icon: FileText,
                    title: "Meeting Notes",
                    description:
                      "Keep detailed notes on discussions, decisions, and action items.",
                  },
                  {
                    icon: Clock,
                    title: "Follow-up Reminders",
                    description:
                      "Never miss a follow-up with automated reminders and task tracking.",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="p-6 rounded-2xl bg-background border border-border hover:border-emerald-500/50 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mb-4">
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
                <div className="inline-flex items-center px-4 py-2 mb-4 text-sm font-medium rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Deep Dive
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Explore{" "}
                  <span className="bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
                    Related Resources
                  </span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Dive deeper into specific topics that combine consulting
                  industry knowledge with contact management best practices.
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
                      className="block p-6 rounded-2xl bg-muted/50 border border-border hover:border-emerald-500/50 transition-all group h-full"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                          <Layers className="w-5 h-5 text-emerald-400" />
                        </div>
                        <span className="text-xs px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-400">
                          {content.pillar}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-emerald-400 transition-colors">
                        {content.title}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {content.description}
                      </p>
                      <span className="inline-flex items-center text-sm text-emerald-400">
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
                    <span className="bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
                      Achieve
                    </span>
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    Consultants using LeadFlow&apos;s client tracking tools
                    report significant improvements in client satisfaction and
                    repeat business.
                  </p>
                  <ul className="space-y-4">
                    {[
                      "Never lose context between client meetings",
                      "Track billable activities and project milestones",
                      "Access complete client history on any device",
                      "Automate follow-up reminders and check-ins",
                      "Generate reports on client engagement and revenue",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5" />
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
                    { metric: "95%", label: "Client Retention" },
                    { metric: "40%", label: "More Referrals" },
                    { metric: "3x", label: "Engagement Depth" },
                    { metric: "8hrs", label: "Saved Weekly" },
                  ].map((stat, index) => (
                    <div
                      key={index}
                      className="p-6 rounded-2xl bg-background border border-border text-center"
                    >
                      <p className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
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
                <div className="inline-flex items-center px-4 py-2 mb-4 text-sm font-medium rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Explore More
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Related{" "}
                  <span className="bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
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
                      className="block p-6 rounded-2xl bg-muted/50 border border-border hover:border-emerald-500/50 transition-all group"
                    >
                      <h3 className="font-semibold mb-2 group-hover:text-emerald-400 transition-colors">
                        {topic.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {topic.description}
                      </p>
                      <span className="inline-flex items-center text-sm text-emerald-400 mt-4">
                        Explore <ArrowRight className="ml-1 w-4 h-4" />
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 bg-gradient-to-br from-emerald-500/10 via-transparent to-teal-500/10">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-3xl mx-auto text-center"
              >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                  Ready to Transform{" "}
                  <span className="bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
                    Client Relationships
                  </span>
                  ?
                </h2>
                <p className="text-xl text-muted-foreground mb-8">
                  Join thousands of consultants who use LeadFlow to track client
                  interactions, manage projects, and build lasting
                  relationships. Start your free trial today.
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
