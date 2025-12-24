"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Play, TrendingUp, Users, Zap, Bell } from "lucide-react";
import { GradientText } from "../ui/gradient-text";
import { GlowButton } from "../ui/glow-button";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

// Floating metrics data
const floatingMetrics = [
  { label: "Conversion Rate", value: "+32%", icon: TrendingUp, color: "text-green-500", delay: 0.8 },
  { label: "New Leads Today", value: "47", icon: Users, color: "text-blue-500", delay: 1.0 },
  { label: "AI Score", value: "94", icon: Zap, color: "text-purple-500", delay: 1.2 },
];

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-background to-background" />

        {/* Animated gradient mesh */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-500/30 rounded-full blur-[128px] animate-pulse" />
          <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: "1s" }} />
          <div className="absolute bottom-1/4 left-1/3 w-[600px] h-[600px] bg-cyan-500/20 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: "2s" }} />
        </div>

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.07]"
          style={{
            backgroundImage: `linear-gradient(to right, rgb(139 92 246 / 0.3) 1px, transparent 1px),
                             linear-gradient(to bottom, rgb(139 92 246 / 0.3) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Radial fade overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_var(--background)_70%)]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left side - Text content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div variants={itemVariants} className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-sm font-medium text-purple-400">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500" />
                </span>
                Now with AI-powered lead scoring
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-6"
            >
              Turn Every Lead Into{" "}
              <GradientText animated>Revenue</GradientText>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8"
            >
              The modern CRM that captures leads from Meta ads, scores them with AI,
              and helps you close deals faster.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <Link href="/get-started">
                <GlowButton size="lg" className="group">
                  Start Free Trial
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </GlowButton>
              </Link>
              <button className="inline-flex items-center gap-2 px-6 py-3 text-base font-medium rounded-full border border-border hover:bg-accent transition-colors">
                <Play className="w-5 h-5" />
                Watch Demo
              </button>
            </motion.div>

            {/* Social proof mini */}
            <motion.div
              variants={itemVariants}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 text-sm text-muted-foreground"
            >
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-blue-400 border-2 border-background"
                    />
                  ))}
                </div>
                <span>1,000+ teams</span>
              </div>
              <div className="hidden sm:block w-1 h-1 rounded-full bg-muted-foreground" />
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <svg
                    key={i}
                    className="w-4 h-4 text-yellow-500 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
                <span className="ml-1">4.9/5 rating</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right side - Dashboard mockup */}
          <motion.div
            initial={{ opacity: 0, x: 50, rotateY: -10 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
            className="relative hidden lg:block"
          >
            {/* Floating metrics */}
            {floatingMetrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                transition={{ duration: 0.5, delay: metric.delay }}
                className={`absolute z-20 ${
                  index === 0 ? "-left-8 top-8" :
                  index === 1 ? "-right-4 top-1/3" :
                  "-left-4 bottom-1/4"
                }`}
              >
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-card/80 backdrop-blur-sm border border-border shadow-lg animate-float"
                  style={{ animationDelay: `${index * 0.5}s` }}
                >
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${
                    index === 0 ? "from-green-500/20 to-emerald-500/20" :
                    index === 1 ? "from-blue-500/20 to-cyan-500/20" :
                    "from-purple-500/20 to-pink-500/20"
                  } flex items-center justify-center`}>
                    <metric.icon className={`w-5 h-5 ${metric.color}`} />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{metric.label}</p>
                    <p className={`text-lg font-bold ${metric.color}`}>{metric.value}</p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Notification popup */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.4 }}
              className="absolute -right-2 top-12 z-20"
            >
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-card/80 backdrop-blur-sm border border-purple-500/30 shadow-lg animate-float"
                style={{ animationDelay: "1.5s" }}
              >
                <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <Bell className="w-4 h-4 text-purple-500" />
                </div>
                <div>
                  <p className="text-xs font-medium">New lead from Meta</p>
                  <p className="text-xs text-muted-foreground">Just now</p>
                </div>
              </div>
            </motion.div>

            {/* Main dashboard card */}
            <div className="relative">
              {/* Glow effect behind */}
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 via-cyan-500/20 to-blue-500/20 rounded-3xl blur-2xl opacity-60" />

              <div className="relative rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl overflow-hidden shadow-2xl">
                {/* Browser chrome */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-border/50 bg-muted/30">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <div className="flex-1 flex justify-center">
                    <div className="px-4 py-1 bg-background/50 rounded-lg text-xs text-muted-foreground">
                      app.leadflow.com
                    </div>
                  </div>
                </div>

                {/* Dashboard content */}
                <div className="p-4 space-y-4">
                  {/* Stats row */}
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: "Total Leads", value: "2,847", trend: "+12%" },
                      { label: "Conversion", value: "24.5%", trend: "+3%" },
                      { label: "Revenue", value: "€128K", trend: "+18%" },
                    ].map((stat) => (
                      <div key={stat.label} className="p-3 rounded-xl bg-muted/30 border border-border/50">
                        <p className="text-[10px] text-muted-foreground">{stat.label}</p>
                        <div className="flex items-baseline gap-1">
                          <span className="text-lg font-bold">{stat.value}</span>
                          <span className="text-[10px] text-green-500">{stat.trend}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Mini pipeline */}
                  <div className="rounded-xl bg-muted/30 border border-border/50 p-3">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-medium">Sales Pipeline</span>
                      <span className="text-[10px] text-muted-foreground">This week</span>
                    </div>
                    <div className="flex gap-2">
                      {[
                        { stage: "New", count: 12, color: "bg-blue-500" },
                        { stage: "Contact", count: 8, color: "bg-yellow-500" },
                        { stage: "Qualified", count: 5, color: "bg-purple-500" },
                        { stage: "Won", count: 3, color: "bg-green-500" },
                      ].map((stage) => (
                        <div key={stage.stage} className="flex-1">
                          <div className="flex items-center gap-1 mb-1">
                            <div className={`w-1.5 h-1.5 rounded-full ${stage.color}`} />
                            <span className="text-[10px] text-muted-foreground">{stage.stage}</span>
                          </div>
                          <div className="text-sm font-semibold">{stage.count}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recent leads */}
                  <div className="space-y-2">
                    <span className="text-xs font-medium">Recent Leads</span>
                    {[
                      { name: "Sarah Johnson", company: "TechCorp", score: 92 },
                      { name: "Michael Chen", company: "StartupXYZ", score: 87 },
                    ].map((lead) => (
                      <div key={lead.name} className="flex items-center gap-3 p-2 rounded-lg bg-muted/20 border border-border/30">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-blue-400" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium truncate">{lead.name}</p>
                          <p className="text-[10px] text-muted-foreground truncate">{lead.company}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-8 h-1.5 rounded-full bg-muted overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full"
                              style={{ width: `${lead.score}%` }}
                            />
                          </div>
                          <span className="text-[10px] text-muted-foreground">{lead.score}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2"
        >
          <motion.div className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
        </motion.div>
      </motion.div>
    </section>
  );
}
