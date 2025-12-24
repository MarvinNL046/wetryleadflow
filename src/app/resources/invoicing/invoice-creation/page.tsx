"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Receipt,
  ArrowRight,
  CheckCircle2,
  Mail,
  Download,
  Clock,
  DollarSign,
  FileText,
} from "lucide-react";
import {
  LandingHeader,
  LandingFooter,
  GlowButton,
  GradientText,
  SectionHeading,
} from "@/components/landing";

export default function InvoiceCreationPage() {
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
              <Receipt className="w-4 h-4 mr-2" />
              Invoicing & Billing
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              <GradientText>Professional Invoice Creation</GradientText> Made Simple
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Create and send professional invoices in minutes. Automate your billing process,
              track payments, and get paid faster with LeadFlow's invoicing module.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/handler/sign-up">
                <GlowButton size="lg">
                  Start Invoicing Free
                  <ArrowRight className="w-5 h-5 ml-2" />
                </GlowButton>
              </Link>
              <Link
                href="/resources/invoicing/recurring-invoices"
                className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
              >
                Learn about recurring invoices
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Invoice Features"
            title="Everything You Need for Professional Billing"
            titleGradient="Professional Billing"
            description="LeadFlow provides comprehensive invoicing tools to streamline your billing workflow."
          />

          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: FileText,
                title: "Custom Templates",
                description: "Branded invoice templates with your logo, colors, and company details.",
              },
              {
                icon: DollarSign,
                title: "Automatic Calculations",
                description: "Line items with quantities, discounts, and tax calculations done automatically.",
              },
              {
                icon: Mail,
                title: "Email Delivery",
                description: "Send invoices directly via email with PDF attachments from LeadFlow.",
              },
              {
                icon: Download,
                title: "PDF Export",
                description: "Generate professional PDF invoices for printing or manual sending.",
              },
              {
                icon: Clock,
                title: "Payment Tracking",
                description: "Track payment status and send automatic reminders for overdue invoices.",
              },
              {
                icon: Receipt,
                title: "Auto-Numbering",
                description: "Automatic invoice numbering with customizable prefixes and formats.",
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
            title="Invoice Tips for Faster Payments"
            titleGradient="Faster Payments"
            description="Follow these strategies to get paid on time, every time."
          />

          <div className="mt-16 max-w-3xl mx-auto space-y-6">
            {[
              "Send invoices immediately after delivering products or services",
              "Include clear payment terms and due dates on every invoice",
              "Provide multiple payment options to make it easy for clients",
              "Use automatic payment reminders for overdue invoices",
              "Include a detailed breakdown of services to avoid disputes",
              "Add your bank details prominently on the invoice",
              "Follow up personally on invoices overdue by more than 14 days",
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
              Ready to <GradientText>Streamline Your Invoicing</GradientText>?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Start creating professional invoices today and get paid faster with LeadFlow.
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
