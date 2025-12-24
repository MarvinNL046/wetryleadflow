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
  BarChart3,
  Users,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Clock,
  DollarSign,
  Filter
} from "lucide-react";

export default function AILeadScoringPage() {
  return (
    <div className="min-h-screen bg-background">
      <LandingHeader />

      <main>
        {/* Hero Section */}
        <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden pt-20">
          {/* Background Effects */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-background to-background" />
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-500/30 rounded-full blur-[128px] animate-pulse" />
            <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: "1s" }} />
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
                className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20"
              >
                <Brain className="w-4 h-4 mr-2" />
                AI-Powered Lead Intelligence
              </motion.div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
                AI Lead Scoring: <GradientText animated>Prioritize Your Best Leads</GradientText>
              </h1>

              <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                Stop wasting time on low-quality leads. LeadFlow&apos;s AI lead scoring analyzes
                hundreds of data points to instantly identify which prospects are most likely
                to convert, helping your sales team focus on what matters most.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/handler/sign-up">
                  <GlowButton size="lg" className="group">
                    Start Scoring Leads Free
                    <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </GlowButton>
                </Link>
                <Link
                  href="/resources/ai-automation/predictive-analytics"
                  className="inline-flex items-center gap-2 px-6 py-3 text-base font-medium rounded-full border border-border hover:bg-accent transition-colors"
                >
                  Learn About Predictive Analytics
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* What is AI Lead Scoring Section */}
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
                  What is <GradientText>AI Lead Scoring</GradientText> and Why Does It Matter?
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    AI lead scoring is a sophisticated methodology that uses machine learning algorithms
                    to evaluate and rank prospects based on their likelihood to become paying customers.
                    Unlike traditional scoring methods that rely on basic demographic data and manual
                    rules, AI-powered lead scoring analyzes behavioral patterns, engagement history,
                    firmographic data, and countless other signals to create a comprehensive
                    understanding of each lead&apos;s potential value.
                  </p>
                  <p>
                    In today&apos;s competitive landscape, sales teams are overwhelmed with leads from
                    multiple sources including social media ads, content marketing, referrals, and
                    inbound inquiries. Without intelligent prioritization, valuable selling time is
                    wasted on prospects who will never convert, while high-potential leads slip
                    through the cracks. AI lead scoring solves this critical challenge by providing
                    instant, accurate assessments that enable sales representatives to focus their
                    energy on the opportunities most likely to generate revenue.
                  </p>
                  <p>
                    LeadFlow&apos;s AI lead scoring engine processes over 200 data points per lead,
                    including website behavior, email engagement, social media interactions,
                    company size, industry vertical, and historical conversion patterns from
                    similar leads. This comprehensive analysis produces a score from 0-100 that
                    gives your team immediate clarity on how to prioritize their outreach efforts.
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
                <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 via-cyan-500/20 to-blue-500/20 rounded-3xl blur-2xl opacity-60" />
                <div className="relative rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl overflow-hidden p-6">
                  <div className="space-y-4">
                    {[
                      { name: "Sarah Johnson", company: "TechCorp Inc.", score: 94, trend: "+12%", status: "Hot Lead" },
                      { name: "Michael Chen", company: "StartupXYZ", score: 87, trend: "+8%", status: "Warm Lead" },
                      { name: "Emily Davis", company: "Enterprise Co", score: 76, trend: "+5%", status: "Qualified" },
                      { name: "James Wilson", company: "SmallBiz LLC", score: 45, trend: "-2%", status: "Nurture" },
                    ].map((lead, index) => (
                      <motion.div
                        key={lead.name}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="flex items-center gap-4 p-4 rounded-xl bg-muted/30 border border-border/50"
                      >
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-blue-400 flex items-center justify-center text-white font-bold">
                          {lead.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{lead.name}</p>
                          <p className="text-sm text-muted-foreground truncate">{lead.company}</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-2">
                            <span className={`text-2xl font-bold ${lead.score >= 80 ? 'text-green-500' : lead.score >= 60 ? 'text-yellow-500' : 'text-muted-foreground'}`}>
                              {lead.score}
                            </span>
                            <span className={`text-xs ${lead.trend.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                              {lead.trend}
                            </span>
                          </div>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            lead.status === 'Hot Lead' ? 'bg-green-500/20 text-green-400' :
                            lead.status === 'Warm Lead' ? 'bg-yellow-500/20 text-yellow-400' :
                            lead.status === 'Qualified' ? 'bg-blue-500/20 text-blue-400' :
                            'bg-muted text-muted-foreground'
                          }`}>
                            {lead.status}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* How AI Lead Scoring Works */}
        <section className="py-20 lg:py-32 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="The Science Behind the Score"
              title="How LeadFlow's AI Lead Scoring Works"
              titleGradient="AI Lead Scoring"
              description="Our advanced machine learning models analyze multiple dimensions of lead data to produce accurate, actionable scores in real-time."
            />

            <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Filter,
                  title: "Data Collection",
                  description: "LeadFlow automatically captures data from Meta ads, website visits, form submissions, email interactions, and third-party enrichment sources to build comprehensive lead profiles."
                },
                {
                  icon: Brain,
                  title: "Pattern Recognition",
                  description: "Our AI analyzes historical conversion data to identify the behavioral and demographic patterns that distinguish your best customers from those who never purchase."
                },
                {
                  icon: BarChart3,
                  title: "Score Calculation",
                  description: "Using weighted algorithms trained on your specific business data, each lead receives a score from 0-100 that reflects their conversion probability."
                },
                {
                  icon: Zap,
                  title: "Real-Time Updates",
                  description: "Scores automatically update as leads engage with your brand, ensuring your team always has the most current intelligence for prioritization decisions."
                }
              ].map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative p-6 rounded-2xl bg-card border border-border hover:border-purple-500/50 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <step.icon className="w-6 h-6 text-purple-500" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Measurable Results"
              title="The Benefits of AI-Powered Lead Scoring"
              titleGradient="AI-Powered"
              description="Companies using LeadFlow's AI lead scoring see dramatic improvements in sales efficiency and conversion rates."
            />

            <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Clock,
                  title: "Save 10+ Hours Per Week",
                  description: "Your sales team stops manually qualifying leads and starts spending more time in high-value conversations with prospects who are ready to buy."
                },
                {
                  icon: TrendingUp,
                  title: "Increase Conversion Rates by 35%",
                  description: "By focusing on the highest-scored leads first, sales representatives close more deals from the same lead volume, dramatically improving ROI."
                },
                {
                  icon: DollarSign,
                  title: "Reduce Cost Per Acquisition",
                  description: "Stop wasting marketing budget on leads that never convert. AI scoring helps you identify which channels and campaigns generate the most valuable prospects."
                },
                {
                  icon: Target,
                  title: "Never Miss a Hot Lead",
                  description: "Instant notifications alert your team when a lead's score spikes, ensuring time-sensitive opportunities are acted upon immediately."
                },
                {
                  icon: Users,
                  title: "Align Sales & Marketing",
                  description: "Objective scoring creates a common language between teams, eliminating debates about lead quality and enabling data-driven handoffs."
                },
                {
                  icon: Sparkles,
                  title: "Continuously Improving Accuracy",
                  description: "LeadFlow's AI learns from every closed deal, constantly refining its scoring model to become more accurate over time for your specific business."
                }
              ].map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 rounded-2xl bg-card border border-border hover:border-purple-500/50 transition-all hover:shadow-lg hover:shadow-purple-500/10"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center mb-4">
                    <benefit.icon className="w-6 h-6 text-purple-500" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Key Features Deep Dive */}
        <section className="py-20 lg:py-32 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="order-2 lg:order-1"
              >
                <div className="space-y-6">
                  {[
                    {
                      title: "Behavioral Scoring Intelligence",
                      description: "Track how leads interact with your emails, website, and content. High-intent behaviors like pricing page visits and demo requests automatically boost lead scores."
                    },
                    {
                      title: "Firmographic Enrichment",
                      description: "Automatically enhance lead profiles with company data including size, industry, revenue, and technology stack to identify ideal customer profile matches."
                    },
                    {
                      title: "Engagement Decay Modeling",
                      description: "Lead scores intelligently decrease over time without engagement, ensuring your team always focuses on active, interested prospects rather than stale leads."
                    },
                    {
                      title: "Custom Scoring Rules",
                      description: "While AI handles the heavy lifting, you can add custom rules and weightings to align scoring with your unique business requirements and sales process."
                    }
                  ].map((feature, index) => (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex gap-4"
                    >
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{feature.title}</h3>
                        <p className="text-muted-foreground">{feature.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="order-1 lg:order-2"
              >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
                  Advanced Features That Set <GradientText>LeadFlow Apart</GradientText>
                </h2>
                <p className="text-muted-foreground mb-8">
                  Our AI lead scoring goes beyond simple point systems. LeadFlow combines
                  cutting-edge machine learning with practical sales intelligence to deliver
                  scores your team can trust and act upon with confidence. Every feature is
                  designed to help you identify, prioritize, and convert your best leads faster.
                </p>
                <Link href="/handler/sign-up">
                  <GlowButton size="lg" className="group">
                    Try AI Lead Scoring Free
                    <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </GlowButton>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Integration with LeadFlow */}
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Seamless Integration"
              title="AI Lead Scoring Across the LeadFlow Platform"
              titleGradient="LeadFlow Platform"
              description="Lead scores are deeply integrated throughout LeadFlow, powering intelligent automations and insights."
            />

            <div className="mt-16 grid md:grid-cols-2 gap-8">
              {[
                {
                  title: "Smart Pipeline Views",
                  description: "Sort and filter your sales pipeline by lead score to instantly see your hottest opportunities. Color-coded indicators make high-priority leads impossible to miss."
                },
                {
                  title: "Automated Lead Routing",
                  description: "Configure rules that automatically assign high-scored leads to your top performers, ensuring your best opportunities get the attention they deserve."
                },
                {
                  title: "Score-Based Workflows",
                  description: "Trigger automated email sequences, task assignments, and notifications based on score thresholds or score changes."
                },
                {
                  title: "Analytics & Reporting",
                  description: "Track how lead scores correlate with conversion rates, identify which lead sources produce the highest-scored prospects, and optimize your marketing spend accordingly."
                }
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-8 rounded-2xl bg-gradient-to-br from-purple-500/5 to-cyan-500/5 border border-border hover:border-purple-500/30 transition-colors"
                >
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
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
                Ready to Prioritize Your <GradientText>Best Leads</GradientText>?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Join thousands of sales teams using LeadFlow&apos;s AI lead scoring to close more
                deals in less time. Start your free trial today and see which leads deserve
                your attention first.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/handler/sign-up">
                  <GlowButton size="lg" className="group">
                    Start Your Free Trial
                    <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </GlowButton>
                </Link>
                <Link
                  href="/resources/ai-automation/smart-lead-routing"
                  className="inline-flex items-center gap-2 px-6 py-3 text-base font-medium rounded-full border border-border hover:bg-accent transition-colors"
                >
                  Explore Smart Lead Routing
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
              description="Explore more ways LeadFlow uses AI to transform your sales process."
            />

            <div className="mt-12 grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "Predictive Analytics for Sales Teams",
                  description: "Learn how predictive analytics can forecast revenue and identify trends before they happen.",
                  href: "/resources/ai-automation/predictive-analytics"
                },
                {
                  title: "Smart Lead Routing with AI",
                  description: "Discover how AI-powered lead routing ensures every lead reaches the right salesperson instantly.",
                  href: "/resources/ai-automation/smart-lead-routing"
                },
                {
                  title: "Sales Automation Workflows",
                  description: "Explore powerful automation workflows that save time and never let a lead fall through the cracks.",
                  href: "/resources/ai-automation/automation-workflows"
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
                    className="block p-6 rounded-2xl bg-card border border-border hover:border-purple-500/50 transition-all hover:shadow-lg hover:shadow-purple-500/10 h-full"
                  >
                    <h3 className="text-lg font-semibold mb-2">{resource.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{resource.description}</p>
                    <span className="text-purple-500 text-sm font-medium inline-flex items-center">
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
