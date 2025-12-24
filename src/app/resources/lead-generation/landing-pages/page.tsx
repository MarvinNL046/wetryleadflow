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
  Layout,
  MousePointer,
  Eye,
  Layers,
  CheckCircle,
  ArrowRight,
  Target,
  Sparkles,
  Zap,
  BarChart3,
  MessageSquare,
  Shield,
  Clock,
  Users,
} from "lucide-react";

export default function LandingPagesPage() {
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
                High-Converting <GradientText>Landing Pages</GradientText> for Lead Gen
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Master the art and science of landing page design. Learn proven techniques to create pages that convert visitors into qualified leads at rates your competitors envy.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/handler/sign-up">
                  <GlowButton size="lg" className="group">
                    Start Converting More Leads
                    <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </GlowButton>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Understanding Landing Pages Section */}
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
                badge="Landing Page Fundamentals"
                title="What Makes a Landing Page Convert?"
                titleGradient="Convert"
                description="Understanding the psychology and mechanics behind effective landing pages"
              />

              <div className="mt-12 prose prose-lg dark:prose-invert max-w-none">
                <p className="text-muted-foreground leading-relaxed">
                  A landing page is a standalone web page created specifically for a marketing or advertising campaign. Unlike your homepage or other website pages, a landing page has one focused objective: converting visitors into leads or customers. This singular focus is what makes landing pages so powerful for lead generation.
                </p>

                <p className="text-muted-foreground leading-relaxed mt-4">
                  The average landing page conversion rate across industries is around 2.35%, but top-performing pages achieve 5-10% or higher. The difference between average and exceptional landing pages comes down to understanding visitor psychology, removing friction, and presenting compelling value propositions that resonate with your target audience.
                </p>

                <div className="grid md:grid-cols-2 gap-6 mt-8 not-prose">
                  {[
                    { icon: Eye, title: "Clear Value Proposition", description: "Visitors should understand what you offer and why it matters within 5 seconds of landing on your page" },
                    { icon: Target, title: "Single Focused Goal", description: "Every element on the page should guide visitors toward one specific conversion action" },
                    { icon: MessageSquare, title: "Compelling Copy", description: "Headlines and body text that speak directly to visitor pain points and desired outcomes" },
                    { icon: Shield, title: "Trust Elements", description: "Social proof, testimonials, and security indicators that reduce anxiety and build confidence" },
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
                        <item.icon className="w-6 h-6 text-purple-500" />
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

        {/* Anatomy of a Landing Page Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Page Structure"
              title="The Anatomy of a High-Converting Landing Page"
              titleGradient="High-Converting"
              description="Essential elements every effective landing page needs"
            />

            <div className="mt-12 max-w-4xl mx-auto">
              <div className="space-y-6">
                {[
                  {
                    number: "01",
                    title: "Attention-Grabbing Headline",
                    description: "Your headline is the first thing visitors see and determines whether they stay or leave. It should clearly communicate your unique value proposition in 10 words or less. Use benefit-driven language that addresses your visitors' primary pain point or desired outcome.",
                    tips: ["Use numbers or statistics when possible", "Ask a provocative question", "Make a bold promise you can deliver"]
                  },
                  {
                    number: "02",
                    title: "Supporting Subheadline",
                    description: "The subheadline expands on your main headline, providing additional context and reinforcing your value proposition. It should answer the 'how' or 'why' that your headline introduced.",
                    tips: ["Keep it to 1-2 sentences", "Add specificity to your promise", "Include a time frame if applicable"]
                  },
                  {
                    number: "03",
                    title: "Hero Image or Video",
                    description: "Visual content helps visitors understand your offering quickly. Use images that show your product in action, happy customers using your service, or videos that demonstrate results.",
                    tips: ["Use real photos over stock images", "Show the end result, not just the product", "Keep videos under 2 minutes"]
                  },
                  {
                    number: "04",
                    title: "Benefits-Focused Body Copy",
                    description: "Detail the specific benefits visitors will receive. Focus on outcomes rather than features. Use bullet points for scanability and address potential objections throughout.",
                    tips: ["Lead with the biggest benefit", "Use 'you' language throughout", "Include specific numbers and results"]
                  },
                  {
                    number: "05",
                    title: "Social Proof Elements",
                    description: "Include testimonials, case studies, client logos, user counts, or third-party validations. Social proof reduces perceived risk and builds trust with new visitors.",
                    tips: ["Use testimonials with photos and full names", "Include relevant metrics from case studies", "Feature logos of recognizable brands"]
                  },
                  {
                    number: "06",
                    title: "Clear Call-to-Action",
                    description: "Your CTA button should stand out visually and use action-oriented copy. The button text should clearly communicate what happens next and reinforce the value of converting.",
                    tips: ["Use contrasting colors for visibility", "Write specific button text (not just 'Submit')", "Place multiple CTAs on longer pages"]
                  },
                ].map((item, index) => (
                  <motion.div
                    key={item.number}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="p-6 rounded-xl bg-card border border-border"
                  >
                    <div className="flex gap-6">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold">
                        {item.number}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                        <p className="text-muted-foreground mb-4">{item.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {item.tips.map((tip, tipIndex) => (
                            <span key={tipIndex} className="inline-flex items-center gap-1 px-3 py-1 text-xs rounded-full bg-purple-500/10 text-purple-400">
                              <CheckCircle className="w-3 h-3" />
                              {tip}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Landing Page Types Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Page Types"
              title="Types of Landing Pages for B2B Lead Generation"
              titleGradient="B2B Lead Generation"
              description="Choose the right format for your campaign goals"
            />

            <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {[
                {
                  icon: Layout,
                  title: "Lead Capture Pages",
                  description: "Simple pages focused on collecting contact information in exchange for a valuable resource like an ebook, webinar registration, or free tool access.",
                  bestFor: "Top-of-funnel lead generation"
                },
                {
                  icon: MousePointer,
                  title: "Click-Through Pages",
                  description: "Warm up visitors before sending them to a sales page or checkout. Provides additional information and builds desire before asking for commitment.",
                  bestFor: "Free trial signups, demo requests"
                },
                {
                  icon: Sparkles,
                  title: "Product Launch Pages",
                  description: "Build anticipation for new products or features. Capture early interest with waitlist signups and exclusive preview access.",
                  bestFor: "New product announcements"
                },
                {
                  icon: BarChart3,
                  title: "Long-Form Sales Pages",
                  description: "Comprehensive pages that tell a complete story, address all objections, and guide visitors through a detailed buying journey.",
                  bestFor: "High-ticket B2B solutions"
                },
                {
                  icon: Clock,
                  title: "Webinar Registration Pages",
                  description: "Event-focused pages that create urgency and communicate the value of attending a live or recorded educational session.",
                  bestFor: "Educational marketing, thought leadership"
                },
                {
                  icon: Users,
                  title: "Consultation Request Pages",
                  description: "Qualify leads by encouraging them to request personalized consultations or assessments from your sales team.",
                  bestFor: "Enterprise sales, complex solutions"
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="p-6 rounded-xl bg-card border border-border hover:border-purple-500/50 transition-colors"
                >
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-purple-500" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-purple-400 font-medium">Best for:</span>
                    <span className="text-muted-foreground">{item.bestFor}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Optimization Strategies Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <SectionHeading
                badge="Optimization"
                title="Landing Page Optimization Strategies That Work"
                titleGradient="Optimization Strategies"
                description="Data-driven techniques to continuously improve conversion rates"
              />

              <div className="mt-12 prose prose-lg dark:prose-invert max-w-none">
                <p className="text-muted-foreground leading-relaxed">
                  Creating a landing page is just the beginning. The real magic happens when you systematically test and optimize every element. Here are proven strategies used by top-performing B2B marketers to squeeze maximum conversions from their landing pages.
                </p>

                <div className="not-prose grid md:grid-cols-2 gap-6 mt-8">
                  {[
                    {
                      title: "A/B Test Headlines First",
                      description: "Headlines have the biggest impact on conversion rates. Test different value propositions, lengths, and formats to find what resonates with your audience."
                    },
                    {
                      title: "Reduce Form Fields",
                      description: "Every additional form field decreases conversions by 4-11%. Only ask for information you absolutely need, and consider progressive profiling for returning visitors."
                    },
                    {
                      title: "Add Exit-Intent Popups",
                      description: "Capture visitors about to leave with a compelling final offer. Exit popups can recover 10-15% of abandoning visitors when used appropriately."
                    },
                    {
                      title: "Optimize Page Speed",
                      description: "Every second of load time reduces conversions by 7%. Compress images, minimize code, and use CDNs to ensure fast loading across all devices."
                    },
                    {
                      title: "Test CTA Button Elements",
                      description: "Experiment with button color, size, position, and copy. Sometimes small changes like switching from 'Submit' to 'Get My Free Guide' can double conversions."
                    },
                    {
                      title: "Implement Heat Mapping",
                      description: "Use tools like Hotjar or Crazy Egg to see how visitors interact with your page. Identify where attention drops and optimize those areas."
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="p-6 rounded-xl bg-card border border-border"
                    >
                      <div className="flex items-start gap-3">
                        <Zap className="w-5 h-5 text-purple-500 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold mb-2">{item.title}</h4>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <p className="text-muted-foreground leading-relaxed mt-8">
                  Remember that optimization is an ongoing process. The most successful landing pages are never 'finished'—they're continuously refined based on new data, changing audience preferences, and evolving best practices. Set up a regular testing schedule and commit to making incremental improvements over time.
                </p>
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
                Ready to Build <GradientText>Better Landing Pages</GradientText>?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                LeadFlow integrates seamlessly with your landing pages to capture, score, and route leads automatically. Connect your pages to AI-powered lead management and watch your pipeline grow.
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
                    Form Optimization Tips
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
