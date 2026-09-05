"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Search, FileText, ArrowRight, X, AlertCircle, Building2, ChevronRight } from "lucide-react";
import { searchVault, PropertyDoc, Property, SearchResultItem } from "@/lib/vault-data";

interface VaultSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDoc: (doc: PropertyDoc, propTitle: string) => void;
  onSelectProperty: (property: Property) => void;
  onOpenAllDocs?: () => void;
}

export function VaultSearchModal({
  isOpen,
  onClose,
  onSelectDoc,
  onSelectProperty,
  onOpenAllDocs,
}: VaultSearchModalProps) {
  const [query, setQuery] = useState("");
  const [isFailureState, setIsFailureState] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setIsFailureState(false);
    }
  }, [isOpen]);

  const searchResult = query.trim() ? searchVault(query) : null;
  const matches = searchResult?.matches || [];
  const matchedProperties = searchResult?.matchedProperties || [];

  const handleSuggestionClick = (text: string) => {
    setQuery(text);
    setIsFailureState(false);
  };

  const handleClear = () => {
    setQuery("");
    setIsFailureState(false);
  };

  const handleDocClick = (doc: PropertyDoc, propertyTitle: string) => {
    onClose();
    onSelectDoc(doc, propertyTitle);
  };

  const handlePropClick = (property: Property) => {
    onClose();
    onSelectProperty(property);
  };

  const handleSeeAllDocs = () => {
    onClose();
    if (onOpenAllDocs) {
      onOpenAllDocs();
    }
  };

  const uniquePropertyIds = Array.from(new Set(matches.map((m) => m.property.id)));
  const isSinglePropertyResult = uniquePropertyIds.length === 1 && matches.length > 0;
  const singleProperty = isSinglePropertyResult ? matches[0].property : null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent showCloseButton={false} className="max-w-3xl w-[840px] sm:max-w-3xl bg-white text-zinc-900 border border-zinc-200/90 p-8 sm:p-10 md:p-12 rounded-3xl shadow-2xl font-sans max-h-[88vh] overflow-y-auto">
        
        {/* HEADER */}
        <DialogHeader className="border-b border-zinc-100 pb-6 space-y-1.5 text-left relative">
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900">
                Search your properties
              </DialogTitle>
              <DialogDescription className="text-lg text-zinc-500 font-medium pt-1">
                What are you looking for?
              </DialogDescription>
            </div>

            <button
              onClick={onClose}
              aria-label="Close search"
              className="h-10 w-10 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-600 flex items-center justify-center transition-colors shrink-0"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </DialogHeader>

        <div className="space-y-8 pt-6 pb-2">
          
          {/* LARGE OPEN-ENDED SEARCH INPUT FIELD (Height 68px, text 19px) */}
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-zinc-400">
              <Search className="h-6 w-6 stroke-[2.2] text-purple-900" />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setIsFailureState(false);
              }}
              placeholder="Search your properties or documents..."
              className="w-full h-16 sm:h-[68px] pl-16 pr-14 bg-white border border-zinc-300 rounded-2xl text-[18px] sm:text-[19px] text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-purple-900 focus:border-purple-900 transition-all font-medium shadow-xs"
              autoFocus
            />
            {query && (
              <button
                onClick={handleClear}
                aria-label="Clear search"
                className="absolute inset-y-0 right-0 pr-5 flex items-center text-zinc-400 hover:text-zinc-700 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            )}
          </div>

          {/* NATURAL SUGGESTIONS WITH MEANINGFUL BREATHING ROOM */}
          {!query && (
            <div className="space-y-4 pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 block">
                Try asking naturally
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  "Show me my Ranchi papers",
                  "Where is my sale deed?",
                  "Show my tax receipts",
                  "Documents for my Patna house",
                ].map((sug) => (
                  <button
                    key={sug}
                    onClick={() => handleSuggestionClick(sug)}
                    className="text-left rounded-2xl bg-stone-50/80 hover:bg-purple-50/70 hover:border-purple-200 text-zinc-800 hover:text-purple-900 text-base font-semibold p-4 transition-all border border-zinc-200/80 flex items-center justify-between group shadow-2xs"
                  >
                    <span>&ldquo;{sug}&rdquo;</span>
                    <ChevronRight className="h-4.5 w-4.5 text-zinc-400 group-hover:text-purple-900 transition-colors ml-2 shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* SIMULATION OF FETCH NOTICE FOR DEMO */}
          {query && !isFailureState && (
            <div className="flex justify-end">
              <button
                onClick={() => setIsFailureState(true)}
                className="text-xs text-zinc-400 hover:text-zinc-600 underline"
              >
                Simulate document fetch notice
              </button>
            </div>
          )}

          {/* RETRIEVAL FAILURE STATE */}
          {isFailureState && (
            <div className="rounded-2xl bg-zinc-50 border border-zinc-200 p-7 space-y-4">
              <div className="flex items-center gap-3 text-zinc-900 font-bold text-lg">
                <AlertCircle className="h-5 w-5 text-amber-700 shrink-0" />
                <span>We couldn&apos;t check this document right now</span>
              </div>
              <p className="text-zinc-600 text-base leading-relaxed">
                The state record portal is currently slow. Your property records remain completely safe in your Vault.
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => setIsFailureState(false)}
                  className="rounded-xl bg-purple-900 hover:bg-purple-950 text-white font-bold px-6 py-3.5 text-sm transition-colors"
                >
                  Try again
                </button>
                {matchedProperties[0] && (
                  <button
                    onClick={() => handlePropClick(matchedProperties[0])}
                    className="rounded-xl border border-zinc-300 hover:bg-zinc-100 text-zinc-800 font-semibold px-6 py-3.5 text-sm transition-colors"
                  >
                    View property →
                  </button>
                )}
              </div>
            </div>
          )}

          {/* SEARCH RESULTS */}
          {!isFailureState && query.trim() && (
            <div className="space-y-6 pt-1">
              
              {/* NO MATCHES */}
              {matches.length === 0 && (
                <div className="rounded-2xl bg-stone-50/80 border border-zinc-200 p-9 text-center space-y-4">
                  <p className="text-xl font-bold text-zinc-900">
                    I couldn&apos;t find that in your Vault.
                  </p>
                  <p className="text-base text-zinc-600 max-w-md mx-auto leading-relaxed">
                    Try searching for a property name, document or year (e.g. &ldquo;Ranchi plot&rdquo;, &ldquo;sale deed&rdquo;, or &ldquo;1984&rdquo;).
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={handleSeeAllDocs}
                      className="rounded-2xl bg-purple-900 hover:bg-purple-950 text-white font-bold text-base px-7 py-4 shadow-xs transition-colors inline-flex items-center gap-2"
                    >
                      <span>See all documents</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* SINGLE MATCH RESULT */}
              {matches.length === 1 && matches[0].doc && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-900">
                    <Building2 className="h-4 w-4" />
                    <span>Found in {matches[0].property.title}</span>
                  </div>

                  <div className="rounded-2xl bg-white border border-zinc-200/90 p-7 space-y-6 shadow-xs hover:border-purple-200 transition-all">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-5">
                      <div className="flex items-start gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-purple-50 text-purple-900 flex items-center justify-center shrink-0 mt-0.5">
                          <FileText className="h-6 w-6 stroke-[2.2]" />
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-2xl font-extrabold text-zinc-900 tracking-tight">
                            {matches[0].doc.name}
                          </h4>
                          <p className="text-base text-zinc-600 font-medium">
                            {matches[0].doc.type} • {matches[0].doc.issueDate}
                          </p>
                          <p className="text-sm text-zinc-500 font-normal">
                            {matches[0].doc.issuedBy} · Doc #{matches[0].doc.documentNumber}
                          </p>
                        </div>
                      </div>

                      <div className="self-start sm:self-center shrink-0">
                        <button
                          onClick={() => matches[0].doc && handleDocClick(matches[0].doc, matches[0].property.title)}
                          className="inline-flex items-center gap-2 rounded-2xl bg-purple-900 hover:bg-purple-950 text-white text-base font-bold px-6 py-3.5 transition-colors shadow-xs"
                        >
                          <span>Open document</span>
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-zinc-100 flex items-center justify-between">
                      <div className="text-base font-semibold text-zinc-700">
                        {matches[0].property.title} • {matches[0].property.city}, {matches[0].property.state}
                      </div>
                      <button
                        onClick={() => handlePropClick(matches[0].property)}
                        className="text-sm font-bold text-purple-900 hover:underline inline-flex items-center gap-1"
                      >
                        <span>View property</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* MULTIPLE MATCHES */}
              {matches.length > 1 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-zinc-900">
                    {isSinglePropertyResult && singleProperty
                      ? `Documents found in ${singleProperty.title}`
                      : `I found ${matches.length} matching documents`}
                  </h3>

                  <div className="space-y-3.5">
                    {matches.map((item, idx) => (
                      <div
                        key={item.doc ? item.doc.id : idx}
                        className="rounded-2xl bg-white border border-zinc-200/90 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-5 hover:border-purple-300 hover:shadow-md transition-all shadow-xs"
                      >
                        <div className="flex items-start gap-4">
                          <div className="h-11 w-11 rounded-2xl bg-purple-50 text-purple-900 flex items-center justify-center shrink-0 mt-0.5">
                            <FileText className="h-5.5 w-5.5 stroke-[2.2]" />
                          </div>
                          <div className="space-y-1">
                            <span className="text-xs font-bold text-purple-900 uppercase tracking-wider block">
                              {item.property.title} • {item.property.city}, {item.property.state}
                            </span>
                            <h4 className="text-xl font-bold text-zinc-900">
                              {item.doc?.name}
                            </h4>
                            <p className="text-sm text-zinc-500 font-medium">
                              {item.doc?.type} · {item.doc?.issueDate}
                            </p>
                          </div>
                        </div>

                        <div className="self-start sm:self-center shrink-0">
                          <button
                            onClick={() => item.doc && handleDocClick(item.doc, item.property.title)}
                            className="inline-flex items-center gap-2 rounded-xl bg-purple-900 hover:bg-purple-950 text-white text-base font-bold px-5 py-3 transition-colors"
                          >
                            <span>Open document</span>
                            <ArrowRight className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {singleProperty && (
                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={() => handlePropClick(singleProperty)}
                        className="text-sm font-bold text-purple-900 hover:underline inline-flex items-center gap-1.5"
                      >
                        <span>View {singleProperty.title} details</span>
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>
              )}

            </div>
          )}

        </div>

      </DialogContent>
    </Dialog>
  );
}


