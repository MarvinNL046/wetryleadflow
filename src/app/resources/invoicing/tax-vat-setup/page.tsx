"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Percent,
  ArrowRight,
  CheckCircle2,
  Calculator,
  Globe,
  FileText,
  Building,
  Shield,
} from "lucide-react";
import {
  LandingHeader,
  LandingFooter,
  GlowButton,
  GradientText,
  SectionHeading,
} from "@/components/landing";

export default function TaxVatSetupPage() {
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
              <Percent className="w-4 h-4 mr-2" />
              Invoicing & Billing
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              <GradientText>Tax & VAT Setup</GradientText> Made Easy
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Configure your tax rates correctly. Understand VAT handling, tax exemptions,
              and how to set up multi-rate taxation in LeadFlow.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/handler/sign-up">
                <GlowButton size="lg">
                  Configure Your Taxes
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

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Tax Features"
            title="Comprehensive Tax Management"
            titleGradient="Tax Management"
            description="LeadFlow handles all your tax calculation and reporting needs."
          />

          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Calculator,
                title: "Multiple Tax Rates",
                description: "Configure multiple tax rates (21%, 9%, 0%) for different product categories.",
              },
              {
                icon: Globe,
                title: "International VAT",
                description: "Handle VAT for cross-border transactions within and outside the EU.",
              },
              {
                icon: FileText,
                title: "VAT Reports",
                description: "Generate VAT reports for quarterly tax filings and compliance.",
              },
              {
                icon: Building,
                title: "Business Settings",
                description: "Store your VAT number and business details for compliant invoices.",
              },
              {
                icon: Shield,
                title: "Reverse Charge",
                description: "Automatic reverse charge handling for B2B EU transactions.",
              },
              {
                icon: Percent,
                title: "Per-Line Tax",
                description: "Apply different tax rates to individual line items on invoices.",
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

      {/* Dutch VAT Rates Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Netherlands VAT"
            title="Dutch VAT Rates Explained"
            titleGradient="VAT Rates"
            description="Understand which VAT rates apply to your products and services."
          />

          <div className="mt-16 max-w-3xl mx-auto space-y-6">
            {[
              "21% - Standard rate for most goods and services",
              "9% - Reduced rate for food, books, medicines, and some services",
              "0% - Zero rate for exports and certain international transactions",
              "Exempt - Financial services, healthcare, and education",
              "Reverse charge applies to B2B services to other EU countries",
              "Non-EU exports are zero-rated with proper documentation",
              "Small business scheme (KOR) available for businesses under threshold",
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
              Get Your <GradientText>Tax Setup Right</GradientText>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Configure your VAT settings correctly and stay compliant with LeadFlow.
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
