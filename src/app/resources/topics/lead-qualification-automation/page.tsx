import { Metadata } from "next";
import LeadQualificationAutomationClient from "./client";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: true,
  },
  title: "Lead Qualification Automation | LeadFlow",
  description: "Combine powerful lead generation strategies with AI-driven automation to qualify leads faster, route them smarter, and close more deals.",
};

export default function LeadQualificationAutomationPage() {
  return <LeadQualificationAutomationClient />;
}
