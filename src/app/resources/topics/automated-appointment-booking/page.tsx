"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Calendar,
  Zap,
  Users,
  MessageSquare,
  ArrowRight,
  CheckCircle2,
  Clock,
  RefreshCw,
  Bell,
  Handshake,
  Target,
  UserCheck,
} from "lucide-react";
import {
  LandingHeader,
  LandingFooter,
  GlowButton,
  GradientText,
  SectionHeading,
} from "@/components/landing";

export default function AutomatedAppointmentBookingPage() {
  const linkedTopics = [
    {
      title: "Appointment Scheduling",
      description: "Streamline your booking process with automated scheduling that syncs with your calendar.",
      href: "/resources/sales-automation/appointment-scheduling",
      icon: Calendar,
      pillar: "Sales Automation",
    },
    {
      title: "Task Automation",
      description: "Automate repetitive tasks around appointment management and follow-up workflows.",
      href: "/resources/sales-automation/task-automation",
      icon: Zap,
      pillar: "Sales Automation",
    },
    {
      title: "Lead Handoffs",
      description: "Ensure smooth transitions when passing appointments and leads between team members.",
      href: "/resources/team-collaboration/lead-handoffs",
      icon: Handshake,
      pillar: "Team Collaboration",
    },
    {
      title: "Team Communication",
      description: "Keep your team aligned with notifications and updates about scheduled appointments.",
      href: "/resources/team-collaboration/team-communication",
      icon: MessageSquare,
      pillar: "Team Collaboration",
    },
  ];

  const relatedTopics = [
    {
      title: "Follow-up Automation",
      href: "/resources/sales-automation/follow-up-automation",
    },
    {
      title: "Smart Notifications",
      href: "/resources/sales-automation/smart-notifications",
    },
    {
      title: "Team Features",
      href: "/resources/team-collaboration/team-features",
    },
    {
      title: "Role Management",
      href: "/resources/team-collaboration/role-management",
    },
  ];

  const benefits = [
    {
      icon: Clock,
      title: "24/7 Booking",
      description: "Let prospects book appointments anytime, even outside business hours, maximizing conversion opportunities.",
    },
    {
      icon: RefreshCw,
      title: "Automatic Reminders",
      description: "Reduce no-shows with automated email and SMS reminders sent at optimal times before appointments.",
    },
    {
      icon: Users,
      title: "Team Coordination",
      description: "Automatically route appointments to the right team member based on expertise, availability, or territory.",
    },
    {
      icon: Bell,
      title: "Instant Notifications",
      description: "Get real-time alerts when appointments are booked, rescheduled, or cancelled.",
    },
  ];

  const automationWorkflows = [
    {
      trigger: "Lead submits form",
      actions: [
        "Send booking link via email",
        "Create task for follow-up if not booked in 24h",
        "Notify sales rep of new lead",
      ],
    },
    {
      trigger: "Appointment booked",
      actions: [
        "Add to CRM and update lead status",
        "Send confirmation to prospect and rep",
        "Create pre-meeting prep task",
        "Schedule reminder sequence",
      ],
    },
    {
      trigger: "24 hours before meeting",
      actions: [
        "Send reminder to prospect",
        "Alert sales rep with lead details",
        "Prepare meeting notes template",
      ],
    },
    {
      trigger: "Appointment completed",
      actions: [
        "Log meeting in CRM",
        "Create follow-up task",
        "Update pipeline stage",
        "Send thank you email",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
        <LandingHeader />

        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          {/* Background Effects - Yellow Gradient */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-400/20 rounded-full blur-3xl" />
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <div className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium rounded-full bg-yellow-500/10 text-yellow-500 border border-yellow-500/20">
                <Calendar className="w-4 h-4 mr-2" />
                Crossover Topic
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                <GradientText className="bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600 bg-clip-text text-transparent">Automated Appointment</GradientText> Booking Systems
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Combine powerful scheduling automation with seamless team collaboration
                to book more meetings and convert more leads without the back-and-forth.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/handler/sign-up">
                  <GlowButton size="lg">
                    Start Booking Smarter
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </GlowButton>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Why This Matters Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Why It Matters"
              title="The Cost of Manual Scheduling"
              titleGradient="Manual Scheduling"
              description="Manual appointment booking creates friction, wastes time, and costs you opportunities."
            />

            <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 rounded-2xl bg-background border border-border hover:border-yellow-500/50 transition-all hover:shadow-lg hover:shadow-yellow-500/10"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-amber-500 flex items-center justify-center mb-4">
                    <benefit.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Linked Topics Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Explore Topics"
              title="Essential Resources for Booking Success"
              titleGradient="Booking Success"
              description="Master these interconnected topics to build a fully automated appointment system."
            />

            <div className="mt-16 grid md:grid-cols-2 gap-8">
              {linkedTopics.map((topic, index) => (
                <Link key={index} href={topic.href}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group p-8 rounded-2xl bg-muted/50 border border-border hover:border-yellow-500/50 transition-all hover:shadow-lg hover:shadow-yellow-500/10 h-full"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-yellow-500 to-amber-500 flex items-center justify-center flex-shrink-0">
                        <topic.icon className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <span className="text-xs font-medium text-yellow-500 uppercase tracking-wider">
                          {topic.pillar}
                        </span>
                        <h3 className="text-xl font-bold mt-1 mb-2 group-hover:text-yellow-500 transition-colors">
                          {topic.title}
                        </h3>
                        <p className="text-muted-foreground mb-4">{topic.description}</p>
                        <span className="text-yellow-500 text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                          Read more <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Automation Workflows Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Automation Workflows"
              title="End-to-End Booking Automation"
              titleGradient="Booking Automation"
              description="See how automated workflows handle the entire appointment lifecycle."
            />

            <div className="mt-16 space-y-6">
              {automationWorkflows.map((workflow, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 rounded-2xl bg-background border border-border hover:border-yellow-500/50 transition-colors"
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    <div className="md:w-1/3">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-500 to-amber-500 flex items-center justify-center">
                          <Zap className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xs font-medium text-yellow-500 uppercase tracking-wider">
                          Trigger
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold">{workflow.trigger}</h3>
                    </div>
                    <div className="md:w-2/3">
                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3 block">
                        Automated Actions
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {workflow.actions.map((action, idx) => (
                          <span
                            key={idx}
                            className="text-sm px-3 py-2 rounded-lg bg-yellow-500/10 text-foreground border border-yellow-500/20 flex items-center gap-2"
                          >
                            <CheckCircle2 className="w-4 h-4 text-yellow-500" />
                            {action}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Best Practices Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Best Practices"
              title="Maximize Your Booking Success"
              titleGradient="Booking Success"
              description="Implement these strategies to get the most out of your automated scheduling."
            />

            <div className="mt-16 grid md:grid-cols-2 gap-6">
              {[
                {
                  title: "Minimize Friction in the Booking Process",
                  description: "Reduce the steps required to book. Embed scheduling links directly in emails, landing pages, and chat conversations for one-click booking.",
                },
                {
                  title: "Set Smart Availability Windows",
                  description: "Configure buffer times between meetings, limit daily appointments to prevent burnout, and block focus time to maintain productivity.",
                },
                {
                  title: "Personalize Based on Lead Type",
                  description: "Route different lead types to appropriate meeting lengths and team members. Hot leads get immediate access, while nurturing leads get longer slots.",
                },
                {
                  title: "Measure and Optimize Continuously",
                  description: "Track booking rates, show rates, and conversion rates by source. Use data to refine your scheduling pages and reminder sequences.",
                },
              ].map((practice, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex gap-4 p-6 rounded-2xl bg-muted/50 border border-border"
                >
                  <div className="flex-shrink-0">
                    <CheckCircle2 className="w-6 h-6 text-yellow-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{practice.title}</h3>
                    <p className="text-muted-foreground">{practice.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Related Topics Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Related Topics"
              title="Continue Learning About Automation"
              titleGradient="Automation"
              description="Explore these related resources to further enhance your workflow automation."
            />

            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedTopics.map((topic, index) => (
                <Link key={index} href={topic.href}>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="p-4 rounded-xl bg-background border border-border hover:border-yellow-500/50 transition-all text-center"
                  >
                    <span className="text-sm font-medium hover:text-yellow-500 transition-colors">
                      {topic.title}
                    </span>
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
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-500 to-amber-500 flex items-center justify-center mx-auto mb-6">
                <UserCheck className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Automate Your{" "}
                <GradientText className="bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600 bg-clip-text text-transparent">Appointment Booking?</GradientText>
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Join thousands of sales teams using LeadFlow to automate scheduling,
                reduce no-shows, and book more meetings. Start your free trial today.
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

        <LandingFooter />
    </div>
  );
}
