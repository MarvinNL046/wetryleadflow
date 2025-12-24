/**
 * Currency formatting utilities
 * Supports multiple currencies with proper localization
 */

export type CurrencyCode = "EUR" | "USD" | "GBP" | "CHF" | "CAD" | "AUD" | "JPY" | "CNY";

export interface CurrencyInfo {
  code: CurrencyCode;
  name: string;
  symbol: string;
  locale: string;
}

/**
 * Supported currencies with their display information
 */
export const SUPPORTED_CURRENCIES: CurrencyInfo[] = [
  { code: "EUR", name: "Euro", symbol: "€", locale: "nl-NL" },
  { code: "USD", name: "US Dollar", symbol: "$", locale: "en-US" },
  { code: "GBP", name: "British Pound", symbol: "£", locale: "en-GB" },
  { code: "CHF", name: "Swiss Franc", symbol: "CHF", locale: "de-CH" },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$", locale: "en-CA" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$", locale: "en-AU" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥", locale: "ja-JP" },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥", locale: "zh-CN" },
];

/**
 * Get currency info by code
 */
export function getCurrencyInfo(code: string): CurrencyInfo {
  const currency = SUPPORTED_CURRENCIES.find((c) => c.code === code);
  return currency || SUPPORTED_CURRENCIES[0]; // Default to EUR
}

/**
 * Format a number or string as currency
 * @param amount - The amount to format (string or number)
 * @param currencyCode - ISO 4217 currency code (default: EUR)
 * @returns Formatted currency string
 */
export function formatCurrency(
  amount: string | number,
  currencyCode: string = "EUR"
): string {
  const num = typeof amount === "string" ? parseFloat(amount) : amount;

  if (isNaN(num)) {
    return formatCurrency(0, currencyCode);
  }

  const currencyInfo = getCurrencyInfo(currencyCode);

  return new Intl.NumberFormat(currencyInfo.locale, {
    style: "currency",
    currency: currencyInfo.code,
    minimumFractionDigits: currencyInfo.code === "JPY" ? 0 : 2,
    maximumFractionDigits: currencyInfo.code === "JPY" ? 0 : 2,
  }).format(num);
}

/**
 * Format currency for display in invoicing context
 * Uses Dutch locale for consistency in NL market
 */
export function formatInvoiceCurrency(
  amount: string | number,
  currencyCode: string = "EUR"
): string {
  const num = typeof amount === "string" ? parseFloat(amount) : amount;

  if (isNaN(num)) {
    return formatInvoiceCurrency(0, currencyCode);
  }

  // Use nl-NL locale for consistent display in Dutch invoicing context
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: currencyCode,
    minimumFractionDigits: currencyCode === "JPY" ? 0 : 2,
    maximumFractionDigits: currencyCode === "JPY" ? 0 : 2,
  }).format(num);
}

/**
 * Get currency symbol only
 */
export function getCurrencySymbol(currencyCode: string = "EUR"): string {
  const currencyInfo = getCurrencyInfo(currencyCode);
  return currencyInfo.symbol;
}

/**
 * Parse currency string to number
 * Handles different decimal separators
 */
export function parseCurrencyString(value: string): number {
  // Remove currency symbols and whitespace
  const cleaned = value.replace(/[^0-9,.-]/g, "");

  // Handle Dutch format (comma as decimal separator)
  if (cleaned.includes(",") && !cleaned.includes(".")) {
    return parseFloat(cleaned.replace(",", "."));
  }

  // Handle format with thousand separator (1.234,56 or 1,234.56)
  if (cleaned.includes(",") && cleaned.includes(".")) {
    const lastComma = cleaned.lastIndexOf(",");
    const lastDot = cleaned.lastIndexOf(".");

    if (lastComma > lastDot) {
      // Dutch format: 1.234,56
      return parseFloat(cleaned.replace(/\./g, "").replace(",", "."));
    } else {
      // US format: 1,234.56
      return parseFloat(cleaned.replace(/,/g, ""));
    }
  }

  return parseFloat(cleaned) || 0;
}
