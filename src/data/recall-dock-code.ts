import source from "@/data/recall-dock-source.json";

export const RECALL_DOCK_SOURCE = source.source;

export const RECALL_DOCK_USAGE = `"use client";

import { useState } from "react";
import { RecallDock, type RecallItem } from "@/components/ui/recall-dock";

export function ArchiveExample() {
  const [archived, setArchived] = useState(false);
  const [items, setItems] = useState<RecallItem[]>([]);

  return (
    <div>
      <button
        type="button"
        disabled={archived}
        onClick={() => {
          setArchived(true);
          setItems([{ id: "archive", label: "Thread archived" }]);
        }}
      >
        {archived ? "Archived" : "Archive thread"}
      </button>

      <RecallDock
        items={items}
        onUndo={(id) => {
          if (id === "archive") setArchived(false);
          setItems((current) => current.filter((item) => item.id !== id));
        }}
        onDismiss={(id) => {
          setItems((current) => current.filter((item) => item.id !== id));
        }}
      />
    </div>
  );
}
`;
