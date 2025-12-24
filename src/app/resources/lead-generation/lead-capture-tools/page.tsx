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
  Puzzle,
  MessageSquare,
  Mail,
  Bot,
  ArrowRight,
  CheckCircle,
  Zap,
  Target,
  Users,
  BarChart3,
  Clock,
  Shield,
  Sparkles,
  Globe,
  Smartphone,
  MousePointer,
} from "lucide-react";

export default function LeadCaptureToolsPage() {
  return (
    <>
      <LandingHeader />
      <main className="min-h-screen bg-background">
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
              <span className="inline-flex items-center px-3 py-1 mb-6 text-sm font-medium rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                Lead Generation Strategies
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
                Best Lead Capture <GradientText>Tools & Techniques</GradientText>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Discover the most effective tools and techniques for capturing high-quality B2B leads. From chatbots to popup forms, learn how to build a comprehensive lead capture system.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/handler/sign-up">
                  <GlowButton size="lg" className="group">
                    Explore Lead Capture Solutions
                    <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </GlowButton>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Introduction Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto"
            >
              <SectionHeading
                badge="The Modern Toolkit"
                title="Building Your Lead Capture Technology Stack"
                titleGradient="Technology Stack"
                description="The right combination of tools can 10x your lead generation results"
              />

              <div className="mt-12 prose prose-lg dark:prose-invert max-w-none">
                <p className="text-muted-foreground leading-relaxed">
                  In the competitive B2B landscape, having the right lead capture tools isn't optional—it's essential for survival. Modern buyers expect seamless, personalized experiences across every touchpoint. The companies that win are those that deploy smart, integrated lead capture systems that work together to identify, engage, and convert prospects at scale.
                </p>

                <p className="text-muted-foreground leading-relaxed mt-4">
                  The ideal lead capture stack combines multiple tools and techniques, each optimized for different stages of the buyer journey and visitor behaviors. By understanding the strengths and ideal use cases of each tool category, you can build a system that captures leads you'd otherwise miss while qualifying them automatically.
                </p>

                <div className="grid md:grid-cols-4 gap-4 mt-8 not-prose">
                  {[
                    { metric: "67%", label: "Higher lead quality with intent-based tools" },
                    { metric: "40%", label: "More conversions with chatbots vs forms alone" },
                    { metric: "3x", label: "ROI improvement with integrated stacks" },
                    { metric: "50%", label: "Time saved through automation" },
                  ].map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="p-4 rounded-xl bg-card border border-border text-center"
                    >
                      <div className="text-2xl font-bold text-purple-500 mb-1">{item.metric}</div>
                      <p className="text-xs text-muted-foreground">{item.label}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Tool Categories Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Tool Categories"
              title="Essential Lead Capture Tool Categories"
              titleGradient="Lead Capture Tool"
              description="Understanding each category helps you build a complete capture system"
            />

            <div className="mt-12 space-y-8 max-w-5xl mx-auto">
              {[
                {
                  icon: MessageSquare,
                  title: "Live Chat & Chatbots",
                  description: "Engage visitors in real-time and capture leads through conversational interfaces. Modern chatbots use AI to qualify leads and route them to the right team members instantly.",
                  tools: ["Intercom", "Drift", "HubSpot Chat", "Crisp"],
                  bestFor: "High-intent visitors, immediate engagement, 24/7 capture",
                  metrics: "30-50% higher engagement than static forms"
                },
                {
                  icon: MousePointer,
                  title: "Popup & Slide-in Forms",
                  description: "Triggered forms that appear based on visitor behavior, exit intent, or time on page. When used strategically, popups can significantly increase conversion rates without annoying visitors.",
                  tools: ["OptinMonster", "Sumo", "Hello Bar", "Privy"],
                  bestFor: "Exit intent capture, special offers, newsletter signups",
                  metrics: "Can recover 10-15% of abandoning visitors"
                },
                {
                  icon: Mail,
                  title: "Email Capture Tools",
                  description: "Specialized tools for building email lists with double opt-in, list segmentation, and automated welcome sequences. Essential for nurturing leads over time.",
                  tools: ["ConvertKit", "Mailchimp", "ActiveCampaign", "Sendinblue"],
                  bestFor: "Newsletter subscriptions, content upgrades, lead nurturing",
                  metrics: "Email generates $42 ROI per $1 spent"
                },
                {
                  icon: Bot,
                  title: "Website Visitor Identification",
                  description: "Reveal the companies visiting your website even before they fill out a form. Use IP intelligence and intent data to identify high-value prospects proactively.",
                  tools: ["Clearbit Reveal", "Leadfeeder", "6sense", "ZoomInfo"],
                  bestFor: "ABM campaigns, sales intelligence, intent-based outreach",
                  metrics: "Identify 20-40% of anonymous B2B traffic"
                },
                {
                  icon: Puzzle,
                  title: "Form Builders & Embedded Forms",
                  description: "Create sophisticated, multi-step forms with conditional logic, integrations, and advanced analytics. The foundation of any lead capture strategy.",
                  tools: ["Typeform", "JotForm", "Formstack", "Cognito Forms"],
                  bestFor: "Lead qualification, surveys, demo requests",
                  metrics: "Multi-step forms convert 87% better than single-page"
                },
                {
                  icon: Globe,
                  title: "Landing Page Builders",
                  description: "Create dedicated landing pages for campaigns without needing developers. A/B test designs and optimize for conversions with built-in analytics.",
                  tools: ["Unbounce", "Leadpages", "Instapage", "ClickFunnels"],
                  bestFor: "Campaign-specific pages, A/B testing, PPC destinations",
                  metrics: "Dedicated landing pages convert 2-3x better than homepages"
                },
              ].map((category, index) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-8 rounded-xl bg-card border border-border hover:border-purple-500/30 transition-colors"
                >
                  <div className="flex flex-col lg:flex-row gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center">
                        <category.icon className="w-8 h-8 text-purple-500" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
                      <p className="text-muted-foreground mb-4">{category.description}</p>

                      <div className="grid sm:grid-cols-3 gap-4">
                        <div>
                          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Popular Tools</p>
                          <div className="flex flex-wrap gap-2">
                            {category.tools.map((tool) => (
                              <span key={tool} className="px-2 py-1 text-xs rounded-full bg-muted text-muted-foreground">
                                {tool}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Best For</p>
                          <p className="text-sm">{category.bestFor}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Key Metric</p>
                          <p className="text-sm text-green-500">{category.metrics}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Techniques Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Proven Techniques"
              title="Advanced Lead Capture Techniques"
              titleGradient="Advanced"
              description="Go beyond basic forms with these proven strategies"
            />

            <div className="mt-12 grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {[
                {
                  icon: Zap,
                  title: "Content Upgrades",
                  description: "Offer bonus content related to what visitors are already reading. A detailed checklist on a blog post about lead magnets can convert 5-10x better than a generic newsletter signup.",
                  example: "Blog post about email marketing + downloadable email template library"
                },
                {
                  icon: Target,
                  title: "Quiz & Assessment Funnels",
                  description: "Interactive quizzes capture leads while providing personalized value. Visitors get customized recommendations while you gather qualifying information.",
                  example: "\"What's your lead generation score?\" quiz with personalized results"
                },
                {
                  icon: Users,
                  title: "Referral Programs",
                  description: "Turn existing leads and customers into lead generation engines. Offer incentives for referrals to tap into trusted networks.",
                  example: "Invite 3 colleagues, get extended trial or premium features"
                },
                {
                  icon: Sparkles,
                  title: "Interactive Demos",
                  description: "Let prospects experience your product before providing contact info. Self-serve demos qualify leads by engagement level and specific feature interest.",
                  example: "Interactive product tour that captures email for saved progress"
                },
                {
                  icon: BarChart3,
                  title: "ROI & Cost Calculators",
                  description: "Provide immediate, quantified value while capturing leads. Calculators naturally collect the data you need for qualification.",
                  example: "\"Calculate your potential savings\" tool requiring company size"
                },
                {
                  icon: Shield,
                  title: "Exclusive Community Access",
                  description: "Gate access to valuable communities, forums, or networks. The perceived exclusivity increases conversion rates significantly.",
                  example: "Private Slack community for industry professionals"
                },
                {
                  icon: Clock,
                  title: "Time-Limited Offers",
                  description: "Create urgency with expiring offers or limited availability. Webinar registrations, early access, and time-sensitive discounts drive action.",
                  example: "Register now for early bird pricing - 48 hours only"
                },
                {
                  icon: Smartphone,
                  title: "SMS & WhatsApp Capture",
                  description: "Offer high-value content or updates via messaging apps. Higher open rates and engagement than email for certain audiences.",
                  example: "Get real-time industry alerts via WhatsApp"
                },
              ].map((technique, index) => (
                <motion.div
                  key={technique.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="p-6 rounded-xl bg-card border border-border"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center flex-shrink-0">
                      <technique.icon className="w-5 h-5 text-purple-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">{technique.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{technique.description}</p>
                      <div className="flex items-start gap-2 text-xs">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground italic">{technique.example}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Building Your Stack Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <SectionHeading
                badge="Implementation"
                title="Building Your Ideal Lead Capture Stack"
                titleGradient="Ideal Lead Capture"
                description="A framework for choosing and integrating the right tools"
              />

              <div className="mt-12 prose prose-lg dark:prose-invert max-w-none">
                <p className="text-muted-foreground leading-relaxed">
                  The best lead capture stack depends on your specific business model, target audience, and existing technology. Here's a framework for building yours.
                </p>

                <div className="not-prose mt-8 space-y-6">
                  {[
                    {
                      step: "01",
                      title: "Audit Your Current Capture Points",
                      content: "Map every place where visitors can become leads: forms, chatbots, email signups, demo requests. Identify gaps and underperforming touchpoints. What's your conversion rate at each point? Where are you losing potential leads?"
                    },
                    {
                      step: "02",
                      title: "Define Your Lead Stages",
                      content: "Not all leads are equal. Define what makes a Marketing Qualified Lead (MQL) vs a Sales Qualified Lead (SQL). What information do you need at each stage? This determines which tools and techniques to deploy where."
                    },
                    {
                      step: "03",
                      title: "Choose Core Tools",
                      content: "Start with the essentials: a form builder, email capture tool, and either chat or chatbot. These three categories cover most B2B lead capture scenarios. Ensure they integrate with your CRM."
                    },
                    {
                      step: "04",
                      title: "Add Behavioral Capture",
                      content: "Layer in tools that capture leads based on behavior: exit-intent popups, scroll-triggered CTAs, and visitor identification. These recover leads that traditional forms miss."
                    },
                    {
                      step: "05",
                      title: "Integrate Everything",
                      content: "Connect all tools to your CRM and marketing automation platform. Every captured lead should flow into a unified database with proper attribution. Use tools like Zapier or native integrations."
                    },
                    {
                      step: "06",
                      title: "Test and Optimize Continuously",
                      content: "Launch with your initial stack, then continuously test and optimize. Add new tools strategically based on data, not trends. Remove underperforming tools that add complexity without results."
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={item.step}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex gap-6"
                    >
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold">
                        {item.step}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                        <p className="text-muted-foreground">{item.content}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
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
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Capture Leads <GradientText>Smarter, Not Harder</GradientText>
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                LeadFlow integrates with all major lead capture tools and automatically enriches, scores, and routes your leads. Stop juggling multiple platforms and start closing more deals.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/handler/sign-up">
                  <GlowButton size="lg" className="group">
                    Start Your Free Trial
                    <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </GlowButton>
                </Link>
              </div>

              <div className="mt-12 pt-8 border-t border-border">
                <p className="text-sm text-muted-foreground mb-4">Related Resources</p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link href="/resources/lead-generation/lead-magnets" className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
                    Lead Magnets Guide
                  </Link>
                  <Link href="/resources/lead-generation/form-optimization" className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
                    Form Optimization
                  </Link>
                  <Link href="/resources/lead-generation/traffic-sources" className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
                    Traffic Sources for B2B
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <LandingFooter />
    </>
  );
}
