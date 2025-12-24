"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Calendar,
  Zap,
  Target,
  Clock,
  TrendingUp,
  Users,
  Globe,
  CheckCircle2,
  ArrowRight,
  Video,
  MapPin,
  Shield,
  Smartphone,
  RefreshCw,
  CalendarCheck,
} from "lucide-react";
import {
  LandingHeader,
  LandingFooter,
  GlowButton,
  GradientText,
  SectionHeading,
} from "@/components/landing";

export default function AppointmentSchedulingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <LandingHeader />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-green-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
              <Calendar className="w-4 h-4 mr-2" />
              Sales Automation
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Automated Appointment Scheduling:{" "}
              <GradientText>Book More Meetings</GradientText>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Eliminate the back-and-forth of meeting scheduling. Let prospects book
              directly on your calendar, reduce no-shows with automated reminders,
              and never double-book again with intelligent calendar management.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/handler/sign-up">
                <GlowButton size="lg">
                  Start Scheduling Smarter
                  <ArrowRight className="w-5 h-5 ml-2" />
                </GlowButton>
              </Link>
              <Link
                href="/resources/sales-automation/task-automation"
                className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
              >
                Explore task automation
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* The Scheduling Problem Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="The Challenge"
            title="The True Cost of Manual Scheduling"
            titleGradient="True Cost"
            description="Understanding why traditional meeting scheduling fails modern sales teams."
          />

          <div className="mt-16 grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold mb-4">
                Death by Email Tennis
              </h3>
              <p className="text-muted-foreground mb-6">
                The average meeting takes 8 emails to schedule. Eight messages of
                &quot;How about Tuesday at 2?&quot; followed by &quot;That doesn&apos;t work, what about
                Thursday?&quot; This seemingly simple administrative task consumes hours
                of productive time each week and creates friction that can cause
                interested prospects to disengage entirely.
              </p>
              <p className="text-muted-foreground mb-6">
                The problem compounds when you factor in timezone confusion,
                calendar conflicts, and the inevitable rescheduling. Sales teams
                report spending up to 17% of their work week just coordinating
                meeting times, a staggering waste of selling time that automated
                scheduling completely eliminates.
              </p>
              <p className="text-muted-foreground">
                Beyond time waste, manual scheduling creates a poor prospect experience.
                In an era of instant gratification, making someone wait days to book
                a simple meeting signals disorganization and can damage your brand
                before the first conversation even begins.
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
                { icon: Clock, label: "Time to Schedule", value: "8 emails avg", problem: true },
                { icon: Users, label: "No-Show Rate", value: "23% without reminders", problem: true },
                { icon: Calendar, label: "Scheduling Time", value: "17% of work week", problem: true },
                { icon: TrendingUp, label: "Lead Drop-Off", value: "35% due to friction", problem: true },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="p-6 rounded-2xl bg-background border border-border"
                >
                  <stat.icon className="w-8 h-8 text-red-500 mb-3" />
                  <div className="font-semibold mb-1">{stat.label}</div>
                  <div className="text-sm text-muted-foreground">{stat.value}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* How Automated Scheduling Works Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="The Solution"
            title="How Automated Scheduling Transforms Your Process"
            titleGradient="Transforms"
            description="A seamless booking experience that converts more prospects into meetings."
          />

          <div className="mt-16 grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Globe,
                title: "Self-Service Booking",
                description:
                  "Share your scheduling link via email, website, or signature, and let prospects choose from your real-time availability. They see only the times that work for you, select their preferred slot, and receive instant confirmation. No back-and-forth required.",
                features: [
                  "Real-time availability display",
                  "Instant booking confirmation",
                  "Custom booking pages",
                  "Embedded website widgets",
                ],
              },
              {
                icon: RefreshCw,
                title: "Intelligent Calendar Sync",
                description:
                  "LeadFlow connects with Google Calendar, Outlook, and iCal to prevent double-booking automatically. When you book a personal appointment, your scheduling availability updates instantly. Your professional and personal calendars work together seamlessly.",
                features: [
                  "Multi-calendar sync",
                  "Buffer time between meetings",
                  "Working hours enforcement",
                  "Conflict prevention",
                ],
              },
              {
                icon: Video,
                title: "Meeting Type Flexibility",
                description:
                  "Create different meeting types for different purposes: 15-minute discovery calls, 30-minute demos, 60-minute strategy sessions. Each type can have its own duration, questions, and video conferencing integration. Prospects choose what fits their needs.",
                features: [
                  "Custom meeting durations",
                  "Zoom/Meet/Teams integration",
                  "Pre-meeting questions",
                  "Location flexibility",
                ],
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-8 rounded-2xl bg-muted/50 border border-border hover:border-purple-500/50 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-purple-500 flex items-center justify-center mb-6">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground mb-6">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.features.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reducing No-Shows Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="No-Show Prevention"
            title="Reduce No-Shows by Up to 80%"
            titleGradient="80%"
            description="Automated reminders and confirmations that ensure prospects actually show up."
          />

          <div className="mt-16 space-y-8">
            {[
              {
                number: "01",
                title: "Instant Confirmation Emails",
                content:
                  "The moment a prospect books, they receive a professional confirmation email with all meeting details, calendar invite attachment, and any pre-meeting preparation materials. This immediate acknowledgment reinforces their commitment and provides everything they need to prepare for a productive conversation.",
              },
              {
                number: "02",
                title: "Strategic Reminder Sequences",
                content:
                  "One reminder isn't enough. LeadFlow sends a sequence of reminders at optimal intervals: 24 hours before, 1 hour before, and 10 minutes before the meeting. Each reminder can be customized with different messaging, from professional context-setting to friendly last-minute nudges. These touchpoints dramatically reduce no-shows.",
              },
              {
                number: "03",
                title: "Easy Rescheduling Options",
                content:
                  "Life happens, and sometimes people need to reschedule. Every reminder includes a one-click rescheduling option that lets prospects move their meeting to a new time without canceling entirely. This flexibility prevents cancellations and keeps prospects engaged even when their original time doesn't work out.",
              },
              {
                number: "04",
                title: "SMS Reminders for Critical Meetings",
                content:
                  "For high-value meetings, email reminders may not be enough. LeadFlow's SMS reminder option cuts through inbox clutter with a direct text message reminder. Studies show SMS reminders have a 98% read rate compared to 20% for email, making them invaluable for important prospect meetings.",
              },
              {
                number: "05",
                title: "No-Show Follow-Up Automation",
                content:
                  "When someone does miss a meeting, LeadFlow automatically triggers a follow-up sequence. A professional, understanding message goes out within minutes, offering easy rescheduling options. This turns a potential lost opportunity into a recovered meeting, maintaining the relationship despite the initial no-show.",
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
                <div className="text-4xl font-bold text-green-500/30">
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

      {/* Advanced Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Advanced Features"
            title="Enterprise Scheduling Capabilities"
            titleGradient="Enterprise"
            description="Sophisticated features for teams that demand more from their scheduling tools."
          />

          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Users,
                title: "Round-Robin Scheduling",
                description:
                  "Automatically distribute meetings across your team based on availability, workload, or custom rules.",
              },
              {
                icon: MapPin,
                title: "Timezone Intelligence",
                description:
                  "Automatically detect and convert timezones so international prospects always see correct local times.",
              },
              {
                icon: Shield,
                title: "Booking Rules & Limits",
                description:
                  "Set minimum notice periods, maximum meetings per day, and custom availability windows.",
              },
              {
                icon: Smartphone,
                title: "Mobile-Optimized Booking",
                description:
                  "Beautiful booking pages that work perfectly on any device for on-the-go prospects.",
              },
              {
                icon: CalendarCheck,
                title: "Collective Scheduling",
                description:
                  "Find times that work for multiple team members simultaneously for panel interviews or group demos.",
              },
              {
                icon: Zap,
                title: "CRM Auto-Sync",
                description:
                  "Every booked meeting automatically creates activities and updates in your CRM.",
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

      {/* Use Cases Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Use Cases"
            title="Scheduling Automation in Action"
            titleGradient="Action"
            description="How different teams leverage automated scheduling to drive results."
          />

          <div className="mt-16 grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Sales Development Teams",
                description:
                  "SDRs include scheduling links in outbound sequences, allowing interested prospects to immediately book discovery calls. This eliminates the delay between interest and conversation, capitalizing on prospect momentum. Teams using embedded scheduling report 40% higher meeting book rates compared to traditional scheduling methods.",
                metrics: ["40% more meetings booked", "2-day faster time-to-meeting", "60% less scheduling emails"],
              },
              {
                title: "Account Executives",
                description:
                  "AEs create multiple meeting types for different sales stages: short intro calls, longer product demos, and strategic planning sessions. Prospects can book the appropriate meeting type based on their needs, and automatic CRM sync ensures every interaction is tracked. This streamlined process accelerates deal velocity.",
                metrics: ["35% shorter sales cycles", "50% reduction in admin time", "25% higher close rates"],
              },
              {
                title: "Customer Success Teams",
                description:
                  "CS teams use scheduling automation for quarterly business reviews, onboarding sessions, and support escalations. Customers can self-serve their meeting needs without waiting for email responses, improving satisfaction and reducing support burden. Automated preparation questions ensure every meeting is productive.",
                metrics: ["90% customer satisfaction", "45% fewer support tickets", "3x faster issue resolution"],
              },
              {
                title: "Recruiting Teams",
                description:
                  "Recruiters streamline candidate scheduling for phone screens, technical interviews, and panel discussions. Candidates appreciate the professional, friction-free experience, and recruiters save hours of coordination time. Collective scheduling makes multi-person interviews effortless to arrange.",
                metrics: ["65% faster time-to-hire", "80% reduction in scheduling emails", "95% candidate satisfaction"],
              },
            ].map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-8 rounded-2xl bg-background border border-border"
              >
                <h3 className="text-xl font-bold mb-4">{useCase.title}</h3>
                <p className="text-muted-foreground mb-6">{useCase.description}</p>
                <div className="flex flex-wrap gap-3">
                  {useCase.metrics.map((metric, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-sm"
                    >
                      {metric}
                    </span>
                  ))}
                </div>
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
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to{" "}
              <GradientText>Book More Meetings?</GradientText>
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of sales professionals who have eliminated scheduling
              friction and increased their meeting rates with LeadFlow&apos;s intelligent
              appointment scheduling.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/handler/sign-up">
                <GlowButton size="lg">
                  Start Scheduling Smarter
                  <ArrowRight className="w-5 h-5 ml-2" />
                </GlowButton>
              </Link>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              Free 14-day trial. Set up in under 5 minutes. No credit card required.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Related Resources */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Related Resources"
            title="More Sales Automation Guides"
            titleGradient="Guides"
            description="Continue learning about automation strategies that drive sales success."
          />

          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Email Sequences",
                description: "Build automated email campaigns that convert prospects",
                href: "/resources/sales-automation/email-sequences",
              },
              {
                title: "Follow-Up Automation",
                description: "Never miss a lead with automated follow-up systems",
                href: "/resources/sales-automation/follow-up-automation",
              },
              {
                title: "Task Automation",
                description: "Eliminate repetitive tasks and reclaim selling time",
                href: "/resources/sales-automation/task-automation",
              },
              {
                title: "Smart Notifications",
                description: "Get real-time alerts on important lead activities",
                href: "/resources/sales-automation/smart-notifications",
              },
            ].map((resource, index) => (
              <Link key={index} href={resource.href}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 rounded-2xl bg-background border border-border hover:border-purple-500/50 transition-all hover:shadow-lg hover:shadow-purple-500/10 h-full"
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
