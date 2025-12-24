import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Landing Page Optimization | LeadFlow CRM",
  description: "Combine lead generation tactics with deep analytics to continuously improve landing page performance. Learn data-driven conversion optimization strategies.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function LandingPageOptimizationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
