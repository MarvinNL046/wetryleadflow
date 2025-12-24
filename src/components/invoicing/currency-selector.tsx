"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SUPPORTED_CURRENCIES, type CurrencyCode } from "@/lib/utils/currency";

interface CurrencySelectorProps {
  value: string;
  onValueChange: (value: string) => void;
  disabled?: boolean;
}

export function CurrencySelector({
  value,
  onValueChange,
  disabled = false,
}: CurrencySelectorProps) {
  return (
    <Select value={value} onValueChange={onValueChange} disabled={disabled}>
      <SelectTrigger className="w-[120px]">
        <SelectValue placeholder="Valuta" />
      </SelectTrigger>
      <SelectContent>
        {SUPPORTED_CURRENCIES.map((currency) => (
          <SelectItem key={currency.code} value={currency.code}>
            <span className="flex items-center gap-2">
              <span className="font-mono text-sm">{currency.code}</span>
              <span className="text-zinc-500">{currency.symbol}</span>
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

/**
 * Compact currency selector for inline use
 */
export function CurrencySelectorCompact({
  value,
  onValueChange,
  disabled = false,
}: CurrencySelectorProps) {
  return (
    <Select value={value} onValueChange={onValueChange} disabled={disabled}>
      <SelectTrigger className="w-[80px] h-8 text-xs">
        <SelectValue placeholder="EUR" />
      </SelectTrigger>
      <SelectContent>
        {SUPPORTED_CURRENCIES.map((currency) => (
          <SelectItem key={currency.code} value={currency.code}>
            {currency.code}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
