"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  FolderTree,
  Tags,
  Search,
  Users,
  CheckCircle2,
  Filter,
  Layers,
  Target,
  Sparkles
} from "lucide-react";
import { LandingHeader } from "@/components/landing/layout/landing-header";
import { LandingFooter } from "@/components/landing/layout/landing-footer";
import { GlowButton } from "@/components/landing/ui/glow-button";
import { GradientText } from "@/components/landing/ui/gradient-text";
import { SectionHeading } from "@/components/landing/ui/section-heading";

export default function ContactOrganizationPage() {
  return (
    <div className="min-h-screen bg-background">
      <LandingHeader />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-background to-background" />
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-500/30 rounded-full blur-[128px] animate-pulse" />
          <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: "1s" }} />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-sm font-medium text-purple-400 mb-6">
              <FolderTree className="w-4 h-4" />
              Contact Management
            </span>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
              Contact Organization Strategies for{" "}
              <GradientText animated>Maximum Efficiency</GradientText>
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Learn how to organize your contacts effectively, reduce search time by 80%,
              and never lose track of an important lead again. Discover proven strategies
              that top sales teams use to manage thousands of contacts effortlessly.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/handler/sign-up">
                <GlowButton size="lg" className="group">
                  Start Organizing Free
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </GlowButton>
              </Link>
              <Link href="/resources/contact-management/lead-segmentation" className="text-muted-foreground hover:text-foreground transition-colors">
                Learn about segmentation →
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Organization Matters Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Why It Matters"
            title="The Hidden Cost of Disorganized Contacts"
            titleGradient="Disorganized"
            description="Sales teams lose an average of 2 hours per day searching for contact information. Proper organization eliminates this waste."
          />

          <div className="mt-16 grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Search,
                title: "Faster Access",
                description: "Find any contact in seconds, not minutes. Advanced filtering and smart search capabilities put information at your fingertips instantly.",
                stat: "80%",
                statLabel: "faster search"
              },
              {
                icon: Target,
                title: "Better Targeting",
                description: "Organized contacts enable precise targeting for campaigns. Segment by industry, deal size, engagement level, or any custom criteria.",
                stat: "3x",
                statLabel: "conversion improvement"
              },
              {
                icon: Users,
                title: "Team Alignment",
                description: "When contacts are well-organized, every team member works from the same source of truth, eliminating confusion and duplicate efforts.",
                stat: "45%",
                statLabel: "less duplicate work"
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative p-6 rounded-2xl bg-card border border-border hover:border-purple-500/50 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-purple-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground mb-4">{item.description}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-purple-500">{item.stat}</span>
                  <span className="text-sm text-muted-foreground">{item.statLabel}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Strategies Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Strategies"
            title="Essential Contact Organization Strategies"
            titleGradient="Organization"
            description="Implement these proven strategies to transform your contact management from chaotic to crystal clear."
          />

          <div className="mt-16 space-y-16">
            {/* Strategy 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="grid lg:grid-cols-2 gap-12 items-center"
            >
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-sm font-medium mb-4">
                  <Tags className="w-4 h-4" />
                  Strategy 1
                </div>
                <h2 className="text-3xl font-bold mb-4">Implement a Tagging System</h2>
                <p className="text-muted-foreground mb-6">
                  Tags are the backbone of contact organization. Unlike rigid folder structures,
                  tags allow contacts to belong to multiple categories simultaneously. A contact
                  can be tagged as "Enterprise," "Healthcare," "Hot Lead," and "Q1 Target" all at once.
                </p>
                <p className="text-muted-foreground mb-6">
                  Start with broad categories like industry, company size, and lead status.
                  Then add specific tags for campaigns, interests, or custom criteria unique
                  to your business. The key is consistency—establish tag naming conventions
                  and stick to them across your entire team.
                </p>
                <ul className="space-y-3">
                  {[
                    "Create standardized tag categories for your team",
                    "Use color-coding for visual quick identification",
                    "Automate tagging based on lead source and behavior",
                    "Review and clean up unused tags quarterly"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-3xl blur-2xl opacity-60" />
                <div className="relative p-8 rounded-2xl bg-card border border-border">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg">Example Tag Structure</h4>
                    <div className="space-y-3">
                      {[
                        { category: "Industry", tags: ["SaaS", "Healthcare", "Retail", "Finance"] },
                        { category: "Size", tags: ["Enterprise", "Mid-Market", "SMB", "Startup"] },
                        { category: "Status", tags: ["Hot Lead", "Warm", "Cold", "Customer"] },
                        { category: "Source", tags: ["Meta Ads", "Organic", "Referral", "Event"] }
                      ].map((group) => (
                        <div key={group.category}>
                          <span className="text-sm text-muted-foreground">{group.category}</span>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {group.tags.map((tag) => (
                              <span key={tag} className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-sm">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Strategy 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="grid lg:grid-cols-2 gap-12 items-center"
            >
              <div className="order-2 lg:order-1 relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-3xl blur-2xl opacity-60" />
                <div className="relative p-8 rounded-2xl bg-card border border-border">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg">Smart List Examples</h4>
                    <div className="space-y-3">
                      {[
                        { name: "High-Value Prospects", criteria: "Score > 80 AND Status = 'Active'", count: 124 },
                        { name: "Needs Follow-up", criteria: "Last Contact > 7 days AND Stage != 'Closed'", count: 47 },
                        { name: "Enterprise Targets", criteria: "Company Size = 'Enterprise' AND Industry = 'Tech'", count: 89 },
                        { name: "Re-engagement", criteria: "Last Activity > 30 days AND Previous Customer = true", count: 156 }
                      ].map((list) => (
                        <div key={list.name} className="p-4 rounded-xl bg-muted/50 border border-border">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">{list.name}</span>
                            <span className="text-sm text-purple-400">{list.count} contacts</span>
                          </div>
                          <span className="text-xs text-muted-foreground font-mono">{list.criteria}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium mb-4">
                  <Filter className="w-4 h-4" />
                  Strategy 2
                </div>
                <h2 className="text-3xl font-bold mb-4">Create Dynamic Smart Lists</h2>
                <p className="text-muted-foreground mb-6">
                  Smart lists automatically update based on criteria you define. Instead of
                  manually maintaining static lists, let your CRM do the work. Contacts
                  automatically move in and out of lists as their data changes.
                </p>
                <p className="text-muted-foreground mb-6">
                  This approach is particularly powerful for sales teams who need to prioritize
                  their outreach. Create lists like "Hot Leads This Week," "Customers Due for
                  Check-in," or "High-Score Contacts Without Follow-up" and watch them
                  populate automatically.
                </p>
                <ul className="space-y-3">
                  {[
                    "Define clear criteria for each smart list",
                    "Combine multiple conditions for precise targeting",
                    "Use smart lists to trigger automated workflows",
                    "Review list performance and refine criteria regularly"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Strategy 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="grid lg:grid-cols-2 gap-12 items-center"
            >
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-sm font-medium mb-4">
                  <Layers className="w-4 h-4" />
                  Strategy 3
                </div>
                <h2 className="text-3xl font-bold mb-4">Establish Data Hygiene Practices</h2>
                <p className="text-muted-foreground mb-6">
                  The best organization system fails without clean data. Duplicate contacts,
                  outdated information, and inconsistent formatting undermine your entire
                  contact management strategy. Regular data hygiene is essential.
                </p>
                <p className="text-muted-foreground mb-6">
                  Implement automated deduplication to merge duplicate records. Set up validation
                  rules to ensure new contacts have required fields filled correctly. Schedule
                  regular data audits to identify and fix issues before they compound.
                </p>
                <p className="text-muted-foreground mb-6">
                  LeadFlow&apos;s AI-powered data enrichment automatically fills in missing
                  company information, verifies email addresses, and keeps contact data
                  fresh—reducing manual data entry by up to 70%.
                </p>
                <ul className="space-y-3">
                  {[
                    "Run automated deduplication weekly",
                    "Set required fields for new contact creation",
                    "Implement email verification on import",
                    "Archive inactive contacts instead of deleting"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-3xl blur-2xl opacity-60" />
                <div className="relative p-8 rounded-2xl bg-card border border-border">
                  <div className="space-y-6">
                    <h4 className="font-semibold text-lg">Data Health Dashboard</h4>
                    <div className="space-y-4">
                      {[
                        { label: "Complete Profiles", value: 94, color: "bg-green-500" },
                        { label: "Verified Emails", value: 87, color: "bg-blue-500" },
                        { label: "Recent Activity", value: 72, color: "bg-purple-500" },
                        { label: "Deduplication", value: 99, color: "bg-cyan-500" }
                      ].map((metric) => (
                        <div key={metric.label}>
                          <div className="flex justify-between text-sm mb-1">
                            <span>{metric.label}</span>
                            <span className="font-medium">{metric.value}%</span>
                          </div>
                          <div className="h-2 rounded-full bg-muted overflow-hidden">
                            <div
                              className={`h-full ${metric.color} rounded-full transition-all duration-500`}
                              style={{ width: `${metric.value}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* LeadFlow Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="LeadFlow Features"
            title="How LeadFlow Makes Organization Effortless"
            titleGradient="Effortless"
            description="Purpose-built organization tools that adapt to your workflow, not the other way around."
          />

          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Sparkles,
                title: "AI-Powered Tagging",
                description: "Automatically tag contacts based on behavior, source, and engagement patterns."
              },
              {
                icon: Filter,
                title: "Advanced Filters",
                description: "Build complex filters with AND/OR logic to find exactly the contacts you need."
              },
              {
                icon: FolderTree,
                title: "Custom Views",
                description: "Save filtered views for quick access. Share views across your team."
              },
              {
                icon: Search,
                title: "Universal Search",
                description: "Search across all contact fields instantly. Find anyone in milliseconds."
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-card border border-border hover:border-purple-500/50 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center mb-4">
                  <feature.icon className="w-5 h-5 text-purple-500" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
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
            transition={{ duration: 0.5 }}
            className="relative max-w-4xl mx-auto"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-cyan-500/20 rounded-3xl blur-2xl opacity-60" />
            <div className="relative p-12 rounded-2xl bg-card border border-border text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Transform Your Contact Organization?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of sales teams who&apos;ve eliminated contact chaos
                with LeadFlow&apos;s intelligent organization system.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/handler/sign-up">
                  <GlowButton size="lg" className="group">
                    Start Free Trial
                    <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </GlowButton>
                </Link>
                <Link href="/resources/contact-management/lead-segmentation" className="text-muted-foreground hover:text-foreground transition-colors">
                  Continue to Segmentation Guide →
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Resources */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8 text-center">Related Resources</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                title: "Lead Segmentation Guide",
                description: "Learn advanced segmentation strategies for better targeting.",
                href: "/resources/contact-management/lead-segmentation"
              },
              {
                title: "Activity Tracking",
                description: "Track every interaction and never miss a follow-up.",
                href: "/resources/contact-management/activity-tracking"
              },
              {
                title: "Import & Export Guide",
                description: "Migrate your contacts seamlessly with our import tools.",
                href: "/resources/contact-management/import-export"
              }
            ].map((resource) => (
              <Link
                key={resource.title}
                href={resource.href}
                className="p-6 rounded-xl bg-card border border-border hover:border-purple-500/50 transition-colors"
              >
                <h3 className="font-semibold mb-2">{resource.title}</h3>
                <p className="text-sm text-muted-foreground">{resource.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
}
