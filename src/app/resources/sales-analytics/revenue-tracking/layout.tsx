import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Revenue Tracking & Attribution | LeadFlow",
  description: "Master revenue attribution to understand where your revenue comes from. Learn how to connect marketing and sales activities to actual revenue outcomes.",
  keywords: [
    "revenue attribution",
    "revenue tracking",
    "marketing attribution",
    "multi-touch attribution",
    "ROI measurement",
    "sales analytics",
    "customer acquisition cost",
    "revenue intelligence"
  ],
  openGraph: {
    title: "Revenue Tracking & Attribution | LeadFlow",
    description: "Master revenue attribution to understand where your revenue comes from and which activities drive it.",
    type: "article",
    url: "https://leadflow.com/resources/sales-analytics/revenue-tracking",
  },
};

export default function RevenueTrackingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
