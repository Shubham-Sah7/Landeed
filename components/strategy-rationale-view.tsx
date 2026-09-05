"use client";

import React from "react";
import { ArrowLeft } from "lucide-react";

interface StrategyRationaleViewProps {
  onBackToVault: () => void;
}

export function StrategyRationaleView({ onBackToVault }: StrategyRationaleViewProps) {
  return (
    <div className="max-w-2xl mx-auto py-8 sm:py-12 px-4 sm:px-0 text-[#18181B] font-sans space-y-12">
      
      {/* HEADER */}
      <div className="flex items-center justify-between gap-4 pb-4 border-b border-zinc-200/80">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#18181B]">
          Why I changed Vault
        </h1>

        <button
          onClick={onBackToVault}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-900 hover:text-purple-950 transition-colors shrink-0 cursor-pointer"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Vault</span>
        </button>
      </div>

      {/* THE BET */}
      <section className="space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-purple-900">
          The bet
        </h2>
        <p className="text-xl sm:text-2xl font-extrabold text-[#18181B] leading-snug">
          &ldquo;Vault becomes a quiet caretaker for your properties — checking things in the background and telling you when something needs attention.&rdquo;
        </p>
      </section>

      {/* THE PROBLEM */}
      <section className="space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
          The problem
        </h2>
        <div className="space-y-3 text-base sm:text-lg text-zinc-600 font-medium leading-relaxed">
          <p>
            Most property owners don&apos;t want another place to store documents.
          </p>
          <p className="text-[#18181B] font-bold">
            They want to know: &ldquo;Is everything okay?&rdquo;
          </p>
          <p>
            So instead of making people search through their documents, Vault surfaces what matters.
          </p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
          How it works
        </h2>
        
        <div className="bg-white border border-zinc-200/80 rounded-2xl p-5 sm:p-6 space-y-4 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
          <div className="flex flex-wrap items-center gap-2 text-sm sm:text-base font-bold text-purple-900">
            <span>Open Vault</span>
            <span className="text-zinc-300">→</span>
            <span>See what&apos;s okay</span>
            <span className="text-zinc-300">→</span>
            <span>See what needs attention</span>
            <span className="text-zinc-300">→</span>
            <span>Take action</span>
          </div>

          <div className="space-y-2 pt-2 border-t border-zinc-100 text-sm sm:text-base text-zinc-600 font-medium leading-relaxed">
            <p>
              If something changes, Vault explains: <strong className="text-zinc-900 font-bold">what happened, why it matters, and what to do next.</strong>
            </p>
            <p>
              When someone needs a document, they can simply ask for it in their own words.
            </p>
          </div>
        </div>
      </section>

      {/* WHO I DESIGNED FOR */}
      <section className="space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
          Who I designed for
        </h2>
        <div className="space-y-2 text-base sm:text-lg text-zinc-600 font-medium leading-relaxed">
          <p>
            A multi-property owner who has accumulated properties over the years but doesn&apos;t want to spend time managing paperwork.
          </p>
          <p className="text-[#18181B] font-bold">
            The interface is simple enough for a 52-year-old owner or a 75-year-old parent to understand without instructions.
          </p>
        </div>
      </section>

      {/* TRUST */}
      <section className="space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
          Trust
        </h2>
        <div className="space-y-3 text-base text-zinc-600 font-medium leading-relaxed">
          <p>
            A failed check should not look like a property problem.
          </p>
          <div className="bg-amber-50/60 border border-amber-200/80 rounded-2xl p-4 sm:p-5 text-zinc-900 font-bold text-base">
            &ldquo;We couldn&apos;t check this property today.&rdquo;
          </div>
          <p className="text-sm text-zinc-500 font-medium">
            This keeps uncertainty separate from an actual issue.
          </p>
        </div>
      </section>

      {/* THE PRINCIPLE */}
      <section className="pt-2">
        <div className="bg-purple-50/70 border border-purple-100 rounded-2xl p-6 text-center space-y-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-purple-900">
            The Principle
          </h2>
          <p className="text-xl sm:text-2xl font-extrabold text-[#18181B] leading-snug">
            &ldquo;Vault does the complicated work. The user sees what matters.&rdquo;
          </p>
        </div>
      </section>

      {/* REJECTED DIRECTION CASE STUDY */}
      <section className="pt-6 space-y-4 border-t border-zinc-200/80">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
            Exploration • Rejected Direction
          </h2>
          <span className="text-[11px] font-bold px-2.5 py-0.5 bg-red-50 text-red-700 border border-red-200 rounded-full">
            Rejected Concept
          </span>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-bold text-[#18181B]">
            &ldquo;Vault as an AI property advisor&rdquo;
          </h3>
          <p className="text-sm text-zinc-600 font-medium leading-relaxed">
            During early discovery, we considered a chatbot interface where users had to ask Vault questions about their properties.
          </p>
        </div>

        <div className="bg-white border border-dashed border-zinc-300 rounded-2xl p-5 space-y-3">
          <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
            Alternative prompts tested:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-700 font-medium">
            <div className="bg-zinc-50 border border-zinc-200/80 rounded-xl p-3">💬 &ldquo;Is my Ranchi property okay?&rdquo;</div>
            <div className="bg-zinc-50 border border-zinc-200/80 rounded-xl p-3">💬 &ldquo;What documents do I need?&rdquo;</div>
            <div className="bg-zinc-50 border border-zinc-200/80 rounded-xl p-3">💬 &ldquo;Should I sell this property?&rdquo;</div>
            <div className="bg-zinc-50 border border-zinc-200/80 rounded-xl p-3">💬 &ldquo;Explain my land records.&rdquo;</div>
          </div>
        </div>

        <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-5 text-sm text-zinc-700 leading-relaxed font-medium">
          <strong>Why we rejected it:</strong> Vault already has Terra AI for property conversations. Turning Vault into another chatbot would make it harder to see what actually needs attention. Instead, we made Vault proactive.
        </div>
      </section>

    </div>
  );
}
