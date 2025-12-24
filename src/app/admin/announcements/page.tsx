"use client";

import { useEffect, useState, useTransition } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  getAnnouncementStats,
  getAnnouncements,
  createAnnouncement,
  publishAnnouncement,
  expireAnnouncement,
  deleteAnnouncement,
} from "@/lib/actions/admin";
import {
  Megaphone,
  Plus,
  Info,
  AlertTriangle,
  Sparkles,
  Wrench,
  Send,
  Trash2,
  XCircle,
  Clock,
  FileText,
  Eye,
  EyeOff,
  Loader2,
  RefreshCw,
} from "lucide-react";

type AnnouncementStats = Awaited<ReturnType<typeof getAnnouncementStats>>;
type Announcement = Awaited<ReturnType<typeof getAnnouncements>>[number];

function getTypeBadge(type: string) {
  switch (type) {
    case "info":
      return (
        <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
          <Info className="mr-1 h-3 w-3" />
          Info
        </Badge>
      );
    case "warning":
      return (
        <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
          <AlertTriangle className="mr-1 h-3 w-3" />
          Waarschuwing
        </Badge>
      );
    case "feature":
      return (
        <Badge className="bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400">
          <Sparkles className="mr-1 h-3 w-3" />
          Feature
        </Badge>
      );
    case "maintenance":
      return (
        <Badge className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
          <Wrench className="mr-1 h-3 w-3" />
          Onderhoud
        </Badge>
      );
    default:
      return <Badge variant="outline">{type}</Badge>;
  }
}

