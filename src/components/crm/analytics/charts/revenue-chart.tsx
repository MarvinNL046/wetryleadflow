"use client";

import { useMemo } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  type TooltipItem,
  type ChartOptions,
} from "chart.js";
import { ChartCard } from "./chart-card";
import type { TimeSeriesDataPoint } from "@/lib/actions/analytics";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface RevenueChartProps {
  data: TimeSeriesDataPoint[];
  delay?: number;
}

export function RevenueChart({ data, delay = 0 }: RevenueChartProps) {
  const chartData = useMemo(() => {
    const labels = data.map((d) => {
      // Format date label
      const date = new Date(d.date);
      return date.toLocaleDateString("nl-NL", { month: "short", day: "numeric" });
    });

    return {
      labels,
      datasets: [
        {
          label: "Revenue",
          data: data.map((d) => d.value),
          borderColor: "rgb(139, 92, 246)",
          backgroundColor: "rgba(139, 92, 246, 0.1)",
          fill: true,
          tension: 0.4,
          pointRadius: 0,
          pointHoverRadius: 6,
          pointHoverBackgroundColor: "rgb(139, 92, 246)",
          pointHoverBorderColor: "#fff",
          pointHoverBorderWidth: 2,
          borderWidth: 2,
        },
      ],
    };
  }, [data]);

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "#fff",
        bodyColor: "#fff",
        padding: 12,
        displayColors: false,
        callbacks: {
          label: (context: TooltipItem<"line">) => {
            const value = context.parsed.y ?? 0;
            return new Intl.NumberFormat("nl-NL", {
              style: "currency",
              currency: "EUR",
            }).format(value);
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "rgb(161, 161, 170)",
          font: {
            size: 11,
          },
          maxRotation: 0,
          maxTicksLimit: 7,
        },
      },
      y: {
        grid: {
          color: "rgba(161, 161, 170, 0.1)",
        },
        ticks: {
          color: "rgb(161, 161, 170)",
          font: {
            size: 11,
          },
          callback: (value) => {
            if (typeof value === "number") {
              if (value >= 1000) {
                return `€${(value / 1000).toFixed(0)}k`;
              }
              return `€${value}`;
            }
            return value;
          },
        },
      },
    },
  };

  const totalRevenue = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <ChartCard
      title="Revenue Over Time"
      subtitle={`Total: ${new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR" }).format(totalRevenue)}`}
      delay={delay}
    >
      <div className="h-[280px]">
        {data.length > 0 ? (
          <Line data={chartData} options={options} />
        ) : (
          <div className="h-full flex items-center justify-center text-zinc-400">
            No revenue data available
          </div>
        )}
      </div>
    </ChartCard>
  );
}
