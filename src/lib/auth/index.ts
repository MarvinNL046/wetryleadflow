import "server-only";

import { stackServerApp } from "@/stack/server";
import { redirect } from "next/navigation";

/**
 * Get the current Stack Auth user (or null if not logged in)
 */
export async function getCurrentStackUser() {
  const user = await stackServerApp.getUser();
  return user;
}

/**
 * Require authentication - redirects to login if not authenticated
 */
export async function requireAuth() {
  const user = await stackServerApp.getUser();
  if (!user) {
    redirect("/handler/sign-in");
  }
  return user;
}

/**
 * Get current user ID from Stack Auth
 */
export async function getCurrentUserId() {
  const user = await getCurrentStackUser();
  return user?.id ?? null;
}
