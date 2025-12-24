"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Megaphone,
  Users,
  BarChart3,
  Mail,
  TrendingUp,
  Briefcase,
  FileText,
  Clock,
  Target,
  CheckCircle,
  ArrowRight,
  Star,
  DollarSign,
  Layers,
  Zap,
  PieChart,
} from "lucide-react";
import {
  LandingHeader,
  LandingFooter,
  GlowButton,
  GradientText,
  SectionHeading,
} from "@/components/landing";

export default function AgencyCRMPage() {
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
                <Megaphone className="w-4 h-4 mr-2" />
                Marketing Agency Solution
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                The Complete{" "}
                <GradientText>CRM for Marketing Agencies</GradientText>{" "}
                That Scales with You
              </h1>

              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                LeadFlow helps marketing agencies manage client relationships, track
                campaign performance, and win more business. Streamline your sales
                process and deliver exceptional client experiences at scale.
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
              title="Why Marketing Agencies Need a Purpose-Built CRM"
              titleGradient="Purpose-Built CRM"
              description="Generic CRMs don't understand the complexity of agency-client relationships. You need a solution designed for your unique workflow."
            />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {[
                {
                  icon: Users,
                  title: "Complex Client Relationships",
                  description:
                    "Marketing agencies manage multiple stakeholders per client, from CMOs to project managers. Without proper tracking, important communications get lost and relationships suffer when team members change.",
                },
                {
                  icon: Layers,
                  title: "Multi-Channel Campaign Tracking",
                  description:
                    "Your agency runs campaigns across dozens of channels and platforms. Connecting campaign performance to client revenue and demonstrating ROI becomes nearly impossible without unified tracking.",
                },
                {
                  icon: Clock,
                  title: "Lengthy Sales Cycles",
                  description:
                    "Agency sales cycles often span months with multiple proposals, revisions, and stakeholder approvals. Traditional CRMs weren't built to manage these complex, long-term nurturing sequences.",
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
              title="Everything Your Agency Needs to Thrive"
              titleGradient="Agency Needs"
              description="LeadFlow provides specialized tools that help marketing agencies win more clients, deliver better results, and scale efficiently."
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
                    icon: Briefcase,
                    title: "Multi-Stakeholder Contact Management",
                    description:
                      "Track every contact within client organizations with role-based tagging. Know who the decision-makers are, who signs contracts, and who manages day-to-day communications. Keep relationship history across team changes.",
                  },
                  {
                    icon: Mail,
                    title: "Proposal and Pitch Tracking",
                    description:
                      "Manage your entire proposal process from initial pitch to signed contract. Track proposal views, follow up at the right time, and analyze win rates by service type, industry, or deal size to optimize your approach.",
                  },
                  {
                    icon: PieChart,
                    title: "Campaign Performance Attribution",
                    description:
                      "Connect campaign metrics directly to client accounts. Generate comprehensive reports showing ROI, lead generation, and business impact. Make client reporting effortless with automated dashboards.",
                  },
                  {
                    icon: Target,
                    title: "Intelligent Lead Scoring for Agencies",
                    description:
                      "Our AI analyzes prospect behavior, budget indicators, and engagement patterns to score leads. Focus your business development efforts on prospects most likely to become high-value, long-term clients.",
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
                      <GradientText>35% Revenue Growth</GradientText>
                    </p>
                    <p className="text-muted-foreground">
                      Average agency growth with LeadFlow
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="How It Works"
              title="From Prospect to Retained Client in Four Stages"
              titleGradient="Four Stages"
              description="LeadFlow guides your agency through every phase of the client lifecycle with purpose-built automation and insights."
            />

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
              {[
                {
                  step: "01",
                  title: "Capture and Qualify Leads",
                  description:
                    "Automatically capture leads from your website, RFP platforms, and referral networks. Our scoring system identifies which prospects match your ideal client profile and have real budget.",
                },
                {
                  step: "02",
                  title: "Nurture with Value",
                  description:
                    "Deploy automated email sequences that share case studies, thought leadership, and industry insights. Stay top-of-mind through long sales cycles without manual follow-up fatigue.",
                },
                {
                  step: "03",
                  title: "Streamline the Sales Process",
                  description:
                    "Track proposals, manage stakeholder communications, and coordinate team efforts in one place. Get notified when prospects engage with your proposals so you can follow up at peak interest.",
                },
                {
                  step: "04",
                  title: "Onboard and Retain Clients",
                  description:
                    "Smooth handoff from sales to account management. Automated onboarding sequences ensure nothing falls through the cracks. Regular check-in reminders help prevent client churn.",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-5xl font-bold text-purple-500/20 mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="py-20">
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
                  "LeadFlow transformed how we manage client relationships. We've
                  reduced our sales cycle by 40% and our client retention rate hit
                  an all-time high. The ROI attribution alone is worth the
                  investment."
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold">
                    MR
                  </div>
                  <div>
                    <p className="font-semibold">Marcus Reynolds</p>
                    <p className="text-sm text-muted-foreground">
                      Founder & CEO, Apex Digital Marketing | 50+ Clients
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Results"
              title="What Marketing Agencies Achieve with LeadFlow"
              titleGradient="LeadFlow"
              description="Join hundreds of marketing agencies that have transformed their business development and client management with LeadFlow."
            />

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
              {[
                {
                  icon: DollarSign,
                  metric: "35%",
                  label: "Revenue Growth",
                  description:
                    "Average increase in agency revenue within 12 months of implementing LeadFlow.",
                },
                {
                  icon: Clock,
                  metric: "40%",
                  label: "Shorter Sales Cycle",
                  description:
                    "Faster time from initial contact to signed contract through automated nurturing.",
                },
                {
                  icon: Users,
                  metric: "92%",
                  label: "Client Retention",
                  description:
                    "Agencies using LeadFlow report significantly higher client retention rates.",
                },
                {
                  icon: FileText,
                  metric: "3x",
                  label: "Proposal Win Rate",
                  description:
                    "Triple your proposal success rate with better timing and follow-up automation.",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center p-6 rounded-2xl bg-background border border-border"
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

        {/* Use Cases Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Use Cases"
              title="Built for Every Type of Marketing Agency"
              titleGradient="Every Type"
              description="Whether you're a boutique creative shop or a full-service digital agency, LeadFlow adapts to your workflow."
            />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {[
                {
                  icon: Megaphone,
                  title: "Digital Marketing Agencies",
                  description:
                    "Manage SEO, PPC, and social media clients with campaign-specific tracking. Connect performance metrics to client accounts for seamless reporting and renewal conversations.",
                },
                {
                  icon: Zap,
                  title: "Creative Agencies",
                  description:
                    "Track creative briefs, revision cycles, and project timelines. Manage multiple stakeholders and ensure brand guidelines are always at your fingertips.",
                },
                {
                  icon: BarChart3,
                  title: "PR and Communications Agencies",
                  description:
                    "Coordinate media outreach, track journalist relationships, and measure campaign impact. Demonstrate value to clients with comprehensive coverage reports.",
                },
                {
                  icon: Target,
                  title: "Performance Marketing Agencies",
                  description:
                    "Real-time campaign attribution and ROI tracking. Show clients exactly how their investment translates to leads, sales, and revenue growth.",
                },
                {
                  icon: Layers,
                  title: "Full-Service Agencies",
                  description:
                    "Manage complex client relationships spanning multiple service lines. Coordinate between departments and ensure unified client communication.",
                },
                {
                  icon: Users,
                  title: "Boutique Consultancies",
                  description:
                    "Perfect for small teams that need enterprise-level client management. Punch above your weight with automation that scales your capacity.",
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
                  Connects with Your{" "}
                  <GradientText>Marketing Stack</GradientText>
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  LeadFlow integrates seamlessly with the marketing tools your agency
                  already uses. Sync data, automate workflows, and eliminate manual
                  data entry across your entire tech stack.
                </p>
                <ul className="space-y-3">
                  {[
                    "HubSpot, Marketo, and marketing automation platforms",
                    "Google Analytics, Facebook Ads, and ad platforms",
                    "Slack and Microsoft Teams for team communication",
                    "Project management tools like Asana and Monday",
                    "Proposal software including PandaDoc and Proposify",
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
                  "HubSpot",
                  "Google Ads",
                  "Facebook",
                  "Slack",
                  "Asana",
                  "PandaDoc",
                  "Analytics",
                  "Monday",
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
                Ready to Scale Your{" "}
                <GradientText>Marketing Agency</GradientText>?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Join hundreds of marketing agencies using LeadFlow to win more
                clients, deliver better results, and grow their business. Start your
                free trial today and experience the difference.
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
                  title: "CRM for Consultants",
                  href: "/resources/industry-solutions/consultant-crm",
                  description:
                    "Track prospects and projects from first contact to completion.",
                },
                {
                  title: "CRM for Real Estate Agents",
                  href: "/resources/industry-solutions/real-estate-crm",
                  description:
                    "Manage buyers, sellers, and properties in one platform.",
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
