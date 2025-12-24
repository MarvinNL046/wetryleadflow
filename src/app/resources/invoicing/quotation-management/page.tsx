"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FileText,
  ArrowRight,
  CheckCircle2,
  Clock,
  DollarSign,
  Users,
  TrendingUp,
  Zap,
} from "lucide-react";
import {
  LandingHeader,
  LandingFooter,
  GlowButton,
  GradientText,
  SectionHeading,
} from "@/components/landing";

export default function QuotationManagementPage() {
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
              <FileText className="w-4 h-4 mr-2" />
              Invoicing & Billing
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Professional <GradientText>Quotation Management</GradientText> That Wins Deals
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Create stunning quotations that convert prospects into customers.
              Learn how to structure proposals, set competitive pricing, and track acceptance rates with LeadFlow.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/handler/sign-up">
                <GlowButton size="lg">
                  Start Creating Quotations
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
            badge="Quotation Features"
            title="Everything You Need for Professional Proposals"
            titleGradient="Professional Proposals"
            description="LeadFlow provides all the tools you need to create, send, and track quotations efficiently."
          />

          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: FileText,
                title: "Professional Templates",
                description: "Use customizable templates with your branding, logo, and colors for consistent proposals.",
              },
              {
                icon: DollarSign,
                title: "Flexible Pricing",
                description: "Add line items with quantities, discounts, and multiple tax rates. Calculate totals automatically.",
              },
              {
                icon: Clock,
                title: "Expiry Tracking",
                description: "Set validity periods and get notified when quotations are about to expire.",
              },
              {
                icon: Users,
                title: "Client Management",
                description: "Link quotations to contacts and see complete proposal history per client.",
              },
              {
                icon: Zap,
                title: "One-Click Conversion",
                description: "Convert accepted quotations to invoices instantly with a single click.",
              },
              {
                icon: TrendingUp,
                title: "Acceptance Analytics",
                description: "Track win rates, average deal sizes, and time-to-acceptance metrics.",
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
            title="Quotation Tips That Increase Win Rates"
            titleGradient="Win Rates"
            description="Follow these proven strategies to improve your quotation acceptance rates."
          />

          <div className="mt-16 max-w-3xl mx-auto space-y-6">
            {[
              "Respond quickly - aim to send quotations within 24 hours of inquiry",
              "Personalize each proposal with the client's name and specific requirements",
              "Break down pricing clearly with itemized line items and descriptions",
              "Include terms and conditions to set clear expectations",
              "Add a compelling introduction that addresses the client's pain points",
              "Follow up within 3 days if you haven't received a response",
              "Use PDF exports for professional presentation and easy sharing",
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
              Ready to Create <GradientText>Winning Quotations</GradientText>?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Start creating professional quotations today with LeadFlow's intuitive invoicing module.
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
