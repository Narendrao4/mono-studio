"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";
import styles from "./studio-data-table.module.css";

export type StudioTableValue = string | number | null | undefined;
export type StudioTableSort = { columnId: string; direction: "asc" | "desc" };

export type StudioTableColumn<T> = {
  id: string;
  header: string;
  /** Plain values power sorting and search, independently of the cell's appearance. */
  accessor: (row: T) => StudioTableValue;
  cell?: (row: T) => ReactNode;
  sortable?: boolean;
  searchable?: boolean;
  align?: "start" | "end";
};

export type StudioDataTableProps<T> = {
  title: string;
  description?: string;
  eyebrow?: string;
  data: readonly T[];
  columns: readonly StudioTableColumn<T>[];
  getRowId: (row: T) => string;
  getRowLabel?: (row: T) => string;
  initialSort?: StudioTableSort;
  initialPageSize?: number;
  pageSizeOptions?: readonly number[];
  density?: "comfortable" | "compact";
  searchable?: boolean;
  selectable?: boolean;
  selectedIds?: readonly string[];
  onSelectionChange?: (ids: string[]) => void;
  renderSelectionActions?: (rows: readonly T[]) => ReactNode;
  isLoading?: boolean;
  emptyMessage?: string;
  className?: string;
};

const collator = new Intl.Collator("en", { numeric: true, sensitivity: "base" });
const defaultPageSizes = [5, 10, 20];
const indexLabel = (value: number) => String(value).padStart(2, "0");
const validPageSize = (value: number) => Number.isSafeInteger(value) && value > 0;

function SelectionCheckbox({ label, checked, mixed = false, disabled, onChange }: {
  label: string;
  checked: boolean;
  mixed?: boolean;
  disabled?: boolean;
  onChange: () => void;
}) {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => { if (ref.current) ref.current.indeterminate = mixed; }, [mixed]);

  return <input ref={ref} className={styles.checkbox} type="checkbox" aria-label={label} checked={checked} disabled={disabled} onChange={onChange} />;
}

function SortMark({ direction }: { direction?: "asc" | "desc" }) {
  return (
    <svg aria-hidden="true" width="12" height="14" viewBox="0 0 12 14" fill="none" stroke="currentColor" strokeWidth="1.3">
      <path d="m3 5 3-3 3 3" opacity={direction === "desc" ? .2 : 1} />
      <path d="m3 9 3 3 3-3" opacity={direction === "asc" ? .2 : 1} />
    </svg>
  );
}

