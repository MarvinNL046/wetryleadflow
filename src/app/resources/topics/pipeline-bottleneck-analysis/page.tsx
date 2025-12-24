import { Metadata } from "next";
import PipelineBottleneckAnalysisClient from "./client";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: true,
  },
  title: "Pipeline Bottleneck Analysis | LeadFlow",
  description: "Combine pipeline visibility with advanced analytics to identify exactly where deals stall, why they stall, and how to fix it with data-driven strategies.",
};

export default function PipelineBottleneckAnalysisPage() {
  return <PipelineBottleneckAnalysisClient />;
}
