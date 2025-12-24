"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  LandingHeader,
  LandingFooter,
  GlowButton,
  GradientText,
} from "@/components/landing";
import { Users, ArrowRight, FolderKanban, Tags, Activity, FileUp, BookOpen } from "lucide-react";

const subpillars = [
  {
    title: "Contact Organization",
    description: "Master the art of organizing your contacts for maximum efficiency. Learn systems and strategies to keep your contact database clean and accessible.",
    href: "/resources/contact-management/contact-organization",
    icon: FolderKanban,
  },
  {
    title: "Lead Segmentation",
    description: "Segment your leads effectively for targeted outreach. Discover powerful segmentation strategies that drive higher conversion rates.",
    href: "/resources/contact-management/lead-segmentation",
    icon: Tags,
  },
  {
    title: "Activity Tracking",
    description: "Track every interaction with your contacts. Learn how activity tracking improves follow-up timing and customer relationships.",
    href: "/resources/contact-management/activity-tracking",
    icon: Activity,
  },
  {
    title: "Import & Export",
    description: "Seamlessly move your data in and out of your CRM. Best practices for data migration, CSV imports, and maintaining data integrity.",
    href: "/resources/contact-management/import-export",
    icon: FileUp,
  },
  {
    title: "Notes & History",
    description: "Capture and leverage contact history for better relationships. Build comprehensive profiles that help your team close more deals.",
    href: "/resources/contact-management/notes-history",
    icon: BookOpen,
  },
];

export default function ContactManagementPillarPage() {
  return (
    <>
      {/* noindex, follow for SEO */}
      <meta name="robots" content="noindex, follow" />

      <div className="min-h-screen bg-background">
        <LandingHeader />

        <main>
          {/* Hero Section */}
          <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden pt-20">
            <div className="absolute inset-0 -z-10">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-pink-900/20 via-background to-background" />
              <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-pink-500/20 rounded-full blur-[128px] animate-pulse" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center max-w-4xl mx-auto"
              >
                <div className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium rounded-full bg-pink-500/10 text-pink-400 border border-pink-500/20">
                  <Users className="w-4 h-4 mr-2" />
                  Contact Management Hub
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
                  Master <GradientText animated>Contact Management</GradientText>
                </h1>

                <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                  Everything you need to organize, track, and leverage your contacts for stronger relationships and more closed deals.
                  Explore our comprehensive guides below.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Subpillar Links */}
          <section className="py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {subpillars.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className="group block h-full p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-pink-500/50 hover:bg-pink-500/5 transition-all duration-300"
                    >
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500">
                          <item.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h2 className="text-xl font-bold mb-2 group-hover:text-pink-400 transition-colors">
                            {item.title}
                          </h2>
                          <p className="text-muted-foreground text-sm mb-4">
                            {item.description}
                          </p>
                          <span className="inline-flex items-center text-sm font-medium text-pink-400 group-hover:text-pink-300">
                            Read Guide
                            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Internal Links to Other Pillars */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-16 p-8 rounded-2xl border border-border/50 bg-card/30"
              >
                <h3 className="text-lg font-semibold mb-4">Related Topics</h3>
                <div className="flex flex-wrap gap-3">
                  <Link href="/resources/lead-generation" className="px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors text-sm">
                    Lead Generation
                  </Link>
                  <Link href="/resources/crm-best-practices" className="px-4 py-2 rounded-full bg-teal-500/10 text-teal-400 hover:bg-teal-500/20 transition-colors text-sm">
                    CRM Best Practices
                  </Link>
                  <Link href="/resources/team-collaboration" className="px-4 py-2 rounded-full bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 transition-colors text-sm">
                    Team Collaboration
                  </Link>
                  <Link href="/resources/sales-analytics" className="px-4 py-2 rounded-full bg-orange-500/10 text-orange-400 hover:bg-orange-500/20 transition-colors text-sm">
                    Sales Analytics
                  </Link>
                </div>
              </motion.div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-12 text-center"
              >
                <Link href="/handler/sign-up">
                  <GlowButton size="lg" className="group">
                    Start Managing Contacts Free
                    <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </GlowButton>
                </Link>
              </motion.div>
            </div>
          </section>
        </main>

        <LandingFooter />
      </div>
    </>
  );
}
