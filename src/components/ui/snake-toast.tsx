"use client";

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
} from "react";
import { createPortal } from "react-dom";

import { cn } from "@/lib/utils";

export type SnakeToastVariant = "white" | "black" | "red" | "green";

export type SnakeToastMessage = {
  id: string;
  title: string;
  description?: string;
  variant?: SnakeToastVariant;
};

export type SnakeToastProps = {
  toast: SnakeToastMessage | null;
  onDismiss: (id: string) => void;
  duration?: number;
  action?: { label: string; onClick: () => void };
  className?: string;
};

type ToastStyles = CSSProperties & Record<`--snake-${string}`, string>;

const palettes: Record<SnakeToastVariant, ToastStyles> = {
  white: {
    "--snake-bg": "#ffffff", "--snake-fg": "#111111",
    "--snake-muted": "#525252", "--snake-border": "#e5e5e5",
  },
  black: {
    "--snake-bg": "#111111", "--snake-fg": "#ffffff",
    "--snake-muted": "#d4d4d4", "--snake-border": "#404040",
  },
  red: {
    "--snake-bg": "#b91c1c", "--snake-fg": "#ffffff",
    "--snake-muted": "#fee2e2", "--snake-border": "#dc6262",
  },
  green: {
    "--snake-bg": "#166534", "--snake-fg": "#ffffff",
    "--snake-muted": "#dcfce7", "--snake-border": "#4e9467",
  },
};

// Kept with the component so its copyable source includes the animation.
const animationStyles = `
@keyframes snake-toast-enter {
  0% { opacity: 0; transform: translate3d(calc(100% + 40px), 34px, 0) rotate(-9deg) skewX(-14deg) scale(.82, .7); border-radius: 44px 12px 44px 12px; }
  30% { opacity: 1; transform: translate3d(-24px, -12px, 0) rotate(3deg) skewX(7deg) scale(1.02, .94); border-radius: 12px 30px 12px 30px; }
  53% { transform: translate3d(13px, 7px, 0) rotate(-2deg) skewX(-4deg); border-radius: 23px 12px 23px 12px; }
  76% { transform: translate3d(-5px, -3px, 0) rotate(1deg) skewX(2deg); }
  100% { opacity: 1; transform: translate3d(0, 0, 0); border-radius: 18px; }
}
@keyframes snake-toast-exit {
  0% { opacity: 1; transform: translate3d(0, 0, 0); }
  25% { opacity: 1; transform: translate3d(-16px, -6px, 0) rotate(-2deg) skewX(-5deg); }
  100% { opacity: 0; transform: translate3d(calc(100% + 40px), 28px, 0) rotate(8deg) skewX(14deg) scale(.85, .65); border-radius: 40px 10px 40px 10px; }
}
@keyframes snake-toast-trace { from { stroke-dashoffset: 100; } to { stroke-dashoffset: -100; } }
@keyframes snake-toast-countdown { from { transform: scaleX(1); } to { transform: scaleX(0); } }
.snake-toast-surface { animation: snake-toast-enter 720ms cubic-bezier(.22,.8,.3,1) both; transform-origin: right center; }
.snake-toast-surface[data-state="leaving"] { animation: snake-toast-exit 340ms ease-in both; }
.snake-toast-trace { animation: snake-toast-trace var(--snake-duration) linear forwards; }
.snake-toast-countdown { animation: snake-toast-countdown var(--snake-duration) linear forwards; transform-origin: left; }
@media (prefers-reduced-motion: reduce) {
  .snake-toast-surface, .snake-toast-surface[data-state="leaving"], .snake-toast-trace, .snake-toast-countdown { animation: none; }
}
`;

const subscribe = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;

/** Pass a new ID for each notification to replay its motion and countdown. */
export function SnakeToast({ toast, ...props }: SnakeToastProps) {
  const isClient = useSyncExternalStore(subscribe, clientSnapshot, serverSnapshot);
  if (!isClient || !toast) return null;

  return createPortal(
    <SnakeToastSurface key={toast.id} toast={toast} {...props} />,
    document.body,
  );
}

