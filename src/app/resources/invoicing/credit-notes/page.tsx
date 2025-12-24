"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  CreditCard,
  ArrowRight,
  CheckCircle2,
  FileText,
  RotateCcw,
  Shield,
  Calculator,
  AlertCircle,
} from "lucide-react";
import {
  LandingHeader,
  LandingFooter,
  GlowButton,
  GradientText,
  SectionHeading,
} from "@/components/landing";

export default function CreditNotesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <LandingHeader />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
              <CreditCard className="w-4 h-4 mr-2" />
              Invoicing & Billing
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              <GradientText>Credit Notes</GradientText> for Professional Refunds
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Handle refunds and corrections professionally. Learn when and how to issue credit notes
              while maintaining accurate financial records with LeadFlow.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/handler/sign-up">
                <GlowButton size="lg">
                  Start Using Credit Notes
                  <ArrowRight className="w-5 h-5 ml-2" />
                </GlowButton>
              </Link>
              <Link
                href="/resources/invoicing/invoice-creation"
                className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
              >
                Learn about invoicing
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What Are Credit Notes Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Understanding Credit Notes"
            title="What Are Credit Notes and When to Use Them"
            titleGradient="Credit Notes"
            description="Credit notes are official documents that reduce the amount owed by a customer."
          />

          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: RotateCcw,
                title: "Product Returns",
                description: "Issue credit notes when customers return products or cancel services.",
              },
              {
                icon: AlertCircle,
                title: "Invoice Corrections",
                description: "Correct billing errors without deleting original invoices for audit trails.",
              },
              {
                icon: Calculator,
                title: "Partial Refunds",
                description: "Handle partial refunds or adjustments with precise amount tracking.",
              },
              {
                icon: Shield,
                title: "Legal Compliance",
                description: "Maintain proper documentation for tax authorities and audits.",
              },
              {
                icon: FileText,
                title: "Linked to Invoice",
                description: "Credit notes automatically link to original invoices for clear records.",
              },
              {
                icon: CreditCard,
                title: "Refund Tracking",
                description: "Track the status of credit notes from issued to refunded.",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm"
              >
                <div className="p-3 rounded-xl bg-gradient-to-br from-green-500 to-teal-500 w-fit mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Practices Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Best Practices"
            title="Credit Note Guidelines for Proper Accounting"
            titleGradient="Proper Accounting"
            description="Follow these guidelines to maintain accurate and compliant financial records."
          />

          <div className="mt-16 max-w-3xl mx-auto space-y-6">
            {[
              "Always reference the original invoice number on the credit note",
              "Include a clear reason for the credit note issuance",
              "Match the VAT/tax rates with the original invoice",
              "Keep credit note amounts equal to or less than the original invoice",
              "Process refunds promptly after issuing credit notes",
              "Store credit notes with related invoices for easy reference",
              "Use sequential credit note numbers for audit compliance",
            ].map((tip, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start gap-4 p-4 rounded-xl bg-card/50"
              >
                <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                <p className="text-lg">{tip}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-500/10 via-teal-500/10 to-cyan-500/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Handle Refunds <GradientText>Professionally</GradientText>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Start using credit notes today and maintain perfect financial records with LeadFlow.
            </p>
            <Link href="/handler/sign-up">
              <GlowButton size="lg">
                Get Started Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </GlowButton>
            </Link>
          </motion.div>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
}
