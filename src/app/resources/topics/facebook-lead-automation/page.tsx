import { Metadata } from "next";
import FacebookLeadAutomationClient from "./client";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: true,
  },
  title: "Facebook Lead Automation | LeadFlow",
  description: "Connect Meta advertising with sales automation to capture Facebook leads instantly, trigger follow-up sequences automatically, and convert social traffic.",
};

export default function FacebookLeadAutomationPage() {
  return <FacebookLeadAutomationClient />;
}
