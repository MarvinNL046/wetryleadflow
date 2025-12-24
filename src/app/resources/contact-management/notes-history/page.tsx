"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  FileText,
  Clock,
  Users,
  CheckCircle2,
  Search,
  MessageSquare,
  BookOpen,
  Sparkles,
  Shield,
  Tag,
  Pencil,
  History,
  UserCircle,
  Lightbulb
} from "lucide-react";
import { LandingHeader } from "@/components/landing/layout/landing-header";
import { LandingFooter } from "@/components/landing/layout/landing-footer";
import { GlowButton } from "@/components/landing/ui/glow-button";
import { GradientText } from "@/components/landing/ui/gradient-text";
import { SectionHeading } from "@/components/landing/ui/section-heading";

export default function NotesHistoryPage() {
  return (
    <div className="min-h-screen bg-background">
      <LandingHeader />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-background to-background" />
          <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-purple-500/30 rounded-full blur-[128px] animate-pulse" />
          <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: "1s" }} />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-sm font-medium text-purple-400 mb-6">
              <FileText className="w-4 h-4" />
              Contact Management
            </span>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
              Managing Contact{" "}
              <GradientText animated>Notes & History</GradientText>
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              The difference between a good and great sales team often comes down to
              notes. Learn how to capture, organize, and leverage contact notes for
              stronger relationships and better sales outcomes.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/handler/sign-up">
                <GlowButton size="lg" className="group">
                  Start Taking Better Notes
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </GlowButton>
              </Link>
              <Link href="/resources/contact-management/activity-tracking" className="text-muted-foreground hover:text-foreground transition-colors">
                ← Back to Activity Tracking
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Notes Matter Section */}
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
                Why Contact Notes Are Your Secret Weapon
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Your memory is unreliable. After dozens of calls each week, details
                blur together. Notes are how top performers maintain perfect context
                across hundreds of relationships. They turn every conversation into
                a strategic asset.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                Beyond personal recall, notes enable team continuity. When accounts
                change hands, comprehensive notes mean zero relationship reset. The
                new owner can pick up exactly where their predecessor left off,
                referencing past conversations and preferences.
              </p>
              <p className="text-lg text-muted-foreground">
                Notes also surface insights at scale. Search across all notes to
                identify common objections, competitive mentions, and feature requests.
                Your notes become a goldmine of market intelligence.
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
                <h4 className="font-semibold text-lg mb-6">The Impact of Good Notes</h4>
                <div className="space-y-6">
                  {[
                    { metric: "Sales Rep Ramp Time", improvement: "-40%", description: "Faster onboarding with note history" },
                    { metric: "Account Transition Success", improvement: "+65%", description: "Smoother handoffs with context" },
                    { metric: "Customer Satisfaction", improvement: "+28%", description: "Personalized interactions every time" },
                    { metric: "Deal Close Rate", improvement: "+22%", description: "Better prep leads to better outcomes" }
                  ].map((item) => (
                    <div key={item.metric} className="flex items-center gap-4">
                      <div className="w-16 text-right">
                        <span className="text-2xl font-bold text-purple-500">{item.improvement}</span>
                      </div>
                      <div className="flex-1 pl-4 border-l border-border">
                        <p className="font-medium">{item.metric}</p>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Note Types Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Note Types"
            title="Essential Types of Contact Notes"
            titleGradient="Essential"
            description="Different situations call for different note types. Build a complete picture with these categories."
          />

          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: MessageSquare,
                title: "Conversation Notes",
                description: "Record key points from calls, meetings, and chats. Include what was discussed, commitments made, and next steps agreed upon.",
                examples: ["Call summaries", "Meeting minutes", "Chat transcripts"]
              },
              {
                icon: Lightbulb,
                title: "Strategic Notes",
                description: "Document insights about the account's goals, challenges, and decision-making process. These inform your sales strategy.",
                examples: ["Pain points identified", "Business objectives", "Buying committee"]
              },
              {
                icon: UserCircle,
                title: "Personal Notes",
                description: "Track personal details that build rapport. Remember birthdays, hobbies, family mentions, and preferences.",
                examples: ["Personal interests", "Communication preferences", "Notable life events"]
              },
              {
                icon: Shield,
                title: "Objection Notes",
                description: "Record objections raised and how they were addressed. This helps prepare for future conversations and train team members.",
                examples: ["Pricing concerns", "Competitor comparisons", "Implementation worries"]
              },
              {
                icon: History,
                title: "Historical Notes",
                description: "Document the relationship history including past purchases, issues encountered, and how they were resolved.",
                examples: ["Purchase history", "Support tickets", "Relationship milestones"]
              },
              {
                icon: Tag,
                title: "Tagged Notes",
                description: "Use tags to categorize notes for easy retrieval. Create tags for common topics like 'competitor mention' or 'feature request'.",
                examples: ["#competitor", "#expansion", "#reference-able"]
              }
            ].map((type, index) => (
              <motion.div
                key={type.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-card border border-border hover:border-purple-500/50 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center mb-4">
                  <type.icon className="w-6 h-6 text-purple-500" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{type.title}</h3>
                <p className="text-muted-foreground mb-4">{type.description}</p>
                <div className="flex flex-wrap gap-2">
                  {type.examples.map((example) => (
                    <span key={example} className="px-2 py-1 rounded-full bg-muted text-xs">
                      {example}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Practices Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Best Practices"
            title="Note-Taking Best Practices That Work"
            titleGradient="Best Practices"
            description="Follow these guidelines to create notes that actually get used and add value."
          />

          <div className="mt-16 space-y-16">
            {/* Practice 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="grid lg:grid-cols-2 gap-12 items-center"
            >
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-sm font-medium mb-4">
                  <Pencil className="w-4 h-4" />
                  Practice 1
                </div>
                <h3 className="text-2xl font-bold mb-4">Write Notes Immediately</h3>
                <p className="text-muted-foreground mb-6">
                  The longer you wait to document a conversation, the more details you
                  forget. Make it a habit to write notes within 5 minutes of ending any
                  call or meeting. Even brief bullet points capture more than a delayed
                  summary written hours later.
                </p>
                <p className="text-muted-foreground mb-6">
                  If you&apos;re on back-to-back calls, use voice notes to capture key points
                  between meetings. LeadFlow can transcribe these and convert them to
                  structured notes automatically.
                </p>
                <ul className="space-y-3">
                  {[
                    "Set a 5-minute rule for note completion",
                    "Use templates to speed up note creation",
                    "Capture voice notes when typing isn't possible",
                    "Block 5 minutes after each meeting for notes"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-3xl blur-2xl opacity-60" />
                <div className="relative p-8 rounded-2xl bg-card border border-border">
                  <h4 className="font-semibold text-lg mb-4">Note Quality Over Time</h4>
                  <div className="space-y-4">
                    {[
                      { time: "Within 5 min", quality: 95, label: "Excellent recall" },
                      { time: "Within 1 hour", quality: 75, label: "Good detail" },
                      { time: "Same day", quality: 50, label: "Key points only" },
                      { time: "Next day", quality: 25, label: "Major gaps" },
                      { time: "Week later", quality: 10, label: "Almost nothing" }
                    ].map((item) => (
                      <div key={item.time}>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{item.time}</span>
                          <span className="text-muted-foreground">{item.label}</span>
                        </div>
                        <div className="h-3 rounded-full bg-muted overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              item.quality > 80 ? "bg-green-500" :
                              item.quality > 50 ? "bg-yellow-500" :
                              item.quality > 30 ? "bg-orange-500" : "bg-red-500"
                            }`}
                            style={{ width: `${item.quality}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Practice 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="grid lg:grid-cols-2 gap-12 items-center"
            >
              <div className="order-2 lg:order-1 relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-3xl blur-2xl opacity-60" />
                <div className="relative p-8 rounded-2xl bg-card border border-border">
                  <h4 className="font-semibold text-lg mb-4">Note Template Example</h4>
                  <div className="space-y-4 text-sm font-mono">
                    <div className="p-4 rounded-xl bg-muted/50">
                      <p className="text-purple-400 mb-2">## Call Summary</p>
                      <p className="text-muted-foreground">Brief overview of the conversation...</p>
                    </div>
                    <div className="p-4 rounded-xl bg-muted/50">
                      <p className="text-blue-400 mb-2">## Key Discussion Points</p>
                      <p className="text-muted-foreground">- Point 1</p>
                      <p className="text-muted-foreground">- Point 2</p>
                    </div>
                    <div className="p-4 rounded-xl bg-muted/50">
                      <p className="text-green-400 mb-2">## Action Items</p>
                      <p className="text-muted-foreground">- [ ] Follow up with proposal</p>
                      <p className="text-muted-foreground">- [ ] Schedule demo</p>
                    </div>
                    <div className="p-4 rounded-xl bg-muted/50">
                      <p className="text-orange-400 mb-2">## Next Steps</p>
                      <p className="text-muted-foreground">Reconnect in 1 week...</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium mb-4">
                  <BookOpen className="w-4 h-4" />
                  Practice 2
                </div>
                <h3 className="text-2xl font-bold mb-4">Use Structured Templates</h3>
                <p className="text-muted-foreground mb-6">
                  Templates ensure consistency and completeness. When you have a standard
                  format, you&apos;re less likely to forget important elements. Templates also
                  make notes easier to scan and search later.
                </p>
                <p className="text-muted-foreground mb-6">
                  Create different templates for different scenarios—discovery calls,
                  demos, negotiations, and check-ins each have different information
                  priorities. LeadFlow lets you create and share templates across your team.
                </p>
                <ul className="space-y-3">
                  {[
                    "Create templates for each call type",
                    "Include required fields for critical info",
                    "Add prompts for commonly forgotten items",
                    "Share templates across the sales team"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Practice 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="grid lg:grid-cols-2 gap-12 items-center"
            >
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-sm font-medium mb-4">
                  <Search className="w-4 h-4" />
                  Practice 3
                </div>
                <h3 className="text-2xl font-bold mb-4">Make Notes Searchable</h3>
                <p className="text-muted-foreground mb-6">
                  Notes are only valuable if you can find them when you need them. Write
                  with searchability in mind—include specific names, company names, and
                  key terms that you might search for later.
                </p>
                <p className="text-muted-foreground mb-6">
                  Use consistent tagging to categorize notes by topic. When you mention
                  a competitor, tag it. When you identify a feature request, tag it.
                  These tags become powerful filters for analysis and preparation.
                </p>
                <ul className="space-y-3">
                  {[
                    "Use full names and company names consistently",
                    "Tag notes with relevant categories",
                    "Include specific product/feature mentions",
                    "Note competitor names explicitly"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-3xl blur-2xl opacity-60" />
                <div className="relative p-8 rounded-2xl bg-card border border-border">
                  <h4 className="font-semibold text-lg mb-4">Search-Optimized Note</h4>
                  <div className="p-4 rounded-xl bg-muted/50 space-y-4">
                    <div>
                      <span className="text-xs text-muted-foreground">Contact:</span>
                      <p className="font-medium">Sarah Johnson - TechCorp Inc</p>
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground">Summary:</span>
                      <p className="text-sm">Discussed migration from <span className="text-purple-400">Salesforce</span> to LeadFlow. Main concerns: <span className="text-blue-400">data migration</span>, <span className="text-blue-400">team training</span>, and <span className="text-blue-400">integration with HubSpot</span>.</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 rounded-full bg-purple-500/20 text-purple-400 text-xs">#competitor-salesforce</span>
                      <span className="px-2 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs">#migration</span>
                      <span className="px-2 py-1 rounded-full bg-green-500/20 text-green-400 text-xs">#integration</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Practice 4 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="grid lg:grid-cols-2 gap-12 items-center"
            >
              <div className="order-2 lg:order-1 relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-green-500/20 to-purple-500/20 rounded-3xl blur-2xl opacity-60" />
                <div className="relative p-8 rounded-2xl bg-card border border-border">
                  <h4 className="font-semibold text-lg mb-4">Pre-Call Note Review</h4>
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-muted/50">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Last Interaction</span>
                        <span className="text-xs text-muted-foreground">2 weeks ago</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Demo call - positive reception, requested pricing for 50 seats</p>
                    </div>
                    <div className="p-4 rounded-xl bg-muted/50">
                      <span className="font-medium block mb-2">Key Insights</span>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Budget approved for Q1</li>
                        <li>• CEO is final decision maker</li>
                        <li>• Concerned about migration time</li>
                      </ul>
                    </div>
                    <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
                      <span className="font-medium block mb-2 text-purple-400">AI Suggestions</span>
                      <ul className="text-sm space-y-1">
                        <li>• Address migration timeline upfront</li>
                        <li>• Reference Q1 budget timing</li>
                        <li>• Offer CEO briefing session</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-sm font-medium mb-4">
                  <Clock className="w-4 h-4" />
                  Practice 4
                </div>
                <h3 className="text-2xl font-bold mb-4">Review Notes Before Every Call</h3>
                <p className="text-muted-foreground mb-6">
                  The power of notes comes from using them. Before every call, spend
                  2-3 minutes reviewing the contact&apos;s note history. This ensures you
                  pick up where you left off and reference previous conversations.
                </p>
                <p className="text-muted-foreground mb-6">
                  LeadFlow&apos;s AI assistant surfaces the most relevant notes before each
                  call and suggests talking points based on your history. You&apos;ll never
                  walk into a conversation unprepared again.
                </p>
                <ul className="space-y-3">
                  {[
                    "Review last 3-5 interactions before calling",
                    "Note any commitments made previously",
                    "Check for personal details to reference",
                    "Identify outstanding questions or concerns"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* LeadFlow Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="LeadFlow Features"
            title="Powerful Note Management in LeadFlow"
            titleGradient="Powerful"
            description="Everything you need to capture, organize, and leverage contact notes effectively."
          />

          <div className="mt-16 grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Sparkles,
                title: "AI Note Assistant",
                description: "AI summarizes long notes, suggests tags, and highlights key information for quick scanning."
              },
              {
                icon: Search,
                title: "Full-Text Search",
                description: "Search across all notes instantly. Find any conversation or detail in milliseconds."
              },
              {
                icon: Users,
                title: "Team Collaboration",
                description: "Share notes, comment on observations, and collaborate on account strategy."
              },
              {
                icon: History,
                title: "Version History",
                description: "Track all changes to notes with full version history and rollback capability."
              },
              {
                icon: Tag,
                title: "Smart Tagging",
                description: "AI automatically suggests tags based on note content. Create custom tag taxonomies."
              },
              {
                icon: FileText,
                title: "Note Templates",
                description: "Create and share templates for consistent note-taking across your team."
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
                Build Stronger Relationships with Better Notes
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                LeadFlow&apos;s intelligent note system helps you capture everything that
                matters and surface it exactly when you need it. Never forget a detail
                or miss a follow-up again.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/handler/sign-up">
                  <GlowButton size="lg" className="group">
                    Start Free Trial
                    <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </GlowButton>
                </Link>
                <Link href="/resources/contact-management/import-export" className="text-muted-foreground hover:text-foreground transition-colors">
                  Continue to Import & Export →
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
                title: "Activity Tracking",
                description: "Combine notes with activity data for complete relationship context.",
                href: "/resources/contact-management/activity-tracking"
              },
              {
                title: "Import & Export",
                description: "Migrate your existing notes and history to LeadFlow seamlessly.",
                href: "/resources/contact-management/import-export"
              },
              {
                title: "Contact Organization",
                description: "Organize contacts to make note retrieval even easier.",
                href: "/resources/contact-management/contact-organization"
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
