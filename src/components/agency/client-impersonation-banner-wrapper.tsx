import { getAgencyClientImpersonationState } from "@/lib/auth/agency-client-impersonate";
import { ClientImpersonationBanner } from "./client-impersonation-banner";

export async function ClientImpersonationBannerWrapper() {
  const state = await getAgencyClientImpersonationState();

  if (!state) {
    return null;
  }

  return (
    <ClientImpersonationBanner
      targetOrgName={state.targetOrgName}
      targetUserEmail={state.targetUserEmail}
      agencyUserEmail={state.agencyUserEmail}
    />
  );
}
