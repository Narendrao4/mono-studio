import { SIGNAL_BUTTON_SOURCE, SIGNAL_BUTTON_USAGE } from "@/data/signal-button-code";

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
};

export function getComponentBySlug(slug: string) {
  return componentRegistry.find((component) => component.slug === slug);
}

export function getComponentDoc(slug: string) {
  return componentDocs[slug];
}
