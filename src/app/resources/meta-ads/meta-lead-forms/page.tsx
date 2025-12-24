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
  XCircle,
  FileText,
  Settings,
  Layers,
  Target,
  Zap,
  Users,
  BarChart3,
  MessageSquare,
  Shield,
  Smartphone,
  Clock,
} from "lucide-react";

export default function MetaLeadFormsPage() {
  return (
    <div className="min-h-screen bg-background">
      <LandingHeader />
      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-background to-background" />
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/30 rounded-full blur-[128px] animate-pulse" />
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
                Optimizing Meta Lead Forms for{" "}
                <GradientText>Maximum Conversions</GradientText>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Master the art of creating high-converting lead forms for
                Facebook and Instagram. Learn form design best practices, field
                optimization, and LeadFlow integration techniques.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/handler/sign-up">
                  <GlowButton size="lg" className="group">
                    Optimize Your Forms
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

        {/* Understanding Lead Forms Section */}
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
                  Understanding <GradientText>Meta Lead Forms</GradientText>
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Meta Lead Forms are pre-built forms that appear directly within
                  Facebook and Instagram, allowing users to share their contact
                  information without leaving the platform. These native forms
                  offer a seamless experience that significantly reduces friction
                  in the lead capture process.
                </p>
                <p className="text-lg text-muted-foreground mb-6">
                  The power of Meta Lead Forms lies in their pre-population
                  capability. When a user clicks your lead ad, the form
                  automatically fills in information from their Facebook profile,
                  including name, email, phone number, and more. This convenience
                  dramatically increases completion rates compared to traditional
                  landing page forms.
                </p>
                <p className="text-lg text-muted-foreground">
                  However, with great convenience comes the need for strategic
                  form design. The questions you ask, the order you present them,
                  and the context you provide all significantly impact both the
                  quantity and quality of leads you generate.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative"
              >
                <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 via-cyan-500/20 to-blue-500/20 rounded-3xl blur-2xl opacity-60" />
                <div className="relative rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl p-8">
                  <h3 className="text-xl font-semibold mb-6">
                    Lead Form Components
                  </h3>
                  <div className="space-y-6">
                    {[
                      {
                        icon: FileText,
                        title: "Intro Section",
                        description:
                          "Sets expectations with headline, image, and layout options",
                      },
                      {
                        icon: MessageSquare,
                        title: "Questions",
                        description:
                          "Pre-fill fields and custom questions to qualify leads",
                      },
                      {
                        icon: Shield,
                        title: "Privacy Policy",
                        description:
                          "Required link to your privacy policy for compliance",
                      },
                      {
                        icon: CheckCircle2,
                        title: "Thank You Screen",
                        description:
                          "Post-submission experience with CTA options",
                      },
                    ].map((item) => (
                      <div key={item.title} className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                          <item.icon className="w-5 h-5 text-purple-500" />
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">{item.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Form Types Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Form Types"
              title="Choosing the Right Lead Form Type"
              titleGradient="Lead Form Type"
              description="Meta offers two distinct form types optimized for different goals. Understanding when to use each is crucial for campaign success."
            />

            <div className="mt-16 grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  More Volume (Standard)
                </h3>
                <p className="text-muted-foreground mb-6">
                  Optimized for maximum lead quantity. The form is designed to be
                  completed as quickly as possible with minimal friction.
                </p>
                <div className="space-y-3">
                  <h4 className="font-medium text-sm text-green-500">Best For:</h4>
                  <ul className="space-y-2">
                    {[
                      "Top-of-funnel awareness campaigns",
                      "Low-consideration products or services",
                      "Building email lists and audiences",
                      "Contest and giveaway entries",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="p-8 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-purple-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Higher Intent (Optimized)
                </h3>
                <p className="text-muted-foreground mb-6">
                  Includes a review step before submission, filtering out
                  accidental submissions and low-intent leads.
                </p>
                <div className="space-y-3">
                  <h4 className="font-medium text-sm text-purple-500">Best For:</h4>
                  <ul className="space-y-2">
                    {[
                      "High-value B2B lead generation",
                      "Complex sales processes",
                      "Service businesses requiring consultations",
                      "When lead quality matters more than quantity",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Question Optimization Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Question Strategy"
              title="Optimizing Your Lead Form Questions"
              titleGradient="Questions"
              description="The questions you include directly impact conversion rate and lead quality. Here's how to find the perfect balance."
            />

            <div className="mt-16 max-w-4xl mx-auto space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm"
              >
                <h3 className="text-xl font-semibold mb-6">
                  Pre-Fill Question Types
                </h3>
                <p className="text-muted-foreground mb-6">
                  Pre-fill questions automatically populate from the user&apos;s
                  Facebook profile. These have the highest completion rates since
                  users simply need to confirm the information.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    "Full Name",
                    "Email Address",
                    "Phone Number",
                    "City",
                    "State/Province",
                    "Country",
                    "ZIP/Postal Code",
                    "Company Name",
                    "Job Title",
                    "Work Email",
                  ].map((field) => (
                    <div key={field} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      <span className="text-muted-foreground">{field}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="p-8 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm"
              >
                <h3 className="text-xl font-semibold mb-6">
                  Custom Question Best Practices
                </h3>
                <p className="text-muted-foreground mb-6">
                  Custom questions help qualify leads and gather information not
                  available from profiles. Use them strategically to balance
                  quality filtering with conversion optimization.
                </p>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-medium text-green-500 mb-4 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5" />
                      Do
                    </h4>
                    <ul className="space-y-3">
                      {[
                        "Ask about timeline or urgency",
                        "Include budget range (for B2B)",
                        "Use multiple choice when possible",
                        "Keep questions relevant to follow-up",
                        "Test different question orders",
                      ].map((item, index) => (
                        <li key={index} className="text-sm text-muted-foreground">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-red-500 mb-4 flex items-center gap-2">
                      <XCircle className="w-5 h-5" />
                      Don&apos;t
                    </h4>
                    <ul className="space-y-3">
                      {[
                        "Ask for information you won't use",
                        "Include too many open-ended questions",
                        "Make qualifying questions mandatory",
                        "Use industry jargon in options",
                        "Overwhelm with more than 5-7 questions",
                      ].map((item, index) => (
                        <li key={index} className="text-sm text-muted-foreground">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="p-8 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm"
              >
                <h3 className="text-xl font-semibold mb-6">
                  Recommended Question Sequences
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-medium mb-3 text-blue-400">B2C Services</h4>
                    <ol className="space-y-2 text-sm text-muted-foreground">
                      <li>1. Full Name (pre-fill)</li>
                      <li>2. Email (pre-fill)</li>
                      <li>3. Phone (pre-fill)</li>
                      <li>4. Service Interest (multiple choice)</li>
                      <li>5. Best time to contact (optional)</li>
                    </ol>
                  </div>
                  <div>
                    <h4 className="font-medium mb-3 text-purple-400">B2B SaaS</h4>
                    <ol className="space-y-2 text-sm text-muted-foreground">
                      <li>1. Work Email (pre-fill)</li>
                      <li>2. Company Name (pre-fill)</li>
                      <li>3. Job Title (pre-fill)</li>
                      <li>4. Company Size (multiple choice)</li>
                      <li>5. Primary Challenge (multiple choice)</li>
                      <li>6. Timeline (multiple choice)</li>
                    </ol>
                  </div>
                  <div>
                    <h4 className="font-medium mb-3 text-green-400">E-commerce</h4>
                    <ol className="space-y-2 text-sm text-muted-foreground">
                      <li>1. Full Name (pre-fill)</li>
                      <li>2. Email (pre-fill)</li>
                      <li>3. ZIP Code (pre-fill)</li>
                      <li>4. Product Interest (multiple choice)</li>
                    </ol>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Design Tips Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Design Optimization"
              title="Lead Form Design Best Practices"
              titleGradient="Design"
              description="Visual design and user experience elements that maximize form completion rates."
            />

            <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Layers,
                  title: "Choose the Right Layout",
                  description:
                    "Test different intro layouts (Paragraph, List, or Large Paragraph) to see which resonates with your audience. Large Paragraph works best for complex offers needing explanation.",
                },
                {
                  icon: Smartphone,
                  title: "Design for Mobile First",
                  description:
                    "Over 95% of form submissions happen on mobile. Keep headlines short, use concise descriptions, and ensure any images are optimized for small screens.",
                },
                {
                  icon: MessageSquare,
                  title: "Compelling Intro Copy",
                  description:
                    "Your intro sets expectations. Clearly communicate what users will receive, why they should submit, and address any privacy concerns upfront.",
                },
                {
                  icon: Clock,
                  title: "Set Time Expectations",
                  description:
                    "If relevant, mention how quickly users can expect to hear back. 'We'll call you within 24 hours' reduces anxiety and sets proper expectations.",
                },
                {
                  icon: Settings,
                  title: "Optimize Thank You Screen",
                  description:
                    "Don't waste the confirmation screen. Use it to provide immediate value, set next steps, or encourage additional actions like visiting your website.",
                },
                {
                  icon: BarChart3,
                  title: "A/B Test Everything",
                  description:
                    "Test different headlines, question orders, and layouts. LeadFlow's analytics help you track which variations generate the highest quality leads.",
                },
              ].map((tip, index) => (
                <motion.div
                  key={tip.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center mb-4">
                    <tip.icon className="w-6 h-6 text-purple-500" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{tip.title}</h3>
                  <p className="text-muted-foreground text-sm">{tip.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* LeadFlow Integration Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <SectionHeading
                badge="LeadFlow Integration"
                title="Connecting Your Forms to LeadFlow"
                titleGradient="LeadFlow"
                description="Maximize the value of every form submission with LeadFlow's intelligent lead management."
              />

              <div className="mt-12 space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="p-8 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm"
                >
                  <h3 className="text-xl font-semibold mb-4">
                    Field Mapping Configuration
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    When you connect your Meta Lead Forms to LeadFlow, you&apos;ll map
                    each form field to a corresponding LeadFlow contact property.
                    This ensures all captured data flows into the right places for
                    effective segmentation and follow-up.
                  </p>
                  <p className="text-muted-foreground">
                    LeadFlow automatically suggests mappings based on field names,
                    but you can customize these to match your workflow. Custom
                    questions can be mapped to custom properties, enabling powerful
                    segmentation and automation based on form responses.
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
                    Automated Workflows
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Trigger instant actions when leads submit your forms. LeadFlow
                    can automatically send welcome emails, assign leads to sales
                    reps, add tags based on form responses, and notify your team
                    via Slack or email.
                  </p>
                  <p className="text-muted-foreground">
                    Set up conditional workflows based on qualifying questions. For
                    example, high-budget leads can be fast-tracked to senior sales
                    reps, while lower-budget inquiries receive nurture sequences
                    instead.
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
                    Performance Tracking
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    LeadFlow tracks not just lead volume but lead quality and
                    downstream conversion. See which form variations, campaigns,
                    and ad creatives generate leads that actually convert to
                    customers.
                  </p>
                  <p className="text-muted-foreground">
                    Use these insights to optimize your form design continuously.
                    A form with slightly lower completion rate but higher close
                    rate may actually deliver better ROI than a high-volume
                    alternative.
                  </p>
                </motion.div>
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
              className="relative max-w-4xl mx-auto"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 via-cyan-500/20 to-blue-500/20 rounded-3xl blur-2xl opacity-60" />
              <div className="relative p-12 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Create <GradientText>High-Converting</GradientText> Lead Forms
                </h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Start capturing better leads today with LeadFlow&apos;s intelligent
                  Meta integration. Get instant lead sync, AI scoring, and
                  powerful automation out of the box.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href="/handler/sign-up">
                    <GlowButton size="lg" className="group">
                      Get Started Free
                      <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </GlowButton>
                  </Link>
                  <Link
                    href="/resources/meta-ads/audience-targeting"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Master Audience Targeting →
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
                    "Complete guide to setting up and optimizing Facebook Lead Ads.",
                  href: "/resources/meta-ads/facebook-lead-ads",
                },
                {
                  title: "Audience Targeting Strategies",
                  description:
                    "Reach the right people with advanced targeting techniques.",
                  href: "/resources/meta-ads/audience-targeting",
                },
                {
                  title: "Ad Optimization Tips",
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
