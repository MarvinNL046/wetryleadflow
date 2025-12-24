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
  Cpu,
  Database,
  LineChart,
  Network,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Layers,
  RefreshCw,
  Shield,
  Zap,
  Target,
  Users,
  TrendingUp,
  BarChart3
} from "lucide-react";

export default function MachineLearningCRMPage() {
  return (
    <div className="min-h-screen bg-background">
      <LandingHeader />

      <main>
        {/* Hero Section */}
        <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden pt-20">
          {/* Background Effects */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-pink-900/20 via-background to-background" />
            <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-pink-500/30 rounded-full blur-[128px] animate-pulse" />
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
                className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium rounded-full bg-pink-500/10 text-pink-400 border border-pink-500/20"
              >
                <Brain className="w-4 h-4 mr-2" />
                Next-Generation CRM Technology
              </motion.div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
                Machine Learning in <GradientText animated>Modern CRM</GradientText>
              </h1>

              <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                Discover how machine learning is transforming customer relationship management.
                LeadFlow leverages cutting-edge ML algorithms to deliver intelligent features
                that traditional CRMs simply cannot match, helping you sell smarter and faster.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/handler/sign-up">
                  <GlowButton size="lg" className="group">
                    Experience ML-Powered CRM
                    <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </GlowButton>
                </Link>
                <Link
                  href="/resources/ai-automation/ai-lead-scoring"
                  className="inline-flex items-center gap-2 px-6 py-3 text-base font-medium rounded-full border border-border hover:bg-accent transition-colors"
                >
                  See AI Lead Scoring in Action
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* What is ML in CRM Section */}
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
                  What is <GradientText>Machine Learning</GradientText> in CRM?
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Machine learning is a subset of artificial intelligence that enables software
                    systems to learn from data and improve their performance over time without
                    being explicitly programmed. In the context of CRM, machine learning
                    algorithms analyze vast amounts of customer interaction data to identify
                    patterns, make predictions, and automate decisions that would be impossible
                    for humans to execute at scale.
                  </p>
                  <p>
                    Traditional CRM systems are essentially sophisticated databases with workflow
                    automation. They store customer information and execute pre-defined rules,
                    but they cannot learn or adapt. If you want the system to behave differently,
                    you must manually change the rules. This approach struggles to handle the
                    complexity and scale of modern sales operations.
                  </p>
                  <p>
                    Machine learning transforms CRM from a passive record-keeping system into
                    an active intelligence partner. ML-powered CRM systems like LeadFlow
                    continuously analyze your sales data to discover which leads are most
                    valuable, predict which deals will close, recommend optimal actions for
                    each opportunity, and personalize customer interactions at scale.
                  </p>
                  <p>
                    The result is a CRM that gets smarter every day, automatically adapting
                    to your unique business patterns and helping your team make better
                    decisions with less effort.
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
                <div className="absolute -inset-4 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-cyan-500/20 rounded-3xl blur-2xl opacity-60" />
                <div className="relative rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl overflow-hidden p-6">
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-500 mb-4">
                      <Brain className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold">ML Model Performance</h3>
                  </div>

                  <div className="space-y-4">
                    {[
                      { label: "Lead Scoring Accuracy", value: 94, color: "from-green-500 to-emerald-500" },
                      { label: "Forecast Precision", value: 89, color: "from-blue-500 to-cyan-500" },
                      { label: "Churn Prediction", value: 91, color: "from-purple-500 to-pink-500" },
                      { label: "Win Rate Prediction", value: 87, color: "from-orange-500 to-yellow-500" },
                    ].map((metric, index) => (
                      <motion.div
                        key={metric.label}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="space-y-2"
                      >
                        <div className="flex justify-between text-sm">
                          <span>{metric.label}</span>
                          <span className="font-semibold">{metric.value}%</span>
                        </div>
                        <div className="h-2 rounded-full bg-muted overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${metric.value}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                            className={`h-full rounded-full bg-gradient-to-r ${metric.color}`}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-6 p-4 rounded-xl bg-muted/30">
                    <div className="flex items-center gap-2 text-sm">
                      <RefreshCw className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Models trained on 2.3M data points</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ML Applications in LeadFlow Section */}
        <section className="py-20 lg:py-32 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="ML Applications"
              title="How LeadFlow Uses Machine Learning"
              titleGradient="Machine Learning"
              description="LeadFlow employs multiple ML models across the platform to deliver intelligent capabilities that drive sales success."
            />

            <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Target,
                  title: "Predictive Lead Scoring",
                  description: "ML models analyze hundreds of lead attributes and behaviors to predict conversion probability. Scores update in real-time as leads engage with your brand."
                },
                {
                  icon: TrendingUp,
                  title: "Revenue Forecasting",
                  description: "Time-series ML models forecast revenue at deal, rep, and company levels with industry-leading accuracy, accounting for seasonality and market trends."
                },
                {
                  icon: Users,
                  title: "Customer Segmentation",
                  description: "Clustering algorithms automatically group customers and leads by behavior patterns, enabling hyper-targeted marketing and sales strategies."
                },
                {
                  icon: Sparkles,
                  title: "Next Best Action",
                  description: "Recommendation engines suggest optimal actions for each opportunity, from email timing to content recommendations to meeting scheduling."
                },
                {
                  icon: Shield,
                  title: "Churn Prediction",
                  description: "ML identifies accounts showing signs of disengagement before they leave, enabling proactive retention outreach to protect revenue."
                },
                {
                  icon: Network,
                  title: "Relationship Intelligence",
                  description: "Natural language processing analyzes email and meeting content to map stakeholder relationships and identify champions and blockers."
                }
              ].map((application, index) => (
                <motion.div
                  key={application.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 rounded-2xl bg-card border border-border hover:border-pink-500/50 transition-all hover:shadow-lg hover:shadow-pink-500/10"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center mb-4">
                    <application.icon className="w-6 h-6 text-pink-500" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{application.title}</h3>
                  <p className="text-muted-foreground">{application.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ML Technology Stack Section */}
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Under the Hood"
              title="The Technology Behind LeadFlow ML"
              titleGradient="LeadFlow ML"
              description="Our machine learning infrastructure is built on proven technologies and best practices to deliver reliable, accurate predictions."
            />

            <div className="mt-16 space-y-12">
              {[
                {
                  icon: Database,
                  title: "Data Pipeline Architecture",
                  description: "LeadFlow collects and processes data from multiple sources in real-time: CRM activities, email interactions, website behavior, calendar events, and third-party enrichment. Our data pipeline ensures ML models always have access to the freshest, most complete data for maximum prediction accuracy.",
                },
                {
                  icon: Cpu,
                  title: "Model Training & Deployment",
                  description: "We employ a continuous learning approach where models are retrained regularly on your latest data. Custom models are trained specifically for each customer, ensuring predictions are optimized for your unique sales patterns rather than generic industry averages.",
                },
                {
                  icon: Layers,
                  title: "Ensemble Methods",
                  description: "For critical predictions like lead scoring and revenue forecasting, LeadFlow uses ensemble methods that combine multiple ML algorithms. This approach delivers more robust predictions than any single model and reduces the impact of edge cases or unusual data patterns.",
                },
                {
                  icon: Shield,
                  title: "Model Monitoring & Governance",
                  description: "Every ML model in LeadFlow is continuously monitored for accuracy, fairness, and drift. If model performance degrades, automatic retraining kicks in. Complete audit trails track how predictions are made, supporting compliance and explainability requirements.",
                }
              ].map((tech, index) => (
                <motion.div
                  key={tech.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="grid md:grid-cols-12 gap-6 items-start"
                >
                  <div className="md:col-span-1">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center">
                      <tech.icon className="w-7 h-7 text-pink-500" />
                    </div>
                  </div>
                  <div className="md:col-span-11">
                    <h3 className="text-xl font-semibold mb-2">{tech.title}</h3>
                    <p className="text-muted-foreground">{tech.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ML vs Traditional CRM Section */}
        <section className="py-20 lg:py-32 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Comparison"
              title="ML-Powered CRM vs Traditional CRM"
              titleGradient="ML-Powered CRM"
              description="See the dramatic difference between legacy CRM approaches and modern machine learning capabilities."
            />

            <div className="mt-16">
              <div className="grid md:grid-cols-2 gap-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="p-8 rounded-2xl bg-card border border-border"
                >
                  <h3 className="text-xl font-semibold mb-6 text-muted-foreground">Traditional CRM</h3>
                  <ul className="space-y-4">
                    {[
                      "Manual lead qualification based on gut feeling",
                      "Static scoring rules that require constant updating",
                      "Forecasts based on pipeline math and guesswork",
                      "One-size-fits-all engagement sequences",
                      "Reactive problem detection after damage is done",
                      "Limited personalization at scale",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3 text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="p-8 rounded-2xl bg-gradient-to-br from-pink-500/10 to-purple-500/10 border border-pink-500/30"
                >
                  <h3 className="text-xl font-semibold mb-6">LeadFlow ML CRM</h3>
                  <ul className="space-y-4">
                    {[
                      "AI-powered lead scoring with 94% accuracy",
                      "Self-learning models that improve automatically",
                      "Predictive forecasts backed by data science",
                      "Personalized journeys for each individual lead",
                      "Proactive alerts for at-risk deals and accounts",
                      "Hyper-personalization at unlimited scale",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-pink-500 mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Business Benefits Section */}
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
                  The Business Value of <GradientText>ML in Your CRM</GradientText>
                </h2>
                <p className="text-muted-foreground mb-8">
                  Machine learning isn&apos;t just a technical feature; it delivers measurable
                  business outcomes that impact your bottom line. Companies using LeadFlow&apos;s
                  ML capabilities consistently outperform their competition.
                </p>
                <Link href="/handler/sign-up">
                  <GlowButton size="lg" className="group">
                    See ML in Action
                    <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </GlowButton>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { metric: "35%", label: "Higher Win Rates", icon: TrendingUp },
                    { metric: "50%", label: "Less Time on Admin", icon: Zap },
                    { metric: "25%", label: "Better Forecast Accuracy", icon: BarChart3 },
                    { metric: "3x", label: "Faster Lead Response", icon: Target },
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="p-6 rounded-2xl bg-card border border-border text-center"
                    >
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center mx-auto mb-3">
                        <stat.icon className="w-6 h-6 text-pink-500" />
                      </div>
                      <div className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent mb-1">
                        {stat.metric}
                      </div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Future of ML in CRM Section */}
        <section className="py-20 lg:py-32 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="The Future"
              title="What's Next for ML in CRM"
              titleGradient="ML in CRM"
              description="LeadFlow is continuously investing in cutting-edge ML capabilities to keep you ahead of the competition."
            />

            <div className="mt-16 grid md:grid-cols-2 gap-8">
              {[
                {
                  title: "Conversational AI Integration",
                  description: "Deep integration with large language models for intelligent email drafting, meeting summaries, and natural language CRM queries. Ask your CRM questions in plain English and get instant, accurate answers."
                },
                {
                  title: "Advanced Anomaly Detection",
                  description: "ML models that automatically detect unusual patterns in your sales data, such as sudden changes in engagement, unexpected deal movements, or potential data quality issues before they cause problems."
                },
                {
                  title: "Cross-Company Benchmarking",
                  description: "Anonymized ML models trained across LeadFlow&apos;s customer base to provide industry benchmarks and best practices. Learn how your performance compares and where you have room to improve."
                },
                {
                  title: "Autonomous Deal Management",
                  description: "AI agents that can autonomously manage routine deal activities: scheduling follow-ups, sending check-in emails, updating deal stages, and escalating issues to humans only when needed."
                }
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-8 rounded-2xl bg-gradient-to-br from-pink-500/5 to-purple-500/5 border border-border hover:border-pink-500/30 transition-colors"
                >
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
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
                Ready for an <GradientText>Intelligent CRM</GradientText>?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Don&apos;t settle for a CRM that just stores data. LeadFlow&apos;s machine learning
                capabilities transform your customer data into actionable intelligence that
                drives revenue growth. Start your free trial today.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/handler/sign-up">
                  <GlowButton size="lg" className="group">
                    Start Your Free Trial
                    <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </GlowButton>
                </Link>
                <Link
                  href="/resources/ai-automation/automation-workflows"
                  className="inline-flex items-center gap-2 px-6 py-3 text-base font-medium rounded-full border border-border hover:bg-accent transition-colors"
                >
                  Explore Automation Workflows
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Related Resources */}
        <section className="py-20 lg:py-32 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Learn More"
              title="Related AI & Automation Resources"
              description="Explore more ways LeadFlow uses AI to transform your sales process."
            />

            <div className="mt-12 grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "AI Lead Scoring",
                  description: "See how ML powers intelligent lead prioritization.",
                  href: "/resources/ai-automation/ai-lead-scoring"
                },
                {
                  title: "Predictive Analytics",
                  description: "Learn about ML-powered revenue forecasting.",
                  href: "/resources/ai-automation/predictive-analytics"
                },
                {
                  title: "Smart Lead Routing",
                  description: "Discover ML-driven lead assignment optimization.",
                  href: "/resources/ai-automation/smart-lead-routing"
                }
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
                    className="block p-6 rounded-2xl bg-card border border-border hover:border-pink-500/50 transition-all hover:shadow-lg hover:shadow-pink-500/10 h-full"
                  >
                    <h3 className="text-lg font-semibold mb-2">{resource.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{resource.description}</p>
                    <span className="text-pink-500 text-sm font-medium inline-flex items-center">
                      Learn more <ArrowRight className="ml-1 w-4 h-4" />
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <LandingFooter />
    </div>
  );
}
