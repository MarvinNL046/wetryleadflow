"use client";

import { useState, useEffect } from "react";
import { Mail, Globe, Building2, Save, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { updateAgencySettings, getAgencySettingsForClient } from "@/lib/actions/agency";
import { DeleteAgencyDialog } from "@/components/agency/delete-agency-dialog";

interface SettingsData {
  name: string;
  email: string;
  website: string;
  slug: string;
}

export default function AgencySettingsPage() {
  const [settings, setSettings] = useState<SettingsData>({
    name: "",
    email: "",
    website: "",
    slug: "",
  });
  const [originalSettings, setOriginalSettings] = useState<SettingsData>({
    name: "",
    email: "",
    website: "",
    slug: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {
    try {
      const agencyData = await getAgencySettingsForClient();
      const data: SettingsData = {
        name: agencyData.name,
        email: agencyData.email,
        website: agencyData.website || "",
        slug: agencyData.slug,
      };
      setSettings(data);
      setOriginalSettings(data);
    } catch (error) {
      console.error("Failed to load settings:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSave() {
    setIsSaving(true);
    setMessage(null);

    try {
      const result = await updateAgencySettings({
        name: settings.name,
        email: settings.email,
        website: settings.website || undefined,
      });

      if (result.success) {
        setMessage({ type: "success", text: "Settings updated successfully!" });
        setOriginalSettings(settings);
      } else {
        setMessage({ type: "error", text: "Failed to update settings." });
      }
    } catch {
      setMessage({ type: "error", text: "An error occurred. Please try again." });
    } finally {
      setIsSaving(false);
    }
  }

  const hasChanges = JSON.stringify(settings) !== JSON.stringify(originalSettings);

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
        <h1 className="text-2xl font-bold">Agency Settings</h1>
        <p className="text-zinc-500">Manage your agency details</p>
      </div>

      <div className="max-w-2xl space-y-6">
        {/* General Settings */}
        <Card className="border-zinc-200/50 bg-white/50 dark:border-zinc-800/50 dark:bg-zinc-900/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-violet-500" />
              General Information
            </CardTitle>
            <CardDescription>
              Basic details about your agency
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Agency Name</Label>
              <Input
                id="name"
                value={settings.name}
                onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                placeholder="Your Agency Name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">URL Slug</Label>
              <div className="flex items-center gap-2">
                <span className="text-sm text-zinc-500">leadflow.com/</span>
                <Input
                  id="slug"
                  value={settings.slug}
                  disabled
                  className="flex-1 bg-zinc-100 dark:bg-zinc-800"
                />
                <span className="text-sm text-zinc-500">/crm</span>
              </div>
              <p className="text-xs text-zinc-500">
                URL slugs cannot be changed. Contact support if needed.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Contact Settings */}
        <Card className="border-zinc-200/50 bg-white/50 dark:border-zinc-800/50 dark:bg-zinc-900/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-violet-500" />
              Contact Information
            </CardTitle>
            <CardDescription>
              How clients and LeadFlow can reach you
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Contact Email</Label>
              <Input
                id="email"
                type="email"
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                placeholder="agency@example.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-zinc-400" />
                <Input
                  id="website"
                  type="url"
                  value={settings.website}
                  onChange={(e) => setSettings({ ...settings, website: e.target.value })}
                  placeholder="https://yourwebsite.com"
                  className="flex-1"
                />
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
        </div>

        {/* Danger Zone */}
        <Separator className="my-8" />

        <Card className="border-red-200/50 bg-red-50/50 dark:border-red-900/50 dark:bg-red-950/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600 dark:text-red-400">
              <Trash2 className="h-5 w-5" />
              Danger Zone
            </CardTitle>
            <CardDescription>
              Irreversible actions for your agency
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Delete Agency</p>
                <p className="text-sm text-zinc-500">
                  Permanently delete your agency and all associated data
                </p>
              </div>
              <Button
                variant="destructive"
                onClick={() => setIsDeleteDialogOpen(true)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Agency
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Delete Agency Dialog */}
      <DeleteAgencyDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        agencyName={settings.name}
      />
    </div>
  );
}
