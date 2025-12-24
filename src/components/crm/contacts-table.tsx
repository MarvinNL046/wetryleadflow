"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { EditContactDialog } from "./edit-contact-dialog";
import { Pencil, Phone, Mail, Building2, Megaphone, UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";

interface Contact {
  id: number;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  phone: string | null;
  company: string | null;
  position: string | null;
  street: string | null;
  houseNumber: string | null;
  houseNumberAddition: string | null;
  postalCode: string | null;
  city: string | null;
  province: string | null;
  country: string | null;
  createdAt: Date;
  callCount: number | null;
  lastCallResult: string | null;
  leadSource: string | null;
  metaFormName: string | null;
}

interface ContactsTableProps {
  contacts: Contact[];
}

export function ContactsTable({ contacts }: ContactsTableProps) {
  const [editingContact, setEditingContact] = useState<Contact | null>(null);

  const getCallResultBadge = (result: string | null) => {
    if (!result) return null;

    const resultConfig: Record<string, { label: string; className: string }> = {
      not_answered: { label: "Niet bereikt", className: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" },
      schedule_now: { label: "Ingepland", className: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" },
      callback_later: { label: "Terugbellen", className: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" },
      not_interested: { label: "Niet geïnteresseerd", className: "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400" },
      invalid_number: { label: "Ongeldig nummer", className: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" },
    };

    const config = resultConfig[result];
    if (!config) return null;

    return (
      <span className={cn("rounded-full px-2 py-0.5 text-xs font-medium", config.className)}>
        {config.label}
      </span>
    );
  };

  return (
    <>
      <div className="rounded-xl border border-zinc-200/50 bg-white dark:border-zinc-800/50 dark:bg-zinc-900/50">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[250px]">Naam</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Telefoon</TableHead>
              <TableHead>Bedrijf</TableHead>
              <TableHead>Bron</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contacts.map((contact) => (
              <TableRow
                key={contact.id}
                className="group cursor-pointer transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                onClick={() => setEditingContact(contact)}
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9 ring-2 ring-violet-100 dark:ring-violet-900/30">
                      <AvatarFallback className="bg-gradient-to-br from-violet-500 to-blue-500 text-xs text-white">
                        {(contact.firstName?.[0] ?? "") +
                          (contact.lastName?.[0] ?? "")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <span className="font-medium text-zinc-900 transition-colors group-hover:text-violet-600 dark:text-zinc-100 dark:group-hover:text-violet-400">
                        {[contact.firstName, contact.lastName]
                          .filter(Boolean)
                          .join(" ") || "—"}
                      </span>
                      {contact.position && (
                        <p className="text-xs text-zinc-500">{contact.position}</p>
                      )}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  {contact.email ? (
                    <a
                      href={`mailto:${contact.email}`}
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-1.5 text-zinc-600 hover:text-violet-600 dark:text-zinc-400 dark:hover:text-violet-400"
                    >
                      <Mail className="h-3.5 w-3.5" />
                      {contact.email}
                    </a>
                  ) : (
                    <span className="text-zinc-400">—</span>
                  )}
                </TableCell>
                <TableCell>
                  {contact.phone ? (
                    <a
                      href={`tel:${contact.phone}`}
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-1.5 text-zinc-600 hover:text-violet-600 dark:text-zinc-400 dark:hover:text-violet-400"
                    >
                      <Phone className="h-3.5 w-3.5" />
                      {contact.phone}
                    </a>
                  ) : (
                    <span className="text-zinc-400">—</span>
                  )}
                </TableCell>
                <TableCell>
                  {contact.company ? (
                    <div className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400">
                      <Building2 className="h-3.5 w-3.5" />
                      {contact.company}
                    </div>
                  ) : (
                    <span className="text-zinc-400">—</span>
                  )}
                </TableCell>
                <TableCell>
                  {contact.metaFormName ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-2.5 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                      <Megaphone className="h-3 w-3" />
                      {contact.metaFormName}
                    </span>
                  ) : contact.leadSource === "manual" ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                      <UserPlus className="h-3 w-3" />
                      Handmatig
                    </span>
                  ) : contact.leadSource ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                      {contact.leadSource}
                    </span>
                  ) : (
                    <span className="text-zinc-400">—</span>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {contact.callCount && contact.callCount > 0 && (
                      <span className="flex items-center gap-1 rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                        <Phone className="h-3 w-3" />
                        {contact.callCount}x
                      </span>
                    )}
                    {getCallResultBadge(contact.lastCallResult)}
                  </div>
                </TableCell>
                <TableCell>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingContact(contact);
                    }}
                    className="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {editingContact && (
        <EditContactDialog
          contact={editingContact}
          open={!!editingContact}
          onOpenChange={(open) => !open && setEditingContact(null)}
        />
      )}
    </>
  );
}
