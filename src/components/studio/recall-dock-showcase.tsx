"use client";

import { useState } from "react";

import { RecallDock, type RecallItem } from "@/components/ui/recall-dock";

type ActionId = "archive" | "pin" | "mute";

const actions: Array<{
  id: ActionId;
  verb: string;
  done: string;
  receipt: RecallItem;
}> = [
  {
    id: "archive",
    verb: "Archive thread",
    done: "Thread archived",
    receipt: { id: "archive", label: "Thread archived", detail: "Project update moved out of Inbox" },
  },
  {
    id: "pin",
    verb: "Pin project",
    done: "Project pinned",
    receipt: { id: "pin", label: "Project pinned", detail: "Atlas now appears in shortcuts" },
  },
  {
    id: "mute",
    verb: "Mute alerts",
    done: "Alerts muted",
    receipt: { id: "mute", label: "Alerts muted", detail: "Atlas notifications are paused" },
  },
];

const initialItems = [actions[0].receipt];

export function RecallDockInteractivePreview() {
  const [items, setItems] = useState<RecallItem[]>(initialItems);
  const [done, setDone] = useState<ActionId[]>(["archive"]);
  const [announcement, setAnnouncement] = useState("Thread archived. Undo is available in the dock.");

  function performAction(id: ActionId) {
    const action = actions.find((entry) => entry.id === id);
    if (!action || done.includes(id)) return;

    setDone((current) => [...current, id]);
    setItems((current) => [...current.filter((item) => item.id !== id), action.receipt]);
    setAnnouncement(`${action.done}. Undo is available in the dock.`);
  }

  function undoAction(id: string) {
    const action = actions.find((entry) => entry.id === id);
    if (!action) return;

    setDone((current) => current.filter((entry) => entry !== id));
    setItems((current) => current.filter((item) => item.id !== id));
    setAnnouncement(`${action.done} undone.`);
  }

  return (
    <div className="grid w-full max-w-4xl gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(300px,390px)]">
      <div className="space-y-4">
        <div className="border border-border bg-card p-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
            Sample workspace / Atlas
          </p>
          <h3 className="studio-heading mt-2 text-xl">Three changes, one place to rewind.</h3>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Perform a few actions, open the trail, then undo any one of them.
          </p>
          <div className="mt-5 grid gap-2">
            {actions.map((action) => {
              const isDone = done.includes(action.id);
              return (
                <button
                  key={action.id}
                  type="button"
                  disabled={isDone}
                  onClick={() => performAction(action.id)}
                  className="flex min-h-11 items-center justify-between border border-border bg-background px-3 text-left text-sm transition-colors hover:border-foreground hover:bg-muted disabled:cursor-default disabled:bg-muted disabled:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
                >
                  <span>{isDone ? action.done : action.verb}</span>
                  <span aria-hidden="true" className="font-mono text-xs">
                    {isDone ? "✓" : "↗"}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            setDone([]);
            setItems([]);
            setAnnouncement("Demo reset.");
          }}
          className="text-xs font-medium underline underline-offset-4 hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
        >
          Reset demo
        </button>
      </div>

      <div className="flex min-h-64 items-start justify-center border border-dashed border-border bg-muted/50 p-4 sm:p-6">
        {items.length > 0 ? (
          <RecallDock
            items={items}
            onUndo={undoAction}
            onDismiss={(id) => setItems((current) => current.filter((item) => item.id !== id))}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-center font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
            Perform an action to create a receipt
          </div>
        )}
      </div>
      <p role="status" className="sr-only">{announcement}</p>
    </div>
  );
}

export function RecallDockCatalogPreview() {
  const [items, setItems] = useState<RecallItem[]>([
    { id: "save", label: "Draft saved", detail: "Your changes can be restored" },
  ]);

  return (
    <div className="w-full max-w-[330px] space-y-3">
      <RecallDock
        items={items}
        onUndo={(id) => setItems((current) => current.filter((item) => item.id !== id))}
        onDismiss={(id) => setItems((current) => current.filter((item) => item.id !== id))}
      />
      {items.length === 0 && (
        <button
          type="button"
          onClick={() => setItems([{ id: "save", label: "Draft saved", detail: "Your changes can be restored" }])}
          className="border border-foreground bg-foreground px-3 py-2 text-xs font-medium text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2"
        >
          Save draft again
        </button>
      )}
    </div>
  );
}

export function RecallDockVariants() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="studio-card space-y-2 p-5">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">01 / Per-item undo</p>
        <h3 className="studio-heading text-lg">Reverse just one action</h3>
        <p className="text-sm leading-6 text-muted-foreground">
          Receipts carry stable IDs so each Undo button can reverse its own change, even after newer changes arrive.
        </p>
      </div>
      <div className="studio-card space-y-2 p-5">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">02 / Host-owned history</p>
        <h3 className="studio-heading text-lg">Choose when to clear</h3>
        <p className="text-sm leading-6 text-muted-foreground">
          The host controls receipts and their lifetime. Keep them for a session, or dismiss them when your app decides.
        </p>
      </div>
    </div>
  );
}
