"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ListTodo,
  Zap,
  Target,
  Clock,
  TrendingUp,
  Users,
  Bot,
  CheckCircle2,
  ArrowRight,
  Repeat,
  FileText,
  Database,
  Layers,
  Workflow,
  Sparkles,
} from "lucide-react";
import {
  LandingHeader,
  LandingFooter,
  GlowButton,
  GradientText,
  SectionHeading,
} from "@/components/landing";

export default function TaskAutomationPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <LandingHeader />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/3 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <ListTodo className="w-4 h-4 mr-2" />
              Sales Automation
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Sales Task Automation:{" "}
              <GradientText>The Complete Guide</GradientText>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Sales representatives spend only 36% of their time actually selling.
              Learn how task automation eliminates administrative burden and lets
              your team focus on what they do best: closing deals and building relationships.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/handler/sign-up">
                <GlowButton size="lg">
                  Automate Your Sales Tasks
                  <ArrowRight className="w-5 h-5 ml-2" />
                </GlowButton>
              </Link>
              <Link
                href="/resources/sales-automation/follow-up-automation"
                className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
              >
                Explore follow-up automation
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="The Reality"
            title="Where Does Your Sales Team's Time Really Go?"
            titleGradient="Time"
            description="Understanding the administrative burden that keeps your team from selling."
          />

          <div className="mt-16 grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold mb-4">
                The Hidden Cost of Manual Tasks
              </h3>
              <p className="text-muted-foreground mb-6">
                Research from Salesforce reveals a startling truth: the average sales
                representative spends less than 40% of their workday on actual selling
                activities. The rest disappears into data entry, administrative tasks,
                meeting scheduling, internal communications, and other non-revenue
                generating activities.
              </p>
              <p className="text-muted-foreground mb-6">
                Consider the cumulative impact: if your team of 10 salespeople each
                wastes just 2 hours daily on automatable tasks, that&apos;s 100 hours of
                lost selling time per week. At an average deal size of $5,000 and a
                close rate of 20%, those lost hours could represent over $100,000 in
                missed revenue every month.
              </p>
              <p className="text-muted-foreground">
                Task automation isn&apos;t just about convenience; it&apos;s about reclaiming
                your team&apos;s most valuable resource: their time. Every minute saved
                on administrative work is a minute that can be invested in prospect
                conversations, relationship building, and revenue generation.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4"
            >
              {[
                { activity: "Data Entry & CRM Updates", percentage: 17, color: "bg-red-500" },
                { activity: "Prospecting & Research", percentage: 21, color: "bg-orange-500" },
                { activity: "Administrative Tasks", percentage: 14, color: "bg-yellow-500" },
                { activity: "Internal Meetings", percentage: 12, color: "bg-blue-500" },
                { activity: "Active Selling", percentage: 36, color: "bg-green-500" },
              ].map((item, index) => (
                <div key={index} className="p-4 rounded-xl bg-background border border-border">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">{item.activity}</span>
                    <span className="text-muted-foreground">{item.percentage}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full ${item.color} rounded-full transition-all duration-1000`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Types of Tasks to Automate Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="What to Automate"
            title="Sales Tasks Perfect for Automation"
            titleGradient="Automation"
            description="Identify and eliminate the repetitive tasks that drain your team's productivity."
          />

          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Database,
                title: "Data Entry & CRM Updates",
                description:
                  "Automatically capture and sync lead data, update deal stages, log activities, and maintain accurate records without manual input. LeadFlow's smart capture technology eliminates the tedium of data entry while ensuring your CRM stays current and accurate.",
                examples: [
                  "Auto-populate lead records from forms",
                  "Sync email conversations to CRM",
                  "Update deal stages on triggers",
                  "Log meeting notes automatically",
                ],
              },
              {
                icon: Repeat,
                title: "Repetitive Outreach",
                description:
                  "Schedule and send routine communications including initial outreach, follow-ups, meeting confirmations, and check-ins. Create templates once and let automation handle the rest, ensuring consistent messaging across your entire team.",
                examples: [
                  "Initial prospect outreach",
                  "Meeting confirmation emails",
                  "Post-demo follow-ups",
                  "Contract reminders",
                ],
              },
              {
                icon: FileText,
                title: "Document Generation",
                description:
                  "Automatically generate proposals, quotes, contracts, and other sales documents using lead and deal data. No more copying information between systems or creating documents from scratch for every opportunity.",
                examples: [
                  "Quote generation",
                  "Proposal creation",
                  "Contract preparation",
                  "NDA generation",
                ],
              },
              {
                icon: Layers,
                title: "Lead Routing & Assignment",
                description:
                  "Automatically route incoming leads to the right sales representative based on territory, industry, deal size, or other criteria. Ensure instant response times and eliminate the bottleneck of manual lead distribution.",
                examples: [
                  "Territory-based routing",
                  "Round-robin distribution",
                  "Skill-based assignment",
                  "Priority lead escalation",
                ],
              },
              {
                icon: Bot,
                title: "Task Creation & Reminders",
                description:
                  "Automatically create tasks and reminders based on pipeline activity. Never forget to follow up on a proposal, check in after a demo, or schedule the next step in a deal. LeadFlow keeps your team on track without manual task creation.",
                examples: [
                  "Post-meeting task creation",
                  "Contract expiry reminders",
                  "Deal stage-based tasks",
                  "Activity gap alerts",
                ],
              },
              {
                icon: Workflow,
                title: "Pipeline Management",
                description:
                  "Automate pipeline hygiene activities including stale deal alerts, stage validation, forecast updates, and deal health scoring. Keep your pipeline clean and accurate without constant manual oversight.",
                examples: [
                  "Stale deal notifications",
                  "Missing field alerts",
                  "Automatic stage progression",
                  "Deal health scoring",
                ],
              },
            ].map((task, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-8 rounded-2xl bg-muted/50 border border-border hover:border-purple-500/50 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center mb-6">
                  <task.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{task.title}</h3>
                <p className="text-muted-foreground mb-6">{task.description}</p>
                <ul className="space-y-2">
                  {task.examples.map((example, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      {example}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Implementation Guide Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Implementation"
            title="How to Implement Sales Task Automation"
            titleGradient="Implement"
            description="A step-by-step guide to automating your sales operations successfully."
          />

          <div className="mt-16 space-y-8">
            {[
              {
                number: "01",
                title: "Audit Your Current Processes",
                content:
                  "Begin by documenting every task your sales team performs in a typical week. Have each team member track their activities for 5-7 days, noting time spent on each task. Identify patterns in repetitive work, bottlenecks in your process, and tasks that consistently fall through the cracks. This audit reveals exactly where automation will have the highest impact and provides a baseline for measuring improvement.",
              },
              {
                number: "02",
                title: "Prioritize by Impact and Complexity",
                content:
                  "Not all automations are created equal. Score each potential automation on two dimensions: impact (time savings multiplied by frequency) and complexity (effort required to implement). Start with high-impact, low-complexity automations to build momentum and demonstrate value quickly. Save complex integrations and customizations for later phases when you've established automation success.",
              },
              {
                number: "03",
                title: "Design Your Automation Workflows",
                content:
                  "Before building anything, map out each automation workflow in detail. Define the trigger (what starts the automation), the conditions (when it should or shouldn't run), and the actions (what happens). Consider edge cases and exceptions. LeadFlow's visual workflow builder makes this process intuitive, but clear thinking upfront prevents problems later.",
              },
              {
                number: "04",
                title: "Build, Test, and Iterate",
                content:
                  "Start with a pilot group of power users who understand both the sales process and the goals of automation. Build your first automations, test them thoroughly with real scenarios, and gather feedback. Expect to make adjustments based on real-world usage. This iterative approach ensures your automations actually serve your team's needs rather than creating new problems.",
              },
              {
                number: "05",
                title: "Roll Out and Monitor",
                content:
                  "Once automations are proven, expand them to the full team. Provide training and documentation, set expectations, and establish channels for feedback. Monitor automation performance continuously, tracking metrics like time saved, task completion rates, and team satisfaction. Use these insights to optimize existing automations and identify opportunities for new ones.",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex gap-6 p-6 rounded-2xl bg-background border border-border"
              >
                <div className="text-4xl font-bold text-cyan-500/30">
                  {step.number}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground">{step.content}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="LeadFlow Features"
            title="Task Automation Tools in LeadFlow"
            titleGradient="LeadFlow"
            description="Powerful features designed to eliminate manual work and supercharge your sales productivity."
          />

          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Sparkles,
                title: "Visual Workflow Builder",
                description:
                  "Create sophisticated automation workflows with our drag-and-drop builder. No coding required.",
              },
              {
                icon: Zap,
                title: "100+ Trigger Types",
                description:
                  "Start automations from virtually any event: form submissions, email opens, deal changes, and more.",
              },
              {
                icon: Target,
                title: "Conditional Logic",
                description:
                  "Build smart workflows with if/then logic, branching paths, and dynamic conditions.",
              },
              {
                icon: Clock,
                title: "Time-Based Automation",
                description:
                  "Schedule tasks, send delayed messages, and trigger actions based on time elapsed.",
              },
              {
                icon: Users,
                title: "Team Assignment Rules",
                description:
                  "Automatically assign tasks, leads, and deals based on custom routing logic.",
              },
              {
                icon: TrendingUp,
                title: "Automation Analytics",
                description:
                  "Track the performance and impact of every automation with detailed reporting.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-muted/50 border border-border hover:border-purple-500/50 transition-colors"
              >
                <feature.icon className="w-10 h-10 text-purple-500 mb-4" />
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <SectionHeading
              badge="Results"
              title="The ROI of Sales Task Automation"
              titleGradient="ROI"
              description="Real numbers that demonstrate the value of automation investment."
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6"
            >
              {[
                { value: "2.5hrs", label: "Saved per rep daily" },
                { value: "27%", label: "Increase in deals closed" },
                { value: "40%", label: "Faster response times" },
                { value: "3x", label: "ROI in 6 months" },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="p-6 rounded-2xl bg-background border border-border text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold text-purple-500 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </motion.div>
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
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Give Your Team{" "}
              <GradientText>More Time to Sell</GradientText>
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Stop losing hours to manual tasks. Start your free trial and see how
              much time your team can reclaim with LeadFlow&apos;s powerful task automation.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/handler/sign-up">
                <GlowButton size="lg">
                  Start Automating Today
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

      {/* Related Resources */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Related Resources"
            title="More Sales Automation Resources"
            titleGradient="Resources"
            description="Continue exploring automation strategies to maximize your sales efficiency."
          />

          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Email Sequences",
                description: "Build automated email campaigns that convert leads",
                href: "/resources/sales-automation/email-sequences",
              },
              {
                title: "Follow-Up Automation",
                description: "Never let a lead slip through the cracks again",
                href: "/resources/sales-automation/follow-up-automation",
              },
              {
                title: "Appointment Scheduling",
                description: "Automate meeting booking and calendar management",
                href: "/resources/sales-automation/appointment-scheduling",
              },
              {
                title: "Smart Notifications",
                description: "Get alerted to important lead activities instantly",
                href: "/resources/sales-automation/smart-notifications",
              },
            ].map((resource, index) => (
              <Link key={index} href={resource.href}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 rounded-2xl bg-background border border-border hover:border-purple-500/50 transition-all hover:shadow-lg hover:shadow-purple-500/10 h-full"
                >
                  <h3 className="font-semibold mb-2">{resource.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {resource.description}
                  </p>
                  <span className="text-purple-500 text-sm flex items-center gap-1">
                    Learn more <ArrowRight className="w-3 h-3" />
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