/** A client-side ledger for finite datasets. Stable, unique row and column IDs are required. */
export function StudioDataTable<T>({
  title,
  description,
  eyebrow = "Mono / Ledger",
  data,
  columns,
  getRowId,
  getRowLabel = getRowId,
  initialSort,
  initialPageSize = 5,
  pageSizeOptions = defaultPageSizes,
  density = "comfortable",
  searchable = true,
  selectable = true,
  selectedIds,
  onSelectionChange,
  renderSelectionActions,
  isLoading = false,
  emptyMessage = "No records yet. Add your first record to get started.",
  className,
}: StudioDataTableProps<T>) {
  const instanceId = useId();
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<StudioTableSort | undefined>(initialSort);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(validPageSize(initialPageSize) ? initialPageSize : 5);
  const [internalSelection, setInternalSelection] = useState<string[]>([]);
  const [hasOverflow, setHasOverflow] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const observer = new ResizeObserver(() => setHasOverflow(viewport.scrollWidth > viewport.clientWidth + 1));
    observer.observe(viewport);
    if (viewport.firstElementChild) observer.observe(viewport.firstElementChild);
    return () => observer.disconnect();
  }, []);

  const searchTerm = searchable ? query.trim().toLocaleLowerCase("en") : "";
  const filtered = data.filter((row) => !searchTerm || columns.some((column) =>
    column.searchable !== false && String(column.accessor(row) ?? "").toLocaleLowerCase("en").includes(searchTerm),
  ));
  const sortColumn = columns.find((column) => column.id === sort?.columnId && column.sortable !== false);
  const ordered = filtered.map((row, index) => ({ row, index }));

  if (sortColumn && sort) {
    ordered.sort((a, b) => {
      const left = sortColumn.accessor(a.row);
      const right = sortColumn.accessor(b.row);
      // Empty values stay at the end in either direction. Ties retain input order.
      if (left == null && right == null) return a.index - b.index;
      if (left == null) return 1;
      if (right == null) return -1;
      const difference = typeof left === "number" && typeof right === "number"
        ? (Number.isNaN(left) ? 0 : left) - (Number.isNaN(right) ? 0 : right)
        : collator.compare(String(left), String(right));
      return difference ? difference * (sort.direction === "asc" ? 1 : -1) : a.index - b.index;
    });
  }

  const pageCount = Math.max(1, Math.ceil(ordered.length / pageSize));
  const currentPage = Math.min(page, pageCount - 1);
  const start = currentPage * pageSize;
  const visibleRows = ordered.slice(start, start + pageSize).map(({ row }) => row);
  const selectedSet = new Set(selectedIds ?? internalSelection);
  const selectedRows = selectable ? data.filter((row) => selectedSet.has(getRowId(row))) : [];
  const liveSelectedIds = selectedRows.map(getRowId);
  const selectedOnPage = visibleRows.filter((row) => selectedSet.has(getRowId(row))).length;
  const allOnPageSelected = visibleRows.length > 0 && selectedOnPage === visibleRows.length;
  const sizes = [...new Set([...pageSizeOptions.filter(validPageSize), pageSize])].sort((a, b) => a - b);
  const columnCount = columns.length + 1 + (selectable ? 1 : 0);
  const hasSelection = selectedRows.length > 0;

  function updateSelection(ids: string[]) {
    if (selectedIds === undefined) setInternalSelection(ids);
    onSelectionChange?.(ids);
  }

  function toggleRow(id: string) {
    updateSelection(selectedSet.has(id) ? liveSelectedIds.filter((value) => value !== id) : [...liveSelectedIds, id]);
  }

  function togglePage() {
    const pageIds = new Set(visibleRows.map(getRowId));
    updateSelection(allOnPageSelected
      ? liveSelectedIds.filter((id) => !pageIds.has(id))
      : [...new Set([...liveSelectedIds, ...pageIds])]);
  }

  function clearSearch() {
    setQuery("");
    setPage(0);
    searchRef.current?.focus();
  }

  function toggleSort(columnId: string) {
    setSort(sortColumn?.id !== columnId ? { columnId, direction: "asc" }
      : sort?.direction === "asc" ? { columnId, direction: "desc" } : undefined);
    setPage(0);
  }

  return (
    <section className={cn(styles.root, className)} data-studio-table="" data-density={density} aria-labelledby={`${instanceId}-title`}>
      <header className={styles.header}>
        <div className={styles.identity}>
          <p className={styles.eyebrow}><span className={styles.registerMark} aria-hidden="true" />{eyebrow}</p>
          <h3 id={`${instanceId}-title`} className={styles.title}>{title}</h3>
          {description && <p className={styles.description}>{description}</p>}
        </div>
        <div className={styles.total}><span>{indexLabel(data.length)}</span><span>Records</span></div>
      </header>

      {searchable && <div className={styles.toolbar}>
        <div className={styles.search}>
          <svg aria-hidden="true" width="15" height="15" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4"><circle cx="8.5" cy="8.5" r="5.5" /><path d="m13 13 4 4" /></svg>
          <input ref={searchRef} type="search" aria-label={`Search ${title}`} placeholder="Find in this ledger…" value={query} disabled={isLoading} onChange={(event) => { setQuery(event.target.value); setPage(0); }} />
          {query && <button type="button" onClick={clearSearch} disabled={isLoading} aria-label="Clear search" className={styles.clearSearch}>×</button>}
        </div>
        <span className={styles.matchCount}>{indexLabel(filtered.length)} <span>in view</span></span>
      </div>}

      {selectable && <div className={styles.selectionBar} data-active={hasSelection}>
        <span className={styles.selectionLabel}><span aria-hidden="true" className={styles.selectionMark} />{hasSelection ? `${indexLabel(selectedRows.length)} selected across all pages` : "Select records to work across pages"}</span>
        {hasSelection && !isLoading && <div className={styles.selectionActions}>{renderSelectionActions?.(selectedRows)}<button type="button" onClick={() => { updateSelection([]); viewportRef.current?.focus(); }}>Clear selection</button></div>}
      </div>}

      <div className={styles.scrollHint} data-overflow={hasOverflow} aria-hidden="true">Scroll to explore columns <span>→</span></div>
      <div ref={viewportRef} className={styles.viewport} tabIndex={0} role="region" aria-label={`${title} table${hasOverflow ? ", scroll horizontally to view all columns" : ""}`}>
        <table className={styles.table} aria-busy={isLoading}>
          <caption className={styles.srOnly}>{title}{description ? ` — ${description}` : ""}</caption>
          <thead><tr>
            <th scope="col" className={styles.indexCell}><span aria-label="Row number">#</span></th>
            {selectable && <th scope="col" className={styles.checkCell}><SelectionCheckbox label="Select all rows on this page" checked={allOnPageSelected} mixed={selectedOnPage > 0 && !allOnPageSelected} disabled={isLoading || !visibleRows.length} onChange={togglePage} /></th>}
            {columns.map((column) => {
              const direction = sortColumn?.id === column.id ? sort?.direction : undefined;
              return <th key={column.id} scope="col" data-align={column.align} aria-sort={direction === "asc" ? "ascending" : direction === "desc" ? "descending" : "none"}>
                {column.sortable === false ? column.header : <button type="button" className={styles.sortButton} disabled={isLoading} onClick={() => toggleSort(column.id)} aria-label={`${column.header}: ${!direction ? "sort ascending" : direction === "asc" ? "sort descending" : "clear sorting"}`} data-sorted={!!direction}>{column.header}<SortMark direction={direction} /></button>}
              </th>;
            })}
          </tr></thead>
          <tbody>
            {isLoading ? <tr><td colSpan={columnCount} className={styles.empty}><span className={styles.loadingMarks} aria-hidden="true"><i /><i /><i /></span><strong>Loading records</strong><span>Your ledger will appear here when it is ready.</span></td></tr>
              : visibleRows.length === 0 ? <tr><td colSpan={columnCount} className={styles.empty}><span className={styles.emptySymbol} aria-hidden="true">[ — ]</span><strong>{searchTerm ? "No matching records" : "A clean sheet"}</strong><span>{searchTerm ? "Try another name, status, or value." : emptyMessage}</span>{searchTerm && <button type="button" className={styles.emptyReset} onClick={clearSearch}>Clear search</button>}</td></tr>
                : visibleRows.map((row, rowIndex) => {
                  const id = getRowId(row);
                  return <tr key={id} data-selected={selectable && selectedSet.has(id)}>
                    <td className={styles.indexCell}>{indexLabel(start + rowIndex + 1)}</td>
                    {selectable && <td className={styles.checkCell}><SelectionCheckbox label={`Select ${getRowLabel(row)}`} checked={selectedSet.has(id)} onChange={() => toggleRow(id)} /></td>}
                    {columns.map((column, columnIndex) => {
                      const Cell = columnIndex === 0 ? "th" : "td";
                      return <Cell key={column.id} scope={columnIndex === 0 ? "row" : undefined} data-align={column.align} data-sorted={sortColumn?.id === column.id}>{column.cell ? column.cell(row) : column.accessor(row) ?? <span className={styles.missing}>—</span>}</Cell>;
                    })}
                  </tr>;
                })}
          </tbody>
        </table>
      </div>

      <footer className={styles.footer}>
        <label className={styles.pageSize}>Rows per sheet<select aria-label="Rows per sheet" value={pageSize} disabled={isLoading} onChange={(event) => { setPageSize(Number(event.target.value)); setPage(0); }}>{sizes.map((size) => <option key={size} value={size}>{indexLabel(size)}</option>)}</select></label>
        <span className={styles.range}>{isLoading || !ordered.length ? "00" : `${indexLabel(start + 1)}–${indexLabel(Math.min(start + pageSize, ordered.length))}`} <span>/ {indexLabel(ordered.length)}</span></span>
        <nav className={styles.pagination} aria-label={`${title} pagination`}>
          <button type="button" aria-label="Previous page" disabled={isLoading || currentPage === 0} onClick={() => setPage(currentPage - 1)}>←</button>
          <span>Sheet <b>{indexLabel(currentPage + 1)}</b> / {indexLabel(pageCount)}</span>
          <button type="button" aria-label="Next page" disabled={isLoading || currentPage >= pageCount - 1} onClick={() => setPage(currentPage + 1)}>→</button>
        </nav>
      </footer>
      <div className={styles.pageTrack} aria-hidden="true"><span style={{ width: `${100 / pageCount}%`, marginLeft: `${currentPage * 100 / pageCount}%` }} /></div>
      <p className={styles.srOnly} role="status" aria-live="polite" aria-atomic="true">{isLoading ? "Loading records." : `${filtered.length} matching records. Page ${currentPage + 1} of ${pageCount}. ${selectedRows.length} selected.`}</p>
    </section>
  );
}
