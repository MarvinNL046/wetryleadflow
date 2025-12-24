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
  FileText,
  Video,
  Calculator,
  BookOpen,
  CheckCircle,
  ArrowRight,
  Target,
  Users,
  TrendingUp,
  Zap,
  Gift,
  BarChart3,
} from "lucide-react";

export default function LeadMagnetsPage() {
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
                Lead Magnets That <GradientText>Convert</GradientText>: Complete Guide
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Discover how to create irresistible lead magnets that capture high-quality leads and accelerate your B2B sales pipeline. Learn proven strategies used by top-performing companies.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/handler/sign-up">
                  <GlowButton size="lg" className="group">
                    Start Capturing Leads
                    <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </GlowButton>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* What Are Lead Magnets Section */}
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
                badge="Understanding Lead Magnets"
                title="What Are Lead Magnets and Why Do They Matter?"
                titleGradient="Lead Magnets"
                description="The foundation of any successful lead generation strategy"
              />

              <div className="mt-12 prose prose-lg dark:prose-invert max-w-none">
                <p className="text-muted-foreground leading-relaxed">
                  A lead magnet is a valuable piece of content or offer that you provide to potential customers in exchange for their contact information, typically an email address. In the B2B world, lead magnets serve as the critical first touchpoint in your sales funnel, establishing trust and demonstrating expertise before any sales conversation begins.
                </p>

                <p className="text-muted-foreground leading-relaxed mt-4">
                  The most effective lead magnets solve a specific problem for your target audience. They provide immediate, tangible value that positions your company as a knowledgeable partner rather than just another vendor. When done correctly, lead magnets can dramatically increase your conversion rates while simultaneously improving lead quality.
                </p>

                <div className="grid md:grid-cols-3 gap-6 mt-8 not-prose">
                  {[
                    { icon: Target, title: "Attract Qualified Leads", description: "Target specific pain points to attract leads who are genuinely interested in your solution" },
                    { icon: Users, title: "Build Trust Early", description: "Demonstrate expertise and provide value before asking for a sales conversation" },
                    { icon: TrendingUp, title: "Improve Conversion Rates", description: "Companies with lead magnets see 2-3x higher conversion rates on landing pages" },
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

                <p className="text-muted-foreground leading-relaxed mt-8">
                  According to recent marketing research, businesses that use lead magnets effectively generate 67% more leads than those relying solely on traditional contact forms. The key is creating content that resonates with your ideal customer profile and addresses their most pressing challenges.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Types of Lead Magnets Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Lead Magnet Types"
              title="12 High-Converting Lead Magnet Types for B2B"
              titleGradient="High-Converting"
              description="Choose the right format based on your audience and resources"
            />

            <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {[
                { icon: FileText, title: "Ebooks & Whitepapers", description: "In-depth guides that establish thought leadership and provide comprehensive insights on industry topics. Ideal for complex B2B solutions.", conversion: "15-25%" },
                { icon: BookOpen, title: "Case Studies", description: "Real-world success stories that demonstrate ROI and build credibility. Perfect for leads in the consideration stage.", conversion: "20-30%" },
                { icon: Calculator, title: "ROI Calculators", description: "Interactive tools that help prospects quantify the value of your solution. Highly engaging and shareable.", conversion: "25-40%" },
                { icon: Video, title: "Webinars & Video Series", description: "Educational content that showcases expertise and allows for deeper engagement with your brand.", conversion: "20-35%" },
                { icon: CheckCircle, title: "Checklists & Templates", description: "Practical resources that provide immediate value and can be quickly implemented by your audience.", conversion: "30-45%" },
                { icon: BarChart3, title: "Industry Reports", description: "Original research and data that positions your company as an industry authority and attracts media attention.", conversion: "18-28%" },
                { icon: Gift, title: "Free Trials & Demos", description: "Direct product experience that accelerates the buyer journey for leads ready to evaluate solutions.", conversion: "35-50%" },
                { icon: Zap, title: "Quick-Win Guides", description: "Focused tutorials that solve one specific problem quickly, perfect for attracting busy executives.", conversion: "25-35%" },
                { icon: Users, title: "Community Access", description: "Exclusive membership to professional communities, forums, or networking groups in your industry.", conversion: "15-25%" },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="p-6 rounded-xl bg-card border border-border hover:border-purple-500/50 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center mb-4 group-hover:from-purple-500/30 group-hover:to-blue-500/30 transition-colors">
                    <item.icon className="w-6 h-6 text-purple-500" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-muted-foreground">Avg. Conversion:</span>
                    <span className="text-green-500 font-medium">{item.conversion}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Creating Effective Lead Magnets Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <SectionHeading
                badge="Best Practices"
                title="How to Create Lead Magnets That Actually Convert"
                titleGradient="Actually Convert"
                description="Follow these proven strategies to maximize your lead magnet performance"
              />

              <div className="mt-12 space-y-8">
                {[
                  {
                    step: "01",
                    title: "Identify Your Ideal Customer's Pain Points",
                    content: "The most effective lead magnets address specific challenges your target audience faces. Conduct customer interviews, analyze support tickets, and review industry forums to understand what keeps your prospects up at night. Your lead magnet should promise a solution to one of these pressing problems."
                  },
                  {
                    step: "02",
                    title: "Deliver Immediate, Actionable Value",
                    content: "Your lead magnet should provide value that prospects can implement immediately. Avoid fluff and focus on practical, actionable insights. The faster someone can see results from your content, the more likely they are to trust your company and move forward in the buying process."
                  },
                  {
                    step: "03",
                    title: "Align Content with Your Product or Service",
                    content: "While your lead magnet should provide standalone value, it should also naturally lead prospects toward your solution. Create content that educates about problems your product solves, positioning your offering as the logical next step for readers who want to go further."
                  },
                  {
                    step: "04",
                    title: "Optimize for Quick Consumption",
                    content: "B2B buyers are busy. Design your lead magnets to be easily digestible, with clear formatting, visual elements, and scannable sections. Consider creating multiple formats (PDF, video, interactive tool) to accommodate different learning preferences."
                  },
                  {
                    step: "05",
                    title: "Test and Iterate Based on Data",
                    content: "Use A/B testing to optimize your lead magnet titles, descriptions, and delivery methods. Track not just download rates, but also lead quality and conversion to customers. The best lead magnets are continuously refined based on performance data."
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
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{item.content}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Lead Magnet Examples Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <SectionHeading
                badge="Real Examples"
                title="Lead Magnet Examples That Generated Millions"
                titleGradient="Generated Millions"
                description="Learn from successful B2B companies"
              />

              <div className="mt-12 prose prose-lg dark:prose-invert max-w-none">
                <p className="text-muted-foreground leading-relaxed">
                  Understanding what works in practice is essential for creating effective lead magnets. Here are examples from companies that have mastered the art of lead generation through valuable content offerings.
                </p>

                <div className="not-prose mt-8 space-y-6">
                  {[
                    {
                      company: "HubSpot",
                      magnet: "Website Grader Tool",
                      result: "Generated over 4 million leads by providing instant, personalized value through an interactive tool that analyzes website performance."
                    },
                    {
                      company: "Salesforce",
                      magnet: "State of Sales Report",
                      result: "Established thought leadership and generated thousands of enterprise leads through original research that sales professionals reference year-round."
                    },
                    {
                      company: "Drift",
                      magnet: "Conversational Marketing Blueprint",
                      result: "Grew their email list by 300% with a comprehensive playbook that educates prospects while naturally introducing their solution category."
                    },
                  ].map((example, index) => (
                    <motion.div
                      key={example.company}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="p-6 rounded-xl bg-card border border-border"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center">
                          <span className="text-purple-500 font-bold text-sm">{example.company.charAt(0)}</span>
                        </div>
                        <div>
                          <h4 className="font-semibold">{example.company}</h4>
                          <p className="text-sm text-purple-400">{example.magnet}</p>
                        </div>
                      </div>
                      <p className="text-muted-foreground">{example.result}</p>
                    </motion.div>
                  ))}
                </div>

                <p className="text-muted-foreground leading-relaxed mt-8">
                  The common thread among these successful lead magnets is that they all provide genuine value that prospects cannot easily find elsewhere. They address real pain points, offer actionable insights, and establish the creating company as an authority in their space.
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
                Ready to Create Your <GradientText>Perfect Lead Magnet</GradientText>?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                LeadFlow helps you capture, score, and convert leads from your lead magnets automatically. Start your free trial today and see how AI-powered lead management can transform your pipeline.
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
                  <Link href="/resources/lead-generation/landing-pages" className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
                    High-Converting Landing Pages
                  </Link>
                  <Link href="/resources/lead-generation/form-optimization" className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
                    Form Optimization Guide
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
