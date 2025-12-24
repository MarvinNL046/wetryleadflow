"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  LandingHeader,
  LandingFooter,
  GlowButton,
} from "@/components/landing";
import {
  ArrowRight,
  Database,
  RefreshCw,
  Sparkles,
  Upload,
  FolderSync,
  CheckCircle2,
  AlertTriangle,
  Target,
} from "lucide-react";

export default function CrmDataMigrationClient() {
  const relatedContent = [
    {
      title: "CRM Migration Guide",
      description: "Step-by-step process for migrating from your old CRM without losing data or momentum.",
      href: "/resources/crm-best-practices/crm-migration",
      icon: RefreshCw,
      pillar: "CRM Best Practices",
    },
    {
      title: "Data Hygiene",
      description: "Clean and maintain your contact data to ensure accuracy and improve deliverability.",
      href: "/resources/crm-best-practices/data-hygiene",
      icon: Sparkles,
      pillar: "CRM Best Practices",
    },
    {
      title: "Import & Export",
      description: "Master data import and export workflows to move contacts seamlessly between systems.",
      href: "/resources/contact-management/import-export",
      icon: Upload,
      pillar: "Contact Management",
    },
    {
      title: "Contact Organization",
      description: "Structure your contact database for easy access, segmentation, and reporting.",
      href: "/resources/contact-management/contact-organization",
      icon: FolderSync,
      pillar: "Contact Management",
    },
  ];

  const relatedTopics = [
    { title: "Team Performance Tracking", href: "/resources/topics/team-performance-tracking" },
    { title: "Pipeline Bottleneck Analysis", href: "/resources/topics/pipeline-bottleneck-analysis" },
    { title: "Facebook Lead Automation", href: "/resources/topics/facebook-lead-automation" },
  ];

  return (
    <>
      <LandingHeader />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-900/20 via-background to-background" />
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-green-500/30 rounded-full blur-[128px] animate-pulse" />
            <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-emerald-500/20 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: "1s" }} />
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto text-center"
            >
              <span className="inline-flex items-center px-3 py-1 mb-6 text-sm font-medium rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                <Database className="w-4 h-4 mr-2" />
                CRM Best Practices + Contact Management
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
                CRM <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">Data Migration</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Combine CRM migration expertise with contact management best practices to move your data safely, maintain hygiene, and hit the ground running with your new system.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Overview Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto"
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">
                  Migrate Without <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">Missing a Beat</span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  CRM migrations fail when data gets lost or corrupted. A strategic approach ensures your team can keep selling throughout the transition.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { icon: CheckCircle2, title: "Zero Data Loss", description: "Comprehensive mapping and validation ensures every contact, deal, and note makes the journey." },
                  { icon: Sparkles, title: "Clean Start", description: "Use migration as an opportunity to clean duplicates, fix formatting, and improve data quality." },
                  { icon: AlertTriangle, title: "Risk Mitigation", description: "Staged migration with rollback options keeps your sales team productive during transition." },
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="p-6 rounded-xl bg-card border border-border"
                  >
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center mb-4">
                      <item.icon className="w-6 h-6 text-green-500" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Related Content Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="max-w-5xl mx-auto"
            >
              <div className="text-center mb-12">
                <span className="inline-flex items-center px-3 py-1 mb-4 text-sm font-medium rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                  <Target className="w-4 h-4 mr-2" />
                  Deep Dive Resources
                </span>
                <h2 className="text-3xl font-bold mb-4">
                  Explore <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">Related Content</span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Master CRM migration and data management with these comprehensive guides.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {relatedContent.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link href={item.href} className="block group">
                      <div className="p-6 rounded-xl bg-card border border-border hover:border-green-500/50 transition-all duration-300 h-full">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center flex-shrink-0 group-hover:from-green-500/30 group-hover:to-emerald-500/30 transition-colors">
                            <item.icon className="w-6 h-6 text-green-500" />
                          </div>
                          <div className="flex-1">
                            <span className="text-xs text-green-400 mb-1 block">{item.pillar}</span>
                            <h3 className="text-lg font-semibold mb-2 group-hover:text-green-400 transition-colors">
                              {item.title}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                            <span className="inline-flex items-center text-sm text-green-400 group-hover:text-green-300">
                              Read more
                              <ArrowRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Related Topics Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h3 className="text-xl font-semibold mb-6">Related Topics</h3>
              <div className="flex flex-wrap justify-center gap-3">
                {relatedTopics.map((topic) => (
                  <Link
                    key={topic.href}
                    href={topic.href}
                    className="px-4 py-2 rounded-full bg-card border border-border hover:border-green-500/50 text-sm text-muted-foreground hover:text-green-400 transition-all"
                  >
                    {topic.title}
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready for a <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">Seamless Migration</span>?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                LeadFlow makes CRM migration simple with powerful import tools, automatic deduplication, and a dedicated migration support team. Start your free trial today.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/handler/sign-up">
                  <GlowButton size="lg" className="group">
                    Start Free Trial
                    <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </GlowButton>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <LandingFooter />
    </>
  );
}
