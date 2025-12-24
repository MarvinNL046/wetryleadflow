"use client";

import { motion } from "framer-motion";
import { Link2, Bot, Trophy } from "lucide-react";
import { SectionHeading } from "../ui/section-heading";

const steps = [
  {
    number: "01",
    icon: Link2,
    title: "Connect Your Leads",
    description:
      "Import leads from Meta Ads, upload CSVs, or connect via API. All your leads in one place within minutes.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    number: "02",
    icon: Bot,
    title: "Let AI Do the Work",
    description:
      "Our AI scores leads based on engagement, demographics, and behavior. Focus on the leads most likely to convert.",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    number: "03",
    icon: Trophy,
    title: "Close More Deals",
    description:
      "Track every interaction, automate follow-ups, and move leads through your pipeline to closed-won.",
    gradient: "from-green-500 to-emerald-500",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const stepVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export function HowItWorks() {
  return (
    <section id="how-it-works" className="landing-section relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="How it works"
          title="From lead to deal in 3 simple steps"
          description="No complex setup. No steep learning curve. Just results."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              variants={stepVariants}
              className="relative"
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-[calc(50%+60px)] w-[calc(100%-60px)] h-[2px]">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.2 }}
                    className="h-full bg-gradient-to-r from-border via-purple-500/50 to-border origin-left"
                  />
                </div>
              )}

              <div className="text-center">
                {/* Step number */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    delay: index * 0.2,
                  }}
                  className="relative inline-block mb-6"
                >
                  <div
                    className={`w-32 h-32 rounded-full bg-gradient-to-br ${step.gradient} p-[2px]`}
                  >
                    <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                      <step.icon className="w-12 h-12 text-foreground" />
                    </div>
                  </div>
                  <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-background border-2 border-border flex items-center justify-center">
                    <span className="text-sm font-bold gradient-text">
                      {step.number}
                    </span>
                  </div>
                </motion.div>

                {/* Content */}
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground max-w-sm mx-auto">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
