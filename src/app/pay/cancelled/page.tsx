"use client";

import { useSearchParams } from "next/navigation";
import { XCircle, ArrowLeft, RefreshCw } from "lucide-react";

export default function PaymentCancelledPage() {
  const searchParams = useSearchParams();
  const invoiceId = searchParams.get("invoice");

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        {/* Cancelled Icon */}
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-amber-100 flex items-center justify-center">
          <XCircle className="h-10 w-10 text-amber-600" />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-zinc-900 mb-2">
          Betaling geannuleerd
        </h1>
        <p className="text-zinc-600 mb-6">
          U heeft de betaling geannuleerd. Er is geen bedrag afgeschreven.
        </p>

        {/* Info Box */}
        <div className="bg-amber-50 rounded-xl p-4 mb-6 text-left border border-amber-200">
          <p className="text-sm text-amber-800">
            <strong>Geen zorgen!</strong> De factuur staat nog open en u kunt op
            elk moment opnieuw proberen te betalen via de link in uw e-mail.
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          {invoiceId && (
            <p className="text-sm text-zinc-500">
              Factuurreferentie: #{invoiceId}
            </p>
          )}
        </div>

        {/* Retry Options */}
        <div className="mt-6 flex flex-col gap-3">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-violet-600 text-white font-medium hover:bg-violet-700 transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
            Opnieuw proberen
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center gap-2 text-zinc-600 hover:text-zinc-800 font-medium"
          >
            <ArrowLeft className="h-4 w-4" />
            Terug naar home
          </a>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-zinc-100">
          <p className="text-xs text-zinc-400">
            Heeft u vragen? Neem contact op met de afzender van de factuur.
          </p>
        </div>
      </div>
    </div>
  );
}
