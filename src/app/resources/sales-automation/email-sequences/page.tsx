"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Mail,
  Zap,
  Target,
  Clock,
  TrendingUp,
  Users,
  BarChart3,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  RefreshCw,
  MessageSquare,
} from "lucide-react";
import {
  LandingHeader,
  LandingFooter,
  GlowButton,
  GradientText,
  SectionHeading,
} from "@/components/landing";

export default function EmailSequencesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <LandingHeader />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Mail className="w-4 h-4 mr-2" />
              Sales Automation
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Email Sequences That{" "}
              <GradientText>Convert Leads</GradientText> Into Customers
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Discover how automated email sequences can transform your sales process,
              nurture leads on autopilot, and dramatically increase your conversion rates
              with LeadFlow&apos;s intelligent automation platform.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/handler/sign-up">
                <GlowButton size="lg">
                  Start Building Sequences
                  <ArrowRight className="w-5 h-5 ml-2" />
                </GlowButton>
              </Link>
              <Link
                href="/resources/sales-automation/follow-up-automation"
                className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
              >
                Learn about follow-up automation
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What Are Email Sequences Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Understanding Email Sequences"
            title="What Are Automated Email Sequences?"
            titleGradient="Email Sequences"
            description="Learn the fundamentals of email sequences and how they can revolutionize your sales outreach strategy."
          />

          <div className="mt-16 grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold mb-4">
                The Power of Automated Outreach
              </h3>
              <p className="text-muted-foreground mb-6">
                Email sequences are a series of pre-written emails that are automatically
                sent to leads based on specific triggers, timelines, or behaviors. Unlike
                one-off email blasts, sequences create a consistent, personalized journey
                that guides prospects through your sales funnel without requiring manual
                intervention for every message.
              </p>
              <p className="text-muted-foreground mb-6">
                Modern sales teams are discovering that well-crafted email sequences can
                increase response rates by up to 300% compared to single-touch outreach.
                The key lies in strategic timing, relevant content, and persistent yet
                professional follow-up that keeps your brand top-of-mind throughout the
                buying journey.
              </p>
              <p className="text-muted-foreground">
                With LeadFlow&apos;s email sequence builder, you can create sophisticated
                multi-touch campaigns that adapt to lead behavior, ensuring every prospect
                receives the right message at exactly the right moment in their decision-making
                process.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { icon: Target, label: "Targeted Messaging", value: "85% higher engagement" },
                { icon: Clock, label: "Perfect Timing", value: "3x response rates" },
                { icon: TrendingUp, label: "Conversion Boost", value: "47% more sales" },
                { icon: Users, label: "Lead Nurturing", value: "Automated journey" },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="p-6 rounded-2xl bg-background border border-border hover:border-purple-500/50 transition-colors"
                >
                  <stat.icon className="w-8 h-8 text-purple-500 mb-3" />
                  <div className="font-semibold mb-1">{stat.label}</div>
                  <div className="text-sm text-muted-foreground">{stat.value}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Types of Email Sequences Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Sequence Types"
            title="Essential Email Sequences for Sales Teams"
            titleGradient="Email Sequences"
            description="Master the different types of email sequences that drive results at every stage of your sales pipeline."
          />

          <div className="mt-16 grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Sparkles,
                title: "Welcome Sequences",
                description:
                  "First impressions matter. Welcome sequences introduce new leads to your brand, set expectations, and begin building trust from the very first interaction. These sequences typically include a warm greeting, value proposition overview, and next steps for engagement.",
                features: [
                  "Brand introduction",
                  "Value proposition",
                  "Resource sharing",
                  "Engagement prompts",
                ],
              },
              {
                icon: RefreshCw,
                title: "Nurture Sequences",
                description:
                  "Not every lead is ready to buy immediately. Nurture sequences keep prospects engaged over time by delivering valuable content, industry insights, and soft touches that position your solution as the answer to their challenges when they're ready to make a decision.",
                features: [
                  "Educational content",
                  "Case studies",
                  "Industry insights",
                  "Gradual progression",
                ],
              },
              {
                icon: MessageSquare,
                title: "Re-engagement Sequences",
                description:
                  "Revive cold leads and dormant opportunities with strategic re-engagement sequences. These campaigns use compelling hooks, special offers, or new value propositions to reignite interest and bring inactive prospects back into your active pipeline.",
                features: [
                  "Win-back campaigns",
                  "Special offers",
                  "New feature announcements",
                  "Feedback requests",
                ],
              },
            ].map((sequence, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-8 rounded-2xl bg-muted/50 border border-border hover:border-purple-500/50 transition-all hover:shadow-lg hover:shadow-purple-500/10"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center mb-6">
                  <sequence.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{sequence.title}</h3>
                <p className="text-muted-foreground mb-6">{sequence.description}</p>
                <ul className="space-y-2">
                  {sequence.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Practices Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Best Practices"
            title="How to Create High-Converting Email Sequences"
            titleGradient="High-Converting"
            description="Follow these proven strategies to maximize the effectiveness of your automated email campaigns."
          />

          <div className="mt-16 space-y-8">
            {[
              {
                number: "01",
                title: "Start With Clear Goals and Segmentation",
                content:
                  "Every successful email sequence begins with a crystal-clear objective. Are you trying to book demos, close deals, or nurture leads for the long term? Define your goals first, then segment your audience based on criteria like industry, company size, engagement level, or position in the sales funnel. LeadFlow's advanced segmentation allows you to create hyper-targeted sequences that speak directly to each prospect's unique situation and needs.",
              },
              {
                number: "02",
                title: "Craft Compelling Subject Lines and Preview Text",
                content:
                  "Your subject line is the gatekeeper to engagement. It determines whether your carefully crafted message gets opened or ignored. Use personalization tokens, create urgency when appropriate, ask intriguing questions, or lead with value. A/B test different approaches to discover what resonates best with your audience. LeadFlow provides built-in analytics to track open rates and help you optimize your subject lines over time.",
              },
              {
                number: "03",
                title: "Optimize Timing and Frequency",
                content:
                  "The timing of your emails can significantly impact their effectiveness. Research suggests that B2B emails perform best on Tuesday through Thursday, typically between 9-11 AM in the recipient's timezone. However, your specific audience may have different patterns. Use LeadFlow's send-time optimization feature to automatically deliver emails when each individual lead is most likely to engage based on their historical behavior.",
              },
              {
                number: "04",
                title: "Personalize Beyond the First Name",
                content:
                  "True personalization goes far beyond inserting a prospect's name into your greeting. Reference their specific industry challenges, mention their company's recent news or achievements, and tailor your value proposition to their exact use case. LeadFlow integrates with your CRM data to enable dynamic content blocks that automatically adjust based on lead attributes, creating a genuinely personalized experience at scale.",
              },
              {
                number: "05",
                title: "Include Clear Calls-to-Action",
                content:
                  "Every email in your sequence should have a single, clear purpose and call-to-action. Whether you're asking for a meeting, directing them to a resource, or simply requesting a reply, make the desired action unmistakably obvious. Use action-oriented language, create visual contrast for CTA buttons, and reduce friction by minimizing the steps required to take action.",
              },
            ].map((practice, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex gap-6 p-6 rounded-2xl bg-background border border-border"
              >
                <div className="text-4xl font-bold text-purple-500/30">
                  {practice.number}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3">{practice.title}</h3>
                  <p className="text-muted-foreground">{practice.content}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* LeadFlow Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="LeadFlow Features"
            title="Powerful Email Sequence Tools Built for Sales"
            titleGradient="Powerful"
            description="Discover the features that make LeadFlow the preferred choice for sales teams serious about email automation."
          />

          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Zap,
                title: "Visual Sequence Builder",
                description:
                  "Design complex multi-step sequences with our intuitive drag-and-drop builder. No coding required.",
              },
              {
                icon: BarChart3,
                title: "Real-Time Analytics",
                description:
                  "Track opens, clicks, replies, and conversions for every email in your sequence with detailed reporting.",
              },
              {
                icon: Target,
                title: "Smart Triggers",
                description:
                  "Automatically start sequences based on lead behavior, form submissions, or CRM events.",
              },
              {
                icon: Users,
                title: "A/B Testing",
                description:
                  "Test different subject lines, content, and send times to continuously optimize performance.",
              },
              {
                icon: Clock,
                title: "Send-Time Optimization",
                description:
                  "AI-powered delivery timing that learns when each lead is most likely to engage.",
              },
              {
                icon: RefreshCw,
                title: "Dynamic Content",
                description:
                  "Personalize emails with dynamic fields that pull from your lead data automatically.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-muted/50 border border-border hover:border-purple-500/50 transition-colors"
              >
                <feature.icon className="w-10 h-10 text-purple-500 mb-4" />
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your{" "}
              <GradientText>Email Outreach?</GradientText>
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of sales teams using LeadFlow to automate their email
              sequences and convert more leads into customers. Start your free trial
              today and see results within your first week.
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

      {/* Related Resources */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Related Resources"
            title="Continue Learning About Sales Automation"
            titleGradient="Sales Automation"
            description="Explore more ways to automate and optimize your sales process with LeadFlow."
          />

          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Follow-Up Automation",
                description: "Never miss a lead with automated follow-up sequences",
                href: "/resources/sales-automation/follow-up-automation",
              },
              {
                title: "Task Automation",
                description: "Automate repetitive sales tasks and save hours daily",
                href: "/resources/sales-automation/task-automation",
              },
              {
                title: "Appointment Scheduling",
                description: "Let leads book meetings directly on your calendar",
                href: "/resources/sales-automation/appointment-scheduling",
              },
              {
                title: "Smart Notifications",
                description: "Get alerted when leads take important actions",
                href: "/resources/sales-automation/smart-notifications",
              },
            ].map((resource, index) => (
              <Link key={index} href={resource.href}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 rounded-2xl bg-muted/50 border border-border hover:border-purple-500/50 transition-all hover:shadow-lg hover:shadow-purple-500/10 h-full"
                >
                  <h3 className="font-semibold mb-2">{resource.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {resource.description}
                  </p>
                  <span className="text-purple-500 text-sm flex items-center gap-1">
                    Learn more <ArrowRight className="w-3 h-3" />
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
