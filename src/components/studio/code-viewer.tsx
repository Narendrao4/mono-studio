import { CopyButton } from "@/components/studio/copy-button";

type CodeViewerProps = {
  code: string;
  fileName: string;
};

export function CodeViewer({ code, fileName }: CodeViewerProps) {
  return (
    <div className="studio-card overflow-hidden">
      <div className="flex items-center justify-between border-b border-border px-3 py-2">
        <span className="font-mono text-xs text-muted-foreground">
          {fileName}
        </span>
        <CopyButton value={code} />
      </div>
      <div className="overflow-x-auto bg-card">
        <pre className="min-w-full px-4 py-4 font-mono text-sm leading-6 text-foreground">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}
