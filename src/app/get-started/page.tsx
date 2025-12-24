"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { LandingHeader } from "@/components/landing/layout/landing-header";
import { LandingFooter } from "@/components/landing/layout/landing-footer";
import {
  Building2,
  User,
  ArrowRight,
  Check,
  Users,
  Palette,
  CreditCard,
  Sparkles,
} from "lucide-react";

type UserType = "solo" | "agency" | null;

const userTypes = [
  {
    id: "solo" as const,
    title: "ZZP'er / MKB",
    subtitle: "Ik wil LeadFlow voor mijn eigen bedrijf",
    icon: User,
    color: "blue",
    features: [
      "Volledige CRM functionaliteit",
      "Meta Lead Ads integratie",
      "Offertes & Facturen",
      "Pipeline management",
    ],
    cta: "Start Gratis Trial",
    href: "/handler/sign-up",
  },
  {
    id: "agency" as const,
    title: "Marketing Agency",
    subtitle: "Ik wil LeadFlow aanbieden aan mijn klanten",
    icon: Building2,
    color: "violet",
    features: [
      "Whitelabel branding",
      "Multi-tenant platform",
      "Eigen klant-accounts",
      "SaaS billing optie",
    ],
    cta: "Start Agency Trial",
    href: "/handler/sign-up?after_auth_return_to=/agency/setup",
  },
];

export default function GetStartedPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<UserType>(null);
  const [isHovering, setIsHovering] = useState<UserType>(null);

  const handleContinue = () => {
    if (!selected) return;
    const userType = userTypes.find((t) => t.id === selected);
    if (userType) {
      router.push(userType.href);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-blue-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
      <LandingHeader />

      <main className="mx-auto max-w-4xl px-4 pt-32 pb-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            Welkom bij{" "}
            <span className="bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
              LeadFlow
            </span>
          </h1>
          <p className="mx-auto max-w-xl text-lg text-zinc-600 dark:text-zinc-400">
            Hoe wil je LeadFlow gebruiken? Kies de optie die het beste bij jou past.
          </p>
        </motion.div>

        {/* Selection Cards */}
        <div className="mb-10 grid gap-6 md:grid-cols-2">
          {userTypes.map((type, index) => (
            <motion.div
              key={type.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <button
                onClick={() => setSelected(type.id)}
                onMouseEnter={() => setIsHovering(type.id)}
                onMouseLeave={() => setIsHovering(null)}
                className={`relative w-full rounded-2xl border-2 p-6 text-left transition-all duration-300 ${
                  selected === type.id
                    ? type.id === "agency"
                      ? "border-violet-500 bg-violet-50/50 dark:bg-violet-900/20"
                      : "border-blue-500 bg-blue-50/50 dark:bg-blue-900/20"
                    : "border-zinc-200 bg-white/80 hover:border-zinc-300 dark:border-zinc-700 dark:bg-zinc-800/50 dark:hover:border-zinc-600"
                } backdrop-blur-sm`}
              >
                {/* Selection indicator */}
                <div
                  className={`absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full border-2 transition-all ${
                    selected === type.id
                      ? type.id === "agency"
                        ? "border-violet-500 bg-violet-500"
                        : "border-blue-500 bg-blue-500"
                      : "border-zinc-300 dark:border-zinc-600"
                  }`}
                >
                  {selected === type.id && (
                    <Check className="h-4 w-4 text-white" />
                  )}
                </div>

                {/* Icon */}
                <div
                  className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl ${
                    type.id === "agency"
                      ? "bg-violet-100 text-violet-600 dark:bg-violet-900/50 dark:text-violet-400"
                      : "bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400"
                  }`}
                >
                  <type.icon className="h-7 w-7" />
                </div>

                {/* Content */}
                <h3 className="mb-1 text-xl font-bold">{type.title}</h3>
                <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
                  {type.subtitle}
                </p>

                {/* Features */}
                <ul className="space-y-2">
                  {type.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400"
                    >
                      <Check
                        className={`h-4 w-4 shrink-0 ${
                          type.id === "agency"
                            ? "text-violet-500"
                            : "text-blue-500"
                        }`}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Agency special badge */}
                {type.id === "agency" && (
                  <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-violet-100 px-3 py-1 text-xs font-medium text-violet-700 dark:bg-violet-900/50 dark:text-violet-300">
                    <Sparkles className="h-3 w-3" />
                    Bouw je eigen SaaS
                  </div>
                )}
              </button>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          <Button
            size="lg"
            onClick={handleContinue}
            disabled={!selected}
            className={`px-8 transition-all ${
              selected === "agency"
                ? "bg-gradient-to-r from-violet-600 to-purple-600"
                : selected === "solo"
                ? "bg-gradient-to-r from-blue-600 to-cyan-600"
                : "bg-zinc-400"
            }`}
          >
            {selected
              ? userTypes.find((t) => t.id === selected)?.cta
              : "Selecteer een optie"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>

          <p className="mt-4 text-sm text-zinc-500">
            14 dagen gratis proberen • Geen creditcard nodig
          </p>
        </motion.div>

        {/* Comparison hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-16 rounded-xl border border-zinc-200/50 bg-white/50 p-6 backdrop-blur-sm dark:border-zinc-700/50 dark:bg-zinc-800/50"
        >
          <h3 className="mb-4 text-center font-semibold">
            Niet zeker welke optie?
          </h3>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/50">
                <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                <strong>ZZP/MKB</strong> is voor bedrijven die LeadFlow voor
                zichzelf gebruiken
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-violet-100 dark:bg-violet-900/50">
                <Building2 className="h-5 w-5 text-violet-600 dark:text-violet-400" />
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                <strong>Agency</strong> is voor bureaus die LeadFlow aan klanten
                doorverkopen
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/50">
                <ArrowRight className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Je kunt later altijd upgraden naar een ander plan
              </p>
            </div>
          </div>
        </motion.div>
      </main>

      <LandingFooter />
    </div>
  );
}
