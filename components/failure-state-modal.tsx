"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Server,
  AlertOctagon,
  RefreshCw,
  UserCheck,
  CheckCircle2,
  Clock,
  MapPin,
  Building,
  ShieldAlert,
} from "lucide-react";
import { Property } from "@/lib/vault-data";

interface FailureStateModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: Property;
}

export function FailureStateModal({
  isOpen,
  onClose,
  property,
}: FailureStateModalProps) {
  const [dispatched, setDispatched] = useState(false);

  const handleDispatchAgent = () => {
    setDispatched(true);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-xl bg-white dark:bg-slate-950 text-slate-900 dark:text-white border-slate-200 dark:border-slate-800 p-0 overflow-hidden rounded-2xl shadow-2xl">
        
        <DialogHeader className="sr-only">
          <DialogTitle>State Registry Server Unreachable</DialogTitle>
          <DialogDescription>
            Handling government land registry downtime for {property.title}
          </DialogDescription>
        </DialogHeader>

        {/* Top Danger/Warning Bar */}
        <div className="bg-red-950 text-white p-5 border-b border-red-900/50">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-900/60 text-red-300 border border-red-700/50">
              <Server className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base">
                  State Registry Server Unreachable
                </h3>
                <Badge className="bg-red-800 text-red-100 text-[10px]">
                  HTTP 504 TIMEOUT
                </Badge>
              </div>
              <p className="text-xs text-red-200 mt-0.5">
                {property.title} • {property.location}
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          
          {!dispatched ? (
            <>
              {/* Plain English Explanation */}
              <div className="space-y-3">
                <div className="rounded-xl bg-slate-50 dark:bg-slate-900 p-4 border border-slate-200 dark:border-slate-800">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    What Happened?
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
                    The <strong>Bihar Bhumi Jankari</strong> government portal failed to respond during Landeed&apos;s scheduled 6:00 AM automated audit. Sub-registrar servers in Patna Circle 3 are currently down for scheduled database maintenance.
                  </p>
                </div>

                <div className="rounded-xl bg-amber-50/60 dark:bg-amber-950/30 p-4 border border-amber-200/80 dark:border-amber-900/50 text-xs space-y-1">
                  <span className="font-bold text-amber-900 dark:text-amber-300">
                    Is your Patna property safe?
                  </span>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    <strong>Yes.</strong> Your cached title records remain valid. This failure is strictly due to government portal server downtime, not a title issue.
                  </p>
                </div>
              </div>

              {/* Recommended Resolution Paths */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Select Resolution Path
                </h4>

                {/* Option A: Auto Retry */}
                <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-4 bg-white dark:bg-slate-900 flex items-start gap-3">
                  <Clock className="h-5 w-5 text-indigo-500 shrink-0 mt-0.5" />
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 dark:text-white">
                        Path A: Automated Sentinel Retry (Free)
                      </span>
                      <Badge variant="outline" className="text-[10px]">RECOMMENDED</Badge>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400">
                      Landeed will re-query the Bihar registry automatically at 6:00 PM today when portal maintenance finishes.
                    </p>
                  </div>
                </div>

                {/* Option B: Dispatch Advocate */}
                <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-4 bg-white dark:bg-slate-900 flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <UserCheck className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div className="space-y-1 text-xs">
                      <span className="font-bold text-slate-900 dark:text-white">
                        Path B: Dispatch Patna Field Advocate (₹999)
                      </span>
                      <p className="text-slate-600 dark:text-slate-400">
                        Send a verified Landeed agent directly to Patna Sub-Registrar Sadar Office for physical certified copy extraction.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onClose}
                  className="w-full sm:w-auto text-xs h-10"
                >
                  Wait for 6:00 PM Auto-Retry
                </Button>
                <Button
                  size="sm"
                  onClick={handleDispatchAgent}
                  className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-200 text-white dark:text-slate-900 font-bold text-xs h-10 gap-1.5"
                >
                  <UserCheck className="h-4 w-4" />
                  Dispatch Patna Agent (₹999)
                </Button>
              </div>
            </>
          ) : (
            /* Dispatched Confirmation View */
            <div className="text-center py-6 space-y-4">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300">
                <CheckCircle2 className="h-8 w-8" />
              </div>

              <div className="space-y-1">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Patna Field Advocate Dispatched
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Senior Advocate Ramesh Kumar (Patna Sadar Circle) has been assigned. Physical registry inspection report will be updated in Vault by 4:00 PM.
                </p>
              </div>

              <Button size="sm" onClick={onClose} className="text-xs px-6">
                Back to Sentinel Desk
              </Button>
            </div>
          )}

        </div>

      </DialogContent>
    </Dialog>
  );
}
