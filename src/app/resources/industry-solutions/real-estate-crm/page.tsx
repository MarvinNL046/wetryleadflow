"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Building2,
  Users,
  Calendar,
  Mail,
  TrendingUp,
  Home,
  FileText,
  Clock,
  Target,
  CheckCircle,
  ArrowRight,
  Star,
  DollarSign,
  BarChart3,
} from "lucide-react";
import {
  LandingHeader,
  LandingFooter,
  GlowButton,
  GradientText,
  SectionHeading,
} from "@/components/landing";

export default function RealEstateCRMPage() {
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
                <Building2 className="w-4 h-4 mr-2" />
                Real Estate Industry Solution
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                The Ultimate{" "}
                <GradientText>CRM for Real Estate Agents</GradientText>{" "}
                That Closes More Deals
              </h1>

              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                LeadFlow helps real estate professionals manage buyers, sellers, and
                properties in one powerful platform. Automate follow-ups, track
                showings, and close deals faster than ever before.
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
              title="Why Real Estate Agents Need a Specialized CRM"
              titleGradient="Specialized CRM"
              description="Traditional CRMs weren't built for the unique demands of real estate. You need a solution that understands your workflow."
            />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {[
                {
                  icon: Users,
                  title: "Managing Multiple Relationships",
                  description:
                    "Real estate agents juggle dozens of buyer and seller relationships simultaneously. Without proper organization, hot leads fall through the cracks and deals are lost to competitors who respond faster.",
                },
                {
                  icon: Calendar,
                  title: "Coordinating Showings and Open Houses",
                  description:
                    "Between listing appointments, buyer showings, and open houses, your calendar becomes a maze. Missing appointments or double-booking damages your reputation and costs you commissions.",
                },
                {
                  icon: Clock,
                  title: "Time-Sensitive Follow-ups",
                  description:
                    "The real estate market moves fast. A lead that isn't followed up within hours often goes cold. Manual follow-up processes simply can't keep pace with market demands.",
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
              title="Built Specifically for Real Estate Success"
              titleGradient="Real Estate Success"
              description="Every feature in LeadFlow was designed with real estate professionals in mind, helping you work smarter and close more deals."
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
                    icon: Home,
                    title: "Property-Centric Contact Management",
                    description:
                      "Link contacts to properties they're interested in or selling. Track showing history, feedback, and preferences all in one place. Never ask a client the same question twice.",
                  },
                  {
                    icon: Mail,
                    title: "Automated Drip Campaigns",
                    description:
                      "Set up automated email sequences for different client types. New buyers get property alerts. Sellers receive market updates. Past clients get anniversary reminders and referral requests.",
                  },
                  {
                    icon: TrendingUp,
                    title: "Deal Pipeline Visualization",
                    description:
                      "See every deal's status at a glance with our visual pipeline. Track listings from initial contact through closing. Move deals through stages with simple drag-and-drop functionality.",
                  },
                  {
                    icon: Target,
                    title: "Lead Scoring for Real Estate",
                    description:
                      "Our AI-powered lead scoring analyzes engagement patterns, property search behavior, and communication frequency to identify your hottest prospects who are ready to buy or sell.",
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
                    <BarChart3 className="w-24 h-24 mx-auto text-purple-400 mb-4" />
                    <p className="text-2xl font-bold">
                      <GradientText>40% More Deals</GradientText>
                    </p>
                    <p className="text-muted-foreground">
                      Average increase for agents using LeadFlow
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
              title="From Lead to Closing in Four Simple Steps"
              titleGradient="Four Simple Steps"
              description="LeadFlow streamlines your entire real estate workflow, making it easier to manage leads and close deals consistently."
            />

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
              {[
                {
                  step: "01",
                  title: "Capture Leads Automatically",
                  description:
                    "Connect your website, Zillow, Realtor.com, and social media. All leads flow into LeadFlow automatically with full contact information and property interests captured.",
                },
                {
                  step: "02",
                  title: "Score and Prioritize",
                  description:
                    "Our intelligent scoring system analyzes each lead's behavior and engagement. Focus your time on the prospects most likely to transact in the next 30-90 days.",
                },
                {
                  step: "03",
                  title: "Nurture with Automation",
                  description:
                    "Set up personalized drip campaigns that keep you top-of-mind. Automated property alerts, market updates, and check-ins nurture leads while you focus on active clients.",
                },
                {
                  step: "04",
                  title: "Close and Request Referrals",
                  description:
                    "Track deals through your pipeline to closing. Post-closing automation handles review requests, referral solicitation, and keeps you connected for future transactions.",
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
                  "Before LeadFlow, I was losing track of leads constantly. Now I've
                  closed 40% more deals and my response time went from hours to
                  minutes. It's like having a full-time assistant that never sleeps."
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold">
                    SJ
                  </div>
                  <div>
                    <p className="font-semibold">Sarah Johnson</p>
                    <p className="text-sm text-muted-foreground">
                      Top Producer, RE/MAX Elite | $15M+ Annual Sales
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
              title="What Real Estate Agents Achieve with LeadFlow"
              titleGradient="LeadFlow"
              description="Join thousands of agents who have transformed their business with our real estate CRM solution."
            />

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
              {[
                {
                  icon: DollarSign,
                  metric: "40%",
                  label: "More Deals Closed",
                  description:
                    "Average increase in closed transactions within the first year of using LeadFlow.",
                },
                {
                  icon: Clock,
                  metric: "5 min",
                  label: "Average Response Time",
                  description:
                    "Down from 2+ hours, ensuring leads receive instant attention when they're most engaged.",
                },
                {
                  icon: Users,
                  metric: "3x",
                  label: "Lead Conversion Rate",
                  description:
                    "Automated nurturing and timely follow-ups triple the rate of lead-to-client conversion.",
                },
                {
                  icon: FileText,
                  metric: "10 hrs",
                  label: "Saved Per Week",
                  description:
                    "Automation eliminates manual data entry, follow-up scheduling, and reporting tasks.",
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

        {/* Integration Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Integrates with Your{" "}
                  <GradientText>Existing Real Estate Tools</GradientText>
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  LeadFlow connects seamlessly with the tools you already use. Import
                  contacts, sync calendars, and automate workflows across your entire
                  tech stack without switching between applications.
                </p>
                <ul className="space-y-3">
                  {[
                    "Zillow, Realtor.com, and MLS integrations",
                    "Google Calendar and Outlook synchronization",
                    "Email providers including Gmail and Office 365",
                    "DocuSign and dotloop for transaction management",
                    "Social media lead capture from Facebook and Instagram",
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
                  "Zillow",
                  "Realtor.com",
                  "MLS",
                  "Google",
                  "DocuSign",
                  "Facebook",
                  "Instagram",
                  "Outlook",
                  "Gmail",
                ].map((tool, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-xl bg-muted/50 border border-border flex items-center justify-center text-sm font-medium"
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
                Ready to Close More{" "}
                <GradientText>Real Estate Deals</GradientText>?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Join thousands of real estate professionals who trust LeadFlow to
                manage their leads, automate their follow-ups, and grow their
                business. Start your free trial today and see results within weeks.
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
                  title: "CRM for Consultants",
                  href: "/resources/industry-solutions/consultant-crm",
                  description:
                    "Track prospects and projects from first contact to completion.",
                },
                {
                  title: "Lead Management for E-commerce",
                  href: "/resources/industry-solutions/ecommerce-leads",
                  description:
                    "Convert website visitors into loyal customers.",
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
