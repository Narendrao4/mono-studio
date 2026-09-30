import { CopyButton } from "@/components/studio/copy-button";

type CodeViewerProps = {
  code: string;
  fileName: string;
};

export function CodeViewer({ code, fileName }: CodeViewerProps) {
  return (
    <div className="overflow-hidden border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950">
      <div className="flex items-center justify-between border-b border-neutral-200 px-3 py-2 dark:border-neutral-800">
        <span className="font-mono text-xs text-neutral-500 dark:text-neutral-400">
          {fileName}
        </span>
        <CopyButton value={code} />
      </div>
      <div className="overflow-x-auto bg-neutral-50 dark:bg-neutral-950/30">
        <pre className="min-w-full px-4 py-4 font-mono text-sm leading-6 text-neutral-900 dark:text-neutral-100">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}
