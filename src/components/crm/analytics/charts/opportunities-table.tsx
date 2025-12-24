"use client";

import { motion } from "framer-motion";
import { ChartCard } from "./chart-card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import type { TopOpportunity } from "@/lib/actions/analytics";

interface OpportunitiesTableProps {
  data: TopOpportunity[];
  delay?: number;
}

export function OpportunitiesTable({ data, delay = 0 }: OpportunitiesTableProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("nl-NL", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <ChartCard
      title="Top Opportunities"
      subtitle={`${data.length} opportunities`}
      delay={delay}
      action={
        <Button
          variant="outline"
          size="sm"
          className="text-xs"
          disabled
        >
          <Download className="h-3 w-3 mr-1" />
          Export
        </Button>
      }
    >
      <div className="overflow-x-auto">
        {data.length > 0 ? (
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-200/50 dark:border-zinc-800/50">
                <th className="text-left text-xs font-medium text-zinc-500 pb-3">
                  Opportunity
                </th>
                <th className="text-right text-xs font-medium text-zinc-500 pb-3">
                  Value
                </th>
                <th className="text-left text-xs font-medium text-zinc-500 pb-3 pl-4">
                  Stage
                </th>
                <th className="text-right text-xs font-medium text-zinc-500 pb-3">
                  Days
                </th>
                <th className="text-left text-xs font-medium text-zinc-500 pb-3 pl-4">
                  Contact
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((opp, index) => (
                <motion.tr
                  key={opp.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: delay + index * 0.05 }}
                  className="border-b border-zinc-100 dark:border-zinc-800/50 last:border-0 hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30"
                >
                  <td className="py-3">
                    <div className="font-medium text-sm truncate max-w-[200px]">
                      {opp.title}
                    </div>
                  </td>
                  <td className="py-3 text-right">
                    <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                      {formatCurrency(opp.value)}
                    </span>
                  </td>
                  <td className="py-3 pl-4">
                    <span
                      className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium"
                      style={{
                        backgroundColor: `${opp.stageColor}20`,
                        color: opp.stageColor,
                      }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: opp.stageColor }}
                      />
                      {opp.stageName}
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <span className="text-sm text-zinc-500">
                      {opp.daysInPipeline}d
                    </span>
                  </td>
                  <td className="py-3 pl-4">
                    <span className="text-sm text-zinc-600 dark:text-zinc-400 truncate max-w-[120px] block">
                      {opp.contactName || "-"}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="py-8 text-center text-zinc-400">
            No opportunities found
          </div>
        )}
      </div>
    </ChartCard>
  );
}
