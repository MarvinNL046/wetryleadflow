"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  FlaskConical,
  Play,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ArrowRight,
  Loader2,
  User,
  Mail,
  Phone,
  Building2,
  Briefcase,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface Page {
  id: number;
  pageId: string;
  pageName: string;
  isActive: boolean;
}

interface TestResult {
  success: boolean;
  dryRun?: boolean;
  step?: string;
  error?: string;
  suggestion?: string;
  steps?: {
    pageLookup: {
      success: boolean;
      page: { id: number; pageId: string; pageName: string };
    };
    routing: {
      success: boolean;
      route: { id: number; pipeline: string; stage: string };
    };
    fieldMapping: {
      success: boolean;
      mappings: Array<{
        sourceField: string;
        sourceValue: string;
        targetField: string;
        mappedValue: string;
        transform?: string;
        isDefault: boolean;
      }>;
      unmappedFields: number;
    };
  };
  preview?: {
    contact: {
      firstName: string | null;
      lastName: string | null;
      email: string | null;
      phone: string | null;
      company: string | null;
      position: string | null;
    };
    opportunity: {
      title: string;
      pipeline: string;
      stage: string;
    };
  };
  warnings?: string[];
}

// Sample test data templates
const testTemplates = {
  basic: {
    name: "Basis Lead",
    data: {
      email: "test@voorbeeld.nl",
      full_name: "Jan de Vries",
      phone_number: "+31612345678",
    },
  },
  complete: {
    name: "Volledige Lead",
    data: {
      email: "info@bedrijf.nl",
      first_name: "Marie",
      last_name: "Jansen",
      phone_number: "+31687654321",
      company_name: "Jansen B.V.",
      job_title: "Marketing Manager",
    },
  },
  minimal: {
    name: "Minimale Lead",
    data: {
      email: "minimal@test.nl",
    },
  },
};

