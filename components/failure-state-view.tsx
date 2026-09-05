"use client";

import React, { useState } from "react";
import { RefreshCw, CheckCircle2, Clock, Info } from "lucide-react";

interface FailureStateViewProps {
  onRetry: () => void;
}

export function FailureStateView({ onRetry }: FailureStateViewProps) {
  const [retrying, setRetrying] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleRetryClick = () => {
    setRetrying(true);
    setTimeout(() => {
      setRetrying(false);
      setSuccess(true);
      setTimeout(() => {
        onRetry();
      }, 1200);
    }, 1500);
  };

  return (
    <div className="py-12 max-w-xl mx-auto space-y-6 font-sans">
      
      {!success ? (
        <div className="rounded-3xl border border-zinc-200 bg-white p-8 sm:p-10 space-y-7 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
          
          {/* PROPERTY HEADER & NEUTRAL STATUS BADGE */}
          <div className="flex items-start justify-between gap-4 pb-4 border-b border-zinc-100">
            <div>
              <h2 className="text-2xl font-extrabold text-[#18181B]">
                Kanke Road Plot
              </h2>
              <p className="text-sm text-zinc-500 font-medium pt-0.5">
                Ranchi, Jharkhand
              </p>
            </div>

            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-white text-zinc-800 border border-zinc-200 shadow-2xs shrink-0">
              <span className="h-2 w-2 rounded-full bg-zinc-400 shrink-0" />
              <span>Check unavailable</span>
            </span>
          </div>

          {/* MAIN MESSAGE & SUPPORTING TEXT */}
          <div className="space-y-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#18181B]">
              We couldn&apos;t check this property today.
            </h1>
            
            <div className="space-y-1.5 text-base text-zinc-600 font-medium leading-relaxed">
              <p>The latest record was not available right now.</p>
              <p className="text-zinc-800 font-semibold">
                This does not mean there is a problem with your property.
              </p>
            </div>
          </div>

          {/* METADATA: LAST SUCCESSFUL CHECK */}
          <div className="flex items-center gap-2 text-xs text-zinc-500 font-medium bg-zinc-50 border border-zinc-200 rounded-2xl p-4">
            <Clock className="h-4 w-4 text-zinc-400 shrink-0" />
            <span>Last successful check: <strong className="text-zinc-700 font-bold">Yesterday at 6:15 AM</strong></span>
          </div>

          {/* PRIMARY & SECONDARY ACTIONS */}
          <div className="space-y-4 pt-2">
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={handleRetryClick}
                disabled={retrying}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-2xl bg-purple-900 hover:bg-purple-950 text-white font-extrabold text-base px-7 py-3.5 shadow-2xs transition-all cursor-pointer"
              >
                <RefreshCw className={`h-4 w-4 ${retrying ? "animate-spin" : ""}`} />
                <span>{retrying ? "Re-checking record..." : "Try again"}</span>
              </button>

              <button
                onClick={onRetry}
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-2xl border border-zinc-300 hover:bg-stone-100/80 text-zinc-800 font-bold text-base px-6 py-3.5 transition-colors cursor-pointer"
              >
                <span>Check later</span>
              </button>
            </div>

            {/* INFORMATIONAL REASSURANCE */}
            <div className="flex items-center gap-2 text-xs text-zinc-400 font-medium pt-1">
              <Info className="h-3.5 w-3.5 shrink-0" />
              <span>We&apos;ll try checking again automatically.</span>
            </div>
          </div>

        </div>
      ) : (
        /* CONFIRMATION STATE */
        <div className="rounded-3xl border border-zinc-200 bg-white p-8 text-center space-y-3 shadow-2xs">
          <CheckCircle2 className="h-8 w-8 text-purple-900 mx-auto" />
          <h2 className="text-xl font-extrabold text-[#18181B]">
            Record Check Complete
          </h2>
          <p className="text-sm text-zinc-600 font-medium">
            Returning to Vault overview...
          </p>
        </div>
      )}

    </div>
  );
}
