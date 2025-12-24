import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Automated Deal Tracking | LeadFlow CRM",
  description: "Combine sales automation with CRM best practices to create seamless deal tracking. Learn how automation can eliminate manual pipeline updates.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function AutomatedDealTrackingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
