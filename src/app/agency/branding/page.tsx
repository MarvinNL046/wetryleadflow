"use client";

import { useState, useEffect } from "react";
import { Palette, Type, Image, Eye, Save, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateAgencyBranding, getAgencyBrandingForClient } from "@/lib/actions/agency";

interface BrandingData {
  appName: string;
  logoUrl: string;
  primaryColor: string;
  secondaryColor: string;
}

const defaultBranding: BrandingData = {
  appName: "",
  logoUrl: "",
  primaryColor: "#8b5cf6",
  secondaryColor: "#3b82f6",
};

export default function AgencyBrandingPage() {
  const [branding, setBranding] = useState<BrandingData>(defaultBranding);
  const [originalBranding, setOriginalBranding] = useState<BrandingData>(defaultBranding);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [agencyName, setAgencyName] = useState("");

  useEffect(() => {
    loadBranding();
  }, []);

  async function loadBranding() {
    try {
      const agencyData = await getAgencyBrandingForClient();
      const data: BrandingData = {
        appName: agencyData.appName || "",
        logoUrl: agencyData.logoUrl || "",
        primaryColor: agencyData.primaryColor || "#8b5cf6",
        secondaryColor: agencyData.secondaryColor || "#3b82f6",
      };
      setBranding(data);
      setOriginalBranding(data);
      setAgencyName(agencyData.name);
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
      const result = await updateAgencyBranding({
        appName: branding.appName || undefined,
        logoUrl: branding.logoUrl || undefined,
        primaryColor: branding.primaryColor,
        secondaryColor: branding.secondaryColor,
      });

      if (result.success) {
        setMessage({ type: "success", text: "Branding updated successfully!" });
        setOriginalBranding(branding);
      } else {
        setMessage({ type: "error", text: "Failed to update branding." });
      }
    } catch {
      setMessage({ type: "error", text: "An error occurred. Please try again." });
    } finally {
      setIsSaving(false);
    }
  }

  function handleReset() {
    setBranding(originalBranding);
    setMessage(null);
  }

  const hasChanges = JSON.stringify(branding) !== JSON.stringify(originalBranding);

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-600" />
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Branding Settings</h1>
        <p className="text-zinc-500">Customize your whitelabeled CRM appearance</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Settings */}
        <div className="space-y-6">
          {/* App Name */}
          <Card className="border-zinc-200/50 bg-white/50 dark:border-zinc-800/50 dark:bg-zinc-900/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Type className="h-5 w-5 text-violet-500" />
                App Name
              </CardTitle>
              <CardDescription>
                The name displayed in the CRM header and browser tab
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="appName">Display Name</Label>
                <Input
                  id="appName"
                  placeholder={agencyName || "My CRM"}
                  value={branding.appName}
                  onChange={(e) => setBranding({ ...branding, appName: e.target.value })}
                />
                <p className="text-xs text-zinc-500">
                  Leave empty to use your agency name: &quot;{agencyName}&quot;
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Logo */}
          <Card className="border-zinc-200/50 bg-white/50 dark:border-zinc-800/50 dark:bg-zinc-900/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Image className="h-5 w-5 text-violet-500" />
                Logo
              </CardTitle>
              <CardDescription>
                Your logo displayed in the sidebar header
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="logoUrl">Logo URL</Label>
                  <Input
                    id="logoUrl"
                    type="url"
                    placeholder="https://example.com/logo.png"
                    value={branding.logoUrl}
                    onChange={(e) => setBranding({ ...branding, logoUrl: e.target.value })}
                  />
                </div>
                {branding.logoUrl && (
                  <div className="flex items-center gap-3 rounded-lg bg-zinc-100 p-3 dark:bg-zinc-800">
                    <img
                      src={branding.logoUrl}
                      alt="Logo preview"
                      className="h-10 w-10 rounded object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                    <span className="text-sm text-zinc-600 dark:text-zinc-400">Logo preview</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Colors */}
          <Card className="border-zinc-200/50 bg-white/50 dark:border-zinc-800/50 dark:bg-zinc-900/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5 text-violet-500" />
                Brand Colors
              </CardTitle>
              <CardDescription>
                Colors used throughout the CRM interface
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="primaryColor">Primary Color</Label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      id="primaryColor"
                      value={branding.primaryColor}
                      onChange={(e) => setBranding({ ...branding, primaryColor: e.target.value })}
                      className="h-10 w-14 cursor-pointer rounded border border-zinc-300 dark:border-zinc-700"
                    />
                    <Input
                      value={branding.primaryColor}
                      onChange={(e) => setBranding({ ...branding, primaryColor: e.target.value })}
                      className="flex-1"
                      maxLength={7}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="secondaryColor">Secondary Color</Label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      id="secondaryColor"
                      value={branding.secondaryColor}
                      onChange={(e) => setBranding({ ...branding, secondaryColor: e.target.value })}
                      className="h-10 w-14 cursor-pointer rounded border border-zinc-300 dark:border-zinc-700"
                    />
                    <Input
                      value={branding.secondaryColor}
                      onChange={(e) => setBranding({ ...branding, secondaryColor: e.target.value })}
                      className="flex-1"
                      maxLength={7}
                    />
                  </div>
                </div>
              </div>
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
              {isSaving ? "Saving..." : "Save Changes"}
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

          {/* Sidebar Preview */}
          <Card className="overflow-hidden border-zinc-200/50 bg-white/50 dark:border-zinc-800/50 dark:bg-zinc-900/50">
            <div className="relative border-r border-zinc-200/50 bg-white p-4 dark:border-zinc-800/50 dark:bg-zinc-900">
              {/* Accent line */}
              <div
                className="absolute left-0 top-0 h-full w-[2px]"
                style={{
                  background: `linear-gradient(to bottom, ${branding.primaryColor}, ${branding.secondaryColor})`,
                }}
              />

              {/* Header */}
              <div className="mb-4 flex items-center gap-3 border-b border-zinc-200/50 pb-4 dark:border-zinc-800/50">
                {branding.logoUrl ? (
                  <img
                    src={branding.logoUrl}
                    alt="Logo"
                    className="h-8 w-8 rounded object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                ) : (
                  <div
                    className="flex h-8 w-8 items-center justify-center rounded text-white"
                    style={{ backgroundColor: branding.primaryColor }}
                  >
                    <span className="font-bold">
                      {(branding.appName || agencyName || "C").charAt(0)}
                    </span>
                  </div>
                )}
                <span className="font-semibold">{branding.appName || agencyName || "Your CRM"}</span>
              </div>

              {/* Nav Items */}
              <div className="space-y-1">
                <div
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm"
                  style={{
                    backgroundColor: `${branding.primaryColor}15`,
                    color: branding.primaryColor,
                  }}
                >
                  <div className="h-4 w-4 rounded bg-current opacity-50" />
                  Overview
                </div>
                <div className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-zinc-500">
                  <div className="h-4 w-4 rounded bg-zinc-300" />
                  Contacts
                </div>
                <div className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-zinc-500">
                  <div className="h-4 w-4 rounded bg-zinc-300" />
                  Pipelines
                </div>
              </div>

              {/* Button Preview */}
              <div className="mt-6">
                <button
                  className="w-full rounded-lg px-4 py-2 text-sm font-medium text-white"
                  style={{
                    background: `linear-gradient(to right, ${branding.primaryColor}, ${branding.secondaryColor})`,
                  }}
                >
                  Primary Action
                </button>
              </div>
            </div>
          </Card>

          {/* Color Swatches */}
          <Card className="border-zinc-200/50 bg-white/50 dark:border-zinc-800/50 dark:bg-zinc-900/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Color Palette</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <div className="flex-1 space-y-1">
                  <div
                    className="h-16 rounded-lg"
                    style={{ backgroundColor: branding.primaryColor }}
                  />
                  <p className="text-center text-xs text-zinc-500">Primary</p>
                </div>
                <div className="flex-1 space-y-1">
                  <div
                    className="h-16 rounded-lg"
                    style={{ backgroundColor: branding.secondaryColor }}
                  />
                  <p className="text-center text-xs text-zinc-500">Secondary</p>
                </div>
                <div className="flex-1 space-y-1">
                  <div
                    className="h-16 rounded-lg"
                    style={{
                      background: `linear-gradient(to right, ${branding.primaryColor}, ${branding.secondaryColor})`,
                    }}
                  />
                  <p className="text-center text-xs text-zinc-500">Gradient</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
