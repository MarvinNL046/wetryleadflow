import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sales Reporting Best Practices | LeadFlow",
  description: "Create sales reports that drive action and inform strategy. Learn how to build reports that transform raw data into actionable insights for your sales team.",
  keywords: [
    "sales reporting",
    "sales reports",
    "pipeline reports",
    "sales analytics",
    "CRM reporting",
    "forecast reports",
    "win loss analysis",
    "sales dashboards"
  ],
  openGraph: {
    title: "Sales Reporting Best Practices | LeadFlow",
    description: "Create sales reports that drive action and inform strategy. Transform raw data into actionable insights.",
    type: "article",
    url: "https://leadflow.com/resources/sales-analytics/sales-reporting",
  },
};

export default function SalesReportingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
