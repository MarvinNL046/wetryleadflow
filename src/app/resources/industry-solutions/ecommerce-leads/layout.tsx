import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lead Management for E-commerce | LeadFlow - Convert More Visitors",
  description:
    "LeadFlow is the ideal lead management solution for e-commerce businesses. Capture abandoned carts, segment customers, automate re-engagement, and increase conversions.",
  keywords: [
    "e-commerce CRM",
    "lead management for online stores",
    "abandoned cart recovery",
    "e-commerce customer management",
    "online store lead capture",
    "e-commerce automation",
    "customer segmentation",
    "e-commerce conversion optimization",
  ],
  openGraph: {
    title: "Lead Management for E-commerce | LeadFlow",
    description:
      "The complete lead management solution for e-commerce. Capture, segment, and convert more visitors into customers.",
    url: "https://leadflow.com/resources/industry-solutions/ecommerce-leads",
    type: "website",
  },
};

export default function EcommerceLeadsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
