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
  Search,
  Share2,
  Mail,
  Megaphone,
  ArrowRight,
  CheckCircle,
  TrendingUp,
  Target,
  Users,
  BarChart3,
  Linkedin,
  FileText,
  Video,
  Mic,
  Globe,
  Handshake,
  Award,
  Zap,
} from "lucide-react";

export default function TrafficSourcesPage() {
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
                Top Traffic Sources for <GradientText>B2B Lead Generation</GradientText>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Master the channels that drive qualified B2B traffic. Learn how to attract decision-makers and fill your pipeline with prospects who are ready to buy.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/handler/sign-up">
                  <GlowButton size="lg" className="group">
                    Start Generating Quality Leads
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
                badge="Traffic Strategy"
                title="Understanding B2B Traffic Sources"
                titleGradient="B2B Traffic"
                description="Not all traffic is created equal in B2B lead generation"
              />

              <div className="mt-12 prose prose-lg dark:prose-invert max-w-none">
                <p className="text-muted-foreground leading-relaxed">
                  In B2B marketing, the quality of your traffic matters far more than the quantity. A thousand visits from curious consumers are worth less than ten visits from qualified decision-makers at your target companies. Understanding where your ideal customers spend their time online—and how to reach them—is the foundation of effective B2B lead generation.
                </p>

                <p className="text-muted-foreground leading-relaxed mt-4">
                  The most successful B2B companies use a multi-channel approach, combining organic strategies for long-term growth with paid channels for immediate results. Each traffic source has its strengths, costs, and ideal use cases. The key is understanding how they work together to create a predictable, scalable lead generation engine.
                </p>

                <div className="grid md:grid-cols-3 gap-6 mt-8 not-prose">
                  {[
                    { icon: TrendingUp, title: "Organic Traffic", description: "Builds over time through SEO and content. Lower cost per lead but requires patience and consistent effort.", color: "text-green-500" },
                    { icon: Megaphone, title: "Paid Traffic", description: "Immediate results with precise targeting. Higher cost but scalable and predictable once optimized.", color: "text-blue-500" },
                    { icon: Handshake, title: "Referral Traffic", description: "Highest quality leads from trusted sources. Harder to scale but converts at premium rates.", color: "text-purple-500" },
                  ].map((item, index) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="p-6 rounded-xl bg-card border border-border"
                    >
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center mb-4">
                        <item.icon className={`w-6 h-6 ${item.color}`} />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Top Traffic Sources Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Channel Deep Dive"
              title="The Most Effective B2B Traffic Channels"
              titleGradient="Effective B2B Traffic"
              description="Detailed breakdown of each major traffic source for B2B"
            />

            <div className="mt-12 space-y-12 max-w-5xl mx-auto">
              {/* Organic Search */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="p-8 rounded-xl bg-card border border-border"
              >
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center flex-shrink-0">
                    <Search className="w-8 h-8 text-green-500" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl font-semibold">Organic Search (SEO)</h3>
                      <span className="px-2 py-1 text-xs rounded-full bg-green-500/10 text-green-500">High ROI</span>
                    </div>
                    <p className="text-muted-foreground mb-6">
                      Search engine optimization remains the highest-ROI traffic channel for B2B. Buyers actively searching for solutions represent high-intent opportunities. While it takes 6-12 months to see significant results, organic traffic compounds over time, delivering leads at increasingly lower costs.
                    </p>

                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                      <div className="p-4 rounded-lg bg-muted/30">
                        <h4 className="font-medium mb-2 flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          Best Practices
                        </h4>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          <li>Target commercial intent keywords</li>
                          <li>Create comprehensive pillar content</li>
                          <li>Optimize for featured snippets</li>
                          <li>Build topical authority in your niche</li>
                        </ul>
                      </div>
                      <div className="p-4 rounded-lg bg-muted/30">
                        <h4 className="font-medium mb-2">Key Metrics</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Avg. Cost Per Lead</span>
                            <span className="text-green-500">$15-50</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Time to Results</span>
                            <span>6-12 months</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Lead Quality</span>
                            <span className="text-green-500">High</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* LinkedIn */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="p-8 rounded-xl bg-card border border-border"
              >
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center flex-shrink-0">
                    <Linkedin className="w-8 h-8 text-blue-500" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl font-semibold">LinkedIn (Organic & Paid)</h3>
                      <span className="px-2 py-1 text-xs rounded-full bg-blue-500/10 text-blue-500">B2B Essential</span>
                    </div>
                    <p className="text-muted-foreground mb-6">
                      LinkedIn is the undisputed king of B2B social media. With 900+ million professionals, it offers unparalleled targeting for reaching decision-makers. Both organic content and paid advertising on LinkedIn drive high-quality B2B leads, though costs are higher than other platforms.
                    </p>

                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                      <div className="p-4 rounded-lg bg-muted/30">
                        <h4 className="font-medium mb-2 flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          Best Practices
                        </h4>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          <li>Post valuable content consistently</li>
                          <li>Engage with industry conversations</li>
                          <li>Use Lead Gen Forms for paid campaigns</li>
                          <li>Target by job title, company, and industry</li>
                        </ul>
                      </div>
                      <div className="p-4 rounded-lg bg-muted/30">
                        <h4 className="font-medium mb-2">Key Metrics</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Avg. Cost Per Lead</span>
                            <span className="text-yellow-500">$50-150 (paid)</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Time to Results</span>
                            <span>Immediate (paid)</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Lead Quality</span>
                            <span className="text-green-500">Very High</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Content Marketing */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="p-8 rounded-xl bg-card border border-border"
              >
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-8 h-8 text-purple-500" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl font-semibold">Content Marketing</h3>
                      <span className="px-2 py-1 text-xs rounded-full bg-purple-500/10 text-purple-500">Foundation</span>
                    </div>
                    <p className="text-muted-foreground mb-6">
                      Content marketing fuels nearly every other traffic channel. High-quality blogs, whitepapers, videos, and podcasts attract organic traffic, perform well in paid campaigns, and give you something valuable to share on social media. It's the engine that powers B2B lead generation.
                    </p>

                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                      {[
                        { icon: FileText, title: "Blog Posts", desc: "Educational content that ranks and converts" },
                        { icon: Video, title: "Video Content", desc: "Demos, tutorials, and thought leadership" },
                        { icon: Mic, title: "Podcasts", desc: "Build authority through long-form discussions" },
                      ].map((item, index) => (
                        <div key={index} className="p-4 rounded-lg bg-muted/30 text-center">
                          <item.icon className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                          <h4 className="font-medium text-sm mb-1">{item.title}</h4>
                          <p className="text-xs text-muted-foreground">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Paid Search */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="p-8 rounded-xl bg-card border border-border"
              >
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 flex items-center justify-center flex-shrink-0">
                    <Target className="w-8 h-8 text-yellow-500" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl font-semibold">Paid Search (Google Ads)</h3>
                      <span className="px-2 py-1 text-xs rounded-full bg-yellow-500/10 text-yellow-500">High Intent</span>
                    </div>
                    <p className="text-muted-foreground mb-6">
                      Google Ads captures prospects at the moment of intent—when they're actively searching for solutions like yours. While competitive B2B keywords can be expensive, the leads are often highly qualified and ready to buy. The key is mastering keyword selection and landing page optimization.
                    </p>

                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                      <div className="p-4 rounded-lg bg-muted/30">
                        <h4 className="font-medium mb-2 flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          Best Practices
                        </h4>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          <li>Focus on long-tail, high-intent keywords</li>
                          <li>Use negative keywords aggressively</li>
                          <li>Create dedicated landing pages</li>
                          <li>Implement conversion tracking properly</li>
                        </ul>
                      </div>
                      <div className="p-4 rounded-lg bg-muted/30">
                        <h4 className="font-medium mb-2">Key Metrics</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Avg. Cost Per Lead</span>
                            <span className="text-yellow-500">$75-200</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Time to Results</span>
                            <span>Immediate</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Lead Quality</span>
                            <span className="text-green-500">Very High</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Email Marketing */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="p-8 rounded-xl bg-card border border-border"
              >
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-red-500/20 to-rose-500/20 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-8 h-8 text-red-500" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl font-semibold">Email Marketing</h3>
                      <span className="px-2 py-1 text-xs rounded-full bg-red-500/10 text-red-500">Best ROI</span>
                    </div>
                    <p className="text-muted-foreground mb-6">
                      Email remains the highest-ROI marketing channel, generating $42 for every $1 spent. For B2B, email is essential for nurturing leads through long sales cycles, re-engaging dormant prospects, and driving traffic to new content and offers.
                    </p>

                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                      <div className="p-4 rounded-lg bg-muted/30">
                        <h4 className="font-medium mb-2 flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          Best Practices
                        </h4>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          <li>Segment lists by behavior and stage</li>
                          <li>Personalize beyond just first name</li>
                          <li>Automate nurture sequences</li>
                          <li>Test subject lines rigorously</li>
                        </ul>
                      </div>
                      <div className="p-4 rounded-lg bg-muted/30">
                        <h4 className="font-medium mb-2">Key Metrics</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Avg. Cost Per Lead</span>
                            <span className="text-green-500">$10-30</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Avg. Open Rate (B2B)</span>
                            <span>15-25%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">ROI</span>
                            <span className="text-green-500">4,200%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Additional Channels Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="More Channels"
              title="Additional High-Value Traffic Sources"
              titleGradient="High-Value Traffic"
              description="Don't overlook these powerful B2B traffic channels"
            />

            <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {[
                {
                  icon: Handshake,
                  title: "Partner & Affiliate Marketing",
                  description: "Leverage partner networks and affiliate programs to tap into established audiences. Partner-referred leads often have higher trust and conversion rates.",
                  stats: "2-3x higher conversion rates"
                },
                {
                  icon: Users,
                  title: "Webinars & Virtual Events",
                  description: "Host educational webinars to capture engaged leads. Attendees invest time, making them highly qualified prospects.",
                  stats: "20-40% attendee-to-lead rate"
                },
                {
                  icon: Globe,
                  title: "Industry Communities",
                  description: "Participate in Slack communities, Discord servers, Reddit, and industry forums where your buyers gather.",
                  stats: "High trust, organic engagement"
                },
                {
                  icon: Award,
                  title: "Review Sites & Directories",
                  description: "Optimize your presence on G2, Capterra, TrustRadius, and industry-specific directories where buyers research solutions.",
                  stats: "84% trust reviews as much as recommendations"
                },
                {
                  icon: Share2,
                  title: "Social Selling",
                  description: "Empower sales teams to build personal brands and engage prospects directly on social platforms.",
                  stats: "78% of social sellers outsell peers"
                },
                {
                  icon: Zap,
                  title: "Meta Lead Ads",
                  description: "Facebook and Instagram Lead Ads can be effective for certain B2B audiences, especially for retargeting and brand awareness.",
                  stats: "Strong for SMB-focused B2B"
                },
              ].map((channel, index) => (
                <motion.div
                  key={channel.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="p-6 rounded-xl bg-card border border-border hover:border-purple-500/50 transition-colors"
                >
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center mb-4">
                    <channel.icon className="w-6 h-6 text-purple-500" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{channel.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{channel.description}</p>
                  <div className="flex items-center gap-2 text-xs">
                    <BarChart3 className="w-4 h-4 text-green-500" />
                    <span className="text-green-500">{channel.stats}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Channel Mix Strategy Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <SectionHeading
                badge="Strategy"
                title="Building Your Traffic Mix Strategy"
                titleGradient="Traffic Mix"
                description="How to allocate resources across channels for maximum ROI"
              />

              <div className="mt-12 prose prose-lg dark:prose-invert max-w-none">
                <p className="text-muted-foreground leading-relaxed">
                  The most successful B2B companies don't rely on a single traffic source. They build diversified traffic portfolios that balance short-term results with long-term growth. Here's how to think about your channel mix.
                </p>

                <div className="not-prose mt-8 space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="p-6 rounded-xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20"
                  >
                    <h4 className="font-semibold mb-4 text-lg">Recommended Budget Allocation by Stage</h4>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">Early Stage</p>
                        <ul className="space-y-2 text-sm">
                          <li className="flex justify-between"><span>Paid Channels</span><span className="text-purple-400">60%</span></li>
                          <li className="flex justify-between"><span>Content & SEO</span><span className="text-purple-400">25%</span></li>
                          <li className="flex justify-between"><span>Social & Community</span><span className="text-purple-400">15%</span></li>
                        </ul>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">Growth Stage</p>
                        <ul className="space-y-2 text-sm">
                          <li className="flex justify-between"><span>Paid Channels</span><span className="text-purple-400">40%</span></li>
                          <li className="flex justify-between"><span>Content & SEO</span><span className="text-purple-400">35%</span></li>
                          <li className="flex justify-between"><span>Social & Community</span><span className="text-purple-400">25%</span></li>
                        </ul>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">Mature Stage</p>
                        <ul className="space-y-2 text-sm">
                          <li className="flex justify-between"><span>Paid Channels</span><span className="text-purple-400">25%</span></li>
                          <li className="flex justify-between"><span>Content & SEO</span><span className="text-purple-400">40%</span></li>
                          <li className="flex justify-between"><span>Social & Community</span><span className="text-purple-400">35%</span></li>
                        </ul>
                      </div>
                    </div>
                  </motion.div>

                  {[
                    {
                      title: "Start with What Scales Fast",
                      content: "If you need leads now, invest in paid channels first. Google Ads and LinkedIn provide immediate visibility and allow you to test messaging quickly. Use early paid campaigns to identify your best-converting audiences and content."
                    },
                    {
                      title: "Build Organic in Parallel",
                      content: "While running paid campaigns, invest in content and SEO. It takes time to rank, but organic traffic compounds. Every piece of content you create today will generate traffic for years to come."
                    },
                    {
                      title: "Measure by Customer Acquisition Cost",
                      content: "Don't just track cost per lead—track cost per customer. A $200 lead that converts at 20% costs less than a $50 lead that converts at 2%. Measure what matters."
                    },
                    {
                      title: "Double Down on Winners",
                      content: "Once you identify channels that work, invest heavily. It's better to dominate one channel than be mediocre across many. Expand to new channels only after maximizing current ones."
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex gap-4"
                    >
                      <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold mb-2">{item.title}</h4>
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
                Ready to <GradientText>Convert More Traffic</GradientText> Into Leads?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                LeadFlow captures leads from any traffic source, automatically enriches them with company data, and scores them with AI. Turn your traffic investments into qualified pipeline.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/handler/sign-up">
                  <GlowButton size="lg" className="group">
                    Start Free Trial
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
                  <Link href="/resources/lead-generation/landing-pages" className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
                    Landing Page Optimization
                  </Link>
                  <Link href="/resources/lead-generation/lead-capture-tools" className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
                    Lead Capture Tools
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
