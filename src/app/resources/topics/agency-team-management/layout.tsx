import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agency Team Management | LeadFlow Topic Hub",
  description:
    "Streamline agency team management with LeadFlow. Combine agency-specific CRM features with powerful collaboration tools to keep your team aligned on client work.",
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: "Agency Team Management | LeadFlow",
    description:
      "Combine agency CRM features with team collaboration tools for client success.",
    url: "https://leadflow.com/resources/topics/agency-team-management",
    type: "website",
  },
};

export default function AgencyTeamManagementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
