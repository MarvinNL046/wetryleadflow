"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import {
  getOpportunity,
  createNote,
  deleteOpportunity,
  updateContact,
  updateOpportunity,
} from "@/lib/actions/crm";
import { formatDistanceToNow } from "date-fns";
import { nl } from "date-fns/locale";
import {
  User,
  Building2,
  Calendar,
  DollarSign,
  Clock,
  Trash2,
  MessageSquare,
  Mail,
  Phone,
  Briefcase,
  Edit3,
  Save,
  X,
  History,
  ChevronRight,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface OpportunityDrawerProps {
  opportunityId: number | null;
  open: boolean;
  onClose: () => void;
}

type OpportunityData = Awaited<ReturnType<typeof getOpportunity>>;

type TabType = "contact" | "deal" | "notes" | "history";

export function OpportunityDrawer({
  opportunityId,
  open,
  onClose,
}: OpportunityDrawerProps) {
  const router = useRouter();
  const [opportunity, setOpportunity] = useState<OpportunityData | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("contact");
  const [noteContent, setNoteContent] = useState("");
  const [addingNote, setAddingNote] = useState(false);
  const [isPending, startTransition] = useTransition();

  // Edit states
  const [isEditingContact, setIsEditingContact] = useState(false);
  const [isEditingDeal, setIsEditingDeal] = useState(false);
  const [savingContact, setSavingContact] = useState(false);
  const [savingDeal, setSavingDeal] = useState(false);

  // Contact form
  const [contactForm, setContactForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    position: "",
  });

  // Deal form
  const [dealForm, setDealForm] = useState({
    title: "",
    value: "",
    expectedCloseDate: "",
  });

  useEffect(() => {
    if (opportunityId && open) {
      setLoading(true);
      setActiveTab("contact");
      getOpportunity(opportunityId)
        .then((data) => {
          setOpportunity(data);
          if (data?.contact) {
            setContactForm({
              firstName: data.contact.firstName ?? "",
              lastName: data.contact.lastName ?? "",
              email: data.contact.email ?? "",
              phone: data.contact.phone ?? "",
              company: data.contact.company ?? "",
              position: data.contact.position ?? "",
            });
          }
          if (data) {
            setDealForm({
              title: data.title ?? "",
              value: data.value ?? "",
              expectedCloseDate: data.expectedCloseDate
                ? new Date(data.expectedCloseDate).toISOString().split("T")[0]
                : "",
            });
          }
        })
        .catch((error) => {
          console.error("Failed to load opportunity:", error);
          setOpportunity(null);
        })
        .finally(() => setLoading(false));
    }
  }, [opportunityId, open]);

  async function handleSaveContact() {
    if (!opportunity?.contact) return;
    setSavingContact(true);

    try {
      await updateContact(opportunity.contact.id, contactForm);
      const updated = await getOpportunity(opportunity.id);
      setOpportunity(updated);
      setIsEditingContact(false);
      startTransition(() => router.refresh());
    } catch (error) {
      console.error("Failed to update contact:", error);
      alert("Er ging iets mis bij het opslaan");
    } finally {
      setSavingContact(false);
    }
  }

  async function handleSaveDeal() {
    if (!opportunity) return;
    setSavingDeal(true);

    try {
      await updateOpportunity(opportunity.id, {
        title: dealForm.title,
        value: dealForm.value || undefined,
        expectedCloseDate: dealForm.expectedCloseDate
          ? new Date(dealForm.expectedCloseDate)
          : undefined,
      });
      const updated = await getOpportunity(opportunity.id);
      setOpportunity(updated);
      setIsEditingDeal(false);
      startTransition(() => router.refresh());
    } catch (error) {
      console.error("Failed to update deal:", error);
      alert("Er ging iets mis bij het opslaan");
    } finally {
      setSavingDeal(false);
    }
  }

  async function handleAddNote() {
    if (!opportunity || !noteContent.trim()) return;
    setAddingNote(true);

    try {
      await createNote({
        type: "opportunity",
        opportunityId: opportunity.id,
        content: noteContent,
      });
      setNoteContent("");
      const updated = await getOpportunity(opportunity.id);
      setOpportunity(updated);
    } catch (error) {
      console.error("Failed to add note:", error);
    } finally {
      setAddingNote(false);
    }
  }

  async function handleDelete() {
    if (!opportunity) return;
    if (!confirm("Weet je zeker dat je deze deal wilt verwijderen?")) return;

    await deleteOpportunity(opportunity.id);
    onClose();
    router.refresh();
  }

  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: "contact", label: "Contact", icon: <User className="h-4 w-4" /> },
    { id: "deal", label: "Deal", icon: <DollarSign className="h-4 w-4" /> },
    { id: "notes", label: "Notities", icon: <MessageSquare className="h-4 w-4" /> },
    { id: "history", label: "Historie", icon: <History className="h-4 w-4" /> },
  ];

  const formatCurrency = (value: string | null) => {
    if (!value) return "—";
    return new Intl.NumberFormat("nl-NL", {
      style: "currency",
      currency: "EUR",
    }).format(parseFloat(value));
  };

  return (
    <Sheet open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <SheetContent className="flex w-full flex-col gap-0 overflow-hidden p-0 sm:max-w-xl">
        {loading ? (
          <>
            <VisuallyHidden.Root>
              <SheetTitle>Loading opportunity</SheetTitle>
            </VisuallyHidden.Root>
            <div className="flex h-full items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-violet-500" />
            </div>
          </>
        ) : opportunity ? (
          <>
            {/* Header */}
            <div className="border-b border-zinc-200 bg-gradient-to-br from-violet-500/5 via-transparent to-blue-500/5 p-6 dark:border-zinc-800">
              <SheetHeader className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-14 w-14 ring-2 ring-violet-500/20">
                      <AvatarFallback className="bg-gradient-to-br from-violet-500 to-blue-500 text-lg text-white">
                        {opportunity.contact?.firstName?.[0] ??
                          opportunity.title[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <SheetTitle className="text-xl font-bold">
                        {opportunity.contact
                          ? [
                              opportunity.contact.firstName,
                              opportunity.contact.lastName,
                            ]
                              .filter(Boolean)
                              .join(" ") || "Geen naam"
                          : opportunity.title}
                      </SheetTitle>
                      <p className="text-sm text-zinc-500">
                        {opportunity.contact?.company ?? opportunity.title}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-red-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-500/10"
                    onClick={handleDelete}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <VisuallyHidden.Root>
                  <SheetDescription>Opportunity details</SheetDescription>
                </VisuallyHidden.Root>

                {/* Quick Stats */}
                <div className="flex flex-wrap gap-2">
                  <Badge
                    className="px-3 py-1"
                    style={{
                      backgroundColor:
                        (opportunity.stage?.color ?? "#6366f1") + "20",
                      color: opportunity.stage?.color ?? "#6366f1",
                      borderColor:
                        (opportunity.stage?.color ?? "#6366f1") + "40",
                    }}
                  >
                    {opportunity.stage?.name ?? "Geen stage"}
                  </Badge>
                  {opportunity.value && (
                    <Badge
                      variant="outline"
                      className="border-green-500/30 bg-green-500/10 px-3 py-1 text-green-600 dark:text-green-400"
                    >
                      <DollarSign className="mr-1 h-3 w-3" />
                      {formatCurrency(opportunity.value)}
                    </Badge>
                  )}
                </div>
              </SheetHeader>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-zinc-200 dark:border-zinc-800">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex flex-1 items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-colors",
                    activeTab === tab.id
                      ? "border-b-2 border-violet-500 text-violet-600 dark:text-violet-400"
                      : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
                  )}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {/* Contact Tab */}
              {activeTab === "contact" && opportunity.contact && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Contactgegevens</h3>
                    {!isEditingContact ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsEditingContact(true)}
                      >
                        <Edit3 className="mr-2 h-3 w-3" />
                        Bewerken
                      </Button>
                    ) : (
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setIsEditingContact(false);
                            setContactForm({
                              firstName: opportunity.contact?.firstName ?? "",
                              lastName: opportunity.contact?.lastName ?? "",
                              email: opportunity.contact?.email ?? "",
                              phone: opportunity.contact?.phone ?? "",
                              company: opportunity.contact?.company ?? "",
                              position: opportunity.contact?.position ?? "",
                            });
                          }}
                        >
                          <X className="mr-1 h-3 w-3" />
                          Annuleren
                        </Button>
                        <Button
                          size="sm"
                          onClick={handleSaveContact}
                          disabled={savingContact}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          {savingContact ? (
                            <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                          ) : (
                            <Save className="mr-2 h-3 w-3" />
                          )}
                          Opslaan
                        </Button>
                      </div>
                    )}
                  </div>

                  {isEditingContact ? (
                    <div className="grid gap-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">Voornaam</Label>
                          <Input
                            id="firstName"
                            value={contactForm.firstName}
                            onChange={(e) =>
                              setContactForm((f) => ({
                                ...f,
                                firstName: e.target.value,
                              }))
                            }
                            placeholder="Jan"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Achternaam</Label>
                          <Input
                            id="lastName"
                            value={contactForm.lastName}
                            onChange={(e) =>
                              setContactForm((f) => ({
                                ...f,
                                lastName: e.target.value,
                              }))
                            }
                            placeholder="Jansen"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">E-mail</Label>
                        <Input
                          id="email"
                          type="email"
                          value={contactForm.email}
                          onChange={(e) =>
                            setContactForm((f) => ({
                              ...f,
                              email: e.target.value,
                            }))
                          }
                          placeholder="jan@bedrijf.nl"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Telefoon</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={contactForm.phone}
                          onChange={(e) =>
                            setContactForm((f) => ({
                              ...f,
                              phone: e.target.value,
                            }))
                          }
                          placeholder="+31 6 12345678"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company">Bedrijf</Label>
                        <Input
                          id="company"
                          value={contactForm.company}
                          onChange={(e) =>
                            setContactForm((f) => ({
                              ...f,
                              company: e.target.value,
                            }))
                          }
                          placeholder="Bedrijfsnaam BV"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="position">Functie</Label>
                        <Input
                          id="position"
                          value={contactForm.position}
                          onChange={(e) =>
                            setContactForm((f) => ({
                              ...f,
                              position: e.target.value,
                            }))
                          }
                          placeholder="Sales Manager"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Card className="border-zinc-200/50 dark:border-zinc-800/50">
                        <CardContent className="divide-y divide-zinc-100 p-0 dark:divide-zinc-800">
                          <InfoRow
                            icon={<User className="h-4 w-4" />}
                            label="Naam"
                            value={
                              [
                                opportunity.contact.firstName,
                                opportunity.contact.lastName,
                              ]
                                .filter(Boolean)
                                .join(" ") || "—"
                            }
                          />
                          <InfoRow
                            icon={<Mail className="h-4 w-4" />}
                            label="E-mail"
                            value={opportunity.contact.email}
                            href={
                              opportunity.contact.email
                                ? `mailto:${opportunity.contact.email}`
                                : undefined
                            }
                          />
                          <InfoRow
                            icon={<Phone className="h-4 w-4" />}
                            label="Telefoon"
                            value={opportunity.contact.phone}
                            href={
                              opportunity.contact.phone
                                ? `tel:${opportunity.contact.phone}`
                                : undefined
                            }
                          />
                          <InfoRow
                            icon={<Building2 className="h-4 w-4" />}
                            label="Bedrijf"
                            value={opportunity.contact.company}
                          />
                          <InfoRow
                            icon={<Briefcase className="h-4 w-4" />}
                            label="Functie"
                            value={opportunity.contact.position}
                          />
                        </CardContent>
                      </Card>

                      {/* Quick Actions */}
                      <div className="flex gap-2">
                        {opportunity.contact.phone && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                            asChild
                          >
                            <a href={`tel:${opportunity.contact.phone}`}>
                              <Phone className="mr-2 h-4 w-4 text-green-500" />
                              Bellen
                            </a>
                          </Button>
                        )}
                        {opportunity.contact.email && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                            asChild
                          >
                            <a href={`mailto:${opportunity.contact.email}`}>
                              <Mail className="mr-2 h-4 w-4 text-blue-500" />
                              E-mail
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Deal Tab */}
              {activeTab === "deal" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Deal Informatie</h3>
                    {!isEditingDeal ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsEditingDeal(true)}
                      >
                        <Edit3 className="mr-2 h-3 w-3" />
                        Bewerken
                      </Button>
                    ) : (
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setIsEditingDeal(false);
                            setDealForm({
                              title: opportunity.title ?? "",
                              value: opportunity.value ?? "",
                              expectedCloseDate: opportunity.expectedCloseDate
                                ? new Date(opportunity.expectedCloseDate)
                                    .toISOString()
                                    .split("T")[0]
                                : "",
                            });
                          }}
                        >
                          <X className="mr-1 h-3 w-3" />
                          Annuleren
                        </Button>
                        <Button
                          size="sm"
                          onClick={handleSaveDeal}
                          disabled={savingDeal}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          {savingDeal ? (
                            <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                          ) : (
                            <Save className="mr-2 h-3 w-3" />
                          )}
                          Opslaan
                        </Button>
                      </div>
                    )}
                  </div>

                  {isEditingDeal ? (
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Titel</Label>
                        <Input
                          id="title"
                          value={dealForm.title}
                          onChange={(e) =>
                            setDealForm((f) => ({ ...f, title: e.target.value }))
                          }
                          placeholder="Deal naam"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="value">Waarde (€)</Label>
                        <Input
                          id="value"
                          type="number"
                          value={dealForm.value}
                          onChange={(e) =>
                            setDealForm((f) => ({ ...f, value: e.target.value }))
                          }
                          placeholder="10000"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="expectedCloseDate">
                          Verwachte sluiting
                        </Label>
                        <Input
                          id="expectedCloseDate"
                          type="date"
                          value={dealForm.expectedCloseDate}
                          onChange={(e) =>
                            setDealForm((f) => ({
                              ...f,
                              expectedCloseDate: e.target.value,
                            }))
                          }
                        />
                      </div>
                    </div>
                  ) : (
                    <Card className="border-zinc-200/50 dark:border-zinc-800/50">
                      <CardContent className="divide-y divide-zinc-100 p-0 dark:divide-zinc-800">
                        <InfoRow
                          icon={<Briefcase className="h-4 w-4" />}
                          label="Titel"
                          value={opportunity.title}
                        />
                        <InfoRow
                          icon={<DollarSign className="h-4 w-4" />}
                          label="Waarde"
                          value={formatCurrency(opportunity.value)}
                        />
                        <InfoRow
                          icon={<Calendar className="h-4 w-4" />}
                          label="Verwachte sluiting"
                          value={
                            opportunity.expectedCloseDate
                              ? new Date(
                                  opportunity.expectedCloseDate
                                ).toLocaleDateString("nl-NL", {
                                  day: "numeric",
                                  month: "long",
                                  year: "numeric",
                                })
                              : null
                          }
                        />
                        <InfoRow
                          icon={<Clock className="h-4 w-4" />}
                          label="Aangemaakt"
                          value={formatDistanceToNow(
                            new Date(opportunity.createdAt),
                            { addSuffix: true, locale: nl }
                          )}
                        />
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}

              {/* Notes Tab */}
              {activeTab === "notes" && (
                <div className="space-y-6">
                  <div className="space-y-3">
                    <Textarea
                      placeholder="Voeg een notitie toe..."
                      value={noteContent}
                      onChange={(e) => setNoteContent(e.target.value)}
                      rows={3}
                      className="resize-none"
                    />
                    <Button
                      size="sm"
                      onClick={handleAddNote}
                      disabled={!noteContent.trim() || addingNote}
                      className="w-full bg-violet-600 hover:bg-violet-700"
                    >
                      {addingNote ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <MessageSquare className="mr-2 h-4 w-4" />
                      )}
                      Notitie Toevoegen
                    </Button>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    {opportunity.notes.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-8 text-center">
                        <MessageSquare className="mb-3 h-10 w-10 text-zinc-300 dark:text-zinc-600" />
                        <p className="text-sm text-zinc-500">
                          Nog geen notities
                        </p>
                      </div>
                    ) : (
                      opportunity.notes.map((note) => (
                        <Card
                          key={note.id}
                          className="border-zinc-200/50 dark:border-zinc-800/50"
                        >
                          <CardContent className="p-4">
                            <div className="mb-2 flex items-center gap-2">
                              <Avatar className="h-7 w-7">
                                <AvatarFallback className="bg-gradient-to-br from-violet-500 to-blue-500 text-xs text-white">
                                  {note.createdBy?.name?.[0] ?? "U"}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-sm font-medium">
                                {note.createdBy?.name ?? "Onbekend"}
                              </span>
                              <span className="text-xs text-zinc-400">
                                {formatDistanceToNow(new Date(note.createdAt), {
                                  addSuffix: true,
                                  locale: nl,
                                })}
                              </span>
                            </div>
                            <p className="whitespace-pre-wrap text-sm text-zinc-600 dark:text-zinc-400">
                              {note.content}
                            </p>
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* History Tab */}
              {activeTab === "history" && (
                <div className="space-y-4">
                  {opportunity.stageHistory.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <History className="mb-3 h-10 w-10 text-zinc-300 dark:text-zinc-600" />
                      <p className="text-sm text-zinc-500">
                        Nog geen stage wijzigingen
                      </p>
                    </div>
                  ) : (
                    <div className="relative space-y-0">
                      {/* Timeline line */}
                      <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-zinc-200 dark:bg-zinc-800" />

                      {opportunity.stageHistory.map((history, index) => (
                        <div
                          key={history.id}
                          className="relative flex items-start gap-4 pb-6"
                        >
                          {/* Timeline dot */}
                          <div
                            className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full ring-4 ring-white dark:ring-zinc-950"
                            style={{
                              backgroundColor:
                                history.toStage.color ?? "#6366f1",
                            }}
                          >
                            <CheckCircle2 className="h-4 w-4 text-white" />
                          </div>

                          <div className="flex-1 pt-1">
                            <div className="flex items-center gap-2">
                              {history.fromStage ? (
                                <>
                                  <Badge
                                    variant="outline"
                                    className="text-xs"
                                    style={{
                                      borderColor:
                                        history.fromStage.color ?? "#6366f1",
                                      color: history.fromStage.color ?? "#6366f1",
                                    }}
                                  >
                                    {history.fromStage.name}
                                  </Badge>
                                  <ChevronRight className="h-3 w-3 text-zinc-400" />
                                </>
                              ) : (
                                <span className="text-xs text-zinc-500">
                                  Gestart in
                                </span>
                              )}
                              <Badge
                                className="text-xs"
                                style={{
                                  backgroundColor:
                                    (history.toStage.color ?? "#6366f1") + "20",
                                  color: history.toStage.color ?? "#6366f1",
                                }}
                              >
                                {history.toStage.name}
                              </Badge>
                            </div>
                            <p className="mt-1 text-xs text-zinc-500">
                              {formatDistanceToNow(new Date(history.movedAt), {
                                addSuffix: true,
                                locale: nl,
                              })}
                              {history.movedBy && (
                                <> door {history.movedBy.name}</>
                              )}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <VisuallyHidden.Root>
              <SheetTitle>Opportunity niet gevonden</SheetTitle>
            </VisuallyHidden.Root>
            <div className="flex h-full items-center justify-center">
              <p className="text-zinc-500">Opportunity niet gevonden</p>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

// Helper component for info rows
function InfoRow({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | null | undefined;
  href?: string;
}) {
  const content = (
    <div className="flex items-center gap-3 px-4 py-3">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 text-zinc-500 dark:bg-zinc-800">
        {icon}
      </div>
      <div className="flex-1">
        <p className="text-xs text-zinc-500">{label}</p>
        <p
          className={cn(
            "font-medium",
            href && "text-violet-600 dark:text-violet-400"
          )}
        >
          {value || "—"}
        </p>
      </div>
      {href && <ChevronRight className="h-4 w-4 text-zinc-400" />}
    </div>
  );

  if (href && value) {
    return (
      <a href={href} className="block transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900">
        {content}
      </a>
    );
  }

  return content;
}
