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
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  DollarSign,
  Target,
  BarChart3,
  RefreshCw,
  Zap,
  Brain,
  Eye,
  MousePointer,
  Clock,
  Layers,
  Settings,
} from "lucide-react";

export default function AdOptimizationPage() {
  return (
    <div className="min-h-screen bg-background">
      <LandingHeader />
      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-background to-background" />
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-green-500/30 rounded-full blur-[128px] animate-pulse" />
            <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-[128px] animate-pulse" />
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto text-center"
            >
              <span className="inline-flex items-center px-3 py-1 mb-6 text-sm font-medium rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                Meta Ads Integration
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
                Meta Ad Optimization for{" "}
                <GradientText>More Leads</GradientText>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Learn proven strategies to optimize your Facebook and Instagram
                ads for maximum lead generation. Reduce cost-per-lead, improve
                lead quality, and scale your campaigns profitably.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/handler/sign-up">
                  <GlowButton size="lg" className="group">
                    Optimize Your Campaigns
                    <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </GlowButton>
                </Link>
                <Link
                  href="/resources/meta-ads/audience-targeting"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Audience Targeting Guide →
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Key Metrics Section */}
        <section className="py-20 border-t border-border/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Performance Metrics"
              title="Key Metrics for Lead Ad Optimization"
              titleGradient="Lead Ad Optimization"
              description="Understanding these metrics is essential for making data-driven optimization decisions."
            />

            <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: DollarSign,
                  title: "Cost Per Lead (CPL)",
                  description:
                    "The average cost to acquire a single lead. Your primary efficiency metric for lead generation campaigns.",
                  benchmark: "Varies by industry: $5-50 B2C, $50-500+ B2B",
                },
                {
                  icon: MousePointer,
                  title: "Click-Through Rate (CTR)",
                  description:
                    "Percentage of people who click your ad after seeing it. Indicates creative and targeting relevance.",
                  benchmark: "Lead ads average: 0.8-1.5%",
                },
                {
                  icon: Target,
                  title: "Conversion Rate",
                  description:
                    "Percentage of clicks that result in form submissions. Measures form and offer effectiveness.",
                  benchmark: "Lead form average: 10-15%",
                },
                {
                  icon: TrendingUp,
                  title: "Lead Quality Score",
                  description:
                    "LeadFlow's AI-generated score predicting lead-to-customer conversion likelihood.",
                  benchmark: "Target: 60+ average score",
                },
              ].map((metric, index) => (
                <motion.div
                  key={metric.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-green-500/20 flex items-center justify-center mb-4">
                    <metric.icon className="w-5 h-5 text-purple-500" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{metric.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {metric.description}
                  </p>
                  <div className="text-xs text-purple-400 bg-purple-500/10 px-3 py-2 rounded-lg">
                    {metric.benchmark}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Campaign Structure Section */}
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
                  Optimal <GradientText>Campaign Structure</GradientText>
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  A well-organized campaign structure is the foundation of
                  successful optimization. Meta&apos;s algorithm performs best when
                  you give it clear signals and enough data to learn from. This
                  means consolidating your campaigns and allowing sufficient
                  budget for each ad set to exit the learning phase.
                </p>
                <p className="text-lg text-muted-foreground mb-6">
                  The recommended structure for lead generation follows the
                  Campaign Budget Optimization (CBO) approach, where you set
                  budgets at the campaign level and let Meta automatically
                  distribute spend to the best-performing ad sets.
                </p>
                <p className="text-lg text-muted-foreground">
                  Each ad set should receive at least 50 conversion events per
                  week to exit the learning phase and optimize effectively. If
                  you&apos;re not hitting this threshold, consider consolidating ad
                  sets or increasing budget.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative"
              >
                <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 via-green-500/20 to-blue-500/20 rounded-3xl blur-2xl opacity-60" />
                <div className="relative rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl p-8">
                  <h3 className="text-xl font-semibold mb-6">
                    Recommended Structure
                  </h3>
                  <div className="space-y-6">
                    <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
                      <div className="font-medium text-purple-400 mb-2">
                        Campaign Level
                      </div>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>- Lead Generation objective</li>
                        <li>- Campaign Budget Optimization ON</li>
                        <li>- Clear naming convention</li>
                      </ul>
                    </div>
                    <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                      <div className="font-medium text-blue-400 mb-2">
                        Ad Set Level
                      </div>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>- 2-4 ad sets per campaign max</li>
                        <li>- Distinct audience segments</li>
                        <li>- Consistent placement settings</li>
                      </ul>
                    </div>
                    <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                      <div className="font-medium text-green-400 mb-2">
                        Ad Level
                      </div>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>- 3-6 ad variations per ad set</li>
                        <li>- Mix of formats (image, video, carousel)</li>
                        <li>- Clear A/B test structure</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Creative Optimization Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Creative Strategy"
              title="Creative Optimization for Lead Ads"
              titleGradient="Creative Optimization"
              description="Your ad creative is the single biggest lever for improving performance. Here's how to optimize it."
            />

            <div className="mt-16 max-w-4xl mx-auto space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center flex-shrink-0">
                    <Eye className="w-6 h-6 text-purple-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Visual Creative Best Practices
                    </h3>
                    <p className="text-muted-foreground">
                      Your visuals must stop the scroll within the first second.
                      High-performing lead ad creatives share common characteristics
                      that you can apply to your campaigns.
                    </p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-green-500 mb-3">What Works</h4>
                    <ul className="space-y-2">
                      {[
                        "Bold, contrasting colors that pop",
                        "Real people and authentic imagery",
                        "Clear focal point with minimal clutter",
                        "Text overlays with value proposition",
                        "Movement (video, GIF, carousel)",
                        "Before/after comparisons",
                      ].map((item, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-purple-500 mb-3">Video Tips</h4>
                    <ul className="space-y-2">
                      {[
                        "Hook viewers in first 3 seconds",
                        "Design for sound-off viewing",
                        "Add captions to all videos",
                        "Keep videos under 30 seconds",
                        "End with clear call-to-action",
                        "Use native platform features",
                      ].map((item, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="p-8 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center flex-shrink-0">
                    <Layers className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Copy That Converts
                    </h3>
                    <p className="text-muted-foreground">
                      Your ad copy needs to quickly communicate value and motivate
                      action. The best lead ad copy follows a proven formula.
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-muted/30">
                    <h4 className="font-medium mb-2">The AIDA Framework</h4>
                    <div className="grid md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-purple-400 font-medium">Attention:</span>
                        <p className="text-muted-foreground mt-1">
                          Hook with a bold claim or question
                        </p>
                      </div>
                      <div>
                        <span className="text-blue-400 font-medium">Interest:</span>
                        <p className="text-muted-foreground mt-1">
                          Expand on the problem or opportunity
                        </p>
                      </div>
                      <div>
                        <span className="text-cyan-400 font-medium">Desire:</span>
                        <p className="text-muted-foreground mt-1">
                          Show the benefit or transformation
                        </p>
                      </div>
                      <div>
                        <span className="text-green-400 font-medium">Action:</span>
                        <p className="text-muted-foreground mt-1">
                          Clear, compelling call-to-action
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="p-8 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center flex-shrink-0">
                    <RefreshCw className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Creative Testing Framework
                    </h3>
                    <p className="text-muted-foreground">
                      Systematic testing is key to finding winning creatives. Test
                      one variable at a time to understand what drives performance.
                    </p>
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-3">
                      Test First (High Impact)
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li className="text-foreground">Visual creative/format</li>
                      <li className="text-foreground">Value proposition</li>
                      <li className="text-foreground">Offer/incentive</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-3">
                      Test Second (Medium Impact)
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li className="text-foreground">Headline variations</li>
                      <li className="text-foreground">Primary text length</li>
                      <li className="text-foreground">Call-to-action button</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-3">
                      Test Third (Lower Impact)
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li className="text-foreground">Description text</li>
                      <li className="text-foreground">Link display text</li>
                      <li className="text-foreground">Minor copy tweaks</li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Bidding & Budget Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Budget Strategy"
              title="Bidding and Budget Optimization"
              titleGradient="Budget Optimization"
              description="Strategic budget allocation and bidding can significantly impact your cost-per-lead and overall campaign efficiency."
            />

            <div className="mt-16 grid md:grid-cols-2 gap-8">
              {[
                {
                  icon: DollarSign,
                  title: "Budget Allocation Strategy",
                  description:
                    "Start with 70% of budget on proven audiences and creatives, 30% on testing new variations. As winners emerge, reallocate testing budget to scaling proven performers.",
                  tips: [
                    "Set daily budgets 3x your target CPL minimum",
                    "Use Campaign Budget Optimization for efficiency",
                    "Avoid budget changes larger than 20% at once",
                    "Allow 3-7 days after changes before evaluating",
                  ],
                },
                {
                  icon: Target,
                  title: "Bidding Strategy Selection",
                  description:
                    "Choose between Lowest Cost (volume) and Cost Cap (efficiency) based on your goals. Cost Cap helps maintain profitability while Lowest Cost maximizes lead volume.",
                  tips: [
                    "Start with Lowest Cost to gather data",
                    "Switch to Cost Cap once you know your target CPL",
                    "Set cost caps 10-20% above current CPL",
                    "Use Bid Cap only for strict budget constraints",
                  ],
                },
                {
                  icon: Clock,
                  title: "Scheduling Optimization",
                  description:
                    "Analyze when your leads convert best and adjust ad scheduling accordingly. LeadFlow's analytics show lead quality by time of day and day of week.",
                  tips: [
                    "Run ads 24/7 initially to gather data",
                    "Identify peak conversion hours from CRM data",
                    "Increase bids during high-value time periods",
                    "Consider time zones for national campaigns",
                  ],
                },
                {
                  icon: TrendingUp,
                  title: "Scaling Strategies",
                  description:
                    "Scale winning campaigns gradually to maintain performance. Aggressive scaling often triggers the learning phase and temporarily hurts results.",
                  tips: [
                    "Increase budgets by 20% every 3-5 days",
                    "Duplicate successful ad sets for faster scaling",
                    "Expand audiences horizontally before vertically",
                    "Monitor frequency to avoid ad fatigue",
                  ],
                },
              ].map((strategy, index) => (
                <motion.div
                  key={strategy.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-8 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-green-500/20 flex items-center justify-center mb-4">
                    <strategy.icon className="w-6 h-6 text-purple-500" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{strategy.title}</h3>
                  <p className="text-muted-foreground mb-6">{strategy.description}</p>
                  <ul className="space-y-2">
                    {strategy.tips.map((tip, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* LeadFlow Analytics Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Advanced Analytics"
              title="Optimize with LeadFlow Analytics"
              titleGradient="LeadFlow Analytics"
              description="Go beyond Meta's native reporting with LeadFlow's revenue-based optimization insights."
            />

            <div className="mt-16 grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Brain,
                  title: "AI-Powered Attribution",
                  description:
                    "LeadFlow tracks leads from first click to closed deal, giving you true cost-per-customer data by campaign, ad set, and ad. Optimize based on revenue, not just lead volume.",
                },
                {
                  icon: BarChart3,
                  title: "Quality Score Analytics",
                  description:
                    "See which campaigns generate high-scoring leads versus low-quality submissions. Shift budget toward campaigns that produce leads your sales team can actually close.",
                },
                {
                  icon: Zap,
                  title: "Real-Time Alerts",
                  description:
                    "Get notified when campaigns underperform or when winning ad sets emerge. LeadFlow monitors your campaigns 24/7 and alerts you to take action.",
                },
                {
                  icon: RefreshCw,
                  title: "Automated Audience Sync",
                  description:
                    "Automatically exclude converted leads and customers from acquisition campaigns. Create lookalike audiences from your best customers without manual exports.",
                },
                {
                  icon: Settings,
                  title: "Custom Dashboards",
                  description:
                    "Build dashboards that combine Meta ad data with CRM metrics. See the full picture from impression to revenue in a single view.",
                },
                {
                  icon: TrendingUp,
                  title: "Predictive Analytics",
                  description:
                    "LeadFlow's AI predicts which leads are most likely to convert based on historical patterns. Focus your optimization efforts on what actually drives revenue.",
                },
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-purple-500/30 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-purple-500" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative max-w-4xl mx-auto"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 via-green-500/20 to-blue-500/20 rounded-3xl blur-2xl opacity-60" />
              <div className="relative p-12 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Start Optimizing Your{" "}
                  <GradientText>Meta Ads Today</GradientText>
                </h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Connect your Meta Ads to LeadFlow and unlock revenue-based
                  optimization insights. See which campaigns actually drive
                  customers, not just leads.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href="/handler/sign-up">
                    <GlowButton size="lg" className="group">
                      Start Free Trial
                      <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </GlowButton>
                  </Link>
                  <Link
                    href="/resources/meta-ads/facebook-lead-ads"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Facebook Lead Ads Guide →
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Related Resources */}
        <section className="py-20 border-t border-border/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-8 text-center">
              Related Resources
            </h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                {
                  title: "Audience Targeting Guide",
                  description:
                    "Master Meta's targeting options for better lead quality.",
                  href: "/resources/meta-ads/audience-targeting",
                },
                {
                  title: "Meta Lead Form Optimization",
                  description:
                    "Create high-converting forms that capture quality leads.",
                  href: "/resources/meta-ads/meta-lead-forms",
                },
                {
                  title: "Instagram Lead Generation",
                  description:
                    "Strategies specifically for Instagram lead campaigns.",
                  href: "/resources/meta-ads/instagram-lead-generation",
                },
              ].map((resource) => (
                <Link
                  key={resource.title}
                  href={resource.href}
                  className="p-6 rounded-xl border border-border/50 bg-card/50 hover:border-purple-500/30 transition-colors group"
                >
                  <h3 className="font-semibold mb-2 group-hover:text-purple-400 transition-colors">
                    {resource.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {resource.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <LandingFooter />
    </div>
  );
}
