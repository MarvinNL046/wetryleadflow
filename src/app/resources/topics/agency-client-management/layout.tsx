import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agency Client Management | LeadFlow Resources",
  description: "Master agency client management by combining industry-specific CRM strategies with powerful contact management tools.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
