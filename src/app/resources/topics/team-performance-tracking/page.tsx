import { Metadata } from "next";
import TeamPerformanceTrackingClient from "./client";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: true,
  },
  title: "Team Performance Tracking | LeadFlow",
  description: "Unite team collaboration tools with powerful analytics to monitor performance, manage permissions effectively, and drive results across your sales organization.",
};

export default function TeamPerformanceTrackingPage() {
  return <TeamPerformanceTrackingClient />;
}
