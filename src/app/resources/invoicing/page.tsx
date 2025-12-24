"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  LandingHeader,
  LandingFooter,
  GlowButton,
  GradientText,
} from "@/components/landing";
import { Receipt, ArrowRight, FileText, CreditCard, RefreshCw, Calculator, Percent } from "lucide-react";

const subpillars = [
  {
    title: "Quotation Management",
    description: "Create professional quotations that convert. Learn how to structure proposals, set pricing, and track acceptance rates.",
    href: "/resources/invoicing/quotation-management",
    icon: FileText,
  },
  {
    title: "Invoice Creation",
    description: "Master the art of professional invoicing. Set up your invoice templates, automate numbering, and streamline your billing process.",
    href: "/resources/invoicing/invoice-creation",
    icon: Receipt,
  },
  {
    title: "Credit Notes",
    description: "Handle refunds and corrections professionally. Learn when and how to issue credit notes while maintaining accurate financial records.",
    href: "/resources/invoicing/credit-notes",
    icon: CreditCard,
  },
  {
    title: "Recurring Invoices",
    description: "Automate your recurring billing for subscription services. Set up automatic invoice generation and payment reminders.",
    href: "/resources/invoicing/recurring-invoices",
    icon: RefreshCw,
  },
  {
    title: "Tax & VAT Setup",
    description: "Configure your tax rates correctly. Understand VAT handling, tax exemptions, and how to set up multi-rate taxation.",
    href: "/resources/invoicing/tax-vat-setup",
    icon: Percent,
  },
];

export default function InvoicingPillarPage() {
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
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-900/20 via-background to-background" />
              <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-green-500/20 rounded-full blur-[128px] animate-pulse" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center max-w-4xl mx-auto"
              >
                <div className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                  <Receipt className="w-4 h-4 mr-2" />
                  Invoicing & Billing Hub
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
                  Master <GradientText animated>Invoicing & Billing</GradientText>
                </h1>

                <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                  Streamline your billing workflow with professional quotations, invoices, and automated recurring billing.
                  Get paid faster while maintaining perfect financial records.
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
                      className="group block h-full p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-green-500/50 hover:bg-green-500/5 transition-all duration-300"
                    >
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-xl bg-gradient-to-br from-green-500 to-teal-500">
                          <item.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h2 className="text-xl font-bold mb-2 group-hover:text-green-400 transition-colors">
                            {item.title}
                          </h2>
                          <p className="text-muted-foreground text-sm mb-4">
                            {item.description}
                          </p>
                          <span className="inline-flex items-center text-sm font-medium text-green-400 group-hover:text-green-300">
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
                  <Link href="/resources/contact-management" className="px-4 py-2 rounded-full bg-pink-500/10 text-pink-400 hover:bg-pink-500/20 transition-colors text-sm">
                    Contact Management
                  </Link>
                  <Link href="/resources/sales-analytics" className="px-4 py-2 rounded-full bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 transition-colors text-sm">
                    Sales Analytics
                  </Link>
                  <Link href="/resources/pipeline-management" className="px-4 py-2 rounded-full bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 transition-colors text-sm">
                    Pipeline Management
                  </Link>
                  <Link href="/resources/crm-best-practices" className="px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors text-sm">
                    CRM Best Practices
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
                    Start Invoicing Free
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
