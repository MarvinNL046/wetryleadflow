import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meta Ads Pipeline Integration | LeadFlow Resources",
  description: "Connect your Meta advertising campaigns directly to your sales pipeline. Learn how to create a seamless flow from Facebook and Instagram lead ads to closed deals.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
