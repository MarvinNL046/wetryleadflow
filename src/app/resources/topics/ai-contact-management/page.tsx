"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  LandingHeader,
  LandingFooter,
  GlowButton,
  GradientText,
} from "@/components/landing";
import {
  ArrowRight,
  Brain,
  Route,
  BarChart3,
  Users,
  Activity,
  CheckCircle,
  Sparkles,
  Zap,
  Target,
} from "lucide-react";

export default function AiContactManagementPage() {
  const linkedResources = [
    {
      title: "Smart Lead Routing",
      description:
        "Use AI to instantly match incoming leads with the best sales rep based on skills, availability, and past performance.",
      href: "/resources/ai-automation/smart-lead-routing",
      pillar: "AI & Automation",
      icon: Route,
    },
    {
      title: "Predictive Analytics",
      description:
        "Leverage machine learning to forecast revenue, identify at-risk deals, and optimize your sales strategy.",
      href: "/resources/ai-automation/predictive-analytics",
      pillar: "AI & Automation",
      icon: BarChart3,
    },
    {
      title: "Lead Segmentation",
      description:
        "Organize contacts into meaningful segments for targeted outreach and personalized communication.",
      href: "/resources/contact-management/lead-segmentation",
      pillar: "Contact Management",
      icon: Users,
    },
    {
      title: "Activity Tracking",
      description:
        "Maintain complete visibility into every interaction with your contacts across all touchpoints.",
      href: "/resources/contact-management/activity-tracking",
      pillar: "Contact Management",
      icon: Activity,
    },
  ];

  const relatedTopics = [
    {
      title: "CRM Customization Guide",
      href: "/resources/topics/crm-customization-guide",
    },
    {
      title: "Multi-Channel Lead Capture",
      href: "/resources/topics/multi-channel-lead-capture",
    },
    {
      title: "Automated Revenue Tracking",
      href: "/resources/topics/automated-revenue-tracking",
    },
  ];

  return (
    <>
      <head>
        <meta name="robots" content="noindex, follow" />
      </head>
      <div className="min-h-screen bg-background text-foreground">
        <LandingHeader />

        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-violet-500/10" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl" />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <span className="inline-flex items-center px-3 py-1 mb-6 text-sm font-medium rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                <Brain className="w-4 h-4 mr-2" />
                Topic Hub
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                <GradientText>AI-Powered</GradientText> Contact Management
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Transform how you manage contacts with artificial intelligence.
                Combine smart lead routing, predictive analytics, intelligent
                segmentation, and comprehensive activity tracking for maximum
                sales effectiveness.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/handler/sign-up">
                  <GlowButton size="lg">
                    Experience AI-Powered CRM
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </GlowButton>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Overview Section */}
        <section className="py-20 border-t border-border/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto"
            >
              <div className="text-center mb-12">
                <span className="inline-flex items-center px-3 py-1 mb-4 text-sm font-medium rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  Overview
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  The Future of Contact Management is Intelligent
                </h2>
              </div>

              <div className="prose prose-invert max-w-none">
                <p className="text-lg text-muted-foreground mb-6">
                  Traditional contact management treats every lead the same. You
                  manually sort, segment, and route contacts based on basic
                  criteria, missing opportunities hidden in the data. AI changes
                  everything by bringing intelligence to every aspect of how you
                  manage relationships.
                </p>
                <p className="text-lg text-muted-foreground mb-6">
                  When AI handles lead routing, the right rep gets the right lead
                  within seconds. When machine learning powers your analytics, you
                  can predict which deals will close and which need attention.
                  When intelligent segmentation organizes your contacts, every
                  message reaches the right audience.
                </p>
                <p className="text-lg text-muted-foreground">
                  This hub connects resources from AI automation and contact
                  management to show you how these technologies work together,
                  creating a system that continuously optimizes itself for better
                  results.
                </p>
              </div>

              <div className="mt-12 grid sm:grid-cols-3 gap-6">
                {[
                  {
                    stat: "85%",
                    label: "Faster lead response time",
                    color: "from-purple-500/10 to-violet-500/10",
                  },
                  {
                    stat: "32%",
                    label: "Higher conversion rates",
                    color: "from-violet-500/10 to-purple-500/10",
                  },
                  {
                    stat: "4.2x",
                    label: "Better lead coverage",
                    color: "from-purple-500/10 to-pink-500/10",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`text-center p-6 bg-gradient-to-br ${item.color} rounded-xl border border-border`}
                  >
                    <div className="text-3xl font-bold text-purple-400 mb-2">
                      {item.stat}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {item.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Linked Resources Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="inline-flex items-center px-3 py-1 mb-4 text-sm font-medium rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                Deep Dive Resources
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Explore Related Guides
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Master AI-powered contact management with these comprehensive
                guides covering automation and organization strategies.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {linkedResources.map((resource, index) => (
                <motion.div
                  key={resource.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link
                    href={resource.href}
                    className="block h-full p-6 bg-background/50 backdrop-blur-sm border border-border rounded-2xl hover:border-purple-500/50 transition-all hover:shadow-lg hover:shadow-purple-500/10"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-violet-500 flex items-center justify-center flex-shrink-0">
                        <resource.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <span className="text-xs font-medium text-purple-400 mb-1 block">
                          {resource.pillar}
                        </span>
                        <h3 className="text-xl font-semibold mb-2">
                          {resource.title}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-4">
                          {resource.description}
                        </p>
                        <span className="text-purple-400 text-sm font-medium inline-flex items-center">
                          Read guide <ArrowRight className="ml-1 w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How AI Transforms Contact Management */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="inline-flex items-center px-3 py-1 mb-4 text-sm font-medium rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                AI Capabilities
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                How AI Transforms Contact Management
              </h2>
            </div>

            <div className="max-w-4xl mx-auto space-y-6">
              {[
                {
                  title: "Intelligent Lead Routing",
                  content:
                    "AI analyzes lead characteristics, rep expertise, workload, and historical success to instantly route each lead to the person most likely to convert them. No more manual assignment or round-robin guessing.",
                },
                {
                  title: "Predictive Lead Scoring",
                  content:
                    "Machine learning models evaluate dozens of signals to predict which leads are most likely to convert. Your team focuses energy on the opportunities with the highest probability of success.",
                },
                {
                  title: "Dynamic Segmentation",
                  content:
                    "AI continuously analyzes contact behavior and attributes to automatically update segments. Your marketing and sales efforts always target the right people with the right messages.",
                },
                {
                  title: "Automated Activity Insights",
                  content:
                    "AI surfaces patterns in activity data that humans would miss. Know which touchpoints drive conversions, when contacts are most responsive, and where opportunities are at risk.",
                },
              ].map((capability, index) => (
                <motion.div
                  key={capability.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex gap-4 p-6 bg-background border border-border rounded-xl"
                >
                  <div className="flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-purple-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      {capability.title}
                    </h3>
                    <p className="text-muted-foreground">{capability.content}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* The Integration Advantage */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="inline-flex items-center px-3 py-1 mb-4 text-sm font-medium rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                <Zap className="w-4 h-4 mr-2" />
                LeadFlow Advantage
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                AI and Contact Management United
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                LeadFlow integrates AI capabilities directly into contact
                management workflows.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                {
                  icon: Target,
                  title: "One Unified System",
                  description:
                    "AI features work seamlessly with contact records, eliminating the need for separate tools or manual data transfers.",
                },
                {
                  icon: Brain,
                  title: "Continuous Learning",
                  description:
                    "The AI improves over time by learning from your team's successes, becoming more accurate with every interaction.",
                },
                {
                  icon: Activity,
                  title: "Real-Time Intelligence",
                  description:
                    "Get instant insights and recommendations as contacts engage, enabling proactive rather than reactive sales.",
                },
              ].map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center p-6 bg-background border border-border rounded-xl"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-violet-500/20 flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-6 h-6 text-purple-400" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Related Topics */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="inline-flex items-center px-3 py-1 mb-4 text-sm font-medium rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                Explore More
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Related Topics
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Continue learning with these related topic hubs.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
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
                    className="block p-4 bg-background border border-border rounded-xl hover:border-purple-500/50 transition-colors text-center"
                  >
                    <span className="text-foreground font-medium hover:text-purple-400 transition-colors">
                      {topic.title}
                    </span>
                    <ArrowRight className="w-4 h-4 text-muted-foreground mt-2 mx-auto" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-violet-500/20 border border-purple-500/30 mb-6">
                <Sparkles className="w-8 h-8 text-purple-400" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready for <GradientText>Intelligent</GradientText> Contact
                Management?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                LeadFlow brings the power of AI to every aspect of how you manage
                contacts. Stop guessing and start knowing with intelligent
                automation that learns and improves continuously.
              </p>
              <Link href="/handler/sign-up">
                <GlowButton size="lg">
                  Start Your Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </GlowButton>
              </Link>
            </motion.div>
          </div>
        </section>

        <LandingFooter />
      </div>
    </>
  );
}
