"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, Upload, Trash2, Image, Palette, FileText, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { getWorkspaceBranding, updateWorkspaceBranding } from "@/lib/actions/invoicing";

interface BrandingData {
  companyLogo: string;
  brandingAppName: string;
  brandingPrimaryColor: string;
  brandingSecondaryColor: string;
}

const defaultColors = {
  primaryColor: "#8b5cf6",
  secondaryColor: "#3b82f6",
};

// Auto-resize image before upload
async function resizeImage(
  file: File,
  maxWidth = 800,
  maxHeight = 600,
  maxSizeKB = 500
): Promise<{ file: File; wasResized: boolean }> {
  if (file.type === "image/svg+xml") {
    return { file, wasResized: false };
  }

  return new Promise((resolve, reject) => {
    const img = new window.Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);

      const needsResize =
        img.width > maxWidth || img.height > maxHeight || file.size > maxSizeKB * 1024;

      if (!needsResize) {
        resolve({ file, wasResized: false });
        return;
      }

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

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        reject(new Error("Failed to get canvas context"));
        return;
      }

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, 0, 0, width, height);

      const tryQuality = (quality: number): void => {
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error("Failed to create blob"));
              return;
            }
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

export default function BrandingPage() {
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
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [previewType, setPreviewType] = useState<"invoice" | "quotation">("invoice");
  const [previewKey, setPreviewKey] = useState(0);
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
        setMessage({ type: "success", text: "Opgeslagen!" });
        setOriginalBranding(branding);
        // Refresh preview
        setPreviewKey((k) => k + 1);
      } else {
        setMessage({ type: "error", text: "Opslaan mislukt." });
      }
    } catch {
      setMessage({ type: "error", text: "Er is een fout opgetreden." });
    } finally {
      setIsSaving(false);
    }
  }

  async function handleFileUpload(file: File) {
    setIsUploading(true);
    setMessage(null);

    try {
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
        setPreviewKey((k) => k + 1);
        setMessage({
          type: "success",
          text: wasResized ? "Logo geüpload en verkleind!" : "Logo geüpload!",
        });
      } else {
        setMessage({ type: "error", text: data.error || "Upload mislukt" });
      }
    } catch {
      setMessage({ type: "error", text: "Upload mislukt" });
    } finally {
      setIsUploading(false);
    }
  }

  async function handleDeleteLogo() {
    setIsUploading(true);
    try {
      const response = await fetch("/api/upload/logo", { method: "DELETE" });
      if (response.ok) {
        setBranding((prev) => ({ ...prev, companyLogo: "" }));
        setOriginalBranding((prev) => ({ ...prev, companyLogo: "" }));
        setPreviewKey((k) => k + 1);
        setMessage({ type: "success", text: "Logo verwijderd!" });
      }
    } catch {
      setMessage({ type: "error", text: "Verwijderen mislukt" });
    } finally {
      setIsUploading(false);
    }
  }

  const hasChanges = JSON.stringify(branding) !== JSON.stringify(originalBranding);
  const effectiveColor = branding.brandingPrimaryColor || defaultColors.primaryColor;

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-600" />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Left Panel - Settings */}
      <div className="w-[360px] flex flex-col border-r border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/crm/settings">
              <ChevronLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h1 className="font-semibold">Branding</h1>
        </div>

        {/* Settings */}
        <div className="flex-1 overflow-auto">
          <Accordion type="multiple" defaultValue={["logo", "colors"]} className="px-2 py-2">
            {/* Logo Section */}
            <AccordionItem value="logo" className="border-b-0">
              <AccordionTrigger className="px-2 py-3 hover:no-underline">
                <div className="flex items-center gap-2">
                  <Image className="h-4 w-4 text-zinc-500" />
                  <span>Logo</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-2 pb-4">
                {branding.companyLogo ? (
                  <div className="flex items-center gap-3 rounded-lg border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-700 dark:bg-zinc-800">
                    <img
                      src={branding.companyLogo}
                      alt="Logo"
                      className="h-12 max-w-[120px] object-contain"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="ml-auto text-red-500 hover:text-red-600"
                      onClick={handleDeleteLogo}
                      disabled={isUploading}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div
                    className={`cursor-pointer rounded-lg border-2 border-dashed p-6 text-center transition-colors hover:border-violet-400 ${
                      isUploading ? "opacity-50" : ""
                    }`}
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      const file = e.dataTransfer.files[0];
                      if (file?.type.startsWith("image/")) handleFileUpload(file);
                    }}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload(file);
                      }}
                    />
                    <Upload className="mx-auto h-8 w-8 text-zinc-400" />
                    <p className="mt-2 text-sm text-zinc-500">
                      {isUploading ? "Uploaden..." : "Klik of sleep logo"}
                    </p>
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>

            {/* Colors Section */}
            <AccordionItem value="colors" className="border-b-0">
              <AccordionTrigger className="px-2 py-3 hover:no-underline">
                <div className="flex items-center gap-2">
                  <Palette className="h-4 w-4 text-zinc-500" />
                  <span>Kleuren</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-4 px-2 pb-4">
                <div>
                  <label className="mb-1.5 block text-sm text-zinc-600 dark:text-zinc-400">
                    Hoofdkleur
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={branding.brandingPrimaryColor || defaultColors.primaryColor}
                      onChange={(e) =>
                        setBranding({ ...branding, brandingPrimaryColor: e.target.value })
                      }
                      className="h-10 w-12 cursor-pointer rounded border"
                    />
                    <Input
                      value={branding.brandingPrimaryColor}
                      onChange={(e) =>
                        setBranding({ ...branding, brandingPrimaryColor: e.target.value })
                      }
                      placeholder={defaultColors.primaryColor}
                      className="flex-1"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm text-zinc-600 dark:text-zinc-400">
                    Accentkleur
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={branding.brandingSecondaryColor || defaultColors.secondaryColor}
                      onChange={(e) =>
                        setBranding({ ...branding, brandingSecondaryColor: e.target.value })
                      }
                      className="h-10 w-12 cursor-pointer rounded border"
                    />
                    <Input
                      value={branding.brandingSecondaryColor}
                      onChange={(e) =>
                        setBranding({ ...branding, brandingSecondaryColor: e.target.value })
                      }
                      placeholder={defaultColors.secondaryColor}
                      className="flex-1"
                    />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Footer with Save */}
        <div className="border-t border-zinc-200 p-4 dark:border-zinc-800">
          {message && (
            <div
              className={`mb-3 rounded-lg px-3 py-2 text-sm ${
                message.type === "success"
                  ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                  : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
              }`}
            >
              {message.text}
            </div>
          )}
          <div className="flex gap-2">
            <Button
              onClick={handleSave}
              disabled={!hasChanges || isSaving}
              className="flex-1"
              style={{ backgroundColor: effectiveColor }}
            >
              {isSaving ? "Opslaan..." : "Opslaan"}
            </Button>
            <Button variant="outline" asChild>
              <Link href="/crm/settings">Terug</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Right Panel - Preview */}
      <div className="flex-1 flex flex-col">
        {/* Preview Tabs */}
        <Tabs defaultValue="documents" className="flex flex-col h-full">
          <div className="border-b border-zinc-200 bg-white px-6 dark:border-zinc-800 dark:bg-zinc-900">
            <TabsList className="h-12 bg-transparent p-0">
              <TabsTrigger
                value="documents"
                className="h-12 rounded-none border-b-2 border-transparent px-4 data-[state=active]:border-violet-600 data-[state=active]:bg-transparent"
              >
                <FileText className="mr-2 h-4 w-4" />
                Facturen & Offertes
              </TabsTrigger>
              <TabsTrigger
                value="email"
                className="h-12 rounded-none border-b-2 border-transparent px-4 data-[state=active]:border-violet-600 data-[state=active]:bg-transparent"
              >
                <Mail className="mr-2 h-4 w-4" />
                E-mail
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Documents Preview */}
          <TabsContent value="documents" className="flex-1 m-0 p-6 overflow-auto bg-zinc-100 dark:bg-zinc-900">
            <div className="mb-4 flex gap-2">
              <Button
                variant={previewType === "invoice" ? "default" : "outline"}
                size="sm"
                onClick={() => setPreviewType("invoice")}
              >
                Factuur
              </Button>
              <Button
                variant={previewType === "quotation" ? "default" : "outline"}
                size="sm"
                onClick={() => setPreviewType("quotation")}
              >
                Offerte
              </Button>
            </div>

            {/* HTML Preview (like Moneybird) */}
            <div className="bg-white shadow-xl rounded-sm mx-auto" style={{ width: "595px", minHeight: "842px", padding: "40px" }}>
              {/* Header */}
              <div className="flex justify-between mb-10">
                <div className="max-w-[50%]">
                  {branding.companyLogo ? (
                    <img src={branding.companyLogo} alt="Logo" className="h-12 max-w-[150px] object-contain mb-2" />
                  ) : (
                    <div className="text-lg font-bold mb-1" style={{ color: effectiveColor }}>
                      {branding.brandingAppName || "Uw Bedrijfsnaam"}
                    </div>
                  )}
                  <div className="text-xs text-gray-500 leading-relaxed">
                    Voorbeeldstraat 123<br />
                    1234 AB Amsterdam<br />
                    info@uwbedrijf.nl<br />
                    06 12345678
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-800 mb-2">
                    {previewType === "invoice" ? "Factuur" : "Offerte"}
                  </div>
                  <div className="text-sm mb-1">
                    {previewType === "invoice" ? "FAC-2025-0001" : "OFF-2025-0001"}
                  </div>
                  <div className="text-xs text-gray-500">
                    Datum: 28-12-2025<br />
                    {previewType === "invoice" ? "Vervaldatum: 11-01-2026" : "Geldig tot: 27-01-2026"}
                  </div>
                </div>
              </div>

              {/* Customer */}
              <div className="mb-8 p-4 bg-gray-50 rounded">
                <div className="text-[10px] text-gray-500 uppercase tracking-wide mb-1">
                  {previewType === "invoice" ? "Factuuradres" : "Offerte voor"}
                </div>
                <div className="text-sm font-bold mb-1">Voorbeeld BV</div>
                <div className="text-xs text-gray-600">
                  Jan de Vries<br />
                  Klantstraat 456<br />
                  5678 CD Rotterdam
                </div>
              </div>

              {/* Reference */}
              <div className="mb-4 text-xs text-gray-600">
                <span className="font-medium">Kenmerk:</span> Website redesign project
              </div>

              {/* Table */}
              <table className="w-full mb-6 text-xs">
                <thead>
                  <tr className="border-b-2" style={{ borderColor: effectiveColor }}>
                    <th className="text-left py-2 font-semibold">Omschrijving</th>
                    <th className="text-right py-2 font-semibold w-16">Aantal</th>
                    <th className="text-right py-2 font-semibold w-20">Prijs</th>
                    <th className="text-right py-2 font-semibold w-16">BTW</th>
                    <th className="text-right py-2 font-semibold w-24">Totaal</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="py-2">Consultancy diensten</td>
                    <td className="text-right py-2">10</td>
                    <td className="text-right py-2">€ 100,00</td>
                    <td className="text-right py-2">21%</td>
                    <td className="text-right py-2">€ 1.000,00</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-2">Software licentie</td>
                    <td className="text-right py-2">1</td>
                    <td className="text-right py-2">€ 500,00</td>
                    <td className="text-right py-2">21%</td>
                    <td className="text-right py-2">€ 500,00</td>
                  </tr>
                </tbody>
              </table>

              {/* Totals */}
              <div className="flex justify-end mb-8">
                <div className="w-48">
                  <div className="flex justify-between text-xs py-1">
                    <span className="text-gray-600">Subtotaal excl. BTW</span>
                    <span>€ 1.500,00</span>
                  </div>
                  <div className="flex justify-between text-xs py-1">
                    <span className="text-gray-600">21% BTW</span>
                    <span>€ 315,00</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold py-2 border-t-2 mt-1" style={{ borderColor: effectiveColor }}>
                    <span>Totaal</span>
                    <span>€ 1.815,00</span>
                  </div>
                </div>
              </div>

              {/* Footer info */}
              <div className="text-[10px] text-gray-500 border-t pt-4 mt-auto">
                <div className="flex justify-between">
                  <div>
                    <span className="font-medium">KVK:</span> 12345678 |
                    <span className="font-medium"> BTW:</span> NL123456789B01
                  </div>
                  <div>
                    <span className="font-medium">IBAN:</span> NL00 BANK 0123 4567 89
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Email Preview */}
          <TabsContent value="email" className="flex-1 m-0 p-6 overflow-auto">
            <div className="max-w-xl mx-auto">
              <div className="bg-white rounded-lg shadow-lg p-8 dark:bg-zinc-900">
                {/* Email Header */}
                <div className="mb-6 flex items-center gap-3 border-b pb-4">
                  {branding.companyLogo ? (
                    <img src={branding.companyLogo} alt="Logo" className="h-10 max-w-[120px] object-contain" />
                  ) : (
                    <span className="text-xl font-bold" style={{ color: effectiveColor }}>
                      {branding.brandingAppName || "LeadFlow"}
                    </span>
                  )}
                </div>

                {/* Badge */}
                <div className="text-center mb-4">
                  <span
                    className="inline-block rounded-full px-4 py-1 text-xs font-semibold text-white"
                    style={{ backgroundColor: effectiveColor }}
                  >
                    FACTUUR
                  </span>
                </div>

                {/* Content */}
                <div className="text-center space-y-2 mb-6">
                  <p className="font-semibold">Factuur FAC-2025-0001</p>
                  <p className="text-zinc-500 text-sm">Beste Jan de Vries,</p>
                  <p className="text-zinc-500 text-sm">Hierbij ontvangt u uw factuur van €1.815,00</p>
                </div>

                {/* Button */}
                <div className="text-center">
                  <span
                    className="inline-block rounded-lg px-6 py-2.5 text-sm font-medium text-white"
                    style={{
                      background: `linear-gradient(135deg, ${effectiveColor} 0%, ${branding.brandingSecondaryColor || defaultColors.secondaryColor} 100%)`,
                    }}
                  >
                    Bekijk Factuur
                  </span>
                </div>

                {/* Footer */}
                <p className="mt-8 text-center text-xs text-zinc-400">
                  Verzonden via {branding.brandingAppName || "LeadFlow"}
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
