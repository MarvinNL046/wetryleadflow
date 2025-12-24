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
  Database,
  Shield,
  Clock,
  CheckCircle,
  AlertTriangle,
  FileSpreadsheet,
  Users,
  RefreshCw,
  Layers,
  Zap,
  Settings,
  ArrowRightLeft,
} from "lucide-react";

export default function CrmMigrationPage() {
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
              <GradientText>CRM Migration Guide</GradientText>:{" "}
              Switch Without Losing Data
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Switching CRMs does not have to be painful. Follow this comprehensive guide to migrate
              your data safely, minimize disruption to your team, and ensure a smooth transition
              to your new CRM platform.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/handler/sign-up">
                <GlowButton size="lg">
                  Start Your Migration to LeadFlow
                  <ArrowRight className="ml-2 h-5 w-5" />
                </GlowButton>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Migrate */}
      <section className="py-20 border-t border-border/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Understanding Migration"
            title="When and Why to Migrate Your CRM"
            titleGradient="Migrate Your CRM"
            description="Recognizing the right time to switch can save your organization significant pain."
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
                Migrating CRMs is a significant undertaking, but the right reasons make it worthwhile.
                Common triggers for migration include outgrowing your current system, frustration with
                usability issues, lack of necessary integrations, excessive costs, or simply needing
                modern features that legacy systems cannot provide.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                The cost of a bad CRM extends beyond subscription fees. Low adoption rates, inaccurate
                data, manual workarounds, and missed opportunities all impact your bottom line. If
                your team actively avoids using your CRM, it is time to consider a switch.
              </p>
              <p className="text-lg text-muted-foreground">
                Successful migrations require careful planning, but the payoff is substantial. Companies
                that migrate to a better-fit CRM typically see adoption rates increase by 40-60% and
                report significant improvements in data quality and sales productivity within the
                first quarter post-migration.
              </p>
            </div>

            <div className="mt-12 grid sm:grid-cols-2 gap-6">
              {[
                {
                  icon: AlertTriangle,
                  title: "Signs You Need to Migrate",
                  items: [
                    "Low user adoption (under 60%)",
                    "Excessive manual data entry",
                    "Missing critical integrations",
                    "Data scattered across systems",
                    "Frequent complaints from sales team",
                  ],
                },
                {
                  icon: CheckCircle,
                  title: "Benefits of Migration",
                  items: [
                    "Higher team productivity",
                    "Better data accuracy",
                    "Improved sales forecasting",
                    "Modern user experience",
                    "Cost optimization",
                  ],
                },
              ].map((column, index) => (
                <motion.div
                  key={column.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-background/50 border border-border rounded-xl p-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <column.icon className={`w-6 h-6 ${index === 0 ? "text-amber-400" : "text-green-400"}`} />
                    <h3 className="text-lg font-semibold">{column.title}</h3>
                  </div>
                  <ul className="space-y-2">
                    {column.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center gap-2 text-muted-foreground">
                        <div className={`w-1.5 h-1.5 rounded-full ${index === 0 ? "bg-amber-400" : "bg-green-400"}`} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Migration Planning */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Phase 1"
            title="Planning Your CRM Migration"
            titleGradient="Planning"
            description="Thorough preparation is the key to a successful migration."
          />

          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: "Assemble Your Migration Team",
                description:
                  "Build a cross-functional team including sales leadership, IT/operations, and power users. Assign clear roles: project manager, data lead, training coordinator, and executive sponsor.",
                duration: "Week 1",
              },
              {
                icon: Database,
                title: "Audit Your Current Data",
                description:
                  "Document all data in your existing CRM: contacts, companies, deals, activities, custom fields, and attachments. Identify data quality issues that should be cleaned before migration.",
                duration: "Weeks 1-2",
              },
              {
                icon: FileSpreadsheet,
                title: "Map Your Data Structure",
                description:
                  "Create a field mapping document showing how each field in your old CRM maps to your new one. Identify fields that need transformation, merging, or new custom fields.",
                duration: "Week 2",
              },
              {
                icon: Settings,
                title: "Configure Your New CRM",
                description:
                  "Set up your new CRM with pipelines, stages, custom fields, and user permissions before importing data. This ensures data lands in the right structure from day one.",
                duration: "Weeks 2-3",
              },
              {
                icon: RefreshCw,
                title: "Clean Your Data",
                description:
                  "Now is the perfect time for data cleansing. Remove duplicates, update outdated records, standardize formats, and archive inactive records. Do not migrate bad data.",
                duration: "Weeks 2-3",
              },
              {
                icon: Clock,
                title: "Create Your Timeline",
                description:
                  "Build a realistic migration timeline with milestones. Plan for testing, training, and a parallel operation period where both systems run simultaneously.",
                duration: "Week 3",
              },
            ].map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-background/50 backdrop-blur-sm border border-border rounded-2xl p-6 hover:border-purple-500/50 transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                    <step.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-sm text-purple-400 font-medium">{step.duration}</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Data Migration Process */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Phase 2"
            title="Executing Your Data Migration"
            titleGradient="Data Migration"
            description="Step-by-step process for safely transferring your valuable data."
          />

          <div className="mt-12 max-w-4xl mx-auto">
            {[
              {
                step: 1,
                title: "Export Your Data",
                content:
                  "Export data from your current CRM in the cleanest format available, typically CSV or Excel. Export in logical batches: contacts first, then companies, then deals, and finally activities. Ensure relationship IDs are preserved to maintain data connections.",
                tips: [
                  "Use native export tools when possible",
                  "Preserve unique identifiers",
                  "Document the export date and time",
                ],
              },
              {
                step: 2,
                title: "Transform and Prepare Data",
                content:
                  "Transform your exported data to match your new CRM's requirements. This may include reformatting dates, splitting or combining fields, mapping picklist values, and converting currencies. Use spreadsheet tools or dedicated migration software for efficiency.",
                tips: [
                  "Create transformation formulas in Excel",
                  "Validate data formats match requirements",
                  "Handle special characters carefully",
                ],
              },
              {
                step: 3,
                title: "Test Import with Sample Data",
                content:
                  "Before importing everything, test with a small sample of each data type. Import 50-100 records and verify they appear correctly in your new CRM. Check field mapping, relationships between records, and data integrity. Fix any issues before proceeding.",
                tips: [
                  "Test each object type separately",
                  "Verify relationships are intact",
                  "Check for data truncation issues",
                ],
              },
              {
                step: 4,
                title: "Import Full Dataset",
                content:
                  "Once testing passes, import your full dataset in the correct order: users first, then companies, contacts, deals, and finally activities. Maintain this sequence to preserve record relationships. Plan for this during low-usage hours to minimize disruption.",
                tips: [
                  "Import in correct dependency order",
                  "Schedule during off-peak hours",
                  "Monitor import progress closely",
                ],
              },
              {
                step: 5,
                title: "Validate and Verify",
                content:
                  "After import, run comprehensive validation. Compare record counts between old and new systems. Spot-check critical records for data accuracy. Verify relationships, such as contacts linked to correct companies and deals in correct pipeline stages.",
                tips: [
                  "Compare total record counts",
                  "Verify critical customer records",
                  "Test search and reporting",
                ],
              },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex gap-6 mb-10 last:mb-0"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-lg">
                    {item.step}
                  </div>
                  {index < 4 && (
                    <div className="w-px h-full bg-gradient-to-b from-purple-500 to-transparent mx-auto mt-2" />
                  )}
                </div>
                <div className="pb-6">
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground mb-4">{item.content}</p>
                  <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                    <span className="text-sm font-medium text-purple-400">Pro Tips:</span>
                    <ul className="mt-2 space-y-1">
                      {item.tips.map((tip, tipIndex) => (
                        <li key={tipIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="w-4 h-4 text-purple-400 flex-shrink-0" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Post Migration */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Phase 3"
            title="Post-Migration Success"
            titleGradient="Success"
            description="Ensuring adoption and maximizing value from your new CRM."
          />

          <div className="mt-12 grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: Users,
                title: "Train Your Team Thoroughly",
                description:
                  "Invest in comprehensive training covering not just basic navigation but workflows specific to each role. Create video tutorials, quick reference guides, and host live Q&A sessions. Consider certifying power users who can support their teams.",
              },
              {
                icon: Zap,
                title: "Set Up Integrations",
                description:
                  "Connect your new CRM to your email, calendar, marketing tools, and other business systems. LeadFlow offers native integrations with popular tools and a robust API for custom connections. Proper integrations dramatically increase adoption.",
              },
              {
                icon: Layers,
                title: "Run Parallel Systems Briefly",
                description:
                  "Keep your old CRM accessible in read-only mode for 30-60 days. This gives users a safety net to reference historical data while they adapt to the new system. Set a firm sunset date and communicate it clearly.",
              },
              {
                icon: Shield,
                title: "Monitor and Support",
                description:
                  "Track adoption metrics closely in the first weeks. Monitor login frequency, data entry patterns, and support ticket volume. Be proactive in addressing issues and celebrating quick wins to build momentum.",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-background border border-border rounded-xl p-6"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/30 flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Common Mistakes */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Avoid Pitfalls"
            title="Common CRM Migration Mistakes"
            titleGradient="Mistakes"
            description="Learn from others to ensure your migration succeeds."
          />

          <div className="mt-12 max-w-4xl mx-auto space-y-6">
            {[
              {
                mistake: "Migrating dirty data",
                impact: "Perpetuates existing problems and frustrates users from day one",
                prevention: "Clean data before migration, not after. Use this as an opportunity for a fresh start.",
              },
              {
                mistake: "Rushing the timeline",
                impact: "Leads to incomplete configuration, poor training, and low adoption",
                prevention: "Plan for 4-8 weeks minimum. Quality migration takes time to do right.",
              },
              {
                mistake: "Insufficient user training",
                impact: "Low adoption rates and team productivity decline",
                prevention: "Budget 20% of project time for training. Include role-specific sessions.",
              },
              {
                mistake: "No parallel operation period",
                impact: "Risk of data loss and no fallback if issues arise",
                prevention: "Run both systems for 30-60 days with the old system in read-only mode.",
              },
              {
                mistake: "Ignoring integrations",
                impact: "Siloed data and manual workarounds that reduce CRM value",
                prevention: "Map and plan integrations before migration. Test connections thoroughly.",
              },
            ].map((item, index) => (
              <motion.div
                key={item.mistake}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-background border border-border rounded-xl p-6"
              >
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="flex-shrink-0">
                    <AlertTriangle className="w-6 h-6 text-amber-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1">{item.mistake}</h3>
                    <p className="text-red-400 text-sm mb-2">Impact: {item.impact}</p>
                    <p className="text-muted-foreground">
                      <span className="text-green-400 font-medium">Prevention: </span>
                      {item.prevention}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* LeadFlow Migration Support */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="LeadFlow Advantage"
            title="Migrate to LeadFlow with Confidence"
            titleGradient="LeadFlow"
            description="We make switching CRMs as painless as possible."
          />

          <div className="mt-12 grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: ArrowRightLeft,
                title: "Free Migration Assistance",
                description:
                  "Our team helps you plan and execute your migration at no additional cost. We have migrated thousands of customers from Salesforce, HubSpot, Pipedrive, and more.",
              },
              {
                icon: Database,
                title: "Smart Import Tools",
                description:
                  "LeadFlow's import wizards automatically detect data formats, suggest field mappings, and validate data before import. Migrate with confidence.",
              },
              {
                icon: Shield,
                title: "Data Guarantee",
                description:
                  "We stand behind our migration process. If any data is lost or corrupted during migration, we will work until it is resolved at no charge to you.",
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
                Start Your Free Migration
                <ArrowRight className="ml-2 h-5 w-5" />
              </GlowButton>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Related Resources */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="More Resources"
            title="Related CRM Guides"
            titleGradient="CRM Guides"
            description="Continue learning with these helpful resources."
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
                title: "CRM Data Hygiene",
                href: "/resources/crm-best-practices/data-hygiene",
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
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready for a <GradientText>Seamless Migration</GradientText>?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              LeadFlow makes switching CRMs easy with free migration support, smart import tools,
              and a dedicated team to ensure your success. Start your journey today.
            </p>
            <Link href="/handler/sign-up">
              <GlowButton size="lg">
                Try LeadFlow Free for 14 Days
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
