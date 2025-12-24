"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Briefcase,
  Users,
  BarChart3,
  Mail,
  TrendingUp,
  Calendar,
  FileText,
  Clock,
  Target,
  CheckCircle,
  ArrowRight,
  Star,
  DollarSign,
  Layers,
  Zap,
  MessageSquare,
  Award,
  Coffee,
  Network,
} from "lucide-react";
import {
  LandingHeader,
  LandingFooter,
  GlowButton,
  GradientText,
  SectionHeading,
} from "@/components/landing";

export default function ConsultantCRMPage() {
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
                <Briefcase className="w-4 h-4 mr-2" />
                Consultant & Freelancer Solution
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                The Perfect{" "}
                <GradientText>CRM for Consultants & Freelancers</GradientText>{" "}
                That Grows with You
              </h1>

              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                LeadFlow helps independent consultants and freelancers manage their
                pipeline, nurture prospects, and win more projects. Spend less time
                on administration and more time doing the work you love.
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
              title="Why Consultants Need a CRM Built for Them"
              titleGradient="CRM Built for Them"
              description="Enterprise CRMs are too complex and expensive for solo practitioners. You need something that fits your workflow, not the other way around."
            />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {[
                {
                  icon: Clock,
                  title: "Feast or Famine Revenue Cycles",
                  description:
                    "Without a consistent pipeline, consultants often swing between being overwhelmed with work and scrambling for new clients. Proper lead management creates a steady stream of opportunities that smooths out revenue fluctuations.",
                },
                {
                  icon: Network,
                  title: "Relationship-Dependent Business",
                  description:
                    "Consulting is built on relationships, but keeping track of hundreds of connections, past clients, and referral sources becomes impossible without a system. Important follow-ups fall through the cracks.",
                },
                {
                  icon: Calendar,
                  title: "Wearing Multiple Hats",
                  description:
                    "As a solo practitioner, you're the CEO, salesperson, marketer, and service provider. Without automation, business development becomes an afterthought that only gets attention when projects dry up.",
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
              title="Everything You Need to Grow Your Practice"
              titleGradient="Grow Your Practice"
              description="LeadFlow provides consultants and freelancers with powerful yet simple tools to manage leads and win more business."
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
                    icon: Users,
                    title: "Relationship-Centric Contact Management",
                    description:
                      "Organize contacts by relationship type including prospects, active clients, past clients, and referral sources. Track interaction history, project history, and relationship strength to prioritize your outreach effectively.",
                  },
                  {
                    icon: Mail,
                    title: "Automated Nurture Sequences",
                    description:
                      "Set up email sequences that keep you top-of-mind with prospects and past clients. Share valuable content, check in periodically, and request referrals automatically while you focus on billable work.",
                  },
                  {
                    icon: FileText,
                    title: "Proposal and Project Tracking",
                    description:
                      "Track every opportunity from initial inquiry through proposal, negotiation, and project delivery. See your pipeline value at a glance and forecast revenue based on probability-weighted deals.",
                  },
                  {
                    icon: Target,
                    title: "Lead Scoring for Consultants",
                    description:
                      "Our AI analyzes engagement patterns, budget signals, and urgency indicators to score your prospects. Know which opportunities deserve your immediate attention and which need more nurturing.",
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
                      <GradientText>60% More Referrals</GradientText>
                    </p>
                    <p className="text-muted-foreground">
                      Average increase for consultants using LeadFlow
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Consultant Types Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Who It's For"
              title="Built for Every Type of Independent Professional"
              titleGradient="Independent Professional"
              description="Whether you're a management consultant, creative freelancer, or specialist advisor, LeadFlow adapts to your practice."
            />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {[
                {
                  icon: Briefcase,
                  title: "Management Consultants",
                  description:
                    "Track long-term client relationships, manage complex stakeholder maps, and coordinate follow-ups across multiple engagements and decision-makers within client organizations.",
                },
                {
                  icon: Zap,
                  title: "Marketing & Creative Freelancers",
                  description:
                    "Manage project-based relationships, track portfolio inquiries, and automate follow-ups with prospects who requested quotes but haven't committed.",
                },
                {
                  icon: BarChart3,
                  title: "Financial Advisors",
                  description:
                    "Nurture relationships over extended sales cycles, track compliance touchpoints, and manage referral programs that drive your practice growth.",
                },
                {
                  icon: Award,
                  title: "Executive Coaches",
                  description:
                    "Track coaching engagements, manage session scheduling, and nurture prospects through your discovery process with automated touchpoints.",
                },
                {
                  icon: MessageSquare,
                  title: "IT Consultants",
                  description:
                    "Manage technical projects, track support relationships, and identify upsell opportunities within your existing client base.",
                },
                {
                  icon: Coffee,
                  title: "Business Coaches & Trainers",
                  description:
                    "Segment your audience by program interest, automate webinar follow-ups, and track prospects through your enrollment funnel.",
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

        {/* Workflow Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="How It Works"
              title="From First Contact to Repeat Business"
              titleGradient="Repeat Business"
              description="LeadFlow guides you through every stage of the consulting sales cycle with automation that works while you focus on clients."
            />

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
              {[
                {
                  step: "01",
                  title: "Capture Every Lead",
                  description:
                    "Automatically capture leads from your website, LinkedIn, email, and networking events. Every contact gets logged with context so you never forget where you met someone.",
                },
                {
                  step: "02",
                  title: "Nurture Relationships",
                  description:
                    "Automated email sequences share your expertise, check in periodically, and keep you top-of-mind. When prospects are ready to buy, you're the first person they think of.",
                },
                {
                  step: "03",
                  title: "Win the Business",
                  description:
                    "Track proposals, follow up at the right time, and manage negotiations. See your pipeline value and forecast revenue based on deal probability and timing.",
                },
                {
                  step: "04",
                  title: "Generate Referrals",
                  description:
                    "Post-project automation thanks clients, requests testimonials, and asks for referrals. Turn every successful engagement into multiple new opportunities.",
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
                  "As a solo consultant, I used to dread business development. Now
                  LeadFlow handles my follow-ups automatically while I focus on
                  client work. My referral rate increased by 60% and I finally have
                  a consistent pipeline for the first time in my career."
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold">
                    DM
                  </div>
                  <div>
                    <p className="font-semibold">David Martinez</p>
                    <p className="text-sm text-muted-foreground">
                      Independent Strategy Consultant | 15+ Years Experience
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
              title="What Consultants Achieve with LeadFlow"
              titleGradient="LeadFlow"
              description="Join thousands of independent professionals who have transformed their business development with LeadFlow."
            />

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
              {[
                {
                  icon: Network,
                  metric: "60%",
                  label: "More Referrals",
                  description:
                    "Average increase in referral-based leads through automated follow-up.",
                },
                {
                  icon: DollarSign,
                  metric: "45%",
                  label: "Revenue Growth",
                  description:
                    "Average increase in annual revenue within the first year.",
                },
                {
                  icon: Clock,
                  metric: "8 hrs",
                  label: "Saved Weekly",
                  description:
                    "Time saved on administrative tasks through automation.",
                },
                {
                  icon: TrendingUp,
                  metric: "2x",
                  label: "Pipeline Value",
                  description:
                    "Average increase in total pipeline value within 6 months.",
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

        {/* Pricing Highlight Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Pricing That Makes Sense for{" "}
                  <GradientText>Solo Practitioners</GradientText>
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Unlike enterprise CRMs that charge per seat and require expensive
                  implementation, LeadFlow is designed for independent professionals.
                  Simple pricing, powerful features, and no IT team required.
                </p>
                <ul className="space-y-3">
                  {[
                    "Affordable monthly plans starting at $29/month",
                    "No long-term contracts or commitment required",
                    "Free onboarding and setup assistance",
                    "All features included at every tier",
                    "Scale up only when your practice grows",
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Link href="/#pricing">
                    <GlowButton>
                      View Pricing Plans
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </GlowButton>
                  </Link>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="p-8 rounded-2xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20"
              >
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-2">
                    Starting at
                  </p>
                  <p className="text-5xl font-bold mb-2">
                    <GradientText>$29</GradientText>
                    <span className="text-xl text-muted-foreground">/month</span>
                  </p>
                  <p className="text-muted-foreground mb-6">
                    Everything you need to grow your practice
                  </p>
                  <ul className="text-left space-y-2 mb-6">
                    {[
                      "Unlimited contacts",
                      "Email automation",
                      "Pipeline management",
                      "Lead scoring",
                      "Proposal tracking",
                      "Email support",
                    ].map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/handler/sign-up">
                    <GlowButton className="w-full">
                      Start Free Trial
                    </GlowButton>
                  </Link>
                </div>
              </motion.div>
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
                  Connects with Your{" "}
                  <GradientText>Existing Tools</GradientText>
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  LeadFlow integrates with the tools you already use to run your
                  consulting practice. Sync your calendar, email, and accounting
                  software for a complete view of your business.
                </p>
                <ul className="space-y-3">
                  {[
                    "Google Calendar and Outlook for scheduling",
                    "Gmail and Office 365 email integration",
                    "LinkedIn for contact enrichment",
                    "Calendly and scheduling tools",
                    "QuickBooks and accounting software",
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
                  "Google",
                  "Outlook",
                  "LinkedIn",
                  "Calendly",
                  "QuickBooks",
                  "Zoom",
                  "Gmail",
                  "Slack",
                  "Zapier",
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
                Ready to Grow Your{" "}
                <GradientText>Consulting Practice</GradientText>?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Join thousands of consultants and freelancers using LeadFlow to
                manage their pipeline, automate follow-ups, and win more business.
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
                  title: "CRM for Marketing Agencies",
                  href: "/resources/industry-solutions/agency-crm",
                  description:
                    "Manage client relationships and campaign leads with ease.",
                },
                {
                  title: "CRM for Real Estate Agents",
                  href: "/resources/industry-solutions/real-estate-crm",
                  description:
                    "Manage buyers, sellers, and properties in one platform.",
                },
                {
                  title: "CRM for SaaS Sales Teams",
                  href: "/resources/industry-solutions/saas-sales",
                  description:
                    "Accelerate your SaaS sales cycle with pipeline automation.",
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
