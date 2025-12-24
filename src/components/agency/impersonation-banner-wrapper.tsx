import { getAgencyImpersonationState } from "@/lib/auth/agency";
import { ImpersonationBanner } from "./impersonation-banner";

export async function ImpersonationBannerWrapper() {
  const state = await getAgencyImpersonationState();

  if (!state) {
    return null;
  }

  return (
    <ImpersonationBanner
      agencyName={state.agencyName}
      adminEmail={state.adminUserEmail}
    />
  );
}