function SnakeToastSurface({
  toast,
  onDismiss,
  duration = 3000,
  action,
  className,
}: Omit<SnakeToastProps, "toast"> & { toast: SnakeToastMessage }) {
  const [leaving, setLeaving] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const latest = useRef({ toast, onDismiss });
  const close = useRef(() => {});
  const variant = toast.variant ?? "white";
  const lifetime = Number.isFinite(duration) ? Math.max(0, duration) : 3000;

  useEffect(() => { latest.current = { toast, onDismiss }; }, [toast, onDismiss]);

  useEffect(() => {
    let closing = false;
    let exitTimer: ReturnType<typeof setTimeout> | undefined;
    let dismissTimer: ReturnType<typeof setTimeout> | undefined;

    function finish() {
      setDismissed(true);
      latest.current.onDismiss(latest.current.toast.id);
    }

    function dismiss() {
      if (closing) return;
      closing = true;
      clearTimeout(exitTimer);
      clearTimeout(dismissTimer);
      setLeaving(true);
      dismissTimer = setTimeout(finish, 340);
    }

    close.current = dismiss;

    if (lifetime > 0) {
      exitTimer = setTimeout(() => {
        closing = true;
        setLeaving(true);
      }, Math.max(0, lifetime - 340));
      dismissTimer = setTimeout(finish, lifetime);
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") dismiss();
    }
    window.addEventListener("keydown", onKeyDown);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(dismissTimer);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [lifetime]);

  if (dismissed) return null;

  return (
    <div
      className={cn("fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-[100] w-[min(390px,calc(100vw-2rem))]", className)}
      style={{ ...palettes[variant], "--snake-duration": `${lifetime}ms` } as ToastStyles}
    >
      <style>{animationStyles}</style>
      <section
        data-snake-toast=""
        data-variant={variant}
        data-state={leaving ? "leaving" : "visible"}
        aria-label="Notification"
        className="snake-toast-surface relative isolate overflow-hidden rounded-[18px] border border-[var(--snake-border)] bg-[var(--snake-bg)] text-[var(--snake-fg)] shadow-[0_16px_60px_-14px_rgba(0,0,0,0.3)]"
      >
        <svg aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full" fill="none">
          <rect x="1" y="1" width="calc(100% - 2px)" height="calc(100% - 2px)" rx="17" stroke="var(--snake-fg)" strokeWidth="1.5" strokeDasharray="18 82" strokeLinecap="round" pathLength="100" className="snake-toast-trace" />
        </svg>
        <div className="relative flex items-start gap-3 p-5">
          <div aria-hidden="true" className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[var(--snake-border)]">
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-[1.7]">
              {variant === "red" ? (
                <path d="M12 6v7m0 4v.1" strokeLinecap="round" />
              ) : variant === "green" ? (
                <path d="m5 12 4 4L19 6" strokeLinecap="round" strokeLinejoin="round" />
              ) : (
                <path d="M3 15c4 0 3-8 7-8s3 10 7 10 2-8 5-8" strokeLinecap="round" />
              )}
            </svg>
          </div>
          <div className="min-w-0 flex-1" role="status" aria-atomic="true">
            <p className="break-words text-sm font-semibold leading-5">{toast.title}</p>
            {toast.description && <p className="mt-1 break-words text-xs leading-5 text-[var(--snake-muted)]">{toast.description}</p>}
          </div>
          <button type="button" aria-label="Dismiss notification" onClick={() => close.current()} className="-mr-1 -mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-[var(--snake-muted)] hover:text-[var(--snake-fg)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current">
            <svg aria-hidden="true" viewBox="0 0 16 16" className="h-3 w-3 fill-none stroke-current stroke-[1.5]"><path d="M3 3l10 10M13 3L3 13" /></svg>
          </button>
        </div>
        {action && (
          <div className="relative -mt-2 px-5 pb-4 pl-[68px]">
            <button type="button" disabled={leaving} onClick={() => { action.onClick(); close.current(); }} className="rounded-md border border-[var(--snake-border)] px-3 py-1.5 text-xs font-medium hover:opacity-70 disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current">
              {action.label}
            </button>
          </div>
        )}
        {lifetime > 0 && <div aria-hidden="true" className="snake-toast-countdown mx-5 h-0.5 bg-[var(--snake-fg)] opacity-35" />}
      </section>
    </div>
  );
}
