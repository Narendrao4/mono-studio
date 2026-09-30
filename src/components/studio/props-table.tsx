import type { ComponentPropDoc } from "@/data/components";

type PropsTableProps = {
  propsList: ComponentPropDoc[];
};

export function PropsTable({ propsList }: PropsTableProps) {
  return (
    <div className="studio-card overflow-x-auto">
      <table className="min-w-full border-collapse text-left text-sm">
        <thead className="bg-muted">
          <tr>
            <th className="border-b border-border px-4 py-3 font-mono text-xs uppercase tracking-[0.08em] text-muted-foreground">
              Prop
            </th>
            <th className="border-b border-border px-4 py-3 font-mono text-xs uppercase tracking-[0.08em] text-muted-foreground">
              Type
            </th>
            <th className="border-b border-border px-4 py-3 font-mono text-xs uppercase tracking-[0.08em] text-muted-foreground">
              Default
            </th>
            <th className="border-b border-border px-4 py-3 font-mono text-xs uppercase tracking-[0.08em] text-muted-foreground">
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          {propsList.map((prop) => (
            <tr key={prop.name}>
              <td className="border-b border-border px-4 py-3 font-mono text-xs text-foreground">
                {prop.name}
              </td>
              <td className="border-b border-border px-4 py-3 font-mono text-xs text-foreground">
                <span className="inline-flex items-center border border-border bg-muted px-2 py-0.5">
                  {prop.type}
                </span>
              </td>
              <td className="border-b border-border px-4 py-3 font-mono text-xs text-foreground">
                <span className="inline-flex items-center border border-border bg-muted px-2 py-0.5">
                  {prop.defaultValue}
                </span>
              </td>
              <td className="border-b border-border px-4 py-3 text-sm text-muted-foreground">
                {prop.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
