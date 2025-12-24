import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SaaS Pipeline Optimization - LeadFlow",
  description: "Master SaaS sales pipeline management. Increase deal velocity, improve conversion rates, and build predictable recurring revenue.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function SaaSPipelineOptimizationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
