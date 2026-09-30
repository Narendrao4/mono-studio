"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { ThemeToggle } from "@/components/studio/theme-toggle";

const navLinkClassName =
  "inline-flex h-9 items-center justify-center px-2 text-sm font-medium text-black dark:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const iconControlClassName =
  "inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const plainIconControlClassName =
  "inline-flex h-10 w-10 items-center justify-center text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const mobileDrawerLinkClassName =
  "flex min-h-12 w-full items-center gap-3 px-5 text-base font-medium text-black dark:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-foreground";

const navItems = [
  { label: "Components", href: "/components" },
  { label: "Blocks", href: "/#blocks" },
  { label: "Patterns", href: "/#patterns" },
  { label: "Resources", href: "/#resources" },
];

function StudioLogoMark() {
  return (
    <span
      className="inline-grid h-8 w-8 grid-cols-2 gap-0.5 border border-border bg-card p-1"
      aria-hidden="true"
    >
      <span className="bg-foreground" />
      <span className="bg-muted" />
      <span className="bg-muted" />
      <span className="bg-foreground" />
    </span>
  );
}

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
      <path
        d="M4 7.5H20M4 12H20M4 16.5H20"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path
        d="M5 5L19 19M19 5L5 19"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.7" />
      <path d="M16 16L20 20" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path
        d="M9 18.3C5.8 19.3 5.8 16.6 4.5 16.2M13.5 20V17.4C13.5 16.6 13.6 16.1 13.2 15.8C15.9 15.5 18.7 14.5 18.7 10C18.7 8.8 18.3 7.8 17.6 7.1C17.8 6.3 17.8 5.5 17.5 4.7C17.5 4.7 16.6 4.4 13.5 6.5C11.8 6 10.2 6 8.5 6.5C5.4 4.4 4.5 4.7 4.5 4.7C4.2 5.5 4.2 6.3 4.4 7.1C3.7 7.8 3.3 8.8 3.3 10C3.3 14.5 6.1 15.5 8.8 15.8C8.4 16.1 8.5 16.6 8.5 17.4V20"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function StudioHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!mobileMenuOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="studio-container flex h-[var(--studio-header-height)] w-full items-center gap-3">
        <Link
          href="/"
          className="group inline-flex shrink-0 items-center gap-2.5"
        >
          <StudioLogoMark />
          <span className="font-mono text-sm font-semibold uppercase tracking-[0.16em] text-foreground transition-opacity group-hover:opacity-80">
            Mono Studio
          </span>
        </Link>

        <nav className="hidden items-center gap-5 lg:flex" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link key={item.label} href={item.href} className={navLinkClassName}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Link
            href="/search"
            className={`${iconControlClassName} hidden sm:inline-flex`}
            aria-label="Search docs and components"
          >
            <SearchIcon />
          </Link>
          <div className="hidden min-[480px]:block">
            <ThemeToggle />
          </div>
          <span className="mx-1 hidden h-6 w-px bg-border md:block" aria-hidden="true" />
          <a
            href="https://github.com/narendrao4/mono-studio"
            target="_blank"
            rel="noreferrer"
            className={`${plainIconControlClassName} hidden md:inline-flex`}
            aria-label="View GitHub repository"
          >
            <GithubIcon />
          </a>
          <button
            type="button"
            className={`${iconControlClassName} lg:hidden`}
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-drawer"
          >
            <MenuIcon />
          </button>
        </div>

        </div>
      </header>

      {mobileMenuOpen ? (
        <div
          id="mobile-navigation-drawer"
          className="fixed inset-0 z-50 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/45"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close navigation menu"
          />

          <div className="relative z-10 flex h-dvh w-[min(22rem,calc(100%-2.5rem))] flex-col overflow-y-auto border-r border-border bg-background shadow-2xl">
            <div className="flex min-h-[var(--studio-header-height)] items-center justify-between border-b border-border px-4">
              <Link
                href="/"
                className="inline-flex items-center gap-2.5"
                onClick={() => setMobileMenuOpen(false)}
              >
                <StudioLogoMark />
                <span className="font-mono text-sm font-semibold uppercase tracking-[0.16em] text-foreground">
                  Mono Studio
                </span>
              </Link>

              <button
                type="button"
                className={iconControlClassName}
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close navigation menu"
                autoFocus
              >
                <CloseIcon />
              </button>
            </div>

            <nav className="flex flex-col py-3" aria-label="Mobile navigation links">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={mobileDrawerLinkClassName}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="mx-5 border-t border-border" />

            <div className="flex flex-col py-3">
              <a
                href="https://github.com/narendrao4/mono-studio"
                target="_blank"
                rel="noreferrer"
                className={mobileDrawerLinkClassName}
                onClick={() => setMobileMenuOpen(false)}
              >
                <GithubIcon />
                GitHub
              </a>
              <Link
                href="/search"
                className={mobileDrawerLinkClassName}
                onClick={() => setMobileMenuOpen(false)}
              >
                <SearchIcon />
                Search
              </Link>
              <div className="flex min-h-12 items-center justify-between px-5 text-base font-medium text-black dark:text-white">
                <span>Theme</span>
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
