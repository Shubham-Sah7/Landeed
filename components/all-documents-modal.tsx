"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { FileText, ArrowRight, X, Folder } from "lucide-react";
import { PROPERTIES_DATA, PropertyDoc, Property } from "@/lib/vault-data";

interface AllDocumentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDoc: (doc: PropertyDoc, propTitle: string) => void;
  properties?: Property[];
}

export function AllDocumentsModal({
  isOpen,
  onClose,
  onSelectDoc,
  properties = PROPERTIES_DATA,
}: AllDocumentsModalProps) {
  // Total document count across all properties
  const totalDocCount = properties.reduce((acc, p) => acc + p.documents.length, 0);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        showCloseButton={false}
        className="max-w-4xl sm:max-w-4xl w-[920px] bg-white text-zinc-900 border border-zinc-200/90 p-8 sm:p-10 md:p-12 rounded-3xl shadow-2xl font-sans max-h-[82vh] overflow-y-auto"
      >
        
        {/* HEADER */}
        <DialogHeader className="border-b border-zinc-100 pb-6 space-y-1 text-left relative">
          <div className="flex items-start justify-between gap-4">
            <div>
              <DialogTitle className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#18181B]">
                All Vault Documents
              </DialogTitle>
              <DialogDescription className="text-base sm:text-lg text-zinc-500 font-medium pt-1">
                {totalDocCount} stored documents across your {properties.length} properties
              </DialogDescription>
            </div>

            <button
              onClick={onClose}
              aria-label="Close documents modal"
              className="h-10 w-10 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-600 flex items-center justify-center transition-colors shrink-0 cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </DialogHeader>

        {/* MAIN BODY: GROUPED BY PROPERTY */}
        <div className="space-y-10 pt-6 pb-2 font-sans">
          
          {properties.map((property) => (
            <div key={property.id} className="space-y-4">
              
              {/* PROPERTY GROUP HEADER */}
              <div className="flex items-center justify-between gap-4 pb-2 border-b border-zinc-100">
                <div className="flex items-center gap-2.5">
                  <div className="h-8 w-8 rounded-lg bg-purple-50 text-purple-900 flex items-center justify-center shrink-0">
                    <Folder className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold text-[#18181B]">
                      {property.title}
                    </h3>
                    <p className="text-xs text-zinc-500 font-medium">
                      {property.city}, {property.state}
                    </p>
                  </div>
                </div>

                <span className="text-xs font-bold text-zinc-600 bg-zinc-100 px-3 py-1 rounded-full shrink-0">
                  {property.documents.length} {property.documents.length === 1 ? "document" : "documents"}
                </span>
              </div>

              {/* FULL-WIDTH DOCUMENT ROWS (NO TRUNCATION) */}
              <div className="space-y-3">
                {property.documents.map((doc) => (
                  <div
                    key={doc.id}
                    onClick={() => {
                      onClose();
                      onSelectDoc(doc, property.title);
                    }}
                    className="w-full rounded-2xl bg-white border border-zinc-200/90 hover:border-purple-300 p-5 flex items-center justify-between gap-6 group cursor-pointer transition-all shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.04)]"
                  >
                    
                    {/* LEFT: ICON & FULL DOCUMENT NAME */}
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="h-11 w-11 rounded-xl bg-purple-50 text-purple-900 flex items-center justify-center shrink-0 group-hover:bg-purple-100 transition-colors">
                        <FileText className="h-5 w-5 stroke-[2.2]" />
                      </div>

                      <div className="space-y-1 min-w-0">
                        <h4 className="text-base sm:text-lg font-bold text-[#18181B] group-hover:text-purple-900 transition-colors leading-snug">
                          {doc.name}
                        </h4>
                        <p className="text-xs sm:text-sm text-zinc-500 font-medium">
                          {doc.type} · Issued {doc.issueDate} · {doc.issuedBy}
                        </p>
                      </div>
                    </div>

                    {/* RIGHT: VIEW ACTION */}
                    <div className="flex items-center gap-1.5 text-sm font-extrabold text-purple-900 group-hover:underline shrink-0 pl-2">
                      <span>View</span>
                      <ArrowRight className="h-4 w-4" />
                    </div>

                  </div>
                ))}
              </div>

            </div>
          ))}

        </div>

      </DialogContent>
    </Dialog>
  );
}
