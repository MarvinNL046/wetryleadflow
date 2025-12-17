import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { CreateContactDialog } from "@/components/crm/create-contact-dialog";
import { getContacts } from "@/lib/actions/crm";

export default async function ContactsPage() {
  const contacts = await getContacts();

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Contacts</h1>
          <p className="text-zinc-500">
            {contacts.length} contact{contacts.length !== 1 ? "s" : ""}
          </p>
        </div>
        <CreateContactDialog />
      </div>

      {contacts.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-zinc-300 py-12 dark:border-zinc-700">
          <p className="mb-4 text-zinc-500">No contacts yet</p>
          <CreateContactDialog />
        </div>
      ) : (
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Position</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contacts.map((contact) => (
                <TableRow key={contact.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs">
                          {(contact.firstName?.[0] ?? "") +
                            (contact.lastName?.[0] ?? "")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">
                        {[contact.firstName, contact.lastName]
                          .filter(Boolean)
                          .join(" ") || "—"}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{contact.email ?? "—"}</TableCell>
                  <TableCell>{contact.phone ?? "—"}</TableCell>
                  <TableCell>{contact.company ?? "—"}</TableCell>
                  <TableCell>{contact.position ?? "—"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
