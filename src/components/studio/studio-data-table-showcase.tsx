"use client";

import { useState } from "react";

import { StudioDataTable, type StudioTableColumn } from "@/components/ui/studio-data-table";
import { cn } from "@/lib/utils";

type Project = {
  id: string;
  name: string;
  category: string;
  stage: "Live" | "In review" | "Draft";
  owner: string;
  files: number;
  budget: number;
};

const projects: Project[] = [
  { id: "MS-001", name: "Atlas workspace", category: "Platform / Design system", stage: "Live", owner: "Narendra", files: 24, budget: 8400 },
  { id: "MS-002", name: "Forma identity", category: "Brand / Visual language", stage: "In review", owner: "Maya", files: 8, budget: 3200 },
  { id: "MS-003", name: "Index journal", category: "Editorial / Publishing", stage: "Draft", owner: "Arjun", files: 12, budget: 1800 },
  { id: "MS-004", name: "Orbit analytics", category: "Product / Dashboard", stage: "Live", owner: "Leah", files: 32, budget: 12600 },
  { id: "MS-005", name: "Still collection", category: "Commerce / Storefront", stage: "In review", owner: "Narendra", files: 6, budget: 2400 },
  { id: "MS-006", name: "Field notes", category: "Editorial / Research", stage: "Live", owner: "Maya", files: 18, budget: 4600 },
  { id: "MS-007", name: "Layer archive", category: "Platform / Resources", stage: "Draft", owner: "Leah", files: 3, budget: 900 },
  { id: "MS-008", name: "North dashboard", category: "Product / Operations", stage: "Live", owner: "Arjun", files: 21, budget: 7200 },
  { id: "MS-009", name: "Outline kit", category: "Brand / Components", stage: "In review", owner: "Maya", files: 10, budget: 3800 },
  { id: "MS-010", name: "Signal console", category: "Platform / Monitoring", stage: "Live", owner: "Narendra", files: 42, budget: 14800 },
  { id: "MS-011", name: "Mono experiments", category: "Research / Interaction", stage: "Draft", owner: "Leah", files: 5, budget: 1200 },
  { id: "MS-012", name: "Tide portal", category: "Product / Community", stage: "In review", owner: "Arjun", files: 16, budget: 5600 },
];

function Stage({ value }: { value: Project["stage"] }) {
  return <span className="inline-flex items-center gap-1.5 whitespace-nowrap border border-border px-2 py-1 font-mono text-[9px]"><span aria-hidden="true" className={cn("h-1.5 w-1.5", value === "Live" ? "bg-foreground" : value === "In review" ? "rounded-full border border-foreground" : "h-px bg-muted-foreground")} />{value}</span>;
}

