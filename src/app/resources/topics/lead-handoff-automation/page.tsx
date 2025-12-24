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
  ArrowRightLeft,
  Users,
  MessageSquare,
  Bell,
  ArrowRight,
  CheckCircle2,
  Clock,
  Zap,
  Target,
  UserCheck,
  Workflow,
  Send
} from "lucide-react";

const relatedContent = [
  {
    title: "Lead Handoffs",
    description: "Learn best practices for seamlessly transferring leads between team members without losing context or momentum.",
    href: "/resources/team-collaboration/lead-handoffs",
    pillar: "Team Collaboration",
    icon: ArrowRightLeft,
    gradient: "from-teal-500 to-cyan-500"
  },
  {
    title: "Team Communication",
    description: "Master internal communication strategies that keep everyone aligned on lead status and next steps.",
    href: "/resources/team-collaboration/team-communication",
    pillar: "Team Collaboration",
    icon: MessageSquare,
    gradient: "from-cyan-500 to-teal-500"
  },
  {
    title: "Smart Notifications",
    description: "Configure intelligent alerts that notify the right team members at the right time for optimal follow-up.",
    href: "/resources/sales-automation/smart-notifications",
    pillar: "Sales Automation",
    icon: Bell,
    gradient: "from-teal-500 to-emerald-500"
  },
  {
    title: "Task Automation",
    description: "Automate task creation and assignment to ensure seamless handoffs and consistent follow-through.",
    href: "/resources/sales-automation/task-automation",
    pillar: "Sales Automation",
    icon: Zap,
    gradient: "from-emerald-500 to-teal-500"
  }
];

const relatedTopics = [
  { title: "Instagram Lead Nurturing", href: "/resources/topics/instagram-lead-nurturing" },
  { title: "Deal Velocity Optimization", href: "/resources/topics/deal-velocity-optimization" },
  { title: "Contact Activity Insights", href: "/resources/topics/contact-activity-insights" },
  { title: "Predictive Lead Scoring", href: "/resources/topics/predictive-lead-scoring" }
];

