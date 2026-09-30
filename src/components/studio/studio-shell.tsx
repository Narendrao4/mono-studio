import type { ReactNode } from "react";

import { StudioHeader } from "@/components/studio/studio-header";
import { StudioSidebar } from "@/components/studio/studio-sidebar";

type StudioShellProps = {
  children: ReactNode;
};

export function StudioShell({ children }: StudioShellProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <StudioHeader />
      <div className="studio-container flex w-full gap-6 py-6 lg:gap-8">
        <StudioSidebar />
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
