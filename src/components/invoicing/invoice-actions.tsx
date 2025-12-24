"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Send, CheckCircle, Pencil, FileDown, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { sendInvoice, markInvoicePaid, cancelInvoice } from "@/lib/actions/invoicing";

interface InvoiceActionsProps {
  invoiceId: number;
  status: string;
}

export function InvoiceActions({ invoiceId, status }: InvoiceActionsProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [showSendDialog, setShowSendDialog] = useState(false);
  const [showPaidDialog, setShowPaidDialog] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  async function handleSend() {
    startTransition(async () => {
      try {
        await sendInvoice(invoiceId);
        setShowSendDialog(false);
        router.refresh();
      } catch (error) {
        console.error("Failed to send invoice:", error);
        alert("Er is iets misgegaan bij het versturen van de factuur");
      }
    });
  }

  async function handleMarkPaid() {
    startTransition(async () => {
      try {
        await markInvoicePaid(invoiceId);
        setShowPaidDialog(false);
        router.refresh();
      } catch (error) {
        console.error("Failed to mark invoice as paid:", error);
        alert("Er is iets misgegaan bij het markeren als betaald");
      }
    });
  }

  async function handleCancel() {
    startTransition(async () => {
      try {
        await cancelInvoice(invoiceId);
        setShowCancelDialog(false);
        router.refresh();
      } catch (error) {
        console.error("Failed to cancel invoice:", error);
        alert("Er is iets misgegaan bij het annuleren van de factuur");
      }
    });
  }

  return (
    <>
      <div className="flex gap-2">
        {status === "draft" && (
          <>
            <Button variant="outline" asChild>
              <Link href={`/crm/invoicing/invoices/${invoiceId}/edit`}>
                <Pencil className="mr-2 h-4 w-4" />
                Bewerken
              </Link>
            </Button>
            <Button onClick={() => setShowSendDialog(true)} disabled={isPending}>
              {isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Send className="mr-2 h-4 w-4" />
              )}
              Versturen
            </Button>
          </>
        )}
        {(status === "sent" || status === "viewed") && (
          <>
            <Button onClick={() => setShowPaidDialog(true)} disabled={isPending}>
              {isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <CheckCircle className="mr-2 h-4 w-4" />
              )}
              Markeer als betaald
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowCancelDialog(true)}
              disabled={isPending}
            >
              <X className="mr-2 h-4 w-4" />
              Annuleren
            </Button>
          </>
        )}
        <Button variant="outline" asChild>
          <Link href={`/api/invoicing/pdf/invoice/${invoiceId}`} target="_blank">
            <FileDown className="mr-2 h-4 w-4" />
            PDF
          </Link>
        </Button>
      </div>

      {/* Send Confirmation Dialog */}
      <AlertDialog open={showSendDialog} onOpenChange={setShowSendDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Factuur versturen?</AlertDialogTitle>
            <AlertDialogDescription>
              De factuur wordt als verzonden gemarkeerd. In de toekomst wordt
              hier ook een email naar de klant gestuurd.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>Annuleren</AlertDialogCancel>
            <AlertDialogAction onClick={handleSend} disabled={isPending}>
              {isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Send className="mr-2 h-4 w-4" />
              )}
              Versturen
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Mark Paid Confirmation Dialog */}
      <AlertDialog open={showPaidDialog} onOpenChange={setShowPaidDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Markeer als betaald?</AlertDialogTitle>
            <AlertDialogDescription>
              Het volledige openstaande bedrag wordt als betaald geregistreerd
              met de huidige datum.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>Annuleren</AlertDialogCancel>
            <AlertDialogAction onClick={handleMarkPaid} disabled={isPending}>
              {isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <CheckCircle className="mr-2 h-4 w-4" />
              )}
              Markeer als betaald
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Cancel Confirmation Dialog */}
      <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Factuur annuleren?</AlertDialogTitle>
            <AlertDialogDescription>
              De factuur wordt gemarkeerd als geannuleerd. Dit kan niet ongedaan
              worden gemaakt.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>Terug</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleCancel}
              disabled={isPending}
              className="bg-red-600 hover:bg-red-700"
            >
              {isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <X className="mr-2 h-4 w-4" />
              )}
              Annuleren
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
