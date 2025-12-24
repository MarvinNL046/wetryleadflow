import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Real Estate Pipeline Management | LeadFlow Topic Hub",
  description:
    "Master real estate pipeline management with LeadFlow. Combine industry-specific features with visual pipeline tools to track every listing and close more deals.",
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: "Real Estate Pipeline Management | LeadFlow",
    description:
      "Combine real estate CRM features with powerful pipeline management tools for maximum closings.",
    url: "https://leadflow.com/resources/topics/real-estate-pipeline-management",
    type: "website",
  },
};

export default function RealEstatePipelineManagementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
