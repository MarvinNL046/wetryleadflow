"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  LandingHeader,
  LandingFooter,
  GlowButton,
  GradientText,
} from "@/components/landing";
import {
  Users,
  ArrowRight,
  Filter,
  FolderOpen,
  Magnet,
  Globe,
  Tags,
  Layers,
} from "lucide-react";

const linkedPages = [
  {
    title: "Lead Segmentation",
    description: "Create smart segments to group leads by behavior, demographics, and engagement for targeted outreach.",
    href: "/resources/contact-management/lead-segmentation",
    icon: Filter,
    pillar: "Contact Management",
    color: "pink",
  },
  {
    title: "Contact Organization",
    description: "Organize your contacts with tags, custom fields, and smart lists for easy management at scale.",
    href: "/resources/contact-management/contact-organization",
    icon: FolderOpen,
    pillar: "Contact Management",
    color: "pink",
  },
  {
    title: "Lead Magnets",
    description: "Create compelling lead magnets that attract your ideal customers and grow your pipeline fast.",
    href: "/resources/lead-generation/lead-magnets",
    icon: Magnet,
    pillar: "Lead Generation",
    color: "orange",
  },
  {
    title: "Traffic Sources",
    description: "Identify and optimize your best traffic sources to generate more qualified leads consistently.",
    href: "/resources/lead-generation/traffic-sources",
    icon: Globe,
    pillar: "Lead Generation",
    color: "orange",
  },
];

const relatedTopics = [
  { title: "Activity Tracking", href: "/resources/contact-management/activity-tracking", color: "pink" },
  { title: "Notes & History", href: "/resources/contact-management/notes-history", color: "pink" },
  { title: "Landing Pages", href: "/resources/lead-generation/landing-pages", color: "orange" },
  { title: "Form Optimization", href: "/resources/lead-generation/form-optimization", color: "orange" },
];

export default function LeadSegmentationStrategiesPage() {
  return (
    <>
      <meta name="robots" content="noindex, follow" />

      <div className="min-h-screen bg-background">
        <LandingHeader />

        <main>
          {/* Hero Section */}
          <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-20">
            <div className="absolute inset-0 -z-10">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-pink-900/30 via-background to-background" />
              <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-pink-500/30 rounded-full blur-[128px] animate-pulse" />
              <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-orange-500/20 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: "1s" }} />
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
                  className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium rounded-full bg-pink-500/10 text-pink-400 border border-pink-500/20"
                >
                  <Tags className="w-4 h-4 mr-2" />
                  Crossover Topic Hub
                </motion.div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
                  <GradientText animated>Lead Segmentation Strategies</GradientText>
                </h1>

                <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                  Master the art of lead segmentation to deliver personalized experiences at scale.
                  Learn how to combine contact management best practices with lead generation
                  strategies for maximum conversion impact.
                </p>

                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <span className="px-3 py-1 rounded-full bg-pink-500/10 text-pink-400">Contact Management</span>
                  <span className="text-muted-foreground">+</span>
                  <span className="px-3 py-1 rounded-full bg-orange-500/10 text-orange-400">Lead Generation</span>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Introduction Section */}
          <section className="py-16 lg:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="max-w-3xl mx-auto"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500">
                    <Layers className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold">Personalization Through Smart Segmentation</h2>
                </div>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Not all leads are created equal. The key to higher conversion rates lies in
                    understanding the differences between your leads and tailoring your approach
                    accordingly. Segmentation bridges the gap between mass marketing and true
                    one-to-one personalization.
                  </p>
                  <p>
                    By combining sophisticated contact management with strategic lead generation,
                    you can capture the right data from the start and use it to create segments
                    that drive targeted campaigns, automated workflows, and personalized
                    sales outreach.
                  </p>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Linked Pages Grid */}
          <section className="py-16 lg:py-24 bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Explore <GradientText>Related Guides</GradientText>
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Dive deep into contact management and lead generation with our comprehensive guides.
                </p>
              </motion.div>

              <div className="grid gap-6 md:grid-cols-2">
                {linkedPages.map((page, index) => (
                  <motion.div
                    key={page.href}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link
                      href={page.href}
                      className="group block h-full p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-pink-500/50 hover:bg-pink-500/5 transition-all duration-300"
                    >
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${page.color === "pink" ? "from-pink-500 to-rose-500" : "from-orange-500 to-amber-500"}`}>
                          <page.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`text-xs px-2 py-0.5 rounded-full ${page.color === "pink" ? "bg-pink-500/10 text-pink-400" : "bg-orange-500/10 text-orange-400"}`}>
                              {page.pillar}
                            </span>
                          </div>
                          <h3 className="text-xl font-bold mb-2 group-hover:text-pink-400 transition-colors">
                            {page.title}
                          </h3>
                          <p className="text-muted-foreground text-sm mb-4">
                            {page.description}
                          </p>
                          <span className="inline-flex items-center text-sm font-medium text-pink-400 group-hover:text-pink-300">
                            Read Guide
                            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Key Benefits Section */}
          <section className="py-16 lg:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Why Segmentation + Generation = <GradientText>Conversions</GradientText>
                </h2>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    icon: Filter,
                    title: "Targeted Messaging",
                    description: "Send the right message to the right leads at the right time by understanding their unique characteristics."
                  },
                  {
                    icon: Magnet,
                    title: "Quality Lead Capture",
                    description: "Design lead magnets and forms that capture segmentation data from the very first interaction."
                  },
                  {
                    icon: Users,
                    title: "Scalable Personalization",
                    description: "Deliver personalized experiences to thousands of leads without manual intervention."
                  }
                ].map((benefit, index) => (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="p-6 rounded-2xl bg-gradient-to-br from-pink-500/5 to-rose-500/5 border border-border hover:border-pink-500/30 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500/20 to-rose-500/20 flex items-center justify-center mb-4">
                      <benefit.icon className="w-6 h-6 text-pink-500" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground text-sm">{benefit.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Related Topics Section */}
          <section className="py-16 lg:py-24 bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="p-8 rounded-2xl border border-border/50 bg-card/30"
              >
                <h3 className="text-lg font-semibold mb-4">Related Topics</h3>
                <div className="flex flex-wrap gap-3">
                  {relatedTopics.map((topic) => (
                    <Link
                      key={topic.href}
                      href={topic.href}
                      className={`px-4 py-2 rounded-full ${topic.color === "pink" ? "bg-pink-500/10 text-pink-400 hover:bg-pink-500/20" : "bg-orange-500/10 text-orange-400 hover:bg-orange-500/20"} transition-colors text-sm`}
                    >
                      {topic.title}
                    </Link>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 lg:py-32">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center max-w-3xl mx-auto"
              >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
                  Ready to <GradientText>Segment Smarter</GradientText>?
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  LeadFlow makes it easy to capture, organize, and segment leads for maximum
                  conversion. Start building targeted campaigns that resonate with your audience.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href="/handler/sign-up">
                    <GlowButton size="lg" className="group">
                      Start Free Trial
                      <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </GlowButton>
                  </Link>
                  <Link
                    href="/resources/contact-management"
                    className="inline-flex items-center gap-2 px-6 py-3 text-base font-medium rounded-full border border-border hover:bg-accent transition-colors"
                  >
                    Explore Contact Management Hub
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>
        </main>

        <LandingFooter />
      </div>
    </>
  );
}
