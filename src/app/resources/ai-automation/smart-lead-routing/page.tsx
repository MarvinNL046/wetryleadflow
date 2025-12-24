"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  LandingHeader,
  LandingFooter,
  GlowButton,
  GradientText,
  SectionHeading
} from "@/components/landing";
import {
  Route,
  Users,
  Zap,
  Clock,
  Target,
  BarChart3,
  CheckCircle2,
  ArrowRight,
  Shuffle,
  UserCheck,
  Building2,
  Globe,
  Award,
  Settings2
} from "lucide-react";

export default function SmartLeadRoutingPage() {
  return (
    <div className="min-h-screen bg-background">
      <LandingHeader />

      <main>
        {/* Hero Section */}
        <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden pt-20">
          {/* Background Effects */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-background to-background" />
            <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-cyan-500/30 rounded-full blur-[128px] animate-pulse" />
            <div className="absolute top-1/4 right-1/3 w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: "1s" }} />
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
                className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
              >
                <Route className="w-4 h-4 mr-2" />
                Intelligent Lead Distribution
              </motion.div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
                Smart Lead Routing <GradientText animated>with AI</GradientText>
              </h1>

              <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                Every second counts when a new lead comes in. LeadFlow&apos;s AI-powered lead routing
                instantly matches leads with the perfect sales rep based on skills, availability,
                territory, and past performance, ensuring faster response times and higher conversion rates.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/handler/sign-up">
                  <GlowButton size="lg" className="group">
                    Enable Smart Routing
                    <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </GlowButton>
                </Link>
                <Link
                  href="/resources/ai-automation/automation-workflows"
                  className="inline-flex items-center gap-2 px-6 py-3 text-base font-medium rounded-full border border-border hover:bg-accent transition-colors"
                >
                  Explore Automation Workflows
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Why Lead Routing Matters Section */}
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
                  Why <GradientText>Lead Routing</GradientText> Can Make or Break Your Sales
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Research consistently shows that lead response time is one of the strongest
                    predictors of conversion success. Leads contacted within five minutes are
                    21 times more likely to enter the sales process than those contacted after
                    30 minutes. Yet most companies take hours or even days to respond to new leads,
                    leaving money on the table and frustrating potential customers.
                  </p>
                  <p>
                    The challenge isn&apos;t just speed; it&apos;s matching. Not every sales rep is equally
                    suited to handle every type of lead. A rep who excels at enterprise deals
                    may struggle with SMB clients. Someone with deep healthcare experience will
                    convert healthcare leads at higher rates than a generalist. Traditional
                    round-robin lead distribution ignores these nuances, treating all reps and
                    all leads as interchangeable.
                  </p>
                  <p>
                    LeadFlow&apos;s smart lead routing solves both problems simultaneously. The moment
                    a lead enters your system, our AI analyzes the lead characteristics, evaluates
                    your available sales reps, and makes an instant routing decision optimized
                    for conversion probability. The right rep gets the right lead within seconds,
                    not hours.
                  </p>
                  <p>
                    The result is dramatically faster response times, better rep-lead fit, and
                    ultimately higher conversion rates across your entire team.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative"
              >
                <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-blue-500/20 rounded-3xl blur-2xl opacity-60" />
                <div className="relative rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl overflow-hidden p-6">
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm font-medium mb-2">
                      <Zap className="w-4 h-4 mr-1" />
                      Lead Routed in 0.3 seconds
                    </div>
                    <h3 className="text-lg font-semibold">New Lead from Meta Ads</h3>
                  </div>

                  <div className="flex items-center justify-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 to-blue-400 flex items-center justify-center text-white text-xl font-bold">
                      JD
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center p-3 rounded-lg bg-muted/30">
                      <span className="text-sm text-muted-foreground">Lead Name</span>
                      <span className="font-medium">John Davidson</span>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded-lg bg-muted/30">
                      <span className="text-sm text-muted-foreground">Company Size</span>
                      <span className="font-medium">Enterprise (500+)</span>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded-lg bg-muted/30">
                      <span className="text-sm text-muted-foreground">Industry</span>
                      <span className="font-medium">Healthcare</span>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded-lg bg-muted/30">
                      <span className="text-sm text-muted-foreground">AI Score</span>
                      <span className="font-medium text-green-500">94</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold">
                      SM
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Assigned to Sarah Mitchell</p>
                      <p className="text-sm text-muted-foreground">Healthcare Enterprise Specialist</p>
                    </div>
                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Routing Criteria Section */}
        <section className="py-20 lg:py-32 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Intelligent Matching"
              title="How LeadFlow Decides Where to Route Leads"
              titleGradient="LeadFlow"
              description="Our AI considers dozens of factors to make optimal routing decisions in milliseconds."
            />

            <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: UserCheck,
                  title: "Rep Expertise & Skills",
                  description: "Match leads to reps with proven success in specific industries, company sizes, or product lines. The AI learns which reps excel at which types of opportunities."
                },
                {
                  icon: Globe,
                  title: "Geographic Territory",
                  description: "Automatically route leads to reps responsible for specific regions, time zones, or countries. Support complex territory structures with overlapping boundaries."
                },
                {
                  icon: Building2,
                  title: "Account Ownership",
                  description: "When leads come from existing accounts, route them to the account owner or assigned team member to maintain relationship continuity."
                },
                {
                  icon: Clock,
                  title: "Rep Availability",
                  description: "Consider working hours, vacation schedules, and current workload to ensure leads go to reps who can actually respond quickly."
                },
                {
                  icon: BarChart3,
                  title: "Performance History",
                  description: "Favor reps with higher conversion rates for similar leads, continuously optimizing routing based on actual outcomes."
                },
                {
                  icon: Shuffle,
                  title: "Round-Robin Fairness",
                  description: "When multiple reps are equally qualified, use weighted round-robin to distribute leads fairly and prevent rep overload."
                }
              ].map((criteria, index) => (
                <motion.div
                  key={criteria.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 rounded-2xl bg-card border border-border hover:border-cyan-500/50 transition-all hover:shadow-lg hover:shadow-cyan-500/10"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center mb-4">
                    <criteria.icon className="w-6 h-6 text-cyan-500" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{criteria.title}</h3>
                  <p className="text-muted-foreground">{criteria.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Routing Rules & Customization */}
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="order-2 lg:order-1"
              >
                <div className="space-y-6">
                  {[
                    {
                      title: "Lead Score Thresholds",
                      description: "Route high-scoring leads directly to senior reps while newer team members handle leads still in the nurturing phase."
                    },
                    {
                      title: "Source-Based Routing",
                      description: "Send leads from different sources to different queues. Direct Meta ad leads to SDRs while referral leads go straight to account executives."
                    },
                    {
                      title: "Product Interest Matching",
                      description: "When leads express interest in specific products or features, route them to reps with specialized knowledge in those areas."
                    },
                    {
                      title: "Escalation Rules",
                      description: "Define what happens when primary routing fails: timeouts, backup assignments, manager notifications, and more."
                    },
                    {
                      title: "VIP Lead Handling",
                      description: "Automatically identify high-value prospects and route them to your best closers with immediate notification alerts."
                    }
                  ].map((rule, index) => (
                    <motion.div
                      key={rule.title}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex gap-4"
                    >
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{rule.title}</h3>
                        <p className="text-muted-foreground">{rule.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="order-1 lg:order-2"
              >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
                  Flexible Routing Rules <GradientText>You Control</GradientText>
                </h2>
                <p className="text-muted-foreground mb-8">
                  While AI handles the complex optimization, you maintain complete control over
                  routing logic through an intuitive rules builder. Create sophisticated routing
                  workflows without any coding, combining multiple conditions and actions to
                  match your exact sales process requirements.
                </p>
                <Link href="/handler/sign-up">
                  <GlowButton size="lg" className="group">
                    Build Your Routing Rules
                    <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </GlowButton>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Benefits & Results Section */}
        <section className="py-20 lg:py-32 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Proven Results"
              title="The Impact of Smart Lead Routing"
              titleGradient="Smart Lead Routing"
              description="Companies using LeadFlow's intelligent routing see measurable improvements across key sales metrics."
            />

            <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  metric: "85%",
                  label: "Faster Response Time",
                  description: "Leads are contacted within minutes instead of hours"
                },
                {
                  metric: "32%",
                  label: "Higher Conversion Rate",
                  description: "Better rep-lead matching drives more closed deals"
                },
                {
                  metric: "4.2x",
                  label: "Improved Lead Coverage",
                  description: "Zero leads slip through the cracks"
                },
                {
                  metric: "28%",
                  label: "Increased Rep Productivity",
                  description: "Reps work leads they're best suited to close"
                }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center p-6 rounded-2xl bg-card border border-border"
                >
                  <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent mb-2">
                    {stat.metric}
                  </div>
                  <h3 className="font-semibold mb-1">{stat.label}</h3>
                  <p className="text-sm text-muted-foreground">{stat.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Advanced Features */}
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Advanced Capabilities"
              title="Beyond Basic Lead Assignment"
              titleGradient="Basic Lead Assignment"
              description="LeadFlow's routing system includes enterprise features for complex sales organizations."
            />

            <div className="mt-16 grid md:grid-cols-2 gap-8">
              {[
                {
                  icon: Settings2,
                  title: "Multi-Level Routing Hierarchies",
                  description: "Configure complex routing structures that span teams, divisions, and regions. Support matrix organizations with multiple assignment dimensions and handoff rules between groups."
                },
                {
                  icon: Award,
                  title: "Routing Analytics & Optimization",
                  description: "Track routing performance with detailed analytics showing assignment times, response rates, and conversion outcomes by route. Continuously optimize rules based on data."
                },
                {
                  icon: Users,
                  title: "Team Queues & Coverage",
                  description: "Create shared queues for teams to work collaboratively. Set up coverage schedules so leads are always routed to available team members regardless of individual schedules."
                },
                {
                  icon: Target,
                  title: "Integration with External Systems",
                  description: "Connect routing decisions to external data sources like ERP systems, marketing automation platforms, and customer databases for even smarter assignment logic."
                }
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-8 rounded-2xl bg-gradient-to-br from-cyan-500/5 to-purple-500/5 border border-border hover:border-cyan-500/30 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-cyan-500" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 lg:py-32 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
                Route Leads to the <GradientText>Right Reps</GradientText> Instantly
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Stop losing leads to slow response times and poor matching. LeadFlow&apos;s smart
                lead routing ensures every prospect reaches the rep most likely to convert them,
                in seconds not hours. Start your free trial today.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/handler/sign-up">
                  <GlowButton size="lg" className="group">
                    Start Your Free Trial
                    <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </GlowButton>
                </Link>
                <Link
                  href="/resources/ai-automation/ai-lead-scoring"
                  className="inline-flex items-center gap-2 px-6 py-3 text-base font-medium rounded-full border border-border hover:bg-accent transition-colors"
                >
                  Learn About AI Lead Scoring
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Related Resources */}
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Learn More"
              title="Related AI & Automation Resources"
              description="Explore more ways to automate and optimize your sales process."
            />

            <div className="mt-12 grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "AI Lead Scoring",
                  description: "Prioritize your best leads automatically with intelligent scoring.",
                  href: "/resources/ai-automation/ai-lead-scoring"
                },
                {
                  title: "Automation Workflows",
                  description: "Build powerful automated workflows that save time and boost productivity.",
                  href: "/resources/ai-automation/automation-workflows"
                },
                {
                  title: "Predictive Analytics",
                  description: "Forecast revenue and identify opportunities with AI-powered analytics.",
                  href: "/resources/ai-automation/predictive-analytics"
                }
              ].map((resource, index) => (
                <motion.div
                  key={resource.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link
                    href={resource.href}
                    className="block p-6 rounded-2xl bg-card border border-border hover:border-cyan-500/50 transition-all hover:shadow-lg hover:shadow-cyan-500/10 h-full"
                  >
                    <h3 className="text-lg font-semibold mb-2">{resource.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{resource.description}</p>
                    <span className="text-cyan-500 text-sm font-medium inline-flex items-center">
                      Learn more <ArrowRight className="ml-1 w-4 h-4" />
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <LandingFooter />
    </div>
  );
}
