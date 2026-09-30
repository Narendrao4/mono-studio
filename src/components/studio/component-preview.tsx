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
    <section className="border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950">
      <div className="border-b border-neutral-200 px-3 py-2 dark:border-neutral-800">
        <div className="inline-flex border border-neutral-200 p-0.5 dark:border-neutral-800">
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
                    ? "bg-neutral-950 text-white dark:bg-neutral-100 dark:text-neutral-950"
                    : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-900 dark:hover:text-neutral-200",
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
