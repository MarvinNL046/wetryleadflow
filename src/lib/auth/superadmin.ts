import "server-only";

import { redirect } from "next/navigation";
import { stackServerApp } from "@/stack/server";

// Add your email(s) here to grant super admin access
const SUPER_ADMINS = [
  "marvinsmit1988@gmail.com",
];

/**
 * Check if an email is a super admin
 */
export function isSuperAdmin(email: string | null): boolean {
  if (!email) return false;
  return SUPER_ADMINS.includes(email.toLowerCase());
}

/**
 * Get current user if they are a super admin
 */
export async function getSuperAdmin() {
  const user = await stackServerApp.getUser();
  if (!user || !isSuperAdmin(user.primaryEmail)) {
    return null;
  }
  return user;
}

/**
 * Require super admin access - redirects if not authorized
 */
export async function requireSuperAdmin() {
  const user = await stackServerApp.getUser();

  if (!user) {
    redirect("/handler/sign-in");
  }

  if (!isSuperAdmin(user.primaryEmail)) {
    redirect("/unauthorized");
  }

  return user;
}
