import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Segmentation & Analytics | LeadFlow Resources",
  description: "Transform raw contact data into actionable insights. Learn how strategic segmentation combined with powerful analytics creates a data-driven approach to understanding and converting your leads.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
