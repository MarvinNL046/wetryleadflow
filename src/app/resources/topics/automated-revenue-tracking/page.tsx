"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  LandingHeader,
  LandingFooter,
  GlowButton,
  GradientText,
} from "@/components/landing";
import {
  ArrowRight,
  Mail,
  Calendar,
  DollarSign,
  FileBarChart,
  CheckCircle,
  Sparkles,
  Zap,
  TrendingUp,
  Clock,
} from "lucide-react";

export default function AutomatedRevenueTrackingPage() {
  const linkedResources = [
    {
      title: "Email Sequences",
      description:
        "Automate your follow-up communication with intelligent email sequences that nurture leads to conversion.",
      href: "/resources/sales-automation/email-sequences",
      pillar: "Sales Automation",
      icon: Mail,
    },
    {
      title: "Appointment Scheduling",
      description:
        "Streamline meeting booking with automated scheduling that syncs with your calendar and eliminates back-and-forth.",
      href: "/resources/sales-automation/appointment-scheduling",
      pillar: "Sales Automation",
      icon: Calendar,
    },
    {
      title: "Revenue Tracking",
      description:
        "Monitor revenue in real-time with comprehensive tracking that gives you complete visibility into your sales performance.",
      href: "/resources/sales-analytics/revenue-tracking",
      pillar: "Sales Analytics",
      icon: DollarSign,
    },
    {
      title: "Sales Reporting",
      description:
        "Generate actionable insights with automated reports that keep stakeholders informed and decisions data-driven.",
      href: "/resources/sales-analytics/sales-reporting",
      pillar: "Sales Analytics",
      icon: FileBarChart,
    },
  ];

  const relatedTopics = [
    {
      title: "CRM Customization Guide",
      href: "/resources/topics/crm-customization-guide",
    },
    {
      title: "AI Contact Management",
      href: "/resources/topics/ai-contact-management",
    },
    {
      title: "Industry CRM Solutions",
      href: "/resources/topics/industry-crm-solutions",
    },
  ];

  return (
    <>
      <head>
        <meta name="robots" content="noindex, follow" />
      </head>
      <div className="min-h-screen bg-background text-foreground">
        <LandingHeader />

        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-amber-500/10" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl" />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <span className="inline-flex items-center px-3 py-1 mb-6 text-sm font-medium rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20">
                <TrendingUp className="w-4 h-4 mr-2" />
                Topic Hub
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                <GradientText>Automated Revenue</GradientText> Tracking
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Connect sales automation with analytics to build a revenue
                engine that runs itself. Automate follow-ups, scheduling, and
                reporting while tracking every dollar through your pipeline.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/handler/sign-up">
                  <GlowButton size="lg">
                    Automate Your Revenue Tracking
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </GlowButton>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Overview Section */}
        <section className="py-20 border-t border-border/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto"
            >
              <div className="text-center mb-12">
                <span className="inline-flex items-center px-3 py-1 mb-4 text-sm font-medium rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20">
                  Overview
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  The Revenue Automation Advantage
                </h2>
              </div>

              <div className="prose prose-invert max-w-none">
                <p className="text-lg text-muted-foreground mb-6">
                  Revenue does not track itself, but it should. When sales
                  automation and analytics work together, you create a system
                  where every interaction is logged, every deal is tracked, and
                  every metric is updated automatically. Your team focuses on
                  selling while the system handles everything else.
                </p>
                <p className="text-lg text-muted-foreground mb-6">
                  Automated email sequences nurture leads without manual
                  intervention. Scheduling automation eliminates the friction
                  between interest and meeting. Revenue tracking captures every
                  dollar in real-time. Sales reporting delivers insights
                  automatically to the people who need them.
                </p>
                <p className="text-lg text-muted-foreground">
                  This hub brings together resources from sales automation and
                  sales analytics to show you how to build an integrated
                  revenue tracking system that operates continuously and
                  accurately.
                </p>
              </div>

              <div className="mt-12 grid sm:grid-cols-3 gap-6">
                {[
                  {
                    stat: "40%",
                    label: "Less time on admin tasks",
                    color: "from-orange-500/10 to-amber-500/10",
                  },
                  {
                    stat: "99%",
                    label: "Revenue tracking accuracy",
                    color: "from-amber-500/10 to-orange-500/10",
                  },
                  {
                    stat: "2x",
                    label: "Faster sales cycle",
                    color: "from-orange-500/10 to-red-500/10",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`text-center p-6 bg-gradient-to-br ${item.color} rounded-xl border border-border`}
                  >
                    <div className="text-3xl font-bold text-orange-400 mb-2">
                      {item.stat}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {item.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Linked Resources Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="inline-flex items-center px-3 py-1 mb-4 text-sm font-medium rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20">
                Deep Dive Resources
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Explore Related Guides
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Master automated revenue tracking with these comprehensive
                guides covering sales automation and analytics.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {linkedResources.map((resource, index) => (
                <motion.div
                  key={resource.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link
                    href={resource.href}
                    className="block h-full p-6 bg-background/50 backdrop-blur-sm border border-border rounded-2xl hover:border-orange-500/50 transition-all hover:shadow-lg hover:shadow-orange-500/10"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center flex-shrink-0">
                        <resource.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <span className="text-xs font-medium text-orange-400 mb-1 block">
                          {resource.pillar}
                        </span>
                        <h3 className="text-xl font-semibold mb-2">
                          {resource.title}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-4">
                          {resource.description}
                        </p>
                        <span className="text-orange-400 text-sm font-medium inline-flex items-center">
                          Read guide <ArrowRight className="ml-1 w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Building the System */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="inline-flex items-center px-3 py-1 mb-4 text-sm font-medium rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20">
                Implementation
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Building Your Revenue Automation System
              </h2>
            </div>

            <div className="max-w-4xl mx-auto space-y-6">
              {[
                {
                  title: "Automate the Follow-Up",
                  content:
                    "Configure email sequences that automatically nurture leads based on their behavior and stage. Every lead gets consistent follow-up without manual tracking or forgotten tasks.",
                },
                {
                  title: "Remove Scheduling Friction",
                  content:
                    "When a lead is ready to meet, automated scheduling eliminates the back-and-forth. Calendar integration ensures meetings book instantly when interest is highest.",
                },
                {
                  title: "Track Revenue in Real-Time",
                  content:
                    "Every deal update, stage change, and close automatically reflects in your revenue metrics. No more end-of-month scrambles to reconcile numbers.",
                },
                {
                  title: "Deliver Insights Automatically",
                  content:
                    "Scheduled reports arrive in stakeholder inboxes without manual creation. Dashboards update in real-time so decisions are always based on current data.",
                },
              ].map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex gap-4 p-6 bg-background border border-border rounded-xl"
                >
                  <div className="flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground">{step.content}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Key Benefits */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="inline-flex items-center px-3 py-1 mb-4 text-sm font-medium rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20">
                <Zap className="w-4 h-4 mr-2" />
                Key Benefits
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Why Integrate Automation and Analytics
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                The combination creates compounding advantages for your sales
                organization.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                {
                  icon: Clock,
                  title: "Time Savings",
                  description:
                    "Automation handles repetitive tasks while analytics run in the background. Your team spends time selling, not doing admin work.",
                },
                {
                  icon: DollarSign,
                  title: "Revenue Accuracy",
                  description:
                    "When tracking is automatic, data is always current and accurate. No more discrepancies between systems or manual entry errors.",
                },
                {
                  icon: TrendingUp,
                  title: "Performance Visibility",
                  description:
                    "Real-time dashboards show exactly where revenue stands. Spot trends, identify issues, and make adjustments quickly.",
                },
              ].map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center p-6 bg-background border border-border rounded-xl"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500/20 to-amber-500/20 flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-6 h-6 text-orange-400" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Related Topics */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="inline-flex items-center px-3 py-1 mb-4 text-sm font-medium rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20">
                Explore More
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Related Topics
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Continue learning with these related topic hubs.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {relatedTopics.map((topic, index) => (
                <motion.div
                  key={topic.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link
                    href={topic.href}
                    className="block p-4 bg-background border border-border rounded-xl hover:border-orange-500/50 transition-colors text-center"
                  >
                    <span className="text-foreground font-medium hover:text-orange-400 transition-colors">
                      {topic.title}
                    </span>
                    <ArrowRight className="w-4 h-4 text-muted-foreground mt-2 mx-auto" />
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
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500/20 to-amber-500/20 border border-orange-500/30 mb-6">
                <Sparkles className="w-8 h-8 text-orange-400" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to <GradientText>Automate</GradientText> Your Revenue
                Tracking?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                LeadFlow combines powerful sales automation with comprehensive
                analytics. Build a revenue engine that tracks every dollar
                automatically while your team focuses on closing deals.
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
    </>
  );
}
