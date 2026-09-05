"use client";

import React, { useState } from "react";
import { VaultHeader } from "@/components/vault-header";
import { PrototypeSwitcher, PrototypeTab } from "@/components/prototype-switcher";
import { MainVaultView } from "@/components/main-vault-view";
import { EmptyStateView } from "@/components/empty-state-view";
import { ReturningUserView } from "@/components/returning-user-view";
import { FailureStateView } from "@/components/failure-state-view";
import { PropertyDetailModal } from "@/components/property-detail-modal";
import { DocumentViewerModal } from "@/components/document-viewer-modal";
import { ProfilePanelModal } from "@/components/profile-panel-modal";
import { AllDocumentsModal } from "@/components/all-documents-modal";
import { VaultSearchModal } from "@/components/vault-search-modal";
import { AddDocumentModal } from "@/components/add-document-modal";
import { StrategyRationaleView } from "@/components/strategy-rationale-view";
import { PROPERTIES_DATA, Property, PropertyDoc } from "@/lib/vault-data";

export default function Page() {
  const [activeTab, setActiveTab] = useState<PrototypeTab>("vault");
  const [properties, setProperties] = useState<Property[]>(PROPERTIES_DATA);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [viewingDoc, setViewingDoc] = useState<{ doc: PropertyDoc; propTitle: string } | null>(null);

  // Modals state
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isAllDocsOpen, setIsAllDocsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAddDocOpen, setIsAddDocOpen] = useState(false);

  const handleResolveIssue = (propertyId: string) => {
    setProperties((prev) =>
      prev.map((p) => {
        if (p.id === propertyId) {
          return {
            ...p,
            status: "LOOKS_GOOD",
            statusText: "Everything looks good",
            issue: undefined,
            checks: p.checks.map((c) =>
              c.id === "c2"
                ? {
                    ...c,
                    status: "GOOD",
                    summary: "Land charge of ₹4,850 paid & record updated.",
                  }
                : c
            ),
            documents: [
              {
                id: `d-rmc-${Date.now()}`,
                name: "RMC Municipal Tax Receipt FY25-26",
                type: "Municipal Tax Receipt",
                issuedBy: "Ranchi Municipal Corporation",
                issueDate: "Today",
                documentNumber: `RMC/JH/2026/${Math.floor(1000 + Math.random() * 9000)}`,
              },
              ...p.documents,
            ],
          };
        }
        return p;
      })
    );
  };

  const handleAddDocumentSuccess = (propertyId: string, newDoc: PropertyDoc) => {
    setProperties((prev) =>
      prev.map((p) => {
        if (p.id === propertyId) {
          return {
            ...p,
            documents: [newDoc, ...p.documents],
          };
        }
        return p;
      })
    );
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-zinc-900 font-sans pb-24 selection:bg-purple-900 selection:text-white">
      
      {/* Navigation Header */}
      <VaultHeader
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenDocuments={() => setIsAllDocsOpen(true)}
        onOpenAddDocument={() => setIsAddDocOpen(true)}
      />

      {/* Main Content Area */}
      <main className="mx-auto max-w-4xl px-4 sm:px-6 pt-6 sm:pt-8">
        
        {activeTab === "vault" && (
          <MainVaultView
            properties={properties}
            onSelectProperty={(prop) => setSelectedProperty(prop)}
            onViewDoc={(doc, title) => setViewingDoc({ doc, propTitle: title })}
            onOpenSearch={() => setIsSearchOpen(true)}
            onOpenAddDocument={() => setIsAddDocOpen(true)}
          />
        )}

        {activeTab === "returning" && (
          <ReturningUserView
            properties={properties}
            onSelectProperty={(prop) => setSelectedProperty(prop)}
            onViewDoc={(doc, title) => setViewingDoc({ doc, propTitle: title })}
            onOpenSearch={() => setIsSearchOpen(true)}
            onOpenAddDocument={() => setIsAddDocOpen(true)}
          />
        )}

        {activeTab === "empty" && (
          <EmptyStateView
            onAddProperty={() => {
              setActiveTab("vault");
            }}
            onAddDocument={() => setIsAddDocOpen(true)}
          />
        )}

        {activeTab === "failure" && (
          <FailureStateView
            onRetry={() => {
              setActiveTab("vault");
            }}
          />
        )}

        {activeTab === "rationale" && (
          <StrategyRationaleView onBackToVault={() => setActiveTab("vault")} />
        )}

      </main>

      {/* Floating Unobtrusive Prototype Switcher Widget */}
      <PrototypeSwitcher activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* MODALS */}
      
      {/* 1. Property & Issue Detail Modal */}
      {selectedProperty && (
        <PropertyDetailModal
          isOpen={!!selectedProperty}
          onClose={() => setSelectedProperty(null)}
          property={selectedProperty}
          onResolveIssue={handleResolveIssue}
          onViewDoc={(doc, title) => setViewingDoc({ doc, propTitle: title })}
        />
      )}

      {/* 2. Document Viewer Modal */}
      <DocumentViewerModal
        isOpen={!!viewingDoc}
        onClose={() => setViewingDoc(null)}
        document={viewingDoc?.doc || null}
        propertyTitle={viewingDoc?.propTitle || ""}
      />

      {/* 3. Landeed Profile Panel Modal */}
      <ProfilePanelModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        onNavigateProperties={() => setActiveTab("vault")}
        onNavigateDocuments={() => setIsAllDocsOpen(true)}
      />

      {/* 4. All Documents Access Modal */}
      <AllDocumentsModal
        isOpen={isAllDocsOpen}
        onClose={() => setIsAllDocsOpen(false)}
        onSelectDoc={(doc, title) => setViewingDoc({ doc, propTitle: title })}
        properties={properties}
      />

      {/* 5. Natural Language Vault Search Modal */}
      <VaultSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectDoc={(doc, title) => setViewingDoc({ doc, propTitle: title })}
        onSelectProperty={(prop) => setSelectedProperty(prop)}
        onOpenAllDocs={() => setIsAllDocsOpen(true)}
      />

      {/* 6. Document Upload & Auto-Recognition Flow Modal */}
      <AddDocumentModal
        isOpen={isAddDocOpen}
        onClose={() => setIsAddDocOpen(false)}
        properties={properties}
        onAddDocumentSuccess={handleAddDocumentSuccess}
        onViewDoc={(doc, title) => setViewingDoc({ doc, propTitle: title })}
      />

    </div>
  );
}
