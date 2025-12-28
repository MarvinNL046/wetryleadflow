"use client";

import { useState, useEffect, useRef } from "react";
import { Palette, Image, Eye, Save, RotateCcw, Type, Info, Upload, Trash2, X } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { getWorkspaceBranding, updateWorkspaceBranding } from "@/lib/actions/invoicing";

interface BrandingData {
  companyLogo: string;
  brandingAppName: string;
  brandingPrimaryColor: string;
  brandingSecondaryColor: string;
}

interface AgencyBranding {
  name: string;
  appName: string | null;
  logoUrl: string | null;
  primaryColor: string | null;
  secondaryColor: string | null;
}

const defaultColors = {
  primaryColor: "#8b5cf6",
  secondaryColor: "#3b82f6",
};

// Auto-resize image to fit within max dimensions and file size
async function resizeImage(
  file: File,
  maxWidth = 800,
  maxHeight = 600,
  maxSizeKB = 500
): Promise<{ file: File; wasResized: boolean }> {
  // SVG files don't need resizing
  if (file.type === "image/svg+xml") {
    return { file, wasResized: false };
  }

  return new Promise((resolve, reject) => {
    const img = new window.Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);

      // Check if resizing is needed
      const needsResize =
        img.width > maxWidth ||
        img.height > maxHeight ||
        file.size > maxSizeKB * 1024;

      if (!needsResize) {
        resolve({ file, wasResized: false });
        return;
      }

      // Calculate new dimensions maintaining aspect ratio
      let width = img.width;
      let height = img.height;

      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width);
        width = maxWidth;
      }

      if (height > maxHeight) {
        width = Math.round((width * maxHeight) / height);
        height = maxHeight;
      }

      // Create canvas and draw resized image
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        reject(new Error("Failed to get canvas context"));
        return;
      }

      // Use high-quality image smoothing
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, 0, 0, width, height);

      // Try different quality levels to get under size limit
      const tryQuality = (quality: number): void => {
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error("Failed to create blob"));
              return;
            }

            // If still too large and quality can be reduced, try again
            if (blob.size > maxSizeKB * 1024 && quality > 0.3) {
              tryQuality(quality - 0.1);
              return;
            }

            const resizedFile = new File([blob], file.name.replace(/\.[^.]+$/, ".jpg"), {
              type: "image/jpeg",
            });

            resolve({ file: resizedFile, wasResized: true });
          },
          "image/jpeg",
          quality
        );
      };

      tryQuality(0.85);
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to load image"));
    };

    img.src = url;
  });
}

