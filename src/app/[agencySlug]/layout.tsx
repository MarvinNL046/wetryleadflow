import { notFound } from "next/navigation";
import { getAgencyBySlug } from "@/lib/agency/get-agency";
import { AgencyProvider } from "@/components/providers/agency-provider";
import type { Metadata } from "next";

interface AgencyLayoutProps {
  children: React.ReactNode;
  params: Promise<{ agencySlug: string }>;
}

export default async function AgencyLayout({
  children,
  params,
}: AgencyLayoutProps) {
  const { agencySlug } = await params;
  const agency = await getAgencyBySlug(agencySlug);

  if (!agency) {
    notFound();
  }

  return (
    <AgencyProvider agency={agency}>
      <div className="agency-themed">{children}</div>
    </AgencyProvider>
  );
}

export async function generateMetadata({
  params,
}: AgencyLayoutProps): Promise<Metadata> {
  const { agencySlug } = await params;
  const agency = await getAgencyBySlug(agencySlug);

  if (!agency) {
    return {
      title: "Not Found",
    };
  }

  return {
    title: {
      default: agency.appName || agency.name,
      template: `%s | ${agency.appName || agency.name}`,
    },
    description: `${agency.name} - CRM Platform`,
  };
}
