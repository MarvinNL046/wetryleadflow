import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meta Audience Targeting - LeadFlow",
  description: "Connect your Meta advertising with intelligent contact management to create a closed-loop lead generation system.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function MetaAudienceTargetingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
