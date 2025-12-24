import { Metadata } from "next";

export const metadata: Metadata = {
  title: "E-commerce Lead Capture | LeadFlow Topic Hub",
  description:
    "Maximize e-commerce lead capture with LeadFlow. Combine e-commerce-specific features with powerful lead capture tools to convert more visitors into customers.",
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: "E-commerce Lead Capture | LeadFlow",
    description:
      "Combine e-commerce features with lead capture tools for higher conversions and revenue.",
    url: "https://leadflow.com/resources/topics/ecommerce-lead-capture",
    type: "website",
  },
};

export default function EcommerceLeadCaptureLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
