"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  TrendingUp,
  DollarSign,
  BarChart3,
  ArrowRight,
  Target,
  CheckCircle2,
  PieChart,
  LineChart,
  Percent,
  Zap,
  Package,
} from "lucide-react";
import {
  LandingHeader,
  LandingFooter,
  GlowButton,
  GradientText,
  SectionHeading,
} from "@/components/landing";

export default function EcommerceConversionTrackingPage() {
  const linkedTopics = [
    {
      title: "E-commerce Lead Management",
      description: "Specialized strategies for capturing and converting online shoppers into loyal customers.",
      href: "/resources/industry-solutions/ecommerce-leads",
      icon: ShoppingCart,
      pillar: "Industry Solutions",
    },
    {
      title: "Conversion Metrics",
      description: "Track and analyze the metrics that matter most for turning leads into paying customers.",
      href: "/resources/sales-analytics/conversion-metrics",
      icon: Percent,
      pillar: "Sales Analytics",
    },
    {
      title: "Revenue Tracking",
      description: "Monitor revenue performance, track deal values, and forecast future earnings accurately.",
      href: "/resources/sales-analytics/revenue-tracking",
      icon: DollarSign,
      pillar: "Sales Analytics",
    },
    {
      title: "Sales Reporting",
      description: "Generate comprehensive sales reports that drive data-informed business decisions.",
      href: "/resources/sales-analytics/sales-reporting",
      icon: BarChart3,
      pillar: "Sales Analytics",
    },
  ];

  const relatedTopics = [
    {
      title: "Analytics Dashboards",
      href: "/resources/sales-analytics/analytics-dashboards",
    },
    {
      title: "Team Performance",
      href: "/resources/sales-analytics/team-performance",
    },
    {
      title: "Lead Segmentation",
      href: "/resources/contact-management/lead-segmentation",
    },
    {
      title: "Pipeline Management",
      href: "/resources/pipeline-management/kanban-boards",
    },
  ];

  const benefits = [
    {
      icon: LineChart,
      title: "Real-Time Insights",
      description: "Monitor conversion rates and revenue as they happen, enabling quick response to trends.",
    },
    {
      icon: Target,
      title: "Attribution Clarity",
      description: "Understand exactly which channels and touchpoints drive conversions and revenue.",
    },
    {
      icon: PieChart,
      title: "Customer Journey Mapping",
      description: "Visualize the complete path from first touch to purchase for optimization opportunities.",
    },
    {
      icon: TrendingUp,
      title: "Predictive Revenue",
      description: "Forecast future revenue based on current pipeline and historical conversion data.",
    },
  ];

  const metrics = [
    {
      metric: "Cart Abandonment Rate",
      description: "Track how many shoppers leave items in their cart and implement recovery strategies.",
      improvement: "35% recovery possible",
    },
    {
      metric: "Customer Lifetime Value",
      description: "Calculate the total value a customer brings over their entire relationship with your store.",
      improvement: "2.5x with proper tracking",
    },
    {
      metric: "Average Order Value",
      description: "Monitor and optimize the average purchase amount to maximize revenue per transaction.",
      improvement: "23% increase average",
    },
    {
      metric: "Conversion Rate by Source",
      description: "Compare performance across traffic sources to allocate marketing budget effectively.",
      improvement: "40% better ROI",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
        <LandingHeader />

        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          {/* Background Effects - Orange Gradient */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl" />
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <div className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Crossover Topic
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                <GradientText className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 bg-clip-text text-transparent">E-commerce Conversion</GradientText> Tracking Mastery
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Unite e-commerce expertise with powerful analytics to track every conversion,
                optimize every funnel, and maximize revenue from your online store.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/handler/sign-up">
                  <GlowButton size="lg">
                    Start Tracking Conversions
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </GlowButton>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Why This Matters Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Why It Matters"
              title="The E-commerce Analytics Advantage"
              titleGradient="Analytics Advantage"
              description="Understanding your conversion data is the key to scaling your e-commerce business profitably."
            />

            <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 rounded-2xl bg-background border border-border hover:border-orange-500/50 transition-all hover:shadow-lg hover:shadow-orange-500/10"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center mb-4">
                    <benefit.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Linked Topics Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Explore Topics"
              title="Essential Resources for E-commerce Success"
              titleGradient="E-commerce Success"
              description="Master these interconnected topics to build a data-driven e-commerce operation."
            />

            <div className="mt-16 grid md:grid-cols-2 gap-8">
              {linkedTopics.map((topic, index) => (
                <Link key={index} href={topic.href}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group p-8 rounded-2xl bg-muted/50 border border-border hover:border-orange-500/50 transition-all hover:shadow-lg hover:shadow-orange-500/10 h-full"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center flex-shrink-0">
                        <topic.icon className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <span className="text-xs font-medium text-orange-400 uppercase tracking-wider">
                          {topic.pillar}
                        </span>
                        <h3 className="text-xl font-bold mt-1 mb-2 group-hover:text-orange-400 transition-colors">
                          {topic.title}
                        </h3>
                        <p className="text-muted-foreground mb-4">{topic.description}</p>
                        <span className="text-orange-500 text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                          Read more <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Key Metrics Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Key Metrics"
              title="Essential E-commerce Metrics to Track"
              titleGradient="Essential Metrics"
              description="Focus on these critical metrics to understand and improve your store's performance."
            />

            <div className="mt-16 grid md:grid-cols-2 gap-6">
              {metrics.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 rounded-2xl bg-background border border-border hover:border-orange-500/50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-semibold">{item.metric}</h3>
                    <span className="text-xs font-medium px-3 py-1 rounded-full bg-orange-500/10 text-orange-400">
                      {item.improvement}
                    </span>
                  </div>
                  <p className="text-muted-foreground">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Best Practices Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Best Practices"
              title="Conversion Tracking Best Practices"
              titleGradient="Best Practices"
              description="Implement these strategies to get the most out of your e-commerce analytics."
            />

            <div className="mt-16 space-y-6">
              {[
                {
                  title: "Set Up End-to-End Tracking",
                  description: "Track the complete customer journey from first ad click to post-purchase behavior. Use UTM parameters, pixel tracking, and CRM integration to create a unified view of each customer's path to purchase.",
                },
                {
                  title: "Segment Your Conversion Data",
                  description: "Break down conversions by traffic source, device type, customer segment, and product category. This granular view reveals optimization opportunities that aggregate data would hide.",
                },
                {
                  title: "Monitor Micro-Conversions",
                  description: "Track intermediate actions like email signups, wishlist additions, and product views. These leading indicators help predict and improve final purchase conversions.",
                },
                {
                  title: "Automate Reporting and Alerts",
                  description: "Set up automated dashboards and alerts for key metrics. Get notified immediately when conversion rates drop or revenue targets are exceeded so you can respond quickly.",
                },
              ].map((practice, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex gap-4 p-6 rounded-2xl bg-muted/50 border border-border"
                >
                  <div className="flex-shrink-0">
                    <CheckCircle2 className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{practice.title}</h3>
                    <p className="text-muted-foreground">{practice.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Related Topics Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Related Topics"
              title="Expand Your E-commerce Knowledge"
              titleGradient="E-commerce Knowledge"
              description="Explore these related resources to further optimize your online store."
            />

            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedTopics.map((topic, index) => (
                <Link key={index} href={topic.href}>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="p-4 rounded-xl bg-background border border-border hover:border-orange-500/50 transition-all text-center"
                  >
                    <span className="text-sm font-medium hover:text-orange-400 transition-colors">
                      {topic.title}
                    </span>
                  </motion.div>
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
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center mx-auto mb-6">
                <Package className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Maximize Your{" "}
                <GradientText className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 bg-clip-text text-transparent">E-commerce Revenue?</GradientText>
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Join thousands of e-commerce businesses using LeadFlow to track conversions,
                analyze customer behavior, and grow revenue. Start your free trial today.
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
                No credit card required. 14-day free trial with full access.
              </p>
            </motion.div>
          </div>
        </section>

        <LandingFooter />
    </div>
  );
}
