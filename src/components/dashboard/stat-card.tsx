"use client";

import { motion } from "framer-motion";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    label?: string;
  };
  href?: string;
  linkLabel?: string;
  color?: "default" | "green" | "blue" | "amber" | "purple";
  delay?: number;
}

export function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  href,
  linkLabel,
  color = "default",
  delay = 0,
}: StatCardProps) {
  const colorClasses = {
    default: "stat-icon-gradient",
    green: "stat-icon-gradient green",
    blue: "stat-icon-gradient blue",
    amber: "stat-icon-gradient amber",
    purple: "stat-icon-gradient purple",
  };

  const iconColors = {
    default: "text-violet-500",
    green: "text-green-500",
    blue: "text-blue-500",
    amber: "text-amber-500",
    purple: "text-purple-500",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] as const }}
      className="dashboard-stat-card rounded-xl border border-zinc-200/50 bg-white/80 p-5 backdrop-blur-sm dark:border-zinc-800/50 dark:bg-zinc-900/80"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
            {title}
          </p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold tracking-tight">{value}</span>
            {trend && (
              <span
                className={cn(
                  "flex items-center gap-0.5 text-xs font-medium",
                  trend.value >= 0 ? "trend-up" : "trend-down"
                )}
              >
                {trend.value >= 0 ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                {trend.value >= 0 ? "+" : ""}
                {trend.value}%
              </span>
            )}
          </div>
          {trend?.label && (
            <p className="mt-1 text-xs text-zinc-400">{trend.label}</p>
          )}
          {href && linkLabel && (
            <Link
              href={href}
              className="mt-3 inline-flex text-xs font-medium text-violet-500 hover:text-violet-600 dark:text-violet-400 dark:hover:text-violet-300"
            >
              {linkLabel} →
            </Link>
          )}
        </div>
        <div
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-lg",
            colorClasses[color]
          )}
        >
          <Icon className={cn("h-5 w-5", iconColors[color])} />
        </div>
      </div>
    </motion.div>
  );
}
