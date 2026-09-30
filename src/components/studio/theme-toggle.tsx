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

function SunIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M12 2.8V5.2M12 18.8V21.2M4.8 4.8L6.5 6.5M17.5 17.5L19.2 19.2M2.8 12H5.2M18.8 12H21.2M4.8 19.2L6.5 17.5M17.5 6.5L19.2 4.8"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M19.7 14.7C18.8 15.1 17.7 15.3 16.7 15.3C12.8 15.3 9.7 12.2 9.7 8.3C9.7 7.2 9.9 6.2 10.3 5.3C6.9 6 4.4 9 4.4 12.6C4.4 16.8 7.8 20.2 12 20.2C15.7 20.2 18.8 17.6 19.7 14.1V14.7Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ThemeToggle() {
  const activeTheme = useSyncExternalStore(
    subscribeToThemeChange,
    readCurrentTheme,
    () => "light",
  );
  const darkActive = activeTheme === "dark";

  function setTheme(nextTheme: Theme) {
    window.localStorage.setItem(STORAGE_KEY, nextTheme);
    applyTheme(nextTheme);
    window.dispatchEvent(new Event(THEME_EVENT));
  }

  return (
    <button
      type="button"
      onClick={() => setTheme(darkActive ? "light" : "dark")}
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background text-black transition-colors hover:bg-muted dark:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      aria-label={darkActive ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={darkActive}
      title={darkActive ? "Switch to light" : "Switch to dark"}
    >
      <SunIcon
        className={`h-5 w-5 transition-all duration-250 ${
          darkActive ? "-rotate-90 scale-0" : "rotate-0 scale-100"
        }`}
      />
      <MoonIcon
        className={`absolute h-5 w-5 transition-all duration-250 ${
          darkActive ? "rotate-0 scale-100" : "rotate-90 scale-0"
        }`}
      />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
