"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, Receipt, Package, Settings, RefreshCw, CreditCard, TrendingDown, Calculator } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { href: "/crm/invoicing", label: "Dashboard", icon: Receipt, exact: true },
  { href: "/crm/invoicing/quotations", label: "Offertes", icon: FileText },
  { href: "/crm/invoicing/invoices", label: "Facturen", icon: Receipt },
  { href: "/crm/invoicing/recurring", label: "Terugkerend", icon: RefreshCw },
  { href: "/crm/invoicing/expenses", label: "Uitgaven", icon: TrendingDown },
  { href: "/crm/invoicing/credit-notes", label: "Creditnota's", icon: CreditCard },
  { href: "/crm/invoicing/vat-report", label: "BTW Aangifte", icon: Calculator },
  { href: "/crm/invoicing/products", label: "Producten", icon: Package },
  { href: "/crm/invoicing/settings", label: "Instellingen", icon: Settings },
];

export default function InvoicingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Facturatie</h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Beheer je offertes, facturen en producten
        </p>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex gap-1 border-b border-zinc-200 dark:border-zinc-800">
        {tabs.map((tab) => {
          const isActive = tab.exact
            ? pathname === tab.href
            : pathname.startsWith(tab.href);

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                "flex items-center gap-2 border-b-2 px-4 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "border-violet-500 text-violet-600 dark:text-violet-400"
                  : "border-transparent text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
              )}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </Link>
          );
        })}
      </div>

      {/* Content */}
      {children}
    </div>
  );
}
