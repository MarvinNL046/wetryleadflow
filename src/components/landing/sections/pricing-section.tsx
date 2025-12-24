"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { SectionHeading } from "../ui/section-heading";
import { GlowButton } from "../ui/glow-button";

const plans = [
  {
    name: "Starter",
    description: "Perfect for getting started",
    price: "Free",
    period: "",
    features: [
      "Up to 100 contacts",
      "1 pipeline",
      "Basic lead capture",
      "Email support",
      "7-day data history",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    description: "For growing sales teams",
    price: "€29",
    period: "/month",
    features: [
      "Unlimited contacts",
      "Unlimited pipelines",
      "Meta Leads integration",
      "AI lead scoring",
      "Email automation",
      "Priority support",
      "Unlimited history",
      "API access",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    description: "For large organizations",
    price: "Custom",
    period: "",
    features: [
      "Everything in Pro",
      "Dedicated account manager",
      "Custom integrations",
      "SSO / SAML",
      "Advanced security",
      "SLA guarantee",
      "On-premise option",
      "Training & onboarding",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export function PricingSection() {
  return (
    <section id="pricing" className="landing-section relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Pricing"
          title="Simple, transparent pricing"
          description="No hidden fees. No surprises. Cancel anytime."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto"
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              variants={cardVariants}
              className={cn(
                "relative p-6 lg:p-8 rounded-2xl border bg-card transition-all duration-300",
                plan.popular
                  ? "border-purple-500/50 shadow-lg shadow-purple-500/10"
                  : "border-border hover:border-purple-500/30"
              )}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-purple-500 to-cyan-500 text-white">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Plan header */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-1">{plan.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {plan.description}
                </p>
              </div>

              {/* Price */}
              <div className="mb-6">
                <span className="text-4xl font-bold">{plan.price}</span>
                {plan.period && (
                  <span className="text-muted-foreground">{plan.period}</span>
                )}
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-green-500" />
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              {plan.popular ? (
                <Link href="/get-started" className="block">
                  <GlowButton className="w-full">{plan.cta}</GlowButton>
                </Link>
              ) : (
                <Link
                  href={plan.name === "Enterprise" ? "/contact" : "/get-started"}
                  className="block"
                >
                  <button className="w-full py-3 px-6 rounded-full font-semibold border border-border hover:bg-accent transition-colors">
                    {plan.cta}
                  </button>
                </Link>
              )}

              {/* Background gradient for popular plan */}
              {plan.popular && (
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/5 via-transparent to-cyan-500/5 pointer-events-none" />
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 text-center text-sm text-muted-foreground"
        >
          <p>
            14-day free trial • No credit card required • Cancel anytime
          </p>
        </motion.div>
      </div>
    </section>
  );
}
