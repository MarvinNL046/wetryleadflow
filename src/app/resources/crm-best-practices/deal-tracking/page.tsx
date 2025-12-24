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
  DollarSign,
  Clock,
  AlertTriangle,
  CheckCircle,
  Eye,
  Bell,
  FileText,
  BarChart3,
  Target,
  Calendar,
  TrendingUp,
} from "lucide-react";

export default function DealTrackingPage() {
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
              <GradientText>Deal Tracking</GradientText> Best Practices:{" "}
              Never Lose Another Opportunity
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Master the art of deal tracking to improve win rates, forecast accurately,
              and ensure every opportunity gets the attention it deserves. Learn proven
              strategies used by top-performing sales teams.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/handler/sign-up">
                <GlowButton size="lg">
                  Start Tracking Deals Smarter
                  <ArrowRight className="ml-2 h-5 w-5" />
                </GlowButton>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Deal Tracking Matters */}
      <section className="py-20 border-t border-border/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="The Foundation"
            title="Why Effective Deal Tracking Matters"
            titleGradient="Deal Tracking"
            description="Understanding the impact of proper deal tracking on your bottom line."
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
                Deal tracking is more than just knowing which opportunities are in your pipeline. It is
                the systematic process of monitoring every aspect of a deal from first contact to close,
                ensuring nothing falls through the cracks and every opportunity is maximized.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                Studies show that sales reps spend only 34% of their time actually selling, with the rest
                consumed by administrative tasks and searching for information. Effective deal tracking
                eliminates this waste by putting critical information at your fingertips when you need it.
              </p>
              <p className="text-lg text-muted-foreground">
                Companies with robust deal tracking practices report 15-20% higher win rates, 25% more
                accurate forecasting, and significantly shorter sales cycles. The key lies not in
                tracking more data, but in tracking the right data in a consistent, actionable way.
              </p>
            </div>

            <div className="mt-12 grid sm:grid-cols-3 gap-6">
              {[
                { metric: "15-20%", label: "Higher Win Rates" },
                { metric: "25%", label: "Better Forecast Accuracy" },
                { metric: "30%", label: "Shorter Sales Cycles" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center p-6 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-2xl border border-purple-500/20"
                >
                  <div className="text-4xl font-bold gradient-text mb-2">{stat.metric}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Essential Deal Information */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="What to Track"
            title="Essential Deal Information to Capture"
            titleGradient="Essential Deal"
            description="The critical data points that drive deal success and accurate forecasting."
          />

          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: DollarSign,
                title: "Deal Value & Revenue",
                description:
                  "Track the total deal value, including one-time and recurring revenue. Include weighted values based on stage probability for accurate forecasting.",
                fields: [
                  "Total deal amount",
                  "Monthly/annual recurring revenue",
                  "Weighted pipeline value",
                  "Discount applied",
                ],
              },
              {
                icon: Calendar,
                title: "Timeline & Milestones",
                description:
                  "Monitor key dates and deadlines throughout the sales process. Track how long deals spend in each stage to identify bottlenecks.",
                fields: [
                  "Expected close date",
                  "Days in current stage",
                  "Next follow-up date",
                  "Decision deadline",
                ],
              },
              {
                icon: Target,
                title: "Qualification Criteria",
                description:
                  "Document how well the opportunity matches your ideal customer profile. Use frameworks like BANT, MEDDIC, or GPCTBA/C&I.",
                fields: [
                  "Budget confirmed",
                  "Decision maker identified",
                  "Timeline established",
                  "Need validated",
                ],
              },
              {
                icon: Eye,
                title: "Stakeholder Mapping",
                description:
                  "Track all people involved in the decision-making process. Understand their roles, influence levels, and stance on your solution.",
                fields: [
                  "Economic buyer",
                  "Champions & advocates",
                  "Technical evaluators",
                  "Potential blockers",
                ],
              },
              {
                icon: FileText,
                title: "Interaction History",
                description:
                  "Maintain a complete record of every touchpoint including emails, calls, meetings, and content shared. This context is invaluable.",
                fields: [
                  "Email correspondence",
                  "Call notes & outcomes",
                  "Meeting summaries",
                  "Content engagement",
                ],
              },
              {
                icon: AlertTriangle,
                title: "Risks & Objections",
                description:
                  "Document known risks, objections raised, and competition involved. Proactively addressing these improves win rates significantly.",
                fields: [
                  "Identified competitors",
                  "Objections encountered",
                  "Risk factors",
                  "Mitigation strategies",
                ],
              },
            ].map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-background/50 backdrop-blur-sm border border-border rounded-2xl p-6 hover:border-purple-500/50 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center mb-4">
                  <category.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{category.title}</h3>
                <p className="text-muted-foreground mb-4">{category.description}</p>
                <ul className="space-y-2">
                  {category.fields.map((field, fieldIndex) => (
                    <li
                      key={fieldIndex}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      {field}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Deal Tracking Workflow */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Process"
            title="Building Your Deal Tracking Workflow"
            titleGradient="Tracking Workflow"
            description="A systematic approach to tracking deals throughout the sales cycle."
          />

          <div className="mt-12 max-w-4xl mx-auto">
            {[
              {
                step: 1,
                title: "Capture Deal Information at Creation",
                content:
                  "When a new deal enters your pipeline, capture all available information immediately. Use required fields to ensure essential data is collected, but do not overwhelm reps with too many mandatory fields. LeadFlow allows you to configure which fields are required at each stage, progressively gathering information as deals advance.",
              },
              {
                step: 2,
                title: "Update After Every Interaction",
                content:
                  "Make it a non-negotiable habit to update deal records after every customer interaction. Log call notes, email summaries, and meeting outcomes within 24 hours while details are fresh. LeadFlow's mobile app and email integration make this effortless, automatically logging activities and prompting for notes.",
              },
              {
                step: 3,
                title: "Review and Validate Weekly",
                content:
                  "Schedule weekly deal reviews to assess deal health, update probabilities, and validate close dates. Use this time to identify stalled deals that need attention and remove dead opportunities. LeadFlow's pipeline health dashboard highlights deals needing review automatically.",
              },
              {
                step: 4,
                title: "Analyze Patterns Monthly",
                content:
                  "Monthly, analyze your deal data to identify patterns. Which sources produce the best deals? What is your average sales cycle by segment? Where do deals commonly stall? LeadFlow's reporting suite provides these insights out of the box, helping you continuously improve your process.",
              },
              {
                step: 5,
                title: "Automate What You Can",
                content:
                  "Set up automation to reduce manual tracking burden. Auto-create follow-up tasks after meetings, trigger alerts when deals go stale, and automatically update deal stages based on activities. LeadFlow's workflow automation handles repetitive tracking tasks so you can focus on selling.",
              },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex gap-6 mb-8 last:mb-0"
              >
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold">
                    {item.step}
                  </div>
                  {index < 4 && (
                    <div className="w-px h-full bg-gradient-to-b from-purple-500 to-transparent mx-auto mt-2" />
                  )}
                </div>
                <div className="pb-8">
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.content}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Deal Tracking Metrics */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Measurement"
            title="Key Deal Tracking Metrics to Monitor"
            titleGradient="Metrics"
            description="The numbers that reveal the health of your deals and sales process."
          />

          <div className="mt-12 grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: TrendingUp,
                title: "Win Rate by Stage",
                description:
                  "Track conversion rates between pipeline stages to identify where deals commonly drop off. This reveals coaching opportunities and process improvements.",
                benchmark: "Benchmark: 20-30% overall win rate for B2B sales",
              },
              {
                icon: Clock,
                title: "Sales Cycle Length",
                description:
                  "Monitor how long deals take from creation to close. Segment by deal size, source, and customer type to set realistic expectations and identify bottlenecks.",
                benchmark: "Benchmark: Varies by industry, track your own baseline",
              },
              {
                icon: BarChart3,
                title: "Pipeline Velocity",
                description:
                  "Calculate how fast money moves through your pipeline using: (Number of Deals x Average Value x Win Rate) / Sales Cycle Length.",
                benchmark: "Goal: Increase velocity by improving any of the four components",
              },
              {
                icon: Bell,
                title: "Deal Age Distribution",
                description:
                  "Analyze how many deals are in each age bracket. Too many old deals indicates pipeline rot and unreliable forecasting.",
                benchmark: "Benchmark: No more than 20% of deals older than 2x average cycle",
              },
            ].map((metric, index) => (
              <motion.div
                key={metric.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-background border border-border rounded-xl p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center">
                    <metric.icon className="w-5 h-5 text-purple-400" />
                  </div>
                  <h3 className="text-lg font-semibold">{metric.title}</h3>
                </div>
                <p className="text-muted-foreground mb-4">{metric.description}</p>
                <p className="text-sm text-purple-400 italic">{metric.benchmark}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Practices */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Pro Tips"
            title="Deal Tracking Best Practices from Top Performers"
            titleGradient="Best Practices"
            description="Strategies that separate high performers from the rest."
          />

          <div className="mt-12 max-w-4xl mx-auto space-y-6">
            {[
              {
                title: "Use Consistent Naming Conventions",
                content:
                  "Establish clear naming standards for deals. Include company name, product, and expected close quarter. For example: 'Acme Corp - Enterprise Suite - Q1 2025'. This makes searching and reporting much easier.",
              },
              {
                title: "Set Next Steps for Every Deal",
                content:
                  "Never leave a deal without a defined next action. Whether it is a follow-up call, sending a proposal, or scheduling a demo, every deal should have a clear next step with an owner and due date.",
              },
              {
                title: "Document the 'Why' Behind Stage Changes",
                content:
                  "When moving deals between stages, add a note explaining why. This context helps during pipeline reviews and provides valuable data for analyzing why deals succeed or fail.",
              },
              {
                title: "Track Competitive Intelligence",
                content:
                  "Document when competitors are involved and what you learn about their positioning. Over time, this intelligence helps you win more competitive deals and improve your differentiation.",
              },
              {
                title: "Review Lost Deals Quarterly",
                content:
                  "Conduct quarterly analysis of lost deals to identify patterns. Are you losing to specific competitors? At certain price points? Understanding why you lose is as valuable as knowing why you win.",
              },
            ].map((practice, index) => (
              <motion.div
                key={practice.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 bg-gradient-to-br from-purple-500/5 to-blue-500/5 border border-border rounded-xl"
              >
                <h3 className="text-lg font-semibold mb-2">{practice.title}</h3>
                <p className="text-muted-foreground">{practice.content}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-12 text-center"
          >
            <Link href="/handler/sign-up">
              <GlowButton size="lg">
                Start Tracking Deals with LeadFlow
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
            badge="Learn More"
            title="Related CRM Resources"
            titleGradient="Resources"
            description="Continue optimizing your CRM with these guides."
          />

          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              {
                title: "Pipeline Setup Guide",
                href: "/resources/crm-best-practices/pipeline-setup",
              },
              {
                title: "CRM Data Hygiene",
                href: "/resources/crm-best-practices/data-hygiene",
              },
              {
                title: "CRM Customization Tips",
                href: "/resources/crm-best-practices/crm-customization",
              },
              {
                title: "CRM Migration Guide",
                href: "/resources/crm-best-practices/crm-migration",
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
              Ready to Transform Your{" "}
              <GradientText>Deal Tracking</GradientText>?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              LeadFlow gives you all the tools you need to track deals effectively,
              forecast accurately, and close more business. Start your free trial today.
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
