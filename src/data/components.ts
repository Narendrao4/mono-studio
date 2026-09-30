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
];

const componentDocs: Record<string, ComponentDoc> = {
  "signal-button": {
    ...componentRegistry[0],
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
};

export function getComponentBySlug(slug: string) {
  return componentRegistry.find((component) => component.slug === slug);
}

export function getComponentDoc(slug: string) {
  return componentDocs[slug];
}
