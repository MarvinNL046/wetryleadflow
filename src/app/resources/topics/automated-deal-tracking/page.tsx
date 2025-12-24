"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Target,
  Zap,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Clock,
  BarChart3,
  Repeat,
  Users,
  FileText,
} from "lucide-react";
import {
  LandingHeader,
  LandingFooter,
  GlowButton,
  GradientText,
} from "@/components/landing";

const relatedTopics = [
  {
    title: "Contact Import Automation",
    description: "Streamline contact management with automated import workflows",
    href: "/resources/topics/contact-import-automation",
    gradient: "from-rose-500 to-pink-500",
  },
  {
    title: "Permission-Based Analytics",
    description: "Combine team permissions with performance insights",
    href: "/resources/topics/permission-based-analytics",
    gradient: "from-violet-500 to-purple-500",
  },
  {
    title: "Kanban Team Workflow",
    description: "Visual pipeline management with team collaboration",
    href: "/resources/topics/kanban-team-workflow",
    gradient: "from-teal-500 to-emerald-500",
  },
];

const linkedResources = [
  {
    title: "Task Automation",
    description: "Automate repetitive sales tasks and free up selling time",
    href: "/resources/sales-automation/task-automation",
    icon: Zap,
    pillar: "Sales Automation",
  },
  {
    title: "Follow-Up Automation",
    description: "Never miss a follow-up with intelligent automation",
    href: "/resources/sales-automation/follow-up-automation",
    icon: Repeat,
    pillar: "Sales Automation",
  },
  {
    title: "Deal Tracking",
    description: "Master deal management with proven CRM strategies",
    href: "/resources/crm-best-practices/deal-tracking",
    icon: Target,
    pillar: "CRM Best Practices",
  },
  {
    title: "Pipeline Setup",
    description: "Build the foundation for effective deal tracking",
    href: "/resources/crm-best-practices/pipeline-setup",
    icon: BarChart3,
    pillar: "CRM Best Practices",
  },
];

export default function AutomatedDealTrackingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
        <LandingHeader />

        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          {/* Background Effects - Yellow Gradient */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl" />
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <div className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium rounded-full bg-yellow-500/10 text-yellow-500 border border-yellow-500/20">
                <Target className="w-4 h-4 mr-2" />
                Sales Automation + CRM Best Practices
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                Automated Deal Tracking:{" "}
                <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-600 bg-clip-text text-transparent">
                  The Complete Guide
                </span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Combine the power of sales automation with CRM best practices to
                create a seamless deal tracking system that works on autopilot.
                Stop manual updates and let your pipeline manage itself.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/handler/sign-up">
                  <GlowButton size="lg">
                    Start Automating Deals
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
                Where Automation Meets{" "}
                <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  Deal Excellence
                </span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Traditional deal tracking is manual, error-prone, and time-consuming.
                By combining sales automation workflows with proven CRM best practices,
                you can create a system that tracks deals accurately while freeing your
                team to focus on closing.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Clock,
                  title: "Save 5+ Hours Weekly",
                  description:
                    "Automated stage progression, task creation, and data entry eliminate manual CRM updates.",
                },
                {
                  icon: TrendingUp,
                  title: "Improve Pipeline Accuracy",
                  description:
                    "Real-time deal updates and automated validation ensure your forecast is always current.",
                },
                {
                  icon: Users,
                  title: "Better Team Visibility",
                  description:
                    "Everyone sees the same up-to-date deal information without waiting for manual syncs.",
                },
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-8 rounded-2xl bg-background border border-border hover:border-yellow-500/50 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center mb-6">
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
              <div className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium rounded-full bg-yellow-500/10 text-yellow-500 border border-yellow-500/20">
                <FileText className="w-4 h-4 mr-2" />
                Core Concepts
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Building Blocks of{" "}
                <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  Automated Deal Tracking
                </span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {[
                {
                  title: "Trigger-Based Stage Progression",
                  description:
                    "Automatically move deals through your pipeline based on specific actions. When a proposal is sent, the deal advances. When a meeting is scheduled, tasks are created. No manual updates required.",
                  points: [
                    "Email open triggers follow-up tasks",
                    "Proposal views advance deal stages",
                    "Meeting completions update deal status",
                    "Contract signatures trigger onboarding",
                  ],
                },
                {
                  title: "Smart Deal Health Monitoring",
                  description:
                    "Set up automated alerts for stale deals, missing information, and at-risk opportunities. Your CRM becomes proactive rather than reactive.",
                  points: [
                    "Stale deal notifications",
                    "Missing field validation",
                    "Deal velocity tracking",
                    "Risk score calculations",
                  ],
                },
                {
                  title: "Automated Activity Logging",
                  description:
                    "Every email, call, and meeting is automatically logged to the deal record. Sales reps never have to manually update the CRM with activity data.",
                  points: [
                    "Email sync and threading",
                    "Call logging integration",
                    "Meeting notes capture",
                    "Document attachment tracking",
                  ],
                },
                {
                  title: "Intelligent Task Creation",
                  description:
                    "When deals reach certain stages or meet specific criteria, tasks are automatically created and assigned to the right team members.",
                  points: [
                    "Stage-based task templates",
                    "Time-delayed follow-ups",
                    "Escalation workflows",
                    "Handoff task sequences",
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
                        <CheckCircle2 className="w-4 h-4 text-yellow-500" />
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
                automated deal tracking.
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
                    className="p-6 rounded-2xl bg-background border border-border hover:border-yellow-500/50 transition-all hover:shadow-lg hover:shadow-yellow-500/10 h-full"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                        <resource.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <span className="text-xs text-yellow-500 font-medium">
                          {resource.pillar}
                        </span>
                        <h3 className="font-semibold mb-2">{resource.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          {resource.description}
                        </p>
                        <span className="text-yellow-500 text-sm flex items-center gap-1">
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
                Ready to Automate Your{" "}
                <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  Deal Tracking?
                </span>
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Start your free trial and experience the power of automated deal
                tracking. Set up your pipeline in minutes and let LeadFlow handle
                the rest.
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