function getStatusBadge(status: string) {
  switch (status) {
    case "active":
      return (
        <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
          <Eye className="mr-1 h-3 w-3" />
          Actief
        </Badge>
      );
    case "scheduled":
      return (
        <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
          <Clock className="mr-1 h-3 w-3" />
          Gepland
        </Badge>
      );
    case "draft":
      return (
        <Badge className="bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400">
          <FileText className="mr-1 h-3 w-3" />
          Concept
        </Badge>
      );
    case "expired":
      return (
        <Badge className="bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-500">
          <EyeOff className="mr-1 h-3 w-3" />
          Verlopen
        </Badge>
      );
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}

function formatDate(date: Date | null): string {
  if (!date) return "-";
  return new Date(date).toLocaleDateString("nl-NL", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AnnouncementsPage() {
  const [stats, setStats] = useState<AnnouncementStats | null>(null);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    type: "info" as "info" | "warning" | "feature" | "maintenance",
    dismissible: true,
    showOnDashboard: true,
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const [statsData, announcementsData] = await Promise.all([
        getAnnouncementStats(),
        getAnnouncements(),
      ]);
      setStats(statsData);
      setAnnouncements(announcementsData);
    } catch (error) {
      console.error("Failed to load announcements:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreate = async () => {
    if (!formData.title || !formData.content) return;

    startTransition(async () => {
      await createAnnouncement({
        title: formData.title,
        content: formData.content,
        type: formData.type,
        dismissible: formData.dismissible,
        showOnDashboard: formData.showOnDashboard,
      });
      setFormData({
        title: "",
        content: "",
        type: "info",
        dismissible: true,
        showOnDashboard: true,
      });
      setDialogOpen(false);
      await loadData();
    });
  };

  const handlePublish = async (id: number) => {
    startTransition(async () => {
      await publishAnnouncement(id);
      await loadData();
    });
  };

  const handleExpire = async (id: number) => {
    startTransition(async () => {
      await expireAnnouncement(id);
      await loadData();
    });
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Weet je zeker dat je deze aankondiging wilt verwijderen?")) return;

    startTransition(async () => {
      await deleteAnnouncement(id);
      await loadData();
    });
  };

  if (loading && !stats) {
    return (
      <div className="flex h-full items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-violet-500" />
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">Aankondigingen</h1>
            <Badge className="bg-gradient-to-r from-red-500 to-orange-500 text-white">
              NEW
            </Badge>
          </div>
          <p className="text-zinc-500">Platform-brede berichten naar gebruikers</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => loadData()}
            disabled={loading}
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            Vernieuwen
          </Button>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Nieuw
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Nieuwe Aankondiging</DialogTitle>
                <DialogDescription>
                  Maak een nieuwe platform-brede aankondiging.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Titel</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Aankondiging titel..."
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="content">Inhoud</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="Schrijf je bericht..."
                    rows={4}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="type">Type</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) =>
                      setFormData({ ...formData, type: value as typeof formData.type })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="info">
                        <span className="flex items-center gap-2">
                          <Info className="h-4 w-4 text-blue-500" />
                          Info
                        </span>
                      </SelectItem>
                      <SelectItem value="warning">
                        <span className="flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-amber-500" />
                          Waarschuwing
                        </span>
                      </SelectItem>
                      <SelectItem value="feature">
                        <span className="flex items-center gap-2">
                          <Sparkles className="h-4 w-4 text-violet-500" />
                          Feature
                        </span>
                      </SelectItem>
                      <SelectItem value="maintenance">
                        <span className="flex items-center gap-2">
                          <Wrench className="h-4 w-4 text-red-500" />
                          Onderhoud
                        </span>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={formData.dismissible}
                      onChange={(e) =>
                        setFormData({ ...formData, dismissible: e.target.checked })
                      }
                      className="rounded"
                    />
                    Weg te klikken
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={formData.showOnDashboard}
                      onChange={(e) =>
                        setFormData({ ...formData, showOnDashboard: e.target.checked })
                      }
                      className="rounded"
                    />
                    Toon op dashboard
                  </label>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Annuleren
                </Button>
                <Button onClick={handleCreate} disabled={isPending || !formData.title}>
                  {isPending ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Plus className="mr-2 h-4 w-4" />
                  )}
                  Aanmaken
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Grid */}
      {stats && (
        <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="dashboard-stat-card rounded-xl border border-zinc-200/50 bg-white/80 p-5 backdrop-blur-sm dark:border-zinc-800/50 dark:bg-zinc-900/80">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-zinc-500">Totaal</p>
                <p className="mt-2 text-2xl font-bold">{stats.total}</p>
                <p className="mt-1 text-xs text-zinc-400">aankondigingen</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-purple-500">
                <Megaphone className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>

          <div className="dashboard-stat-card rounded-xl border border-green-200/50 bg-gradient-to-br from-green-50/80 to-emerald-50/80 p-5 dark:border-green-900/50 dark:from-green-950/50 dark:to-emerald-950/50">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-zinc-500">Actief</p>
                <p className="mt-2 text-2xl font-bold text-green-600 dark:text-green-400">
                  {stats.active}
                </p>
                <p className="mt-1 text-xs text-zinc-400">nu zichtbaar</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-emerald-500">
                <Eye className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>

          <div className="dashboard-stat-card rounded-xl border border-blue-200/50 bg-gradient-to-br from-blue-50/80 to-cyan-50/80 p-5 dark:border-blue-900/50 dark:from-blue-950/50 dark:to-cyan-950/50">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-zinc-500">Gepland</p>
                <p className="mt-2 text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {stats.scheduled}
                </p>
                <p className="mt-1 text-xs text-zinc-400">ingepland</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500">
                <Clock className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>

          <div className="dashboard-stat-card rounded-xl border border-zinc-200/50 bg-white/80 p-5 dark:border-zinc-800/50 dark:bg-zinc-900/80">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-zinc-500">Weggeklikt</p>
                <p className="mt-2 text-2xl font-bold">{stats.totalDismissals}</p>
                <p className="mt-1 text-xs text-zinc-400">keer</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-zinc-400 to-zinc-500">
                <XCircle className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Announcements Table */}
      <Card>
        <CardHeader>
          <CardTitle>Alle Aankondigingen</CardTitle>
        </CardHeader>
        <CardContent>
          {announcements.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Titel</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Doelgroep</TableHead>
                  <TableHead className="text-center">Weggeklikt</TableHead>
                  <TableHead>Aangemaakt</TableHead>
                  <TableHead className="w-[150px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {announcements.map((announcement) => (
                  <TableRow key={announcement.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{announcement.title}</p>
                        <p className="max-w-xs truncate text-xs text-zinc-500">
                          {announcement.content}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>{getTypeBadge(announcement.type)}</TableCell>
                    <TableCell>{getStatusBadge(announcement.status)}</TableCell>
                    <TableCell className="text-sm capitalize">
                      {announcement.target || "Iedereen"}
                    </TableCell>
                    <TableCell className="text-center">
                      {announcement.dismissalCount}
                    </TableCell>
                    <TableCell className="text-sm text-zinc-500">
                      {formatDate(announcement.createdAt)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {announcement.status === "draft" && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handlePublish(announcement.id)}
                            disabled={isPending}
                            title="Publiceren"
                          >
                            <Send className="h-4 w-4 text-green-500" />
                          </Button>
                        )}
                        {announcement.status === "active" && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleExpire(announcement.id)}
                            disabled={isPending}
                            title="Deactiveren"
                          >
                            <EyeOff className="h-4 w-4 text-zinc-500" />
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDelete(announcement.id)}
                          disabled={isPending}
                          title="Verwijderen"
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="flex flex-col items-center justify-center py-8">
              <Megaphone className="mb-2 h-8 w-8 text-zinc-300" />
              <p className="text-sm text-zinc-500">Nog geen aankondigingen</p>
              <Button
                size="sm"
                className="mt-4"
                onClick={() => setDialogOpen(true)}
              >
                <Plus className="mr-2 h-4 w-4" />
                Eerste aankondiging maken
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
