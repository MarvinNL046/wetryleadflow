import { Suspense } from "react";
import { AgencySidebar } from "@/components/agency/sidebar";
import { ImpersonationBannerWrapper } from "@/components/agency/impersonation-banner-wrapper";
import { getAgencyImpersonationState } from "@/lib/auth/agency";
import { cn } from "@/lib/utils";

export default async function AgencyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Check if super-admin is impersonating
  const impersonationState = await getAgencyImpersonationState();
  const hasImpersonationBanner = !!impersonationState;

  return (
    <div className={cn("flex min-h-screen", hasImpersonationBanner && "pt-10")}>
      {/* Impersonation Banner (for super-admins) */}
      <Suspense fallback={null}>
        <ImpersonationBannerWrapper />
      </Suspense>

      {/* Sidebar */}
      <AgencySidebar hasImpersonationBanner={hasImpersonationBanner} />

      {/* Main content */}
      <main className={cn(
        "dashboard-bg flex-1 overflow-auto",
        hasImpersonationBanner && "pt-10"
      )}>
        <div className="relative z-10">{children}</div>
      </main>
    </div>
  );
}
