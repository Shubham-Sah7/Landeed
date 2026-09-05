"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Property } from "@/lib/vault-data";
import { Server, CheckCircle, Clock } from "lucide-react";

interface FailureStateDialogProps {
  isOpen: boolean;
  onClose: () => void;
  property: Property;
}

export function FailureStateDialog({
  isOpen,
  onClose,
  property,
}: FailureStateDialogProps) {
  const [dispatched, setDispatched] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-white text-zinc-900 border-zinc-300 p-6 rounded-lg shadow-lg">
        
        <DialogHeader className="border-b border-zinc-200 pb-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded bg-zinc-100 text-zinc-800 border border-zinc-300 px-2 py-0.5 text-xs font-medium">
              <Server className="h-3.5 w-3.5 text-zinc-600" />
              Portal Offline
            </span>
          </div>
          <DialogTitle className="text-lg font-semibold text-zinc-900 pt-2">
            Bihar Bhumi Portal Unreachable
          </DialogTitle>
          <DialogDescription className="text-xs text-zinc-500">
            Property: <strong>{property.title}</strong> ({property.location})
          </DialogDescription>
        </DialogHeader>

        {!dispatched ? (
          <div className="space-y-4 py-2 text-xs">
            <div className="bg-zinc-50 p-3 rounded border border-zinc-200 space-y-1">
              <span className="font-semibold text-zinc-900">What happened?</span>
              <p className="text-zinc-600 leading-relaxed">
                The Bihar Bhumi Jankari state portal timed out during Landeed&apos;s 6:00 AM check. Sub-registrar servers in Patna Circle 3 are down for maintenance.
              </p>
            </div>

            <div className="bg-emerald-50/50 p-3 rounded border border-emerald-200 text-emerald-900 space-y-1">
              <span className="font-semibold">Are your title records safe?</span>
              <p className="text-emerald-800 leading-relaxed">
                <strong>Yes.</strong> Your cached title records and Encumbrance status remain 100% valid. This is server maintenance, not a title issue.
              </p>
            </div>

            <div className="pt-2 border-t border-zinc-200 flex items-center justify-end gap-2">
              <button
                onClick={onClose}
                className="rounded border border-zinc-300 px-3 py-1.5 text-zinc-700 hover:bg-zinc-100 font-medium"
              >
                Wait for 6:00 PM Auto-Retry
              </button>
              <button
                onClick={() => setDispatched(true)}
                className="rounded bg-zinc-900 hover:bg-zinc-800 text-white font-medium px-3 py-1.5 transition-colors"
              >
                Dispatch Patna Advocate (₹999)
              </button>
            </div>
          </div>
        ) : (
          <div className="py-6 text-center space-y-3">
            <div className="h-10 w-10 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center mx-auto">
              <CheckCircle className="h-5 w-5" />
            </div>
            <h3 className="text-base font-semibold text-zinc-900">
              Patna Advocate Assigned
            </h3>
            <p className="text-xs text-zinc-600 max-w-xs mx-auto">
              Senior Advocate Ramesh Kumar will inspect Patna Sub-Registrar records physically by 4:00 PM.
            </p>
            <button
              onClick={onClose}
              className="rounded bg-zinc-900 text-white text-xs font-medium px-4 py-2"
            >
              Close
            </button>
          </div>
        )}

      </DialogContent>
    </Dialog>
  );
}
