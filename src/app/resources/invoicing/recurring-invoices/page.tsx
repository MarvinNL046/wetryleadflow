"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  RefreshCw,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Zap,
  Clock,
  DollarSign,
  Settings,
} from "lucide-react";
import {
  LandingHeader,
  LandingFooter,
  GlowButton,
  GradientText,
  SectionHeading,
} from "@/components/landing";

export default function RecurringInvoicesPage() {
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
              <RefreshCw className="w-4 h-4 mr-2" />
              Invoicing & Billing
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              <GradientText>Recurring Invoices</GradientText> on Autopilot
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Automate your subscription billing with recurring invoices. Set up once and let LeadFlow
              handle the rest - generate invoices weekly, monthly, quarterly, or yearly.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/handler/sign-up">
                <GlowButton size="lg">
                  Automate Your Billing
                  <ArrowRight className="w-5 h-5 ml-2" />
                </GlowButton>
              </Link>
              <Link
                href="/resources/invoicing/invoice-creation"
                className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
              >
                Learn about invoice creation
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
            badge="Recurring Features"
            title="Automated Billing That Works for You"
            titleGradient="Works for You"
            description="Set up recurring invoices once and let LeadFlow handle the billing cycle."
          />

          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Calendar,
                title: "Flexible Scheduling",
                description: "Choose weekly, monthly, quarterly, or yearly billing cycles to match your services.",
              },
              {
                icon: Zap,
                title: "Auto-Generation",
                description: "Invoices are automatically created and sent on your chosen schedule.",
              },
              {
                icon: Settings,
                title: "Template Management",
                description: "Save line items as templates for consistent recurring billing.",
              },
              {
                icon: Clock,
                title: "Start & End Dates",
                description: "Set start dates and optional end dates for fixed-term agreements.",
              },
              {
                icon: DollarSign,
                title: "Auto-Send Option",
                description: "Automatically email invoices to clients or review before sending.",
              },
              {
                icon: RefreshCw,
                title: "Easy Management",
                description: "Pause, resume, or modify recurring invoices anytime from one dashboard.",
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

      {/* Use Cases Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Use Cases"
            title="Perfect for Subscription-Based Businesses"
            titleGradient="Subscription-Based"
            description="Recurring invoices are ideal for these business models."
          />

          <div className="mt-16 max-w-3xl mx-auto space-y-6">
            {[
              "Monthly retainer agreements for consulting and agency services",
              "Software subscriptions and SaaS products",
              "Membership and subscription box services",
              "Ongoing maintenance and support contracts",
              "Rent and lease payments for property or equipment",
              "Regular service agreements like cleaning or gardening",
              "Coaching and training program payments",
            ].map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start gap-4 p-4 rounded-xl bg-card/50"
              >
                <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                <p className="text-lg">{useCase}</p>
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
              Put Your Billing on <GradientText>Autopilot</GradientText>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Start automating your recurring billing today and save hours every month.
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
