"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Building,
  FileText,
  Globe,
  Bell,
  HelpCircle,
  ShieldCheck,
  Info,
  LogOut,
  ChevronRight,
  Check,
  X,
} from "lucide-react";

interface ProfilePanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateProperties: () => void;
  onNavigateDocuments: () => void;
}

export function ProfilePanelModal({
  isOpen,
  onClose,
  onNavigateProperties,
  onNavigateDocuments,
}: ProfilePanelModalProps) {
  const [language, setLanguage] = useState<string>("English");
  const [notifyWhatsApp, setNotifyWhatsApp] = useState<boolean>(true);
  const [notifyEmail, setNotifyEmail] = useState<boolean>(false);
  const [showLanguagePicker, setShowLanguagePicker] = useState<boolean>(false);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent showCloseButton={false} className="max-w-2xl w-[640px] sm:max-w-2xl bg-white text-zinc-900 border border-zinc-200/80 p-6 sm:p-7 rounded-3xl shadow-2xl font-sans max-h-[520px] overflow-y-auto">
        
        <DialogHeader className="sr-only">
          <DialogTitle>Rajesh Sharma Account Profile</DialogTitle>
          <DialogDescription>
            Account preferences, notifications, properties navigation and settings for Rajesh Sharma.
          </DialogDescription>
        </DialogHeader>

        {/* TOP SECTION: COMPACT HEADER */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
          <div className="flex items-center gap-3.5">
            <div className="relative h-12 w-12 rounded-full overflow-hidden shrink-0 shadow-xs border border-purple-200">
              <Image
                src="/avatar.jpg"
                alt="Rajesh Sharma"
                width={48}
                height={48}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-xl font-bold text-zinc-900 leading-tight">
                Rajesh Sharma
              </h2>
              <p className="text-sm font-medium text-zinc-500">
                4 properties managed in Vault
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close profile panel"
            className="h-9 w-9 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-600 flex items-center justify-center transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* MAIN CONTENT: TWO-COLUMN LAYOUT */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 py-5">
          
          {/* LEFT COLUMN: NAVIGATION */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 block pb-1">
              Navigation
            </span>

            {/* MY PROPERTIES */}
            <button
              onClick={() => {
                onClose();
                onNavigateProperties();
              }}
              className="w-full p-4 rounded-2xl hover:bg-purple-50/60 border border-zinc-100 hover:border-purple-200 text-left transition-all group shadow-xs flex items-center justify-between"
            >
              <div className="flex items-start gap-3">
                <Building className="h-5 w-5 text-purple-900 shrink-0 mt-0.5" />
                <div>
                  <p className="text-[17px] font-bold text-zinc-900 group-hover:text-purple-900 transition-colors">
                    My properties
                  </p>
                  <p className="text-sm text-zinc-500 font-medium">
                    View and manage your 4 properties
                  </p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-zinc-400 group-hover:text-purple-900 transition-colors shrink-0 ml-2" />
            </button>

            {/* ALL DOCUMENTS */}
            <button
              onClick={() => {
                onClose();
                onNavigateDocuments();
              }}
              className="w-full p-4 rounded-2xl hover:bg-purple-50/60 border border-zinc-100 hover:border-purple-200 text-left transition-all group shadow-xs flex items-center justify-between"
            >
              <div className="flex items-start gap-3">
                <FileText className="h-5 w-5 text-purple-900 shrink-0 mt-0.5" />
                <div>
                  <p className="text-[17px] font-bold text-zinc-900 group-hover:text-purple-900 transition-colors">
                    All documents
                  </p>
                  <p className="text-sm text-zinc-500 font-medium">
                    View all 10 property documents
                  </p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-zinc-400 group-hover:text-purple-900 transition-colors shrink-0 ml-2" />
            </button>
          </div>

          {/* RIGHT COLUMN: ACCOUNT & PREFERENCES */}
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 block pb-1">
              Account &amp; Preferences
            </span>

            {/* LANGUAGE SELECTOR */}
            <div className="space-y-2">
              <button
                onClick={() => setShowLanguagePicker(!showLanguagePicker)}
                className="w-full p-3.5 rounded-2xl hover:bg-zinc-50 border border-zinc-100 text-left transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-purple-900 shrink-0" />
                  <div>
                    <p className="text-[16px] font-bold text-zinc-900 group-hover:text-purple-900 transition-colors">
                      Language
                    </p>
                    <p className="text-sm text-zinc-500 font-medium">
                      {language}
                    </p>
                  </div>
                </div>
                <ChevronRight className={`h-4 w-4 text-zinc-400 transition-transform ${showLanguagePicker ? "rotate-90" : ""}`} />
              </button>

              {showLanguagePicker && (
                <div className="p-2 bg-stone-50 rounded-xl border border-zinc-200 space-y-1">
                  {["English", "Hindi (हिंदी)", "Kannada (ಕನ್ನಡ)", "Bengali (বাংলা)"].map((langOption) => (
                    <button
                      key={langOption}
                      onClick={() => {
                        setLanguage(langOption.split(" ")[0]);
                        setShowLanguagePicker(false);
                      }}
                      className={`w-full py-2 px-3 text-xs font-bold rounded-lg flex items-center justify-between transition-colors ${
                        language === langOption.split(" ")[0]
                          ? "bg-purple-900 text-white"
                          : "text-zinc-800 hover:bg-zinc-200/60"
                      }`}
                    >
                      <span>{langOption}</span>
                      {language === langOption.split(" ")[0] && <Check className="h-3.5 w-3.5" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* NOTIFICATIONS */}
            <div className="p-3.5 rounded-2xl bg-stone-50/70 border border-zinc-100 space-y-2.5">
              <div className="flex items-center gap-3">
                <Bell className="h-5 w-5 text-purple-900 shrink-0" />
                <div>
                  <p className="text-[16px] font-bold text-zinc-900">
                    Notifications
                  </p>
                  <p className="text-xs text-zinc-500 font-medium">
                    Tell me when something needs my attention
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-5 pt-1 pl-8">
                <label className="flex items-center gap-2 text-sm font-semibold text-zinc-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifyWhatsApp}
                    onChange={(e) => setNotifyWhatsApp(e.target.checked)}
                    className="h-4 w-4 accent-purple-900 rounded cursor-pointer"
                  />
                  <span>WhatsApp</span>
                </label>

                <label className="flex items-center gap-2 text-sm font-semibold text-zinc-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifyEmail}
                    onChange={(e) => setNotifyEmail(e.target.checked)}
                    className="h-4 w-4 accent-purple-900 rounded cursor-pointer"
                  />
                  <span>Email</span>
                </label>
              </div>
            </div>

          </div>

        </div>

        {/* SUBTLE DIVIDER ACROSS THE BOTTOM */}
        <div className="border-t border-zinc-100 pt-4">
          {/* BOTTOM ROW: HORIZONTALLY ARRANGED */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-zinc-600 font-semibold">
            
            <button
              onClick={onClose}
              className="inline-flex items-center gap-1.5 hover:text-purple-900 transition-colors py-1.5 px-2 rounded-lg hover:bg-zinc-50"
            >
              <HelpCircle className="h-4 w-4 text-zinc-400" />
              <span>Get help</span>
            </button>

            <button
              onClick={onClose}
              className="inline-flex items-center gap-1.5 hover:text-purple-900 transition-colors py-1.5 px-2 rounded-lg hover:bg-zinc-50"
            >
              <ShieldCheck className="h-4 w-4 text-zinc-400" />
              <span>Privacy &amp; Security</span>
            </button>

            <button
              onClick={onClose}
              className="inline-flex items-center gap-1.5 hover:text-purple-900 transition-colors py-1.5 px-2 rounded-lg hover:bg-zinc-50"
            >
              <Info className="h-4 w-4 text-zinc-400" />
              <span>About Landeed Vault</span>
            </button>

            <button
              onClick={onClose}
              className="inline-flex items-center gap-1.5 text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors py-1.5 px-2 rounded-lg font-bold"
            >
              <LogOut className="h-4 w-4 text-red-500" />
              <span>Log out</span>
            </button>

          </div>
        </div>

      </DialogContent>
    </Dialog>
  );
}

