import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Automated Lead Routing - LeadFlow",
  description: "Combine intelligent automation with lead generation best practices to ensure every lead reaches the right sales rep instantly.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function AutomatedLeadRoutingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
