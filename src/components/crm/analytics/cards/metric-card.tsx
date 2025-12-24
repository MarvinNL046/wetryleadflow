"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
} from "chart.js";
import { cn } from "@/lib/utils";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip
);

interface MetricCardProps {
  title: string;
  value: string | number;
  previousValue?: number;
  change?: number;
  changeLabel?: string;
  sparklineData?: number[];
  icon?: React.ComponentType<{ className?: string }>;
  color?: "blue" | "green" | "purple" | "amber" | "rose";
  prefix?: string;
  suffix?: string;
  delay?: number;
}

const colorClasses = {
  blue: {
    icon: "from-blue-500 to-cyan-500",
    sparkline: "rgb(59, 130, 246)",
    sparklineBg: "rgba(59, 130, 246, 0.1)",
  },
  green: {
    icon: "from-green-500 to-emerald-500",
    sparkline: "rgb(34, 197, 94)",
    sparklineBg: "rgba(34, 197, 94, 0.1)",
  },
  purple: {
    icon: "from-violet-500 to-purple-500",
    sparkline: "rgb(139, 92, 246)",
    sparklineBg: "rgba(139, 92, 246, 0.1)",
  },
  amber: {
    icon: "from-amber-500 to-yellow-500",
    sparkline: "rgb(245, 158, 11)",
    sparklineBg: "rgba(245, 158, 11, 0.1)",
  },
  rose: {
    icon: "from-rose-500 to-pink-500",
    sparkline: "rgb(244, 63, 94)",
    sparklineBg: "rgba(244, 63, 94, 0.1)",
  },
};

export function MetricCard({
  title,
  value,
  previousValue,
  change,
  changeLabel = "vs last period",
  sparklineData,
  icon: Icon,
  color = "purple",
  prefix = "",
  suffix = "",
  delay = 0,
}: MetricCardProps) {
  const colors = colorClasses[color];

  // Calculate change if not provided
  const calculatedChange = useMemo(() => {
    if (change !== undefined) return change;
    if (previousValue === undefined) return undefined;
    const currentVal = typeof value === "number" ? value : parseFloat(String(value).replace(/[^0-9.-]/g, ""));
    if (previousValue === 0) return currentVal > 0 ? 100 : 0;
    return Math.round(((currentVal - previousValue) / previousValue) * 100 * 10) / 10;
  }, [change, previousValue, value]);

  const isPositive = calculatedChange !== undefined && calculatedChange > 0;
  const isNegative = calculatedChange !== undefined && calculatedChange < 0;
  const isNeutral = calculatedChange === 0;

  // Sparkline chart config
  const sparklineConfig = useMemo(() => {
    if (!sparklineData || sparklineData.length === 0) return null;

    return {
      labels: sparklineData.map((_, i) => i.toString()),
      datasets: [
        {
          data: sparklineData,
          borderColor: colors.sparkline,
          backgroundColor: colors.sparklineBg,
          fill: true,
          tension: 0.4,
          pointRadius: 0,
          borderWidth: 2,
        },
      ],
    };
  }, [sparklineData, colors]);

  const sparklineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
    scales: {
      x: { display: false },
      y: { display: false },
    },
    elements: {
      line: { borderCapStyle: "round" as const },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="dashboard-stat-card relative rounded-xl border border-zinc-200/50 bg-white/80 backdrop-blur-sm p-5 dark:border-zinc-800/50 dark:bg-zinc-900/80"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            {Icon && (
              <div className={cn("flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br", colors.icon)}>
                <Icon className="h-4 w-4 text-white" />
              </div>
            )}
            <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
              {title}
            </span>
          </div>

          <div className="text-2xl font-bold tracking-tight">
            {prefix}{typeof value === "number" ? value.toLocaleString("nl-NL") : value}{suffix}
          </div>

          {calculatedChange !== undefined && (
            <div className="flex items-center gap-1.5 mt-2">
              <div
                className={cn(
                  "flex items-center gap-0.5 text-xs font-medium px-1.5 py-0.5 rounded",
                  isPositive && "bg-green-100 text-green-700 dark:bg-green-950/50 dark:text-green-400",
                  isNegative && "bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-400",
                  isNeutral && "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                )}
              >
                {isPositive && <TrendingUp className="h-3 w-3" />}
                {isNegative && <TrendingDown className="h-3 w-3" />}
                {isNeutral && <Minus className="h-3 w-3" />}
                {isPositive && "+"}
                {calculatedChange}%
              </div>
              <span className="text-xs text-zinc-400">{changeLabel}</span>
            </div>
          )}
        </div>

        {/* Sparkline */}
        {sparklineConfig && (
          <div className="w-24 h-12">
            <Line data={sparklineConfig} options={sparklineOptions} />
          </div>
        )}
      </div>
    </motion.div>
  );
}
