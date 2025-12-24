import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Lead Scoring Strategies | LeadFlow Resources",
  description: "Combine the power of artificial intelligence with proven lead generation techniques. Learn how AI-driven scoring models work with lead magnets and form optimization to identify your most valuable prospects.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
