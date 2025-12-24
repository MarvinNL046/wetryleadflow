"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Upload,
  Users,
  CheckCircle2,
  ArrowRight,
  Mail,
  Bell,
  FolderOpen,
  Database,
  Sparkles,
  Settings,
} from "lucide-react";
import {
  LandingHeader,
  LandingFooter,
  GlowButton,
  GradientText,
} from "@/components/landing";

const relatedTopics = [
  {
    title: "Automated Deal Tracking",
    description: "Combine automation with CRM best practices for seamless deals",
    href: "/resources/topics/automated-deal-tracking",
    gradient: "from-yellow-500 to-orange-500",
  },
  {
    title: "Permission-Based Analytics",
    description: "Team permissions combined with performance analytics",
    href: "/resources/topics/permission-based-analytics",
    gradient: "from-violet-500 to-purple-500",
  },
  {
    title: "Landing Page Optimization",
    description: "Optimize lead capture forms for better conversions",
    href: "/resources/topics/landing-page-optimization",
    gradient: "from-blue-500 to-cyan-500",
  },
];

const linkedResources = [
  {
    title: "Import & Export",
    description: "Master data migration with bulk import and export tools",
    href: "/resources/contact-management/import-export",
    icon: Upload,
    pillar: "Contact Management",
  },
  {
    title: "Contact Organization",
    description: "Structure your contacts for maximum efficiency",
    href: "/resources/contact-management/contact-organization",
    icon: FolderOpen,
    pillar: "Contact Management",
  },
  {
    title: "Email Sequences",
    description: "Automated email campaigns that nurture imported leads",
    href: "/resources/sales-automation/email-sequences",
    icon: Mail,
    pillar: "Sales Automation",
  },
  {
    title: "Smart Notifications",
    description: "Get alerted when imported contacts take action",
    href: "/resources/sales-automation/smart-notifications",
    icon: Bell,
    pillar: "Sales Automation",
  },
];

export default function ContactImportAutomationPage() {
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
              <div className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium rounded-full bg-rose-500/10 text-rose-500 border border-rose-500/20">
                <Users className="w-4 h-4 mr-2" />
                Contact Management + Sales Automation
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                Contact Import Automation:{" "}
                <span className="bg-gradient-to-r from-rose-400 via-pink-500 to-rose-600 bg-clip-text text-transparent">
                  From List to Engaged Leads
                </span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Transform bulk contact imports into automated engagement workflows.
                Learn how to seamlessly import contacts and immediately trigger
                personalized nurture sequences.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/handler/sign-up">
                  <GlowButton size="lg">
                    Automate Your Imports
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </GlowButton>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Value Proposition Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Import Once,{" "}
                <span className="bg-gradient-to-r from-rose-400 to-pink-500 bg-clip-text text-transparent">
                  Engage Automatically
                </span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Manual contact imports create data silos. By combining smart import
                tools with sales automation, every new contact immediately enters
                the appropriate nurture workflow based on their attributes and source.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Database,
                  title: "Clean Data on Import",
                  description:
                    "Automatically deduplicate, validate, and enrich contact data during import. No manual cleanup required.",
                },
                {
                  icon: Sparkles,
                  title: "Instant Workflow Triggers",
                  description:
                    "Imported contacts immediately enter relevant automation sequences based on tags, source, or custom fields.",
                },
                {
                  icon: Settings,
                  title: "Smart Segmentation",
                  description:
                    "Contacts are automatically organized and tagged based on import criteria and data attributes.",
                },
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-8 rounded-2xl bg-background border border-border hover:border-rose-500/50 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center mb-6">
                    <benefit.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Key Concepts Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center mb-16"
            >
              <div className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium rounded-full bg-rose-500/10 text-rose-500 border border-rose-500/20">
                <Upload className="w-4 h-4 mr-2" />
                Implementation Guide
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Building Your{" "}
                <span className="bg-gradient-to-r from-rose-400 to-pink-500 bg-clip-text text-transparent">
                  Import Automation Pipeline
                </span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {[
                {
                  title: "Source-Based Workflow Triggers",
                  description:
                    "Different import sources require different engagement strategies. Event attendees need follow-up calls, while webinar registrants benefit from educational email sequences.",
                  points: [
                    "Event attendee outreach sequences",
                    "Webinar follow-up campaigns",
                    "Trade show lead nurturing",
                    "Partner referral workflows",
                  ],
                },
                {
                  title: "Data Enrichment on Import",
                  description:
                    "Automatically enhance imported contacts with additional data points. Company information, social profiles, and engagement history are appended in real-time.",
                  points: [
                    "Company data lookup",
                    "LinkedIn profile matching",
                    "Email verification",
                    "Lead scoring calculation",
                  ],
                },
                {
                  title: "Intelligent Deduplication",
                  description:
                    "When importing contacts that already exist, automatically merge records, update information, and trigger re-engagement workflows for dormant contacts.",
                  points: [
                    "Smart merge logic",
                    "Historical data preservation",
                    "Re-engagement triggers",
                    "Activity consolidation",
                  ],
                },
                {
                  title: "Automated Assignment Rules",
                  description:
                    "Imported contacts are automatically assigned to the right sales reps based on territory, industry, company size, or round-robin distribution.",
                  points: [
                    "Territory-based routing",
                    "Industry specialization",
                    "Capacity-based distribution",
                    "Skills-based assignment",
                  ],
                },
              ].map((concept, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-8 rounded-2xl bg-muted/50 border border-border"
                >
                  <h3 className="text-xl font-bold mb-4">{concept.title}</h3>
                  <p className="text-muted-foreground mb-6">{concept.description}</p>
                  <ul className="space-y-2">
                    {concept.points.map((point, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-rose-500" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Related Resources Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Deep Dive Into{" "}
                <GradientText>Related Resources</GradientText>
              </h2>
              <p className="text-lg text-muted-foreground">
                Explore detailed guides on the individual topics that make up
                contact import automation.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {linkedResources.map((resource, index) => (
                <Link key={index} href={resource.href}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="p-6 rounded-2xl bg-background border border-border hover:border-rose-500/50 transition-all hover:shadow-lg hover:shadow-rose-500/10 h-full"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                        <resource.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <span className="text-xs text-rose-500 font-medium">
                          {resource.pillar}
                        </span>
                        <h3 className="font-semibold mb-2">{resource.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          {resource.description}
                        </p>
                        <span className="text-rose-500 text-sm flex items-center gap-1">
                          Read guide <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Transform Your{" "}
                <span className="bg-gradient-to-r from-rose-400 to-pink-500 bg-clip-text text-transparent">
                  Contact Imports
                </span>
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Stop treating imports as a one-time data dump. Start converting
                imported contacts into engaged leads with automated workflows.
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
                14-day free trial. No credit card required. Cancel anytime.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Related Topics Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Explore{" "}
                <GradientText>Related Topics</GradientText>
              </h2>
              <p className="text-lg text-muted-foreground">
                Discover more crossover strategies that combine multiple disciplines
                for maximum impact.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {relatedTopics.map((topic, index) => (
                <Link key={index} href={topic.href}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="p-6 rounded-2xl bg-background border border-border hover:border-purple-500/50 transition-all hover:shadow-lg h-full"
                  >
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${topic.gradient} flex items-center justify-center mb-4`}>
                      <ArrowRight className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-semibold mb-2">{topic.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {topic.description}
                    </p>
                    <span className="text-purple-500 text-sm flex items-center gap-1">
                      Explore topic <ArrowRight className="w-3 h-3" />
                    </span>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <LandingFooter />
    </div>
  );
}
