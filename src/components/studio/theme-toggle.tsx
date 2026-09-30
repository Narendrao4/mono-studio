"use client";

import { useSyncExternalStore } from "react";

type Theme = "light" | "dark";

const STORAGE_KEY = "mono-studio-theme";
const THEME_EVENT = "mono-studio-theme-change";

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;
}

function readCurrentTheme(): Theme {
  if (typeof document === "undefined") {
    return "light";
  }

  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function subscribeToThemeChange(onThemeChange: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }

  window.addEventListener(THEME_EVENT, onThemeChange);

  return () => {
    window.removeEventListener(THEME_EVENT, onThemeChange);
  };
}

export function ThemeToggle() {
  const activeTheme = useSyncExternalStore(
    subscribeToThemeChange,
    readCurrentTheme,
    () => "light",
  );

  function setTheme(nextTheme: Theme) {
    window.localStorage.setItem(STORAGE_KEY, nextTheme);
    applyTheme(nextTheme);
    window.dispatchEvent(new Event(THEME_EVENT));
  }

  return (
    <div
      className="inline-flex h-9 items-center border border-neutral-300 bg-white p-0.5 dark:border-neutral-700 dark:bg-neutral-950"
      role="group"
      aria-label="Theme switcher"
    >
      <button
        type="button"
        onClick={() => setTheme("light")}
        className={`h-7 px-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors focus-visible:outline-none ${
          activeTheme === "light"
            ? "bg-neutral-950 text-white dark:bg-neutral-100 dark:text-neutral-950"
            : "text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-900"
        }`}
        aria-pressed={activeTheme === "light"}
      >
        White
      </button>
      <button
        type="button"
        onClick={() => setTheme("dark")}
        className={`h-7 px-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors focus-visible:outline-none ${
          activeTheme === "dark"
            ? "bg-neutral-950 text-white dark:bg-neutral-100 dark:text-neutral-950"
            : "text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-900"
        }`}
        aria-pressed={activeTheme === "dark"}
      >
        Black
      </button>
    </div>
  );
}
