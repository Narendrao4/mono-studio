"use client";

import {
  useEffect,
  useId,
  useRef,
  useSyncExternalStore,
  type ButtonHTMLAttributes,
  type CSSProperties,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";

import { cn } from "@/lib/utils";

export type SnakeSpinnerVariant = "orbit" | "coil" | "chase";
export type SnakeSpinnerColor = "current" | "black" | "white" | "red" | "green" | "blue" | "violet";
export type SnakeSpinnerSize = "sm" | "md" | "lg";

type SharedProps = {
  loading?: boolean;
  variant?: SnakeSpinnerVariant;
  color?: SnakeSpinnerColor;
  size?: SnakeSpinnerSize;
  speed?: number;
  label?: string;
  className?: string;
};

type InlineProps = SharedProps & { mode?: "inline"; showLabel?: boolean };
type ButtonProps = SharedProps & Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof SharedProps | "children"> & {
  mode: "button";
  children: ReactNode;
};
type OverlayProps = SharedProps & {
  mode: "overlay";
  description?: string;
  onCancel?: () => void;
};

export type SnakeSpinnerProps = InlineProps | ButtonProps | OverlayProps;

const inks: Record<SnakeSpinnerColor, string> = {
  current: "currentColor",
  black: "#111111",
  white: "#ffffff",
  red: "#dc2626",
  green: "#15803d",
  blue: "#2563eb",
  violet: "#7c3aed",
};

const glyphSizes = { sm: 24, md: 40, lg: 72 };
const buttonGlyphSizes = { sm: 16, md: 20, lg: 24 };
const buttonSizes = { sm: "min-h-9 px-3 text-xs", md: "min-h-11 px-4 text-sm", lg: "min-h-12 px-5 text-base" };

const animationStyles = `
@keyframes snake-spinner-turn { to { transform: rotate(360deg); } }
@keyframes snake-spinner-appear { from { opacity: 0; transform: translateY(8px) scale(.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
@keyframes snake-spinner-dim { from { opacity: 0; } to { opacity: 1; } }
.snake-spinner-turn { animation: snake-spinner-turn var(--snake-spin-speed, 1.2s) linear infinite; transform-origin: 48px 48px; }
.snake-spinner-dialog { position: fixed; inset: 0; margin: auto; padding: 0; border: 0; max-width: min(28rem, calc(100vw - 2rem)); max-height: calc(100dvh - 2rem); overflow: auto; background: transparent; color: inherit; }
.snake-spinner-dialog[open] { animation: snake-spinner-appear 200ms ease-out both; }
.snake-spinner-dialog::backdrop { background: rgb(0 0 0 / .72); backdrop-filter: blur(4px); animation: snake-spinner-dim 200ms ease-out both; }
@media (prefers-reduced-motion: reduce) {
  .snake-spinner-turn, .snake-spinner-dialog[open], .snake-spinner-dialog::backdrop { animation: none; }
}
`;

// The body widens from tail to head. Coil follows a spiral; chase uses two arcs.
function snakeBody(variant: SnakeSpinnerVariant, headAngle = 0) {
  const outer: string[] = [];
  const inner: string[] = [];
  const sweep = variant === "coil" ? 540 : variant === "chase" ? 138 : 286;

  for (let index = 0; index <= 72; index++) {
    const t = index / 72;
    const angle = (headAngle - sweep * (1 - t)) * Math.PI / 180;
    const radius = variant === "coil" ? 11 + 18 * t : 29 + Math.sin(t * Math.PI * 5) * .65;
    const width = .2 + 3 * t;
    // Keep SSR and browser geometry identical across floating-point runtimes.
    outer.push(`${(48 + Math.cos(angle) * (radius + width)).toFixed(4)},${(48 + Math.sin(angle) * (radius + width)).toFixed(4)}`);
    inner.unshift(`${(48 + Math.cos(angle) * (radius - width)).toFixed(4)},${(48 + Math.sin(angle) * (radius - width)).toFixed(4)}`);
  }

  return `M${outer.join(" L")} L${inner.join(" L")} Z`;
}

function SnakeGlyph({ variant = "orbit", color = "current", speed = 1.2, pixels }: SharedProps & { pixels: number }) {
  const eyeMaskId = useId();
  const heads = variant === "chase" ? [0, 180] : [0];
  const seconds = Number.isFinite(speed) && speed > 0 ? speed : 1.2;

  return (
    <svg
      aria-hidden="true"
      data-snake-glyph={variant}
      data-spinner-color={color}
      viewBox="0 0 96 96"
      width={pixels}
      height={pixels}
      className="shrink-0 overflow-visible"
      style={{ color: inks[color], "--snake-spin-speed": `${seconds}s` } as CSSProperties}
    >
      <defs>
        <mask id={eyeMaskId} maskUnits="userSpaceOnUse" x="0" y="0" width="96" height="96">
          <rect width="96" height="96" fill="white" />
          {heads.map((angle) => (
            <g key={angle} transform={`rotate(${angle} 48 48)`} fill="black">
              <circle cx="75.5" cy="49.5" r=".8" />
              <circle cx="78.5" cy="49.5" r=".8" />
            </g>
          ))}
        </mask>
      </defs>
      <circle cx="48" cy="48" r="29" fill="none" stroke="currentColor" strokeWidth="1" opacity=".1" />
      <g className="snake-spinner-turn" fill="currentColor" mask={`url(#${eyeMaskId})`}>
        {heads.map((angle) => (
          <g key={angle}>
            <path d={snakeBody(variant, angle)} />
            <g transform={`rotate(${angle} 48 48)`}>
              <ellipse cx="77" cy="48" rx="4" ry="5.5" />
              <path d="M77 53v3m0 0-1.5 1.5M77 56l1.5 1.5" fill="none" stroke="currentColor" strokeWidth=".9" strokeLinecap="round" />
            </g>
          </g>
        ))}
      </g>
    </svg>
  );
}

const subscribe = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;

/** One snake animation family for inline, button, and full-page loading. */
export function SnakeSpinner(props: SnakeSpinnerProps) {
  const isClient = useSyncExternalStore(subscribe, clientSnapshot, serverSnapshot);

  if (props.mode === "button") return <SnakeSpinnerButton {...props} />;
  if (props.loading === false) return null;

  if (props.mode === "overlay") {
    return isClient ? createPortal(<SnakeSpinnerOverlay {...props} />, document.body) : null;
  }

  return (
    <span data-snake-spinner="inline" role="status" className={cn("inline-flex items-center gap-3 align-middle", props.className)}>
      <style>{animationStyles}</style>
      <SnakeGlyph {...props} pixels={glyphSizes[props.size ?? "md"]} />
      <span className={props.showLabel ? "text-sm" : "sr-only"}>{props.label ?? "Loading..."}</span>
    </span>
  );
}

function SnakeSpinnerButton({
  mode,
  children,
  loading = false,
  variant,
  color,
  size = "md",
  speed,
  label = "Loading...",
  className,
  disabled,
  type = "button",
  ...buttonProps
}: ButtonProps) {
  return (
    <button
      {...buttonProps}
      type={type}
      data-snake-spinner={mode}
      disabled={disabled || loading}
      aria-busy={loading}
      className={cn("inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-card font-medium text-foreground transition-colors hover:bg-muted disabled:cursor-wait disabled:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground", buttonSizes[size], className)}
    >
      <style>{animationStyles}</style>
      {loading && <SnakeGlyph variant={variant} color={color} speed={speed} pixels={buttonGlyphSizes[size]} />}
      <span>{loading ? label : children}</span>
    </button>
  );
}

function SnakeSpinnerOverlay({
  variant,
  color = "current",
  size = "lg",
  speed,
  label = "Loading...",
  description,
  onCancel,
  className,
}: OverlayProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const descriptionId = useId();
  const darkSurface = color === "white";

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    dialog.showModal();
    document.body.style.overflow = "hidden";

    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true });
    };
  }, []);

  return (
    <>
      <style>{animationStyles}</style>
      <dialog
        ref={dialogRef}
        data-snake-spinner="overlay"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        className="snake-spinner-dialog rounded-3xl"
        onCancel={(event) => { event.preventDefault(); onCancel?.(); }}
      >
        <div
          aria-busy="true"
          className={cn("flex min-w-[min(320px,calc(100vw-2rem))] flex-col items-center rounded-3xl border px-8 py-10 text-center shadow-2xl", className)}
          style={{ backgroundColor: darkSurface ? "#111111" : "#ffffff", color: darkSurface ? "#ffffff" : "#111111", borderColor: darkSurface ? "#333333" : "#e5e5e5" }}
        >
          <SnakeGlyph variant={variant} color={color} size={size} speed={speed} pixels={glyphSizes[size]} />
          <div role="status" className="mt-5 space-y-2">
            <p id={titleId} className="text-base font-semibold">{label}</p>
            {description && <p id={descriptionId} className="max-w-[260px] break-words text-sm leading-6 opacity-65">{description}</p>}
          </div>
          {onCancel && <button type="button" onClick={onCancel} className="mt-6 rounded-lg border border-current/20 px-4 py-2 text-xs font-medium transition-opacity hover:opacity-65 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current">Cancel</button>}
        </div>
      </dialog>
    </>
  );
}
