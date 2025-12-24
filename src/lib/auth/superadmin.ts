import "server-only";

import { redirect } from "next/navigation";
import { stackServerApp } from "@/stack/server";

// Super admin emails from environment variable (comma-separated)
// Example: SUPER_ADMIN_EMAILS=admin1@example.com,admin2@example.com
function getSuperAdminEmails(): string[] {
  const emails = process.env.SUPER_ADMIN_EMAILS;
  if (!emails) return [];
  return emails.split(",").map(email => email.trim().toLowerCase());
}

/**
 * Check if an email is a super admin
 */
export function isSuperAdmin(email: string | null): boolean {
  if (!email) return false;
  return getSuperAdminEmails().includes(email.toLowerCase());
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
