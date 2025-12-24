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
  Gauge,
  TrendingUp,
  Target,
  Zap,
  ArrowRight,
  CheckCircle2,
  Clock,
  DollarSign,
  BarChart3,
  Layers,
  LineChart,
  Settings
} from "lucide-react";

const relatedContent = [
  {
    title: "Deal Velocity Metrics",
    description: "Learn how to measure and optimize the speed at which deals move through your sales pipeline.",
    href: "/resources/pipeline-management/deal-velocity",
    pillar: "Pipeline Management",
    icon: Gauge,
    gradient: "from-cyan-500 to-teal-500"
  },
  {
    title: "Sales Forecasting",
    description: "Master accurate sales forecasting using velocity data and pipeline analytics.",
    href: "/resources/pipeline-management/sales-forecasting",
    pillar: "Pipeline Management",
    icon: LineChart,
    gradient: "from-teal-500 to-cyan-500"
  },
  {
    title: "Deal Tracking Best Practices",
    description: "Implement effective deal tracking strategies to monitor and accelerate every opportunity.",
    href: "/resources/crm-best-practices/deal-tracking",
    pillar: "CRM Best Practices",
    icon: Target,
    gradient: "from-cyan-500 to-blue-500"
  },
  {
    title: "Pipeline Setup Guide",
    description: "Configure your pipeline stages to maximize deal velocity and conversion rates.",
    href: "/resources/crm-best-practices/pipeline-setup",
    pillar: "CRM Best Practices",
    icon: Settings,
    gradient: "from-blue-500 to-cyan-500"
  }
];

const relatedTopics = [
  { title: "Instagram Lead Nurturing", href: "/resources/topics/instagram-lead-nurturing" },
  { title: "Contact Activity Insights", href: "/resources/topics/contact-activity-insights" },
  { title: "Lead Handoff Automation", href: "/resources/topics/lead-handoff-automation" },
  { title: "Predictive Lead Scoring", href: "/resources/topics/predictive-lead-scoring" }
];

