"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { TrendingUp, Bell, Sparkles } from "lucide-react";
import { SectionHeading } from "../ui/section-heading";

const pipelineStages = [
  { name: "New Leads", count: 12, color: "bg-blue-500" },
  { name: "Contacted", count: 8, color: "bg-yellow-500" },
  { name: "Qualified", count: 5, color: "bg-purple-500" },
  { name: "Proposal", count: 3, color: "bg-cyan-500" },
  { name: "Closed Won", count: 2, color: "bg-green-500" },
];

const mockLeads = [
  { name: "Sarah Johnson", company: "TechCorp", score: 92 },
  { name: "Michael Chen", company: "StartupXYZ", score: 87 },
  { name: "Emma Williams", company: "GrowthCo", score: 78 },
];

export function DashboardPreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="landing-section relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="gradient-orb gradient-orb-purple w-[800px] h-[800px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Product"
          title="See your pipeline at a glance"
          titleGradient="pipeline"
          description="A clean, intuitive interface that puts your leads front and center. No training needed."
        />

        <motion.div
          style={{ y, opacity }}
          className="mt-16 relative max-w-5xl mx-auto"
        >
          {/* Floating badges */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="absolute -left-4 lg:-left-16 top-20 z-10"
          >
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-card border border-border shadow-lg animate-float">
              <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-green-500" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Conversion</p>
                <p className="text-sm font-semibold text-green-500">+23%</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="absolute -right-4 lg:-right-12 top-32 z-10"
          >
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-card border border-border shadow-lg animate-float"
              style={{ animationDelay: "1s" }}
            >
              <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                <Bell className="w-4 h-4 text-blue-500" />
              </div>
              <div>
                <p className="text-xs font-medium">New lead from Meta</p>
                <p className="text-xs text-muted-foreground">Just now</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="absolute -right-4 lg:-right-8 bottom-20 z-10"
          >
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-card border border-purple-500/30 shadow-lg animate-float"
              style={{ animationDelay: "2s" }}
            >
              <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-purple-500" />
              </div>
              <div>
                <p className="text-xs font-medium">AI Suggestion</p>
                <p className="text-xs text-muted-foreground">Follow up with Sarah</p>
              </div>
            </div>
          </motion.div>

          {/* Main dashboard mockup */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-2xl border border-border bg-card overflow-hidden shadow-2xl"
          >
            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/30">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="px-4 py-1 bg-background rounded-lg text-xs text-muted-foreground border border-border">
                  app.leadflow.com/crm/pipelines
                </div>
              </div>
            </div>

            {/* Dashboard content */}
            <div className="p-6">
              {/* Stats row */}
              <div className="grid grid-cols-4 gap-4 mb-6">
                {[
                  { label: "Total Leads", value: "2,847", change: "+12%" },
                  { label: "Conversion Rate", value: "24.5%", change: "+3.2%" },
                  { label: "Avg Deal Size", value: "€4,200", change: "+8%" },
                  { label: "Revenue MTD", value: "€128K", change: "+18%" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="p-4 rounded-xl bg-muted/30 border border-border"
                  >
                    <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-bold">{stat.value}</span>
                      <span className="text-xs text-green-500">{stat.change}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pipeline kanban */}
              <div className="flex gap-3 overflow-hidden">
                {pipelineStages.map((stage) => (
                  <div key={stage.name} className="flex-1 min-w-[160px]">
                    <div className="flex items-center gap-2 mb-3">
                      <div className={`w-2 h-2 rounded-full ${stage.color}`} />
                      <span className="text-sm font-medium">{stage.name}</span>
                      <span className="text-xs text-muted-foreground ml-auto">
                        {stage.count}
                      </span>
                    </div>
                    <div className="space-y-2">
                      {mockLeads.slice(0, stage.count > 2 ? 2 : 1).map((lead, i) => (
                        <div
                          key={`${stage.name}-${i}`}
                          className="p-3 rounded-lg bg-background border border-border"
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-400 to-blue-400" />
                            <span className="text-sm font-medium truncate">
                              {lead.name}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground truncate">
                            {lead.company}
                          </p>
                          <div className="mt-2 flex items-center gap-1">
                            <div className="flex-1 h-1 rounded-full bg-muted overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-purple-500 to-cyan-500"
                                style={{ width: `${lead.score}%` }}
                              />
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {lead.score}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Glow reflection */}
          <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-3/4 h-40 bg-gradient-to-t from-purple-500/20 to-transparent blur-3xl pointer-events-none" />
        </motion.div>
      </div>
    </section>
  );
}
