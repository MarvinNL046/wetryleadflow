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
  Brain,
  TrendingUp,
  Target,
  Zap,
  ArrowRight,
  CheckCircle2,
  BarChart3,
  LineChart,
  Sparkles,
  DollarSign,
  Cpu,
  PieChart
} from "lucide-react";

const relatedContent = [
  {
    title: "AI Lead Scoring",
    description: "Discover how AI analyzes hundreds of data points to instantly identify your most promising leads.",
    href: "/resources/ai-automation/ai-lead-scoring",
    pillar: "AI & Automation",
    icon: Brain,
    gradient: "from-violet-500 to-purple-500"
  },
  {
    title: "Predictive Analytics",
    description: "Learn how predictive analytics forecasts future outcomes based on historical patterns and trends.",
    href: "/resources/ai-automation/predictive-analytics",
    pillar: "AI & Automation",
    icon: LineChart,
    gradient: "from-purple-500 to-violet-500"
  },
  {
    title: "Conversion Metrics",
    description: "Master the key conversion metrics that reveal which leads are most likely to become customers.",
    href: "/resources/sales-analytics/conversion-metrics",
    pillar: "Sales Analytics",
    icon: TrendingUp,
    gradient: "from-violet-500 to-indigo-500"
  },
  {
    title: "Revenue Tracking",
    description: "Track revenue attribution from lead source to closed deal with comprehensive analytics.",
    href: "/resources/sales-analytics/revenue-tracking",
    pillar: "Sales Analytics",
    icon: DollarSign,
    gradient: "from-indigo-500 to-violet-500"
  }
];

const relatedTopics = [
  { title: "Instagram Lead Nurturing", href: "/resources/topics/instagram-lead-nurturing" },
  { title: "Deal Velocity Optimization", href: "/resources/topics/deal-velocity-optimization" },
  { title: "Contact Activity Insights", href: "/resources/topics/contact-activity-insights" },
  { title: "Lead Handoff Automation", href: "/resources/topics/lead-handoff-automation" }
];

