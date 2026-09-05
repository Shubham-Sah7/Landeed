"use client";

import React from "react";
import { Property, PropertyDoc } from "@/lib/vault-data";
import { VaultSearchBar } from "@/components/vault-search-bar";
import { PropertyHealthGraph } from "@/components/property-health-graph";
import { Plus, Building2, ShieldCheck, AlertCircle, FileText } from "lucide-react";

interface MainVaultViewProps {
  properties: Property[];
  onSelectProperty: (property: Property) => void;
  onViewDoc: (doc: PropertyDoc, propTitle: string) => void;
  onOpenSearch: () => void;
  onOpenAddDocument: () => void;
}

export function MainVaultView({
  properties,
  onSelectProperty,
  onViewDoc,
  onOpenSearch,
  onOpenAddDocument,
}: MainVaultViewProps) {
  const attentionProperty = properties.find((p) => p.status === "NEEDS_ATTENTION");
  const goodCount = properties.filter((p) => p.status === "LOOKS_GOOD").length;
  const totalCount = properties.length;

  return (
    <div className="space-y-9 py-4 font-sans">
      
      {/* 1. TOP MESSAGE */}
      <section className="space-y-3 font-sans">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 leading-tight">
          3 properties look good.<br />
          <span className="text-purple-900">1 needs your attention.</span>
        </h1>

        {/* Supporting explanation */}
        <p className="text-base text-zinc-600 leading-relaxed max-w-xl font-medium">
          Everything is up to date on 3 properties. One property has something you should look at.
        </p>

        {/* Reassurance timestamp */}
        <p className="text-xs text-zinc-400 font-medium pt-0.5">
          Checked today at 6:15 AM
        </p>
      </section>

      {/* 2. 4 SMALL SUMMARY CARDS */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        
        {/* CARD 1 — Properties */}
        <div className="rounded-xl bg-white border border-zinc-200 p-4.5 sm:p-5 space-y-3 shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-all hover:border-zinc-300">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Properties
            </span>
            <Building2 className="h-4 w-4 text-zinc-400" />
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight">
              4
            </p>
            <p className="text-xs text-zinc-500 font-medium mt-1">
              Across 3 locations
            </p>
          </div>
        </div>

        {/* CARD 2 — Up to date */}
        <div className="rounded-xl bg-white border border-zinc-200 p-4.5 sm:p-5 space-y-3 shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-all hover:border-zinc-300">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Up to date
            </span>
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-600 shrink-0" />
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight">
              3
            </p>
            <p className="text-xs text-zinc-500 font-medium mt-1">
              Nothing needs your attention
            </p>
          </div>
        </div>

        {/* CARD 3 — Needs attention */}
        <div className="rounded-xl bg-white border border-zinc-200 p-4.5 sm:p-5 space-y-3 shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-all hover:border-zinc-300">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Needs attention
            </span>
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500 shrink-0" />
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight">
              1
            </p>
            <p className="text-xs text-zinc-500 font-medium mt-1">
              Land charge found
            </p>
          </div>
        </div>

        {/* CARD 4 — Documents */}
        <div className="rounded-xl bg-white border border-zinc-200 p-4.5 sm:p-5 space-y-3 shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-all hover:border-zinc-300">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Documents
            </span>
            <FileText className="h-4 w-4 text-purple-900" />
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight">
              18
            </p>
            <p className="text-xs text-zinc-500 font-medium mt-1">
              Stored in Vault
            </p>
          </div>
        </div>

      </section>

      {/* 3. PROPERTY HEALTH GRAPH */}
      <PropertyHealthGraph />

      {/* 4. INLINE EXPANDABLE NATURAL SEARCH BAR */}
      <section className="pt-2">
        <VaultSearchBar
          onSelectDoc={onViewDoc}
          onSelectProperty={onSelectProperty}
          properties={properties}
        />
      </section>

      {/* 5. REFINED EDITORIAL ATTENTION CARD (NO YELLOW STROKE, NO LOW-OPACITY COLORED BACKGROUND) */}
      {attentionProperty && attentionProperty.issue && (
        <section className="rounded-2xl bg-white border border-zinc-200 p-6 sm:p-7 space-y-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] transition-all">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <h2 className="text-xl font-extrabold text-[#18181B]">
                {attentionProperty.title}
              </h2>
              <p className="text-xs text-zinc-500 font-medium">
                {attentionProperty.city}, {attentionProperty.state}
              </p>
            </div>
            
            {/* SOLID CRISP PILL (NO LOW OPACITY YELLOW) */}
            <span className="inline-flex items-center gap-2 text-xs font-extrabold text-zinc-900 bg-white border border-zinc-200 px-3.5 py-1.5 rounded-full shrink-0 shadow-2xs">
              <span className="h-2 w-2 rounded-full bg-amber-500 shrink-0" />
              <span>Needs your attention</span>
            </span>
          </div>

          {/* SOLID NEUTRAL MESSAGE BOX (NO LOW OPACITY YELLOW TINT) */}
          <div className="bg-zinc-50 border border-zinc-200/80 rounded-xl p-4.5">
            <p className="text-base text-zinc-900 font-bold leading-snug">
              {attentionProperty.issue.whatWeFound}
            </p>
          </div>

          <div>
            <button
              onClick={() => onSelectProperty(attentionProperty)}
              className="inline-flex items-center gap-2 rounded-xl bg-purple-900 hover:bg-purple-950 text-white text-sm font-extrabold px-6 py-3 transition-colors shadow-2xs cursor-pointer"
            >
              <span>Review this</span>
              <span>→</span>
            </button>
          </div>
        </section>
      )}

      {/* 6. MY PROPERTIES CARD LIST */}
      <section className="space-y-4 pt-2">
        <div className="flex items-center justify-between pb-1">
          <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
            My Properties ({totalCount})
          </h2>
          
          <button
            onClick={onOpenAddDocument}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-purple-900 hover:bg-purple-950 text-white text-xs font-bold transition-colors shadow-2xs cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Add document</span>
          </button>
        </div>

        <div className="space-y-3">
          {properties.map((prop) => {
            const isAttention = prop.status === "NEEDS_ATTENTION";

            return (
              <div
                key={prop.id}
                onClick={() => onSelectProperty(prop)}
                className="rounded-2xl bg-white border border-zinc-200 hover:border-purple-300 p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer group transition-all duration-200 shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.04)]"
              >
                <div className="space-y-1">
                  <h3 className="text-base sm:text-lg font-bold text-[#18181B] group-hover:text-purple-900 transition-colors">
                    {prop.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-500 font-medium">
                    {prop.city}, {prop.state}
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span
                    className={`inline-flex items-center gap-2 text-xs font-bold px-3.5 py-1.5 rounded-full bg-white border border-zinc-200 shadow-2xs ${
                      isAttention ? "text-zinc-900" : "text-zinc-800"
                    }`}
                  >
                    <span
                      className={`h-2 w-2 rounded-full shrink-0 ${
                        isAttention ? "bg-amber-500" : "bg-emerald-600"
                      }`}
                    />
                    <span>{prop.statusText}</span>
                  </span>

                  <span className="text-zinc-400 group-hover:text-purple-900 text-sm font-bold transition-colors">
                    →
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
