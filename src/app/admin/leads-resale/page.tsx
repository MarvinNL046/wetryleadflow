import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getPlatformLeadsPool, getPlatformLeadsPoolStats } from "@/lib/actions/admin";
import {
  MapPinOff,
  Building2,
  Mail,
  Phone,
  MapPin,
  DollarSign,
  Clock,
  CheckCircle2,
  Users,
  TrendingUp,
  Shield,
  AlertTriangle,
} from "lucide-react";
import { LeadPoolActions } from "./lead-pool-actions";

export default async function LeadsResalePage() {
  const [leads, stats] = await Promise.all([
    getPlatformLeadsPool(),
    getPlatformLeadsPoolStats(),
  ]);

  return (
    <div className="p-8">
      {/* Header with Security Notice */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-amber-500">
              <MapPinOff className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Platform Leads Pool</h1>
              <p className="text-zinc-500">Leads buiten werkgebied - beschikbaar voor doorverkoop</p>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950/50 dark:text-red-400">
            <Shield className="h-4 w-4" />
            <span>Super-Admin Only</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-8 grid gap-4 md:grid-cols-3 lg:grid-cols-6">
        <Card className="border-orange-200/50 bg-orange-50/30 dark:border-orange-900/50 dark:bg-orange-950/20">
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-900/50">
              <MapPinOff className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-orange-700 dark:text-orange-400">{stats.available}</p>
              <p className="text-sm text-orange-600/80 dark:text-orange-500">Beschikbaar</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-200/50 bg-blue-50/30 dark:border-blue-900/50 dark:bg-blue-950/20">
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/50">
              <Clock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-700 dark:text-blue-400">{stats.reserved}</p>
              <p className="text-sm text-blue-600/80 dark:text-blue-500">Gereserveerd</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200/50 bg-green-50/30 dark:border-green-900/50 dark:bg-green-950/20">
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/50">
              <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-green-700 dark:text-green-400">{stats.sold}</p>
              <p className="text-sm text-green-600/80 dark:text-green-500">Verkocht</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-zinc-200/50 bg-zinc-50/30 dark:border-zinc-800/50 dark:bg-zinc-900/20">
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800/50">
              <AlertTriangle className="h-6 w-6 text-zinc-600 dark:text-zinc-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-zinc-700 dark:text-zinc-400">{stats.expired + stats.withdrawn}</p>
              <p className="text-sm text-zinc-600/80 dark:text-zinc-500">Verlopen/Verwijderd</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-violet-200/50 bg-violet-50/30 dark:border-violet-900/50 dark:bg-violet-950/20">
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-violet-100 dark:bg-violet-900/50">
              <Users className="h-6 w-6 text-violet-600 dark:text-violet-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-violet-700 dark:text-violet-400">{stats.total}</p>
              <p className="text-sm text-violet-600/80 dark:text-violet-500">Totaal</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-emerald-200/50 bg-emerald-50/30 dark:border-emerald-900/50 dark:bg-emerald-950/20">
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/50">
              <DollarSign className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">
                €{stats.totalRevenue.toFixed(0)}
              </p>
              <p className="text-sm text-emerald-600/80 dark:text-emerald-500">Omzet</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Leads List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPinOff className="h-5 w-5 text-orange-500" />
            Platform Leads Pool ({leads.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {leads.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
                <MapPinOff className="h-8 w-8 text-zinc-400" />
              </div>
              <p className="text-lg font-medium text-zinc-600 dark:text-zinc-400">
                Geen leads in de pool
              </p>
              <p className="mt-1 text-sm text-zinc-500">
                Wanneer leads als &quot;buiten werkgebied&quot; worden gemarkeerd, verschijnen ze hier.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {leads.map((lead) => (
                <div
                  key={lead.id}
                  className="rounded-lg border border-zinc-200/50 bg-white p-4 transition-all hover:border-orange-200 hover:shadow-md dark:border-zinc-800/50 dark:bg-zinc-900/50 dark:hover:border-orange-900"
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    {/* Lead Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-blue-500 text-sm font-semibold text-white">
                          {lead.firstName?.[0] || lead.email?.[0]?.toUpperCase() || "?"}
                        </div>
                        <div>
                          <p className="font-semibold">
                            {[lead.firstName, lead.lastName].filter(Boolean).join(" ") || "Onbekend"}
                          </p>
                          <div className="flex items-center gap-2 text-sm text-zinc-500">
                            {lead.company && (
                              <span className="flex items-center gap-1">
                                <Building2 className="h-3 w-3" />
                                {lead.company}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Contact Details */}
                      <div className="mt-3 flex flex-wrap gap-4 text-sm text-zinc-600 dark:text-zinc-400">
                        {lead.email && (
                          <a href={`mailto:${lead.email}`} className="flex items-center gap-1 hover:text-violet-600">
                            <Mail className="h-3.5 w-3.5" />
                            {lead.email}
                          </a>
                        )}
                        {lead.phone && (
                          <a href={`tel:${lead.phone}`} className="flex items-center gap-1 hover:text-violet-600">
                            <Phone className="h-3.5 w-3.5" />
                            {lead.phone}
                          </a>
                        )}
                        {(lead.city || lead.postalCode) && (
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3.5 w-3.5" />
                            {[lead.postalCode, lead.city].filter(Boolean).join(" ")}
                          </span>
                        )}
                      </div>

                      {/* Label & Notes */}
                      <div className="mt-2 flex flex-wrap gap-2">
                        {lead.label && (
                          <Badge className="border-0 bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-400">
                            {lead.label}
                          </Badge>
                        )}
                        {lead.notes && (
                          <span className="text-sm text-zinc-500 italic">
                            {lead.notes}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Status & Actions */}
                    <div className="flex items-center gap-3">
                      <Badge
                        className={
                          lead.status === "available"
                            ? "border-0 bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-400"
                            : lead.status === "reserved"
                              ? "border-0 bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400"
                              : lead.status === "sold"
                                ? "border-0 bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400"
                                : "border-0 bg-zinc-100 text-zinc-700 dark:bg-zinc-800/50 dark:text-zinc-400"
                        }
                      >
                        {lead.status === "available" && "Beschikbaar"}
                        {lead.status === "reserved" && "Gereserveerd"}
                        {lead.status === "sold" && "Verkocht"}
                        {lead.status === "expired" && "Verlopen"}
                        {lead.status === "withdrawn" && "Verwijderd"}
                      </Badge>

                      <LeadPoolActions
                        leadId={lead.id}
                        currentStatus={lead.status}
                      />
                    </div>
                  </div>

                  {/* Source Info */}
                  <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-zinc-400">
                    <span className="flex items-center gap-1">
                      <Building2 className="h-3 w-3" />
                      Bron: {lead.sourceOrg?.name || "Onbekend"}
                    </span>
                    {lead.sourceAgency && (
                      <>
                        <span>•</span>
                        <span>Agency: {lead.sourceAgency.name}</span>
                      </>
                    )}
                    <span>•</span>
                    <span>
                      Toegevoegd:{" "}
                      {new Date(lead.createdAt).toLocaleDateString("nl-NL", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                    {lead.status === "sold" && lead.soldAt && (
                      <>
                        <span>•</span>
                        <span className="text-green-500">
                          Verkocht: {new Date(lead.soldAt).toLocaleDateString("nl-NL")}
                          {lead.price && ` voor €${parseFloat(lead.price).toFixed(2)}`}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
