"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  LandingHeader,
  LandingFooter,
  GlowButton,
  GradientText,
  SectionHeading,
} from "@/components/landing";
import {
  ArrowRight,
  Sparkles,
  Trash2,
  AlertCircle,
  CheckCircle,
  Search,
  RefreshCw,
  Shield,
  Calendar,
  Database,
  Users,
  Mail,
  BarChart3,
  Zap,
} from "lucide-react";

export default function DataHygienePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <LandingHeader />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <span className="inline-flex items-center px-3 py-1 mb-6 text-sm font-medium rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
              CRM Best Practices
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              <GradientText>CRM Data Hygiene</GradientText>:{" "}
              Keep Your Database Clean and Powerful
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Dirty data costs businesses millions in lost productivity and missed opportunities.
              Learn how to maintain a clean, accurate CRM database that drives better decisions
              and higher sales performance.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/handler/sign-up">
                <GlowButton size="lg">
                  Start With Clean Data
                  <ArrowRight className="ml-2 h-5 w-5" />
                </GlowButton>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Cost of Bad Data */}
      <section className="py-20 border-t border-border/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="The Problem"
            title="The True Cost of Dirty CRM Data"
            titleGradient="Dirty CRM Data"
            description="Understanding why data quality should be a top priority."
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-12 max-w-4xl mx-auto"
          >
            <div className="prose prose-invert max-w-none">
              <p className="text-lg text-muted-foreground mb-6">
                Data decay is inevitable. B2B data degrades at approximately 30% per year as people
                change jobs, companies merge, phone numbers change, and email addresses become invalid.
                Without proactive data hygiene, your CRM becomes progressively less useful over time.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                The impact extends beyond simple inaccuracies. Dirty data leads to wasted sales efforts
                on outdated contacts, embarrassing mistakes in customer communications, unreliable
                forecasting, and poor decision-making based on flawed analytics. Studies estimate that
                poor data quality costs organizations an average of $12.9 million annually.
              </p>
              <p className="text-lg text-muted-foreground">
                The good news is that data hygiene is not a one-time project but an ongoing process
                that, when done right, becomes part of your team's natural workflow. Let us explore
                how to build and maintain a clean, trustworthy CRM database.
              </p>
            </div>

            <div className="mt-12 grid sm:grid-cols-4 gap-4">
              {[
                { stat: "30%", label: "Annual data decay rate" },
                { stat: "$12.9M", label: "Average cost of bad data" },
                { stat: "27%", label: "Revenue impact from poor data" },
                { stat: "40%", label: "Time wasted on data issues" },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center p-4 bg-gradient-to-br from-red-500/10 to-amber-500/10 rounded-xl border border-red-500/20"
                >
                  <div className="text-2xl font-bold text-red-400 mb-1">{item.stat}</div>
                  <div className="text-sm text-muted-foreground">{item.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Types of Data Issues */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Common Problems"
            title="Types of CRM Data Quality Issues"
            titleGradient="Data Quality"
            description="Identify and understand the most common data problems affecting your CRM."
          />

          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: "Duplicate Records",
                description:
                  "The same contact or company entered multiple times, often with slight variations in name or email. Duplicates fragment customer history and inflate pipeline numbers.",
                examples: [
                  "John Smith vs. J. Smith",
                  "Acme Inc. vs. Acme Incorporated",
                  "Multiple entries from different sources",
                ],
              },
              {
                icon: AlertCircle,
                title: "Incomplete Records",
                description:
                  "Records missing critical fields like phone numbers, job titles, or company information. Incomplete data limits segmentation and personalization capabilities.",
                examples: [
                  "Missing phone numbers",
                  "No industry classification",
                  "Empty company size field",
                ],
              },
              {
                icon: Mail,
                title: "Invalid Contact Data",
                description:
                  "Outdated email addresses, disconnected phone numbers, or people who have left their companies. Reaching out to invalid contacts wastes time and hurts deliverability.",
                examples: [
                  "Bounced email addresses",
                  "Wrong phone numbers",
                  "Former employees",
                ],
              },
              {
                icon: RefreshCw,
                title: "Outdated Information",
                description:
                  "Data that was once accurate but has since changed. Job titles, company names, addresses, and contact preferences all change over time.",
                examples: [
                  "Old job titles after promotions",
                  "Company rebranding",
                  "Relocated offices",
                ],
              },
              {
                icon: Database,
                title: "Inconsistent Formatting",
                description:
                  "The same data entered in different formats across records. Inconsistency breaks reporting, filtering, and automation rules.",
                examples: [
                  "Phone: (555) 123-4567 vs 5551234567",
                  "State: California vs CA vs Calif",
                  "Date formats varying by region",
                ],
              },
              {
                icon: Trash2,
                title: "Orphaned Records",
                description:
                  "Records that have lost their relationships, such as contacts not linked to companies or deals without associated contacts. This breaks reporting and context.",
                examples: [
                  "Contacts without company association",
                  "Deals with no primary contact",
                  "Activities not linked to records",
                ],
              },
            ].map((issue, index) => (
              <motion.div
                key={issue.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-background/50 backdrop-blur-sm border border-border rounded-2xl p-6 hover:border-purple-500/50 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center mb-4">
                  <issue.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{issue.title}</h3>
                <p className="text-muted-foreground mb-4">{issue.description}</p>
                <div className="space-y-2">
                  <span className="text-sm font-medium text-purple-400">Examples:</span>
                  <ul className="space-y-1">
                    {issue.examples.map((example, exampleIndex) => (
                      <li key={exampleIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                        {example}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Data Hygiene Process */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="The Solution"
            title="Building a Data Hygiene Process"
            titleGradient="Hygiene Process"
            description="A systematic approach to cleaning and maintaining your CRM data."
          />

          <div className="mt-12 max-w-4xl mx-auto">
            {[
              {
                phase: "Phase 1",
                title: "Audit Your Current Data",
                content:
                  "Start by understanding the current state of your database. Run reports to identify duplicate rates, completion percentages for key fields, email validity rates, and records without recent activity. This baseline helps you prioritize efforts and measure progress.",
                checklist: [
                  "Export data quality report",
                  "Identify duplicate percentage",
                  "Calculate field completion rates",
                  "Find stale records (no activity 12+ months)",
                ],
              },
              {
                phase: "Phase 2",
                title: "Clean Existing Data",
                content:
                  "Tackle the biggest issues first. Merge duplicate records, preserving the most complete information from each. Standardize formats for phone numbers, addresses, and names. Verify and update outdated email addresses. Remove or archive truly dead records.",
                checklist: [
                  "Merge duplicate records",
                  "Standardize field formats",
                  "Validate email addresses",
                  "Archive inactive records",
                ],
              },
              {
                phase: "Phase 3",
                title: "Establish Data Standards",
                content:
                  "Create clear documentation for how data should be entered. Define required fields, naming conventions, and acceptable values for picklists. Train all users on these standards and make the documentation easily accessible within your CRM.",
                checklist: [
                  "Document naming conventions",
                  "Define required vs optional fields",
                  "Create picklist value standards",
                  "Build training materials",
                ],
              },
              {
                phase: "Phase 4",
                title: "Implement Prevention Controls",
                content:
                  "Set up your CRM to prevent bad data from entering in the first place. Use required fields, validation rules, and duplicate detection. LeadFlow's smart forms auto-format data as it is entered and warn users about potential duplicates before they save.",
                checklist: [
                  "Configure required fields by stage",
                  "Enable duplicate detection",
                  "Set up validation rules",
                  "Implement auto-formatting",
                ],
              },
              {
                phase: "Phase 5",
                title: "Schedule Ongoing Maintenance",
                content:
                  "Data hygiene is not a one-time project. Schedule regular maintenance activities: weekly quick reviews for sales teams, monthly duplicate scans, quarterly deep cleans, and annual comprehensive audits. Build these into your team's routine.",
                checklist: [
                  "Weekly: Review assigned records",
                  "Monthly: Run duplicate scan",
                  "Quarterly: Deep clean and enrichment",
                  "Annually: Comprehensive data audit",
                ],
              },
            ].map((item, index) => (
              <motion.div
                key={item.phase}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="mb-10 last:mb-0"
              >
                <div className="flex gap-6">
                  <div className="flex-shrink-0 hidden sm:block">
                    <div className="w-24 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white text-sm font-bold">
                      {item.phase}
                    </div>
                    {index < 4 && (
                      <div className="w-px h-full bg-gradient-to-b from-purple-500 to-transparent mx-auto mt-2" />
                    )}
                  </div>
                  <div className="flex-1 pb-6">
                    <span className="sm:hidden text-sm text-purple-400 font-medium">{item.phase}</span>
                    <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                    <p className="text-muted-foreground mb-4">{item.content}</p>
                    <div className="bg-background border border-border rounded-lg p-4">
                      <span className="text-sm font-medium text-foreground">Checklist:</span>
                      <ul className="mt-2 grid sm:grid-cols-2 gap-2">
                        {item.checklist.map((checkItem, checkIndex) => (
                          <li key={checkIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                            {checkItem}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Practices */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Expert Tips"
            title="Data Hygiene Best Practices"
            titleGradient="Best Practices"
            description="Proven strategies for maintaining clean CRM data long-term."
          />

          <div className="mt-12 grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                icon: Calendar,
                title: "Make It Part of the Workflow",
                description:
                  "Do not treat data hygiene as a separate project. Embed quality checks into daily workflows. Review and update records after every customer interaction. Clean data should be a natural byproduct of using your CRM.",
              },
              {
                icon: Users,
                title: "Assign Data Ownership",
                description:
                  "Make individuals responsible for the quality of records they own. Sales reps own their contacts and deals. Managers review team data quality. Clear ownership creates accountability and prevents the 'someone else will fix it' mindset.",
              },
              {
                icon: Zap,
                title: "Automate What You Can",
                description:
                  "Use automation to enforce standards and catch issues. Auto-format phone numbers, auto-capitalize names, trigger alerts when key fields are missing, and auto-archive inactive records. LeadFlow handles many of these automatically.",
              },
              {
                icon: BarChart3,
                title: "Track and Celebrate Progress",
                description:
                  "Monitor data quality metrics on a dashboard. Celebrate improvements and recognize team members who maintain excellent data hygiene. What gets measured and celebrated gets done.",
              },
              {
                icon: Search,
                title: "Verify Before You Trust",
                description:
                  "Before major campaigns or important outreach, verify key data points. A quick check of email validity and contact information prevents embarrassing bounces and wasted effort.",
              },
              {
                icon: Shield,
                title: "Guard Your Data Entry Points",
                description:
                  "Review how data enters your CRM: web forms, imports, integrations, and manual entry. Each entry point is an opportunity for bad data to sneak in. Add validation at every point.",
              },
            ].map((practice, index) => (
              <motion.div
                key={practice.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex gap-4 p-6 bg-background border border-border rounded-xl"
              >
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center">
                    <practice.icon className="w-5 h-5 text-purple-400" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">{practice.title}</h3>
                  <p className="text-muted-foreground text-sm">{practice.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* LeadFlow Features */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="LeadFlow Advantage"
            title="Data Hygiene Made Easy with LeadFlow"
            titleGradient="LeadFlow"
            description="Built-in tools to keep your database clean automatically."
          />

          <div className="mt-12 grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: Search,
                title: "Smart Duplicate Detection",
                description:
                  "LeadFlow automatically identifies potential duplicates as you enter data and during bulk imports. Merge with one click, keeping the best data from each record.",
              },
              {
                icon: Sparkles,
                title: "Auto Data Enrichment",
                description:
                  "Fill in missing company information automatically. LeadFlow enriches records with company size, industry, location, and social profiles from verified data sources.",
              },
              {
                icon: RefreshCw,
                title: "Scheduled Health Reports",
                description:
                  "Receive weekly data quality reports showing duplicate rates, completion scores, and stale record counts. Stay on top of hygiene without manual checks.",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/30 flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-12 text-center"
          >
            <Link href="/handler/sign-up">
              <GlowButton size="lg">
                Try LeadFlow Free for 14 Days
                <ArrowRight className="ml-2 h-5 w-5" />
              </GlowButton>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Related Resources */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="More Resources"
            title="Related CRM Guides"
            titleGradient="CRM Guides"
            description="Continue optimizing your CRM with these resources."
          />

          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              {
                title: "Pipeline Setup Guide",
                href: "/resources/crm-best-practices/pipeline-setup",
              },
              {
                title: "Deal Tracking Best Practices",
                href: "/resources/crm-best-practices/deal-tracking",
              },
              {
                title: "CRM Migration Guide",
                href: "/resources/crm-best-practices/crm-migration",
              },
              {
                title: "CRM Customization Tips",
                href: "/resources/crm-best-practices/crm-customization",
              },
            ].map((resource, index) => (
              <motion.div
                key={resource.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  href={resource.href}
                  className="block p-4 bg-background border border-border rounded-xl hover:border-purple-500/50 transition-colors"
                >
                  <span className="text-foreground font-medium hover:text-purple-400 transition-colors">
                    {resource.title}
                  </span>
                  <ArrowRight className="w-4 h-4 text-muted-foreground mt-2" />
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready for <GradientText>Clean, Reliable Data</GradientText>?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              LeadFlow helps you maintain pristine data quality with built-in duplicate detection,
              auto-enrichment, and health monitoring. Start with a clean slate today.
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
  );
}
