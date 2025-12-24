import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Smart Notification Analytics | LeadFlow Resources",
  description: "Unite intelligent notifications with powerful analytics to respond faster, measure effectiveness, and optimize your sales strategy.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
