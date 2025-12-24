"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  RefreshCw,
  Zap,
  Target,
  Clock,
  TrendingUp,
  Users,
  Bell,
  CheckCircle2,
  ArrowRight,
  Calendar,
  MessageSquare,
  Shield,
  Workflow,
  Timer,
} from "lucide-react";
import {
  LandingHeader,
  LandingFooter,
  GlowButton,
  GradientText,
  SectionHeading,
} from "@/components/landing";

export default function FollowUpAutomationPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <LandingHeader />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <RefreshCw className="w-4 h-4 mr-2" />
              Sales Automation
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Automated Follow-Up:{" "}
              <GradientText>Never Miss a Lead</GradientText> Again
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Studies show that 80% of sales require 5+ follow-ups, yet 44% of salespeople
              give up after just one. Learn how automated follow-up systems can ensure
              every lead gets the attention they deserve without overwhelming your team.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/handler/sign-up">
                <GlowButton size="lg">
                  Automate Your Follow-Ups
                  <ArrowRight className="w-5 h-5 ml-2" />
                </GlowButton>
              </Link>
              <Link
                href="/resources/sales-automation/email-sequences"
                className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
              >
                Explore email sequences
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* The Follow-Up Problem Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="The Challenge"
            title="Why Most Sales Teams Struggle With Follow-Up"
            titleGradient="Struggle"
            description="Understanding the follow-up gap that costs businesses millions in lost revenue every year."
          />

          <div className="mt-16 grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="p-6 rounded-2xl bg-background border border-border">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center">
                    <Timer className="w-6 h-6 text-red-500" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-red-500">44%</div>
                    <div className="text-sm text-muted-foreground">
                      of sales reps give up after one follow-up
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-background border border-border">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-orange-500">80%</div>
                    <div className="text-sm text-muted-foreground">
                      of sales require 5+ follow-up contacts
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-background border border-border">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                    <Target className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-green-500">50%</div>
                    <div className="text-sm text-muted-foreground">
                      of leads go to the vendor that responds first
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-2xl font-bold mb-4">
                The Cost of Manual Follow-Up
              </h3>
              <p className="text-muted-foreground mb-6">
                The traditional approach to follow-up is fundamentally broken. Sales
                representatives juggle dozens or even hundreds of leads, relying on
                memory, sticky notes, or basic CRM reminders to stay on top of their
                pipeline. Inevitably, leads fall through the cracks, opportunities are
                missed, and potential revenue evaporates.
              </p>
              <p className="text-muted-foreground mb-6">
                The cognitive load of remembering who to contact, when to reach out,
                and what to say creates constant stress and leads to inconsistent
                execution. Even the most diligent sales professionals struggle to
                maintain perfect follow-up discipline across a full pipeline.
              </p>
              <p className="text-muted-foreground">
                This is where automated follow-up systems become not just helpful,
                but essential for competitive sales organizations. By removing the
                burden of remembering and timing from human shoulders, automation
                ensures every lead receives consistent, timely attention regardless
                of how busy your team becomes.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How Automation Solves It Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="The Solution"
            title="How Automated Follow-Up Transforms Sales"
            titleGradient="Transforms"
            description="Discover the mechanics of effective follow-up automation and why it delivers consistent results."
          />

          <div className="mt-16 grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Workflow,
                title: "Trigger-Based Sequences",
                description:
                  "Automated follow-ups begin the moment a specific trigger occurs. Whether it's a form submission, email open, website visit, or calendar event, LeadFlow instantly initiates the appropriate follow-up sequence without any manual intervention. This means your leads receive immediate attention 24/7, even while your team sleeps.",
                features: [
                  "Form submission triggers",
                  "Email engagement triggers",
                  "Website behavior triggers",
                  "CRM event triggers",
                ],
              },
              {
                icon: Calendar,
                title: "Intelligent Timing",
                description:
                  "Not all follow-ups should happen immediately. LeadFlow's intelligent timing system considers optimal contact windows, timezone differences, and historical engagement patterns to deliver messages when they're most likely to be seen and acted upon. This scientific approach to timing dramatically improves response rates.",
                features: [
                  "Timezone-aware scheduling",
                  "Optimal send time analysis",
                  "Business hours respect",
                  "Engagement pattern learning",
                ],
              },
              {
                icon: MessageSquare,
                title: "Multi-Channel Outreach",
                description:
                  "Modern buyers expect to be reached on their preferred channels. LeadFlow's follow-up automation spans email, SMS, phone call reminders, and even social media touchpoints. This omnichannel approach ensures your message gets through, regardless of where your prospect prefers to communicate.",
                features: [
                  "Email sequences",
                  "SMS follow-ups",
                  "Call task creation",
                  "Social media reminders",
                ],
              },
            ].map((solution, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-8 rounded-2xl bg-muted/50 border border-border hover:border-purple-500/50 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center mb-6">
                  <solution.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{solution.title}</h3>
                <p className="text-muted-foreground mb-6">{solution.description}</p>
                <ul className="space-y-2">
                  {solution.features.map((feature, idx) => (
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

      {/* Follow-Up Strategies Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Strategies"
            title="Proven Follow-Up Strategies That Convert"
            titleGradient="Convert"
            description="Implement these battle-tested follow-up strategies to maximize your conversion rates."
          />

          <div className="mt-16 space-y-8">
            {[
              {
                number: "01",
                title: "The Speed-to-Lead Strategy",
                content:
                  "Research from InsideSales.com shows that responding to a lead within 5 minutes makes you 100x more likely to connect compared to waiting 30 minutes. LeadFlow's instant trigger system ensures your first follow-up goes out within seconds of a lead action, not hours or days. This immediate response sets the tone for the entire relationship and significantly increases your chances of conversion.",
              },
              {
                number: "02",
                title: "The Persistence Pattern",
                content:
                  "The most effective follow-up sequences follow a strategic persistence pattern: an immediate response, followed by touches at 1 day, 3 days, 7 days, 14 days, and 30 days. Each touch adds value rather than simply asking for a response. LeadFlow allows you to create these sophisticated multi-touch sequences that maintain engagement without feeling pushy or desperate.",
              },
              {
                number: "03",
                title: "The Value-Add Approach",
                content:
                  "Every follow-up should provide value, not just ask for attention. Share relevant case studies, industry insights, helpful resources, or personalized recommendations. LeadFlow's dynamic content system allows you to automatically include relevant value-adds based on lead characteristics, ensuring each follow-up strengthens your position as a trusted advisor rather than a pushy salesperson.",
              },
              {
                number: "04",
                title: "The Multi-Channel Cadence",
                content:
                  "Don't rely on a single channel for follow-up. Create cadences that combine email, phone, SMS, and social touches to maximize your chances of connecting. LeadFlow's omnichannel automation allows you to orchestrate touches across all channels, tracking engagement and adjusting the cadence based on where your prospect responds best.",
              },
              {
                number: "05",
                title: "The Re-Engagement Loop",
                content:
                  "Not every lead converts on the first sequence. Build re-engagement loops that automatically activate when leads go cold, offering new angles, updated value propositions, or special incentives. LeadFlow can detect engagement drops and automatically transition leads into re-engagement sequences designed to reignite interest.",
              },
            ].map((strategy, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex gap-6 p-6 rounded-2xl bg-background border border-border"
              >
                <div className="text-4xl font-bold text-blue-500/30">
                  {strategy.number}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3">{strategy.title}</h3>
                  <p className="text-muted-foreground">{strategy.content}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="LeadFlow Features"
            title="Follow-Up Automation Features"
            titleGradient="Automation"
            description="Everything you need to build a bulletproof follow-up system that never lets leads slip away."
          />

          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Zap,
                title: "Instant Triggers",
                description:
                  "Launch follow-ups within seconds of any lead action with our real-time trigger system.",
              },
              {
                icon: Clock,
                title: "Smart Scheduling",
                description:
                  "AI-powered scheduling that considers timezone, engagement history, and optimal contact windows.",
              },
              {
                icon: Users,
                title: "Sequence Templates",
                description:
                  "Pre-built follow-up sequences for common scenarios, customizable to your business.",
              },
              {
                icon: Bell,
                title: "Engagement Alerts",
                description:
                  "Get notified instantly when a lead engages, enabling timely personal intervention.",
              },
              {
                icon: Shield,
                title: "Do Not Contact Rules",
                description:
                  "Automatically respect opt-outs, time restrictions, and contact preferences.",
              },
              {
                icon: TrendingUp,
                title: "Performance Analytics",
                description:
                  "Track follow-up effectiveness with detailed metrics on response rates and conversions.",
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
              Stop Letting Leads{" "}
              <GradientText>Fall Through the Cracks</GradientText>
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join sales teams that have increased their response rates by 300% with
              LeadFlow&apos;s automated follow-up system. Every lead deserves attention,
              and now every lead can get it.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/handler/sign-up">
                <GlowButton size="lg">
                  Start Automating Follow-Ups
                  <ArrowRight className="w-5 h-5 ml-2" />
                </GlowButton>
              </Link>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              Free 14-day trial. No credit card required. Set up in under 10 minutes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Related Resources */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Related Resources"
            title="Explore More Sales Automation"
            titleGradient="Sales Automation"
            description="Continue learning about the tools and strategies that drive sales success."
          />

          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Email Sequences",
                description: "Build converting email campaigns that nurture leads automatically",
                href: "/resources/sales-automation/email-sequences",
              },
              {
                title: "Task Automation",
                description: "Eliminate repetitive tasks and focus on closing deals",
                href: "/resources/sales-automation/task-automation",
              },
              {
                title: "Appointment Scheduling",
                description: "Let prospects book meetings without the back-and-forth",
                href: "/resources/sales-automation/appointment-scheduling",
              },
              {
                title: "Smart Notifications",
                description: "Get real-time alerts when leads take important actions",
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
