"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Rocket,
  Users,
  BarChart3,
  Mail,
  TrendingUp,
  Repeat,
  FileText,
  Clock,
  Target,
  CheckCircle,
  ArrowRight,
  Star,
  DollarSign,
  Layers,
  Zap,
  LineChart,
  RefreshCcw,
  Gauge,
} from "lucide-react";
import {
  LandingHeader,
  LandingFooter,
  GlowButton,
  GradientText,
  SectionHeading,
} from "@/components/landing";

export default function SaaSSalesPage() {
  return (
    <div className="min-h-screen bg-background">
      <LandingHeader />
      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <div className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                <Rocket className="w-4 h-4 mr-2" />
                SaaS Sales Solution
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                The Modern{" "}
                <GradientText>CRM for SaaS Sales Teams</GradientText>{" "}
                Built for Recurring Revenue
              </h1>

              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                LeadFlow helps SaaS companies accelerate their sales pipeline, track
                MRR growth, and manage the entire subscription lifecycle. Close more
                deals and reduce churn with intelligent automation.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/handler/sign-up">
                  <GlowButton size="lg">
                    Start Free Trial
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </GlowButton>
                </Link>
                <Link href="/#features">
                  <GlowButton variant="secondary" size="lg">
                    See All Features
                  </GlowButton>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Pain Points Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="The Challenge"
              title="Why SaaS Sales Teams Need a Specialized CRM"
              titleGradient="Specialized CRM"
              description="Traditional CRMs weren't built for the SaaS business model. You need tools that understand recurring revenue and subscription dynamics."
            />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {[
                {
                  icon: RefreshCcw,
                  title: "Complex Subscription Lifecycles",
                  description:
                    "SaaS sales don't end at the first purchase. From trials to conversions, upgrades to renewals, you need to track every stage of the customer journey. Missing renewal opportunities or upgrade signals costs real revenue.",
                },
                {
                  icon: LineChart,
                  title: "MRR and Revenue Tracking",
                  description:
                    "Your board wants to see MRR, ARR, churn rate, and LTV metrics. Generic CRMs force you to build complicated workarounds or maintain separate spreadsheets that quickly become outdated and unreliable.",
                },
                {
                  icon: Clock,
                  title: "Long Enterprise Sales Cycles",
                  description:
                    "Enterprise SaaS deals involve multiple stakeholders, security reviews, and procurement processes that can span months. Without proper pipeline management, deals stall and forecasts become unreliable.",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 rounded-2xl bg-background border border-border hover:border-purple-500/50 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="LeadFlow Features"
              title="Everything Your SaaS Sales Team Needs"
              titleGradient="SaaS Sales Team"
              description="LeadFlow provides specialized tools for SaaS companies to manage pipelines, track metrics, and accelerate revenue growth."
            />

            <div className="grid lg:grid-cols-2 gap-12 mt-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                {[
                  {
                    icon: Gauge,
                    title: "MRR and ARR Dashboard",
                    description:
                      "Track your monthly and annual recurring revenue in real-time. See new MRR, expansion revenue, churn, and net revenue retention at a glance. Export investor-ready reports with a single click.",
                  },
                  {
                    icon: Mail,
                    title: "Automated Outreach Sequences",
                    description:
                      "Build multi-touch email and call sequences for different prospect segments. Personalize at scale with dynamic fields and behavioral triggers. Pause sequences automatically when prospects engage.",
                  },
                  {
                    icon: Repeat,
                    title: "Trial and Conversion Tracking",
                    description:
                      "Monitor trial users from signup to conversion. Set up automated engagement based on product usage signals. Identify at-risk trials before they expire and trigger intervention sequences.",
                  },
                  {
                    icon: Target,
                    title: "Lead Scoring for SaaS",
                    description:
                      "Our AI analyzes firmographic data, engagement patterns, and product usage to score leads. Prioritize accounts most likely to convert and identify expansion opportunities within existing customers.",
                  },
                ].map((feature, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{feature.title}</h3>
                      <p className="text-muted-foreground text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/30 p-8 flex items-center justify-center">
                  <div className="text-center">
                    <TrendingUp className="w-24 h-24 mx-auto text-purple-400 mb-4" />
                    <p className="text-2xl font-bold">
                      <GradientText>50% Faster Close Rate</GradientText>
                    </p>
                    <p className="text-muted-foreground">
                      Average improvement for SaaS teams using LeadFlow
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Pipeline Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Pipeline Management"
              title="Built for the SaaS Sales Process"
              titleGradient="SaaS Sales Process"
              description="Every stage of your SaaS pipeline is covered, from initial lead to expansion revenue."
            />

            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 mt-12">
              {[
                {
                  stage: "Lead",
                  description: "Capture from website, product trials, and marketing campaigns",
                  color: "from-blue-500/20 to-blue-600/20",
                },
                {
                  stage: "Qualified",
                  description: "Score and qualify based on ICP fit and engagement",
                  color: "from-purple-500/20 to-purple-600/20",
                },
                {
                  stage: "Demo",
                  description: "Schedule and track product demonstrations",
                  color: "from-pink-500/20 to-pink-600/20",
                },
                {
                  stage: "Proposal",
                  description: "Manage proposals, negotiations, and procurement",
                  color: "from-orange-500/20 to-orange-600/20",
                },
                {
                  stage: "Closed Won",
                  description: "Track wins, MRR, and handoff to customer success",
                  color: "from-green-500/20 to-green-600/20",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-4 rounded-xl bg-gradient-to-br ${item.color} border border-border`}
                >
                  <h3 className="font-semibold mb-2">{item.stage}</h3>
                  <p className="text-xs text-muted-foreground">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Metrics Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="SaaS Metrics"
              title="Track the Metrics That Matter"
              titleGradient="Metrics That Matter"
              description="LeadFlow automatically calculates and tracks the KPIs your investors and leadership team care about."
            />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {[
                {
                  icon: DollarSign,
                  title: "Monthly Recurring Revenue (MRR)",
                  description:
                    "Real-time MRR tracking with breakdown by new, expansion, contraction, and churned revenue. See your growth trajectory and identify trends before they impact your bottom line.",
                },
                {
                  icon: TrendingUp,
                  title: "Annual Recurring Revenue (ARR)",
                  description:
                    "Annualized view of your recurring revenue with projections based on current pipeline and historical conversion rates. Perfect for board presentations and investor updates.",
                },
                {
                  icon: RefreshCcw,
                  title: "Net Revenue Retention (NRR)",
                  description:
                    "Track how much revenue you retain and expand from existing customers. Benchmark against industry standards and identify accounts at risk of churn or ripe for expansion.",
                },
                {
                  icon: Users,
                  title: "Customer Lifetime Value (LTV)",
                  description:
                    "Calculate LTV by segment, plan type, and acquisition channel. Understand which customers are most valuable and optimize your sales efforts accordingly.",
                },
                {
                  icon: BarChart3,
                  title: "Sales Velocity",
                  description:
                    "Measure how quickly deals move through your pipeline. Identify bottlenecks, optimize your sales process, and forecast revenue more accurately.",
                },
                {
                  icon: Zap,
                  title: "Conversion Rates",
                  description:
                    "Track conversion at every stage from trial to paid, SMB to enterprise, and month-to-month to annual. Spot opportunities to improve your funnel efficiency.",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 rounded-2xl bg-muted/50 border border-border hover:border-purple-500/50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4">
                    <item.icon className="w-5 h-5 text-purple-400" />
                  </div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <div className="p-8 md:p-12 rounded-2xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-yellow-400"
                    />
                  ))}
                </div>
                <blockquote className="text-xl md:text-2xl font-medium mb-6">
                  "LeadFlow gave us visibility into our pipeline we never had
                  before. Our sales velocity improved by 50%, and we finally have
                  accurate MRR forecasts for our board. It's become the single
                  source of truth for our revenue team."
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold">
                    JC
                  </div>
                  <div>
                    <p className="font-semibold">Jennifer Chen</p>
                    <p className="text-sm text-muted-foreground">
                      VP of Sales, CloudStack Inc. | Series B SaaS
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Results Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Results"
              title="What SaaS Sales Teams Achieve with LeadFlow"
              titleGradient="LeadFlow"
              description="Join hundreds of SaaS companies that have accelerated their growth with LeadFlow."
            />

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
              {[
                {
                  icon: Rocket,
                  metric: "50%",
                  label: "Faster Deal Velocity",
                  description:
                    "Average improvement in time from lead to closed deal for SaaS teams using LeadFlow.",
                },
                {
                  icon: DollarSign,
                  metric: "40%",
                  label: "MRR Growth",
                  description:
                    "Average increase in monthly recurring revenue within the first year.",
                },
                {
                  icon: RefreshCcw,
                  metric: "25%",
                  label: "Reduced Churn",
                  description:
                    "Better customer visibility leads to proactive retention and lower churn rates.",
                },
                {
                  icon: Target,
                  metric: "3x",
                  label: "Trial Conversions",
                  description:
                    "Triple your free trial to paid conversion rate with automated engagement.",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center p-6 rounded-2xl bg-muted/50 border border-border"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-4xl font-bold mb-1">
                    <GradientText>{item.metric}</GradientText>
                  </p>
                  <p className="font-semibold mb-2">{item.label}</p>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Integration Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Integrates with Your{" "}
                  <GradientText>SaaS Tech Stack</GradientText>
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  LeadFlow connects seamlessly with the tools your SaaS team already
                  uses. Sync product data, automate workflows, and create a unified
                  view of your customer journey.
                </p>
                <ul className="space-y-3">
                  {[
                    "Stripe, Chargebee, and billing platforms for revenue sync",
                    "Segment, Mixpanel, and product analytics integration",
                    "Intercom, Zendesk, and support tools connection",
                    "Slack, Zoom, and communication platform sync",
                    "Salesforce and HubSpot migration and sync available",
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="grid grid-cols-3 gap-4"
              >
                {[
                  "Stripe",
                  "Segment",
                  "Intercom",
                  "Slack",
                  "Chargebee",
                  "Mixpanel",
                  "Zendesk",
                  "Zoom",
                  "Zapier",
                ].map((tool, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-xl bg-background border border-border flex items-center justify-center text-sm font-medium"
                  >
                    {tool}
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                Ready to Accelerate Your{" "}
                <GradientText>SaaS Revenue</GradientText>?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Join hundreds of SaaS companies using LeadFlow to manage their
                pipeline, track key metrics, and grow their recurring revenue. Start
                your free trial today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/handler/sign-up">
                  <GlowButton size="lg">
                    Start Your Free Trial
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </GlowButton>
                </Link>
                <Link href="/#pricing">
                  <GlowButton variant="secondary" size="lg">
                    View Pricing
                  </GlowButton>
                </Link>
              </div>
              <p className="text-sm text-muted-foreground mt-6">
                No credit card required. 14-day free trial. Cancel anytime.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Related Resources */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Related Resources"
              title="Explore More LeadFlow Solutions"
              description="Discover how LeadFlow helps professionals across different industries manage leads and close deals."
            />

            <div className="grid md:grid-cols-3 gap-6 mt-12">
              {[
                {
                  title: "CRM for Marketing Agencies",
                  href: "/resources/industry-solutions/agency-crm",
                  description:
                    "Manage client relationships and campaign leads with ease.",
                },
                {
                  title: "Lead Management for E-commerce",
                  href: "/resources/industry-solutions/ecommerce-leads",
                  description:
                    "Convert website visitors into loyal customers.",
                },
                {
                  title: "CRM for Consultants",
                  href: "/resources/industry-solutions/consultant-crm",
                  description:
                    "Track prospects and projects from first contact to completion.",
                },
              ].map((resource, index) => (
                <Link
                  key={index}
                  href={resource.href}
                  className="p-6 rounded-2xl bg-muted/50 border border-border hover:border-purple-500/50 transition-colors group"
                >
                  <h3 className="font-semibold mb-2 group-hover:text-purple-400 transition-colors">
                    {resource.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {resource.description}
                  </p>
                  <span className="inline-flex items-center text-sm text-purple-400 mt-4">
                    Learn more <ArrowRight className="ml-1 w-4 h-4" />
                  </span>
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
