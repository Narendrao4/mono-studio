import source from "@/data/component-sources.json";

export const SNAKE_TOAST_SOURCE = source["snake-toast.tsx"];

export const SNAKE_TOAST_USAGE = `"use client";

import { useState } from "react";
import { SnakeToast, type SnakeToastMessage } from "@/components/ui/snake-toast";

export function SaveNotification() {
  const [toast, setToast] = useState<SnakeToastMessage | null>(null);

  return (
    <>
      <button
        type="button"
        onClick={() => setToast({
          id: crypto.randomUUID(),
          title: "Your changes are saved",
          description: "Everything is right where you left it.",
          variant: "white", // white (default), black, red, green
        })}
      >
        Show notification
      </button>

      <SnakeToast
        toast={toast}
        duration={3000}
        onDismiss={(id) => {
          setToast((current) => current?.id === id ? null : current);
        }}
      />
    </>
  );
}
`;
