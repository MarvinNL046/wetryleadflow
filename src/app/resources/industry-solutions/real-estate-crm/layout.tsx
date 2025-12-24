import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CRM for Real Estate Agents | LeadFlow - Close More Deals",
  description:
    "LeadFlow is the ultimate CRM for real estate agents. Manage buyers, sellers, and properties in one platform. Automate follow-ups, track showings, and close 40% more deals.",
  keywords: [
    "real estate CRM",
    "CRM for realtors",
    "real estate lead management",
    "realtor software",
    "property management CRM",
    "real estate agent tools",
    "buyer management software",
    "seller tracking CRM",
  ],
  openGraph: {
    title: "CRM for Real Estate Agents | LeadFlow",
    description:
      "The ultimate CRM built for real estate professionals. Manage leads, automate follow-ups, and close more deals.",
    url: "https://leadflow.com/resources/industry-solutions/real-estate-crm",
    type: "website",
  },
};

export default function RealEstateCRMLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
