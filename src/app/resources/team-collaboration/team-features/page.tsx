"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Users,
  MessageSquare,
  Share2,
  BarChart3,
  CheckCircle2,
  ArrowRight,
  Bell,
  Calendar,
  Target,
  Zap,
  FileText,
  Activity
} from "lucide-react";
import { LandingHeader } from "@/components/landing/layout/landing-header";
import { LandingFooter } from "@/components/landing/layout/landing-footer";
import { GlowButton } from "@/components/landing/ui/glow-button";
import { GradientText } from "@/components/landing/ui/gradient-text";

export default function TeamFeaturesPage() {
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
              <Users className="w-4 h-4 mr-2" />
              Sales Collaboration
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Essential <GradientText>Team Features</GradientText> for Sales Collaboration Success
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Discover the collaboration features that transform individual salespeople into high-performing teams. From real-time activity feeds to shared pipelines and team analytics, learn how modern CRM tools drive collective success.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/handler/sign-up">
                <GlowButton size="lg">
                  Try Team Features Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </GlowButton>
              </Link>
              <Link
                href="/resources/team-collaboration/lead-handoffs"
                className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
              >
                Learn about lead handoffs
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Team Features Matter */}
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
              Why Team Collaboration Features Transform Sales Performance
            </h2>

            <div className="prose prose-lg prose-invert max-w-none">
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                The era of the lone wolf salesperson is over. Modern B2B sales cycles involve multiple touchpoints, diverse stakeholders, and complex decision-making processes that no individual can navigate alone. Research consistently shows that sales teams who collaborate effectively close thirty percent more deals than those who operate in silos. Team features in your CRM are not just convenient additions but rather essential infrastructure for competitive success.
              </p>

              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Consider the typical enterprise sale: a discovery call with the end user, a technical evaluation with IT, a security review, procurement negotiations, and executive sign-off. Each interaction might involve a different member of your sales team, from the account executive to the solutions engineer to the customer success manager. Without robust collaboration features, critical information gets lost in email threads, context disappears between handoffs, and opportunities slip through the cracks.
              </p>

              <p className="text-muted-foreground text-lg leading-relaxed">
                LeadFlow was built from the ground up to support collaborative selling. Our team features ensure that every interaction is captured, every piece of context is preserved, and every team member has the visibility they need to contribute effectively. The result is faster sales cycles, higher win rates, and dramatically improved customer experiences that lead to lasting relationships and referrals.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Team Features */}
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
              Core <GradientText>Collaboration Features</GradientText> in LeadFlow
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Every feature designed to help your team work together seamlessly toward shared revenue goals.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Activity,
                title: "Real-Time Activity Feed",
                description: "Stay informed with a live stream of team activities. See when colleagues update leads, log calls, send emails, or close deals. This shared awareness prevents duplicate outreach and ensures everyone knows the latest status of every account.",
                benefits: ["Prevent duplicate outreach", "Stay informed on deal progress", "Celebrate team wins instantly"]
              },
              {
                icon: Share2,
                title: "Shared Pipeline Views",
                description: "Visualize your entire team's pipeline in customizable views. Filter by owner, stage, value, or any custom field to get the exact perspective you need. Managers see the full picture while reps focus on their opportunities.",
                benefits: ["Full pipeline visibility", "Custom filtering options", "Role-based views"]
              },
              {
                icon: MessageSquare,
                title: "Internal Notes & Mentions",
                description: "Collaborate directly within deal records using internal notes. Tag colleagues with @mentions to draw their attention to important updates or request their input. All communication stays attached to the relevant lead or deal.",
                benefits: ["Contextual communication", "Easy colleague tagging", "Searchable history"]
              },
              {
                icon: Calendar,
                title: "Shared Calendar Integration",
                description: "Coordinate scheduling across your team with shared calendar visibility. See when colleagues are available, avoid double-booking prospects, and ensure smooth handoffs between team members during the sales process.",
                benefits: ["Team availability at a glance", "Prevent scheduling conflicts", "Coordinate customer meetings"]
              },
              {
                icon: Target,
                title: "Team Goals & Quotas",
                description: "Set and track team-level goals alongside individual quotas. Visual progress indicators keep everyone motivated and aligned. Celebrate collective achievements while maintaining healthy individual accountability.",
                benefits: ["Shared goal tracking", "Visual progress indicators", "Team motivation"]
              },
              {
                icon: BarChart3,
                title: "Collaborative Analytics",
                description: "Generate and share reports with your team. Create dashboards that highlight team performance, identify best practices from top performers, and surface coaching opportunities for developing team members.",
                benefits: ["Shared dashboards", "Performance benchmarking", "Coaching insights"]
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-gradient-to-br from-background to-muted border border-border hover:border-purple-500/50 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground mb-4">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-center text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Advanced Collaboration */}
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
                Advanced Collaboration Capabilities for Enterprise Teams
              </h2>

              <div className="space-y-8">
                <div className="p-6 rounded-2xl bg-background border border-border">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                      <Bell className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Smart Notifications & Alerts</h3>
                      <p className="text-muted-foreground mb-4">
                        Configure intelligent notifications that keep your team informed without overwhelming them. Set up alerts for stalled deals, approaching deadlines, competitive mentions, or any custom criteria. LeadFlow learns your team's patterns and optimizes notification delivery to maximize relevance while minimizing distraction. You can customize notification preferences at both the team and individual level, ensuring everyone gets the information they need in the format they prefer.
                      </p>
                      <p className="text-muted-foreground">
                        The smart notification system understands context and timing. A notification about a deal at risk is delivered immediately, while a summary of team activities might be batched into a daily digest. This thoughtful approach to communication helps teams stay coordinated without suffering from notification fatigue.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-background border border-border">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                      <FileText className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Collaborative Document Management</h3>
                      <p className="text-muted-foreground mb-4">
                        Share proposals, contracts, case studies, and other sales collateral directly within LeadFlow. Track document opens and engagement to understand what resonates with prospects. Version control ensures your team always uses the latest approved materials, while document analytics reveal which content drives the most conversions.
                      </p>
                      <p className="text-muted-foreground">
                        Create and maintain a shared library of winning proposals, objection handling scripts, and competitive battle cards that your entire team can access. When a rep discovers a new approach that works, they can share it immediately with colleagues, spreading best practices organically throughout the organization.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-background border border-border">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0">
                      <Zap className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Workflow Automation for Teams</h3>
                      <p className="text-muted-foreground mb-4">
                        Automate repetitive coordination tasks so your team can focus on selling. Set up automatic lead routing based on territory, industry, or deal size. Trigger notifications when deals need attention. Create approval workflows for discounts or custom terms that involve multiple stakeholders.
                      </p>
                      <p className="text-muted-foreground">
                        Workflow automation eliminates the manual coordination overhead that slows down sales cycles. When a deal reaches a certain stage, the right people are automatically notified. When a contract needs legal review, it is routed to the appropriate queue. These automated processes ensure nothing falls through the cracks while freeing your team to do what they do best: build relationships and close deals.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Building a Collaborative Culture */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
              Building a <GradientText>Collaborative Sales Culture</GradientText>
            </h2>

            <p className="text-xl text-muted-foreground text-center mb-12">
              Technology enables collaboration, but culture sustains it. Here is how leading sales organizations foster genuine teamwork.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="p-6 rounded-xl bg-muted/50 border border-border">
                  <h3 className="text-lg font-semibold mb-3">Celebrate Collaborative Wins</h3>
                  <p className="text-muted-foreground">
                    Recognize deals that involved multiple team members. When you highlight cross-functional collaboration in team meetings and communications, you reinforce that teamwork is valued and rewarded. LeadFlow tracks contribution to every deal, making it easy to give credit where credit is due.
                  </p>
                </div>

                <div className="p-6 rounded-xl bg-muted/50 border border-border">
                  <h3 className="text-lg font-semibold mb-3">Share Knowledge Generously</h3>
                  <p className="text-muted-foreground">
                    Encourage top performers to document their approaches and share what works. Create spaces within your CRM for tips, templates, and tactics that benefit the entire team. When knowledge flows freely, the whole organization rises together.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="p-6 rounded-xl bg-muted/50 border border-border">
                  <h3 className="text-lg font-semibold mb-3">Align Incentives with Team Goals</h3>
                  <p className="text-muted-foreground">
                    While individual quotas drive personal accountability, team bonuses and recognition programs encourage collaboration. Consider compensation structures that reward both individual achievement and team success to create balanced motivation.
                  </p>
                </div>

                <div className="p-6 rounded-xl bg-muted/50 border border-border">
                  <h3 className="text-lg font-semibold mb-3">Make Collaboration Effortless</h3>
                  <p className="text-muted-foreground">
                    Remove friction from collaborative workflows. If sharing information or asking for help requires multiple clicks or context switches, people will default to working alone. LeadFlow puts collaboration at the center of every interaction, making teamwork the path of least resistance.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
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
              Ready to Supercharge Your <GradientText>Team's Collaboration</GradientText>?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of sales teams who have transformed their collaboration with LeadFlow. Start your free trial today and experience the difference teamwork makes.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/handler/sign-up">
                <GlowButton size="lg">
                  Start Collaborating Free
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
              Explore More Team Collaboration Resources
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { title: "Role Management", href: "/resources/team-collaboration/role-management", description: "Structure team roles effectively" },
              { title: "User Permissions", href: "/resources/team-collaboration/user-permissions", description: "Configure granular access" },
              { title: "Lead Handoffs", href: "/resources/team-collaboration/lead-handoffs", description: "Seamless lead transitions" },
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
