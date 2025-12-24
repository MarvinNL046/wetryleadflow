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
  ArrowRight,
  CheckCircle2,
  Zap,
  Camera,
  Heart,
  MessageCircle,
  TrendingUp,
  Users,
  BarChart3,
  Sparkles,
  Video,
  ShoppingBag,
} from "lucide-react";

export default function InstagramLeadGenerationPage() {
  return (
    <div className="min-h-screen bg-background">
      <LandingHeader />
      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-background to-background" />
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-pink-500/30 rounded-full blur-[128px] animate-pulse" />
            <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-[128px] animate-pulse" />
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto text-center"
            >
              <span className="inline-flex items-center px-3 py-1 mb-6 text-sm font-medium rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                Meta Ads Integration
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
                Instagram Lead Generation:{" "}
                <GradientText>Strategies That Convert</GradientText>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Transform your Instagram presence into a lead generation
                powerhouse. Learn how to capture high-quality leads from Stories,
                Reels, and Feed ads with LeadFlow&apos;s powerful integration.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/handler/sign-up">
                  <GlowButton size="lg" className="group">
                    Start Generating Leads
                    <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </GlowButton>
                </Link>
                <Link
                  href="/resources/meta-ads/facebook-lead-ads"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Facebook Lead Ads Guide →
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Why Instagram Section */}
        <section className="py-20 border-t border-border/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Why <GradientText>Instagram</GradientText> for Lead Generation?
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  With over 2 billion monthly active users, Instagram has evolved
                  from a photo-sharing app into one of the most powerful lead
                  generation platforms available. The platform&apos;s highly engaged
                  user base and diverse ad formats make it ideal for businesses
                  looking to connect with potential customers in a visually
                  compelling environment.
                </p>
                <p className="text-lg text-muted-foreground mb-6">
                  Instagram users are 58% more likely to engage with branded
                  content compared to other platforms. The platform&apos;s unique
                  features like Stories, Reels, and Shopping provide multiple
                  touchpoints for capturing leads throughout the customer journey.
                  When combined with Meta&apos;s sophisticated targeting capabilities,
                  Instagram becomes an incredibly efficient lead generation channel.
                </p>
                <p className="text-lg text-muted-foreground">
                  The key to success on Instagram is combining compelling visual
                  content with frictionless lead capture. LeadFlow integrates
                  seamlessly with Instagram Lead Ads, automatically syncing every
                  lead to your CRM and triggering instant follow-up sequences that
                  capitalize on peak engagement moments.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { stat: "2B+", label: "Monthly Active Users", icon: Users },
                    { stat: "58%", label: "Higher Engagement Rate", icon: Heart },
                    { stat: "130M", label: "Shopping Taps Monthly", icon: ShoppingBag },
                    { stat: "83%", label: "Discover New Products Here", icon: Sparkles },
                  ].map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm text-center"
                    >
                      <item.icon className="w-8 h-8 text-purple-500 mx-auto mb-3" />
                      <div className="text-3xl font-bold text-purple-400 mb-1">
                        {item.stat}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {item.label}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Ad Formats Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Ad Formats"
              title="Instagram Lead Generation Ad Formats"
              titleGradient="Ad Formats"
              description="Leverage Instagram's diverse ad placements to reach your audience at every touchpoint and maximize lead generation opportunities."
            />

            <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Camera,
                  title: "Feed Ads",
                  description:
                    "Appear seamlessly in users' main feeds alongside organic content. Perfect for detailed product showcases and longer-form messaging that drives consideration.",
                  tips: [
                    "Use high-quality, eye-catching images",
                    "Include clear call-to-action overlays",
                    "Test carousel formats for storytelling",
                  ],
                },
                {
                  icon: Video,
                  title: "Stories Ads",
                  description:
                    "Full-screen vertical ads between organic Stories. Ideal for time-sensitive offers and creating urgency with the ephemeral format.",
                  tips: [
                    "Design for sound-off viewing",
                    "Use the first 3 seconds to hook viewers",
                    "Add interactive stickers and polls",
                  ],
                },
                {
                  icon: Sparkles,
                  title: "Reels Ads",
                  description:
                    "Short-form video ads in the Reels feed. Perfect for reaching younger demographics and leveraging trending audio and formats.",
                  tips: [
                    "Keep content authentic and native",
                    "Leverage trending sounds and effects",
                    "Focus on entertainment first, sales second",
                  ],
                },
                {
                  icon: MessageCircle,
                  title: "Direct Message Ads",
                  description:
                    "Click-to-DM ads that start conversations directly in Instagram Direct. Great for high-touch sales processes and personalized interactions.",
                  tips: [
                    "Set up automated welcome messages",
                    "Qualify leads through conversation",
                    "Respond quickly to maintain engagement",
                  ],
                },
                {
                  icon: ShoppingBag,
                  title: "Shopping Ads",
                  description:
                    "Product-tagged ads that link directly to your catalog. Combine lead generation with product discovery for e-commerce businesses.",
                  tips: [
                    "Tag products in lifestyle imagery",
                    "Use collections for product bundles",
                    "Retarget cart abandoners with lead forms",
                  ],
                },
                {
                  icon: TrendingUp,
                  title: "Explore Ads",
                  description:
                    "Reach users actively discovering new content in the Explore tab. Perfect for expanding reach beyond your existing audience.",
                  tips: [
                    "Use bold, attention-grabbing visuals",
                    "Target interest-based audiences",
                    "Test different creative approaches",
                  ],
                },
              ].map((format, index) => (
                <motion.div
                  key={format.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mb-4">
                    <format.icon className="w-6 h-6 text-purple-500" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{format.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {format.description}
                  </p>
                  <div className="space-y-2">
                    {format.tips.map((tip, tipIndex) => (
                      <div key={tipIndex} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-xs text-muted-foreground">{tip}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Strategy Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <SectionHeading
                badge="Winning Strategies"
                title="Instagram Lead Generation Strategies"
                titleGradient="Strategies"
                description="Proven tactics to maximize your Instagram lead generation results and reduce cost-per-lead."
              />

              <div className="mt-12 space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="p-8 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm"
                >
                  <h3 className="text-xl font-semibold mb-4">
                    1. Create Thumb-Stopping Creative
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Instagram is a visual platform first and foremost. Your ad
                    creative needs to stop the scroll within the first second.
                    This means using bold colors, clear subjects, and avoiding
                    cluttered compositions. Test different creative approaches
                    including user-generated content, professional photography,
                    and graphic designs to find what resonates with your audience.
                  </p>
                  <p className="text-muted-foreground">
                    Motion captures attention even more effectively than static
                    images. Use subtle animations, cinemagraphs, or short video
                    clips to stand out in the feed. LeadFlow customers who use
                    video creative see an average 35% lower cost-per-lead compared
                    to static images alone.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="p-8 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm"
                >
                  <h3 className="text-xl font-semibold mb-4">
                    2. Leverage Social Proof in Your Forms
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Instagram users are heavily influenced by social proof.
                    Include testimonials, review counts, or customer success
                    metrics in your lead form intro sections. Phrases like
                    &ldquo;Join 10,000+ satisfied customers&rdquo; or &ldquo;Rated 4.9/5 by real
                    users&rdquo; significantly increase form completion rates.
                  </p>
                  <p className="text-muted-foreground">
                    Consider adding a short video testimonial as your form&apos;s
                    context card. This builds trust and gives potential leads
                    confidence that they&apos;re making the right decision by sharing
                    their information with your business.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="p-8 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm"
                >
                  <h3 className="text-xl font-semibold mb-4">
                    3. Implement a Full-Funnel Strategy
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    The most successful Instagram lead generation campaigns don&apos;t
                    rely on cold traffic alone. Build a full-funnel approach that
                    warms up prospects before asking them to submit their
                    information. Start with awareness campaigns using Reels and
                    Stories to introduce your brand and build engagement audiences.
                  </p>
                  <p className="text-muted-foreground">
                    Then retarget engaged users with lead generation campaigns.
                    LeadFlow&apos;s audience sync feature automatically creates Custom
                    Audiences from your CRM data, enabling you to exclude existing
                    leads and customers while targeting lookalike audiences based
                    on your best converters.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="p-8 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm"
                >
                  <h3 className="text-xl font-semibold mb-4">
                    4. Optimize for Mobile Experience
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Unlike Facebook, Instagram is almost exclusively a mobile
                    platform. Every element of your lead generation campaign must
                    be optimized for mobile viewing and interaction. This means
                    keeping form fields minimal, using large tap targets, and
                    ensuring any post-submission experiences are mobile-friendly.
                  </p>
                  <p className="text-muted-foreground">
                    LeadFlow&apos;s mobile app ensures your sales team can respond to
                    Instagram leads instantly, regardless of where they are. Set up
                    push notifications and one-tap calling to ensure no lead goes
                    cold due to delayed follow-up.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* LeadFlow Integration Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Seamless Integration"
              title="How LeadFlow Maximizes Your Instagram Leads"
              titleGradient="LeadFlow"
              description="From capture to conversion, LeadFlow automates your entire Instagram lead management workflow."
            />

            <div className="mt-16 grid md:grid-cols-2 gap-8">
              {[
                {
                  icon: Zap,
                  title: "Instant Lead Sync",
                  description:
                    "Every Instagram lead is captured in LeadFlow within seconds of form submission. No manual exports, no delays, no missed opportunities.",
                },
                {
                  icon: BarChart3,
                  title: "AI Lead Scoring",
                  description:
                    "Our AI analyzes each lead's engagement patterns, form responses, and profile data to predict conversion likelihood and prioritize follow-up.",
                },
                {
                  icon: Users,
                  title: "Automated Assignment",
                  description:
                    "Route Instagram leads to the right sales rep based on product interest, location, or any custom criteria you define.",
                },
                {
                  icon: TrendingUp,
                  title: "Performance Analytics",
                  description:
                    "Track which Instagram campaigns, ad sets, and creatives generate your highest-quality leads with complete ROI attribution.",
                },
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-8 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-purple-500" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
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
              className="relative max-w-4xl mx-auto"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-purple-500/20 rounded-3xl blur-2xl opacity-60" />
              <div className="relative p-12 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Start Generating <GradientText>Instagram Leads</GradientText>{" "}
                  Today
                </h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Connect your Instagram ads to LeadFlow and start converting
                  followers into customers. Free trial includes full Meta
                  integration with no credit card required.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href="/handler/sign-up">
                    <GlowButton size="lg" className="group">
                      Start Free Trial
                      <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </GlowButton>
                  </Link>
                  <Link
                    href="/resources/meta-ads/meta-lead-forms"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Optimize Your Lead Forms →
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Related Resources */}
        <section className="py-20 border-t border-border/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-8 text-center">
              Related Resources
            </h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                {
                  title: "Facebook Lead Ads Guide",
                  description:
                    "Complete guide to Facebook Lead Ads integration with LeadFlow.",
                  href: "/resources/meta-ads/facebook-lead-ads",
                },
                {
                  title: "Meta Lead Form Optimization",
                  description:
                    "Create high-converting lead forms for Facebook and Instagram.",
                  href: "/resources/meta-ads/meta-lead-forms",
                },
                {
                  title: "Ad Optimization Strategies",
                  description:
                    "Maximize your Meta ad performance and reduce cost-per-lead.",
                  href: "/resources/meta-ads/ad-optimization",
                },
              ].map((resource) => (
                <Link
                  key={resource.title}
                  href={resource.href}
                  className="p-6 rounded-xl border border-border/50 bg-card/50 hover:border-purple-500/30 transition-colors group"
                >
                  <h3 className="font-semibold mb-2 group-hover:text-purple-400 transition-colors">
                    {resource.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {resource.description}
                  </p>
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
