import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Consultant Client Tracking | LeadFlow Topic Hub",
  description:
    "Streamline consultant client tracking with LeadFlow. Combine consultant-specific CRM features with powerful contact management tools for better client relationships.",
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: "Consultant Client Tracking | LeadFlow",
    description:
      "Combine consultant CRM features with contact management tools for exceptional client service.",
    url: "https://leadflow.com/resources/topics/consultant-client-tracking",
    type: "website",
  },
};

export default function ConsultantClientTrackingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
