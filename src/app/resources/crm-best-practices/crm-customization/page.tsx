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
  Settings,
  Layers,
  Palette,
  CheckCircle,
  Users,
  Workflow,
  Filter,
  BarChart3,
  Zap,
  Shield,
  Eye,
  Bell,
  PenTool,
  Target,
} from "lucide-react";

export default function CrmCustomizationPage() {
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
              <GradientText>CRM Customization Tips</GradientText> for Your Business
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              A one-size-fits-all CRM rarely fits anyone well. Learn how to customize your CRM
              to match your unique sales process, improve adoption, and maximize the value of
              your investment.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/handler/sign-up">
                <GlowButton size="lg">
                  Customize Your CRM Today
                  <ArrowRight className="ml-2 h-5 w-5" />
                </GlowButton>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Customize */}
      <section className="py-20 border-t border-border/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="The Value"
            title="Why CRM Customization Matters"
            titleGradient="Customization"
            description="Understanding the impact of a tailored CRM experience."
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
                Every business is unique, with its own sales process, terminology, and workflow
                requirements. Out-of-the-box CRM configurations are designed to work for the average
                use case, which means they are not optimized for anyone specifically. Customization
                bridges this gap.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                Studies show that CRM adoption rates increase by 47% when systems are customized to
                match existing workflows. Users are far more likely to embrace a tool that speaks their
                language, captures the information they need, and presents data in ways that make sense
                for their role.
              </p>
              <p className="text-lg text-muted-foreground">
                However, customization requires balance. Over-customization can create complexity,
                maintenance burdens, and upgrade challenges. The goal is to customize where it adds
                genuine value while leveraging standard features wherever possible. Let us explore
                how to find that balance.
              </p>
            </div>

            <div className="mt-12 grid sm:grid-cols-3 gap-6">
              {[
                { stat: "47%", label: "Higher adoption with customization", color: "from-green-500/10 to-emerald-500/10" },
                { stat: "35%", label: "Productivity improvement", color: "from-blue-500/10 to-cyan-500/10" },
                { stat: "60%", label: "Better data quality", color: "from-purple-500/10 to-pink-500/10" },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`text-center p-6 bg-gradient-to-br ${item.color} rounded-xl border border-border`}
                >
                  <div className="text-3xl font-bold gradient-text mb-2">{item.stat}</div>
                  <div className="text-sm text-muted-foreground">{item.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Key Customization Areas */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Customization Areas"
            title="Essential Areas to Customize"
            titleGradient="Essential Areas"
            description="Focus your customization efforts where they deliver the most value."
          />

          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Layers,
                title: "Custom Fields",
                description:
                  "Add fields specific to your business that capture important information standard fields miss. Industry-specific data points, custom qualification criteria, and unique identifiers all improve data value.",
                examples: [
                  "Industry-specific attributes",
                  "Custom scoring criteria",
                  "Regulatory compliance fields",
                  "Product preferences",
                ],
              },
              {
                icon: Workflow,
                title: "Pipeline Stages",
                description:
                  "Modify pipeline stages to reflect your actual sales process. Stage names should match your team's vocabulary, and the progression should mirror how deals actually move through your organization.",
                examples: [
                  "Rename stages to match terminology",
                  "Add or remove stages as needed",
                  "Configure stage-specific required fields",
                  "Set probability percentages",
                ],
              },
              {
                icon: Eye,
                title: "Views and Layouts",
                description:
                  "Customize how information is displayed for different roles. Sales reps need quick access to activity history and next steps. Managers need pipeline views and forecasting data. Tailor layouts accordingly.",
                examples: [
                  "Role-specific record layouts",
                  "Custom list views with saved filters",
                  "Personalized dashboards",
                  "Mobile-optimized views",
                ],
              },
              {
                icon: Zap,
                title: "Automation Rules",
                description:
                  "Automate repetitive tasks and enforce processes through workflow automation. Automatic field updates, task creation, notifications, and data routing save time and ensure consistency.",
                examples: [
                  "Lead assignment rules",
                  "Follow-up task automation",
                  "Stage change notifications",
                  "Data enrichment triggers",
                ],
              },
              {
                icon: BarChart3,
                title: "Reports and Dashboards",
                description:
                  "Build reports that answer your specific business questions. Standard reports rarely capture the nuances of your metrics. Custom reports and dashboards provide actionable insights.",
                examples: [
                  "Sales performance by custom segments",
                  "Pipeline analysis by product line",
                  "Activity metrics by team",
                  "Custom forecasting models",
                ],
              },
              {
                icon: Bell,
                title: "Notifications and Alerts",
                description:
                  "Configure alerts that notify the right people at the right time. Deal value thresholds, stale opportunity warnings, and competitive intelligence alerts keep teams informed and responsive.",
                examples: [
                  "High-value deal alerts",
                  "Stale pipeline warnings",
                  "Competitor mention notifications",
                  "Customer milestone alerts",
                ],
              },
            ].map((area, index) => (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-background/50 backdrop-blur-sm border border-border rounded-2xl p-6 hover:border-purple-500/50 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center mb-4">
                  <area.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{area.title}</h3>
                <p className="text-muted-foreground mb-4">{area.description}</p>
                <ul className="space-y-2">
                  {area.examples.map((example, exampleIndex) => (
                    <li key={exampleIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      {example}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Practices */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Expert Guidance"
            title="CRM Customization Best Practices"
            titleGradient="Best Practices"
            description="Guidelines for customizing your CRM effectively and sustainably."
          />

          <div className="mt-12 max-w-4xl mx-auto space-y-8">
            {[
              {
                number: 1,
                title: "Start with Requirements, Not Features",
                content:
                  "Before customizing, document what you need the CRM to do. Interview sales reps, managers, and other stakeholders. Understand pain points with current processes. Let requirements drive customization decisions, not the other way around. This prevents feature creep and ensures every change adds real value.",
              },
              {
                number: 2,
                title: "Keep It Simple and Intuitive",
                content:
                  "Every custom field, automation rule, or view adds complexity. Ask whether each customization truly earns its place. If users need extensive training to understand a customization, it is probably too complex. The best customizations feel natural and obvious to users.",
              },
              {
                number: 3,
                title: "Test with Real Users Before Rolling Out",
                content:
                  "Involve actual users in testing customizations before company-wide deployment. What makes sense in theory may not work in practice. Gather feedback, iterate, and refine. A pilot group of power users can identify issues before they impact everyone.",
              },
              {
                number: 4,
                title: "Document Everything",
                content:
                  "Maintain documentation for all customizations: what was changed, why, and how it works. This is invaluable for training new employees, troubleshooting issues, and planning future changes. Without documentation, customizations become technical debt.",
              },
              {
                number: 5,
                title: "Plan for Growth and Change",
                content:
                  "Your business will evolve, and your CRM customizations should be able to evolve with it. Avoid overly rigid structures. Use flexible field types where possible. Consider how customizations will scale as your team and data grow.",
              },
              {
                number: 6,
                title: "Review and Prune Regularly",
                content:
                  "Schedule quarterly reviews of your customizations. Remove fields nobody uses. Simplify complex automations. Consolidate similar views. Regular pruning prevents customization sprawl and keeps your CRM lean and effective.",
              },
            ].map((practice, index) => (
              <motion.div
                key={practice.number}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex gap-4"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold">
                  {practice.number}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{practice.title}</h3>
                  <p className="text-muted-foreground">{practice.content}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Role-Based Customization */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="By Role"
            title="Customization Tips by User Role"
            titleGradient="User Role"
            description="Different roles need different customization approaches."
          />

          <div className="mt-12 grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: Users,
                role: "Sales Representatives",
                tips: [
                  "Streamlined record layouts with essential fields only",
                  "Quick-action buttons for common tasks",
                  "Mobile-optimized views for field work",
                  "Activity logging shortcuts",
                  "Personal dashboard with their pipeline and tasks",
                ],
              },
              {
                icon: Target,
                role: "Sales Managers",
                tips: [
                  "Team pipeline views with filtering options",
                  "Performance dashboards comparing reps",
                  "Forecast reports with custom probability weights",
                  "Activity alerts for coaching opportunities",
                  "Deal inspection tools for pipeline reviews",
                ],
              },
              {
                icon: BarChart3,
                role: "Sales Operations",
                tips: [
                  "Data quality monitoring dashboards",
                  "Process compliance reports",
                  "Integration status visibility",
                  "Bulk data management tools",
                  "Automation performance analytics",
                ],
              },
              {
                icon: Shield,
                role: "Executive Leadership",
                tips: [
                  "High-level KPI dashboards",
                  "Revenue forecasting views",
                  "Trend analysis over time",
                  "Segment performance comparisons",
                  "Mobile executive summaries",
                ],
              },
            ].map((role, index) => (
              <motion.div
                key={role.role}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-background border border-border rounded-xl p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center">
                    <role.icon className="w-5 h-5 text-purple-400" />
                  </div>
                  <h3 className="text-lg font-semibold">{role.role}</h3>
                </div>
                <ul className="space-y-2">
                  {role.tips.map((tip, tipIndex) => (
                    <li key={tipIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      {tip}
                    </li>
                  ))}
                </ul>
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
            title="Common Customization Mistakes"
            titleGradient="Mistakes"
            description="Learn from common errors to customize more effectively."
          />

          <div className="mt-12 grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                mistake: "Creating too many custom fields",
                impact: "Cluttered screens, poor adoption, and reporting nightmares",
                solution: "Be ruthless about field necessity. If a field will not be used in reports or workflows, reconsider adding it.",
              },
              {
                mistake: "Complex automation without fallbacks",
                impact: "Silent failures that corrupt data or miss important actions",
                solution: "Build error handling and notifications into automations. Test edge cases thoroughly.",
              },
              {
                mistake: "Customizing without documentation",
                impact: "Knowledge silos and maintenance challenges",
                solution: "Document every customization. Include the why, not just the what.",
              },
              {
                mistake: "Ignoring standard features",
                impact: "Reinventing wheels and missing platform improvements",
                solution: "Always check if standard features can meet needs before building custom solutions.",
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
                <h3 className="text-lg font-semibold mb-2 text-amber-400">Mistake: {item.mistake}</h3>
                <p className="text-muted-foreground text-sm mb-3">
                  <span className="text-red-400">Impact:</span> {item.impact}
                </p>
                <p className="text-muted-foreground text-sm">
                  <span className="text-green-400">Solution:</span> {item.solution}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* LeadFlow Features */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="LeadFlow Advantage"
            title="Customize LeadFlow Your Way"
            titleGradient="LeadFlow"
            description="Powerful customization tools that are actually easy to use."
          />

          <div className="mt-12 grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: PenTool,
                title: "No-Code Customization",
                description:
                  "Create custom fields, modify layouts, and build automations without writing a single line of code. Our visual builder makes customization accessible to everyone.",
              },
              {
                icon: Filter,
                title: "Smart Views",
                description:
                  "Create unlimited custom views with drag-and-drop filters. Save views for your team or keep them personal. Switch contexts in one click.",
              },
              {
                icon: Palette,
                title: "Role-Based Layouts",
                description:
                  "Configure different layouts for different roles. Sales reps see what they need, managers see what they need. One CRM, perfectly tailored views.",
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
      <section className="py-20">
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
                title: "CRM Data Hygiene",
                href: "/resources/crm-best-practices/data-hygiene",
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
              Ready to Build Your{" "}
              <GradientText>Perfect CRM</GradientText>?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              LeadFlow gives you powerful customization tools that are actually easy to use.
              Create the CRM experience your team deserves without complexity or code.
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
