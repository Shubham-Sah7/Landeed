"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Layers, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export type PrototypeTab = "vault" | "returning" | "empty" | "failure" | "rationale";

interface PrototypeSwitcherProps {
  activeTab: PrototypeTab;
  setActiveTab: (tab: PrototypeTab) => void;
}

const OPTIONS: { id: PrototypeTab; label: string; group: string; subtitle: string }[] = [
  {
    id: "vault",
    label: "Main Vault",
    group: "MAIN DASHBOARD",
    subtitle: "Active monitoring state with properties",
  },
  {
    id: "returning",
    label: "6-Month Return State",
    group: "MAIN DASHBOARD",
    subtitle: "Returning user with 1 attention item",
  },
  {
    id: "empty",
    label: "Empty Vault State",
    group: "PRODUCT STATES",
    subtitle: "First-time user setup (0 properties)",
  },
  {
    id: "failure",
    label: "Check Failed State",
    group: "PRODUCT STATES",
    subtitle: "Public registry source unavailable",
  },
  {
    id: "rationale",
    label: "Product Rationale",
    group: "STRATEGY",
    subtitle: "Why Vault is proactive, not a chatbot",
  },
];

export function PrototypeSwitcher({ activeTab, setActiveTab }: PrototypeSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const activeOption = OPTIONS.find((o) => o.id === activeTab) || OPTIONS[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="fixed bottom-5 right-5 z-50 font-sans">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-zinc-900/90 hover:bg-zinc-900 text-white text-xs font-semibold shadow-lg backdrop-blur-md border border-zinc-700/50 transition-all cursor-pointer group"
        aria-label="Switch prototype view"
      >
        <Layers className="h-3.5 w-3.5 text-purple-400 group-hover:rotate-12 transition-transform" />
        <span className="text-zinc-300">View:</span>
        <span className="font-bold text-white">{activeOption.label}</span>
        <ChevronDown
          className={`h-3.5 w-3.5 text-zinc-400 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-purple-400" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute right-0 bottom-full mb-2 w-72 bg-white border border-zinc-200 rounded-2xl p-2 shadow-2xl z-50 text-left overflow-hidden"
          >
            <div className="px-3 py-2 border-b border-zinc-100">
              <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                Prototype Screen Switcher
              </p>
            </div>

            <div className="py-1 space-y-0.5 max-h-[320px] overflow-y-auto">
              {OPTIONS.map((option) => {
                const isSelected = option.id === activeTab;
                return (
                  <button
                    key={option.id}
                    onClick={() => {
                      setActiveTab(option.id);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2.5 rounded-xl transition-all flex items-start justify-between gap-2 cursor-pointer ${
                      isSelected
                        ? "bg-purple-50 text-purple-950 font-bold"
                        : "hover:bg-zinc-50 text-zinc-700"
                    }`}
                  >
                    <div className="space-y-0.5 min-w-0">
                      <p className="text-xs font-bold leading-snug truncate">{option.label}</p>
                      <p className="text-[10px] text-zinc-500 font-normal truncate">
                        {option.subtitle}
                      </p>
                    </div>
                    {isSelected && (
                      <Check className="h-4 w-4 text-purple-900 shrink-0 mt-0.5" />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
