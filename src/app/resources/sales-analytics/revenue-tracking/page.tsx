"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  DollarSign,
  GitBranch,
  BarChart3,
  ArrowRight,
  CheckCircle2,
  Target,
  Layers,
  TrendingUp,
  Zap,
  PieChart,
  ArrowUpRight,
  Database
} from "lucide-react";
import { LandingHeader, LandingFooter, GlowButton, GradientText, SectionHeading } from "@/components/landing";

export default function RevenueTrackingPage() {
  return (
    <div className="min-h-screen bg-background">
      <LandingHeader />

      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-background to-background" />
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-green-500/30 rounded-full blur-[128px] animate-pulse" />
            <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: "1s" }} />
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-sm font-medium text-purple-400 mb-6">
                <DollarSign className="w-4 h-4" />
                Sales Analytics
              </span>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
                Revenue Tracking & <GradientText>Attribution</GradientText>
              </h1>

              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Understanding where your revenue comes from and which activities drive it is essential for making smart investment decisions. Master the art and science of revenue attribution to maximize your marketing and sales ROI.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/handler/sign-up">
                  <GlowButton size="lg" className="group">
                    Track Your Revenue Free
                    <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </GlowButton>
                </Link>
                <Link href="/resources/sales-analytics/sales-reporting" className="text-muted-foreground hover:text-foreground transition-colors">
                  Learn about sales reporting →
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Why Revenue Attribution Matters Section */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto"
            >
              <SectionHeading
                badge="Revenue Intelligence"
                title="Why Revenue Tracking and Attribution Transform Business Decisions"
                titleGradient="Transform"
                centered={false}
              />

              <div className="mt-8 prose prose-lg dark:prose-invert max-w-none">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  In modern B2B sales, the journey from first touch to closed deal is rarely linear. Prospects interact with your brand through multiple channels - they might discover you through a Google search, engage with content on LinkedIn, attend a webinar, and finally convert after receiving a targeted email campaign. Without proper revenue attribution, you're left guessing which of these touchpoints actually influenced the purchase decision.
                </p>

                <p className="text-lg text-muted-foreground leading-relaxed mt-4">
                  Revenue tracking and attribution solve this challenge by connecting marketing and sales activities to actual revenue outcomes. This visibility enables data-driven decisions about where to invest your limited budget, which channels deserve more resources, and which activities should be scaled back or eliminated entirely.
                </p>

                <p className="text-lg text-muted-foreground leading-relaxed mt-4">
                  Companies that master revenue attribution consistently outperform their peers. They can justify marketing spend with concrete ROI numbers, identify their most effective sales motions, and continuously optimize their go-to-market strategy based on real revenue data rather than vanity metrics or gut feelings.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mt-12">
                {[
                  {
                    icon: Target,
                    title: "Optimize Marketing Spend",
                    description: "Allocate budget to channels and campaigns that actually generate revenue"
                  },
                  {
                    icon: GitBranch,
                    title: "Understand the Journey",
                    description: "Map the complete customer journey from first touch to closed revenue"
                  },
                  {
                    icon: TrendingUp,
                    title: "Predict Future Revenue",
                    description: "Build accurate forecasts based on attributed pipeline and conversion rates"
                  }
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="p-6 rounded-2xl bg-card/50 border border-border/50 hover:border-purple-500/30 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-4">
                      <item.icon className="w-6 h-6 text-purple-500" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Attribution Models Section */}
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Attribution Models"
              title="Understanding Different Revenue Attribution Models"
              titleGradient="Attribution"
              description="Choose the right model for your business to accurately measure marketing and sales impact on revenue."
            />

            <div className="grid lg:grid-cols-2 gap-8 mt-12 max-w-6xl mx-auto">
              {[
                {
                  icon: ArrowUpRight,
                  title: "First-Touch Attribution",
                  description: "Assigns 100% of the revenue credit to the first interaction a customer had with your brand. This model is useful for understanding which channels are best at generating initial awareness and filling the top of your funnel.",
                  pros: "Simple to implement, highlights demand generation effectiveness",
                  cons: "Ignores all nurturing and closing activities"
                },
                {
                  icon: Target,
                  title: "Last-Touch Attribution",
                  description: "Gives all credit to the final touchpoint before conversion. Popular because it's straightforward and often aligns with sales compensation models, but it dramatically undervalues the marketing activities that built awareness and interest.",
                  pros: "Easy to track, shows what closes deals",
                  cons: "Undervalues brand awareness and nurturing"
                },
                {
                  icon: Layers,
                  title: "Linear Attribution",
                  description: "Distributes credit equally across all touchpoints in the customer journey. This democratic approach ensures no interaction is overlooked, making it a fair starting point for organizations beginning their attribution journey.",
                  pros: "Simple to understand, no touchpoint ignored",
                  cons: "Not all touchpoints are equally influential"
                },
                {
                  icon: TrendingUp,
                  title: "Time-Decay Attribution",
                  description: "Assigns more credit to touchpoints closer to the conversion event. This model recognizes that recent interactions often have more influence on the final purchase decision while still acknowledging earlier touchpoints.",
                  pros: "Balances awareness and closing activities",
                  cons: "May undervalue early-stage marketing"
                },
                {
                  icon: Zap,
                  title: "Position-Based (U-Shaped)",
                  description: "Gives 40% credit to both first and last touch, with the remaining 20% distributed among middle interactions. This model values both demand generation and deal closing while acknowledging the nurturing in between.",
                  pros: "Balanced view of funnel stages",
                  cons: "Arbitrary weighting percentages"
                },
                {
                  icon: Database,
                  title: "Data-Driven Attribution",
                  description: "Uses machine learning to analyze your actual conversion data and determine how much credit each touchpoint deserves. This sophisticated approach provides the most accurate attribution but requires significant data volume.",
                  pros: "Most accurate, based on your real data",
                  cons: "Requires large data sets, complex to implement"
                }
              ].map((model, index) => (
                <motion.div
                  key={model.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="p-6 rounded-2xl bg-card border border-border/50 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center flex-shrink-0">
                      <model.icon className="w-6 h-6 text-purple-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">{model.title}</h3>
                      <p className="text-muted-foreground mb-4">{model.description}</p>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="text-green-400 font-medium">Pros:</span>
                          <span className="text-muted-foreground">{model.pros}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-amber-400 font-medium">Cons:</span>
                          <span className="text-muted-foreground">{model.cons}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Implementation Best Practices Section */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <SectionHeading
                badge="Implementation Guide"
                title="How to Implement Effective Revenue Tracking"
                titleGradient="Implement"
                centered={false}
              />

              <div className="mt-12 space-y-8">
                {[
                  {
                    title: "Establish a Single Source of Truth",
                    content: "Revenue attribution requires clean, unified data. Choose a CRM like LeadFlow as your central repository for all customer interactions and revenue data. Ensure every touchpoint - from marketing automation to sales activities - flows into this central system with consistent tracking parameters and lead source identification."
                  },
                  {
                    title: "Implement Comprehensive Tracking",
                    content: "Deploy tracking across all customer touchpoints. This includes UTM parameters on all marketing links, call tracking for phone conversions, form submissions with source attribution, and detailed activity logging by your sales team. The more touchpoints you capture, the more accurate your attribution becomes."
                  },
                  {
                    title: "Define Clear Attribution Rules",
                    content: "Document your attribution methodology and ensure all stakeholders understand and agree to it. Define lookback windows (how far back do you credit touchpoints?), handle multi-touch scenarios consistently, and establish rules for edge cases. Consistency is more important than perfection."
                  },
                  {
                    title: "Connect Revenue to Activities",
                    content: "The magic happens when you can trace a closed deal back through every interaction. LeadFlow automatically creates this connection, linking closed revenue to the original lead source, every marketing touchpoint, and all sales activities. This complete picture enables true ROI calculation."
                  },
                  {
                    title: "Report and Iterate",
                    content: "Revenue attribution isn't a set-it-and-forget-it exercise. Regularly review attribution reports with marketing and sales leadership, question anomalies, and refine your model over time. As your business and customer journey evolve, your attribution approach should too."
                  }
                ].map((practice, index) => (
                  <motion.div
                    key={practice.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-purple-500" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{practice.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{practice.content}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Key Metrics Section */}
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <SectionHeading
                badge="Revenue Metrics"
                title="Essential Revenue Metrics to Track"
                titleGradient="Revenue Metrics"
                centered={false}
              />

              <div className="mt-8 prose prose-lg dark:prose-invert max-w-none">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Beyond attribution, successful revenue teams track a comprehensive set of metrics that provide visibility into revenue health, growth trajectory, and operational efficiency.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mt-12">
                {[
                  {
                    title: "Monthly Recurring Revenue (MRR)",
                    description: "The predictable revenue generated each month from subscriptions and contracts. Track new MRR, expansion MRR, contraction MRR, and churned MRR separately."
                  },
                  {
                    title: "Annual Contract Value (ACV)",
                    description: "The average annualized revenue per customer contract. ACV trends reveal whether you're moving upmarket, expanding accounts, or facing pricing pressure."
                  },
                  {
                    title: "Customer Acquisition Cost (CAC)",
                    description: "Total sales and marketing spend divided by new customers acquired. Compare CAC to customer lifetime value for unit economics insight."
                  },
                  {
                    title: "Revenue by Source",
                    description: "Attribution at the channel level shows which acquisition channels generate the most revenue, enabling informed budget allocation decisions."
                  },
                  {
                    title: "Sales Velocity",
                    description: "Measures how quickly you generate revenue: (Opportunities x Win Rate x Average Deal Size) / Sales Cycle Length. Improving any component accelerates growth."
                  },
                  {
                    title: "Net Revenue Retention",
                    description: "Revenue from existing customers compared to the prior period, accounting for expansion, contraction, and churn. Above 100% indicates organic growth from your customer base."
                  }
                ].map((metric, index) => (
                  <motion.div
                    key={metric.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="p-6 rounded-2xl bg-card border border-border/50"
                  >
                    <h3 className="text-lg font-semibold mb-2">{metric.title}</h3>
                    <p className="text-muted-foreground">{metric.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative max-w-4xl mx-auto"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 via-cyan-500/20 to-blue-500/20 rounded-3xl blur-2xl opacity-60" />

              <div className="relative p-8 lg:p-12 rounded-2xl bg-card/50 border border-border/50 text-center">
                <PieChart className="w-12 h-12 text-purple-500 mx-auto mb-6" />
                <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                  Get Complete <GradientText>Revenue Visibility</GradientText>
                </h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  LeadFlow automatically tracks every touchpoint and attributes revenue to its true sources. Stop guessing where your revenue comes from and start making data-driven investment decisions.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href="/handler/sign-up">
                    <GlowButton size="lg">Start Your Free Trial</GlowButton>
                  </Link>
                  <Link href="/resources/sales-analytics/analytics-dashboards" className="text-muted-foreground hover:text-foreground transition-colors">
                    Learn about analytics dashboards →
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Related Resources */}
        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Related Resources"
              title="Continue Learning About Sales Analytics"
              titleGradient="Learning"
            />

            <div className="grid md:grid-cols-3 gap-6 mt-12 max-w-5xl mx-auto">
              {[
                {
                  title: "Sales Conversion Metrics That Matter",
                  description: "Understand the funnel metrics that drive your revenue growth.",
                  href: "/resources/sales-analytics/conversion-metrics"
                },
                {
                  title: "Measuring Sales Team Performance",
                  description: "Evaluate individual and team contribution to revenue goals.",
                  href: "/resources/sales-analytics/team-performance"
                },
                {
                  title: "Building Effective Sales Dashboards",
                  description: "Create visualizations that drive action and accountability.",
                  href: "/resources/sales-analytics/analytics-dashboards"
                }
              ].map((resource, index) => (
                <motion.div
                  key={resource.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link
                    href={resource.href}
                    className="block p-6 rounded-2xl bg-card border border-border/50 hover:border-purple-500/30 transition-colors h-full"
                  >
                    <h3 className="text-lg font-semibold mb-2">{resource.title}</h3>
                    <p className="text-muted-foreground mb-4">{resource.description}</p>
                    <span className="text-purple-400 text-sm font-medium">Read more →</span>
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
