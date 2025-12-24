import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Team CRM Collaboration | LeadFlow Resources",
  description: "Build a CRM environment where your entire team thrives. Learn how to combine collaboration features with best practices for customization, permissions, and data hygiene.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
