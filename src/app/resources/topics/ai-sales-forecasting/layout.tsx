import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Sales Forecasting - LeadFlow",
  description: "Combine AI-driven predictions with comprehensive sales analytics to forecast revenue with unprecedented accuracy.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function AISalesForecastingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
