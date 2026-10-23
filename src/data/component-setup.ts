export const COMPONENT_UTILS = `export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
`;

export const COMPONENT_THEME = `@import "tailwindcss";
@custom-variant dark (&:where(.dark, .dark *));

:root {
  --mono-bg: #ffffff;
  --mono-fg: #0f0f0f;
  --mono-muted: #f5f5f5;
  --mono-muted-fg: #5c5c5c;
  --mono-border: #e5e5e5;
  --mono-card: #ffffff;
  --mono-card-fg: #111111;
}

@theme inline {
  --color-background: var(--mono-bg);
  --color-foreground: var(--mono-fg);
  --color-muted: var(--mono-muted);
  --color-muted-foreground: var(--mono-muted-fg);
  --color-border: var(--mono-border);
  --color-card: var(--mono-card);
  --color-card-foreground: var(--mono-card-fg);
}

.dark {
  --mono-bg: #0a0a0a;
  --mono-fg: #f5f5f5;
  --mono-muted: #171717;
  --mono-muted-fg: #a3a3a3;
  --mono-border: #262626;
  --mono-card: #0d0d0d;
  --mono-card-fg: #f5f5f5;
}
`;

export const COMPONENT_ANIMATIONS: Record<string, string> = {
  "signal-button": `@keyframes signal-track-scan {
  0%, 100% { transform: translateX(-15%); }
  50% { transform: translateX(115%); }
}
@keyframes signal-code-blink {
  0%, 49% { opacity: .45; }
  50%, 100% { opacity: .95; }
}
@media (prefers-reduced-motion: no-preference) {
  .signal-track-scan { animation: signal-track-scan 1.1s linear infinite; }
  .signal-code-blink { animation: signal-code-blink .9s steps(2, end) infinite; }
}
`,
  "starfall-switch": `@keyframes starfall-drop {
  0% { opacity: 1; transform: translate3d(0, 0, 0) scale(1); }
  70% { opacity: 1; }
  100% { opacity: 0; transform: translate3d(var(--starfall-drift, 0px), var(--starfall-depth, 52px), 0) scale(.2); }
}
@keyframes starfall-inhale {
  0% { opacity: .92; transform: translate3d(var(--starfall-drift, 0px), var(--starfall-depth, 52px), 0) scale(.85); }
  100% { opacity: 0; transform: translate3d(var(--starfall-return-x, 0px), var(--starfall-return-y, -30px), 0) scale(.2); }
}
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: .01ms !important; animation-iteration-count: 1 !important; transition-duration: .01ms !important; }
}
`,
};
