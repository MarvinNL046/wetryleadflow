import { db } from "@/lib/db";
import { agencies } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { NextResponse } from "next/server";

/**
 * HEAD /api/agency/validate?slug=xxx
 * Returns 200 if agency exists and is active, 404 otherwise
 */
export async function HEAD(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return new NextResponse(null, { status: 400 });
  }

  const [agency] = await db
    .select({ id: agencies.id })
    .from(agencies)
    .where(and(eq(agencies.slug, slug.toLowerCase()), eq(agencies.isActive, true)))
    .limit(1);

  if (agency) {
    return new NextResponse(null, { status: 200 });
  }

  return new NextResponse(null, { status: 404 });
}

/**
 * GET /api/agency/validate?slug=xxx
 * Returns agency basic info if exists, for debugging/testing
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return NextResponse.json({ error: "slug required" }, { status: 400 });
  }

  const [agency] = await db
    .select({
      id: agencies.id,
      slug: agencies.slug,
      name: agencies.name,
      isActive: agencies.isActive,
    })
    .from(agencies)
    .where(eq(agencies.slug, slug.toLowerCase()))
    .limit(1);

  if (agency) {
    return NextResponse.json({ valid: true, agency });
  }

  return NextResponse.json({ valid: false }, { status: 404 });
}
