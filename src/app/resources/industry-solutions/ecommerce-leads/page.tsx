"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  Users,
  BarChart3,
  Mail,
  TrendingUp,
  Package,
  Heart,
  Clock,
  Target,
  CheckCircle,
  ArrowRight,
  Star,
  DollarSign,
  Layers,
  Zap,
  Percent,
  Gift,
  RefreshCcw,
  Tag,
} from "lucide-react";
import {
  LandingHeader,
  LandingFooter,
  GlowButton,
  GradientText,
  SectionHeading,
} from "@/components/landing";

export default function EcommerceLeadsPage() {
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
                <ShoppingCart className="w-4 h-4 mr-2" />
                E-commerce Solution
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                Powerful{" "}
                <GradientText>Lead Management for E-commerce</GradientText>{" "}
                That Maximizes Revenue
              </h1>

              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                LeadFlow helps e-commerce businesses capture more leads, recover
                abandoned carts, and turn one-time buyers into loyal repeat
                customers. Increase your customer lifetime value with intelligent
                automation.
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
              title="Why E-commerce Needs Specialized Lead Management"
              titleGradient="Lead Management"
              description="Generic CRMs don't understand the e-commerce customer journey. You need tools designed for online retail."
            />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {[
                {
                  icon: ShoppingCart,
                  title: "Abandoned Cart Recovery",
                  description:
                    "The average cart abandonment rate is over 70%. Without automated recovery sequences, you're leaving massive revenue on the table every single day. Most visitors who abandon won't return without intervention.",
                },
                {
                  icon: Users,
                  title: "Customer Segmentation at Scale",
                  description:
                    "With thousands of customers and countless purchase patterns, manual segmentation is impossible. Without proper segmentation, your marketing messages miss the mark and conversion rates suffer.",
                },
                {
                  icon: RefreshCcw,
                  title: "Repeat Purchase Optimization",
                  description:
                    "First-time buyers are expensive to acquire. The real profit comes from repeat customers, but keeping track of purchase cycles and re-engagement timing requires sophisticated automation.",
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
              title="Everything Your Online Store Needs to Thrive"
              titleGradient="Online Store"
              description="LeadFlow provides e-commerce-specific tools to capture leads, recover revenue, and build lasting customer relationships."
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
                    icon: ShoppingCart,
                    title: "Automated Cart Recovery",
                    description:
                      "Trigger personalized email sequences the moment a cart is abandoned. Include product images, discount incentives, and urgency messaging. Recover up to 15% of abandoned carts automatically.",
                  },
                  {
                    icon: Tag,
                    title: "Behavioral Segmentation",
                    description:
                      "Automatically segment customers based on purchase history, browsing behavior, email engagement, and predicted lifetime value. Send the right message to the right customer every time.",
                  },
                  {
                    icon: Gift,
                    title: "Loyalty and Rewards Integration",
                    description:
                      "Track customer loyalty points, VIP tiers, and reward eligibility. Trigger special offers for your best customers and re-engagement campaigns for lapsed buyers.",
                  },
                  {
                    icon: Target,
                    title: "Predictive Lead Scoring",
                    description:
                      "Our AI predicts which visitors are most likely to purchase based on browsing patterns, cart composition, and historical data. Focus your marketing spend on high-intent prospects.",
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
                    <DollarSign className="w-24 h-24 mx-auto text-purple-400 mb-4" />
                    <p className="text-2xl font-bold">
                      <GradientText>25% Revenue Increase</GradientText>
                    </p>
                    <p className="text-muted-foreground">
                      Average lift for e-commerce stores using LeadFlow
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Customer Journey Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Customer Journey"
              title="Engage Customers at Every Stage"
              titleGradient="Every Stage"
              description="LeadFlow automates personalized touchpoints throughout the entire e-commerce customer lifecycle."
            />

            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 mt-12">
              {[
                {
                  stage: "Browse",
                  description: "Capture visitor data and track browsing behavior",
                  color: "from-blue-500/20 to-blue-600/20",
                },
                {
                  stage: "Add to Cart",
                  description: "Monitor cart activity and trigger save reminders",
                  color: "from-purple-500/20 to-purple-600/20",
                },
                {
                  stage: "Purchase",
                  description: "Order confirmations, cross-sells, and thank you flows",
                  color: "from-pink-500/20 to-pink-600/20",
                },
                {
                  stage: "Post-Purchase",
                  description: "Review requests, usage tips, and support check-ins",
                  color: "from-orange-500/20 to-orange-600/20",
                },
                {
                  stage: "Repeat",
                  description: "Reorder reminders, loyalty rewards, and VIP offers",
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

        {/* Automation Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="E-commerce Automation"
              title="Pre-Built Workflows for Online Retail"
              titleGradient="Online Retail"
              description="Launch revenue-generating automations in minutes with our e-commerce-specific templates."
            />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {[
                {
                  icon: ShoppingCart,
                  title: "Abandoned Cart Series",
                  description:
                    "3-part email sequence triggered immediately after cart abandonment. Includes product reminder, discount offer, and urgency message. Average 15% recovery rate.",
                },
                {
                  icon: Package,
                  title: "Post-Purchase Flow",
                  description:
                    "Automated sequence starting with order confirmation, followed by shipping updates, delivery notification, and review request. Build trust and gather social proof.",
                },
                {
                  icon: Heart,
                  title: "Win-Back Campaign",
                  description:
                    "Re-engage customers who haven't purchased in 60-90 days. Personalized product recommendations, special discount, and reminder of what they're missing.",
                },
                {
                  icon: RefreshCcw,
                  title: "Replenishment Reminders",
                  description:
                    "Perfect for consumable products. Automatically remind customers to reorder based on typical usage cycles and their purchase history.",
                },
                {
                  icon: Star,
                  title: "VIP Customer Program",
                  description:
                    "Identify and nurture your best customers with exclusive offers, early access to sales, and personalized recommendations based on their preferences.",
                },
                {
                  icon: Percent,
                  title: "Browse Abandonment",
                  description:
                    "Trigger emails to visitors who browsed specific products but didn't add to cart. Feature the products they viewed with personalized recommendations.",
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
                  "LeadFlow's abandoned cart recovery alone paid for our annual
                  subscription in the first month. We're now recovering 18% of
                  abandoned carts and our customer lifetime value increased by 35%.
                  It's been transformational for our business."
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold">
                    AL
                  </div>
                  <div>
                    <p className="font-semibold">Amanda Liu</p>
                    <p className="text-sm text-muted-foreground">
                      Founder, Bloom Beauty | DTC E-commerce Brand
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
              title="What E-commerce Brands Achieve with LeadFlow"
              titleGradient="LeadFlow"
              description="Join hundreds of online stores that have boosted revenue and customer loyalty with LeadFlow."
            />

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
              {[
                {
                  icon: ShoppingCart,
                  metric: "15%",
                  label: "Cart Recovery Rate",
                  description:
                    "Average cart recovery rate from automated email sequences.",
                },
                {
                  icon: DollarSign,
                  metric: "25%",
                  label: "Revenue Increase",
                  description:
                    "Average lift in total revenue within 6 months of implementation.",
                },
                {
                  icon: RefreshCcw,
                  metric: "40%",
                  label: "Higher Repeat Rate",
                  description:
                    "Increase in repeat purchase rate through automated nurturing.",
                },
                {
                  icon: Heart,
                  metric: "35%",
                  label: "LTV Improvement",
                  description:
                    "Average increase in customer lifetime value with LeadFlow.",
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
                  <GradientText>E-commerce Platform</GradientText>
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  LeadFlow connects seamlessly with all major e-commerce platforms
                  and tools. Sync customer data, orders, and behavior automatically
                  for unified customer profiles.
                </p>
                <ul className="space-y-3">
                  {[
                    "Shopify, WooCommerce, and BigCommerce native integrations",
                    "Payment processors including Stripe and PayPal",
                    "Email platforms like Klaviyo and Mailchimp",
                    "Review platforms including Yotpo and Trustpilot",
                    "Advertising platforms for retargeting audiences",
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
                  "Shopify",
                  "WooCommerce",
                  "BigCommerce",
                  "Stripe",
                  "Klaviyo",
                  "Yotpo",
                  "PayPal",
                  "Mailchimp",
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
                Ready to Boost Your{" "}
                <GradientText>E-commerce Revenue</GradientText>?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Join hundreds of online stores using LeadFlow to recover abandoned
                carts, increase repeat purchases, and grow customer lifetime value.
                Start your free trial today.
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
                  title: "CRM for SaaS Sales Teams",
                  href: "/resources/industry-solutions/saas-sales",
                  description:
                    "Accelerate your SaaS sales cycle with pipeline automation.",
                },
                {
                  title: "CRM for Real Estate Agents",
                  href: "/resources/industry-solutions/real-estate-crm",
                  description:
                    "Manage buyers, sellers, and properties in one platform.",
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
