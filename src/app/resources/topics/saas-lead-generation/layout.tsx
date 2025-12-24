import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SaaS Lead Generation | LeadFlow Topic Hub",
  description:
    "Supercharge SaaS lead generation with LeadFlow. Combine SaaS-specific CRM features with powerful lead capture tools to fill your pipeline and convert more trials.",
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: "SaaS Lead Generation | LeadFlow",
    description:
      "Combine SaaS CRM features with powerful lead generation tools for predictable MRR growth.",
    url: "https://leadflow.com/resources/topics/saas-lead-generation",
    type: "website",
  },
};

export default function SaaSLeadGenerationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
