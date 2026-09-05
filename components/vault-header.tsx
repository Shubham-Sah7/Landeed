"use client";

import React from "react";
import Image from "next/image";
import logoImg from "@/Image/Logo.webp";
import { FileText, Plus } from "lucide-react";

interface VaultHeaderProps {
  onOpenProfile: () => void;
  onOpenDocuments: () => void;
  onOpenAddDocument: () => void;
}

export function VaultHeader({
  onOpenProfile,
  onOpenDocuments,
  onOpenAddDocument,
}: VaultHeaderProps) {
  return (
    <header className="w-full border-b border-zinc-200/80 bg-white/90 backdrop-blur-md sticky top-0 z-30 font-sans">
      <div className="mx-auto flex h-16 sm:h-18 max-w-5xl items-center justify-between px-4 sm:px-8">
        
        {/* Brand: Official Landeed Logo */}
        <div className="flex items-center gap-3">
          <Image
            src={logoImg}
            alt="Landeed"
            width={128}
            height={24}
            className="h-6 sm:h-7 w-auto object-contain"
            priority
          />
          <span className="text-zinc-300 font-light text-sm">/</span>
          <span className="text-xs font-bold text-purple-900 tracking-wider uppercase bg-purple-50 border border-purple-200/70 px-2.5 py-0.5 rounded-md">
            Vault
          </span>
        </div>

        {/* Clean Right Actions & User Profile */}
        <div className="flex items-center gap-3 sm:gap-4">
          
          {/* All Documents Button */}
          <button
            onClick={onOpenDocuments}
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-zinc-200/90 hover:bg-zinc-50 text-xs font-bold text-zinc-700 transition-colors shadow-2xs cursor-pointer"
          >
            <FileText className="h-4 w-4 text-purple-900" />
            <span>Documents</span>
          </button>

          {/* Add Document Primary Action */}
          <button
            onClick={onOpenAddDocument}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-900 hover:bg-purple-950 text-white text-xs font-extrabold transition-colors shadow-xs cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>Add document</span>
          </button>

          {/* Vertical Separator */}
          <div className="h-6 w-px bg-zinc-200 hidden sm:block" />

          {/* Landeed Profile Button */}
          <button
            onClick={onOpenProfile}
            className="flex items-center gap-2.5 p-1 sm:p-1.5 hover:bg-zinc-100/80 rounded-2xl transition-colors text-left cursor-pointer group border border-transparent hover:border-zinc-200/60"
            aria-label="Open profile settings"
          >
            <div className="relative h-8 w-8 sm:h-9 sm:w-9 rounded-full overflow-hidden shrink-0 shadow-2xs border border-purple-200 group-hover:border-purple-400 transition-colors">
              <Image
                src="/avatar.jpg"
                alt="Rajesh Sharma"
                width={36}
                height={36}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="hidden md:block text-left pr-1">
              <p className="text-xs font-bold text-zinc-900 leading-tight group-hover:text-purple-900 transition-colors">
                Rajesh Sharma
              </p>
              <p className="text-[11px] text-zinc-500 font-medium leading-none mt-0.5">
                4 properties
              </p>
            </div>
          </button>

        </div>

      </div>
    </header>
  );
}
