"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateContact, deleteContact } from "@/lib/actions/crm";
import { Trash2, AlertTriangle, MapPin } from "lucide-react";

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
}

interface EditContactDialogProps {
  contact: Contact;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditContactDialog({
  contact,
  open,
  onOpenChange,
}: EditContactDialogProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    try {
      await updateContact(contact.id, {
        firstName: formData.get("firstName") as string,
        lastName: formData.get("lastName") as string,
        email: formData.get("email") as string,
        phone: formData.get("phone") as string,
        company: formData.get("company") as string,
        position: formData.get("position") as string,
        street: formData.get("street") as string || undefined,
        houseNumber: formData.get("houseNumber") as string || undefined,
        houseNumberAddition: formData.get("houseNumberAddition") as string || undefined,
        postalCode: formData.get("postalCode") as string || undefined,
        city: formData.get("city") as string || undefined,
        province: formData.get("province") as string || undefined,
        country: formData.get("country") as string || undefined,
      });

      onOpenChange(false);
      router.refresh();
    } catch (error) {
      console.error("Failed to update contact:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    setDeleting(true);
    try {
      await deleteContact(contact.id);
      onOpenChange(false);
      router.refresh();
    } catch (error) {
      console.error("Failed to delete contact:", error);
    } finally {
      setDeleting(false);
      setShowDeleteConfirm(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Contact bewerken</DialogTitle>
        </DialogHeader>

        {showDeleteConfirm ? (
          <div className="space-y-4">
            <div className="flex items-center gap-3 rounded-lg bg-red-50 p-4 dark:bg-red-950/30">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <div>
                <p className="font-medium text-red-700 dark:text-red-400">
                  Contact verwijderen?
                </p>
                <p className="text-sm text-red-600 dark:text-red-500">
                  Dit kan niet ongedaan worden gemaakt. Alle gekoppelde opportunities blijven bestaan.
                </p>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowDeleteConfirm(false)}
                disabled={deleting}
              >
                Annuleren
              </Button>
              <Button
                type="button"
                variant="destructive"
                onClick={handleDelete}
                disabled={deleting}
              >
                {deleting ? "Verwijderen..." : "Ja, verwijderen"}
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Voornaam</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  defaultValue={contact.firstName ?? ""}
                  placeholder="Jan"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Achternaam</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  defaultValue={contact.lastName ?? ""}
                  placeholder="Jansen"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                defaultValue={contact.email ?? ""}
                placeholder="jan@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Telefoon</Label>
              <Input
                id="phone"
                name="phone"
                defaultValue={contact.phone ?? ""}
                placeholder="+31 6 12345678"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Bedrijf</Label>
              <Input
                id="company"
                name="company"
                defaultValue={contact.company ?? ""}
                placeholder="Acme BV"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="position">Functie</Label>
              <Input
                id="position"
                name="position"
                defaultValue={contact.position ?? ""}
                placeholder="Directeur"
              />
            </div>

            {/* Address Section */}
            <div className="space-y-4 border-t pt-4">
              <div className="flex items-center gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                <MapPin className="h-4 w-4" />
                Adresgegevens
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="street">Straat</Label>
                  <Input
                    id="street"
                    name="street"
                    defaultValue={contact.street ?? ""}
                    placeholder="Hoofdstraat"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="houseNumber">Nr.</Label>
                  <div className="flex gap-1">
                    <Input
                      id="houseNumber"
                      name="houseNumber"
                      defaultValue={contact.houseNumber ?? ""}
                      placeholder="123"
                      className="w-16"
                    />
                    <Input
                      name="houseNumberAddition"
                      defaultValue={contact.houseNumberAddition ?? ""}
                      placeholder="A"
                      className="w-12"
                    />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  <Label htmlFor="postalCode">Postcode</Label>
                  <Input
                    id="postalCode"
                    name="postalCode"
                    defaultValue={contact.postalCode ?? ""}
                    placeholder="1234 AB"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">Stad</Label>
                  <Input
                    id="city"
                    name="city"
                    defaultValue={contact.city ?? ""}
                    placeholder="Amsterdam"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  <Label htmlFor="province">Provincie</Label>
                  <Input
                    id="province"
                    name="province"
                    defaultValue={contact.province ?? ""}
                    placeholder="Noord-Holland"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Land</Label>
                  <Input
                    id="country"
                    name="country"
                    defaultValue={contact.country ?? "Nederland"}
                    placeholder="Nederland"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <Button
                type="button"
                variant="ghost"
                className="text-red-600 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-950/30"
                onClick={() => setShowDeleteConfirm(true)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Verwijderen
              </Button>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                >
                  Annuleren
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? "Opslaan..." : "Opslaan"}
                </Button>
              </div>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
