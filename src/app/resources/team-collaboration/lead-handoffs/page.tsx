"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRightLeft,
  Users,
  Clock,
  CheckCircle2,
  ArrowRight,
  FileText,
  MessageSquare,
  Zap,
  Target,
  AlertCircle,
  TrendingUp,
  RefreshCw
} from "lucide-react";
import { LandingHeader } from "@/components/landing/layout/landing-header";
import { LandingFooter } from "@/components/landing/layout/landing-footer";
import { GlowButton } from "@/components/landing/ui/glow-button";
import { GradientText } from "@/components/landing/ui/gradient-text";

export default function LeadHandoffsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <LandingHeader />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <ArrowRightLeft className="w-4 h-4 mr-2" />
              Team Handoff Guide
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Mastering <GradientText>Smooth Lead Handoffs</GradientText> Between Sales Teams
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Learn the strategies, processes, and tools that ensure seamless lead transitions between team members. Eliminate dropped leads, preserve customer context, and maintain momentum throughout the entire buyer journey.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/handler/sign-up">
                <GlowButton size="lg">
                  Streamline Your Handoffs
                  <ArrowRight className="ml-2 w-5 h-5" />
                </GlowButton>
              </Link>
              <Link
                href="/resources/team-collaboration/team-communication"
                className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
              >
                Learn about team communication
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* The Importance of Lead Handoffs */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Why Lead Handoffs Make or Break Your Sales Process
            </h2>

            <div className="prose prose-lg prose-invert max-w-none">
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Every lead handoff represents a critical moment of vulnerability in your sales process. Whether you are transitioning a lead from marketing to sales development, from SDR to account executive, or from sales to customer success, each handoff creates an opportunity for context loss, communication gaps, and diminished customer experience. Research indicates that poor handoff processes contribute to up to thirty percent of lost opportunities, making this one of the highest-leverage areas for process improvement.
              </p>

              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Consider the prospect's perspective: they have invested time sharing their challenges, goals, and requirements with one member of your team. When that prospect is handed off to someone new, they expect continuity. Nothing erodes trust faster than having to repeat information they have already provided. A smooth handoff demonstrates organizational competence and shows the prospect that they are valued enough for your team to properly coordinate around their needs.
              </p>

              <p className="text-muted-foreground text-lg leading-relaxed">
                LeadFlow was designed with handoffs as a first-class concern. Our platform captures every interaction, preserves full context, and automates the notification and assignment workflows that keep leads moving smoothly between team members. When you implement proper handoff processes supported by the right technology, you protect revenue, improve customer experience, and create accountability across your entire go-to-market organization.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Types of Handoffs */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Common <GradientText>Lead Handoff Scenarios</GradientText>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Understanding different handoff types helps you design appropriate processes for each transition point.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: TrendingUp,
                title: "Marketing to Sales",
                description: "The initial handoff from marketing qualified lead to sales development. This transition requires clear qualification criteria, timely follow-up, and proper context about the lead's engagement history and interests.",
                keyPoints: ["Define MQL criteria clearly", "Automate routing rules", "Include engagement history", "Set SLA for response time"]
              },
              {
                icon: Users,
                title: "SDR to Account Executive",
                description: "Moving qualified opportunities from sales development to closing representatives. This handoff must transfer discovery findings, stakeholder information, and any commitments made during initial conversations.",
                keyPoints: ["Transfer discovery notes", "Introduce both parties", "Brief on buying committee", "Share objections handled"]
              },
              {
                icon: RefreshCw,
                title: "Account Executive to Account Executive",
                description: "Territory changes, role transitions, or capacity rebalancing often require deals to move between closing reps. These handoffs need extra care to maintain relationship continuity with engaged prospects.",
                keyPoints: ["Warm introduction required", "Full deal history transfer", "Relationship continuity plan", "Customer communication"]
              },
              {
                icon: Target,
                title: "Sales to Customer Success",
                description: "Post-sale handoff to implementation and success teams. This transition should transfer all promises made during the sales process, success criteria, and stakeholder relationships established.",
                keyPoints: ["Document commitments", "Transfer relationships", "Share success criteria", "Implementation context"]
              },
              {
                icon: Clock,
                title: "Temporary Coverage",
                description: "When team members are unavailable due to vacation, leave, or training, their leads need temporary stewardship. These handoffs are temporary but still require full context for effective coverage.",
                keyPoints: ["Clear return date", "Priority ranking", "Pending action items", "Emergency contact info"]
              },
              {
                icon: Zap,
                title: "Escalation Handoffs",
                description: "When deals require executive involvement or specialized expertise, leads may be escalated up or across the organization. These handoffs must convey why escalation is needed and what specific help is required.",
                keyPoints: ["Escalation reason clear", "Specific ask defined", "Background provided", "Original owner stays involved"]
              }
            ].map((scenario, index) => (
              <motion.div
                key={scenario.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-gradient-to-br from-background to-muted border border-border hover:border-purple-500/50 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center mb-4">
                  <scenario.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{scenario.title}</h3>
                <p className="text-muted-foreground mb-4">{scenario.description}</p>
                <ul className="space-y-2">
                  {scenario.keyPoints.map((point) => (
                    <li key={point} className="flex items-center text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Perfect Handoff Process */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Anatomy of a Perfect Lead Handoff
              </h2>

              <p className="text-xl text-muted-foreground mb-10">
                Follow this structured approach to ensure every handoff maintains context and momentum.
              </p>

              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Prepare the Handoff Package</h3>
                    <p className="text-muted-foreground">
                      Before initiating any handoff, compile all relevant information about the lead. This includes contact details, company information, interaction history, discovered pain points, stated objectives, timeline expectations, budget indications, and any commitments or promises made. LeadFlow automatically aggregates this information into comprehensive handoff summaries that capture everything the receiving team member needs to know. Take an extra moment to add personal notes about the prospect's communication style, key stakeholders, or any nuances that might not be captured in formal data fields.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Notify the Receiving Party</h3>
                    <p className="text-muted-foreground">
                      Never surprise a colleague with a new lead assignment. Provide advance notice that a handoff is coming, along with context about why this particular lead is being transferred. This gives the receiving party time to review the handoff package before engaging with the prospect. LeadFlow supports configurable notification workflows that alert team members through their preferred channels, whether that is email, Slack, or in-app notifications. Include a brief summary in the notification so recipients can quickly assess priority.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Conduct a Warm Introduction</h3>
                    <p className="text-muted-foreground">
                      Whenever possible, introduce the prospect to their new point of contact personally. This can be as simple as a three-way email introduction or as involved as a joint call where you formally transition the relationship. The warm introduction legitimizes the new contact, reassures the prospect that they are in good hands, and gives the receiving team member instant credibility built on your existing relationship. For high-value opportunities, consider scheduling a formal transition meeting where all parties can align on next steps.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold">
                    4
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Verify Receipt and Understanding</h3>
                    <p className="text-muted-foreground">
                      A handoff is not complete when you send the notification. It is complete when the receiving party confirms they have reviewed the materials, understand the context, and accept responsibility for the lead. Build verification steps into your handoff workflows that require explicit acknowledgment before the transition is considered final. This creates accountability and ensures no leads fall into the gap between team members.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold">
                    5
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Follow Up and Support</h3>
                    <p className="text-muted-foreground">
                      Stay available for questions during the initial period after handoff. The receiving party may encounter situations or questions that benefit from your historical knowledge of the account. Set a reminder to check in after a few days to ensure the transition is proceeding smoothly. This follow-up demonstrates ownership of the outcome, not just completion of the task.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Common Handoff Mistakes */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Avoiding <GradientText>Critical Handoff Mistakes</GradientText>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Learn from common pitfalls that cause handoffs to fail and leads to go cold.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: AlertCircle,
                title: "Insufficient Context Transfer",
                description: "The most common handoff failure is not providing enough context. Simply transferring a name and contact information forces the receiving party to start discovery from scratch, frustrating the prospect and wasting everyone's time. Always include the full history, key insights, and relevant background."
              },
              {
                icon: Clock,
                title: "Delayed Follow-Up",
                description: "When leads sit unattended after a handoff, momentum dies. Establish clear SLAs for post-handoff engagement and monitor compliance. If the new owner cannot follow up quickly, the handoff should wait or go to someone with capacity to act immediately."
              },
              {
                icon: MessageSquare,
                title: "Cold Handoffs",
                description: "Transferring leads without any introduction leaves prospects confused about who they should be talking to and why. Even a simple email introduction dramatically improves the prospect's experience and the new rep's credibility. Never leave prospects wondering why someone new is contacting them."
              },
              {
                icon: FileText,
                title: "Undocumented Commitments",
                description: "If you made promises during your interactions, those commitments must transfer with the lead. Failing to document and communicate commitments sets up the new owner for failure and damages trust with the prospect. Record every commitment in your CRM religiously."
              }
            ].map((mistake, index) => (
              <motion.div
                key={mistake.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-gradient-to-br from-background to-muted border border-border"
              >
                <mistake.icon className="w-10 h-10 text-red-400 mb-4" />
                <h3 className="text-xl font-semibold mb-3">{mistake.title}</h3>
                <p className="text-muted-foreground">{mistake.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Automating Handoffs */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
                Automating Lead Handoffs with LeadFlow
              </h2>

              <p className="text-xl text-muted-foreground text-center mb-12">
                Technology should handle the mechanics of handoffs so your team can focus on relationships.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 rounded-xl bg-background border border-border">
                  <h3 className="text-lg font-semibold mb-3">Automated Routing Rules</h3>
                  <p className="text-muted-foreground">
                    Configure rules that automatically assign leads based on criteria like territory, industry, deal size, or product interest. LeadFlow evaluates incoming leads against your routing logic and instantly delivers them to the right team member with full context intact. Round-robin distribution ensures fair allocation across your team.
                  </p>
                </div>

                <div className="p-6 rounded-xl bg-background border border-border">
                  <h3 className="text-lg font-semibold mb-3">Handoff Checklists</h3>
                  <p className="text-muted-foreground">
                    Create mandatory checklists that must be completed before a handoff can proceed. Require specific information to be filled in, attachments to be uploaded, or approvals to be obtained. This ensures consistency and prevents incomplete handoffs from creating downstream problems.
                  </p>
                </div>

                <div className="p-6 rounded-xl bg-background border border-border">
                  <h3 className="text-lg font-semibold mb-3">SLA Monitoring</h3>
                  <p className="text-muted-foreground">
                    Set service level agreements for handoff response times and let LeadFlow monitor compliance. Receive alerts when handoffs are approaching SLA deadlines or have breached acceptable timeframes. Track handoff performance over time to identify process improvements.
                  </p>
                </div>

                <div className="p-6 rounded-xl bg-background border border-border">
                  <h3 className="text-lg font-semibold mb-3">Context Summaries</h3>
                  <p className="text-muted-foreground">
                    LeadFlow automatically generates handoff summaries that pull together all relevant lead information, recent activities, notes, and files. These summaries give receiving team members everything they need in one view, eliminating the need to hunt through records for context.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Perfect Your <GradientText>Lead Handoffs</GradientText>?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Stop losing deals to poor handoff processes. LeadFlow gives you the tools to create seamless transitions that preserve momentum and delight prospects.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/handler/sign-up">
                <GlowButton size="lg">
                  Start Free Trial
                  <ArrowRight className="ml-2 w-5 h-5" />
                </GlowButton>
              </Link>
              <Link
                href="/resources/team-collaboration/user-permissions"
                className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
              >
                Learn about permissions
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Resources */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Continue Learning About Team Collaboration
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { title: "Role Management", href: "/resources/team-collaboration/role-management", description: "Structure your team hierarchy" },
              { title: "Team Features", href: "/resources/team-collaboration/team-features", description: "Discover collaboration tools" },
              { title: "User Permissions", href: "/resources/team-collaboration/user-permissions", description: "Configure access controls" },
              { title: "Team Communication", href: "/resources/team-collaboration/team-communication", description: "Master internal messaging" }
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
                  className="block p-6 rounded-xl bg-muted/50 border border-border hover:border-purple-500/50 transition-all duration-300"
                >
                  <h3 className="font-semibold mb-2">{resource.title}</h3>
                  <p className="text-sm text-muted-foreground">{resource.description}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
}
