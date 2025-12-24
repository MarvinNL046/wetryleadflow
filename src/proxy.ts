import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Agency slug pattern (letters, numbers, hyphens, at least 2 chars)
const AGENCY_SLUG_PATTERN = /^[a-z0-9][a-z0-9-]*[a-z0-9]$|^[a-z0-9]{1}$/;

// Reserved paths that can't be agency slugs
const RESERVED_PATHS = new Set([
  "api",
  "admin",
  "agency",
  "agency-signup",
  "crm",
  "settings",
  "auth",
  "handler",
  "webhooks",
  "_next",
  "static",
  "favicon.ico",
  "robots.txt",
  "sitemap.xml",
  "sitemap",
  "blog",
  "pricing",
  "about",
  "contact",
  "terms",
  "privacy",
  "help",
  "support",
  "resources",
  "features",
  "demo",
  "login",
  "signup",
  "register",
  "unauthorized",
]);

// Reserved subdomains that are NOT agency subdomains
const RESERVED_SUBDOMAINS = new Set([
  "www",
  "app",
  "api",
  "admin",
  "blog",
  "docs",
  "help",
  "support",
  "status",
  "mail",
  "smtp",
  "cdn",
  "static",
  "assets",
  "images",
  "staging",
  "dev",
  "test",
  "demo",
]);

/**
 * Get the root domain from environment or derive from host
 * Examples:
 * - leadflow.com
 * - wetryleadflow.com
 * - localhost:3000
 */
function getRootDomain(host: string): string {
  // For local development
  if (host.includes("localhost") || host.includes("127.0.0.1")) {
    return host.split(":")[0]; // localhost
  }

  // Production: get from env or extract from host
  if (process.env.NEXT_PUBLIC_ROOT_DOMAIN) {
    return process.env.NEXT_PUBLIC_ROOT_DOMAIN;
  }

  // Extract root domain (last 2 parts: domain.com)
  const parts = host.split(".");
  if (parts.length >= 2) {
    return parts.slice(-2).join(".");
  }

  return host;
}

/**
 * Extract subdomain from host
 * Examples:
 * - "marketing-xyz.leadflow.com" → "marketing-xyz"
 * - "leadflow.com" → null
 * - "www.leadflow.com" → null (reserved)
 * - "localhost:3000" → null
 */
function extractSubdomain(host: string, rootDomain: string): string | null {
  // Remove port if present
  const hostWithoutPort = host.split(":")[0];
  const rootWithoutPort = rootDomain.split(":")[0];

  // Check if host is exactly the root domain
  if (hostWithoutPort === rootWithoutPort || hostWithoutPort === `www.${rootWithoutPort}`) {
    return null;
  }

  // Extract subdomain
  if (hostWithoutPort.endsWith(`.${rootWithoutPort}`)) {
    const subdomain = hostWithoutPort.slice(0, -(rootWithoutPort.length + 1));

    // Check if it's a reserved subdomain
    if (RESERVED_SUBDOMAINS.has(subdomain.toLowerCase())) {
      return null;
    }

    // Validate it looks like an agency slug
    if (AGENCY_SLUG_PATTERN.test(subdomain.toLowerCase())) {
      return subdomain.toLowerCase();
    }
  }

  return null;
}

export async function proxy(request: NextRequest) {
  const url = request.nextUrl;
  const pathname = url.pathname;
  const host = request.headers.get("host") || "";

  // Get root domain
  const rootDomain = getRootDomain(host);

  // Check for agency subdomain (e.g., marketing-xyz.leadflow.com)
  const agencySubdomain = extractSubdomain(host, rootDomain);

  if (agencySubdomain) {
    // Validate agency exists
    try {
      const validateUrl = new URL("/api/agency/validate", url.origin);
      validateUrl.searchParams.set("slug", agencySubdomain);

      const response = await fetch(validateUrl, {
        method: "HEAD",
        headers: {
          cookie: request.headers.get("cookie") || "",
        },
      });

      if (response.ok) {
        // Valid agency subdomain - rewrite to path-based route
        // marketing-xyz.leadflow.com/crm → /marketing-xyz/crm
        // marketing-xyz.leadflow.com/signup → /marketing-xyz/signup
        const rewriteUrl = url.clone();
        rewriteUrl.pathname = `/${agencySubdomain}${pathname}`;

        // Add header so pages know they're accessed via subdomain
        const response = NextResponse.rewrite(rewriteUrl);
        response.headers.set("x-agency-subdomain", agencySubdomain);
        response.headers.set("x-agency-host", host);
        return response;
      } else {
        // Invalid agency subdomain - redirect to main site
        const mainUrl = new URL(pathname, `https://${rootDomain}`);
        return NextResponse.redirect(mainUrl);
      }
    } catch (error) {
      console.error("[Proxy] Subdomain validation failed:", agencySubdomain, error);
      // On error, try to continue
    }
  }

  // Path-based routing (fallback / traditional)
  const segments = pathname.split("/").filter(Boolean);

  // Skip if no segments or starts with reserved path
  if (segments.length === 0) {
    return NextResponse.next();
  }

  const firstSegment = segments[0].toLowerCase();

  // Skip reserved paths
  if (RESERVED_PATHS.has(firstSegment)) {
    return NextResponse.next();
  }

  // Check if first segment matches agency slug pattern
  if (AGENCY_SLUG_PATTERN.test(firstSegment)) {
    // Validate agency exists by calling our validation API
    try {
      const validateUrl = new URL("/api/agency/validate", url.origin);
      validateUrl.searchParams.set("slug", firstSegment);

      const response = await fetch(validateUrl, {
        method: "HEAD",
        headers: {
          cookie: request.headers.get("cookie") || "",
        },
      });

      if (response.ok) {
        // Valid agency - let the [agencySlug] route handle it
        return NextResponse.next();
      }
    } catch {
      console.error("[Proxy] Agency validation failed for:", firstSegment);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
