import { Metadata } from "next";
import CrmDataMigrationClient from "./client";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: true,
  },
  title: "CRM Data Migration | LeadFlow",
  description: "Combine CRM migration expertise with contact management best practices to move your data safely, maintain hygiene, and hit the ground running.",
};

export default function CrmDataMigrationPage() {
  return <CrmDataMigrationClient />;
}
