"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Property, PropertyDoc } from "@/lib/vault-data";
import { ArrowRight, CheckCircle2, AlertCircle, X, ShieldCheck, Loader2 } from "lucide-react";

interface PropertyDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: Property;
  onResolveIssue: (propertyId: string) => void;
  onViewDoc: (doc: PropertyDoc, propTitle: string) => void;
}

type StepState = "OVERVIEW" | "REVIEW" | "PROCESSING" | "SUCCESS";

export function PropertyDetailModal({
  isOpen,
  onClose,
  property,
  onResolveIssue,
  onViewDoc,
}: PropertyDetailModalProps) {
  const [stepState, setStepState] = useState<StepState>("OVERVIEW");
  const [resolved, setResolved] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setStepState("OVERVIEW");
    }
  }, [isOpen]);

  const handleStartReview = () => {
    setStepState("REVIEW");
  };

  const handleExecutePayment = () => {
    setStepState("PROCESSING");
    setTimeout(() => {
      setStepState("SUCCESS");
      setResolved(true);
      onResolveIssue(property.id);
    }, 1800);
  };

  const handleCloseModal = () => {
    setStepState("OVERVIEW");
    onClose();
  };

  const isAttention = property.status === "NEEDS_ATTENTION" && !resolved;

  return (
    <Dialog open={isOpen} onOpenChange={handleCloseModal}>
      <DialogContent showCloseButton={false} className="max-w-3xl w-[840px] sm:max-w-3xl bg-white text-zinc-900 border border-zinc-200/90 p-8 sm:p-10 md:p-12 rounded-3xl shadow-2xl font-sans max-h-[88vh] overflow-y-auto">
        
        <DialogHeader className="sr-only">
          <DialogTitle>{property.title}</DialogTitle>
          <DialogDescription>
            {property.city}, {property.state} • Property Details and Vault Documents
          </DialogDescription>
        </DialogHeader>

        {/* SCREEN 1 & GENERAL OVERVIEW */}
        {stepState === "OVERVIEW" && (
          <div className="space-y-9 font-sans">
            
            {/* HEADER: TITLE, LOCATION, STATUS & CLOSE */}
            <div className="flex flex-wrap items-start justify-between gap-4 pb-6 border-b border-zinc-100">
              <div className="space-y-1">
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900">
                  {property.title}
                </h1>
                <p className="text-lg text-zinc-500 font-medium">
                  {property.city}, {property.state}
                </p>
              </div>

              <div className="flex items-center gap-3">
                {resolved ? (
                  <span className="inline-flex items-center gap-2 rounded-full bg-white text-zinc-800 border border-zinc-200 px-4 py-1.5 text-sm font-bold shadow-2xs">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-600 shrink-0" />
                    <span>Everything looks good</span>
                  </span>
                ) : isAttention ? (
                  <span className="inline-flex items-center gap-2 rounded-full bg-white text-zinc-900 border border-zinc-200 px-4 py-1.5 text-sm font-bold shadow-2xs">
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-500 shrink-0" />
                    <span>Needs your attention</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-2 rounded-full bg-white text-zinc-800 border border-zinc-200 px-4 py-1.5 text-sm font-semibold shadow-2xs">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-600 shrink-0" />
                    <span>Everything looks good</span>
                  </span>
                )}

                <button
                  onClick={handleCloseModal}
                  aria-label="Close property detail"
                  className="h-10 w-10 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-600 flex items-center justify-center transition-colors ml-2"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* LEVEL 1 — THE PROBLEM & LEVEL 2 — THE ACTION */}
            {isAttention && property.issue ? (
              <div className="space-y-6 pt-1">
                <div className="space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-900">
                    Main Finding
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 leading-snug tracking-tight">
                    An unpaid land charge of ₹4,850 was found.
                  </h2>
                  <div className="space-y-1">
                    <p className="text-sm font-bold uppercase tracking-wider text-zinc-400">
                      Why this matters
                    </p>
                    <p className="text-lg text-zinc-600 leading-relaxed font-medium">
                      {property.issue.whyItMatters}
                    </p>
                  </div>
                </div>

                {/* ACTION ROW */}
                <div className="pt-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <button
                    onClick={handleStartReview}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-2xl bg-purple-900 hover:bg-purple-950 text-white font-bold text-base px-8 py-4 shadow-sm transition-colors"
                  >
                    <span>Review &amp; pay ₹4,850</span>
                    <ArrowRight className="h-5 w-5" />
                  </button>

                  <p className="text-sm text-zinc-400 font-medium">
                    {property.lastChecked}
                  </p>
                </div>
              </div>
            ) : resolved ? (
              <div className="rounded-2xl bg-zinc-50 border border-zinc-200 p-6 space-y-2">
                <p className="font-extrabold text-zinc-900 text-lg">
                  Land Charge Paid &amp; Record Updated
                </p>
                <p className="text-base text-zinc-600">
                  Official tax receipt auto-saved to your documents below.
                </p>
              </div>
            ) : (
              <div className="space-y-2 pt-1">
                <h2 className="text-2xl font-bold text-zinc-900">
                  Everything looks good on this property.
                </h2>
                <p className="text-base text-zinc-500 font-medium">
                  {property.lastChecked}
                </p>
              </div>
            )}

            {/* LEVEL 3 — SUPPORTING INFORMATION (What we checked) */}
            <div className="space-y-4 pt-6 border-t border-zinc-100">
              <h3 className="text-xl font-bold text-zinc-900">
                What we checked
              </h3>

              <div className="space-y-3 text-base">
                <div className="flex items-center justify-between py-3 border-b border-zinc-100">
                  <span className="font-semibold text-zinc-900">Property ownership</span>
                  <span className="text-zinc-600 font-medium">Everything looks good</span>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-zinc-100">
                  <span className="font-semibold text-zinc-900">Land records</span>
                  <span className={isAttention ? "text-purple-900 font-bold" : "text-zinc-600 font-medium"}>
                    {isAttention ? "₹4,850 charge found" : "Everything looks good"}
                  </span>
                </div>

                <div className="flex items-center justify-between py-3">
                  <span className="font-semibold text-zinc-900">Court records</span>
                  <span className="text-zinc-600 font-medium">No issues found</span>
                </div>
              </div>
            </div>

            {/* LEVEL 4 — DOCUMENTS */}
            <div className="space-y-4 pt-6 border-t border-zinc-100">
              <div className="flex items-baseline justify-between">
                <h3 className="text-xl font-bold text-zinc-900">
                  Your documents
                </h3>
                <span className="text-sm text-zinc-500 font-medium">
                  {property.documents.length} documents stored
                </span>
              </div>

              <div className="divide-y divide-zinc-100">
                {property.documents.map((doc) => (
                  <div
                    key={doc.id}
                    onClick={() => onViewDoc(doc, property.title)}
                    className="py-4 flex items-center justify-between cursor-pointer group hover:bg-stone-50/80 px-3 -mx-3 rounded-xl transition-all"
                  >
                    <div className="space-y-0.5">
                      <span className="text-lg font-bold text-zinc-900 group-hover:text-purple-900 transition-colors block">
                        {doc.name}
                      </span>
                      <span className="text-sm text-zinc-500 font-medium">
                        {doc.type} · Issued {doc.issueDate}
                      </span>
                    </div>

                    <span className="text-sm font-bold text-purple-900 group-hover:underline shrink-0 ml-4">
                      Open document →
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* SCREEN 2 — REVIEW PAYMENT DETAILS */}
        {stepState === "REVIEW" && (
          <div className="space-y-8 font-sans">
            <div className="flex items-start justify-between border-b border-zinc-100 pb-5">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-purple-900 block pb-1">
                  Review Payment
                </span>
                <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900">
                  Land charge
                </h2>
              </div>

              <button
                onClick={() => setStepState("OVERVIEW")}
                aria-label="Back to overview"
                className="h-10 w-10 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-600 flex items-center justify-center transition-colors shrink-0"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="rounded-3xl bg-stone-50/90 border border-zinc-200 p-8 space-y-6">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                  Amount due
                </span>
                <p className="text-4xl font-extrabold text-zinc-900">
                  ₹4,850
                </p>
              </div>

              <div className="border-t border-zinc-200/80 pt-5 space-y-3 text-base">
                <div className="flex justify-between">
                  <span className="text-zinc-500 font-medium">Property:</span>
                  <span className="font-bold text-zinc-900">{property.title} ({property.city})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500 font-medium">What you are paying for:</span>
                  <span className="font-bold text-zinc-900">Land charge for FY 2025–26</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500 font-medium">Authority:</span>
                  <span className="font-bold text-zinc-900">Ranchi Municipal Corporation</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <button
                onClick={handleExecutePayment}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-2xl bg-purple-900 hover:bg-purple-950 text-white font-bold text-lg px-9 py-4 shadow-sm transition-colors"
              >
                <span>Pay ₹4,850</span>
                <ArrowRight className="h-5 w-5" />
              </button>

              <button
                onClick={() => setStepState("OVERVIEW")}
                className="text-sm font-semibold text-zinc-500 hover:text-zinc-800 underline"
              >
                Back to property overview
              </button>
            </div>
          </div>
        )}

        {/* SCREEN 3 — PROCESSING PAYMENT */}
        {stepState === "PROCESSING" && (
          <div className="py-14 space-y-6 text-center font-sans">
            <div className="h-16 w-16 rounded-full bg-purple-50 text-purple-900 flex items-center justify-center mx-auto">
              <Loader2 className="h-8 w-8 animate-spin stroke-[2.2]" />
            </div>

            <div className="space-y-2">
              <h3 className="text-3xl font-extrabold text-zinc-900">
                Processing your payment...
              </h3>
              <p className="text-base text-zinc-500 font-medium">
                Updating municipal record for {property.title}.
              </p>
            </div>
          </div>
        )}

        {/* SCREEN 4 — SUCCESS & RECORD UPDATED */}
        {stepState === "SUCCESS" && (
          <div className="space-y-8 font-sans">
            <div className="rounded-3xl bg-emerald-50/80 border border-emerald-200 p-8 space-y-4">
              <div className="flex items-center gap-3 text-emerald-900 font-extrabold text-2xl">
                <CheckCircle2 className="h-7 w-7 text-emerald-700 shrink-0" />
                <span>Payment complete</span>
              </div>

              <div className="space-y-2 pl-10">
                <p className="text-xl font-bold text-zinc-900">
                  Your land charge of ₹4,850 has been paid.
                </p>
                <p className="text-base text-zinc-600 font-medium leading-relaxed">
                  Vault will check the property again after the record is updated.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-stone-50 border border-zinc-200 flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                  Property Status
                </span>
                <p className="text-lg font-bold text-zinc-900 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-700" />
                  Everything looks good
                </p>
              </div>
              <span className="text-xs text-zinc-400 font-medium">
                Updated just now
              </span>
            </div>

            <div className="pt-2">
              <button
                onClick={handleCloseModal}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-purple-900 hover:bg-purple-950 text-white font-bold text-base px-9 py-4 shadow-xs transition-colors"
              >
                <span>Done</span>
              </button>
            </div>
          </div>
        )}

      </DialogContent>
    </Dialog>
  );
}

