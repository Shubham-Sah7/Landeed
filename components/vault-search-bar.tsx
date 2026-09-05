"use client";

import React, { useState, useRef, useEffect } from "react";
import { Search, X, ArrowUpRight, ArrowUp, FileText, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PROPERTIES_DATA, Property, PropertyDoc } from "@/lib/vault-data";

interface VaultSearchBarProps {
  onSelectDoc?: (doc: PropertyDoc, propertyTitle: string) => void;
  onSelectProperty?: (property: Property) => void;
  properties?: Property[];
}

const SAMPLE_SUGGESTIONS = [
  "Where is my sale deed?",
  "Show my Ranchi property documents",
  "Show my tax receipts",
  "Documents for my Patna house",
  "I want to update my Ownership records",
];

export function VaultSearchBar({
  onSelectDoc,
  onSelectProperty,
  properties = PROPERTIES_DATA,
}: VaultSearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const isTyping = searchQuery.trim().length > 0;

  // Handle outside click to collapse inline dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Natural Language Search Filtering Logic
  const normalized = searchQuery.toLowerCase().trim();

  const matchedResults: { doc: PropertyDoc; property: Property }[] = [];

  if (normalized.length > 0) {
    properties.forEach((prop) => {
      const propText = `${prop.title} ${prop.city} ${prop.state} ${prop.subtitle} ${prop.location}`.toLowerCase();

      prop.documents.forEach((doc) => {
        const docText = `${doc.name} ${doc.type} ${doc.issuedBy} ${doc.issueDate} ${doc.documentNumber}`.toLowerCase();

        // Natural language matching rules
        const matchesSaleDeed =
          (normalized.includes("sale") || normalized.includes("deed")) &&
          (docText.includes("sale deed") || docText.includes("deed") || docText.includes("agreement"));

        const matchesTax =
          (normalized.includes("tax") || normalized.includes("receipt")) &&
          (docText.includes("tax") || docText.includes("receipt") || docText.includes("challan"));

        const matchesMutation =
          (normalized.includes("mutation") || normalized.includes("ownership")) &&
          (docText.includes("mutation") || docText.includes("order") || docText.includes("khatian"));

        const matchesEncumbrance =
          (normalized.includes("encumbrance") || normalized.includes("ec")) &&
          (docText.includes("encumbrance") || docText.includes("certificate"));

        const matchesKhatian =
          normalized.includes("khatian") && docText.includes("khatian");

        const matchesCityOrProp =
          (normalized.includes("ranchi") && (propText.includes("ranchi") || propText.includes("kanke"))) ||
          (normalized.includes("patna") && propText.includes("patna")) ||
          (normalized.includes("bengaluru") && propText.includes("bengaluru")) ||
          (normalized.includes("kolkata") && propText.includes("kolkata"));

        const matchesDirectText = docText.includes(normalized) || propText.includes(normalized);

        if (
          matchesSaleDeed ||
          matchesTax ||
          matchesMutation ||
          matchesEncumbrance ||
          matchesKhatian ||
          (matchesCityOrProp && (normalized.includes("doc") || normalized.includes("show"))) ||
          matchesDirectText
        ) {
          if (!matchedResults.some((r) => r.doc.id === doc.id)) {
            matchedResults.push({ doc, property: prop });
          }
        }
      });
    });
  }

  const handleSelectSuggestion = (suggestionText: string) => {
    setSearchQuery(suggestionText);
    setIsOpen(true);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleClear = () => {
    setSearchQuery("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      setIsOpen(true);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full font-sans select-none z-20 space-y-3.5"
    >
      {/* MAIN CAPSULE SEARCH INPUT BAR */}
      <form onSubmit={handleSubmit} className="relative w-full">
        <div className="relative flex items-center w-full h-16 sm:h-[68px] px-6 bg-white border border-purple-200/80 rounded-full shadow-[0_4px_24px_rgba(88,28,135,0.08)] transition-all focus-within:border-purple-600 focus-within:ring-2 focus-within:ring-purple-900/20">
          
          {/* SEARCH INPUT */}
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (!isOpen) setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            placeholder="What document or property record are you looking for?"
            className="w-full bg-transparent border-0 text-[17px] sm:text-[18px] text-zinc-900 placeholder:italic placeholder:text-zinc-400 focus:outline-none font-medium pr-3"
          />

          {/* CLEAR / SUBMIT ACTION BUTTON AT RIGHT */}
          <div className="flex items-center gap-2 shrink-0">
            {isTyping && (
              <button
                type="button"
                onClick={handleClear}
                className="h-8 w-8 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-500 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}

            <button
              type="submit"
              className="h-10 w-10 sm:h-11 sm:w-11 rounded-full bg-zinc-100 hover:bg-purple-900 text-zinc-700 hover:text-white flex items-center justify-center transition-colors shrink-0 cursor-pointer shadow-2xs group"
              aria-label="Search"
            >
              <ArrowUp className="h-5 w-5 stroke-[2.2] group-hover:scale-110 transition-transform" />
            </button>
          </div>

        </div>
      </form>

      {/* SUGGESTION CHIPS (EXACT STYLE MATCHING REFERENCE IMAGE) */}
      {!isTyping && (
        <div className="flex flex-wrap items-center gap-2.5 pt-0.5">
          {SAMPLE_SUGGESTIONS.map((suggestion, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectSuggestion(suggestion)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-zinc-200/90 bg-white text-sm font-medium text-zinc-700 hover:border-purple-300 hover:text-purple-900 shadow-2xs transition-all cursor-pointer group"
            >
              <span>{suggestion}</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-zinc-400 group-hover:text-purple-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
            </button>
          ))}
        </div>
      )}

      {/* INLINE SEARCH RESULTS DROPDOWN WHEN TYPING OR SELECTED */}
      <AnimatePresence>
        {isOpen && isTyping && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.99 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute left-0 right-0 top-full mt-3 bg-white border border-zinc-200/90 rounded-2xl p-5 sm:p-6 shadow-[0_12px_36px_rgba(0,0,0,0.08)] z-30 font-sans space-y-4"
          >
            <div className="flex items-center justify-between pb-2 border-b border-zinc-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                Search Results ({matchedResults.length})
              </h3>
              <span className="text-xs text-zinc-500 font-medium">
                Matching &ldquo;{searchQuery}&rdquo;
              </span>
            </div>

            {matchedResults.length > 0 ? (
              <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
                {matchedResults.map(({ doc, property }) => (
                  <div
                    key={doc.id}
                    onClick={() => {
                      setIsOpen(false);
                      if (onSelectDoc) {
                        onSelectDoc(doc, property.title);
                      }
                    }}
                    className="w-full rounded-xl bg-stone-50/60 hover:bg-purple-50/70 border border-zinc-200/80 hover:border-purple-300 p-4 flex items-center justify-between gap-4 group cursor-pointer transition-all"
                  >
                    <div className="flex items-start gap-3.5 min-w-0">
                      <div className="h-10 w-10 rounded-xl bg-purple-100 text-purple-900 flex items-center justify-center shrink-0 mt-0.5">
                        <FileText className="h-5 w-5" />
                      </div>

                      <div className="space-y-0.5 min-w-0">
                        <div className="flex items-center gap-2 text-xs font-bold text-zinc-500">
                          <span>{property.title}</span>
                          <span>•</span>
                          <span>{property.city}, {property.state}</span>
                        </div>
                        <h4 className="text-base sm:text-lg font-bold text-[#18181B] group-hover:text-purple-900 transition-colors leading-snug">
                          {doc.name}
                        </h4>
                        <p className="text-xs text-zinc-500 font-medium">
                          {doc.type} · Issued {doc.issueDate}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-purple-900 group-hover:underline shrink-0 pl-2">
                      <span>View document</span>
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center space-y-2">
                <p className="text-base font-bold text-zinc-800">
                  No documents found matching &ldquo;{searchQuery}&rdquo;
                </p>
                <p className="text-xs text-zinc-500">
                  Try searching for &quot;sale deed&quot;, &quot;tax receipt&quot;, &quot;Ranchi&quot;, or &quot;mutation&quot;.
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
