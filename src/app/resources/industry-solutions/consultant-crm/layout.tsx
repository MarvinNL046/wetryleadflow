import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CRM for Consultants & Freelancers | LeadFlow - Grow Your Practice",
  description:
    "LeadFlow is the ideal CRM for consultants and freelancers. Track prospects, manage projects, automate follow-ups, and grow your consulting practice with ease.",
  keywords: [
    "consultant CRM",
    "freelancer CRM",
    "CRM for independent consultants",
    "consulting lead management",
    "freelance client management",
    "solo business CRM",
    "professional services CRM",
    "consulting sales management",
  ],
  openGraph: {
    title: "CRM for Consultants & Freelancers | LeadFlow",
    description:
      "The complete CRM for consultants and freelancers. Track prospects, manage clients, and grow your practice.",
    url: "https://leadflow.com/resources/industry-solutions/consultant-crm",
    type: "website",
  },
};

export default function ConsultantCRMLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
