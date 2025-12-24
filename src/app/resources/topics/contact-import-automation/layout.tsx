import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Import Automation | LeadFlow CRM",
  description: "Transform bulk contact imports into automated engagement workflows. Learn how to seamlessly import contacts and trigger personalized nurture sequences.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function ContactImportAutomationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
