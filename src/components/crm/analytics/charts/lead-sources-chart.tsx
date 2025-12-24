"use client";

import { useMemo } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, type ChartOptions } from "chart.js";
import { ChartCard } from "./chart-card";
import type { LeadSourceData } from "@/lib/actions/analytics";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

interface LeadSourcesChartProps {
  data: LeadSourceData[];
  delay?: number;
}

const sourceColors: Record<string, { bg: string; border: string }> = {
  meta: { bg: "rgba(59, 130, 246, 0.8)", border: "rgb(59, 130, 246)" },
  manual: { bg: "rgba(34, 197, 94, 0.8)", border: "rgb(34, 197, 94)" },
  api: { bg: "rgba(139, 92, 246, 0.8)", border: "rgb(139, 92, 246)" },
  import: { bg: "rgba(245, 158, 11, 0.8)", border: "rgb(245, 158, 11)" },
  unknown: { bg: "rgba(161, 161, 170, 0.8)", border: "rgb(161, 161, 170)" },
};

const sourceLabels: Record<string, string> = {
  meta: "Meta Ads",
  manual: "Manual Entry",
  api: "API",
  import: "Import",
  unknown: "Unknown",
};

export function LeadSourcesChart({ data, delay = 0 }: LeadSourcesChartProps) {
  const chartData = useMemo(() => {
    const sortedData = [...data].sort((a, b) => b.count - a.count);

    return {
      labels: sortedData.map((d) => sourceLabels[d.source] || d.source),
      datasets: [
        {
          data: sortedData.map((d) => d.count),
          backgroundColor: sortedData.map(
            (d) => sourceColors[d.source]?.bg || sourceColors.unknown.bg
          ),
          borderColor: sortedData.map(
            (d) => sourceColors[d.source]?.border || sourceColors.unknown.border
          ),
          borderWidth: 2,
          hoverOffset: 4,
        },
      ],
    };
  }, [data]);

  const options: ChartOptions<"doughnut"> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "60%",
    plugins: {
      legend: {
        position: "right",
        labels: {
          color: "rgb(161, 161, 170)",
          font: {
            size: 12,
          },
          padding: 16,
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "#fff",
        bodyColor: "#fff",
        padding: 12,
        callbacks: {
          label: (context) => {
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = Math.round((context.parsed / total) * 100);
            return `${context.label}: ${context.parsed} (${percentage}%)`;
          },
        },
      },
    },
  };

  const totalLeads = data.reduce((sum, d) => sum + d.count, 0);

  return (
    <ChartCard
      title="Lead Sources"
      subtitle={`Total: ${totalLeads.toLocaleString()} leads`}
      delay={delay}
    >
      <div className="h-[280px]">
        {data.length > 0 ? (
          <Doughnut data={chartData} options={options} />
        ) : (
          <div className="h-full flex items-center justify-center text-zinc-400">
            No lead source data available
          </div>
        )}
      </div>
    </ChartCard>
  );
}
