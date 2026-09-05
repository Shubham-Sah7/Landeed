"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { FileText, Download, Share2, X, CheckCircle2 } from "lucide-react";
import { PropertyDoc } from "@/lib/vault-data";

interface DocumentViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  document: PropertyDoc | null;
  propertyTitle: string;
}

export function DocumentViewerModal({
  isOpen,
  onClose,
  document,
  propertyTitle,
}: DocumentViewerModalProps) {
  const [copiedShare, setCopiedShare] = useState(false);

  if (!document) return null;

  const handleShare = () => {
    setCopiedShare(true);
    setTimeout(() => {
      setCopiedShare(false);
    }, 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent showCloseButton={false} className="max-w-3xl w-[760px] sm:max-w-3xl bg-white text-zinc-900 border border-zinc-200/90 p-8 sm:p-10 md:p-12 rounded-3xl shadow-2xl font-sans max-h-[88vh] overflow-y-auto">
        
        {/* HEADER */}
        <DialogHeader className="border-b border-zinc-100 pb-6 space-y-1.5 text-left relative">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-2xl bg-purple-50 text-purple-900 flex items-center justify-center shrink-0">
                <FileText className="h-6 w-6 stroke-[2.2]" />
              </div>
              <div>
                <DialogTitle className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900">
                  {document.name}
                </DialogTitle>
                <DialogDescription className="text-base text-zinc-500 font-medium pt-0.5">
                  Property: <strong className="text-zinc-800">{propertyTitle}</strong> · Doc #{document.documentNumber}
                </DialogDescription>
              </div>
            </div>

            <button
              onClick={onClose}
              aria-label="Close document viewer"
              className="h-10 w-10 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-600 flex items-center justify-center transition-colors shrink-0"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </DialogHeader>

        <div className="py-6 space-y-8 font-sans">
          
          {/* OFFICIAL DOCUMENT RECORD CONTAINER */}
          <div className="bg-stone-50/90 border border-zinc-200 rounded-3xl p-7 sm:p-9 space-y-6 shadow-2xs">
            <div className="text-center border-b border-zinc-200/80 pb-5 space-y-1.5">
              <p className="text-xs uppercase font-bold tracking-widest text-zinc-400">
                Official Registered Document Record
              </p>
              <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-zinc-900">
                {document.type}
              </h3>
              <p className="text-sm text-zinc-500 font-medium">
                Issued by: {document.issuedBy} · Date: {document.issueDate}
              </p>
            </div>

            <div className="space-y-3.5 text-base font-sans max-w-xl mx-auto pt-1">
              <div className="flex justify-between border-b border-zinc-200/60 pb-3">
                <span className="text-zinc-500 font-medium">Document Registration Number:</span>
                <span className="font-bold text-zinc-900">{document.documentNumber}</span>
              </div>
              <div className="flex justify-between border-b border-zinc-200/60 pb-3">
                <span className="text-zinc-500 font-medium">Registered Owner Name:</span>
                <span className="font-bold text-zinc-900">Rajesh Sharma</span>
              </div>
              <div className="flex justify-between border-b border-zinc-200/60 pb-3">
                <span className="text-zinc-500 font-medium">Encumbrance &amp; Title Status:</span>
                <span className="font-bold text-emerald-800 inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4" /> Clear / Verified Record
                </span>
              </div>
            </div>
          </div>

          {/* LARGE OBVIOUS ACTIONS FOR 50+ USERS */}
          <div className="pt-4 border-t border-zinc-100 flex flex-wrap items-center justify-between gap-4">
            <button
              onClick={onClose}
              className="px-6 py-3.5 text-base text-zinc-700 hover:text-zinc-900 border border-zinc-300 rounded-2xl font-semibold transition-colors"
            >
              Close
            </button>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={handleShare}
                className="px-5 py-3.5 text-base bg-stone-100 hover:bg-stone-200 text-zinc-800 rounded-2xl font-bold flex items-center gap-2 border border-zinc-200 transition-colors"
              >
                <Share2 className="h-4.5 w-4.5 text-zinc-600" />
                <span>{copiedShare ? "Link Copied!" : "Share"}</span>
              </button>

              <button
                onClick={onClose}
                className="px-6 py-3.5 text-base bg-purple-900 hover:bg-purple-950 text-white rounded-2xl font-bold flex items-center gap-2.5 shadow-xs transition-colors"
              >
                <Download className="h-4.5 w-4.5" />
                <span>Download Official Copy</span>
              </button>
            </div>
          </div>

        </div>

      </DialogContent>
    </Dialog>
  );
}

