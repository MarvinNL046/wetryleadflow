"use client";

import { useState, useTransition, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { processLead, createTestLead } from "@/lib/actions/crm";
import {
  Phone,
  PhoneOff,
  PhoneMissed,
  Building2,
  Mail,
  Plus,
  Loader2,
  Bell,
  CheckCircle2,
  X,
  ArrowLeft,
  CalendarPlus,
  Clock,
  ThumbsDown,
  AlertCircle,
  Send,
  Megaphone,
  MapPin,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface Lead {
  id: number;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  phone: string | null;
  company: string | null;
  street: string | null;
  houseNumber: string | null;
  houseNumberAddition: string | null;
  postalCode: string | null;
  city: string | null;
  province: string | null;
  country: string | null;
  callCount: number | null;
  lastCallResult: string | null;
  createdAt: Date;
  leadSource: string | null;
  metaFormName: string | null;
  opportunities: Array<{
    id: number;
    stage: { name: string; color: string | null } | null;
  }>;
}

interface CallbackPeriod {
  days: number;
  label: string;
  enabled: boolean;
}

interface IncomingLeadsProps {
  leads: Lead[];
  callbackPeriods?: CallbackPeriod[]; // From CRM settings
  maxCallAttempts?: number; // From CRM settings (for badge display)
}

type DialogView = "main" | "answered_options" | "callback_options";
type ActionType =
  | "not_answered"
  | "schedule_now"
  | "callback_later"
  | "not_interested"
  | "invalid_number";

// Default callback periods (used if none configured)
const DEFAULT_CALLBACK_PERIODS: CallbackPeriod[] = [
  { days: 7, label: "1 Week", enabled: true },
  { days: 30, label: "1 Maand", enabled: true },
  { days: 90, label: "3 Maanden", enabled: true },
  { days: 180, label: "6 Maanden", enabled: true },
];

export function IncomingLeads({
  leads: initialLeads,
  callbackPeriods,
  maxCallAttempts = 3,
}: IncomingLeadsProps) {
  const router = useRouter();
  const [leads, setLeads] = useState(initialLeads);
  const previousLeadIds = useRef<Set<number>>(new Set(initialLeads.map(l => l.id)));
  const [newLeadIds, setNewLeadIds] = useState<Set<number>>(new Set());

  // Sync local state with server state and detect new leads
  useEffect(() => {
    const currentIds = new Set(initialLeads.map(l => l.id));
    const newIds = new Set<number>();

    // Find leads that are in initialLeads but weren't in previous state
    initialLeads.forEach(lead => {
      if (!previousLeadIds.current.has(lead.id)) {
        newIds.add(lead.id);
      }
    });

    // Update state
    setLeads(initialLeads);
    setNewLeadIds(newIds);
    previousLeadIds.current = currentIds;

    // Clear new lead ids after animation completes
    if (newIds.size > 0) {
      const timer = setTimeout(() => {
        setNewLeadIds(new Set());
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [initialLeads]);

  // Get enabled callback periods (from settings or defaults)
  const enabledPeriods = callbackPeriods
    ? callbackPeriods.filter((p) => p.enabled)
    : DEFAULT_CALLBACK_PERIODS;
  const [processingAction, setProcessingAction] = useState<string | null>(null);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [dialogView, setDialogView] = useState<DialogView>("main");
  const [, startTransition] = useTransition();
  const [isCreatingLead, setIsCreatingLead] = useState(false);

  function openLeadDialog(lead: Lead) {
    setSelectedLead(lead);
    setDialogView("main");
  }

  function closeDialog() {
    setSelectedLead(null);
    setProcessingAction(null);
    setDialogView("main");
  }

  async function handleAction(action: ActionType, callbackDays?: number) {
    if (!selectedLead) return;

    const processingKey = callbackDays ? `${action}_${callbackDays}` : action;
    setProcessingAction(processingKey);
    try {
      await processLead({
        contactId: selectedLead.id,
        action,
        callbackDays,
      });

      // Remove from list for completed/scheduled actions
      if (action === "schedule_now" || action === "not_interested" || action === "invalid_number" || action === "callback_later") {
        // All these remove the lead from the queue
        setLeads((prev) => prev.filter((lead) => lead.id !== selectedLead.id));
      } else if (action === "not_answered") {
        // Not answered: update call count but keep in list (short-term follow-up)
        setLeads((prev) =>
          prev.map((lead) =>
            lead.id === selectedLead.id
              ? {
                  ...lead,
                  callCount: (lead.callCount ?? 0) + 1,
                  lastCallResult: action,
                }
              : lead
          )
        );
      }

      closeDialog();
      startTransition(() => {
        router.refresh();
      });
    } catch (error) {
      console.error("Error processing lead:", error);
      alert("Er ging iets mis: " + (error as Error).message);
    } finally {
      setProcessingAction(null);
    }
  }

  async function handleCreateTestLead() {
    setIsCreatingLead(true);
    try {
      await createTestLead();
      startTransition(() => {
        router.refresh();
      });
    } finally {
      setIsCreatingLead(false);
    }
  }

  const getCallCountBadge = (count: number | null) => {
    const c = count ?? 0;
    if (c === 0) return null;
    if (c >= maxCallAttempts) {
      return (
        <Badge className="border-0 bg-red-500/20 text-red-600 dark:text-red-400">
          <PhoneMissed className="mr-1 h-3 w-3" />
          {c}x gebeld - Max bereikt
        </Badge>
      );
    }
    return (
      <Badge className="border-0 bg-amber-500/20 text-amber-600 dark:text-amber-400">
        <PhoneMissed className="mr-1 h-3 w-3" />
        {c}x gebeld
      </Badge>
    );
  };

  if (leads.length === 0) {
    return (
      <Card className="dashboard-stat-card border-dashed border-zinc-300 bg-zinc-50/50 dark:border-zinc-700 dark:bg-zinc-900/50">
        <CardContent className="flex flex-col items-center justify-center py-8">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20">
            <Bell className="h-6 w-6 text-green-500" />
          </div>
          <p className="mb-2 font-medium">Geen nieuwe leads</p>
          <p className="mb-4 text-center text-sm text-zinc-500">
            Alle leads zijn verwerkt of er zijn nog geen leads binnengekomen.
          </p>
          <Button
            onClick={handleCreateTestLead}
            disabled={isCreatingLead}
            className="bg-gradient-to-r from-violet-600 to-blue-600 text-white"
          >
            {isCreatingLead ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Plus className="mr-2 h-4 w-4" />
            )}
            Test Lead Aanmaken
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-500/20">
            <Phone className="h-4 w-4 text-green-500" />
          </div>
          <div>
            <h3 className="font-semibold">Nieuwe Leads</h3>
            <p className="text-xs text-zinc-500">{leads.length} te bellen</p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleCreateTestLead}
          disabled={isCreatingLead}
        >
          {isCreatingLead ? (
            <Loader2 className="mr-1 h-3 w-3 animate-spin" />
          ) : (
            <Plus className="mr-1 h-3 w-3" />
          )}
          Test Lead
        </Button>
      </div>

      {/* Lead Cards */}
      <AnimatePresence mode="popLayout">
        {leads.map((lead, index) => {
          const displayName =
            [lead.firstName, lead.lastName].filter(Boolean).join(" ") ||
            lead.email ||
            "Onbekend";
          const initial =
            lead.firstName?.[0] ??
            lead.email?.[0]?.toUpperCase() ??
            "?";

          const isNewLead = newLeadIds.has(lead.id);

          return (
            <motion.div
              key={lead.id}
              initial={isNewLead
                ? { opacity: 0, y: -50, scale: 0.8 }
                : { opacity: 0, y: 20, scale: 0.95 }
              }
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                  type: "spring",
                  stiffness: isNewLead ? 300 : 500,
                  damping: isNewLead ? 20 : 30,
                  delay: isNewLead ? 0 : index * 0.05
                }
              }}
              exit={{
                opacity: 0,
                x: -300,
                scale: 0.9,
                transition: {
                  duration: 0.3,
                  ease: "easeInOut"
                }
              }}
              layout
              layoutId={`lead-${lead.id}`}
              className={isNewLead ? "ring-2 ring-green-500/50 ring-offset-2" : ""}
            >
              <Card className={`dashboard-stat-card overflow-hidden backdrop-blur-sm transition-all hover:border-green-500/30 hover:shadow-lg dark:bg-zinc-900/80 ${
                isNewLead
                  ? "border-green-500/50 bg-green-50/50 dark:border-green-500/30 dark:bg-green-900/10"
                  : "border-zinc-200/50 bg-white/80 dark:border-zinc-800/50"
              }`}>
                <CardContent className="relative z-10 p-4">
                  {/* NEW badge for fresh leads */}
                  {isNewLead && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute right-2 top-2"
                    >
                      <Badge className="border-0 bg-green-500 text-white animate-pulse">
                        NIEUW
                      </Badge>
                    </motion.div>
                  )}

                  {/* Lead Info */}
                  <div className="flex items-start gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-gradient-to-br from-violet-500 to-blue-500 text-sm text-white">
                        {initial}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium truncate">
                          {displayName}
                        </span>
                        {lead.metaFormName && (
                          <Badge className="border-0 bg-blue-500/20 text-blue-600 dark:text-blue-400">
                            <Megaphone className="mr-1 h-3 w-3" />
                            {lead.metaFormName}
                          </Badge>
                        )}
                        {getCallCountBadge(lead.callCount)}
                      </div>

                      <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-zinc-500">
                        {lead.company && (
                          <span className="flex items-center gap-1">
                            <Building2 className="h-3 w-3" />
                            {lead.company}
                          </span>
                        )}
                        {lead.city && (
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {lead.city}
                          </span>
                        )}
                        {lead.email && (
                          <span className="flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {lead.email}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="mt-4">
                    <Button
                      type="button"
                      onClick={() => openLeadDialog(lead)}
                      className="w-full cursor-pointer bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700"
                    >
                      <Phone className="mr-2 h-4 w-4" />
                      Bel Nu
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* Lead Action Dialog */}
      <Dialog open={selectedLead !== null} onOpenChange={(open) => !open && closeDialog()}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              {dialogView === "answered_options" && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 mr-1"
                  onClick={() => setDialogView("main")}
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              )}
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-500">
                <Phone className="h-5 w-5 text-white" />
              </div>
              <div>
                <span className="block">
                  {selectedLead?.firstName} {selectedLead?.lastName}
                </span>
                <span className="block text-sm font-normal text-zinc-500">
                  {selectedLead?.company}
                </span>
              </div>
            </DialogTitle>
            <DialogDescription className="sr-only">
              Kies een actie voor deze lead
            </DialogDescription>
          </DialogHeader>

          {/* Phone Number */}
          {selectedLead?.phone && (
            <a
              href={`tel:${selectedLead.phone}`}
              className="flex items-center gap-3 rounded-lg bg-gradient-to-br from-green-500/10 to-emerald-500/10 p-4 text-xl font-bold text-green-600 transition-colors hover:from-green-500/20 hover:to-emerald-500/20 dark:text-green-400"
            >
              <Phone className="h-6 w-6" />
              {selectedLead.phone}
            </a>
          )}

          {/* Address Info */}
          {selectedLead && (selectedLead.street || selectedLead.city) && (
            <div className="rounded-lg bg-zinc-100/80 p-3 dark:bg-zinc-800/50">
              <div className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 text-violet-500 flex-shrink-0" />
                <div className="text-sm">
                  {selectedLead.street && (
                    <p className="font-medium text-zinc-700 dark:text-zinc-300">
                      {selectedLead.street} {selectedLead.houseNumber}
                      {selectedLead.houseNumberAddition}
                    </p>
                  )}
                  {(selectedLead.postalCode || selectedLead.city) && (
                    <p className="text-zinc-600 dark:text-zinc-400">
                      {selectedLead.postalCode} {selectedLead.city}
                    </p>
                  )}
                  {selectedLead.province && (
                    <p className="text-zinc-500 dark:text-zinc-500">
                      {selectedLead.province}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Call Count Info */}
          {selectedLead && (selectedLead.callCount ?? 0) > 0 && (
            <p className="text-center text-sm text-zinc-500">
              {selectedLead.callCount}x eerder geprobeerd te bellen
            </p>
          )}

          {/* Main View - Initial Buttons */}
          {dialogView === "main" && (
            <div className="grid gap-3 pt-2">
              {/* Opgenomen - opens sub-menu */}
              <Button
                type="button"
                onClick={() => setDialogView("answered_options")}
                disabled={processingAction !== null}
                className="h-12 bg-green-600 text-white hover:bg-green-700"
              >
                <CheckCircle2 className="mr-2 h-5 w-5" />
                Opgenomen
              </Button>

              {/* Niet Opgenomen - direct action */}
              <Button
                type="button"
                variant="outline"
                onClick={() => handleAction("not_answered")}
                disabled={processingAction !== null}
                className="h-12 border-amber-500/50 text-amber-600 hover:bg-amber-50 dark:text-amber-400 dark:hover:bg-amber-500/10"
              >
                {processingAction === "not_answered" ? (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                  <PhoneOff className="mr-2 h-5 w-5" />
                )}
                Niet Opgenomen
              </Button>

              {/* Geen geldig nummer - direct email */}
              <Button
                type="button"
                variant="outline"
                onClick={() => handleAction("invalid_number")}
                disabled={processingAction !== null}
                className="h-12 border-red-500/50 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10"
              >
                {processingAction === "invalid_number" ? (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                  <>
                    <AlertCircle className="mr-2 h-5 w-5" />
                    Geen Geldig Nummer
                    <Send className="ml-2 h-4 w-4 opacity-50" />
                  </>
                )}
              </Button>

              <Button
                type="button"
                variant="ghost"
                onClick={closeDialog}
                disabled={processingAction !== null}
                className="h-10 text-zinc-500"
              >
                <X className="mr-2 h-4 w-4" />
                Annuleren
              </Button>
            </div>
          )}

          {/* Answered Options View */}
          {dialogView === "answered_options" && (
            <div className="space-y-3 pt-2">
              <p className="text-center text-sm font-medium text-zinc-600 dark:text-zinc-400">
                Wat is het resultaat van het gesprek?
              </p>

              <div className="grid gap-3">
                {/* Nu Inplannen */}
                <Button
                  type="button"
                  onClick={() => handleAction("schedule_now")}
                  disabled={processingAction !== null}
                  className="h-14 bg-gradient-to-r from-violet-600 to-blue-600 text-white hover:from-violet-700 hover:to-blue-700"
                >
                  {processingAction === "schedule_now" ? (
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  ) : (
                    <CalendarPlus className="mr-2 h-5 w-5" />
                  )}
                  <div className="text-left">
                    <span className="block font-semibold">Nu Inplannen</span>
                    <span className="block text-xs opacity-80">Afspraak gemaakt</span>
                  </div>
                </Button>

                {/* Later Terugbellen - opens period selection (only if periods are configured) */}
                {enabledPeriods.length > 0 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setDialogView("callback_options")}
                    disabled={processingAction !== null}
                    className="h-14 border-blue-500/50 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-500/10"
                  >
                    <Clock className="mr-2 h-5 w-5" />
                    <div className="text-left flex-1">
                      <span className="block font-semibold">Later Terugbellen</span>
                      <span className="block text-xs opacity-70">Kies wanneer</span>
                    </div>
                    <ArrowLeft className="h-4 w-4 rotate-180 opacity-50" />
                  </Button>
                )}

                {/* Geen Interesse */}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleAction("not_interested")}
                  disabled={processingAction !== null}
                  className="h-14 border-zinc-300 text-zinc-600 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800"
                >
                  {processingAction === "not_interested" ? (
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  ) : (
                    <ThumbsDown className="mr-2 h-5 w-5" />
                  )}
                  <div className="text-left">
                    <span className="block font-semibold">Geen Interesse</span>
                    <span className="block text-xs opacity-70">Lead afsluiten</span>
                  </div>
                </Button>
              </div>

              <Button
                type="button"
                variant="ghost"
                onClick={() => setDialogView("main")}
                disabled={processingAction !== null}
                className="w-full h-10 text-zinc-500"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Terug
              </Button>
            </div>
          )}

          {/* Callback Period Options View */}
          {dialogView === "callback_options" && (
            <div className="space-y-3 pt-2">
              <p className="text-center text-sm font-medium text-zinc-600 dark:text-zinc-400">
                Wanneer wil je terugbellen?
              </p>

              <div className="grid gap-2">
                {enabledPeriods.map((period) => (
                  <Button
                    key={period.days}
                    type="button"
                    variant="outline"
                    onClick={() => handleAction("callback_later", period.days)}
                    disabled={processingAction !== null}
                    className="h-12 justify-between border-blue-500/30 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-500/10"
                  >
                    {processingAction === `callback_later_${period.days}` ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Clock className="mr-2 h-4 w-4" />
                    )}
                    <span className="font-semibold">{period.label}</span>
                    <span className="text-xs opacity-70">Over {period.days} dagen</span>
                  </Button>
                ))}
              </div>

              <Button
                type="button"
                variant="ghost"
                onClick={() => setDialogView("answered_options")}
                disabled={processingAction !== null}
                className="w-full h-10 text-zinc-500"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Terug
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
