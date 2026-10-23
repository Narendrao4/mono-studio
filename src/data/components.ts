import { SIGNAL_BUTTON_SOURCE, SIGNAL_BUTTON_USAGE } from "@/data/signal-button-code";
import {
  PHASE_WEAVE_TOGGLE_SOURCE,
  PHASE_WEAVE_TOGGLE_USAGE,
} from "@/data/phase-weave-toggle-code";
import {
  FRACTURE_STACK_SWITCH_SOURCE,
  FRACTURE_STACK_SWITCH_USAGE,
} from "@/data/fracture-stack-switch-code";
import {
  STARFALL_SWITCH_SOURCE,
  STARFALL_SWITCH_USAGE,
} from "@/data/starfall-switch-code";
import { RECALL_DOCK_SOURCE, RECALL_DOCK_USAGE } from "@/data/recall-dock-code";
import { SNAKE_TOAST_SOURCE, SNAKE_TOAST_USAGE } from "@/data/snake-toast-code";
import componentSources from "@/data/component-sources.json";

export type RegistryStatus = "ready" | "experimental";

export type ComponentRegistryItem = {
  slug: string;
  name: string;
  description: string;
  status: RegistryStatus;
};

export type ComponentPropDoc = {
  name: string;
  type: string;
  defaultValue: string;
  description: string;
};

export type ComponentDoc = ComponentRegistryItem & {
  sourceFile: string;
  sourceCode: string;
  usageCode: string;
  props: ComponentPropDoc[];
  useCases: string[];
  guidelines: string[];
  stateGuidance: string;
};

export const componentRegistry: ComponentRegistryItem[] = [
  {
    slug: "signal-button",
    name: "Signal Button",
    description:
      "A state-aware action button with a compact signal lane for idle, processing, success, and error transitions.",
    status: "ready",
  },
  {
    slug: "phase-weave-toggle",
    name: "Phase Weave Toggle",
    description:
      "A multi-lane mode selector with a moving weave carrier for fast state switching and dense status readouts.",
    status: "ready",
  },
  {
    slug: "fracture-stack-switch",
    name: "Fracture Stack Switch",
    description:
      "A stacked route selector with offset lane geometry for rapid mode transitions and compressed metadata.",
    status: "ready",
  },
  {
    slug: "starfall-switch",
    name: "Starfall Switch",
    description:
      "A toggle that releases stars downward on enable and inhales the fallen stars back on disable.",
    status: "ready",
  },
  {
    slug: "recall-dock",
    name: "Recall Dock",
    description:
      "A compact action receipt trail that keeps individual changes visible and reversible across a page or app.",
    status: "ready",
  },
  {
    slug: "snake-toast",
    name: "Snake Toast",
    description:
      "A toast that slithers into the bottom-right corner, traces its edge, and disappears after three seconds. Available in white, black, red, and green.",
    status: "ready",
  },
];

