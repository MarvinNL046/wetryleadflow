import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Real Estate Lead Generation - LeadFlow",
  description: "Master real estate lead generation with industry-specific CRM features. Capture, nurture, and convert more property buyers and sellers.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function RealEstateLeadGenerationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
