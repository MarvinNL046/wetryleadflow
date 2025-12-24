"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ChartCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  action?: React.ReactNode;
  delay?: number;
}

export function ChartCard({
  title,
  subtitle,
  children,
  className,
  action,
  delay = 0,
}: ChartCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={cn(
        "dashboard-stat-card rounded-xl border border-zinc-200/50 bg-white/80 backdrop-blur-sm dark:border-zinc-800/50 dark:bg-zinc-900/80",
        className
      )}
    >
      <div className="flex items-center justify-between border-b border-zinc-200/50 p-4 dark:border-zinc-800/50">
        <div>
          <h3 className="font-semibold">{title}</h3>
          {subtitle && (
            <p className="text-xs text-zinc-500 mt-0.5">{subtitle}</p>
          )}
        </div>
        {action}
      </div>
      <div className="p-4">{children}</div>
    </motion.div>
  );
}
