"use client";

import React from "react";
import { Property, PropertyDoc } from "@/lib/vault-data";
import { VaultSearchBar } from "@/components/vault-search-bar";
import { ShieldCheck, ArrowRight, Plus } from "lucide-react";

interface ReturningUserViewProps {
  properties: Property[];
  onSelectProperty: (property: Property) => void;
  onViewDoc: (doc: PropertyDoc, propTitle: string) => void;
  onOpenSearch: () => void;
  onOpenAddDocument: () => void;
}

export function ReturningUserView({
  properties,
  onSelectProperty,
  onViewDoc,
  onOpenSearch,
  onOpenAddDocument,
}: ReturningUserViewProps) {
  // Identify changed property vs good properties
  const changedProperty = properties.find((p) => p.status === "NEEDS_ATTENTION") || properties[0];
  const goodProperties = properties.filter((p) => p.id !== changedProperty.id);

  return (
    <div className="space-y-10 font-sans py-4">
      
      {/* 1. INLINE EXPANDABLE NATURAL SEARCH BAR */}
      <section>
        <VaultSearchBar
          onSelectDoc={onViewDoc}
          onSelectProperty={onSelectProperty}
          properties={properties}
        />
      </section>

      {/* 2. WELCOMING HEADLINE & PROACTIVE DASHBOARD STATUS */}
      <div className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#18181B] tracking-tight">
          Welcome back, Rajesh.
        </h1>
        
        <div className="space-y-1 text-lg sm:text-xl font-medium text-zinc-600 leading-relaxed">
          <p>3 properties still look good.</p>
          <p className="text-purple-900 font-bold">1 property needs your attention.</p>
        </div>

        <p className="text-sm text-zinc-500 font-medium pt-1">
          Last checked today at 6:15 AM
        </p>
      </div>

      {/* 3. MAIN FEATURED ITEM — SOMETHING CHANGED (NO YELLOW STROKE, NO LOW OPACITY BACKGROUND) */}
      <div className="space-y-4">
        <div className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-6">
          
          {/* Header row */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-2xl font-extrabold text-[#18181B] tracking-tight">
                {changedProperty.title}
              </h3>
              <p className="text-base text-zinc-500 font-medium pt-0.5">
                {changedProperty.city}, {changedProperty.state}
              </p>
            </div>
            
            {/* SOLID CRISP PILL (NO LOW OPACITY YELLOW) */}
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold text-zinc-900 bg-white border border-zinc-200 shadow-2xs shrink-0">
              <span className="h-2 w-2 rounded-full bg-amber-500 shrink-0" />
              <span>Needs your attention</span>
            </span>
          </div>

          {/* SOLID NEUTRAL MESSAGE BOX (NO LOW OPACITY YELLOW TINT) */}
          <div className="bg-zinc-50 border border-zinc-200/80 rounded-2xl p-5">
            <p className="text-base sm:text-lg font-bold text-zinc-900 leading-snug">
              A new land charge of ₹4,850 was found in the latest record.
            </p>
          </div>

          {/* Primary Action Button */}
          <div>
            <button
              onClick={() => onSelectProperty(changedProperty)}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-purple-900 hover:bg-purple-950 text-white font-extrabold text-base px-7 py-3.5 shadow-2xs transition-colors cursor-pointer"
            >
              <span>Review this</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

        </div>
      </div>

      {/* 4. OTHER PROPERTIES SECTION */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
            Other properties
          </h2>
          <button
            onClick={onOpenAddDocument}
            className="text-xs font-bold text-purple-900 hover:text-purple-950 flex items-center gap-1 cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Add document</span>
          </button>
        </div>

        <div className="space-y-3">
          {goodProperties.map((prop) => (
            <div
              key={prop.id}
              onClick={() => onSelectProperty(prop)}
              className="bg-white border border-zinc-200 hover:border-purple-300 rounded-2xl p-5 flex items-center justify-between gap-4 transition-all cursor-pointer group shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.04)]"
            >
              <div>
                <h4 className="text-lg font-bold text-[#18181B] group-hover:text-purple-900 transition-colors">
                  {prop.title}
                </h4>
                <p className="text-sm text-zinc-500 font-medium">
                  {prop.city}, {prop.state}
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="inline-flex items-center gap-2 text-xs font-bold text-zinc-800 bg-white border border-zinc-200 px-3.5 py-1.5 rounded-full shadow-2xs">
                  <span className="h-2 w-2 rounded-full bg-emerald-600 shrink-0" />
                  <span>Everything looks good</span>
                </span>
                <span className="text-zinc-400 group-hover:text-purple-900 text-sm font-bold">
                  →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
