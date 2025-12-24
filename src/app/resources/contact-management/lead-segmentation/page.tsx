"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Target,
  Users,
  BarChart3,
  CheckCircle2,
  Layers,
  Zap,
  TrendingUp,
  Filter,
  Sparkles,
  PieChart
} from "lucide-react";
import { LandingHeader } from "@/components/landing/layout/landing-header";
import { LandingFooter } from "@/components/landing/layout/landing-footer";
import { GlowButton } from "@/components/landing/ui/glow-button";
import { GradientText } from "@/components/landing/ui/gradient-text";
import { SectionHeading } from "@/components/landing/ui/section-heading";

export default function LeadSegmentationPage() {
  return (
    <div className="min-h-screen bg-background">
      <LandingHeader />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-background to-background" />
          <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-500/30 rounded-full blur-[128px] animate-pulse" />
          <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: "1s" }} />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-sm font-medium text-purple-400 mb-6">
              <Target className="w-4 h-4" />
              Contact Management
            </span>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
              Lead Segmentation for{" "}
              <GradientText animated>Better Targeting</GradientText>
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Master the art of lead segmentation to deliver personalized experiences
              at scale. Increase conversion rates by 300% with targeted messaging
              that resonates with each segment of your audience.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/handler/sign-up">
                <GlowButton size="lg" className="group">
                  Start Segmenting Free
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </GlowButton>
              </Link>
              <Link href="/resources/contact-management/contact-organization" className="text-muted-foreground hover:text-foreground transition-colors">
                ← Back to Organization
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What is Segmentation Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                What is Lead Segmentation and Why Does It Matter?
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Lead segmentation is the process of dividing your contacts into distinct
                groups based on shared characteristics, behaviors, or needs. Instead of
                treating all leads the same, segmentation allows you to tailor your
                approach to each group&apos;s specific situation.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                The impact is significant: segmented email campaigns see 14.31% higher
                open rates and 100.95% higher click-through rates compared to non-segmented
                campaigns. When you speak directly to a prospect&apos;s pain points and
                interests, they listen.
              </p>
              <p className="text-lg text-muted-foreground">
                Modern CRM systems like LeadFlow make segmentation dynamic and automatic.
                Leads move between segments as their behavior changes, ensuring your
                targeting is always current and relevant.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-3xl blur-2xl opacity-60" />
              <div className="relative p-8 rounded-2xl bg-card border border-border">
                <h4 className="font-semibold text-lg mb-6">Segmentation Impact</h4>
                <div className="space-y-6">
                  {[
                    { metric: "Email Open Rate", before: "18%", after: "32%", improvement: "+78%" },
                    { metric: "Click-Through Rate", before: "2.1%", after: "4.2%", improvement: "+100%" },
                    { metric: "Conversion Rate", before: "1.2%", after: "3.8%", improvement: "+217%" },
                    { metric: "Customer Lifetime Value", before: "$2,400", after: "$4,100", improvement: "+71%" }
                  ].map((item) => (
                    <div key={item.metric} className="p-4 rounded-xl bg-muted/50 border border-border">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{item.metric}</span>
                        <span className="text-sm font-bold text-green-500">{item.improvement}</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Before: {item.before}</span>
                        <ArrowRight className="w-4 h-4" />
                        <span className="text-foreground font-medium">After: {item.after}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Types of Segmentation Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Segmentation Types"
            title="Five Essential Types of Lead Segmentation"
            titleGradient="Essential"
            description="Combine multiple segmentation approaches to create highly targeted segments that drive conversions."
          />

          <div className="mt-16 space-y-8">
            {[
              {
                icon: Users,
                title: "Demographic Segmentation",
                color: "purple",
                description: "Segment leads based on who they are—job title, department, company size, industry, and location. This foundational segmentation helps you understand the basic profile of your leads.",
                examples: ["C-Suite executives in tech companies", "Marketing managers at mid-market retailers", "SMB owners in healthcare", "Enterprise IT directors"],
                useCase: "Perfect for B2B companies where buying decisions vary significantly by role and company characteristics."
              },
              {
                icon: BarChart3,
                title: "Behavioral Segmentation",
                color: "blue",
                description: "Group leads by their actions—pages visited, emails opened, content downloaded, and features used. Behavioral data reveals intent and interest level.",
                examples: ["Visited pricing page 3+ times", "Downloaded ROI calculator", "Attended product webinar", "Used free trial extensively"],
                useCase: "Ideal for identifying high-intent leads ready for sales outreach or nurturing sequences."
              },
              {
                icon: TrendingUp,
                title: "Engagement Segmentation",
                color: "cyan",
                description: "Categorize leads by their engagement level—highly engaged, moderately engaged, or inactive. This helps prioritize outreach and prevent churn.",
                examples: ["Active in last 7 days", "Engaged but cooling off", "At risk of churning", "Re-engaged after dormancy"],
                useCase: "Essential for customer success teams and retention-focused campaigns."
              },
              {
                icon: Layers,
                title: "Lifecycle Stage Segmentation",
                color: "green",
                description: "Segment by where leads are in the buyer&apos;s journey—awareness, consideration, decision, or customer. Each stage requires different messaging.",
                examples: ["New subscribers", "MQL (Marketing Qualified)", "SQL (Sales Qualified)", "Opportunity", "Customer"],
                useCase: "Fundamental for aligning marketing and sales efforts across the funnel."
              },
              {
                icon: Zap,
                title: "Predictive Segmentation",
                color: "orange",
                description: "Use AI and machine learning to segment leads by predicted outcomes—likelihood to convert, expected deal size, or churn probability.",
                examples: ["High conversion probability", "Large deal potential", "Quick close candidates", "Expansion opportunities"],
                useCase: "Advanced segmentation that prioritizes resources on highest-value opportunities."
              }
            ].map((segment, index) => (
              <motion.div
                key={segment.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-8 rounded-2xl bg-card border border-border hover:border-purple-500/50 transition-colors"
              >
                <div className="grid lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-${segment.color}-500/20 flex items-center justify-center`}>
                        <segment.icon className={`w-6 h-6 text-${segment.color}-500`} />
                      </div>
                      <h3 className="text-2xl font-bold">{segment.title}</h3>
                    </div>
                    <p className="text-muted-foreground mb-4">{segment.description}</p>
                    <p className="text-sm text-muted-foreground"><strong>Best for:</strong> {segment.useCase}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Example Segments</h4>
                    <ul className="space-y-2">
                      {segment.examples.map((example, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                          <span>{example}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Implementation Strategy Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Implementation"
            title="How to Implement Lead Segmentation"
            titleGradient="Implement"
            description="Follow this proven framework to build a segmentation strategy that drives results."
          />

          <div className="mt-16 grid md:grid-cols-2 gap-8">
            {[
              {
                step: "01",
                title: "Define Your Ideal Customer Profiles",
                description: "Start by identifying your best customers. What do they have in common? Analyze your top 20% of customers by revenue and look for patterns in demographics, behavior, and needs. These profiles become the foundation of your segmentation strategy.",
                tips: ["Interview your best customers", "Analyze common characteristics", "Identify key buying triggers", "Document objections and solutions"]
              },
              {
                step: "02",
                title: "Collect the Right Data",
                description: "Segmentation is only as good as your data. Ensure you&apos;re capturing the information needed to segment effectively. This includes explicit data (what leads tell you) and implicit data (what their behavior reveals).",
                tips: ["Progressive profiling on forms", "Track website behavior", "Monitor email engagement", "Integrate with enrichment tools"]
              },
              {
                step: "03",
                title: "Create Initial Segments",
                description: "Start with broad segments and refine over time. Begin with 3-5 primary segments based on your ICPs. Test different segmentation criteria and measure which groupings produce the best results.",
                tips: ["Start broad, then narrow", "Test segment performance", "Ensure segments are actionable", "Make segments mutually exclusive"]
              },
              {
                step: "04",
                title: "Build Targeted Campaigns",
                description: "Develop messaging, content, and offers specific to each segment. The goal is relevance—every touchpoint should feel personalized to the segment&apos;s needs and interests.",
                tips: ["Customize email sequences", "Create segment-specific content", "Tailor sales scripts", "Personalize landing pages"]
              },
              {
                step: "05",
                title: "Automate Segment Assignment",
                description: "Use your CRM&apos;s automation capabilities to assign leads to segments automatically. Set up rules based on form submissions, behavior, and engagement that update segment membership in real-time.",
                tips: ["Define assignment criteria", "Set up lead scoring rules", "Create workflow automations", "Test automation accuracy"]
              },
              {
                step: "06",
                title: "Measure and Optimize",
                description: "Track segment performance rigorously. Which segments convert best? Which have the highest LTV? Use these insights to refine your segmentation strategy and allocate resources effectively.",
                tips: ["Track segment conversion rates", "Measure revenue by segment", "A/B test segment criteria", "Iterate based on data"]
              }
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-card border border-border"
              >
                <div className="flex items-start gap-4">
                  <span className="text-4xl font-bold text-purple-500/30">{item.step}</span>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground mb-4">{item.description}</p>
                    <ul className="grid grid-cols-2 gap-2">
                      {item.tips.map((tip, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* LeadFlow Segmentation Features */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="LeadFlow Features"
            title="Powerful Segmentation Tools in LeadFlow"
            titleGradient="Powerful"
            description="Everything you need to build, manage, and optimize segments at scale."
          />

          <div className="mt-16 grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Sparkles,
                title: "AI-Powered Segments",
                description: "Let AI analyze your data and suggest optimal segments based on conversion patterns and customer behavior. Discover segments you didn&apos;t know existed."
              },
              {
                icon: Filter,
                title: "Visual Segment Builder",
                description: "Build complex segments with an intuitive drag-and-drop interface. Combine any criteria with AND/OR logic—no technical skills required."
              },
              {
                icon: PieChart,
                title: "Segment Analytics",
                description: "Track performance metrics for each segment in real-time. See conversion rates, engagement scores, and revenue attribution at a glance."
              },
              {
                icon: Zap,
                title: "Dynamic Membership",
                description: "Segments update automatically as lead data changes. Leads flow in and out of segments based on behavior and engagement."
              },
              {
                icon: TrendingUp,
                title: "Predictive Scoring",
                description: "AI scores leads on likelihood to convert, enabling predictive segmentation that prioritizes your highest-value opportunities."
              },
              {
                icon: Users,
                title: "Overlap Analysis",
                description: "Understand how segments intersect. Identify leads that belong to multiple high-value segments for maximum targeting precision."
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-card border border-border hover:border-purple-500/50 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-purple-500" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
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
            className="relative max-w-4xl mx-auto"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-cyan-500/20 rounded-3xl blur-2xl opacity-60" />
            <div className="relative p-12 rounded-2xl bg-card border border-border text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Start Targeting Smarter Today
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                LeadFlow&apos;s AI-powered segmentation helps you deliver the right message
                to the right lead at the right time. See 3x better conversion rates
                with intelligent targeting.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/handler/sign-up">
                  <GlowButton size="lg" className="group">
                    Try Free for 14 Days
                    <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </GlowButton>
                </Link>
                <Link href="/resources/contact-management/activity-tracking" className="text-muted-foreground hover:text-foreground transition-colors">
                  Continue to Activity Tracking →
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Resources */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8 text-center">Related Resources</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                title: "Contact Organization",
                description: "Learn the foundational strategies for organizing your contacts effectively.",
                href: "/resources/contact-management/contact-organization"
              },
              {
                title: "Activity Tracking",
                description: "Track every interaction and build a complete picture of each lead.",
                href: "/resources/contact-management/activity-tracking"
              },
              {
                title: "Notes & History",
                description: "Capture and leverage contact notes for better relationships.",
                href: "/resources/contact-management/notes-history"
              }
            ].map((resource) => (
              <Link
                key={resource.title}
                href={resource.href}
                className="p-6 rounded-xl bg-card border border-border hover:border-purple-500/50 transition-colors"
              >
                <h3 className="font-semibold mb-2">{resource.title}</h3>
                <p className="text-sm text-muted-foreground">{resource.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
}
