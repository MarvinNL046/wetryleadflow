import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CRM for SaaS Sales Teams | LeadFlow - Accelerate Your Pipeline",
  description:
    "LeadFlow is the ideal CRM for SaaS sales teams. Track MRR, manage subscription lifecycles, automate outreach sequences, and close more recurring revenue deals faster.",
  keywords: [
    "SaaS CRM",
    "CRM for SaaS companies",
    "SaaS sales management",
    "subscription sales CRM",
    "B2B SaaS CRM",
    "MRR tracking",
    "SaaS pipeline management",
    "recurring revenue CRM",
  ],
  openGraph: {
    title: "CRM for SaaS Sales Teams | LeadFlow",
    description:
      "The complete CRM for SaaS sales teams. Track MRR, manage pipelines, and close more recurring revenue deals.",
    url: "https://leadflow.com/resources/industry-solutions/saas-sales",
    type: "website",
  },
};

export default function SaaSSalesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
