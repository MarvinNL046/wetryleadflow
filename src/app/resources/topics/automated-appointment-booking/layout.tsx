import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Automated Appointment Booking | LeadFlow Resources",
  description: "Combine powerful scheduling automation with seamless team collaboration to book more meetings and convert more leads.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
