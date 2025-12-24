"use client";

import { useState } from "react";
import { format, subDays, subMonths, startOfMonth, endOfMonth } from "date-fns";
import { Calendar, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export interface DateRange {
  from: Date;
  to: Date;
  label: string;
}

const presets: { label: string; getValue: () => DateRange }[] = [
  {
    label: "Today",
    getValue: () => ({
      from: new Date(),
      to: new Date(),
      label: "Today",
    }),
  },
  {
    label: "Last 7 days",
    getValue: () => ({
      from: subDays(new Date(), 6),
      to: new Date(),
      label: "Last 7 days",
    }),
  },
  {
    label: "Last 30 days",
    getValue: () => ({
      from: subDays(new Date(), 29),
      to: new Date(),
      label: "Last 30 days",
    }),
  },
  {
    label: "Last 90 days",
    getValue: () => ({
      from: subDays(new Date(), 89),
      to: new Date(),
      label: "Last 90 days",
    }),
  },
  {
    label: "This month",
    getValue: () => ({
      from: startOfMonth(new Date()),
      to: new Date(),
      label: "This month",
    }),
  },
  {
    label: "Last month",
    getValue: () => {
      const lastMonth = subMonths(new Date(), 1);
      return {
        from: startOfMonth(lastMonth),
        to: endOfMonth(lastMonth),
        label: "Last month",
      };
    },
  },
  {
    label: "Last 6 months",
    getValue: () => ({
      from: subMonths(new Date(), 6),
      to: new Date(),
      label: "Last 6 months",
    }),
  },
  {
    label: "Last 12 months",
    getValue: () => ({
      from: subMonths(new Date(), 12),
      to: new Date(),
      label: "Last 12 months",
    }),
  },
];

interface DateRangePickerProps {
  value: DateRange;
  onChange: (range: DateRange) => void;
  className?: string;
}

export function DateRangePicker({
  value,
  onChange,
  className,
}: DateRangePickerProps) {
  const [open, setOpen] = useState(false);

  const formatDateRange = (range: DateRange) => {
    if (range.label !== "Custom") {
      return range.label;
    }
    return `${format(range.from, "MMM d, yyyy")} - ${format(range.to, "MMM d, yyyy")}`;
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "flex items-center gap-2 bg-white/80 backdrop-blur-sm border-zinc-200/50 hover:bg-zinc-100/50 dark:bg-zinc-900/80 dark:border-zinc-800/50 dark:hover:bg-zinc-800/50",
            className
          )}
        >
          <Calendar className="h-4 w-4 text-zinc-500" />
          <span className="text-sm font-medium">{formatDateRange(value)}</span>
          <ChevronDown className="h-4 w-4 text-zinc-400" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {presets.map((preset, index) => (
          <DropdownMenuItem
            key={preset.label}
            onClick={() => {
              onChange(preset.getValue());
              setOpen(false);
            }}
            className={cn(
              "cursor-pointer",
              value.label === preset.label && "bg-violet-50 text-violet-600 dark:bg-violet-950/50 dark:text-violet-400"
            )}
          >
            {preset.label}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-zinc-500 cursor-not-allowed"
          disabled
        >
          Custom range (coming soon)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function getDefaultDateRange(): DateRange {
  return presets[2].getValue(); // Last 30 days
}