export default function WorkspaceBrandingPage() {
  const [branding, setBranding] = useState<BrandingData>({
    companyLogo: "",
    brandingAppName: "",
    brandingPrimaryColor: "",
    brandingSecondaryColor: "",
  });
  const [originalBranding, setOriginalBranding] = useState<BrandingData>({
    companyLogo: "",
    brandingAppName: "",
    brandingPrimaryColor: "",
    brandingSecondaryColor: "",
  });
  const [isAgencyClient, setIsAgencyClient] = useState(false);
  const [agencyBranding, setAgencyBranding] = useState<AgencyBranding | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadBranding();
  }, []);

  async function loadBranding() {
    try {
      const data = await getWorkspaceBranding();
      const brandingData: BrandingData = {
        companyLogo: data.companyLogo || "",
        brandingAppName: data.brandingAppName || "",
        brandingPrimaryColor: data.brandingPrimaryColor || "",
        brandingSecondaryColor: data.brandingSecondaryColor || "",
      };
      setBranding(brandingData);
      setOriginalBranding(brandingData);
      setIsAgencyClient(data.isAgencyClient);
      setAgencyBranding(data.agencyBranding);
    } catch (error) {
      console.error("Failed to load branding:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSave() {
    setIsSaving(true);
    setMessage(null);

    try {
      const result = await updateWorkspaceBranding({
        companyLogo: branding.companyLogo || null,
        brandingAppName: branding.brandingAppName || null,
        brandingPrimaryColor: branding.brandingPrimaryColor || null,
        brandingSecondaryColor: branding.brandingSecondaryColor || null,
      });

      if (result.success) {
        setMessage({ type: "success", text: "Branding opgeslagen!" });
        setOriginalBranding(branding);
      } else {
        setMessage({ type: "error", text: "Opslaan mislukt." });
      }
    } catch {
      setMessage({ type: "error", text: "Er is een fout opgetreden." });
    } finally {
      setIsSaving(false);
    }
  }

  function handleReset() {
    setBranding(originalBranding);
    setMessage(null);
  }

  async function handleFileUpload(file: File) {
    setIsUploading(true);
    setMessage(null);

    try {
      // Auto-resize large images
      const originalSize = file.size;
      const { file: processedFile, wasResized } = await resizeImage(file);

      const formData = new FormData();
      formData.append("file", processedFile);

      const response = await fetch("/api/upload/logo", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok && data.url) {
        setBranding((prev) => ({ ...prev, companyLogo: data.url }));
        setOriginalBranding((prev) => ({ ...prev, companyLogo: data.url }));

        // Show resize info if applicable
        if (wasResized) {
          const savedKB = Math.round((originalSize - processedFile.size) / 1024);
          setMessage({
            type: "success",
            text: `Logo geüpload! (automatisch verkleind, ${savedKB}KB bespaard)`,
          });
        } else {
          setMessage({ type: "success", text: "Logo geüpload!" });
        }
      } else {
        setMessage({ type: "error", text: data.error || "Upload mislukt" });
      }
    } catch {
      setMessage({ type: "error", text: "Upload mislukt. Probeer het opnieuw." });
    } finally {
      setIsUploading(false);
    }
  }

  async function handleDeleteLogo() {
    setIsUploading(true);
    setMessage(null);

    try {
      const response = await fetch("/api/upload/logo", {
        method: "DELETE",
      });

      if (response.ok) {
        setBranding((prev) => ({ ...prev, companyLogo: "" }));
        setOriginalBranding((prev) => ({ ...prev, companyLogo: "" }));
        setMessage({ type: "success", text: "Logo verwijderd!" });
      } else {
        setMessage({ type: "error", text: "Verwijderen mislukt" });
      }
    } catch {
      setMessage({ type: "error", text: "Verwijderen mislukt" });
    } finally {
      setIsUploading(false);
    }
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave() {
    setIsDragging(false);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      handleFileUpload(file);
    }
  }

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  }

  const hasChanges = JSON.stringify(branding) !== JSON.stringify(originalBranding);

  // Calculate effective branding (what will actually be shown)
  const effectiveBranding = {
    appName: branding.brandingAppName || agencyBranding?.appName || "LeadFlow",
    logoUrl: branding.companyLogo || agencyBranding?.logoUrl || null,
    primaryColor: branding.brandingPrimaryColor || agencyBranding?.primaryColor || defaultColors.primaryColor,
    secondaryColor: branding.brandingSecondaryColor || agencyBranding?.secondaryColor || defaultColors.secondaryColor,
  };

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
                Pas je logo en kleuren aan voor emails en facturen
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/crm/settings">
                ← Terug
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl p-8">
        {/* Agency Fallback Notice */}
        {isAgencyClient && agencyBranding && (
          <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-950/50">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
              <div>
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  <strong>Tip:</strong> Je kunt je eigen branding instellen. Als je velden leeg laat,
                  wordt de branding van <strong>{agencyBranding.name}</strong> gebruikt.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Settings */}
          <div className="space-y-6">
            {/* App Name */}
            <Card className="border-zinc-200/50 bg-white dark:border-zinc-800/50 dark:bg-zinc-900/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Type className="h-5 w-5 text-violet-500" />
                  App Naam
                </CardTitle>
                <CardDescription>
                  Naam in emails en documenten (bijv. je bedrijfsnaam)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="appName">Weergavenaam</Label>
                  <Input
                    id="appName"
                    placeholder={agencyBranding?.appName || "LeadFlow"}
                    value={branding.brandingAppName}
                    onChange={(e) => setBranding({ ...branding, brandingAppName: e.target.value })}
                  />
                  <p className="text-xs text-zinc-500">
                    Leeg = {agencyBranding?.appName ? `"${agencyBranding.appName}" (van agency)` : '"LeadFlow"'}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Logo Upload */}
            <Card className="border-zinc-200/50 bg-white dark:border-zinc-800/50 dark:bg-zinc-900/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Image className="h-5 w-5 text-violet-500" />
                  Logo
                </CardTitle>
                <CardDescription>
                  Je logo voor emails en PDF documenten
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Current Logo Preview */}
                  {branding.companyLogo && (
                    <div className="relative inline-block">
                      <div className="flex items-center gap-4 rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-800">
                        <img
                          src={branding.companyLogo}
                          alt="Huidige logo"
                          className="h-16 max-w-[160px] object-contain"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='40' viewBox='0 0 100 40'%3E%3Crect fill='%23f0f0f0' width='100' height='40'/%3E%3Ctext x='50' y='25' text-anchor='middle' fill='%23999'%3EError%3C/text%3E%3C/svg%3E";
                          }}
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950"
                          onClick={handleDeleteLogo}
                          disabled={isUploading}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Upload Zone */}
                  <div
                    className={`relative cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-colors ${
                      isDragging
                        ? "border-violet-500 bg-violet-50 dark:bg-violet-950/20"
                        : "border-zinc-300 hover:border-violet-400 dark:border-zinc-700 dark:hover:border-violet-600"
                    } ${isUploading ? "pointer-events-none opacity-50" : ""}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/png,image/jpeg,image/jpg,image/webp,image/svg+xml"
                      className="hidden"
                      onChange={handleFileSelect}
                    />
                    {isUploading ? (
                      <div className="flex flex-col items-center gap-2">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-600" />
                        <p className="text-sm text-zinc-500">Uploaden...</p>
                      </div>
                    ) : (
                      <>
                        <Upload className="mx-auto h-10 w-10 text-zinc-400" />
                        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                          <span className="font-medium text-violet-600 dark:text-violet-400">Klik om te uploaden</span>
                          {" "}of sleep een bestand
                        </p>
                        <p className="mt-1 text-xs text-zinc-500">
                          PNG, JPG, WebP of SVG • Grote afbeeldingen worden automatisch verkleind
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Colors */}
            <Card className="border-zinc-200/50 bg-white dark:border-zinc-800/50 dark:bg-zinc-900/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Palette className="h-5 w-5 text-violet-500" />
                  Kleuren
                </CardTitle>
                <CardDescription>
                  Kleuren voor buttons, links en accenten
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="primaryColor">Primaire kleur</Label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        id="primaryColor"
                        value={branding.brandingPrimaryColor || defaultColors.primaryColor}
                        onChange={(e) => setBranding({ ...branding, brandingPrimaryColor: e.target.value })}
                        className="h-10 w-14 cursor-pointer rounded border border-zinc-300 dark:border-zinc-700"
                      />
                      <Input
                        value={branding.brandingPrimaryColor}
                        onChange={(e) => setBranding({ ...branding, brandingPrimaryColor: e.target.value })}
                        placeholder={agencyBranding?.primaryColor || defaultColors.primaryColor}
                        className="flex-1"
                        maxLength={7}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="secondaryColor">Secundaire kleur</Label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        id="secondaryColor"
                        value={branding.brandingSecondaryColor || defaultColors.secondaryColor}
                        onChange={(e) => setBranding({ ...branding, brandingSecondaryColor: e.target.value })}
                        className="h-10 w-14 cursor-pointer rounded border border-zinc-300 dark:border-zinc-700"
                      />
                      <Input
                        value={branding.brandingSecondaryColor}
                        onChange={(e) => setBranding({ ...branding, brandingSecondaryColor: e.target.value })}
                        placeholder={agencyBranding?.secondaryColor || defaultColors.secondaryColor}
                        className="flex-1"
                        maxLength={7}
                      />
                    </div>
                  </div>
                </div>
                <p className="mt-3 text-xs text-zinc-500">
                  Leeg laten = standaard kleuren gebruiken
                </p>
              </CardContent>
            </Card>

            {/* Actions */}
            {message && (
              <div
                className={`rounded-lg p-3 text-sm ${
                  message.type === "success"
                    ? "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400"
                    : "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400"
                }`}
              >
                {message.text}
              </div>
            )}

            <div className="flex gap-3">
              <Button
                onClick={handleSave}
                disabled={!hasChanges || isSaving}
                className="bg-gradient-to-r from-violet-600 to-purple-600"
              >
                <Save className="mr-2 h-4 w-4" />
                {isSaving ? "Opslaan..." : "Opslaan"}
              </Button>
              {hasChanges && (
                <Button variant="outline" onClick={handleReset}>
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Reset
                </Button>
              )}
            </div>
          </div>

          {/* Preview */}
          <div className="space-y-4">
            <h3 className="flex items-center gap-2 text-lg font-semibold">
              <Eye className="h-5 w-5 text-violet-500" />
              Live Preview
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
                    {effectiveBranding.logoUrl ? (
                      <img
                        src={effectiveBranding.logoUrl}
                        alt="Logo"
                        className="h-8 max-w-[100px] object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                    ) : (
                      <span
                        className="text-lg font-bold"
                        style={{ color: effectiveBranding.primaryColor }}
                      >
                        {effectiveBranding.appName}
                      </span>
                    )}
                  </div>

                  {/* Badge */}
                  <div className="mb-3 text-center">
                    <span
                      className="inline-block rounded-full px-3 py-1 text-xs font-semibold text-white"
                      style={{ backgroundColor: effectiveBranding.primaryColor }}
                    >
                      FACTUUR
                    </span>
                  </div>

                  {/* Content */}
                  <div className="space-y-2 text-sm">
                    <p className="text-center font-semibold">Factuur #FAC-2024-001</p>
                    <p className="text-zinc-500">Beste klant,</p>
                    <p className="text-zinc-500">Hierbij ontvangt u factuur...</p>
                  </div>

                  {/* Button */}
                  <div className="mt-4 text-center">
                    <button
                      className="rounded-lg px-6 py-2 text-sm font-medium text-white"
                      style={{
                        background: `linear-gradient(135deg, ${effectiveBranding.primaryColor} 0%, ${effectiveBranding.secondaryColor} 100%)`,
                      }}
                    >
                      Bekijk Factuur
                    </button>
                  </div>

                  {/* Footer */}
                  <p className="mt-6 text-center text-xs text-zinc-400">
                    Deze e-mail is verzonden via {effectiveBranding.appName}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Color Palette */}
            <Card className="border-zinc-200/50 bg-white dark:border-zinc-800/50 dark:bg-zinc-900/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Kleurenpalet</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <div className="flex-1 space-y-1">
                    <div
                      className="h-12 rounded-lg"
                      style={{ backgroundColor: effectiveBranding.primaryColor }}
                    />
                    <p className="text-center text-xs text-zinc-500">Primair</p>
                  </div>
                  <div className="flex-1 space-y-1">
                    <div
                      className="h-12 rounded-lg"
                      style={{ backgroundColor: effectiveBranding.secondaryColor }}
                    />
                    <p className="text-center text-xs text-zinc-500">Secundair</p>
                  </div>
                  <div className="flex-1 space-y-1">
                    <div
                      className="h-12 rounded-lg"
                      style={{
                        background: `linear-gradient(135deg, ${effectiveBranding.primaryColor} 0%, ${effectiveBranding.secondaryColor} 100%)`,
                      }}
                    />
                    <p className="text-center text-xs text-zinc-500">Gradient</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Where branding is used */}
            <Card className="border-zinc-200/50 bg-white dark:border-zinc-800/50 dark:bg-zinc-900/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Waar wordt dit gebruikt?</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                  <li className="flex items-center gap-2">
                    <div
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: effectiveBranding.primaryColor }}
                    />
                    Factuur PDFs
                  </li>
                  <li className="flex items-center gap-2">
                    <div
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: effectiveBranding.primaryColor }}
                    />
                    Offerte PDFs
                  </li>
                  <li className="flex items-center gap-2">
                    <div
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: effectiveBranding.primaryColor }}
                    />
                    Credit Note PDFs
                  </li>
                  <li className="flex items-center gap-2">
                    <div
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: effectiveBranding.primaryColor }}
                    />
                    Factuur & Offerte emails
                  </li>
                  <li className="flex items-center gap-2">
                    <div
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: effectiveBranding.primaryColor }}
                    />
                    Welkom & Lead notificatie emails
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
