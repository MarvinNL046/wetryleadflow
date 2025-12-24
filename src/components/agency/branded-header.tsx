"use client";

import { useAgency } from "@/lib/agency/context";
import Image from "next/image";
import { Shield } from "lucide-react";

interface BrandedHeaderProps {
  className?: string;
}

export function BrandedHeader({ className }: BrandedHeaderProps) {
  const { agency, isWhitelabeled } = useAgency();

  if (isWhitelabeled && agency) {
    return (
      <div className={`flex items-center gap-2 ${className || ""}`}>
        {agency.logoUrl ? (
          <Image
            src={agency.logoUrl}
            alt={agency.name}
            width={32}
            height={32}
            className="rounded"
          />
        ) : (
          <div
            className="flex h-8 w-8 items-center justify-center rounded"
            style={{ backgroundColor: agency.primaryColor || "#8b5cf6" }}
          >
            <span className="text-sm font-bold text-white">
              {agency.name.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
        <span className="font-semibold">
          {agency.appName || agency.name}
        </span>
      </div>
    );
  }

  // Default LeadFlow branding
  return (
    <div className={`flex items-center gap-2 ${className || ""}`}>
      <Shield className="h-6 w-6 text-violet-500" />
      <span className="gradient-text font-semibold">LeadFlow</span>
    </div>
  );
}