export default function LeadHandoffAutomationPage() {
  return (
    <div className="min-h-screen bg-background">
      <head>
        <meta name="robots" content="noindex, follow" />
      </head>
      <LandingHeader />

        <main>
          {/* Hero Section */}
          <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden pt-20">
            {/* Background Effects - Teal Theme */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-900/20 via-background to-background" />
              <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-teal-500/30 rounded-full blur-[128px] animate-pulse" />
              <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-500/20 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: "1s" }} />
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
                  className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20"
                >
                  <ArrowRightLeft className="w-4 h-4 mr-2" />
                  Team Collaboration + Sales Automation
                </motion.div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
                  Lead Handoff Automation: <span className="bg-gradient-to-r from-teal-500 via-cyan-500 to-emerald-500 bg-clip-text text-transparent">Seamless Team Transitions</span>
                </h1>

                <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                  Eliminate the friction of lead transfers by combining team collaboration tools
                  with intelligent automation. Ensure every handoff is smooth, every context is
                  preserved, and no lead ever falls through the cracks.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href="/handler/sign-up">
                    <GlowButton size="lg" className="group">
                      Automate Your Handoffs
                      <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </GlowButton>
                  </Link>
                  <Link
                    href="/resources/team-collaboration/lead-handoffs"
                    className="inline-flex items-center gap-2 px-6 py-3 text-base font-medium rounded-full border border-border hover:bg-accent transition-colors"
                  >
                    Learn About Lead Handoffs
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Introduction Section */}
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
                    Why <span className="bg-gradient-to-r from-teal-500 to-cyan-500 bg-clip-text text-transparent">Automated Handoffs</span> Matter
                  </h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      Lead handoffs are one of the most critical moments in the sales process.
                      When leads move from marketing to sales, from SDR to AE, or between team
                      members, there&apos;s always risk of context loss, delayed follow-up, or worse,
                      a lead slipping away entirely. Manual handoffs amplify these risks.
                    </p>
                    <p>
                      By combining team collaboration workflows with intelligent automation, you
                      create a handoff system that works like clockwork. Leads are automatically
                      routed to the right person, all context travels with them, tasks are created,
                      and notifications ensure immediate action.
                    </p>
                    <p>
                      LeadFlow connects your team collaboration tools with powerful automation
                      workflows, ensuring every lead transition is seamless and every opportunity
                      receives the attention it deserves from the right person at the right time.
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
                  <div className="absolute -inset-4 bg-gradient-to-r from-teal-500/20 via-cyan-500/20 to-emerald-500/20 rounded-3xl blur-2xl opacity-60" />
                  <div className="relative rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl overflow-hidden p-6">
                    <h4 className="font-semibold mb-4 text-center">Automated Handoff Workflow</h4>
                    <div className="space-y-4">
                      {[
                        { step: 1, title: "Lead Qualified", desc: "SDR qualifies lead based on criteria", icon: Target, status: "complete" },
                        { step: 2, title: "Auto-Assignment", desc: "Lead assigned to available AE", icon: UserCheck, status: "complete" },
                        { step: 3, title: "Context Transfer", desc: "All notes & history attached", icon: Send, status: "complete" },
                        { step: 4, title: "Task Created", desc: "Follow-up task auto-generated", icon: Zap, status: "active" },
                        { step: 5, title: "Notification Sent", desc: "AE alerted via Slack & email", icon: Bell, status: "pending" }
                      ].map((item, index) => (
                        <motion.div
                          key={item.step}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className={`flex items-center gap-4 p-3 rounded-lg border ${
                            item.status === 'complete' ? 'bg-teal-500/10 border-teal-500/30' :
                            item.status === 'active' ? 'bg-cyan-500/10 border-cyan-500/30' :
                            'bg-muted/30 border-border/50'
                          }`}
                        >
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            item.status === 'complete' ? 'bg-teal-500 text-white' :
                            item.status === 'active' ? 'bg-cyan-500 text-white' :
                            'bg-muted text-muted-foreground'
                          }`}>
                            {item.status === 'complete' ? (
                              <CheckCircle2 className="w-5 h-5" />
                            ) : (
                              <span className="text-sm font-medium">{item.step}</span>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm">{item.title}</p>
                            <p className="text-xs text-muted-foreground">{item.desc}</p>
                          </div>
                          <item.icon className={`w-4 h-4 ${
                            item.status === 'complete' ? 'text-teal-500' :
                            item.status === 'active' ? 'text-cyan-500' :
                            'text-muted-foreground'
                          }`} />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Key Benefits */}
          <section className="py-20 lg:py-32 bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <SectionHeading
                badge="Cross-Pillar Benefits"
                title="The Power of Automated Handoffs"
                titleGradient="Automated Handoffs"
                description="Combining team collaboration with sales automation creates a frictionless handoff experience for your entire organization."
              />

              <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    icon: Clock,
                    title: "Zero Response Delay",
                    description: "Instant notifications ensure the receiving team member acts on new leads immediately."
                  },
                  {
                    icon: Workflow,
                    title: "Complete Context Transfer",
                    description: "All notes, history, and relevant data automatically travel with every handoff."
                  },
                  {
                    icon: UserCheck,
                    title: "Smart Lead Routing",
                    description: "AI-powered assignment ensures leads go to the best-suited team member based on skills and availability."
                  },
                  {
                    icon: Target,
                    title: "Accountability Tracking",
                    description: "Clear ownership at every stage with full visibility into handoff status and timing."
                  },
                  {
                    icon: Users,
                    title: "Team Alignment",
                    description: "Shared workflows keep marketing, SDRs, and AEs aligned on lead criteria and processes."
                  },
                  {
                    icon: Zap,
                    title: "Automated Follow-Up",
                    description: "Tasks and reminders auto-generate to ensure consistent follow-through after every handoff."
                  }
                ].map((benefit, index) => (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="p-6 rounded-2xl bg-card border border-border hover:border-teal-500/50 transition-all hover:shadow-lg hover:shadow-teal-500/10"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500/20 to-cyan-500/20 flex items-center justify-center mb-4">
                      <benefit.icon className="w-6 h-6 text-teal-500" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Related Content Grid */}
          <section className="py-20 lg:py-32">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <SectionHeading
                badge="Deep Dive Resources"
                title="Explore Related Content"
                description="Master lead handoff automation with comprehensive guides from multiple pillars."
              />

              <div className="mt-12 grid md:grid-cols-2 gap-6">
                {relatedContent.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className="block p-6 rounded-2xl bg-card border border-border hover:border-teal-500/50 transition-all hover:shadow-lg hover:shadow-teal-500/10 h-full group"
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center flex-shrink-0`}>
                          <item.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <span className="text-xs font-medium text-teal-500 uppercase tracking-wider">{item.pillar}</span>
                          <h3 className="text-lg font-semibold mt-1 mb-2 group-hover:text-teal-500 transition-colors">{item.title}</h3>
                          <p className="text-muted-foreground text-sm mb-4">{item.description}</p>
                          <span className="text-teal-500 text-sm font-medium inline-flex items-center">
                            Read more <ArrowRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Related Topics */}
          <section className="py-20 lg:py-32 bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <SectionHeading
                badge="Related Topics"
                title="Explore More Crossover Topics"
                description="Discover other powerful combinations of LeadFlow features to optimize your sales process."
              />

              <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {relatedTopics.map((topic, index) => (
                  <motion.div
                    key={topic.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link
                      href={topic.href}
                      className="block p-4 rounded-xl bg-card border border-border hover:border-teal-500/50 transition-all text-center group"
                    >
                      <h3 className="font-medium group-hover:text-teal-500 transition-colors">{topic.title}</h3>
                    </Link>
                  </motion.div>
                ))}
              </div>
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
                  Ready for <span className="bg-gradient-to-r from-teal-500 to-cyan-500 bg-clip-text text-transparent">Seamless Handoffs</span>?
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Start automating your lead handoffs today with LeadFlow. Eliminate dropped leads,
                  ensure complete context transfer, and keep your team moving at full speed.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href="/handler/sign-up">
                    <GlowButton size="lg" className="group">
                      Start Your Free Trial
                      <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </GlowButton>
                  </Link>
                  <Link
                    href="/resources"
                    className="inline-flex items-center gap-2 px-6 py-3 text-base font-medium rounded-full border border-border hover:bg-accent transition-colors"
                  >
                    Browse All Resources
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>
        </main>

      <LandingFooter />
    </div>
  );
}
