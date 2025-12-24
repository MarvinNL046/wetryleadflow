"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  LandingHeader,
  LandingFooter,
  GlowButton,
  GradientText,
  SectionHeading,
} from "@/components/landing";
import {
  BarChart3,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  Target,
  Clock,
  Zap,
  Calculator,
  Calendar,
  PieChart,
  LineChart,
  AlertTriangle,
  LayoutGrid,
  Brain,
  Layers,
} from "lucide-react";

export default function SalesForecastingPage() {
  return (
    <div className="min-h-screen bg-background">
      <LandingHeader />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-background to-background" />
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-500/30 rounded-full blur-[128px] animate-pulse" />
          <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: "1s" }} />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-sm font-medium text-purple-400 mb-6">
              <BarChart3 className="w-4 h-4" />
              Pipeline Management
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
              Sales Forecasting <GradientText>Best Practices</GradientText>
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Master the art and science of sales forecasting. Build accurate, reliable revenue predictions that help you make confident business decisions and consistently hit your targets.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/handler/sign-up">
                <GlowButton size="lg" className="group">
                  Improve Your Forecasting
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </GlowButton>
              </Link>
              <Link href="/resources/pipeline-management/bottleneck-analysis" className="text-muted-foreground hover:text-foreground transition-colors">
                Learn about Bottleneck Analysis →
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Forecasting Matters Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Why Accurate <GradientText>Sales Forecasting</GradientText> Is Critical
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Sales forecasting is more than predicting next quarter&apos;s revenue. It&apos;s the foundation for virtually every business decision your company makes, from hiring plans to inventory management to investor communications.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                Inaccurate forecasts create cascading problems. Over-forecasting leads to overspending on resources you won&apos;t need. Under-forecasting means missed opportunities and scrambling to meet unexpected demand. Either way, your credibility suffers and business planning becomes impossible.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                The most successful sales organizations treat forecasting as a discipline, not a guessing game. They use consistent methodologies, leverage historical data, and continuously refine their accuracy based on results.
              </p>
              <p className="text-lg text-muted-foreground">
                LeadFlow brings AI-powered forecasting to your sales operation, combining your pipeline data with historical patterns and market signals to generate predictions you can actually trust.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 via-cyan-500/20 to-blue-500/20 rounded-3xl blur-2xl opacity-60" />
              <div className="relative rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">Q4 Revenue Forecast</h4>
                  <span className="text-xs text-muted-foreground">Updated daily</span>
                </div>

                <div className="text-center py-4">
                  <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    €847,000
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">Predicted Revenue</div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: "Best Case", value: "€924K", color: "text-green-400" },
                    { label: "Committed", value: "€712K", color: "text-blue-400" },
                    { label: "Pipeline", value: "€1.2M", color: "text-purple-400" },
                  ].map((item) => (
                    <div key={item.label} className="text-center p-3 rounded-lg bg-muted/30">
                      <div className={`text-lg font-bold ${item.color}`}>{item.value}</div>
                      <div className="text-xs text-muted-foreground">{item.label}</div>
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Target Achievement</span>
                    <span className="font-medium">94%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full w-[94%] bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full" />
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                  <div className="flex items-center gap-2 text-green-400 text-sm">
                    <TrendingUp className="w-4 h-4" />
                    <span>Forecast confidence: 87%</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Forecasting Methods Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Forecasting Methods"
            title="Proven Sales Forecasting Methodologies"
            titleGradient="Forecasting Methodologies"
            description="Understand the different approaches to sales forecasting and when to use each one."
          />

          <div className="grid md:grid-cols-2 gap-8 mt-16">
            {[
              {
                icon: Calculator,
                title: "Pipeline-Based Forecasting",
                description: "The most common method for B2B sales teams. This approach multiplies the value of each deal by its probability of closing based on its current stage. For example, a €100,000 deal in the Proposal stage (75% probability) contributes €75,000 to the forecast. LeadFlow automatically calculates these values and adjusts probabilities based on historical close rates for each stage.",
                pros: ["Easy to understand and implement", "Updates automatically as deals progress", "Works well for shorter sales cycles"],
                cons: ["Assumes uniform probability within stages", "Can be gamed by optimistic stage assignments", "Doesn't account for deal-specific factors"],
              },
              {
                icon: LineChart,
                title: "Historical Trend Analysis",
                description: "Uses past performance to predict future results. By analyzing historical patterns—seasonal trends, growth rates, and conversion metrics—you can project future revenue. This method works well when your market and sales process are relatively stable. LeadFlow tracks all historical metrics automatically, making trend analysis easy to perform.",
                pros: ["Based on actual company performance", "Accounts for seasonality", "Simple to calculate and explain"],
                cons: ["Assumes past predicts future", "Doesn't account for market changes", "Requires substantial historical data"],
              },
              {
                icon: Brain,
                title: "AI-Powered Predictive Forecasting",
                description: "Leverages machine learning to analyze hundreds of signals—deal characteristics, engagement patterns, buyer behavior, market conditions—to generate predictions. This method can identify non-obvious patterns and adjust for factors humans might miss. LeadFlow's AI forecasting engine continuously learns from your deals to improve accuracy over time.",
                pros: ["Considers many factors simultaneously", "Learns and improves over time", "Can identify at-risk deals early"],
                cons: ["Requires sufficient data to train models", "Can feel like a black box", "May need calibration for new markets"],
              },
              {
                icon: Target,
                title: "Rep-Level Commit Forecasting",
                description: "Relies on sales reps to provide their own forecast commitments based on their knowledge of their deals. Reps categorize deals as Commit (high confidence), Best Case (possible), or Pipeline (unlikely this period). Managers roll up rep forecasts to create the team forecast. LeadFlow supports commit categories and tracks rep accuracy over time.",
                pros: ["Incorporates rep knowledge", "Creates accountability", "Allows for judgment and intuition"],
                cons: ["Subject to sandbagging or optimism bias", "Consistency varies across reps", "Time-consuming for large teams"],
              },
            ].map((method, index) => (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-2xl border border-border/50 bg-card/50"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center mb-4">
                  <method.icon className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{method.title}</h3>
                <p className="text-muted-foreground mb-4">{method.description}</p>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <div className="text-sm font-medium text-green-400 mb-2">Pros</div>
                    <ul className="space-y-1">
                      {method.pros.map((pro, i) => (
                        <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                          <CheckCircle2 className="w-3 h-3 text-green-400 mt-0.5 flex-shrink-0" />
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-yellow-400 mb-2">Considerations</div>
                    <ul className="space-y-1">
                      {method.cons.map((con, i) => (
                        <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                          <AlertTriangle className="w-3 h-3 text-yellow-400 mt-0.5 flex-shrink-0" />
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
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
            title="Sales Forecasting Best Practices"
            titleGradient="Best Practices"
            description="Follow these proven practices to improve your forecast accuracy and reliability."
          />

          <div className="max-w-4xl mx-auto mt-16 space-y-8">
            {[
              {
                step: "01",
                title: "Establish Clear Forecasting Cadence",
                content: "Define when and how often forecasts are updated, reviewed, and committed. Most organizations do weekly pipeline reviews and monthly or quarterly formal forecasts. Consistency is key—changing your methodology mid-cycle makes comparisons meaningless. LeadFlow supports automated forecast snapshots on any schedule you define.",
              },
              {
                step: "02",
                title: "Define Objective Stage Criteria",
                content: "Forecast accuracy depends on consistent stage definitions. If one rep moves deals to Proposal after sending pricing and another waits until the proposal is reviewed, your stage probabilities become meaningless. Document clear, verifiable criteria for each stage and enforce them through process and training.",
              },
              {
                step: "03",
                title: "Track and Analyze Forecast Accuracy",
                content: "You can't improve what you don't measure. Track forecast accuracy over time: what did you predict vs. what actually closed? Analyze patterns in misses—are you consistently over-forecasting certain deal types or stages? LeadFlow provides detailed forecast accuracy reports to help you identify improvement areas.",
              },
              {
                step: "04",
                title: "Use Multiple Forecasting Methods",
                content: "No single method is perfect. Sophisticated sales organizations use multiple approaches and compare results. When methods agree, confidence increases. When they diverge, investigate why. LeadFlow generates forecasts using multiple methodologies so you can triangulate toward the most accurate prediction.",
              },
              {
                step: "05",
                title: "Account for Pipeline Coverage",
                content: "Your forecast should consider not just current pipeline but also the historical ratio of pipeline to closed revenue. If you typically close 25% of pipeline, you need 4x coverage to hit your target. Track pipeline coverage ratios and use them to validate forecast attainability.",
              },
              {
                step: "06",
                title: "Review Deal-Level Details",
                content: "Aggregate forecasts can hide problems. Regular deal-level reviews help validate assumptions and catch issues early. Are large deals progressing as expected? Are there concentration risks? LeadFlow's deal health scoring surfaces at-risk opportunities that might impact your forecast.",
              },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex gap-6"
              >
                <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-xl">
                  {item.step}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground">{item.content}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* LeadFlow Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                LeadFlow&apos;s <GradientText>AI-Powered</GradientText> Forecasting
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Take the guesswork out of forecasting with intelligent predictions that learn from your data and improve over time.
              </p>

              <div className="space-y-4">
                {[
                  "Multi-method forecasting combining pipeline, historical, and AI approaches",
                  "Deal-level probability scoring based on engagement and behavior signals",
                  "Automated forecast snapshots for tracking accuracy over time",
                  "Scenario modeling to understand best case, worst case, and likely outcomes",
                  "Early warning alerts when forecasts are at risk",
                  "Rep-level commit tracking with accuracy scoring",
                  "Pipeline coverage analysis and gap identification",
                  "Integration with your financial planning systems",
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 via-cyan-500/20 to-blue-500/20 rounded-3xl blur-2xl opacity-60" />
              <div className="relative rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl p-6 space-y-4">
                <h4 className="font-semibold">Forecast Accuracy Trend</h4>
                <div className="space-y-4">
                  {[
                    { period: "Q1 2024", predicted: "€720K", actual: "€695K", accuracy: "97%" },
                    { period: "Q2 2024", predicted: "€840K", actual: "€812K", accuracy: "97%" },
                    { period: "Q3 2024", predicted: "€920K", actual: "€945K", accuracy: "97%" },
                    { period: "Q4 2024", predicted: "€847K", actual: "—", accuracy: "In progress" },
                  ].map((quarter, index) => (
                    <div key={quarter.period} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                      <div>
                        <div className="font-medium text-sm">{quarter.period}</div>
                        <div className="text-xs text-muted-foreground">
                          Predicted: {quarter.predicted} | Actual: {quarter.actual}
                        </div>
                      </div>
                      <div className={`text-sm font-medium ${
                        quarter.accuracy === "In progress" ? "text-yellow-400" : "text-green-400"
                      }`}>
                        {quarter.accuracy}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 rounded-xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Average Accuracy</span>
                    <span className="text-xl font-bold text-green-400">97%</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Resources Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Related Resources"
            title="Explore More Pipeline Management Topics"
            titleGradient="Pipeline Management"
            description="Continue building your pipeline management expertise with these resources."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {[
              {
                title: "Kanban Boards",
                description: "Visual pipeline management for your sales team.",
                href: "/resources/pipeline-management/kanban-boards",
                icon: LayoutGrid,
              },
              {
                title: "Stage Optimization",
                description: "Configure stages for maximum conversion.",
                href: "/resources/pipeline-management/stage-optimization",
                icon: Layers,
              },
              {
                title: "Deal Velocity",
                description: "Accelerate deals through your pipeline.",
                href: "/resources/pipeline-management/deal-velocity",
                icon: Zap,
              },
              {
                title: "Bottleneck Analysis",
                description: "Find and fix pipeline friction points.",
                href: "/resources/pipeline-management/bottleneck-analysis",
                icon: AlertTriangle,
              },
            ].map((resource) => (
              <Link
                key={resource.title}
                href={resource.href}
                className="group p-6 rounded-2xl border border-border/50 bg-card/50 hover:bg-card/80 hover:border-purple-500/30 transition-all"
              >
                <resource.icon className="w-8 h-8 text-purple-400 mb-4" />
                <h3 className="font-semibold mb-2 group-hover:text-purple-400 transition-colors">{resource.title}</h3>
                <p className="text-sm text-muted-foreground">{resource.description}</p>
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
            transition={{ duration: 0.5 }}
            className="relative rounded-3xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600" />
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />

            <div className="relative px-8 py-16 md:px-16 md:py-20 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Start Forecasting with Confidence
              </h2>
              <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
                LeadFlow&apos;s AI-powered forecasting helps you predict revenue accurately and make better business decisions.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/handler/sign-up">
                  <GlowButton size="lg" variant="secondary" className="group">
                    Start Free Trial
                    <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </GlowButton>
                </Link>
                <Link href="/" className="text-white/80 hover:text-white transition-colors">
                  Explore LeadFlow Features →
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
}
