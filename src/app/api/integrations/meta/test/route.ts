import { NextRequest, NextResponse } from "next/server";
import { getAuthContext } from "@/lib/auth/context";
import { db } from "@/lib/db";
import {
  metaPages,
  metaForms,
  leadIngestRoutes,
  leadFieldMappings,
  pipelines,
  pipelineStages,
} from "@/lib/db/schema";
import { eq, and, isNull } from "drizzle-orm";

// Default field mappings for preview
const DEFAULT_FIELD_MAPPINGS: Record<string, string> = {
  email: "email",
  phone_number: "phone",
  full_name: "fullName",
  first_name: "firstName",
  last_name: "lastName",
  company_name: "company",
  job_title: "position",
};

/**
 * POST /api/integrations/meta/test
 *
 * Dry-run a test lead to preview processing without creating real data.
 */
export async function POST(request: NextRequest) {
  try {
    const ctx = await getAuthContext();
    if (!ctx) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { pageId, formId, fieldData } = body as {
      pageId?: string;
      formId?: string;
      fieldData?: Record<string, string>;
    };

    if (!pageId) {
      return NextResponse.json(
        { error: "pageId is required" },
        { status: 400 }
      );
    }

    if (!fieldData || Object.keys(fieldData).length === 0) {
      return NextResponse.json(
        { error: "fieldData is required" },
        { status: 400 }
      );
    }

    // Step 1: Find the page
    const page = await db.query.metaPages.findFirst({
      where: and(
        eq(metaPages.pageId, pageId),
        eq(metaPages.orgId, ctx.org.id),
        eq(metaPages.isActive, true)
      ),
    });

    if (!page) {
      return NextResponse.json({
        success: false,
        step: "page_lookup",
        error: `Geen actieve pagina gevonden met ID ${pageId}`,
        suggestion: "Controleer of de pagina correct is gekoppeld en actief is.",
      });
    }

    // Step 2: Find routing rule
    let route = null;

    // Try form-specific route first
    if (formId) {
      const form = await db.query.metaForms.findFirst({
        where: and(
          eq(metaForms.pageId, page.id),
          eq(metaForms.formId, formId)
        ),
      });

      if (form) {
        route = await db.query.leadIngestRoutes.findFirst({
          where: and(
            eq(leadIngestRoutes.metaPageId, page.id),
            eq(leadIngestRoutes.metaFormId, form.id),
            eq(leadIngestRoutes.isActive, true)
          ),
        });
      }
    }

    // Fall back to page-level route
    if (!route) {
      route = await db.query.leadIngestRoutes.findFirst({
        where: and(
          eq(leadIngestRoutes.metaPageId, page.id),
          isNull(leadIngestRoutes.metaFormId),
          eq(leadIngestRoutes.isActive, true)
        ),
      });
    }

    if (!route) {
      return NextResponse.json({
        success: false,
        step: "routing",
        error: `Geen routing regel gevonden voor pagina "${page.pageName}"${formId ? ` met form ${formId}` : ""}`,
        suggestion: "Maak een routing regel aan voor deze pagina/form combinatie.",
        page: {
          id: page.id,
          pageId: page.pageId,
          pageName: page.pageName,
        },
      });
    }

    // Step 3: Get field mappings
    const customMappings = await db.query.leadFieldMappings.findMany({
      where: eq(leadFieldMappings.routeId, route.id),
    });

    // Build mapping lookup
    const mappingLookup = new Map<string, { target: string; transform?: string | null }>();
    for (const mapping of customMappings) {
      mappingLookup.set(mapping.sourceFieldKey, {
        target: mapping.targetField,
        transform: mapping.transform,
      });
    }
    for (const [source, target] of Object.entries(DEFAULT_FIELD_MAPPINGS)) {
      if (!mappingLookup.has(source)) {
        mappingLookup.set(source, { target });
      }
    }

    // Step 4: Apply mappings to test data
    const mappedContact: Record<string, string> = {};
    const mappingDetails: Array<{
      sourceField: string;
      sourceValue: string;
      targetField: string;
      mappedValue: string;
      transform?: string;
      isDefault: boolean;
    }> = [];

    for (const [sourceKey, value] of Object.entries(fieldData)) {
      const mapping = mappingLookup.get(sourceKey);
      if (!mapping) {
        mappingDetails.push({
          sourceField: sourceKey,
          sourceValue: value,
          targetField: "(niet gemapped)",
          mappedValue: "",
          isDefault: false,
        });
        continue;
      }

      let processedValue = value;
      if (mapping.transform) {
        processedValue = applyTransform(value, mapping.transform);
      }

      mappedContact[mapping.target] = processedValue;
      mappingDetails.push({
        sourceField: sourceKey,
        sourceValue: value,
        targetField: mapping.target,
        mappedValue: processedValue,
        transform: mapping.transform ?? undefined,
        isDefault: !customMappings.some((m) => m.sourceFieldKey === sourceKey),
      });
    }

    // Step 5: Get pipeline and stage info
    const [pipeline] = await db
      .select()
      .from(pipelines)
      .where(eq(pipelines.id, route.pipelineId));

    const [stage] = await db
      .select()
      .from(pipelineStages)
      .where(eq(pipelineStages.id, route.stageId));

    // Step 6: Build preview response
    const contactPreview = {
      firstName: mappedContact.firstName || null,
      lastName: mappedContact.lastName || null,
      email: mappedContact.email || null,
      phone: mappedContact.phone || null,
      company: mappedContact.company || null,
      position: mappedContact.position || null,
    };

    // Generate opportunity title like the processor does
    const fullName = mappedContact.fullName ||
      [mappedContact.firstName, mappedContact.lastName].filter(Boolean).join(" ");
    const opportunityTitle = fullName
      ? `Lead: ${fullName}`
      : mappedContact.email
        ? `Lead: ${mappedContact.email}`
        : `Meta Lead (test)`;

    return NextResponse.json({
      success: true,
      dryRun: true,
      steps: {
        pageLookup: {
          success: true,
          page: {
            id: page.id,
            pageId: page.pageId,
            pageName: page.pageName,
          },
        },
        routing: {
          success: true,
          route: {
            id: route.id,
            pipeline: pipeline?.name ?? "Onbekend",
            stage: stage?.name ?? "Onbekend",
          },
        },
        fieldMapping: {
          success: true,
          mappings: mappingDetails,
          unmappedFields: mappingDetails.filter((m) => m.targetField === "(niet gemapped)").length,
        },
      },
      preview: {
        contact: contactPreview,
        opportunity: {
          title: opportunityTitle,
          pipeline: pipeline?.name ?? "Onbekend",
          stage: stage?.name ?? "Onbekend",
        },
      },
      warnings: getWarnings(contactPreview, mappingDetails),
    });
  } catch (error) {
    console.error("[Meta Test API] Error:", error);
    return NextResponse.json(
      { error: "Test failed unexpectedly" },
      { status: 500 }
    );
  }
}

function applyTransform(value: string, transform: string): string {
  switch (transform) {
    case "lowercase":
      return value.toLowerCase();
    case "uppercase":
      return value.toUpperCase();
    case "trim":
      return value.trim();
    case "phone_format":
      return value.replace(/(?!^\+)[^\d]/g, "");
    default:
      return value;
  }
}

function getWarnings(
  contact: Record<string, string | null>,
  mappings: Array<{ targetField: string; sourceField: string }>
): string[] {
  const warnings: string[] = [];

  if (!contact.email && !contact.phone) {
    warnings.push("Geen email of telefoonnummer - lead kan niet worden gededupliceerd");
  }

  if (!contact.firstName && !contact.lastName) {
    warnings.push("Geen naam - opportunity titel zal email of ID gebruiken");
  }

  const unmapped = mappings.filter((m) => m.targetField === "(niet gemapped)");
  if (unmapped.length > 0) {
    warnings.push(
      `${unmapped.length} veld(en) niet gemapped: ${unmapped.map((m) => m.sourceField).join(", ")}`
    );
  }

  return warnings;
}