const componentDocs: Record<string, ComponentDoc> = {
  "signal-button": {
    ...componentRegistry[0],
    useCases: ["Save and publish actions", "Async form submissions", "Sync and deployment controls"],
    guidelines: [
      "Use a clear action label such as Save or Publish; supply status labels when the wording changes.",
      "Set processing while the real request runs, then success or error after it settles.",
      "Keep disableWhileProcessing enabled to prevent duplicate requests.",
    ],
    stateGuidance: "Own the status in your application. The button reports the status you pass; it does not run or track requests itself.",
    sourceFile: "signal-button.tsx",
    sourceCode: SIGNAL_BUTTON_SOURCE,
    usageCode: SIGNAL_BUTTON_USAGE,
    props: [
      {
        name: "children",
        type: "ReactNode",
        defaultValue: "required",
        description: "Base action label shown in the idle state.",
      },
      {
        name: "status",
        type: '"idle" | "processing" | "success" | "error"',
        defaultValue: '"idle"',
        description: "Controls visual state and status behavior.",
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg"',
        defaultValue: '"md"',
        description: "Applies sizing tokens for height, spacing, and glyph scale.",
      },
      {
        name: "labels",
        type: "Partial<Record<SignalButtonStatus, ReactNode>>",
        defaultValue: "undefined",
        description: "Optional status-specific labels for custom action language.",
      },
      {
        name: "disableWhileProcessing",
        type: "boolean",
        defaultValue: "true",
        description:
          "Prevents repeated actions while processing when enabled.",
      },
      {
        name: "disabled",
        type: "boolean",
        defaultValue: "false",
        description: "Disables interaction regardless of status.",
      },
      {
        name: "onClick",
        type: "MouseEventHandler<HTMLButtonElement>",
        defaultValue: "undefined",
        description: "Callback fired when the action is pressed.",
      },
    ],
  },
  "phase-weave-toggle": {
    ...componentRegistry[1],
    useCases: ["Workspace modes", "View selectors", "Compact preference groups"],
    guidelines: [
      "Give every option a unique value and a short, meaningful label.",
      "Use value with onValueChange for application state, or defaultValue for an uncontrolled field.",
      "Provide an aria-label describing the group; keyboard users can change options with arrows, Home, and End.",
    ],
    stateGuidance: "Store the selected value in the parent when it changes the rest of your app. Keep it equal to one of the option values.",
    sourceFile: "phase-weave-toggle.tsx",
    sourceCode: PHASE_WEAVE_TOGGLE_SOURCE,
    usageCode: PHASE_WEAVE_TOGGLE_USAGE,
    props: [
      {
        name: "options",
        type: "Array<{ value: string; label: string; pulse?: string }>",
        defaultValue: "required",
        description: "Defines each selectable lane with visible label and optional pulse text.",
      },
      {
        name: "value",
        type: "string",
        defaultValue: "undefined",
        description: "Controlled selected option value.",
      },
      {
        name: "defaultValue",
        type: "string",
        defaultValue: "first option",
        description: "Initial value when used as an uncontrolled component.",
      },
      {
        name: "onValueChange",
        type: "(nextValue: string) => void",
        defaultValue: "undefined",
        description: "Called whenever selection changes through pointer or keyboard.",
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg"',
        defaultValue: '"md"',
        description: "Adjusts lane height and typography scale.",
      },
      {
        name: "disabled",
        type: "boolean",
        defaultValue: "false",
        description: "Locks interactions while preserving visual readout.",
      },
      {
        name: "aria-label",
        type: "string",
        defaultValue: '"Phase weave mode"',
        description: "Accessible group label for screen readers.",
      },
    ],
  },
  "fracture-stack-switch": {
    ...componentRegistry[2],
    useCases: ["Route and workflow modes", "Plan or tier selection", "Vertical option lists"],
    guidelines: [
      "Use stable unique values for items; keep labels short and metadata optional.",
      "Treat the rows as a single selection group, with one selected item at a time.",
      "Provide a group aria-label and enough width for labels and metadata to stay readable.",
    ],
    stateGuidance: "Control the selected value with value and onValueChange, or set defaultValue once for an uncontrolled instance.",
    sourceFile: "fracture-stack-switch.tsx",
    sourceCode: FRACTURE_STACK_SWITCH_SOURCE,
    usageCode: FRACTURE_STACK_SWITCH_USAGE,
    props: [
      {
        name: "items",
        type: "Array<{ value: string; label: string; meta?: string }>",
        defaultValue: "required",
        description: "Defines selectable stack rows with optional metadata text.",
      },
      {
        name: "value",
        type: "string",
        defaultValue: "undefined",
        description: "Controlled selected item value.",
      },
      {
        name: "defaultValue",
        type: "string",
        defaultValue: "first item",
        description: "Initial selected value for uncontrolled mode.",
      },
      {
        name: "onValueChange",
        type: "(nextValue: string) => void",
        defaultValue: "undefined",
        description: "Fired when selection changes via click or keyboard navigation.",
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg"',
        defaultValue: '"md"',
        description: "Controls row height and typography scale.",
      },
      {
        name: "disabled",
        type: "boolean",
        defaultValue: "false",
        description: "Disables interaction while preserving selected visual state.",
      },
      {
        name: "aria-label",
        type: "string",
        defaultValue: '"Fracture stack selection"',
        description: "Accessible label for the radio-group container.",
      },
    ],
  },
  "starfall-switch": {
    ...componentRegistry[3],
    useCases: ["Feature preferences", "Notification settings", "On and off controls"],
    guidelines: [
      "Provide a descriptive aria-label such as Enable notifications.",
      "Keep the area around the switch clear so the falling stars remain visible.",
      "Include the starfall keyframes and reduced motion rules when copying the component into another app.",
    ],
    stateGuidance: "Use checked and onCheckedChange for saved preferences. Persist the new boolean in your own storage or API.",
    sourceFile: "starfall-switch.tsx",
    sourceCode: STARFALL_SWITCH_SOURCE,
    usageCode: STARFALL_SWITCH_USAGE,
    props: [
      {
        name: "checked",
        type: "boolean",
        defaultValue: "undefined",
        description: "Controlled checked state for the switch.",
      },
      {
        name: "defaultChecked",
        type: "boolean",
        defaultValue: "false",
        description: "Initial checked state when uncontrolled.",
      },
      {
        name: "onCheckedChange",
        type: "(checked: boolean) => void",
        defaultValue: "undefined",
        description: "Callback fired whenever toggle state changes.",
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg"',
        defaultValue: '"md"',
        description: "Controls switch dimensions and star burst density.",
      },
      {
        name: "disabled",
        type: "boolean",
        defaultValue: "false",
        description: "Disables interactions and prevents star animations.",
      },
      {
        name: "aria-label",
        type: "string",
        defaultValue: "undefined",
        description: "Accessible name announced for the switch control.",
      },
    ],
  },
  "recall-dock": {
    ...componentRegistry[4],
    useCases: ["Undoable archive or move actions", "Recent workspace changes", "Session action history"],
    guidelines: [
      "Append receipts in chronological order with stable unique IDs; the dock displays the newest first.",
      "Offer Undo only for actions your application can actually reverse.",
      "Undo should reverse the change and remove its receipt. Dismiss should remove only the receipt.",
    ],
    stateGuidance: "The parent owns the receipts, undo operations, and history lifetime. An empty list hides the dock.",
    sourceFile: "recall-dock.tsx",
    sourceCode: RECALL_DOCK_SOURCE,
    usageCode: RECALL_DOCK_USAGE,
    props: [
      {
        name: "items",
        type: "RecallItem[]",
        defaultValue: "required",
        description: "Ordered action receipts. The newest item appears first in the dock.",
      },
      {
        name: "onUndo",
        type: "(id: string) => void",
        defaultValue: "required",
        description: "Reverse the matching action in your app and remove its receipt.",
      },
      {
        name: "onDismiss",
        type: "(id: string) => void",
        defaultValue: "required",
        description: "Remove a receipt without reversing the action.",
      },
      {
        name: "className",
        type: "string",
        defaultValue: "undefined",
        description: "Additional classes for placement or sizing.",
      },
      {
        name: "aria-label",
        type: "string",
        defaultValue: '"Recent actions"',
        description: "Accessible name for the receipt region.",
      },
    ],
  },
  "snake-toast": {
    ...componentRegistry[5],
    useCases: ["Save and sync confirmations", "Upload feedback", "Brief application notices"],
    guidelines: [
      "Mount one toast host in your application and pass a fresh message ID for each notification.",
      "Keep the message brief. The default three-second lifetime includes both entry and exit animations.",
      "Use white for the default, black for an alternative, red for errors, and green for success. Explain the result in text as well as color.",
      "Use duration={0} for messages people need more time to read. The close button and Escape still dismiss them.",
    ],
    stateGuidance: "Store one SnakeToastMessage or null in the parent. Clear only the matching ID in onDismiss so an older message cannot clear a newer one.",
    sourceFile: "snake-toast.tsx",
    sourceCode: SNAKE_TOAST_SOURCE,
    usageCode: SNAKE_TOAST_USAGE,
    props: [
      {
        name: "toast",
        type: "SnakeToastMessage | null",
        defaultValue: "required",
        description: "Message with a unique id, title, optional description and variant. Pass null to hide; use a new id to replay.",
      },
      {
        name: "toast.variant",
        type: '"white" | "black" | "red" | "green"',
        defaultValue: '"white"',
        description: "Color palette. White uses black text, including when the website is in dark mode.",
      },
      {
        name: "onDismiss",
        type: "(id: string) => void",
        defaultValue: "required",
        description: "Called after the exit animation. Clear the matching message in your state.",
      },
      {
        name: "duration",
        type: "number",
        defaultValue: "3000",
        description: "Total lifetime in milliseconds, including entry and exit. Use 0 to keep it visible until dismissed.",
      },
      {
        name: "action",
        type: "{ label: string; onClick: () => void }",
        defaultValue: "undefined",
        description: "Optional action button. Runs your callback, then closes the toast.",
      },
      {
        name: "className",
        type: "string",
        defaultValue: "undefined",
        description: "Additional classes on the floating wrapper.",
      },
    ],
  },
};

export function getComponentBySlug(slug: string) {
  return componentRegistry.find((component) => component.slug === slug);
}

export function getComponentDoc(slug: string) {
  if (!Object.hasOwn(componentDocs, slug)) return undefined;
  const doc = componentDocs[slug];
  if (!doc) return undefined;
  const sourceCode = componentSources[doc.sourceFile as keyof typeof componentSources];
  return { ...doc, sourceCode: sourceCode ?? doc.sourceCode };
}
