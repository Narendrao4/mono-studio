import type { ComponentPropDoc } from "@/data/components";

type PropsTableProps = {
  propsList: ComponentPropDoc[];
};

export function PropsTable({ propsList }: PropsTableProps) {
  return (
    <div className="overflow-x-auto border border-neutral-200 dark:border-neutral-800">
      <table className="min-w-full border-collapse text-left text-sm">
        <thead className="bg-neutral-50 dark:bg-neutral-900/40">
          <tr>
            <th className="border-b border-neutral-200 px-4 py-3 font-mono text-xs uppercase tracking-[0.08em] text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
              Prop
            </th>
            <th className="border-b border-neutral-200 px-4 py-3 font-mono text-xs uppercase tracking-[0.08em] text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
              Type
            </th>
            <th className="border-b border-neutral-200 px-4 py-3 font-mono text-xs uppercase tracking-[0.08em] text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
              Default
            </th>
            <th className="border-b border-neutral-200 px-4 py-3 font-mono text-xs uppercase tracking-[0.08em] text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          {propsList.map((prop) => (
            <tr key={prop.name}>
              <td className="border-b border-neutral-200 px-4 py-3 font-mono text-xs text-neutral-800 dark:border-neutral-800 dark:text-neutral-200">
                {prop.name}
              </td>
              <td className="border-b border-neutral-200 px-4 py-3 font-mono text-xs text-neutral-600 dark:border-neutral-800 dark:text-neutral-300">
                {prop.type}
              </td>
              <td className="border-b border-neutral-200 px-4 py-3 font-mono text-xs text-neutral-600 dark:border-neutral-800 dark:text-neutral-300">
                {prop.defaultValue}
              </td>
              <td className="border-b border-neutral-200 px-4 py-3 text-sm text-neutral-700 dark:border-neutral-800 dark:text-neutral-300">
                {prop.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
