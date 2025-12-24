"use client";

import { motion } from "framer-motion";
import {
  Brain,
  Kanban,
  Facebook,
  Zap,
  Users,
  BarChart3,
} from "lucide-react";
import { SectionHeading } from "../ui/section-heading";

const features = [
  {
    icon: Brain,
    title: "AI Lead Scoring",
    description:
      "Automatically prioritize your hottest leads with machine learning that learns from your conversion patterns.",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: Kanban,
    title: "Visual Pipelines",
    description:
      "Drag-and-drop kanban boards that give you instant visibility into every deal stage and bottleneck.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Facebook,
    title: "Meta Leads Integration",
    description:
      "Connect your Facebook & Instagram Lead Ads and watch leads flow directly into your pipeline in real-time.",
    gradient: "from-blue-600 to-blue-400",
  },
  {
    icon: Zap,
    title: "Automated Follow-ups",
    description:
      "Never let a lead go cold. Set up automated email sequences that nurture prospects while you sleep.",
    gradient: "from-yellow-500 to-orange-500",
  },
  {
    icon: Users,
    title: "Contact Management",
    description:
      "Unified contact profiles with complete history, notes, and activity timeline in one clean view.",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description:
      "Real-time insights into conversion rates, pipeline velocity, and team performance metrics.",
    gradient: "from-indigo-500 to-purple-500",
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

export function FeaturesSection() {
  return (
    <section id="features" className="landing-section relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Features"
          title="Everything you need to close more deals"
          description="Powerful features designed for modern sales teams. No bloat, just the tools you actually need."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={cardVariants}
              className="group relative p-6 rounded-2xl border border-border bg-card hover:border-purple-500/30 transition-all duration-300 glow-card"
            >
              {/* Icon */}
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} p-0.5 mb-4`}
              >
                <div className="w-full h-full rounded-[10px] bg-card flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-foreground" />
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>

              {/* Hover gradient border effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/10 via-transparent to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
