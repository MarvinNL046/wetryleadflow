import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sales Conversion Metrics That Matter | LeadFlow",
  description: "Learn which sales conversion metrics truly drive revenue growth. Discover how to measure, analyze, and optimize the KPIs that transform your sales performance.",
  keywords: [
    "sales conversion metrics",
    "conversion rate optimization",
    "sales KPIs",
    "lead to opportunity conversion",
    "win rate",
    "sales funnel metrics",
    "CRM analytics",
    "sales performance"
  ],
  openGraph: {
    title: "Sales Conversion Metrics That Matter | LeadFlow",
    description: "Learn which sales conversion metrics truly drive revenue growth. Discover how to measure, analyze, and optimize the KPIs that transform your sales performance.",
    type: "article",
    url: "https://leadflow.com/resources/sales-analytics/conversion-metrics",
  },
};

export default function ConversionMetricsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
