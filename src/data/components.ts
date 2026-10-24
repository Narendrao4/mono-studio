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
import { SNAKE_SPINNER_SOURCE, SNAKE_SPINNER_USAGE } from "@/data/snake-spinner-code";
import { STUDIO_CARD_SOURCE, STUDIO_CARD_USAGE } from "@/data/studio-card-code";
import { STUDIO_DATA_TABLE_SOURCE, STUDIO_DATA_TABLE_USAGE } from "@/data/studio-data-table-code";
import { FOLDOUT_SOURCE, FOLDOUT_USAGE } from "@/data/foldout-code";
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
  styleFile?: string;
  styleCode?: string;
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
  {
    slug: "snake-spinner",
    name: "Snake Spinner",
    description:
      "One snake loading component for inline content, busy buttons, and a centered page overlay. Choose Orbit, Coil, or Chase and six color palettes.",
    status: "ready",
  },
  {
    slug: "studio-card",
    name: "Studio Card",
    description:
      "Mono Studio's signature card: an indexed shoulder, a clipped corner, and an offset backing that reveals depth on hover and focus. Built for live previews, projects, and editorial content.",
    status: "ready",
  },
  {
    slug: "studio-data-table",
    name: "Studio Data Table",
    description:
      "A perforated data folio with an inked column band, layered paper edges, and expandable record slips. Search, sort, select, and inspect the details tucked beneath every row.",
    status: "ready",
  },
  {
    slug: "foldout",
    name: "Foldout",
    description:
      "An accordion of indexed sheets with folded corners, an inked open state, and a smooth unfolding motion. A considered home for FAQs, settings, and the details worth revealing.",
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
  "snake-spinner": {
    ...componentRegistry[6],
    sourceFile: "snake-spinner.tsx",
    sourceCode: SNAKE_SPINNER_SOURCE,
    usageCode: SNAKE_SPINNER_USAGE,
    useCases: ["Document upload overlays", "Save and submit buttons", "Inline content loading"],
    guidelines: [
      "Choose inline for a small loading area, button for one pending action, or overlay when the whole page must wait.",
      "Use orbit for one circular snake, coil for a spiral, or chase for two snakes on the same ring. Each style uses the same rotating motion.",
      "Use current to inherit the surrounding text color, or choose a named palette. Keep white spinners on dark backgrounds and black spinners on light backgrounds.",
      "Provide a meaningful loading label. Button mode disables repeated clicks; the page overlay uses a native modal dialog to block background interactions and restore focus.",
      "Show Cancel only when the application can stop the work. Abort the real request before setting loading to false; Escape also calls onCancel when provided.",
      "Respect reduced motion preferences: the snake remains visible with its loading label while rotation stops.",
    ],
    stateGuidance: "Keep loading true for the lifetime of the actual request and clear it in finally on success or failure. The component has no automatic timeout. The showcase uses a four-second local simulation and does not upload selected files.",
    props: [
      { name: "mode", type: '"inline" | "button" | "overlay"', defaultValue: '"inline"', description: "Choose an inline status, a native loading button, or a modal page overlay." },
      { name: "variant", type: '"orbit" | "coil" | "chase"', defaultValue: '"orbit"', description: "Select the snake shape. All three rotate clockwise." },
      { name: "color", type: '"current" | "black" | "white" | "red" | "green" | "blue" | "violet"', defaultValue: '"current"', description: "Spinner color. Current inherits the surrounding text color." },
      { name: "loading", type: "boolean", defaultValue: "inline/overlay: true; button: false", description: "Show or hide the loading state. A button remains visible when false." },
      { name: "size", type: '"sm" | "md" | "lg"', defaultValue: '"md"; overlay: "lg"', description: "Controls glyph dimensions and button sizing." },
      { name: "speed", type: "number", defaultValue: "1.2", description: "Seconds per complete rotation. Must be greater than zero." },
      { name: "label", type: "string", defaultValue: '"Loading..."', description: "Accessible status text, the busy button label, or the overlay heading." },
      { name: "showLabel", type: "boolean", defaultValue: "false", description: "Inline mode only: display the label beside the spinner. Otherwise it remains available to screen readers." },
      { name: "children", type: "ReactNode", defaultValue: "required in button mode", description: "Button label shown when loading is false." },
      { name: "onClick / disabled / type", type: "native button attributes", defaultValue: 'type: "button"', description: "Button mode accepts native button props. Loading always disables the button." },
      { name: "description", type: "string", defaultValue: "undefined", description: "Overlay mode only: supporting text such as the name of the document being uploaded." },
      { name: "onCancel", type: "() => void", defaultValue: "undefined", description: "Overlay mode only: adds Cancel and handles Escape. The parent must stop the work and clear loading." },
      { name: "className", type: "string", defaultValue: "undefined", description: "Classes for the inline wrapper, button, or overlay card." },
    ],
  },
  "studio-card": {
    ...componentRegistry[7],
    sourceFile: "studio-card.tsx",
    styleFile: "studio-card.module.css",
    sourceCode: STUDIO_CARD_SOURCE,
    usageCode: STUDIO_CARD_USAGE,
    useCases: ["Interactive component galleries", "Project and resource collections", "Image and editorial cards"],
    guidelines: [
      "Let the indexed shoulder and clipped corner provide the visual identity. Use short titles, restrained badges, and one clear primary action.",
      "Pass a custom preview or an image, then use children for additional body content. The TypeScript API prevents competing preview and image props.",
      "Keep links and buttons inside actions or footer. The article itself is a content container, so nested previews remain fully interactive without a competing card click handler.",
      "Use headingLevel to fit the page outline: h2 for a library section, h3 for nested gallery items, or h4 for a deeper section.",
      "Use the inverse surface for contrast. Both surfaces use Mono Studio's theme tokens and adapt to light and dark mode.",
      "Copy the companion CSS Module beside the component. It includes the silhouette, backing layer, hover and focus behavior, and reduced motion rules.",
      "For images, provide meaningful alt text and intrinsic dimensions. This implementation uses Next.js Image; keep images local or configure your app's allowed remote sources.",
    ],
    stateGuidance: "StudioCard owns presentation only and requires no client-side state. The host owns saved states, navigation, and preview interactions. Put native links and buttons in the supplied slots; use a client parent when those actions update React state.",
    props: [
      { name: "title", type: "string", defaultValue: "required", description: "Visible heading and accessible name for the article." },
      { name: "description", type: "ReactNode", defaultValue: "undefined", description: "Supporting text beneath the title." },
      { name: "eyebrow", type: "string", defaultValue: "undefined", description: "Small index or category label in the card header." },
      { name: "preview", type: "ReactNode", defaultValue: "undefined", description: "Live component, custom artwork, or other media. Mutually exclusive with image." },
      { name: "image", type: "{ src; alt: string; width: number; height: number }", defaultValue: "undefined", description: "Next.js Image source and intrinsic dimensions. Displayed in a 16:10 frame; mutually exclusive with preview." },
      { name: "icon / badge", type: "ReactNode", defaultValue: "undefined", description: "Optional decorative icon and compact status or category badge." },
      { name: "children", type: "ReactNode", defaultValue: "undefined", description: "Additional body content, such as project statistics or a longer note." },
      { name: "actions", type: "ReactNode", defaultValue: "undefined", description: "Buttons or links below the content. Preserve native semantics and clear action labels." },
      { name: "footer", type: "ReactNode", defaultValue: "undefined", description: "A separate lower area for metadata, documentation links, or secondary actions." },
      { name: "variant", type: '"default" | "inverse"', defaultValue: '"default"', description: "Choose the theme's paper surface or its opposite for contrast." },
      { name: "size", type: '"default" | "compact"', defaultValue: '"default"', description: "Adjust spacing, heading size, and preview height." },
      { name: "headingLevel", type: "2 | 3 | 4", defaultValue: "3", description: "Semantic level of the title heading." },
      { name: "id / className", type: "string", defaultValue: "undefined", description: "Optional anchor and layout classes on the article wrapper." },
    ],
  },
  "studio-data-table": {
    ...componentRegistry[8],
    sourceFile: "studio-data-table.tsx",
    sourceCode: STUDIO_DATA_TABLE_SOURCE,
    styleFile: "studio-data-table.module.css",
    usageCode: STUDIO_DATA_TABLE_USAGE,
    useCases: ["Project and resource directories", "Invoice and order ledgers", "Review queues and small admin datasets"],
    guidelines: [
      "Provide stable, unique getRowId values and unique column IDs. Never use a row's current position as its identity.",
      "Use accessor for plain searchable and sortable values; use cell for formatted amounts, badges, links, or other custom content. Keep numeric values numeric.",
      "The first data column is the row header. Put a meaningful name there, and supply getRowLabel for descriptive checkbox labels.",
      "Selection persists across pages, searches, and sorts. The header checkbox selects only the current page; Clear selection clears all pages. Explain the scope of your bulk actions.",
      "Filtering, sorting, and pagination operate on the complete data array in the browser. Use this for bounded datasets; it does not implement server pagination or virtualization.",
      "Sort headings cycle ascending, descending, and original order. Null and undefined values remain last, and equal values retain their input order.",
      "The table scrolls within its own region on narrow screens. Keep important identifying content in the first column, use short headings, and preserve visible focus styles.",
      "Use renderRowDetails to tuck supporting information or real controls into a record slip. One slip opens at a time. Keep identifying information in the main row so the table stays useful when details are closed.",
      "Use isLoading while fetching, and an honest emptyMessage when there are no records. The loading state disables table controls without erasing selection.",
      "Provide an onSelectionChange handler when using controlled selectedIds. Selection actions must handle their own requests, confirmation, and feedback.",
    ],
    stateGuidance: "The table owns search, sort, page, page size, and uncontrolled selection. Pass selectedIds with onSelectionChange to own selection in your application. Live selection is restricted to IDs present in data, and the visible page is clamped when data shrinks. Changing initialSort or initialPageSize after mount does not reset state; remount with a new key when switching datasets. Set isLoading during real requests and pass the full resulting dataset when it resolves.",
    props: [
      { name: "title / description / eyebrow", type: "string", defaultValue: 'title required; eyebrow: "Mono / Ledger"', description: "Accessible section title, supporting text, and small index label." },
      { name: "data", type: "readonly T[]", defaultValue: "required", description: "Complete, bounded client-side dataset. An empty array shows the empty state." },
      { name: "columns", type: "readonly StudioTableColumn<T>[]", defaultValue: "required", description: "Unique id, header, and accessor per column. Optional cell renderer, sortable/searchable flags (both default true), and align: start or end." },
      { name: "getRowId / getRowLabel", type: "(row: T) => string", defaultValue: "getRowId required; label uses ID", description: "Stable unique identity and optional human-readable selection label." },
      { name: "initialSort", type: '{ columnId: string; direction: "asc" | "desc" }', defaultValue: "undefined", description: "Initial sort for a sortable column; otherwise input order is preserved." },
      { name: "initialPageSize / pageSizeOptions", type: "number / readonly number[]", defaultValue: "5 / [5, 10, 20]", description: "Initial rows per sheet and available sizes. Only positive safe integers are accepted; the active size is always included." },
      { name: "density", type: '"comfortable" | "compact"', defaultValue: '"comfortable"', description: "Adjust header and row spacing without changing behavior." },
      { name: "searchable / selectable", type: "boolean", defaultValue: "true / true", description: "Show global search and multi-row selection. Disable both for a compact reading view." },
      { name: "selectedIds", type: "readonly string[]", defaultValue: "undefined", description: "Controlled row IDs. Omit for internal selection state." },
      { name: "onSelectionChange", type: "(ids: string[]) => void", defaultValue: "undefined", description: "Receives the next selection across all pages after each selection action." },
      { name: "renderSelectionActions", type: "(rows: readonly T[]) => ReactNode", defaultValue: "undefined", description: "Render real bulk actions inside the selection bar. Receives all selected records, including records hidden by search or pagination." },
      { name: "renderRowDetails", type: "(row: T) => ReactNode", defaultValue: "undefined", description: "Adds an Inspect button and an expandable record slip beneath each row. One row can be open at a time; details unmount when closed, while the row ID remains remembered across sheets." },
      { name: "isLoading", type: "boolean", defaultValue: "false", description: "Shows a loading placeholder, announces progress, and disables table controls." },
      { name: "emptyMessage", type: "string", defaultValue: '"No records yet. Add your first record to get started."', description: "Guidance when data is empty. Search with no results has a separate reset action." },
      { name: "className", type: "string", defaultValue: "undefined", description: "Optional layout classes for the section." },
    ],
  },
  "foldout": {
    ...componentRegistry[9],
    sourceFile: "foldout.tsx",
    styleFile: "foldout.module.css",
    sourceCode: FOLDOUT_SOURCE,
    usageCode: FOLDOUT_USAGE,
    useCases: ["FAQs and help sections", "Grouped settings and preferences", "Project details and onboarding notes"],
    guidelines: [
      "Give each sheet a stable unique ID and a short, meaningful title. Use descriptions and badges sparingly so headings remain easy to scan.",
      "Use single when readers should focus on one topic, or multiple when they need to compare sections. Sheets can always be closed.",
      "Set headingLevel to fit your document outline. Triggers are native buttons with aria-expanded and aria-controls; Arrow Up/Down, Home, and End move focus without opening a sheet.",
      "Closed content stays mounted to preserve local form state, but is inert and hidden from assistive technology. Fetch expensive content separately when needed.",
      "Pass value with onValueChange for controlled state, or defaultValue for internal state. Single mode uses only the first valid ID; unknown IDs and duplicates are ignored.",
      "Disabled items cannot be toggled and are skipped by keyboard navigation. An explicitly supplied open disabled sheet stays readable.",
      "Paper and inverse surfaces follow the app theme. The companion CSS Module includes the folding transitions, focus styles, and reduced motion behavior.",
      "Keep essential errors and primary actions visible outside collapsed sections. The host owns form submission, persistence, and any async feedback.",
    ],
    stateGuidance: "Foldout controls which sheets are open. Own that array with value/onValueChange, or set defaultValue once. The content is mounted even when closed, so its form state survives toggling. Changing type from multiple to single shows only the first valid open ID; update your controlled array as well if the rest of your application uses it. When switching datasets, keep IDs stable or remount with a new key. The live example stores preference state in its parent and demonstrates both opening modes.",
    props: [
      { name: "items", type: "readonly FoldoutItem[]", defaultValue: "required", description: "Sheets with unique id, title, content, and optional description, badge, and disabled state." },
      { name: "label", type: "string", defaultValue: '"Details"', description: "Visible index header and accessible name for the group." },
      { name: "type", type: '"single" | "multiple"', defaultValue: '"single"', description: "Allow one open sheet or independently open sheets." },
      { name: "value / defaultValue", type: "readonly string[]", defaultValue: "undefined / []", description: "Controlled open IDs, or the initial IDs for internal state." },
      { name: "onValueChange", type: "(ids: string[]) => void", defaultValue: "undefined", description: "Receives the next open IDs when a heading is activated. Required for changes in controlled mode." },
      { name: "variant", type: '"paper" | "inverse"', defaultValue: '"paper"', description: "A paper surface or its monochrome inverse. Both adapt to light and dark themes." },
      { name: "size", type: '"default" | "compact"', defaultValue: '"default"', description: "Adjusts sheet spacing, heading size, and content padding." },
      { name: "headingLevel", type: "2 | 3 | 4", defaultValue: "3", description: "Semantic heading level for each trigger." },
      { name: "className", type: "string", defaultValue: "undefined", description: "Optional layout classes on the group." },
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
  const styleCode = doc.styleFile ? componentSources[doc.styleFile as keyof typeof componentSources] : undefined;
  return { ...doc, sourceCode: sourceCode ?? doc.sourceCode, styleCode };
}