export default function DealVelocityOptimizationPage() {
  return (
    <div className="min-h-screen bg-background">
      <head>
        <meta name="robots" content="noindex, follow" />
      </head>
      <LandingHeader />

        <main>
          {/* Hero Section */}
          <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden pt-20">
            {/* Background Effects - Cyan Theme */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-background to-background" />
              <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/30 rounded-full blur-[128px] animate-pulse" />
              <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-teal-500/20 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: "1s" }} />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center max-w-4xl mx-auto"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                >
                  <Gauge className="w-4 h-4 mr-2" />
                  Pipeline Management + CRM Best Practices
                </motion.div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
                  Deal Velocity Optimization: <span className="bg-gradient-to-r from-cyan-500 via-teal-500 to-blue-500 bg-clip-text text-transparent">Close Deals Faster</span>
                </h1>

                <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                  Accelerate your sales cycle by combining pipeline management insights with CRM
                  best practices. Learn to identify bottlenecks, optimize stages, and predict
                  revenue with precision.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href="/handler/sign-up">
                    <GlowButton size="lg" className="group">
                      Accelerate Your Pipeline
                      <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </GlowButton>
                  </Link>
                  <Link
                    href="/resources/pipeline-management/deal-velocity"
                    className="inline-flex items-center gap-2 px-6 py-3 text-base font-medium rounded-full border border-border hover:bg-accent transition-colors"
                  >
                    Learn About Deal Velocity
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Introduction Section */}
          <section className="py-20 lg:py-32">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
                    Understanding <span className="bg-gradient-to-r from-cyan-500 to-teal-500 bg-clip-text text-transparent">Deal Velocity</span>
                  </h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      Deal velocity is the heartbeat of your sales operation. It measures how quickly
                      deals progress through your pipeline, from initial contact to closed-won. When
                      you understand and optimize your deal velocity, you gain the ability to predict
                      revenue accurately and identify exactly where opportunities are stalling.
                    </p>
                    <p>
                      By combining sophisticated pipeline analytics with proven CRM best practices,
                      you create a systematic approach to accelerating deals. This isn&apos;t about rushing
                      prospects through your funnel, it&apos;s about removing friction, optimizing each
                      stage, and ensuring every deal gets the attention it needs at the right time.
                    </p>
                    <p>
                      LeadFlow provides real-time velocity metrics and stage-by-stage analysis,
                      helping you understand exactly where deals slow down and what actions
                      accelerate them toward closure.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="relative"
                >
                  <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 via-teal-500/20 to-blue-500/20 rounded-3xl blur-2xl opacity-60" />
                  <div className="relative rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl overflow-hidden p-6">
                    <h4 className="font-semibold mb-4 text-center">Deal Velocity Dashboard</h4>
                    <div className="space-y-4">
                      {[
                        { stage: "Discovery", days: 3.2, optimal: 3, status: "On Track", color: "bg-green-500" },
                        { stage: "Qualification", days: 5.8, optimal: 4, status: "Needs Attention", color: "bg-yellow-500" },
                        { stage: "Proposal", days: 4.1, optimal: 5, status: "Ahead", color: "bg-cyan-500" },
                        { stage: "Negotiation", days: 7.3, optimal: 5, status: "Bottleneck", color: "bg-red-500" }
                      ].map((item, index) => (
                        <motion.div
                          key={item.stage}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="p-4 rounded-xl bg-muted/30 border border-border/50"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">{item.stage}</span>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              item.status === 'On Track' ? 'bg-green-500/20 text-green-400' :
                              item.status === 'Ahead' ? 'bg-cyan-500/20 text-cyan-400' :
                              item.status === 'Needs Attention' ? 'bg-yellow-500/20 text-yellow-400' :
                              'bg-red-500/20 text-red-400'
                            }`}>
                              {item.status}
                            </span>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                              <div
                                className={`h-full ${item.color} rounded-full transition-all`}
                                style={{ width: `${Math.min((item.optimal / item.days) * 100, 100)}%` }}
                              />
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {item.days}d avg / {item.optimal}d target
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Key Benefits */}
          <section className="py-20 lg:py-32 bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <SectionHeading
                badge="Cross-Pillar Benefits"
                title="Why Velocity Optimization Matters"
                titleGradient="Velocity Optimization"
                description="Combining pipeline analytics with CRM best practices creates a data-driven approach to faster deal closure."
              />

              <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    icon: Clock,
                    title: "Shorter Sales Cycles",
                    description: "Identify and eliminate bottlenecks to reduce average deal time by up to 30%."
                  },
                  {
                    icon: DollarSign,
                    title: "Predictable Revenue",
                    description: "Accurate velocity data enables precise forecasting and better resource allocation."
                  },
                  {
                    icon: BarChart3,
                    title: "Stage-Level Insights",
                    description: "Understand exactly where deals stall and what actions accelerate them."
                  },
                  {
                    icon: TrendingUp,
                    title: "Higher Win Rates",
                    description: "Optimized stages and timely interventions lead to more closed-won deals."
                  },
                  {
                    icon: Layers,
                    title: "Pipeline Health Visibility",
                    description: "Real-time dashboards show pipeline health across all stages and reps."
                  },
                  {
                    icon: Zap,
                    title: "Automated Alerts",
                    description: "Get notified when deals stall or exceed stage time thresholds."
                  }
                ].map((benefit, index) => (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="p-6 rounded-2xl bg-card border border-border hover:border-cyan-500/50 transition-all hover:shadow-lg hover:shadow-cyan-500/10"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-teal-500/20 flex items-center justify-center mb-4">
                      <benefit.icon className="w-6 h-6 text-cyan-500" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Related Content Grid */}
          <section className="py-20 lg:py-32">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <SectionHeading
                badge="Deep Dive Resources"
                title="Explore Related Content"
                description="Master deal velocity optimization with our comprehensive guides from multiple pillars."
              />

              <div className="mt-12 grid md:grid-cols-2 gap-6">
                {relatedContent.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className="block p-6 rounded-2xl bg-card border border-border hover:border-cyan-500/50 transition-all hover:shadow-lg hover:shadow-cyan-500/10 h-full group"
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center flex-shrink-0`}>
                          <item.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <span className="text-xs font-medium text-cyan-500 uppercase tracking-wider">{item.pillar}</span>
                          <h3 className="text-lg font-semibold mt-1 mb-2 group-hover:text-cyan-500 transition-colors">{item.title}</h3>
                          <p className="text-muted-foreground text-sm mb-4">{item.description}</p>
                          <span className="text-cyan-500 text-sm font-medium inline-flex items-center">
                            Read more <ArrowRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Related Topics */}
          <section className="py-20 lg:py-32 bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <SectionHeading
                badge="Related Topics"
                title="Explore More Crossover Topics"
                description="Discover other powerful combinations of LeadFlow features to optimize your sales process."
              />

              <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
                      className="block p-4 rounded-xl bg-card border border-border hover:border-cyan-500/50 transition-all text-center group"
                    >
                      <h3 className="font-medium group-hover:text-cyan-500 transition-colors">{topic.title}</h3>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 lg:py-32">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center max-w-3xl mx-auto"
              >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
                  Ready to Accelerate Your <span className="bg-gradient-to-r from-cyan-500 to-teal-500 bg-clip-text text-transparent">Deal Velocity</span>?
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Start optimizing your pipeline today with LeadFlow&apos;s velocity analytics and
                  CRM best practices. See exactly where deals are stalling and take action to
                  close them faster.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href="/handler/sign-up">
                    <GlowButton size="lg" className="group">
                      Start Your Free Trial
                      <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </GlowButton>
                  </Link>
                  <Link
                    href="/resources"
                    className="inline-flex items-center gap-2 px-6 py-3 text-base font-medium rounded-full border border-border hover:bg-accent transition-colors"
                  >
                    Browse All Resources
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>
        </main>

      <LandingFooter />
    </div>
  );
}
