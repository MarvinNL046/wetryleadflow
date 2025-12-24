"use client";

import { createContext, useContext } from "react";

export interface AgencyBranding {
  id: number;
  slug: string;
  name: string;
  appName: string | null;
  logoUrl: string | null;
  primaryColor: string | null;
  secondaryColor: string | null;
}

export interface AgencyContextValue {
  agency: AgencyBranding | null;
  isWhitelabeled: boolean;
}

export const AgencyContext = createContext<AgencyContextValue>({
  agency: null,
  isWhitelabeled: false,
});

export const useAgency = () => useContext(AgencyContext);
