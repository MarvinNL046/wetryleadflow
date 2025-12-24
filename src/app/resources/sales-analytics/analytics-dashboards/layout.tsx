import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Building Effective Sales Dashboards | LeadFlow",
  description: "Learn how to design sales dashboards that transform complex data into instant insights. Master the principles of dashboard design that drives results.",
  keywords: [
    "sales dashboards",
    "analytics dashboards",
    "dashboard design",
    "sales analytics",
    "KPI dashboards",
    "executive dashboards",
    "pipeline dashboards",
    "real-time analytics"
  ],
  openGraph: {
    title: "Building Effective Sales Dashboards | LeadFlow",
    description: "Learn how to design sales dashboards that transform complex data into instant insights.",
    type: "article",
    url: "https://leadflow.com/resources/sales-analytics/analytics-dashboards",
  },
};

export default function AnalyticsDashboardsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
