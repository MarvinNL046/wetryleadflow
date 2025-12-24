"use client";

import { AgencyContext, AgencyBranding } from "@/lib/agency/context";

interface AgencyProviderProps {
  agency: AgencyBranding | null;
  children: React.ReactNode;
}

export function AgencyProvider({ agency, children }: AgencyProviderProps) {
  return (
    <AgencyContext.Provider value={{ agency, isWhitelabeled: !!agency }}>
      {/* CSS Variable Injection for agency theming */}
      {agency && (
        <style
          dangerouslySetInnerHTML={{
            __html: `
              :root {
                --agency-primary: ${agency.primaryColor || "#8b5cf6"};
                --agency-secondary: ${agency.secondaryColor || "#3b82f6"};
              }
            `,
          }}
        />
      )}
      {children}
    </AgencyContext.Provider>
  );
}
