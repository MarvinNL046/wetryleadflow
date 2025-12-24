"use client";

import { useState, useEffect, useTransition } from "react";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getInvoiceSettings, updateInvoiceSettings } from "@/lib/actions/invoicing";

type Settings = {
  quotationPrefix: string;
  quotationNextNumber: number;
  invoicePrefix: string;
  invoiceNextNumber: number;
  defaultPaymentTerms: number;
  defaultTaxRate: string;
  defaultCurrency: string;
  companyName: string | null;
  companyAddress: string | null;
  companyEmail: string | null;
  companyPhone: string | null;
  companyWebsite: string | null;
  kvkNumber: string | null;
  vatNumber: string | null;
  iban: string | null;
  bic: string | null;
  defaultIntroduction: string | null;
  defaultTerms: string | null;
  defaultFooter: string | null;
  enableReminders: boolean;
};

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {
    setIsLoading(true);
    try {
      const data = await getInvoiceSettings();
      setSettings(data as Settings);
    } catch (error) {
      console.error("Failed to load settings:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!settings) return;

    startTransition(async () => {
      try {
        await updateInvoiceSettings({
          quotationPrefix: settings.quotationPrefix,
          invoicePrefix: settings.invoicePrefix,
          defaultPaymentTerms: settings.defaultPaymentTerms,
          defaultTaxRate: settings.defaultTaxRate,
          defaultCurrency: settings.defaultCurrency,
          companyName: settings.companyName ?? undefined,
          companyAddress: settings.companyAddress ?? undefined,
          companyEmail: settings.companyEmail ?? undefined,
          companyPhone: settings.companyPhone ?? undefined,
          companyWebsite: settings.companyWebsite ?? undefined,
          kvkNumber: settings.kvkNumber ?? undefined,
          vatNumber: settings.vatNumber ?? undefined,
          iban: settings.iban ?? undefined,
          bic: settings.bic ?? undefined,
          defaultIntroduction: settings.defaultIntroduction ?? undefined,
          defaultTerms: settings.defaultTerms ?? undefined,
          defaultFooter: settings.defaultFooter ?? undefined,
          enableReminders: settings.enableReminders,
        });
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      } catch (error) {
        console.error("Failed to save settings:", error);
      }
    });
  }

  function updateField<K extends keyof Settings>(field: K, value: Settings[K]) {
    if (!settings) return;
    setSettings({ ...settings, [field]: value });
  }

  if (isLoading || !settings) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-violet-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Facturatie Instellingen</h2>
        <p className="text-sm text-zinc-500">
          Configureer je bedrijfsgegevens en standaardwaarden
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Company Details */}
        <Card>
          <CardHeader>
            <CardTitle>Bedrijfsgegevens</CardTitle>
            <CardDescription>
              Deze gegevens verschijnen op je offertes en facturen
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="companyName">Bedrijfsnaam</Label>
                <Input
                  id="companyName"
                  value={settings.companyName ?? ""}
                  onChange={(e) => updateField("companyName", e.target.value)}
                  placeholder="Jouw Bedrijf B.V."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="companyEmail">Email</Label>
                <Input
                  id="companyEmail"
                  type="email"
                  value={settings.companyEmail ?? ""}
                  onChange={(e) => updateField("companyEmail", e.target.value)}
                  placeholder="facturen@bedrijf.nl"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="companyAddress">Adres</Label>
              <Textarea
                id="companyAddress"
                value={settings.companyAddress ?? ""}
                onChange={(e) => updateField("companyAddress", e.target.value)}
                placeholder="Straatnaam 123&#10;1234 AB Amsterdam"
                rows={3}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="companyPhone">Telefoon</Label>
                <Input
                  id="companyPhone"
                  value={settings.companyPhone ?? ""}
                  onChange={(e) => updateField("companyPhone", e.target.value)}
                  placeholder="+31 20 123 4567"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="companyWebsite">Website</Label>
                <Input
                  id="companyWebsite"
                  value={settings.companyWebsite ?? ""}
                  onChange={(e) => updateField("companyWebsite", e.target.value)}
                  placeholder="https://www.bedrijf.nl"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Business Info */}
        <Card>
          <CardHeader>
            <CardTitle>Zakelijke gegevens</CardTitle>
            <CardDescription>
              KVK, BTW en bankgegevens voor je facturen
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="kvkNumber">KVK nummer</Label>
                <Input
                  id="kvkNumber"
                  value={settings.kvkNumber ?? ""}
                  onChange={(e) => updateField("kvkNumber", e.target.value)}
                  placeholder="12345678"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="vatNumber">BTW nummer</Label>
                <Input
                  id="vatNumber"
                  value={settings.vatNumber ?? ""}
                  onChange={(e) => updateField("vatNumber", e.target.value)}
                  placeholder="NL123456789B01"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="iban">IBAN</Label>
                <Input
                  id="iban"
                  value={settings.iban ?? ""}
                  onChange={(e) => updateField("iban", e.target.value)}
                  placeholder="NL00BANK0123456789"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bic">BIC</Label>
                <Input
                  id="bic"
                  value={settings.bic ?? ""}
                  onChange={(e) => updateField("bic", e.target.value)}
                  placeholder="BANKNL2A"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Numbering */}
        <Card>
          <CardHeader>
            <CardTitle>Nummering</CardTitle>
            <CardDescription>
              Prefix en startnummer voor offertes en facturen
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="quotationPrefix">Offerte prefix</Label>
                <Input
                  id="quotationPrefix"
                  value={settings.quotationPrefix}
                  onChange={(e) => updateField("quotationPrefix", e.target.value)}
                  placeholder="OFF"
                />
                <p className="text-xs text-zinc-500">
                  Voorbeeld: {settings.quotationPrefix}-2025-{String(settings.quotationNextNumber).padStart(4, "0")}
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="invoicePrefix">Factuur prefix</Label>
                <Input
                  id="invoicePrefix"
                  value={settings.invoicePrefix}
                  onChange={(e) => updateField("invoicePrefix", e.target.value)}
                  placeholder="FAC"
                />
                <p className="text-xs text-zinc-500">
                  Voorbeeld: {settings.invoicePrefix}-2025-{String(settings.invoiceNextNumber).padStart(4, "0")}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Defaults */}
        <Card>
          <CardHeader>
            <CardTitle>Standaardwaarden</CardTitle>
            <CardDescription>
              Standaard instellingen voor nieuwe offertes en facturen
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="defaultPaymentTerms">Betalingstermijn (dagen)</Label>
                <Input
                  id="defaultPaymentTerms"
                  type="number"
                  min="0"
                  value={settings.defaultPaymentTerms}
                  onChange={(e) => updateField("defaultPaymentTerms", parseInt(e.target.value) || 14)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="defaultTaxRate">BTW percentage</Label>
                <Input
                  id="defaultTaxRate"
                  value={settings.defaultTaxRate}
                  onChange={(e) => updateField("defaultTaxRate", e.target.value)}
                  placeholder="21.00"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="defaultCurrency">Valuta</Label>
                <Input
                  id="defaultCurrency"
                  value={settings.defaultCurrency}
                  onChange={(e) => updateField("defaultCurrency", e.target.value)}
                  placeholder="EUR"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="defaultIntroduction">Standaard introductie</Label>
              <Textarea
                id="defaultIntroduction"
                value={settings.defaultIntroduction ?? ""}
                onChange={(e) => updateField("defaultIntroduction", e.target.value)}
                placeholder="Bedankt voor uw interesse. Hierbij ontvangt u onze offerte..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="defaultTerms">Standaard voorwaarden</Label>
              <Textarea
                id="defaultTerms"
                value={settings.defaultTerms ?? ""}
                onChange={(e) => updateField("defaultTerms", e.target.value)}
                placeholder="Op al onze diensten zijn onze algemene voorwaarden van toepassing..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="defaultFooter">Standaard footer</Label>
              <Textarea
                id="defaultFooter"
                value={settings.defaultFooter ?? ""}
                onChange={(e) => updateField("defaultFooter", e.target.value)}
                placeholder="Met vriendelijke groet..."
                rows={2}
              />
            </div>
          </CardContent>
        </Card>

        {/* Reminders */}
        <Card>
          <CardHeader>
            <CardTitle>Betalingsherinneringen</CardTitle>
            <CardDescription>
              Automatische herinneringen voor openstaande facturen
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Herinneringen inschakelen</p>
                <p className="text-sm text-zinc-500">
                  Verstuur automatisch herinneringen na 7, 14 en 30 dagen
                </p>
              </div>
              <Switch
                checked={settings.enableReminders}
                onCheckedChange={(checked) => updateField("enableReminders", checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex items-center gap-4">
          <Button type="submit" disabled={isPending}>
            <Save className="mr-2 h-4 w-4" />
            {isPending ? "Opslaan..." : "Instellingen opslaan"}
          </Button>
          {saved && (
            <span className="text-sm text-green-600">
              ✓ Instellingen opgeslagen
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
