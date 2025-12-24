"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  LandingHeader,
  LandingFooter,
  GlowButton,
  GradientText,
  SectionHeading
} from "@/components/landing";
import {
  Brain,
  Target,
  Megaphone,
  Gauge,
  Users,
  BarChart3,
  Zap,
  Building,
  BookOpen,
  ArrowRight,
  Receipt
} from "lucide-react";

const resourceCategories = [
  {
    title: "Lead Generation",
    description: "Master the art of attracting and capturing high-quality leads",
    icon: Target,
    href: "/resources/lead-generation",
    color: "from-blue-500 to-cyan-500",
    articles: [
      { title: "Lead Magnets", href: "/resources/lead-generation/lead-magnets" },
      { title: "Landing Pages", href: "/resources/lead-generation/landing-pages" },
      { title: "Form Optimization", href: "/resources/lead-generation/form-optimization" },
      { title: "Lead Capture Tools", href: "/resources/lead-generation/lead-capture-tools" },
      { title: "Traffic Sources", href: "/resources/lead-generation/traffic-sources" },
    ],
  },
  {
    title: "AI & Automation",
    description: "Leverage AI to score leads and automate your sales process",
    icon: Brain,
    href: "/resources/ai-automation",
    color: "from-purple-500 to-pink-500",
    articles: [
      { title: "AI Lead Scoring", href: "/resources/ai-automation/ai-lead-scoring" },
      { title: "Predictive Analytics", href: "/resources/ai-automation/predictive-analytics" },
      { title: "Smart Lead Routing", href: "/resources/ai-automation/smart-lead-routing" },
      { title: "Automation Workflows", href: "/resources/ai-automation/automation-workflows" },
      { title: "Machine Learning CRM", href: "/resources/ai-automation/machine-learning-crm" },
    ],
  },
  {
    title: "CRM Best Practices",
    description: "Optimize your CRM setup for maximum efficiency",
    icon: BookOpen,
    href: "/resources/crm-best-practices",
    color: "from-green-500 to-emerald-500",
    articles: [
      { title: "Pipeline Setup", href: "/resources/crm-best-practices/pipeline-setup" },
      { title: "Deal Tracking", href: "/resources/crm-best-practices/deal-tracking" },
      { title: "CRM Migration", href: "/resources/crm-best-practices/crm-migration" },
      { title: "CRM Customization", href: "/resources/crm-best-practices/crm-customization" },
      { title: "Data Hygiene", href: "/resources/crm-best-practices/data-hygiene" },
    ],
  },
  {
    title: "Meta Ads Integration",
    description: "Connect Meta ads with your CRM for seamless lead capture",
    icon: Megaphone,
    href: "/resources/meta-ads",
    color: "from-blue-600 to-indigo-600",
    articles: [
      { title: "Facebook Lead Ads", href: "/resources/meta-ads/facebook-lead-ads" },
      { title: "Instagram Lead Generation", href: "/resources/meta-ads/instagram-lead-generation" },
      { title: "Meta Lead Forms", href: "/resources/meta-ads/meta-lead-forms" },
      { title: "Ad Optimization", href: "/resources/meta-ads/ad-optimization" },
      { title: "Audience Targeting", href: "/resources/meta-ads/audience-targeting" },
    ],
  },
  {
    title: "Sales Automation",
    description: "Automate repetitive tasks and focus on closing deals",
    icon: Zap,
    href: "/resources/sales-automation",
    color: "from-yellow-500 to-orange-500",
    articles: [
      { title: "Email Sequences", href: "/resources/sales-automation/email-sequences" },
      { title: "Follow-up Automation", href: "/resources/sales-automation/follow-up-automation" },
      { title: "Task Automation", href: "/resources/sales-automation/task-automation" },
      { title: "Appointment Scheduling", href: "/resources/sales-automation/appointment-scheduling" },
      { title: "Smart Notifications", href: "/resources/sales-automation/smart-notifications" },
    ],
  },
  {
    title: "Pipeline Management",
    description: "Visualize and optimize your sales pipeline",
    icon: Gauge,
    href: "/resources/pipeline-management",
    color: "from-cyan-500 to-blue-500",
    articles: [
      { title: "Kanban Boards", href: "/resources/pipeline-management/kanban-boards" },
      { title: "Stage Optimization", href: "/resources/pipeline-management/stage-optimization" },
      { title: "Deal Velocity", href: "/resources/pipeline-management/deal-velocity" },
      { title: "Sales Forecasting", href: "/resources/pipeline-management/sales-forecasting" },
      { title: "Bottleneck Analysis", href: "/resources/pipeline-management/bottleneck-analysis" },
    ],
  },
  {
    title: "Contact Management",
    description: "Organize and segment your contacts effectively",
    icon: Users,
    href: "/resources/contact-management",
    color: "from-pink-500 to-rose-500",
    articles: [
      { title: "Contact Organization", href: "/resources/contact-management/contact-organization" },
      { title: "Lead Segmentation", href: "/resources/contact-management/lead-segmentation" },
      { title: "Activity Tracking", href: "/resources/contact-management/activity-tracking" },
      { title: "Import & Export", href: "/resources/contact-management/import-export" },
      { title: "Notes & History", href: "/resources/contact-management/notes-history" },
    ],
  },
  {
    title: "Sales Analytics",
    description: "Measure and improve your sales performance",
    icon: BarChart3,
    href: "/resources/sales-analytics",
    color: "from-violet-500 to-purple-500",
    articles: [
      { title: "Conversion Metrics", href: "/resources/sales-analytics/conversion-metrics" },
      { title: "Team Performance", href: "/resources/sales-analytics/team-performance" },
      { title: "Revenue Tracking", href: "/resources/sales-analytics/revenue-tracking" },
      { title: "Analytics Dashboards", href: "/resources/sales-analytics/analytics-dashboards" },
      { title: "Sales Reporting", href: "/resources/sales-analytics/sales-reporting" },
    ],
  },
  {
    title: "Team Collaboration",
    description: "Enable your team to work together seamlessly",
    icon: Users,
    href: "/resources/team-collaboration",
    color: "from-teal-500 to-green-500",
    articles: [
      { title: "Team Features", href: "/resources/team-collaboration/team-features" },
      { title: "Role Management", href: "/resources/team-collaboration/role-management" },
      { title: "User Permissions", href: "/resources/team-collaboration/user-permissions" },
      { title: "Lead Handoffs", href: "/resources/team-collaboration/lead-handoffs" },
      { title: "Team Communication", href: "/resources/team-collaboration/team-communication" },
    ],
  },
  {
    title: "Invoicing & Billing",
    description: "Manage quotations, invoices, and billing workflows",
    icon: Receipt,
    href: "/resources/invoicing",
    color: "from-green-500 to-teal-500",
    articles: [
      { title: "Quotation Management", href: "/resources/invoicing/quotation-management" },
      { title: "Invoice Creation", href: "/resources/invoicing/invoice-creation" },
      { title: "Credit Notes", href: "/resources/invoicing/credit-notes" },
      { title: "Recurring Invoices", href: "/resources/invoicing/recurring-invoices" },
      { title: "Tax & VAT Setup", href: "/resources/invoicing/tax-vat-setup" },
    ],
  },
  {
    title: "Industry Solutions",
    description: "CRM strategies tailored for your industry",
    icon: Building,
    href: "/resources/industry-solutions",
    color: "from-amber-500 to-yellow-500",
    articles: [
      { title: "Real Estate CRM", href: "/resources/industry-solutions/real-estate-crm" },
      { title: "Agency CRM", href: "/resources/industry-solutions/agency-crm" },
      { title: "SaaS Sales", href: "/resources/industry-solutions/saas-sales" },
      { title: "E-commerce Leads", href: "/resources/industry-solutions/ecommerce-leads" },
      { title: "Consultant CRM", href: "/resources/industry-solutions/consultant-crm" },
    ],
  },
];

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-background">
      <LandingHeader />

      <main>
        {/* Hero Section */}
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-20">
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
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
                LeadFlow <GradientText animated>Resource Center</GradientText>
              </h1>

              <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                Everything you need to master lead generation, sales automation, and CRM best practices.
                Learn from expert guides and take your sales to the next level.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/get-started">
                  <GlowButton size="lg" className="group">
                    Get Started Free
                    <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </GlowButton>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Resource Categories Grid */}
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Resources"
              title="Explore Our Guides"
              description="Deep dive into topics that matter for your sales success"
            />

            <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {resourceCategories.map((category, index) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-6 hover:border-primary/50 transition-all duration-300"
                >
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${category.color} mb-4`}>
                    <category.icon className="w-6 h-6 text-white" />
                  </div>

                  <h3 className="text-xl font-bold mb-2">{category.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{category.description}</p>

                  <ul className="space-y-2">
                    {category.articles.map((article) => (
                      <li key={article.href}>
                        <Link
                          href={article.href}
                          className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                        >
                          <ArrowRight className="w-3 h-3" />
                          {article.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 lg:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-cyan-500/10" />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
                Ready to <GradientText>Transform Your Sales?</GradientText>
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Start using LeadFlow today and see why thousands of sales teams trust us to manage their pipeline.
              </p>
              <Link href="/get-started">
                <GlowButton size="lg" className="group">
                  Start Your Free Trial
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </GlowButton>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <LandingFooter />
    </div>
  );
}
