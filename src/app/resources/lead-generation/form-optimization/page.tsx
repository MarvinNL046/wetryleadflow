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
  FormInput,
  Minimize2,
  Sparkles,
  Shield,
  ArrowRight,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Zap,
  Target,
  Users,
  BarChart3,
  Clock,
  Eye,
  MousePointer,
} from "lucide-react";

export default function FormOptimizationPage() {
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
                Form Optimization: <GradientText>Capture More Leads</GradientText>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Transform your lead capture forms from conversion killers into lead generation machines. Learn data-backed strategies to reduce friction and maximize form submissions.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/handler/sign-up">
                  <GlowButton size="lg" className="group">
                    Optimize Your Lead Capture
                    <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </GlowButton>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Why Form Optimization Matters Section */}
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
                badge="The Form Problem"
                title="Why Most Lead Capture Forms Fail"
                titleGradient="Forms Fail"
                description="Understanding why visitors abandon forms is the first step to fixing them"
              />

              <div className="mt-12 prose prose-lg dark:prose-invert max-w-none">
                <p className="text-muted-foreground leading-relaxed">
                  Your lead capture form is often the final barrier between a potential customer and your sales pipeline. Yet most businesses treat forms as an afterthought, using default templates that actively repel qualified leads. The average form abandonment rate is a staggering 81%, meaning only about 1 in 5 visitors who start filling out a form actually complete it.
                </p>

                <p className="text-muted-foreground leading-relaxed mt-4">
                  This represents an enormous opportunity cost. If you're driving 1,000 visitors to your landing page with a 20% form start rate, you have 200 people interested enough to begin your form. With an 81% abandonment rate, you're losing 162 potential leads. Reducing that abandonment rate by just 20% could nearly double your lead volume without spending an extra dollar on advertising.
                </p>

                <div className="grid md:grid-cols-3 gap-6 mt-8 not-prose">
                  {[
                    { icon: XCircle, title: "Too Many Fields", description: "Every additional field reduces conversions by 4-11%. Forms with 3 fields have 25% higher conversion than forms with 6+ fields", color: "text-red-500" },
                    { icon: AlertTriangle, title: "Poor User Experience", description: "Confusing layouts, unclear error messages, and lack of mobile optimization frustrate visitors", color: "text-yellow-500" },
                    { icon: Shield, title: "Trust Concerns", description: "Without privacy assurances and security indicators, visitors hesitate to share personal information", color: "text-blue-500" },
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

        {/* Form Field Optimization Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Field Strategy"
              title="The Art of Choosing the Right Form Fields"
              titleGradient="Right Form Fields"
              description="Balance lead quality with conversion rates through strategic field selection"
            />

            <div className="mt-12 max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="p-6 rounded-xl bg-card border border-green-500/30"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <CheckCircle className="w-6 h-6 text-green-500" />
                    <h3 className="text-lg font-semibold">Essential Fields</h3>
                  </div>
                  <ul className="space-y-3">
                    {[
                      { field: "Email Address", reason: "Primary contact method and unique identifier" },
                      { field: "First Name", reason: "Enables personalization in follow-up" },
                      { field: "Company Name", reason: "Critical for B2B lead qualification" },
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2" />
                        <div>
                          <span className="font-medium">{item.field}</span>
                          <p className="text-sm text-muted-foreground">{item.reason}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="p-6 rounded-xl bg-card border border-yellow-500/30"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <AlertTriangle className="w-6 h-6 text-yellow-500" />
                    <h3 className="text-lg font-semibold">Use With Caution</h3>
                  </div>
                  <ul className="space-y-3">
                    {[
                      { field: "Phone Number", reason: "Consider making optional or using later in funnel" },
                      { field: "Job Title", reason: "Can be gathered through enrichment instead" },
                      { field: "Company Size", reason: "Useful but adds friction; consider dropdown" },
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 mt-2" />
                        <div>
                          <span className="font-medium">{item.field}</span>
                          <p className="text-sm text-muted-foreground">{item.reason}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-8 p-6 rounded-xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20"
              >
                <div className="flex items-start gap-4">
                  <Sparkles className="w-6 h-6 text-purple-500 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-2">Pro Tip: Progressive Profiling</h4>
                    <p className="text-muted-foreground">
                      Instead of asking for everything upfront, use progressive profiling to collect additional information over time. Start with 2-3 essential fields, then gather more data on return visits or through automated enrichment tools. This approach can increase initial conversion rates by 50% while still building complete lead profiles.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Form Design Best Practices Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Design Principles"
              title="Form Design Best Practices That Convert"
              titleGradient="Best Practices"
              description="Visual and UX optimizations that make forms irresistible"
            />

            <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {[
                {
                  icon: Eye,
                  title: "Single Column Layout",
                  description: "Single column forms convert 15.4% better than multi-column layouts. They're easier to scan and complete, especially on mobile devices."
                },
                {
                  icon: FormInput,
                  title: "Clear Field Labels",
                  description: "Place labels above input fields, not inside them. Floating labels that disappear can cause confusion and increase errors."
                },
                {
                  icon: Minimize2,
                  title: "Appropriate Input Sizes",
                  description: "Match input field sizes to expected content length. Email fields should be wider than phone fields, reducing visual clutter."
                },
                {
                  icon: Target,
                  title: "Contrasting CTA Button",
                  description: "Your submit button should be the most prominent element. Use a color that contrasts with the rest of the form and page."
                },
                {
                  icon: Shield,
                  title: "Privacy Assurance",
                  description: "Add a brief privacy statement near the submit button. Mention that you won't spam and link to your privacy policy."
                },
                {
                  icon: Zap,
                  title: "Real-Time Validation",
                  description: "Validate fields as users type, showing checkmarks for correct entries and helpful error messages for mistakes."
                },
                {
                  icon: MousePointer,
                  title: "Logical Tab Order",
                  description: "Ensure users can navigate through fields using Tab key in a logical order. Test keyboard navigation thoroughly."
                },
                {
                  icon: Clock,
                  title: "Progress Indicators",
                  description: "For multi-step forms, show progress with step indicators or progress bars. Users are more likely to complete when they can see the end."
                },
                {
                  icon: Users,
                  title: "Social Login Options",
                  description: "For appropriate contexts, offer social login or pre-fill options. This can reduce friction by 40% for returning visitors."
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
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Mobile Form Optimization Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <SectionHeading
                badge="Mobile First"
                title="Mobile Form Optimization: The Untapped Opportunity"
                titleGradient="Mobile Form"
                description="Over 60% of B2B research happens on mobile devices"
              />

              <div className="mt-12 prose prose-lg dark:prose-invert max-w-none">
                <p className="text-muted-foreground leading-relaxed">
                  Mobile visitors convert at less than half the rate of desktop visitors on average. But this isn't because mobile users are less interested—it's because most forms aren't optimized for mobile experiences. With proper mobile optimization, you can dramatically increase conversions from this growing traffic source.
                </p>

                <div className="not-prose mt-8 space-y-6">
                  {[
                    {
                      title: "Use Appropriate Input Types",
                      description: "Specify input types (email, tel, number) so mobile devices show the correct keyboard. This small change can increase completion rates by 30% on mobile.",
                      code: '<input type="email" inputmode="email" />'
                    },
                    {
                      title: "Implement Autocomplete Attributes",
                      description: "Help browsers autofill forms correctly by using proper autocomplete attributes. This can reduce form completion time by up to 50%.",
                      code: '<input autocomplete="given-name" />'
                    },
                    {
                      title: "Design Touch-Friendly Elements",
                      description: "Make tap targets at least 44x44 pixels. Space form elements adequately to prevent accidental taps and frustration.",
                      code: "min-height: 44px; padding: 12px 16px;"
                    },
                    {
                      title: "Minimize Typing Requirements",
                      description: "Use dropdowns, toggles, and selection buttons instead of free text where possible. Every keystroke saved improves mobile completion rates.",
                      code: "<select> vs <input type='text' />"
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
                      <h4 className="font-semibold mb-2">{item.title}</h4>
                      <p className="text-muted-foreground mb-3">{item.description}</p>
                      <div className="px-4 py-2 rounded-lg bg-muted/50 font-mono text-sm text-purple-400">
                        {item.code}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testing and Optimization Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <SectionHeading
                badge="Continuous Improvement"
                title="Testing Your Way to Better Conversions"
                titleGradient="Better Conversions"
                description="Data-driven optimization for continuous improvement"
              />

              <div className="mt-12 space-y-6">
                {[
                  {
                    step: "01",
                    title: "Set Up Proper Analytics",
                    content: "Before testing, ensure you're tracking form views, interactions, abandonment points, and completions. Use tools like Google Analytics events, Hotjar form analytics, or dedicated form tracking software to gather baseline data."
                  },
                  {
                    step: "02",
                    title: "Identify Your Biggest Drop-Off Points",
                    content: "Analyze where users abandon your form. Is it immediately upon seeing it? After the first field? At a specific question? Understanding where you lose people tells you where to focus optimization efforts first."
                  },
                  {
                    step: "03",
                    title: "Form A/B Testing Hypotheses",
                    content: "Based on your data, create specific hypotheses to test. For example: 'Removing the phone number field will increase completions by 15%' or 'Adding a progress bar will reduce abandonment by 10%.' Be specific and measurable."
                  },
                  {
                    step: "04",
                    title: "Run Controlled A/B Tests",
                    content: "Test one variable at a time with sufficient traffic for statistical significance. Run tests for at least one to two weeks or until you reach 95% confidence. Document everything for future reference."
                  },
                  {
                    step: "05",
                    title: "Implement Winners and Keep Testing",
                    content: "Roll out winning variations and immediately start planning your next test. Top-performing companies run continuous form optimization programs, treating it as an ongoing process rather than a one-time project."
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
                    <div className="flex-1 p-6 rounded-xl bg-card border border-border">
                      <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                      <p className="text-muted-foreground">{item.content}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
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
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to <GradientText>Transform Your Forms</GradientText>?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                LeadFlow automatically captures and enriches leads from any form, giving you complete profiles without asking for excessive information. Start converting more visitors into qualified leads today.
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
