"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Building,
  Upload,
  Camera,
  CheckCircle2,
  AlertCircle,
  FileText,
  ArrowRight,
  ChevronRight,
  X,
  Plus,
  Loader2,
} from "lucide-react";
import { Property, PropertyDoc } from "@/lib/vault-data";

interface AddDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  properties: Property[];
  onAddDocumentSuccess: (propertyId: string, newDoc: PropertyDoc) => void;
  onViewDoc?: (doc: PropertyDoc, propTitle: string) => void;
}

type UploadStep =
  | "CHOOSE_PROPERTY"
  | "UPLOAD_OPTIONS"
  | "PROCESSING"
  | "IDENTIFIED"
  | "UNCERTAIN"
  | "SUCCESS"
  | "FAILURE";

export function AddDocumentModal({
  isOpen,
  onClose,
  properties,
  onAddDocumentSuccess,
  onViewDoc,
}: AddDocumentModalProps) {
  const [step, setStep] = useState<UploadStep>("CHOOSE_PROPERTY");
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [processingText, setProcessingText] = useState("Adding your document...");
  const [identifiedDocType, setIdentifiedDocType] = useState("Sale Deed");
  const [createdDoc, setCreatedDoc] = useState<PropertyDoc | null>(null);
  const [showAddPropertyNotice, setShowAddPropertyNotice] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setStep("CHOOSE_PROPERTY");
      setSelectedProperty(null);
      setProcessingText("Adding your document...");
      setIdentifiedDocType("Sale Deed");
      setCreatedDoc(null);
      setShowAddPropertyNotice(false);
    }
  }, [isOpen]);

  const handleSelectProperty = (prop: Property) => {
    setSelectedProperty(prop);
    setStep("UPLOAD_OPTIONS");
  };

  const startUploadProcess = (simulatedFailure = false, simulatedUncertain = false) => {
    setStep("PROCESSING");
    setProcessingText("Adding your document...");

    setTimeout(() => {
      setProcessingText("Checking the document...");
    }, 1200);

    setTimeout(() => {
      if (simulatedFailure) {
        setStep("FAILURE");
      } else if (simulatedUncertain) {
        setStep("UNCERTAIN");
      } else {
        setStep("IDENTIFIED");
      }
    }, 2600);
  };

  const handleConfirmSave = (customType?: string) => {
    if (!selectedProperty) return;

    const docType = customType || identifiedDocType;
    const isDeed = docType.toLowerCase().includes("deed");
    const isTax = docType.toLowerCase().includes("tax");

    const newDoc: PropertyDoc = {
      id: `doc-${Date.now()}`,
      name: `${docType} (${new Date().getFullYear()})`,
      type: docType,
      issuedBy: isDeed
        ? `Sub-Registrar Office, ${selectedProperty.city}`
        : isTax
        ? `${selectedProperty.city} Municipal Corporation`
        : `Dept of Revenue, ${selectedProperty.state}`,
      issueDate: "Today",
      documentNumber: `REC/${selectedProperty.state.substring(0, 2).toUpperCase()}/2026/${Math.floor(1000 + Math.random() * 9000)}`,
    };

    setCreatedDoc(newDoc);
    onAddDocumentSuccess(selectedProperty.id, newDoc);
    setStep("SUCCESS");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent showCloseButton={false} className="max-w-3xl w-[720px] sm:max-w-3xl bg-white text-zinc-900 border border-zinc-200/90 p-8 sm:p-10 md:p-12 rounded-3xl shadow-2xl font-sans max-h-[88vh] overflow-y-auto">
        
        <DialogHeader className="sr-only">
          <DialogTitle>Add Document to Vault</DialogTitle>
          <DialogDescription>
            Upload a document or take a photo to automatically organize property records.
          </DialogDescription>
        </DialogHeader>

        {/* STEP 2 — CHOOSE PROPERTY */}
        {step === "CHOOSE_PROPERTY" && (
          <div className="space-y-8 font-sans">
            <div className="flex items-start justify-between border-b border-zinc-100 pb-5">
              <div>
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900">
                  Which property is this for?
                </h2>
                <p className="text-base text-zinc-500 font-medium pt-1">
                  Choose a property to attach your document to.
                </p>
              </div>
              <button
                onClick={onClose}
                aria-label="Close modal"
                className="h-10 w-10 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-600 flex items-center justify-center transition-colors shrink-0"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3">
              {properties.map((prop) => (
                <button
                  key={prop.id}
                  onClick={() => handleSelectProperty(prop)}
                  className="w-full p-5 sm:p-6 rounded-2xl bg-white hover:bg-purple-50/70 border border-zinc-200/90 hover:border-purple-300 text-left transition-all group flex items-center justify-between shadow-2xs"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-purple-50 text-purple-900 flex items-center justify-center shrink-0 group-hover:bg-purple-100 transition-colors">
                      <Building className="h-6 w-6 stroke-[2.2]" />
                    </div>
                    <div>
                      <p className="text-xl font-bold text-zinc-900 group-hover:text-purple-900 transition-colors">
                        {prop.title}
                      </p>
                      <p className="text-base text-zinc-500 font-medium">
                        {prop.city}, {prop.state}
                      </p>
                    </div>
                  </div>

                  <ChevronRight className="h-6 w-6 text-zinc-400 group-hover:text-purple-900 transition-colors shrink-0 ml-3" />
                </button>
              ))}

              <button
                onClick={() => setShowAddPropertyNotice(!showAddPropertyNotice)}
                className="w-full p-5 rounded-2xl border border-dashed border-zinc-300 hover:border-purple-400 hover:bg-stone-50 text-zinc-700 hover:text-purple-900 font-bold text-base transition-all flex items-center justify-center gap-2"
              >
                <Plus className="h-5 w-5 text-purple-900" />
                <span>Add a new property</span>
              </button>

              {showAddPropertyNotice && (
                <div className="p-4 rounded-xl bg-purple-50 border border-purple-100 text-purple-950 text-sm font-medium">
                  Select one of your existing 4 properties above, or Vault can register a new property for you automatically when you upload your deed.
                </div>
              )}
            </div>
          </div>
        )}

        {/* STEP 3 — UPLOAD OPTIONS */}
        {step === "UPLOAD_OPTIONS" && selectedProperty && (
          <div className="space-y-8 font-sans">
            <div className="flex items-start justify-between border-b border-zinc-100 pb-5">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-purple-900 block pb-1">
                  Add document to
                </span>
                <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900">
                  {selectedProperty.title}
                </h2>
                <p className="text-base text-zinc-500 font-medium">
                  {selectedProperty.city}, {selectedProperty.state}
                </p>
              </div>

              <button
                onClick={onClose}
                aria-label="Close modal"
                className="h-10 w-10 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-600 flex items-center justify-center transition-colors shrink-0"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <button
                onClick={() => startUploadProcess(false, false)}
                className="p-8 rounded-3xl bg-white hover:bg-purple-50/70 border border-zinc-200/90 hover:border-purple-300 text-left transition-all group flex flex-col justify-between space-y-6 shadow-2xs"
              >
                <div className="h-14 w-14 rounded-2xl bg-purple-50 text-purple-900 flex items-center justify-center shrink-0 group-hover:bg-purple-100 transition-colors">
                  <Upload className="h-7 w-7 stroke-[2.2]" />
                </div>
                <div>
                  <p className="text-xl font-extrabold text-zinc-900 group-hover:text-purple-900 transition-colors">
                    Upload a document
                  </p>
                  <p className="text-sm text-zinc-500 font-medium pt-1">
                    Select a PDF, scanned file, or photo from your device.
                  </p>
                </div>
              </button>

              <button
                onClick={() => startUploadProcess(false, false)}
                className="p-8 rounded-3xl bg-white hover:bg-purple-50/70 border border-zinc-200/90 hover:border-purple-300 text-left transition-all group flex flex-col justify-between space-y-6 shadow-2xs"
              >
                <div className="h-14 w-14 rounded-2xl bg-purple-50 text-purple-900 flex items-center justify-center shrink-0 group-hover:bg-purple-100 transition-colors">
                  <Camera className="h-7 w-7 stroke-[2.2]" />
                </div>
                <div>
                  <p className="text-xl font-extrabold text-zinc-900 group-hover:text-purple-900 transition-colors">
                    Take a photo
                  </p>
                  <p className="text-sm text-zinc-500 font-medium pt-1">
                    Use your phone or webcam to snap a physical paper.
                  </p>
                </div>
              </button>
            </div>

            {/* DEMO CONTROLS TO TEST ALL PHASE 11 SCENARIOS */}
            <div className="pt-4 border-t border-zinc-100 flex flex-wrap items-center justify-between text-xs text-zinc-400 gap-2">
              <button
                onClick={() => setStep("CHOOSE_PROPERTY")}
                className="hover:text-zinc-700 underline font-semibold"
              >
                ← Back to property selection
              </button>
              <div className="flex gap-3">
                <button
                  onClick={() => startUploadProcess(false, true)}
                  className="hover:text-zinc-600 underline"
                >
                  Simulate uncertain document
                </button>
                <button
                  onClick={() => startUploadProcess(true, false)}
                  className="hover:text-zinc-600 underline"
                >
                  Simulate upload failure
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4 — UPLOAD & PROCESSING STATE */}
        {step === "PROCESSING" && (
          <div className="py-12 space-y-6 text-center font-sans">
            <div className="h-16 w-16 rounded-full bg-purple-50 text-purple-900 flex items-center justify-center mx-auto">
              <Loader2 className="h-8 w-8 animate-spin stroke-[2.2]" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-extrabold text-zinc-900">
                {processingText}
              </h3>
              <p className="text-base text-zinc-500 font-medium">
                Vault is attaching this record to {selectedProperty?.title}.
              </p>
            </div>
          </div>
        )}

        {/* STEP 5 — AUTOMATIC DOCUMENT IDENTIFICATION */}
        {step === "IDENTIFIED" && selectedProperty && (
          <div className="space-y-8 font-sans">
            <div className="flex items-start justify-between border-b border-zinc-100 pb-5">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-purple-900 block pb-1">
                  Vault Recognition
                </span>
                <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900">
                  We think this is a:
                </h2>
              </div>

              <button
                onClick={onClose}
                aria-label="Close modal"
                className="h-10 w-10 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-600 flex items-center justify-center transition-colors shrink-0"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="rounded-3xl bg-stone-50/90 border border-zinc-200 p-8 space-y-4">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-2xl bg-purple-900 text-white flex items-center justify-center shrink-0">
                  <FileText className="h-6 w-6 stroke-[2.2]" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-2xl font-extrabold text-zinc-900">
                    {identifiedDocType}
                  </h3>
                  <p className="text-base font-semibold text-zinc-700">
                    {selectedProperty.title} • {selectedProperty.city}, {selectedProperty.state}
                  </p>
                  <p className="text-sm text-zinc-500 font-medium">
                    Registered sale deed · Added today
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-2">
              <p className="text-lg font-bold text-zinc-900">
                Is this correct?
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <button
                  onClick={() => handleConfirmSave()}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-purple-900 hover:bg-purple-950 text-white font-bold text-base px-8 py-4 shadow-xs transition-colors"
                >
                  <span>Yes, save it</span>
                  <CheckCircle2 className="h-5 w-5" />
                </button>

                <button
                  onClick={() => setStep("UNCERTAIN")}
                  className="w-full sm:w-auto px-6 py-4 rounded-2xl border border-zinc-300 hover:bg-stone-50 text-zinc-800 font-semibold text-base transition-colors"
                >
                  Change document type
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 6 — UNCERTAIN DOCUMENT (FALLBACK SELECTION) */}
        {step === "UNCERTAIN" && (
          <div className="space-y-8 font-sans">
            <div className="flex items-start justify-between border-b border-zinc-100 pb-5">
              <div>
                <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900">
                  We couldn&apos;t identify this document.
                </h2>
                <p className="text-base text-zinc-500 font-medium pt-1">
                  What kind of document is it?
                </p>
              </div>

              <button
                onClick={onClose}
                aria-label="Close modal"
                className="h-10 w-10 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-600 flex items-center justify-center transition-colors shrink-0"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {[
                { label: "Sale deed", desc: "Registered property conveyance" },
                { label: "Tax receipt", desc: "Municipal land charge or holding tax" },
                { label: "Mutation record", desc: "Official mutation order slip" },
                { label: "Khata / Khatian", desc: "e-Khata or Record of Rights" },
                { label: "Encumbrance Certificate", desc: "Search & non-encumbrance report" },
                { label: "Other document", desc: "Allotment or general paper" },
              ].map((opt) => (
                <button
                  key={opt.label}
                  onClick={() => handleConfirmSave(opt.label)}
                  className="p-5 rounded-2xl bg-white hover:bg-purple-50/70 border border-zinc-200/90 hover:border-purple-300 text-left transition-all group flex items-center justify-between shadow-2xs"
                >
                  <div>
                    <p className="text-lg font-bold text-zinc-900 group-hover:text-purple-900 transition-colors">
                      {opt.label}
                    </p>
                    <p className="text-xs text-zinc-500 font-medium">
                      {opt.desc}
                    </p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-zinc-400 group-hover:text-purple-900 transition-colors shrink-0 ml-2" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 7 — QUIET SUCCESS */}
        {step === "SUCCESS" && createdDoc && selectedProperty && (
          <div className="space-y-8 font-sans">
            <div className="rounded-3xl bg-emerald-50/80 border border-emerald-200 p-8 space-y-4">
              <div className="flex items-center gap-3 text-emerald-900 font-extrabold text-xl">
                <CheckCircle2 className="h-6 w-6 text-emerald-700 shrink-0" />
                <span>Saved to {selectedProperty.title}</span>
              </div>
              <div className="space-y-1 pl-9">
                <h3 className="text-2xl font-extrabold text-zinc-900">
                  {createdDoc.type}
                </h3>
                <p className="text-sm text-zinc-600 font-medium">
                  {selectedProperty.city}, {selectedProperty.state} · Added today
                </p>
              </div>
            </div>

            <p className="text-lg text-zinc-600 leading-relaxed font-medium">
              Vault will keep this document with the rest of your property records.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <button
                onClick={onClose}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-purple-900 hover:bg-purple-950 text-white font-bold text-base px-8 py-4 shadow-xs transition-colors"
              >
                <span>Done</span>
              </button>

              {onViewDoc && (
                <button
                  onClick={() => {
                    onClose();
                    onViewDoc(createdDoc, selectedProperty.title);
                  }}
                  className="w-full sm:w-auto px-6 py-4 rounded-2xl border border-zinc-300 hover:bg-stone-50 text-zinc-800 font-semibold text-base transition-colors"
                >
                  View document →
                </button>
              )}
            </div>
          </div>
        )}

        {/* STEP 8 — UPLOAD FAILURE */}
        {step === "FAILURE" && (
          <div className="space-y-8 font-sans">
            <div className="flex items-start justify-between border-b border-zinc-100 pb-5">
              <div>
                <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900">
                  We couldn&apos;t add this document
                </h2>
                <p className="text-base text-zinc-500 font-medium pt-1">
                  The file could not be uploaded.
                </p>
              </div>

              <button
                onClick={onClose}
                aria-label="Close modal"
                className="h-10 w-10 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-600 flex items-center justify-center transition-colors shrink-0"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="rounded-2xl bg-zinc-50 border border-zinc-200 p-6 space-y-2">
              <div className="flex items-center gap-2.5 text-zinc-900 font-bold text-base">
                <AlertCircle className="h-5 w-5 text-amber-700 shrink-0" />
                <span>Your original file is still safe on your device.</span>
              </div>
              <p className="text-sm text-zinc-600 font-medium leading-relaxed pl-7">
                Please check your network connection or try choosing a different photo file.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <button
                onClick={() => startUploadProcess(false, false)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-purple-900 hover:bg-purple-950 text-white font-bold text-base px-8 py-4 shadow-xs transition-colors"
              >
                <span>Try again</span>
              </button>

              <button
                onClick={() => setStep("UPLOAD_OPTIONS")}
                className="w-full sm:w-auto px-6 py-4 rounded-2xl border border-zinc-300 hover:bg-stone-50 text-zinc-800 font-semibold text-base transition-colors"
              >
                Choose another file
              </button>
            </div>
          </div>
        )}

      </DialogContent>
    </Dialog>
  );
}
