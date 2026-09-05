"use client";

import React from "react";
import { ShieldCheck, FileText, RefreshCw, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  activeTab: "prototype" | "rationale";
  setActiveTab: (tab: "prototype" | "rationale") => void;
  onOpenWhatsApp: () => void;
  isSyncing: boolean;
  onTriggerSync: () => void;
}

export function Navbar({
  activeTab,
  setActiveTab,
  onOpenWhatsApp,
  isSyncing,
  onTriggerSync,
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand Logo & Tag */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-700 text-white shadow-md shadow-indigo-500/20">
            <ShieldCheck className="h-5 w-5 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold tracking-tight text-lg text-slate-900 dark:text-white">
                LANDEED
              </span>
              <span className="rounded-full bg-indigo-100 dark:bg-indigo-950/70 px-2 py-0.5 text-[11px] font-semibold text-indigo-700 dark:text-indigo-300 border border-indigo-200/50 dark:border-indigo-800/50">
                VAULT SENTINEL
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Continuous Property Guardian
            </p>
          </div>
        </div>

        {/* Center Toggle */}
        <div className="hidden md:flex items-center rounded-xl bg-slate-100 dark:bg-slate-900 p-1 border border-slate-200/60 dark:border-slate-800">
          <button
            onClick={() => setActiveTab("prototype")}
            className={`flex items-center gap-2 rounded-lg px-4 py-1.5 text-xs font-semibold transition-all ${
              activeTab === "prototype"
                ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <ShieldCheck className="h-3.5 w-3.5" />
            Vault Desk
          </button>
          <button
            onClick={() => setActiveTab("rationale")}
            className={`flex items-center gap-2 rounded-lg px-4 py-1.5 text-xs font-semibold transition-all ${
              activeTab === "rationale"
                ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <FileText className="h-3.5 w-3.5" />
            Product Bet & Strategy
          </button>
        </div>

        {/* Right Actions & User Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Sync Trigger Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={onTriggerSync}
            disabled={isSyncing}
            className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900"
          >
            <RefreshCw className={`h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400 ${isSyncing ? "animate-spin" : ""}`} />
            {isSyncing ? "Syncing Registries..." : "Sync Registries"}
          </Button>

          {/* WhatsApp Update Simulator */}
          <Button
            size="sm"
            onClick={onOpenWhatsApp}
            className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium gap-1.5 shadow-sm shadow-emerald-600/20"
          >
            <MessageCircle className="h-3.5 w-3.5 fill-current" />
            <span className="hidden sm:inline">WhatsApp Digest</span>
          </Button>

          {/* User Persona Profile */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-800">
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-amber-500 to-indigo-600 p-[2px]">
              <div className="h-full w-full rounded-full bg-white dark:bg-slate-900 flex items-center justify-center text-xs font-bold text-slate-800 dark:text-slate-200">
                RS
              </div>
            </div>
            <div className="hidden lg:block text-left">
              <p className="text-xs font-bold text-slate-900 dark:text-white leading-none">
                Rajesh Sharma
              </p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">
                4 Properties Managed
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* Mobile Tab Switcher */}
      <div className="flex md:hidden border-t border-slate-200/80 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 p-1">
        <button
          onClick={() => setActiveTab("prototype")}
          className={`flex-1 py-2 text-center text-xs font-semibold rounded-md ${
            activeTab === "prototype"
              ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm"
              : "text-slate-600 dark:text-slate-400"
          }`}
        >
          Vault Desk
        </button>
        <button
          onClick={() => setActiveTab("rationale")}
          className={`flex-1 py-2 text-center text-xs font-semibold rounded-md ${
            activeTab === "rationale"
              ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm"
              : "text-slate-600 dark:text-slate-400"
          }`}
        >
          Product Bet & Strategy
        </button>
      </div>
    </header>
  );
}
