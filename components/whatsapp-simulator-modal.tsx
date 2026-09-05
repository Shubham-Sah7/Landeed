"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, ShieldCheck, CheckCheck, ArrowRight, ExternalLink } from "lucide-react";

interface WhatsAppSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onResolveTrigger: () => void;
}

export function WhatsAppSimulatorModal({
  isOpen,
  onClose,
  onResolveTrigger,
}: WhatsAppSimulatorModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-[#0F1E19] text-white border-emerald-900/50 p-0 overflow-hidden rounded-2xl shadow-2xl">
        
        <DialogHeader className="sr-only">
          <DialogTitle>WhatsApp Sentinel Digest Simulator</DialogTitle>
          <DialogDescription>
            Simulated WhatsApp digest notification sent to multi-property owner
          </DialogDescription>
        </DialogHeader>

        {/* WhatsApp Top Header Bar */}
        <div className="bg-[#1F2C24] p-4 border-b border-emerald-900/40 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 text-white font-bold text-sm">
            LV
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-1.5">
              <h3 className="font-bold text-sm text-white">
                Landeed Vault Sentinel
              </h3>
              <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 text-[9px] py-0 px-1">
                Verified Business
              </Badge>
            </div>
            <p className="text-[11px] text-emerald-400">
              Active Protection • Official Notifications
            </p>
          </div>
        </div>

        {/* WhatsApp Chat Body */}
        <div className="p-4 space-y-4 bg-[#0B1412] min-h-[380px] max-h-[500px] overflow-y-auto font-sans text-xs">
          
          {/* Timestamp Pill */}
          <div className="text-center">
            <span className="bg-[#18221D] text-emerald-400/80 px-3 py-1 rounded-full text-[10px] font-mono">
              TODAY 6:16 AM
            </span>
          </div>

          {/* Incoming Message 1: Sentinel Digest */}
          <div className="flex flex-col gap-1 max-w-[88%] self-start bg-[#1F2C24] p-3.5 rounded-2xl rounded-tl-none border border-emerald-900/30 shadow-md">
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-[11px] mb-1">
              <ShieldCheck className="h-4 w-4" />
              <span>Daily Property Health Reassurance Digest</span>
            </div>

            <p className="text-slate-200 leading-relaxed">
              Namaste <strong>Rajeshji</strong>, here is your Landeed Vault Sentinel update for today:
            </p>

            <div className="my-2 p-2.5 rounded-lg bg-[#14201A] border border-emerald-900/40 space-y-1.5 text-[11px]">
              <div className="text-emerald-300">
                ✅ <strong>Indiranagar Flat (Blr):</strong> Kaveri EC clean, tax paid.
              </div>
              <div className="text-amber-300">
                ⚠️ <strong>Kanke Road Plot (Ranchi):</strong> RMC Municipal Cess discrepancy of ₹4,850 detected.
              </div>
              <div className="text-emerald-300">
                ✅ <strong>New Town Plot (Kolkata):</strong> WBHIDCO mutation in progress.
              </div>
              <div className="text-red-300">
                ℹ️ <strong>Kankarbagh House (Patna):</strong> Sub-registrar server offline (retry 6 PM).
              </div>
            </div>

            <p className="text-slate-300 text-[11px]">
              Tap below to view full human breakdown & clear Ranchi municipal cess in 1 tap:
            </p>

            <div className="mt-2 pt-2 border-t border-emerald-900/40">
              <button
                onClick={() => {
                  onClose();
                  onResolveTrigger();
                }}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 rounded-lg text-center text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Fix Ranchi Cess on Landeed (₹4,850)</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="flex items-center justify-end gap-1 text-[10px] text-emerald-400/60 mt-1">
              <span>6:16 AM</span>
              <CheckCheck className="h-3 w-3 text-emerald-400" />
            </div>
          </div>

          {/* Info Banner */}
          <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-900/50 text-[11px] text-emerald-200 text-center">
            💡 <strong>Why WhatsApp?</strong> Multi-property owners aged 50+ check WhatsApp 12+ times a day. Vault Sentinel delivers peace of mind directly where they already live.
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-[#1F2C24] border-t border-emerald-900/40 flex justify-end">
          <Button size="sm" variant="ghost" onClick={onClose} className="text-emerald-300 hover:text-white text-xs">
            Close WhatsApp Simulator
          </Button>
        </div>

      </DialogContent>
    </Dialog>
  );
}
