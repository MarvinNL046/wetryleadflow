import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Permission-Based Analytics | LeadFlow CRM",
  description: "Give every team member the analytics they need without exposing sensitive data. Learn how to combine role-based permissions with powerful sales analytics.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function PermissionBasedAnalyticsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
