"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  MessageSquare,
  Users,
  Bell,
  CheckCircle2,
  ArrowRight,
  AtSign,
  Hash,
  Inbox,
  Mail,
  Video,
  Smartphone,
  Clock,
  Zap
} from "lucide-react";
import { LandingHeader } from "@/components/landing/layout/landing-header";
import { LandingFooter } from "@/components/landing/layout/landing-footer";
import { GlowButton } from "@/components/landing/ui/glow-button";
import { GradientText } from "@/components/landing/ui/gradient-text";

export default function TeamCommunicationPage() {
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
              <MessageSquare className="w-4 h-4 mr-2" />
              Communication Guide
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Effective <GradientText>Team Communication</GradientText> in Your CRM
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Discover how to leverage CRM communication features to keep your sales team aligned, informed, and productive. From internal notes to activity feeds and smart notifications, master the tools that eliminate silos and drive collaboration.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/handler/sign-up">
                <GlowButton size="lg">
                  Improve Team Communication
                  <ArrowRight className="ml-2 w-5 h-5" />
                </GlowButton>
              </Link>
              <Link
                href="/resources/team-collaboration/team-features"
                className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
              >
                Explore team features
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why CRM Communication Matters */}
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
              The Critical Role of Communication in Sales Team Success
            </h2>

            <div className="prose prose-lg prose-invert max-w-none">
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Sales is fundamentally a team sport, even when individual reps own their deals. Every closed-won opportunity benefits from the collective intelligence of product experts, solution engineers, managers, and fellow reps who share insights, provide coaching, and help navigate complex situations. The challenge is ensuring this valuable collaboration happens efficiently without creating communication chaos that distracts from actual selling activities.
              </p>

              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Traditional communication tools like email and instant messaging create silos. Critical deal context gets buried in personal inboxes, discussions happen in channels disconnected from the relevant accounts, and new team members have no way to access historical conversations that would help them understand the full picture. When communication lives outside your CRM, you lose the context that makes information actionable.
              </p>

              <p className="text-muted-foreground text-lg leading-relaxed">
                LeadFlow brings communication into the heart of your sales data. Internal notes attach directly to leads, contacts, and deals. Activity feeds show what is happening across your team in real time. Mentions draw colleague attention exactly when and where needed. This contextual approach to communication eliminates information gaps while keeping everyone focused on the records that matter most to closing business.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Communication Channels */}
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
              <GradientText>Communication Channels</GradientText> in LeadFlow
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Multiple channels work together to keep your team connected and informed without overwhelming anyone.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: AtSign,
                title: "Mentions & Tags",
                description: "Draw colleague attention with @mentions in notes, comments, and activity logs. Tagged team members receive instant notifications and can quickly jump to the relevant context. Mentions create an audit trail showing who was consulted on each decision.",
                benefits: ["Instant colleague alerts", "Contextual notifications", "Clear accountability trail"]
              },
              {
                icon: Hash,
                title: "Internal Notes",
                description: "Add private notes to any record that are visible only to your team. Use notes to capture strategy discussions, competitive intelligence, or sensitive information that should not be exposed to customers. Notes stay attached to records permanently.",
                benefits: ["Record-level context", "Team-only visibility", "Permanent documentation"]
              },
              {
                icon: Inbox,
                title: "Activity Feed",
                description: "Monitor real-time updates across your entire team or filter to specific records, people, or activity types. The activity feed ensures you never miss important developments and helps managers maintain visibility into team performance.",
                benefits: ["Real-time awareness", "Customizable filters", "Full team visibility"]
              },
              {
                icon: Bell,
                title: "Smart Notifications",
                description: "Configure notifications that alert you to what matters most while filtering out noise. Set triggers for deal stage changes, stalled opportunities, approaching deadlines, or any custom criteria. Choose your delivery channel: email, mobile push, or in-app.",
                benefits: ["Customizable alerts", "Multi-channel delivery", "Noise reduction"]
              },
              {
                icon: Mail,
                title: "Email Integration",
                description: "Connect your email to automatically log communications with prospects and customers. Team members can see the full email thread history without leaving your CRM. Email templates and sequences help maintain consistent communication.",
                benefits: ["Automatic logging", "Full thread history", "Template library"]
              },
              {
                icon: Video,
                title: "Meeting Integration",
                description: "Sync with calendar and video conferencing tools to log meetings automatically. Meeting notes and recordings can be attached to relevant CRM records. Integration ensures no customer interaction goes undocumented.",
                benefits: ["Auto-logged meetings", "Attached recordings", "Calendar sync"]
              }
            ].map((channel, index) => (
              <motion.div
                key={channel.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-gradient-to-br from-background to-muted border border-border hover:border-purple-500/50 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center mb-4">
                  <channel.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{channel.title}</h3>
                <p className="text-muted-foreground mb-4">{channel.description}</p>
                <ul className="space-y-2">
                  {channel.benefits.map((benefit) => (
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

      {/* Communication Best Practices */}
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
                Communication Best Practices for Sales Teams
              </h2>

              <p className="text-xl text-muted-foreground mb-10">
                Technology enables effective communication, but habits and norms sustain it. Implement these practices to maximize the value of your CRM communication features.
              </p>

              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Document As You Go</h3>
                    <p className="text-muted-foreground">
                      The most valuable information is often the freshest. Train your team to log notes, update records, and document decisions immediately after calls and meetings rather than waiting until the end of the day or week. Real-time documentation captures nuances that fade from memory quickly. LeadFlow makes this easy with quick-note features accessible from any record and mobile apps that let you log information from anywhere. When documentation becomes habitual, your CRM transforms into a living repository of customer intelligence.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Use Mentions Strategically</h3>
                    <p className="text-muted-foreground">
                      Mentions are powerful for drawing attention but can become noisy if overused. Establish team norms around when mentions are appropriate. Generally, use mentions when you need specific input, are handing off responsibility, or want to ensure someone sees critical information. Avoid mentioning people simply to keep them informed; that is what activity feeds are for. When you do mention colleagues, provide enough context that they can understand the situation without extensive research.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Configure Notifications Thoughtfully</h3>
                    <p className="text-muted-foreground">
                      Notification fatigue is real and counterproductive. Work with each team member to configure notifications that surface what they need without overwhelming them with updates about everything. Start with essential notifications like deal stage changes and direct mentions, then add additional triggers as needed. Regular review of notification settings helps maintain the right balance as roles and responsibilities evolve.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold">
                    4
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Maintain Communication Hygiene</h3>
                    <p className="text-muted-foreground">
                      Keep your CRM communication focused and professional. Internal notes should contain actionable information, not casual conversation better suited to chat apps. Use consistent formatting and terminology so notes are scannable and searchable. Review and archive outdated information periodically to prevent clutter. Clean, well-organized communication makes your CRM a pleasure to use rather than a chore.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold">
                    5
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Bridge Synchronous and Asynchronous</h3>
                    <p className="text-muted-foreground">
                      Not every communication needs to be real-time. Use your CRM for asynchronous updates and context sharing, reserving synchronous channels like video calls and instant messaging for discussions that benefit from immediate back-and-forth. Document the outcomes of synchronous conversations in your CRM so the conclusions are accessible to everyone, even those who could not participate live.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Communication for Remote Teams */}
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
              <GradientText>Remote and Distributed</GradientText> Team Communication
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              When your team works across locations and time zones, CRM-centered communication becomes even more critical.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: Clock,
                title: "Asynchronous Updates",
                description: "Remote teams cannot rely on hallway conversations or quick desk visits. Use CRM notes and activity logs to share updates that colleagues in different time zones can review on their schedule. Clear, context-rich asynchronous communication keeps everyone aligned despite geographic distribution."
              },
              {
                icon: Smartphone,
                title: "Mobile Access",
                description: "Field sales and traveling team members need full communication access from their phones. LeadFlow's mobile app provides complete functionality for viewing activity feeds, adding notes, and responding to mentions. Your team stays connected whether they are in the office, at home, or visiting customers."
              },
              {
                icon: Users,
                title: "Shared Visibility",
                description: "Without physical proximity, it is easy for team members to feel isolated or uninformed. Activity feeds and team dashboards create shared awareness that substitutes for the ambient knowledge gained in co-located offices. Everyone sees what is happening across the team."
              },
              {
                icon: Zap,
                title: "Instant Escalation",
                description: "When urgent issues arise, mentions and notifications ensure the right people see them immediately. Configure escalation paths that alert managers when deals need attention or when time-sensitive requests come in. Fast response times are achievable even with distributed teams."
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-gradient-to-br from-background to-muted border border-border"
              >
                <item.icon className="w-10 h-10 text-purple-500 mb-4" />
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Ecosystem */}
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
                Connecting Your Communication Ecosystem
              </h2>

              <p className="text-xl text-muted-foreground text-center mb-12">
                LeadFlow integrates with the tools your team already uses to create a unified communication experience.
              </p>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-6 rounded-xl bg-background border border-border text-center">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-purple-400">#</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Slack Integration</h3>
                  <p className="text-muted-foreground text-sm">
                    Receive LeadFlow notifications in Slack channels. Share deal updates without leaving your chat app. Create leads directly from Slack conversations.
                  </p>
                </div>

                <div className="p-6 rounded-xl bg-background border border-border text-center">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center mx-auto mb-4">
                    <Mail className="text-2xl text-purple-400" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Email Providers</h3>
                  <p className="text-muted-foreground text-sm">
                    Connect Gmail, Outlook, or any IMAP email. Automatic logging keeps all correspondence visible. Send tracked emails directly from LeadFlow.
                  </p>
                </div>

                <div className="p-6 rounded-xl bg-background border border-border text-center">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center mx-auto mb-4">
                    <Video className="text-2xl text-purple-400" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Video Conferencing</h3>
                  <p className="text-muted-foreground text-sm">
                    Integrate with Zoom, Google Meet, or Microsoft Teams. Schedule meetings from deal records. Log meeting outcomes automatically.
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
              Ready to Transform <GradientText>Team Communication</GradientText>?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Bring your team's communication into your CRM where it belongs. LeadFlow makes collaboration seamless, contextual, and actionable.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/handler/sign-up">
                <GlowButton size="lg">
                  Start Your Free Trial
                  <ArrowRight className="ml-2 w-5 h-5" />
                </GlowButton>
              </Link>
              <Link
                href="/resources/team-collaboration/role-management"
                className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
              >
                Explore role management
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
              More Team Collaboration Resources
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { title: "Role Management", href: "/resources/team-collaboration/role-management", description: "Structure team hierarchies" },
              { title: "Team Features", href: "/resources/team-collaboration/team-features", description: "Discover collaboration tools" },
              { title: "User Permissions", href: "/resources/team-collaboration/user-permissions", description: "Configure access controls" },
              { title: "Lead Handoffs", href: "/resources/team-collaboration/lead-handoffs", description: "Perfect lead transitions" }
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
