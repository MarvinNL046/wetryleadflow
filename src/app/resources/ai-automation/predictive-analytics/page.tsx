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
  LineChart,
  TrendingUp,
  Target,
  Lightbulb,
  BarChart3,
  PieChart,
  CheckCircle2,
  ArrowRight,
  Calendar,
  DollarSign,
  AlertTriangle,
  Gauge,
  Activity,
  Eye
} from "lucide-react";

export default function PredictiveAnalyticsPage() {
  return (
    <div className="min-h-screen bg-background">
      <LandingHeader />

      <main>
        {/* Hero Section */}
        <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden pt-20">
          {/* Background Effects */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-background to-background" />
            <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-500/30 rounded-full blur-[128px] animate-pulse" />
            <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: "1s" }} />
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
                className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20"
              >
                <LineChart className="w-4 h-4 mr-2" />
                Data-Driven Sales Intelligence
              </motion.div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
                Predictive Analytics <GradientText animated>for Sales Teams</GradientText>
              </h1>

              <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                Stop reacting to market changes and start anticipating them. LeadFlow&apos;s predictive
                analytics engine uses advanced machine learning to forecast revenue, identify
                at-risk deals, and uncover hidden opportunities in your pipeline.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/handler/sign-up">
                  <GlowButton size="lg" className="group">
                    Start Predicting Success
                    <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </GlowButton>
                </Link>
                <Link
                  href="/resources/ai-automation/ai-lead-scoring"
                  className="inline-flex items-center gap-2 px-6 py-3 text-base font-medium rounded-full border border-border hover:bg-accent transition-colors"
                >
                  Learn About AI Lead Scoring
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* What is Predictive Analytics Section */}
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
                  Understanding <GradientText>Predictive Analytics</GradientText> in Sales
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Predictive analytics transforms raw sales data into actionable foresight. By
                    analyzing historical patterns, customer behaviors, and market signals,
                    predictive models can forecast future outcomes with remarkable accuracy.
                    For sales teams, this means moving from reactive firefighting to proactive
                    strategy execution.
                  </p>
                  <p>
                    Traditional sales forecasting relies on gut feelings and basic pipeline math.
                    Sales managers estimate close rates, multiply by deal values, and hope for
                    the best. This approach fails to account for the countless variables that
                    influence whether deals close: buyer engagement levels, competitive pressures,
                    seasonality, economic conditions, and individual rep performance patterns.
                  </p>
                  <p>
                    LeadFlow&apos;s predictive analytics engine processes millions of data points to
                    generate forecasts that account for all these factors and more. Our machine
                    learning models continuously learn from your team&apos;s results, becoming more
                    accurate over time as they identify the specific patterns that predict
                    success in your unique selling environment.
                  </p>
                  <p>
                    The result is a forecasting system that sales leaders can actually trust,
                    enabling confident resource allocation, accurate quota setting, and strategic
                    planning based on data rather than guesswork.
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
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 rounded-3xl blur-2xl opacity-60" />
                <div className="relative rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl overflow-hidden p-6">
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Q4 Revenue Forecast</h3>
                    <p className="text-sm text-muted-foreground">AI-powered projection with 94% confidence</p>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-end gap-2 h-48">
                      {[65, 72, 68, 85, 92, 88, 95, 102, 98, 110, 115, 125].map((value, index) => (
                        <motion.div
                          key={index}
                          initial={{ height: 0 }}
                          whileInView={{ height: `${(value / 130) * 100}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: index * 0.05 }}
                          className={`flex-1 rounded-t-lg ${
                            index >= 9 ? 'bg-gradient-to-t from-purple-500/50 to-purple-400/50 border-2 border-dashed border-purple-400' : 'bg-gradient-to-t from-blue-500 to-cyan-500'
                          }`}
                        />
                      ))}
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Jan</span>
                      <span>Apr</span>
                      <span>Jul</span>
                      <span>Oct</span>
                      <span>Dec</span>
                    </div>
                  </div>
                  <div className="mt-6 grid grid-cols-3 gap-4">
                    <div className="p-3 rounded-lg bg-muted/30">
                      <p className="text-xs text-muted-foreground">Predicted Revenue</p>
                      <p className="text-lg font-bold text-green-500">$2.4M</p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/30">
                      <p className="text-xs text-muted-foreground">Target</p>
                      <p className="text-lg font-bold">$2.2M</p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/30">
                      <p className="text-xs text-muted-foreground">Variance</p>
                      <p className="text-lg font-bold text-green-500">+9%</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Key Capabilities Section */}
        <section className="py-20 lg:py-32 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Core Capabilities"
              title="What LeadFlow Predictive Analytics Can Do"
              titleGradient="Predictive Analytics"
              description="Our comprehensive analytics suite gives sales leaders the insights they need to make confident, data-driven decisions."
            />

            <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: TrendingUp,
                  title: "Revenue Forecasting",
                  description: "Generate accurate revenue predictions at the deal, rep, team, and company levels. Our models account for seasonality, deal velocity, and historical close rates to produce forecasts you can count on."
                },
                {
                  icon: AlertTriangle,
                  title: "Deal Risk Detection",
                  description: "Identify deals that are likely to stall or be lost before it happens. Early warning signals give your team time to intervene and save at-risk opportunities."
                },
                {
                  icon: Calendar,
                  title: "Close Date Prediction",
                  description: "Move beyond optimistic close dates. Our AI analyzes deal progression patterns to predict when deals will actually close, enabling accurate pipeline management."
                },
                {
                  icon: Gauge,
                  title: "Win Probability Scoring",
                  description: "Every deal receives a real-time win probability score based on engagement patterns, deal characteristics, and historical outcomes from similar opportunities."
                },
                {
                  icon: Activity,
                  title: "Pipeline Health Analysis",
                  description: "Get instant visibility into pipeline coverage, velocity trends, and conversion rates across every stage. Spot problems before they impact your numbers."
                },
                {
                  icon: Eye,
                  title: "Opportunity Discovery",
                  description: "AI identifies hidden opportunities in your existing customer base and pipeline, surfacing upsell potential and leads that deserve more attention."
                }
              ].map((capability, index) => (
                <motion.div
                  key={capability.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 rounded-2xl bg-card border border-border hover:border-blue-500/50 transition-all hover:shadow-lg hover:shadow-blue-500/10"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mb-4">
                    <capability.icon className="w-6 h-6 text-blue-500" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{capability.title}</h3>
                  <p className="text-muted-foreground">{capability.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="The Technology"
              title="How LeadFlow Predictive Analytics Works"
              titleGradient="LeadFlow"
              description="Our platform combines multiple data sources and advanced algorithms to deliver predictions you can trust."
            />

            <div className="mt-16 space-y-12">
              {[
                {
                  step: "01",
                  title: "Data Aggregation",
                  description: "LeadFlow automatically collects and normalizes data from your CRM activities, email interactions, calendar events, website visits, and external data sources. This creates a comprehensive dataset that captures every signal relevant to deal outcomes.",
                  icon: BarChart3
                },
                {
                  step: "02",
                  title: "Pattern Recognition",
                  description: "Our machine learning algorithms analyze your historical data to identify the patterns that distinguish won deals from lost ones. This includes engagement cadences, stakeholder involvement, competitive dynamics, and hundreds of other factors unique to your business.",
                  icon: Lightbulb
                },
                {
                  step: "03",
                  title: "Model Training",
                  description: "Using your specific data, LeadFlow trains custom predictive models tailored to your sales process. These models continuously improve as they learn from new outcomes, becoming more accurate the longer you use the platform.",
                  icon: Target
                },
                {
                  step: "04",
                  title: "Real-Time Predictions",
                  description: "As deals progress and new data flows in, predictions update in real-time. Your team always has access to the latest forecasts, risk assessments, and opportunity scores without any manual effort.",
                  icon: LineChart
                }
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="grid md:grid-cols-12 gap-6 items-center"
                >
                  <div className="md:col-span-1">
                    <span className="text-5xl font-bold text-muted-foreground/20">{item.step}</span>
                  </div>
                  <div className="md:col-span-2 flex justify-center">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                      <item.icon className="w-8 h-8 text-blue-500" />
                    </div>
                  </div>
                  <div className="md:col-span-9">
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Business Impact Section */}
        <section className="py-20 lg:py-32 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
                  The Business Impact of <GradientText>Predictive Sales Analytics</GradientText>
                </h2>
                <p className="text-muted-foreground mb-8">
                  Companies leveraging predictive analytics don&apos;t just forecast better; they
                  fundamentally transform how they operate. When you can see the future of
                  your pipeline, you can make smarter decisions at every level of the organization.
                </p>
                <Link href="/handler/sign-up">
                  <GlowButton size="lg" className="group">
                    Transform Your Sales Data
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
                <div className="space-y-6">
                  {[
                    {
                      metric: "25%",
                      label: "Increase in Forecast Accuracy",
                      description: "Move from gut-based estimates to data-driven predictions that leadership can trust."
                    },
                    {
                      metric: "40%",
                      label: "Reduction in Deal Slippage",
                      description: "Early risk detection enables proactive intervention before deals stall."
                    },
                    {
                      metric: "3x",
                      label: "Faster Strategic Decision Making",
                      description: "Real-time insights eliminate the need for time-consuming manual analysis."
                    },
                    {
                      metric: "18%",
                      label: "Improvement in Win Rates",
                      description: "Focus resources on deals most likely to close with precise probability scoring."
                    }
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex gap-4 p-4 rounded-xl bg-card border border-border"
                    >
                      <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                        <span className="text-xl font-bold text-white">{stat.metric}</span>
                      </div>
                      <div>
                        <h4 className="font-semibold">{stat.label}</h4>
                        <p className="text-sm text-muted-foreground">{stat.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Real Applications"
              title="Predictive Analytics Use Cases"
              titleGradient="Use Cases"
              description="See how sales teams across industries leverage LeadFlow's predictive capabilities to drive results."
            />

            <div className="mt-16 grid md:grid-cols-2 gap-8">
              {[
                {
                  title: "Quarterly Planning",
                  description: "Finance teams use revenue forecasts for budgeting and resource allocation. Marketing teams align campaign timing with predicted pipeline needs. Sales ops teams optimize territory assignments and quota distributions based on predicted performance."
                },
                {
                  title: "Deal Coaching",
                  description: "Managers use risk scores and win probability trends to identify which deals need coaching attention. Instead of reviewing every deal in 1:1s, focus on the opportunities where intervention will have the biggest impact."
                },
                {
                  title: "Pipeline Reviews",
                  description: "Transform pipeline reviews from subjective deal discussions into objective data reviews. Use AI-generated insights to drive productive conversations about deal strategy and resource allocation."
                },
                {
                  title: "Board Reporting",
                  description: "Give executives and board members confidence in revenue projections with AI-backed forecasts. Show the methodology behind predictions and track accuracy over time to build trust."
                }
              ].map((useCase, index) => (
                <motion.div
                  key={useCase.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-8 rounded-2xl bg-gradient-to-br from-blue-500/5 to-purple-500/5 border border-border"
                >
                  <h3 className="text-xl font-semibold mb-3">{useCase.title}</h3>
                  <p className="text-muted-foreground">{useCase.description}</p>
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
                Start Predicting Your <GradientText>Sales Success</GradientText>
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Join forward-thinking sales organizations using LeadFlow&apos;s predictive analytics
                to forecast with confidence and make smarter decisions. Start your free trial
                today and see the future of your pipeline.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/handler/sign-up">
                  <GlowButton size="lg" className="group">
                    Start Your Free Trial
                    <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </GlowButton>
                </Link>
                <Link
                  href="/resources/ai-automation/machine-learning-crm"
                  className="inline-flex items-center gap-2 px-6 py-3 text-base font-medium rounded-full border border-border hover:bg-accent transition-colors"
                >
                  Explore Machine Learning in CRM
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Related Resources */}
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Learn More"
              title="Related AI & Automation Resources"
              description="Continue exploring how AI transforms sales processes."
            />

            <div className="mt-12 grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "AI Lead Scoring",
                  description: "Automatically prioritize your best leads with intelligent scoring algorithms.",
                  href: "/resources/ai-automation/ai-lead-scoring"
                },
                {
                  title: "Smart Lead Routing",
                  description: "Route leads to the right sales rep instantly using AI-powered matching.",
                  href: "/resources/ai-automation/smart-lead-routing"
                },
                {
                  title: "Machine Learning in CRM",
                  description: "Discover how ML powers modern CRM features and capabilities.",
                  href: "/resources/ai-automation/machine-learning-crm"
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
                    className="block p-6 rounded-2xl bg-card border border-border hover:border-blue-500/50 transition-all hover:shadow-lg hover:shadow-blue-500/10 h-full"
                  >
                    <h3 className="text-lg font-semibold mb-2">{resource.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{resource.description}</p>
                    <span className="text-blue-500 text-sm font-medium inline-flex items-center">
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
