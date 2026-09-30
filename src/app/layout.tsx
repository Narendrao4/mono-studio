import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import Script from "next/script";

import { StudioShell } from "@/components/studio/studio-shell";
import "./globals.css";

const plexSans = IBM_Plex_Sans({
  variable: "--font-mono-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-mono-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const themeBootstrapScript = `(() => {
  try {
    const storageKey = "mono-studio-theme";
    const storedTheme = localStorage.getItem(storageKey);
    const resolvedTheme =
      storedTheme === "light" || storedTheme === "dark" ? storedTheme : "light";

    document.documentElement.classList.toggle("dark", resolvedTheme === "dark");
    document.documentElement.style.colorScheme = resolvedTheme;
  } catch {
    document.documentElement.classList.remove("dark");
    document.documentElement.style.colorScheme = "light";
  }
})();`;

export const metadata: Metadata = {
  title: {
    default: "Mono Studio",
    template: "%s | Mono Studio",
  },
  description: "Original React components built from first principles.",
  applicationName: "Mono Studio",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${plexSans.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <Script id="mono-theme-init" strategy="beforeInteractive">
          {themeBootstrapScript}
        </Script>
        <StudioShell>{children}</StudioShell>
      </body>
    </html>
  );
}
