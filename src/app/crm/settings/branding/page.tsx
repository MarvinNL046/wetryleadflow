"use client";

import { useState, useEffect } from "react";
import { Palette, Image, Eye, Lock, Building2, ExternalLink } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface BrandingInfo {
  // Source info
  isAgencyClient: boolean;
  agencyName: string | null;
  // Branding values
  appName: string;
  logoUrl: string | null;
  primaryColor: string;
  secondaryColor: string;
  // Company info (for standalone)
  companyName: string | null;
  companyLogo: string | null;
}

const defaultBranding: BrandingInfo = {
  isAgencyClient: false,
  agencyName: null,
  appName: "LeadFlow",
  logoUrl: null,
  primaryColor: "#8b5cf6",
  secondaryColor: "#3b82f6",
  companyName: null,
  companyLogo: null,
};

export default function WorkspaceBrandingPage() {
  const [branding, setBranding] = useState<BrandingInfo>(defaultBranding);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadBranding();
  }, []);

  async function loadBranding() {
    try {
      const response = await fetch("/api/settings/branding");
      if (response.ok) {
        const data = await response.json();
        setBranding(data);
      }
    } catch (error) {
      console.error("Failed to load branding:", error);
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Header */}
      <div className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto max-w-4xl px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Branding</h1>
              <p className="mt-1 text-zinc-500">
                Bekijk de branding voor je documenten en emails
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/crm/settings">
                ← Terug naar Instellingen
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl p-8">
        {/* Agency Client Notice */}
        {branding.isAgencyClient && (
          <div className="mb-8 rounded-lg border border-violet-200 bg-gradient-to-r from-violet-50 to-purple-50 p-6 dark:border-violet-800 dark:from-violet-950/50 dark:to-purple-950/50">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 text-white">
                <Lock className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">Branding beheerd door {branding.agencyName}</h3>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                  Je branding wordt centraal beheerd door je agency partner.
                  Neem contact met hen op als je wijzigingen wilt doorvoeren.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Standalone Notice */}
        {!branding.isAgencyClient && (
          <div className="mb-8 rounded-lg border border-blue-200 bg-gradient-to-r from-blue-50 to-cyan-50 p-6 dark:border-blue-800 dark:from-blue-950/50 dark:to-cyan-950/50">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
                <Building2 className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">LeadFlow Branding</h3>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                  Je documenten en emails gebruiken de standaard LeadFlow branding.
                  Je bedrijfslogo uit de factuurinstellingen wordt wel gebruikt op documenten.
                </p>
                <Button variant="outline" size="sm" className="mt-3" asChild>
                  <Link href="/crm/invoicing/settings">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Factuurinstellingen
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Current Branding */}
          <div className="space-y-6">
            {/* App Name */}
            <Card className="border-zinc-200/50 bg-white/50 dark:border-zinc-800/50 dark:bg-zinc-900/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Building2 className="h-5 w-5 text-violet-500" />
                  App Naam
                </CardTitle>
                <CardDescription>
                  Naam weergegeven in emails en documenten
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 dark:border-zinc-700 dark:bg-zinc-800">
                  <span className="font-medium">{branding.appName}</span>
                </div>
              </CardContent>
            </Card>

            {/* Logo */}
            <Card className="border-zinc-200/50 bg-white/50 dark:border-zinc-800/50 dark:bg-zinc-900/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Image className="h-5 w-5 text-violet-500" />
                  Logo
                </CardTitle>
                <CardDescription>
                  Logo voor sidebar, emails en documenten
                </CardDescription>
              </CardHeader>
              <CardContent>
                {branding.logoUrl || branding.companyLogo ? (
                  <div className="flex items-center gap-4 rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-800">
                    <img
                      src={branding.logoUrl || branding.companyLogo || ""}
                      alt="Logo"
                      className="h-12 max-w-[120px] object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                    <span className="text-sm text-zinc-500">Huidige logo</span>
                  </div>
                ) : (
                  <div className="rounded-lg border border-dashed border-zinc-300 bg-zinc-50 px-4 py-6 text-center dark:border-zinc-700 dark:bg-zinc-800">
                    <Image className="mx-auto h-8 w-8 text-zinc-400" />
                    <p className="mt-2 text-sm text-zinc-500">Geen logo ingesteld</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Colors */}
            <Card className="border-zinc-200/50 bg-white/50 dark:border-zinc-800/50 dark:bg-zinc-900/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Palette className="h-5 w-5 text-violet-500" />
                  Kleuren
                </CardTitle>
                <CardDescription>
                  Kleuren gebruikt in emails en documenten
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm text-zinc-500">Primaire kleur</label>
                    <div className="flex items-center gap-3 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-800">
                      <div
                        className="h-6 w-6 rounded border border-zinc-300"
                        style={{ backgroundColor: branding.primaryColor }}
                      />
                      <span className="font-mono text-sm">{branding.primaryColor}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-zinc-500">Secundaire kleur</label>
                    <div className="flex items-center gap-3 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-800">
                      <div
                        className="h-6 w-6 rounded border border-zinc-300"
                        style={{ backgroundColor: branding.secondaryColor }}
                      />
                      <span className="font-mono text-sm">{branding.secondaryColor}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preview */}
          <div className="space-y-4">
            <h3 className="flex items-center gap-2 text-lg font-semibold">
              <Eye className="h-5 w-5 text-violet-500" />
              Preview
            </h3>

            {/* Email Preview */}
            <Card className="overflow-hidden border-zinc-200/50 dark:border-zinc-800/50">
              <CardHeader className="bg-zinc-100 pb-2 dark:bg-zinc-800">
                <CardTitle className="text-sm text-zinc-500">Email Preview</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="bg-white p-6 dark:bg-zinc-900">
                  {/* Email Header */}
                  <div className="mb-4 flex items-center gap-3 border-b border-zinc-100 pb-4 dark:border-zinc-800">
                    {(branding.logoUrl || branding.companyLogo) ? (
                      <img
                        src={branding.logoUrl || branding.companyLogo || ""}
                        alt="Logo"
                        className="h-8 max-w-[100px] object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                    ) : (
                      <span
                        className="text-lg font-bold"
                        style={{ color: branding.primaryColor }}
                      >
                        {branding.appName}
                      </span>
                    )}
                  </div>

                  {/* Badge */}
                  <div className="mb-3 text-center">
                    <span
                      className="inline-block rounded-full px-3 py-1 text-xs font-semibold text-white"
                      style={{ backgroundColor: branding.primaryColor }}
                    >
                      FACTUUR
                    </span>
                  </div>

                  {/* Content */}
                  <div className="space-y-2 text-sm">
                    <p className="text-center font-semibold">Factuur #FAC-2024-001</p>
                    <p className="text-zinc-500">Beste klant,</p>
                    <p className="text-zinc-500">Hierbij uw factuur...</p>
                  </div>

                  {/* Button */}
                  <div className="mt-4 text-center">
                    <button
                      className="rounded-lg px-6 py-2 text-sm font-medium text-white"
                      style={{
                        background: `linear-gradient(135deg, ${branding.primaryColor} 0%, ${branding.secondaryColor} 100%)`,
                      }}
                    >
                      Bekijk Factuur
                    </button>
                  </div>

                  {/* Footer */}
                  <p className="mt-6 text-center text-xs text-zinc-400">
                    Deze e-mail is verzonden via {branding.appName}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Color Palette */}
            <Card className="border-zinc-200/50 bg-white/50 dark:border-zinc-800/50 dark:bg-zinc-900/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Kleurenpalet</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <div className="flex-1 space-y-1">
                    <div
                      className="h-12 rounded-lg"
                      style={{ backgroundColor: branding.primaryColor }}
                    />
                    <p className="text-center text-xs text-zinc-500">Primair</p>
                  </div>
                  <div className="flex-1 space-y-1">
                    <div
                      className="h-12 rounded-lg"
                      style={{ backgroundColor: branding.secondaryColor }}
                    />
                    <p className="text-center text-xs text-zinc-500">Secundair</p>
                  </div>
                  <div className="flex-1 space-y-1">
                    <div
                      className="h-12 rounded-lg"
                      style={{
                        background: `linear-gradient(135deg, ${branding.primaryColor} 0%, ${branding.secondaryColor} 100%)`,
                      }}
                    />
                    <p className="text-center text-xs text-zinc-500">Gradient</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Where branding is used */}
            <Card className="border-zinc-200/50 bg-white/50 dark:border-zinc-800/50 dark:bg-zinc-900/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Waar wordt dit gebruikt?</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                  <li className="flex items-center gap-2">
                    <div
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: branding.primaryColor }}
                    />
                    Factuur PDFs
                  </li>
                  <li className="flex items-center gap-2">
                    <div
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: branding.primaryColor }}
                    />
                    Offerte PDFs
                  </li>
                  <li className="flex items-center gap-2">
                    <div
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: branding.primaryColor }}
                    />
                    Credit Note PDFs
                  </li>
                  <li className="flex items-center gap-2">
                    <div
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: branding.primaryColor }}
                    />
                    Factuur emails
                  </li>
                  <li className="flex items-center gap-2">
                    <div
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: branding.primaryColor }}
                    />
                    Offerte emails
                  </li>
                  <li className="flex items-center gap-2">
                    <div
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: branding.primaryColor }}
                    />
                    Welkom emails
                  </li>
                  <li className="flex items-center gap-2">
                    <div
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: branding.primaryColor }}
                    />
                    Lead notificatie emails
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
