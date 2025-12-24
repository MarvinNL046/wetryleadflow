"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { updateSaasSettings } from "@/lib/actions/agency-plans";
import { Loader2, ExternalLink, Check } from "lucide-react";
import type { AgencySaasSettings } from "@/lib/db/schema";

interface SaasSettingsFormProps {
  settings: AgencySaasSettings;
  agencySlug: string;
}

export function SaasSettingsForm({ settings, agencySlug }: SaasSettingsFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [selfSignupEnabled, setSelfSignupEnabled] = useState(
    settings.selfSignupEnabled
  );
  const [requirePaymentOnSignup, setRequirePaymentOnSignup] = useState(
    settings.requirePaymentOnSignup
  );
  const [trialDays, setTrialDays] = useState(settings.trialDays);
  const [signupPageTitle, setSignupPageTitle] = useState(
    settings.signupPageTitle || ""
  );
  const [signupPageDescription, setSignupPageDescription] = useState(
    settings.signupPageDescription || ""
  );
  const [termsUrl, setTermsUrl] = useState(settings.termsUrl || "");
  const [privacyUrl, setPrivacyUrl] = useState(settings.privacyUrl || "");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const result = await updateSaasSettings({
        selfSignupEnabled,
        requirePaymentOnSignup,
        trialDays,
        signupPageTitle: signupPageTitle || undefined,
        signupPageDescription: signupPageDescription || undefined,
        termsUrl: termsUrl || undefined,
        privacyUrl: privacyUrl || undefined,
      });

      if ("error" in result) {
        setError(result.error ?? "Unknown error");
      } else {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (err) {
      console.error("Error saving settings:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  const signupUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/${agencySlug}/signup`
      : `https://yourapp.com/${agencySlug}/signup`;

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Signup Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Signup Settings</CardTitle>
            <CardDescription>
              Control how clients can sign up for your service
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <Label htmlFor="selfSignup">Enable Self-Signup</Label>
                <p className="text-sm text-muted-foreground">
                  Allow clients to sign up without invitation
                </p>
              </div>
              <Switch
                id="selfSignup"
                checked={selfSignupEnabled}
                onCheckedChange={setSelfSignupEnabled}
              />
            </div>

            <div className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <Label htmlFor="requirePayment">Require Payment on Signup</Label>
                <p className="text-sm text-muted-foreground">
                  Clients must enter payment details to start
                </p>
              </div>
              <Switch
                id="requirePayment"
                checked={requirePaymentOnSignup}
                onCheckedChange={setRequirePaymentOnSignup}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="trialDays">Trial Period (days)</Label>
              <Input
                id="trialDays"
                type="number"
                min="0"
                max="90"
                value={trialDays}
                onChange={(e) => setTrialDays(parseInt(e.target.value) || 0)}
              />
              <p className="text-sm text-muted-foreground">
                Set to 0 to disable free trial
              </p>
            </div>

            {selfSignupEnabled && (
              <div className="rounded-lg bg-violet-50 p-4 dark:bg-violet-900/20">
                <p className="mb-2 text-sm font-medium">Your signup page:</p>
                <div className="flex items-center gap-2">
                  <code className="flex-1 rounded bg-white px-3 py-2 text-sm dark:bg-zinc-800">
                    {signupUrl}
                  </code>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    asChild
                  >
                    <a
                      href={`/${agencySlug}/signup`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Signup Page Customization */}
        <Card>
          <CardHeader>
            <CardTitle>Page Customization</CardTitle>
            <CardDescription>
              Customize the content on your signup page
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="signupTitle">Page Title</Label>
              <Input
                id="signupTitle"
                placeholder="e.g., Welcome to Our Platform"
                value={signupPageTitle}
                onChange={(e) => setSignupPageTitle(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="signupDescription">Page Description</Label>
              <Textarea
                id="signupDescription"
                placeholder="A compelling description of your service..."
                value={signupPageDescription}
                onChange={(e) => setSignupPageDescription(e.target.value)}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Legal Links */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Legal Links</CardTitle>
            <CardDescription>
              Link to your terms of service and privacy policy
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="termsUrl">Terms of Service URL</Label>
                <Input
                  id="termsUrl"
                  type="url"
                  placeholder="https://yoursite.com/terms"
                  value={termsUrl}
                  onChange={(e) => setTermsUrl(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="privacyUrl">Privacy Policy URL</Label>
                <Input
                  id="privacyUrl"
                  type="url"
                  placeholder="https://yoursite.com/privacy"
                  value={privacyUrl}
                  onChange={(e) => setPrivacyUrl(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {error && (
        <div className="mt-6 rounded-lg bg-red-50 p-4 text-sm text-red-600 dark:bg-red-900/30 dark:text-red-400">
          {error}
        </div>
      )}

      <div className="mt-8 flex justify-end">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : success ? (
            <Check className="mr-2 h-4 w-4" />
          ) : null}
          {success ? "Saved!" : "Save Settings"}
        </Button>
      </div>
    </form>
  );
}
