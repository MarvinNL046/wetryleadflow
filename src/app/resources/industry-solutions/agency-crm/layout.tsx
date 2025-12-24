import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CRM for Marketing Agencies | LeadFlow - Manage Clients & Campaigns",
  description:
    "LeadFlow is the perfect CRM for marketing agencies. Track client relationships, manage campaign leads, streamline proposals, and grow your agency with powerful automation.",
  keywords: [
    "marketing agency CRM",
    "CRM for agencies",
    "client management software",
    "agency lead tracking",
    "digital agency CRM",
    "campaign management",
    "agency client portal",
    "marketing agency software",
  ],
  openGraph: {
    title: "CRM for Marketing Agencies | LeadFlow",
    description:
      "The complete CRM solution for marketing agencies. Manage clients, track campaigns, and scale your agency.",
    url: "https://leadflow.com/resources/industry-solutions/agency-crm",
    type: "website",
  },
};

export default function AgencyCRMLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
