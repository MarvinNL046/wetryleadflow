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
  Target,
  TrendingUp,
  Users,
  CheckCircle,
  Layers,
  BarChart3,
  Settings,
  Zap,
} from "lucide-react";

export default function PipelineSetupPage() {
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
              How to Set Up Your{" "}
              <GradientText>Sales Pipeline</GradientText> for Maximum Conversions
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              A well-structured sales pipeline is the backbone of any successful sales operation.
              Learn how to design, implement, and optimize your pipeline stages to close more deals
              and grow your revenue predictably.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/handler/sign-up">
                <GlowButton size="lg">
                  Start Building Your Pipeline
                  <ArrowRight className="ml-2 h-5 w-5" />
                </GlowButton>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What is a Sales Pipeline */}
      <section className="py-20 border-t border-border/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Fundamentals"
            title="Understanding the Sales Pipeline"
            titleGradient="Sales Pipeline"
            description="Before diving into setup, let's establish what a sales pipeline is and why it matters."
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
                A sales pipeline is a visual representation of your sales process, showing where prospects
                are in their buying journey from initial contact to closed deal. Think of it as a roadmap
                that guides both your sales team and your prospects through a structured process.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                Unlike a sales funnel, which focuses on conversion rates and volume at each stage, a
                pipeline emphasizes the actions your team takes to move deals forward. A well-designed
                pipeline helps you forecast revenue, identify bottlenecks, and ensure no opportunity
                falls through the cracks.
              </p>
              <p className="text-lg text-muted-foreground">
                Research shows that companies with a defined sales pipeline experience 28% higher revenue
                growth than those without one. The key is not just having a pipeline, but having one
                that accurately reflects your unique sales process and buyer behavior.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pipeline Stages */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Core Framework"
            title="Essential Pipeline Stages Every Business Needs"
            titleGradient="Pipeline Stages"
            description="While every business is unique, most successful pipelines include these foundational stages."
          />

          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: "Lead Qualification",
                description:
                  "The first stage where you determine if a prospect fits your ideal customer profile. Use BANT criteria (Budget, Authority, Need, Timeline) or similar frameworks to qualify leads before investing resources.",
                tips: [
                  "Define clear qualification criteria",
                  "Score leads automatically with LeadFlow",
                  "Set minimum thresholds for advancement",
                ],
              },
              {
                icon: Users,
                title: "Discovery & Needs Analysis",
                description:
                  "Understand your prospect's challenges, goals, and requirements. This is where you gather the information needed to position your solution effectively and build genuine rapport.",
                tips: [
                  "Prepare discovery call questions",
                  "Document pain points in CRM notes",
                  "Identify all stakeholders involved",
                ],
              },
              {
                icon: Layers,
                title: "Solution Presentation",
                description:
                  "Present your product or service as the solution to their specific needs. Customize your pitch based on discovery findings to demonstrate clear value and ROI.",
                tips: [
                  "Tailor demos to their use case",
                  "Address specific pain points",
                  "Include relevant case studies",
                ],
              },
              {
                icon: BarChart3,
                title: "Proposal & Negotiation",
                description:
                  "Deliver a formal proposal with pricing, terms, and implementation details. Handle objections professionally and negotiate terms that work for both parties.",
                tips: [
                  "Use proposal templates for consistency",
                  "Track proposal views and engagement",
                  "Set clear follow-up reminders",
                ],
              },
              {
                icon: CheckCircle,
                title: "Commitment & Close",
                description:
                  "Secure verbal commitment and move to contract signing. Ensure all stakeholders are aligned and handle any final questions or concerns.",
                tips: [
                  "Confirm decision timeline",
                  "Prepare contract documentation",
                  "Celebrate wins with your team",
                ],
              },
              {
                icon: TrendingUp,
                title: "Won & Onboarding",
                description:
                  "Mark the deal as won and transition to customer success. A smooth handoff ensures customer satisfaction and sets the stage for future upsells and referrals.",
                tips: [
                  "Schedule kickoff meeting",
                  "Share relevant docs with CS team",
                  "Request referrals after success",
                ],
              },
            ].map((stage, index) => (
              <motion.div
                key={stage.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-background/50 backdrop-blur-sm border border-border rounded-2xl p-6 hover:border-purple-500/50 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center mb-4">
                  <stage.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{stage.title}</h3>
                <p className="text-muted-foreground mb-4">{stage.description}</p>
                <ul className="space-y-2">
                  {stage.tips.map((tip, tipIndex) => (
                    <li
                      key={tipIndex}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
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

      {/* Best Practices */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Expert Advice"
            title="Pipeline Setup Best Practices"
            titleGradient="Best Practices"
            description="Follow these proven strategies to maximize your pipeline effectiveness."
          />

          <div className="mt-12 max-w-4xl mx-auto space-y-8">
            {[
              {
                title: "Keep It Simple: 5-7 Stages Maximum",
                content:
                  "Overcomplicating your pipeline with too many stages creates confusion and slows down your sales process. Research suggests that 5-7 stages is optimal for most B2B sales processes. Each stage should represent a clear milestone in the buyer's journey with specific entry and exit criteria.",
              },
              {
                title: "Define Clear Stage Criteria and Actions",
                content:
                  "Every stage needs explicit criteria for entry and exit. What actions must be completed before a deal can move forward? What information must be gathered? Document these requirements and train your team to follow them consistently. This ensures pipeline accuracy and reliable forecasting.",
              },
              {
                title: "Align Stages with Your Buyer's Journey",
                content:
                  "Your pipeline should mirror how your customers actually buy, not how you want to sell. Interview existing customers about their buying process, analyze deal history, and adjust your stages to match reality. A customer-centric pipeline creates natural momentum.",
              },
              {
                title: "Set Realistic Stage Probabilities",
                content:
                  "Assign win probability percentages to each stage based on historical data. A lead in qualification might have 10% probability while a deal in negotiation might have 70%. These probabilities power accurate revenue forecasting and help prioritize deals effectively.",
              },
              {
                title: "Implement Regular Pipeline Reviews",
                content:
                  "Schedule weekly pipeline reviews to examine deal health, identify stuck opportunities, and forecast accuracy. Use these sessions to coach reps, remove blockers, and ensure data hygiene. Consistent reviews prevent pipeline rot and keep momentum high.",
              },
            ].map((practice, index) => (
              <motion.div
                key={practice.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex gap-4"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold">
                  {index + 1}
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

      {/* Common Mistakes */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Avoid These Pitfalls"
            title="Common Pipeline Setup Mistakes"
            titleGradient="Mistakes"
            description="Learn from others' errors to build a more effective pipeline from day one."
          />

          <div className="mt-12 grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                mistake: "Creating stages based on internal activities",
                solution:
                  "Focus on buyer milestones instead. 'Sent proposal' is an activity; 'Proposal reviewed and budget approved' is a milestone.",
              },
              {
                mistake: "Allowing deals to sit stagnant in stages",
                solution:
                  "Set maximum time limits for each stage. If a deal hasn't progressed in 30 days, it needs attention or removal.",
              },
              {
                mistake: "Not cleaning the pipeline regularly",
                solution:
                  "Dead deals pollute your data and skew forecasts. Implement monthly pipeline cleaning sessions to maintain accuracy.",
              },
              {
                mistake: "One-size-fits-all pipeline for different products",
                solution:
                  "Different products or customer segments may need different pipelines. LeadFlow supports multiple pipelines for this reason.",
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
                <div className="flex items-center gap-2 mb-3 text-red-400">
                  <span className="text-lg font-semibold">Mistake:</span>
                </div>
                <p className="text-muted-foreground mb-4">{item.mistake}</p>
                <div className="flex items-center gap-2 mb-3 text-green-400">
                  <span className="text-lg font-semibold">Solution:</span>
                </div>
                <p className="text-muted-foreground">{item.solution}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* LeadFlow Features */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Why LeadFlow"
            title="Build Your Perfect Pipeline with LeadFlow"
            titleGradient="LeadFlow"
            description="Our modern CRM makes pipeline setup and management effortless."
          />

          <div className="mt-12 grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Settings,
                title: "Drag-and-Drop Pipeline Builder",
                description:
                  "Create and customize pipeline stages in minutes with our intuitive visual builder. No technical skills required.",
              },
              {
                icon: Zap,
                title: "Automated Stage Progression",
                description:
                  "Set rules to automatically move deals between stages based on actions, engagement, or time triggers.",
              },
              {
                icon: BarChart3,
                title: "Real-Time Pipeline Analytics",
                description:
                  "Track velocity, conversion rates, and bottlenecks with live dashboards that update as you work.",
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
            badge="Continue Learning"
            title="Related CRM Resources"
            titleGradient="Resources"
            description="Explore more guides to optimize your sales process."
          />

          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              {
                title: "Deal Tracking Best Practices",
                href: "/resources/crm-best-practices/deal-tracking",
              },
              {
                title: "CRM Data Hygiene Guide",
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
              Ready to Build Your{" "}
              <GradientText>Winning Pipeline</GradientText>?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of sales teams using LeadFlow to streamline their sales process
              and close more deals. Get started in minutes with our intuitive pipeline builder.
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
