import { CreateContactDialog } from "@/components/crm/create-contact-dialog";
import { ContactsTable } from "@/components/crm/contacts-table";
import { getContacts } from "@/lib/actions/crm";
import { Users } from "lucide-react";

export default async function ContactsPage() {
  const contacts = await getContacts();

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 shadow-lg shadow-violet-500/25">
            <Users className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Contacten</h1>
            <p className="text-sm text-zinc-500">
              {contacts.length} contact{contacts.length !== 1 ? "en" : ""}
            </p>
          </div>
        </div>
        <CreateContactDialog />
      </div>

      {contacts.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-zinc-300 bg-zinc-50/50 py-16 dark:border-zinc-700 dark:bg-zinc-900/30">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
            <Users className="h-6 w-6 text-zinc-400" />
          </div>
          <p className="mb-1 font-medium text-zinc-700 dark:text-zinc-300">
            Nog geen contacten
          </p>
          <p className="mb-4 text-sm text-zinc-500">
            Voeg je eerste contact toe om te beginnen
          </p>
          <CreateContactDialog />
        </div>
      ) : (
        <ContactsTable contacts={contacts} />
      )}
    </div>
  );
}
