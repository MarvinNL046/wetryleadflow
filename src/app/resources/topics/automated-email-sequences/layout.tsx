import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Automated Email Sequences | LeadFlow Resources",
  description: "Master the art of automated follow-ups combined with CRM best practices. Build email sequences that nurture leads through every stage of your pipeline.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