const columns: StudioTableColumn<Project>[] = [
  { id: "name", header: "Project", accessor: (row) => row.name, cell: (row) => <div className="min-w-[155px]"><span className="block tracking-[-0.01em]">{row.name}</span><span className="mt-1 block text-[10px] font-normal text-muted-foreground">{row.category}</span></div> },
  { id: "stage", header: "Stage", accessor: (row) => row.stage, cell: (row) => <Stage value={row.stage} /> },
  { id: "owner", header: "Owner", accessor: (row) => row.owner, cell: (row) => <span className="inline-flex items-center gap-2"><span aria-hidden="true" className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-border font-mono text-[8px] text-muted-foreground">{row.owner.slice(0, 2).toUpperCase()}</span>{row.owner}</span> },
  { id: "files", header: "Files", accessor: (row) => row.files, align: "end" },
  { id: "budget", header: "Budget", accessor: (row) => row.budget, align: "end", cell: (row) => <span className="font-mono text-[11px]">${row.budget.toLocaleString("en-US")}</span> },
];

const getRowId = (row: Project) => row.id;
const getRowLabel = (row: Project) => row.name;
const choiceClass = "min-h-9 border px-3 text-xs transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground";

function exportProjects(rows: readonly Project[]) {
  const fields: (keyof Project)[] = ["id", "name", "category", "stage", "owner", "files", "budget"];
  const csv = [fields.join(","), ...rows.map((row) => fields.map((field) => `"${String(row[field]).replaceAll('"', '""')}"`).join(","))].join("\r\n");
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8;" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = "mono-studio-projects.csv";
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function StudioDataTableInteractivePreview() {
  const [density, setDensity] = useState<"comfortable" | "compact">("comfortable");
  const [state, setState] = useState<"populated" | "empty" | "loading">("populated");
  const [feedback, setFeedback] = useState("Select rows, change sheets, then export your selection as a CSV.");

  return (
    <div className="w-full min-w-0 space-y-6" data-table-playground="">
      <div className="flex flex-wrap items-start justify-between gap-5">
        <div className="max-w-sm">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Mono / Signature 009</p>
          <h3 className="studio-heading mt-2 text-2xl">Every detail, in its place.</h3>
          <p className="mt-2 text-xs leading-6 text-muted-foreground">A numbered rail. A quiet rhythm. A selection that travels with you. A ledger made for the way you work.</p>
        </div>
        <div className="flex flex-wrap gap-5">
          <fieldset><legend className="mb-2 font-mono text-[9px] uppercase tracking-[0.12em] text-muted-foreground">Spacing</legend><div className="flex gap-1">{(["comfortable", "compact"] as const).map((value) => <button key={value} type="button" data-table-density={value} aria-pressed={density === value} onClick={() => setDensity(value)} className={cn(choiceClass, density === value ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground")}>{value === "comfortable" ? "Roomy" : "Compact"}</button>)}</div></fieldset>
          <fieldset><legend className="mb-2 font-mono text-[9px] uppercase tracking-[0.12em] text-muted-foreground">Data state</legend><div className="flex flex-wrap gap-1">{(["populated", "empty", "loading"] as const).map((value) => <button key={value} type="button" data-table-state={value} aria-pressed={state === value} onClick={() => setState(value)} className={cn(choiceClass, "capitalize", state === value ? "border-foreground bg-muted" : "border-border hover:border-foreground")}>{value === "populated" ? "Records" : value}</button>)}</div></fieldset>
        </div>
      </div>

      <StudioDataTable
        title="Project ledger"
        description="Good ideas, carefully kept. Your studio at a glance."
        eyebrow="Workspace / 2026"
        data={state === "empty" ? [] : projects}
        columns={columns}
        getRowId={getRowId}
        getRowLabel={getRowLabel}
        density={density}
        isLoading={state === "loading"}
        renderSelectionActions={(rows) => <button type="button" onClick={() => { exportProjects(rows); setFeedback(`Exported ${rows.length} ${rows.length === 1 ? "project" : "projects"} to mono-studio-projects.csv.`); }}>Export rows ↓</button>}
      />
      <p role="status" className="text-xs leading-6 text-muted-foreground">{feedback}</p>
    </div>
  );
}

export function StudioDataTableCatalogPreview() {
  return <div className="w-full max-w-[350px] [&_header]:!p-3 [&_h3]:!text-base [&_footer]:!hidden [&_th]:!px-2 [&_td]:!px-2">
    <StudioDataTable title="Project index" eyebrow="Mono / 009" data={projects.slice(0, 2)} columns={[{ id: "name", header: "Project", accessor: (row) => row.name }, { id: "files", header: "Files", accessor: (row) => row.files, align: "end" }]} getRowId={getRowId} searchable={false} selectable={false} density="compact" initialPageSize={3} pageSizeOptions={[3]} />
  </div>;
}

export function StudioDataTableVariants() {
  const [selectedIds, setSelectedIds] = useState<string[]>(["MS-001"]);
  const smallColumns = columns.filter((column) => column.id === "name" || column.id === "stage");
  return <div className="grid min-w-0 gap-6 xl:grid-cols-2">
    <div className="min-w-0 space-y-3"><p className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">01 / Compact reading view</p><StudioDataTable title="Shortlist" description="Less chrome. The same considered details." data={projects.slice(0, 3)} columns={smallColumns} getRowId={getRowId} searchable={false} selectable={false} density="compact" initialPageSize={3} pageSizeOptions={[3]} /></div>
    <div className="min-w-0 space-y-3"><p className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">02 / Controlled selection</p><StudioDataTable title="Review queue" description="Selection owned by your application." data={projects.slice(0, 3)} columns={smallColumns} getRowId={getRowId} getRowLabel={getRowLabel} searchable={false} density="compact" initialPageSize={3} pageSizeOptions={[3]} selectedIds={selectedIds} onSelectionChange={setSelectedIds} /><p className="text-xs text-muted-foreground" role="status">Selected IDs: {selectedIds.join(", ") || "None"}</p></div>
  </div>;
}
