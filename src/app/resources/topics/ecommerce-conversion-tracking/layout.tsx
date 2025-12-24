import { Metadata } from "next";

export const metadata: Metadata = {
  title: "E-commerce Conversion Tracking | LeadFlow Resources",
  description: "Unite e-commerce expertise with powerful analytics to track every conversion, optimize every funnel, and maximize revenue.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
