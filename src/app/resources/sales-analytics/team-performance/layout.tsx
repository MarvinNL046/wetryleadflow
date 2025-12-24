import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Measuring Sales Team Performance | LeadFlow",
  description: "Build a high-performing sales team with transparent, fair, and comprehensive performance measurement. Discover the metrics and methodologies that drive team excellence.",
  keywords: [
    "sales team performance",
    "sales KPIs",
    "quota attainment",
    "sales metrics",
    "performance management",
    "sales coaching",
    "team leaderboards",
    "sales productivity"
  ],
  openGraph: {
    title: "Measuring Sales Team Performance | LeadFlow",
    description: "Build a high-performing sales team with transparent, fair, and comprehensive performance measurement.",
    type: "article",
    url: "https://leadflow.com/resources/sales-analytics/team-performance",
  },
};

export default function TeamPerformanceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
