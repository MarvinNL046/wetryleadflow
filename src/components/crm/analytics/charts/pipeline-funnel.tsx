"use client";

import { useMemo } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  type ChartOptions,
} from "chart.js";
import { ChartCard } from "./chart-card";
import type { PipelineFunnelData } from "@/lib/actions/analytics";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

interface PipelineFunnelProps {
  data: PipelineFunnelData[];
  delay?: number;
}

export function PipelineFunnel({ data, delay = 0 }: PipelineFunnelProps) {
  const chartData = useMemo(() => {
    const sortedData = [...data].sort((a, b) => a.order - b.order);

    return {
      labels: sortedData.map((d) => d.stageName),
      datasets: [
        {
          label: "Opportunities",
          data: sortedData.map((d) => d.count),
          backgroundColor: sortedData.map((d) => {
            // Convert hex to rgba with opacity
            const hex = d.stageColor || "#6366f1";
            const r = parseInt(hex.slice(1, 3), 16);
            const g = parseInt(hex.slice(3, 5), 16);
            const b = parseInt(hex.slice(5, 7), 16);
            return `rgba(${r}, ${g}, ${b}, 0.8)`;
          }),
          borderColor: sortedData.map((d) => d.stageColor || "#6366f1"),
          borderWidth: 2,
          borderRadius: 6,
        },
      ],
    };
  }, [data]);

  const sortedData = [...data].sort((a, b) => a.order - b.order);

  const options: ChartOptions<"bar"> = {
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "#fff",
        bodyColor: "#fff",
        padding: 12,
        callbacks: {
          afterLabel: (context) => {
            const item = sortedData[context.dataIndex];
            if (item?.value) {
              return `Value: ${new Intl.NumberFormat("nl-NL", {
                style: "currency",
                currency: "EUR",
              }).format(item.value)}`;
            }
            return "";
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: "rgba(161, 161, 170, 0.1)",
        },
        ticks: {
          color: "rgb(161, 161, 170)",
          font: {
            size: 11,
          },
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          color: "rgb(161, 161, 170)",
          font: {
            size: 12,
          },
        },
      },
    },
  };

  const totalValue = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <ChartCard
      title="Pipeline Funnel"
      subtitle={`Pipeline value: ${new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR" }).format(totalValue)}`}
      delay={delay}
    >
      <div className="h-[280px]">
        {data.length > 0 ? (
          <Bar data={chartData} options={options} />
        ) : (
          <div className="h-full flex items-center justify-center text-zinc-400">
            No pipeline data available
          </div>
        )}
      </div>
    </ChartCard>
  );
}
