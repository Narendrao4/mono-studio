import type { ReactNode } from "react";

import { StudioHeader } from "@/components/studio/studio-header";
import { StudioSidebar } from "@/components/studio/studio-sidebar";

type StudioShellProps = {
  children: ReactNode;
};

export function StudioShell({ children }: StudioShellProps) {
  return (
    <div className="min-h-screen bg-transparent text-[var(--mono-fg)]">
      <StudioHeader />
      <div className="mx-auto flex w-full max-w-7xl gap-8 px-4 py-6 sm:px-6 lg:px-8">
        <StudioSidebar />
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
