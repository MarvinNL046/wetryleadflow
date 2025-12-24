import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Consultant Pipeline Management | LeadFlow Resources",
  description: "Merge consultant-specific CRM strategies with advanced pipeline management to win more clients and grow your consulting practice.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
