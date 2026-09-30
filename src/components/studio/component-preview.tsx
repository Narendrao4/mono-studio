"use client";

import { useState } from "react";

import { CodeViewer } from "@/components/studio/code-viewer";
import { cn } from "@/lib/utils";

type PreviewTab = "preview" | "code";

type ComponentPreviewProps = {
  preview: React.ReactNode;
  code: string;
  fileName: string;
};

const tabs: Array<{ id: PreviewTab; label: string }> = [
  { id: "preview", label: "Preview" },
  { id: "code", label: "Code" },
];

export function ComponentPreview({ preview, code, fileName }: ComponentPreviewProps) {
  const [activeTab, setActiveTab] = useState<PreviewTab>("preview");

  return (
    <section className="studio-card">
      <div className="border-b border-border px-3 py-2">
        <div className="inline-flex border border-border p-0.5">
          {tabs.map((tab) => {
            const selected = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "h-8 px-3 text-xs font-medium transition-colors",
                  selected
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
                aria-pressed={selected}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {activeTab === "preview" ? (
        <div className="flex min-h-72 items-center justify-center p-6 sm:p-10">{preview}</div>
      ) : (
        <CodeViewer code={code} fileName={fileName} />
      )}
    </section>
  );
}
