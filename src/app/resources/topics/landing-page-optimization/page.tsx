"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Layout,
  BarChart3,
  CheckCircle2,
  ArrowRight,
  MousePointer,
  FileText,
  TrendingUp,
  Target,
  Percent,
  LineChart,
} from "lucide-react";
import {
  LandingHeader,
  LandingFooter,
  GlowButton,
  GradientText,
} from "@/components/landing";

const relatedTopics = [
  {
    title: "Automated Deal Tracking",
    description: "Combine automation with CRM best practices for seamless deals",
    href: "/resources/topics/automated-deal-tracking",
    gradient: "from-yellow-500 to-orange-500",
  },
  {
    title: "Contact Import Automation",
    description: "Streamline contact imports with automated workflows",
    href: "/resources/topics/contact-import-automation",
    gradient: "from-rose-500 to-pink-500",
  },
  {
    title: "Permission-Based Analytics",
    description: "Team permissions combined with performance analytics",
    href: "/resources/topics/permission-based-analytics",
    gradient: "from-violet-500 to-purple-500",
  },
];

const linkedResources = [
  {
    title: "Landing Pages",
    description: "Build high-converting landing pages for lead capture",
    href: "/resources/lead-generation/landing-pages",
    icon: Layout,
    pillar: "Lead Generation",
  },
  {
    title: "Form Optimization",
    description: "Optimize forms to maximize submission rates",
    href: "/resources/lead-generation/form-optimization",
    icon: FileText,
    pillar: "Lead Generation",
  },
  {
    title: "Conversion Metrics",
    description: "Track and improve your conversion funnel",
    href: "/resources/sales-analytics/conversion-metrics",
    icon: Percent,
    pillar: "Sales Analytics",
  },
  {
    title: "Sales Reporting",
    description: "Build reports that drive actionable insights",
    href: "/resources/sales-analytics/sales-reporting",
    icon: LineChart,
    pillar: "Sales Analytics",
  },
];

