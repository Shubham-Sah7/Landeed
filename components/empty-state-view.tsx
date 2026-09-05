"use client";

import React, { useState } from "react";
import { Plus, ArrowRight, FileText, CheckCircle2, ShieldCheck } from "lucide-react";

interface EmptyStateViewProps {
  onAddProperty: () => void;
  onAddDocument?: () => void;
}

export function EmptyStateView({ onAddProperty, onAddDocument }: EmptyStateViewProps) {
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    setAdded(true);
    setTimeout(() => {
      onAddProperty();
    }, 1200);
  };

  return (
    <div className="py-16 sm:py-24 max-w-2xl mx-auto text-center font-sans">
      
      {!added ? (
        <div className="space-y-10">
          
          {/* SUBTLE PROPERTY/VAULT SYMBOL */}
          <div className="h-14 w-14 rounded-2xl bg-purple-50 text-purple-900 border border-purple-100/80 flex items-center justify-center mx-auto shadow-2xs">
            <ShieldCheck className="h-7 w-7 stroke-[2]" />
          </div>

          {/* EYEBROW, HEADLINE & SUPPORTING TEXT */}
          <div className="space-y-4 px-4 sm:px-0">
            <span className="text-xs font-bold uppercase tracking-widest text-purple-900 block">
              YOUR VAULT
            </span>
            
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#18181B] leading-tight">
              Your properties, looked after.
            </h1>
            
            <p className="text-lg sm:text-xl text-zinc-600 leading-relaxed max-w-xl mx-auto font-medium">
              Add your first property to keep its documents together and let Vault keep an eye on its records.
            </p>
          </div>

          {/* PRIMARY BUTTON & SECONDARY TEXT ACTION */}
          <div className="space-y-5 pt-2">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4 sm:px-0">
              <button
                onClick={handleAdd}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-2xl bg-purple-900 hover:bg-purple-950 text-white font-extrabold text-lg px-8 py-4 shadow-2xs transition-all transform active:scale-[0.98] cursor-pointer"
              >
                <Plus className="h-5 w-5 stroke-[2.5]" />
                <span>Add my first property</span>
                <ArrowRight className="h-5 w-5" />
              </button>

              {onAddDocument && (
                <button
                  onClick={onAddDocument}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl border border-zinc-300 hover:bg-stone-100/80 text-zinc-800 font-bold text-base px-6 py-4 transition-colors cursor-pointer"
                >
                  <FileText className="h-5 w-5 text-purple-900" />
                  <span>I have a document to add</span>
                </button>
              )}
            </div>

            {/* SUBTLE SUPPORTING FOOTNOTE */}
            <p className="text-sm text-zinc-500 font-medium tracking-wide">
              You can add a property by address or location.
            </p>
          </div>

        </div>
      ) : (
        /* QUIET ADDITION CONFIRMATION */
        <div className="space-y-4 py-16 text-center">
          <div className="h-16 w-16 rounded-full bg-purple-50 text-purple-900 border border-purple-200 flex items-center justify-center mx-auto shadow-2xs">
            <CheckCircle2 className="h-9 w-9 text-purple-900" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#18181B]">
            Property Added to Vault
          </h2>
          <p className="text-base text-zinc-600 font-medium">
            Opening your Vault overview...
          </p>
        </div>
      )}

    </div>
  );
}



