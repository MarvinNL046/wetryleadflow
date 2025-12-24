"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Send, CheckCircle, XCircle, Receipt, Pencil, FileDown, Loader2 } from "lucide-react";
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
import {
  sendQuotation,
  markQuotationAccepted,
  markQuotationRejected,
  convertQuotationToInvoice,
} from "@/lib/actions/invoicing";

interface QuotationActionsProps {
  quotationId: number;
  status: string;
  convertedToInvoiceId: number | null;
}

export function QuotationActions({
  quotationId,
  status,
  convertedToInvoiceId,
}: QuotationActionsProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [showSendDialog, setShowSendDialog] = useState(false);
  const [showAcceptDialog, setShowAcceptDialog] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [showConvertDialog, setShowConvertDialog] = useState(false);

  async function handleSend() {
    startTransition(async () => {
      try {
        await sendQuotation(quotationId);
        setShowSendDialog(false);
        router.refresh();
      } catch (error) {
        console.error("Failed to send quotation:", error);
        alert("Er is iets misgegaan bij het versturen van de offerte");
      }
    });
  }

  async function handleAccept() {
    startTransition(async () => {
      try {
        await markQuotationAccepted(quotationId);
        setShowAcceptDialog(false);
        router.refresh();
      } catch (error) {
        console.error("Failed to accept quotation:", error);
        alert("Er is iets misgegaan bij het accepteren");
      }
    });
  }

  async function handleReject() {
    startTransition(async () => {
      try {
        await markQuotationRejected(quotationId);
        setShowRejectDialog(false);
        router.refresh();
      } catch (error) {
        console.error("Failed to reject quotation:", error);
        alert("Er is iets misgegaan bij het afwijzen");
      }
    });
  }

  async function handleConvert() {
    startTransition(async () => {
      try {
        const invoice = await convertQuotationToInvoice(quotationId);
        setShowConvertDialog(false);
        router.push(`/crm/invoicing/invoices/${invoice.id}`);
      } catch (error) {
        console.error("Failed to convert quotation:", error);
        alert("Er is iets misgegaan bij het converteren naar factuur");
      }
    });
  }

  return (
    <>
      <div className="flex gap-2">
        {status === "draft" && (
          <>
            <Button variant="outline" asChild>
              <Link href={`/crm/invoicing/quotations/${quotationId}/edit`}>
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
        {status === "sent" && (
          <>
            <Button
              variant="outline"
              onClick={() => setShowAcceptDialog(true)}
              disabled={isPending}
              className="border-green-200 text-green-700 hover:bg-green-50 dark:border-green-800 dark:text-green-400"
            >
              {isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <CheckCircle className="mr-2 h-4 w-4" />
              )}
              Accepteer
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowRejectDialog(true)}
              disabled={isPending}
              className="border-red-200 text-red-700 hover:bg-red-50 dark:border-red-800 dark:text-red-400"
            >
              {isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <XCircle className="mr-2 h-4 w-4" />
              )}
              Afwijzen
            </Button>
          </>
        )}
        {status === "accepted" && !convertedToInvoiceId && (
          <Button onClick={() => setShowConvertDialog(true)} disabled={isPending}>
            {isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Receipt className="mr-2 h-4 w-4" />
            )}
            Converteer naar factuur
          </Button>
        )}
        {status === "accepted" && convertedToInvoiceId && (
          <Button variant="outline" asChild>
            <Link href={`/crm/invoicing/invoices/${convertedToInvoiceId}`}>
              <Receipt className="mr-2 h-4 w-4" />
              Bekijk factuur
            </Link>
          </Button>
        )}
        <Button variant="outline" asChild>
          <Link href={`/api/invoicing/pdf/quotation/${quotationId}`} target="_blank">
            <FileDown className="mr-2 h-4 w-4" />
            PDF
          </Link>
        </Button>
      </div>

      {/* Send Confirmation Dialog */}
      <AlertDialog open={showSendDialog} onOpenChange={setShowSendDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Offerte versturen?</AlertDialogTitle>
            <AlertDialogDescription>
              De offerte wordt als verzonden gemarkeerd. In de toekomst wordt
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

      {/* Accept Confirmation Dialog */}
      <AlertDialog open={showAcceptDialog} onOpenChange={setShowAcceptDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Offerte accepteren?</AlertDialogTitle>
            <AlertDialogDescription>
              De offerte wordt gemarkeerd als geaccepteerd. Je kunt deze daarna
              omzetten naar een factuur.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>Annuleren</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleAccept}
              disabled={isPending}
              className="bg-green-600 hover:bg-green-700"
            >
              {isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <CheckCircle className="mr-2 h-4 w-4" />
              )}
              Accepteren
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Reject Confirmation Dialog */}
      <AlertDialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Offerte afwijzen?</AlertDialogTitle>
            <AlertDialogDescription>
              De offerte wordt gemarkeerd als afgewezen. Dit kan niet ongedaan
              worden gemaakt.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>Annuleren</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleReject}
              disabled={isPending}
              className="bg-red-600 hover:bg-red-700"
            >
              {isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <XCircle className="mr-2 h-4 w-4" />
              )}
              Afwijzen
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Convert to Invoice Dialog */}
      <AlertDialog open={showConvertDialog} onOpenChange={setShowConvertDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Converteren naar factuur?</AlertDialogTitle>
            <AlertDialogDescription>
              Er wordt een nieuwe factuur aangemaakt op basis van deze offerte.
              Alle regelitems worden overgenomen.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>Annuleren</AlertDialogCancel>
            <AlertDialogAction onClick={handleConvert} disabled={isPending}>
              {isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Receipt className="mr-2 h-4 w-4" />
              )}
              Converteren
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
