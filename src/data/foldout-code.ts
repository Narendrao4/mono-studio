import source from "@/data/component-sources.json";

export const FOLDOUT_SOURCE = source["foldout.tsx"];

export const FOLDOUT_USAGE = `"use client";

import { useState } from "react";
import { Foldout, type FoldoutItem } from "@/components/ui/foldout";

// Save foldout.module.css beside foldout.tsx.
export function ProjectDetails() {
  const [open, setOpen] = useState<string[]>(["about"]);
  const [notifications, setNotifications] = useState(true);

  const items: FoldoutItem[] = [
    {
      id: "about",
      title: "About this project",
      description: "A little context, close at hand.",
      badge: "Overview",
      content: <p>Your project description, links, or custom components.</p>,
    },
    {
      id: "preferences",
      title: "Your preferences",
      content: (
        <label>
          <input
            type="checkbox"
            checked={notifications}
            onChange={(event) => setNotifications(event.target.checked)}
          />
          Enable project notifications
        </label>
      ),
    },
    {
      id: "archive",
      title: "Archive settings",
      disabled: true,
      content: <p>Available after the project is published.</p>,
    },
  ];

  return (
    <Foldout
      items={items}
      label="Project details"
      type="single"
      value={open}
      onValueChange={setOpen}
      headingLevel={3}
    />
  );
}

// For independent sheets: type="multiple".
// For internal state, omit value/onValueChange and set defaultValue={["about"]}.
// variant="inverse" and size="compact" offer a different surface and spacing.
// The content stays mounted: closing a sheet preserves local form state.
`;