export default function LandingPageOptimizationPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
        <LandingHeader />

        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          {/* Background Effects - Blue Gradient */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <div className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/20">
                <Layout className="w-4 h-4 mr-2" />
                Lead Generation + Sales Analytics
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                Landing Page Optimization:{" "}
                <span className="bg-gradient-to-r from-blue-400 via-cyan-500 to-blue-600 bg-clip-text text-transparent">
                  Data-Driven Conversions
                </span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Combine powerful lead generation tactics with deep analytics to
                continuously improve your landing page performance. Learn how to
                use data to drive design decisions and maximize conversions.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/handler/sign-up">
                  <GlowButton size="lg">
                    Optimize Your Pages
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </GlowButton>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Value Proposition Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Design Meets{" "}
                <span className="bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">
                  Data
                </span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Great landing pages are not just designed; they are engineered.
                By combining creative best practices with rigorous analytics, you
                can systematically improve conversion rates and maximize ROI on
                every campaign.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: MousePointer,
                  title: "Behavior-Based Design",
                  description:
                    "Use scroll maps, click tracking, and session recordings to understand exactly how visitors interact with your pages.",
                },
                {
                  icon: Target,
                  title: "Conversion Optimization",
                  description:
                    "A/B test headlines, CTAs, forms, and layouts to find the combinations that drive the highest conversion rates.",
                },
                {
                  icon: TrendingUp,
                  title: "Continuous Improvement",
                  description:
                    "Build feedback loops between analytics and design to create pages that get better over time.",
                },
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-8 rounded-2xl bg-background border border-border hover:border-blue-500/50 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-6">
                    <benefit.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Key Concepts Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center mb-16"
            >
              <div className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/20">
                <BarChart3 className="w-4 h-4 mr-2" />
                Optimization Framework
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                The Analytics-Driven{" "}
                <span className="bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">
                  Optimization Loop
                </span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {[
                {
                  title: "Measure Everything",
                  description:
                    "Set up comprehensive tracking before launching any landing page. Track page views, scroll depth, form interactions, button clicks, and conversion events.",
                  points: [
                    "Page view and source tracking",
                    "Scroll depth monitoring",
                    "Form field interaction tracking",
                    "CTA click attribution",
                  ],
                },
                {
                  title: "Identify Drop-Off Points",
                  description:
                    "Use funnel analysis to understand where visitors abandon. Is it the headline, the form length, or the CTA? Data reveals the truth.",
                  points: [
                    "Funnel visualization",
                    "Form abandonment analysis",
                    "Bounce rate segmentation",
                    "Time-on-page metrics",
                  ],
                },
                {
                  title: "Test Systematically",
                  description:
                    "Run structured A/B tests on one element at a time. Headlines, images, form layouts, and CTAs all impact conversion rates differently.",
                  points: [
                    "Headline variation testing",
                    "CTA button experiments",
                    "Form length optimization",
                    "Social proof placement",
                  ],
                },
                {
                  title: "Iterate and Scale",
                  description:
                    "Apply winning variations, document learnings, and use insights to inform new page designs. What works on one page often works on others.",
                  points: [
                    "Winner implementation",
                    "Learning documentation",
                    "Cross-page application",
                    "Template optimization",
                  ],
                },
              ].map((concept, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-8 rounded-2xl bg-muted/50 border border-border"
                >
                  <h3 className="text-xl font-bold mb-4">{concept.title}</h3>
                  <p className="text-muted-foreground mb-6">{concept.description}</p>
                  <ul className="space-y-2">
                    {concept.points.map((point, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-blue-500" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Metrics Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Key Metrics to{" "}
                <span className="bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">
                  Track
                </span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Focus on metrics that directly impact your bottom line.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {[
                {
                  metric: "Conversion Rate",
                  description: "Percentage of visitors who complete the desired action",
                  benchmark: "2-5% average",
                },
                {
                  metric: "Bounce Rate",
                  description: "Visitors who leave without interacting",
                  benchmark: "40-60% typical",
                },
                {
                  metric: "Form Completion",
                  description: "Rate of visitors who finish your forms",
                  benchmark: "25-40% goal",
                },
                {
                  metric: "Cost Per Lead",
                  description: "Total spend divided by leads generated",
                  benchmark: "Varies by industry",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 rounded-2xl bg-background border border-border text-center"
                >
                  <h3 className="font-bold text-blue-500 mb-2">{item.metric}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                  <span className="text-xs bg-blue-500/10 text-blue-500 px-2 py-1 rounded-full">
                    {item.benchmark}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Related Resources Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Deep Dive Into{" "}
                <GradientText>Related Resources</GradientText>
              </h2>
              <p className="text-lg text-muted-foreground">
                Explore detailed guides on the individual topics that make up
                landing page optimization.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {linkedResources.map((resource, index) => (
                <Link key={index} href={resource.href}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="p-6 rounded-2xl bg-background border border-border hover:border-blue-500/50 transition-all hover:shadow-lg hover:shadow-blue-500/10 h-full"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                        <resource.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <span className="text-xs text-blue-500 font-medium">
                          {resource.pillar}
                        </span>
                        <h3 className="font-semibold mb-2">{resource.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          {resource.description}
                        </p>
                        <span className="text-blue-500 text-sm flex items-center gap-1">
                          Read guide <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
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
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Start Optimizing{" "}
                <span className="bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">
                  Today
                </span>
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Stop guessing what works. Start using data to drive landing page
                decisions and watch your conversion rates climb.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/handler/sign-up">
                  <GlowButton size="lg">
                    Start Free Trial
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </GlowButton>
                </Link>
              </div>
              <p className="mt-6 text-sm text-muted-foreground">
                14-day free trial. No credit card required. Cancel anytime.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Related Topics Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Explore{" "}
                <GradientText>Related Topics</GradientText>
              </h2>
              <p className="text-lg text-muted-foreground">
                Discover more crossover strategies that combine multiple disciplines
                for maximum impact.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {relatedTopics.map((topic, index) => (
                <Link key={index} href={topic.href}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="p-6 rounded-2xl bg-background border border-border hover:border-purple-500/50 transition-all hover:shadow-lg h-full"
                  >
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${topic.gradient} flex items-center justify-center mb-4`}>
                      <ArrowRight className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-semibold mb-2">{topic.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {topic.description}
                    </p>
                    <span className="text-purple-500 text-sm flex items-center gap-1">
                      Explore topic <ArrowRight className="w-3 h-3" />
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
