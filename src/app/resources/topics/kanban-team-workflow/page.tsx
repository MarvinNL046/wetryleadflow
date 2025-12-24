"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Kanban,
  Users,
  CheckCircle2,
  ArrowRight,
  Layers,
  MessageSquare,
  GitBranch,
  Workflow,
  RefreshCw,
  Target,
} from "lucide-react";
import {
  LandingHeader,
  LandingFooter,
  GlowButton,
  GradientText,
} from "@/components/landing";

const relatedTopics = [
  {
    title: "Automated Deal Tracking",
    description: "Combine automation with CRM best practices for seamless deals",
    href: "/resources/topics/automated-deal-tracking",
    gradient: "from-yellow-500 to-orange-500",
  },
  {
    title: "Permission-Based Analytics",
    description: "Team permissions combined with performance analytics",
    href: "/resources/topics/permission-based-analytics",
    gradient: "from-violet-500 to-purple-500",
  },
  {
    title: "Landing Page Optimization",
    description: "Optimize lead capture forms for better conversions",
    href: "/resources/topics/landing-page-optimization",
    gradient: "from-blue-500 to-cyan-500",
  },
];

const linkedResources = [
  {
    title: "Kanban Boards",
    description: "Visual pipeline management for sales teams",
    href: "/resources/pipeline-management/kanban-boards",
    icon: Kanban,
    pillar: "Pipeline Management",
  },
  {
    title: "Stage Optimization",
    description: "Optimize your pipeline stages for maximum velocity",
    href: "/resources/pipeline-management/stage-optimization",
    icon: Layers,
    pillar: "Pipeline Management",
  },
  {
    title: "Lead Handoffs",
    description: "Seamless transitions between team members",
    href: "/resources/team-collaboration/lead-handoffs",
    icon: GitBranch,
    pillar: "Team Collaboration",
  },
  {
    title: "Team Communication",
    description: "Keep your sales team aligned and informed",
    href: "/resources/team-collaboration/team-communication",
    icon: MessageSquare,
    pillar: "Team Collaboration",
  },
];

export default function KanbanTeamWorkflowPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
        <LandingHeader />

        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          {/* Background Effects - Teal Gradient */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl" />
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <div className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium rounded-full bg-teal-500/10 text-teal-500 border border-teal-500/20">
                <Kanban className="w-4 h-4 mr-2" />
                Pipeline Management + Team Collaboration
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                Kanban Team Workflow:{" "}
                <span className="bg-gradient-to-r from-teal-400 via-emerald-500 to-teal-600 bg-clip-text text-transparent">
                  Visual Collaboration
                </span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Combine the visual power of Kanban boards with seamless team
                collaboration. Create workflows where everyone sees the big picture
                and handoffs happen automatically.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/handler/sign-up">
                  <GlowButton size="lg">
                    Build Your Workflow
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </GlowButton>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Value Proposition Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                See Your Pipeline,{" "}
                <span className="bg-gradient-to-r from-teal-400 to-emerald-500 bg-clip-text text-transparent">
                  Move as a Team
                </span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Kanban boards show where every deal stands. Team collaboration
                ensures deals move forward without bottlenecks. Together, they
                create a sales machine where nothing falls through the cracks.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Target,
                  title: "Visual Deal Management",
                  description:
                    "Drag and drop deals through stages. Everyone sees the current state of every opportunity at a glance.",
                },
                {
                  icon: RefreshCw,
                  title: "Automatic Handoffs",
                  description:
                    "When deals reach certain stages, they are automatically assigned to the right team member with full context.",
                },
                {
                  icon: Workflow,
                  title: "Workflow Triggers",
                  description:
                    "Moving a card to a new stage can trigger notifications, tasks, and updates across the team.",
                },
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-8 rounded-2xl bg-background border border-border hover:border-teal-500/50 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center mb-6">
                    <benefit.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Key Concepts Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center mb-16"
            >
              <div className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium rounded-full bg-teal-500/10 text-teal-500 border border-teal-500/20">
                <Users className="w-4 h-4 mr-2" />
                Team Workflow Design
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Building Collaborative{" "}
                <span className="bg-gradient-to-r from-teal-400 to-emerald-500 bg-clip-text text-transparent">
                  Kanban Workflows
                </span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {[
                {
                  title: "Multi-Team Board Design",
                  description:
                    "Structure your Kanban board to accommodate multiple team handoffs. SDRs, AEs, and CSMs can all work from the same visual pipeline with clear ownership at each stage.",
                  points: [
                    "SDR qualification columns",
                    "AE negotiation stages",
                    "CS onboarding lanes",
                    "Clear ownership indicators",
                  ],
                },
                {
                  title: "Handoff Automation",
                  description:
                    "When a card moves from one team's columns to another, automatic notifications, task creation, and data transfers ensure nothing is lost in transition.",
                  points: [
                    "Automatic reassignment",
                    "Context transfer summaries",
                    "Handoff notifications",
                    "History preservation",
                  ],
                },
                {
                  title: "Team-Based WIP Limits",
                  description:
                    "Set work-in-progress limits for each team and stage. Prevent bottlenecks before they happen and ensure balanced workloads across the team.",
                  points: [
                    "Per-team card limits",
                    "Capacity alerts",
                    "Load balancing views",
                    "Bottleneck highlighting",
                  ],
                },
                {
                  title: "Collaborative Card Comments",
                  description:
                    "Every deal card becomes a collaboration hub. Team members can comment, tag colleagues, attach files, and track the full conversation history.",
                  points: [
                    "@mention teammates",
                    "Threaded discussions",
                    "File attachments",
                    "Activity timeline",
                  ],
                },
              ].map((concept, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-8 rounded-2xl bg-muted/50 border border-border"
                >
                  <h3 className="text-xl font-bold mb-4">{concept.title}</h3>
                  <p className="text-muted-foreground mb-6">{concept.description}</p>
                  <ul className="space-y-2">
                    {concept.points.map((point, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-teal-500" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Workflow Example Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Example Team{" "}
                <span className="bg-gradient-to-r from-teal-400 to-emerald-500 bg-clip-text text-transparent">
                  Workflow
                </span>
              </h2>
              <p className="text-lg text-muted-foreground">
                See how different teams collaborate through a shared Kanban workflow.
              </p>
            </motion.div>

            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-5 gap-4">
                {[
                  {
                    stage: "New Leads",
                    team: "Marketing",
                    color: "from-blue-500 to-cyan-500",
                  },
                  {
                    stage: "Qualifying",
                    team: "SDR",
                    color: "from-purple-500 to-pink-500",
                  },
                  {
                    stage: "Discovery",
                    team: "AE",
                    color: "from-teal-500 to-emerald-500",
                  },
                  {
                    stage: "Proposal",
                    team: "AE",
                    color: "from-teal-500 to-emerald-500",
                  },
                  {
                    stage: "Onboarding",
                    team: "CS",
                    color: "from-orange-500 to-yellow-500",
                  },
                ].map((stage, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative"
                  >
                    <div className={`h-2 rounded-full bg-gradient-to-r ${stage.color} mb-3`} />
                    <div className="p-4 rounded-xl bg-background border border-border">
                      <h4 className="font-semibold text-sm mb-1">{stage.stage}</h4>
                      <span className="text-xs text-muted-foreground">{stage.team} Team</span>
                    </div>
                    {index < 4 && (
                      <ArrowRight className="absolute top-1/2 -right-4 w-4 h-4 text-muted-foreground transform translate-y-2" />
                    )}
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mt-8 p-6 rounded-2xl bg-background border border-border"
              >
                <h4 className="font-semibold mb-3">Handoff Triggers:</h4>
                <div className="grid md:grid-cols-4 gap-4 text-sm">
                  <div className="p-3 rounded-lg bg-muted/50">
                    <span className="text-teal-500 font-medium">SDR to AE:</span>
                    <p className="text-muted-foreground mt-1">Lead qualified, meeting booked</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50">
                    <span className="text-teal-500 font-medium">AE to Manager:</span>
                    <p className="text-muted-foreground mt-1">Deal over $50K threshold</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50">
                    <span className="text-teal-500 font-medium">AE to CS:</span>
                    <p className="text-muted-foreground mt-1">Contract signed, payment received</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50">
                    <span className="text-teal-500 font-medium">CS to AE:</span>
                    <p className="text-muted-foreground mt-1">Expansion opportunity identified</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Related Resources Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Deep Dive Into{" "}
                <GradientText>Related Resources</GradientText>
              </h2>
              <p className="text-lg text-muted-foreground">
                Explore detailed guides on the individual topics that make up
                Kanban team workflows.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {linkedResources.map((resource, index) => (
                <Link key={index} href={resource.href}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="p-6 rounded-2xl bg-background border border-border hover:border-teal-500/50 transition-all hover:shadow-lg hover:shadow-teal-500/10 h-full"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
                        <resource.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <span className="text-xs text-teal-500 font-medium">
                          {resource.pillar}
                        </span>
                        <h3 className="font-semibold mb-2">{resource.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          {resource.description}
                        </p>
                        <span className="text-teal-500 text-sm flex items-center gap-1">
                          Read guide <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
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
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Build Your Team{" "}
                <span className="bg-gradient-to-r from-teal-400 to-emerald-500 bg-clip-text text-transparent">
                  Workflow
                </span>
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Create visual pipelines that your entire team can collaborate on.
                Start your free trial and build your Kanban workflow in minutes.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/handler/sign-up">
                  <GlowButton size="lg">
                    Start Free Trial
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </GlowButton>
                </Link>
              </div>
              <p className="mt-6 text-sm text-muted-foreground">
                14-day free trial. No credit card required. Cancel anytime.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Related Topics Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Explore{" "}
                <GradientText>Related Topics</GradientText>
              </h2>
              <p className="text-lg text-muted-foreground">
                Discover more crossover strategies that combine multiple disciplines
                for maximum impact.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {relatedTopics.map((topic, index) => (
                <Link key={index} href={topic.href}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="p-6 rounded-2xl bg-background border border-border hover:border-purple-500/50 transition-all hover:shadow-lg h-full"
                  >
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${topic.gradient} flex items-center justify-center mb-4`}>
                      <ArrowRight className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-semibold mb-2">{topic.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {topic.description}
                    </p>
                    <span className="text-purple-500 text-sm flex items-center gap-1">
                      Explore topic <ArrowRight className="w-3 h-3" />
                    </span>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <LandingFooter />
    </div>
  );
}