export default function LeadTestPage() {
  const [pages, setPages] = useState<Page[]>([]);
  const [selectedPage, setSelectedPage] = useState<string>("");
  const [formId, setFormId] = useState<string>("");
  const [fieldData, setFieldData] = useState<Record<string, string>>({
    email: "",
    full_name: "",
    phone_number: "",
    company_name: "",
    job_title: "",
  });
  const [loading, setLoading] = useState(false);
  const [loadingPages, setLoadingPages] = useState(true);
  const [result, setResult] = useState<TestResult | null>(null);

  useEffect(() => {
    async function fetchPages() {
      try {
        const res = await fetch("/api/integrations/meta/health");
        if (res.ok) {
          const data = await res.json();
          setPages(data.pages || []);
          if (data.pages?.length > 0) {
            setSelectedPage(data.pages[0].pageId);
          }
        }
      } catch (error) {
        console.error("Failed to fetch pages:", error);
      } finally {
        setLoadingPages(false);
      }
    }
    fetchPages();
  }, []);

  const handleTest = async () => {
    if (!selectedPage) return;

    // Filter out empty fields
    const filteredData = Object.fromEntries(
      Object.entries(fieldData).filter(([, v]) => v.trim() !== "")
    );

    if (Object.keys(filteredData).length === 0) {
      alert("Vul minimaal één veld in om te testen");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/integrations/meta/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pageId: selectedPage,
          formId: formId || undefined,
          fieldData: filteredData,
        }),
      });

      const data = await res.json();
      setResult(data);
    } catch (error) {
      console.error("Test failed:", error);
      setResult({
        success: false,
        error: "Test kon niet worden uitgevoerd",
      });
    } finally {
      setLoading(false);
    }
  };

  const applyTemplate = (templateKey: keyof typeof testTemplates) => {
    setFieldData({
      full_name: "",
      first_name: "",
      last_name: "",
      phone_number: "",
      company_name: "",
      job_title: "",
      ...testTemplates[templateKey].data,
    });
  };

  const updateField = (key: string, value: string) => {
    setFieldData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/crm/settings/integrations"
          className="mb-4 inline-flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
        >
          <ArrowLeft className="h-4 w-4" />
          Terug naar Integraties
        </Link>
        <div>
          <h1 className="flex items-center gap-3 text-3xl font-bold">
            <FlaskConical className="h-8 w-8 text-violet-500" />
            Lead Test Tool
          </h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Test je lead routing en field mappings zonder echte data aan te maken
          </p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Test Form */}
        <div className="space-y-6">
          {/* Page Selection */}
          <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="text-lg font-semibold mb-4">1. Selecteer Pagina</h2>
            {loadingPages ? (
              <div className="flex items-center gap-2 text-zinc-500">
                <Loader2 className="h-4 w-4 animate-spin" />
                Pagina&apos;s laden...
              </div>
            ) : pages.length === 0 ? (
              <div className="text-amber-600 dark:text-amber-400">
                <AlertTriangle className="h-5 w-5 inline mr-2" />
                Geen pagina&apos;s gekoppeld. Koppel eerst Meta.
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <Label>Facebook/Instagram Pagina</Label>
                  <Select value={selectedPage} onValueChange={setSelectedPage}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecteer een pagina" />
                    </SelectTrigger>
                    <SelectContent>
                      {pages.map((page) => (
                        <SelectItem key={page.pageId} value={page.pageId}>
                          {page.pageName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Form ID (optioneel)</Label>
                  <Input
                    placeholder="Laat leeg voor page-level routing"
                    value={formId}
                    onChange={(e) => setFormId(e.target.value)}
                  />
                  <p className="text-xs text-zinc-500 mt-1">
                    Vul in om form-specifieke routing te testen
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Test Data */}
          <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">2. Test Data</h2>
              <div className="flex gap-2">
                {Object.entries(testTemplates).map(([key, template]) => (
                  <Button
                    key={key}
                    variant="outline"
                    size="sm"
                    onClick={() => applyTemplate(key as keyof typeof testTemplates)}
                  >
                    {template.name}
                  </Button>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email
                </Label>
                <Input
                  placeholder="email@voorbeeld.nl"
                  value={fieldData.email || ""}
                  onChange={(e) => updateField("email", e.target.value)}
                />
              </div>
              <div>
                <Label className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Telefoonnummer
                </Label>
                <Input
                  placeholder="+31612345678"
                  value={fieldData.phone_number || ""}
                  onChange={(e) => updateField("phone_number", e.target.value)}
                />
              </div>
              <div>
                <Label className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Volledige Naam
                </Label>
                <Input
                  placeholder="Jan de Vries"
                  value={fieldData.full_name || ""}
                  onChange={(e) => updateField("full_name", e.target.value)}
                />
              </div>
              <div className="sm:col-span-2 grid grid-cols-2 gap-4">
                <div>
                  <Label>Voornaam</Label>
                  <Input
                    placeholder="Jan"
                    value={fieldData.first_name || ""}
                    onChange={(e) => updateField("first_name", e.target.value)}
                  />
                </div>
                <div>
                  <Label>Achternaam</Label>
                  <Input
                    placeholder="de Vries"
                    value={fieldData.last_name || ""}
                    onChange={(e) => updateField("last_name", e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Label className="flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  Bedrijf
                </Label>
                <Input
                  placeholder="Bedrijf B.V."
                  value={fieldData.company_name || ""}
                  onChange={(e) => updateField("company_name", e.target.value)}
                />
              </div>
              <div>
                <Label className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4" />
                  Functie
                </Label>
                <Input
                  placeholder="Marketing Manager"
                  value={fieldData.job_title || ""}
                  onChange={(e) => updateField("job_title", e.target.value)}
                />
              </div>
            </div>

            <Button
              onClick={handleTest}
              disabled={loading || !selectedPage}
              className="mt-6 w-full"
            >
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Play className="mr-2 h-4 w-4" />
              )}
              Test Uitvoeren (Dry Run)
            </Button>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-6">
          <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="text-lg font-semibold mb-4">3. Resultaat</h2>

            {!result ? (
              <div className="text-center py-12 text-zinc-500">
                <FlaskConical className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Voer een test uit om het resultaat te zien</p>
              </div>
            ) : !result.success ? (
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <XCircle className="h-6 w-6 text-red-600 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-red-800 dark:text-red-300">
                      Test Mislukt: {result.step}
                    </p>
                    <p className="text-red-700 dark:text-red-400 mt-1">
                      {result.error}
                    </p>
                    {result.suggestion && (
                      <p className="text-sm text-red-600 dark:text-red-400 mt-2">
                        💡 {result.suggestion}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Success Banner */}
                <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                  <div>
                    <p className="font-medium text-green-800 dark:text-green-300">
                      Test Geslaagd (Dry Run)
                    </p>
                    <p className="text-sm text-green-700 dark:text-green-400">
                      Alle stappen zijn succesvol doorlopen
                    </p>
                  </div>
                </div>

                {/* Warnings */}
                {result.warnings && result.warnings.length > 0 && (
                  <div className="space-y-2">
                    {result.warnings.map((warning, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg"
                      >
                        <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0" />
                        <p className="text-sm text-amber-800 dark:text-amber-300">
                          {warning}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Steps */}
                {result.steps && (
                  <div className="space-y-3">
                    <h3 className="font-medium">Verwerking Stappen</h3>

                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <span>Pagina gevonden: {result.steps.pageLookup.page.pageName}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <span>
                        Routing: {result.steps.routing.route.pipeline}{" "}
                        <ArrowRight className="inline h-4 w-4" />{" "}
                        {result.steps.routing.route.stage}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <span>
                        {result.steps.fieldMapping.mappings.length -
                          result.steps.fieldMapping.unmappedFields}{" "}
                        velden gemapped
                        {result.steps.fieldMapping.unmappedFields > 0 && (
                          <span className="text-amber-600">
                            {" "}
                            ({result.steps.fieldMapping.unmappedFields} niet gemapped)
                          </span>
                        )}
                      </span>
                    </div>
                  </div>
                )}

                {/* Field Mappings */}
                {result.steps?.fieldMapping && (
                  <div>
                    <h3 className="font-medium mb-3">Field Mappings</h3>
                    <div className="space-y-2">
                      {result.steps.fieldMapping.mappings.map((mapping, i) => (
                        <div
                          key={i}
                          className={cn(
                            "flex items-center justify-between p-2 rounded text-sm",
                            mapping.targetField === "(niet gemapped)"
                              ? "bg-amber-50 dark:bg-amber-900/20"
                              : "bg-zinc-50 dark:bg-zinc-800"
                          )}
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-zinc-600 dark:text-zinc-400">
                              {mapping.sourceField}
                            </span>
                            <ArrowRight className="h-4 w-4 text-zinc-400" />
                            <span
                              className={cn(
                                "font-medium",
                                mapping.targetField === "(niet gemapped)" &&
                                  "text-amber-600 dark:text-amber-400"
                              )}
                            >
                              {mapping.targetField}
                            </span>
                            {mapping.isDefault && (
                              <span className="text-xs text-zinc-400">(default)</span>
                            )}
                            {mapping.transform && (
                              <span className="text-xs bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 px-1.5 py-0.5 rounded">
                                {mapping.transform}
                              </span>
                            )}
                          </div>
                          <span className="text-zinc-500 truncate max-w-[150px]">
                            {mapping.mappedValue || mapping.sourceValue}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Preview */}
                {result.preview && (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <h4 className="font-medium text-blue-900 dark:text-blue-300 mb-2">
                        Contact Preview
                      </h4>
                      <div className="space-y-1 text-sm">
                        <p>
                          <span className="text-zinc-500">Naam:</span>{" "}
                          {result.preview.contact.firstName || result.preview.contact.lastName
                            ? `${result.preview.contact.firstName || ""} ${result.preview.contact.lastName || ""}`.trim()
                            : "-"}
                        </p>
                        <p>
                          <span className="text-zinc-500">Email:</span>{" "}
                          {result.preview.contact.email || "-"}
                        </p>
                        <p>
                          <span className="text-zinc-500">Telefoon:</span>{" "}
                          {result.preview.contact.phone || "-"}
                        </p>
                        <p>
                          <span className="text-zinc-500">Bedrijf:</span>{" "}
                          {result.preview.contact.company || "-"}
                        </p>
                      </div>
                    </div>

                    <div className="p-4 bg-violet-50 dark:bg-violet-900/20 rounded-lg">
                      <h4 className="font-medium text-violet-900 dark:text-violet-300 mb-2">
                        Opportunity Preview
                      </h4>
                      <div className="space-y-1 text-sm">
                        <p>
                          <span className="text-zinc-500">Titel:</span>{" "}
                          {result.preview.opportunity.title}
                        </p>
                        <p>
                          <span className="text-zinc-500">Pipeline:</span>{" "}
                          {result.preview.opportunity.pipeline}
                        </p>
                        <p>
                          <span className="text-zinc-500">Stage:</span>{" "}
                          {result.preview.opportunity.stage}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
