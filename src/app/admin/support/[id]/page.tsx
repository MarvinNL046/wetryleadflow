"use client";

import { useEffect, useState, useTransition } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  getSupportTicketById,
  updateSupportTicket,
  addSupportReply,
  resolveSupportTicket,
} from "@/lib/actions/admin";
import {
  ArrowLeft,
  Loader2,
  Send,
  CheckCircle2,
  Clock,
  Inbox,
  MessageCircle,
  XCircle,
  User,
  Shield,
  Building,
  Mail,
  Globe,
  Calendar,
} from "lucide-react";
import { useUser } from "@stackframe/stack";

type Ticket = Awaited<ReturnType<typeof getSupportTicketById>>;

function getStatusBadge(status: string) {
  switch (status) {
    case "new":
      return (
        <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
          <Inbox className="mr-1 h-3 w-3" />
          Nieuw
        </Badge>
      );
    case "in_progress":
      return (
        <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
          <Clock className="mr-1 h-3 w-3" />
          In behandeling
        </Badge>
      );
    case "waiting_reply":
      return (
        <Badge className="bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400">
          <MessageCircle className="mr-1 h-3 w-3" />
          Wacht op reactie
        </Badge>
      );
    case "resolved":
      return (
        <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
          <CheckCircle2 className="mr-1 h-3 w-3" />
          Opgelost
        </Badge>
      );
    case "closed":
      return (
        <Badge className="bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-500">
          <XCircle className="mr-1 h-3 w-3" />
          Gesloten
        </Badge>
      );
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}

function getPriorityBadge(priority: string) {
  switch (priority) {
    case "urgent":
      return <Badge className="bg-red-100 text-red-700">Urgent</Badge>;
    case "high":
      return <Badge className="bg-orange-100 text-orange-700">Hoog</Badge>;
    case "medium":
      return <Badge className="bg-amber-100 text-amber-700">Medium</Badge>;
    case "low":
      return <Badge className="bg-zinc-100 text-zinc-600">Laag</Badge>;
    default:
      return <Badge variant="outline">{priority}</Badge>;
  }
}

function formatDate(date: Date | null): string {
  if (!date) return "-";
  return new Date(date).toLocaleDateString("nl-NL", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function SupportTicketDetailPage() {
  const params = useParams();
  const router = useRouter();
  const user = useUser();
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [replyMessage, setReplyMessage] = useState("");
  const [resolutionNotes, setResolutionNotes] = useState("");

  const ticketId = Number(params.id);

  const loadTicket = async () => {
    setLoading(true);
    try {
      const data = await getSupportTicketById(ticketId);
      setTicket(data);
    } catch (error) {
      console.error("Failed to load ticket:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (ticketId) {
      loadTicket();
    }
  }, [ticketId]);

  const handleStatusChange = async (newStatus: string) => {
    startTransition(async () => {
      await updateSupportTicket(ticketId, {
        status: newStatus as "new" | "in_progress" | "waiting_reply" | "resolved" | "closed",
      });
      await loadTicket();
    });
  };

  const handlePriorityChange = async (newPriority: string) => {
    startTransition(async () => {
      await updateSupportTicket(ticketId, {
        priority: newPriority as "low" | "medium" | "high" | "urgent",
      });
      await loadTicket();
    });
  };

  const handleSendReply = async () => {
    if (!replyMessage.trim() || !user?.primaryEmail) return;

    startTransition(async () => {
      await addSupportReply(
        ticketId,
        replyMessage,
        user.primaryEmail!,
        user.displayName || undefined
      );
      setReplyMessage("");
      await loadTicket();
    });
  };

  const handleResolve = async () => {
    startTransition(async () => {
      await resolveSupportTicket(ticketId, resolutionNotes || undefined);
      await loadTicket();
    });
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-violet-500" />
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="p-8">
        <div className="text-center">
          <p className="text-zinc-500">Ticket niet gevonden</p>
          <Link href="/admin/support">
            <Button variant="outline" className="mt-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Terug naar inbox
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/support">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Terug
            </Button>
          </Link>
          <div>
            <h1 className="text-xl font-bold">{ticket.subject}</h1>
            <p className="text-sm text-zinc-500">Ticket #{ticket.id}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {getStatusBadge(ticket.status)}
          {getPriorityBadge(ticket.priority)}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Original Message */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                    <User className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">{ticket.userName || ticket.userEmail}</p>
                    <p className="text-xs text-zinc-500">{ticket.userEmail}</p>
                  </div>
                </div>
                <span className="text-sm text-zinc-500">
                  {formatDate(ticket.createdAt)}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="whitespace-pre-wrap rounded-lg bg-zinc-50 p-4 dark:bg-zinc-800/50">
                {ticket.message}
              </div>
            </CardContent>
          </Card>

          {/* Replies */}
          {ticket.replies && ticket.replies.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-medium text-zinc-500">Reacties</h3>
              {ticket.replies.map((reply) => (
                <Card
                  key={reply.id}
                  className={reply.isAdminReply ? "border-violet-200 bg-violet-50/30 dark:border-violet-900 dark:bg-violet-950/20" : ""}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`flex h-10 w-10 items-center justify-center rounded-full ${
                          reply.isAdminReply
                            ? "bg-violet-100 dark:bg-violet-900/30"
                            : "bg-blue-100 dark:bg-blue-900/30"
                        }`}>
                          {reply.isAdminReply ? (
                            <Shield className="h-5 w-5 text-violet-600" />
                          ) : (
                            <User className="h-5 w-5 text-blue-600" />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{reply.senderName || reply.senderEmail}</p>
                            {reply.isAdminReply && (
                              <Badge className="bg-violet-100 text-violet-700 text-[10px]">
                                Support
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-zinc-500">{reply.senderEmail}</p>
                        </div>
                      </div>
                      <span className="text-sm text-zinc-500">
                        {formatDate(reply.createdAt)}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="whitespace-pre-wrap">
                      {reply.message}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Reply Form */}
          {ticket.status !== "closed" && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Reactie toevoegen</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  placeholder="Typ je reactie..."
                  rows={4}
                />
                <Button
                  onClick={handleSendReply}
                  disabled={isPending || !replyMessage.trim()}
                >
                  {isPending ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="mr-2 h-4 w-4" />
                  )}
                  Versturen
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Resolution Notes */}
          {ticket.status === "resolved" && ticket.resolutionNotes && (
            <Card className="border-green-200 bg-green-50/30 dark:border-green-900 dark:bg-green-950/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base text-green-700 dark:text-green-400">
                  <CheckCircle2 className="h-4 w-4" />
                  Oplossing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap">{ticket.resolutionNotes}</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status & Priority */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Ticket Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-xs text-zinc-500">Status</Label>
                <Select
                  value={ticket.status}
                  onValueChange={handleStatusChange}
                  disabled={isPending}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">Nieuw</SelectItem>
                    <SelectItem value="in_progress">In behandeling</SelectItem>
                    <SelectItem value="waiting_reply">Wacht op reactie</SelectItem>
                    <SelectItem value="resolved">Opgelost</SelectItem>
                    <SelectItem value="closed">Gesloten</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-xs text-zinc-500">Prioriteit</Label>
                <Select
                  value={ticket.priority}
                  onValueChange={handlePriorityChange}
                  disabled={isPending}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="urgent">Urgent</SelectItem>
                    <SelectItem value="high">Hoog</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Laag</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-xs text-zinc-500">Type</Label>
                <p className="mt-1 capitalize">{ticket.type || "Anders"}</p>
              </div>
            </CardContent>
          </Card>

          {/* User Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Gebruiker</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-zinc-400" />
                <span>{ticket.userName || "-"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-zinc-400" />
                <span className="truncate">{ticket.userEmail}</span>
              </div>
              {ticket.org && (
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-zinc-400" />
                  <span>{ticket.org.name}</span>
                </div>
              )}
              {ticket.pageUrl && (
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-zinc-400" />
                  <span className="truncate text-xs">{ticket.pageUrl}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-zinc-400" />
                <span>{formatDate(ticket.createdAt)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          {ticket.status !== "resolved" && ticket.status !== "closed" && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Acties</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Label className="text-xs text-zinc-500">Oplossingsnotitie</Label>
                  <Textarea
                    value={resolutionNotes}
                    onChange={(e) => setResolutionNotes(e.target.value)}
                    placeholder="Optionele notitie..."
                    rows={2}
                    className="mt-1"
                  />
                </div>
                <Button
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={handleResolve}
                  disabled={isPending}
                >
                  {isPending ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                  )}
                  Markeer als opgelost
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
