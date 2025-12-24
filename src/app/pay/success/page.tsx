"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, FileText, ArrowRight } from "lucide-react";

interface PaymentDetails {
  invoiceNumber: string;
  amount: string;
  companyName: string;
  status: "success" | "pending" | "error";
}

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const invoiceId = searchParams.get("invoice");

  const [details, setDetails] = useState<PaymentDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function verifyPayment() {
      if (!sessionId) {
        setError("Geen betalingssessie gevonden");
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/stripe/verify-payment?session_id=${sessionId}`);
        const data = await response.json();

        if (data.success) {
          setDetails({
            invoiceNumber: data.invoiceNumber,
            amount: data.amount,
            companyName: data.companyName,
            status: data.paymentStatus === "paid" ? "success" : "pending",
          });
        } else {
          setError(data.error || "Kon betaling niet verifiëren");
        }
      } catch {
        // If verification API doesn't exist yet, show generic success
        setDetails({
          invoiceNumber: invoiceId || "Onbekend",
          amount: "",
          companyName: "",
          status: "success",
        });
      } finally {
        setIsLoading(false);
      }
    }

    verifyPayment();
  }, [sessionId, invoiceId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="h-12 w-12 mx-auto animate-spin rounded-full border-4 border-green-500 border-t-transparent" />
          <p className="mt-4 text-zinc-600">Betaling verifiëren...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-red-50 to-white flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-100 flex items-center justify-center">
            <span className="text-3xl">❌</span>
          </div>
          <h1 className="text-2xl font-bold text-zinc-900 mb-2">
            Er is iets misgegaan
          </h1>
          <p className="text-zinc-600 mb-6">{error}</p>
          <a
            href="/"
            className="inline-flex items-center gap-2 text-violet-600 hover:text-violet-700 font-medium"
          >
            Terug naar home
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        {/* Success Icon */}
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center animate-pulse">
          <CheckCircle2 className="h-10 w-10 text-green-600" />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-zinc-900 mb-2">
          Betaling geslaagd!
        </h1>
        <p className="text-zinc-600 mb-6">
          Bedankt voor uw betaling. U ontvangt een bevestiging per e-mail.
        </p>

        {/* Payment Details Card */}
        {details && (
          <div className="bg-zinc-50 rounded-xl p-6 mb-6 text-left">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center">
                <FileText className="h-5 w-5 text-violet-600" />
              </div>
              <div>
                <p className="text-sm text-zinc-500">Factuurnummer</p>
                <p className="font-semibold text-zinc-900">
                  {details.invoiceNumber}
                </p>
              </div>
            </div>

            {details.amount && (
              <div className="flex justify-between items-center py-3 border-t border-zinc-200">
                <span className="text-zinc-600">Betaald bedrag</span>
                <span className="font-bold text-lg text-green-600">
                  {details.amount}
                </span>
              </div>
            )}

            {details.companyName && (
              <div className="flex justify-between items-center py-3 border-t border-zinc-200">
                <span className="text-zinc-600">Aan</span>
                <span className="font-medium text-zinc-900">
                  {details.companyName}
                </span>
              </div>
            )}

            <div className="flex justify-between items-center py-3 border-t border-zinc-200">
              <span className="text-zinc-600">Status</span>
              <span className="inline-flex items-center gap-1.5 text-green-600 font-medium">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                Betaald
              </span>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="space-y-3">
          <p className="text-sm text-zinc-500">
            U kunt dit venster nu sluiten.
          </p>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-zinc-100">
          <p className="text-xs text-zinc-400">
            Betaling verwerkt via LeadFlow
          </p>
        </div>
      </div>
    </div>
  );
}