export default function PredictiveLeadScoringPage() {
  return (
    <div className="min-h-screen bg-background">
      <head>
        <meta name="robots" content="noindex, follow" />
      </head>
      <LandingHeader />

        <main>
          {/* Hero Section */}
          <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden pt-20">
            {/* Background Effects - Violet Theme */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-900/20 via-background to-background" />
              <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-violet-500/30 rounded-full blur-[128px] animate-pulse" />
              <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: "1s" }} />
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
                  className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20"
                >
                  <Brain className="w-4 h-4 mr-2" />
                  AI & Automation + Sales Analytics
                </motion.div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
                  Predictive Lead Scoring: <span className="bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">Know Who Will Buy</span>
                </h1>

                <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                  Combine the power of AI-driven lead scoring with comprehensive sales analytics
                  to predict which leads will convert before they do. Focus your efforts on
                  the opportunities that matter most.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href="/handler/sign-up">
                    <GlowButton size="lg" className="group">
                      Start Predicting Conversions
                      <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </GlowButton>
                  </Link>
                  <Link
                    href="/resources/ai-automation/ai-lead-scoring"
                    className="inline-flex items-center gap-2 px-6 py-3 text-base font-medium rounded-full border border-border hover:bg-accent transition-colors"
                  >
                    Learn About AI Scoring
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
                    The Science of <span className="bg-gradient-to-r from-violet-500 to-purple-500 bg-clip-text text-transparent">Predictive Scoring</span>
                  </h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      Traditional lead scoring relies on basic rules and static criteria.
                      Predictive lead scoring takes this to an entirely new level by combining
                      machine learning algorithms with real-time sales analytics to identify
                      patterns that humans simply cannot see.
                    </p>
                    <p>
                      By analyzing historical conversion data, behavioral signals, engagement
                      metrics, and demographic information, AI models learn what your ideal
                      customer looks like and scores every new lead against this profile. When
                      combined with comprehensive sales analytics, you gain not just a score,
                      but deep insights into why a lead is likely to convert.
                    </p>
                    <p>
                      LeadFlow&apos;s predictive scoring engine processes millions of data points
                      to deliver accurate predictions, helping your team focus on leads that
                      are statistically most likely to become customers.
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
                  <div className="absolute -inset-4 bg-gradient-to-r from-violet-500/20 via-purple-500/20 to-indigo-500/20 rounded-3xl blur-2xl opacity-60" />
                  <div className="relative rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl overflow-hidden p-6">
                    <h4 className="font-semibold mb-4 text-center">Predictive Score Breakdown</h4>
                    <div className="space-y-4">
                      {[
                        { factor: "Behavioral Signals", score: 32, max: 35, color: "bg-violet-500" },
                        { factor: "Engagement Level", score: 28, max: 30, color: "bg-purple-500" },
                        { factor: "Firmographic Match", score: 18, max: 20, color: "bg-indigo-500" },
                        { factor: "Intent Indicators", score: 12, max: 15, color: "bg-violet-500" }
                      ].map((item, index) => (
                        <motion.div
                          key={item.factor}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="space-y-2"
                        >
                          <div className="flex justify-between text-sm">
                            <span className="font-medium">{item.factor}</span>
                            <span className="text-muted-foreground">{item.score}/{item.max} pts</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${(item.score / item.max) * 100}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.8, delay: index * 0.1 }}
                              className={`h-full ${item.color} rounded-full`}
                            />
                          </div>
                        </motion.div>
                      ))}
                      <div className="pt-4 border-t border-border/50">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold">Total Predictive Score</span>
                          <div className="flex items-center gap-2">
                            <span className="text-3xl font-bold text-violet-500">90</span>
                            <span className="text-muted-foreground">/100</span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">
                          94% conversion probability based on similar leads
                        </p>
                      </div>
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
                title="The Power of Predictive Intelligence"
                titleGradient="Predictive Intelligence"
                description="Combining AI scoring with sales analytics creates a powerful prediction engine for your sales team."
              />

              <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    icon: Cpu,
                    title: "Machine Learning Precision",
                    description: "AI models continuously learn from your data to deliver increasingly accurate predictions over time."
                  },
                  {
                    icon: BarChart3,
                    title: "Data-Backed Decisions",
                    description: "Every score is backed by comprehensive analytics, so you know exactly why a lead ranks high or low."
                  },
                  {
                    icon: Target,
                    title: "Prioritized Outreach",
                    description: "Focus your team on the leads with highest conversion probability for maximum ROI."
                  },
                  {
                    icon: PieChart,
                    title: "Conversion Attribution",
                    description: "Understand which factors most strongly predict conversion for your specific business."
                  },
                  {
                    icon: Sparkles,
                    title: "Real-Time Updates",
                    description: "Scores update instantly as leads engage, ensuring you always have current intelligence."
                  },
                  {
                    icon: TrendingUp,
                    title: "Revenue Forecasting",
                    description: "Use predictive scores to build accurate revenue forecasts based on pipeline probability."
                  }
                ].map((benefit, index) => (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="p-6 rounded-2xl bg-card border border-border hover:border-violet-500/50 transition-all hover:shadow-lg hover:shadow-violet-500/10"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 flex items-center justify-center mb-4">
                      <benefit.icon className="w-6 h-6 text-violet-500" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* How It Works */}
          <section className="py-20 lg:py-32">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <SectionHeading
                badge="The Process"
                title="How Predictive Scoring Works"
                titleGradient="Predictive Scoring"
                description="Our AI combines multiple data sources to generate accurate conversion predictions."
              />

              <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  {
                    step: "01",
                    title: "Data Collection",
                    description: "Gather behavioral, demographic, firmographic, and engagement data from all touchpoints."
                  },
                  {
                    step: "02",
                    title: "Pattern Analysis",
                    description: "AI analyzes historical conversions to identify which factors predict success."
                  },
                  {
                    step: "03",
                    title: "Score Generation",
                    description: "Each lead receives a predictive score based on similarity to converted customers."
                  },
                  {
                    step: "04",
                    title: "Continuous Learning",
                    description: "The model improves with every conversion, becoming more accurate over time."
                  }
                ].map((item, index) => (
                  <motion.div
                    key={item.step}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative"
                  >
                    <div className="text-7xl font-bold text-violet-500/10 absolute -top-4 -left-2">{item.step}</div>
                    <div className="relative pt-8">
                      <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Related Content Grid */}
          <section className="py-20 lg:py-32 bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <SectionHeading
                badge="Deep Dive Resources"
                title="Explore Related Content"
                description="Master predictive lead scoring with comprehensive guides from multiple pillars."
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
                      className="block p-6 rounded-2xl bg-card border border-border hover:border-violet-500/50 transition-all hover:shadow-lg hover:shadow-violet-500/10 h-full group"
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center flex-shrink-0`}>
                          <item.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <span className="text-xs font-medium text-violet-500 uppercase tracking-wider">{item.pillar}</span>
                          <h3 className="text-lg font-semibold mt-1 mb-2 group-hover:text-violet-500 transition-colors">{item.title}</h3>
                          <p className="text-muted-foreground text-sm mb-4">{item.description}</p>
                          <span className="text-violet-500 text-sm font-medium inline-flex items-center">
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
          <section className="py-20 lg:py-32">
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
                      className="block p-4 rounded-xl bg-card border border-border hover:border-violet-500/50 transition-all text-center group"
                    >
                      <h3 className="font-medium group-hover:text-violet-500 transition-colors">{topic.title}</h3>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 lg:py-32 bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center max-w-3xl mx-auto"
              >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
                  Ready to Predict Your <span className="bg-gradient-to-r from-violet-500 to-purple-500 bg-clip-text text-transparent">Best Leads</span>?
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Start using AI-powered predictive scoring today with LeadFlow. Know which leads
                  will convert before they do and focus your team on the opportunities that matter most.
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
